const { ipcRenderer } = require('electron');

const suppliers = [
	{ id: 1, name: "TechNova Components", quality: 88, cost: 48 },
	{ id: 2, name: "Varejo Prime Supply", quality: 72, cost: 32 },
	{ id: 3, name: "Atlas Industrial", quality: 95, cost: 60 },
	{ id: 4, name: "Blue Harbor Imports", quality: 64, cost: 26 }
];

const competitors = [
	{ id: "A", name: "Loja Leste", rating: 3.8, price: 68 },
	{ id: "B", name: "Mega Centro", rating: 4.1, price: 74 },
	{ id: "C", name: "Outlet Sul", rating: 3.4, price: 58 }
];

const gameState = {
	round: 1,
	cash: 12000,
	rating: 3.6,
	reviews: 42,
	price: 70,
	currentSupplier: suppliers[0],
	lastSales: 0,
	marketShare: []
};

function newGame() {
	gameState.round = 1;
	gameState.cash = 12000;
	gameState.rating = 3.6;
	gameState.reviews = 42;
	gameState.price = 70;
	gameState.currentSupplier = suppliers[0];
	gameState.lastSales = 0;
	renderGameScreen();
	updateMarketShare();
}

function loadGame() {
	const mainScreen = document.getElementById("mainScreen");
	mainScreen.innerHTML = `
		<div class="card">
			<h2>Carregar jogo</h2>
			<p class="status-note">Funcionalidade em desenvolvimento.</p>
		</div>
	`;
}

function options() {
	const mainScreen = document.getElementById("mainScreen");
	mainScreen.innerHTML = `
		<div class="card">
			<h2>Opções</h2>
			<p class="status-note">Ajustes de áudio e dificuldade estarão disponíveis em breve.</p>
		</div>
	`;
}

function quit() {
	ipcRenderer.send('quit-app');
}

function credits() {
	const mainScreen = document.getElementById("mainScreen");
	mainScreen.innerHTML = `
		<div class="card">
			<h2>Créditos</h2>
			<p class="status-note">Simulação criada para testar sua estratégia de marketplace.</p>
		</div>
	`;
}

function renderGameScreen() {
	const mainScreen = document.getElementById("mainScreen");
	const supplierCards = suppliers.map((supplier) => `
		<div class="supplier-card">
			<strong>${supplier.name}</strong>
			<span>Qualidade: ${supplier.quality}/100</span>
			<span>Custo por unidade: R$ ${supplier.cost}</span>
			<button onclick="selectSupplier(${supplier.id})">Comprar deste fornecedor</button>
		</div>
	`).join("");

	mainScreen.innerHTML = `
		<div class="game-layout">
			<section class="card">
				<h2 class="panel-title">Seu negócio</h2>
				<div class="stat-grid">
					<div class="stat"><span>Rodada</span><strong id="roundStat">1</strong></div>
					<div class="stat"><span>Caixa</span><strong id="cashStat">R$ 0</strong></div>
					<div class="stat"><span>Avaliação</span><strong id="ratingStat">0.0</strong></div>
					<div class="stat"><span>Avaliações</span><strong id="reviewsStat">0</strong></div>
					<div class="stat"><span>Vendas (última)</span><strong id="salesStat">0</strong></div>
				</div>
				<div class="section-divider"></div>
				<h3 class="panel-title">Fornecedor atual</h3>
				<p id="supplierStat" class="status-note"></p>
				<div class="controls">
					<label for="priceRange">Preço de venda (R$)</label>
					<input id="priceRange" type="range" min="50" max="110" step="1" value="70" oninput="updatePrice(this.value)">
					<strong id="priceStat">R$ 70</strong>
					<button onclick="simulateRound()">Simular rodada</button>
				</div>
			</section>
			<section class="card">
				<h2 class="panel-title">Fornecedores</h2>
				<div class="supplier-list">${supplierCards}</div>
				<div class="section-divider"></div>
				<h2 class="panel-title">Market share</h2>
				<div id="marketShareChart" class="marketshare"></div>
			</section>
		</div>
	`;

	updateStats();
}

