window.onload = function () {
    this.ready();
    // hideLoader();
    setKerlaDiscount();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails;
var proposer_Is_Same_As_Life_AssuredVar = 'Y';
/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    this.hideErrMsg();
    this.initArrayList();
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
    this.setADBTermRiderValue();
    this.setYearElapsedLable();
};

function hideErrMsg() {
    //document.getElementById('maturityAgeErrId').style.display = "none";
    document.getElementById('wealthAssureSAMFErrId').style.display = "none";
    document.getElementById('confirmEmailErrId').style.display = "none";
    document.getElementById('proposer_ageErrId').style.display = "none";
    document.getElementById('mobileNoErrId').style.display = "block";
}

function initializeData() {
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
}

function initArrayList() {

    policyListElement = document.forms["smartWealthAssureForm"]["policyTerm"];
    for (i = minPolicyTerm; i <= maxPolicyTerm; i++) {
        policyListElement.add(new Option(i));
    }
}

function proposerDetailsDisplay(birthday) {
    var age = getAgeFromBirthdate(birthday);
    document.forms["smartWealthAssureForm"]["age"].innerHTML = age;
    document.forms["smartWealthAssureForm"]["age"].value = age;
    document.forms["smartWealthAssureForm"]["age"].value = age;
    age < 18 ? document.getElementById('divProposer').style.display = "block" : document.getElementById('divProposer').style.display = "none";
}

