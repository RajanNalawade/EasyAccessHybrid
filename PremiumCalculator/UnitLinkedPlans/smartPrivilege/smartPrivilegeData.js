let product_cateogory = 'INDIVIDUAL PLAN';
let product_type = 'ULIP';

var gender = ['Male', 'Female'];
var planType = [{
    value: 1,
    title: 'Single',
    showPremiumFreqeuncyMode: false,
    showPremiumPayingTerm: false
}, {
    value: 2,
    title: 'Regular',
    showPremiumFreqeuncyMode: true,
    showPremiumPayingTerm: false
}, {
    value: 3,
    title: 'Limited',
    showPremiumFreqeuncyMode: true,
    showPremiumPayingTerm: true
}];

var limitedPlanPremiumFrequencyMode = [{
    value: 1,
    title: 'Yearly',
    minPremiumAmount: 600000
}, {
    value: 2,
    title: 'Half Yearly',
    minPremiumAmount: 300000
}, {
    value: 3,
    title: 'Quarterly',
    minPremiumAmount: 150000
}, {
    value: 4,
    title: 'Monthly',
    minPremiumAmount: 50000
}];

var serviceTax = 0.15;

var int1 = 0.04;

var int2 = 0.08;

var FMC_EquityFund = 0.0135;

var FMC_EquityOptimiserFund = 0.0135;

var FMC_GrowthFund = 0.0135;

var FMC_BalancedFund = 0.0125;

var FMC_BondFund = 0.01;

var FMC_PureFund = 0.0135;

var FMC_MidcapFund = 0.0135;

var FMC_Top300Fund = 0.0135;

var charge_Fund = 0;

var guarantee_charge = 0;

var maxPremiumAmtLimit = 10000000;

var minAgeLimit = 8;

var maxAgeLimit = 55;

var proposerAgeMin = 18;

var proposerAgeMax = 100;

var minPolicyTerm = 5;

var maxPolicyTerm = 30;

var minPremiumPayingTerm = 5;

var maxPremiumPayingTerm = 10;

var allocationCharges = true;

var mortalityCharges = true;

var mortalityAndRiderCharges = true;

var administrationCharges = true;

var fundManagementCharges = true;

var riderCharges = true;

var asPercentOfFirstYrPremium = true;

var surrenderCharges = true;

var topUpStatusYield = false;

var allocationChargesYield = false;

var mortalityChargesYield = false;

var mortalityAndRiderChargesYield = false;

var administrationChargesYield = false;

var fundManagementChargesYield = false;

var riderChargesYield = false;

var surrenderChargesYield = false;


var minPremiumAmount;
var maxPremiumAmount = this.maxPremiumAmtLimit;

var minSAMF;
var maxSAMF;

var minSAMFLabel;
var maxSAMFLabel;