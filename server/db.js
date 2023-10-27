import { connect } from 'mongoose';

export const connectDB = async () => {
    try {
        await connect('mongodb://127.0.0.1:27017/app-mensajes')
        console.log('Connect to DB')
    } catch (error) {
        console.error(error)
    }

    
}