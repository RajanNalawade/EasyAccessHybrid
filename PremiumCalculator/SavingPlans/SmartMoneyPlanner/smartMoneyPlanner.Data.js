let product_Code = "1R";
let product_UIN = "UIN:111N101V03";
let product_cateogory = "INDIVIDUAL PLAN";
let product_name = "Smart Money Planner";
let product_type = "TRADITION";

var minAgeLimit = 18;
//  var maxAgeLimit = 60;
var minSumAssured = 100000;
var maxSumAssured = 50000000;
var terminalBonus = 15;
var bonusInvestmnt_4_percent = 1.30;
var bonusInvestmnt_8_percent = 3;
var serviceTax = 0.0363;
var serviceTaxJKResident = 0.0126;



planList = [{
    value: 1,
    title: "Plan 1",
    policyTerm: 15,
    premiumPayingTerm: 6,
    maxAgeLimit: 60,
    successMsgToBePassed: 'Guaranteed Survival Benefit (for Policy Year 11 - 15) is'
  },
  {
    value: 2,
    title: "Plan 2",
    policyTerm: 20,
    premiumPayingTerm: 6,
    maxAgeLimit: 55,
    successMsgToBePassed: 'Guaranteed Survival Benefit (for Policy Year 11 - 20) is'
  },
  {
    value: 3,
    title: "Plan 3",
    policyTerm: 20,
    premiumPayingTerm: 10,
    maxAgeLimit: 55,
    successMsgToBePassed: 'Guaranteed Survival Benefit (for Policy Year 16 - 20) is'
  },
  {
    value: 4,
    title: "Plan 4",
    policyTerm: 25,
    premiumPayingTerm: 10,
    maxAgeLimit: 50,
    successMsgToBePassed: 'Guaranteed Survival Benefit (for Policy Year 16 - 25) is'
  }
];

premiumFrequencyList = [{
    value: 0,
    title: "Yearly",
    showPremiumPayingTerm: true
  },
  {
    value: 1,
    title: "Half Yearly",
    showPremiumPayingTerm: true
  },
  {
    value: 2,
    title: "Quarterly",
    showPremiumPayingTerm: true
  },
  {
    value: 3,
    title: "Monthly",
    showPremiumPayingTerm: true
  },
  {
    value: 4,
    title: "Single",
    showPremiumPayingTerm: false
  }
];