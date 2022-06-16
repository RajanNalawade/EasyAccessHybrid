let product_code = '1C';
let product_uin = 'UIN:111L090V02';
let product_cateogory = 'INDIVIDUAL PLAN';
let product_type = 'ULIP';

let minAgeLimit = 18;
let maxAgeLimit = 45;
let gender = ['Male', 'Female'];
let maxAgeAtMaturity = 65;
let charge_Inflation = 0;
let inflation_pa_RP = 0;
let minPolicyTerm = 10;
let policyTermSkipInterval = 4;
let maxPolicyTerm = 30;

//let maxPremAmtMonthly=83332.25;
//let minPremAmtQuarterly=5500;
//let maxPremAmtQuarterly=249998.8;
//let minPremAmtHalfYearly=9500;
//let maxPremAmtHalfYearly=499998.5;
//let minPremAmtYearly=15000;
//let maxPremAmtYearly=999999;
let minPremAmtMonthly = 2000;
let maxPremAmtMonthly = 83300;
let minPremAmtQuarterly = 5500;
let maxPremAmtQuarterly = 249900;
let minPremAmtHalfYearly = 9500;
let maxPremAmtHalfYearly = 499900;
let minPremAmtYearly = 15000;
let maxPremAmtYearly = 999900;
//let serviceTax=(12.36/100);
let serviceTax = 0.145;
let topUpPremiumAmt = 0;
let topUp = 0.02;
let charge_SumAssuredBase = 0;
let fixedMonthlyExp_RP = 33.33;
let mortalityCharges_AsPercentOfofLICtable = 1.2;
let accTPD_Charge = 0.4;
let int1 = 0.04;
let int2 = 0.08;
let charge_Fund = 0;
let FMC_EquityFund = 0.0135;
let FMC_BondFund = 0.01;
let FMC_Top300Fund = 0.0135;
let FMC_EquityOptFund = 0.0135;
let FMC_GrowthFund = 0.0135;
let FMC_BalancedFund = 0.0125;
let FMC_MoneyMarketFund = 0.0025;
let minSAMF = 10;
let maxSAMF = 10;
let topUpStatus = true;
let allocationCharges = true;
let riderCharges = true;
let mortalityCharges = true;
let mortalityAndRiderCharges = true;
let administrationCharges = true;
let fundManagementCharges = true;
let guaranteedAddition = true;
let surrenderCharges = false;

let premiumFrequencyModeList = [{
    value: 0,
    title: 'Monthly',
    minPremiumAmount: 2000,
    maxPremiumAmount: 83300
  },
  {
    value: 1,
    title: 'Quaterly',
    minPremiumAmount: 5500,
    maxPremiumAmount: 249900
  },
  {
    value: 2,
    title: 'Half-Yearly',
    minPremiumAmount: 9500,
    maxPremiumAmount: 499900
  },
  {
    value: 3,
    title: 'Yearly',
    minPremiumAmount: 15000,
    maxPremiumAmount: 999900
  }
];

let selectFundList = [{
  value: 0,
  title: 'Trigger Fund'
}, {
  value: 1,
  title: 'Smart Fund'
}];

let increasingCoverOptionList = [{
  value: 0,
  title: 'Yes'
}, {
  value: 1,
  title: 'No'
}];