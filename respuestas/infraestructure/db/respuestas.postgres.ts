import Respuesta from "../../domain/respuesta";
import RespuestaRepository from "../../domain/respuestas.repository"
import executeQuery from "../../../context/postgres.connector";
import Pregunta from "../../../preguntas/domain/pregunta";
import { Client } from 'pg';

export default class RespuestaPostgres implements RespuestaRepository {
    async post(respuestasInsertar: Respuesta[]): Promise<Respuesta[]> {

        const data: any[] = []

        for (const respuesta of respuestasInsertar) {
            data.push([
                respuesta.opcion,
                respuesta.pregunta_id,
                respuesta.respuesta
            ])
        }

        const format = require('pg-format');

        const query = format('INSERT INTO respuesta (opcion, pregunta_id, respuesta) VALUES %L returning *', data);

        const rows: any[] = await executeQuery(query);

        const respuestas: Respuesta[] = rows.map(respuesta => {
            const respuestaDB: Respuesta = {
                pregunta: respuesta.pregunta_id,
                opcion: respuesta.opcion,
                respuesta: respuesta.respuesta
            };
            return respuestaDB;
        });
        return respuestas;


    }


    async get(): Promise<Respuesta[]> {
        const query = `SELECT respuesta.pregunta_id,respuesta.opcion,respuesta.respuesta,pregunta.id,pregunta.pregunta,pregunta.opcion1,pregunta.opcion2,pregunta.opcion3,pregunta.opcion4,pregunta.explicacion,pregunta.categoria, pregunta.respuesta as Respuesta_Correcta FROM respuesta JOIN pregunta ON respuesta.pregunta_id = pregunta.id`;

        const rows: any[] = await executeQuery(query);
        const Respuestas: Respuesta[] = [];

        rows.forEach(respuesta => {
            const opciones: any[] = [];
            opciones.push(respuesta.opcion1)
            opciones.push(respuesta.opcion2)
            opciones.push(respuesta.opcion3)
            opciones.push(respuesta.opcion4)

            const preguntaDB: Pregunta = {

                texto: respuesta.texto,
                opciones,
                explicacion: respuesta.explicacion,
                respuesta: respuesta.respuesta_Correcta,
                categoria: respuesta.categoria

            }

            const respuestaDB: Respuesta = {
                pregunta: preguntaDB,
                opcion: respuesta.opcion,
                respuesta: respuesta.respuesta
            };

            Respuestas.push(respuestaDB)
        })

        return Respuestas
    }

}
