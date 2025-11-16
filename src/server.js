// Setando ferramentas
import express from "express"
import mongoose from "mongoose"
const app = express()
app.use(express.json())

// Importando models
import Artistas from "./models/artistas.js"
import Musicas from "./models/musicas.js"
import Playlists from "./models/playlists.js"
import Usuarios from "./models/usuarios.js"

// Setando rotas
app.get("", (req, res) => {
    res.end("Homepage")
})

// USUÁRIOS
app.get("/usuarios", async (req, res) => {
    const response = await Usuarios.find()
    res.json(response)
})
app.get("/usuarios/:id", async (req, res) => {
    const {id} = req.params
    try {
        const usuario = await Usuarios.findById(id)
        if (!usuario) {
            res.status(404).send("Usuário não encontrado.")
            return
        } else {
            res.json(usuario)
        }
    } catch (err) {
        res.status(422).send("ID de usuário inválido.")
    }
})
app.post("/usuarios", (req, res) => {
    const { nome, email, playlists } = req.body
    if (!nome || !email) {
        res.status(422).json({
            erro: true,
            mensagem: "Dados inválidos."
        })
        return
    }
    const usuario = new Usuarios({
        nome, email, playlists
    })
    usuario.save().then(
        () => res.status(201).json({
            erro: false,
            mensagem: "Usuário criado com sucesso.",
            usuario: usuario
        })
    ).catch(err => {
        res.status(422).json({
            erro: true,
            mensagem: "Dados inválidos."
        })
    })
})
app.put("/usuarios/:id", async (req, res) => {
    const {id} = req.params
    const { nome, email } = req.body
    if (!nome || !email) {
        res.status(422).send("Dados inválidos.")
        return
    }
    const response = await Usuarios.findByIdAndUpdate(id, req.body)
    if (response) {
        res.send("Sucesso. Update realizado.")
    } else {
        res.send("Erro. Update não realizado.")
    }
})
app.delete("/usuarios/:id", async (req, res) => {
    const {id} = req.params
    try {
        const usuario = await Usuarios.findByIdAndDelete(id)
        if (!usuario) {
            res.status(404).send("Usuário não encontrado.")
            return
        } else {
            res.send("Usuário deletado com sucesso.")
        }
    } catch (err) {
        res.status(422).send("ID de usuário inválido.")
    }
})

// ARTISTAS
app.get("/artistas", async (req, res) => {
    const response = await Artistas.find()
    res.json(response)
})
app.get("/artistas/:id", async (req, res) => {
    const {id} = req.params
    try {
        const artista = await Artistas.findById(id)
        if (!artista) {
            res.status(404).send("Artista não encontrado.")
            return
        } else {
            res.json(artista)
        }
    } catch (err) {
        res.status(422).send("ID de artista inválido.")
    }
})
app.post("/artistas", (req, res) => {
    const { nome, spotifyUrl } = req.body
    if (!nome || !spotifyUrl) {
        res.status(422).json({
            erro: true,
            mensagem: "Dados inválidos."
        })
        return
    }
    const artista = new Artistas({
        nome, spotifyUrl
    })
    artista.save().then(
        () => res.status(201).json({
            erro: false,
            mensagem: "Artista criado com sucesso.",
            artista: artista
        })
    ).catch(err => {
        res.status(422).json({
            erro: true,
            mensagem: "Dados inválidos."
        })
    })
})
app.put("/artistas/:id", async (req, res) => {
    const {id} = req.params
    const {nome} = req.body
    if (!nome) {
        res.status(422).send("Dados inválidos.")
        return
    }
    const response = await Artistas.findByIdAndUpdate(id, {nome})
    if (response) {
        res.send("Sucesso. Update realizado.")
    } else {
        res.send("Erro. Update não realizado.")
    }
})
app.delete("/artistas/:id", async (req, res) => {
    const {id} = req.params
    try {
        const artista = await Artistas.findByIdAndDelete(id)
        if (!artista) {
            res.status(404).send("Artista não encontrado.")
            return
        } else {
            res.send("Artista deletado com sucesso.")
        }
    } catch (err) {
        res.status(400).send("ID de artista inválido.")
    }
})

