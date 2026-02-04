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
		confirmAction: "Confirmar",
		cancelAction: "Cancelar",
		companyNameLabel: "Empresa",
		cashLabel: "Caixa",
		ratingLabel: "Avaliação",
		reviewsLabel: "Avaliações",
		visibilityLabel: "Visibilidade",
		lastSalesLabel: "Vendas (última)",
		refundsLabel: "Reembolsos (última)",
		xpLabel: "XP",
		inventoryTitle: "Depósito",
		suppliersTitle: "Fornecedores",
		marketTitle: "Market share",
		marketingTitle: "Marketing",
		marketingHint: "Ações de marketing aumentam visibilidade e impactam as vendas.",
		marketingCostLabel: "Custo",
		twitterTitle: "Feed de clientes",
		packagingTitle: "Empacotamento",
		packagingOptions: {
			simple: "Empacotamento simples",
			conventional: "Empacotamento convencional",
			premium: "Empacotamento premium"
		},
		packagingNotes: {
			simple: "+10% chance de reembolso · R$ 5 por pedido",
			conventional: "Sem bônus · R$ 10 por pedido",
			premium: "-10% chance de reembolso · R$ 15 por pedido"
		},
		skillsTitle: "Árvore de habilidades",
		skillsHint: "Use XP para desbloquear melhorias permanentes.",
		skillUnlock: "Desbloquear",
		skillUnlocked: "Desbloqueado",
		skillRequirements: "Requisitos",
		skillMarketShare: "Market share mínimo: 20%",
		speedTitle: "Velocidade",
		speedPause: "PAUSE",
		speedNormal: "1x",
		speedFast: "2x",
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
		restockTitle: "Recompra automática",
		restockThresholdLabel: "Recomprar abaixo de",
		restockQuantityLabel: "Quantidade automática",
		purchaseTotalLabel: "Total da compra",
		sellPriceLabel: "Preço de venda",
		stockLabel: "Estoque",
		qualityLabel: "Qualidade",
		costLabel: "Custo",
		restockLocked: "Desbloqueie a habilidade para ativar a recompra automática.",
		loadTitle: "Selecionar save",
		loadEmpty: "Nenhum save encontrado.",
		marketingActions: {
			social: "Campanha social",
			influencer: "Parceria com influencer",
			frete: "Frete grátis relâmpago"
		},
		skills: {
			autoRestock: "Recompra automática",
			marketingSocial: "Marketing social",
			marketingInfluencer: "Marketing com influencer",
			marketingFrete: "Frete grátis relâmpago",
			recommendedSeller: "Vendedor Recomendado"
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
		confirmAction: "Confirm",
		cancelAction: "Cancel",
		companyNameLabel: "Company",
		cashLabel: "Cash",
		ratingLabel: "Rating",
		reviewsLabel: "Reviews",
		visibilityLabel: "Visibility",
		lastSalesLabel: "Last sales",
		refundsLabel: "Last refunds",
		xpLabel: "XP",
		inventoryTitle: "Warehouse",
		suppliersTitle: "Suppliers",
		marketTitle: "Market share",
		marketingTitle: "Marketing",
		marketingHint: "Marketing actions increase visibility and influence sales.",
		marketingCostLabel: "Cost",
		twitterTitle: "Customer feed",
		packagingTitle: "Packaging",
		packagingOptions: {
			simple: "Simple packaging",
			conventional: "Conventional packaging",
			premium: "Premium packaging"
		},
		packagingNotes: {
			simple: "+10% refund chance · R$ 5 per order",
			conventional: "No bonus · R$ 10 per order",
			premium: "-10% refund chance · R$ 15 per order"
		},
		skillsTitle: "Skill tree",
		skillsHint: "Spend XP to unlock permanent upgrades.",
		skillUnlock: "Unlock",
		skillUnlocked: "Unlocked",
		skillRequirements: "Requirements",
		skillMarketShare: "Minimum market share: 20%",
		speedTitle: "Speed",
		speedPause: "PAUSE",
		speedNormal: "1x",
		speedFast: "2x",
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
		restockTitle: "Auto restock",
		restockThresholdLabel: "Restock below",
		restockQuantityLabel: "Auto quantity",
		purchaseTotalLabel: "Purchase total",
		sellPriceLabel: "Sell price",
		stockLabel: "Stock",
		qualityLabel: "Quality",
		costLabel: "Cost",
		restockLocked: "Unlock the skill to enable auto restock.",
		loadTitle: "Select save",
		loadEmpty: "No save found.",
		marketingActions: {
			social: "Social campaign",
			influencer: "Influencer partnership",
			frete: "Flash free shipping"
		},
		skills: {
			autoRestock: "Auto restock",
			marketingSocial: "Social marketing",
			marketingInfluencer: "Influencer marketing",
			marketingFrete: "Flash free shipping",
			recommendedSeller: "Recommended Seller"
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

let competitors = [];

const gameState = {
	round: 1,
	cash: 12000,
	rating: 0,
	reviews: 0,
	lastSales: 0,
	lastRefunds: 0,
	lastSoldItems: [],
	xp: 0,
	marketShare: [],
	visibility: 38,
	companyName: "",
	inventory: [],
	feed: [],
	customerCounts: [],
	salesHistory: [],
	packaging: "conventional",
	gameSpeed: 1,
	paused: false,
	skills: {
		autoRestock: false,
		marketingSocial: false,
		marketingInfluencer: false,
		marketingFrete: false,
		recommendedSeller: false
	},
	activeEvents: [],
	settings: {
		resolution: resolutionOptions[1],
		fullscreen: false,
		language: "pt",
		autosaveMinutes: 5
	},
	intervals: {
		roundLoop: null,
		autosave: null,
		feedLoop: null
	}
};

const packagingOptions = {
	simple: { refundDelta: 0.1, cost: 5 },
	conventional: { refundDelta: 0, cost: 10 },
	premium: { refundDelta: -0.1, cost: 15 }
};

const skillTree = {
	autoRestock: { cost: 600, requirements: [] },
	marketingSocial: { cost: 400, requirements: [] },
	marketingInfluencer: { cost: 650, requirements: ["marketingSocial"] },
	marketingFrete: { cost: 650, requirements: ["marketingSocial"] },
	recommendedSeller: { cost: 2000, requirements: ["autoRestock", "marketingSocial", "marketingInfluencer", "marketingFrete"] }
};

const marketingActions = {
	social: { cost: 450, boost: 6, skill: "marketingSocial" },
	influencer: { cost: 900, boost: 12, skill: "marketingInfluencer" },
	frete: { cost: 650, boost: 8, skill: "marketingFrete" }
};

const eventCatalog = [
	{ id: "marketplaceOutage", name: "Marketplace fora do ar", duration: 5 },
	{ id: "taxes", name: "Governo cobrando impostos", duration: 0 },
	{ id: "packingFailure", name: "Equipamentos de empacotamento quebraram", duration: 0 },
	{ id: "stolenCargo", name: "Carga roubada", duration: 1 },
	{ id: "campaignBoost", name: "Campanha", duration: 5 }
];

function saveSettings() {
	try {
		localStorage.setItem("marketplace-settings", JSON.stringify(gameState.settings));
	} catch (error) {
		console.error(error);
	}
}

function loadSettings() {
	try {
		const saved = localStorage.getItem("marketplace-settings");
		if (saved) {
			const parsed = JSON.parse(saved);
			Object.assign(gameState.settings, parsed);
		}
	} catch (error) {
		console.error(error);
	}
}

function generateCompetitors() {
	const names = ["Loja Leste", "Mega Centro", "Outlet Sul", "Ponto Norte"];
	competitors = names.map((name, index) => ({
		id: `C${index + 1}`,
		name,
		rating: Number(randomBetween(4.5, 4.9).toFixed(2)),
		reviews: Math.round(randomBetween(1200, 3800)),
		price: Math.round(randomBetween(62, 86)),
		visibility: Math.round(randomBetween(68, 88))
	}));
}

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

function openCompanyPrompt() {
	return new Promise((resolve) => {
		const existingModal = document.getElementById("modalRoot");
		if (existingModal) {
			existingModal.remove();
		}

		const modalRoot = document.createElement("div");
		modalRoot.id = "modalRoot";
		modalRoot.innerHTML = `
			<div class="modal-backdrop">
				<div class="modal-card">
					<h3>${t("companyPrompt")}</h3>
					<label>
						${t("companyPrompt")}
						<input type="text" />
					</label>
					<div class="modal-actions">
						<button class="secondary" data-action="cancel">${t("cancelAction")}</button>
						<button data-action="confirm">${t("confirmAction")}</button>
					</div>
				</div>
			</div>
		`;

		document.body.appendChild(modalRoot);

		const input = modalRoot.querySelector("input");
		const confirmButton = modalRoot.querySelector('[data-action="confirm"]');
		const cancelButton = modalRoot.querySelector('[data-action="cancel"]');
		const backdrop = modalRoot.querySelector(".modal-backdrop");

		input.value = gameState.companyName || "";

		const closeModal = (value) => {
			modalRoot.remove();
			resolve(value);
		};

		confirmButton.addEventListener("click", () => closeModal(input.value));
		cancelButton.addEventListener("click", () => closeModal(null));
		backdrop.addEventListener("click", (event) => {
			if (event.target === backdrop) {
				closeModal(null);
			}
		});

		input.addEventListener("keydown", (event) => {
			if (event.key === "Enter") {
				event.preventDefault();
				closeModal(input.value);
			}
			if (event.key === "Escape") {
				event.preventDefault();
				closeModal(null);
			}
		});

		setTimeout(() => input.focus(), 0);
	});
}

async function newGame() {
	const name = await openCompanyPrompt();
	if (!name || !name.trim()) {
		return;
	}
	gameState.companyName = name.trim();
	gameState.round = 1;
	gameState.cash = 12000;
	gameState.rating = 0;
	gameState.reviews = 0;
	gameState.lastSales = 0;
	gameState.lastRefunds = 0;
	gameState.lastSoldItems = [];
	gameState.marketShare = [];
	gameState.visibility = 38;
	gameState.inventory = [];
	gameState.feed = [];
	gameState.customerCounts = [];
	gameState.salesHistory = [];
	gameState.packaging = "conventional";
	gameState.gameSpeed = 1;
	gameState.paused = false;
	gameState.xp = 0;
	gameState.skills = {
		autoRestock: false,
		marketingSocial: false,
		marketingInfluencer: false,
		marketingFrete: false,
		recommendedSeller: false
	};
	gameState.activeEvents = [];
	generateCompetitors();
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
	startFeedLoop();
	startAutosave();
}

async function loadGame() {
	loadSettings();
	const preservedSettings = { ...gameState.settings };
	const saveName = await openSaveSelection();
	if (!saveName) {
		return;
	}
	const save = localStorage.getItem(`marketplace-save-${saveName}`);
	if (!save) {
		alert(t("loadMissing"));
		return;
	}
	const parsed = JSON.parse(save);
	Object.assign(gameState, parsed, {
		intervals: { roundLoop: null, autosave: null, feedLoop: null }
	});
	gameState.settings = preservedSettings;
	gameState.paused = false;
	if (!parsed.settings) {
		gameState.settings = { ...gameState.settings };
	}
	if (!parsed.skills) {
		gameState.skills = {
			autoRestock: false,
			marketingSocial: false,
			marketingInfluencer: false,
			marketingFrete: false,
			recommendedSeller: false
		};
	}
	if (!parsed.salesHistory) {
		gameState.salesHistory = [];
	}
	if (!parsed.packaging) {
		gameState.packaging = "conventional";
	}
	if (!parsed.activeEvents) {
		gameState.activeEvents = [];
	}
	if (!parsed.xp) {
		gameState.xp = 0;
	}
	if (!parsed.customerCounts) {
		gameState.customerCounts = [];
	}
	if (!parsed.marketShare) {
		gameState.marketShare = [];
	}
	if (!parsed.gameSpeed) {
		gameState.gameSpeed = 1;
	}
	if (parsed.competitors) {
		competitors = parsed.competitors;
	} else {
		generateCompetitors();
	}
	resetLoops();
	renderGameScreen();
	updateMarketShare();
	startSimulationLoop();
	startFeedLoop();
	startAutosave();
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
			settings: gameState.settings,
			xp: gameState.xp,
			salesHistory: gameState.salesHistory,
			packaging: gameState.packaging,
			gameSpeed: gameState.gameSpeed,
			paused: gameState.paused,
			skills: gameState.skills,
			activeEvents: gameState.activeEvents,
			customerCounts: gameState.customerCounts,
			competitors
		};
		const savedAt = new Date().toISOString();
		const payload = { ...snapshot, savedAt };
		localStorage.setItem(`marketplace-save-${gameState.companyName}`, JSON.stringify(payload));
		updateSaveIndex(gameState.companyName, savedAt);
	} catch (error) {
		console.error(error);
	}
}

