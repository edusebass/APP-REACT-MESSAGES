
import { Schema, model } from "mongoose";

const schema = new Schema ({
    msg: {
        type: "string"
    },
    nombre: {
        type: "string"
    },
    fecha: {
        type: "string"
    }
}, {
    timestamps: true
}
);

// schema.pre("save", function(next) {
//     const currentDate = new Date();
//     // Formatea la fecha en el formato local
//     const options = { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"};
//     this.fecha = new Intl.DateTimeFormat(undefined, options).format(currentDate);
//     next();
// });

export default model("Note", schema);
