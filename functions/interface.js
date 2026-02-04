const ipcRenderer = window?.require ? window.require('electron').ipcRenderer : {
	send: () => {},
	invoke: () => Promise.resolve()
};

const translations = {
	pt: {
		optionsTitle: "Opções",
		creditsTitle: "Créditos",
		backToMenu: "Voltar para o menu",
		loadGame: "Carregar Jogo",
		newGame: "Novo Jogo",
		mainMenuTitle: "Menu principal",
		mainMenuSubtitle: "Comece uma nova simulação e veja como suas escolhas impactam o market share.",
		companyPrompt: "Nome da empresa:",
		companyNameLabel: "Empresa",
		cashLabel: "Caixa",
		ratingLabel: "Avaliação",
		reviewsLabel: "Avaliações",
		visibilityLabel: "Visibilidade",
		lastSalesLabel: "Vendas (última)",
		refundsLabel: "Reembolsos (última)",
		inventoryTitle: "Depósito",
		suppliersTitle: "Fornecedores",
		marketTitle: "Market share",
		marketingTitle: "Marketing",
		marketingHint: "Ações de marketing aumentam visibilidade e impactam as vendas.",
		twitterTitle: "Feed de clientes",
		optionsResolution: "Resolução",
		optionsFullscreen: "Tela cheia",
		optionsLanguage: "Idioma",
		optionsAutosave: "Auto-save (minutos)",
		optionsAutosaveHint: "O jogo salva automaticamente no intervalo definido.",
		creditsText: "Simulação criada para testar sua estratégia de marketplace.",
		loadMissing: "Nenhum save encontrado para este nome.",
		saveSuccess: "Jogo salvo com sucesso.",
		saveFail: "Não foi possível salvar.",
		buyAction: "Comprar",
		sellPriceLabel: "Preço de venda",
		stockLabel: "Estoque",
		qualityLabel: "Qualidade",
		costLabel: "Custo",
		marketingActions: {
			social: "Campanha social",
			influencer: "Parceria com influencer",
			frete: "Frete grátis relâmpago"
		}
	},
	en: {
		optionsTitle: "Options",
		creditsTitle: "Credits",
		backToMenu: "Back to menu",
		loadGame: "Load Game",
		newGame: "New Game",
		mainMenuTitle: "Main menu",
		mainMenuSubtitle: "Start a new simulation and see how your choices affect market share.",
		companyPrompt: "Company name:",
		companyNameLabel: "Company",
		cashLabel: "Cash",
		ratingLabel: "Rating",
		reviewsLabel: "Reviews",
		visibilityLabel: "Visibility",
		lastSalesLabel: "Last sales",
		refundsLabel: "Last refunds",
		inventoryTitle: "Warehouse",
		suppliersTitle: "Suppliers",
		marketTitle: "Market share",
		marketingTitle: "Marketing",
		marketingHint: "Marketing actions increase visibility and influence sales.",
		twitterTitle: "Customer feed",
		optionsResolution: "Resolution",
		optionsFullscreen: "Fullscreen",
		optionsLanguage: "Language",
		optionsAutosave: "Auto-save (minutes)",
		optionsAutosaveHint: "Game saves automatically in the selected interval.",
		creditsText: "Simulation created to test your marketplace strategy.",
		loadMissing: "No save found for this name.",
		saveSuccess: "Game saved successfully.",
		saveFail: "Unable to save.",
		buyAction: "Buy",
		sellPriceLabel: "Sell price",
		stockLabel: "Stock",
		qualityLabel: "Quality",
		costLabel: "Cost",
		marketingActions: {
			social: "Social campaign",
			influencer: "Influencer partnership",
			frete: "Flash free shipping"
		}
	}
};

const resolutionOptions = [
	{ label: "1024x576", width: 1024, height: 576 },
	{ label: "1280x720", width: 1280, height: 720 },
	{ label: "1366x768", width: 1366, height: 768 },
	{ label: "1600x900", width: 1600, height: 900 },
	{ label: "1920x1080", width: 1920, height: 1080 }
];

