-- CreateTable
CREATE TABLE "_ProfessorCursos" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProfessorCursos_A_fkey" FOREIGN KEY ("A") REFERENCES "cursos" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProfessorCursos_B_fkey" FOREIGN KEY ("B") REFERENCES "usuarios" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProfessorCursos_AB_unique" ON "_ProfessorCursos"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfessorCursos_B_index" ON "_ProfessorCursos"("B");
