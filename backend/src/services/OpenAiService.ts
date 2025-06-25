import OpenAI from "openai";
import dotenv from "dotenv";
import { AppDataSource } from "../database/data-source";
import { MenuItem, MenuItemType } from "../models/MenuItem";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAIService {
    async generateResponse(historico: any[]): Promise<string> {
        const mensagens = historico.map(m => ({
            role: m.role,
            content: m.content,
        }));



        // Buscar itens do menu no banco de dados
        const repo = AppDataSource.getRepository(MenuItem);
        const pizzas = await repo.findBy({ type: MenuItemType.PIZZA });
        const bebidas = await repo.findBy({ type: MenuItemType.BEBIDA });
        const sobremesas = await repo.findBy({ type: MenuItemType.SOBREMESA });

        const pizzasList = pizzas.map(p => p.name).join(", ");
        const bebidasList = bebidas.map(b => b.name).join(", ");
        const sobremesasList = sobremesas.map(s => s.name).join(", ");

        return "O gustavo está testando e nao quer gastar os tokens";


        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: `
                    Você é um atendente de pizzaria. Só pode vender pizzas, bebidas e sobremesas listadas no cardápio:
                    
                    Pizzas: ${pizzasList}.
                    Bebidas: ${bebidasList}.
                    Sobremesas: ${sobremesasList}.

                    Não ofereça descontos, cupons ou promoções. Nunca saia desse contexto.
                    Insista gentilmente na venda. Se o cliente recusar bebida, ofereça outra. Se aceitar bebida, ofereça sobremesa.
                `},
                ...mensagens
            ],
        });



        return response.choices[0].message?.content ?? "Desculpe, não consegui entender.";
    }
}
