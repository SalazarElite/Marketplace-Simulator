const { ipcRenderer } = require('electron');

const suppliers = [
	{
		id: 1,
		name: "TechNova Components",
		baseQuality: 88,
		baseCost: 48,
		products: [
			{ id: "tn-1", name: "Smartwatch Pulse", baseCost: 120, baseQuality: 86 },
			{ id: "tn-2", name: "Fone Aéreo", baseCost: 72, baseQuality: 90 },
			{ id: "tn-3", name: "Carregador Flux", baseCost: 35, baseQuality: 80 }
		]
	},
	{
		id: 2,
		name: "Varejo Prime Supply",
		baseQuality: 72,
		baseCost: 32,
		products: [
			{ id: "vp-1", name: "Caixa Aurora", baseCost: 60, baseQuality: 70 },
			{ id: "vp-2", name: "Hub Íris", baseCost: 40, baseQuality: 66 },
			{ id: "vp-3", name: "Mouse Prisma", baseCost: 25, baseQuality: 68 }
		]
	},
	{
		id: 3,
		name: "Atlas Industrial",
		baseQuality: 95,
		baseCost: 60,
		products: [
			{ id: "at-1", name: "Notebook Zenith", baseCost: 420, baseQuality: 96 },
			{ id: "at-2", name: "Monitor Orion", baseCost: 210, baseQuality: 93 },
			{ id: "at-3", name: "Teclado Apex", baseCost: 75, baseQuality: 92 }
		]
	},
	{
		id: 4,
		name: "Blue Harbor Imports",
		baseQuality: 64,
		baseCost: 26,
		products: [
			{ id: "bh-1", name: "Câmera Vela", baseCost: 88, baseQuality: 62 },
			{ id: "bh-2", name: "Powerbank Tide", baseCost: 30, baseQuality: 58 },
			{ id: "bh-3", name: "Suporte Maré", baseCost: 18, baseQuality: 60 }
		]
	}
];

const competitors = [
	{ id: "A", name: "Loja Leste", rating: 3.8, price: 68, visibility: 0.6 },
	{ id: "B", name: "Mega Centro", rating: 4.1, price: 74, visibility: 0.7 },
	{ id: "C", name: "Outlet Sul", rating: 3.4, price: 58, visibility: 0.5 }
];

const gameState = {
	companyName: "",
	cash: 12000,
	rating: 0,
	reviews: 0,
	visibility: 0.35,
	autoSaveMinutes: 5,
	currentSupplierId: suppliers[0].id,
	inventory: {},
	marketShare: [],
	salesHistory: 0,
	refundsHistory: 0,
	loopId: null,
	autoSaveId: null,
	twitterFeed: [],
	language: "pt-BR",
	resolution: "1280x720",
	fullscreen: false
};

const randomBetween = (min, max) => Math.random() * (max - min) + min;

function newGame() {
	const company = window.prompt("Qual o nome da sua empresa?");
	if (!company) {
		return;
	}
	resetGameState(company);
	renderGameScreen();
	startGameLoop();
	startAutoSave();
}

function resetGameState(company) {
	gameState.companyName = company.trim();
	gameState.cash = 12000;
	gameState.rating = 0;
	gameState.reviews = 0;
	gameState.visibility = 0.35;
	gameState.currentSupplierId = suppliers[0].id;
	gameState.inventory = {};
	gameState.salesHistory = 0;
	gameState.refundsHistory = 0;
	gameState.twitterFeed = [
		"@cliente_curioso: Nova loja na área, vamos ver como se sai!",
		"@avaliador: Gosto de lojas com bom preço e entrega rápida."
	];
	gameState.marketShare = [];
	updateMarketShare();
}

function loadGame() {
	const name = window.prompt("Nome da empresa para carregar?");
	if (!name) {
		return;
	}
	const data = localStorage.getItem(getSaveKey(name));
	if (!data) {
		alert("Save não encontrado.");
		return;
	}
	Object.assign(gameState, JSON.parse(data));
	renderGameScreen();
	startGameLoop();
	startAutoSave();
}

function options() {
	renderOptionsScreen();
}

function quit() {
	ipcRenderer.send('quit-app');
}

function credits() {
	renderCreditsScreen();
}

function backToMenu() {
	stopGameLoop();
	renderMainMenu();
}

