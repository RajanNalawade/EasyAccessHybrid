let product_code = '1Z';
let product_uin = 'UIN:111N104V02';
let product_cateogory = 'INDIVIDUAL PLAN';
let product_type = 'TRADITION';
let product_name = 'Smart Swadhan Plus'

var minAgeLimit = 18;
var maxAgeLimit = 65;
var minPolicyTerm = 10;
var maxPolicyTerm = 30;
var minSumAssured = 500000;

var gender = ["Male", "Female"];

var planTypeList = [{
    value: 0,
    title: "Single",
    showPremiumFrequency: false,
    showPremiumPayingTerm: false
  },
  {
    value: 1,
    title: "Regular",
    showPremiumFrequency: true,
    showPremiumPayingTerm: false
  },
  {
    value: 2,
    title: "LPPT",
    showPremiumFrequency: true,
    showPremiumPayingTerm: true
  }
];

var premiumFrequencyList = [{
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

var premiumPayingTermList = [{
    value: 5,
    title: "5"
  },
  {
    value: 10,
    title: "10"
  },
  {
    value: 15,
    title: "15"
  }
];
