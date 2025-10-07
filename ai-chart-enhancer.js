// AI-Enhanced Chart Features for Portfolio Nexus
// This module adds intelligent features to existing Chart.js implementations

class AIChartEnhancer {
  constructor() {
    this.insights = [];
    this.predictions = [];
    this.annotations = [];
  }

  // Generate AI insights for portfolio performance
  generatePerformanceInsights(performanceData) {
    const insights = [];
    const values = performanceData.map(item => item.value);
    const latestValue = values[values.length - 1];
    const previousValue = values[values.length - 2];
    const trend = this.calculateTrend(values);
    
    // AI-like insight generation
    if (trend > 2) {
      insights.push({
        type: 'positive',
        message: 'Strong upward trend detected. Portfolio showing consistent growth.',
        confidence: 0.85,
        recommendation: 'Consider maintaining current allocation strategy.'
      });
    } else if (trend < -2) {
      insights.push({
        type: 'warning',
        message: 'Downward trend identified. Market volatility may be affecting performance.',
        confidence: 0.78,
        recommendation: 'Review asset allocation and consider rebalancing.'
      });
    }

    // Volatility analysis
    const volatility = this.calculateVolatility(values);
    if (volatility > 5) {
      insights.push({
        type: 'info',
        message: `High volatility detected (${volatility.toFixed(1)}%). This is normal for growth-focused portfolios.`,
        confidence: 0.92,
        recommendation: 'Monitor closely but avoid panic selling.'
      });
    }

    return insights;
  }

  // Calculate trend strength (-10 to +10)
  calculateTrend(values) {
    if (values.length < 3) return 0;
    
    let increases = 0;
    let decreases = 0;
    
    for (let i = 1; i < values.length; i++) {
      if (values[i] > values[i-1]) increases++;
      else if (values[i] < values[i-1]) decreases++;
    }
    
    return ((increases - decreases) / (values.length - 1)) * 10;
  }

  // Calculate portfolio volatility
  calculateVolatility(values) {
    if (values.length < 2) return 0;
    
    const returns = [];
    for (let i = 1; i < values.length; i++) {
      returns.push((values[i] - values[i-1]) / values[i-1] * 100);
    }
    
    const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length;
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length;
    
    return Math.sqrt(variance);
  }

  // Generate predictive data points
  generatePredictions(performanceData, days = 30) {
    const values = performanceData.map(item => item.value);
    const trend = this.calculateTrend(values);
    const lastValue = values[values.length - 1];
    const lastDate = new Date(performanceData[performanceData.length - 1].date);
    
    const predictions = [];
    
    for (let i = 1; i <= days; i++) {
      const futureDate = new Date(lastDate);
      futureDate.setDate(futureDate.getDate() + i);
      
      // Simple trend-based prediction with some randomness
      const trendFactor = (trend / 100) * i * 0.1;
      const randomFactor = (Math.random() - 0.5) * 0.02; // ±1% random variation
      const predictedValue = lastValue * (1 + trendFactor + randomFactor);
      
      predictions.push({
        date: futureDate.toISOString().split('T')[0],
        value: predictedValue,
        confidence: Math.max(0.3, 0.9 - (i * 0.02)) // Decreasing confidence over time
      });
    }
    
    return predictions;
  }

  // Generate smart allocation recommendations
  generateAllocationInsights(currentAllocations, targetAllocations, marketConditions = 'normal') {
    const insights = [];
    
    for (const [asset, current] of Object.entries(currentAllocations)) {
      const target = targetAllocations[asset] || 0;
      const deviation = Math.abs(current - target);
      
      if (deviation > 5) {
        const action = current > target ? 'reduce' : 'increase';
        const severity = deviation > 10 ? 'high' : 'medium';
        
        insights.push({
          asset: asset,
          type: 'rebalancing',
          severity: severity,
          message: `${asset.toUpperCase()}: ${action} allocation by ${deviation.toFixed(1)}%`,
          current: current,
          target: target,
          recommendation: this.getRebalancingAction(asset, action, deviation, marketConditions)
        });
      }
    }
    
    return insights.sort((a, b) => {
      const severityOrder = { high: 3, medium: 2, low: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    });
  }

  // Get specific rebalancing recommendations
  getRebalancingAction(asset, action, deviation, marketConditions) {
    const actions = {
      stocks: {
        reduce: 'Consider taking profits and diversifying into bonds or ETFs',
        increase: 'Look for opportunities to buy quality stocks during market dips'
      },
      bonds: {
        reduce: 'Move to higher-yield investments if risk tolerance allows',
        increase: 'Add stability to portfolio with government or corporate bonds'
      },
      crypto: {
        reduce: 'Take profits in crypto and diversify into traditional assets',
        increase: 'Dollar-cost average into established cryptocurrencies'
      },
      etfs: {
        reduce: 'Consider individual stock picks for potentially higher returns',
        increase: 'ETFs provide excellent diversification for your risk level'
      }
    };
    
    return actions[asset]?.[action] || `${action} ${asset} allocation to meet target`;
  }

  // Risk assessment with AI-like scoring
  assessRiskLevel(portfolioData) {
    const allocations = portfolioData.current_allocations;
    let riskScore = 0;
    
    // Weight different assets by risk
    const riskWeights = {
      stocks: 0.8,
      crypto: 1.0,
      etfs: 0.6,
      bonds: 0.2,
      precious_metals: 0.7,
      commodities: 0.9
    };
    
    for (const [asset, percentage] of Object.entries(allocations)) {
      riskScore += (percentage / 100) * (riskWeights[asset] || 0.5);
    }
    
    const riskLevel = riskScore * 10; // Scale to 1-10
    
    return {
      score: Math.round(riskLevel * 10) / 10,
      level: this.getRiskLevelText(riskLevel),
      recommendations: this.getRiskRecommendations(riskLevel, portfolioData.user_profile)
    };
  }

  getRiskLevelText(score) {
    if (score < 3) return 'Conservative';
    if (score < 5) return 'Moderate-Conservative';
    if (score < 7) return 'Moderate';
    if (score < 8.5) return 'Moderate-Aggressive';
    return 'Aggressive';
  }

  getRiskRecommendations(riskScore, userProfile) {
    const recommendations = [];
    const userAge = userProfile.financial_situation.age;
    const riskAppetite = userProfile.risk_appetite;
    
    // Age-based recommendations
    if (userAge < 30 && riskScore < 6) {
      recommendations.push('Consider increasing growth investments for long-term wealth building');
    } else if (userAge > 50 && riskScore > 7) {
      recommendations.push('Consider reducing risk as you approach retirement');
    }
    
    // Risk appetite alignment
    if (riskAppetite === 'conservative' && riskScore > 6) {
      recommendations.push('Portfolio risk level exceeds your stated risk tolerance');
    } else if (riskAppetite === 'aggressive' && riskScore < 7) {
      recommendations.push('Portfolio may be too conservative for your risk appetite');
    }
    
    return recommendations;
  }
}

// Export for use in main application
window.AIChartEnhancer = AIChartEnhancer;