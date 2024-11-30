import mongoose from 'mongoose';

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Banco de dados conectado!');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
    }
};

export default conectarDB;
