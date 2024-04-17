import ExamenRepositoryPostgres from "../db/examen.postgres";
import ExamenRepository from "../../domain/examen.repository";
import ExamenUsecases from "../../application/examen.usecases";
import express from "express";
import { isAuth } from "../../../context/security/auth";

const examenRepository: ExamenRepository = new ExamenRepositoryPostgres();

const examenUseCases: ExamenUsecases = new ExamenUsecases(
    examenRepository
);

const router = express.Router();

router.get("/",isAuth, async (req, res) => {
    const examenes = await examenUseCases.getExamenes();
    res.json(examenes);
});

router.get("/acabados",isAuth, async (req, res) => {
    const examenes = await examenUseCases.getExamenesAcabados();
    res.json(examenes);
});

router.get("/nuevos",isAuth, async (req, res) => {
    const examenes = await examenUseCases.getExamenesSinAcabar();
    res.json(examenes);
});

router.get("/:id",isAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    const examen = await examenUseCases.getExamen(id);
    res.json(examen);
});

router.get("/respuestas/:id",isAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    const respuestas = await examenUseCases.getRespuestasExamen(id);
    res.json(respuestas);
});

router.post("/respuestas/:id",isAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    const respuestas = req.body;
    const resultado = await examenUseCases.postRespuestas(respuestas,id);
    res.json(resultado);
});

router.post("/nuevoExamen",isAuth, async (req, res) => {

    const usuario = req.body.alias;
    const resultado = await examenUseCases.nuevoExamen(usuario);
    res.json(resultado);
});

router.post("/nuevoExamen/:categoria",isAuth, async (req, res) => {
    const usuario = req.body.alias;
    const categoria = req.params.categoria;
    const resultado = await examenUseCases.nuevoExamenCategorias(usuario,categoria);
    res.json(resultado);
});

export default router;
