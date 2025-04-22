class Livro {
    constructor() {
      this.livros = [
        {
          id: 1,
          título: "O Senhor dos Anéis",
          autor: "J.R.R. Tolkien",
          ano: 1954
        },
        {
          id: 2,
          título: "Dom Quixote",
          autor: "Miguel de Cervantes",
          ano: 1605
        }
      ];
      this.contadorIds = this.livros.length; 
    }
  
    getAll() {
      return [...this.livros]; 
    }

    add(livroData) {
      if (!livroData.título?.trim()) {
        throw new Error('Título é obrigatório');
      }
  
      if (!livroData.autor?.trim()) {
        throw new Error('Autor é obrigatório');
      }
  
      const novoLivro = {
        id: ++this.contadorIds,
        ...livroData
      };
  
      this.livros.push(novoLivro);
      return novoLivro;
    }
  
    getById(id) {
      const idNum = Number(id);
      const livroEncontrado = this.livros.find(livro => livro.id === idNum);
      
      if (!livroEncontrado) {
        throw new Error('Livro não encontrado');
      }
      
      return livroEncontrado;
    }
}

module.exports = Livro;

  