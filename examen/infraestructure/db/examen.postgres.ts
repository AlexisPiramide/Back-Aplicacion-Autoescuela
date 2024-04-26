import Respuesta from "../../../respuestas/domain/respuesta";
import Pregunta from "../../../preguntas/domain/pregunta";
import Examen from "../../domain/examen";
import ExamenRepository from "../../domain/examen.repository";
import executeQuery from "../../../context/postgres.connector";
export default class ExamenPostgres implements ExamenRepository {

    async nuevoExamen(usuario: string): Promise<Examen> {
        const query = `
        WITH nuevo_examen AS (
            INSERT INTO examen(fecha_inicio, usuario) VALUES (CURRENT_DATE, '${usuario}') RETURNING *
        )
        INSERT INTO respuesta(pregunta_id, examen_id)
        SELECT id, (SELECT id FROM nuevo_examen) FROM pregunta ORDER BY RANDOM() LIMIT 30 RETURNING *, (SELECT fecha_inicio FROM nuevo_examen);
        `

        const rows: any[] = await executeQuery(query);
        const id_examen = rows[0].examen_id

        const querypreguntas = `SELECT * FROM pregunta WHERE id IN (SELECT pregunta_id FROM respuesta WHERE examen_id = ${id_examen});`

        const preguntasRows: any[] = await executeQuery(querypreguntas);

        const preguntas: Pregunta[] = [];
        preguntasRows.forEach(pregunta => {
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

        const examen: Examen = {
            id: id_examen,
            fecha_inicio: rows[0].fecha_inicio,
            preguntas: preguntas
        };

        return examen
    }

    async nuevoExamenCategorias(usuario: string, categoria: string): Promise<Examen> {
        const query = `
                    WITH nuevo_examen AS(INSERT INTO examen(fecha_inicio, usuario) VALUES(CURRENT_DATE,'${usuario}') RETURNING * ) 
                    INSERT INTO respuesta(pregunta_id, examen_id)
                    SELECT id,(SELECT id FROM nuevo_examen) FROM pregunta WHERE categoria='${categoria} ORDER BY RANDOM() LIMIT 30 returning *, (SELECT fecha_inicio FROM nuevo_examen);
                    `

        const rows: any[] = await executeQuery(query);
        const id_examen = rows[0].examen_id

        const querypreguntas = `SELECT * FROM pregunta WHERE id IN (SELECT pregunta_id FROM respuesta WHERE examen_id = ${id_examen});`

        const preguntasRows: any[] = await executeQuery(querypreguntas);

        const preguntas: Pregunta[] = [];
        preguntasRows.forEach(pregunta => {
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

        const examen: Examen = {
            id: id_examen,
            fecha_inicio: rows[0].fecha_inicio,
            preguntas: preguntas
        };

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

        const query = `
        SELECT examen.*, pregunta.*
        FROM examen
        JOIN respuesta ON respuesta.examen_id = examen.id
        JOIN pregunta ON pregunta.id = respuesta.pregunta_id
        WHERE examen.id = ${id};
        `;
        
        const rows: any[] = await executeQuery(query);

        const querypreguntas = `SELECT * FROM pregunta WHERE id IN (SELECT pregunta_id FROM respuesta WHERE examen_id = ${id});`

        const preguntasRows: any[] = await executeQuery(querypreguntas);

        const preguntas: Pregunta[] = [];
        preguntasRows.forEach(pregunta => {
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

        const examen: Examen = {
            id: id,
            fecha_inicio: rows[0].fecha_inicio,
            preguntas: preguntas
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

    async postRespuestas(respuestas: any[], id: number): Promise<Examen> {
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