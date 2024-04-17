import Respuesta from "../../../respuestas/domain/respuesta";
import Pregunta from "../../../preguntas/domain/pregunta";
import Examen from "../../domain/examen";
import ExamenRepository from "../../domain/examen.repository";
import executeQuery from "../../../context/postgres.connector";
export default class ExamenPostgres implements ExamenRepository {
    
    async nuevoExamen(examen: Examen): Promise<Examen> {
        const query = `SELECT * FROM pregunta ORDER BY RANDOM() LIMIT 30;`;

        const query2 = 'INSERT INTO examen (///) SELECT /// FROM pregunta ORDER BY RANDOM() LIMIT 30 RETURNING *;'

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
                texto: pregunta.texto,
                opciones,
                explicacion: pregunta.explicacion,
                respuesta: pregunta.respuesta,
                categoria: pregunta.categoria
            };
            preguntas.push(preguntaDB);
        });


        return examen
    }
    nuevoExamenCategorias(examen: Examen, categoria: string): Promise<Examen> {
        throw new Error("Method not implemented.");
    }
    getExamenes(): Promise<Examen[]> {
        throw new Error("Method not implemented.");
    }
    getExamenesAcabados(): Promise<Examen[]> {
        throw new Error("Method not implemented.");
    }
    getExamenesSinAcabar(): Promise<Examen[]> {
        throw new Error("Method not implemented.");
    }
    getExamen(id: number): Promise<Examen> {
        throw new Error("Method not implemented.");
    }
    getRespuestasExamen(id: number): Promise<Examen> {
        throw new Error("Method not implemented.");
    }
    postRespuestas(respuestas: Respuesta[], id: number): Promise<Examen> {
        throw new Error("Method not implemented.");
    }

}