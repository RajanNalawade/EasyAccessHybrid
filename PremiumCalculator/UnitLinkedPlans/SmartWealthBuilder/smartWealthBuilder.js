window.onload = function () {
    this.ready();
    setKerlaDiscount();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails;
var proposer_Is_Same_As_Life_Assured = 'y';

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    // this.hideLoader();
    this.hideErrMsg();
    this.initArrayList();
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData();
    this.onViewSFINFundsUpdate();
};

function hideErrMsg() {
    document.getElementById('divPremPayingTerm').style.display = "none";
    document.getElementById('divPremFreqMode').style.display = "none";
    document.getElementById('divProposer').style.display = "none";
    document.getElementById('maturityAgeErrId').style.display = "none";
    document.getElementById('samfErrId').style.display = "none";
    document.getElementById('confirmEmailErrId').style.display = "none";
    document.getElementById('ageErrId').style.display = "none";
    document.getElementById('mobileNoErrId').style.display = "block";
}

function initializeData() {
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
    document.getElementById("yrsElapsedRangeId").innerHTML = `(5 to ${this.getPolicyTerm()} years)`;
    document.getElementById('premiumAmountRangeId').innerHTML = `(${this.getPlanType().minPremiumAmount} to ${maxPremiumAmtLimit})`;
}

function initArrayList() {

    policyListElement = document.forms["smartWealthBuilderForm"]["policyTerm"];
    for (i = minPolicyTermLimit; i <= maxPolicyTermLimit; i++) {
        policyListElement.add(new Option(i));
    }

    planTypeListElement = document.forms["smartWealthBuilderForm"]["plan"];
    for (i = 0; i < planTypeList.length; i++) {
        planTypeListElement.add(new Option(planTypeList[i].title, planTypeList[i].value));
    }

    premiumPayingTermListElement = document.forms["smartWealthBuilderForm"]["premiumPayingTerm"];
    for (i = 0; i < premiumPayingTermList.length; i++) {
        premiumPayingTermListElement.add(new Option(premiumPayingTermList[i].title, premiumPayingTermList[i].title));
    }

    premiumFrequencyModeListElement = document.forms["smartWealthBuilderForm"]["premiumFrequencyMode"];
    for (i = 0; i < premiumFrequencyModeList.length; i++) {
        premiumFrequencyModeListElement.add(new Option(premiumFrequencyModeList[i].title, premiumFrequencyModeList[i].value));
    }
    this.calculateAge('', 'start', '');
}

/**********************DOM Events**********************/
function validateGender(formElementName) {
    var gender = document.forms["smartWealthBuilderForm"]["gender"].value;
    var proposerGender = document.forms["smartWealthBuilderForm"]["proposerGender"].value;

    if (formElementName === "gender") {
        if (gender === "Male") {
            document.getElementById("lifeAssuredTitle").options[1].disabled = true;
            document.getElementById("lifeAssuredTitle").options[2].disabled = true;
            document.getElementById("lifeAssuredTitle").options[0].selected = true;
        } else if (gender === "Female") {
            document.getElementById("lifeAssuredTitle").options[0].disabled = true;
            document.getElementById("lifeAssuredTitle").options[1].disabled = false;
            document.getElementById("lifeAssuredTitle").options[2].disabled = false;
            document.getElementById("lifeAssuredTitle").options[1].selected = true;
        } else if (gender === "Third Gender"){
            document.getElementById("lifeAssuredTitle").options[0].disabled = false;
            document.getElementById("lifeAssuredTitle").options[1].disabled = false;
            document.getElementById("lifeAssuredTitle").options[2].disabled = false;
        }

    } else {
        if (proposerGender === "Male") {
            document.getElementById("ProposerTitle").options[0].disabled = false;
            document.getElementById("ProposerTitle").options[0].selected = true;
            document.getElementById("ProposerTitle").options[1].disabled = true;
            document.getElementById("ProposerTitle").options[2].disabled = true;
        } else if (proposerGender === "Female") {
            document.getElementById("ProposerTitle").options[0].disabled = true;
            document.getElementById("ProposerTitle").options[1].disabled = false;
            document.getElementById("ProposerTitle").options[1].selected = true;
            document.getElementById("ProposerTitle").options[2].disabled = false;
        } else if (proposerGender === "Third Gender"){
            document.getElementById("ProposerTitle").options[0].disabled = false;
            document.getElementById("ProposerTitle").options[1].disabled = false;
            document.getElementById("ProposerTitle").options[2].disabled = false;
        }
    }

    if (formElementName == 'gender' && gender !== "Female" && gender !== "Male" && gender !== "Third Gender") {
        document.getElementById('genderErrId').style.display = "block";
        document.getElementById('genderErrId').innerHTML = "Please select your gender.";
        return false;
    }
    if (formElementName == 'proposerGender' && proposerGender !== "Female" && proposerGender !== "Male" && proposerGender !== "Third Gender") {
        document.getElementById('proposerGenderErrorId').style.display = "block";
        document.getElementById('proposerGenderErrorId').innerHTML = "Please select your gender.";
        return false;
    }
    document.getElementById('genderErrId').style.display = "none";
    document.getElementById('proposerGenderErrorId').style.display = "none";
    return true
}

