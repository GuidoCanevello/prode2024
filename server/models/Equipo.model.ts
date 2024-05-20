import { Schema, model } from "mongoose";

// TODO agregar a todos los schema un att "isTest: boolean" que me permita separar datos de test de los datos reales y poder manejarme tranquilo

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
});

export const Equipo = model("Equipo", EquipoSchema);