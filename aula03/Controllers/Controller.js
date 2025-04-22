const LivroModel = require('../Models/Livro');

class LivroController {
  constructor() {
    this.model = new LivroModel();
  }

  async getAll(req, res) {
    try {
      const livros = this.model.getAll();
      res.status(200).json(livros);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  async add(req, res) {
    try {
      const novoLivro = this.model.add(req.body);
      res.status(201).json(novoLivro);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const livro = this.model.getById(req.params.id);
      res.status(200).json(livro);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = LivroController;