function renderMainMenu() {
	const mainScreen = document.getElementById("mainScreen");
	mainScreen.innerHTML = `
		<div id="mainMenu" class="card">
			<h2>Menu principal</h2>
			<p>Comece uma nova simulação e veja como suas escolhas impactam o market share.</p>
			<div class="menu-actions">
				<button onclick="newGame()">Novo Jogo</button>
				<button onclick="loadGame()">Carregar Jogo</button>
			</div>
		</div>
	`;
}

function renderOptionsScreen() {
	const mainScreen = document.getElementById("mainScreen");
	mainScreen.innerHTML = `
		<div class="card">
			<div class="card-header">
				<h2>Opções</h2>
				<button class="secondary" onclick="backToMenu()">Voltar ao menu</button>
			</div>
			<div class="option-grid">
				<label>
					<span>Resolução</span>
					<select id="resolutionSelect" onchange="updateResolution(this.value)">
						<option value="1280x720">1280x720</option>
						<option value="1440x900">1440x900</option>
						<option value="1920x1080">1920x1080</option>
					</select>
				</label>
				<label>
					<span>Modo tela cheia</span>
					<input id="fullscreenToggle" type="checkbox" onchange="toggleFullscreen(this.checked)">
				</label>
				<label>
					<span>Idioma</span>
					<select id="languageSelect" onchange="updateLanguage(this.value)">
						<option value="pt-BR">Português (BR)</option>
						<option value="en-US">English</option>
						<option value="es-ES">Español</option>
					</select>
				</label>
				<label>
					<span>Auto-save (minutos)</span>
					<input id="autosaveInput" type="number" min="1" max="30" value="${gameState.autoSaveMinutes}" onchange="updateAutoSave(this.value)">
				</label>
			</div>
		</div>
	`;
	const resolutionSelect = document.getElementById("resolutionSelect");
	const languageSelect = document.getElementById("languageSelect");
	const fullscreenToggle = document.getElementById("fullscreenToggle");
	if (resolutionSelect) {
		resolutionSelect.value = gameState.resolution;
	}
	if (languageSelect) {
		languageSelect.value = gameState.language;
	}
	if (fullscreenToggle) {
		fullscreenToggle.checked = gameState.fullscreen;
	}
}

function renderCreditsScreen() {
	const mainScreen = document.getElementById("mainScreen");
	mainScreen.innerHTML = `
		<div class="card">
			<div class="card-header">
				<h2>Créditos</h2>
				<button class="secondary" onclick="backToMenu()">Voltar ao menu</button>
			</div>
			<p class="status-note">Simulação criada para testar sua estratégia de marketplace.</p>
		</div>
	`;
}

function updateResolution(value) {
	gameState.resolution = value;
	const [width, height] = value.split("x");
	document.body.style.maxWidth = `${width}px`;
	document.body.style.margin = "0 auto";
	document.body.style.minHeight = `${height}px`;
}

function toggleFullscreen(isFullscreen) {
	gameState.fullscreen = isFullscreen;
	if (isFullscreen && document.documentElement.requestFullscreen) {
		document.documentElement.requestFullscreen();
	} else if (!isFullscreen && document.exitFullscreen) {
		document.exitFullscreen();
	}
}

function updateLanguage(value) {
	gameState.language = value;
}

function updateAutoSave(value) {
	const minutes = Math.max(1, Number(value));
	gameState.autoSaveMinutes = minutes;
	startAutoSave();
}

function renderGameScreen() {
	const mainScreen = document.getElementById("mainScreen");
	mainScreen.innerHTML = `
		<div class="game-layout">
			<section class="card">
				<h2 class="panel-title">${gameState.companyName}</h2>
				<div class="stat-grid">
					<div class="stat"><span>Caixa</span><strong id="cashStat">R$ 0</strong></div>
					<div class="stat"><span>Avaliação</span><strong id="ratingStat">0.0</strong></div>
					<div class="stat"><span>Avaliações</span><strong id="reviewsStat">0</strong></div>
					<div class="stat"><span>Vendas por minuto</span><strong id="salesStat">0</strong></div>
					<div class="stat"><span>Reembolsos (min)</span><strong id="refundsStat">0</strong></div>
					<div class="stat"><span>Visibilidade</span><strong id="visibilityStat">0%</strong></div>
				</div>
				<div class="section-divider"></div>
				<h3 class="panel-title">Ações de marketing</h3>
				<div class="marketing-actions">
					<button onclick="runMarketing('flash')">Campanha Flash</button>
					<button onclick="runMarketing('influencers')">Influenciadores</button>
					<button onclick="runMarketing('branding')">Branding</button>
				</div>
				<p class="status-note" id="marketingNote">Escolha ações para aumentar visibilidade.</p>
				<div class="section-divider"></div>
				<h3 class="panel-title">Depósito</h3>
				<div id="inventoryList" class="inventory-list"></div>
			</section>
			<section class="card">
				<h2 class="panel-title">Fornecedores</h2>
				<div id="supplierList" class="supplier-list"></div>
				<div class="section-divider"></div>
				<h2 class="panel-title">Market share</h2>
				<div id="marketShareChart" class="marketshare"></div>
				<div class="section-divider"></div>
				<h2 class="panel-title">Rede social</h2>
				<div id="twitterFeed" class="twitter-feed"></div>
			</section>
		</div>
	`;
	updateSupplierList();
	updateInventoryList();
	updateStats();
	renderMarketShare();
	renderTwitterFeed();
}

