let product_code = '1P';
let product_uin = 'UIN:111N098V03';
let product_cateogory = 'INDIVIDUAL PLAN';
let product_type = 'TRADITION';
let product_name = 'Smart Champ Insurance'

    var minAgeLimitForChild = 0;
    var maxAgeLimitForChild = 13;
    var minAgeLimitForProposer = 21;
    var maxAgeLimitForProposer = 50;
    var policyTerm = 21;
    var premPayingTerm = 18;
    var minSumAssured = 100000;
    var maxSumAssured = 10000000;
    var terminalBonus = 15;
    var bonusInvestmnt_4_percent = 1.9;
    var bonusInvestmnt_8_percent = 3;
    var minYearlyPrem = 6000;
    var minHalfYearlyPrem = 3000;
    var minQuarterleyPrem = 1500;
    var minMonthleyPrem = 500;
    var minSinglePrem = 66000;

    var gender = ['Male', 'Female'];

    //Removed data from premiumFrequencyList by Manish
    var premiumFrequencyList = [{
            value: 1,
            title: "Yearly",
            showPremiumPayingTerm: true
        },
        {
            value: 2,
            title: "Half Yearly",
            showPremiumPayingTerm: true
        },
        {
            value: 3,
            title: "Quarterly",
            showPremiumPayingTerm: true
        },
        {
            value: 4,
            title: "Monthly",
            showPremiumPayingTerm: true
        },
        {
            value: 5,
            title: "Single",
            showPremiumPayingTerm: false
        }
    ];