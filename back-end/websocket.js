import { WebSocketServer } from "ws";
import http from "http";
import express from "express";
import { JWT } from "./bcrypt-jwt/jwt.js";

// Mapa de conexões WebSocket
const conexoes = new Map();

// Função para enviar mensagem para um usuário específico
export function enviarMensagemWS(userId, data) {
  const socket = conexoes.get(Number(userId));
  if (socket && socket.readyState === 1) {
    socket.send(JSON.stringify(data));
  }
}

// Função para configurar o WebSocket Server
export function configurarWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (socket, request) => {
    try {
      const url = new URL(request.url, `http://${request.headers.host}`);
      const token = url.searchParams.get("token");
      const decoded = JWT.verificarToken(token);
      const userId = Number(decoded.id);

      if (!userId) {
        socket.close(1008, "Token inválido");
        return;
      }

      conexoes.set(userId, socket);

      socket.on("message", (raw) => {
        try {
          const data = JSON.parse(raw.toString());
          if (!data.tipo) return;

          if (data.tipo === "mensagem" && data.destinatarioId) {
            enviarMensagemWS(data.destinatarioId, data);
          }

          if (data.tipo === "typing" && data.destinatarioId) {
            enviarMensagemWS(data.destinatarioId, data);
          }

          if (data.tipo === "mensagem_editada" && data.destinatarioId) {
            enviarMensagemWS(data.destinatarioId, data);
          }

          if (data.tipo === "mensagem_deletada" && data.destinatarioId) {
            enviarMensagemWS(data.destinatarioId, data);
          }
        } catch (error) {
          console.warn("WS mensagem inválida:", error.message);
        }
      });

      socket.on("close", () => {
        conexoes.delete(userId);
      });
    } catch (error) {
      socket.close(1008, "Token inválido");
    }
  });

  return wss;
}