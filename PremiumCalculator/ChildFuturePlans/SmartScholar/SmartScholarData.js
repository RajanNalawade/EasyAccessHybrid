let product_code = '51';
let product_uin = 'UIN:111L073V03';
let product_cateogory = 'INDIVIDUAL PLAN';
let product_type = 'TRADITION';

var minAgeLimitForChild = 0;
var   maxAgeLimitForChild = 17;
var   minAgeLimitForProposer = 18;
var   maxAgeLimitForProposer = 57;
//-----------------added on 17/04/2019-----------
var minTermOption = 5;
var maxTermOption = 25;
var minPolicyTermLimit = 8;
var maxPolicyTermLimit = 25;
var minSinglePremiumAmount = "75,000";
var minYearlyPremiumAmount = "50,000";
var minHalfYearlyPremiumAmount = "25,000";
var minQuarterlyPremiumAmount = "12,500";
var minMonthlyPremiumAmount = "4,500";
//-----------------------------------------------
var   PPT = 8;
var   premMult = 100;
var   Gap_Loyalty_Add = 3;
var   firstGAinYr = 8;
  
var   effectiveTopUpPrem = 0;
var   topUp = 0.0;
    //			serviceTax =12.36/100;
    var   serviceTax = 0.145;
    var   chargeSAren = 0;
    var    accidentalBenCharge = 0.5;
    var   monthlyAdminCharge = 50.0;
    var   charge_Fund = 0;
    var   minTerm = 0;
    var   loyalty = 0.01;
    var    allocNormalLPPTYr1 = 0.06;
    var    allocNormalLPPTYr2 = 0.045;
    var    allocNormalLPPTYr3 = 0.045;
    var    allocNormalLPPTYr4 = 0.04;
    var   allocNormalLPPTYr5 = 0.04;
    var   allocNormalLPPTYr6 = 0.01;
    var   allocNormalLPPTYr7 = 0.01;
    var   allocNormalLPPTYr8 = 0.01;
    var   allocNormalLPPTYr9 = 0.01;
    var   allocNormalLPPTYr10 = 0.01;
    var   allocCommisionLPPTYr1 = 0.055;
    var  allocCommisionLPPTYr2 = 0.03;
    var   allocCommisionLPPTYr3 = 0.03;
    var   allocCommisionLPPTYr4 = 0.025;
    var   allocCommisionLPPTYr5 = 0.025;
    var  allocCommisionLPPTYr6 = 0.01;
    var  allocCommisionLPPTYr7 = 0.01;
    var   allocCommisionLPPTYr8 = 0.01;
    var  allocCommisionLPPTYr9 = 0.01;
    var   allocCommisionLPPTYr10 = 0.01;
    var  allocNormalSingleYr1 = 0.03;
    var  allocNormalSingleYr2 = 0;
    var  allocNormalSingleYr3 = 0;
    var  allocNormalSingleYr4 = 0;
    var   allocNormalSingleYr5 = 0;
    var  allocNormalSingleYr6 = 0;
    var  allocNormalSingleYr7 = 0;
    var  allocNormalSingleYr8 = 0;
    var  allocNormalSingleYr9 = 0;
    var  allocNormalSingleYr10 = 0;
    var   allocCommisionSingleYr1 = 0.02;
    var   allocCommisionSingleYr2 = 0;
    var   allocCommisionSingleYr3 = 0;
    var   allocCommisionSingleYr4 = 0;
    var  allocCommisionSingleYr5 = 0;
    var  allocCommisionSingleYr6 = 0;
    var  allocCommisionSingleYr7 = 0;
    var  allocCommisionSingleYr8 = 0;
    var   allocCommisionSingleYr9 = 0;
    var   allocCommisionSingleYr10 = 0;
    var   premLimitForSurrCharge = 25000;
    var  surrPremLessThanOrEqTo25000Yr1 = 3000;
    var   surrPremLessThanOrEqTo25000Yr2 = 2000;
    var   surrPremLessThanOrEqTo25000Yr3 = 1500;
    var   surrPremLessThanOrEqTo25000Yr4 = 1000;
    var   surrPremLessThanOrEqTo25000Yr5 = 0;
    var   surrPremLessThanOrEqTo25000Yr6 = 0;
    var   surrPremLessThanOrEqTo25000Yr7 = 0;
    var   surrPremLessThanOrEqTo25000Yr8 = 0;
    var   surrPremLessThanOrEqTo25000Yr9 = 0;
    var  surrPremLessThanOrEqTo25000Yr10 = 0;
    var   surrPremGreaterThan25000Yr1 = 6000;
    var    surrPremGreaterThan25000Yr2 = 5000;
    var    surrPremGreaterThan25000Yr3 = 4000;
    var   surrPremGreaterThan25000Yr4 = 2000;
    var   surrPremGreaterThan25000Yr5 = 0;
    var   surrPremGreaterThan25000Yr6 = 0;
    var   surrPremGreaterThan25000Yr7 = 0;
    var   surrPremGreaterThan25000Yr8 = 0;
    var  surrPremGreaterThan25000Yr9 = 0;
    var   surrPremGreaterThan25000Yr10 = 0;
    var    FMC_EquityFund = 0.0135;
    var    FMC_EquityOptimiserFund = 0.0135;
    var    FMC_GrowthFund = 0.0135;
    var   FMC_BalancedFund = 0.0125;
    var   FMC_BondFund = 0.01;
    var   FMC_MoneyMarketFund = 0.0025;
    var  FMC_IndexFund = 0.0;
    var  FMC_Top300Fund = 0.0135;
    var   FMC_PEmanagedFund = 0.0;
  
    var   minPremForYearly_PPTlessThan8 = 50000;
    var   minPremForHalfYearly_PPTlessThan8 = 25000;
    var   minPremForQuarterly_PPTlessThan8 = 12500;
    var    minPremForMonthly_PPTlessThan8 = 4500;
    var    minPremForSingle = 75000;
    var   minPremForYearly_PPTeqOrgreaterThan8 = 24000;
    var   minPremForHalfYearly_PPTeqOrgreaterThan8 = 16000;
    var   minPremForQuarterly_PPTeqOrgreaterThan8 = 10000;
    var   minPremForMonthly_PPTeqOrgreaterThan8 = 4000;
  
  
    //			int1 =0.06;
    //			int2 =0.1;
    var    int1 = 0.04;
    var    int2 = 0.08;
    var   charge_SumAssuredBase = 0;
    //			mortalityCharges_AsPercentOfofLICtable =1;
    var   mortalityCharges_AsPercentOfofLICtable = 1.2;
  
  
    var  mortalityAndRiderCharges = false;
    var   administrationCharges = false;
    var   fundManagementCharges = false;
    var  guaranteeCharges = false;
    var  topUpStatus = false;
  
  
    var  allocationCharges = false;
    var  optionCharges = false;
    var   accidentalBenefit = true;
    var   mortalityCharges = false;
    var   PPWBstatus = true;
    //			surrenderCharges =false;
    var   surrenderCharges = true;
    var   Loyalty_Add = true;
  
  
    var  gender = ['Male', 'Female'];

   var premiumFrequencyModeList = [
    {
      value: 0,
      title: "Single",
      showPremiumPayingTerm: false,
      pf : 1
    },
    {
      value: 1,
      title: "Yearly",
      showPremiumPayingTerm: true,
      pf : 1
    },
    {
      value: 2,
      title: "Half Yearly",
      showPremiumPayingTerm: true,
      pf : 2
    },
    {
      value: 3,
      title: "Quarterly",
      showPremiumPayingTerm: true,
      pf : 4
    },
    {
      value: 4,
      title: "Monthly",
      showPremiumPayingTerm: true,
      pf : 12
    }
    ];
  
  