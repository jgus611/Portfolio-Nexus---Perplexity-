// Portfolio Nexus - Main Application JavaScript
console.log('=== APP.JS LOADED SUCCESSFULLY ===');

// Initialize AI enhancer and advanced AI engine
let aiEnhancer;
let advancedAI;

// Application Data
const portfolioData = {
  user_profile: {
    name: "Alex Thompson",
    user_id: "user_12345",
    risk_appetite: "moderate",
    investment_goals: {
      primary: "long_term_growth",
      timeline: "10_years",
      target_return: 8.5
    },
    financial_situation: {
      age: 28,
      income: 45000,
      available_to_invest: 2500
    }
  },
  portfolio_metrics: {
    total_portfolio_value: 14041.40,
    total_cost_basis: 13499.50,
    overall_gain_loss: 541.90,
    overall_return_percent: 4.01,
    daily_change: 127.85,
    daily_change_percent: 0.92,
    risk_score: 6.2
  },
  target_allocation: {
    stocks: 40,
    etfs: 25,
    bonds: 15,
    commodities: 10,
    precious_metals: 5,
    crypto: 5
  },
  current_allocations: {
    stocks: 38.8,
    etfs: 28.6,
    bonds: 10.5,
    commodities: 0.0,
    precious_metals: 6.8,
    crypto: 15.4
  },
  holdings: [
    {
      symbol: "AAPL",
      name: "Apple Inc.",
      type: "stock",
      quantity: 12,
      current_price: 178.25,
      purchase_price: 165.00,
      market_value: 2139.00,
      cost_basis: 1980.00,
      gain_loss: 159.00,
      gain_loss_percent: 8.03
    },
    {
      symbol: "MSFT",
      name: "Microsoft Corp.",
      type: "stock",
      quantity: 8,
      current_price: 412.80,
      purchase_price: 398.50,
      market_value: 3302.40,
      cost_basis: 3188.00,
      gain_loss: 114.40,
      gain_loss_percent: 3.59
    },
    {
      symbol: "VTI",
      name: "Vanguard Total Stock Market ETF",
      type: "etf",
      quantity: 15,
      current_price: 267.45,
      purchase_price: 255.20,
      market_value: 4011.75,
      cost_basis: 3828.00,
      gain_loss: 183.75,
      gain_loss_percent: 4.80
    },
    {
      symbol: "BND",
      name: "Vanguard Total Bond Market ETF",
      type: "bond_etf",
      quantity: 20,
      current_price: 73.85,
      purchase_price: 75.10,
      market_value: 1477.00,
      cost_basis: 1502.00,
      gain_loss: -25.00,
      gain_loss_percent: -1.66
    },
    {
      symbol: "GOLD",
      name: "SPDR Gold Shares",
      type: "precious_metals",
      quantity: 5,
      current_price: 189.75,
      purchase_price: 182.30,
      market_value: 948.75,
      cost_basis: 911.50,
      gain_loss: 37.25,
      gain_loss_percent: 4.09
    },
    {
      symbol: "BTC",
      name: "Bitcoin",
      type: "crypto",
      quantity: 0.05,
      current_price: 43250.00,
      purchase_price: 41800.00,
      market_value: 2162.50,
      cost_basis: 2090.00,
      gain_loss: 72.50,
      gain_loss_percent: 3.47
    }
  ],
  performance_history: [
    {date: "2024-04-01", value: 13200},
    {date: "2024-05-01", value: 13450},
    {date: "2024-06-01", value: 13280},
    {date: "2024-07-01", value: 13650},
    {date: "2024-08-01", value: 13820},
    {date: "2024-09-01", value: 13950},
    {date: "2024-10-01", value: 14041}
  ],
  recent_transactions: [
    {
      date: "2024-09-28",
      symbol: "VTI",
      type: "BUY",
      quantity: 2,
      price: 267.45,
      amount: 534.90
    },
    {
      date: "2024-09-25",
      symbol: "AAPL",
      type: "BUY",
      quantity: 3,
      price: 178.25,
      amount: 534.75
    },
    {
      date: "2024-09-20",
      symbol: "BTC",
      type: "BUY",
      quantity: 0.01,
      price: 43250.00,
      amount: 432.50
    }
  ]
};

// Chart configurations
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
  console.log('=== DOM CONTENT LOADED ===');
  initializeApp();
});

