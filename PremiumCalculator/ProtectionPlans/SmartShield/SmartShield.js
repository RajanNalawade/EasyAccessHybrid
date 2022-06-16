window.onload = function () {
    this.ready();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails;
var proposer_Is_Same_As_Life_Assured = "Y";

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    setKerlaDiscount();
    // self.hideLoader();
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
    this.initArrayList();
};

function initializeData() {
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
    // this.oncc13NonLinkedRiderUpdate();
    this.onADBRiderUpdate();
    this.onATPDBRiderUpdate();
}

function initArrayList() {
    planElement = document.forms["smartShieldForm"]["plan"];
    for (i = 0; i < planOptionList.length; i++) {
        planElement.add(new Option(planOptionList[i].title, planOptionList[i].value));
    }

    policyListElement = document.forms["smartShieldForm"]["policyTerm"];
    for (i = minPolicyTermLimit; i <= maxPolicyTermLimit; i++) {
        policyListElement.add(new Option(i, i));
    }

    premiumFrequencyElement = document.forms["smartShieldForm"]["premiumFrequency"];
    for (i = 0; i < premiumPaymentModeList.length; i++) {
        premiumFrequencyElement.add(new Option(premiumPaymentModeList[i].title, premiumPaymentModeList[i].value));
    }

    document.forms["smartShieldForm"]["isSmoker"].value = "Non-Smoker";
}

function calculateAge(birthday) {
    var age = getAgeFromBirthdate(birthday);
    document.forms["smartShieldForm"]["age"].innerHTML = age;
    document.forms["smartShieldForm"]["age"].value = age;
    if (age < minAgeLimit || age > maxAgeLimit) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        return true;
    }
}

function validateGender() {
    var gender = document.forms["smartShieldForm"]["gender"].value;

    document.forms["smartShieldForm"]["smartShieldTitle"].options[0].disabled = false;
    document.forms["smartShieldForm"]["smartShieldTitle"].options[1].disabled = false;
    document.forms["smartShieldForm"]["smartShieldTitle"].options[2].disabled = false;

    if (gender !== "Female" && gender !== "Male" && gender !== "Third Gender") {
        document.getElementById('genderErrId').style.display = "block";
        document.getElementById('genderErrId').innerHTML = "Please select your gender.";
        return false;
    } else {
        document.getElementById('genderErrId').style.display = "none";

        if (gender == "Female") {
            document.forms["smartShieldForm"]["smartShieldTitle"].value = "Mrs.";
            document.forms["smartShieldForm"]["smartShieldTitle"].options[0].disabled = true;
        } else if (gender == "Male") {
            document.forms["smartShieldForm"]["smartShieldTitle"].value = "Mr.";
            document.forms["smartShieldForm"]["smartShieldTitle"].options[1].disabled = true;
            document.forms["smartShieldForm"]["smartShieldTitle"].options[2].disabled = true;
        } else {
            document.getElementById("smartShieldTitle").options[0].disabled = false;
            document.getElementById("smartShieldTitle").options[1].disabled = false;
            document.getElementById("smartShieldTitle").options[2].disabled = false;
        }

        return true;
    }
}

function validateMobileNo(mobileNo) {
    if (mobileNo.length !== 10) {
        document.getElementById('mobileNoErrId').style.display = "block";
        document.getElementById('mobileNoErrId').innerHTML = "Mobile number should be 10 digits.";
        return false;
    } else {
        document.getElementById('mobileNoErrId').style.display = "none";
        return true;
    }
}

/* function oncc13NonLinkedRiderUpdate() {
    var isPTARiderChosen = document.forms["smartShieldForm"]["cc13NonLinkedRiderChosen"].checked;
    var ccBlocks = document.getElementsByClassName('cc13NonLinkedRiderChecked');
    if (isPTARiderChosen) {
        for (i = 0; i < ccBlocks.length; i++) {
            ccBlocks[i].style.display = "block";
        }
        ptaRiderTermListElement = document.forms["smartShieldForm"]["cc13NonLinkedRiderTerm"];
        ptaRiderTermListElement.innerHTML = '';
        for (i = minCC13TermLimit; i <= maxCC13TermLimit; i++) {
            ptaRiderTermListElement.add(new Option(i, i));
        }
        document.forms["smartShieldForm"]["cc13NonLinkedSumAssured"].required = true;
    } else {
        for (i = 0; i < ccBlocks.length; i++) {
            ccBlocks[i].style.display = "none";
        }
        document.forms["smartShieldForm"]["cc13NonLinkedSumAssured"].required = false;
    }
} */

