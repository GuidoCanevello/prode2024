import { Schema, model } from "mongoose";

const ChatMessageSchema = new Schema({
    _id: Schema.Types.ObjectId,
    usuarioId: {
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now()
    },
    texto: {
        type: String,
        required: true,
        trim: true,
    },
    isEliminado: {
        type: Boolean,
        default: false
    },
    isTest: {
        type: Boolean,
        default: false
    }
});

export const ChatMessage = model("ChatMessage", ChatMessageSchema);