const suppliers = [
	{
		id: 1,
		name: "TechNova Components",
		products: [
			{ id: "tn-1", name: "Placa controladora", baseQuality: 88, baseCost: 48, quality: 88, cost: 48 },
			{ id: "tn-2", name: "Kit de sensores", baseQuality: 82, baseCost: 36, quality: 82, cost: 36 },
			{ id: "tn-3", name: "Painel inteligente", baseQuality: 90, baseCost: 58, quality: 90, cost: 58 }
		]
	},
	{
		id: 2,
		name: "Varejo Prime Supply",
		products: [
			{ id: "vp-1", name: "Linha eco", baseQuality: 72, baseCost: 32, quality: 72, cost: 32 },
			{ id: "vp-2", name: "Embalagem premium", baseQuality: 68, baseCost: 24, quality: 68, cost: 24 },
			{ id: "vp-3", name: "Kit de reposição", baseQuality: 75, baseCost: 29, quality: 75, cost: 29 }
		]
	},
	{
		id: 3,
		name: "Atlas Industrial",
		products: [
			{ id: "ai-1", name: "Motor modular", baseQuality: 95, baseCost: 60, quality: 95, cost: 60 },
			{ id: "ai-2", name: "Sistema de resfriamento", baseQuality: 92, baseCost: 54, quality: 92, cost: 54 },
			{ id: "ai-3", name: "Conjunto de engrenagens", baseQuality: 90, baseCost: 46, quality: 90, cost: 46 }
		]
	},
	{
		id: 4,
		name: "Blue Harbor Imports",
		products: [
			{ id: "bh-1", name: "Kit econômico", baseQuality: 64, baseCost: 26, quality: 64, cost: 26 },
			{ id: "bh-2", name: "Combo casa", baseQuality: 62, baseCost: 22, quality: 62, cost: 22 },
			{ id: "bh-3", name: "Pacote básicos", baseQuality: 66, baseCost: 24, quality: 66, cost: 24 }
		]
	}
];

const competitors = [
	{ id: "A", name: "Loja Leste", rating: 3.8, price: 68, visibility: 62 },
	{ id: "B", name: "Mega Centro", rating: 4.1, price: 74, visibility: 70 },
	{ id: "C", name: "Outlet Sul", rating: 3.4, price: 58, visibility: 55 }
];

const gameState = {
	round: 1,
	cash: 12000,
	rating: 0,
	reviews: 0,
	lastSales: 0,
	lastRefunds: 0,
	marketShare: [],
	visibility: 38,
	companyName: "",
	inventory: [],
	feed: [],
	settings: {
		resolution: resolutionOptions[1],
		fullscreen: false,
		language: "pt",
		autosaveMinutes: 5
	},
	intervals: {
		roundLoop: null,
		autosave: null
	}
};

function t(key) {
	const language = translations[gameState.settings.language] || translations.pt;
	return key.split(".").reduce((obj, part) => (obj && obj[part] !== undefined ? obj[part] : null), language) ?? key;
}

function renderMainMenu() {
	const mainScreen = document.getElementById("mainScreen");
	mainScreen.innerHTML = `
		<div id="mainMenu" class="card">
			<h2>${t("mainMenuTitle")}</h2>
			<p>${t("mainMenuSubtitle")}</p>
			<div class="menu-actions">
				<button onclick="newGame()">${t("newGame")}</button>
				<button onclick="loadGame()">${t("loadGame")}</button>
			</div>
		</div>
	`;
}

function newGame() {
	openCompanyModal("new");
}

function loadGame() {
	openCompanyModal("load");
}

function saveGame() {
	try {
		if (!gameState.companyName) {
			return;
		}
		const snapshot = {
			round: gameState.round,
			cash: gameState.cash,
			rating: gameState.rating,
			reviews: gameState.reviews,
			lastSales: gameState.lastSales,
			lastRefunds: gameState.lastRefunds,
			marketShare: gameState.marketShare,
			visibility: gameState.visibility,
			companyName: gameState.companyName,
			inventory: gameState.inventory,
			feed: gameState.feed,
			settings: gameState.settings
		};
		localStorage.setItem(`marketplace-save-${gameState.companyName}`, JSON.stringify(snapshot));
	} catch (error) {
		console.error(error);
	}
}

