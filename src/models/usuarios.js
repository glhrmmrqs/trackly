import { model, Schema } from "mongoose"

const usuariosSchema = new Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlists' }]
})

const Usuarios = model('Usuarios', usuariosSchema)
export default Usuarios