function updateSupplierList() {
	const supplierList = document.getElementById("supplierList");
	if (!supplierList) {
		return;
	}
	supplierList.innerHTML = suppliers.map((supplier) => {
		const dynamicQuality = getSupplierQuality(supplier);
		const dynamicCost = getSupplierCost(supplier);
		const productMarkup = supplier.products.map((product) => `
			<div class="product-row">
				<span>${product.name}</span>
				<small>Qualidade ${getProductQuality(product, supplier)} · Custo R$ ${getProductCost(product, supplier)}</small>
				<button class="secondary" onclick="buyProduct('${product.id}')">Comprar</button>
			</div>
		`).join("");
		return `
			<div class="supplier-card ${supplier.id === gameState.currentSupplierId ? 'active' : ''}">
				<strong>${supplier.name}</strong>
				<span>Qualidade média: ${dynamicQuality}/100</span>
				<span>Custo base: R$ ${dynamicCost}</span>
				<div class="product-list">${productMarkup}</div>
			</div>
		`;
	}).join("");
}

function updateInventoryList() {
	const inventoryList = document.getElementById("inventoryList");
	if (!inventoryList) {
		return;
	}
	const items = Object.values(gameState.inventory);
	if (items.length === 0) {
		inventoryList.innerHTML = `<p class="status-note">Seu depósito está vazio. Compre produtos dos fornecedores.</p>`;
		return;
	}
	inventoryList.innerHTML = items.map((item) => `
		<div class="inventory-card">
			<div>
				<strong>${item.name}</strong>
				<small>Fornecedor: ${item.supplierName}</small>
				<small>Estoque: ${item.stock} unidades</small>
			</div>
			<div class="inventory-actions">
				<label>
					<span>Preço</span>
					<input type="number" min="${item.cost + 5}" value="${item.price}" onchange="updateProductPrice('${item.id}', this.value)">
				</label>
				<button class="secondary" onclick="restockProduct('${item.id}')">Repor estoque</button>
			</div>
		</div>
	`).join("");
}

function buyProduct(productId) {
	const productInfo = findProduct(productId);
	if (!productInfo) {
		return;
	}
	const { product, supplier } = productInfo;
	const cost = getProductCost(product, supplier);
	const quantity = 20;
	const totalCost = cost * quantity;
	if (gameState.cash < totalCost) {
		alert("Caixa insuficiente para comprar esse lote.");
		return;
	}
	gameState.cash -= totalCost;
	const existing = gameState.inventory[product.id];
	if (existing) {
		existing.stock += quantity;
		existing.cost = cost;
		existing.quality = getProductQuality(product, supplier);
	} else {
		gameState.inventory[product.id] = {
			id: product.id,
			name: product.name,
			supplierName: supplier.name,
			stock: quantity,
			cost,
			quality: getProductQuality(product, supplier),
			price: Math.round(cost * 1.6)
		};
	}
	updateInventoryList();
	updateStats();
}

function restockProduct(productId) {
	const item = gameState.inventory[productId];
	if (!item) {
		return;
	}
	const quantity = 20;
	const totalCost = item.cost * quantity;
	if (gameState.cash < totalCost) {
		alert("Caixa insuficiente para repor estoque.");
		return;
	}
	item.stock += quantity;
	gameState.cash -= totalCost;
	updateInventoryList();
	updateStats();
}

function updateProductPrice(productId, value) {
	const item = gameState.inventory[productId];
	if (!item) {
		return;
	}
	item.price = Number(value);
}