function calculateAge(birthday, formElementName, errElementId) {
    var age = getAgeFromBirthdate(getDDMMYYYY(birthday));


    if (formElementName === 'start') {
        formElementName = 'age';
    }
    document.forms["smartWealthBuilderForm"][formElementName].innerHTML = age;
    document.forms["smartWealthBuilderForm"][formElementName].value = age;
    if (formElementName === 'age' && errElementId !== '' && (age < minAgeLimit || age > maxAgeLimit)) {
        document.getElementById(errElementId).style.display = "block";
        document.getElementById(errElementId).innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        document.getElementById('divProposer').style.display = "none";
        return false;
    } else if (formElementName === 'proposer_age' && errElementId !== '' && (age < proposerAgeMin || age > proposerAgeMax)) {
        document.getElementById(errElementId).style.display = "block";
        document.getElementById(errElementId).innerHTML = `Age should be between ${proposerAgeMin} and ${proposerAgeMax}.`;
        return false;
    } else {
        if (errElementId !== '') {
            document.getElementById(errElementId).style.display = "none";
        }

        if (age >= minAgeLimit && age < 18 && formElementName !== 'start') {
            document.getElementById('divProposer').style.display = "block";
            document.forms["smartWealthBuilderForm"]["proposer_first_name"].required = true;
            document.forms["smartWealthBuilderForm"]["proposer_last_name"].required = true;
            document.forms["smartWealthBuilderForm"]["proposer_dob"].required = true;
        } else if (formElementName !== 'proposer_age') {
            document.getElementById('divProposer').style.display = "none";
            document.forms["smartWealthBuilderForm"]["proposer_first_name"].required = false;
            document.forms["smartWealthBuilderForm"]["proposer_last_name"].required = false;
            document.forms["smartWealthBuilderForm"]["proposer_dob"].required = false;
        }
        if (formElementName == 'age') {
            if (age < 18) {
                proposer_Is_Same_As_Life_Assured = 'n';
            } else {
                proposer_Is_Same_As_Life_Assured = 'y';
            }
        }
    }
    return true;
}

function onPlanChange() {
    let planType = getPlanType();
    if (planType.title === 'Single') {
        document.getElementById('divPremPayingTerm').style.display = "none";
        document.getElementById('divPremFreqMode').style.display = "none";
        document.getElementById('premiumAmountRangeId').innerHTML = `(${planType.minPremiumAmount} to ${maxPremiumAmtLimit})`;
    } else if (planType.title === 'Regular') {
        document.getElementById('divPremFreqMode').style.display = "block";
        document.getElementById('divPremPayingTerm').style.display = "none";
        document.getElementById('premiumAmountRangeId').innerHTML = `(${planType.minPremiumAmount} to ${maxPremiumAmtLimit})`;
    } else if (planType.title === 'Limited') {
        document.getElementById('divPremPayingTerm').style.display = "block";
        document.getElementById('divPremFreqMode').style.display = "block";
        document.getElementById('premiumAmountRangeId').innerHTML = `(${planType.minPremiumAmount} to ${maxPremiumAmtLimit})`;
    }
}

function getEffectivePremium() {
    var minPremiumAmountRequired = this.getPlanType().minPremiumAmount;
    var premiumAmount = this.getPremiumAmount();
    if ((Math.max(minPremiumAmountRequired, premiumAmount) * 1) % 100 === 0)
        return ((Math.max(minPremiumAmountRequired, premiumAmount) * 1) % 100);
    else
        return ((Math.max(minPremiumAmountRequired, premiumAmount) * 1) - (Math.max(minPremiumAmountRequired, premiumAmount) * 1 % 100));
}


