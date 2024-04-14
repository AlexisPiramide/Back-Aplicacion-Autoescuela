

export default interface UsuarioRepository {
    login(usuario : string, password : string) : Promise<boolean>;
    registro(usuario : string, password : string) : Promise<boolean>;
}