function resetLoops() {
	if (gameState.intervals.roundLoop) {
		clearInterval(gameState.intervals.roundLoop);
		gameState.intervals.roundLoop = null;
	}
	if (gameState.intervals.autosave) {
		clearInterval(gameState.intervals.autosave);
		gameState.intervals.autosave = null;
	}
}

function startSimulationLoop() {
	gameState.intervals.roundLoop = setInterval(() => {
		simulateRound();
	}, 1000);
}

function startAutosave() {
	if (gameState.intervals.autosave) {
		clearInterval(gameState.intervals.autosave);
	}
	const minutes = Math.max(1, Number(gameState.settings.autosaveMinutes) || 5);
	gameState.settings.autosaveMinutes = minutes;
	gameState.intervals.autosave = setInterval(() => {
		saveGame();
	}, minutes * 60 * 1000);
}

function openCompanyModal(mode) {
	const modalRoot = document.getElementById("modalRoot") || document.createElement("div");
	modalRoot.id = "modalRoot";
	document.body.appendChild(modalRoot);
	const label = mode === "new" ? t("newGame") : t("loadGame");
		modalRoot.innerHTML = `
		<div class="modal-backdrop">
			<div class="modal-card">
				<h3>${label}</h3>
				<label>
					${t("companyPrompt")}
					<input id="companyNameInput" type="text" value="${gameState.companyName}" onkeydown="handleCompanyInputKey(event, '${mode}')">
				</label>
				<div class="modal-actions">
					<button class="secondary" onclick="closeCompanyModal()">${t("backToMenu")}</button>
					<button onclick="confirmCompanyModal('${mode}')">${label}</button>
				</div>
			</div>
		</div>
	`;
	const input = document.getElementById("companyNameInput");
	input?.focus();
}

function handleCompanyInputKey(event, mode) {
	if (event.key === "Enter") {
		confirmCompanyModal(mode);
	}
	if (event.key === "Escape") {
		closeCompanyModal();
	}
}

function closeCompanyModal() {
	const modalRoot = document.getElementById("modalRoot");
	if (modalRoot) {
		modalRoot.innerHTML = "";
	}
}

function confirmCompanyModal(mode) {
	const input = document.getElementById("companyNameInput");
	const name = input?.value?.trim();
	if (!name) {
		return;
	}
	gameState.companyName = name;
	closeCompanyModal();
	if (mode === "load") {
		loadGameByName(name);
	} else {
		startNewGame();
	}
}

function startNewGame() {
	gameState.round = 1;
	gameState.cash = 12000;
	gameState.rating = 0;
	gameState.reviews = 0;
	gameState.lastSales = 0;
	gameState.lastRefunds = 0;
	gameState.marketShare = [];
	gameState.visibility = 38;
	gameState.inventory = [];
	gameState.feed = [];
	suppliers.forEach((supplier) => {
		supplier.products.forEach((product) => {
			product.quality = product.baseQuality;
			product.cost = product.baseCost;
		});
	});
	resetLoops();
	renderGameScreen();
	updateMarketShare();
	startSimulationLoop();
	startAutosave();
}

function loadGameByName(name) {
	const save = localStorage.getItem(`marketplace-save-${name.trim()}`);
	if (!save) {
		alert(t("loadMissing"));
		return;
	}
	const parsed = JSON.parse(save);
	Object.assign(gameState, parsed, {
		intervals: { roundLoop: null, autosave: null }
	});
	resetLoops();
	renderGameScreen();
	updateMarketShare();
	startSimulationLoop();
	startAutosave();
}

