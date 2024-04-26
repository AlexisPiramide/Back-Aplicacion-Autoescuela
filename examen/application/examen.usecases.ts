import Respuesta from "../../respuestas/domain/respuesta";
import ExamenRepository from "../domain/examen.repository";

export default class ExamenUsecases {

    constructor (private examenRepository: ExamenRepository) { }

    async getExamenes() {
        return this.examenRepository.getExamenes();
    }

    async nuevoExamen(usuario: string) {
        return this.examenRepository.nuevoExamen(usuario);
    }

    async nuevoExamenCategorias(usuario: string,categoria: string) {
        return this.examenRepository.nuevoExamenCategorias(usuario,categoria);
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

    async postRespuestas(respuestas: any[],id: number) {
        return this.examenRepository.postRespuestas(respuestas,id);
    }

}