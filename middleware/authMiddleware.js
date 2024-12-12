const jwt = require('jsonwebtoken');
const Developer = require('../models/developer');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      console.log('Decoded token:', decoded);

      // Ajoute l'ID extrait manuellement dans req.userId
      req.userId = decoded.id;
      return next();
    } catch (error) {
      console.error('Token error:', error.message);
      return res.status(401).json({ message: 'Token invalide ou expiré.' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Token non trouvé.' });
  }
};

module.exports = { protect };
