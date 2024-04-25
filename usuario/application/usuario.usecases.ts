import { compare } from "bcrypt";
import Usuario from "../domain/usuario";
import UsuarioRepository from "../domain/usuario.repository";
import { hash } from "../../context/security/encrypter";

export default class UsuarioUseCases {
  constructor(private usuarioRepository: UsuarioRepository) { }

  async registro(usuario: Usuario): Promise<Usuario> {

    if (!usuario.password) throw new Error("Falta la contraseña");
    if (!usuario.email) throw new Error("Falta el email");
    if (!usuario.alias) throw new Error("Falta el alias");
    if (!usuario.nombre) throw new Error("Falta el nombre");
    if (!usuario.apellidos) throw new Error("Falta el apellido");


    const cifrada = hash(usuario.password);
    usuario.password = cifrada;
    return this.usuarioRepository.registro(usuario);
  }

  async login(usuario: Usuario): Promise<Usuario> {
    if (!usuario.password) throw new Error("Falta password");
    const usuarioBD = await this.usuarioRepository.login(usuario);
    if (!usuarioBD) throw new Error("Usuario no encontrado");
    const iguales = await compare(usuario.password, String(usuarioBD.password));
    if (iguales) {
      return usuarioBD;
    } else {
      throw new Error("Usuario/contraseña no es correcto");
    }
  }
}