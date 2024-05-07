import { Schema, model } from "mongoose";

const JugadorSchema = new Schema({
    _id: Schema.Types.ObjectId,
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    posicion: {
        type: String,
        trim: true,
    },
    numero: {
        type: Number,
        default: 0,
    },
    linkfoto: {
        type: String,
        trim: true,
    },
    esMejorJugador: {
        type: Boolean,
        default: false,
    },
    esMejorArquero: {
        type: Boolean,
        default: false,
    },
    esMejorGoleador: {
        type: Boolean,
        default: false,
    },
    equipo: { type: Schema.Types.ObjectId, ref: 'Equipo' },
});

export const Jugador = model("Jugador", JugadorSchema);