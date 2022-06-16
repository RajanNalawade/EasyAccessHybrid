window.onload = function () {
    this.ready();
    setKerlaDiscount();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails;

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    // self.hideLoader();
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
    this.initArrayList();
};

function initializeData() {
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
    this.document.getElementById('premiumAmountId').innerHTML = `Premium Amount (Min Rs. ${limitedPlanPremiumFrequencyMode[0].minPremiumAmount})`;
    // this.document.getElementById('samfId').innerHTML = ``;
}

function initArrayList() {
    policyListElement = document.forms["smartPrivilegeForm"]["policyTerm"];
    for (i = minPolicyTerm; i <= maxPolicyTerm; i++) {
        policyListElement.add(new Option(i));
    }

    planElement = document.forms["smartPrivilegeForm"]["plan"];
    for (i = 0; i < planType.length; i++) {
        planElement.add(new Option(planType[i].title, planType[i].value));
    }

    premiumFrequencyElement = document.forms["smartPrivilegeForm"]["premiumFrequency"];
    for (i = 0; i < limitedPlanPremiumFrequencyMode.length; i++) {
        premiumFrequencyElement.add(new Option(limitedPlanPremiumFrequencyMode[i].title, limitedPlanPremiumFrequencyMode[i].value));
    }

    premiumPayingTermElement = document.forms["smartPrivilegeForm"]["premiumPayingTerm"];
    for (i = minPremiumPayingTerm; i <= maxPremiumPayingTerm; i++) {
        premiumPayingTermElement.add(new Option(i, i));
    }

    this.calculateAge('', 'start', '');
    this.onPlanUpdate(1);
    this.onViewSFINFundsUpdate();
}

/* ***************** DOM EVENTS **************** */
function validateGender() {
    var gender = document.forms["smartPrivilegeForm"]["gender"].value;
    if (gender !== "Female" && gender !== "Male" && gender !== "Third Gender") {
        document.getElementById('genderErrId').style.display = "block";
        document.getElementById('genderErrId').innerHTML = "Please select your gender.";
        return false;
    } else {
        document.getElementById('genderErrId').style.display = "none";
        return true
    }
}

function validateProposerGender() {
    if (this.getAge() >= minAgeLimit && this.getAge() < 18) {



        var proposerGender = document.forms["smartPrivilegeForm"]["proposerGender"].value;

        document.forms["smartPrivilegeForm"]["proposer_title"].options[0].disabled = false;

        document.forms["smartPrivilegeForm"]["proposer_title"].options[1].disabled = false;

        document.forms["smartPrivilegeForm"]["proposer_title"].options[2].disabled = false;


        if (proposerGender === "Male") {


            document.forms["smartPrivilegeForm"]["proposer_title"].value = "Mr.";

            document.forms["smartPrivilegeForm"]["proposer_title"].options[1].disabled = true;

            document.forms["smartPrivilegeForm"]["proposer_title"].options[2].disabled = true;


        } else if (proposerGender === "Female") {

            document.forms["smartPrivilegeForm"]["proposer_title"].value = "Mrs.";

            document.forms["smartPrivilegeForm"]["proposer_title"].options[0].disabled = true;

        } else if (proposerGender === "Third Gender") {

            document.forms["smartPrivilegeForm"]["proposer_title"].value = "Mr.";

        }


        if (proposerGender !== "Female" && proposerGender !== "Male" && proposerGender !== "Third Gender") {

            document.getElementById("proposerGenderErrorId").style.display = "block";

            document.getElementById("proposerGenderErrorId").innerHTML =

                "Please select Proposer gender.";

            return false;

        } else {

            document.getElementById("proposerGenderErrorId").style.display = "none";

            return true;

        }

    } else {
        return true;
    }
}

