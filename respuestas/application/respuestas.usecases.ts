import RespuestaRepository from '../domain/respuestas.repository';
import Respuesta from '../domain/respuesta';

export default class RespuestaUsecases {
    constructor(private respuestaRepository: RespuestaRepository) { }

    async post(respuestas: Respuesta[]): Promise<Respuesta[]>{
        return this.respuestaRepository.post(respuestas)
    }
    async get():Promise<Respuesta[]>{
        return this.respuestaRepository.get()
    }
}