function runMarketing(type) {
	const costs = { flash: 800, influencers: 1400, branding: 2200 };
	const boosts = { flash: 0.08, influencers: 0.12, branding: 0.2 };
	const cost = costs[type] || 0;
	if (gameState.cash < cost) {
		alert("Caixa insuficiente para essa ação.");
		return;
	}
	gameState.cash -= cost;
	gameState.visibility = Math.min(0.9, gameState.visibility + boosts[type]);
	const note = document.getElementById("marketingNote");
	if (note) {
		note.textContent = "A campanha aumentou sua visibilidade!";
	}
	updateStats();
}

function startGameLoop() {
	stopGameLoop();
	gameState.loopId = setInterval(simulateTick, 1000);
}

function stopGameLoop() {
	if (gameState.loopId) {
		clearInterval(gameState.loopId);
		gameState.loopId = null;
	}
}

function simulateTick() {
	applySupplierOscillation();
	const sales = simulateSales();
	const refunds = simulateRefunds(sales);
	updateRating(sales, refunds);
	updateMarketShare();
	updateStats();
	updateInventoryList();
	updateSupplierList();
	updateTwitterFeed(sales, refunds);
}

function simulateSales() {
	const products = Object.values(gameState.inventory).filter((item) => item.stock > 0);
	if (products.length === 0) {
		gameState.salesHistory = 0;
		return 0;
	}
	const baseDemand = 12 + gameState.visibility * 20;
	let totalSales = 0;
	products.forEach((item) => {
		const priceFactor = Math.max(0.4, 1.3 - item.price / 300);
		const qualityFactor = Math.max(0.5, item.quality / 100);
		const randomFactor = randomBetween(0.7, 1.3);
		const demand = Math.round(baseDemand * priceFactor * qualityFactor * randomFactor);
		const actualSales = Math.min(item.stock, demand);
		item.stock -= actualSales;
		totalSales += actualSales;
		gameState.cash += item.price * actualSales;
	});
	gameState.salesHistory = totalSales * 60;
	return totalSales;
}

function simulateRefunds(sales) {
	const products = Object.values(gameState.inventory);
	const averageQuality = products.length
		? products.reduce((sum, item) => sum + item.quality, 0) / products.length
		: 0;
	const refundRate = Math.min(0.25, Math.max(0.03, (80 - averageQuality) / 200));
	const randomFactor = randomBetween(0.6, 1.4);
	const refunds = Math.round(sales * refundRate * randomFactor);
	const refundCost = refunds * averagePrice();
	gameState.cash -= refundCost;
	gameState.refundsHistory = refunds * 60;
	return refunds;
}

function updateRating(sales, refunds) {
	if (sales === 0) {
		return;
	}
	const qualityScore = averageQuality();
	const newRating = Math.max(2.5, Math.min(5, 2.2 + qualityScore / 50 + randomBetween(-0.2, 0.3)));
	const newReviews = Math.max(1, Math.round(sales * 0.15));
	const weightedReviews = gameState.reviews + newReviews;
	gameState.rating = weightedReviews === 0
		? newRating
		: ((gameState.rating * gameState.reviews) + (newRating * newReviews)) / weightedReviews;
	gameState.reviews = weightedReviews;
}

function averageQuality() {
	const items = Object.values(gameState.inventory);
	if (items.length === 0) {
		return 0;
	}
	return items.reduce((sum, item) => sum + item.quality, 0) / items.length;
}

function averagePrice() {
	const items = Object.values(gameState.inventory);
	if (items.length === 0) {
		return 0;
	}
	return items.reduce((sum, item) => sum + item.price, 0) / items.length;
}

function calculateStoreScore(rating, price, visibility) {
	const ratingWeight = rating * 25;
	const priceWeight = Math.max(0.5, 1.5 - price / 120) * 100;
	const visibilityWeight = visibility * 120;
	return ratingWeight + priceWeight + visibilityWeight;
}

