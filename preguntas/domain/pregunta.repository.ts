import Pregunta from "./pregunta"
export default interface OfertaRepository {
    getPreguntas(): Promise<Pregunta[]>
}