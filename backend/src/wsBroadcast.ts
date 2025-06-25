import { WebSocket } from "ws";

export const clients: Set<WebSocket> = new Set();

export function broadcastMessage(payload: any) {
  const data = JSON.stringify(payload);
  clients.forEach(ws => {
    if (ws.readyState === ws.OPEN) {
      ws.send(data);
    }
  });
}
