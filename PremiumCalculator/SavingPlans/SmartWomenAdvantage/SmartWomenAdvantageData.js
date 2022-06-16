let product_code = '2C';
let product_uin = 'UIN:111N106V01';
let product_cateogory = 'INDIVIDUAL PLAN';
let product_type = 'TRADITION';

let minAgeLimit = 18;
let maxAgeLimitr = 50;
let minSumAssured = 200000;
let maxSumAssured = 1000000;
let terminalBonus = 0.30;
let terminalBonus_8_percent = 0.30;
let bonusInvestmnt_4_percent = 0.02;
let bonusInvestmnt_8_percent = 0.03;
let minYearlyPrem = 15000;
let minHalfYearlyPrem = 7500;
let minQuarterleyPrem = 4000;
let minMonthleyPrem = 1500;

/*****  Change As Per Swachh Bharat Cess new Calculation - Priyanka Warekar - 11-01-2016 - Start**/
let FY_serviceTax = 0.035;
let FY_CessServiceTax = 0.0013;
let SY_serviceTax = 0.0175;
let SY_CessServiceTax = 0.0007;
/*****  Change As Per Swachh Bharat Cess new Calculation - Priyanka Warekar - 11-01-2016 - End**/
//	     FY_serviceTax: number =0.0363;
//	     SY_serviceTax: number =0.0182;
let serviceTaxJKResident = 0.0126;


gender = ['Female'];

criticalIllnessOptionList = [{
        value: 1,
        title: "1"
    },
    {
        value: 2,
        title: "2"
    },
    {
        value: 3,
        title: "3"
    }
];

planList = [{
        value: 1,
        title: "Gold"
    },
    {
        value: 2,
        title: "Platinum"
    }
];

policyTermList = [{
        value: 10,
        title: "10"
    },
    {
        value: 15,
        title: "15"
    }
];

premiumFrequencyList = [{
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