function onADBRiderUpdate() {
    var isADBRiderChosen = document.forms["smartShieldForm"]["adbRiderChosen"].checked;
    var adbBlocks = document.getElementsByClassName('adbRiderChecked');
    if (isADBRiderChosen) {
        for (i = 0; i < adbBlocks.length; i++) {
            adbBlocks[i].style.display = "block";
        }
        adbRiderTermListElement = document.forms["smartShieldForm"]["adbRiderTerm"];
        adbRiderTermListElement.innerHTML = '';
        for (i = minADBRiderTermLimit; i <= maxADBRiderTermLimit; i++) {
            adbRiderTermListElement.add(new Option(i, i));
        }
        document.forms["smartShieldForm"]["adbSumAssured"].required = false;
    } else {
        for (i = 0; i < adbBlocks.length; i++) {
            adbBlocks[i].style.display = "none";
        }
        document.forms["smartShieldForm"]["adbSumAssured"].required = false;
    }
}

function onATPDBRiderUpdate() {
    var isATPDBRiderChosen = document.forms["smartShieldForm"]["ATPDBRiderChosen"].checked;
    var atpdbBlocks = document.getElementsByClassName('atpdbRiderChecked');
    if (isATPDBRiderChosen) {
        for (i = 0; i < atpdbBlocks.length; i++) {
            atpdbBlocks[i].style.display = "block";
        }
        atpdbRiderTermListElement = document.forms["smartShieldForm"]["atpdbRiderTerm"];
        atpdbRiderTermListElement.innerHTML = '';
        for (i = minATPDBenefitRiderTermLimit; i <= maxATPDBenefitRiderTermLimit; i++) {
            atpdbRiderTermListElement.add(new Option(i, i));
        }
        document.forms["smartShieldForm"]["atpdbSumAssured"].required = false;
    } else {
        for (i = 0; i < atpdbBlocks.length; i++) {
            atpdbBlocks[i].style.display = "none";
        }
        document.forms["smartShieldForm"]["atpdbSumAssured"].required = false;
    }
}

