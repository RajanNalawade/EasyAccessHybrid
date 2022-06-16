let product_code = '53';
let product_uin = 'UIN:111L072V03';
let product_cateogory = 'INDIVIDUAL PLAN';
let product_type = 'ULIP';

let monthOfLaunch = 12;
let dayOfLaunch = 15;
let yearOfLaunch = 2009;
let monthOfInception = 2;
let dayOfInception = 9;
let yearOfInception = 2012;
let minAgeLimit = 18;
let maxAgeLimit = 60;
let minPolicyTerm = 5;
let maxPolicyTerm = 30;
let charge_Inflation = 0;
let fixedMonthlyExp_RP = 60;
let fixedMonthlyExp_SP = 50;
let inflation_pa_RP = 0;
let inflation_pa_SP = 0;
let topUpPremiumAmt = 25000;
let topUp = 0.02;
//let serviceTax =12.36/100;
let serviceTax = 0.145;
let charge_SumAssuredBase = 0;
let ADBandATPDCharge = 0.0005;
//let mortalityCharges_AsPercentOfofLICtable =1;
let mortalityCharges_AsPercentOfofLICtable = 1.2;
//let int1 =0.06;
//let int2 =0.1;
let int1 = 0.04;
let int2 = 0.08;
let charge_Fund = 0;
//let charge_Fund_Ren =0.0135;
let charge_Fund_Ren = 0.0125;
let FMC_EquityEliteIIFund = 0.0125;
let FMC_BalancedFund = 0.0125;
let FMC_BondFund = 0.01;
let FMC_MoneyMarketFund = 0.0025;
let FMC_IndexFund = 0.0;
let FMC_PEmanagedFund = 0.0;
let noOfYearsForSArelatedCharges = 3;
let indexFund = 0.0125;
let topUpStatus = true;
let allocationCharges = true;
let mortalityCharges = true;
let mortalityAndRiderCharges = true;
let administrationAndSArelatedCharges = true;
let fundManagementCharges = true;
let riderCharges = true;
//let surrenderCharges =false;
let surrenderCharges = true;
let gender = ['Male', 'Female'];
let premiumFrequencyList = [{
    value: 0,
    title: 'Single',
    showPremiumFrequencyModeList: false,
    minPremiumAmount: 200000
  },
  {
    value: 1,
    title: 'Limited',
    showPremiumFrequencyModeList: true,
    minPremiumAmount: 150000
  }
];
let premiumFrequencyModeList = [{
    value: 0,
    title: 'Yearly',
    minPremiumAmount: 150000
  },
  {
    value: 1,
    title: 'Half Yearly',
    minPremiumAmount: 75000
  },
  {
    value: 2,
    title: 'Quarterly',
    minPremiumAmount: 37500
  },
  {
    value: 3,
    title: 'Monthly',
    minPremiumAmount: 12500
  }
];
let planOptionList = [{
    value: 0,
    title: 'Gold'
  },
  {
    value: 1,
    title: 'Platinum'
  }
];
let premiumPayingTermList = [{
    value: 5,
    title: '5',
  },
  {
    value: 8,
    title: '8',
  },
  {
    value: 10,
    title: '10'
  }
];
let minSAMFLabelLimit = 0;
let maxSAMFLabelLimit = 0;