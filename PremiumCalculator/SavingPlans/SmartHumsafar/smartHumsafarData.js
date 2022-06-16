let product_code = '1W';
let product_uin = 'UIN:111N103V03';
let product_cateogory = 'INDIVIDUAL PLAN';
let product_type = 'TRADITION';
let product_name = 'Smart Humsafar'

var minAge_LA = 18;
var maxAge_LA = 46;
var minAge_spouse = 18;
var maxAge_spouse = 46;
var minPolicyTerm = 10;
var maxPolicyTerm = 30;
var minPolicyTermRider = 5;
var maxPolicyTermRiderProp = 30;
var minSumAssured = 100000;
var maxSumAssured = 50000000;
var minADBT_SA = 25000;
var maxADBT_SA = 5000000;
var terminalBonus = 0.15;
var bonusInvestmnt_4_percent = 0.018;
var bonusInvestmnt_8_percent = 0.03;
var minYearlyPrem = 6000;
var minHalfYearlyPrem = 3000;
var minQuarterleyPrem = 1500;
var minMonthleyPrem = 500;
var serviceTax = 0.0225;
var serviceTaxJKResident = 0.0126;

var gender = ["Male", "Female"];

var premiumPaymentModeList = [{
    value: 1,
    title: "Yearly"
  },
  {
    value: 2,
    title: "Half Yearly"
  },
  {
    value: 3,
    title: "Quarterly"
  },
  {
    value: 4,
    title: "Monthly"
  }
];

var applicableForList = [{
    value: 0,
    title: "Life to be Assured"
  },
  {
    value: 1,
    title: "Spouse Life to be Assured"
  },
  {
    value: 2,
    title: "Both Lives Assured"
  }
];

var ageDifferencePolicyTermCalculationArray = [
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  5,
  5,
  6,
  7,
  8,
  8,
  9,
  10,
  11,
  11,
  12,
  13,
  14
];
