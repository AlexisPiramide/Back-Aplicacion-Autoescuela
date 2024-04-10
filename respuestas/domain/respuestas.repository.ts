import Respuesta from "./respuesta"
export default interface RespuestaRepository {
    post(respuesta: Respuesta[]): Promise<Respuesta[]>
    get():Promise<Respuesta[]>
}