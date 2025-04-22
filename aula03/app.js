const express = require('express');
const app = express();
const livrosRoutes = require('./Routes/Routes');


app.use(express.json()); 

app.use('/livros', livrosRoutes);

app.get('/', (req, res) => {
  res.send('API de Livros rodando!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