function initializeApp() {
  console.log('=== INITIALIZING APP ===');
  setupLoginForm();
  setupNavigation();
  setupPortfolioSearch();
  setupAllocationSliders();
  setupTimeframeSelector();
  setupExecuteRebalancing();
  
  // Initialize charts when dashboard is first loaded
  setTimeout(() => {
    initializeCharts();
  }, 100);
}

// Login functionality
function setupLoginForm() {
  console.log('=== Setting up login form ===');
  const loginForm = document.getElementById('loginForm');
  const signInButton = document.querySelector('button[type="submit"]');
  
  if (!loginForm) {
    console.error('Login form not found!');
    return;
  }
  
  if (!signInButton) {
    console.error('Sign in button not found!');
    return;
  }
  
  console.log('Login form found, adding event listeners...');
  
  // Add both form submit and button click handlers for redundancy
  loginForm.addEventListener('submit', handleLogin);
  signInButton.addEventListener('click', function(e) {
    console.log('Button clicked directly!');
    e.preventDefault();
    handleLogin(e);
  });
  
  function handleLogin(e) {
    e.preventDefault();
    console.log('=== LOGIN SUBMITTED ===');
    
    // Simulate login process
    const loginPage = document.getElementById('loginPage');
    const app = document.getElementById('app');
    
    if (!loginPage || !app) {
      console.error('Required elements not found:', { loginPage, app });
      return;
    }
    
    console.log('Starting login transition...');
    loginPage.style.opacity = '0';
    setTimeout(() => {
      loginPage.classList.add('hidden');
      app.classList.remove('hidden');
      
      // Initialize charts and data after app is shown
      setTimeout(() => {
        console.log('Initializing charts and data...');
        if (typeof initializeCharts === 'function') {
          initializeCharts();
        }
        if (typeof populateHoldingsTable === 'function') {
          populateHoldingsTable();
        }
      }, 100);
    }, 300);
  }
}

// Navigation functionality
function setupNavigation() {
  const navButtons = document.querySelectorAll('.nav-btn');
  const views = document.querySelectorAll('.view');
  
  navButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetView = this.dataset.view;
      
      // Update active nav button
      navButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Show target view
      views.forEach(view => view.classList.remove('active'));
      const targetViewElement = document.getElementById(targetView + 'View');
      targetViewElement.classList.add('active');
      
      // Initialize specific functionality for each view
      if (targetView === 'portfolio') {
        setTimeout(() => populateHoldingsTable(), 50);
      } else if (targetView === 'rebalancing') {
        setTimeout(() => initializeRebalancingChart(), 100);
      } else if (targetView === 'analytics') {
        setTimeout(() => initializeAnalyticsCharts(), 100);
      }
    });
  });
}

// Charts initialization
function initializeCharts() {
  console.log('=== INITIALIZING CHARTS AND AI ===');
  
  // Initialize basic charts
  createPerformanceChart();
  createAllocationChart();
  
  // Initialize advanced AI features
  initializeAdvancedAI();
}

function initializeAdvancedAI() {
  console.log('🧠 Initializing Advanced AI Engine...');
  
  // Initialize AI engines
  if (typeof AIChartEnhancer !== 'undefined') {
    aiEnhancer = new AIChartEnhancer();
  }
  
  if (typeof AdvancedAIEngine !== 'undefined') {
    advancedAI = new AdvancedAIEngine();
    
    // Generate advanced AI insights
    setTimeout(() => {
      generateAdvancedAIInsights();
    }, 500);
  }
}

function createPerformanceChart() {
  const ctx = document.getElementById('performanceChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: portfolioData.performance_history.map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }),
      datasets: [{
        label: 'Portfolio Value',
        data: portfolioData.performance_history.map(item => item.value),
        borderColor: chartColors[0],
        backgroundColor: chartColors[0] + '20',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointBackgroundColor: chartColors[0],
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function(value) {
              return '$' + value.toLocaleString();
            }
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        },
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          }
        }
      },
      elements: {
        point: {
          hoverRadius: 8
        }
      },
      interaction: {
        intersect: false,
        mode: 'index'
      }
    }
  });
}

