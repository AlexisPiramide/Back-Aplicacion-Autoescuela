import Pregunta from "../../domain/pregunta";
import PreguntaRepository from "../../domain/pregunta.repository"
import executeQuery from "../../../context/postgres.connector";

export default class PreguntaPostgres implements PreguntaRepository{

    async getPreguntas(): Promise<Pregunta[]> {
        const query = `SELECT Pregunta.id, Pregunta.pregunta, Pregunta.opcion1, Pregunta.opcion2, Pregunta.opcion3, Pregunta.opcion4, Pregunta.respuesta, Pregunta.explicacion, categoria.categoria
        FROM Pregunta
        JOIN categoria ON Pregunta.categoria = categoria.categoria;`;
        const rows: any[] = await executeQuery(query);
        const preguntas: Pregunta[] = [];
        rows.forEach(pregunta => {
            const opciones: any[]= [];

            opciones.push(pregunta.opcion1)
            opciones.push(pregunta.opcion2)
            opciones.push(pregunta.opcion3)
            opciones.push(pregunta.opcion4)

            const preguntaDB: Pregunta = {
                pregunta: pregunta.pregunta,
                opciones: opciones,
                explicacion: pregunta.explicacion,
                respuesta: pregunta.respuesta,
                categoria: pregunta.categoria
            };
            preguntas.push(preguntaDB);
        });
        return preguntas
    }

}