import { Schema, model } from "mongoose";

const EquipoSchema = new Schema({
    _id: Schema.Types.ObjectId,
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: String,
        trim: true,
    },
    puntos: {
        type: Number,
        default: 0,
    },
    grupo: {
        type: String,
        trim: true,
    },
    isTest: {
        type: Boolean,
        default: false
    }
});

export const Equipo = model("Equipo", EquipoSchema);