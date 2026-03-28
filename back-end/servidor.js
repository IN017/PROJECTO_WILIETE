import "dotenv/config";
import express from "express";
import cors from "cors";

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
import { routerAdmin } from "./rotas/rotasAdmin.js"


const PORTA = process.env.PORT || 3000;

const app = express();

// Configurações do middleware
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/api", (_, res) => {
    res.json({mensagem: "Seja bem-vindo à API da Plataforma de Comunicação Escola-Família (SchoolConnect)!"});
})

// Usando as rotas
app.use("/api",  routerUsuarios);
app.use("/api", routerAviso);
app.use("/api", routerAluno)
app.use("/api", routerDisciplina);
app.use("/api", routerEvento);
app.use("/api", routerNota);
app.use("/api", routerReuniao);
app.use("/api", routerRelatorio);
app.use("/api", routerTurma);
app.use("/api", routerAdmin)


app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta http://localhost ${PORTA}`);
});

