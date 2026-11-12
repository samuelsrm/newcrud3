const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Substitua 'public' pelo nome da pasta onde está o seu index.html
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});