function createAllocationChart() {
  const ctx = document.getElementById('allocationChart');
  if (!ctx) return;
  
  const allocations = portfolioData.current_allocations;
  const labels = [];
  const data = [];
  const colors = [];
  
  let colorIndex = 0;
  for (const [key, value] of Object.entries(allocations)) {
    if (value > 0) {
      labels.push(formatAssetType(key));
      data.push(value);
      colors.push(chartColors[colorIndex % chartColors.length]);
      colorIndex++;
    }
  }
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        backgroundColor: colors,
        borderColor: colors.map(color => color + 'CC'),
        borderWidth: 2,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            padding: 20,
            generateLabels: function(chart) {
              const data = chart.data;
              if (data.labels.length && data.datasets.length) {
                return data.labels.map((label, i) => ({
                  text: `${label}: ${data.datasets[0].data[i].toFixed(1)}%`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].borderColor[i],
                  lineWidth: data.datasets[0].borderWidth,
                  pointStyle: 'circle',
                  hidden: false,
                  index: i
                }));
              }
              return [];
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.label + ': ' + context.parsed.toFixed(1) + '%';
            }
          }
        }
      }
    }
  });
}

function initializeRebalancingChart() {
  const ctx = document.getElementById('rebalancingChart');
  if (!ctx) return;
  
  const current = portfolioData.current_allocations;
  const target = portfolioData.target_allocation;
  
  const labels = Object.keys(current).map(formatAssetType);
  const currentData = Object.values(current);
  const targetData = Object.values(target);
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Current',
          data: currentData,
          backgroundColor: chartColors[0] + '80',
          borderColor: chartColors[0],
          borderWidth: 1
        },
        {
          label: 'Target',
          data: targetData,
          backgroundColor: chartColors[1] + '80',
          borderColor: chartColors[1],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 50,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      },
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '%';
            }
          }
        }
      }
    }
  });
}

function initializeAnalyticsCharts() {
  createAnalyticsChart();
  createSectorChart();
}

function createAnalyticsChart() {
  const ctx = document.getElementById('analyticsChart');
  if (!ctx) return;
  
  const returns = portfolioData.performance_history.map((item, index) => {
    if (index === 0) return 0;
    const prev = portfolioData.performance_history[index - 1].value;
    return ((item.value - prev) / prev * 100);
  }).slice(1);
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: portfolioData.performance_history.slice(1).map(item => {
        const date = new Date(item.date);
        return date.toLocaleDateString('en-US', { month: 'short' });
      }),
      datasets: [
        {
          label: 'Monthly Returns',
          data: returns,
          borderColor: chartColors[2],
          backgroundColor: chartColors[2] + '20',
          fill: true,
          tension: 0.4
        },
        {
          label: 'Benchmark (S&P 500)',
          data: [1.8, -1.2, 2.8, 1.2, 0.9, 0.7],
          borderColor: chartColors[3],
          backgroundColor: 'transparent',
          borderDash: [5, 5]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
            callback: function(value) {
              return value.toFixed(1) + '%';
            }
          }
        }
      }
    }
  });
}

function createSectorChart() {
  const ctx = document.getElementById('sectorChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Technology', 'Healthcare', 'Financial', 'Consumer', 'Industrial', 'Energy'],
      datasets: [{
        data: [35, 18, 15, 12, 10, 10],
        backgroundColor: chartColors.slice(0, 6),
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right'
        }
      }
    }
  });
}

// Portfolio table functionality
function populateHoldingsTable() {
  const tbody = document.getElementById('holdingsTableBody');
  if (!tbody) {
    console.error('Holdings table body not found');
    return;
  }
  
  // Clear existing content
  tbody.innerHTML = '';
  
  // Populate with holdings data
  portfolioData.holdings.forEach(holding => {
    const row = document.createElement('tr');
    
    const gainLossClass = holding.gain_loss >= 0 ? 'positive' : 'negative';
    const gainLossSign = holding.gain_loss >= 0 ? '+' : '';
    const percentSign = holding.gain_loss_percent >= 0 ? '+' : '';
    
    row.innerHTML = `
      <td><strong>${holding.symbol}</strong></td>
      <td>${holding.name}</td>
      <td>${formatAssetType(holding.type)}</td>
      <td>${formatQuantity(holding.quantity)}</td>
      <td>$${holding.current_price.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
      <td>$${holding.market_value.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
      <td class="${gainLossClass}">${gainLossSign}$${Math.abs(holding.gain_loss).toFixed(2)}</td>
      <td class="${gainLossClass}">${percentSign}${holding.gain_loss_percent.toFixed(2)}%</td>
    `;
    
    tbody.appendChild(row);
  });
  
  console.log('Holdings table populated with', portfolioData.holdings.length, 'holdings');
}

// Search and filter functionality
function setupPortfolioSearch() {
  const searchInput = document.getElementById('portfolioSearch');
  const filterSelect = document.getElementById('assetFilter');
  
  if (searchInput) {
    searchInput.addEventListener('input', filterHoldings);
  }
  
  if (filterSelect) {
    filterSelect.addEventListener('change', filterHoldings);
  }
}