function options() {
	const mainScreen = document.getElementById("mainScreen");
	const optionsMarkup = resolutionOptions.map((option) => {
		const selected = option.width === gameState.settings.resolution.width && option.height === gameState.settings.resolution.height;
		return `<option value="${option.width}x${option.height}" ${selected ? "selected" : ""}>${option.label}</option>`;
	}).join("");

	mainScreen.innerHTML = `
		<div class="card">
			<div class="card-header">
				<h2>${t("optionsTitle")}</h2>
				<button class="secondary" onclick="renderMainMenu()">${t("backToMenu")}</button>
			</div>
			<div class="option-grid">
				<label>
					${t("optionsResolution")}
					<select onchange="updateResolution(this.value)">
						${optionsMarkup}
					</select>
				</label>
				<label>
					${t("optionsFullscreen")}
					<select onchange="toggleFullscreen(this.value)">
						<option value="off" ${gameState.settings.fullscreen ? "" : "selected"}>Off</option>
						<option value="on" ${gameState.settings.fullscreen ? "selected" : ""}>On</option>
					</select>
				</label>
				<label>
					${t("optionsLanguage")}
					<select onchange="updateLanguage(this.value)">
						<option value="pt" ${gameState.settings.language === "pt" ? "selected" : ""}>Português</option>
						<option value="en" ${gameState.settings.language === "en" ? "selected" : ""}>English</option>
					</select>
				</label>
				<label>
					${t("optionsAutosave")}
					<input type="number" min="1" max="60" value="${gameState.settings.autosaveMinutes}" onchange="updateAutosaveMinutes(this.value)">
					<small>${t("optionsAutosaveHint")}</small>
				</label>
			</div>
		</div>
	`;
}

function updateResolution(value) {
	const [width, height] = value.split("x").map(Number);
	const selected = resolutionOptions.find((option) => option.width === width && option.height === height);
	if (!selected) {
		return;
	}
	gameState.settings.resolution = selected;
	ipcRenderer.invoke("set-resolution", selected);
}

function toggleFullscreen(value) {
	const enable = value === "on";
	gameState.settings.fullscreen = enable;
	ipcRenderer.invoke("set-fullscreen", { fullscreen: enable });
	if (!window?.require) {
		if (enable) {
			document.documentElement.requestFullscreen?.();
		} else {
			document.exitFullscreen?.();
		}
	}
}

function updateLanguage(language) {
	gameState.settings.language = language;
	renderMainMenu();
}

function updateAutosaveMinutes(value) {
	gameState.settings.autosaveMinutes = Number(value) || 5;
	startAutosave();
}

function quit() {
	ipcRenderer.send('quit-app');
}

function credits() {
	const mainScreen = document.getElementById("mainScreen");
	mainScreen.innerHTML = `
		<div class="card">
			<div class="card-header">
				<h2>${t("creditsTitle")}</h2>
				<button class="secondary" onclick="renderMainMenu()">${t("backToMenu")}</button>
			</div>
			<p class="status-note">${t("creditsText")}</p>
		</div>
	`;
}

function renderGameScreen() {
	const mainScreen = document.getElementById("mainScreen");
	const supplierCards = suppliers.map((supplier) => {
		const productsMarkup = supplier.products.map((product) => `
			<div class="product-row">
				<strong>${product.name}</strong>
				<small>${t("qualityLabel")}: ${Math.round(product.quality)}/100 · ${t("costLabel")}: R$ ${product.cost.toFixed(0)}</small>
				<div class="inventory-actions">
					<label>
						${t("stockLabel")}
						<input type="number" min="1" max="500" value="20" data-product="${product.id}" class="buy-qty">
					</label>
					<button onclick="buyProduct('${product.id}', ${supplier.id})">${t("buyAction")}</button>
				</div>
			</div>
		`).join("");

		return `
			<div class="supplier-card">
				<strong>${supplier.name}</strong>
				<div class="product-list">
					${productsMarkup}
				</div>
			</div>
		`;
	}).join("");

	mainScreen.innerHTML = `
		<div class="game-layout">
			<section class="card">
				<h2 class="panel-title">${gameState.companyName || t("companyNameLabel")}</h2>
				<div class="stat-grid">
					<div class="stat"><span>${t("cashLabel")}</span><strong id="cashStat">R$ 0</strong></div>
					<div class="stat"><span>${t("ratingLabel")}</span><strong id="ratingStat">0.0</strong></div>
					<div class="stat"><span>${t("reviewsLabel")}</span><strong id="reviewsStat">0</strong></div>
					<div class="stat"><span>${t("visibilityLabel")}</span><strong id="visibilityStat">0</strong></div>
					<div class="stat"><span>${t("lastSalesLabel")}</span><strong id="salesStat">0</strong></div>
					<div class="stat"><span>${t("refundsLabel")}</span><strong id="refundsStat">0</strong></div>
				</div>
				<div class="section-divider"></div>
				<h3 class="panel-title">${t("marketingTitle")}</h3>
				<p class="status-note">${t("marketingHint")}</p>
				<div class="marketing-actions">
					<button onclick="runMarketing('social')">${t("marketingActions.social")}</button>
					<button onclick="runMarketing('influencer')">${t("marketingActions.influencer")}</button>
					<button onclick="runMarketing('frete')">${t("marketingActions.frete")}</button>
				</div>
				<div class="section-divider"></div>
				<h3 class="panel-title">${t("twitterTitle")}</h3>
				<div id="feed" class="feed"></div>
			</section>
			<section class="card">
				<h2 class="panel-title">${t("inventoryTitle")}</h2>
				<div id="inventoryList" class="inventory-list"></div>
				<div class="section-divider"></div>
				<h2 class="panel-title">${t("suppliersTitle")}</h2>
				<div class="supplier-list">${supplierCards}</div>
				<div class="section-divider"></div>
				<h2 class="panel-title">${t("marketTitle")}</h2>
				<div id="marketShareChart" class="marketshare"></div>
			</section>
		</div>
	`;

	updateStats();
	renderInventory();
	renderFeed();
}

