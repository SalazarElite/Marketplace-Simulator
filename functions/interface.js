const ipcRenderer = window?.require ? window.require('electron').ipcRenderer : {
	send: () => {},
	invoke: () => Promise.resolve()
};
const fs = window?.require ? window.require('fs') : null;
const path = window?.require ? window.require('path') : null;
const SAVE_DIR = fs && path ? path.join(__dirname, "Savegames") : null;
const CONFIG_FILE = fs && path ? path.join(__dirname, "config.json") : null;

const translations = {
	pt: {
		optionsTitle: "Opções",
		creditsTitle: "Créditos",
		backToMenu: "Voltar",
		loadGame: "Carregar Jogo",
		newGame: "Novo Jogo",
		saveGame: "Salvar Jogo",
		mainMenuAction: "Menu Principal",
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
		tabs: {
			inventory: "Depósito",
			suppliers: "Fornecedores",
			market: "Market share",
			skills: "Habilidades",
			marketing: "Marketing",
			bank: "Banco",
			production: "Cadeia de produção"
		},
		productionTitle: "Cadeia de produção",
		productionHint: "Gerencie equipes, lotes e maquinário para fabricar eletrônicos.",
		productionSummaryTitle: "Resumo da produção",
		productionPlantsLabel: "Plantas ativas",
		productionSpeedLabel: "Velocidade atual",
		productionDailyOutputLabel: "Produção diária",
		productionTabs: {
			employees: "Funcionários",
			lots: "Lotes",
			machinery: "Maquinário"
		},
		productionRoles: {
			engineer: "Engenheiro",
			programmer: "Programador",
			operator: "Operador de Máquinas",
			qa: "Controle de Qualidade"
		},
		productionRoleRequirement: "1 de cada para 1x",
		productionHire: "Contratar",
		productionFire: "Remover",
		productionPlant: "Planta",
		productionSelectProduct: "Produto",
		productionCapacityLabel: "Capacidade",
		productionEmployeesLabel: "Funcionários",
		productionMachinesLabel: "Máquinas",
		productionNoPlants: "Compre um lote para iniciar sua produção.",
		productionLotsTitle: "Mapa de lotes",
		productionLotsHint: "Áreas construídas são mais caras, mas já vêm prontas para operar. Lotes cinza ainda não podem ser comprados.",
		productionBuyLot: "Comprar lote",
		productionOwnedLot: "Adquirido",
		productionLotSize: "Tamanho",
		productionLotStructure: "Estrutura",
		productionLotCapacity: "Capacidade máxima",
		productionMachineBuy: "Comprar máquina",
		productionMachineOwned: "Máquinas atuais",
		productionMachineryHint: "Cada máquina aumenta a capacidade de produção da planta.",
		productionLotStructures: {
			empty: "Terreno vazio",
			house: "Casa simples",
			smallBuilding: "Prédio pequeno",
			largeBuilding: "Prédio grande"
		},
		productionLotSizes: {
			small: "Pequeno",
			medium: "Médio",
			large: "Grande"
		},
		productionMapLegend: "Legenda do mapa",
		productionMapLegendItems: {
			empty: "Área em branco",
			house: "Casa simples",
			smallBuilding: "Prédio pequeno",
			largeBuilding: "Prédio grande",
			owned: "Lote adquirido",
			unavailable: "Indisponível"
		},
		productionLotUnavailable: "Saldo insuficiente para compra.",
		inventoryMiniChartLabel: "Estoque x vendas",
		bankTitle: "Banco",
		bankHint: "Escolha um empréstimo para aumentar seu caixa agora e pagar ao longo dos dias.",
		bankActiveLoan: "Empréstimo ativo",
		bankInstallmentsLeft: "Parcelas restantes",
		bankInstallmentValue: "Valor da parcela",
		bankNextPayment: "Dias para próxima parcela",
		bankTakeLoan: "Pegar empréstimo",
		bankLoanAmount: "Valor liberado",
		bankLoanTotal: "Total com juros",
		bankLoanInterest: "Juros",
		bankLoanInstallments: "Parcelas",
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
		dateLabel: "Data",
		eventsTitle: "Eventos ativos",
		eventsNone: "Nenhum evento ativo no momento.",
		eventsDaysLeft: "dias restantes",
		optionsResolution: "Resolução",
		optionsFullscreen: "Tela cheia",
		optionsLanguage: "Idioma",
		optionsAutosave: "Auto-save (minutos)",
		optionsAutosaveHint: "O jogo salva automaticamente no intervalo definido.",
		creditsText: "Simulação criada para testar sua estratégia de marketplace.",
		loadMissing: "Nenhum save encontrado para este nome.",
		saveSuccess: "Jogo Salvo com Sucesso",
		saveAuto: "Jogo salvo automaticamente.",
		saveFail: "Não foi possível salvar.",
		victoryTitle: "Vitória!",
		victoryMessage: "Você conquistou mais de 90% de market share e se tornou líder absoluto do mercado.",
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
		insufficientFundsTitle: "Saldo Insuficiente",
		insufficientFundsMessage: "Você não tem dinheiro o bastante para esta ação.",
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
		},
		events: {
			marketplaceOutage: "Marketplace fora do ar",
			taxes: "Governo cobrando impostos",
			packingFailure: "Equipamentos de empacotamento quebraram",
			campaignBoost: "Campanha geral"
		}
	},
	en: {
		optionsTitle: "Options",
		creditsTitle: "Credits",
		backToMenu: "Back",
		loadGame: "Load Game",
		newGame: "New Game",
		saveGame: "Save Game",
		mainMenuAction: "Main Menu",
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
		tabs: {
			inventory: "Warehouse",
			suppliers: "Suppliers",
			market: "Market share",
			skills: "Skills",
			marketing: "Marketing",
			bank: "Bank",
			production: "Production chain"
		},
		productionTitle: "Production chain",
		productionHint: "Manage teams, lots, and machinery to manufacture electronics.",
		productionSummaryTitle: "Production summary",
		productionPlantsLabel: "Active plants",
		productionSpeedLabel: "Current speed",
		productionDailyOutputLabel: "Daily output",
		productionTabs: {
			employees: "Staff",
			lots: "Lots",
			machinery: "Machinery"
		},
		productionRoles: {
			engineer: "Engineer",
			programmer: "Programmer",
			operator: "Machine operator",
			qa: "Quality control"
		},
		productionRoleRequirement: "1 of each for 1x",
		productionHire: "Hire",
		productionFire: "Remove",
		productionPlant: "Plant",
		productionSelectProduct: "Product",
		productionCapacityLabel: "Capacity",
		productionEmployeesLabel: "Employees",
		productionMachinesLabel: "Machines",
		productionNoPlants: "Purchase a lot to start production.",
		productionLotsTitle: "Lot map",
		productionLotsHint: "Built areas cost more, but are ready to operate. Gray lots cannot be purchased yet.",
		productionBuyLot: "Buy lot",
		productionOwnedLot: "Owned",
		productionLotSize: "Size",
		productionLotStructure: "Structure",
		productionLotCapacity: "Max capacity",
		productionMachineBuy: "Buy machine",
		productionMachineOwned: "Current machines",
		productionMachineryHint: "Each machine increases the plant production capacity.",
		productionLotStructures: {
			empty: "Empty land",
			house: "Simple house",
			smallBuilding: "Small building",
			largeBuilding: "Large building"
		},
		productionLotSizes: {
			small: "Small",
			medium: "Medium",
			large: "Large"
		},
		productionMapLegend: "Map legend",
		productionMapLegendItems: {
			empty: "Blank area",
			house: "Simple house",
			smallBuilding: "Small building",
			largeBuilding: "Large building",
			owned: "Owned lot",
			unavailable: "Unavailable"
		},
		productionLotUnavailable: "Insufficient funds to purchase.",
		inventoryMiniChartLabel: "Stock vs sales",
		bankTitle: "Bank",
		bankHint: "Choose a loan to boost your cash now and repay over days.",
		bankActiveLoan: "Active loan",
		bankInstallmentsLeft: "Installments left",
		bankInstallmentValue: "Installment value",
		bankNextPayment: "Days until next installment",
		bankTakeLoan: "Take loan",
		bankLoanAmount: "Amount released",
		bankLoanTotal: "Total with interest",
		bankLoanInterest: "Interest",
		bankLoanInstallments: "Installments",
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
		dateLabel: "Date",
		eventsTitle: "Active events",
		eventsNone: "No active events right now.",
		eventsDaysLeft: "days left",
		optionsResolution: "Resolution",
		optionsFullscreen: "Fullscreen",
		optionsLanguage: "Language",
		optionsAutosave: "Auto-save (minutes)",
		optionsAutosaveHint: "Game saves automatically in the selected interval.",
		creditsText: "Simulation created to test your marketplace strategy.",
		loadMissing: "No save found for this name.",
		saveSuccess: "Game saved successfully.",
		saveAuto: "Game saved automatically.",
		saveFail: "Unable to save.",
		victoryTitle: "Victory!",
		victoryMessage: "You reached more than 90% market share and became the absolute market leader.",
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
		insufficientFundsTitle: "Insufficient Balance",
		insufficientFundsMessage: "You don't have enough money for this action.",
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
		},
		events: {
			marketplaceOutage: "Marketplace offline",
			taxes: "Government taxes",
			packingFailure: "Packaging machines broke down",
			campaignBoost: "Global campaign"
		}
	}
};

const baseResolutionOptions = [
	{ label: "1024x576", width: 1024, height: 576 },
	{ label: "1280x720", width: 1280, height: 720 },
	{ label: "1366x768", width: 1366, height: 768 },
	{ label: "1600x900", width: 1600, height: 900 },
	{ label: "1920x1080", width: 1920, height: 1080 }
];

