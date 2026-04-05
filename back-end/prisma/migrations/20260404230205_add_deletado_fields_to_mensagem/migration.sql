-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_mensagens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "conteudo" TEXT NOT NULL,
    "remetenteId" INTEGER NOT NULL,
    "destinatarioId" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataactualizacao" DATETIME NOT NULL,
    "editadoEm" DATETIME,
    "deletadoParaRemetente" BOOLEAN NOT NULL DEFAULT false,
    "deletadoParaDestinatario" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "mensagens_remetenteId_fkey" FOREIGN KEY ("remetenteId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "mensagens_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_mensagens" ("conteudo", "criadoEm", "dataactualizacao", "destinatarioId", "editadoEm", "id", "remetenteId") SELECT "conteudo", "criadoEm", "dataactualizacao", "destinatarioId", "editadoEm", "id", "remetenteId" FROM "mensagens";
DROP TABLE "mensagens";
ALTER TABLE "new_mensagens" RENAME TO "mensagens";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