function findProduct(productId) {
	for (const supplier of suppliers) {
		const product = supplier.products.find((item) => item.id === productId);
		if (product) {
			return { supplier, product };
		}
	}
	return null;
}

function buyProduct(productId, supplierId) {
	const qtyInput = document.querySelector(`input[data-product="${productId}"]`);
	const quantity = Number(qtyInput?.value) || 0;
	if (quantity <= 0) {
		return;
	}
	const details = findProduct(productId);
	if (!details || details.supplier.id !== supplierId) {
		return;
	}
	const { product, supplier } = details;
	const totalCost = product.cost * quantity;
	if (gameState.cash < totalCost) {
		alert("Saldo insuficiente.");
		return;
	}
	gameState.cash -= totalCost;
	const existing = gameState.inventory.find((item) => item.productId === productId);
	if (existing) {
		existing.stock += quantity;
		existing.cost = product.cost;
		existing.quality = product.quality;
	} else {
		gameState.inventory.push({
			productId,
			name: product.name,
			supplier: supplier.name,
			stock: quantity,
			sellPrice: Math.round(product.cost * 1.4),
			quality: product.quality,
			cost: product.cost
		});
	}
	updateStats();
	renderInventory();
}

function updateSellPrice(productId, value) {
	const price = Number(value) || 0;
	const entry = gameState.inventory.find((item) => item.productId === productId);
	if (entry && price > 0) {
		entry.sellPrice = price;
	}
	updateMarketShare();
}

function runMarketing(action) {
	const actions = {
		social: { cost: 450, boost: 6 },
		influencer: { cost: 900, boost: 12 },
		frete: { cost: 650, boost: 8 }
	};
	const selected = actions[action];
	if (!selected) {
		return;
	}
	if (gameState.cash < selected.cost) {
		alert("Saldo insuficiente para esta ação.");
		return;
	}
	gameState.cash -= selected.cost;
	gameState.visibility = Math.min(100, gameState.visibility + selected.boost + randomBetween(0, 3));
	addFeedEntry(`📣 Campanha ativada: ${t(`marketingActions.${action}`)}.`);
	updateStats();
}

function simulateRound() {
	const soldItems = [];
	let totalSales = 0;
	let totalRefunds = 0;
	let totalRevenue = 0;
	let totalRefundValue = 0;

	updateSuppliers();
	applyRandomEvents();

	gameState.inventory.forEach((item) => {
		if (item.stock <= 0) {
			return;
		}
		const demand = calculateDemand(item);
		const sold = Math.min(item.stock, demand);
		if (sold <= 0) {
			return;
		}
		item.stock -= sold;
		const refundRate = calculateRefundRate(item.quality);
		const refunds = Math.round(sold * refundRate);
		const revenue = sold * item.sellPrice;
		const refundValue = refunds * item.sellPrice;
		totalSales += sold;
		totalRefunds += refunds;
		totalRevenue += revenue;
		totalRefundValue += refundValue;
		soldItems.push({ ...item, sold, refunds });
	});

	gameState.cash += totalRevenue - totalRefundValue;
	gameState.lastSales = totalSales;
	gameState.lastRefunds = totalRefunds;
	updateReputation(soldItems, totalSales);
	gameState.round += 1;

	updateMarketShare();
	updateStats();
	renderInventory();
	updateFeed(soldItems, totalSales, totalRefunds);
}