function validatePolicyTerm() {
    let minTemp = 0,
        maxTemp = 0;
    var policyTermStartingAge = 0;
    var policyTermEndingAge = 0;
    var policyTerm = this.getPolicyTerm();
    // Update no. of yrs elapsed since inception range message
    document.getElementById("yrsElapsedRangeId").innerHTML = `(5 to ${this.getPolicyTerm()} years)`;

    if (this.getPlanType().value === 0) {
        minTemp = 5;
    } else {
        if (this.getPlanType().value === 2) {
            if (getPremiumPayingTerm() == "15") {
                minTemp = 20;
            } else if (getPremiumPayingTerm() == "12" || getPremiumPayingTerm() == "10") {
                minTemp = 15;
            } else
                minTemp = 12;
        } else {
            minTemp = 12;
        }
    }

    if (this.getAge()) {
        maxTemp = 18 - Number(this.getAge());
        policyTermStartingAge = Math.max(minTemp, maxTemp);
        policyTermEndingAge = Math.min(30, (70 - Number(this.getAge())));
        console.log("policyTermStartingAge ", policyTermStartingAge, " policyTermEndingAge ", policyTermEndingAge);

        if (this.getPlanType().value === 1 || this.getPlanType().value === 2) {
            if (policyTerm < policyTermStartingAge || policyTerm > policyTermEndingAge) {
                if (policyTermStartingAge < 12 && policyTermEndingAge > 30)
                    document.getElementById('policyTermErrId').innerHTML = "Policy Term Should be" + policyTermStartingAge + " Years to " + policyTermEndingAge + "Years";
                else if ((policyTerm < policyTermStartingAge) || (policyTerm > policyTermEndingAge))
                    error = "Policy Term should be in between " + policyTermStartingAge + " Years to " + policyTermEndingAge + " Years";
            }
        } else {
            document.getElementById('policyTermMessageId').innerHTML = `(${policyTermStartingAge} to ${policyTermEndingAge} years)`;
            if (!(policyTerm >= policyTermStartingAge && policyTerm <= policyTermEndingAge)) {
                document.getElementById('policyTermErrId').style.display = 'block';
                document.getElementById('policyTermErrId').innerHTML = `Policy term should be ${policyTermStartingAge} to ${policyTermEndingAge} Years.`;
                return false;
            }
        }
    } else {
        // document.getElementById('policyTermMessageId').innerHTML = `Please select the age of the proposer.`;
    }
    document.getElementById('policyTermErrId').style.display = 'none';
    return true;
}

function validateSAMF() {
    var age = this.getAge();
    switch (this.getPlanType().value) {
        case 0:
            minSAMFLabelLimit = 1.25;
            maxSAMFLabelLimit = 1.25;
            // if (age >= 0 && age <= 44) {
            //     minSAMFLabelLimit = 1.25;
            //     maxSAMFLabelLimit = 3;
            // } else if (age >= 45 && age <= 90) {
            //     minSAMFLabelLimit = 1.1;
            //     maxSAMFLabelLimit = 1.25;
            // }
            break;
        case 1:
            minSAMFLabelLimit = 10;
            maxSAMFLabelLimit = 10;
            // if (age >= 0 && age <= 44) {
            //     minSAMFLabelLimit = Math.max(10, 0.5 * Number(this.getPolicyTerm()));
            //     maxSAMFLabelLimit = 20;
            // } else if (age >= 45 && age <= 90) {
            //     minSAMFLabelLimit = Math.max(7, 0.25 * Number(this.getPolicyTerm()));
            //     maxSAMFLabelLimit = 20;
            // }
            break;
        case 2:
            minSAMFLabelLimit = 10;
            maxSAMFLabelLimit = 10;
            // if (age >= 0 && age <= 44) {
            //     minSAMFLabelLimit = Math.max(10, 0.5 * Number(this.getPolicyTerm()));
            //     maxSAMFLabelLimit = 15;
            // } else if (age >= 45 && age <= 90) {
            //     minSAMFLabelLimit = Math.max(7, 0.25 * Number(this.getPolicyTerm()));
            //     maxSAMFLabelLimit = 15;
            // }
            break;
    }
    document.getElementById('samfRangemessageId').innerHTML = `(${minSAMFLabelLimit} to ${maxSAMFLabelLimit})`;
    if (this.getSAMF() < minSAMFLabelLimit || this.getSAMF() > maxSAMFLabelLimit) {
        document.getElementById('samfErrId').style.display = 'block';
        document.getElementById('samfErrId').innerHTML = `Sum Assured Multiple Factor (SAMF) should be in the range of ${minSAMFLabelLimit} to ${maxSAMFLabelLimit}.`;
        return false;
    }
    document.getElementById('samfErrId').style.display = 'none';
    return true;
}

