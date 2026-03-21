/*
  Warnings:

  - You are about to drop the column `email` on the `alunos` table. All the data in the column will be lost.
  - Added the required column `numero_matricula` to the `alunos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `alunos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_alunos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "numero_matricula" TEXT NOT NULL,
    "turmaId" INTEGER NOT NULL,
    "encarregadoId" INTEGER NOT NULL,
    "telefone" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataactualizacao" DATETIME NOT NULL
);
INSERT INTO "new_alunos" ("criadoEm", "dataactualizacao", "encarregadoId", "id", "nome", "turmaId") SELECT "criadoEm", "dataactualizacao", "encarregadoId", "id", "nome", "turmaId" FROM "alunos";
DROP TABLE "alunos";
ALTER TABLE "new_alunos" RENAME TO "alunos";
CREATE UNIQUE INDEX "alunos_numero_matricula_key" ON "alunos"("numero_matricula");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
