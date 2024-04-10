import Pregunta from "../../domain/pregunta";
import PreguntaRepository from "../../domain/pregunta.repository"
import executeQuery from "../../../context/postgres.connector";

export default class PreguntaPostgres implements PreguntaRepository{

    async getPreguntas(): Promise<Pregunta[]> {
        const query = `SELECT * FROM pregunta`;

        const rows: any[] = await executeQuery(query);
        const preguntas: Pregunta[] = [];
        rows.forEach(pregunta => {
            const opciones: any[]= [];

            opciones.push(pregunta.opcion1)
            opciones.push(pregunta.opcion2)
            opciones.push(pregunta.opcion3)
            opciones.push(pregunta.opcion4)

            const preguntaDB: Pregunta = {
                id: pregunta.id,
                pregunta: pregunta.pregunta,
                opciones,
                explicacion: pregunta.explicacion,
                respuesta: pregunta.respuesta,
                categoria: pregunta.categoria
            };
            preguntas.push(preguntaDB);
        });
        return preguntas
    }

}