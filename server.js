const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const dns = require('dns');

dns.setServers(["8.8.8.8"]);

dotenv.config();

const app = express();

// Middleware global
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connexion MongoDB réussie !'))
.catch(err => console.error('Erreur MongoDB :', err));

// Importation des routes
const developerRoutes = require("./routes/developerRoutes");

app.use('/api/developers', developerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur actif sur le port ${PORT}`));
