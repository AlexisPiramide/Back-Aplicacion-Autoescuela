import executeQuery from "../../../context/postgres.connector";
import Usuario from "../../domain/usuario";
import UsuarioRepository from "../../domain/usuario.repository";

export default class UsuarioRepositoryPostgres implements UsuarioRepository {
  async registro(usuario: Usuario): Promise<Usuario> {
    const { alias, password, nombre, apellidos, email } = usuario;
    const query = `insert into usuario (alias, password, nombre, apellidos, email) values ('${alias}', '${password}', '${nombre}', '${apellidos}', '${email}') returning *`;
    const rows: any[] = await executeQuery(query);
    const usuarioDB: Usuario = {
      alias: rows[0].alias,
      role: 'usuario',
      password: rows[0].password,
      nombre: rows[0].nombre,
      apellidos: rows[0].apellidos,
      email: rows[0].email,
    };
    return usuarioDB;
  }

  async login(usuario: Usuario): Promise<Usuario> {
    const { alias } = usuario;
    const query = `select * from usuario where alias = '${alias}'`;
    const rows: any[] = await executeQuery(query);
    if (rows.length === 0) {
      throw new Error("Usuario/contraseña no es correcto");
    } else {
      const usuarioDB: Usuario = {
        alias: rows[0].alias,
        role: rows[0].role,
        password: rows[0].password,
        nombre: rows[0].nombre,
        apellidos: rows[0].apellidos,
      };
      return usuarioDB;
    }
  }
}