function validateTotalAllocation() {
    if (this.getEquityFund() + this.getEquityOptimiserFund() + this.getGrowthFund() + this.getBalancedFund() +
    this.getBondFund() + this.getMoneyMarketFund() + this.getTop300Fund() + this.getBondOptimiserFund() +
    this.getCorporateBondFund() + this.getMidCapFund() + this.getPureFund() !== 100) {
        document.getElementById('totalAllocationErrId').style.display = 'block';
        document.getElementById('totalAllocationErrId').innerHTML = `Total sum of % to be invested for all fund should be equal to 100%.`;
        return false;
    }
    document.getElementById('totalAllocationErrId').style.display = 'none';
    return true;
}

function validatePremiumAmount() {
    var premiumAmount = this.getPremiumAmount();
    if (isNaN(premiumAmount)) {
        document.getElementById('premiumAmountErrId').style.display = 'block';
        document.getElementById('premiumAmountErrId').innerHTML = `Please enter Premium Amount in Rs.`;
        return false;
    } else if (premiumAmount % 100 !== 0) {
        document.getElementById('premiumAmountErrId').style.display = 'block';
        document.getElementById('premiumAmountErrId').innerHTML = `Premium Amount should be multiple of 100.`;
        return false;
    } else if (premiumAmount < this.getPlanType().minPremiumAmount || premiumAmount > maxPremiumAmtLimit) {
        document.getElementById('premiumAmountErrId').style.display = 'block';
        document.getElementById('premiumAmountErrId').innerHTML = `Enter Premium Amount Rs. ${this.getPlanType().minPremiumAmount} and Rs. ${maxPremiumAmtLimit}`;
        return false;
    }
    document.getElementById('premiumAmountErrId').style.display = 'none';
    return true;
}

function validateYrsElapsedSinceInterception() {
    var yrsElapsedSinceInterception = this.getYearsElapsedSinceInterception();
    document.getElementById("yrsElapsedRangeId").innerHTML = `(5 to ${this.getPolicyTerm()} years)`;
    if (isNaN(yrsElapsedSinceInterception)) {
        document.getElementById('yrsElapsedSinceInterceptionErrId').style.display = 'block';
        document.getElementById('yrsElapsedSinceInterceptionErrId').innerHTML = `Please enter No. of Years Elapsed Since Inception.`;
        return false;
    } else if (yrsElapsedSinceInterception < 5 || yrsElapsedSinceInterception > this.getPolicyTerm()) {
        document.getElementById('yrsElapsedSinceInterceptionErrId').style.display = 'block';
        document.getElementById('yrsElapsedSinceInterceptionErrId').innerHTML = `Enter No. of Years Elapsed Since Inception between 5 to ${this.getPolicyTerm()} years)`;
        return false;
    }
    document.getElementById('yrsElapsedSinceInterceptionErrId').style.display = 'none';
    return true;
}

function validateMaturityAge() {
    if (this.getAge() + this.getPolicyTerm() > 70) {
        document.getElementById('maturityAgeErrId').style.display = 'block';
        document.getElementById('maturityAgeErrId').innerHTML = `Max. Maturity age allowed is 70 years`;
        return false;
    }
    document.getElementById('maturityAgeErrId').style.display = 'none';
    return true;
}

function onViewSFINFundsUpdate() {
    var isViewSFINFundsChecked = document.forms["smartWealthBuilderForm"]["viewSFINFUnds"].checked;
    if (isViewSFINFundsChecked) {
        document.getElementById('isToSFINFunds').style.display = "block";
    } else {
        document.getElementById('isToSFINFunds').style.display = "none";
    }
}
/************************GETTERS************************/
function getProposerFName() {
    return document.forms["smartWealthBuilderForm"]["proposer_first_name"].value;
}

function getProposerMName() {
    return document.forms["smartWealthBuilderForm"]["proposer_middle_name"].value;
}

function getProposerLName() {
    return document.forms["smartWealthBuilderForm"]["proposer_last_name"].value;
}

function getTitle() {
    return document.forms["smartWealthBuilderForm"]["lifeAssuredTitle"].value;
}

function getProposerTitle() {
    return document.forms["smartWealthBuilderForm"]["proposer_title"].value;
}

