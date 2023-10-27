import { Timestamp } from "mongodb";
import { Schema, model } from "mongoose";

const schema = new Schema ({
    title: {
        type: "string",
        required: true
    },
    description: {
        type: "string"
    }
}, {
    timestamps: true
}
);

export default model("Note", schema);
