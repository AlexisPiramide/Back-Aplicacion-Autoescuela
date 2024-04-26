import Respuesta from '../../respuestas/domain/respuesta';
import Examen from './examen';

export default interface ExamenRepository {
    nuevoExamen(usuario:string): Promise<Examen>
    nuevoExamenCategorias(usuario:string,categoria: string): Promise<Examen>
    
    getExamenes(): Promise<Examen[]>
    getExamenesAcabados(): Promise<Examen[]>
    getExamenesSinAcabar(): Promise<Examen[]>

    getExamen(id: number): Promise<Examen>

    getRespuestasExamen(id: number): Promise<Examen>

    postRespuestas(respuestas: any[],id: number): Promise<Examen>

}

