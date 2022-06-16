var minAgeOfAnnuitant = 40;
var maxAgeOfAnnuitantWhenRider = 60;
var maxAgeOfAnnuitantWhenNoRider = 80;
var minAgeOfFirstAnnuitant = 0;
var maxAgeOfFirstAnnuitant = 80;
var minAgeOfSecondAnnuitant = 0;
var maxAgeOfSecondAnnuitant = 80;
var annuityAmt = 5000000;
var vestingAmount = 80000;
var additionalAmount = 0;
var riderPremiumRate = 349;
var AdvanceAnnuityFactor = 0.0925;
var serviceTax = 0.0363;

var gender = ['Male', 'Female'];
var sourceOfBusinessList = [{
        value: 1,
        title: "Vesting/Death/Surrender of existing SBI Life's pension policy",
        showVestingAmount: true
    },
    {
        value: 2,
        title: "Open Market Option (Any other life insurance company pension policy)",
        showVestingAmount: false
    },
    {
        value: 3,
        title: "New Proposal",
        showVestingAmount: false
    }
];

var channelDetailsList = [{
        value: 1,
        title: "Retail Agency"
    },
    {
        value: 2,
        title: "Bancassurance"
    },
    {
        value: 3,
        title: "Broking"
    },
    {
        value: 4,
        title: "Corporate Agency"
    },
    {
        value: 5,
        title: "Corporate Solutions"
    },
    {
        value: 6,
        title: "Direct"
    },
    {
        value: 7,
        title: "Others"
    }
];

var modeOfAnnuityPayoutsList = [{
        value: 1,
        title: "Monthly",
        showAdvanceAnnuityPayout: false,
        minimumAnnuityAmount: 1000
    },
    {
        value: 2,
        title: "Quarterly",
        showAdvanceAnnuityPayout: false,
        minimumAnnuityAmount: 3000
    },
    {
        value: 3,
        title: "Half Yearly",
        showAdvanceAnnuityPayout: true,
        minimumAnnuityAmount: 6000
    },
    {
        value: 4,
        title: "Yearly",
        showAdvanceAnnuityPayout: true,
        minimumAnnuityAmount: 12000
    }
];

var annuityOptionList = [{
        value: 1,
        title: "Lifetime Income",
        showSecondAnnuitantFields: false
    },
    {
        value: 2,
        title: "Lifetime Income with Capital Refund",
        showSecondAnnuitantFields: false
    },
    {
        value: 3,
        title: "Lifetime Income with Capital Refund in Parts",
        showSecondAnnuitantFields: false
    },
    {
        value: 4,
        title: "Lifetime Income with Balance Capital Refund",
        showSecondAnnuitantFields: false
    },
    {
        value: 5,
        title: "Lifetime Income with Annual Increase of 3%",
        showSecondAnnuitantFields: false
    },
    {
        value: 6,
        title: "Lifetime Income with Annual Increase of 5%",
        showSecondAnnuitantFields: false
    },
    {
        value: 7,
        title: "Lifetime Income with Certain Period of 5 Years",
        showSecondAnnuitantFields: false
    },
    {
        value: 8,
        title: "Lifetime Income with Certain Period of 10 Years",
        showSecondAnnuitantFields: false
    },
    {
        value: 9,
        title: "Lifetime Income with Certain Period of 15 Years",
        showSecondAnnuitantFields: false
    },
    {
        value: 10,
        title: "Lifetime Income with Certain Period of 20 Years",
        showSecondAnnuitantFields: false
    },
    {
        value: 11,
        title: "Life and Last Survivor - 50% Income",
        showSecondAnnuitantFields: true
    },
    {
        value: 12,
        title: "Life and Last Survivor - 100% Income",
        showSecondAnnuitantFields: true
    },
    {
        value: 13,
        title: "Life and Last Survivor with Capital Refund - 50% Income",
        showSecondAnnuitantFields: true
    },
    {
        value: 14,
        title: "Life and Last Survivor with Capital Refund - 100% Income",
        showSecondAnnuitantFields: true
    }
];

var applicableForList = [{
        value: 1,
        title: "First Annuitant"
    },
    {
        value: 2,
        title: "Both Annuitant"
    }
];

var optForList = [{
        value: 1,
        title: "Annuity Payout Amount",
        showAnnuityAmount: true
    },
    {
        value: 2,
        title: "Premium Amount",
        showAnnuityAmount: false
    }
];