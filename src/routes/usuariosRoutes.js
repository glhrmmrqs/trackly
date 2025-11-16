import { Router } from "express"
import { buscarUsuario, buscarUsuarioPorId, criarUsuario, alterarUsuarioPorId, deletarUsuarioPorId } from "../controllers/usuariosController.js"
const usuariosRouter = Router()

usuariosRouter.get("/", buscarUsuario)
usuariosRouter.get("/:id", buscarUsuarioPorId)
usuariosRouter.post("/", criarUsuario)
usuariosRouter.put("/:id", alterarUsuarioPorId)
usuariosRouter.delete("/:id", deletarUsuarioPorId)

export default usuariosRouter
