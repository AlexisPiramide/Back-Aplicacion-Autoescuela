import Pregunta from "../../preguntas/domain/pregunta";
import Respuesta from "../../respuestas/domain/respuesta";

export default interface Examen {
    id: number;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    preguntas?: Pregunta[];
    respuestas?: Respuesta[];
}