function filterHoldings() {
  const searchTerm = document.getElementById('portfolioSearch')?.value.toLowerCase() || '';
  const filterType = document.getElementById('assetFilter')?.value || '';
  
  const rows = document.querySelectorAll('#holdingsTableBody tr');
  
  rows.forEach(row => {
    const symbol = row.cells[0].textContent.toLowerCase();
    const name = row.cells[1].textContent.toLowerCase();
    const type = getOriginalAssetType(row.cells[2].textContent);
    
    const matchesSearch = symbol.includes(searchTerm) || name.includes(searchTerm);
    const matchesFilter = !filterType || type === filterType;
    
    row.style.display = matchesSearch && matchesFilter ? '' : 'none';
  });
}

// Settings functionality
function setupAllocationSliders() {
  const sliders = document.querySelectorAll('.allocation-slider');
  
  sliders.forEach(slider => {
    slider.addEventListener('input', updateAllocationDisplay);
  });
}

function updateAllocationDisplay() {
  const sliders = document.querySelectorAll('.allocation-slider');
  let total = 0;
  
  sliders.forEach(slider => {
    const value = parseInt(slider.value);
    const valueSpan = document.getElementById(slider.id.replace('Slider', 'Value'));
    if (valueSpan) {
      valueSpan.textContent = value + '%';
    }
    total += value;
  });
  
  const totalSpan = document.getElementById('allocationTotal');
  if (totalSpan) {
    totalSpan.textContent = total + '%';
    totalSpan.style.color = total === 100 ? 'var(--color-success)' : 'var(--color-error)';
  }
}

// Timeframe selector functionality
function setupTimeframeSelector() {
  const buttons = document.querySelectorAll('.timeframe-btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      buttons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Here you would typically update charts with new timeframe data
      console.log('Timeframe changed to:', this.dataset.period);
    });
  });
}

// Rebalancing functionality
function setupExecuteRebalancing() {
  const button = document.getElementById('executeRebalancing');
  
  if (button) {
    button.addEventListener('click', function() {
      this.textContent = 'Executing...';
      this.disabled = true;
      
      setTimeout(() => {
        alert('Rebalancing executed successfully! Your portfolio has been optimized according to AI recommendations.');
        this.textContent = 'Execute Rebalancing';
        this.disabled = false;
      }, 2000);
    });
  }
}

// Utility functions
function formatAssetType(type) {
  const typeMap = {
    'stock': 'Stocks',
    'etf': 'ETFs',
    'bond_etf': 'Bonds',
    'bonds': 'Bonds',
    'commodities': 'Commodities',
    'precious_metals': 'Precious Metals',
    'crypto': 'Cryptocurrency'
  };
  
  return typeMap[type] || type.charAt(0).toUpperCase() + type.slice(1);
}

function formatQuantity(quantity) {
  if (quantity < 1) {
    return quantity.toFixed(2);
  } else if (quantity % 1 === 0) {
    return quantity.toString();
  } else {
    return quantity.toFixed(2);
  }
}

function getOriginalAssetType(displayType) {
  const reverseMap = {
    'Stocks': 'stock',
    'ETFs': 'etf',
    'Bonds': 'bond_etf',
    'Commodities': 'commodities',
    'Precious Metals': 'precious_metals',
    'Cryptocurrency': 'crypto'
  };
  
  return reverseMap[displayType] || displayType.toLowerCase();
}

// User profile dropdown functionality
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('user-dropdown')) {
    e.preventDefault();
    
    // Simple logout functionality
    if (confirm('Are you sure you want to logout?')) {
      const app = document.getElementById('app');
      const loginPage = document.getElementById('loginPage');
      
      app.classList.add('hidden');
      loginPage.classList.remove('hidden');
      loginPage.style.opacity = '1';
    }
  }
});

// Notification functionality
document.querySelector('.notification-icon')?.addEventListener('click', function() {
  alert('You have 3 new notifications:\n\n• Portfolio rebalancing recommended\n• Market volatility alert\n• Monthly performance report ready');
});

// Add hover effects for better UX
document.querySelectorAll('.card, .stat-card, .insight-item').forEach(element => {
  element.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px)';
  });
  
  element.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Initialize tooltips for charts
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(31, 33, 33, 0.9)';
Chart.defaults.plugins.tooltip.titleColor = '#f5f5f5';
Chart.defaults.plugins.tooltip.bodyColor = '#f5f5f5';
Chart.defaults.plugins.tooltip.borderColor = '#1FB8CD';
Chart.defaults.plugins.tooltip.borderWidth = 1;
Chart.defaults.plugins.tooltip.cornerRadius = 8;