function validateSumAssured() {
    var isValidationSuccessful = true;
    var sumAssured = this.getSumAssured();
    if (isNaN(sumAssured) || sumAssured === undefined || sumAssured === null || sumAssured === '') {
        document.getElementById('sumAssuredErrId').style.display = "block";
        document.getElementById('sumAssuredErrId').innerHTML = `Sum assured should be greater than or equal to ${new Intl.NumberFormat('en-IN').format(minLimitOfSumAssured)}`;
        isValidationSuccessful = false;
    } else if (sumAssured < minLimitOfSumAssured) {
        document.getElementById('sumAssuredErrId').style.display = "block";
        document.getElementById('sumAssuredErrId').innerHTML = `Sum assured should be greater than or equal to ${new Intl.NumberFormat('en-IN').format(minLimitOfSumAssured)}`;
        isValidationSuccessful = false;
    } else if (sumAssured % 100000 !== 0) {
        document.getElementById('sumAssuredErrId').style.display = "block";
        document.getElementById('sumAssuredErrId').innerHTML = `Sum assured should be multiple of 1,00,000`;
        isValidationSuccessful = false;
    } else {
        document.getElementById('sumAssuredErrId').style.display = "none";
    }

    /*
    if (this.getCCRiderChosen()) {
        minRiderSumAssuredLimit = 25000;
        maxRiderSumAssuredLimit = Math.min(2000000, sumAssured);
        if (isNaN(this.getCCRiderSumAssured()) || this.getCCRiderSumAssured() < minRiderSumAssuredLimit || this.getCCRiderSumAssured() > maxRiderSumAssuredLimit) {
            document.getElementById('ccSumAssuredErrId').style.display = "block";
            document.getElementById('ccSumAssuredErrId').innerHTML = `Enter Sum assured for Criti Care 13 Non Linked Rider between ${new Intl.NumberFormat('en-IN').format(minRiderSumAssuredLimit)} and ${new Intl.NumberFormat('en-IN').format(maxRiderSumAssuredLimit)}`;
            isValidationSuccessful = false;
        } else if (this.getCCRiderSumAssured() % 1000 !== 0) {
            document.getElementById('ccSumAssuredErrId').style.display = "block";
            document.getElementById('ccSumAssuredErrId').innerHTML = `Sum assured for Criti Care 13 Non Linked Rider should be multiple of 1,000`;
            isValidationSuccessful = false;
        } else {
            document.getElementById('ccSumAssuredErrId').style.display = "none";
        }
    } else {
        document.getElementById('ccSumAssuredErrId').style.display = "none";
    } */

    if (this.getADBRiderChosen()) {
        minRiderSumAssuredLimit = 25000;
        maxRiderSumAssuredLimit = Math.min(5000000, sumAssured);
        if (isNaN(this.getADBRiderSumAssured()) || this.getADBRiderSumAssured() < minRiderSumAssuredLimit || this.getADBRiderSumAssured() > maxRiderSumAssuredLimit) {
            document.getElementById('adbRiderSumAssuredErrId').style.display = "block";
            document.getElementById('adbRiderSumAssuredErrId').innerHTML = `Enter Sum assured for Accidental Death Benefit Rider between ${new Intl.NumberFormat('en-IN').format(minRiderSumAssuredLimit)} and ${new Intl.NumberFormat('en-IN').format(maxRiderSumAssuredLimit)}`;
            isValidationSuccessful = false;
        } else if (this.getADBRiderSumAssured() % 1000 !== 0) {
            document.getElementById('adbRiderSumAssuredErrId').style.display = "block";
            document.getElementById('adbRiderSumAssuredErrId').innerHTML = `Sum assured for Accidental Death Benefit(ADB) Rider should be multiple of 1,000`;
            isValidationSuccessful = false;
        } else {
            document.getElementById('adbRiderSumAssuredErrId').style.display = "none";
        }
    } else {
        document.getElementById('adbRiderSumAssuredErrId').style.display = "none";
    }

    if (this.getATPDBRiderChosen()) {
        minRiderSumAssuredLimit = 25000;
        maxRiderSumAssuredLimit = Math.min(5000000, sumAssured);
        //console.log("this.getATPDBRiderSumAssured() ", this.getATPDBRiderSumAssured());

        if (isNaN(this.getATPDBRiderSumAssured()) || this.getATPDBRiderSumAssured() === undefined || this.getATPDBRiderSumAssured() === null || this.getATPDBRiderSumAssured() < minRiderSumAssuredLimit || this.getATPDBRiderSumAssured() > maxRiderSumAssuredLimit) {
            document.getElementById('atpdbSumAssuredErrId').style.display = "block";
            document.getElementById('atpdbSumAssuredErrId').innerHTML = `Enter Sum assured for Accidental Total and Permenent Disability Benefit Rider between ${new Intl.NumberFormat('en-IN').format(minRiderSumAssuredLimit)} and ${new Intl.NumberFormat('en-IN').format(maxRiderSumAssuredLimit)}`;
            isValidationSuccessful = false;
        } else if (this.getATPDBRiderSumAssured() % 1000 !== 0) {
            document.getElementById('atpdbSumAssuredErrId').style.display = "block";
            document.getElementById('atpdbSumAssuredErrId').innerHTML = `Sum assured for Accidental Total and Permenent Disability Benefit(ATPDB) Rider should be multiple of 1,000`;
            isValidationSuccessful = false;
        } else {
            document.getElementById('atpdbSumAssuredErrId').style.display = "none";
        }
    } else {
        document.getElementById('atpdbSumAssuredErrId').style.display = "none";
    }
    return isValidationSuccessful;
}

function validatePolicyTerm() {
    if (this.getPolicyTerm() > Math.min(80, 80 - this.getAge())) {
        document.getElementById('maturityAgeErrId').style.display = "block";
        document.getElementById('maturityAgeErrId').innerHTML = `Minimum Term limit is 5 and maximum limit is ${Math.min(80, 80-this.getAge())}`;
        return false;
    }
    document.getElementById('maturityAgeErrId').style.display = "none";
    return true;
}