function getNativeResolution() {
	let width = 0;
	let height = 0;
	if (window?.require) {
		try {
			const { screen } = window.require("electron");
			const primary = screen?.getPrimaryDisplay?.();
			width = primary?.size?.width || primary?.workAreaSize?.width || 0;
			height = primary?.size?.height || primary?.workAreaSize?.height || 0;
		} catch (error) {
			console.error(error);
		}
	}
	if (!width || !height) {
		width = window?.screen?.width || 0;
		height = window?.screen?.height || 0;
	}
	return width && height ? { width, height } : null;
}

function buildResolutionOptions() {
	const nativeResolution = getNativeResolution();
	let options = baseResolutionOptions.slice();
	if (nativeResolution) {
		options = options.filter((option) => option.width <= nativeResolution.width && option.height <= nativeResolution.height);
		const label = `${nativeResolution.width}x${nativeResolution.height}`;
		options.push({ label, width: nativeResolution.width, height: nativeResolution.height });
	}
	const unique = [];
	options.forEach((option) => {
		if (!unique.some((entry) => entry.width === option.width && entry.height === option.height)) {
			unique.push(option);
		}
	});
	return unique.sort((a, b) => (a.width * a.height) - (b.width * b.height));
}

let resolutionOptions = buildResolutionOptions();
const defaultResolution = resolutionOptions[1] || resolutionOptions[0];

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
	cash: 60000,
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
	productSalesHistory: {},
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
	pendingNotices: [],
	currentDate: new Date(),
	settings: {
		resolution: defaultResolution,
		fullscreen: false,
		language: "pt",
		autosaveMinutes: 5
	},
	purchaseQuantities: {},
	loan: null,
	production: {
		lotsOwned: [],
		plants: []
	},
	ui: {
		currentScreen: "menu",
		previousScreen: "menu",
		activeTab: "inventory",
		productionTab: "employees",
		selectedLotId: null
	},
	victoryAchieved: false,
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

const productionRoles = [
	{ key: "engineer", salary: 750 },
	{ key: "programmer", salary: 680 },
	{ key: "operator", salary: 620 },
	{ key: "qa", salary: 560 }
];

const productionLineRequirements = {
	machines: 3,
	employees: 4
};

const minimumLotLines = 10;
const lotBasePrices = {
	empty: 20000,
	house: 150000,
	smallBuilding: 800000,
	largeBuilding: 800000
};
const lotSizeMultipliers = {
	small: 1,
	medium: 1.25,
	large: 1.6
};
const lotStructureMultipliers = {
	empty: 1,
	house: 1,
	smallBuilding: 1,
	largeBuilding: 1.25
};

const productionCatalog = [
	{ id: "smart-speaker", name: "Caixa inteligente Aurora", baseQuality: 86 },
	{ id: "smartwatch", name: "Relógio Pulse X", baseQuality: 82 },
	{ id: "drone", name: "Drone Skyline Mini", baseQuality: 88 },
	{ id: "hub", name: "Central Domus IoT", baseQuality: 84 }
];

function buildLotCapacity(lines) {
	const totalLines = Math.max(lines, minimumLotLines);
	return {
		lines: totalLines,
		maxEmployees: totalLines * productionLineRequirements.employees,
		maxMachines: totalLines * productionLineRequirements.machines
	};
}

function calculateLotPrice({ structure, size }) {
	const base = lotBasePrices[structure] || lotBasePrices.empty;
	const sizeMultiplier = lotSizeMultipliers[size] || 1;
	const structureMultiplier = lotStructureMultipliers[structure] || 1;
	return Math.round(base * sizeMultiplier * structureMultiplier);
}

function createProductionLot({ lines, ...lot }) {
	const capacity = buildLotCapacity(lines);
	return {
		...lot,
		price: lot.price ?? calculateLotPrice(lot),
		...capacity
	};
}

const productionLots = [
	createProductionLot({
		id: "lot-01",
		name: "Quadra Central 12",
		size: "small",
		structure: "empty",
		lines: 10,
		mapIndex: 1
	}),
	createProductionLot({
		id: "lot-02",
		name: "Avenida Horizonte",
		size: "medium",
		structure: "house",
		lines: 12,
		mapIndex: 2
	}),
	createProductionLot({
		id: "lot-03",
		name: "Distrito Nova Luz",
		size: "large",
		structure: "smallBuilding",
		lines: 16,
		mapIndex: 3
	}),
	createProductionLot({
		id: "lot-04",
		name: "Zona Portuária",
		size: "medium",
		structure: "empty",
		lines: 13,
		mapIndex: 5
	}),
	createProductionLot({
		id: "lot-05",
		name: "Bairro Jardim Sul",
		size: "small",
		structure: "house",
		lines: 10,
		mapIndex: 6
	}),
	createProductionLot({
		id: "lot-06",
		name: "Setor Tecnológico",
		size: "large",
		structure: "largeBuilding",
		lines: 20,
		mapIndex: 8
	}),
	createProductionLot({
		id: "lot-07",
		name: "Praça do Lago",
		size: "medium",
		structure: "empty",
		lines: 14,
		mapIndex: 10
	}),
	createProductionLot({
		id: "lot-08",
		name: "Boulevard Norte",
		size: "large",
		structure: "smallBuilding",
		lines: 18,
		mapIndex: 11
	})
];

const machineryCatalog = [
	{ id: "assembly", name: "Linha de montagem compacta", cost: 2100 },
	{ id: "solder", name: "Robô de solda de precisão", cost: 2800 },
	{ id: "tester", name: "Bancada de testes finais", cost: 1900 }
];

const eventCatalog = [
	{ id: "marketplaceOutage", name: "Marketplace fora do ar", duration: () => randomInt(1, 7) },
	{ id: "taxes", name: "Governo cobrando impostos", duration: 0 },
	{ id: "packingFailure", name: "Equipamentos de empacotamento quebraram", duration: 0 },
	{ id: "campaignBoost", name: "Campanha geral", duration: () => randomInt(5, 20) }
];

const loanOptions = [
	{ id: "loan-10k", amount: 10000 },
	{ id: "loan-100k", amount: 100000 },
	{ id: "loan-1m", amount: 1000000 }
];

function ensureSaveDir() {
	if (!fs || !SAVE_DIR) {
		return;
	}
	try {
		fs.mkdirSync(SAVE_DIR, { recursive: true });
	} catch (error) {
		console.error(error);
	}
}

