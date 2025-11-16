import { Router } from "express"
import { buscarPlaylist, buscarPlaylistPorId, criarPlaylist, alterarPlaylistPorId, deletarPlaylistPorId } from "../controllers/playlistsController.js"
const playlistsRouter = Router()

playlistsRouter.get("/", buscarPlaylist)
playlistsRouter.get("/:id", buscarPlaylistPorId)
playlistsRouter.post("/", criarPlaylist)
playlistsRouter.put("/:id", alterarPlaylistPorId)
playlistsRouter.delete("/:id", deletarPlaylistPorId)

export default playlistsRouter