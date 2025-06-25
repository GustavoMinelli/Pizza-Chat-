import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Message, MessageRole } from "./models/Message";
import { OpenAIService } from "./services/OpenAiService";
import { Server } from "ws";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Exemplo de rota simples
app.get("/", (req, res) => {
  res.send("API Pizza-AI rodando!");
});

// Rota para listar todas as mensagens
app.get("/messages", async (req, res) => {
  const repo = AppDataSource.getRepository(Message);
  const messages = await repo.find({ order: { createdAt: "ASC" } });
  res.json(messages);
});

// WebSocket server
const wss = new Server({ noServer: true });
const clients: Set<any> = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.on("close", () => clients.delete(ws));
});

// Rota para criar uma nova mensagem e resposta automática
app.post("/messages", async (req, res) => {

  const { role, content } = req.body;
  if (!role || !content) {
    return res.status(400).json({ error: "role e content são obrigatórios" });
  }
  
  const repo = AppDataSource.getRepository(Message);

  // 1. Salva a mensagem do usuário
  const userMessage = repo.create({ role, content });
  await repo.save(userMessage);

  // 2. Busca o histórico ordenado
  const history = await repo.find({ order: { createdAt: "ASC" } });

  // 3. Gera resposta do bot
  const openaiService = new OpenAIService();
  const chatGptResponse = await openaiService.generateResponse(history);

  // 4. Salva a resposta do bot
  const botMessage = repo.create({ role: "assistant", content: chatGptResponse });
  await repo.save(botMessage);

  // 5. Envia via WebSocket para todos os clientes conectados
  const payload = JSON.stringify([userMessage, botMessage]);
  clients.forEach(ws => {
    if (ws.readyState === ws.OPEN) {
      ws.send(payload);
    }
  });

  // 6. Retorna as duas mensagens
  res.status(201).json([userMessage, botMessage]);
});

// Rota para limpar todas as mensagens do chat
app.delete("/messages", async (req, res) => {
  const repo = AppDataSource.getRepository(Message);
  await repo.clear();
  res.status(204).send();
});

// Inicializa o banco e inicia o servidor
AppDataSource.initialize().then(() => {
  const port = process.env.PORT ?? 3001;
  const server = app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
  server.on("upgrade", (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit("connection", ws, request);
    });
  });
}).catch((error) => {
  console.error("Erro ao inicializar o banco:", error);
});