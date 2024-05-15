import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import routerPreguntas from "./preguntas/infraestructure/rest/pregunta.rest"
import routerRespuestas from "./respuestas/infraestructure/rest/respuestas.rest"
import routerExamenes from "./examen/infraestructure/rest/examen.rest";
import routerUsuario from "./usuario/infraestructure/rest/usuario.rest";

dotenv.config();
const port = process.env.PORT;
const allowedOrigins = ["http://"+process.env.HOST+":5173"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};


const app = express();
app.use(express.json());
app.use(cors(options));

//routers
app.use("/api/pregunta", routerPreguntas);
app.use("/api/respuesta", routerRespuestas);
app.use("/api/examenes", routerExamenes);
app.use("/api/usuario", routerUsuario);

app.listen(process.env.PORT, () => {
  console.log(`Application started on port ${port}`);
});