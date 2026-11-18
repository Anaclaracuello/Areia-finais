import mongoose from 'mongoose';

mongoose.set('bufferCommands', false);

export async function connectDatabase() {
  // Banco MongoDB local usado no projeto.
  const uri = 'mongodb://127.0.0.1:27017/quadrascerto';

  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('Banco de dados conectado.');
    return true;
  } catch (error) {
    console.error(`Não foi possível conectar ao banco de dados: ${error.message}`);
    return false;
  }
}

export default mongoose;
