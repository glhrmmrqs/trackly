import { model, Schema } from "mongoose"

const playlistsSchema = new Schema({
    nome: { type: String, required: true },
    descricao: { type: String, default: "" },
    usuario: { type: Schema.Types.ObjectId, ref: "Usuarios", required: true },
    musicas: [{ type: Schema.Types.ObjectId, ref: "Musicas" }]
})

const Playlists = model('Playlists', playlistsSchema)
export default Playlists