function calculateAge(birthday, formElementName, errElementId) {
    var age = getAgeFromBirthdate(getDDMMYYYY(birthday));
    if (age >= minAgeLimit && age < 18 && formElementName !== 'start') {
        proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
        for (i = 0; i < proposerBlocks.length; i++) {
            proposerBlocks[i].style.display = "block";
        }
        is_same_as_proposer = "N";
        document.forms["smartPrivilegeForm"]["proposer_first_name"].required = true;
        document.forms["smartPrivilegeForm"]["proposer_last_name"].required = true;
        document.forms["smartPrivilegeForm"]["proposer_dob"].required = true;
    } else if (formElementName !== 'proposer_age') {
        proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
        for (i = 0; i < proposerBlocks.length; i++) {
            proposerBlocks[i].style.display = "none";
        }
        is_same_as_proposer = "Y";
        document.forms["smartPrivilegeForm"]["proposer_first_name"].required = false;
        document.forms["smartPrivilegeForm"]["proposer_last_name"].required = false;
        document.forms["smartPrivilegeForm"]["proposer_dob"].required = false;
    }

    if (formElementName === 'start') {
        formElementName = 'age';
    }

    document.forms["smartPrivilegeForm"][formElementName].innerHTML = age;
    document.forms["smartPrivilegeForm"][formElementName].value = age;
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

function onPlanUpdate(planIndex) {
    var planSelected = planType[planIndex - 1];
    var premiumFrequencyDiv = document.getElementById('premiumFrequencyDivId');
    var premiumPayingTermDiv = document.getElementById('premiumPayingTermDivId');

    if (planSelected.showPremiumFreqeuncyMode) {
        premiumFrequencyDiv.style.display = "block";
        document.forms["smartPrivilegeForm"]["premiumFrequency"].required = true;
    } else {
        premiumFrequencyDiv.style.display = "none";
        document.forms["smartPrivilegeForm"]["premiumFrequency"].required = false;
    }

    if (planSelected.showPremiumPayingTerm) {
        premiumPayingTermDiv.style.display = "block";
        document.forms["smartPrivilegeForm"]["premiumPayingTerm"].required = true;
    } else {
        premiumPayingTermDiv.style.display = "none";
        document.forms["smartPrivilegeForm"]["premiumPayingTerm"].required = false;
    }
}

function onViewSFINFundsUpdate() {
    var isViewSFINFundsChecked = document.forms["smartPrivilegeForm"]["viewSFINFUnds"].checked;
    if (isViewSFINFundsChecked) {
        document.getElementById('isToSFINFunds').style.display = "block";
    } else {
        document.getElementById('isToSFINFunds').style.display = "none";
    }
}

function validateAgeForSinglePlan() {
    if (this.getPlan().value === 1 && this.getAge() < 13) {
        document.getElementById('ageForSinglePlanErrId').style.display = "block";
        document.getElementById('ageForSinglePlanErrId').innerHTML = `Life Assured Date of Birth Must Be Greater than 13 years for Single Plan.`;
        return false;
    }
    document.getElementById('ageForSinglePlanErrId').style.display = "none";
    return true;
}

function validateTotalAllocation() {
    if (this.getEquityFund() + this.getEquityOptimiserFund() + this.getGrowthFund() + this.getBalancedFund() + this.getBondFund() +
        this.getPureFund() + this.getTop300Fund() + this.getMidcapFund() + this.getBondOptimiserFund() + this.getMoneyMarketFund() +
        this.getCorporateBondFund() !== 100) {
        document.getElementById('totalAllocationErrId').style.display = 'block';
        document.getElementById('totalAllocationErrId').innerHTML = `Total sum of % to be invested for all fund should be equal to 100.`;
        return false;
    }
    document.getElementById('totalAllocationErrId').style.display = 'none';
    return true;
}

function validatePolicyTerm() {
    if (this.getPlan().value === 3 || this.getPlan().value === 2) {
        minPolicyTerm = Math.max(10, 18 - this.getAge());
    } else {
        minPolicyTerm = Math.max(5, 18 - this.getAge());
    }
    maxPolicyTerm = Math.min(30, (70 - this.getAge()));
    if (this.getPolicyTerm() < minPolicyTerm || this.getPolicyTerm() > maxPolicyTerm) {
        document.getElementById('policyTermErrId').style.display = "block";
        document.getElementById('policyTermErrId').innerHTML = `Policy Term should be in between ${minPolicyTerm} Years to ${maxPolicyTerm} Years.`;
        return false;
    }
    document.getElementById('policyTermErrId').style.display = "none";
    return true;
}

function validatePremiumAmount() {
    var minPremiumAmount = 0;
    if (this.getPlan().value === 1) {
        minPremiumAmount = 600000;
    } else if (this.getPlan().value === 3 || this.getPlan().value === 2) {
        minPremiumAmount = this.getPremiumFrequency().minPremiumAmount;
    }
    if (this.getPremiumAmount() === undefined || this.getPremiumAmount() === null) {
        document.getElementById('premiumAmountErrId').style.display = 'block';
        document.getElementById('premiumAmountErrId').innerHTML = `Please enter Premium Amount in Rs.`;
        return false;
    } else if (this.getPremiumAmount() % 100 !== 0) {
        document.getElementById('premiumAmountErrId').style.display = 'block';
        document.getElementById('premiumAmountErrId').innerHTML = `Premium Amount should be multiple of 100.`;
        return false;
    } else if (this.getPremiumAmount() < minPremiumAmount) {
        document.getElementById('premiumAmountErrId').style.display = 'block';
        document.getElementById('premiumAmountErrId').innerHTML = `Premium Amount should be greater than Rs. ${minPremiumAmount}`;
        return false;
    }
    document.getElementById('premiumAmountErrId').style.display = 'none';
    return true;
}

function validateSAMF() {
    if (isNaN(this.getSAMF()) || this.getSAMF() === undefined || this.getSAMF() === null) {
        document.getElementById('samfErrId').style.display = 'block';
        document.getElementById('samfErrId').innerHTML = `Please enter Sum Assured Multiple Factor[SAMF]`;
        return false;
    } else {
        if (this.getPlan().value === 1) {
            minSAMF = 1.25;
            // if (this.getAge() >= 0 && this.getAge() <= 44) {
            //   minSAMF = 1.25;
            // } else if (this.getAge() >= 45 && this.getAge() <= 55){
            //   minSAMF = 1.1;
            // }
            // maxSAMF = 1.25;
        }
        //   else if (this.getPlan().value === 3 || this.getPlan().value === 2) {
        //     minSAMF = Math.max(10, (0.5 * this.getPolicyTerm()));
        //     maxSAMF = Math.max(10, (0.5 * this.getPolicyTerm()));
        //   }
        else if (this.getPlan().value === 3 || this.getPlan().value === 2) {
            minSAMF = 10;
        }

        //   if (getSAMF() < minSAMF || getSAMF() > maxSAMF) {
        //       document.getElementById('samfErrId').style.display = 'block';
        //       document.getElementById('samfErrId').innerHTML = `Sum Assured Multiple Factor (SAMF) should be in the range of  ${minSAMF} to ${maxSAMF}.`;
        //       return false;
        //     }

        if (getSAMF() != minSAMF) {
            document.getElementById('samfErrId').style.display = 'block';
            document.getElementById('samfErrId').innerHTML = `Sum Assured Multiple Factor (SAMF) should be ${minSAMF}.`;
            return false;
        }

    }
    document.getElementById('samfErrId').style.display = 'none';
    return true;
}


/* ***********************   GETTERS ************************* */
function getAge() {
    return parseInt(document.forms["smartPrivilegeForm"]["age"].value, 10);
}

function getProposerAge() {
    return parseInt(document.forms["smartPrivilegeForm"]["proposer_age"].value, 10);
}

function getEmail() {
    return document.forms["smartPrivilegeForm"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["smartPrivilegeForm"]["confirmEmail"].value;
}

function getDOB() {
    return document.forms["smartPrivilegeForm"]["dob"].value;
}

function getProposerDOB() {
    return document.forms["smartPrivilegeForm"]["proposer_dob"].value;
}

function getMobileNo() {
    return document.forms["smartPrivilegeForm"]["mobile"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["smartPrivilegeForm"]["policyTerm"].value, 10);
}

function getPremiumAmount() {
    return parseInt(document.forms["smartPrivilegeForm"]["premiumAmount"].value, 10);
}

function getPremiumPayingTerm() {
    return document.forms["smartPrivilegeForm"]["premiumPayingTerm"].value;
}

function getPlan() {
    var index = document.forms["smartPrivilegeForm"]["plan"].value;
    return planType[index - 1];
}

function getPremiumFrequency() {
    var index = document.forms["smartPrivilegeForm"]["premiumFrequency"].value;
    return limitedPlanPremiumFrequencyMode[index - 1];
}

function getSAMF() {
    return parseFloat(document.forms["smartPrivilegeForm"]["samf"].value);
}

function getGender() {
    return document.forms["smartPrivilegeForm"]["gender"].value;
}

function getProposerGender() {
    return document.forms["smartPrivilegeForm"]["proposerGender"].value;
}

function getIsStaffDiscount() {
    return document.forms["smartPrivilegeForm"]["staff_discount"].checked;
}

function getEquityFund() {
    var fund = parseInt(document.forms["smartPrivilegeForm"]["equityFund"].value, 10);
    if (isNaN(fund) || fund == undefined || fund == 0 || fund == "") {
        return 0;
    } else {
        return fund;
    }
}

function getEquityOptimiserFund() {
    var fund = parseInt(document.forms["smartPrivilegeForm"]["optimiserFund"].value, 10);
    if (isNaN(fund) || fund == undefined || fund == 0 || fund == "") {
        return 0;
    } else {
        return fund;
    }
}

function getGrowthFund() {
    var fund = parseInt(document.forms["smartPrivilegeForm"]["growthFund"].value, 10);
    if (isNaN(fund) || fund == undefined || fund == 0 || fund == "") {
        return 0;
    } else {
        return fund;
    }
}

function getBalancedFund() {
    var fund = parseInt(document.forms["smartPrivilegeForm"]["balancedFund"].value, 10);
    if (isNaN(fund) || fund == undefined || fund == 0 || fund == "") {
        return 0;
    } else {
        return fund;
    }
}

function getBondFund() {
    var fund = parseInt(document.forms["smartPrivilegeForm"]["bondFund"].value, 10);
    if (isNaN(fund) || fund == undefined || fund == 0 || fund == "") {
        return 0;
    } else {
        return fund;
    }
}

function getTop300Fund() {
    var fund = parseInt(document.forms["smartPrivilegeForm"]["top300Fund"].value, 10);
    if (isNaN(fund) || fund == undefined || fund == 0 || fund == "") {
        return 0;
    } else {
        return fund;
    }
}
	
function getPureFund() {
    var fund = parseInt(document.forms["smartPrivilegeForm"]["pureFund"].value, 10);
    if (isNaN(fund) || fund == undefined || fund == 0 || fund == "") {
        return 0;
    } else {
        return fund;
    }
}

function getMidcapFund() {
    var fund = parseInt(document.forms["smartPrivilegeForm"]["midCapFund"].value, 10);
    if (isNaN(fund) || fund == undefined || fund == 0 || fund == "") {
        return 0;
    } else {
        return fund;
    }
}

function getBondOptimiserFund() {
    var fund = parseInt(document.forms["smartPrivilegeForm"]["bondOptimiserFund"].value, 10);
    if (isNaN(fund) || fund == undefined || fund == 0 || fund == "") {
        return 0;
    } else {
        return fund;
    }
}

function getMoneyMarketFund() {
    var fund = parseInt(document.forms["smartPrivilegeForm"]["moneyMarketFund"].value, 10);
    if (isNaN(fund) || fund == undefined || fund == 0 || fund == "") {
        return 0;
    } else {
        return fund;
    }
}

function getCorporateBondFund() {
    var fund = parseInt(document.forms["smartPrivilegeForm"]["corporateBondFund"].value, 10);
    if (isNaN(fund) || fund == undefined || fund == 0 || fund == "") {
        return 0;
    } else {
        return fund;
    }
}

function fName() {
    return document.forms["smartPrivilegeForm"]["first_name"].value;
}

function MName() {
    return document.forms["smartPrivilegeForm"]["middle_name"].value;
}

function LName() {
    return document.forms["smartPrivilegeForm"]["last_name"].value;
}

function getProposerFName() {
    return document.forms["smartPrivilegeForm"]["proposer_first_name"].value;
}

function getProposerMName() {
    return document.forms["smartPrivilegeForm"]["proposer_middle_name"].value;
}

function getProposerLName() {
    return document.forms["smartPrivilegeForm"]["proposer_last_name"].value;
}

function getTitle() {
    return document.forms["smartPrivilegeForm"]["title"].value;
}

function getProposerTitle() {
    return document.forms["smartPrivilegeForm"]["proposer_title"].value;
}

/* ******************************  FORM VALIDATION & SUBMIT **************************** */
function validatForm() {
    if (smartPrivilegeForm.checkValidity() && this.validateGender() && this.validateConfirmEmail() &&
        this.calculateAge(self.getDOB(), 'age', 'ageErrId') && this.validateMobileNo(self.getMobileNo()) &&
        this.validateAgeForSinglePlan() && this.validatePolicyTerm() && this.validatePremiumAmount() &&
        this.validateSAMF() && this.validateTotalAllocation() && this.validateProposerGender()) {
        if (this.getAge() < 18) {
            if (this.calculateAge(self.getProposerDOB(), 'proposer_age', 'proposerAgeErrId')) {
                console.log("submit if");
                this.calculatePremiumAPICall(); // form valid
            }
        } else {
            console.log("submit else");
            this.calculatePremiumAPICall(); // form valid
        }
    }
}

function getInput(forminputbyuser) {
    console.log('getInputXML Begin');
    let getInputXML = `<?xml version='1.0' encoding='utf-8' ?><smartPrivilege>
    <LifeAssured_title>${this.getTitle()}</LifeAssured_title>
    <LifeAssured_firstName>${this.fName()}</LifeAssured_firstName>
    <LifeAssured_middleName>${this.MName()}</LifeAssured_middleName>
    <LifeAssured_lastName>${this.LName()}</LifeAssured_lastName>
    <LifeAssured_DOB>${getDDMMYYYY(this.getDOB())}</LifeAssured_DOB>
    <LifeAssured_age>${this.getAge()}</LifeAssured_age>
    <gender>${this.getGender()}</gender>

    <proposer_title>${this.getAge() < 18 ? this.getProposerTitle() : ''}</proposer_title>
    <proposer_firstName>${this.getAge() < 18 ? this.getProposerFName() : ''}</proposer_firstName>
    <proposer_middleName>${this.getAge() < 18 ? this.getProposerMName() : ''}</proposer_middleName>
    <proposer_lastName>${this.getAge() < 18 ? this.getProposerLName() : ''}</proposer_lastName>
    <proposer_DOB>${this.getAge() < 18 ? getDDMMYYYY(this.getProposerDOB()) : ''}</proposer_DOB>
    <proposer_age>${this.getAge() < 18 ? this.getProposerAge() : ''}</proposer_age>
    <proposer_gender>${this.getAge() < 18 ? this.getGender() : ''}</proposer_gender>

    <product_name>${this.productDetails.title}</product_name>
    <product_Code>${this.productDetails.productCode}</product_Code>
    <product_UIN>${this.productDetails.uinNumber}</product_UIN>
    <product_cateogory>${product_cateogory}</product_cateogory>
    <product_type>${product_type}</product_type>

    <proposer_Is_Same_As_Life_Assured>${is_same_as_proposer}</proposer_Is_Same_As_Life_Assured>
    <str_kerla_discount>${getKerlaDiscount()?"Yes":"No"}</str_kerla_discount>
    <isStaff>${this.getIsStaffDiscount()}</isStaff>
    <age>${this.getAge()}</age>
    <SAMF>${this.getSAMF()}</SAMF>
    <plan>${this.getPlan().title}</plan>
    <premFreqMode>${this.getPlan().value !== 1 ? this.getPremiumFrequency().title : ''}</premFreqMode>
    <premPayingTerm>${this.getPlan().value === 3 ? this.getPremiumPayingTerm() : ''}</premPayingTerm>
    <proposerAge>${this.getAge() < 18 ? this.getProposerAge() : ''}</proposerAge>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <premiumAmount>${this.getPremiumAmount()}</premiumAmount>
    <noOfYrElapsed></noOfYrElapsed>
    <perInvEquityFund>${this.getEquityFund()}</perInvEquityFund>
    <perInvEquityOptimiserFund>${this.getEquityOptimiserFund()}</perInvEquityOptimiserFund>
    <perInvgrowthFund>${this.getGrowthFund()}</perInvgrowthFund>
    <perInvBalancedFund>${this.getBalancedFund()}</perInvBalancedFund>
    <perInvBondFund>${this.getBondFund()}</perInvBondFund>
    <perInvTop300Fund>${this.getTop300Fund()}</perInvTop300Fund>
    <perInvPureFund>${this.getPureFund()}</perInvPureFund>
    <perInvMidcapFund>${this.getMidcapFund()}</perInvMidcapFund>
    <perInvbondOptimiserFund2>${this.getBondOptimiserFund()}</perInvbondOptimiserFund2>
    <perInvCorporateBondFund>${this.getCorporateBondFund()}</perInvCorporateBondFund>
    <perInvmoneyMarketFund2>${this.getMoneyMarketFund()}</perInvmoneyMarketFund2>
    <KFC>${forminputbyuser.KFC}</KFC>
    <Product_Cat></Product_Cat>
  </smartPrivilege>`;
    console.log('getInputXML End');
    return getInputXML;
}

function calculatePremiumAPICall() {

    self.showLoader();
    let xmlBodyParam = `<getPremiumSmartPrivilege xmlns="http://tempuri.org/">
    <isStaff>${this.getIsStaffDiscount()}</isStaff>
    <age>${this.getAge()}</age>
    <gender>${this.getGender()}</gender>
    <plan>${this.getPlan().title}</plan>
    <premFreqMode>${this.getPlan().value !== 1 ? this.getPremiumFrequency().title : ''}</premFreqMode>
    <premPayingTerm>${this.getPlan().value === 3  ? this.getPremiumPayingTerm() : ''}</premPayingTerm>
    <proposerAge>${this.getAge() < 18 ? this.getProposerAge() : ''}</proposerAge>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <premiumAmount>${this.getPremiumAmount()}</premiumAmount>
    <SAMF>${this.getSAMF()}</SAMF>
    <perInvEquityFund>${this.getEquityFund()}</perInvEquityFund>
    <perInvEquityOptimiserFund>${this.getEquityOptimiserFund()}</perInvEquityOptimiserFund>
    <perInvgrowthFund>${this.getGrowthFund()}</perInvgrowthFund>
    <perInvBalancedFund>${this.getBalancedFund()}</perInvBalancedFund>
    <perInvBondFund>${this.getBondFund()}</perInvBondFund>
    <perInvMidCapFund>${this.getMidcapFund()}</perInvMidCapFund>
    <perInvPureFund>${this.getPureFund()}</perInvPureFund>
    <perInvTop300Fund>${this.getTop300Fund()}</perInvTop300Fund>
    <KFC>${getKerlaDiscount()}</KFC>
    <perInvBondOptimiserFundII>${this.getBondOptimiserFund()}</perInvBondOptimiserFundII>
    <perInvMoneyMarketFundII>${this.getMoneyMarketFund()}</perInvMoneyMarketFundII>
    <perInvCorpBondFund>${this.getCorporateBondFund()}</perInvCorpBondFund>
  </getPremiumSmartPrivilege>`;

    let body = `<?xml version="1.0" encoding="utf-8"?>
                    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        ${xmlBodyParam}
                    </soap:Body>
                </soap:Envelope>`;
    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {

        var productCode = "2B";
        let forminputbyuser = {
            staff_discount: self.getIsStaffDiscount(),
            proposerName: self.getTitle() + " " + self.fName() + " " + self.MName() + " " + self.LName(),
            age: self.getAge(),
            gender: self.getGender(),
            planOption: self.getPlan().title,
            premiumFrequency: this.getPlan().value !== 1 ? this.getPremiumFrequency().title : '',
            premiumPayingTerm: this.getPlan().value === 3 ? this.getPremiumPayingTerm() : '',
            proposerAge: this.getAge() < 18 ? this.getProposerAge() : '',
            policyTerm: self.getPolicyTerm(),
            premiumAmount: self.getPremiumAmount(),
            samf: self.getSAMF(),
            perInvEquityFund: this.getEquityFund(),
            perInvEquityOptimiserFund: this.getEquityOptimiserFund(),
            perInvgrowthFund: this.getGrowthFund(),
            perInvBalancedFund: this.getBalancedFund(),
            perInvBondFund: this.getBondFund(),
            perInvMidCapFund: this.getMidcapFund(),
            perInvPureFund: this.getPureFund(),
            perInvTop300Fund: this.getTop300Fund(),
            perInvbondOptimiserFund2: this.getBondOptimiserFund(),
            perInvMoneyMarketFundII: this.getMoneyMarketFund(),
            perInvCorporateBondFund: this.getCorporateBondFund(),
            quotationNumber: quotNumber,
            PlanName: self.productDetails.title,
            staffDiscount: self.getIsStaffDiscount() ? "Yes" : "No",
            CustTitle: self.getTitle(),
            CustFirstName: self.fName(),
            CustMiddleName: self.MName(),
            CustLastName: self.LName(),
            CustMobile: self.getMobileNo(),
            CustEmailID: self.getEmail(),
            LaDOB: getDDMMYYYY(self.getDOB()),
            ProposerDOB: getDDMMYYYY(self.getProposerDOB()),
            TotalPremAmt: self.getPremiumAmount(),
            Frequency: this.getPlan().value !== 1 ? this.getPremiumFrequency().title : 'Single',
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: '0',
            PlanCode: productCode,
            KFC: getKerlaDiscount() ? "Y" : "N",
            userType: getUserType(),
            proposer_Is_Same_As_Life_Assured: is_same_as_proposer
        };

        if (self.getAge() < 18) {
            forminputbyuser.lifeAssured = self.getTitle() + " " + self.fName() + " " + self.MName() + " " + self.LName();
            forminputbyuser.proposerName = self.getProposerTitle() + " " + self.getProposerFName() + " " + self.getProposerMName() + " " + self.getProposerLName();
        }

        let inputXml = getInput(forminputbyuser)
        self.ApiCallService('/getPremiumFlexiSmartPlus', body, '<smartPrivilege>', '</smartPrivilege>', true).then((data) => {
            self.hideLoader();
            data = data.smartPrivilege;
            forminputbyuser.BasicSA = data.sumAssured;
            data.productDetails = self.productDetails;
            var stringifyJson = JSON.stringify(data);

            //Added by sonali
            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</CommIfPay8Pr${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</CommIfPay8Pr${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                remaningOutput += `<staffStatus>${forminputbyuser.staff_discount?"sbi":"none"}</staffStatus>`;
                remaningOutput += `<staffRebate>0</staffRebate>`;
                remaningOutput += `<OccuInt></OccuInt>`;
                var index = forminputbyuser.PolicyTerm;
                var FundValAtEnd4Pr = parseXmlTag(premiumCalcXMLResponse, "FundValAtEnd4Pr" + index + "");
                var FundValAtEnd8Pr = parseXmlTag(premiumCalcXMLResponse, "FundValAtEnd8Pr" + index + "");
                var FundValAtEnd = '';
                FundValAtEnd = "<FundValAtEnd4Pr" + index + ">" + FundValAtEnd4Pr + "</FundValAtEnd4Pr" + index + ">";
                FundValAtEnd += "<FundValAtEnd8Pr" + index + ">" + FundValAtEnd8Pr + "</FundValAtEnd8Pr" + index + ">";
                remaningOutput = remaningOutput + FundValAtEnd + "</smartPrivilege>"
                remaningOutput = `<?xml version='1.0' encoding='utf-8' ?>` + remaningOutput;
                console.log("remaningOutput=", remaningOutput);
                let escapedBIOutput = escapeInputHTML(remaningOutput);
                sessionStorage.setItem("BIOutput", escapedBIOutput);
                let escapedBIInput = escapeInputHTML(inputXml);
                sessionStorage.setItem("BIInput", escapedBIInput);
            }
            //end
            if (sessionStorage.ThroughNeedAnalysis) {
                let status = sessionStorage.getItem('ThroughNeedAnalysis');

                if (status === 'Yes') {
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
        }).catch((error) => {
            console.log(" in error ", error);
            self.hideLoader();
        });

    }).catch((message) => {
        console.log("Quotation - ", message);
        alert("Unable to generate quotation number")
        self.hideLoader();
    });
}

function validateGender(formElementName) {
    //console.log("formElementName",formElementName)
    var laGender = document.forms["smartPrivilegeForm"]["gender"].value;
    //var proposerGender = document.forms["smartPrivilegeForm"]["proposerGender"].value;
    document.getElementById("lifeAssuredTitle").options[0].disabled = false;
    document.getElementById("lifeAssuredTitle").options[1].disabled = false;
    document.getElementById("lifeAssuredTitle").options[2].disabled = false;
    if (formElementName === "gender") {
        if (laGender === "Male") {
            document.getElementById("lifeAssuredTitle").options[1].disabled = true;
            document.getElementById("lifeAssuredTitle").options[2].disabled = true;
            document.getElementById("lifeAssuredTitle").options[0].selected = true;
        } else if (laGender === "Female") {
            document.getElementById("lifeAssuredTitle").options[0].disabled = true;
            document.getElementById("lifeAssuredTitle").options[1].disabled = false;
            document.getElementById("lifeAssuredTitle").options[2].disabled = false;
            document.getElementById("lifeAssuredTitle").options[1].selected = true;
        } else {
            document.getElementById("lifeAssuredTitle").options[0].disabled = false;
            document.getElementById("lifeAssuredTitle").options[1].disabled = false;
            document.getElementById("lifeAssuredTitle").options[2].disabled = false;
        }
    }
    if (laGender !== "Female" && laGender !== "Male" && laGender !== "Third Gender") {
        document.getElementById("genderErrId").style.display = "block";
        document.getElementById("genderErrId").innerHTML =
            "Please select your gender.";
        return false;
    } else {
        document.getElementById("genderErrId").style.display = "none";
        return true;
    }
}