function validateTermRider() {
    var isValidationSuccessful = true;
    let maxRiderTermLimit_ACI = this.getPolicyTerm(),
        maxLimit = Math.min(30, Math.min(this.getPolicyTerm(), 70 - this.getAge()));

    /*
    if (this.getCCRiderChosen() && this.getCCRiderTerm() > maxRiderTermLimit_ACI) {
        document.getElementById('ccRiderTermErrId').style.display = "block";
        document.getElementById('ccRiderTermErrId').innerHTML = `Please enter Policy Term of Criti Care 13 Non Linked Rider between 5 and ${maxRiderTermLimit_ACI}.`;
        isValidationSuccessful = false;
        // this.setViewCritiCare13NonLinkedRider = false;
    } else {
        document.getElementById('ccRiderTermErrId').style.display = "none";
    } */

    if (this.getADBRiderChosen() && this.getADBRiderTerm() > maxLimit) {
        document.getElementById('adbRiderTermErrId').style.display = "block";
        document.getElementById('adbRiderTermErrId').innerHTML = `Maximum term for Accidental Death Benefit Rider is ${maxLimit} years.`;
        isValidationSuccessful = false;
        // this.setViewAccidentalDeathBenefitRider = false;
    } else {
        document.getElementById('adbRiderTermErrId').style.display = "none";
    }

    if (this.getATPDBRiderChosen() && this.getATPDBRiderTerm() > maxLimit) {
        document.getElementById('atpdbRiderTermErrId').style.display = "block";
        document.getElementById('atpdbRiderTermErrId').innerHTML = `Maximum term for Accidental Total and Permenent Disability Benefit Rider is ${maxLimit} years.`;
        isValidationSuccessful = false;
        // this.setViewAccidentalTotalAndPermanentDisabilityBenefitRider = false;
    } else {
        document.getElementById('atpdbRiderTermErrId').style.display = "none";
    }
    return isValidationSuccessful;
}

/*
function validateCritiCare13Rider() {
    let sum = this.getAge() + (this.getCCRiderChosen() ? this.getCCRiderTerm() : 0);
    if (this.getCCRiderChosen()) {
        if (sum > 64) {
            document.getElementById('ccMaturityAgeErrId').style.display = 'block';
            document.getElementById('ccMaturityAgeErrId').innerHTML = `Maturity age for criti care-13 is 64 years.`;
            return false;
        } else if (this.getAge() > 55) {
            document.getElementById('ccMaturityAgeErrId').style.display = 'block';
            document.getElementById('ccMaturityAgeErrId').innerHTML = `Maximum Life assured age for criti care-13 is 55 years.`;
            return false;
        }
    }
    document.getElementById('ccMaturityAgeErrId').style.display = 'none';
    return true;
}
*/

/* ***********************   GETTERS ************************* */
function getAge() {
    return parseInt(document.forms["smartShieldForm"]["age"].value, 10);
}