function calculateLifeAssuredAge(birthday) {

    var age = this.getAgeFromBirthdate(getDDMMYYYY(birthday));
    document.forms["smartWealthAssureForm"]["age"].innerHTML = age;
    document.forms["smartWealthAssureForm"]["age"].value = age;
    //console.log(document.forms["smartBachatForm"]["age"].value);
    if (age < minAgeLimit || age > maxAgeLimit) {

        proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
        proposer_Is_Same_As_Life_AssuredVar = "Y";
        for (i = 0; i < proposerBlocks.length; i++) {
            proposerBlocks[i].style.display = "none";
            document.forms['smartWealthAssureForm']['proposer_first_name'].required = false;
            document.forms['smartWealthAssureForm']['proposer_last_name'].required = false;
            document.forms['smartWealthAssureForm']['proposer_dob'].required = false;

        }
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else if (age >= minAgeLimit && age < 18) {
        //added proposer_Is_Same_As_Life_Assured in age less than 18 condtion and removed from above condition which is added in  (age < minAgeLimit || age > maxAgeLimit)
        proposer_Is_Same_As_Life_AssuredVar = "n";
        proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
        for (i = 0; i < proposerBlocks.length; i++) {
            proposerBlocks[i].style.display = "block";
            document.forms['smartWealthAssureForm']['proposer_first_name'].required = true;
            document.forms['smartWealthAssureForm']['proposer_last_name'].required = true;
            document.forms['smartWealthAssureForm']['proposer_dob'].required = true;
        }
        //document.getElementById('riderDetails').style.display = "none";
        document.getElementById('ageErrId').style.display = "none";
        return true;
    } else {
        proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
        proposer_Is_Same_As_Life_AssuredVar = "Y";
        for (i = 0; i < proposerBlocks.length; i++) {
            proposerBlocks[i].style.display = "none";
            document.forms['smartWealthAssureForm']['proposer_first_name'].required = false;
            document.forms['smartWealthAssureForm']['proposer_last_name'].required = false;
            document.forms['smartWealthAssureForm']['proposer_dob'].required = false;
        }
        document.getElementById('ageErrId').style.display = "none";
        // age < 18 ? document.getElementById('divProposer').style.display = "block" : document.getElementById('divProposer').style.display = "none";
        return true;
    }
}

function calculateAge(birthday) {
    var age = getAgeFromBirthdate(getDDMMYYYY(birthday));
    document.forms["smartWealthAssureForm"]["proposer_age"].innerHTML = age;
    document.forms["smartWealthAssureForm"]["proposer_age"].value = age;
    document.forms["smartWealthAssureForm"]["proposer_age"].value = age;
    if (getsmartWealthAssureAge() < 18) {
        if (age < minAgeProposer || age > maxAgeProposer) {
            document.getElementById('proposer_ageErrId').style.display = "block";
            document.getElementById('proposer_ageErrId').innerHTML = `Age should be between ${minAgeProposer} and ${maxAgeProposer}.`;
            return false;
        } else {
            document.getElementById('proposer_ageErrId').style.display = "none";
            return true;
        }
    }
    document.getElementById('proposer_ageErrId').style.display = "none";
    return true;
}

function validateMobileNo(mobileNo) {
    if (mobileNo == '' || mobileNo == null) {
        document.getElementById('mobileNoErrId').style.display = "block";
        document.getElementById('mobileNoErrId').innerHTML = "Please enter mobile number";
        return false;
    } else if (mobileNo.length !== 10) {
        document.getElementById('mobileNoErrId').style.display = "block";
        document.getElementById('mobileNoErrId').innerHTML = "Mobile number should be 10 digits.";
        return false;
    } else {
        document.getElementById('mobileNoErrId').style.display = "none";
        return true;
    }
}

function validateEmailIds() {
    var email = getEmail();
    var cEmail = document.forms["smartWealthAssureForm"]["confirmEmail"].value;
    if (email == '' || email == null) {
        document.getElementById('confirmEmailErrId').style.display = "block";
        document.getElementById('confirmEmailErrId').innerHTML = "Please enter email id";
        return false;
    } else if (cEmail == '' || cEmail == null) {
        document.getElementById('confirmEmailErrId').style.display = "block";
        document.getElementById('confirmEmailErrId').innerHTML = "Please enter confirm email id";
        return false;
    } else if (email != cEmail) {
        document.getElementById('confirmEmailErrId').style.display = "block";
        document.getElementById('confirmEmailErrId').innerHTML = "Email Id Does Not Match";
        return false;
    } else {
        document.getElementById('confirmEmailErrId').style.display = "none";
        return true
    }
}


function setADBTermRiderValue() {
    document.forms["smartWealthAssureForm"]["smartWealthAssureADBTerm"].value = this.getPolicyTerm();
    document.forms["smartWealthAssureForm"]["smartWealthAssureADBTerm"].disabled = true;
}

function getIsStaff() {
    var checkBox = document.getElementById('smart_wealth_assure_staff_discount');
    return checkBox;
}

function getIsStaffDiscount() {
    return document.forms["smartWealthAssureForm"]["smart_wealth_assure_staff_discount"].checked;
}

function getWealthAssureGender() {
    return document.forms["smartWealthAssureForm"]["gender"].value;
}

function getWealthAssurePropGender() {
    return document.forms["smartWealthAssureForm"]["proposerGender"].value;
}

function getProposerFName() {
    return document.forms["smartWealthAssureForm"]["proposer_first_name"].value;
}

function getProposerMName() {
    return document.forms["smartWealthAssureForm"]["proposer_middle_name"].value;
}

function getProposerLName() {
    return document.forms["smartWealthAssureForm"]["proposer_last_name"].value;
}

function getTitle() {
    return document.forms["smartWealthAssureForm"]["title"].value;
}

function getProposerTitle() {
    return document.forms["smartWealthAssureForm"]["proposer_title"].value;
}

function getsmartWealthAssureAge() {
    var age = parseInt(document.forms["smartWealthAssureForm"]["age"].value);
    if (isNaN(age) || age == '' || age == null)
        return 0;
    else
        return age;
}

function getWealthAssureFName() {
    return document.forms["smartWealthAssureForm"]["first_name"].value;
}

function getWealthAssureMName() {
    return document.forms["smartWealthAssureForm"]["middle_name"].value;
}

function getWealthAssureLName() {
    return document.forms["smartWealthAssureForm"]["last_name"].value;
}

function getDob() {
    return document.forms["smartWealthAssureForm"]["dob"].value;
}

function getProposerDob() {
    return document.forms["smartWealthAssureForm"]["proposer_dob"].value;
}

function getProposerAge() {
    return document.forms["smartWealthAssureForm"]["proposer_age"].value;
}

function getMobileNo() {
    return document.forms["smartWealthAssureForm"]["mobile"].value;
}
	
function getEmail() {
    return document.forms["smartWealthAssureForm"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["smartWealthAssureForm"]["confirmEmail"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["smartWealthAssureForm"]["policyTerm"].value);
}

function getFrequencyMode() {
    return document.forms["smartWealthAssureForm"]["premiumFrequencyMode"].value;
}
//sonali
//function getPremiumFreq() {
//    var index = document.forms["smartWealthAssureForm"]["premiumFrequencyMode"].value;
//    console.log('premiumFreq is :- ' + premiumFrequencyList[index].title);
//    return premiumFrequencyList[index].title;
//}
function getPremiumPayingTerm() {
    return parseInt(document.forms["smartWealthAssureForm"]["premiumPayingTerm"].value);
}

function getPlanOption() {
    return (document.forms["smartWealthAssureForm"]["planOption"].value);
}

function getPremiumAmount() {
    var preAmount = parseInt(document.forms["smartWealthAssureForm"]["premiumAmount"].value);
    if (isNaN(preAmount) || preAmount == "" || preAmount == null)
        return 0;
    else
        return preAmount;
}

function getSAMF() {
    var samf = parseFloat(document.forms["smartWealthAssureForm"]["samf"].value);
    if (isNaN(samf) || samf == '' || samf == null)
        return 0;
    else
        return samf;
}

function getNoOfYearsElapsed() {
    var yearsElapsed = parseFloat(document.forms["smartWealthAssureForm"]["yearsElapsed"].value)
    if (isNaN(yearsElapsed) || yearsElapsed == '' || yearsElapsed == null)
        return 0;
    else
        return yearsElapsed;
}

function getEquityFund() {
    var equityFund = parseFloat(document.forms["smartWealthAssureForm"]["equityFund"].value)
    if (isNaN(equityFund) || equityFund == '' || equityFund == null)
        return 0;
    else
        return equityFund;
}

function getBondFund() {
    var bondFund = parseFloat(document.forms["smartWealthAssureForm"]["bondFund"].value)
    if (isNaN(bondFund) || bondFund == '' || bondFund == null)
        return 0;
    else
        return bondFund;
}

function getBalancedFund() {
    var fund = parseInt(document.forms["smartWealthAssureForm"]["balancedFund"].value, 10);
    if (isNaN(fund) || fund == undefined || fund == 0 || fund == "") {
        return 0;
    } else {
        return fund;
    }
}

function getBondOptimiserFund() {
    var fund = parseInt(document.forms["smartWealthAssureForm"]["bondOptimiserFund"].value, 10);
    if (isNaN(fund) || fund == undefined || fund == 0 || fund == "") {
        return 0;
    } else {
        return fund;
    }
}

function getMoneyMarketFund() {
    var fund = parseInt(document.forms["smartWealthAssureForm"]["moneyMarketFund"].value, 10);
    if (isNaN(fund) || fund == undefined || fund == 0 || fund == "") {
        return 0;
    } else {
        return fund;
    }
}

function getCorporateBondFund() {
    var fund = parseInt(document.forms["smartWealthAssureForm"]["corporateBondFund"].value, 10);
    if (isNaN(fund) || fund == undefined || fund == 0 || fund == "") {
        return 0;
    } else {
        return fund;
    }
}

function getPureFund() {
    var fund = parseInt(document.forms["smartWealthAssureForm"]["pureFund"].value, 10);
    if (isNaN(fund) || fund == undefined || fund == 0 || fund == "") {
        return 0;
    } else {
        return fund;
    }
}


function getIsADBRiderActive() {
    return document.forms["smartWealthAssureForm"]["smartWealthAssureRiderSwitch"].checked;
}

function getADBRiderTerm() {
    if (this.getIsADBRiderActive()) {
        return parseInt(document.forms["smartWealthAssureForm"]["smartWealthAssureADBTerm"].value);
    } else {
        return 0;
    }
}

function getADBRiderSum() {
    var adbsumAssure = parseFloat(document.forms["smartWealthAssureForm"]["adb_sum_assured"].value)
    if (isNaN(adbsumAssure) || adbsumAssure == '' || adbsumAssure == null)
        return 0;
    else
        return adbsumAssure;
}

function setYearElapsedLable() {
    document.getElementById("yearElapsedTitle").innerHTML = "No of Years Elapsed Since Inception ( 5 to " + getPolicyTerm() + " years)";
}

function updateSAMFlabel() {
    var minSAMFforSingleFreq = 0,
        maxSAMFforSingleFreq = 0;

    // if (getsmartWealthAssureAge() < 45) {
    //     minSAMFforSingleFreq = 1.25;
    //     maxSAMFforSingleFreq = 5;
    // } else {
    //     minSAMFforSingleFreq = 1.1;
    //     maxSAMFforSingleFreq = 3;
    // }
    minSAMFforSingleFreq = 1.25;
    maxSAMFforSingleFreq = 1.25;

    document.getElementById("samfLable").innerHTML = "Sum Assured multiple factors (SAMF)(" + minSAMFforSingleFreq + " to " +
        maxSAMFforSingleFreq + ")";
}

function updateADBsumAssuredLabel() {
    if (getPremiumAmount() != 0 && getSAMF() != 0) {
        var new_maxADB_SA = 0;
        var minADBsumAssured = Math.max(Math.min(25000.0, getPremiumAmount(), 25000.0));
        var a = 0;
        if ((getPremiumAmount() * getSAMF() == 0)) {
            a = 5000000;
        } else {
            a = (getPremiumAmount() * getSAMF());
        }
        var maxADBsumAssured = Math.min(5000000.0, a);
        if ((maxADBsumAssured % 1000) != 0) {
            var remainder = maxADBsumAssured % 1000;
            new_maxADB_SA = maxADBsumAssured - remainder;
        } else {
            new_maxADB_SA = maxADBsumAssured;
        }
        document.getElementById("smartWealthAssuredADBSumTitle").innerHTML = "ADB Sum Assured (Rs. " + new Intl.NumberFormat('en-IN').format(minADBsumAssured) +
            " to Rs. " + new Intl.NumberFormat('en-IN').format(new_maxADB_SA) + ")";
    }
}

function validatePremiumAmt() {

    if (getPremiumAmount() == 0) {
        document.getElementById("premiumAmtErrId").style.display = "block";
        document.getElementById("premiumAmtErrId").innerHTML = "Please enter Premium Amount in Rs. ";
        return false;
    } else if (getPremiumAmount() % 100 != 0) {
        document.getElementById("premiumAmtErrId").style.display = "block";
        document.getElementById("premiumAmtErrId").innerHTML = "Premium Amount should be multiple of 1000";
        return false;
    } else if (getPremiumAmount() < 50000) {
        document.getElementById("premiumAmtErrId").style.display = "block";
        document.getElementById("premiumAmtErrId").innerHTML = "Premium Amount should not be less than Rs. 50,000";
        return false;
    } else {
        document.getElementById("premiumAmtErrId").style.display = "none";
        return true;
    }
}

function validateSAMF() {
    var minSAMFforSingleFreq = 0,
        maxSAMFforSingleFreq = 0;

    // if (getsmartWealthAssureAge() < 45) {
    //     minSAMFforSingleFreq = 1.25;
    //     maxSAMFforSingleFreq = 5;
    // } else {
    //     minSAMFforSingleFreq = 1.1;
    //     maxSAMFforSingleFreq = 3;
    // }
    minSAMFforSingleFreq = 1.25;
    maxSAMFforSingleFreq = 1.25;

    if (getSAMF() == 0 || getSAMF() < minSAMFforSingleFreq || getSAMF() > maxSAMFforSingleFreq) {
        document.getElementById("wealthAssureSAMFErrId").style.display = "block";
        document.getElementById("wealthAssureSAMFErrId").innerHTML = "Sum Assured Multiple Factor (SAMF) should be in the range of " + minSAMFforSingleFreq +
            " to " + maxSAMFforSingleFreq;
        return false;

    }
    document.getElementById("wealthAssureSAMFErrId").style.display = "none";
    return true;

}

function valADBsumAssured() {
    if (this.getIsADBRiderActive()) {

        var minADBsumAssured = Math.max(Math.min(25000.0, getPremiumAmount()), 25000.0);
        var a = 0;
        if ((getPremiumAmount() * getSAMF()) == 0) {
            a = 5000000;
        } else {
            a = (getPremiumAmount() * getSAMF());
        }
        var maxADBsumAssured = Math.min(5000000.0, a);
        if (getADBRiderSum() == 0) {
            document.getElementById("adbSumErrId").style.display = "block";
            document.getElementById("adbSumErrId").innerHTML = "Please enter Accidental Death Benefit Option Sum Assured.";
            return false;
        } else if (getADBRiderSum() % 1000 != 0) {
            document.getElementById("adbSumErrId").style.display = "block";
            document.getElementById("adbSumErrId").innerHTML = "Accidental Death Benefit (ADB) Option Sum Assured should be in multiple of 1000.";
            return false;
        } else if ((getADBRiderSum() < minADBsumAssured || getADBRiderSum() > maxADBsumAssured)) {
            document.getElementById("adbSumErrId").style.display = "block";
            document.getElementById("adbSumErrId").innerHTML = "Accidental Death Benefit (ADB) Option Sum Assured should be in the range of " +
                new Intl.NumberFormat('en-IN').format(minADBsumAssured) +
                " Rs. to " +
                new Intl.NumberFormat('en-IN').format(maxADBsumAssured) + " Rs.";
            return false;
        }

    }
    document.getElementById("adbSumErrId").style.display = "none";
    return true;
}

function valTotalAllocation() {
    if (this.getEquityFund() + this.getBalancedFund() + this.getBondFund() + this.getPureFund() +
        this.getBondOptimiserFund() + this.getMoneyMarketFund() + this.getCorporateBondFund() !== 100) {
        document.getElementById('fundErrId').style.display = 'block';
        document.getElementById('fundErrId').innerHTML = `Total sum of % to be invested for all fund should be equal to 100.`;
        return false;
    }
    document.getElementById('fundErrId').style.display = 'none';
    return true;
}

function valYearsElapsedSinceInception() {
    if (getNoOfYearsElapsed() == 0 || getNoOfYearsElapsed() < 5 || getNoOfYearsElapsed() > getPolicyTerm()) {
        document.getElementById("yearsElapsedErrId").style.display = "block";
        document.getElementById("yearsElapsedErrId").innerHTML = "Enter No. of Years Elapsed Since Inception between 5 to " +
            getPolicyTerm() + " Years";
        return false;
    }
    document.getElementById("yearsElapsedErrId").style.display = "none";
    return true;

}

function valPolicyTerm() {
    var maxPolicyTerm = Math.min(Math.max(10, (70 - getsmartWealthAssureAge())), 30);
    console.log(maxPolicyTerm);
    var minPolicyTerm = minPolicyTerm;
    if (getPolicyTerm() < minPolicyTerm || getPolicyTerm() > maxPolicyTerm) {
        document.getElementById("policyTermErrId").style.display = "block";
        document.getElementById("policyTermErrId").innerHTML = "Policy Term should be in the range of " +
            minPolicyTerm + " Years to " + maxPolicyTerm + " years";
        return false;
    }
    document.getElementById("policyTermErrId").style.display = "none";
    return true;
}

function submitSamrtWealthAssureForm() {
    if (smartWealthAssureForm.checkValidity() && this.calculateAge(getProposerDob()) && this.validateMobileNo(getMobileNo()) &&
        this.valPolicyTerm() && this.validatePremiumAmt() &&
        this.validateSAMF() && this.valYearsElapsedSinceInception() && this.valTotalAllocation() &&
        this.valADBsumAssured() && this.validateConfirmEmail()) {
        calculatePremiumAPICall();
    }
}

function getInput(forminputbyuser) {
    let getInputXML = `<?xml version='1.0' encoding='utf-8' ?><smartWealthAssureBean>
    <LifeAssured_title>${this.getTitle()}</LifeAssured_title>
    <LifeAssured_firstName>${this.getWealthAssureFName()}</LifeAssured_firstName>
    <LifeAssured_middleName>${this.getWealthAssureMName()}</LifeAssured_middleName>
    <LifeAssured_lastName>${this.getWealthAssureLName()}</LifeAssured_lastName>
    <LifeAssured_DOB>${getDDMMYYYY(this.getDob())}</LifeAssured_DOB>
    <LifeAssured_age>${forminputbyuser.age}</LifeAssured_age>

    <proposer_title>${forminputbyuser.age < 18 ? this.getProposerTitle() : ''}</proposer_title>
    <proposer_firstName>${forminputbyuser.age < 18 ? this.getProposerFName() : ''}</proposer_firstName>
    <proposer_middleName>${forminputbyuser.age < 18 ? this.getProposerMName() : ''}</proposer_middleName>
    <proposer_lastName>${forminputbyuser.age < 18 ? this.getProposerLName() : ''}</proposer_lastName>
    <proposer_DOB>${forminputbyuser.age < 18 ? this.getProposerDob() : ''}</proposer_DOB>
    <proposer_age>${forminputbyuser.age < 18 ? this.getProposerAge() : ''}</proposer_age>
    <proposer_gender>${forminputbyuser.age < 18 ? this.getWealthAssurePropGender() : ''}</proposer_gender>

    <product_name>${this.productDetails.title}</product_name>
    <product_Code>${this.productDetails.productCode}</product_Code>
    <product_UIN>${this.productDetails.uinNumber}</product_UIN>
    <product_cateogory>${product_cateogory}</product_cateogory>
    <product_type>${product_type}</product_type>

    <proposer_Is_Same_As_Life_Assured>${proposer_Is_Same_As_Life_AssuredVar}</proposer_Is_Same_As_Life_Assured>
    <str_kerla_discount>${getKerlaDiscount()?"Yes":"No"}</str_kerla_discount>
    <isStaff>${this.getIsStaffDiscount()}</isStaff>
    <isJKResident>false</isJKResident>
    <age>${this.getsmartWealthAssureAge()}</age>
    <gender>${this.getWealthAssureGender()}</gender>
    <SAMF>${this.getSAMF()}</SAMF>
    <premFreqMode>${forminputbyuser.premiumFrequency}</premFreqMode>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <premiumAmount>${this.getPremiumAmount()}</premiumAmount>
    <noOfYrElapsed>${forminputbyuser.numberOfElapsed}</noOfYrElapsed>
    <perInvEquityFund>${forminputbyuser.percentEquityFund}</perInvEquityFund>
    <perInvBondFund>${forminputbyuser.percentBondFund}</perInvBondFund>
    <perInvBalancedFund>${forminputbyuser.perInvBalancedFund}</perInvBalancedFund>
    <perInvMoneyMarketFund>${forminputbyuser.perInvMoneyMarketFundII}</perInvMoneyMarketFund>
    <perInvBondOptimiserFund>${forminputbyuser.perInvbondOptimiserFund2}</perInvBondOptimiserFund>
    <perInvCorporateBondFund>${forminputbyuser.perInvCorporateBondFund}</perInvCorporateBondFund>
    <perInvPureFund>${forminputbyuser.perInvPureFund}</perInvPureFund>
    <isADBRider>${forminputbyuser.IsADBRiderActive}</isADBRider>
    <adbTerm>${forminputbyuser.ADBTerm}</adbTerm>
    <adbSA>${forminputbyuser.ADBRiderSum}</adbSA>
    <KFC>${forminputbyuser.KFC}</KFC>
  </smartWealthAssureBean>`;
    return getInputXML;
}

function calculatePremiumAPICall() {
    let xmlBodyParam = ` <getPremiumSmartWealthAssure xmlns="http://tempuri.org/">
    <isStaff>${this.getIsStaffDiscount()}</isStaff>
    <KFC>${getKerlaDiscount()}</KFC>
    <isBancAssuranceDisc>false</isBancAssuranceDisc>
    <age>${this.getsmartWealthAssureAge()}</age>
    <gender>${this.getWealthAssureGender()}</gender>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <effectivePremium>${this.getPremiumAmount()}</effectivePremium>
    <premiumAmount>${this.getPremiumAmount()}</premiumAmount>
    <SAMF>${this.getSAMF()}</SAMF>
    <noOfYrElapsed>${this.getNoOfYearsElapsed()}</noOfYrElapsed>
    <premPayingTerm>1</premPayingTerm>
    <isADBRider>${this.getIsADBRiderActive()}</isADBRider>
    <adbTerm>${this.getADBRiderTerm()}</adbTerm>
    <adbSA>${this.getADBRiderSum()}</adbSA>
    <perInvEquityFund>${this.getEquityFund()}</perInvEquityFund>
    <perInvBondFund>${this.getBondFund()}</perInvBondFund>
    <perInvBalancedFund>${this.getBalancedFund()}</perInvBalancedFund>
    <perInvBondOptimiserFund>${this.getBondOptimiserFund()}</perInvBondOptimiserFund>
    <perInvMoneyMarketFund>${this.getMoneyMarketFund()}</perInvMoneyMarketFund>
    <perInvCorpBondFund>${this.getCorporateBondFund()}</perInvCorpBondFund>
    <perInvPureFund>${this.getPureFund()}</perInvPureFund>
  </getPremiumSmartWealthAssure>`;

    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        ${xmlBodyParam}
                    </soap:Body>
                </soap:Envelope>`;

    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {
        let staffDiscount = "";
        if (self.getIsStaff() === "true") {
            staffDiscount = "Yes";
        } else {
            staffDiscount = "No";
        }
        var planCode = "SSW0";

        let forminputbyuser = {
            proposerName: self.getTitle() + " " + self.getWealthAssureFName() + " " + self.getWealthAssureMName() + " " + self.getWealthAssureLName(),
            age: self.getsmartWealthAssureAge(),
            gender: self.getWealthAssureGender(),
            proposerAge: this.getsmartWealthAssureAge() < 18 ? this.getProposerAge() : '',
            policyTerm: self.getPolicyTerm(),
            premiumFrequency: self.getFrequencyMode(),
            premiumAmount: self.getPremiumAmount(),
            SAMF: self.getSAMF(),
            numberOfElapsed: self.getNoOfYearsElapsed(),
            percentEquityFund: self.getEquityFund(),
            percentBondFund: self.getBondFund(),
            perInvBalancedFund: this.getBalancedFund(),
            perInvbondOptimiserFund2: this.getBondOptimiserFund(),
            perInvMoneyMarketFundII: this.getMoneyMarketFund(),
            perInvCorporateBondFund: this.getCorporateBondFund(),
            perInvPureFund: this.getPureFund(),
            IsADBRiderActive: self.getIsADBRiderActive(),
            //ADBTermRiderValue: setADBTermRiderValue(),
            ADBTerm: self.getADBRiderTerm(),
            ADBRiderSum: self.getADBRiderSum(),
            //premiumPayingTerm: self.getPremiumPayingTerm(),
            //premiumfrequencymode: self.getFrequencyMode(),
            //planOption: self.getPlanOption(),
            //percentMoneyMarketFund: self.getMoneyMarketFund(),
            quotationNumber: quotNumber,
            staffDiscount: staffDiscount,
            PlanName: self.productDetails.title,
            CustTitle: self.getTitle(),
            CustFirstName: self.getWealthAssureFName(),
            CustMiddleName: self.getWealthAssureMName(),
            CustLastName: self.getWealthAssureLName(),
            CustMobile: self.getMobileNo(),
            CustEmailID: self.getEmail(),
            LaDOB: getDDMMYYYY(self.getDob()),
            ProposerDOB: (getProposerDob() === null || getProposerDob() == '') ? '' : getDDMMYYYY(self.getProposerDob()),
            //BasicSA: basicSA,
            TotalPremAmt: self.getPremiumAmount(),
            Frequency: self.getFrequencyMode(),
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: 0,
            PlanCode: planCode,
            KFC: getKerlaDiscount() ? "Y" : "N",
            userType: getUserType()
        };

        if (self.getsmartWealthAssureAge() < 18) {
            forminputbyuser.proposerName = self.getProposerTitle() + " " + self.getProposerFName() + " " + self.getProposerMName() + " " + self.getProposerLName();
            forminputbyuser.lifeAssuredName = self.getTitle() + " " + self.getWealthAssureFName() + " " + self.getWealthAssureMName() + " " + self.getWealthAssureLName();
        }
        let inputXml = getInput(forminputbyuser);
        showLoader();
        ApiCallService('/getPremiumSmartWealthAssure', body, '<smartWealthAssure>', '</smartWealthAssure>', true).then((data) => {
            hideLoader();
            data = data.smartWealthAssure;
            //console.log("data = ",data);
            forminputbyuser.BasicSA = data.sumAssured
            data.productDetails = self.productDetails;
            data.premiumFreq = self.getFrequencyMode();
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
                remaningOutput = remaningOutput + FundValAtEnd + "</smartwealthassure>";
                remaningOutput = remaningOutput.replace(/smartWealthAssure/g, "smartwealthassure");
                let output = appendXMLTagAtStart(remaningOutput);

                let escapedBIOutput = escapeInputHTML(output);
                sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.

                let escapedBIInput = escapeInputHTML(inputXml);
                sessionStorage.setItem("BIInput", escapedBIInput); // BI Input.
            }
            //end

            if (sessionStorage.ThroughNeedAnalysis) {
                let status = sessionStorage.getItem('ThroughNeedAnalysis');
                console.log(status);
                if (status === 'Yes') {
                    //added by bharamu
                    updateDataInDB(forminputbyuser).then((resolve) => {
                        if (resolve == "1") {
                            createPDFGeneralMethod(this.productDetails, data, forminputbyuser).catch((error) => {
                                console.log(' Error in generating PDF ' + error);
                            });
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
            //alert("Unable to generate quotation number")
            console.log(' hitPremiumCaclService error :- ' + error);
            hideLoader();
        });

    }).catch((error) => {
        alert("Unable to generate quotation number");
        console.log(' in error :- ' + error);
        hideLoader();
    });
}

function validateGender(formElementName) {
    //console.log("formElementName",formElementName)
    var laGender = document.forms["smartWealthAssureForm"]["gender"].value;
    var proposerGender = document.forms["smartWealthAssureForm"]["proposerGender"].value;
    document.getElementById("lifeAssuredTitle").options[0].disabled = false;
    document.getElementById("lifeAssuredTitle").options[1].disabled = false;
    document.getElementById("lifeAssuredTitle").options[2].disabled = false;
    document.getElementById("ProposerTitle").options[0].disabled = false;
    document.getElementById("ProposerTitle").options[1].disabled = false;
    document.getElementById("ProposerTitle").options[2].disabled = false;

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
        } else {
            document.getElementById("ProposerTitle").options[0].disabled = false;
            document.getElementById("ProposerTitle").options[1].disabled = false;
            document.getElementById("ProposerTitle").options[2].disabled = false;
        }
    }

    if (laGender !== "Female" && laGender !== "Male" && laGender !== "Third Gender") {
        document.getElementById("genderErrId").style.display = "block";
        document.getElementById("genderErrId").innerHTML =
            "Please select your gender.";
        return false;
    } else {
        var age = this.getAgeFromBirthdate(getDDMMYYYY(self.getDob()));

        if (age < 18) {
            if (proposerGender !== "Female" && proposerGender !== "Male" && proposerGender !== "Third Gender") {
                console.log("1=", age);
                document.getElementById("proposerGenderErrorId").style.display = "block";
                document.getElementById("proposerGenderErrorId").innerHTML =
                    "Please select your gender.";
                return false;
            } else {
                document.getElementById("proposerGenderErrorId").style.display = "none";
                // return true;
                console.log("2=", age);
            }
        }
        document.getElementById("genderErrId").style.display = "none";
        return true;
    }
    return true;
}

function showOrHideRiderSection() {
    if (self.getsmartWealthAssureAge() >= 8 && self.getsmartWealthAssureAge() < 18) {
        document.getElementById("isDisplayADBRider").style.display = 'none'
        document.getElementById("rider-block").style.display = "none"
        document.getElementById("rider_switch").checked = false;
        document.forms["smartWealthAssureForm"]["smartWealthAssureADBTerm"].value = self.getPolicyTerm();
        document.forms["smartWealthAssureForm"]["adb_sum_assured"].value = "";
    } else {
        document.getElementById("isDisplayADBRider").style.display = 'block'
    }
}