function getAge() {
    return parseInt(document.forms["smartWealthBuilderForm"]["age"].value, 10);
}

function getProposerAge() {
    return parseInt(document.forms["smartWealthBuilderForm"]["proposer_age"].value, 10);
}

function getEmail() {
    return document.forms["smartWealthBuilderForm"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["smartWealthBuilderForm"]["confirmEmail"].value;
}

function getDOB() {
    return document.forms["smartWealthBuilderForm"]["dob"].value;
}

function getProposerDOB() {
    return document.forms["smartWealthBuilderForm"]["proposer_dob"].value;
}

function getMobileNo() {
    return document.forms["smartWealthBuilderForm"]["mobile"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["smartWealthBuilderForm"]["policyTerm"].value, 10);
}

function getPremiumAmount() {
    return parseInt(document.forms["smartWealthBuilderForm"]["premiumAmount"].value, 10);
}

function getPremiumPayingTerm() {
    return document.forms["smartWealthBuilderForm"]["premiumPayingTerm"].value;
}

function getPlanType() {
    let index = document.getElementById('ddlPlan').value;
    return planTypeList[index];
}

function getPremiumFrequency() {
    var index = document.forms["smartWealthBuilderForm"]["premiumFrequencyMode"].value;
    return premiumFrequencyModeList[index];
}

function getSAMF() {
    return parseFloat(document.forms["smartWealthBuilderForm"]["samf"].value);
}

function getGender() {
    return document.forms["smartWealthBuilderForm"]["gender"].value;
}

function getProposerGender() {
    return document.forms["smartWealthBuilderForm"]["proposerGender"].value;
}

function getEquityFund() {
    var fund = parseInt(document.forms["smartWealthBuilderForm"]["equityFund"].value, 10)
    if (fund == undefined || isNaN(fund)) {
        return 0;
    } else {
        return fund;
    }
}

function getEquityOptimiserFund() {
    var fund = parseInt(document.forms["smartWealthBuilderForm"]["optimiserFund"].value, 10);
    if (fund == undefined || isNaN(fund)) {
        return 0;
    } else {
        return fund;
    }
}

function getGrowthFund() {
    var fund = parseInt(document.forms["smartWealthBuilderForm"]["growthFund"].value, 10);
    if (fund == undefined || isNaN(fund)) {
        return 0;
    } else {
        return fund;
    }
}

function getBalancedFund() {
    var fund = parseInt(document.forms["smartWealthBuilderForm"]["balancedFund"].value, 10);
    if (fund == undefined || isNaN(fund)) {
        return 0;
    } else {
        return fund;
    }
}

function getBondFund() {
    var fund = parseInt(document.forms["smartWealthBuilderForm"]["bondFund"].value, 10);
    if (fund == undefined || isNaN(fund)) {
        return 0;
    } else {
        return fund;
    }
}

function getTop300Fund() {
    var fund = parseInt(document.forms["smartWealthBuilderForm"]["top300Fund"].value, 10);
    if (fund == undefined || isNaN(fund)) {
        return 0;
    } else {
        return fund;
    }
}

function getMoneyMarketFund() {
    var fund = parseInt(document.forms["smartWealthBuilderForm"]["moneyMarketFund"].value, 10);
    if (fund == undefined || isNaN(fund)) {
        return 0;
    } else {
        return fund;
    }
}

function getBondOptimiserFund() {
    var fund = parseInt(document.forms["smartWealthBuilderForm"]["bondOptimiserFund"].value, 10);
    if (fund == undefined || isNaN(fund)) {
        return 0;
    } else {
        return fund;
    }
}

function getCorporateBondFund() {
    var fund = parseInt(document.forms["smartWealthBuilderForm"]["corporateBondFund"].value, 10);
    if (fund == undefined || isNaN(fund)) {
        return 0;
    } else {
        return fund;
    }
}

function getMidCapFund() {
    var fund = parseInt(document.forms["smartWealthBuilderForm"]["midcapFund"].value, 10);
    if (fund == undefined || isNaN(fund)) {
        return 0;
    } else {
        return fund;
    }
}

function getPureFund() {
    var fund = parseInt(document.forms["smartWealthBuilderForm"]["pureFund"].value, 10);
    if (fund == undefined || isNaN(fund)) {
        return 0;
    } else {
        return fund;
    }
}

function getYearsElapsedSinceInterception() {
    return parseInt(document.forms["smartWealthBuilderForm"]["yearsElapsedSinceInterception"].value, 10);
}

function getIsStaffDiscount() {
    return document.forms["smartWealthBuilderForm"]["staff_discount"].checked;
}

function fName() {
    return document.forms["smartWealthBuilderForm"]["first_name"].value;
}

function MName() {
    return document.forms["smartWealthBuilderForm"]["middle_name"].value;
}

function LName() {
    return document.forms["smartWealthBuilderForm"]["last_name"].value;
}


/* ******************************  FORM VALIDATION & SUBMIT **************************** */
function validatForm() {
    if (smartWealthBuilderForm.checkValidity() && this.validateGender('gender') && this.validateConfirmEmail() &&
        this.calculateAge(self.getDOB(), 'age', 'ageErrId') && this.validateMobileNo(self.getMobileNo()) &&
        this.validatePolicyTerm() && this.validateSAMF() && this.validatePremiumAmount() && this.validateTotalAllocation() &&
        this.validateYrsElapsedSinceInterception() && this.validateMaturityAge()) {
        if (this.getAge() < 18) {
            if (this.validateGender('proposerGender') && this.calculateAge(self.getProposerDOB(), 'proposer_age', 'propAgeErrId')) {
                this.calculatePremiumAPICall(); // form valid
            }
        } else {
            this.calculatePremiumAPICall(); // form valid
        }
    }
}

function getInput(forminputbyuser) {
    console.log('getInputXML Begin');
    let getInputXML = `<?xml version='1.0' encoding='utf-8' ?><smartWealthBuilder>
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
    <proposer_DOB>${this.getAge() < 18 ? this.getProposerDOB() : ''}</proposer_DOB>
    <proposer_age>${this.getAge() < 18 ? this.getProposerAge() : ''}</proposer_age>
    <proposer_gender>${this.getAge() < 18 ? this.getProposerGender() : ''}</proposer_gender>

    <product_name>${this.productDetails.title}</product_name>
    <product_Code>${this.productDetails.productCode}</product_Code>
    <product_UIN>${this.productDetails.uinNumber}</product_UIN>
    <product_cateogory>${product_cateogory}</product_cateogory>
    <product_type>${product_type}</product_type>

    <proposer_Is_Same_As_Life_Assured>${proposer_Is_Same_As_Life_Assured}</proposer_Is_Same_As_Life_Assured>
    <isStaff>${this.getIsStaffDiscount()}</isStaff>
    <age>${this.getAge()}</age>
    <gender>${this.getGender()}</gender>
    <SAMF>${this.getSAMF()}</SAMF>
    <plan>${this.getPlanType().title}</plan>
    <premFreqMode>${this.getPlanType().value !== 0 ? this.getPremiumFrequency().title : ''}</premFreqMode>
    <premPayingTerm>${this.getPlanType().value == 2 ? this.getPremiumPayingTerm() : ''}</premPayingTerm>
    <proposerAge>${this.getProposerAge()}</proposerAge>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <premiumAmount>${this.getPremiumAmount()}</premiumAmount>
    <noOfYrElapsed>${this.getYearsElapsedSinceInterception()}</noOfYrElapsed>
    <perInvEquityFund>${this.getEquityFund()}</perInvEquityFund>
    <perInvEquityOptimiserFund>${this.getEquityOptimiserFund()}</perInvEquityOptimiserFund>
    <perInvgrowthFund>${this.getGrowthFund()}</perInvgrowthFund>
    <perInvBalancedFund>${this.getBalancedFund()}</perInvBalancedFund>
    <perInvBondFund>${this.getBondFund()}</perInvBondFund>
    <perInvMoneyMarketFund>${this.getMoneyMarketFund()}</perInvMoneyMarketFund>
    <perInvTop300Fund>${this.getTop300Fund()}</perInvTop300Fund>
    <perInvBondOptimiserFund>${this.getBondOptimiserFund()}</perInvBondOptimiserFund>
    <perInvCorporateBondFund>${this.getCorporateBondFund()}</perInvCorporateBondFund>
    <perInvMidcapFund>${this.getMidCapFund()}</perInvMidcapFund>
    <perInvPureFund>${this.getPureFund()}</perInvPureFund>
    <KFC>${forminputbyuser.KFC}</KFC>
  </smartWealthBuilder>`;
    console.log('getInputXML End');
    return getInputXML;
}

function calculatePremiumAPICall() {
    let xmlBodyParam = `<getPremiumSmartWealthBuilder xmlns="http://tempuri.org/">
    <isStaff>${this.getIsStaffDiscount()}</isStaff>
    <age>${this.getAge()}</age>
    <gender>${this.getGender()}</gender>
    <plan>${this.getPlanType().title}</plan>
    <premFreqMode>${this.getPlanType().value !== 0 ? this.getPremiumFrequency().title : 'Single'}</premFreqMode>
    <premPayingTerm>${this.getPlanType().value === 2 ? this.getPremiumPayingTerm() : 1}</premPayingTerm>
    <proposerAge>${this.getAge() < 18 ? this.getProposerAge() : 0}</proposerAge>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <premiumAmount>${this.getPremiumAmount()}</premiumAmount>
    <SAMF>${this.getSAMF()}</SAMF>
    <noOfYrElapsed>${this.getYearsElapsedSinceInterception()}</noOfYrElapsed>
    <perInvEquityFund>${this.getEquityFund()}</perInvEquityFund>
    <perInvEquityOptimiserFund>${this.getEquityOptimiserFund()}</perInvEquityOptimiserFund>
    <perInvgrowthFund>${this.getGrowthFund()}</perInvgrowthFund>
    <perInvBalancedFund>${this.getBalancedFund()}</perInvBalancedFund>
    <perInvBondFund>${this.getBondFund()}</perInvBondFund>
    <perInvMoneyMarketFund>${this.getMoneyMarketFund()}</perInvMoneyMarketFund>
    <perInvTop300Fund>${this.getTop300Fund()}</perInvTop300Fund>
    <KFC>${getKerlaDiscount()}</KFC>
    <perInvBondOptimiserFund>${getBondOptimiserFund()}</perInvBondOptimiserFund>
    <perInvMidcapFund>${getMidCapFund()}</perInvMidcapFund>
    <perInvPureFund>${getPureFund()}</perInvPureFund>
    <perInvCorpBondFund>${getCorporateBondFund()}</perInvCorpBondFund>
  </getPremiumSmartWealthBuilder>`;


    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        ${xmlBodyParam}
                    </soap:Body>
                </soap:Envelope>`;

    console.log("xmlBodyParam = ", body)
    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {

        let staffDiscount = "";
        if (self.getIsStaffDiscount()) {
            staffDiscount = "Yes";
        } else {
            staffDiscount = "No";
        }

        const basicSA = parseInt(self.getPremiumAmount()) * parseInt(self.getSAMF());

        var planCode = "";

        if (self.getPlanType().title === ("Regular"))
            planCode = "UPS2RP0";
        else
            planCode = "UPS2LP0";

        var str_prem_paying_term = '';
        var mode_frequency = '';
        var payingTerm = "";
        var PlanType = "";
        if (this.getPlanType().value === 0) {
            PlanType = "Amount of Installment Premium ";
            payingTerm = "1 Year";
            str_prem_paying_term = "One time at the inception of the policy";
            mode_frequency = "One time at the inception of the policy";
        } else if (this.getPlanType().value === 1) {
            PlanType = "Amount of Installment Premium ";
            payingTerm = getPolicyTerm() + " Years";
            str_prem_paying_term = "One time at the inception of the policy";
            mode_frequency = "One time at the inception of the policy";
        } else {
            PlanType = "Amount of Installment Premium ";
            payingTerm = getPremiumPayingTerm() + " Years";
            str_prem_paying_term = payingTerm;
            mode_frequency = "Yearly";
        }

        let forminputbyuser = {
            staffDiscount: staffDiscount,
            ageEntry: self.getAge(),
            gender: self.getGender(),
            premiumPayingTerm: this.getPlanType().value == 2 ? this.getPremiumPayingTerm() : 1,
            PremPayingTerm: 0,
            plan: self.getPlanType().title,
            percentBalancedFund: self.getBalancedFund(),
            percentBondFund: self.getBondFund(),
            percentMoneyMarketFund: self.getMoneyMarketFund(),
            percentTop300Fund: self.getTop300Fund(),
            percentEquityFund: self.getEquityFund(),
            percentEquityOptimiserFund: self.getEquityOptimiserFund(),
            percentGrowthFund: self.getGrowthFund(),
            percentBondOptimiserFund: self.getBondOptimiserFund(),
            percentMidCapFund: self.getMidCapFund(),
            percentPureFund: self.getPureFund(),
            percentCorporateBondFund: self.getCorporateBondFund(),
            premiumAmount: self.getPremiumAmount(),
            policyTerm: self.getPolicyTerm(),
            numberOfYear: self.getYearsElapsedSinceInterception(),
            LaDOB: getDDMMYYYY(self.getDOB()),
            ProposerDOB: getDDMMYYYY(self.getProposerDOB()),
            quotationNumber: quotNumber,
            staffDiscount: staffDiscount,
            PlanName: self.productDetails.title,
            CustTitle: self.getTitle(),
            CustFirstName: self.fName(),
            CustMiddleName: self.MName(),
            CustLastName: self.LName(),
            CustMobile: self.getMobileNo(),
            CustEmailID: self.getEmail(),
            BasicSA: basicSA,
            TotalPremAmt: self.getPremiumAmount(),
            Frequency: this.getPlanType().value !== 0 ? this.getPremiumFrequency().title : '',
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTermStr: str_prem_paying_term,
            PlanCode: planCode,
            KFC: getKerlaDiscount() ? "Y" : "N",
            userType: getUserType(),
            planType: PlanType,
            modeFrequency: mode_frequency
        };

        if (getAge() < 18) {
            forminputbyuser.lifeAssured = self.getTitle() + " " + self.fName() + " " + self.MName() + " " + self.LName();
            forminputbyuser.proposerName = self.getProposerTitle() + " " + self.getProposerFName() + " " + self.getProposerMName() + " " + self.getProposerLName();
            forminputbyuser.proposerAge = self.getProposerAge();
        } else {
            forminputbyuser.proposerName = self.getTitle() + " " + self.fName() + " " + self.MName() + " " + self.LName();
            forminputbyuser.lifeAssured = forminputbyuser.proposerName;
            forminputbyuser.proposerAge = forminputbyuser.ageEntry;
        }

        self.showLoader();
        console.log(" ");


        let inputXml = getInput(forminputbyuser)
        self.ApiCallService('/getPremiumSmartWealthBuilder', body, '<smartWealthBuilder>', '</smartWealthBuilder>', true).then((data) => {
            self.hideLoader();


            data = data.smartWealthBuilder;
            if (data == undefined) {
                alert("Something went worng. Please try again later")
                return;
            }
            console.log("data1", data)
            data.productDetails = self.productDetails;
            console.log("data2", data)
            var stringifyJson = JSON.stringify(data);

            //Added by sonali
            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</CommIfPay8Pr${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</CommIfPay8Pr${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                var index = forminputbyuser.PolicyTerm;
                var matNonGuar4pa = parseXmlTag(premiumCalcXMLResponse, "FundValAtEnd4Pr" + index + "");
                var matNonGuar8pa = parseXmlTag(premiumCalcXMLResponse, "FundValAtEnd8Pr" + index + "");
                var FundValAtEnd = '';
                FundValAtEnd = "<FundValAtEnd4Pr" + index + ">" + matNonGuar4pa + "</FundValAtEnd4Pr" + index + ">";
                FundValAtEnd += "<FundValAtEnd8Pr" + index + ">" + matNonGuar8pa + "</FundValAtEnd8Pr" + index + ">";
                remaningOutput = remaningOutput + FundValAtEnd + "</smartWealthBuilder>";
                let output = appendXMLTagAtStart(remaningOutput);

                let escapedBIOutput = escapeInputHTML(output);
                sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.

                let escapedBIInput = escapeInputHTML(inputXml);
                sessionStorage.setItem("BIInput", escapedBIInput); // BI Input.

            }
            //end
            if (data.errCode != undefined && data.errCode == 1) {
                alert("Something went worng. Please try again later")
            } else {
                if (sessionStorage.ThroughNeedAnalysis) {
                    let status = sessionStorage.getItem('ThroughNeedAnalysis');

                    if (status === 'Yes') {
                        //added by bharamu
                        updateDataInDB(forminputbyuser).then((resolve) => {
                            if (resolve == "1") {
                                createPDFGeneralMethod(this.productDetails, data, forminputbyuser)
                            } else {
                                alert("Something Went Wrong")
                            }

                        });

                    } else if (status === 'No') {
                        sessionStorage.setItem("premiumCalcResponse", stringifyJson);
                        window.location.href = "../../PremiumCalSuccess/success.html";
                    }
                }
            }
        }).catch((error) => {
            console.log(" in error ", error);
            self.hideLoader();
        });
    }).catch((message) => {
        console.log(" in error ", message);
        alert("Unable to generate quotation number");
        hideLoader();
    });
}