// Performance optimization: Lazy load charts
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const chartCanvas = entry.target.querySelector('canvas');
      if (chartCanvas && !chartCanvas.hasAttribute('data-loaded')) {
        chartCanvas.setAttribute('data-loaded', 'true');
        // Initialize specific chart based on canvas ID
        // This would be expanded for production use
      }
    }
  });
}, observerOptions);

// Observe chart containers for lazy loading
document.querySelectorAll('.chart-container').forEach(container => {
  observer.observe(container);
});

console.log('Portfolio Nexus application initialized successfully!');

// Advanced AI Features Implementation
// ===================================

function generateAdvancedAIInsights() {
  console.log('🚀 Generating Advanced AI Insights...');
  
  if (!advancedAI) {
    console.warn('Advanced AI Engine not available');
    return;
  }
  
  // Generate trading signals
  generateTradingSignals();
  
  // Generate price predictions
  generatePricePredictions();
  
  // Generate portfolio optimization
  generatePortfolioOptimization();
  
  // Generate stress test analysis
  generateStressTestAnalysis();
}

function generateTradingSignals() {
  console.log('📊 Generating AI Trading Signals...');
  
  const signals = advancedAI.generateTradingSignals(portfolioData);
  const container = document.getElementById('tradingSignalsContainer');
  
  if (!container) return;
  
  container.innerHTML = '';
  
  signals.slice(0, 5).forEach(signal => {
    const signalElement = document.createElement('div');
    signalElement.className = `signal-card ${signal.action.toLowerCase()}`;
    
    const actionIcon = {
      'BUY': '📈',
      'SELL': '📉', 
      'HOLD': '⏸️'
    };
    
    signalElement.innerHTML = `
      <div class="signal-header">
        <span class="signal-icon">${actionIcon[signal.action]}</span>
        <span class="signal-asset">${signal.asset}</span>
        <span class="signal-action ${signal.action.toLowerCase()}">${signal.action}</span>
      </div>
      <div class="signal-strength">
        <div class="strength-label">Strength:</div>
        <div class="strength-bar">
          <div class="strength-fill" style="width: ${signal.strength * 10}%"></div>
        </div>
        <span class="strength-value">${signal.strength.toFixed(1)}/10</span>
      </div>
      <div class="signal-reasoning">${signal.reasoning}</div>
      <div class="signal-meta">
        <span class="confidence">Confidence: ${Math.round(signal.confidence * 100)}%</span>
        <span class="timeframe">Timeframe: ${signal.timeframe}</span>
      </div>
    `;
    
    container.appendChild(signalElement);
  });
}

function generatePricePredictions() {
  console.log('🔮 Generating ML Price Predictions...');
  
  const assetData = {};
  portfolioData.holdings.forEach(holding => {
    assetData[holding.symbol] = {
      currentPrice: holding.current_price,
      historicalData: generateMockHistoricalData(holding.current_price)
    };
  });
  
  const predictions = advancedAI.predictPriceTrends(assetData, 30);
  const container = document.getElementById('pricePredictionsContainer');
  
  if (!container) return;
  
  container.innerHTML = '';
  
  Object.entries(predictions).slice(0, 4).forEach(([symbol, prediction]) => {
    const predictionElement = document.createElement('div');
    predictionElement.className = 'prediction-card';
    
    const changePercent = ((prediction.predictedPrice - prediction.currentPrice) / prediction.currentPrice * 100);
    const trendClass = changePercent > 0 ? 'positive' : 'negative';
    
    predictionElement.innerHTML = `
      <div class="prediction-header">
        <span class="prediction-symbol">${symbol}</span>
        <span class="prediction-trend ${trendClass}">${prediction.trend}</span>
      </div>
      <div class="prediction-prices">
        <div class="current-price">
          <span class="label">Current:</span>
          <span class="price">$${prediction.currentPrice.toFixed(2)}</span>
        </div>
        <div class="predicted-price">
          <span class="label">30-day target:</span>
          <span class="price ${trendClass}">$${prediction.predictedPrice.toFixed(2)}</span>
        </div>
      </div>
      <div class="prediction-change ${trendClass}">
        ${changePercent > 0 ? '+' : ''}${changePercent.toFixed(1)}%
      </div>
      <div class="prediction-confidence">
        ML Confidence: ${Math.round(prediction.confidence * 100)}%
      </div>
      <div class="prediction-risk">
        Risk Level: ${prediction.riskLevel}
      </div>
    `;
    
    container.appendChild(predictionElement);
  });
}

