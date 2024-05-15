import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerPreguntas from "./preguntas/infraestructure/rest/pregunta.rest"
import routerRespuestas from "./respuestas/infraestructure/rest/respuestas.rest"
import routerExamenes from "./examen/infraestructure/rest/examen.rest";
import routerUsuario from "./usuario/infraestructure/rest/usuario.rest";

dotenv.config();
const port = process.env.PORT;

const app = express();
app.use(express.json());

//routers
app.use("/api/pregunta", routerPreguntas);
app.use("/api/respuesta", routerRespuestas);
app.use("/api/examenes", routerExamenes);
app.use("/api/usuario", routerUsuario);

app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${port}`);
  console.log(`Esto va`)
});