import express, { Request, Response } from "express";

//use cases
import UsuarioUseCases from "../../application/usuario.usecases";
//repositories
import UsuarioRepository from "../../domain/usuario.repository";
//implementations
import UsuarioRepositoryPostgres from "../db/usuario.postgres";
import Usuario from "../../domain/usuario";
import { createToken } from "../../../context/security/auth";

const usuariosRepository: UsuarioRepository = new UsuarioRepositoryPostgres();

const usuariosUseCases: UsuarioUseCases = new UsuarioUseCases(
  usuariosRepository
);

const router = express.Router();

router.post("/registro", async (req: Request, res: Response) => {
  const { alias, password } = req.body;
  const usuarioAPI: Usuario = {
    alias,
    password,
  };
  const usuario: Usuario = await usuariosUseCases.registro(usuarioAPI);
  res.json({ alias: usuario.alias });
});

router.post("/login", async (req: Request, res: Response) => {
  const { alias, password } = req.body;
  const usuarioAPI: Usuario = {
    alias,
    password,
  };
  const usuario: Usuario = await usuariosUseCases.login(usuarioAPI);
  if (usuario === null)
    res.status(404).json({ mensaje: "Usuario no encontrado" });
  const token = createToken(usuario);
  res.json({ token });
});

export default router;