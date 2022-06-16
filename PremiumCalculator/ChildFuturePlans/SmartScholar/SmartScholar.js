window.onload = function () {
    this.ready();
    //self.hideLoader();
};

/* ************* VARIABLE DECLARATION ************** */
var policyTermList = new Array();
//var premiumFrequencyModeList = new Array();
var productDetails;

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    this.hideErrMsg();
    this.initArrayList();
    this.productDetails = self.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
    this.setPremiumAmountTitle(getPolicyMode());
};

function hideErrMsg() {
    document.getElementById('maturityAgeErrId').style.display = "none";
    document.getElementById('samfErrId').style.display = "none";
    document.getElementById('confirmEmailErrId').style.display = "none";
    document.getElementById('ageErrId').style.display = "none";
    document.getElementById('mobileNoErrId').style.display = "block";
}

function initializeData() {
    //document.forms["smartScholarForm"]["dob"].value = (new Date()).toISOString().substr(0, 10);
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
}

function initArrayList() {
    policyListElement = document.forms["smartScholarForm"]["smartScholarPolicyTerm"];
    for (i = minPolicyTermLimit; i <= maxPolicyTermLimit; i++) {
        policyListElement.add(new Option(i));
    }
    premiumPaymentModeListElement = document.forms["smartScholarForm"]["smartScholarPremiumPaymentMode"];
    for (i = 0; i < premiumFrequencyModeList.length; i++) {
        premiumPaymentModeListElement.add(new Option(premiumFrequencyModeList[i].title, premiumFrequencyModeList[i].value));
    }

    termOptionListElement = document.forms["smartScholarForm"]["smartScholarTermOption"];
    for (i = minTermOption; i <= maxTermOption; i++) {
        termOptionListElement.add(new Option(i));
    }
}

// function getQueryStringDesializedData() {
// var queryString = decodeURIComponent(window.location.search);
// console.log(queryString)
// queryString = queryString.substring(1);
// var queries = queryString.split("&");
// return JSON.parse(queries[0].split("premiumCalcProductDetails").pop());
// }

