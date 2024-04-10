import Pregunta from '../../preguntas/domain/pregunta'; // Import the 'Pregunta' interface from the appropriate module

export default interface Respuesta {
    opcion:number;
    pregunta?: Pregunta;
    pregunta_id?: number;
    respuesta: boolean;
}