import express from "express"
import mongoose from "mongoose"
const app = express()
app.use(express.json())

app.get("", (req, res) => {
    res.end("Homepage")
})

// Faz a conexão com o MongoDB
mongoose.connect("mongodb://localhost:27017/trackly")
    .then(() => console.log("Conexão bem-sucedida com MongoDB"))
    .catch((err) => console.log("Erro na conexão com MongoDB"))

// Abre o servidor na porta 9999
app.listen(9999, () => {
    console.log("Trackly rodando na porta 9999")
})