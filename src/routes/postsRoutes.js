import express from "express"; // Importa o framework Express para criar a aplicação web
import multer from "multer"; // Importa o Multer para lidar com o upload de arquivos
import { listarPosts, postarNovoPost, uploadImagem,atualizarNovoPost } from "../controllers/postsController.js"; // Importa as funções controladoras para lidar com a lógica dos posts
import cors from "cors";

const corsOptions = {
  origin:"http://localhost:8000", 
  optionsSuccessStatus: 200
}
// Configura as opções de armazenamento do Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) { // Define o diretório de destino para os arquivos carregados
    cb(null, 'uploads/'); // Define a pasta "uploads" como destino
  },
  filename: function (req, file, cb) { // Define o nome do arquivo
    cb(null, file.originalname); // Usa o nome original do arquivo
  }
});

// Cria uma instância do Multer com as configurações de armazenamento
const upload = multer({ dest: "./uploads", storage });

// Define as rotas da aplicação
const routes = (app) => {
  // Habilita o parsing de JSON para lidar com corpos de requisições em formato JSON
  app.use(express.json());
app.use(cors(corsOptions))
  // Rota GET para listar todos os posts
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post
  
  
  app.post("/posts", postarNovoPost);

 // Rota para upload de imagens (assumindo uma única imagem chamada"imagem") 
 app.post("/upload", upload.single("imagem"), uploadImagem);
  
  app.put("/upload/:id" , atualizarNovoPost)
};

export default routes; // Exporta a função de rotas para ser utilizada na aplicação principal