function calculateDemand(item) {
	const visibilityFactor = 0.6 + gameState.visibility / 140;
	const priceScore = Math.max(0.4, 1.3 - item.sellPrice / 120);
	const qualityScore = item.quality / 100;
	const randomness = randomBetween(0.8, 1.2);
	const baseDemand = 8 + Math.floor(gameState.visibility / 5);
	return Math.max(0, Math.round(baseDemand * visibilityFactor * priceScore * (0.6 + qualityScore) * randomness));
}

function calculateRefundRate(quality) {
	const qualityFactor = 1 - quality / 100;
	return Math.min(0.25, 0.04 + qualityFactor * 0.12 + randomBetween(0, 0.03));
}

function updateReputation(soldItems, totalSales) {
	if (totalSales === 0) {
		gameState.rating = Math.max(0, gameState.rating - 0.01);
		return;
	}
	const avgQuality = soldItems.reduce((sum, item) => sum + item.quality, 0) / soldItems.length;
	const newReviews = Math.round(totalSales * 0.14);
	const sentiment = 2.4 + (avgQuality / 100) * 2 + randomBetween(-0.2, 0.2);
	const newRating = Math.max(1.5, Math.min(5, sentiment));
	if (gameState.reviews === 0) {
		gameState.rating = newRating;
		gameState.reviews = newReviews;
		return;
	}
	gameState.rating = ((gameState.rating * gameState.reviews) + (newRating * newReviews)) / (gameState.reviews + newReviews);
	gameState.reviews += newReviews;
}

function calculateStoreScore(rating, price, visibility) {
	const ratingWeight = rating * 18;
	const priceWeight = Math.max(0.6, 1.4 - price / 95) * 100;
	const visibilityWeight = visibility * 1.2;
	return ratingWeight + priceWeight + visibilityWeight;
}

function updateMarketShare() {
	const avgPrice = getAverageSellPrice() || 80;
	const playerScore = calculateStoreScore(gameState.rating || 0, avgPrice, gameState.visibility);
	const competitorScores = competitors.map((competitor) =>
		calculateStoreScore(competitor.rating, competitor.price, competitor.visibility)
	);
	const totalScore = playerScore + competitorScores.reduce((sum, value) => sum + value, 0);
	let playerShare = totalScore > 0 ? playerScore / totalScore : 0.03;
	if (gameState.round <= 3) {
		playerShare = Math.max(playerShare, 0.03);
	}
	const adjustedTotal = playerShare + competitorScores.reduce((sum, value) => sum + value, 0);
	const shares = [
		{ name: "Você", value: playerShare / adjustedTotal, type: "player" },
		...competitors.map((competitor, index) => ({
			name: competitor.name,
			value: competitorScores[index] / adjustedTotal,
			type: "competitor"
		}))
	];
	gameState.marketShare = shares;
	renderMarketShare();
}

