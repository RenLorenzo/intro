const API_KEY = "coinranking883821107895a2a64c0917f4bbe83ff22c8753a9c4a9294d";
const baseUrl = "https://api.coinranking.com/v2";

const solanaCoinUUIDs = [
  "Qwsogvtv82FCd", // Bitcoin (ref)
  "zNZHO_Sjf",     // Solana
  "WcwrkfNI4FUAe", // Serum
  "uW2tk-1_8",     // Raydium
  "eOs9A6nwo",     // Star Atlas
  "9K7TnBaA6",     // Audius
  "TVgBoj7NXB",    // Orca
  "4CO8XEbs4",     // Step Finance
  "yfv9xJKp3",     // Bonfida
  "66OXxvAYh"      // Saber
];

let solanaCoins = [];
let chart;

async function fetchCoin(uuid) {
  try {
    const res = await fetch(`${baseUrl}/coin/${uuid}`, {
      headers: { "x-access-token": API_KEY }
    });
    const data = await res.json();
    if (!data.status || data.status !== "success") throw new Error("API error");
    return data.data.coin;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function fetchCoinsByUUIDs() {
  try {
    const promises = solanaCoinUUIDs.map(uuid => fetchCoin(uuid));
    solanaCoins = (await Promise.all(promises)).filter(Boolean);

    const dropdown = document.getElementById("coinSelect");
    dropdown.innerHTML = "";
    solanaCoins.forEach(coin => {
      const opt = document.createElement("option");
      opt.value = coin.uuid;
      opt.textContent = `${coin.name} (${coin.symbol})`;
      dropdown.appendChild(opt);
    });

    populateLeaderboard();
  } catch (e) {
    document.getElementById("coinData").textContent = "Failed to load coins.";
  }
}

function populateLeaderboard() {
  const tbody = document.getElementById("leaderboard");
  tbody.innerHTML = "";
  solanaCoins.forEach((coin, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${i + 1}</td>
      <td>${coin.name}</td>
      <td>$${Number(coin.price).toFixed(4)}</td>
      <td>$${Number(coin.marketCap).toLocaleString()}</td>
    `;
    tbody.appendChild(row);
  });
}

async function fetchCoinHistory(uuid) {
  try {
    const res = await fetch(`${baseUrl}/coin/${uuid}/history?timePeriod=7d`, {
      headers: { "x-access-token": API_KEY }
    });
    const data = await res.json();
    if (!data.status || data.status !== "success") throw new Error("API error");
    return data.data.history;
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function trackSelectedCoin() {
  const uuid = document.getElementById("coinSelect").value;
  const coin = solanaCoins.find(c => c.uuid === uuid);
  const display = document.getElementById("coinData");

  if (!coin) {
    display.textContent = "Coin not found.";
    return;
  }

  display.innerHTML = `
    🔍 <b>${coin.name}</b><br>
    💲 Price: $${Number(coin.price).toFixed(4)}<br>
    🧢 Market Cap: $${Number(coin.marketCap).toLocaleString()}<br>
    📈 Rank: #${coin.rank}
  `;

  const history = await fetchCoinHistory(uuid);
  if (!history) {
    display.innerHTML += "<br>⚠️ Price history not available.";
    if (chart) chart.destroy();
    return;
  }

  const labels = history.map(h => new Date(h.timestamp).toLocaleDateString(undefined, { month: "short", day: "numeric" }));
  const prices = history.map(h => Number(h.price));

  if (chart) chart.destroy();

  const ctx = document.getElementById("priceChart").getContext("2d");
  chart = new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: `${coin.symbol} Price (7 days)`,
        data: prices,
        fill: true,
        borderColor: "#2c6e49",
        backgroundColor: "rgba(44,110,73,0.2)",
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 6,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: { labels: { color: "#2c6e49", font: { weight: "600", size: 14 } } },
        tooltip: { mode: "index", intersect: false },
      },
      scales: {
        x: {
          ticks: { color: "#375e3b", font: { size: 12 } },
          grid: { display: false },
        },
        y: {
          ticks: { color: "#375e3b", font: { size: 12 } },
          grid: { color: "rgba(44,110,73,0.2)" },
        },
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchCoinsByUUIDs();
  document.getElementById("trackBtn").addEventListener("click", trackSelectedCoin);
});
const chartCanvas = document.getElementById('priceChart');

function updateChartData(newLabels, newData) {
 
  chartCanvas.classList.add('chart-fade');
  chartCanvas.classList.remove('chart-visible');

  setTimeout(() => {
    
    priceChart.data.labels = newLabels;
    priceChart.data.datasets[0].data = newData;
    priceChart.update();


    chartCanvas.classList.remove('chart-fade');
    chartCanvas.classList.add('chart-visible');
  }, 500);  
}

chartCanvas.classList.add('chart-visible');
