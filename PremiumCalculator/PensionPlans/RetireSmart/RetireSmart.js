window.onload = function () {
    this.ready();
    // self.hideLoader();
};

var productDetails;

function ready() {
    //this.hideErrMsg();
    setKerlaDiscount();
    this.initArrayList();
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
    this.setPremiumAmountTitle()
    this.setTimeElapsedAndPayingTermTitle()
    document.getElementById("policyTermTitle").innerHTML = `Policy Term (10,${minPolicyTermLimit} to ${maxPolicyTermLimit})`
    this.setPremiumAmountTitle();
    this.setTimeElapsedAndPayingTermTitle();
};

function initializeData() {
    //document.forms["smartScholarForm"]["dob"].value = (new Date()).toISOString().substr(0, 10);
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
}

function initArrayList() {
    policyListElement = document.forms["retireSmartForm"]["retireSmartPolicyTerm"];
    policyListElement.add(new Option(10));
    for (i = minPolicyTermLimit; i <= maxPolicyTermLimit; i++) {
        policyListElement.add(new Option(i));
    }

    premiumPaymentModeListElement = document.forms["retireSmartForm"]["premiumFrqMode"];
    for (i = 0; i < premiumFrequencyModeList.length; i++) {
        premiumPaymentModeListElement.add(new Option(premiumFrequencyModeList[i].title, premiumFrequencyModeList[i].value));
    }

    premiumPaymentOptionListElement = document.forms["retireSmartForm"]["retireSmartPayingOption"];
    for (i = 0; i < premiumPaymentOptionList.length; i++) {
        premiumPaymentOptionListElement.add(new Option(premiumPaymentOptionList[i].title, premiumPaymentOptionList[i].value));
    }

    premiumPayingTermListElement = document.forms["retireSmartForm"]["retireSmartPayingTerm"];
    for (i = minPremiumPayingTermLimit; i <= maxPremiumPayingTermLimit; i++) {
        premiumPayingTermListElement.add(new Option(i));
    }

    maturityAnnuityOtherOptionElement = document.forms["retireSmartForm"]["maturityAnnuityOtherOption"];
    for (i = 0; i < maturityOption.length; i++) {
        maturityAnnuityOtherOptionElement.add(new Option(maturityOption[i].title));
    }
    maturityAnnuityOptionFreqElement = document.forms["retireSmartForm"]["maturityAnnuityOtherFreq"];
    for (i = 0; i < maturityAnnuityOptionFreqList.length; i++) {
        maturityAnnuityOptionFreqElement.add(new Option(maturityAnnuityOptionFreqList[i].title, maturityAnnuityOptionFreqList[i].title));
    }
    userType = getUserType();
}

function validateGender() {
    var gender = document.forms["retireSmartForm"]["gender"].value;

    document.forms["retireSmartForm"]["title"].options[0].disabled = false;
    document.forms["retireSmartForm"]["title"].options[1].disabled = false;
    document.forms["retireSmartForm"]["title"].options[2].disabled = false;

    if (gender !== "Female" && gender !== "Male" && gender !== "Third Gender") {
        document.getElementById('genderErrId').style.display = "block";
        document.getElementById('genderErrId').innerHTML = "Please select your gender.";
        return false;
    } else {
        document.getElementById('genderErrId').style.display = "none";
        if (gender == "Female") {
            document.forms["retireSmartForm"]["title"].value = "Mrs.";
            document.forms["retireSmartForm"]["title"].options[0].disabled = true;
        } else if (gender == "Male") {
            document.forms["retireSmartForm"]["title"].value = "Mr.";
            document.forms["retireSmartForm"]["title"].options[1].disabled = true;
            document.forms["retireSmartForm"]["title"].options[2].disabled = true;
        } else if (gender == "Third Gender") {
            document.forms["retireSmartForm"]["title"].options[0].disabled = false;
            document.forms["retireSmartForm"]["title"].options[1].disabled = false;
            document.forms["retireSmartForm"]["title"].options[2].disabled = false;
        }
        return true
    }
}

