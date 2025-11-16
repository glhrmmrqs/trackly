import Usuarios from "../models/usuarios.js";

const buscarUsuario = async (req, res) => {
    const response = await Usuarios.find()
    res.json(response)
}

const buscarUsuarioPorId = async (req, res) => {
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
}

const criarUsuario = (req, res) => {
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
}

const alterarUsuarioPorId = async (req, res) => {
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
}

const deletarUsuarioPorId = async (req, res) => {
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
}

export {buscarUsuario, buscarUsuarioPorId, criarUsuario, alterarUsuarioPorId, deletarUsuarioPorId}