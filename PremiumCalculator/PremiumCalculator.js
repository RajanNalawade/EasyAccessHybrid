window.onload = function () {
    this.ready();
};

function ready() {
    console.log('on ready..');
}

function onViewDetails(planCategory, categoryIndex) {
    var planSelected = document.forms["premiumCaclForm"][planCategory].value;
    redirectToProductPage(planSelected, categoryIndex);
}

function redirectToProductPage(planSelected, categoryIndex) {
    console.log("planSelected ", planSelected);

    var productArray = insuranceCalcPlanPageListData[categoryIndex].subPlanList.filter(
        function filter_dates(event) {
            return event.productCode === planSelected;
        }
    );
    var productSelected;
    if (productArray.length > 0) {
        productSelected = productArray[0];
    }
    if (typeof (Storage) !== "undefined") {

        sessionStorage.setItem("ThroughNeedAnalysis", "No");
    }
    window.localStorage.setItem("premiumCalcProductDetails", JSON.stringify(productSelected));
    sessionStorage.setItem("ThroughNeedAnalysis", "No");
    switch (planSelected) {
        case '2B':
            window.location.href = "../PremiumCalculator/UnitLinkedPlans/smartPrivilege/smartPrivilege.html";
            break;

        case '1C':
            window.location.href = "../PremiumCalculator/UnitLinkedPlans/SmartPowerInsurance/SmartPowerInsurance.html";
            break;

        case '50':
            window.location.href = "../PremiumCalculator/UnitLinkedPlans/SaralMahaAnand/SaralMahaAnand.html";
            break;

        case '55':
            window.location.href = "../PremiumCalculator/UnitLinkedPlans/SmartWealthAssure/SmartWealthAssure.html";
            break;

        case '53':
            window.location.href = "../PremiumCalculator/UnitLinkedPlans/SmartElite/SmartElite.html";
            break;

        case '1K':
            window.location.href = "../PremiumCalculator/UnitLinkedPlans/SmartWealthBuilder/SmartWealthBuilder.html";
            break;

        case '2H':
            window.location.href = "../PremiumCalculator/UnitLinkedPlans/SaralInsureWealthPlus/SaralInsureWealthPlus.html";
            break;

        case '2J':
            window.location.href = "../PremiumCalculator/UnitLinkedPlans/SmartInsureWealthPlus/SmartInsureWealthPlus.html";
            break;

            // Pension Plans
        case '22':
            window.location.href = "../PremiumCalculator/PensionPlans/AnnuityPlus/AnnuityPlus.html";
            break;

        case '1E':
            window.location.href = "../PremiumCalculator/PensionPlans/SaralPension/SaralPension.html";
            break;

        case '1H':
            window.location.href = "../PremiumCalculator/PensionPlans/RetireSmart/RetireSmart.html";
            break;
            // Pension Plans

            // Protection Plans
        case '45':
            window.location.href = "../PremiumCalculator/ProtectionPlans/SmartShield/SmartShield.html";
            break;

        case '47':
            window.location.href = "../PremiumCalculator/ProtectionPlans/SaralShield/SaralShield.html";
            break;

        case '1Z':
            window.location.href = "../PremiumCalculator/ProtectionPlans/SmartSwadhanPlus/SmartSwadhanPlus.html";
            break;

        case '2E':
            window.location.href = "../PremiumCalculator/ProtectionPlans/sampoornaCancerSuraksha/sampoornaCancerSuraksha.html";
            break;

        case '2F':
            window.location.href = "../PremiumCalculator/ProtectionPlans/PoornaSuraksha/PoornaSuraksha.html";
            break;
            // Protection Plans

            // Child Future Plans 
        case '1P':
            window.location.href = "../PremiumCalculator/ChildFuturePlans/SmartChampInsurance/SmartChampInsurance.html";
            break;

        case '51':
            window.location.href = "../PremiumCalculator/ChildFuturePlans/SmartScholar/SmartScholar.html";
            break;
            // Child Future Plans 

            // Saving Plans
        case '2C':
            window.location.href = "../PremiumCalculator/SavingPlans/SmartWomenAdvantage/SmartWomenAdvantage.html";
            break;

        case '1W':
            window.location.href = "../PremiumCalculator/SavingPlans/SmartHumsafar/SmartHumsafar.html";
            break;

        case '1R':
            window.location.href = "../PremiumCalculator/SavingPlans/SmartMoneyPlanner/SmartMoneyPlanner.html";
            break;

        case '1B':
            window.location.href = "../PremiumCalculator/SavingPlans/SmartIncomeProtect/SmartIncomeProtect.html";
            break;

        case '35':
            window.location.href = "../PremiumCalculator/SavingPlans/ShubhNivesh/ShubhNivesh.html";
            break;

        case '1M':
            window.location.href = "../PremiumCalculator/SavingPlans/FlexySmartPlus/FlexySmartPlus.html";
            break;

        case '1N':
            window.location.href = "../PremiumCalculator/SavingPlans/SmartMoneyBackGold/SmartMoneyBackGold.html";
            break;

        case '1J':
            window.location.href = "../PremiumCalculator/SavingPlans/SaralSwadhanPlus/SaralSwadhanPlus.html";
            break;

        case '2D':
            window.location.href = "../PremiumCalculator/SavingPlans/SmartBachat/SmartBachat.html";
            break;

        case '2G':
            window.location.href = "../PremiumCalculator/SavingPlans/SmartSamriddhi/SmartSamriddhi.html";
            break;

        case '2K':
            window.location.href = "../PremiumCalculator/SavingPlans/SmartPlatinaAssure/SmartPlatinaAssure.html";
            break;

            // Saving Plans

            // Group Plans
        case '70':
            window.location.href = "../PremiumCalculator/GroupPlans/RinnRaksha(LPPT)/RinnRaksha(LPPT).html";
            break;

        case '70B':
            window.location.href = "../PremiumCalculator/GroupPlans/RinnRaksha(Single)/RinnRaksha(Single).html";
            break;
            // Group Plans

        default:
            break;

    }
}