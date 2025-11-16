import { model, Schema } from "mongoose"

const artistasSchema = new Schema({
    nome: { type: String, required: true, unique: true },
    spotifyUrl: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (url) {
                const regex = /^https:\/\/open\.spotify\.com\/artist\/[A-Za-z0-9]+$/
                return regex.test(url)
            },
            message: url => `${url.value} não é uma URL válida!`
        }
    }
})

const Artistas = model('Artistas', artistasSchema)
export default Artistas