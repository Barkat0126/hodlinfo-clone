// async function loadCryptoData() {
//     try {
//       const response = await fetch('/api/crypto');
//       const data = await response.json();
      
//       const cryptoList = document.getElementById('crypto-list');
//       cryptoList.innerHTML = ''; // Clear any existing data
  
//       data.forEach(crypto => {
//         const item = document.createElement('div');
//         item.className = 'crypto-item';
//         item.innerHTML = `
//           <h3>${crypto.name.toUpperCase()}</h3>
//           <p>Last Price: ₹${crypto.last}</p>
//           <p>Buy Price: ₹${crypto.buy}</p>
//           <p>Sell Price: ₹${crypto.sell}</p>
//           <p>Volume: ${crypto.volume}</p>
//         `;
//         cryptoList.appendChild(item);
//       });
//     } catch (error) {
//       console.error('Error fetching crypto data:', error);
//     }
//   }
  
//   loadCryptoData();


// async function fetchCryptoData() {
//   const response = await fetch('/api/crypto');
//   const data = await response.json();
  
//   const cryptoTable = document.getElementById('cryptoTable');
//   cryptoTable.innerHTML = data.map((crypto, index) => `
//     <tr>
//       <td>${index + 1}</td>
//       <td>${crypto.name}</td>
//       <td>₹ ${crypto.last}</td>
//       <td>₹ ${crypto.buy} / ₹ ${crypto.sell}</td>
//       <td>${crypto.volume}</td>
//       <td>${crypto.base_unit}</td>
//     </tr>
//   `).join('');
// }

// document.addEventListener('DOMContentLoaded', fetchCryptoData);
document.addEventListener("DOMContentLoaded", () => {
  // API URL and parameters
  const apiURL = "https://api.coingecko.com/api/v3/coins/markets";
  const params = "?vs_currency=inr&order=market_cap_desc&per_page=10&page=1&sparkline=false";

  function fetchCryptoData() {
    fetch(apiURL + params)
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById("crypto-table");
        tableBody.innerHTML = "";

        data.forEach((coin, index) => {
          const isPriceUp = coin.price_change_percentage_24h >= 0;
          const colorClass = isPriceUp ? 'positive' : 'negative';
          const arrow = isPriceUp ? '▲' : '▼';

          // Calculate the difference and savings
          const priceDifference = coin.price_change_percentage_24h.toFixed(2);
          const savingsValue = Math.abs((coin.current_price - coin.low_24h).toFixed(2));

          // Create a row for each coin
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>
              <img src="${coin.image}" alt="${coin.name}" width="20" height="20"> ${coin.name}
            </td>
            <td>₹ ${coin.current_price.toLocaleString()}</td>
            <td>₹ ${coin.high_24h.toLocaleString()} / ₹ ${coin.low_24h.toLocaleString()}</td>
            <td class="${colorClass}">
              ${arrow} ${priceDifference}%
            </td>
            <td class="${colorClass}">
              ${arrow} ₹ ${savingsValue}
            </td>
          `;
          tableBody.appendChild(row);
        });

        // Update the best price and percentages for other sections if needed
        document.getElementById("best-price").innerText = `₹ ${data[0].current_price.toLocaleString()}`;
        document.getElementById("price-change-5min").innerText = `${(data[0].price_change_percentage_24h / 48).toFixed(2)} %`;
        document.getElementById("price-change-1hour").innerText = `${(data[0].price_change_percentage_24h / 24).toFixed(2)} %`;
        document.getElementById("price-change-1day").innerText = `${data[0].price_change_percentage_24h.toFixed(2)} %`;
        document.getElementById("price-change-7days").innerText = `${(data[0].price_change_percentage_24h * 7 / 24).toFixed(2)} %`;
      })
      .catch(error => console.error("Error fetching data:", error));
  }

  // Fetch data initially
  fetchCryptoData();

  // Refresh data every minute (60 seconds)
  setInterval(fetchCryptoData, 60000);
});