function sanitizeFileName(name) {
	return name.replace(/[\\/:*?"<>|]/g, "-").trim();
}

function writeJsonFile(filePath, payload) {
	if (!fs || !filePath) {
		return false;
	}
	try {
		fs.writeFileSync(filePath, JSON.stringify(payload, null, 2));
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
}

function readJsonFile(filePath) {
	if (!fs || !filePath) {
		return null;
	}
	try {
		if (!fs.existsSync(filePath)) {
			return null;
		}
		const raw = fs.readFileSync(filePath, "utf8");
		return JSON.parse(raw);
	} catch (error) {
		console.error(error);
		return null;
	}
}

function saveSettings() {
	try {
		if (CONFIG_FILE) {
			writeJsonFile(CONFIG_FILE, gameState.settings);
			return;
		}
		localStorage.setItem("marketplace-settings", JSON.stringify(gameState.settings));
	} catch (error) {
		console.error(error);
	}
}

function loadSettings() {
	try {
		if (CONFIG_FILE) {
			const parsed = readJsonFile(CONFIG_FILE);
			if (parsed) {
				Object.assign(gameState.settings, parsed);
			}
			refreshResolutionOptions();
			return;
		}
		const saved = localStorage.getItem("marketplace-settings");
		if (saved) {
			const parsed = JSON.parse(saved);
			Object.assign(gameState.settings, parsed);
		}
		refreshResolutionOptions();
	} catch (error) {
		console.error(error);
	}
}

function refreshResolutionOptions() {
	resolutionOptions = buildResolutionOptions();
	if (!resolutionOptions.length) {
		return;
	}
	const current = gameState.settings?.resolution;
	const match = current && resolutionOptions.find((option) => option.width === current.width && option.height === current.height);
	if (!match) {
		gameState.settings.resolution = resolutionOptions[resolutionOptions.length - 1];
	}
}

function applySettings() {
	const resolution = gameState.settings.resolution;
	if (resolution) {
		ipcRenderer.invoke("set-resolution", resolution);
	}
	const fullscreen = Boolean(gameState.settings.fullscreen);
	ipcRenderer.invoke("set-fullscreen", { fullscreen });
	if (!window?.require) {
		if (fullscreen) {
			document.documentElement.requestFullscreen?.();
		} else {
			document.exitFullscreen?.();
		}
	}
	updateHeaderTexts();
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

function updateHeaderTexts() {
	const saveButton = document.getElementById("saveButton");
	const menuButton = document.getElementById("menuButton");
	const speedLabel = document.querySelector(".header-speed-label");
	const pauseButton = document.getElementById("pauseButton");
	const speedNormal = document.getElementById("speedNormal");
	const speedFast = document.getElementById("speedFast");
	if (saveButton) {
		saveButton.textContent = t("saveGame");
	}
	if (menuButton) {
		menuButton.textContent = t("mainMenuAction");
	}
	if (speedLabel) {
		speedLabel.textContent = t("speedTitle");
	}
	if (pauseButton) {
		pauseButton.textContent = t("speedPause");
	}
	if (speedNormal) {
		speedNormal.textContent = t("speedNormal");
	}
	if (speedFast) {
		speedFast.textContent = t("speedFast");
	}
}

function setHeaderSpeedVisible(isVisible) {
	const headerSpeed = document.getElementById("headerSpeed");
	if (headerSpeed) {
		headerSpeed.classList.toggle("is-hidden", !isVisible);
	}
}

function setHeaderGameControlsEnabled(isEnabled) {
	const saveButton = document.getElementById("saveButton");
	const menuButton = document.getElementById("menuButton");
	if (saveButton) {
		saveButton.disabled = !isEnabled;
	}
	if (menuButton) {
		menuButton.disabled = !isEnabled;
	}
}

function renderMainMenu() {
	gameState.ui.currentScreen = "menu";
	updateHeaderTexts();
	setHeaderSpeedVisible(false);
	setHeaderGameControlsEnabled(false);
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

function showMessageModal({ title, message, confirmLabel = "Ok", onConfirm = null }) {
	const existingModal = document.getElementById("modalRoot");
	if (existingModal) {
		existingModal.remove();
	}

	const modalRoot = document.createElement("div");
	modalRoot.id = "modalRoot";
	modalRoot.innerHTML = `
		<div class="modal-backdrop">
			<div class="modal-card">
				<h3>${title}</h3>
				<p class="status-note">${message}</p>
				<div class="modal-actions">
					<button data-action="confirm">${confirmLabel}</button>
				</div>
			</div>
		</div>
	`;
	document.body.appendChild(modalRoot);

	const confirmButton = modalRoot.querySelector('[data-action="confirm"]');
	const closeModal = () => {
		modalRoot.remove();
		if (onConfirm) {
			onConfirm();
		}
	};
	confirmButton.addEventListener("click", closeModal);
	modalRoot.querySelector(".modal-backdrop").addEventListener("click", (event) => {
		if (event.target === modalRoot.querySelector(".modal-backdrop")) {
			closeModal();
		}
	});
}

async function newGame() {
	const name = await openCompanyPrompt();
	if (!name || !name.trim()) {
		return;
	}
	gameState.companyName = name.trim();
	gameState.round = 1;
	gameState.cash = 60000;
	gameState.rating = 0;
	gameState.reviews = 0;
	gameState.lastSales = 0;
	gameState.lastRefunds = 0;
	gameState.lastSoldItems = [];
	gameState.marketShare = [];
	gameState.visibility = 38;
	gameState.inventory = [];
	gameState.productSalesHistory = {};
	gameState.feed = [];
	gameState.customerCounts = [];
	gameState.salesHistory = [];
	gameState.packaging = "conventional";
	gameState.gameSpeed = 1;
	gameState.paused = false;
	gameState.xp = 0;
	gameState.purchaseQuantities = {};
	gameState.loan = null;
	gameState.production = {
		lotsOwned: [],
		plants: []
	};
	gameState.skills = {
		autoRestock: false,
		marketingSocial: false,
		marketingInfluencer: false,
		marketingFrete: false,
		recommendedSeller: false
	};
	gameState.activeEvents = [];
	gameState.currentDate = new Date();
	gameState.ui.activeTab = "inventory";
	gameState.ui.productionTab = "employees";
	gameState.victoryAchieved = false;
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
	let parsed = null;
	if (fs && path && SAVE_DIR) {
		const savePath = path.join(SAVE_DIR, saveName);
		parsed = readJsonFile(savePath);
	} else {
		const save = localStorage.getItem(`marketplace-save-${saveName}`);
		parsed = save ? JSON.parse(save) : null;
	}
	if (!parsed) {
		alert(t("loadMissing"));
		return;
	}
	Object.assign(gameState, parsed, {
		intervals: { roundLoop: null, autosave: null, feedLoop: null }
	});
	gameState.currentDate = parsed.currentDate ? new Date(parsed.currentDate) : new Date();
	if (!gameState.ui) {
		gameState.ui = { currentScreen: "menu", previousScreen: "menu", activeTab: "inventory" };
	}
	gameState.ui.activeTab = gameState.ui.activeTab || "inventory";
	gameState.ui.productionTab = gameState.ui.productionTab || "employees";
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
	if (!parsed.productSalesHistory) {
		gameState.productSalesHistory = {};
	}
	if (!parsed.gameSpeed) {
		gameState.gameSpeed = 1;
	}
	if (!parsed.purchaseQuantities) {
		gameState.purchaseQuantities = {};
	}
	if (!parsed.loan) {
		gameState.loan = null;
	}
	if (!parsed.production) {
		gameState.production = {
			lotsOwned: [],
			plants: []
		};
	} else {
		gameState.production.plants = (gameState.production.plants || []).map((plant) => ({
			...plant,
			machines: plant.machines ?? 0,
			productId: plant.productId || productionCatalog[0].id,
			employees: productionRoles.reduce((acc, role) => ({
				...acc,
				[role.key]: plant.employees?.[role.key] ?? 0
			}), {})
		}));
	}
	if (parsed.competitors) {
		competitors = parsed.competitors;
	} else {
		generateCompetitors();
	}
	if (typeof parsed.victoryAchieved !== "boolean") {
		gameState.victoryAchieved = false;
	}
	resetLoops();
	applySettings();
	renderGameScreen();
	updateMarketShare();
	startSimulationLoop();
	startFeedLoop();
	startAutosave();
}

function saveGame({ auto = false } = {}) {
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
			productSalesHistory: gameState.productSalesHistory,
			feed: gameState.feed,
			settings: gameState.settings,
			xp: gameState.xp,
			salesHistory: gameState.salesHistory,
			packaging: gameState.packaging,
			gameSpeed: gameState.gameSpeed,
			paused: gameState.paused,
			skills: gameState.skills,
			activeEvents: gameState.activeEvents,
			currentDate: gameState.currentDate ? gameState.currentDate.toISOString() : null,
			customerCounts: gameState.customerCounts,
			competitors,
			purchaseQuantities: gameState.purchaseQuantities,
			loan: gameState.loan,
			production: gameState.production,
			ui: gameState.ui,
			victoryAchieved: gameState.victoryAchieved
		};
		const savedAt = new Date().toISOString();
		const payload = { ...snapshot, savedAt };
		const fileSafeName = sanitizeFileName(gameState.companyName);
		if (fs && path && SAVE_DIR) {
			ensureSaveDir();
			const savePath = path.join(SAVE_DIR, `${fileSafeName}.json`);
			const saved = writeJsonFile(savePath, payload);
			if (saved) {
				const message = auto ? t("saveAuto") : t("saveSuccess");
				showSaveNotice(message, false, auto ? 10000 : 3000);
			} else {
				showSaveNotice(t("saveFail"), true, 4000);
			}
			return;
		}
		localStorage.setItem(`marketplace-save-${gameState.companyName}`, JSON.stringify(payload));
		updateSaveIndex(gameState.companyName, savedAt);
		showSaveNotice(auto ? t("saveAuto") : t("saveSuccess"), false, auto ? 10000 : 3000);
	} catch (error) {
		console.error(error);
	}
}

function manualSave() {
	saveGame({ auto: false });
}

function goToMainMenu() {
	resetLoops();
	gameState.paused = true;
	gameState.ui.currentScreen = "menu";
	renderMainMenu();
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

function showSaveNotice(message, isError = false, duration = 3000) {
	const notice = document.getElementById("headerNotice");
	if (!notice) {
		return;
	}
	notice.textContent = message;
	notice.classList.toggle("error", isError);
	notice.classList.add("visible");
	if (notice.dataset.timerId) {
		clearTimeout(Number(notice.dataset.timerId));
	}
	const timerId = setTimeout(() => {
		notice.classList.remove("visible");
		notice.classList.remove("error");
	}, duration);
	notice.dataset.timerId = timerId;
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
		saveGame({ auto: true });
	}, minutes * 60 * 1000);
}

function options() {
	const mainScreen = document.getElementById("mainScreen");
	gameState.ui.previousScreen = gameState.ui.currentScreen;
	gameState.ui.currentScreen = "options";
	updateHeaderTexts();
	setHeaderSpeedVisible(false);
	setHeaderGameControlsEnabled(gameState.ui.previousScreen === "game");
	refreshResolutionOptions();
	const optionsMarkup = resolutionOptions.map((option) => {
		const selected = option.width === gameState.settings.resolution.width && option.height === gameState.settings.resolution.height;
		return `<option value="${option.width}x${option.height}" ${selected ? "selected" : ""}>${option.label}</option>`;
	}).join("");

	mainScreen.innerHTML = `
		<div class="card">
			<div class="card-header">
				<h2>${t("optionsTitle")}</h2>
				<button class="secondary" onclick="goBack()">${t("backToMenu")}</button>
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
	if (gameState.ui.currentScreen === "game") {
		renderGameScreen();
	} else if (gameState.ui.currentScreen === "menu") {
		renderMainMenu();
	} else if (gameState.ui.currentScreen === "options") {
		options();
	} else if (gameState.ui.currentScreen === "credits") {
		credits();
	} else {
		renderMainMenu();
	}
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
	gameState.ui.previousScreen = gameState.ui.currentScreen;
	gameState.ui.currentScreen = "credits";
	updateHeaderTexts();
	setHeaderSpeedVisible(false);
	setHeaderGameControlsEnabled(gameState.ui.previousScreen === "game");
	mainScreen.innerHTML = `
		<div class="card">
			<div class="card-header">
				<h2>${t("creditsTitle")}</h2>
				<button class="secondary" onclick="goBack()">${t("backToMenu")}</button>
			</div>
			<p class="status-note">${t("creditsText")}</p>
		</div>
	`;
}

function goBack() {
	if (gameState.ui.previousScreen === "game") {
		renderGameScreen();
		return;
	}
	renderMainMenu();
}

function renderGameScreen() {
	gameState.ui.currentScreen = "game";
	const mainScreen = document.getElementById("mainScreen");
	const supplierCards = suppliers.map((supplier) => {
		const productsMarkup = supplier.products.map((product) => `
			<div class="product-row">
				<strong>${product.name}</strong>
				<small data-product-stats="${product.id}">${t("qualityLabel")}: ${Math.round(product.quality)}/100 · ${t("costLabel")}: ${formatCurrency(product.cost)}</small>
				<div class="inventory-actions">
					<label>
						${t("stockLabel")}
						<input type="number" min="1" max="9999" value="${getPurchaseQuantity(product.id)}" data-product="${product.id}" class="buy-qty" oninput="updatePurchaseQuantity('${product.id}', this.value)">
					</label>
					<div class="stepper">
						${renderStepperButtons(`adjustPurchaseQty('${product.id}',`)}
					</div>
					<div class="purchase-total" data-product-total="${product.id}">
						<span>${t("purchaseTotalLabel")}</span>
						<strong>${formatCurrency(product.cost * getPurchaseQuantity(product.id))}</strong>
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

	const tabs = [
		{ id: "inventory", label: t("tabs.inventory") },
		{ id: "suppliers", label: t("tabs.suppliers") },
		{ id: "market", label: t("tabs.market") },
		{ id: "skills", label: t("tabs.skills") },
		{ id: "marketing", label: t("tabs.marketing") },
		{ id: "bank", label: t("tabs.bank") },
		{ id: "production", label: t("tabs.production") }
	];
	const tabsMarkup = tabs.map((tab) => `
		<button class="tab-button ${gameState.ui.activeTab === tab.id ? "active" : ""}" data-tab="${tab.id}" onclick="setActiveTab('${tab.id}')">
			${tab.label}
		</button>
	`).join("");

	mainScreen.innerHTML = `
		<div class="event-bar" id="eventBar"></div>
		<div class="game-layout">
			<section class="card">
				<h2 class="panel-title">${gameState.companyName || t("companyNameLabel")}</h2>
				<div class="stat-grid">
					<div class="stat"><span>${t("cashLabel")}</span><strong id="cashStat">R$ 0</strong></div>
					<div class="stat"><span>${t("ratingLabel")}</span><strong id="ratingStat">0.0</strong></div>
					<div class="stat"><span>${t("reviewsLabel")}</span><strong id="reviewsStat">0</strong></div>
					<div class="stat"><span>${t("dateLabel")}</span><strong id="dateStat">-</strong></div>
					<div class="stat"><span>${t("visibilityLabel")}</span><strong id="visibilityStat">0</strong></div>
					<div class="stat"><span>${t("lastSalesLabel")}</span><strong id="salesStat">0</strong></div>
					<div class="stat"><span>${t("refundsLabel")}</span><strong id="refundsStat">0</strong></div>
					<div class="stat"><span>${t("xpLabel")}</span><strong id="xpStat">0</strong></div>
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
				<div class="tab-bar">
					${tabsMarkup}
				</div>
				<div id="tabContent"></div>
			</section>
		</div>
	`;

	updateStats();
	renderFeed();
	renderTabContent({ supplierCards });
	renderEventBar();
	updateSpeedControls();
	updateHeaderTexts();
	setHeaderSpeedVisible(true);
	setHeaderGameControlsEnabled(true);
}

function renderStepperButtons(callbackStart) {
	const steps = [-1000, -100, -10, -1, 1, 10, 100, 1000];
	return steps.map((step) => `
		<button type="button" class="stepper-btn" onclick="${callbackStart} ${step})">${step > 0 ? `+${step}` : step}</button>
	`).join("");
}

function setActiveTab(tabId) {
	gameState.ui.activeTab = tabId;
	document.querySelectorAll(".tab-button").forEach((button) => {
		button.classList.toggle("active", button.dataset.tab === tabId);
	});
	renderTabContent();
}

function renderTabContent(payload = {}) {
	const container = document.getElementById("tabContent");
	if (!container) {
		return;
	}
	const supplierCards = payload.supplierCards ?? suppliers.map((supplier) => {
		const productsMarkup = supplier.products.map((product) => `
			<div class="product-row">
				<strong>${product.name}</strong>
				<small data-product-stats="${product.id}">${t("qualityLabel")}: ${Math.round(product.quality)}/100 · ${t("costLabel")}: ${formatCurrency(product.cost)}</small>
				<div class="inventory-actions">
					<label>
						${t("stockLabel")}
						<input type="number" min="1" max="9999" value="${getPurchaseQuantity(product.id)}" data-product="${product.id}" class="buy-qty" oninput="updatePurchaseQuantity('${product.id}', this.value)">
					</label>
					<div class="stepper">
						${renderStepperButtons(`adjustPurchaseQty('${product.id}',`)}
					</div>
					<div class="purchase-total" data-product-total="${product.id}">
						<span>${t("purchaseTotalLabel")}</span>
						<strong>${formatCurrency(product.cost * getPurchaseQuantity(product.id))}</strong>
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

	switch (gameState.ui.activeTab) {
	case "suppliers":
		container.innerHTML = `
			<h2 class="panel-title">${t("suppliersTitle")}</h2>
			<div class="supplier-list">${supplierCards}</div>
		`;
		renderSuppliers();
		break;
	case "market":
		container.innerHTML = `
			<h2 class="panel-title">${t("marketTitle")}</h2>
			<div id="marketShareChart" class="marketshare"></div>
		`;
		renderMarketShare();
		break;
	case "skills":
		container.innerHTML = `
			<h2 class="panel-title">${t("skillsTitle")}</h2>
			<p class="status-note">${t("skillsHint")}</p>
			<div id="skillsTree" class="skills-tree"></div>
		`;
		renderSkills();
		break;
	case "marketing":
		container.innerHTML = `
			<h2 class="panel-title">${t("marketingTitle")}</h2>
			<p class="status-note">${t("marketingHint")}</p>
			<div class="marketing-actions">
				${renderMarketingButton("social")}
				${renderMarketingButton("influencer")}
				${renderMarketingButton("frete")}
			</div>
		`;
		break;
	case "bank":
		container.innerHTML = `
			<h2 class="panel-title">${t("bankTitle")}</h2>
			<p class="status-note">${t("bankHint")}</p>
			<div id="bankContent"></div>
		`;
		renderBank();
		break;
	case "production":
		container.innerHTML = `
			<h2 class="panel-title">${t("productionTitle")}</h2>
			<p class="status-note">${t("productionHint")}</p>
			<div class="production-summary" id="productionSummary"></div>
			<div class="subtab-bar">
				${renderProductionSubtabs()}
			</div>
			<div id="productionContent"></div>
		`;
		renderProductionTab();
		break;
	default:
		container.innerHTML = `
			<h2 class="panel-title">${t("inventoryTitle")}</h2>
			<div id="inventoryList" class="inventory-list"></div>
		`;
		renderInventory();
		break;
	}
}

function renderProductionSubtabs() {
	const tabs = [
		{ id: "employees", label: t("productionTabs.employees") },
		{ id: "lots", label: t("productionTabs.lots") },
		{ id: "machinery", label: t("productionTabs.machinery") }
	];
	return tabs.map((tab) => `
		<button class="subtab-button ${gameState.ui.productionTab === tab.id ? "active" : ""}" onclick="setProductionTab('${tab.id}')">
			${tab.label}
		</button>
	`).join("");
}

function setProductionTab(tabId) {
	gameState.ui.productionTab = tabId;
	if (tabId !== "lots") {
		closeLotPopup();
	}
	renderTabContent();
}

function renderProductionTab() {
	const summary = document.getElementById("productionSummary");
	const container = document.getElementById("productionContent");
	if (!summary || !container) {
		return;
	}
	const plants = gameState.production.plants;
	const totalOutput = plants.reduce((sum, plant) => sum + getPlantDailyOutput(plant), 0);
	const topSpeed = plants.reduce((max, plant) => Math.max(max, getPlantProductionSpeed(plant)), 0);
	summary.innerHTML = `
		<div class="summary-card">
			<strong>${t("productionSummaryTitle")}</strong>
			<div class="summary-details">
				<span>${t("productionPlantsLabel")}: <strong>${plants.length}</strong></span>
				<span>${t("productionSpeedLabel")}: <strong>${topSpeed}x</strong></span>
				<span>${t("productionDailyOutputLabel")}: <strong>${totalOutput}</strong></span>
			</div>
		</div>
	`;

	if (gameState.ui.productionTab === "lots") {
		container.innerHTML = `
			<h3 class="panel-title">${t("productionLotsTitle")}</h3>
			<p class="status-note">${t("productionLotsHint")}</p>
			<div class="city-map" onclick="closeLotPopup()">
				<div class="map-viewport">
					<div class="map-grid">
						${renderLotMapTiles()}
					</div>
				</div>
				<div class="map-legend">
					<strong>${t("productionMapLegend")}</strong>
					<ul>
						<li><span class="legend-dot empty"></span>${t("productionMapLegendItems.empty")}</li>
						<li><span class="legend-dot house"></span>${t("productionMapLegendItems.house")}</li>
						<li><span class="legend-dot smallBuilding"></span>${t("productionMapLegendItems.smallBuilding")}</li>
						<li><span class="legend-dot largeBuilding"></span>${t("productionMapLegendItems.largeBuilding")}</li>
						<li><span class="legend-dot owned"></span>${t("productionMapLegendItems.owned")}</li>
						<li><span class="legend-dot unavailable"></span>${t("productionMapLegendItems.unavailable")}</li>
					</ul>
				</div>
				<div class="lot-popup" id="lotPopup" aria-hidden="true"></div>
			</div>
		`;
		return;
	}

	if (gameState.ui.productionTab === "machinery") {
		container.innerHTML = `
			<h3 class="panel-title">${t("productionTabs.machinery")}</h3>
			<p class="status-note">${t("productionMachineryHint")}</p>
			${renderMachineryCards()}
		`;
		return;
	}

	container.innerHTML = `
		<h3 class="panel-title">${t("productionTabs.employees")}</h3>
		<p class="status-note">${t("productionRoleRequirement")}</p>
		${renderPlantEmployeeCards()}
	`;
}

function renderLotMapTiles() {
	const totalTiles = 12;
	const tiles = Array.from({ length: totalTiles }, (_, index) => {
		const tileIndex = index + 1;
		const lot = productionLots.find((entry) => entry.mapIndex === tileIndex);
		if (!lot) {
			return `<div class="map-tile park"><span>🌳</span><small>Parque</small></div>`;
		}
		const owned = gameState.production.lotsOwned.includes(lot.id);
		const canAfford = gameState.cash >= lot.price;
		const structureClass = owned ? "owned" : (canAfford ? lot.structure : "locked");
		const icon = getLotIcon(lot.structure);
		const sizeLabel = t(`productionLotSizes.${lot.size}`);
		return `
			<button class="map-tile ${structureClass}" type="button" data-lot-id="${lot.id}" onclick="selectLot('${lot.id}', event, this)">
				<span>${icon}</span>
				<small>${lot.name}</small>
				<small class="map-tile-sub">${sizeLabel}</small>
			</button>
		`;
	});
	return tiles.join("");
}

function selectLot(lotId, event, tileElement) {
	if (event) {
		event.stopPropagation();
	}
	showLotPopup(lotId, tileElement);
}

function showLotPopup(lotId, tileElement) {
	const lot = productionLots.find((entry) => entry.id === lotId);
	const popup = document.getElementById("lotPopup");
	const map = document.querySelector(".city-map");
	if (!lot || !popup || !map || !tileElement) {
		return;
	}
	if (gameState.ui.selectedLotId === lotId && popup.classList.contains("visible")) {
		closeLotPopup();
		return;
	}
	gameState.ui.selectedLotId = lotId;
	const owned = gameState.production.lotsOwned.includes(lot.id);
	const canAfford = gameState.cash >= lot.price;
	const sizeLabel = t(`productionLotSizes.${lot.size}`);
	const structureLabel = t(`productionLotStructures.${lot.structure}`);
	popup.innerHTML = `
		<div class="lot-popup-header">
			<div>
				<strong>${lot.name}</strong>
				<small>${sizeLabel} · ${structureLabel}</small>
			</div>
			<span class="plant-icon">${getLotIcon(lot.structure)}</span>
		</div>
		<div class="lot-popup-meta">
			<span>${t("productionLotCapacity")}: ${lot.maxEmployees} ${t("productionEmployeesLabel").toLowerCase()}, ${lot.maxMachines} ${t("productionMachinesLabel").toLowerCase()}</span>
			<span>${t("costLabel")}: ${formatCurrency(lot.price)}</span>
		</div>
		<div class="lot-popup-actions">
			<button class="secondary" onclick="closeLotPopup()">${t("cancelAction")}</button>
			<button onclick="buyLot('${lot.id}')" ${owned || !canAfford ? "disabled" : ""}>
				${owned ? t("productionOwnedLot") : t("productionBuyLot")}
			</button>
		</div>
		${!owned && !canAfford ? `<small class="status-note">${t("productionLotUnavailable")}</small>` : ""}
	`;
	const tileRect = tileElement.getBoundingClientRect();
	const mapRect = map.getBoundingClientRect();
	const left = tileRect.left - mapRect.left + tileRect.width / 2;
	const top = tileRect.top - mapRect.top;
	popup.style.left = `${left}px`;
	popup.style.top = `${top}px`;
	popup.classList.add("visible");
	popup.setAttribute("aria-hidden", "false");
	document.querySelectorAll(".map-tile.selected").forEach((tile) => tile.classList.remove("selected"));
	tileElement.classList.add("selected");
}

function closeLotPopup() {
	const popup = document.getElementById("lotPopup");
	if (!popup) {
		return;
	}
	popup.classList.remove("visible");
	popup.setAttribute("aria-hidden", "true");
	gameState.ui.selectedLotId = null;
	document.querySelectorAll(".map-tile.selected").forEach((tile) => tile.classList.remove("selected"));
}

function updateLotMapAvailability() {
	if (gameState.ui.activeTab !== "production" || gameState.ui.productionTab !== "lots") {
		return;
	}
	const tiles = document.querySelectorAll(".map-tile[data-lot-id]");
	tiles.forEach((tile) => {
		const lotId = tile.dataset.lotId;
		const lot = productionLots.find((entry) => entry.id === lotId);
		if (!lot) {
			return;
		}
		const owned = gameState.production.lotsOwned.includes(lotId);
		const canAfford = gameState.cash >= lot.price;
		tile.classList.remove("empty", "house", "smallBuilding", "largeBuilding", "owned", "locked");
		const nextClass = owned ? "owned" : (canAfford ? lot.structure : "locked");
		tile.classList.add(nextClass);
		tile.setAttribute("aria-disabled", owned || !canAfford ? "true" : "false");
	});
	if (gameState.ui.selectedLotId) {
		const selectedTile = document.querySelector(`.map-tile[data-lot-id="${gameState.ui.selectedLotId}"]`);
		if (selectedTile) {
			showLotPopup(gameState.ui.selectedLotId, selectedTile);
		}
	}
}

function renderPlantEmployeeCards() {
	if (gameState.production.plants.length === 0) {
		return `<p class="status-note">${t("productionNoPlants")}</p>`;
	}
	return `
		<div class="plant-grid">
			${gameState.production.plants.map((plant) => {
				const totalEmployees = getPlantEmployeeTotal(plant);
				return `
					<div class="plant-card">
						<div class="plant-header">
							<div>
								<strong>${t("productionPlant")} ${plant.name}</strong>
								<small>${t(`productionLotSizes.${plant.size}`)} · ${t(`productionLotStructures.${plant.structure}`)}</small>
							</div>
							<span class="plant-icon">🏭</span>
						</div>
						<div class="plant-meta">
							<span>${t("productionCapacityLabel")}: ${totalEmployees}/${plant.maxEmployees} ${t("productionEmployeesLabel").toLowerCase()}</span>
							<span>${t("productionMachineOwned")}: ${plant.machines}/${plant.maxMachines}</span>
							<span>${t("productionSpeedLabel")}: ${getPlantProductionSpeed(plant)}x · ${t("productionDailyOutputLabel")}: ${getPlantDailyOutput(plant)}</span>
						</div>
						<div class="plant-field">
							<label>
								${t("productionSelectProduct")}
								<select onchange="setPlantProduct('${plant.id}', this.value)">
									${productionCatalog.map((product) => `
										<option value="${product.id}" ${plant.productId === product.id ? "selected" : ""}>${product.name}</option>
									`).join("")}
								</select>
							</label>
						</div>
						<div class="role-grid">
							${productionRoles.map((role) => renderRoleRow(plant, role)).join("")}
						</div>
					</div>
				`;
			}).join("")}
		</div>
	`;
}

function renderRoleRow(plant, role) {
	const count = plant.employees?.[role.key] ?? 0;
	return `
		<div class="role-row">
			<div>
				<strong>${t(`productionRoles.${role.key}`)}</strong>
				<small>${t("costLabel")}: ${formatCurrency(role.salary)}</small>
			</div>
			<div class="role-actions">
				<span>${count}</span>
				<button class="secondary" onclick="adjustPlantStaff('${plant.id}', '${role.key}', -1)">-</button>
				<button onclick="adjustPlantStaff('${plant.id}', '${role.key}', 1)">+</button>
			</div>
		</div>
	`;
}

function renderMachineryCards() {
	if (gameState.production.plants.length === 0) {
		return `<p class="status-note">${t("productionNoPlants")}</p>`;
	}
	return `
		<div class="plant-grid">
			${gameState.production.plants.map((plant) => `
				<div class="plant-card">
					<div class="plant-header">
						<div>
							<strong>${t("productionPlant")} ${plant.name}</strong>
							<small>${t(`productionLotSizes.${plant.size}`)} · ${t(`productionLotStructures.${plant.structure}`)}</small>
						</div>
						<span class="plant-icon">🛠️</span>
					</div>
					<div class="plant-meta">
						<span>${t("productionMachineOwned")}: ${plant.machines}/${plant.maxMachines}</span>
						<span>${t("productionSpeedLabel")}: ${getPlantProductionSpeed(plant)}x · ${t("productionDailyOutputLabel")}: ${getPlantDailyOutput(plant)}</span>
					</div>
					<div class="machinery-grid">
						${machineryCatalog.map((machine) => `
							<div class="machinery-card">
								<strong>${machine.name}</strong>
								<small>${t("costLabel")}: ${formatCurrency(machine.cost)}</small>
								<button class="secondary" onclick="buyMachine('${plant.id}', '${machine.id}')">${t("productionMachineBuy")}</button>
							</div>
						`).join("")}
					</div>
				</div>
			`).join("")}
		</div>
	`;
}

function getLotIcon(structure) {
	switch (structure) {
	case "house":
		return "🏠";
	case "smallBuilding":
		return "🏢";
	case "largeBuilding":
		return "🏬";
	default:
		return "🟩";
	}
}

function getPlantEmployeeTotal(plant) {
	return Object.values(plant.employees || {}).reduce((sum, value) => sum + value, 0);
}

function getPlantProductionSpeed(plant) {
	const roleCounts = productionRoles.map((role) => plant.employees?.[role.key] ?? 0);
	const roleMin = Math.min(...roleCounts);
	const machineCount = plant.machines || 0;
	return Math.max(0, Math.min(roleMin, machineCount));
}

function getPlantDailyOutput(plant) {
	return getPlantProductionSpeed(plant) * 100;
}

function setPlantProduct(plantId, productId) {
	const plant = gameState.production.plants.find((entry) => entry.id === plantId);
	if (!plant) {
		return;
	}
	if (productionCatalog.some((product) => product.id === productId)) {
		plant.productId = productId;
	}
}

function adjustPlantStaff(plantId, roleKey, delta) {
	const plant = gameState.production.plants.find((entry) => entry.id === plantId);
	if (!plant) {
		return;
	}
	const role = productionRoles.find((entry) => entry.key === roleKey);
	if (!role) {
		return;
	}
	const current = plant.employees?.[roleKey] ?? 0;
	const next = current + delta;
	if (next < 0) {
		return;
	}
	const totalEmployees = getPlantEmployeeTotal(plant);
	if (delta > 0 && totalEmployees + delta > plant.maxEmployees) {
		showMessageModal({
			title: t("insufficientFundsTitle"),
			message: "Limite de funcionários atingido.",
			confirmLabel: t("confirmAction")
		});
		return;
	}
	if (delta > 0 && gameState.cash < role.salary) {
		showMessageModal({
			title: t("insufficientFundsTitle"),
			message: t("insufficientFundsMessage"),
			confirmLabel: t("confirmAction")
		});
		return;
	}
	if (delta > 0) {
		gameState.cash -= role.salary;
	}
	plant.employees = {
		...plant.employees,
		[roleKey]: next
	};
	updateStats();
	if (gameState.ui.activeTab === "production") {
		renderProductionTab();
	}
}

function buyLot(lotId) {
	const lot = productionLots.find((entry) => entry.id === lotId);
	if (!lot || gameState.production.lotsOwned.includes(lotId)) {
		return;
	}
	if (gameState.cash < lot.price) {
		showMessageModal({
			title: t("insufficientFundsTitle"),
			message: t("insufficientFundsMessage"),
			confirmLabel: t("confirmAction")
		});
		return;
	}
	gameState.cash -= lot.price;
	gameState.production.lotsOwned.push(lotId);
	gameState.production.plants.push({
		id: `plant-${lot.id}`,
		lotId: lot.id,
		name: lot.name,
		size: lot.size,
		structure: lot.structure,
		maxEmployees: lot.maxEmployees,
		maxMachines: lot.maxMachines,
		machines: 0,
		productId: productionCatalog[0].id,
		employees: productionRoles.reduce((acc, role) => ({ ...acc, [role.key]: 0 }), {})
	});
	queueNotice(`🏗️ Lote adquirido: ${lot.name}.`);
	updateStats();
	renderProductionTab();
}

function buyMachine(plantId, machineId) {
	const plant = gameState.production.plants.find((entry) => entry.id === plantId);
	if (!plant) {
		return;
	}
	const machine = machineryCatalog.find((entry) => entry.id === machineId);
	if (!machine) {
		return;
	}
	if (plant.machines + 1 > plant.maxMachines) {
		showMessageModal({
			title: t("insufficientFundsTitle"),
			message: "Limite de máquinas atingido para esta planta.",
			confirmLabel: t("confirmAction")
		});
		return;
	}
	if (gameState.cash < machine.cost) {
		showMessageModal({
			title: t("insufficientFundsTitle"),
			message: t("insufficientFundsMessage"),
			confirmLabel: t("confirmAction")
		});
		return;
	}
	gameState.cash -= machine.cost;
	plant.machines += 1;
	queueNotice(`🛠️ ${machine.name} instalado em ${plant.name}.`);
	updateStats();
	renderProductionTab();
}

function handleProduction() {
	if (!gameState.production?.plants?.length) {
		return;
	}
	gameState.production.plants.forEach((plant) => {
		const output = getPlantDailyOutput(plant);
		if (output <= 0) {
			return;
		}
		const product = productionCatalog.find((entry) => entry.id === plant.productId) || productionCatalog[0];
		const cost = clamp(randomBetween(10, 25), 10, 25);
		const quality = clamp(product.baseQuality + randomBetween(-4, 4), 70, 96);
		addProducedStock(product, output, cost, quality);
		queueNotice(`🏭 ${plant.name} produziu ${output} unidades de ${product.name}.`);
	});
}

function addProducedStock(product, quantity, cost, quality) {
	const productId = `prod-${product.id}`;
	const existing = gameState.inventory.find((item) => item.productId === productId);
	if (existing) {
		existing.stock += quantity;
		existing.cost = cost;
		existing.quality = quality;
		return;
	}
	gameState.inventory.push({
		productId,
		name: product.name,
		supplier: "Produção interna",
		stock: quantity,
		sellPrice: Math.round(cost * 1.6),
		quality,
		cost,
		autoRestockThreshold: 0,
		autoRestockQty: 0
	});
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
	const quantity = clamp(Number(qtyInput?.value) || 0, 0, 9999);
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
		showMessageModal({
			title: t("insufficientFundsTitle"),
			message: t("insufficientFundsMessage"),
			confirmLabel: t("confirmAction")
		});
		return;
	}
	gameState.cash -= totalCost;
	const stolenRoll = Math.random() < 0.01;
	if (stolenRoll) {
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
		showMessageModal({
			title: t("insufficientFundsTitle"),
			message: t("insufficientFundsMessage"),
			confirmLabel: t("confirmAction")
		});
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
	handleLoanPayments();
	handleProduction();

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

	gameState.cash += totalRevenue - totalRefundValue - totalPackagingCost;
	gameState.lastSales = totalSales;
	gameState.lastRefunds = totalRefunds;
	gameState.lastSoldItems = soldItems;
	const extraRevenue = applyRecommendedSellerMinimum();
	recordProductSalesHistory(gameState.lastSoldItems);
	updateReputation(gameState.lastSoldItems, gameState.lastSales);
	gameState.round += 1;
	advanceGameDate();
	trackSalesHistory(totalRevenue + extraRevenue);
	updateEventDurations();
	renderEventBar();

	updateMarketShare();
	updateStats();
	if (gameState.ui.activeTab === "inventory") {
		renderInventory();
	} else {
		updateInventoryStats();
	}
	renderSuppliers();
	renderSkills();
	checkGameOver();
	flushPendingNotices();
}

function checkGameOver() {
	const totalStock = gameState.inventory.reduce((sum, item) => sum + item.stock, 0);
	const marketShare = gameState.marketShare.find((entry) => entry.type === "player")?.value || 0;
	if (marketShare >= 0.9 && !gameState.victoryAchieved) {
		gameState.victoryAchieved = true;
		resetLoops();
		gameState.paused = true;
		showMessageModal({
			title: t("victoryTitle"),
			message: t("victoryMessage"),
			confirmLabel: t("confirmAction"),
			onConfirm: () => {
				renderMainMenu();
			}
		});
		return;
	}
	if (gameState.cash <= -500000 && totalStock === 0) {
		resetLoops();
		gameState.paused = true;
		showMessageModal({
			title: "Fim de jogo",
			message: "Sua empresa acumulou dívidas demais e ficou sem estoque.",
			confirmLabel: t("confirmAction"),
			onConfirm: () => {
				renderMainMenu();
			}
		});
	}
}

function getSeasonalFactor() {
	const cycle = (gameState.round % 30) / 30;
	return Math.sin(cycle * Math.PI * 2);
}

function calculateDemand(item) {
	const visibilityFactor = 0.6 + gameState.visibility / 140;
	const priceScore = Math.max(0.4, 1.3 - item.sellPrice / 120);
	const qualityScore = item.quality / 100;
	const seasonal = 1 + getSeasonalFactor() * 0.08;
	const baseDemand = Math.floor(getCustomerPoolSize() * 0.2);
	const campaignMultiplier = isCampaignBoostActive() ? 3 : 1;
	return Math.max(0, Math.round(baseDemand * visibilityFactor * priceScore * (0.6 + qualityScore) * seasonal * campaignMultiplier));
}

function calculateRefundRate(quality) {
	const qualityFactor = 1 - quality / 100;
	const packaging = packagingOptions[gameState.packaging];
	const base = 0.04 + qualityFactor * 0.12 + Math.max(0, getSeasonalFactor() * 0.015);
	return Math.min(0.4, Math.max(0, base + packaging.refundDelta));
}

function updateReputation(soldItems, totalSales) {
	if (totalSales === 0) {
		return;
	}
	const avgQuality = soldItems.reduce((sum, item) => sum + item.quality, 0) / soldItems.length;
	const newReviews = Math.round(totalSales * 0.14);
	const sentiment = 2.4 + (avgQuality / 100) * 2 + getSeasonalFactor() * 0.15;
	const newRating = Math.max(1.5, Math.min(5, sentiment));
	if (gameState.reviews === 0) {
		gameState.rating = newRating;
		gameState.reviews = newReviews;
		gameState.xp += Math.round(newReviews * newRating);
		return;
	}
	gameState.rating = ((gameState.rating * gameState.reviews) + (newRating * newReviews)) / (gameState.reviews + newReviews);
	gameState.reviews += newReviews;
	gameState.xp += Math.round(newReviews * newRating);
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
	gameState.marketShare = smoothMarketShares(shares);
	gameState.customerCounts = [
		{ name: "Você", value: playerCustomers },
		...competitorCustomers.map((value, index) => ({ name: competitors[index].name, value }))
	];
	renderMarketShare();
}

function smoothMarketShares(nextShares) {
	if (!gameState.marketShare.length) {
		return nextShares;
	}
	const previousMap = new Map(gameState.marketShare.map((share) => [share.name, share.value]));
	const smoothed = nextShares.map((share) => {
		const previous = previousMap.get(share.name);
		if (previous === undefined) {
			return share;
		}
		const diff = share.value - previous;
		const direction = diff >= 0 ? 1 : -1;
		const step = Math.min(Math.abs(diff), 0.02);
		const nextValue = clamp(previous + direction * step, 0, 1);
		return { ...share, value: nextValue };
	});
	const total = smoothed.reduce((sum, share) => sum + share.value, 0);
	if (total <= 0) {
		return smoothed;
	}
	return smoothed.map((share) => ({ ...share, value: share.value / total }));
}

function getCustomerPoolSize() {
	const base = 24000 + getSeasonalFactor() * 1800;
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

function getInventoryChartSnapshot(productId, fallbackStock) {
	const history = gameState.productSalesHistory?.[productId] || [];
	if (!history.length) {
		return { stock: fallbackStock, sold: 0 };
	}
	return history[0];
}

function getInventoryChartMetrics(productId, fallbackStock) {
	const history = gameState.productSalesHistory?.[productId] || [];
	const snapshot = getInventoryChartSnapshot(productId, fallbackStock);
	const values = history.flatMap((entry) => [entry.stock, entry.sold]);
	values.push(snapshot.stock, snapshot.sold);
	const minValue = Math.min(...values, 0);
	const maxValue = Math.max(...values, 1);
	const range = Math.max(1, maxValue - minValue);
	const stockHeight = Math.round(clamp(((snapshot.stock - minValue) / range) * 100, 0, 100));
	const soldHeight = Math.round(clamp(((snapshot.sold - minValue) / range) * 100, 0, 100));
	return {
		stockHeight,
		soldHeight,
		stockValue: snapshot.stock,
		soldValue: snapshot.sold
	};
}

function renderInventoryMiniChart(item) {
	const metrics = getInventoryChartMetrics(item.productId, item.stock);
	return `
		<div class="inventory-mini-chart" data-inventory-chart="${item.productId}" aria-label="${t("inventoryMiniChartLabel")}" title="${t("stockLabel")}: ${metrics.stockValue} · ${t("lastSalesLabel")}: ${metrics.soldValue}">
			<span class="mini-bar stock" style="height: ${metrics.stockHeight}%;"></span>
			<span class="mini-bar sales" style="height: ${metrics.soldHeight}%;"></span>
		</div>
	`;
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
			<div class="inventory-header">
				<div>
					<strong>${item.name}</strong>
					<small>${item.supplier}</small>
				</div>
				${renderInventoryMiniChart(item)}
			</div>
			<small data-inventory-stats="${item.productId}">${t("qualityLabel")}: ${Math.round(item.quality)}/100 · ${t("costLabel")}: ${formatCurrency(item.cost)}</small>
			<div class="inventory-actions stacked">
				<div class="inventory-field">
					<span>${t("stockLabel")}: <strong data-inventory-stock="${item.productId}">${item.stock}</strong></span>
				</div>
				<div class="inventory-field">
					<label>
						${t("sellPriceLabel")}
						<input type="number" min="1" value="${item.sellPrice}" data-inventory="${item.productId}" data-field="sellPrice" oninput="updateSellPrice('${item.productId}', this.value)">
					</label>
					<div class="stepper">
						${renderStepperButtons(`adjustInventoryInput('${item.productId}', 'sellPrice',`)}
					</div>
				</div>
				<div class="inventory-field">
					<label>
						${t("restockThresholdLabel")}
						<input type="number" min="0" value="${item.autoRestockThreshold ?? 0}" data-inventory="${item.productId}" data-field="threshold" oninput="updateAutoRestock('${item.productId}', 'threshold', this.value)" ${autoRestockUnlocked ? "" : "disabled"}>
					</label>
					<div class="stepper">
						${renderStepperButtons(`adjustInventoryInput('${item.productId}', 'threshold',`)}
					</div>
				</div>
				<div class="inventory-field">
					<label>
						${t("restockQuantityLabel")}
						<input type="number" min="0" value="${item.autoRestockQty ?? 0}" data-inventory="${item.productId}" data-field="quantity" oninput="updateAutoRestock('${item.productId}', 'quantity', this.value)" ${autoRestockUnlocked ? "" : "disabled"}>
					</label>
					<div class="stepper">
						${renderStepperButtons(`adjustInventoryInput('${item.productId}', 'quantity',`)}
					</div>
				</div>
				${autoRestockUnlocked ? "" : `<small class="status-note">${t("restockLocked")}</small>`}
			</div>
		</div>
	`).join("");
}

function updateStats() {
	const cashStat = document.getElementById("cashStat");
	const ratingStat = document.getElementById("ratingStat");
	const reviewsStat = document.getElementById("reviewsStat");
	const dateStat = document.getElementById("dateStat");
	const visibilityStat = document.getElementById("visibilityStat");
	const salesStat = document.getElementById("salesStat");
	const refundsStat = document.getElementById("refundsStat");
	const xpStat = document.getElementById("xpStat");

	if (cashStat) {
		cashStat.textContent = formatCurrency(gameState.cash);
	}
	if (ratingStat) {
		ratingStat.textContent = gameState.reviews === 0 ? "-" : gameState.rating.toFixed(2);
	}
	if (reviewsStat) {
		reviewsStat.textContent = gameState.reviews;
	}
	if (dateStat) {
		dateStat.textContent = formatGameDate(gameState.currentDate);
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
	updateLotMapAvailability();
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
				stats.textContent = `${t("qualityLabel")}: ${Math.round(product.quality)}/100 · ${t("costLabel")}: ${formatCurrency(product.cost)}`;
			}
			updatePurchaseTotal(product.id);
		});
	});
}

function getPurchaseQuantity(productId) {
	const stored = gameState.purchaseQuantities?.[productId];
	return stored !== undefined ? stored : 20;
}

function updatePurchaseQuantity(productId, value) {
	const quantity = clamp(Number(value) || 1, 1, 9999);
	gameState.purchaseQuantities = {
		...gameState.purchaseQuantities,
		[productId]: quantity
	};
	updatePurchaseTotal(productId);
}

function updatePurchaseTotal(productId) {
	const qtyInput = document.querySelector(`input[data-product="${productId}"]`);
	const totalSlot = document.querySelector(`[data-product-total="${productId}"] strong`);
	const details = findProduct(productId);
	if (!qtyInput || !totalSlot || !details) {
		return;
	}
	const quantity = Math.max(0, Number(qtyInput.value) || 0);
	gameState.purchaseQuantities = {
		...gameState.purchaseQuantities,
		[productId]: quantity
	};
	totalSlot.textContent = formatCurrency(details.product.cost * quantity);
}

function adjustPurchaseQty(productId, delta) {
	const input = document.querySelector(`input[data-product="${productId}"]`);
	if (!input) {
		return;
	}
	const min = Number(input.min) || 0;
	const max = Number(input.max) || Infinity;
	const next = clamp((Number(input.value) || 0) + delta, min, max);
	input.value = next;
	updatePurchaseQuantity(productId, next);
}

function adjustInventoryInput(productId, field, delta) {
	const input = document.querySelector(`input[data-inventory="${productId}"][data-field="${field}"]`);
	if (!input || input.disabled) {
		return;
	}
	const min = Number(input.min) || 0;
	const max = input.max ? Number(input.max) : Infinity;
	const next = clamp((Number(input.value) || 0) + delta, min, max);
	input.value = next;
	if (field === "sellPrice") {
		updateSellPrice(productId, next);
	} else if (field === "threshold") {
		updateAutoRestock(productId, "threshold", next);
	} else if (field === "quantity") {
		updateAutoRestock(productId, "quantity", next);
	}
}

function updateInventoryStats() {
	gameState.inventory.forEach((item) => {
		const stock = document.querySelector(`[data-inventory-stock="${item.productId}"]`);
		if (stock) {
			stock.textContent = item.stock;
		}
		const stats = document.querySelector(`[data-inventory-stats="${item.productId}"]`);
		if (stats) {
			stats.textContent = `${t("qualityLabel")}: ${Math.round(item.quality)}/100 · ${t("costLabel")}: ${formatCurrency(item.cost)}`;
		}
		const chart = document.querySelector(`[data-inventory-chart="${item.productId}"]`);
		if (chart) {
			const metrics = getInventoryChartMetrics(item.productId, item.stock);
			const bars = chart.querySelectorAll(".mini-bar");
			if (bars.length >= 2) {
				bars[0].style.height = `${metrics.stockHeight}%`;
				bars[1].style.height = `${metrics.soldHeight}%`;
			}
			chart.setAttribute("title", `${t("stockLabel")}: ${metrics.stockValue} · ${t("lastSalesLabel")}: ${metrics.soldValue}`);
		}
	});
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

function formatCurrency(value) {
	const rounded = Math.round(value);
	const locale = gameState.settings.language === "en" ? "en-US" : "pt-BR";
	return `R$ ${rounded.toLocaleString(locale)}`;
}

function formatGameDate(date) {
	if (!(date instanceof Date)) {
		return "-";
	}
	const locale = gameState.settings.language === "en" ? "en-US" : "pt-BR";
	return date.toLocaleDateString(locale);
}

function advanceGameDate() {
	if (!(gameState.currentDate instanceof Date)) {
		gameState.currentDate = new Date();
	}
	gameState.currentDate.setDate(gameState.currentDate.getDate() + 1);
}

function renderBank() {
	const container = document.getElementById("bankContent");
	if (!container) {
		return;
	}
	const activeLoan = gameState.loan;
	const activeLoanMarkup = activeLoan
		? `
			<div class="loan-active card">
				<strong>${t("bankActiveLoan")}</strong>
				<div class="loan-active-details">
					<span>${t("bankLoanAmount")}: ${formatCurrency(activeLoan.amount)}</span>
					<span>${t("bankLoanTotal")}: ${formatCurrency(activeLoan.total)}</span>
					<span>${t("bankInstallmentsLeft")}: ${activeLoan.remainingInstallments}</span>
					<span>${t("bankInstallmentValue")}: ${formatCurrency(activeLoan.installmentValue)}</span>
					<span>${t("bankNextPayment")}: ${activeLoan.nextPaymentIn}</span>
				</div>
			</div>
		`
		: "";

	const loanCards = loanOptions.map((loan) => {
		const total = loan.amount * 1.05;
		const installments = 100;
		const installmentValue = total / installments;
		const isActive = activeLoan?.id === loan.id;
		return `
			<div class="loan-card ${isActive ? "active" : ""}">
				<strong>${formatCurrency(loan.amount)}</strong>
				<small>${t("bankLoanInterest")}: 5%</small>
				<small>${t("bankLoanTotal")}: ${formatCurrency(total)}</small>
				<small>${t("bankLoanInstallments")}: ${installments}</small>
				<small>${t("bankInstallmentValue")}: ${formatCurrency(installmentValue)}</small>
				<button class="secondary" onclick="takeLoan('${loan.id}')" ${activeLoan ? "disabled" : ""}>
					${t("bankTakeLoan")}
				</button>
			</div>
		`;
	}).join("");

	container.innerHTML = `
		${activeLoanMarkup}
		<div class="loan-grid">
			${loanCards}
		</div>
	`;
}

function takeLoan(loanId) {
	if (gameState.loan) {
		return;
	}
	const selected = loanOptions.find((loan) => loan.id === loanId);
	if (!selected) {
		return;
	}
	const total = selected.amount * 1.05;
	const installments = 100;
	const installmentValue = total / installments;
	gameState.cash += selected.amount;
	gameState.loan = {
		id: selected.id,
		amount: selected.amount,
		total,
		installmentValue,
		remainingInstallments: installments,
		nextPaymentIn: 30,
		paymentInterval: 30
	};
	updateStats();
	renderBank();
}

function handleLoanPayments() {
	if (!gameState.loan) {
		return;
	}
	gameState.loan.nextPaymentIn -= 1;
	if (gameState.loan.nextPaymentIn <= 0) {
		gameState.cash -= gameState.loan.installmentValue;
		gameState.loan.remainingInstallments -= 1;
		if (gameState.loan.remainingInstallments <= 0) {
			gameState.loan = null;
		} else {
			gameState.loan.nextPaymentIn = gameState.loan.paymentInterval;
		}
	}
	if (gameState.ui.activeTab === "bank") {
		renderBank();
	}
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

function queueNotice(message) {
	if (!message) {
		return;
	}
	gameState.pendingNotices.push(message);
}

function flushPendingNotices() {
	if (gameState.pendingNotices.length === 0) {
		return;
	}
	gameState.pendingNotices.forEach((message) => addFeedEntry(message));
	gameState.pendingNotices = [];
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

function renderEventBar() {
	const bar = document.getElementById("eventBar");
	if (!bar) {
		return;
	}
	const activeEvents = gameState.activeEvents.filter((event) => event.remaining > 0);
	if (activeEvents.length === 0) {
		bar.innerHTML = `
			<div class="event-bar-title">${t("eventsTitle")}</div>
			<div class="event-bar-empty">${t("eventsNone")}</div>
		`;
		return;
	}
	const items = activeEvents.map((event) => `
		<div class="event-pill">
			<strong>${t(`events.${event.id}`)}</strong>
			<span>${event.remaining} ${t("eventsDaysLeft")}</span>
		</div>
	`).join("");
	bar.innerHTML = `
		<div class="event-bar-title">${t("eventsTitle")}</div>
		<div class="event-bar-items">${items}</div>
	`;
}

function generatePraise(item) {
	const notes = [
		`💬 "Preço justo para ${item.name}, vou comprar de novo!"`,
		`💬 "${item.name} chegou rápido e com ótima qualidade."`,
		`💬 "Gostei da embalagem do ${item.name}!"`,
		`💬 "O ${item.name} superou minhas expectativas."`,
		`💬 "Entrega ágil e ${item.name} impecável."`,
		`💬 "Voltarei a comprar ${item.name} com certeza."`,
		`💬 "Excelente custo-benefício no ${item.name}."`,
		`💬 "Atendimento ótimo e ${item.name} perfeito."`,
		`💬 "O ${item.name} chegou antes do prazo."`,
		`💬 "Produto ${item.name} de ótima qualidade."`,
		`💬 "Me surpreendi com o cuidado na embalagem do ${item.name}."`,
		`💬 "O ${item.name} vale cada centavo."`,
		`💬 "Chegou direitinho, adorei o ${item.name}."`,
		`💬 "O ${item.name} veio bem protegido."`,
		`💬 "Recomendo o ${item.name} para amigos."`,
		`💬 "Satisfeito com o ${item.name}!"`,
		`💬 "Experiência top com o ${item.name}."`,
		`💬 "Qualidade acima da média no ${item.name}."`,
		`💬 "Compra tranquila e ${item.name} excelente."`,
		`💬 "O ${item.name} chegou perfeito."`,
		`💬 "Ótima loja, ${item.name} impecável."`,
		`💬 "Nota 10 para o ${item.name}."`,
		`💬 "Recebi o ${item.name} muito rápido."`,
		`💬 "O ${item.name} veio com capricho."`,
		`💬 "Preço competitivo e ${item.name} top."`,
		`💬 "O ${item.name} chegou sem defeitos."`,
		`💬 "Estou encantado com o ${item.name}."`,
		`💬 "Compra perfeita do ${item.name}."`,
		`💬 "O ${item.name} veio como anunciado."`,
		`💬 "Muito satisfeito com o ${item.name}."`,
		`💬 "O ${item.name} tem ótimo acabamento."`,
		`💬 "Amei o ${item.name}, compra certeira."`,
		`💬 "O ${item.name} chegou novinho."`,
		`💬 "Que qualidade no ${item.name}!"`,
		`💬 "O ${item.name} veio exatamente como queria."`,
		`💬 "Experiência incrível com o ${item.name}."`,
		`💬 "Compraria o ${item.name} novamente."`,
		`💬 "O ${item.name} é melhor do que pensei."`,
		`💬 "Adorei o ${item.name} e o envio rápido."`,
		`💬 "O ${item.name} chegou bem embalado."`,
		`💬 "Qualidade premium no ${item.name}."`,
		`💬 "O ${item.name} veio com tudo certo."`,
		`💬 "Mais do que satisfeito com o ${item.name}."`,
		`💬 "Produto ${item.name} com ótimo desempenho."`,
		`💬 "O ${item.name} é simplesmente excelente."`,
		`💬 "Atendimento rápido e ${item.name} perfeito."`,
		`💬 "O ${item.name} chegou em ótimo estado."`,
		`💬 "Valeu a pena comprar o ${item.name}."`,
		`💬 "O ${item.name} veio conforme as fotos."`,
		`💬 "Qualidade impecável no ${item.name}."`,
		`💬 "O ${item.name} chegou com tudo certo."`,
		`💬 "Recomendo muito o ${item.name}."`,
		`💬 "Entrega veloz, ${item.name} perfeito."`,
		`💬 "O ${item.name} tem acabamento excelente."`,
		`💬 "Top demais o ${item.name}."`
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

function randomInt(min, max) {
	return Math.floor(randomBetween(min, max + 1));
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
			<small>${t("marketingCostLabel")}: ${formatCurrency(action.cost)}</small>
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

function recordProductSalesHistory(soldItems) {
	const soldMap = new Map(soldItems.map((item) => [item.productId, item.sold]));
	gameState.inventory.forEach((item) => {
		const history = gameState.productSalesHistory?.[item.productId] || [];
		const snapshot = {
			stock: item.stock,
			sold: soldMap.get(item.productId) || 0
		};
		history.unshift(snapshot);
		gameState.productSalesHistory[item.productId] = history.slice(0, 12);
	});
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
		gameState.cash += revenue - refundValue - packagingCost;
		gameState.lastSales += extra;
		gameState.lastRefunds += refunds;
		gameState.lastSoldItems.push({ ...item, sold: extra, refunds });
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
			queueNotice(`🏛️ Governo cobrou impostos de ${formatCurrency(tax)}.`);
		}
		if (event.id === "packingFailure" && !event.processed) {
			gameState.cash -= 10000;
			event.processed = true;
			queueNotice(`🛠️ Equipamentos de empacotamento quebraram. Reparos de ${formatCurrency(10000)}.`);
		}
	});
}

function triggerRandomEvent() {
	if (gameState.activeEvents.some((event) => event.remaining > 0)) {
		return;
	}
	const roll = Math.random();
	if (roll < 0.001) {
		addEventEntry("marketplaceOutage");
		return;
	}
	if (roll < 0.006) {
		addEventEntry("packingFailure");
		return;
	}
	if (roll < 0.016) {
		addEventEntry("campaignBoost");
		return;
	}
	if (roll < 0.2) {
		addEventEntry("taxes");
	}
}

function addEventEntry(eventId) {
	const event = eventCatalog.find((entry) => entry.id === eventId);
	if (!event) {
		return;
	}
	const duration = typeof event.duration === "function" ? event.duration() : event.duration;
	const entry = { id: event.id, remaining: duration, processed: false };
	gameState.activeEvents.push(entry);
	switch (event.id) {
	case "marketplaceOutage":
		queueNotice(`🚧 Marketplace fora do ar. Nenhuma venda ocorrerá por ${duration} dias.`);
		break;
	case "taxes":
		break;
	case "packingFailure":
		break;
	case "campaignBoost":
		queueNotice(`📈 Campanha geral: vendas triplicadas por ${duration} dias.`);
		break;
	default:
		break;
	}
	renderEventBar();
}

function updateEventDurations() {
	gameState.activeEvents.forEach((event) => {
		if (event.remaining > 0) {
			event.remaining -= 1;
		}
	});
	gameState.activeEvents = gameState.activeEvents.filter((event) => {
		if (event.remaining > 0) {
			return true;
		}
		return !event.processed && (event.id === "taxes" || event.id === "packingFailure");
	});
	renderEventBar();
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
				<button class="save-entry" data-save="${entry.file ?? entry.name}">
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
		if (fs && path && SAVE_DIR) {
			ensureSaveDir();
			const files = fs.readdirSync(SAVE_DIR).filter((file) => file.endsWith(".json"));
			const entries = files.map((file) => {
				const parsed = readJsonFile(path.join(SAVE_DIR, file));
				if (!parsed?.companyName || !parsed?.savedAt) {
					return null;
				}
				return { name: parsed.companyName, savedAt: parsed.savedAt, file };
			}).filter(Boolean);
			return entries.sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));
		}
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
applySettings();
renderMainMenu();
