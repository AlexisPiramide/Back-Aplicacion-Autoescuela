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
    console.log(examen);
    res.json(examen);
});

router.get("/respuestas/:id",isAuth, async (req, res) => {
    const id = parseInt(req.params.id);    
    const respuestas = await examenUseCases.getRespuestasExamen(id);
    const examen = await examenUseCases.getExamenSoloPreguntas(id);
    console.log(examen);
    console.log(respuestas);
    res.json({examen,respuestas});
});

router.post("/respuestas/:id",isAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    console.log(req.body);
    const respuestas = req.body.respuestas;
    const resultado = await examenUseCases.postRespuestas(respuestas,id);

    if(resultado){
        const examen = await examenUseCases.cerrarExamen(id);
        if(examen){
            res.json({mensaje: "Respuestas guardadas"});
        }
    }
    else{
        res.json({mensaje: "Error al guardar respuestas"});
    }
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
