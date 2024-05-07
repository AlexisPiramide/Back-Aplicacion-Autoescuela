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
        const query = `SELECT respuesta.*, examen.*, pregunta.respuesta as valida, pregunta.opcion1, pregunta.opcion2, pregunta.opcion3, pregunta.opcion4
        FROM respuesta
        JOIN examen ON respuesta.examen_id = examen.id
        JOIN pregunta ON respuesta.pregunta_id = pregunta.id
        WHERE examen.id = ${id};`;

        const rows: any[] = await executeQuery(query);

        const respuestas: Respuesta[] = [];

        rows.forEach(respuesta => {
            const respuestaDB: Respuesta = {
                pregunta_id: respuesta.pregunta_id,
                opcion: respuesta.opcion,
                respuesta: respuesta.respuesta,
                correcta: respuesta.valida,
                opciones: [respuesta.opcion1,respuesta.opcion2,respuesta.opcion3,respuesta.opcion4]
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

    /*Ahora hace el update, posible cambio quitar el Promise<Examen> y meter un Promise<Boolean>*/
    async postRespuestas(respuestas: any[], id: number): Promise<Examen> {
        
        const examenPreguntas = await this.getExamen(id);
        
        respuestas.map(async (respuesta,index) => {
            if(examenPreguntas && examenPreguntas.preguntas){
                const id_pregunta = examenPreguntas.preguntas[index].id;
                const verdadera = examenPreguntas.preguntas[index].respuesta;
                let opcion= false;
                
                if(respuesta===verdadera){
                    opcion=true;
                }

                const query = `UPDATE respuesta SET opcion = '${respuesta}', respuesta = '${opcion}' WHERE examen_id = ${id} AND pregunta_id = ${id_pregunta};`;
                await executeQuery(query);
            }
        });
        const result = await this.getRespuestasExamen(id);

        return result
    }

    async cerrarExamen(id: number): Promise<Examen> {
        const query = `UPDATE examen SET fecha_fin = CURRENT_DATE WHERE id = ${id} RETURNING *;`;

        const rows: any[] = await executeQuery(query);

        const examen: Examen = {
            id: id,
            fecha_inicio: rows[0].fecha_inicio,
            fecha_fin: rows[0].fecha_fin,
        };

        return examen
    }

    async getExamenSoloPreguntas(id: number): Promise<Pregunta[]> {
        const query = `SELECT * FROM pregunta WHERE id IN (SELECT pregunta_id FROM respuesta WHERE examen_id = ${id});`

        const rows: any[] = await executeQuery(query);

        const preguntas: Pregunta[] = [];
        rows.forEach(pregunta => {

            if (pregunta.respuesta === 1) {
                const preguntaDB: Pregunta = {
                    id: pregunta.id,
                    pregunta_id:1,
                    pregunta: pregunta.opcion1,
                    texto: pregunta.texto,
                    explicacion: pregunta.explicacion,
                };
                preguntas.push(preguntaDB);
            } else if (pregunta.respuesta === 2) {
                const preguntaDB: Pregunta = {
                    id: pregunta.id,
                    pregunta_id:2,
                    pregunta: pregunta.opcion2,
                    texto: pregunta.texto,
                    explicacion: pregunta.explicacion,
                };
                preguntas.push(preguntaDB);
            } else if (pregunta.respuesta === 3) {
                const preguntaDB: Pregunta = {
                    id: pregunta.id,
                    pregunta_id:3,
                    pregunta: pregunta.opcion3,
                    texto: pregunta.texto,
                    explicacion: pregunta.explicacion,
                };
                preguntas.push(preguntaDB);
            } else if (pregunta.respuesta === 4) {
                const preguntaDB: Pregunta = {
                    id: pregunta.id,
                    pregunta_id:4,
                    pregunta: pregunta.opcion4,
                    texto: pregunta.texto,
                    explicacion: pregunta.explicacion,
                };
                preguntas.push(preguntaDB);
            }
            
        });

        return preguntas
    }

}