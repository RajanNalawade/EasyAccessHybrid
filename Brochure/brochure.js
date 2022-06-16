/* *************  VARIABLE DECLARATION ************** */
var productDetails;

window.onload = function () {
    this.ready();
};

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    this.productDetails = this.getQueryStringDesializedData();
    this.initializeData();
}

function getQueryStringDesializedData() {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    var queries = queryString.split("&");
    return JSON.parse(queries[0].split("product=").pop());
}

function initializeData() {
    this.document.getElementById('productNameId').innerHTML = 'SBI Life - ' + this.productDetails.title;
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
    $('#divBrochure').load(this.productDetails.subInsurancePlanLocalWebPage);
}

function serializeObject(objectToSerialize) {
    return JSON.stringify(objectToSerialize);
}

/* **************************** BUTTON EVENTS ************************** */
function goToBI() {
    let productSelected = this.productDetails;
    productSelected.isFromNeedAnalysis = true;
    let productCode = productSelected.productCode;
    var stringifyProductJson = serializeObject(productSelected);

    console.log(productSelected);
    console.log(productCode);

    sessionStorage.setItem("ThroughNeedAnalysis", "No");

    window.localStorage.setItem("premiumCalcProductDetails", JSON.stringify(productSelected));
    switch (productCode) {
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
            // Saving Plans

            // Group Plans
        case '70':
            window.location.href = "../PremiumCalculator/GroupPlans/RinnRaksha(LPPT)/RinnRaksha(LPPT).html";
            break;

        case '70B':
            window.location.href = "../PremiumCalculator/GroupPlans/RinnRaksha(Single)/RinnRaksha(Single).html";
            break;
            // Group Plans

        case "2K":
            window.location.href =
                "../PremiumCalculator/SavingPlans/SmartPlatinaAssure/SmartPlatinaAssure.html";
            break;
        default:
            break;

    }

    // switch (productCode) {
    //     case "1M":
    //         window.location.href =
    //           "../PremiumCal/Traditional/flexySmartPlus/flexySmartPlus.html?product=" + stringifyProductJson;
    //         break;

    //     case "2D":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/smartBachat/smartBachat.html?product=" + stringifyProductJson;
    //         break;

    //     case "1Z":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/smartSwadhanPlus/smartSwadhanPlus.html?product=" + stringifyProductJson;
    //         break;

    //     case "1J":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/saralSwadhanPlus/saralSwadhanPlus.html?product=" + stringifyProductJson;
    //         break;

    //     case "45":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/smartShield/smartShield.html?product=" + stringifyProductJson;
    //         break;

    //     case "2G":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/smartSamriddhi/smartSamriddhi.html?product=" + stringifyProductJson;
    //         break;

    //     case "2B":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Unit Linked/smartPrivilege/smartPrivilege.html?product=" + stringifyProductJson;
    //         break;

    //     case "1W":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/smartHumsafar/smartHumsafar.html?product=" + stringifyProductJson;
    //         break;

    //     case "1P":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/smartChampInsurance/smartChampInsurance.html?product=" + stringifyProductJson;
    //         break;

    //     case "35":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/shubhNivesh/shubhNivesh.html?product=" + stringifyProductJson;
    //         break;

    //     case "47":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/saralShield/saralShield.html?product=" + stringifyProductJson;
    //         break;

    //     case "2F":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/poornaSuraksha/poornaSuraksha.html?product=" + stringifyProductJson;
    //         break;

    //     case "22":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/annuityPlus/annuityPlus.html?product=" + stringifyProductJson;
    //         break;

    //     case "1N":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/smartMoneyBackGold/smartMoneyBackGold.html?product=" + stringifyProductJson;
    //         break;

    //     case "1E":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/saralPension/saralPension.html?product=" + stringifyProductJson;
    //         break;

    //     case "1R":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/smartmoneyplanner/smartMoneyPlanner.html?product=" + stringifyProductJson;
    //         break;

    //     case "2E":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/sampoornacancersuraksha/sampoornaCancerSuraksha.html?product=" + stringifyProductJson;
    //         break;

    //     case "1B":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/Smart_Income_Protect/Smart_Income_Protect.html?product=" + stringifyProductJson;
    //         break;

    //     case "2C":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/SmartWomenAdvantage/SmartWomenAdvantage.html?product=" + stringifyProductJson;
    //         break;

    //     case "2J":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Unit Linked/Smart_InsureWealth_Plus/smartInsureWealthPlus.html?product=" + stringifyProductJson;
    //         break;

    //     case "2H":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Unit Linked/saralinsurewealthplus/saralInsureWealthPlus.html?product=" + stringifyProductJson;
    //         break;

    //     case "1Z":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/smartSwadhanPlus/smartSwadhanPlus.html?product=" + stringifyProductJson;
    //         break;

    //     case "53":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Unit Linked/SmartElite/smartElite.html?product=" + stringifyProductJson;
    //         break;

    //     case "50":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Unit Linked/SaralMahaAnand/saralMahaAnand.html?product=" + stringifyProductJson;
    //         break;

    //     case "1C":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Unit Linked/SmartPowerInsurance/smartPowerInsurance.html?product=" + stringifyProductJson;
    //         break;

    //     case "55":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Unit Linked/SmartWealthAssure/smartWealthAssure.html?product=" + stringifyProductJson;
    //         break;

    //     case "1K":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Unit Linked/SmartWealthBuilder/smartWealthBuilder.html?product=" + stringifyProductJson;
    //         break;

    //     case "1H":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Unit Linked/retireSmart/RetireSmart.html?product=" + stringifyProductJson;
    //         break;

    //     case "1H":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Unit Linked/retireSmart/RetireSmart.html?product=" + stringifyProductJson;
    //         break;

    //     case "51":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Unit Linked/smartScholar/SmartScholar.html?product=" + stringifyProductJson;
    //         break;

    //     case "2K":
    //         var stringifyProductJson = serializeObject(productSelected);
    //         window.location.href =
    //           "../PremiumCal/Traditional/smartPlatinaAssure/smartPlatinaAssure.html?product=" + stringifyProductJson;
    //         break;
    // }
}