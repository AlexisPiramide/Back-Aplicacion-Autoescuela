import executeQuery from "../../../context/postgres.connector";
import Usuario from "../../domain/usuario";
import UsuarioRepository from "../../domain/usuario.repository";

export default class UsuarioRepositoryPostgres implements UsuarioRepository {
  async registro(usuario: Usuario): Promise<Usuario> {
    const { alias, password } = usuario;
    const query = `insert into usuario (alias, password) values ('${alias}', '${password}') returning *`;
    const rows: any[] = await executeQuery(query);
    const usuarioDB: Usuario = {
      alias: rows[0].alias,
      role: 'usuario',
      password: rows[0].password,
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
      };
      return usuarioDB;
    }
  }
}