function selectSupplier(id) {
	const supplier = suppliers.find((item) => item.id === id);
	if (!supplier) {
		return;
	}
	gameState.currentSupplier = supplier;
	updateStats();
}

function updatePrice(value) {
	gameState.price = Number(value);
	const priceStat = document.getElementById("priceStat");
	if (priceStat) {
		priceStat.textContent = `R$ ${gameState.price}`;
	}
}

function simulateRound() {
	const pricePenalty = Math.max(0.6, 1.2 - gameState.price / 100);
	const qualityScore = gameState.currentSupplier.quality / 100;
	const newRating = Math.max(2.4, Math.min(5, 2.8 + qualityScore * 2));

	const score = calculateStoreScore(gameState.rating, gameState.price);
	const competitorScores = competitors.map((competitor) =>
		calculateStoreScore(competitor.rating, competitor.price)
	);

	const totalScore = score + competitorScores.reduce((sum, item) => sum + item, 0);
	const marketShare = score / totalScore;
	const totalMarket = 950;
	const sales = Math.max(40, Math.round(totalMarket * marketShare * pricePenalty));

	const newReviews = Math.round(sales * 0.18);
	gameState.rating = ((gameState.rating * gameState.reviews) + (newRating * newReviews)) / (gameState.reviews + newReviews);
	gameState.reviews += newReviews;
	gameState.cash += (gameState.price - gameState.currentSupplier.cost) * sales;
	gameState.lastSales = sales;
	gameState.round += 1;

	updateMarketShare();
	updateStats();
}

function calculateStoreScore(rating, price) {
	const ratingWeight = rating * 20;
	const priceWeight = Math.max(0.6, 1.4 - price / 90) * 100;
	return ratingWeight + priceWeight;
}

function updateMarketShare() {
	const playerScore = calculateStoreScore(gameState.rating, gameState.price);
	const competitorScores = competitors.map((competitor) =>
		calculateStoreScore(competitor.rating, competitor.price)
	);
	const totalScore = playerScore + competitorScores.reduce((sum, value) => sum + value, 0);
	const shares = [
		{ name: "Você", value: playerScore / totalScore, type: "player" },
		...competitors.map((competitor, index) => ({
			name: competitor.name,
			value: competitorScores[index] / totalScore,
			type: "competitor"
		}))
	];
	gameState.marketShare = shares;
	renderMarketShare();
}

function renderMarketShare() {
	const chart = document.getElementById("marketShareChart");
	if (!chart) {
		return;
	}
	chart.innerHTML = gameState.marketShare.map((item) => {
		const percent = Math.round(item.value * 100);
		return `
			<div class="market-row">
				<div><strong>${item.name}</strong> <small>${percent}%</small></div>
				<div class="bar">
					<div class="bar-fill ${item.type}" style="width: ${percent}%"></div>
				</div>
			</div>
		`;
	}).join("");
}

function updateStats() {
	const roundStat = document.getElementById("roundStat");
	const cashStat = document.getElementById("cashStat");
	const ratingStat = document.getElementById("ratingStat");
	const reviewsStat = document.getElementById("reviewsStat");
	const salesStat = document.getElementById("salesStat");
	const supplierStat = document.getElementById("supplierStat");

	if (roundStat) {
		roundStat.textContent = gameState.round;
	}
	if (cashStat) {
		cashStat.textContent = `R$ ${gameState.cash.toFixed(0)}`;
	}
	if (ratingStat) {
		ratingStat.textContent = gameState.rating.toFixed(2);
	}
	if (reviewsStat) {
		reviewsStat.textContent = gameState.reviews;
	}
	if (salesStat) {
		salesStat.textContent = gameState.lastSales;
	}
	if (supplierStat) {
		supplierStat.textContent = `${gameState.currentSupplier.name} · Qualidade ${gameState.currentSupplier.quality}/100 · Custo R$ ${gameState.currentSupplier.cost}`;
	}
	updatePrice(gameState.price);
}
