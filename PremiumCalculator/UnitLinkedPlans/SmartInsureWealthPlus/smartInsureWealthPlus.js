window.onload = function () {
    this.ready();
};


/* *************  VARIABLE DECLARATION ************** */
var productDetails;

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    // self.hideLoader();
    this.hideErrMsg();
    this.initArrayList();
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
};

function hideErrMsg() {
    document.getElementById('isToShowProposerDetails').style.display = "none";
    document.getElementById('PropAgeErrId').style.display = "none";
    document.getElementById('PrmAmntErrId').style.display = "none";
    document.getElementById('isToSFINFunds').style.display = "none";
    document.getElementById('fundDIv').style.display = "none";
}

function initializeData() {
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
}

/****************function is used to get the value in DropDown from the Data.js file*****************************/
function initArrayList() {
    planListElement = document.forms["smartInsureWealthPlus"]["Plan"];
    for (i = 0; i < planTypeList.length; i++) {
        planListElement.add(new Option(planTypeList[i].title, planTypeList[i].value));
    }

    premiumFrequencyModeListElement = document.forms["smartInsureWealthPlus"]["PremiumPaymntMode"];
    for (i = 0; i < premiumFrequencyModeList.length; i++) {
        premiumFrequencyModeListElement.add(new Option(premiumFrequencyModeList[i].title, premiumFrequencyModeList[i].value));
    }

    policytermElement = document.forms["smartInsureWealthPlus"]["policyTerm"];
    for (i = 0; i < premiumPayingTermList.length; i++) {
        policytermElement.add(new Option(premiumPayingTermList[i].title, premiumPayingTermList[i].title));
    }
    // showorHideInvestmentFund("none",false)
}

function validateGender() {


    var laGender = document.forms["smartInsureWealthPlus"]["gender"].value;

    document.forms["smartInsureWealthPlus"]["title"].options[0].disabled = false;

    document.forms["smartInsureWealthPlus"]["title"].options[1].disabled = false;

    document.forms["smartInsureWealthPlus"]["title"].options[2].disabled = false;

    if (laGender === "Male") {

        document.forms["smartInsureWealthPlus"]["title"].value = "Mr.";

        document.forms["smartInsureWealthPlus"]["title"].options[1].disabled = true;

        document.forms["smartInsureWealthPlus"]["title"].options[2].disabled = true;


    } else if (laGender === "Female") {

        document.forms["smartInsureWealthPlus"]["title"].value = "Mrs.";

        document.forms["smartInsureWealthPlus"]["title"].options[0].disabled = true;

    } else if (laGender === "Transgender") {

        document.forms["smartInsureWealthPlus"]["title"].value = "Mr.";

    }


    if (laGender !== "Female" && laGender !== "Male" && laGender !== "Transgender") {

        document.getElementById("genderErrId").style.display = "block";

        document.getElementById("genderErrId").innerHTML =

            "Please select your gender.";

        return false;

    } else {

        document.getElementById("genderErrId").style.display = "none";

        return true;

    }
}

function validateProposerGender() {
    if (this.getAge() >= minAgeLimit && this.getAge() < 18) {


    
        var proposerGender = document.forms["smartInsureWealthPlus"]["proposerGender"].value;
    
        document.forms["smartInsureWealthPlus"]["PropTitle"].options[0].disabled = false;
    
        document.forms["smartInsureWealthPlus"]["PropTitle"].options[1].disabled = false;
    
        document.forms["smartInsureWealthPlus"]["PropTitle"].options[2].disabled = false;
    
        
        if (proposerGender === "Male" ) {
    
    
            document.forms["smartInsureWealthPlus"]["PropTitle"].value = "Mr.";
    
            document.forms["smartInsureWealthPlus"]["PropTitle"].options[1].disabled = true;
    
            document.forms["smartInsureWealthPlus"]["PropTitle"].options[2].disabled = true;
    
    
        } else if (proposerGender === "Female") {
    
            document.forms["smartInsureWealthPlus"]["PropTitle"].value = "Mrs.";
    
            document.forms["smartInsureWealthPlus"]["PropTitle"].options[0].disabled = true;
    
        } else if (proposerGender === "Transgender") {
    
            document.forms["smartInsureWealthPlus"]["PropTitle"].value = "Mr.";
    
        }
     
        
      if (proposerGender !== "Female" && proposerGender !== "Male" && proposerGender !== "Transgender") {
    
        document.getElementById("genderPropErrId").style.display = "block";
    
        document.getElementById("genderPropErrId").innerHTML =
    
          "Please select Proposer gender.";
    
        return false;
    
      } else {
    
        document.getElementById("genderPropErrId").style.display = "none";
    
        return true;
    
      }
    } else {
        return true;
    }
}


