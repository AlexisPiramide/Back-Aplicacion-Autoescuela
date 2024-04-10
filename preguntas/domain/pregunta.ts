export default interface Pregunta {
    id?: number;
    pregunta: String;
    opciones: String [];
    explicacion: String;
    respuesta: number;
    categoria: String;
}