function updateMarketShare() {
	const playerScore = calculateStoreScore(gameState.rating, averagePrice() || 120, gameState.visibility);
	const competitorScores = competitors.map((competitor) =>
		calculateStoreScore(competitor.rating, competitor.price, competitor.visibility)
	);
	const totalScore = playerScore + competitorScores.reduce((sum, value) => sum + value, 0);
	const shares = [
		{ name: gameState.companyName || "Você", value: totalScore ? playerScore / totalScore : 0.05, type: "player" },
		...competitors.map((competitor, index) => ({
			name: competitor.name,
			value: totalScore ? competitorScores[index] / totalScore : 0.1,
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
		const percent = Math.max(3, Math.round(item.value * 100));
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
	const cashStat = document.getElementById("cashStat");
	const ratingStat = document.getElementById("ratingStat");
	const reviewsStat = document.getElementById("reviewsStat");
	const salesStat = document.getElementById("salesStat");
	const refundsStat = document.getElementById("refundsStat");
	const visibilityStat = document.getElementById("visibilityStat");

	if (cashStat) {
		cashStat.textContent = `R$ ${gameState.cash.toFixed(0)}`;
	}
	if (ratingStat) {
		ratingStat.textContent = gameState.reviews === 0 ? "Sem avaliações" : gameState.rating.toFixed(2);
	}
	if (reviewsStat) {
		reviewsStat.textContent = gameState.reviews;
	}
	if (salesStat) {
		salesStat.textContent = gameState.salesHistory;
	}
	if (refundsStat) {
		refundsStat.textContent = gameState.refundsHistory;
	}
	if (visibilityStat) {
		visibilityStat.textContent = `${Math.round(gameState.visibility * 100)}%`;
	}
}

function updateTwitterFeed(sales, refunds) {
	const items = Object.values(gameState.inventory);
	if (items.length === 0) {
		return;
	}
	const product = items[Math.floor(randomBetween(0, items.length))];
	const scenarios = [
		`@cliente_feliz: ${product.name} chegou rápido e com ótima qualidade!`,
		`@reviewer: Gostei do preço do ${product.name}, valeu a compra.`,
		`@reclamacao: O entregador jogou meu ${product.name} por cima do muro.`,
		`@cliente: ${product.name} veio com defeito, pedi reembolso.`,
		`@techlover: ${product.name} é top, mas o frete poderia ser melhor.`,
		`@alerta: O cachorro destruiu o ${product.name} na entrega!`
	];
	if (refunds > 0) {
		scenarios.push(`@consumidor: Pedi reembolso do ${product.name} e fui atendido rápido.`);
	}
	const message = scenarios[Math.floor(randomBetween(0, scenarios.length))];
	gameState.twitterFeed.unshift(message);
	if (gameState.twitterFeed.length > 8) {
		gameState.twitterFeed.pop();
	}
	renderTwitterFeed();
}

function renderTwitterFeed() {
	const feed = document.getElementById("twitterFeed");
	if (!feed) {
		return;
	}
	feed.innerHTML = gameState.twitterFeed
		.map((message) => `<div class="tweet">${message}</div>`)
		.join("");
}

function getSaveKey(name) {
	return `marketplace-save-${name}`;
}

function saveGame() {
	if (!gameState.companyName) {
		return;
	}
	localStorage.setItem(getSaveKey(gameState.companyName), JSON.stringify(gameState));
}

function startAutoSave() {
	if (gameState.autoSaveId) {
		clearInterval(gameState.autoSaveId);
	}
	gameState.autoSaveId = setInterval(saveGame, gameState.autoSaveMinutes * 60 * 1000);
}

function findProduct(productId) {
	for (const supplier of suppliers) {
		const product = supplier.products.find((item) => item.id === productId);
		if (product) {
			return { product, supplier };
		}
	}
	return null;
}

function getSupplierQuality(supplier) {
	return Math.round(supplier.baseQuality + randomBetween(-5, 5));
}

function getSupplierCost(supplier) {
	return Math.round(supplier.baseCost + randomBetween(-6, 6));
}

function getProductQuality(product, supplier) {
	const supplierQuality = getSupplierQuality(supplier);
	return Math.round((product.baseQuality + supplierQuality) / 2 + randomBetween(-4, 4));
}

function getProductCost(product, supplier) {
	const supplierCost = getSupplierCost(supplier);
	return Math.round((product.baseCost + supplierCost) / 2 + randomBetween(-5, 5));
}

function applySupplierOscillation() {
	suppliers.forEach((supplier) => {
		supplier.baseQuality = Math.max(55, Math.min(98, supplier.baseQuality + randomBetween(-1.2, 1.2)));
		supplier.baseCost = Math.max(18, Math.min(70, supplier.baseCost + randomBetween(-1.5, 1.5)));
	});
}

renderMainMenu();