/***** function is used to calculate the age of Life Assured******/
function calculateAge(birthday, formElementName, errElementId) {
    var age = getAgeFromBirthdate(birthday);
    if (age < 18 && formElementName !== 'start') {
        document.getElementById('isToShowProposerDetails').style.display = "block";
        document.forms["smartInsureWealthPlus"]["proposer_first_name"].required = true;
        document.forms["smartInsureWealthPlus"]["proposer_last_name"].required = true;
        document.forms["smartInsureWealthPlus"]["proposer_dob"].required = true;
    } else if (formElementName !== 'proposer_age') {
        document.getElementById('isToShowProposerDetails').style.display = "none";
        document.forms["smartInsureWealthPlus"]["proposer_first_name"].required = false;
        document.forms["smartInsureWealthPlus"]["proposer_last_name"].required = false;
        document.forms["smartInsureWealthPlus"]["proposer_dob"].required = false;
    }

    if (formElementName === 'start') {
        formElementName = 'age';
    }

    document.forms["smartInsureWealthPlus"][formElementName].innerHTML = age;
    document.forms["smartInsureWealthPlus"][formElementName].value = age;
    if (formElementName === 'age' && errElementId !== '' && (age < minAgeLimit || age > maxAgeLimit)) {
        document.getElementById(errElementId).style.display = "block";
        document.getElementById(errElementId).innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else if (formElementName === 'proposer_age' && errElementId !== '' && (age < proposerAgeMin || age > proposerAgeMax)) {
        document.getElementById(errElementId).style.display = "block";
        document.getElementById(errElementId).innerHTML = `Age should be between ${proposerAgeMin} and ${proposerAgeMax}.`;
        return false;
    } else {
        if (errElementId !== '') {
            document.getElementById(errElementId).style.display = "none";
        }
        return true;
    }
}

function onTriggerFnd(TriggerFnd) {
    var PerctgValue = document.getElementById('fundDIv');
    if (TriggerFnd === "true") {
        document.forms['smartInsureWealthPlus']['alloctionStrategy'].value = 'false'
        setAutoAllocationOnTriggerFundUpdate(true);
        PerctgValue.style.display = "none";
    } else {
        setAutoAllocationOnTriggerFundUpdate(false);
        PerctgValue.style.display = "block";
    }

    if (TriggerFnd === "false" && getAllocationStrategy() == 'false') {
        showorHideInvestmentFund('block', true);
    } else {
        showorHideInvestmentFund('none', false);
    }
}

function showorHideInvestmentFund(displayMethod, isRequired) {
    document.getElementById('fundDIv').style.display = displayMethod;
    //Commented isRequired Condition by Manish

    /*   document.forms["smartInsureWealthPlus"]["equityFund"].required = isRequired;
      document.forms["smartInsureWealthPlus"]["optimiserFund"].required = isRequired;
      document.forms["smartInsureWealthPlus"]["growthFund"].required = isRequired;
      document.forms["smartInsureWealthPlus"]["balancedFund"].required = isRequired;
      document.forms["smartInsureWealthPlus"]["corporateBondFUnd"].required = isRequired;
      document.forms["smartInsureWealthPlus"]["midCapFund"].required = isRequired;
      document.forms["smartInsureWealthPlus"]["optimiserFund"].required = isRequired;
      document.forms["smartInsureWealthPlus"]["pureFund"].required = isRequired;
      document.forms["smartInsureWealthPlus"]["moneyMarketFund"].required = isRequired; */
}

function setAutoAllocationOnTriggerFundUpdate(isEnabled) {
    document.getElementById('autoAllocationYes').disabled = isEnabled;
    document.getElementById('autoAllocationNo').disabled = isEnabled;
}

function setTriggerFundOnAutoAllocationUpdate(isEnabled) {
    document.getElementById('triggerFundYes').disabled = isEnabled;
    document.getElementById('triggerFundNo').disabled = isEnabled;
}

function onAlloctnStrtgy(AlloctnStrtgy) {
    var PerctgValue = document.getElementById('fundDIv');
    if (AlloctnStrtgy === "true") {
        document.forms['smartInsureWealthPlus']['triggerFund'].value = 'false'
        setTriggerFundOnAutoAllocationUpdate(true);
        PerctgValue.style.display = "none";
    } else {
        setTriggerFundOnAutoAllocationUpdate(false);
        PerctgValue.style.display = "block";
    }

    if (getTriggerFund() === "false" && AlloctnStrtgy == 'false') {
        showorHideInvestmentFund('block', true);
    } else {
        showorHideInvestmentFund('none', false);
    }
}

function onViewSFINFundsUpdate() {
    getIsToViewSFINFunds() ? document.getElementById('isToSFINFunds').style.display = "block" : document.getElementById('isToSFINFunds').style.display = "none";

}


function valPremiumAmt() {
    let minPremiumAmt = 0;
    let premium = 0;
    var premiumAmount = getPremiumAmount();
    var plan = this.getPlan1();
    if (plan === "Regular") {
        minPremiumAmt = 4000;
    }

    if (premiumAmount === "") {
        document.getElementById('PrmAmntErrId').style.display = "block";
        document.getElementById('PrmAmntErrId').innerHTML = "Please enter Premium Amount in Rs.";
        return false;

    } else if ((premiumAmount % 100) !== 0) {

        document.getElementById('PrmAmntErrId').style.display = "block";
        document.getElementById('PrmAmntErrId').innerHTML = "Premium Amount should be multiple of 100";
        return false;

    } else if (premiumAmount < minPremiumAmt) {
        document.getElementById('PrmAmntErrId').style.display = "block";
        document.getElementById('PrmAmntErrId').innerHTML = "Enter Minimum Premium Amount of Rs." + minPremiumAmt;
        return false;
    } else {
        document.getElementById('PrmAmntErrId').style.display = "none";
        return true
    }

}

function valiadateMaturityAge() {
    let age = getAge();
    let policyTerm = getPolicyTerm();
    let maturityAge = age + policyTerm;
    if (maturityAge < 18 || maturityAge > 65) {
        document.getElementById('maturityAgeErrId').style.display = "block";
        document.getElementById('maturityAgeErrId').innerHTML = 'Maturity age should be between 18 to 65.'
        return false;
    }
    document.getElementById('maturityAgeErrId').style.display = "none";
    return true;
}

function validateTotalAllocation() {
    if (getTriggerFund() == 'false' && getAllocationStrategy() == 'false') {
        if (this.getEquityFund() + getEquityOptimiserFund() + getBalancedFund() + getGrowthFund() + getCorporateBondFund() +
            getMidCapFund() + getOptimiserFund() + getPureFund() + getMoneyMarketFund() !== 100) {
            document.getElementById('totalAllocationErrId').style.display = "block";
            document.getElementById('totalAllocationErrId').innerHTML = "Total sum of % to be invested for all fund should be equal to 100%";
            return false;
        }
    }
    document.getElementById('totalAllocationErrId').style.display = "none";
    return true;
}

function validateStrategy() {
    let triggetStrategy = getTriggerFund();
    let autoAllocationStrategy = getAllocationStrategy();
    if ((triggetStrategy !== 'true' && triggetStrategy !== 'false') || (autoAllocationStrategy !== 'true' && autoAllocationStrategy !== 'false')) {
        document.getElementById('strategyErrId').style.display = "block";
        document.getElementById('strategyErrId').innerHTML = 'Please select Trigger Fund & Auto Asset Allocation Stategy.';
        return false;
    }
    document.getElementById('strategyErrId').style.display = "none";
    return true;
}

/* ***********************   GETTERS ************************* */
function getProposerFName() {
    return document.forms["smartInsureWealthPlus"]["proposer_first_name"].value;
}

function getProposerMName() {
    return document.forms["smartInsureWealthPlus"]["Prop_middle_name"].value;
}

function getProposerLName() {
    return document.forms["smartInsureWealthPlus"]["proposer_last_name"].value;
}

function getTitle() {
    return document.forms["smartInsureWealthPlus"]["title"].value;
}

function getProposerTitle() {
    return document.forms["smartInsureWealthPlus"]["PropsrTitle"].value;
}


function getAge() {
    return parseInt(document.forms["smartInsureWealthPlus"]["age"].value, 10);
}

function getProposerAge() {
    return parseInt(document.forms["smartInsureWealthPlus"]["proposer_age"].value, 10);
}

function getEmail() {
    return document.forms["smartInsureWealthPlus"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["smartInsureWealthPlus"]["confirmEmail"].value;
}

function getDOB() {
    return document.forms["smartInsureWealthPlus"]["dob"].value;
}

function getProposerDOB() {
    return document.forms["smartInsureWealthPlus"]["proposer_dob"].value;
}

function getMobileNo() {
    return document.forms["smartInsureWealthPlus"]["mobile"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["smartInsureWealthPlus"]["policyTerm"].value, 10);
}

function getPremiumAmount() {
    return parseInt(document.forms["smartInsureWealthPlus"]["premiumAmount"].value, 10);
}

function getPremiumFrequency() {
    var index = document.forms["smartInsureWealthPlus"]["PremiumPaymntMode"].value;
    return premiumFrequencyModeList[index - 1];
}

function getGender() {
    return document.forms["smartInsureWealthPlus"]["gender"].value;
}

function getProposerGender(){
    return document.forms["smartInsureWealthPlus"]["proposerGender"].value;
}

function getEquityFund() {
    var equityFund = parseInt(document.forms["smartInsureWealthPlus"]["equityFund"].value)
    if (isNaN(equityFund) || equityFund == undefined)
        return 0;
    else
        return equityFund;
    // return parseInt(document.forms["smartInsureWealthPlus"]["equityFund"].value, 10);
}

function getEquityOptimiserFund() {
    var equityOptimiserFund = parseInt(document.forms["smartInsureWealthPlus"]["equityOptimiserFund"].value)
    if (isNaN(equityOptimiserFund) || equityOptimiserFund == undefined)
        return 0;
    else
        return equityOptimiserFund;
    // return parseInt(document.forms["smartInsureWealthPlus"]["equityOptimiserFund"].value, 10);
}

function getGrowthFund() {
    var growthFund = parseInt(document.forms["smartInsureWealthPlus"]["growthFund"].value)
    if (isNaN(growthFund) || growthFund == undefined)
        return 0;
    else
        return growthFund;
    // return parseInt(document.forms["smartInsureWealthPlus"]["growthFund"].value, 10);
}

function getBalancedFund() {
    var balancedFund = parseInt(document.forms["smartInsureWealthPlus"]["balancedFund"].value)
    if (isNaN(balancedFund) || balancedFund == undefined)
        return 0;
    else
        return balancedFund;
    // return parseInt(document.forms["smartInsureWealthPlus"]["balancedFund"].value, 10);
}

function getCorporateBondFund() {
    var corporateBondFUnd = parseInt(document.forms["smartInsureWealthPlus"]["corporateBondFUnd"].value)
    if (isNaN(corporateBondFUnd) || corporateBondFUnd == undefined)
        return 0;
    else
        return corporateBondFUnd;
    // return parseInt(document.forms["smartInsureWealthPlus"]["corporateBondFUnd"].value, 10);
}

function getMidCapFund() {
    var midCapFund = parseInt(document.forms["smartInsureWealthPlus"]["midCapFund"].value)
    if (isNaN(midCapFund) || midCapFund == undefined)
        return 0;
    else
        return midCapFund;
    // return parseInt(document.forms["smartInsureWealthPlus"]["midCapFund"].value, 10);
}

function getOptimiserFund() {
    var optimiserFund = parseInt(document.forms["smartInsureWealthPlus"]["optimiserFund"].value)
    if (isNaN(optimiserFund) || optimiserFund == undefined)
        return 0;
    else
        return optimiserFund;
    // return parseInt(document.forms["smartInsureWealthPlus"]["optimiserFund"].value, 10);
}

function getPureFund() {
    var pureFund = parseInt(document.forms["smartInsureWealthPlus"]["pureFund"].value)
    if (isNaN(pureFund) || pureFund == undefined)
        return 0;
    else
        return pureFund;
    // return parseInt(document.forms["smartInsureWealthPlus"]["pureFund"].value, 10);
}

function getMoneyMarketFund() {
    var moneyMarketFund = parseInt(document.forms["smartInsureWealthPlus"]["moneyMarketFund"].value)
    if (isNaN(moneyMarketFund) || moneyMarketFund == undefined)
        return 0;
    else
        return moneyMarketFund;
    // return parseInt(document.forms["smartInsureWealthPlus"]["moneyMarketFund"].value, 10);
}

function fName() {
    return document.forms["smartInsureWealthPlus"]["first_name"].value;
}

function MName() {
    return document.forms["smartInsureWealthPlus"]["middle_name"].value;
}

function LName() {
    return document.forms["smartInsureWealthPlus"]["last_name"].value;
}

function getPlan1() {
    var index = document.forms["smartInsureWealthPlus"]["Plan"].value;
    return planTypeList[index - 1].title;
}

function getPremiumAmount() {
    return parseInt(document.forms["smartInsureWealthPlus"]["premiumAmount"].value, 10);
}

function getAllocationStrategy() {
    return document.forms["smartInsureWealthPlus"]["alloctionStrategy"].value;
}

function getTriggerFund() {
    console.log(document.forms["smartInsureWealthPlus"]["triggerFund"].value);
    return document.forms["smartInsureWealthPlus"]["triggerFund"].value;
}

// Added by Manish
function getIsAllocationStrategySelected() {
    return (getAllocationStrategy() == undefined || getAllocationStrategy() == '') ? '' : getAllocationStrategy();
}
// Added by Manish
function getIsTriggerFundSelected() {
    return (getTriggerFund() == undefined || getTriggerFund() == '') ? '' : getTriggerFund();
}

function getIsToViewSFINFunds() {
    return document.forms["smartInsureWealthPlus"]["viewSFINFUnds"].checked;
}

function validatForm() {
    if (smartInsureWealthPlus.checkValidity() && this.validateGender() && this.validateConfirmEmail() &&
        this.calculateAge(getDDMMYYYY(self.getDOB()), 'age', 'ageErrId') && this.validateMobileNo(self.getMobileNo()) &&
        this.valPremiumAmt() && valiadateMaturityAge() && validateTotalAllocation() && validateStrategy()) {
        if (this.getAge() < 18) {
            if (this.calculateAge(getDDMMYYYY(self.getProposerDOB()), 'proposer_age', 'proposerAgeErrId') && this.validateProposerGender()) {
                this.calculatePremiumAPICall(); // form valid
            }
        } else {
            this.calculatePremiumAPICall(); // form valid
        }
    }
}

function getInputAutoAllocation() {
    console.log('isAutoAssetAllocationSelected : ' + this.getIsAllocationStrategySelected());
    let isAutoAssetAllocationSelectedXML = '';
    let policyterm = this.getPolicyTerm();
    //changed to this.getIsAllocationStrategySelected() by manish
    if (this.getIsAllocationStrategySelected()) {
        if (policyterm >= '18') {
            isAutoAssetAllocationSelectedXML = `<perInvEquityFund>70</perInvEquityFund>
    <perInvEquityOptimiserFund>${isNaN(this.getEquityOptimiserFund()) ? '0' : this.getEquityOptimiserFund()}</perInvEquityOptimiserFund>
    <perInvgrowthFund>${isNaN(this.getGrowthFund()) ? '0' : this.getGrowthFund()}</perInvgrowthFund>
    <perInvBalancedFund>${isNaN(this.getBalancedFund()) ? '0' : this.getBalancedFund()}</perInvBalancedFund>
    <perInvPureFund>${isNaN(this.getPureFund()) ? '0' : this.getPureFund()}</perInvPureFund>
    <perInvMidCapFund>${isNaN(this.getMidCapFund()) ? '0' : this.getMidCapFund()}</perInvMidCapFund>
    <perInvBondOptimiser>${isNaN(this.getOptimiserFund()) ? '0' : this.getOptimiserFund()}</perInvBondOptimiser>
    <perInvCorpBondFund>30</perInvCorpBondFund>
    <perInvMoneyMktFund>${isNaN(this.getMoneyMarketFund()) ? '0' : this.getMoneyMarketFund()}</perInvMoneyMktFund>`;
        } else if (policyterm == '15') {
            isAutoAssetAllocationSelectedXML = `<perInvEquityFund>70</perInvEquityFund>
    <perInvEquityOptimiserFund>${isNaN(this.getEquityOptimiserFund()) ? '0' : this.getEquityOptimiserFund()}</perInvEquityOptimiserFund>
    <perInvgrowthFund>${isNaN(this.getGrowthFund()) ? '0' : this.getGrowthFund()}</perInvgrowthFund>
    <perInvBalancedFund>${isNaN(this.getBalancedFund()) ? '0' : this.getBalancedFund()}</perInvBalancedFund>
    <perInvPureFund>${isNaN(this.getPureFund()) ? '0' : this.getPureFund()}</perInvPureFund>
    <perInvMidCapFund>${isNaN(this.getMidCapFund()) ? '0' : this.getMidCapFund()}</perInvMidCapFund>
    <perInvBondOptimiser>${isNaN(this.getOptimiserFund()) ? '0' : this.getOptimiserFund()}</perInvBondOptimiser>
    <perInvCorpBondFund>30</perInvCorpBondFund>
    <perInvMoneyMktFund>${isNaN(this.getMoneyMarketFund()) ? '0' : this.getMoneyMarketFund()}</perInvMoneyMktFund>`;
        } else if (policyterm == '10') {
            isAutoAssetAllocationSelectedXML = `<perInvEquityFund>50</perInvEquityFund>
    <perInvEquityOptimiserFund>${isNaN(this.getEquityOptimiserFund()) ? '0' : this.getEquityOptimiserFund()}</perInvEquityOptimiserFund>
    <perInvgrowthFund>${isNaN(this.getGrowthFund()) ? '0' : this.getGrowthFund()}</perInvgrowthFund>
    <perInvBalancedFund>${isNaN(this.getBalancedFund()) ? '0' : this.getBalancedFund()}</perInvBalancedFund>
    <perInvPureFund>${isNaN(this.getPureFund()) ? '0' : this.getPureFund()}</perInvPureFund>
    <perInvMidCapFund>${isNaN(this.getMidCapFund()) ? '0' : this.getMidCapFund()}</perInvMidCapFund>
    <perInvBondOptimiser>${isNaN(this.getOptimiserFund()) ? '0' : this.getOptimiserFund()}</perInvBondOptimiser>
    <perInvCorpBondFund>50</perInvCorpBondFund>
    <perInvMoneyMktFund>${isNaN(this.getMoneyMarketFund()) ? '0' : this.getMoneyMarketFund()}</perInvMoneyMktFund>`;
        }
    } else {
        isAutoAssetAllocationSelectedXML = `<perInvEquityFund>${this.getEquityFund()}</perInvEquityFund>
    <perInvEquityOptimiserFund>${isNaN(this.getEquityOptimiserFund()) ? '0' : this.getEquityOptimiserFund()}</perInvEquityOptimiserFund>
    <perInvgrowthFund>${isNaN(this.getGrowthFund()) ? '0' : this.getGrowthFund()}</perInvgrowthFund>
    <perInvBalancedFund>${isNaN(this.getBalancedFund()) ? '0' : this.getBalancedFund()}</perInvBalancedFund>
    <perInvPureFund>${isNaN(this.getPureFund()) ? '0' : this.getPureFund()}</perInvPureFund>
    <perInvMidCapFund>${isNaN(this.getMidCapFund()) ? '0' : this.getMidCapFund()}</perInvMidCapFund>
    <perInvBondOptimiser>${isNaN(this.getOptimiserFund()) ? '0' : this.getOptimiserFund()}</perInvBondOptimiser>
    <perInvCorpBondFund>${isNaN(this.getCorporateBondFund()) ? '0' : this.getCorporateBondFund()}</perInvCorpBondFund>
    <perInvMoneyMktFund>${isNaN(this.getMoneyMarketFund()) ? '0' : this.getMoneyMarketFund()}</perInvMoneyMktFund>`;
    }
    console.log('isAutoAssetAllocationSelectedXML : ' + isAutoAssetAllocationSelectedXML);
    return isAutoAssetAllocationSelectedXML;
}

function getInput(forminputbyuser) {
    //changed Auto Allocation and IsTriggerFund value by manish
    let getInputXML = `<?xml version='1.0' encoding='utf-8' ?><SmartInsureWealthPlus>
    <LifeAssured_title>${this.getTitle()}</LifeAssured_title>
    <LifeAssured_firstName>${this.fName()}</LifeAssured_firstName>
    <LifeAssured_middleName>${this.MName()}</LifeAssured_middleName>
    <LifeAssured_lastName>${this.LName()}</LifeAssured_lastName>
    <LifeAssured_DOB>${getDDMMYYYY(this.getDOB())}</LifeAssured_DOB>
    <LifeAssured_age>${this.getAge()}</LifeAssured_age>

    <proposer_title>${this.getAge() < 18 ? this.getProposerTitle() : ''}</proposer_title>
    <proposer_firstName>${this.getAge() < 18 ? this.getProposerFName() : ''}</proposer_firstName>
    <proposer_middleName>${this.getAge() < 18 ? this.getProposerMName() : ''}</proposer_middleName>
    <proposer_lastName>${this.getAge() < 18 ? this.getProposerLName() : ''}</proposer_lastName>
    <proposer_DOB>${this.getAge() < 18 ? getDDMMYYYY(this.getProposerDOB()) : ''}</proposer_DOB>
    <proposer_age>${this.getAge() < 18 ? this.getProposerAge() : ''}</proposer_age>
    <proposer_gender>${this.getAge() < 18 ? this.getProposerGender(): ''}</proposer_gender>

    <proposer_Is_Same_As_Life_Assured>${this.getAge() < 18 ? 'n' : 'y'}</proposer_Is_Same_As_Life_Assured>
    <isStaff>false</isStaff>
    <age>${this.getAge()}</age>
    <gender>${this.getGender()}</gender>
    <gender_proposer>${this.getAge() < 18 ? this.getProposerGender(): ''}</gender_proposer>
    <plan>${this.getPlan1()}</plan>
    <premFreqMode>${this.getPremiumFrequency().title}</premFreqMode>
    <proposerAge>${Number(this.getAge()) < 18 ? this.getProposerAge() : 0}</proposerAge>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <premiumAmount>${this.getPremiumAmount()}</premiumAmount>
    <isTriggerFund>${this.getIsTriggerFundSelected()}</isTriggerFund>
    <Product_Cat></Product_Cat>
    <AutoAllocation>${this.getIsAllocationStrategySelected()}</AutoAllocation>

    ${this.getInputAutoAllocation()}

    <product_name>${this.productDetails.title}</product_name>
    <product_Code>${this.productDetails.productCode}</product_Code>
    <product_UIN>${this.productDetails.uinNumber}</product_UIN>
    <product_cateogory>${product_cateogory}</product_cateogory>
    <product_type>${product_type}</product_type>
    <KFC>N</KFC>
  </SmartInsureWealthPlus>`;

    let escapedHTML = escapeInputHTML(getInputXML);
    sessionStorage.setItem("BIInput", escapedHTML);
    console.log(getInputXML);
    return getInputXML;
}

function calculatePremiumAPICall() {
    //changed autoAssetAllocationStrategy and triggerStrategy value by manish
    self.showLoader();
    let isFundDivVisible = document.getElementById('fundDIv').style.display;
    let xmlBodyParam = `<getPremiumSmartInsureWealthPlus xmlns="http://tempuri.org/">
    <isStaff>false</isStaff>
    <age>${this.getAge()}</age>
    <gender>${this.getGender()}</gender>
    <gender_proposer>${this.getAge() < 18 ? this.getProposerGender() : ""}</gender_proposer>
    <plan>${this.getPlan1()}</plan>
    <premFreqMode>${this.getPremiumFrequency().title}</premFreqMode>
    <proposerAge>${Number(this.getAge()) < 18 ? this.getProposerAge() : 0}</proposerAge>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <premiumAmount>${this.getPremiumAmount()}</premiumAmount>
    <triggerStrategy>${this.getIsTriggerFundSelected()}</triggerStrategy>
    <autoAssetAllocationStrategy>${this.getIsAllocationStrategySelected()}</autoAssetAllocationStrategy>
    <perInvEquityFund>${(isFundDivVisible != 'none' ? this.getEquityFund() : 0)}</perInvEquityFund>
    <perInvEquityOptimiserFund>${(isFundDivVisible != 'none' ? getEquityOptimiserFund() : 0)}</perInvEquityOptimiserFund>
    <perInvgrowthFund>${(isFundDivVisible != 'none' ? getGrowthFund() : 0)}</perInvgrowthFund>
    <perInvBalancedFund>${(isFundDivVisible != 'none' ? getBalancedFund() : 0)}</perInvBalancedFund>
    <PureFund>${(isFundDivVisible != 'none' ? getPureFund() : 0)}</PureFund>
    <MidCapFund>${(isFundDivVisible != 'none' ? getMidCapFund() : 0)}</MidCapFund>
    <BondOptimiser>${(isFundDivVisible != 'none' ? getOptimiserFund() : 0)}</BondOptimiser>
    <CorpBond>${(isFundDivVisible != 'none' ? getCorporateBondFund() : 0)}</CorpBond>
    <moneyMarketFund>${(isFundDivVisible != 'none' ? getMoneyMarketFund() : 0)}</moneyMarketFund>
    <KFC>N</KFC>
  </getPremiumSmartInsureWealthPlus>`;

    let body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
      <soap:Body>
          ${xmlBodyParam}
          </soap:Body>
          </soap:Envelope>`;
    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {
        //changed autoAssetAllocationStrategy and triggerStrategy value by manish
        let forminputbyuser = {
            staff_discount: false,
            proposerName: self.getTitle()+" "+self.fName() + " " + self.LName(),
            age: self.getAge(),
            gender: self.getGender(),
            planOption: self.getPlan1(),
            premiumFrequency: this.getPremiumFrequency().title,
            proposerAge: this.getAge() < 18 ? this.getProposerAge() : '',
            proposerGender: this.getAge() < 18 ? self.getProposerGender() : '',
            policyTerm: self.getPolicyTerm(),
            premiumAmount: self.getPremiumAmount(),
            triggerStrategy: this.getIsTriggerFundSelected(),
            autoAssetAllocationStrategy: this.getIsAllocationStrategySelected(),
            perInvEquityFund: this.getEquityFund(),
            perInvEquityOptimiserFund: this.getEquityOptimiserFund(),
            perInvgrowthFund: this.getGrowthFund(),
            perInvBalancedFund: this.getBalancedFund(),
            perInvPureFund: this.getPureFund(),
            perInvMidCapFund: this.getMidCapFund(),
            bondOptimiser: this.getOptimiserFund(),
            corpBond: this.getCorporateBondFund(),
            moneyMarketFund: this.getMoneyMarketFund(),
            quotationNumber: quotNumber,
            PlanName: self.productDetails.title,
            CustTitle: self.getTitle(),
            CustFirstName: self.fName(),
            CustMiddleName: self.MName(),
            CustLastName: self.LName(),
            CustMobile: self.getMobileNo(),
            CustEmailID: self.getEmail(),
            LaDOB: getDDMMYYYY(self.getDOB()),
            ProposerDOB: this.getAge() < 18 ? getDDMMYYYY(self.getProposerDOB()) : '',
            TotalPremAmt: self.getPremiumAmount(),
            Frequency: self.getPremiumFrequency().title,
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: '0',
            PlanCode: '2J'
        };
        let inputXml = getInput(forminputbyuser);
        self.ApiCallService('/getPremiumSmartInsureWealthPlus', body, '<smartinsurewealthplus>', '</smartinsurewealthplus>', true).then((data) => {
            self.hideLoader();
            console.log("DATA----"+ JSON.stringify(data))
            data = data.smartinsurewealthplus;
            data.productDetails = self.productDetails;
            var stringifyJson = JSON.stringify(data);
            sessionStorage.setItem('premiumCalcResponse',stringifyJson);

            //Added by sonali
            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                let remaningOutput;

                //To check if policyYr1 tag is present in service output
                if (premiumCalcXMLResponse.includes("<policyYr1>")) {
                    var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                    var lastIndex = premiumCalcXMLResponse.indexOf(`</ReturnMortalityChrg8Pr${getPolicyTerm()}>`);
                    let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</ReturnMortalityChrg8Pr${getPolicyTerm()}>`.length);
                    remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                } else {
                    remaningOutput = premiumCalcXMLResponse;
                }

                remaningOutput = remaningOutput.replace('</smartinsurewealthplus>', '');

                remaningOutput += `<staffStatus>none</staffStatus>`;
                remaningOutput += `<staffRebate></staffRebate>`;
                remaningOutput += `</smartinsurewealthplus>`;
                remaningOutput = "<?xml version='1.0' encoding='utf-8' ?>" + remaningOutput;
                console.log("remaningOutput ", remaningOutput);
                let escapedBIOutput = escapeInputHTML(remaningOutput);
                sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.

                //Assign Sum Assured from Output
                forminputbyuser.BasicSA = data.sumAssured;
            }
            //end

            if (sessionStorage.ThroughNeedAnalysis) {
                let status = sessionStorage.getItem('ThroughNeedAnalysis');
                if (status === 'Yes') {
                    updateDataInDB(forminputbyuser).then((resolve) => {
                        if (resolve == "1") {
                            console.log(JSON.stringify(data))
                            createPDFGeneralMethod(self.productDetails, data, forminputbyuser)
                        } else {
                            alert("Something Went Wrong")
                        }
                    });
                } else {
                    window.location.href = "../../PremiumCalSuccess/success.html";
                }
            }
        }).catch((error) => {
            console.log(" in error ", error);
            alert("Server Error, Please try again")
            self.hideLoader();
        });
    }).catch((message) => {
        console.log("Quotation - ", message);
        alert("Unable to generate quotation number")
        self.hideLoader();
    });
}