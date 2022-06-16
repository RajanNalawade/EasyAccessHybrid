let product_code = '1M';
let product_uin = 'UIN:111N093V01';
let product_cateogory = 'INDIVIDUAL PLAN';
let product_type = 'TRADITION';
let product_name = 'Flexi Smart Plus'

var minAgeLimit = 18;
var maxAgeLimit = 60;
var minPolicyTermLimit = 5;
var maxPolicyTermLimit = 30;
var minPremHolidayTerm = 1;
var maxPremHolidayTerm = 3;
var minPolicyYear = 6;

var minSAMF = 10;
var maxSAMF = 20;
var topUp = 0.0;
var topUp_commission = 0.02;
var riskPremiumRate = 1.2;
//            serviceTax =12.36/100;
//            serviceTaxJkResident =10.5/100;
var serviceTax = 0.145;
var serviceTaxJkResident = 0.105;
var serviceTaxReductionYield = 0.145;
var guaranteedInterest = 0.01;
var int1 = 0.04;
var int2 = 0.08;
var fundManagementCharge = 0.01;
var topUp_expense = 0.01;
var inflation = 0.03;
var initial = 840;
var renewal = 600;
var year_TransferOfCapital_W62 = 5;
var year_TransferOfCapital_W63 = 6;
var noOfYrsAllowForTransfOfGain = 6;
var thresholdLimitForTransfOfGain = 0.15
var charge_Guarantee = 0.005
var charge_SumAssuredBase = 0;
var charge_Fund = 0;
var charge_Inflation = 0;
var charge_Fund_Ren = 0.01
var indexFund = 0.0125
var noOfYearsForSArelatedCharges = 3;
var ADBrate = 0.0005
var inflation_pa_RP = 0;
var inflation_pa_SP = 0;
var fixedMonthlyExp_RP = 60;
var fixedMonthlyExp_SP = 50;
var topUpPremiumAmt = 5000;
var allocationCharges = false;
var mortalityAndRiderCharges = false;
var administrationAndSArelatedCharges = false;
var fundManagementCharges = false;
var surrenderCharges = false;
var guaranteeCharges = false;
var mortalityCharges = false;
var riderCharges = false;


var gender = ['Male', 'Female'];

var premiumPaymentModeList = [
    {
        value: 0,
        title: "Yearly",
        minPremiumAmount: 50000,
        divFactor: 100
    },
    {
        value: 1,
        title: "Half Yearly",
        minPremiumAmount: 30000,
        divFactor: 100
    },
    {
        value: 2,
        title: "Quarterly",
        minPremiumAmount: 20000,
        divFactor: 50
    },
    {
        value: 3,
        title: "Monthly",
        minPremiumAmount: 9000,
        divFactor: 50
    }
];

var optionList = [
    {
        value: 0,
        title: "GOLD"
    },
    {
        value: 1,
        title: "PLATINUM"
    }
];