import { Router } from "express"
import { buscarArtista, buscarArtistaPorId, criarArtista, alterarArtistaPorId, deletarArtistaPorId } from "../controllers/artistasController.js"
const artistasRouter = Router()

artistasRouter.get("/", buscarArtista)
artistasRouter.get("/:id", buscarArtistaPorId)
artistasRouter.post("/", criarArtista)
artistasRouter.put("/:id", alterarArtistaPorId)
artistasRouter.delete("/:id", deletarArtistaPorId)

export default artistasRouter