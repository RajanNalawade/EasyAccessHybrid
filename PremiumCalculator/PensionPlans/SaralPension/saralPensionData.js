let product_code = '1E';
let product_uin = 'UIN:111N088V03';
let product_cateogory = 'INDIVIDUAL PLAN';
let product_type = 'TRADITION';
let product_name = 'Saral Pension'

var gender = ['Male', 'Female'];

var minPolicyTermLimit = 5;
var maxPolicyTermLimit = 40;
var minPtrTermLimit = 5;
var maxPtrTermLimit = 30;

var premiumFrequencyList = [{
        value: 1,
        title: "Yearly",
        maxAgeAllowed: 60
    },
    {
        value: 2,
        title: "Half Yearly",
        maxAgeAllowed: 60
    },
    {
        value: 3,
        title: "Monthly",
        maxAgeAllowed: 60
    },
    {
        value: 4,
        title: "Single",
        maxAgeAllowed: 65
    }
];
var MaturityFrequency_list = [{
        value: 0,
        title: "Select Maturity Frequency"
    },
    {
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
]


var MaturityOption_list = [{
        value: 0,
        title: "Select Maturity Option"
    },
    {
        value: 1,
        title: "Option 1.1 Lifetime Income"
    },
    {
        value: 2,
        title: "Option 1.2 Lifetime Income with Capital Refund"
    },
    {
        value: 3,
        title: "Option 1.3 Lifetime Income with Capital refund in parts"
    },
    {
        value: 4,
        title: "Option 1.4 Lifetime Income with Balance Capital Refund"
    },
    {
        value: 5,
        title: "Option 1.5 Lifetime income with Annual Increase of 3%"
    },
    {
        value: 6,
        title: "Option 1.6 Lifetime income with Annual Increase of 5%"
    },
    {
        value: 7,
        title: "Option 1.7 Lifetime income with certain period of 5 years"
    },
    {
        value: 8,
        title: "Option 1.8 Lifetime income with certain period of 10 years"
    },
    {
        value: 9,
        title: "Option 1.9 Lifetime income with certain period of 15 years"
    },
    {
        value: 10,
        title: "Option 1.10 Lifetime income with certain period of 20 years"
    },
    {
        value: 11,
        title: "Option 2.1 Life and Last  Survivor - 50% Income"
    },
    {
        value: 12,
        title: "Option 2.2 Life and Last  Survivor - 100% Income"
    },
    {
        value: 13,
        title: "Option 2.3 Life and Last  Survivor - 50% Income with Capital Refund"
    },
    {
        value: 14,
        title: "Option 2.4 Life and Last  Survivor - 100% Income with Capital Refund"
    }
]

var minPTRiderSumAssuredLimit = 25000;
var maxPTRiderSumAssuredLimit = 0;
var minSumAssuredLimit = 100000;