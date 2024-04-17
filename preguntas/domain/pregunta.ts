export default interface Pregunta {
    id?: number;
    texto: String;
    opciones: String [];
    explicacion: String;
    respuesta: number;
    categoria: String;
}