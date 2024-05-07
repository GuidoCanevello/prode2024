import { Schema, model } from "mongoose";

const RefreshTokenSchema = new Schema({
    _id: Schema.Types.ObjectId,
    refreshToken: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});

export const RefreshToken = model("RefreshToken", RefreshTokenSchema);
