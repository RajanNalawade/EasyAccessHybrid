let product_code = '47';
let product_uin = 'UIN:111N066V03';
let product_cateogory = 'INDIVIDUAL PLAN';
let product_type = 'TRADITION';
let product_name = 'Saral Shield'

var serviceTax = 0.145;
var minAgeLimit = 18;
var maxAgeLimit = 60;
var minPolicyTermLimit = 5;
var maxPolicyTermLimit = 30;
var minLoanRateOfInterestLimit = 6;
var maxLoanRateOfInterestLimit = 20;
var minADBAndATPDBRiderTermLimit = 5;
var maxADBAndATPDBRiderTermLimit = 15;
var gender = ['Male', 'Female'];
var planOptionList = [{
        value: 1,
        title: "Level Term Assurance",
        showLoanAdbAndATPDBRider: true,
        singlePremiumModeFreezed: false
    },
    {
        value: 2,
        title: "Decreasing Term Assurance[Loan Protection]",
        showLoanAdbAndATPDBRider: false,
        singlePremiumModeFreezed: true
    },
    {
        value: 3,
        title: "Decreasing Term Assurance[Family Income Protection]",
        showLoanAdbAndATPDBRider: false,
        singlePremiumModeFreezed: true
    }
];

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
    },
    {
        value: 5,
        title: "Single"
    }
];