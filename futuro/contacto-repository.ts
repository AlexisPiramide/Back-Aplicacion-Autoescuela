import Contacto from "./contacto";

export default interface ContactoRepository {
    nuevoContacto(contacto : Contacto) : Promise<boolean>;
    listarContacto(usuario_id : number) : Promise<Contacto[]>;
    modificarDatosContacto(contacto : Contacto) : Promise<boolean>;
}