function generatePortfolioOptimization() {
  console.log('⚙️ Generating Portfolio Optimization...');
  
  const expectedReturns = {};
  portfolioData.holdings.forEach(holding => {
    expectedReturns[holding.symbol] = 0.05 + Math.random() * 0.15; // 5-20% expected return
  });
  
  const optimization = advancedAI.optimizePortfolioMPT(expectedReturns, portfolioData.user_profile.risk_appetite);
  const container = document.getElementById('optimizationContainer');
  
  if (!container) return;
  
  container.innerHTML = `
    <div class="optimization-summary">
      <h5>🎯 Optimization Results (${optimization.method})</h5>
      <div class="optimization-metrics">
        <div class="metric">
          <span class="metric-label">Expected Return:</span>
          <span class="metric-value positive">${(optimization.expectedReturn * 100).toFixed(1)}%</span>
        </div>
        <div class="metric">
          <span class="metric-label">Portfolio Risk:</span>
          <span class="metric-value">${(optimization.risk * 100).toFixed(1)}%</span>
        </div>
        <div class="metric">
          <span class="metric-label">Sharpe Ratio:</span>
          <span class="metric-value">${optimization.sharpeRatio.toFixed(2)}</span>
        </div>
        <div class="metric">
          <span class="metric-label">AI Confidence:</span>
          <span class="metric-value">${Math.round(optimization.confidence * 100)}%</span>
        </div>
      </div>
    </div>
    <div class="optimization-allocation">
      <h6>📊 Optimal Allocation:</h6>
      <div class="allocation-grid">
        ${Object.entries(optimization.allocation).map(([asset, weight]) => `
          <div class="allocation-item">
            <span class="asset-name">${asset}</span>
            <span class="asset-weight">${(weight * 100).toFixed(1)}%</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function generateStressTestAnalysis() {
  console.log('⚡ Generating Stress Test Analysis...');
  
  const scenarios = {
    'Market Crash': {
      marketDrop: -0.3,
      volatilityIncrease: 2.0,
      probability: 0.05
    },
    'Interest Rate Spike': {
      rateIncrease: 0.02,
      bondImpact: -0.15,
      probability: 0.15
    },
    'Inflation Surge': {
      inflationIncrease: 0.04,
      realReturnImpact: -0.06,
      probability: 0.20
    },
    'Economic Recession': {
      gdpDrop: -0.02,
      unemploymentRise: 0.03,
      probability: 0.10
    }
  };
  
  const stressTest = advancedAI.stressTestPortfolio(portfolioData, scenarios);
  const container = document.getElementById('stressTestContainer');
  
  if (!container) return;
  
  container.innerHTML = `
    <div class="stress-test-summary">
      <h5>🛡️ Portfolio Stress Test Results</h5>
      <div class="overall-risk ${stressTest.overallRisk > 0.3 ? 'high' : stressTest.overallRisk > 0.15 ? 'medium' : 'low'}">
        Overall Risk Level: ${(stressTest.overallRisk * 100).toFixed(1)}%
      </div>
    </div>
    <div class="stress-scenarios">
      ${Object.entries(stressTest.results).map(([scenario, result]) => `
        <div class="scenario-card">
          <div class="scenario-name">${scenario}</div>
          <div class="scenario-impact">
            <span class="impact-label">Portfolio Impact:</span>
            <span class="impact-value ${result.portfolioValue > 0 ? 'positive' : 'negative'}">
              ${result.portfolioValue > 0 ? '+' : ''}${(result.portfolioValue * 100).toFixed(1)}%
            </span>
          </div>
          <div class="scenario-probability">
            Probability: ${(result.probability * 100).toFixed(0)}%
          </div>
        </div>
      `).join('')}
    </div>
    <div class="stress-recommendations">
      <h6>💡 Risk Mitigation Recommendations:</h6>
      <ul>
        ${stressTest.recommendations.map(rec => `<li>${rec}</li>`).join('')}
      </ul>
    </div>
  `;
}

// Helper function to generate mock historical data
function generateMockHistoricalData(currentPrice) {
  const data = [];
  let price = currentPrice;
  
  for (let i = 30; i >= 0; i--) {
    const change = (Math.random() - 0.5) * 0.04; // ±2% daily change
    price = price * (1 + change);
    data.push(price);
  }
  
  return data.reverse();
}