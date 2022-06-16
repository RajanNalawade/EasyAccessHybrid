let product_code = '2H';
let product_uin = 'UIN:111L124V02';
let product_cateogory = 'INDIVIDUAL PLAN';
let product_type = 'ULIP';

var minAgeLimit = 7,
    maxAgeLimit = 65,
    proposerAgeMin = 18,
    inflation_pa_RP = 0,
    inflation_pa_SP = 0,
    fixedMonthlyExp_RP = 60,
    fixedMonthlyExp_SP = 50,
    charge_Inflation = 0,
    maxPremiumAmtLimit = 300000,
    topUp = 0.02,
    serviceTax = 0.18,
    charge_SA_ren = 0,
    charge_SumAssuredBase = 0,
    mortalityCharges_AsPercentOfofLICtable = 1,
    int1 = 0.04,
    int2 = 0.08,
    int_riy_4 = 0.00327,
    FMC_EquityFund = 0.0135,
    FMC_EquityOptimiserFund = 0.0135,
    FMC_GrowthFund = 0.0135,
    FMC_BalancedFund = 0.0125,
    FMC_PureFund = 0.0135,
    FMC_MidcapFund = 0.0135,
    FMC_BondOptimizerFund = 0.0115,
    FMC_CorpFund = 0.0115,
    charge_Fund = 0,
    acc_tpd_charges = 0;

var isLT = true,
    isInforce = true,
    topUpStatus = true,
    allocationCharges = true,
    mortalityCharges = true,
    mortalityAndRiderCharges = true,
    administrationCharges = true,
    fundManagementCharges = true,
    riderCharges = true,
    asPercentOfFirstYrPremium = true,
    surrenderCharges = true,
    topUpStatusYield = false,
    allocationChargesYield = false,
    mortalityChargesYield = false,
    mortalityAndRiderChargesYield = false,
    administrationChargesYield = false,
    fundManagementChargesYield = false,
    riderChargesYield = false,
    surrenderChargesYield = false;




var policyTerm = [{
        value: 0,
        title: 10
    },
    {
        value: 0,
        title: 15
    },
    {
        value: 0,
        title: 20
    },
    {
        value: 0,
        title: 25
    }
];
