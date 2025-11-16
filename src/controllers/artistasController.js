import Artistas from "../models/artistas.js";

const buscarArtista = async (req, res) => {
    const response = await Artistas.find()
    res.json(response)
}

const buscarArtistaPorId = async (req, res) => {
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
}

const criarArtista = (req, res) => {
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
}

const alterarArtistaPorId = async (req, res) => {
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
}

const deletarArtistaPorId = async (req, res) => {
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
}

export {buscarArtista, buscarArtistaPorId, criarArtista, alterarArtistaPorId, deletarArtistaPorId}