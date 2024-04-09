import PreguntaRepository from '../domain/pregunta.repository';
import Pregunta from '../domain/pregunta';
export default class PreguntaUsecases {
    constructor(private preguntaRepository: PreguntaRepository) { }

    async getPreguntas(): Promise<Pregunta[]>{
        return this.preguntaRepository.getPreguntas()
    }

}