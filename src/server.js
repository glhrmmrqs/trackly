// Importando
import express from "express"
import mongoose from "mongoose"
import playlistsRouter from "./routes/playlistsRoutes.js"
import musicasRouter from "./routes/musicasRoutes.js"
import artistasRouter from "./routes/artistasRoutes.js"
import usuariosRouter from "./routes/usuariosRoutes.js"

// Setando ferramentas
const app = express()
app.use(express.json())

// Setando rotas
app.use("/playlists", playlistsRouter)
app.use("/musicas", musicasRouter)
app.use("/artistas", artistasRouter)
app.use("/usuarios", usuariosRouter)

// Faz a conexão com o MongoDB
mongoose.connect("mongodb://localhost:27017/trackly")
    .then(() => console.log("Conexão bem-sucedida com MongoDB"))
    .catch((err) => console.log("Erro na conexão com MongoDB"))

// Abre o servidor na porta 9999
app.listen(9999, () => {
    console.log("Trackly rodando na porta 9999")
})