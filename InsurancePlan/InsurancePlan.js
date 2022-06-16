function onViewDetails(planCategory){
    var planSelected = document.forms["InsurancePlanForm"][planCategory].value;
    redirectToProductPage(planSelected);
}

function redirectToProductPage(planSelected){    
    switch(planSelected){
        case 'SBI Life -Smart Privilege':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/ulip/smart-privilege";
        break;

        case 'SBI Life -Smart Power Insurance':        
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/ulip/smart-power-insurance";
        break;

        case 'SBI Life -Saral Maha Anand':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/ulip/saral-maha-anand";
        break;

        case 'SBI Life -Smart Wealth Assure':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/ulip/smart-wealth-assure";
        break;

        case 'SBI Life -Smart Elite':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/ulip/smart-elite";
        break;

        case 'SBI Life -Smart Wealth Builder':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/ulip/smart-wealth-builder";
        break;

        case 'SBI Life -Saral InsureWealth Plus':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/ulip/saral-insure-wealth-plus";
        break;

        case 'SBI Life -Smart InsureWealth Plus':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/ulip/smart-insure-wealth-plus";
        break;

        case 'SBI Life - Annuity Plus':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/pension/annuity-plus";
        break;

        case 'SBI Life -Saral Pension':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/traditional/saral-pension";
        break;

        case 'SBI Life -Retire Smart':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/ulip/retire-smart";
        break;

        case 'SBI Life - Smart Shield':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/term/smart-shield";
        break;

        case 'SBI Life - Saral Shield':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/term/saral-shield";
        break;

        case 'SBI Life - Smart Swadhan Plus':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/traditional/smart-swadhan-plus";
        break;

        case 'SBI Life -Sampoorn Cancer Suraksha':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/traditional/sampoorn-cancer-suraksha";
        break;

        case 'SBI Life -Poorna Suraksha':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/traditional/poorna-suraksha";
        break;

        case 'SBI Life -Smart Champ Insurance':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/traditional/smart-champ-insurance";
        break;

        case 'SBI Life -Smart Scholar':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/ulip/smart-scholar";
        break;

        case 'SBI Life -Smart Women Advantage':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/traditional/smart-women-advantage";
        break;

        case 'SBI Life -Smart Humsafar':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/traditional/smart-humsafar";
        break;

        case 'SBI Life -Saral Money Planner':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/traditional/smart-money-planner";
        break;

        case 'SBI Life -Smart Income Protect':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/traditional/smart-income-protect";
        break;

        case 'SBI Life -Shubh Nivesh':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/traditional/shubh-nivesh";

        break;

        case 'SBI Life -Flexi Smart Plus':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/traditional/flexi-smart-plus";
        break;

        case 'SBI Life -Smart Money Back Gold':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/traditional/smart-money-back-gold";
        break;

        case 'SBI Life -Saral Sawdhan Plus':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/traditional/saral-swadhan-plus";
        break;

        case 'SBI Life -Smart Bachat':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/traditional/smart-bachat";
        break;

        case 'SBI Life -Smart Samriddhi':
        window.location.href = "https://www.sbilife.co.in/en/individual-life-insurance/traditional/smart-samriddhi-plan";
        break;

        case 'SBI Life- RiNnRaksha(SBG)':
        window.location.href = "https://www.sbilife.co.in/en/group-insurance/loan-protection-plans/rinn-raksha";
        break;

        default:
        break;

    }
}