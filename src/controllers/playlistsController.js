import Playlists from "../models/playlists.js";
import Usuarios from "../models/usuarios.js";

const buscarPlaylist = async (req, res) => {
    const response = await Playlists.find()
    res.json(response)
}

const buscarPlaylistPorId = async (req, res) => {
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
}

const criarPlaylist = async (req, res) => {
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
}

const alterarPlaylistPorId = async (req, res) => {
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
}

const deletarPlaylistPorId = async (req, res) => {
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
}

export {buscarPlaylist, buscarPlaylistPorId, criarPlaylist, alterarPlaylistPorId, deletarPlaylistPorId}