import { model, Schema } from "mongoose"

const musicasSchema = new Schema({
    titulo: { type: String, required: true },
    artistas: [{ type: Schema.Types.ObjectId, ref: 'Artistas', required: true }],
    spotifyUrl: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (url) {
                const regex = /^https:\/\/open\.spotify\.com\/track\/[A-Za-z0-9]+(\?.*)?$/
                return regex.test(url)
            },
            message: url => `${url.value} não é uma URL válida!`
        }
    }  
})

const Musicas = model('Musicas', musicasSchema)
export default Musicas