// MÚSICAS
app.get("/musicas", async (req, res) => {
    const response = await Musicas.find()
    res.json(response)
})
app.get("/musicas/:id", async (req, res) => {
    const {id} = req.params
    try {
        const musica = await Musicas.findById(id)
        if (!musica) {
            res.status(404).send("Música não encontrada.")
            return
        } else {
            res.json(musica)
        }
    } catch (err) {
        res.status(422).send("ID de música inválido.")
    }
})
app.post("/musicas", (req, res) => {
    const { titulo, artistas, spotifyUrl } = req.body
    if (!titulo || !artistas || !spotifyUrl) {
        res.status(422).json({
            erro: true,
            mensagem: "Dados inválidos."
        })
        return
    }
    const musica = new Musicas({
        titulo, artistas, spotifyUrl
    })
    musica.save().then(
        () => res.status(201).json({
            erro: false,
            mensagem: "Música criada com sucesso.",
            musica: musica
        })
    ).catch(err => {
        res.status(422).json({
            erro: true,
            mensagem: "Dados inválidos."
        })
    })
})
app.put("/musicas/:id", async (req, res) => {
    const {id} = req.params
    const { titulo, artistas } = req.body
    if (!titulo || !artistas) {
        res.status(422).send("Dados inválidos.")
        return
    }
    const response = await Musicas.findByIdAndUpdate(id, req.body)
    if (response) {
        res.send("Sucesso. Update realizado.")
    } else {
        res.send("Erro. Update não realizado.")
    }
})
app.delete("/musicas/:id", async (req, res) => {
    const {id} = req.params
    try {
        const musica = await Musicas.findByIdAndDelete(id)
        if (!musica) {
            res.status(404).send("Música não encontrada.")
            return
        } else {
            res.send("Música deletada com sucesso.")
        }
    } catch (err) {
        res.status(422).send("ID de música inválido.")
    }
})

// PLAYLISTS
app.get("/playlists", async (req, res) => {
    const response = await Playlists.find()
    res.json(response)
})
app.get("/playlists/:id", async (req, res) => {
    const {id} = req.params
    try {
        const playlist = await Playlists.findById(id)
        if (!playlist) {
            res.status(404).send("Playlist não encontrada.")
            return
        } else {
            res.json(playlist)
        }
    } catch (err) {
        res.status(422).send("ID de playlist inválido.")
    }
})
app.post("/playlists", async (req, res) => {
    const { nome, descricao, usuario, musicas } = req.body
    if (!nome || !usuario) {
        res.status(422).json({
            erro: true,
            mensagem: "Dados inválidos."
        })
        return
    }
    const playlist = new Playlists({
        nome, descricao, usuario, musicas
    })
    playlist.save().then(
        () => res.status(201).json({
            erro: false,
            mensagem: "Playlist criada com sucesso.",
        })
    ).catch(err => {
        res.status(422).json({
            erro: true,
            mensagem: "Dados inválidos."
        })
    })
    try {
        await Usuarios.findByIdAndUpdate(
            usuario,
            { $addToSet: { playlists: playlist._id } },
            { new: true }
        )
    }catch (err) {
        res.status(422).json({
            erro: true,
            mensagem: "Erro ao criar playlist."
        })
    }
})
app.put("/playlists/:id", async (req, res) => {
    const { id } = req.params;
    const { musicas } = req.body;

    try {
        const response = await Playlists.findByIdAndUpdate(
            id,
            { $addToSet: { musicas: { $each: musicas } } },
            { new: true }
        );

        if (!response) {
            return res.status(404).send("Playlist não encontrada.");
        }

        res.send("Sucesso. Música adicionada.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erro ao adicionar música.");
    }
})
app.delete("/playlists/:id", async (req, res) => {
    const {id} = req.params
    try {
        const playlist = await Playlists.findByIdAndDelete(id)
        if (!playlist) {
            res.status(404).send("Playlist não encontrada.")
            return
        } else {
            res.send("Playlist deletada com sucesso.")
        }
    } catch (err) {
        res.status(422).send("ID de playlist inválido.")
    }
})

// Faz a conexão com o MongoDB
mongoose.connect("mongodb://localhost:27017/trackly")
    .then(() => console.log("Conexão bem-sucedida com MongoDB"))
    .catch((err) => console.log("Erro na conexão com MongoDB"))

// Abre o servidor na porta 9999
app.listen(9999, () => {
    console.log("Trackly rodando na porta 9999")
})