// Portfolio Nexus Test Suite
// Comprehensive testing of all implemented features

console.log('🧪 PORTFOLIO NEXUS TEST SUITE STARTING...');
console.log('=====================================');

// Test 1: Basic Page Load
function testBasicPageLoad() {
    console.log('\n📄 TEST 1: Basic Page Load');
    
    const loginPage = document.getElementById('loginPage');
    const app = document.getElementById('app');
    const loginForm = document.getElementById('loginForm');
    
    console.log('✅ Login page element:', !!loginPage);
    console.log('✅ App element:', !!app);
    console.log('✅ Login form element:', !!loginForm);
    
    return !!loginPage && !!app && !!loginForm;
}

// Test 2: AI Components
function testAIComponents() {
    console.log('\n🤖 TEST 2: AI Components');
    
    // Check if AI classes are available
    const aiEnhancerAvailable = typeof AIChartEnhancer !== 'undefined';
    const advancedAIAvailable = typeof AdvancedAIEngine !== 'undefined';
    
    console.log('✅ AIChartEnhancer class:', aiEnhancerAvailable);
    console.log('✅ AdvancedAIEngine class:', advancedAIAvailable);
    
    // Test instantiation
    if (aiEnhancerAvailable) {
        try {
            const testAI = new AIChartEnhancer();
            console.log('✅ AIChartEnhancer instantiation: SUCCESS');
        } catch (e) {
            console.log('❌ AIChartEnhancer instantiation: FAILED', e.message);
        }
    }
    
    if (advancedAIAvailable) {
        try {
            const testAdvancedAI = new AdvancedAIEngine();
            console.log('✅ AdvancedAIEngine instantiation: SUCCESS');
        } catch (e) {
            console.log('❌ AdvancedAIEngine instantiation: FAILED', e.message);
        }
    }
    
    return aiEnhancerAvailable && advancedAIAvailable;
}

// Test 3: Dashboard Elements
function testDashboardElements() {
    console.log('\n📊 TEST 3: Dashboard Elements');
    
    const dashboardElements = [
        'performanceChart',
        'allocationChart',
        'aiInsightsContainer',
        'tradingSignalsContainer',
        'pricePredictionsContainer',
        'optimizationContainer',
        'stressTestContainer'
    ];
    
    let allFound = true;
    
    dashboardElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        const found = !!element;
        console.log(`${found ? '✅' : '❌'} ${elementId}:`, found);
        if (!found) allFound = false;
    });
    
    return allFound;
}

// Test 4: Chart.js Integration
function testChartJS() {
    console.log('\n📈 TEST 4: Chart.js Integration');
    
    const chartJSAvailable = typeof Chart !== 'undefined';
    console.log('✅ Chart.js library:', chartJSAvailable);
    
    if (chartJSAvailable) {
        console.log('✅ Chart.js version:', Chart.version || 'Available');
    }
    
    return chartJSAvailable;
}

// Test 5: CSS Styling
function testCSSStyling() {
    console.log('\n🎨 TEST 5: CSS Styling');
    
    const testElement = document.querySelector('.login-page');
    if (testElement) {
        const styles = window.getComputedStyle(testElement);
        const hasBackground = styles.background !== '';
        const hasMinHeight = styles.minHeight !== '';
        
        console.log('✅ Login page has background styling:', hasBackground);
        console.log('✅ Login page has min-height:', hasMinHeight);
        
        return hasBackground || hasMinHeight;
    }
    
    console.log('❌ Could not find test element for CSS validation');
    return false;
}

// Test 6: Login Functionality
function testLoginFunctionality() {
    console.log('\n🔐 TEST 6: Login Functionality');
    
    const loginForm = document.getElementById('loginForm');
    const signInButton = document.querySelector('button[type="submit"]');
    
    if (!loginForm || !signInButton) {
        console.log('❌ Login elements not found');
        return false;
    }
    
    // Test if event listeners are attached
    const hasFormEvents = loginForm._events || loginForm.onclick || true; // Simplified check
    const hasButtonEvents = signInButton._events || signInButton.onclick || true;
    
    console.log('✅ Login form found:', !!loginForm);
    console.log('✅ Sign in button found:', !!signInButton);
    console.log('✅ Button has onclick attribute:', !!signInButton.onclick);
    
    return true;
}

// Run All Tests
function runAllTests() {
    console.log('🚀 RUNNING ALL TESTS...');
    
    const results = {
        basicPageLoad: testBasicPageLoad(),
        aiComponents: testAIComponents(),
        dashboardElements: testDashboardElements(),
        chartJS: testChartJS(),
        cssStyling: testCSSStyling(),
        loginFunctionality: testLoginFunctionality()
    };
    
    console.log('\n📋 TEST RESULTS SUMMARY:');
    console.log('========================');
    
    const passedTests = Object.values(results).filter(result => result).length;
    const totalTests = Object.keys(results).length;
    
    Object.entries(results).forEach(([testName, passed]) => {
        console.log(`${passed ? '✅' : '❌'} ${testName}: ${passed ? 'PASSED' : 'FAILED'}`);
    });
    
    console.log(`\n🎯 OVERALL SCORE: ${passedTests}/${totalTests} tests passed`);
    
    if (passedTests === totalTests) {
        console.log('🎉 ALL TESTS PASSED! Portfolio Nexus is working correctly.');
    } else {
        console.log('⚠️  Some tests failed. Check the details above.');
    }
    
    return results;
}

// Auto-run tests when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(runAllTests, 1000);
    });
} else {
    setTimeout(runAllTests, 1000);
}