function getEmail() {
    return document.forms["smartShieldForm"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["smartShieldForm"]["confirmEmail"].value;
}

function getDOB() {
    return document.forms["smartShieldForm"]["dob"].value;
}

function getMobileNo() {
    return document.forms["smartShieldForm"]["mobile"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["smartShieldForm"]["policyTerm"].value, 10);
}

function getSumAssured() {
    return parseInt(document.forms["smartShieldForm"]["sumAssured"].value, 10);
}

function getPremiumFrequency() {
    var index = document.forms["smartShieldForm"]["premiumFrequency"].value;
    return premiumPaymentModeList[index - 1];
}

function getPlan() {
    var index = document.forms["smartShieldForm"]["plan"].value;
    return planOptionList[index - 1];
}

function getGender() {
    return document.forms["smartShieldForm"]["gender"].value;
}

function getIsStaffDiscount() {
    return document.forms["smartShieldForm"]["staff_discount"].checked;
}

function getIsSmoker() {
    return document.forms["smartShieldForm"]["isSmoker"].value;
}

/*
function getCCRiderChosen() {
    return document.forms["smartShieldForm"]["cc13NonLinkedRiderChosen"].checked;
}

function getCCRiderTerm() {
    return parseInt(document.forms["smartShieldForm"]["cc13NonLinkedRiderTerm"].value, 10);
}

function getCCRiderSumAssured() {
    return parseInt(document.forms["smartShieldForm"]["cc13NonLinkedSumAssured"].value, 10);
}
*/
function getADBRiderChosen() {
    return document.forms["smartShieldForm"]["adbRiderChosen"].checked;
}

function getADBRiderTerm() {
    return parseInt(document.forms["smartShieldForm"]["adbRiderTerm"].value, 10);
}

function getADBRiderSumAssured() {
    return parseInt(document.forms["smartShieldForm"]["adbSumAssured"].value, 10);
}

function getATPDBRiderChosen() {
    return document.forms["smartShieldForm"]["ATPDBRiderChosen"].checked;
}

function getATPDBRiderTerm() {
    return parseInt(document.forms["smartShieldForm"]["atpdbRiderTerm"].value, 10);
}

function getATPDBRiderSumAssured() {
    return parseInt(document.forms["smartShieldForm"]["atpdbSumAssured"].value, 10);
}

function fName() {
    return document.forms["smartShieldForm"]["first_name"].value;
}

function MName() {
    return document.forms["smartShieldForm"]["middle_name"].value;
}

function LName() {
    return document.forms["smartShieldForm"]["last_name"].value;
}

function getTitle() {
    return document.forms["smartShieldForm"]["smartShieldTitle"].value;
}

/* ******************************  FORM VALIDATION & SUBMIT **************************** */
function validatForm() {
    if (smartShieldForm.checkValidity() && this.validateGender() && this.validateConfirmEmail() &&
        this.calculateAge(getDDMMYYYY(self.getDOB())) && this.validateMobileNo(self.getMobileNo()) &&
        this.validatePolicyTerm() && this.validateSumAssured() && this.validateTermRider() /*  && this.validateCritiCare13Rider() */ ) {
        //console.log("submit");
        this.calculatePremiumAPICall(); // form valid
    }
}

function calculatePremiumAPICall() {
    self.showLoader();
    let xmlBodyParam = `<getPremiumSmartShieldNew xmlns="http://tempuri.org/">
    <isStaff>${this.getIsStaffDiscount()}</isStaff>
    <isJkResident>false</isJkResident>
    <smokerType>${this.getIsSmoker()}</smokerType>
    <age>${this.getAge()}</age>
    <gender>${this.getGender()}</gender>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <premFreq>${this.getPremiumFrequency().title}</premFreq>
    <sumAssured>${this.getSumAssured()}</sumAssured>
    <plan>${this.getPlan().title}</plan>
    <isADBRider>${this.getADBRiderChosen()}</isADBRider>
    <adbTerm>${this.getADBRiderChosen() ? this.getADBRiderTerm() : 0}</adbTerm>
    <adbSA>${this.getADBRiderChosen() ? this.getADBRiderSumAssured() : 0}</adbSA>
    <isATPDBRider>${this.getATPDBRiderChosen()}</isATPDBRider>
    <atpdbTerm>${this.getATPDBRiderChosen() ? this.getATPDBRiderTerm() : 0}</atpdbTerm>
    <atpdbSA>${this.getATPDBRiderChosen() ? this.getATPDBRiderSumAssured() : 0}</atpdbSA>
    <isCC13Rider>false</isCC13Rider>
    <cc13Term></cc13Term>
    <cc13SA></cc13SA>
    <loanRtofInterest>0</loanRtofInterest>
    <KFC>${getKerlaDiscount()}</KFC>
  </getPremiumSmartShieldNew>`;

    //console.log("xmlBodyParam ", xmlBodyParam);

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
        if (self.getIsStaffDiscount() === "true") {
            staffDiscount = "Yes";
        } else {
            staffDiscount = "No";
        }

        let planCode;
        console.log(self.getPlan());
        switch (self.getPlan().title) {
            case "Level Term Assurance":
                planCode = "SHIELD2A";
                break;
            case "Increasing Term Assurance":
                planCode = "SHIELD2D";
                break;
            case "Decreasing Term Assurance[Loan Protection]":
                planCode = "SHIELD2B";
                break;
            case "Decreasing Term Assurance[Family Income Protection]":
                planCode = "SHIELD2C";
                break;
        }

        let forminputbyuser = {
            staff_discount: self.getIsStaffDiscount(),
            smokerType: self.getIsSmoker(),
            proposerName: self.fName() + " " + self.LName(),
            age: self.getAge(),
            gender: self.getGender(),
            policyTerm: self.getPolicyTerm(),
            premiumFrequency: this.getPremiumFrequency().title,
            sumAssured: this.getSumAssured(),
            planOption: self.getPlan().title,
            isADBRider: this.getADBRiderChosen(),
            adbTerm: this.getADBRiderChosen() ? this.getADBRiderTerm() : 0,
            adbSA: this.getADBRiderChosen() ? this.getADBRiderSumAssured() : 0,
            isATPDBRider: this.getATPDBRiderChosen(),
            atpdbTerm: this.getATPDBRiderChosen() ? this.getATPDBRiderTerm() : 0,
            atpdbSA: this.getATPDBRiderChosen() ? this.getATPDBRiderSumAssured() : 0,
            isCC13Rider: false,
            // cc13Term: this.getCCRiderTerm(),
            // cc13SA: this.getCCRiderSumAssured(),
            quotationNumber: quotNumber,
            staffDiscount: staffDiscount,
            PlanName: self.productDetails.title,
            CustTitle: self.getTitle(),
            CustFirstName: self.fName(),
            CustMiddleName: self.MName(),
            CustLastName: self.LName(),
            CustMobile: self.getMobileNo(),
            CustEmailID: self.getEmail(),
            LaDOB: getDDMMYYYY(self.getDOB()),
            ProposerDOB: '',
            BasicSA: this.getSumAssured(),
            Frequency: this.getPremiumFrequency().title,
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: '0',
            PlanCode: planCode,
            KFC: getKerlaDiscount() ? "Y" : "N"
        };

        let input = self.getInput(forminputbyuser);
        console.log("input = ", input);

        self.ApiCallService('/getPremiumSmartShieldNew', body, '<smartShield>', '</smartShield>', true).then((data) => {
            self.hideLoader();
            data = data.smartShield;
            var error = data.errCode;
            if (error != undefined && error == 1) {
                if (data.minPremError != undefined) {
                    alert(data.minPremError)
                    return;
                } else if (data.minRiderPremError != undefined) {
                    alert(data.minRiderPremError)
                    return;
                }
            }
            console.log("dat = ", data);
            data.isStaffDiscount = this.getIsStaffDiscount();
            data.productDetails = self.productDetails;
            // data.isCriticalRiderChecked = self.getCCRiderChosen();
            data.isADBRiderChecked = self.getADBRiderChosen();
            data.isATPDBRiderChecked = self.getATPDBRiderChosen();
            var stringifyJson = JSON.stringify(data);

            //added on 7/6/2019
            let output = getOutput(forminputbyuser, data);
            console.log("output = ", output);
            let escapedBIOutput = escapeInputHTML(output);
            sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.

            //Assign Total Premium from Service Output
            forminputbyuser.TotalPremAmt = data.InstmntPremWthST;

            if (sessionStorage.ThroughNeedAnalysis) {
                let status = sessionStorage.getItem('ThroughNeedAnalysis');

                if (status === 'Yes') {
                    updateDataInDB(forminputbyuser).then((resolve) => {
                        if (resolve == "1") {
                            createPDFGeneralMethod(self.productDetails, data, forminputbyuser)
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

function getInput(forminputbyuser) {
    var inputVal = "";
    inputVal += `<?xml version='1.0' encoding='utf-8' ?><smartshield>`;

    inputVal += `<LifeAssured_title>${self.getTitle()}</LifeAssured_title>`;
    inputVal += `<LifeAssured_firstName>${self.fName()}</LifeAssured_firstName>`;
    inputVal += `<LifeAssured_middleName>${self.MName()}</LifeAssured_middleName>`;
    inputVal += `<LifeAssured_lastName>${self.LName()}</LifeAssured_lastName>`;
    inputVal += `<LifeAssured_DOB>${getDDMMYYYY(self.getDOB())}</LifeAssured_DOB>`;
    inputVal += `<LifeAssured_age>${self.getAge()}</LifeAssured_age>`;
    inputVal += `<gender>${self.getGender()}</gender>`;
    inputVal += `<proposer_title></proposer_title>`;
    inputVal += `<proposer_firstName></proposer_firstName>`;
    inputVal += `<proposer_middleName></proposer_middleName>`;
    inputVal += `<proposer_lastName></proposer_lastName>`;
    inputVal += `<proposer_DOB></proposer_DOB>`;
    inputVal += `<proposer_age></proposer_age>`;
    inputVal += `<proposer_gender></proposer_gender>`;
    inputVal += `<product_name>${product_name}</product_name>`;
    inputVal += `<product_Code>${product_code}</product_Code>`;
    inputVal += `<product_UIN>${product_uin}</product_UIN>`;
    inputVal += `<product_cateogory>${product_cateogory}</product_cateogory>`;
    inputVal += `<product_type>${product_type}</product_type>`;
    inputVal += `<proposer_Is_Same_As_Life_Assured>${proposer_Is_Same_As_Life_Assured}</proposer_Is_Same_As_Life_Assured>`;
    inputVal += `<isJKResident>false</isJKResident>`;
    inputVal += `<isStaff>${self.getIsStaffDiscount()}</isStaff>`;
    inputVal += `<isSmoker>${self.getIsSmoker() == "Smoker"}</isSmoker>`;
    inputVal += `<age>${self.getAge()}</age>`;
    inputVal += `<plan>${forminputbyuser.planOption}</plan>`;
    inputVal += `<policyTerm>${forminputbyuser.policyTerm}</policyTerm>`;
    inputVal += `<isAccCIRider>${forminputbyuser.isCC13Rider}</isAccCIRider>`;
    inputVal += `<isADBRider>${forminputbyuser.isADBRider}</isADBRider>`;
    inputVal += `<isATPDBRider>${forminputbyuser.isATPDBRider}</isATPDBRider>`;
    inputVal += `<AccCITerm>${forminputbyuser.isCC13Rider? forminputbyuser.cc13Term : '0'}</AccCITerm>`;
    inputVal += `<adbTerm>${forminputbyuser.isADBRider? forminputbyuser.adbTerm : '0'}</adbTerm>`;
    inputVal += `<atpdbTerm>${forminputbyuser.isATPDBRider? forminputbyuser.atpdbTerm : '0'}</atpdbTerm>`;
    inputVal += `<premFreq>${forminputbyuser.premiumFrequency}</premFreq>`;
    inputVal += `<sumAssured>${forminputbyuser.sumAssured}</sumAssured>`;
    inputVal += `<AccCISA>${forminputbyuser.isCC13Rider? forminputbyuser.cc13SA : '0'}</AccCISA>`;
    inputVal += `<adbSA>${forminputbyuser.isADBRider? forminputbyuser.adbSA : '0'}</adbSA>`;
    inputVal += `<atpdbSA>${forminputbyuser.isATPDBRider? forminputbyuser.atpdbSA : '0'}</atpdbSA>`;
    inputVal += `<nbd_loan_INT>0.0</nbd_loan_INT>`;
    inputVal += `<nbd_loanAccNo></nbd_loanAccNo>`;
    inputVal += `<nbd_loanFinanceInst></nbd_loanFinanceInst>`;
    inputVal += `<nbd_loanCatgy></nbd_loanCatgy>`;
    inputVal += `<nbd_loanSumAssOutStanding></nbd_loanSumAssOutStanding>`;
    inputVal += `<nbd_loanBalTenure></nbd_loanBalTenure>`;
    inputVal += `<nbd_loanFstEmiDate></nbd_loanFstEmiDate>`;
    inputVal += `<nbd_loanLstEmiDate></nbd_loanLstEmiDate>`;
    inputVal += `<KFC>${forminputbyuser.KFC}</KFC>`;
    inputVal += `</smartshield>`;
    let escapedBIInput = escapeInputHTML(inputVal);
    sessionStorage.setItem("BIInput", escapedBIInput); // BI Output.
    return inputVal;
}

function getOutput(forminputbyuser, serverResponse) {
    var retVal = "";
    try {
        retVal += `<?xml version='1.0' encoding='utf-8' ?><SmartShield>`;
        retVal += `<errCode>0</errCode>`;
        retVal += `<staffStatus>${serverResponse.staffStatus ? "sbi" : "none"}</staffStatus>`;
        retVal += `<staffRebate>${getDiscPercentage("basic",forminputbyuser)}</staffRebate>`;
        retVal += `<servcTax>${serverResponse.servcTax}</servcTax>`;
        retVal += `<smokerOrNot>${serverResponse.smokerOrNot}</smokerOrNot>`;
        retVal += `<basicPremWithoutDisc>${serverResponse.basicPremWithoutDisc}</basicPremWithoutDisc>`;
        retVal += `<basicPremWithoutDiscSA>${serverResponse.basicPremWithoutDiscSA}</basicPremWithoutDiscSA>`;
        retVal += `<premADBWithoutDisc>${serverResponse.premADBWithoutDisc}</premADBWithoutDisc>`;
        retVal += `<premADBWithoutDiscSA>${serverResponse.premADBWithoutDiscSA}</premADBWithoutDiscSA>`;
        retVal += `<premATPDBWithoutDisc>${serverResponse.premATPDBWithoutDisc}</premATPDBWithoutDisc>`;
        retVal += `<premATPDBWithoutDiscSA>${serverResponse.premATPDBWithoutDiscSA}</premATPDBWithoutDiscSA>`;
        retVal += `<premCC13WithoutDisc>${serverResponse.premCC13WithoutDisc}</premCC13WithoutDisc>`;
        retVal += `<premCC13WithoutDiscSA>${serverResponse.premCC13WithoutDiscSA}</premCC13WithoutDiscSA>`;
        retVal += `<OccuInt>${serverResponse.OccuInt}</OccuInt>`;
        retVal += `<OccuIntServiceTax>${self.getOccuIntServiceTax()}</OccuIntServiceTax>`;
        retVal += `<basicPremWthOutDisc>${serverResponse.basicPremWithoutDisc}</basicPremWthOutDisc>`;
        retVal += `<InstmntPrem>${serverResponse.installmntPrem}</InstmntPrem>`;
        retVal += `<InstmntPremWithoutDisc>${serverResponse.InstmntPremWithoutDisc}</InstmntPremWithoutDisc>`;
        retVal += `<InstmntPremWthST>${serverResponse.installmntPremWithSerTx}</InstmntPremWthST>`;
        retVal += `<AccCIPrem>${serverResponse.cc13RiderPrem}</AccCIPrem>`;
        retVal += `<ADBPrem>${serverResponse.adbRiderPrem}</ADBPrem>`;
        retVal += `<ATPDPrem>${serverResponse.atpdbRiderPrem}</ATPDPrem>`;
        retVal += `<basicServiceTax>${serverResponse.basicServiceTax}</basicServiceTax>`;
        retVal += `<SBCServiceTax>${serverResponse.SBCServiceTax}</SBCServiceTax>`;
        retVal += `<KKCServiceTax>${serverResponse.KKCServiceTax}</KKCServiceTax>`;
        retVal += `<KeralaCessServiceTax>${serverResponse.KeralaCessServiceTax}</KeralaCessServiceTax>`;
        retVal += `</SmartShield>`;
    } catch (error) {
        retVal += "<?xml version='1.0' encoding='utf-8' ?><SmartShield>" + "<errCode>1</errCode>" + "<errorMessage>" + (e.getMessage()) + "</errorMessage></SmartShield>";
    }
    return retVal;
}

function getDiscPercentage(Cover, forminputbyuser) {
    if (forminputbyuser.staff_discount) {
        if (Cover === "CRITI") {
            if (forminputbyuser.premiumFrequency === "Single") {
                return 0.015;
            } else {
                return 0.015;
            }
        } else {
            if (forminputbyuser.premiumFrequency === "Single") {
                return 0.065;
            } else {
                return 0.05;
            }
        }
    } else {
        return 0;
    }
}

function getOccuIntServiceTax() {
    return (this.getSumAssured() / 1000) * 2;
}