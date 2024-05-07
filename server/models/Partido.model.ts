import { Schema, model } from "mongoose";

const PartidoSchema = new Schema({
    _id: Schema.Types.ObjectId,
    equipo1: { type: Schema.Types.ObjectId, ref: 'Equipo' },
    equipo2: { type: Schema.Types.ObjectId, ref: 'Equipo' },
    golesEquipo1: {
        type: Number,
    },
    golesEquipo2: {
        type: Number,
    },
    penalesEquipo1: {
        type: Number,
    },
    penalesEquipo2: {
        type: Number,
    },
    grupo: {
        type: String,
        trim: true,
    },
    fecha: {
        type: Date,
    },
    seRealizo: {
        type: Boolean,
        default: false,
    },
    esEliminatoria: {
        type: Boolean,
        default: false,
    },
    tipoEliminatoria: {
        type: String,
        default: null,
    },
    identificadorEliminatorias: {
        type: String,
        default: null,
    },
    partidoEquipo1: {
        type: Schema.Types.ObjectId,
        ref: 'Partido',
    },
    partidoEquipo2: {
        type: Schema.Types.ObjectId,
        ref: 'Partido',
    },
});

export const Partido = model("Partido", PartidoSchema);