function getAverageSellPrice() {
	if (gameState.inventory.length === 0) {
		return 0;
	}
	const total = gameState.inventory.reduce((sum, item) => sum + item.sellPrice, 0);
	return total / gameState.inventory.length;
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

function renderInventory() {
	const inventoryList = document.getElementById("inventoryList");
	if (!inventoryList) {
		return;
	}
	if (gameState.inventory.length === 0) {
		inventoryList.innerHTML = `<p class="status-note">Estoque vazio. Compre itens dos fornecedores.</p>`;
		return;
	}
	inventoryList.innerHTML = gameState.inventory.map((item) => `
		<div class="inventory-card">
			<strong>${item.name}</strong>
			<small>${item.supplier}</small>
			<small>${t("qualityLabel")}: ${Math.round(item.quality)}/100 · ${t("costLabel")}: R$ ${item.cost.toFixed(0)}</small>
			<div class="inventory-actions">
				<span>${t("stockLabel")}: <strong>${item.stock}</strong></span>
				<label>
					${t("sellPriceLabel")}
					<input type="number" min="1" value="${item.sellPrice}" onchange="updateSellPrice('${item.productId}', this.value)">
				</label>
			</div>
		</div>
	`).join("");
}

function updateStats() {
	const cashStat = document.getElementById("cashStat");
	const ratingStat = document.getElementById("ratingStat");
	const reviewsStat = document.getElementById("reviewsStat");
	const visibilityStat = document.getElementById("visibilityStat");
	const salesStat = document.getElementById("salesStat");
	const refundsStat = document.getElementById("refundsStat");

	if (cashStat) {
		cashStat.textContent = `R$ ${gameState.cash.toFixed(0)}`;
	}
	if (ratingStat) {
		ratingStat.textContent = gameState.reviews === 0 ? "-" : gameState.rating.toFixed(2);
	}
	if (reviewsStat) {
		reviewsStat.textContent = gameState.reviews;
	}
	if (visibilityStat) {
		visibilityStat.textContent = `${gameState.visibility.toFixed(0)}%`;
	}
	if (salesStat) {
		salesStat.textContent = gameState.lastSales;
	}
	if (refundsStat) {
		refundsStat.textContent = gameState.lastRefunds;
	}
}

function updateSuppliers() {
	suppliers.forEach((supplier) => {
		supplier.products.forEach((product) => {
			const costDelta = randomBetween(-2.2, 2.5);
			const qualityDelta = randomBetween(-1.8, 1.8);
			product.cost = clamp(product.cost + costDelta, product.baseCost * 0.75, product.baseCost * 1.35);
			product.quality = clamp(product.quality + qualityDelta, product.baseQuality * 0.8, product.baseQuality * 1.1);
		});
	});
}

function applyRandomEvents() {
	const roll = Math.random();
	if (roll < 0.08) {
		const impact = randomBetween(4, 10);
		gameState.visibility = clamp(gameState.visibility - impact, 10, 100);
		addFeedEntry("⚠️ Oscilação de mercado reduziu sua visibilidade.");
	} else if (roll > 0.92) {
		const boost = randomBetween(4, 10);
		gameState.visibility = clamp(gameState.visibility + boost, 10, 100);
		addFeedEntry("✨ Seu marketplace ganhou destaque espontâneo!");
	}
}

function updateFeed(soldItems, totalSales, totalRefunds) {
	if (soldItems.length === 0) {
		addFeedEntry("🧭 Clientes estão pesquisando opções hoje.");
		return;
	}
	const picks = soldItems.slice(0, 2);
	picks.forEach((item) => {
		const sentiment = totalRefunds > 0 && item.refunds > 0 ? "negative" : "positive";
		const message = sentiment === "negative"
			? generateComplaint(item)
			: generatePraise(item);
		addFeedEntry(message);
	});
}

function addFeedEntry(message) {
	gameState.feed.unshift({ message, timestamp: new Date().toLocaleTimeString() });
	gameState.feed = gameState.feed.slice(0, 8);
	renderFeed();
}

function renderFeed() {
	const feed = document.getElementById("feed");
	if (!feed) {
		return;
	}
	if (gameState.feed.length === 0) {
		feed.innerHTML = `<p class="status-note">Sem novidades por enquanto.</p>`;
		return;
	}
	feed.innerHTML = gameState.feed.map((entry) => `
		<div class="feed-item">
			<span>${entry.message}</span>
			<small>${entry.timestamp}</small>
		</div>
	`).join("");
}

function generatePraise(item) {
	const notes = [
		`💬 "Preço justo para ${item.name}, vou comprar de novo!"`,
		`💬 "${item.name} chegou rápido e com ótima qualidade."`,
		`💬 "Gostei da embalagem do ${item.name}!"`
	];
	return notes[Math.floor(Math.random() * notes.length)];
}

function generateComplaint(item) {
	const notes = [
		`😤 "${item.name} veio com arranhões, pedi reembolso."`,
		`😤 "O entregador jogou o pacote do ${item.name} por cima do muro."`,
		`😤 "Paguei caro no ${item.name} e não curti a qualidade."`,
		`😤 "Meu cachorro destruiu o ${item.name}, quero trocar."`
	];
	return notes[Math.floor(Math.random() * notes.length)];
}

function randomBetween(min, max) {
	return Math.random() * (max - min) + min;
}

function clamp(value, min, max) {
	return Math.max(min, Math.min(max, value));
}

renderMainMenu();
