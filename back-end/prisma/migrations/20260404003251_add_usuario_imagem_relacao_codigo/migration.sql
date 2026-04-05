/*
  Warnings:

  - You are about to drop the column `data` on the `eventos` table. All the data in the column will be lost.
  - You are about to drop the column `disciplina` on the `notas` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `reunioes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[telefone]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `classe` to the `alunos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cursoId` to the `alunos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descricao` to the `eventos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `disciplinaId` to the `notas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipo` to the `notas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `local` to the `reunioes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `turmas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "avisos" ADD COLUMN "imagem" TEXT;

-- AlterTable
ALTER TABLE "usuarios" ADD COLUMN "codigoVerificacao" TEXT;
ALTER TABLE "usuarios" ADD COLUMN "imagem" TEXT;
ALTER TABLE "usuarios" ADD COLUMN "relacaoEducando" TEXT;

-- CreateTable
CREATE TABLE "disciplinas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataactualizacao" DATETIME NOT NULL,
    "cursoId" INTEGER NOT NULL,
    CONSTRAINT "disciplinas_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cursos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataactualizacao" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "reuniao_participantes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "reuniaoId" INTEGER NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    CONSTRAINT "reuniao_participantes_reuniaoId_fkey" FOREIGN KEY ("reuniaoId") REFERENCES "reunioes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reuniao_participantes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProfessorDisciplinas" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProfessorDisciplinas_A_fkey" FOREIGN KEY ("A") REFERENCES "disciplinas" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProfessorDisciplinas_B_fkey" FOREIGN KEY ("B") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_alunos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "numero_matricula" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "imagem" TEXT,
    "classe" TEXT NOT NULL,
    "turmaId" INTEGER NOT NULL,
    "encarregadoId" INTEGER,
    "cursoId" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataactualizacao" DATETIME NOT NULL,
    CONSTRAINT "alunos_turmaId_fkey" FOREIGN KEY ("turmaId") REFERENCES "turmas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "alunos_encarregadoId_fkey" FOREIGN KEY ("encarregadoId") REFERENCES "usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "alunos_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_alunos" ("criadoEm", "dataactualizacao", "encarregadoId", "id", "nome", "numero_matricula", "telefone", "turmaId") SELECT "criadoEm", "dataactualizacao", "encarregadoId", "id", "nome", "numero_matricula", "telefone", "turmaId" FROM "alunos";
DROP TABLE "alunos";
ALTER TABLE "new_alunos" RENAME TO "alunos";
CREATE UNIQUE INDEX "alunos_numero_matricula_key" ON "alunos"("numero_matricula");
CREATE UNIQUE INDEX "alunos_telefone_key" ON "alunos"("telefone");
CREATE TABLE "new_eventos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "imagem" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataactualizacao" DATETIME NOT NULL
);
INSERT INTO "new_eventos" ("criadoEm", "dataactualizacao", "id", "titulo") SELECT "criadoEm", "dataactualizacao", "id", "titulo" FROM "eventos";
DROP TABLE "eventos";
ALTER TABLE "new_eventos" RENAME TO "eventos";
CREATE TABLE "new_mensagens" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "conteudo" TEXT NOT NULL,
    "remetenteId" INTEGER NOT NULL,
    "destinatarioId" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataactualizacao" DATETIME NOT NULL,
    CONSTRAINT "mensagens_remetenteId_fkey" FOREIGN KEY ("remetenteId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "mensagens_destinatarioId_fkey" FOREIGN KEY ("destinatarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_mensagens" ("conteudo", "criadoEm", "dataactualizacao", "destinatarioId", "id", "remetenteId") SELECT "conteudo", "criadoEm", "dataactualizacao", "destinatarioId", "id", "remetenteId" FROM "mensagens";
DROP TABLE "mensagens";
ALTER TABLE "new_mensagens" RENAME TO "mensagens";
CREATE TABLE "new_notas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "valor" REAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "alunoId" INTEGER NOT NULL,
    "disciplinaId" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataactualizacao" DATETIME NOT NULL,
    CONSTRAINT "notas_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "alunos" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "notas_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "disciplinas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_notas" ("alunoId", "criadoEm", "dataactualizacao", "id", "valor") SELECT "alunoId", "criadoEm", "dataactualizacao", "id", "valor" FROM "notas";
DROP TABLE "notas";
ALTER TABLE "new_notas" RENAME TO "notas";
CREATE TABLE "new_reunioes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "linkMeeting" TEXT,
    "local" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "criadoPorId" INTEGER,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataactualizacao" DATETIME NOT NULL,
    CONSTRAINT "reunioes_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "usuarios" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_reunioes" ("criadoEm", "dataactualizacao", "id", "titulo") SELECT "criadoEm", "dataactualizacao", "id", "titulo" FROM "reunioes";
DROP TABLE "reunioes";
ALTER TABLE "new_reunioes" RENAME TO "reunioes";
CREATE TABLE "new_turmas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataactualizacao" DATETIME NOT NULL,
    CONSTRAINT "turmas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_turmas" ("criadoEm", "dataactualizacao", "id", "nome") SELECT "criadoEm", "dataactualizacao", "id", "nome" FROM "turmas";
DROP TABLE "turmas";
ALTER TABLE "new_turmas" RENAME TO "turmas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "reuniao_participantes_reuniaoId_usuarioId_key" ON "reuniao_participantes"("reuniaoId", "usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessorDisciplinas_AB_unique" ON "_ProfessorDisciplinas"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessorDisciplinas_B_index" ON "_ProfessorDisciplinas"("B");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_telefone_key" ON "usuarios"("telefone");
