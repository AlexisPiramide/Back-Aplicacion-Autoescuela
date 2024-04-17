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
            const opciones: any[] = [];

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
    async nuevoExamenCategorias(examen: Examen, categoria: string): Promise<Examen> {
        const query = `SELECT * FROM pregunta ORDER BY RANDOM() LIMIT 30 WHERE categoria = '${categoria}';`;

        const query2 = 'INSERT INTO examen (///) SELECT /// FROM pregunta ORDER BY RANDOM() LIMIT 30 RETURNING *;'

        const rows: any[] = await executeQuery(query);

        const preguntas: Pregunta[] = [];
        rows.forEach(pregunta => {
            const opciones: any[] = [];

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

    async getExamenes(): Promise<Examen[]> {
        const query = `SELECT * FROM examen;`;

        const rows: any[] = await executeQuery(query);
        const examenes: Examen[] = [];

        rows.forEach(examen => {
            const examenDB: Examen = {
                id: examen.id,
                fecha_inicio: examen.fecha_inicio,
                fecha_fin: examen.fecha_fin,
            };
            examenes.push(examenDB);
        });

        return examenes
    }
    async getExamenesAcabados(): Promise<Examen[]> {
        const query = `SELECT * FROM examen WHERE fecha_fin IS NOT NULL;`;

        const rows: any[] = await executeQuery(query);
        const examenes: Examen[] = [];

        rows.forEach(examen => {
            const examenDB: Examen = {
                id: examen.id,
                fecha_inicio: examen.fecha_inicio,
                fecha_fin: examen.fecha_fin,
            };
            examenes.push(examenDB);
        });

        return examenes
    }
    async getExamenesSinAcabar(): Promise<Examen[]> {
        const query = `SELECT * FROM examen WHERE fecha_fin IS NULL;`;

        const rows: any[] = await executeQuery(query);
        const examenes: Examen[] = [];

        rows.forEach(examen => {
            const examenDB: Examen = {
                id: examen.id,
                fecha_inicio: examen.fecha_inicio,
                fecha_fin: examen.fecha_fin,
            };
            examenes.push(examenDB);
        });

        return examenes
    }

    async getExamen(id: number): Promise<Examen> {
        const query = `SELECT * FROM examen WHERE id = ${id};`;

        const rows: any[] = await executeQuery(query);

        const examen: Examen = {
            id: rows[0].id,
            fecha_inicio: rows[0].preguntas,
            fecha_fin: rows[0].respuestas,
        };

        return examen
    }
    async getRespuestasExamen(id: number): Promise<Examen> {
        const query = `SELECT * FROM respuesta JOIN examen ON respuesta.examen_id = examen.id WHERE examen.id = ${id};`;

        const rows: any[] = await executeQuery(query);

        const respuestas: Respuesta[] = [];
        rows.forEach(respuesta => {
            const respuestaDB: Respuesta = {
                pregunta_id: respuesta.pregunta_id,
                opcion: respuesta.opcion,
                respuesta: respuesta.respuesta,
            };
            respuestas.push(respuestaDB);
        });

        const examen: Examen = {
            id: id,
            fecha_inicio: rows[0].fecha_inicio,
            fecha_fin: rows[0].fecha_fin,
            respuestas: respuestas,
            
        };

        return examen

    }

    async postRespuestas(respuestas: Respuesta[], id: number): Promise<Examen> {
        const query = `INSERT INTO respuesta (examen_id, pregunta_id, opcion, respuesta) VALUES `;

        respuestas.forEach(respuesta => {
            query.concat(`(${id}, ${respuesta.pregunta_id}, ${respuesta.opcion}, ${respuesta.respuesta}), `)
        });

        query.concat(` RETURNING *;`);

        const rows: any[] = await executeQuery(query);

        const respuestasDB: Respuesta[] = [];
        rows.forEach(respuesta => {
            const respuestaDB: Respuesta = {
                pregunta_id: respuesta.pregunta_id,
                opcion: respuesta.opcion,
                respuesta: respuesta.respuesta,
            };
            respuestasDB.push(respuestaDB);
        });

        const examen: Examen = {
            id: id,
            respuestas: respuestasDB,
        };

        return examen
    }

}