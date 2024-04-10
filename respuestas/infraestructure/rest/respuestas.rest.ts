import RespuestasRepositoryPostgres from "../db/respuestas.postgres"
import RespuestasRepository from "../../domain/respuestas.repository"
import RespuestasUsecases from "../../application/respuestas.usecases";
import express from "express";

const respuestasRepository: RespuestasRepository = new RespuestasRepositoryPostgres();

const respuestasUseCases: RespuestasUsecases = new RespuestasUsecases(
    respuestasRepository
);

const router = express.Router();

router.get("/", async (req, res) => {
    const respuestas = await respuestasUseCases.get();
    res.json(respuestas);
});

router.post("/post", async (req, res) => {
    const respuestasFront = req.body
    const respuestas = await respuestasUseCases.post(respuestasFront);
    res.json(respuestas);
});

export default router
