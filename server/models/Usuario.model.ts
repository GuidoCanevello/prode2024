import { Schema, model } from "mongoose";

const prediccionSchema = new Schema({
    _id: Schema.Types.ObjectId,
    golesEquipo1: {
        type: Number,
        required: true
    },
    golesEquipo2: {
        type: Number,
        required: true
    },
    puntos: {
        type: Number,
        default: 0,
    },
    partidoId: { required: true, type: Schema.Types.ObjectId, ref: 'Partido' },
})

const UsuarioSchema = new Schema({
    _id: Schema.Types.ObjectId,
    nombreCuenta: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    nombreJugador: {
        type: String,
        trim: true,
    },
    puntos: {
        type: Number,
        default: 0,
    },
    dateAdded: {
        type: Date,
        default: Date.now()
    },
    imagenSrc: {
        type: String,
        trim: true,
    },
    predicciones: [prediccionSchema],
    prediccionMejorJugador: {
        type: Schema.Types.ObjectId, ref: 'Jugador'
    },
    prediccionMejorArquero: {
        type: Schema.Types.ObjectId, ref: 'Jugador'
    },
    prediccionMejorGoleador: {
        type: Schema.Types.ObjectId, ref: 'Jugador'
    },
    isTest: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export const Usuario = model("Usuario", UsuarioSchema);
