import "dotenv/config";
import http from "http";
import express from "express";
import cors from "cors";
import { configurarWebSocket } from "./websocket.js";
import { JWT } from "./bcrypt-jwt/jwt.js";

// Importando as rotas
import { routerUsuarios } from "./rotas/rotasUsuario.js";
import { routerAviso }  from "./rotas/rotasAviso.js";
import { routerAluno } from "./rotas/rotasAluno.js";
import { routerDisciplina } from "./rotas/rotasDisciplina.js";
import { routerEvento } from "./rotas/rotasEvento.js";
import { routerNota } from "./rotas/rotasNota.js";
import { routerReuniao } from "./rotas/rotasReuniao.js";
import { routerRelatorio } from "./rotas/rotasRelatorio.js";
import { routerTurma } from "./rotas/rotasTurma.js";
import { routerAdmin } from "./rotas/rotasAdmin.js";
import { routerCurso } from "./rotas/rotasCurso.js";
import { routerMensagem } from "./rotas/rotasMensagem.js";
import statsRoutes from "./rotas/rotasStats.js";
import routerFeedback from "./rotas/rotasFeedback.js";

const PORTA = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);

// Configurações do middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Rota de teste
app.get("/api", (_, res) => {
    res.json({mensagem: "Seja bem-vindo à API da Plataforma de Comunicação Escola-Família (SchoolConnect)!"});
})

app.use("/uploads", express.static("uploads"));

// Usando as rotas
app.use("/api",  routerUsuarios);
app.use("/api", routerAviso);
app.use("/api", routerAluno);
app.use("/api", routerDisciplina);
app.use("/api", routerEvento);
app.use("/api", routerNota);
app.use("/api", routerReuniao);
app.use("/api", routerRelatorio);
app.use("/api", routerTurma);
app.use("/api", routerAdmin);
app.use("/api", routerCurso);
app.use("/api", routerMensagem);
app.use("/api", statsRoutes);
app.use("/api/feedbacks", routerFeedback);

const conexoes = new Map();

const wss = configurarWebSocket(server);

server.listen(PORTA, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORTA}`);
});