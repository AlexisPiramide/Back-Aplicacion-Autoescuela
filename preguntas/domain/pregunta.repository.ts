import Pregunta from "./pregunta"
export default interface PreguntaRepository {
    getPreguntas(): Promise<Pregunta[]>
}