function validaBasicDetails() {
    var FName = document.forms["retireSmartForm"]["first_name"].value;
    var LName = document.forms["retireSmartForm"]["last_name"].value;
    if (FName == '' || FName == null || !isNaN(FName)) {
        document.getElementById("NameErrId").style.display = "block";
        document.getElementById("NameErrId").innerHTML = "Please enter first name";
        return false;
    } else if (LName == '' || LName == null || !isNaN(FName)) {
        document.getElementById("NameErrId").style.display = "block";
        document.getElementById("NameErrId").innerHTML = "Please enter last name";
        return false;
    } else {
        document.getElementById("NameErrId").style.display = "none";
        return true;
    }
}

function calculateAge(birthday) {
    var age = getAgeFromBirthdate(birthday);

    document.forms["retireSmartForm"]["age"].innerHTML = age;
    document.forms["retireSmartForm"]["age"].value = age;
    if (age < minAgeLimit || age > maxAgeLimit) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        return true;
    }
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

function validateEmailIdS() {
    var email = document.forms["retireSmartForm"]["emailId"].value;
    var cEmail = document.forms["retireSmartForm"]["confirmEmail"].value;
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

function valPremiumAmount() {
    var premiumAmount = document.forms["retireSmartForm"]["premiumAmount"].value;
    var modeIndex = document.forms["retireSmartForm"]["premiumFrqMode"].value;
    var mode = premiumFrequencyModeList[modeIndex].title;

    if (premiumAmount == '' || premiumAmount == null) {
        document.getElementById("premiumAmtErrId").style.display = "block";
        document.getElementById("premiumAmtErrId").innerHTML = "Please Enter Premium Amount in Rs. ";
    } else if (parseInt(premiumAmount) % 100 != 0) {
        document.getElementById("premiumAmtErrId").style.display = "block";
        document.getElementById("premiumAmtErrId").innerHTML = "Please enter Premium Amount in multiple of 100";
    } else {
        var minPremiumAmount = setPremiumAmountTitle();
        if (parseInt(premiumAmount) < minPremiumAmount) {
            document.getElementById("premiumAmtErrId").style.display = "block";
            document.getElementById("premiumAmtErrId").innerHTML = "For " + mode + " mode minimum Premium Amount is Rs. " +
                new Intl.NumberFormat('en-IN').format(minPremiumAmount);
        } else {
            document.getElementById("premiumAmtErrId").style.display = "none";
            return true;
        }

    }
}

function valPolicyTerm() {
    var minPolicyTerm = 10;
    var maxPolicyTerm = Math.min(35, Math.max(10, (80 - this.getAge())));
    //console.log(minPolicyTerm + " === " + maxPolicyTerm);
    if (getPolicyTerm() < minPolicyTerm || getPolicyTerm() > maxPolicyTerm) {
        document.getElementById("policyTermErrId").style.display = "block";
        document.getElementById("policyTermErrId").innerHTML = "Policy Term should be in between " + minPolicyTerm +
            " years to " + maxPolicyTerm + " years";
        return false;
    } else {
        document.getElementById("policyTermErrId").style.display = "none";
        var policyTerm = document.forms["retireSmartForm"]["retireSmartPolicyTerm"].value;
        document.getElementById('timeElapsed').value = policyTerm;
        return true;
    }
}

function valPremiumPayingTerm() {
    var payingOption = this.getPayingOption();
    if (payingOption == ("Regular")) {
        if (getPremiumPayingTerm() != getPolicyTerm()) {
            document.getElementById("premiumPayingErrId").style.display = "block";
            document.getElementById("premiumPayingErrId").innerHTML = "Please enter Premium Paying Term between " + getPolicyTerm() + " and " + getPolicyTerm();
            return false;
        } else {
            document.getElementById("premiumPayingErrId").style.display = "none";
            return true;
        }

    } else if (payingOption == ("LPPT")) {
        if (getPolicyTerm() == 10) {
            if (getPremiumPayingTerm() != 5 && getPremiumPayingTerm() != 8) {
                document.getElementById("premiumPayingErrId").style.display = "block";
                document.getElementById("premiumPayingErrId").innerHTML = "Please enter Premium Paying Term either 5 or 8";
                return false;
            } else {
                document.getElementById("premiumPayingErrId").style.display = "none";
                return true;
            }

        } else if (getPolicyTerm() > 10) {
            if (getPremiumPayingTerm() != 5 && getPremiumPayingTerm() != 8 && getPremiumPayingTerm() != 10 &&
                getPremiumPayingTerm() != 15) {
                document.getElementById("premiumPayingErrId").style.display = "block";
                document.getElementById("premiumPayingErrId").innerHTML = "Please enter Premium Paying Term 5,8,10 or 15";
                return false;
            } else {
                document.getElementById("premiumPayingErrId").style.display = "none";
                return true;
            }
        }
    }
    return true;
}

function valYearsElapsedSinceInception() {

    if (getYearElapsed() == ("") || getYearElapsed() == null) {
        document.getElementById("timeElapsedErrId").style.display = "block";
        document.getElementById("timeElapsedErrId").innerHTML = "Enter No. of Years Elapsed Since Inception.";
        return false;
    } else if (getYearElapsed() < 5) {
        document.getElementById("timeElapsedErrId").style.display = "block";
        document.getElementById("timeElapsedErrId").innerHTML = "No. of Years Elapsed Since Inception should not be less than 5 Years ";
        return false;
    } else if (getYearElapsed() > getPolicyTerm()) {
        document.getElementById("timeElapsedErrId").style.display = "block";
        document.getElementById("timeElapsedErrId").innerHTML = "Please enter no. of Years in the range of 5 to " +
            getPolicyTerm() + " Years.";
        return false;
    } else {
        document.getElementById("timeElapsedErrId").style.display = "none";
        return true;
    }
}

function setPremiumAmountTitle() {
    var paymentModeIndex = document.forms["retireSmartForm"]["retireSmartPayingOption"].value;
    var paymentMode = premiumPaymentOptionList[paymentModeIndex].title;
    if (paymentMode == "Regular") {
        return setPremiumAmountTitleForRegular();
    } else if (paymentMode == "LPPT") {
        return setPremiumAmountTitleForLPPT();
    }else {
        document.getElementById('premiumAmountTitle').innerHTML = `Premium Amount (Min. Rs. ${minSinglePremiumAmount})`;
        return minSinglePremiumAmount;
    }
}

function setPremiumAmountTitleForRegular() {
    var paymentModeIndex = document.forms["retireSmartForm"]["premiumFrqMode"].value;
    var paymentMode = premiumFrequencyModeList[paymentModeIndex].title;
    var premiumAmountTitle = document.getElementById('premiumAmountTitle'); // = Premium Amount(Min. Rs. 75,000)*
    switch (paymentMode) {
        //console.log(paymentMode)
        case "Monthly":
            premiumAmountTitle.innerHTML = `Premium Amount (Min. Rs. ${premiumFrequencyModeList[0].minRegularPremiumAmount})`;
            return premiumFrequencyModeList[0].minRegularPremiumAmount;

        case "Quarterly":
            premiumAmountTitle.innerHTML = `Premium Amount (Min. Rs. ${premiumFrequencyModeList[1].minRegularPremiumAmount})`;
            return premiumFrequencyModeList[1].minRegularPremiumAmount;

        case "Half Yearly":
            premiumAmountTitle.innerHTML = `Premium Amount (Min. Rs. ${premiumFrequencyModeList[2].minRegularPremiumAmount})`;
            return premiumFrequencyModeList[2].minRegularPremiumAmount;

        case "Yearly":
            premiumAmountTitle.innerHTML = `Premium Amount (Min. Rs. ${premiumFrequencyModeList[3].minRegularPremiumAmount})`;
            return premiumFrequencyModeList[3].minRegularPremiumAmount;

        default:
            //console.log(paymentMode)
            premiumAmountTitle.innerHTML = `Premium Amount (Min. Rs. ${premiumFrequencyModeList[0].minRegularPremiumAmount})`;
            return premiumFrequencyModeList[0].minRegularPremiumAmount;

    }
    //console.log(paymentMode);
}

function setPremiumAmountTitleForLPPT() {
    var paymentModeIndex = document.forms["retireSmartForm"]["premiumFrqMode"].value;
    var paymentMode = premiumFrequencyModeList[paymentModeIndex];
    var premiumAmountTitle = document.getElementById('premiumAmountTitle'); // = Premium Amount(Min. Rs. 75,000)*
    switch (paymentMode) {
        //console.log(paymentMode)
        case "Monthly":
            premiumAmountTitle.innerHTML = `Premium Amount (Min. Rs. ${premiumFrequencyModeList[0].minLPPTPremiumAmount})`;
            return premiumFrequencyModeList[0].minLPPTPremiumAmount;
        case "Quarterly":
            premiumAmountTitle.innerHTML = `Premium Amount (Min. Rs. ${premiumFrequencyModeList[1].minLPPTPremiumAmount})`;
            return premiumFrequencyModeList[1].minLPPTPremiumAmount;
        case "Half Yearly":
            premiumAmountTitle.innerHTML = `Premium Amount (Min. Rs. ${premiumFrequencyModeList[2].minLPPTPremiumAmount})`;
            return premiumFrequencyModeList[2].minLPPTPremiumAmount;
        case "Yearly":
            premiumAmountTitle.innerHTML = `Premium Amount (Min. Rs. ${premiumFrequencyModeList[3].minLPPTPremiumAmount})`;
            return premiumFrequencyModeList[3].minLPPTPremiumAmount;
        default:
            //console.log(paymentMode)
            premiumAmountTitle.innerHTML = `Premium Amount (Min. Rs. ${premiumFrequencyModeList[0].minLPPTPremiumAmount})`;
            return premiumFrequencyModeList[0].minLPPTPremiumAmount;

    }
    //console.log(paymentMode);
}


function setTimeElapsedAndPayingTermTitle() {
    var policyTerm = document.forms["retireSmartForm"]["retireSmartPolicyTerm"].value;
    //console.log(payingOption);
    document.getElementById('timeElapsedTitle').innerHTML = `No. of Years Elapsed Since Inception (5 to ${policyTerm})`;

    document.getElementById('timeElapsed').value = policyTerm;

    var payingOptionIndex = document.forms["retireSmartForm"]["retireSmartPayingOption"].value;
    var payingOption = premiumPaymentOptionList[payingOptionIndex].title;
    if (payingOption == "Regular") {
        document.getElementById('payingTermTitle').innerHTML = `Premium Paying Term (${policyTerm} or ${policyTerm})`;
    } else if (payingOption == "LPPT") {
        if (policyTerm == 10) {
            document.getElementById('payingTermTitle').innerHTML = `Premium Paying Term (5 or 8)`;
        } else {
            document.getElementById('payingTermTitle').innerHTML = `Premium Paying Term (5,8,10 or 15)`;
        }
    }

}

function hideAndShowSFINDetails() {
    var checkBox = document.getElementById('sfinFund');
    if (checkBox.checked == true) {
        document.getElementById('sfinFundDetails').style.display = "block";
    } else {
        document.getElementById('sfinFundDetails').style.display = "none";
    }
}

function onChangePremiumPayingOption() {
    var paymentModeIndex = document.forms["retireSmartForm"]["retireSmartPayingOption"].value;
    switch (paymentModeIndex) {
        case '0':
        case '1':
            document.getElementById('premiumFreqModeDiv').style.display = "block";
            document.getElementById('premiumPayingTermDiv').style.display = "block";
            break;
        case '2':
            document.getElementById('premiumFreqModeDiv').style.display = "none";
            document.getElementById('premiumPayingTermDiv').style.display = "none";
            break;
        default:
            break;
    }
}

function getIsStaffDiscount() {
    return document.forms["retireSmartForm"]["staff_discount"].checked;
}

function getMobileNo() {
    return document.forms["retireSmartForm"]["mobile"].value;
}

function getDob() {
    return document.forms["retireSmartForm"]["dob"].value;
}

function getCalculatedAge() {
    return parseInt(document.forms["retireSmartForm"]["age"].value)
}

function getPolicyTerm() {
    var policyTerm = parseInt(document.forms["retireSmartForm"]["retireSmartPolicyTerm"].value)
    if (policyTerm != undefined && policyTerm != null && policyTerm != '') {
        return policyTerm;
    }
    return 0;
}

function getTitle() {
    return document.forms["retireSmartForm"]["title"].value;
}

function getGender() {
    return document.forms["retireSmartForm"]["gender"].value;
}

function getFName() {
    return document.forms["retireSmartForm"]["first_name"].value;
}

function getMName() {
    return document.forms["retireSmartForm"]["middle_name"].value;
}

function getLName() {
    return document.forms["retireSmartForm"]["last_name"].value;
}

function getEmail() {
    return document.forms["retireSmartForm"]["emailId"].value;
}

function getConfirmEmail() {
    return document.forms["retireSmartForm"]["confirmEmail"].value;
}

function getAge() {
    var age = parseInt(document.forms["retireSmartForm"]["age"].value);
    if (age != undefined && age != null && age != '') {
        return age;
    } else {
        return 0
    }
}

function getFrequencyMode() {
    return premiumFrequencyModeList[document.forms["retireSmartForm"]["premiumFrqMode"].value].title;
}

function getPremiumAmount() {
    return parseInt(document.forms["retireSmartForm"]["premiumAmount"].value)
}

function getPayingOption() {
    return premiumPaymentOptionList[document.forms["retireSmartForm"]["retireSmartPayingOption"].value].title;
}

function getPremiumPayingTerm() {
    return parseInt(document.forms["retireSmartForm"]["retireSmartPayingTerm"].value)
}

function getYearElapsed() {
    return parseInt(document.forms["retireSmartForm"]["timeElapsed"].value)
}

function getMaturityAnnuityOption() {
    return document.forms["retireSmartForm"]["maturityAnnuityOtherOption"].value;
}

function getMaturityAnnuityFrequency() {
    return document.forms["retireSmartForm"]["maturityAnnuityOtherFreq"].value
}

function validatForm() {
    if (this.validateGender() && this.validaBasicDetails() && this.calculateAge(getDDMMYYYY(this.getDob())) && this.validateMobileNo(this.getMobileNo()) &&
        validateConfirmEmail() && valPremiumAmount() && valPolicyTerm() && valPremiumPayingTerm()) {
        this.calculatePremiumAPICall();
    } else {
        // alert("faild");
    }
}


function getInput(forminputbyuser) {
    console.log('getInputXML Begin');
    var premiumFreq = '';
    var premPayingTerm = '';
    if (getPayingOption() == "Single") {
        premiumFreq = "Single";
        premPayingTerm = 1;
    } else {
        premiumFreq = getFrequencyMode();
        premPayingTerm = getPremiumPayingTerm();
    }
    let getInputXML = `<?xml version='1.0' encoding='utf-8' ?><retiresmart>
    <LifeAssured_title>${this.getTitle()}</LifeAssured_title>
    <LifeAssured_firstName>${this.getFName()}</LifeAssured_firstName>
    <LifeAssured_middleName>${this.getMName()}</LifeAssured_middleName>
    <LifeAssured_lastName>${this.getFName()}</LifeAssured_lastName>
    <LifeAssured_DOB>${getDDMMYYYY(this.getDob())}</LifeAssured_DOB>
    <LifeAssured_age>${this.getAge()}</LifeAssured_age>
    <gender>${this.getGender()}</gender>

    <proposer_title></proposer_title>
    <proposer_firstName></proposer_firstName>
    <proposer_middleName></proposer_middleName>
    <proposer_lastName></proposer_lastName>
    <proposer_DOB></proposer_DOB>
    <proposer_age></proposer_age>
    <proposer_gender></proposer_gender>

    <product_name>${this.productDetails.title}</product_name>
    <product_Code>${this.productDetails.productCode}</product_Code>
    <product_UIN>${this.productDetails.uinNumber}</product_UIN>
    <product_cateogory>${product_cateogory}</product_cateogory>
    <product_type>${product_type}</product_type>

    <proposer_Is_Same_As_Life_Assured>Y</proposer_Is_Same_As_Life_Assured>

    <age>${self.getCalculatedAge()}</age>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <isStaff>${this.getIsStaffDiscount()}</isStaff>
    <premFreq>${premiumFreq}</premFreq>
    <premPayingOption>${self.getPayingOption()}</premPayingOption>
    <premiumAmount>${this.getPremiumAmount()}</premiumAmount>
    <noOfYrElapsed>${getYearElapsed()}</noOfYrElapsed>
    <premPayingTerm>${premPayingTerm}</premPayingTerm>
    <percent_equity_pension_fund></percent_equity_pension_fund>
    <percent_equity_optimiser_pension_fund></percent_equity_optimiser_pension_fund>
    <percent_growth_pension_fund></percent_growth_pension_fund>
    <percent_bond_pension_fund3></percent_bond_pension_fund3>
    <percent_money_market_pension_fund3></percent_money_market_pension_fund3>
    <bi_retire_smart_plan_option>Advantage Plan</bi_retire_smart_plan_option>
    <MATUIRTY_OPTION>${getMaturityAnnuityOption()}</MATUIRTY_OPTION>
    <MATUIRTY_FREQUENCY>${getMaturityAnnuityFrequency()}</MATUIRTY_FREQUENCY>
    <KFC>${forminputbyuser.KFC}</KFC>
  </retiresmart>`;
    console.log('getInputXML End');
    return getInputXML;
}

function calculatePremiumAPICall() {
    var premiumFreq = '';
    var premPayingTerm = '';
    if (getPayingOption() == "Single") {
        premiumFreq = getFrequencyMode();
        premPayingTerm = getPremiumPayingTerm();
    } else {
        premiumFreq = getFrequencyMode();
        premPayingTerm = getPremiumPayingTerm();
    }
    let xmlBodyParam = `<getPremiumRetireSmart xmlns="http://tempuri.org/">
    <isStaff>${self.getIsStaffDiscount()}</isStaff>
    <age>${self.getCalculatedAge()}</age>
    <gender>${self.getGender()}</gender>
    <policyTerm>${self.getPolicyTerm()}</policyTerm>
    <premFreqMode>${premiumFreq}</premFreqMode>
    <premiumAmount>${self.getPremiumAmount()}</premiumAmount>
    <premPayingOption>${self.getPayingOption()}</premPayingOption>
    <premPayingTerm>${premPayingTerm}</premPayingTerm>
    <noOfYrElapsed>${self.getYearElapsed()}</noOfYrElapsed>
    <fundOption>Advantage Plan</fundOption>
    <perInvEquityPensionFund></perInvEquityPensionFund>
    <perInvEquityOptPensionFund></perInvEquityOptPensionFund>
    <perInvGrowthPensionFund></perInvGrowthPensionFund>
    <perInvBondPensionFund></perInvBondPensionFund>
    <perInvMoneyMarketPensionFund></perInvMoneyMarketPensionFund>
    <KFC>${getKerlaDiscount()}</KFC>
    <annuityOption>${getMaturityAnnuityOption()}</annuityOption>
  </getPremiumRetireSmart>`;

    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        ${xmlBodyParam}
                    </soap:Body>
                </soap:Envelope>`;

    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {
        self.showLoader();
        var staffDiscount = 'No';
        if (self.getIsStaffDiscount()) {
            staffDiscount = "Yes"
        }

        var planCode = '';

        if (self.getPayingOption() === ("Regular"))
            planCode = "SRSRP0";
        else
            planCode = "SRSLP0";

            let forminputbyuser = {
                staffDiscount: self.getIsStaffDiscount(),
                gender: self.getGender(),
                proposerName: self.getTitle() + " " + self.getFName() + " " + self.getLName(),
                ageEntry: self.getAge(),
                policyTerm: self.getPolicyTerm(),
                frequencyMode: self.getFrequencyMode(),
                premiumAmount: self.getPremiumAmount(),
                premiumPayingOption: self.getPayingOption(),
                premiumPayingTerm: self.getPremiumPayingTerm(),
                numberOfYear: self.getYearElapsed(),
                quotationNumber: quotNumber,
                staffDiscount: staffDiscount,
                PlanName: self.productDetails.title,
                CustTitle: self.getTitle(),
                CustFirstName: self.getFName(),
                CustMiddleName: self.getMName(),
                CustLastName: self.getLName(),
                CustMobile: self.getMobileNo(),
                CustEmailID: self.getEmail(),
                LaDOB: getDDMMYYYY(self.getDob()),
                ProposerDOB: '',
                BasicSA: '0',
                TotalPremAmt: self.getPremiumAmount(),
                Frequency: self.getFrequencyMode(),
                PolicyTerm: self.getPolicyTerm(),
                PremPayingTermPDF: self.getPremiumPayingTerm(),
                PlanCode: planCode,
                KFC: getKerlaDiscount() ? "Y" : "N",
                userType: userType,
                modeOrFreqOfPremiumpayment: '',
                maturityAnnuityoption: getMaturityAnnuityOption(),
                PremPayingTerm: 0,
                illustrationPurposeText: ''
            };
            let inputXml = getInput(forminputbyuser)
    

        ApiCallService('/getPremiumRetireSmart', body, '<retireSmart>', '</retireSmart>', true).then((data) => {
            self.hideLoader();
            data = data.retireSmart;
            console.log("data = ", data.sumAssured);
            data.productDetails = this.productDetails
            forminputbyuser.BasicSA = data.sumAssured;
            forminputbyuser.totalFirstYrPremium = data.totFyPrem;
            var annuityRates = ((data.annuityRates !== undefined && data.annuityRates !== null) ? data.annuityRates : 0);
            console.log("dgdf ", getMaturityAnnuityOption().includes("Life and Last  Survivor"));
            if (getMaturityAnnuityOption().includes("Life and Last  Survivor")) {
                forminputbyuser.illustrationPurposeText = 'The values shown above are for illustration purpose only. This illustration is based on an annuity rate of ' +
                    annuityRates +
                    ' per INR 1000 vesting amount. We do not guarantee the annuity rates.  The actual annuity amount depends on the prevailing annuity rates at the time of vesting. The amounts of annuity based on the assumed investment return of 8% p.a & 4% p.a. are not upper or lower limits of what you might get back. For details on risk factors, terms and conditions, please read sales brochure carefully.' + '\n' + 'For the calculation of annuity rate, we have considered the same age for primary Annuitants and secondary Annuitants.';
            } else {
                forminputbyuser.illustrationPurposeText = 'The values shown above are for illustration purpose only. This illustration is based on an annuity rate of ' +
                    annuityRates +
                    ' per INR 1000 vesting amount. We do not guarantee the annuity rates.  The actual annuity amount depends on the prevailing annuity rates at the time of vesting. The amounts of annuity based on the assumed investment return of 8% p.a & 4% p.a. are not upper or lower limits of what you might get back. For details on risk factors, terms and conditions, please read sales brochure carefully.'
            }
            console.log("fefe : " + forminputbyuser.illustrationPurposeText);
            if (getPayingOption() == "Single") {
                forminputbyuser.PremPayingTermPDF = 'One time at the inception of the policy';
                forminputbyuser.modeOrFreqOfPremiumpayment = 'One time at the inception of the policy';
            } else {
                forminputbyuser.modeOrFreqOfPremiumpayment = premiumFreq;
                if (getPayingOption() == "Regular") {
                    forminputbyuser.PremPayingTermPDF = 'Same as Policy Term';
                } else {
                    forminputbyuser.PremPayingTermPDF = self.getPremiumPayingTerm();
                }
            }
            var stringifyJson = JSON.stringify(data);

            //Added by sonali
            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</CommIfPay8Pr${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</CommIfPay8Pr${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                var index = forminputbyuser.policyTerm;
                var FundValAtEnd4Pr = parseXmlTag(premiumCalcXMLResponse, "FundValAtEnd4Pr" + index + "");
                var FundValAtEnd8Pr = parseXmlTag(premiumCalcXMLResponse, "FundValAtEnd8Pr" + index + "");
                var FundValAtEnd = '';
                FundValAtEnd += "<FundValAtEnd4Pr" + index + ">" + FundValAtEnd4Pr + "</FundValAtEnd4Pr" + index + ">";
                FundValAtEnd += "<FundValAtEnd8Pr" + index + ">" + FundValAtEnd8Pr + "</FundValAtEnd8Pr" + index + ">";
                remaningOutput = remaningOutput + FundValAtEnd + "</RetireSmart>";
                remaningOutput = remaningOutput.replace("retireSmart", "RetireSmart");
                let output = appendXMLTagAtStart(remaningOutput);

                let escapedBIOutput = escapeInputHTML(output);
                sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.

                let escapedBIInput = escapeInputHTML(inputXml);
                sessionStorage.setItem("BIInput", escapedBIInput); // BI Input.
                console.log("remaningOutput ", remaningOutput);
            }
            //end
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
                    window.location.href = "./../../PremiumCalSuccess/success.html";
                }
            }


        }).catch((error) => {
            console.log(" in error ", error);
            self.hideLoader();
        });
    }).catch((message) => {
        self.hideLoader();
        console.log(" in error ", message);
        alert("Unable to generate quotation number")
    });
}