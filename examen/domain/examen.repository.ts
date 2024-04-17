import Respuesta from '../../respuestas/domain/respuesta';
import Examen from './examen';

export default interface ExamenRepository {
    nuevoExamen(examen: Examen): Promise<Examen>
    nuevoExamenCategorias(examen: Examen,categoria: string): Promise<Examen>
    
    getExamenes(): Promise<Examen[]>
    getExamenesAcabados(): Promise<Examen[]>
    getExamenesSinAcabar(): Promise<Examen[]>

    getExamen(id: number): Promise<Examen>

    getRespuestasExamen(id: number): Promise<Examen>

    postRespuestas(respuestas: Respuesta[],id: number): Promise<Examen>

}

