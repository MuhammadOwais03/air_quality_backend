import mongoose from 'mongoose';
import bcrypt from 'bcrypt';


const { Schema } = mongoose;

const tempschema = new Schema ({

   temperature: {
        type: Number,
        required: true,
    },
    humidity: {
        type: Number,
        required: true,
    },
}, { timestamps: true });



const Temp = mongoose.model('Temp', tempschema);

export default Temp;