function updateSaveIndex(name, savedAt) {
	const key = "marketplace-save-index";
	try {
		const existing = JSON.parse(localStorage.getItem(key)) || [];
		const filtered = existing.filter((entry) => entry.name !== name);
		filtered.push({ name, savedAt });
		localStorage.setItem(key, JSON.stringify(filtered));
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
	if (gameState.intervals.feedLoop) {
		clearInterval(gameState.intervals.feedLoop);
		gameState.intervals.feedLoop = null;
	}
}

function startSimulationLoop() {
	if (gameState.intervals.roundLoop) {
		clearInterval(gameState.intervals.roundLoop);
	}
	if (gameState.paused) {
		return;
	}
	const interval = gameState.gameSpeed === 2 ? 1000 : 2000;
	gameState.intervals.roundLoop = setInterval(() => {
		simulateRound();
	}, interval);
}

function startFeedLoop() {
	gameState.intervals.feedLoop = setInterval(() => {
		updateFeed(gameState.lastSoldItems, gameState.lastSales, gameState.lastRefunds);
	}, 30000);
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
	saveSettings();
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
	saveSettings();
}

function updateLanguage(language) {
	gameState.settings.language = language;
	renderMainMenu();
	saveSettings();
}

function updateAutosaveMinutes(value) {
	gameState.settings.autosaveMinutes = Number(value) || 5;
	startAutosave();
	saveSettings();
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
				<small data-product-stats="${product.id}">${t("qualityLabel")}: ${Math.round(product.quality)}/100 · ${t("costLabel")}: R$ ${product.cost.toFixed(0)}</small>
				<div class="inventory-actions">
					<label>
						${t("stockLabel")}
						<input type="number" min="1" max="500" value="20" data-product="${product.id}" class="buy-qty" oninput="updatePurchaseTotal('${product.id}')">
					</label>
					<div class="purchase-total" data-product-total="${product.id}">
						<span>${t("purchaseTotalLabel")}</span>
						<strong>R$ ${Math.round(product.cost * 20)}</strong>
					</div>
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
					<div class="stat"><span>${t("xpLabel")}</span><strong id="xpStat">0</strong></div>
				</div>
				<div class="section-divider"></div>
				<h3 class="panel-title">${t("speedTitle")}</h3>
				<div class="speed-controls">
					<button class="secondary" id="pauseButton" onclick="togglePause()">${t("speedPause")}</button>
					<button class="secondary" id="speedNormal" onclick="setGameSpeed(1)">${t("speedNormal")}</button>
					<button class="secondary" id="speedFast" onclick="setGameSpeed(2)">${t("speedFast")}</button>
				</div>
				<div class="section-divider"></div>
				<h3 class="panel-title">${t("marketingTitle")}</h3>
				<p class="status-note">${t("marketingHint")}</p>
				<div class="marketing-actions">
					${renderMarketingButton("social")}
					${renderMarketingButton("influencer")}
					${renderMarketingButton("frete")}
				</div>
				<div class="section-divider"></div>
				<h3 class="panel-title">${t("packagingTitle")}</h3>
				<div class="packaging-options">
					${renderPackagingOption("simple")}
					${renderPackagingOption("conventional")}
					${renderPackagingOption("premium")}
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
				<div class="section-divider"></div>
				<h2 class="panel-title">${t("skillsTitle")}</h2>
				<p class="status-note">${t("skillsHint")}</p>
				<div id="skillsTree" class="skills-tree"></div>
			</section>
		</div>
	`;

	updateStats();
	renderInventory();
	renderFeed();
	renderSuppliers();
	renderSkills();
	updateSpeedControls();
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
	const stolenEvent = gameState.activeEvents.find((event) => event.id === "stolenCargo");
	if (stolenEvent) {
		stolenEvent.remaining -= 1;
		gameState.activeEvents = gameState.activeEvents.filter((event) => event.remaining > 0);
		addFeedEntry("🚨 Carga roubada! Sua compra foi perdida.");
		updateStats();
		return;
	}
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
			cost: product.cost,
			autoRestockThreshold: 0,
			autoRestockQty: 0
		});
	}
	updateStats();
	renderInventory();
	updatePurchaseTotal(productId);
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
	const selected = marketingActions[action];
	if (!selected) {
		return;
	}
	if (!gameState.skills[selected.skill]) {
		alert("Habilidade ainda bloqueada.");
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
	let totalCostOfGoods = 0;
	let totalPackagingCost = 0;

	updateSuppliers();
	applyEvents();
	handleAutoRestock();

	gameState.inventory.forEach((item) => {
		if (item.stock <= 0) {
			return;
		}
		if (isMarketplaceOffline()) {
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
		const costOfGoods = sold * item.cost;
		const packagingCost = sold * packagingOptions[gameState.packaging].cost;
		totalSales += sold;
		totalRefunds += refunds;
		totalRevenue += revenue;
		totalRefundValue += refundValue;
		totalCostOfGoods += costOfGoods;
		totalPackagingCost += packagingCost;
		soldItems.push({ ...item, sold, refunds });
	});

	const profit = totalRevenue - totalRefundValue - totalCostOfGoods - totalPackagingCost;
	gameState.cash += totalRevenue - totalRefundValue - totalPackagingCost;
	gameState.xp += Math.max(0, Math.round(profit));
	gameState.lastSales = totalSales;
	gameState.lastRefunds = totalRefunds;
	gameState.lastSoldItems = soldItems;
	const extraRevenue = applyRecommendedSellerMinimum();
	updateReputation(gameState.lastSoldItems, gameState.lastSales);
	gameState.round += 1;
	trackSalesHistory(totalRevenue + extraRevenue);
	updateEventDurations();

	updateMarketShare();
	updateStats();
	renderInventory();
	renderSuppliers();
	renderSkills();
}

function calculateDemand(item) {
	const visibilityFactor = 0.6 + gameState.visibility / 140;
	const priceScore = Math.max(0.4, 1.3 - item.sellPrice / 120);
	const qualityScore = item.quality / 100;
	const randomness = randomBetween(0.8, 1.2);
	const baseDemand = Math.floor(getCustomerPoolSize() * 0.2);
	const campaignMultiplier = isCampaignBoostActive() ? 3 : 1;
	return Math.max(0, Math.round(baseDemand * visibilityFactor * priceScore * (0.6 + qualityScore) * randomness * campaignMultiplier));
}

function calculateRefundRate(quality) {
	const qualityFactor = 1 - quality / 100;
	const packaging = packagingOptions[gameState.packaging];
	const base = 0.04 + qualityFactor * 0.12 + randomBetween(0, 0.03);
	return Math.min(0.4, Math.max(0, base + packaging.refundDelta));
}

function updateReputation(soldItems, totalSales) {
	if (totalSales === 0) {
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

function calculateStoreScore(rating, reviews, price, visibility) {
	const ratingWeight = (rating || 0) * 18;
	const reviewWeight = Math.sqrt(Math.max(reviews || 0, 0)) * 4;
	const priceWeight = Math.max(0.6, 1.4 - price / 95) * 100;
	const visibilityWeight = visibility * 1.2;
	return ratingWeight + reviewWeight + priceWeight + visibilityWeight;
}

function updateMarketShare() {
	const avgPrice = getAverageSellPrice() || 80;
	const playerScore = calculateStoreScore(gameState.rating || 0, gameState.reviews, avgPrice, gameState.visibility);
	const competitorScores = competitors.map((competitor) =>
		calculateStoreScore(competitor.rating, competitor.reviews, competitor.price, competitor.visibility)
	);
	const totalCustomers = getCustomerPoolSize();
	const customerSplit = allocateCustomers(totalCustomers, [playerScore, ...competitorScores]);
	const playerCustomers = customerSplit[0];
	const competitorCustomers = customerSplit.slice(1);
	const playerPurchased = Math.min(gameState.lastSales, playerCustomers);
	const purchasedTotals = [playerPurchased, ...competitorCustomers];
	const totalPurchased = purchasedTotals.reduce((sum, value) => sum + value, 0);
	const shares = purchasedTotals.map((value, index) => ({
		name: index === 0 ? "Você" : competitors[index - 1].name,
		value: totalPurchased > 0 ? value / totalPurchased : 0,
		type: index === 0 ? "player" : "competitor"
	}));
	const bankruptCompetitors = [];
	shares.forEach((share, index) => {
		if (share.type === "competitor" && share.value < 0.01) {
			const competitor = competitors[index - 1];
			if (competitor) {
				bankruptCompetitors.push(competitor.name);
			}
		}
	});
	if (bankruptCompetitors.length > 0) {
		competitors = competitors.filter((competitor) => !bankruptCompetitors.includes(competitor.name));
		bankruptCompetitors.forEach((name) => addFeedEntry(`🏁 ${name} declarou falência e saiu do mercado.`));
		return updateMarketShare();
	}
	gameState.marketShare = shares;
	gameState.customerCounts = [
		{ name: "Você", value: playerCustomers },
		...competitorCustomers.map((value, index) => ({ name: competitors[index].name, value }))
	];
	renderMarketShare();
}

function getCustomerPoolSize() {
	const base = 24000 + randomBetween(-2000, 2000);
	const visibilityBoost = gameState.visibility * 120;
	const campaignMultiplier = isCampaignBoostActive() ? 3 : 1;
	return Math.round(clamp((base + visibilityBoost) * campaignMultiplier, 18000, 65000));
}

function allocateCustomers(totalCustomers, scores) {
	const totalScore = scores.reduce((sum, value) => sum + value, 0);
	if (totalScore <= 0) {
		const equal = Math.floor(totalCustomers / scores.length);
		return scores.map(() => equal);
	}
	const raw = scores.map((value) => (value / totalScore) * totalCustomers);
	const allocated = raw.map((value) => Math.max(1, Math.round(value)));
	const delta = totalCustomers - allocated.reduce((sum, value) => sum + value, 0);
	if (delta !== 0) {
		const index = scores.indexOf(Math.max(...scores));
		allocated[index] = Math.max(1, allocated[index] + delta);
	}
	return allocated;
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
	const autoRestockUnlocked = gameState.skills.autoRestock;
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
				<label>
					${t("restockThresholdLabel")}
					<input type="number" min="0" value="${item.autoRestockThreshold ?? 0}" onchange="updateAutoRestock('${item.productId}', 'threshold', this.value)" ${autoRestockUnlocked ? "" : "disabled"}>
				</label>
				<label>
					${t("restockQuantityLabel")}
					<input type="number" min="0" value="${item.autoRestockQty ?? 0}" onchange="updateAutoRestock('${item.productId}', 'quantity', this.value)" ${autoRestockUnlocked ? "" : "disabled"}>
				</label>
				${autoRestockUnlocked ? "" : `<small class="status-note">${t("restockLocked")}</small>`}
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
	const xpStat = document.getElementById("xpStat");

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
	if (xpStat) {
		xpStat.textContent = gameState.xp;
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

function renderSuppliers() {
	suppliers.forEach((supplier) => {
		supplier.products.forEach((product) => {
			const stats = document.querySelector(`[data-product-stats="${product.id}"]`);
			if (stats) {
				stats.textContent = `${t("qualityLabel")}: ${Math.round(product.quality)}/100 · ${t("costLabel")}: R$ ${product.cost.toFixed(0)}`;
			}
			updatePurchaseTotal(product.id);
		});
	});
}

function updatePurchaseTotal(productId) {
	const qtyInput = document.querySelector(`input[data-product="${productId}"]`);
	const totalSlot = document.querySelector(`[data-product-total="${productId}"] strong`);
	const details = findProduct(productId);
	if (!qtyInput || !totalSlot || !details) {
		return;
	}
	const quantity = Math.max(0, Number(qtyInput.value) || 0);
	totalSlot.textContent = `R$ ${Math.round(details.product.cost * quantity)}`;
}

function updateAutoRestock(productId, field, value) {
	if (!gameState.skills.autoRestock) {
		return;
	}
	const entry = gameState.inventory.find((item) => item.productId === productId);
	if (!entry) {
		return;
	}
	const parsed = Math.max(0, Number(value) || 0);
	if (field === "threshold") {
		entry.autoRestockThreshold = parsed;
	} else if (field === "quantity") {
		entry.autoRestockQty = parsed;
	}
}

function handleAutoRestock() {
	if (!gameState.skills.autoRestock) {
		return;
	}
	gameState.inventory.forEach((item) => {
		const threshold = Number(item.autoRestockThreshold) || 0;
		const quantity = Number(item.autoRestockQty) || 0;
		if (threshold <= 0 || quantity <= 0 || item.stock >= threshold) {
			return;
		}
		const details = findProduct(item.productId);
		if (!details) {
			return;
		}
		const totalCost = details.product.cost * quantity;
		if (gameState.cash < totalCost) {
			return;
		}
		gameState.cash -= totalCost;
		item.stock += quantity;
		item.cost = details.product.cost;
		item.quality = details.product.quality;
	});
}

function applyRandomEvents() {
	triggerRandomEvent();
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
	gameState.feed = gameState.feed.slice(0, 50);
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

function renderSkills() {
	const container = document.getElementById("skillsTree");
	if (!container) {
		return;
	}
	const marketShare = gameState.marketShare.find((entry) => entry.type === "player")?.value || 0;
	container.innerHTML = Object.keys(skillTree).map((skillKey) => {
		const skill = skillTree[skillKey];
		const unlocked = gameState.skills[skillKey];
		const requirementsMet = skill.requirements.every((req) => gameState.skills[req]);
		const marketShareRequirement = skillKey === "recommendedSeller" ? marketShare >= 0.2 : true;
		const canUnlock = !unlocked && requirementsMet && marketShareRequirement && gameState.xp >= skill.cost;
		const requirementsLabel = [
			...skill.requirements.map((req) => t(`skills.${req}`)),
			...(skillKey === "recommendedSeller" ? [t("skillMarketShare")] : [])
		];
		return `
			<div class="skill-card ${unlocked ? "unlocked" : ""}">
				<div>
					<strong>${t(`skills.${skillKey}`)}</strong>
					<small>XP: ${skill.cost}</small>
					${requirementsLabel.length ? `<small>${t("skillRequirements")}: ${requirementsLabel.join(", ")}</small>` : ""}
				</div>
				<button class="secondary" onclick="unlockSkill('${skillKey}')" ${canUnlock ? "" : "disabled"}>
					${unlocked ? t("skillUnlocked") : t("skillUnlock")}
				</button>
			</div>
		`;
	}).join("");
}

function unlockSkill(skillKey) {
	const skill = skillTree[skillKey];
	if (!skill || gameState.skills[skillKey]) {
		return;
	}
	const marketShare = gameState.marketShare.find((entry) => entry.type === "player")?.value || 0;
	if (skillKey === "recommendedSeller" && marketShare < 0.2) {
		alert(t("skillMarketShare"));
		return;
	}
	if (!skill.requirements.every((req) => gameState.skills[req])) {
		alert("Requisitos não atendidos.");
		return;
	}
	if (gameState.xp < skill.cost) {
		alert("XP insuficiente.");
		return;
	}
	gameState.xp -= skill.cost;
	gameState.skills[skillKey] = true;
	addFeedEntry(`⭐ Habilidade desbloqueada: ${t(`skills.${skillKey}`)}.`);
	renderSkills();
	renderGameScreen();
}

function renderMarketingButton(actionKey) {
	const action = marketingActions[actionKey];
	if (!action) {
		return "";
	}
	const unlocked = gameState.skills[action.skill];
	return `
		<div class="marketing-card">
			<button onclick="runMarketing('${actionKey}')" ${unlocked ? "" : "disabled"}>${t(`marketingActions.${actionKey}`)}</button>
			<small>${t("marketingCostLabel")}: R$ ${action.cost}</small>
		</div>
	`;
}

function renderPackagingOption(optionKey) {
	const option = packagingOptions[optionKey];
	const checked = gameState.packaging === optionKey;
	return `
		<label class="packaging-card ${checked ? "active" : ""}">
			<input type="radio" name="packaging" value="${optionKey}" ${checked ? "checked" : ""} onchange="setPackaging('${optionKey}')">
			<div>
				<strong>${t(`packagingOptions.${optionKey}`)}</strong>
				<small>${t(`packagingNotes.${optionKey}`)}</small>
			</div>
		</label>
	`;
}

function setPackaging(optionKey) {
	if (!packagingOptions[optionKey]) {
		return;
	}
	gameState.packaging = optionKey;
	renderGameScreen();
}

function setGameSpeed(speed) {
	gameState.gameSpeed = speed;
	gameState.paused = false;
	startSimulationLoop();
	updateSpeedControls();
}

function togglePause() {
	gameState.paused = !gameState.paused;
	if (gameState.paused) {
		resetLoops();
	} else {
		startSimulationLoop();
		startFeedLoop();
		startAutosave();
	}
	updateSpeedControls();
}

function updateSpeedControls() {
	const pauseButton = document.getElementById("pauseButton");
	const speedNormal = document.getElementById("speedNormal");
	const speedFast = document.getElementById("speedFast");
	if (pauseButton) {
		pauseButton.classList.toggle("active", gameState.paused);
	}
	if (speedNormal) {
		speedNormal.classList.toggle("active", gameState.gameSpeed === 1 && !gameState.paused);
	}
	if (speedFast) {
		speedFast.classList.toggle("active", gameState.gameSpeed === 2 && !gameState.paused);
	}
}

function trackSalesHistory(totalRevenue) {
	gameState.salesHistory.unshift(totalRevenue);
	gameState.salesHistory = gameState.salesHistory.slice(0, 10);
}

function applyRecommendedSellerMinimum() {
	if (!gameState.skills.recommendedSeller) {
		return 0;
	}
	if (isMarketplaceOffline()) {
		return 0;
	}
	if (gameState.lastSales >= 400) {
		return 0;
	}
	const needed = 400 - gameState.lastSales;
	let remaining = needed;
	const itemsWithStock = gameState.inventory.filter((item) => item.stock > 0);
	if (itemsWithStock.length === 0) {
		return 0;
	}
	let extraRevenue = 0;
	itemsWithStock.forEach((item) => {
		if (remaining <= 0) {
			return;
		}
		const extra = Math.min(item.stock, Math.ceil(remaining / itemsWithStock.length));
		if (extra <= 0) {
			return;
		}
		item.stock -= extra;
		const refundRate = calculateRefundRate(item.quality);
		const refunds = Math.round(extra * refundRate);
		const revenue = extra * item.sellPrice;
		extraRevenue += revenue;
		const refundValue = refunds * item.sellPrice;
		const packagingCost = extra * packagingOptions[gameState.packaging].cost;
		const costOfGoods = extra * item.cost;
		gameState.cash += revenue - refundValue - packagingCost;
		gameState.lastSales += extra;
		gameState.lastRefunds += refunds;
		gameState.lastSoldItems.push({ ...item, sold: extra, refunds });
		const profit = revenue - refundValue - packagingCost - costOfGoods;
		gameState.xp += Math.max(0, Math.round(profit));
		remaining -= extra;
	});
	return extraRevenue;
}

function applyEvents() {
	applyRandomEvents();
	gameState.activeEvents.forEach((event) => {
		if (event.id === "taxes" && !event.processed) {
			const sum = gameState.salesHistory.reduce((acc, value) => acc + value, 0);
			const tax = Math.round(sum * 0.05);
			gameState.cash -= tax;
			event.processed = true;
			addFeedEntry(`🏛️ Governo cobrou impostos de R$ ${tax}.`);
		}
		if (event.id === "packingFailure" && !event.processed) {
			gameState.cash -= 10000;
			event.processed = true;
			addFeedEntry("🛠️ Equipamentos de empacotamento quebraram. Reparos de R$ 10.000.");
		}
	});
}

function triggerRandomEvent() {
	if (gameState.activeEvents.some((event) => event.remaining > 0)) {
		return;
	}
	const roll = Math.random();
	if (roll > 0.2) {
		return;
	}
	const event = eventCatalog[Math.floor(Math.random() * eventCatalog.length)];
	const entry = { id: event.id, remaining: event.duration, processed: false };
	gameState.activeEvents.push(entry);
	switch (event.id) {
	case "marketplaceOutage":
		addFeedEntry("🚧 Marketplace fora do ar. Nenhuma venda ocorrerá por 5 atualizações.");
		break;
	case "taxes":
		addFeedEntry("🏛️ Governo anunciou cobrança de impostos.");
		break;
	case "packingFailure":
		addFeedEntry("🛠️ Equipamentos de empacotamento quebraram.");
		break;
	case "stolenCargo":
		addFeedEntry("🚨 Alerta de carga roubada. A próxima compra será perdida.");
		break;
	case "campaignBoost":
		addFeedEntry("📈 Campanha geral: vendas triplicadas por 5 atualizações.");
		break;
	default:
		break;
	}
}

function updateEventDurations() {
	gameState.activeEvents.forEach((event) => {
		if (event.id === "stolenCargo") {
			return;
		}
		if (event.remaining > 0) {
			event.remaining -= 1;
		}
	});
	gameState.activeEvents = gameState.activeEvents.filter((event) => {
		if (event.id === "stolenCargo") {
			return true;
		}
		if (event.remaining > 0) {
			return true;
		}
		return !event.processed && (event.id === "taxes" || event.id === "packingFailure");
	});
}

function isMarketplaceOffline() {
	return gameState.activeEvents.some((event) => event.id === "marketplaceOutage" && event.remaining > 0);
}

function isCampaignBoostActive() {
	return gameState.activeEvents.some((event) => event.id === "campaignBoost" && event.remaining > 0);
}

function openSaveSelection() {
	return new Promise((resolve) => {
		const existingModal = document.getElementById("modalRoot");
		if (existingModal) {
			existingModal.remove();
		}

		const modalRoot = document.createElement("div");
		modalRoot.id = "modalRoot";
		const saves = getSaveIndex();
		const listItems = saves.length
			? saves.map((entry) => `
				<button class="save-entry" data-save="${entry.name}">
					<strong>${entry.name}</strong>
					<small>${new Date(entry.savedAt).toLocaleString()}</small>
				</button>
			`).join("")
			: `<p class="status-note">${t("loadEmpty")}</p>`;
		modalRoot.innerHTML = `
			<div class="modal-backdrop">
				<div class="modal-card">
					<h3>${t("loadTitle")}</h3>
					<div class="save-list">${listItems}</div>
					<div class="modal-actions">
						<button class="secondary" data-action="cancel">${t("cancelAction")}</button>
					</div>
				</div>
			</div>
		`;

		document.body.appendChild(modalRoot);

		const closeModal = (value) => {
			modalRoot.remove();
			resolve(value);
		};

		modalRoot.querySelectorAll(".save-entry").forEach((button) => {
			button.addEventListener("click", () => closeModal(button.dataset.save));
		});

		const cancelButton = modalRoot.querySelector('[data-action="cancel"]');
		cancelButton.addEventListener("click", () => closeModal(null));
		modalRoot.querySelector(".modal-backdrop").addEventListener("click", (event) => {
			if (event.target === modalRoot.querySelector(".modal-backdrop")) {
				closeModal(null);
			}
		});
	});
}

function getSaveIndex() {
	try {
		const saved = JSON.parse(localStorage.getItem("marketplace-save-index")) || [];
		if (saved.length === 0) {
			const generated = [];
			for (let i = 0; i < localStorage.length; i += 1) {
				const key = localStorage.key(i);
				if (!key || !key.startsWith("marketplace-save-")) {
					continue;
				}
				const raw = localStorage.getItem(key);
				if (!raw) {
					continue;
				}
				try {
					const parsed = JSON.parse(raw);
					if (parsed?.companyName && parsed?.savedAt) {
						generated.push({ name: parsed.companyName, savedAt: parsed.savedAt });
					}
				} catch (error) {
					console.error(error);
				}
			}
			return generated.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
		}
		return saved.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
	} catch (error) {
		console.error(error);
		return [];
	}
}

loadSettings();
renderMainMenu();
