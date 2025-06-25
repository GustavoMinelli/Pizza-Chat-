import { Request, Response } from "express";
import { MessageService } from "../services/MessageService";
import { broadcastMessage } from "../wsBroadcast";

export class MessageController {

    //Lista as mensagens ordenadas por data
    static async listMessages(req: Request, res: Response) {
        const messages = await MessageService.listMessages();
        res.json(messages);
    }

    //Cria a mensagem e envia para o WebSocket
    static async createMessage(req: Request, res: Response) {
        const { role, content } = req.body;
        if (!role || !content) {
            return res.status(400).json({ error: "role e content são obrigatórios" });
        }
        const result = await MessageService.createMessage(role, content);
        broadcastMessage(result);
        res.status(201).json(result);
    }

    //Limpa as mensagens
    static async clearMessages(req: Request, res: Response) {
        await MessageService.clearMessages();
        res.status(204).send();
    }

}
