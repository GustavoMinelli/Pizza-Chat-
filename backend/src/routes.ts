import { Router } from "express";
import { MessageController } from "./controllers/MessageController";

const router = Router();

// Exemplo de rota simples
router.get("/", (req, res) => {
  res.send("API Pizza-AI rodando!");
});

router.get("/messages", MessageController.listMessages);
router.post("/messages", MessageController.createMessage);
router.delete("/messages", MessageController.clearMessages);

export default router;
