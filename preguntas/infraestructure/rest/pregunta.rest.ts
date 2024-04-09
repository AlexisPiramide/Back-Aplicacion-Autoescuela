import PreguntaRepositoryPostgres from "../db/pregunta.postgres"
import PreguntaRepository from "../../domain/pregunta.repository"
import PreguntaUsecases from "../../application/pregunta.usecases";
import express from "express";

const preguntaRepository: PreguntaRepository = new PreguntaRepositoryPostgres();

const preguntaUseCases: PreguntaUsecases = new PreguntaUsecases(
    preguntaRepository
);

const router = express.Router();

router.get("/", async (req, res) => {
    const ofertas = await preguntaUseCases.getPreguntas();
    res.json(ofertas);
});

export default router