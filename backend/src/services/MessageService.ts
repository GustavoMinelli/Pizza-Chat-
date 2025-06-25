import { AppDataSource } from "../database/data-source";
import { Message } from "../models/Message";
import { OpenAIService } from "./OpenAiService";

export class MessageService {

    //Lista as mensagens ordenadas por data
    static async listMessages() {
        const repo = AppDataSource.getRepository(Message);
        return repo.find({ order: { createdAt: "ASC" } });
    }

    static async createMessage(role: string, content: string) {

        const repo = AppDataSource.getRepository(Message);

        //Salva a mensagem do user
        const userMessage = repo.create({ role, content });
        await repo.save(userMessage);

        //Busca o histórico de mensagens
        const history = await repo.find({ order: { createdAt: "ASC" } });

        //Gera a resposta do ChatGPT
        const openaiService = new OpenAIService();
        const chatGptResponse = await openaiService.generateResponse(history);

        //Salva a resposta do ChatGPT
        const botMessage = repo.create({ role: "assistant", content: chatGptResponse });
        await repo.save(botMessage);

        return [userMessage, botMessage];

    }

    //Limpa todas as mensagens do banco de dados
    static async clearMessages() {
        const repo = AppDataSource.getRepository(Message);
        await repo.clear();
    }
}
