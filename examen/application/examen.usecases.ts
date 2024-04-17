import Respuesta from "../../respuestas/domain/respuesta";
import ExamenRepository from "../domain/examen.repository";

export default class ExamenUsecases {

    constructor (private examenRepository: ExamenRepository) { }

    async getExamenes() {
        return this.examenRepository.getExamenes();
    }

    async getExamen(id: number) {
        return this.examenRepository.getExamen(id);
    }

    async getExamenesAcabados() {
        return this.examenRepository.getExamenesAcabados();
    }

    async getExamenesSinAcabar() {
        return this.examenRepository.getExamenesSinAcabar();
    }

    async getRespuestasExamen(id: number) {
        return this.examenRepository.getRespuestasExamen(id);
    }

    async postRespuestas(respuestas: Respuesta[],id: number) {
        return this.examenRepository.postRespuestas(respuestas,id);
    }

}