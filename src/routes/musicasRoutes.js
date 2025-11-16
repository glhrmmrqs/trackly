import { Router } from "express"
import { buscarMusica, buscarMusicaPorId, criarMusica, alterarMusicaPorId, deletarMusicaPorId } from "../controllers/musicasController.js"
const musicasRouter = Router()

musicasRouter.get("/", buscarMusica)
musicasRouter.get("/:id", buscarMusicaPorId)
musicasRouter.post("/", criarMusica)
musicasRouter.put("/:id", alterarMusicaPorId)
musicasRouter.delete("/:id", deletarMusicaPorId)

export default musicasRouter
