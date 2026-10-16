const express = require("express");
const cors = require("cors");

const produtoRoutes = require("./routes/produtoRoutes");
const usuarioRoutes = require("./routes/usuarioRoutes");
const armazemRoutes = require("./routes/armazemRoutes");
const movimentacaoRoutes = require("./routes/movimentacaoRoutes");
const entregaRoutes = require("./routes/entregaRoutes");
const rastreamentoRoutes = require("./routes/rastreamentoRoutes");
const transportadoraRoutes = require("./routes/transportadoraRoutes");
const veiculoRoutes = require("./routes/veiculoRoutes");

const app = express();

app.use(express.json());
app.use(cors());

// Todas as rotas ficam sob /api (na Vercel, o front fica em "/" e a API em "/api")
const api = express.Router();

api.use("/produtos", produtoRoutes);
api.use("/usuarios", usuarioRoutes);
api.use("/armazens", armazemRoutes);
api.use("/movimentacoes", movimentacaoRoutes);
api.use("/entregas", entregaRoutes);
api.use("/rastreamento", rastreamentoRoutes);
api.use("/transportadoras", transportadoraRoutes);
api.use("/veiculos", veiculoRoutes);

api.get("/", (req, res) => {
    res.json({ mensagem: "Sistema de Logística funcionando!" });
});

app.use("/api", api);

module.exports = app;
