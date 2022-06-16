let product_code = '1H';
let product_uin = 'UIN:111L094V02';
let product_cateogory = 'INDIVIDUAL PLAN';
let product_type = 'ULIP';

var topUp = 0.02;
var serviceTax = 0.145;
var charge_SumAssuredBase = 0;
var fixedMonthlyExp_RP = 45;
var mortalityCharges_AsPercentOfofLICtable = 0;
var accTPD_Charge = 0;
var int1 = 0.04;
var int2 = 0.08;
var FMC_EquityFund = 0.0135;
var FMC_BondFund = 0.01;
var FMC_Top300Fund = 0.0135;
var FMC_EquityOptFund = 0.0135;
var FMC_GrowthFund = 0.0135;
var FMC_BalancedFund = 0.0125;
var FMC_MoneyMarketFund = 0.0025;
var charge_Fund = 0;
var guarantee_chg = 0.0025;
var loyaltyAddition = 0.015;
var minGuarantee = 0.05;
var charge_Inflation = 0;
var inflation_pa_RP = 0;
var minAgeLimit = 30;
var maxAgeLimit = 70;
var topUpStatus = false;
var allocationCharges = true;
var administrationCharge = true;
var mortalityCharges = false;
var mortalityAndRiderCharges = true;
var administrationCharges = true;
var guaranteeCharge = true;
var fundManagementCharges = true;
var surrenderCharges = true;
var riderCharges = false;
var allocationChargesReductionYield = false;
var administrationChargesReductionYield = false;
var mortalityAndRiderChargesReductionYield = false;
var guaranteeChargeReductionYield = false;
var fundManagementChargesReductionYield = false;
var guaranteedAddition = true;
var terminalAddition = true;
var surrenderChargesReductionYield = false;

var minPolicyTermLimit = 10;
var maxPolicyTermLimit = 35;

var minPremiumPayingTermLimit = 5;
var maxPremiumPayingTermLimit = 35;

var gender = ['Male', 'Female'];
var minSinglePremiumAmount = 100000;
var premiumFrequencyModeList = [{
    value: 0,
    title: "Monthly",
    minRegularPremiumAmount: 2500,
    minLPPTPremiumAmount: 5000

  },
  {
    value: 1,
    title: "Quarterly",
    minRegularPremiumAmount: 7500,
    minLPPTPremiumAmount: 10000
  },
  {
    value: 2,
    title: "Half Yearly",
    minRegularPremiumAmount: 15000,
    minLPPTPremiumAmount: 20000
  },
  {
    value: 3,
    title: "Yearly",
    minRegularPremiumAmount: 24000,
    minLPPTPremiumAmount: 40000
  }
];

var premiumPaymentOptionList = [{
    value: 0,
    title: "Regular"
  },
  {
    value: 1,
    title: "LPPT"
  },
  {
    value: 2,
    title: "Single"
  }
];

var maturityOption = [{
  value: 0,
  title: "Option 1.1 Lifetime Income"
}, {
  value: 1,
  title: "Option 1.2 Lifetime Income with Capital Refund"
}, {
  value: 2,
  title: "Option 1.3 Lifetime Income with Capital refund in parts"
}, {
  value: 3,
  title: "Option 1.4 Lifetime Income with Balance Capital Refund"
}, {
  value: 4,
  title: "Option 1.5 Lifetime income with Annual Increase of 3%"
}, {
  value: 5,
  title: "Option 1.6 Lifetime income with Annual Increase of 5%"
}, {
  value: 6,
  title: "Option 1.7 Lifetime income with certain period of 5 years"
}, {
  value: 7,
  title: "Option 1.8 Lifetime income with certain period of 10 years"
}, {
  value: 8,
  title: "Option 1.9 Lifetime income with certain period of 15 years"
}, {
  value: 9,
  title: "Option 1.10 Lifetime income with certain period of 20 years"
}, {
  value: 10,
  title: "Option 2.1 Life and Last  Survivor - 50% Income"
}, {
  value: 11,
  title: "Option 2.2 Life and Last  Survivor - 100% Income"
}, {
  value: 12,
  title: "Option 2.3 Life and Last  Survivor - 50% Income with Capital Refund"
}, {
  value: 13,
  title: "Option 2.4 Life and Last  Survivor - 100% Income with Capital Refund"
}, ];

var maturityAnnuityOptionFreqList = [{
    value: 0,
    title: "Yearly"
  },
  {
    value: 1,
    title: "Half Yearly"
  },
  {
    value: 2,
    title: "Quarterly"
  }, {
    value: 3,
    title: "Monthly"
  }
];