﻿let product_code = '2J';
let product_uin = 'UIN:111L125V02';
let product_cateogory = 'INDIVIDUAL PLAN';
let product_type = 'TRADITION';


let minAgeLimit =0;
let maxAgeLimit =55;
let proposerAgeMin =18;
let proposerAgeMax = 90;
let inflation_pa_RP =0;
let inflation_pa_SP=0;
let fixedMonthlyExp_RP =60;
let fixedMonthlyExp_SP =50;
let charge_Inflation =0;
let maxPremiumAmtLimit =300000;
let topUp =0.02;
let minPolicyTermLimit = 5;
let maxPolicyTermLimit = 30;
    //serviceTax: number =12.36/100;
let serviceTax =0.145;
let charge_SA_ren =0;
let charge_SumAssuredBase =0;
let mortalityCharges_AsPercentOfofLICtable =1.2;
let int1=0.04;
let int2=0.08;
let FMC_EquityFund =0.0135;
let FMC_EquityOptimiserFund =0.0135;
let FMC_GrowthFund =0.0135;
let FMC_BalancedFund =0.0125;
let FMC_BondFund =0.01;
let FMC_MoneyMarketFund =0.0025;
let FMC_Top300Fund =0.0135;
let charge_Fund =0;
let isLT=true;
let isInforce =true;
let topUpStatus=true;
let allocationCharges =true;
let mortalityCharges =true;
let mortalityAndRiderCharges =true;
let administrationCharges=true;
let fundManagementCharges =true;
let riderCharges =true;
let asPercentOfFirstYrPremium =true;
let surrenderCharges =false;
let topUpStatusYield =false;
let allocationChargesYield =false;
let mortalityChargesYield =false;
let mortalityAndRiderChargesYield =false;
let administrationChargesYield =false;
let fundManagementChargesYield =false;
let riderChargesYield =false;

let gender = ['Male','Female'];
    planTypeList=
    [
      {
          value: 1,
          title: 'Regular',
          minPremiumAmount: 4000,
          showPremiumFrequencyMode: true,
          showPremiumPayingTerm: false
      }
    ];

    premiumFrequencyModeList=[
      {
          value: 1,
          title: "Monthly"
      }
    ];

    premiumPayingTermList = [
      {
          value: 1,
          title: "10"
      },
      {
          value: 2,
          title: "15"
      },
      {
          value: 3,
          title: "20"
      },
        {
          value: 4,
          title: "25"
      }
    ];


let minSAMFLabelLimit =0;
let maxSAMFLabelLimit =0;

