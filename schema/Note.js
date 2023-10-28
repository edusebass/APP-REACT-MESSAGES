
import { Schema, model } from "mongoose";

const schema = new Schema ({
    msg: {
        type: "string"
    }
}, {
    timestamps: true
}
);

export default model("Note", schema);