function calculateChildAge(birthday) {
    var age = getAgeFromBirthdate(birthday);
    document.forms["smartScholarForm"]["age"].innerHTML = age;
    document.forms["smartScholarForm"]["age"].value = age;
    if (age < minAgeLimitForChild || age > maxAgeLimitForChild) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimitForChild} and ${maxAgeLimitForChild}.`;
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        return true;
    }
}

function calculateParentAge(parentBirthDate) {
    var age = getAgeFromBirthdate(parentBirthDate);
    document.forms["smartScholarForm"]["parentAge"].innerHTML = age;
    document.forms["smartScholarForm"]["parentAge"].value = age;
    if (age < minAgeLimitForProposer || age > maxAgeLimitForProposer) {
        self.setSAMFTitle();
        document.getElementById('parentAgeErrId').style.display = "block";
        document.getElementById('parentAgeErrId').innerHTML = `Age should be between ${minAgeLimitForProposer} and ${maxAgeLimitForProposer}.`;
        return false;
    } else {
        document.getElementById('parentAgeErrId').style.display = "none";
        return true;
    }
}

function validateChildGender() {
    var gender = document.forms["smartScholarForm"]["gender"].value;
    document.forms["smartScholarForm"]["title"].options[0].disabled = false;
    document.forms["smartScholarForm"]["title"].options[1].disabled = false;
    document.forms["smartScholarForm"]["title"].options[2].disabled = false;

    if (gender !== "Female" && gender !== "Male" && gender != "Third Gender") {
        document.getElementById('genderErrId').style.display = "block";
        document.getElementById('genderErrId').innerHTML = "Please select your gender.";
        return false;
    } else {
        document.getElementById('genderErrId').style.display = "none";

        if (gender == "Female") {
            document.forms["smartScholarForm"]["title"].value = "Mrs.";
            document.forms["smartScholarForm"]["title"].options[0].disabled = true;
        } else if (gender === "Male") {
            document.forms["smartScholarForm"]["title"].value = "Mr.";
            document.forms["smartScholarForm"]["title"].options[1].disabled = true;
            document.forms["smartScholarForm"]["title"].options[2].disabled = true;
        }
        return true
    }
}

function validateParentGender() {
    var gender = document.forms["smartScholarForm"]["parentGender"].value;

    document.forms["smartScholarForm"]["proposer_title"].options[0].disabled = false;
    document.forms["smartScholarForm"]["proposer_title"].options[1].disabled = false;
    document.forms["smartScholarForm"]["proposer_title"].options[2].disabled = false;

    if (gender !== "Female" && gender !== "Male" && gender != "Third Gender") {
        document.getElementById('parentGenderErrId').style.display = "block";
        document.getElementById('parentGenderErrId').innerHTML = "Please select your gender.";
        return false;
    } else {
        document.getElementById('parentGenderErrId').style.display = "none";

        if (gender == "Female") {
            document.forms["smartScholarForm"]["proposer_title"].value = "Mrs.";
            document.forms["smartScholarForm"]["proposer_title"].options[0].disabled = true;
        } else if (gender === "Male") {
            document.forms["smartScholarForm"]["proposer_title"].value = "Mr.";
            document.forms["smartScholarForm"]["proposer_title"].options[1].disabled = true;
            document.forms["smartScholarForm"]["proposer_title"].options[2].disabled = true;
        }

        return true
    }
}

function validateEmailIdS() {
    var email = document.forms["smartScholarForm"]["emailId"].value;
    var cEmail = document.forms["smartScholarForm"]["confirmEmail"].value;
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (email != '' && email != null && email != undefined) {
        if (reg.test(email) == false) {
            document.getElementById('confirmEmailErrId').style.display = "block";
            document.getElementById('confirmEmailErrId').innerHTML = "Please enter valid email id";
            return false;
        } else if (cEmail == '' || cEmail == null || reg.test(cEmail) == false) {
            document.getElementById('confirmEmailErrId').style.display = "block";
            document.getElementById('confirmEmailErrId').innerHTML = "Please enter confirm email id";
            return false;
        } else if (email != cEmail) {
            document.getElementById('confirmEmailErrId').style.display = "block";
            document.getElementById('confirmEmailErrId').innerHTML = "Both email and confirm email should be same";
            return false;
        } else {
            document.getElementById('confirmEmailErrId').style.display = "none";
            return true
        }
    }
    return true;
}

function displayPayingTermOption(payingMode) {
    if (payingMode == 0) {
        document.getElementById('termOptionDiv').style.display = "none";
    } else {
        document.getElementById('termOptionDiv').style.display = "block";
    }
}

function validateMaturityAge() {
    var childAgeSelected = this.getChildAge();
    var parentAgeSelected = this.getParentAge();
    var policyTermSelected = this.getPolicyTerm();
    var maturityAge = childAgeSelected + policyTermSelected;
    if (maturityAge > 25 || maturityAge < 18) {
        document.getElementById('maturityAgeErrId').style.display = "block";
        return false;
    } else if (parentAgeSelected + policyTermSelected > 65) {
        document.getElementById('maturityAgeErrId').style.display = "block";
        return false;
    } else {
        document.getElementById('maturityAgeErrId').style.display = "none";
        return true;
    }
}

function validatePolicyTerm() {
    var minPolicyTerm = Math.max((18 - getChildAge()), 8);
    var maxPolicyTerm = Math.max(Math.min((25 - getChildAge()), (65 - getParentAge())), minPolicyTerm);

    if (minPolicyTerm > getPolicyTerm() || maxPolicyTerm < getPolicyTerm()) {
        document.getElementById('maturityAgeErrId').style.display = "block";
        document.getElementById('maturityAgeErrId').innerHTML = "Enter Policy Term between " + minPolicyTerm + " and " + maxPolicyTerm;
        return false;
    }
    document.getElementById('maturityAgeErrId').style.display = "none";
    return true;
}

function validatePremiumPayingTerm() {
    if (getPolicyMode() != "Single") {
        var minPolicyTerm = Math.max((18 - getChildAge()), 8);
        var maxPolicyTerm = Math.max(Math.min((25 - getChildAge()),
            (65 - getParentAge())), minPolicyTerm);
        var minPremiumPayingTerm = Math.min(5, minPolicyTerm);
        var maxPremiumPayingTerm = Math.min((Math.min(25, maxPolicyTerm)),
            getPolicyTerm());

        if (getPolicyPayingTerm() == '' || minPremiumPayingTerm > getPolicyPayingTerm() ||
            maxPremiumPayingTerm < getPolicyPayingTerm()) {

            document.getElementById("payingTermErrId").style.display = "block";
            document.getElementById("payingTermErrId").innerHTML = "Enter Premium Paying Term between " + minPremiumPayingTerm + " and " + maxPremiumPayingTerm;
            return false;

        }
    }
    document.getElementById("payingTermErrId").style.display = "none";
    return true;
}

function validatePremiumAmount() {
    if (getPremiumAmount() == '' || isNaN(getPremiumAmount()) || getPremiumAmount() == null) {
        document.getElementById("premiumAmtErrId").style.display = "block";
        document.getElementById("premiumAmtErrId").innerHTML = "Please enter Premium Amount in Rs. ";
        return false;
    } else if (getPremiumAmount() % 100 != 0) {
        document.getElementById("premiumAmtErrId").style.display = "block";
        document.getElementById("premiumAmtErrId").innerHTML = "Premium Amount should be multiple of 100";
        return false;
    } else {
        var minPremiumAmount = getMinPremiumAmount(getPolicyMode());
        if (getPremiumAmount() < minPremiumAmount) {
            document.getElementById("premiumAmtErrId").style.display = "block";
            document.getElementById("premiumAmtErrId").innerHTML = "Premium Amount should not be less than Rs. " +
                minPremiumAmount;
            return false;
        } else {
            document.getElementById("premiumAmtErrId").style.display = "none";
            return true;
        }

    }

}

function validateSAMF() {
    var minSAMF = parseFloat(getMin_SAMF());
    var maxSAMF = parseFloat(getMax_SAMF());

    var hh = getSAMF();

    if (getSAMF() == '' || minSAMF > parseFloat(getSAMF()) || maxSAMF < parseFloat(getSAMF())) {
        document.getElementById("samfErrId").style.display = "block";
        document.getElementById("samfErrId").innerHTML = "Sum Assured Multiple Factor (SAMF) should be in the range of " + minSAMF + " to " + maxSAMF;
        return false;
    }
    document.getElementById("samfErrId").style.display = "none";
    return true;
}

function getMin_SAMF() {
    // var a = 0;
    // if (getParentAge() < 45) {
    //     a = 10.0;
    // } else {
    //     a = 7.0;
    // }
    // if (getPolicyMode() == "Single") {
    //     return 1.25;
    // } else {
    //     //console.log(getMinSA()+" == "+getAnnualPremium());
    //     return Math.max(a, (getMinSA() / getAnnualPremium()));
    // }
    if (getPolicyMode() === "Single") {
        return 1.25;
    } else {
        return 10;
    }
}

// returns max allowed SAMF [used in validation] returns to valSAMF()
function getMax_SAMF() {
    // if (getPolicyMode() == "Single") {
    //     if (getParentAge() < 45) {
    //         return 5.0;
    //     } else {
    //         return 1.25;
    //     }
    // } else {
    //     return Math.max(getMin_SAMF(), 20);
    // }
    if (getPolicyMode() === ("Single")) {
        return 1.25;
    } else {
        return 10;
    }
}

function getMinSA() {
    var temp = 0;
    if (getParentAge() < 45) {
        temp = 0.5;
    } else {
        temp = 0.25;
    }
    //console.log(getAnnualPremium() +" === "+ getPolicyTerm())
    return (getAnnualPremium() * getPolicyTerm() * temp);
}

function getPF() {
    if (getPolicyMode() == "Single" || getPolicyMode() == "Yearly") {
        return 1;
    } else if (getPolicyMode() == "Half Yearly") {
        return 2;
    } else if (getPolicyMode() == "Quarterly") {
        return 4;
    } else if (getPolicyMode() == "Monthly") {
        return 12;
    } else {
        return 0;
    }
}

// get annual Premium [used in Calculation]and bean
function getAnnualPremium() {
    //console.log(getMinPremiumAmount(getPolicyMode()) +" == "+getAnnualisedPremium())
    var temp = Math.max(getMinPremiumAmount(getPolicyMode()), getAnnualisedPremium()); // *Fixed
    // Input,*Sheet
    // Name
    // ->
    // Input,*Cell
    // ->
    // AA17
    if ((temp % premMult) == 0) {
        return temp;
    } else {
        return (temp - (temp % premMult));
    }
}

// [used in calculation] returns to getAnnualPremium()
function getAnnualisedPremium() {

    if (getPolicyMode() == "Single") {
        return getPremiumAmount();
    } else {
        return getPremiumAmount() * getPF();
    }
}

function valYearsElapsedSinceInception() {
    if (getYearElapsed() == '' || getYearElapsed() < 5 || getYearElapsed() > getPolicyTerm()) {
        document.getElementById("yearsElapsedError").style.display = "block";
        document.getElementById("yearsElapsedError").innerHTML = "Enter No. of Years Elapsed Since Inception between 5 to " +
            getPolicyTerm() + " Years"
        return false;
    }
    document.getElementById("yearsElapsedError").style.display = "none";
    return true;

}

function valTotalAllocation() {
    var equityFund, equityOptimiserFund, growthFund, balancedFund, bondFund, moneyMarketFund, indexFund, top300Fund, bondOptiFund, pureFund;

    if (getEquityFund() != undefined && getEquityFund() != '')
        equityFund = getEquityFund();
    else
        equityFund = 0;

    if (getEquityOptimiserFund() != undefined && getEquityOptimiserFund() != '')
        equityOptimiserFund = getEquityOptimiserFund();
    else
        equityOptimiserFund = 0;

    if (getGrowthFund() != undefined && getGrowthFund() != '')
        growthFund = getGrowthFund();
    else
        growthFund = 0;

    if (getBalancedFund() != undefined && getBalancedFund() != '')
        balancedFund = getBalancedFund();
    else
        balancedFund = 0;

    if (getBondFund() != undefined && getBondFund() != '')
        bondFund = getBondFund();
    else
        bondFund = 0;

    if (getMoneyMarketFund() != undefined && getMoneyMarketFund() != '')
        moneyMarketFund = getMoneyMarketFund();
    else
        moneyMarketFund = 0;

    if (getTopFund() != undefined && getTopFund() != '')
        top300Fund = getTopFund();
    else
        top300Fund = 0;

    if (getBondOptimiserFund() != undefined && getBondOptimiserFund() != '')
        bondOptiFund = getBondOptimiserFund();
    else
        bondOptiFund = 0;

    if (getPureFund() != undefined && getPureFund() != '')
        pureFund = getPureFund();
    else
        pureFund = 0;


    // Removed by vrushali chaudhari
    // if(!edt_percent_IndexFund.getText().toString().equals(""))
    // indexFund =
    // Double.parseDouble(edt_percent_IndexFund.getText().toString());
    // else
    // indexFund = 0;

    // if(!edt_percent_PEmanagedFund.getText().toString().equals(""))
    // peManagedFund =
    // Double.parseDouble(edt_percent_PEmanagedFund.getText().toString());
    // else
    // peManagedFund=0;
    // if((equityFund+equityOptimiserFund+growthFund+bondFund+balancedFund+indexFund+moneyMarketFund+top300Fund+peManagedFund)
    // !=100)

    var fd = (equityFund + equityOptimiserFund + growthFund + bondFund +
        balancedFund + moneyMarketFund + top300Fund + bondOptiFund + pureFund);
    console.log("fund total : " + fd);
    if ((equityFund + equityOptimiserFund + growthFund + bondFund +
            balancedFund + moneyMarketFund + top300Fund + bondOptiFund + pureFund) != 100) {
        document.getElementById("fundError").innerHTML = "Total sum of % to be invested for all fund should be equal to 100%";
        return false;

    }
    document.getElementById("fundError").style.display = "none";
    return true;
}

function setPremiumAmountTitle(paymentMode) {
    var premiumAmountTitle = document.getElementById('premiumAmountTitle'); // = Premium Amount(Min. Rs. 75,000)*
    switch (paymentMode) {
        //console.log(paymentMode)
        case "0":
            premiumAmountTitle.innerHTML = `Premium Amount (Min. Rs. ${minPremForSingle})`;
            break;
        case "1":
            premiumAmountTitle.innerHTML = `Premium Amount (Min. Rs. ${minPremForYearly_PPTlessThan8})`;
            break;
        case "2":
            premiumAmountTitle.innerHTML = `Premium Amount (Min. Rs. ${minPremForHalfYearly_PPTlessThan8})`;
            break;
        case "3":
            premiumAmountTitle.innerHTML = `Premium Amount (Min. Rs. ${minPremForQuarterly_PPTlessThan8})`;
            break;
        case "4":
            premiumAmountTitle.innerHTML = `Premium Amount (Min. Rs. ${minPremForMonthly_PPTlessThan8})`;
            break;
        default:
            //console.log(paymentMode)
            premiumAmountTitle.innerHTML = `Premium Amount (Min. Rs. ${minPremForSingle})`;
            break;

    }
    //console.log(paymentMode);
}

function getMinPremiumAmount(paymentMode) {
    if (paymentMode == "Single") {
        return minPremForSingle;
    } else if (paymentMode == "Yearly") {
        return minPremForYearly_PPTlessThan8;
    } else if (paymentMode == "Half Yearly") {
        return minPremForHalfYearly_PPTlessThan8;
    } else if (paymentMode == "Quarterly") {
        return minPremForQuarterly_PPTlessThan8;
    } else if (paymentMode == "Monthly") {
        return minPremForMonthly_PPTlessThan8;
    }
}

function validateChildBasicDetails() {
    var childFName = document.forms["smartScholarForm"]["first_name"].value;
    var childLName = document.forms["smartScholarForm"]["last_name"].value;

    if (childFName == '' || childFName == null) {
        document.getElementById("nameErrId").innerHTML = "Please enter first name";
        return false;
    } else if (childLName == '' || childLName == null) {
        document.getElementById("nameErrId").innerHTML = "Please enter last name";
        return false;
    } else {
        document.getElementById("nameErrId").style.display = "none";
        return true;
    }
}

function validaParentBasicDetails() {
    var parentFName = document.forms["smartScholarForm"]["parent_first_name"].value;
    var parentLName = document.forms["smartScholarForm"]["parent_last_name"].value;
    if (parentFName == '' || parentFName == null) {
        document.getElementById("parentNameErrId").innerHTML = "Please enter first name";
        return false;
    } else if (parentLName == '' || parentLName == null) {
        document.getElementById("parentNameErrId").innerHTML = "Please enter last name";
        return false;
    } else {
        document.getElementById("parentNameErrId").style.display = "none";
        return true;
    }
}

function validateMobileNo(mobileNo) {
    if (isNaN(mobileNo) || mobileNo == '' || mobileNo == null) {
        document.getElementById("mobileNoErrId").innerHTML = "Please enter mobile number";
        return false;
    } else if (mobileNo.length != 10) {
        document.getElementById('mobileNoErrId').style.display = "block";
        document.getElementById('mobileNoErrId').innerHTML = "Mobile number should be 10 digits.";
        return false;
    } else {
        document.getElementById("mobileNoErrId").style.display = "none"
        return true;
    }
}

function getStaffDisc() {

    var staffValue = document.forms["smartScholarForm"]['staff_discount'].checked;
    return staffValue;
}

function getTitle() {
    return document.forms["smartScholarForm"]["title"].value;
}

function getProposerTitle() {
    return document.forms["smartScholarForm"]["proposer_title"].value;
}

function ChildfName() {
    return document.forms["smartScholarForm"]["first_name"].value;
}

function ChildMName() {
    return document.forms["smartScholarForm"]["middle_name"].value;
}

function ChildLName() {
    return document.forms["smartScholarForm"]["last_name"].value;
}

function fName() {
    return document.forms["smartScholarForm"]["parent_first_name"].value;
}

function MName() {
    return document.forms["smartScholarForm"]["parent_middle_name"].value;
}

function LName() {
    return document.forms["smartScholarForm"]["parent_last_name"].value;
}

function getGender() {
    return document.forms["smartScholarForm"]["gender"].value;
}

function getPGender() {
    return document.forms["smartScholarForm"]["parentGender"].value;
}

function getChildAge() {
    return parseInt(document.forms["smartScholarForm"]["age"].value);
}

function getParentAge() {
    return parseInt(document.forms["smartScholarForm"]["parentAge"].value);
}

function getChildDOB() {
    return document.forms["smartScholarForm"]["dob"].value;
}

function getParentDOB() {
    return document.forms["smartScholarForm"]["parentdob"].value;
}

function getMobileNo() {
    return document.forms["smartScholarForm"]["mobile"].value;
}

function getEmailId() {
    return document.forms["smartScholarForm"]["emailId"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["smartScholarForm"]["smartScholarPolicyTerm"].value, 10);
}

function getPolicyMode() {
    let index = document.forms["smartScholarForm"]["smartScholarPremiumPaymentMode"].value;
    return premiumFrequencyModeList[index].title;
}

function getPolicyPayingTerm() {
    if (getPolicyMode() === 'Single') {
        return 0;
    } else {
        return parseInt(document.forms["smartScholarForm"]["smartScholarTermOption"].value);
    }
}

function getPremiumAmount() {
    var amount = parseInt(document.forms["smartScholarForm"]["premiumAmount"].value);
    if (amount == '' || isNaN(amount) || amount == null) {
        return 0;
    } else {
        return amount;
    }

}

function getSAMF() {
    return parseFloat(document.forms["smartScholarForm"]["samf"].value);
}

function getYearElapsed() {
    return parseInt(document.forms["smartScholarForm"]["yearsElapsed"].value);
}

function getEquityFund() {
    return parseInt(document.forms["smartScholarForm"]["eFund"].value);
}

function getEquityOptimiserFund() {
    return parseInt(document.forms["smartScholarForm"]["eoFund"].value);
}

function getGrowthFund() {
    return parseInt(document.forms["smartScholarForm"]["growthFund"].value);
}

function getBalancedFund() {
    return parseInt(document.forms["smartScholarForm"]["balancedFund"].value);
}

function getBondFund() {
    return parseInt(document.forms["smartScholarForm"]["bondFund"].value);
}

function getMoneyMarketFund() {
    return parseInt(document.forms["smartScholarForm"]["moneyMarketFund"].value);
}

function getTopFund() {
    return parseInt(document.forms["smartScholarForm"]["topFund"].value);
}

function getBondOptimiserFund() {
    return parseInt(document.forms["smartScholarForm"]["edt_bondOptimiserFund2"].value);
}

function getPureFund() {
    return parseInt(document.forms["smartScholarForm"]["edt_pureFund"].value);
}

function setPayingTermOptionTitle(policyTerm) {
    //console.log("policyTerm = ", policyTerm);
    if (policyTerm < 18) {
        document.getElementById("termOptionTitle").innerHTML = "Paying Tem Option (5 to " + policyTerm + " years)";
    } else {
        return document.getElementById("termOptionTitle").innerHTML = "Paying Tem Option (5 to 18 years)";;
    }
}

function validatForm() {
    if (this.validateChildGender() && this.validateChildBasicDetails() && this.calculateChildAge(getDDMMYYYY(self.getChildDOB())) &&
        this.validateParentGender() && this.validaParentBasicDetails() && this.calculateParentAge(getDDMMYYYY(self.getParentDOB())) &&
        this.validateMobileNo(self.getMobileNo()) && this.validateEmailIdS() && this.validateMaturityAge() &&
        this.validatePolicyTerm() && this.validatePremiumPayingTerm() && this.validatePremiumAmount() && this.validateSAMF() &&
        this.valTotalAllocation()) { //this.valYearsElapsedSinceInception() &&
        this.calculatePremiumAPICall();
    }
}

function setTimeElapsedTitle() {
    document.getElementById("yearElapsedTitle").innerHTML = "No of Years Elapsed Since Inception (5 to " + getPolicyTerm() + " years)"
}

function setPolicyTermTitle() {
    var minPolicyTerm = Math.max((18 - getChildAge()), 8);
    var maxPolicyTerm = Math.max(Math.min((25 - getChildAge()), (65 - getParentAge())), minPolicyTerm);

    document.getElementById("policyTermTitle").innerHTML = "Policy Term (" + minPolicyTerm + " to " + maxPolicyTerm + ")*";
}

function setSAMFTitle() {
    //console.log(getMin_SAMF()+" == "+getMax_SAMF());
    // if (getPolicyMode() != "Single") {
    document.getElementById("samfTitle").innerHTML = "Sum Assured multiple factors [SAMF] (" + getMin_SAMF() + " to " + getMax_SAMF() + ")";
    // } else {
    // document.getElementById("samfTitle").innerHTML = "Sum Assured multiple factors [SAMF] (1.25 to 5.0)";
    // }
}

function getInput(forminputbyuser) {
    let getInputXML = `<?xml version='1.0' encoding='utf-8' ?><smartscholar>
    <LifeAssured_title>${this.getTitle()}</LifeAssured_title>
    <LifeAssured_firstName>${this.fName()}</LifeAssured_firstName>
    <LifeAssured_middleName>${this.MName()}</LifeAssured_middleName>
    <LifeAssured_lastName>${this.LName()}</LifeAssured_lastName>
    <LifeAssured_DOB>${getDDMMYYYY(this.getChildDOB())}</LifeAssured_DOB>
    <LifeAssured_age>${this.getChildAge()}</LifeAssured_age>
    <gender>${this.getGender()}</gender>
   
    <proposer_title>${this.getProposerTitle()}</proposer_title>
    <proposer_firstName>${this.ChildfName()}</proposer_firstName>
    <proposer_middleName>${this.ChildMName()}</proposer_middleName>
    <proposer_lastName>${this.ChildLName()}</proposer_lastName>
    <proposer_DOB>${getDDMMYYYY(this.getParentDOB())}</proposer_DOB>
    <proposer_age>${this.getParentAge()}</proposer_age>
    <proposer_gender>${this.getPGender()}</proposer_gender>
   
    <product_name>${this.productDetails.title}</product_name>
    <product_Code>${this.productDetails.productCode}</product_Code>
    <product_UIN>${this.productDetails.uinNumber}</product_UIN>
    <product_cateogory>${product_cateogory}</product_cateogory>
    <product_type>${product_type}</product_type>
   
    <proposer_Is_Same_As_Life_Assured>Y</proposer_Is_Same_As_Life_Assured>
    <age>${this.getChildAge()}</age>
    <gender>${this.getGender()}</gender>
    <ageProposer>${this.getParentAge()}</ageProposer>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <isStaff>${self.getStaffDisc()}</isStaff>
   
    <premFreq>${this.getPolicyMode()}</premFreq>
    <premiumAmount>${this.getPremiumAmount()}</premiumAmount>
    <SAMF>${this.getSAMF()}</SAMF>
    <noOfYrElapsed>${this.getYearElapsed()}</noOfYrElapsed>
    <perInvEquityFund>${this.getEquityFund()}</perInvEquityFund>
    <perInvEquityOptimiserFund>${this.getEquityOptimiserFund()}</perInvEquityOptimiserFund>
    <perInvgrowthFund>${this.getGrowthFund()}</perInvgrowthFund>
    <perInvBondFund>${this.getBondFund()}</perInvBondFund>
    <perInvBalancedFund>${this.getBalancedFund()}</perInvBalancedFund>
    <perInvMoneyMarketFund>${this.getMoneyMarketFund()}</perInvMoneyMarketFund>
    <perInvTop300Fund>${this.getTopFund()}</perInvTop300Fund>
    <perInvbondOptimiserFund2>${this.getBondOptimiserFund()}</perInvbondOptimiserFund2>
    <perInvPureFund>${this.getPureFund()}</perInvPureFund>
    <premPayingTerm>${this.getPolicyPayingTerm()}</premPayingTerm>
    <KFC>${forminputbyuser.KFC}</KFC>
    </smartscholar>`;

    return getInputXML;
}

function calculatePremiumAPICall() {
    let xmlBodyParam = ` <getPremiumSmartScholar xmlns="http://tempuri.org/">
    <isStaff>${self.getStaffDisc()}</isStaff>
    <KFC>${getKerlaDiscount()}</KFC>
    <isBancAssuranceDisc>false</isBancAssuranceDisc>
    <age>${self.getChildAge()}</age>
    <proposerAge>${self.getParentAge()}</proposerAge>
    <gender>${self.getPGender()}</gender>
    <policyTerm>${self.getPolicyTerm()}</policyTerm>
    <premFreqMode>${self.getPolicyMode()}</premFreqMode>
    <premPayingTerm>${self.getPolicyPayingTerm()}</premPayingTerm>
    <effectivePremium>${self.getPremiumAmount()}</effectivePremium>
    <premiumAmount>${self.getPremiumAmount()}</premiumAmount>
    <SAMF>${self.getSAMF()}</SAMF>
    <noOfYrElapsed>${isNaN(self.getYearElapsed()) ? 0 : self.getYearElapsed()}</noOfYrElapsed>
    <perInvEquityFund>${(getEquityFund() != undefined && getEquityFund() != '') ? self.getEquityFund() : 0}</perInvEquityFund>
    <perInvEquityOptiFund>${(getEquityOptimiserFund() != undefined && getEquityOptimiserFund() != '') ? self.getEquityOptimiserFund() : 0}</perInvEquityOptiFund>
    <perInvGrowthFund>${(getGrowthFund() != undefined && getGrowthFund() != '') ? self.getGrowthFund() : 0}</perInvGrowthFund>
    <perInvBondFund>${(getBondFund() != undefined && getBondFund() != '') ? self.getBondFund() : 0}</perInvBondFund>
    <perInvBalancedFund>${(getBalancedFund() != undefined && getBalancedFund() != '') ? self.getBalancedFund() : 0}</perInvBalancedFund>
    <perInvIndexFund>0</perInvIndexFund>
    <perInvMoneyMarketFund>${(getMoneyMarketFund() != undefined && getMoneyMarketFund() != '') ? self.getMoneyMarketFund() : 0}</perInvMoneyMarketFund>
    <perInvTop300Fund>${(getTopFund() != undefined && getTopFund() != '') ? self.getTopFund() : 0}</perInvTop300Fund>
    <perInvPEManagedFund>0</perInvPEManagedFund>
    <perInvBondOptimiserFundII>${(getBondOptimiserFund() != undefined && getBondOptimiserFund() != '') ?  self.getBondOptimiserFund(): 0}</perInvBondOptimiserFundII>
    <perInvPureFund>${(getPureFund() != undefined && getPureFund() != '') ?  self.getPureFund(): 0}</perInvPureFund>
    </getPremiumSmartScholar>`;

    let body = `<?xml version="1.0" encoding="utf-8"?>
    <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
    ${xmlBodyParam}
    </soap:Body>
    </soap:Envelope>`;

    //console.log(body);
    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {
        const basicSA = parseInt(self.getPremiumAmount()) * parseInt(self.getSAMF());
        let staffDiscount = "";
        if (self.getStaffDisc() === "true") {
            staffDiscount = "Yes";
        } else {
            staffDiscount = "No";
        }
        const planCode = "UPCP30";
        let forminputbyuser = {
            staffDiscount: self.getStaffDisc(),
            proposerName: getProposerTitle() + " " + self.fName() + " " + self.MName() + " " + self.LName(),
            childName: getTitle() + " " + ChildfName() + " " + ChildMName() + " " + ChildLName(),
            childAgeEntry: self.getChildAge(),
            proposerAgeEntry: self.getParentAge(),
            pgender: self.getPGender(),
            premiumPayingTerm: self.getPolicyTerm(),
            plan: self.getPolicyMode(),
            payingTermOption: self.getPolicyPayingTerm(),
            premiumAmount: self.getPremiumAmount(),
            samf: self.getSAMF(),
            numberOfYear: self.getYearElapsed(),
            percentEquityFund: self.getEquityFund(),
            percentEquityOptimiserFund: self.getEquityOptimiserFund(),
            percentGrowthFund: self.getGrowthFund(),
            percentBalancedFund: self.getBalancedFund(),
            percentBondFund: self.getBondFund(),
            percentMoneyMarketFund: self.getMoneyMarketFund(),
            percentTop300Fund: self.getTopFund(),
            percentBondOptimiserFund: self.getBondOptimiserFund(),
            percentPureFund: self.getPureFund(),
            STR_PLAN_AB: "B",

            quotationNumber: quotNumber,
            staffDiscount: staffDiscount,
            PlanName: self.productDetails.title,
            CustTitle: self.getTitle(),
            CustFirstName: self.fName(),
            CustMiddleName: self.MName(),
            CustLastName: self.LName(),
            CustMobile: self.getMobileNo(),
            CustEmailID: self.getEmailId(),
            LaDOB: getddmmyyyyNACBISYNC(self.getChildDOB()),
            ProposerDOB: getddmmyyyyNACBISYNC(this.getParentDOB()),
            BasicSA: basicSA,
            TotalPremAmt: self.getPremiumAmount(),
            Frequency: self.getPolicyMode(),
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: 0,
            PlanCode: planCode,
            KFC: getKerlaDiscount() ? "Y" : "N"
        };

        self.showLoader();
        callServiceHits('getPremiumSmartScholar', '', '', getUserCode(),
                "", "", "")
            .then((resolve) => {
                //console.log(resolve);
            }).catch((reject) => {
                //console.log(reject);
            });
        let inputXml = getInput(forminputbyuser);
        //console.log("inputXml",inputXml)
        self.ApiCallService('/getPremiumSmartScholar', body, '<smartScholar>', '</smartScholar>', true).then((data) => {
            self.hideLoader();
            data = data.smartScholar;
            data.productDetails = self.productDetails;
            data.premiumFrequencyMode = self.getPolicyMode();
            var stringifyJson = JSON.stringify(data);

            //Added by sonali
            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</CommIfPay8Pr${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</CommIfPay8Pr${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");

                var index = forminputbyuser.PolicyTerm;
                var FundValAtEnd4Pr = parseXmlTag(premiumCalcXMLResponse, "FundValAtEnd4Pr" + index + "");
                var FundValAtEnd8Pr = parseXmlTag(premiumCalcXMLResponse, "FundValAtEnd8Pr" + index + "");

                var FundValAtEnd = '';
                FundValAtEnd = "<FundValAtEnd4Pr" + index + ">" + FundValAtEnd4Pr + "</FundValAtEnd4Pr" + index + ">";
                FundValAtEnd += "<FundValAtEnd8Pr" + index + ">" + FundValAtEnd8Pr + "</FundValAtEnd8Pr" + index + ">";

                remaningOutput = remaningOutput + FundValAtEnd + "</SmartScholar>";
                remaningOutput = remaningOutput.replace("smartScholar", "SmartScholar");
                let output = appendXMLTagAtStart(remaningOutput);
                console.log("output ", output);

                let escapedBIOutput = escapeInputHTML(output);
                sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.

                let escapedBIInput = escapeInputHTML(inputXml);
                sessionStorage.setItem("BIInput", escapedBIInput); // BI Input.
            }
            //end
            //console.log("sessionStorage.ThroughNeedAnalysis",sessionStorage.ThroughNeedAnalysis)
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
        }).catch((error) => {
            //console.log(" in error ", error);
            self.hideLoader();
        });
    }).catch((message) => {
        console.log(" in error ", message);
        alert("Unable to generate quotation number")
    });
}