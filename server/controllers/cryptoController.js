const Crypto = require('../models/crypto');

exports.getCryptoData = async (req, res) => {
  try {
    const data = await Crypto.find().limit(10);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error retrieving data');
  }
};
