let product_code = '50';
let product_uin = 'UIN:111L070V02';
let product_cateogory = 'INDIVIDUAL PLAN';
let product_type = 'TRADITION';

let minAgeLimit = 18;
let maxAgeLimit =55;
let maxAgeAtMaturity =69;
let minAgeADB =18;
let maxAgeADB =64;
let minADBterm =5;
let maxADBterm = 20;
let charge_Inflation =0;
let inflation_pa_RP =0;
let minPremAmtYearly =15000;
let minPremAmtHalfYearly =9500;
let minPremAmtQuarterly =5500;
let minPremAmtMonthly =2000;
let maxPremAmtYearly =29000;
let maxPremAmtHalfYearly =14500;
let maxPremAmtQuarterly =7200;
let maxPremAmtMonthly =2400;
let maxSAMF =20.0;
let minSAMF = 10.0;
let topUpPremiumAmt =0;
let topUp =0.02;
//let serviceTax =12.36/100;
let serviceTax =0.145;
let charge_SumAssuredBase =0;
let fixedMonthlyExp_RP =33.33;
//let mortalityCharges_AsPercentOfofLICtable =1.1;
let mortalityCharges_AsPercentOfofLICtable =1.2;
//let int1 =0.06;
//let int2 =0.1;
let int1 =0.04;
let int2 =0.08;
let charge_Fund =0;
let charge_Fund_Ren =0.01;
let FMC_EquityFund =0.0135;
let FMC_BondFund =0.01;
let FMC_BalancedFund =0.0125;
let FMC_IndexFund =0.0;
let topUpStatus =true;
let allocationCharges =true;
let riderCharges =true;
let mortalityCharges =true;
let mortalityAndRiderCharges =true;
let administrationCharges =true;
let asPercentOfFirstYrPremium =true;
let fundManagementCharges =true;
//let surrenderCharges =false;
let surrenderCharges =true;
let guaranteeCharges =false;
let gender = ['Male', 'Female'];
let policyTermList = [{
        value: '10',
        title: 10
    },
    {
        value: '15',
        title: 15
     },
     {
        value: '20',
        title: 20
    }];
let premiumFrequencyModeList =[{
  value: 1,
  title: 'Yearly',
  minPremAmt: 15000,
  maxPremAmt: 29000
},
{
  value: 2,
  title: 'Half Yearly',
  minPremAmt: 9500,
  maxPremAmt: 14500
},
{
  value: 3,
  title: 'Quarterly',
  minPremAmt: 5500,
  maxPremAmt: 7200
},
{
  value: 4,
  title: 'Monthly',
  minPremAmt: 2000,
  maxPremAmt: 2400
}];

//let minPremAmtYearly =15000;
//let minPremAmtHalfYearly =9500;
//let minPremAmtQuarterly =5500;
//let minPremAmtMonthly =2000;
//let maxPremAmtYearly =29000;
//let maxPremAmtHalfYearly =14500;
//let maxPremAmtQuarterly =7200;
//let maxPremAmtMonthly =2400;

let minimumSAMFLabel = 10.0;
let adbSATermList = [{
    value: '5',
    title: 5
},
            {
    value: '6',
    title: 6
},
            {
    value: '7',
    title: 7
},
            {
    value: '8',
    title: 8
},{
    value: '9',
    title: 9
},
            {
    value: '10',
    title: 10
},
            {
    value: '11',
    title: 11
},
            {
    value: '12',
    title: 12
},
            {
    value: '13',
    title: 13
},
            {
    value: '14',
    title: 14
},
            {
    value: '15',
    title: 15
},
            {
    value: '16',
    title: 16
},
            {
    value: '17',
    title: 17
},
            {
    value: '18',
    title: 18
},
            {
    value: '19',
    title: 19
},
            {
    value: '20',
    title: 20
}];