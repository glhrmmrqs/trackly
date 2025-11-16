import Musicas from "../models/musicas.js";

const buscarMusica = async (req, res) => {
    const response = await Musicas.find()
    res.json(response)
}

const buscarMusicaPorId = async (req, res) => {
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
}

const criarMusica = (req, res) => {
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
}

const alterarMusicaPorId = async (req, res) => {
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
}

const deletarMusicaPorId = async (req, res) => {
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
}

export {buscarMusica, buscarMusicaPorId, criarMusica, alterarMusicaPorId, deletarMusicaPorId}