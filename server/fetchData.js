const axios = require('axios');
const Crypto = require('./models/Crypto');
const connectDB = require('./config/db');

connectDB();

async function fetchDataAndStore() {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const data = Object.values(response.data).slice(0, 10);

    await Crypto.deleteMany({}); // Clear existing data

    for (const item of data) {
      const cryptoData = new Crypto({
        name: item.name,
        last: item.last,
        buy: item.buy,
        sell: item.sell,
        volume: item.volume,
        base_unit: item.base_unit,
      });
      await cryptoData.save();
    }

    console.log('Data fetched and stored successfully');
  } catch (error) {
    console.error('Error fetching or storing data:', error);
  }
}

fetchDataAndStore();
