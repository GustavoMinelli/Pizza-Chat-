import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "ws";
import routes from "./routes";
import { clients } from "./wsBroadcast";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Usa as rotas centralizadas
app.use(routes);

// WebSocket server
const wss = new Server({ noServer: true });

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.on("close", () => clients.delete(ws));
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