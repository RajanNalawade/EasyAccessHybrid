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
}

function initArrayList() {
    planElement = document.forms["saralShieldForm"]["plan"];
    for (i = 0; i < planOptionList.length; i++) {
        planElement.add(new Option(planOptionList[i].title, planOptionList[i].value));
    }

    policyListElement = document.forms["saralShieldForm"]["policyTerm"];
    for (i = minPolicyTermLimit; i <= maxPolicyTermLimit; i++) {
        policyListElement.add(new Option(i, i));
    }

    this.initializePremiumFrequencyList();
    this.onPlanUpdate();
}

function initializePremiumFrequencyList() {
    premiumFrequencyListElement = document.forms["saralShieldForm"]["premiumFrequency"];
    premiumFrequencyListElement.innerHTML = '';
    for (i = 0; i < premiumPaymentModeList.length; i++) {
        premiumFrequencyListElement.add(new Option(premiumPaymentModeList[i].title, premiumPaymentModeList[i].value));
    }
}

function validateGender() {
    var gender = document.forms["saralShieldForm"]["gender"].value;

    document.forms["saralShieldForm"]["saralShieldTitle"].options[0].disabled = false;
    document.forms["saralShieldForm"]["saralShieldTitle"].options[1].disabled = false;
    document.forms["saralShieldForm"]["saralShieldTitle"].options[2].disabled = false;

    if (gender !== "Female" && gender !== "Male" && gender !== "Third Gender") {
        document.getElementById('genderErrId').style.display = "block";
        document.getElementById('genderErrId').innerHTML = "Please select your gender.";
        return false;
    } else {
        document.getElementById('genderErrId').style.display = "none";

        if (gender == "Female") {
            document.forms["saralShieldForm"]["saralShieldTitle"].value = "Mrs.";
            document.forms["saralShieldForm"]["saralShieldTitle"].options[0].disabled = true;
        } else if (gender == "Male") {
            document.forms["saralShieldForm"]["saralShieldTitle"].value = "Mr.";
            document.forms["saralShieldForm"]["saralShieldTitle"].options[1].disabled = true;
            document.forms["saralShieldForm"]["saralShieldTitle"].options[2].disabled = true;
        } else {
            document.getElementById("saralShieldTitle").options[0].disabled = false;
            document.getElementById("saralShieldTitle").options[1].disabled = false;
            document.getElementById("saralShieldTitle").options[2].disabled = false;
        }
        return true;
    }
}

function calculateAge(birthday) {
    var age = getAgeFromBirthdate(birthday);
    document.forms["saralShieldForm"]["age"].innerHTML = age;
    document.forms["saralShieldForm"]["age"].value = age;
    if (age < minAgeLimit || age > maxAgeLimit) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        return true;
    }
}

function onPlanUpdate() {
    var planSelected = this.getPlan();;
    if (planSelected.singlePremiumModeFreezed) {
        premiumFrequencyListElement = document.forms["saralShieldForm"]["premiumFrequency"];
        premiumFrequencyListElement.value = premiumPaymentModeList[4].value;
        premiumFrequencyListElement.disabled = true;
    } else {
        this.initializePremiumFrequencyList();
        premiumFrequencyListElement.disabled = false;
    }

    if (planSelected.value === 1) {
        document.getElementById('isToADBShowRider').style.display = "flex";
        document.getElementById('isToShowATPDBRider').style.display = "flex";
        this.onADBRiderUpdate();
        this.onATPDBRiderUpdate();
        this.toHideShowLoanDetails(false);
    } else if (planSelected.value === 2) {
        document.getElementById('isToADBShowRider').style.display = "none";
        document.getElementById('isToShowATPDBRider').style.display = "none";
        this.toHideShowLoanDetails(true);
    } else {
        document.getElementById('isToADBShowRider').style.display = "none";
        document.getElementById('isToShowATPDBRider').style.display = "none";
        this.toHideShowLoanDetails(false);
    }
}

function onADBRiderUpdate() {
    var isADBRiderChosen = document.forms["saralShieldForm"]["adbRiderChosen"].checked;
    var adbBlocks = document.getElementsByClassName('adbRiderChecked');
    if (isADBRiderChosen) {
        for (i = 0; i < adbBlocks.length; i++) {
            adbBlocks[i].style.display = "block";
        }
        adbRiderTermListElement = document.forms["saralShieldForm"]["adbRiderTerm"];
        adbRiderTermListElement.innerHTML = '';
        for (i = minADBAndATPDBRiderTermLimit; i <= 30; i++) {
            adbRiderTermListElement.add(new Option(i));
        }
        document.forms["saralShieldForm"]["adbSumAssured"].required = true;
    } else {
        for (i = 0; i < adbBlocks.length; i++) {
            adbBlocks[i].style.display = "none";
        }
        document.forms["saralShieldForm"]["adbSumAssured"].required = false;
    }
}

function onATPDBRiderUpdate() {
    var isATPDBRiderChosen = document.forms["saralShieldForm"]["ATPDBRiderChosen"].checked;
    var atpdbBlocks = document.getElementsByClassName('atpdbRiderChecked');
    if (isATPDBRiderChosen) {
        for (i = 0; i < atpdbBlocks.length; i++) {
            atpdbBlocks[i].style.display = "block";
        }
        atpdbRiderTermListElement = document.forms["saralShieldForm"]["atpdbRiderTerm"];
        atpdbRiderTermListElement.innerHTML = '';
        for (i = minADBAndATPDBRiderTermLimit; i <= 30; i++) {
            atpdbRiderTermListElement.add(new Option(i));
        }
        document.forms["saralShieldForm"]["atpdbSumAssured"].required = true;
    } else {
        for (i = 0; i < atpdbBlocks.length; i++) {
            atpdbBlocks[i].style.display = "none";
        }
        document.forms["saralShieldForm"]["atpdbSumAssured"].required = false;
    }
}

function toHideShowLoanDetails(isToShow) {
    var loanDetailBlocks = document.getElementsByClassName('isToShowLoanDetails');

    if (isToShow) {
        for (i = 0; i < loanDetailBlocks.length; i++) {
            loanDetailBlocks[i].style.display = "block";
        }

        loanInterestRateElement = document.forms['saralShieldForm']['loanRateOfInterest'];
        loanInterestRateElement.innerHTML = '';
        loanInterestRateElement.required = true;
        for (let i = minLoanRateOfInterestLimit; i <= maxLoanRateOfInterestLimit; i += 2) {
            loanInterestRateElement.add(new Option(i + '%', i));
        }

        document.forms["saralShieldForm"]["loanAccountNo"].required = true;
        document.forms["saralShieldForm"]["financialInstituteName"].required = true;
        document.forms["saralShieldForm"]["loanCategory"].required = true;
        document.forms["saralShieldForm"]["sumAssuredOrOutstanding"].required = true;
        document.forms["saralShieldForm"]["balanceLoan"].required = true;
        document.forms["saralShieldForm"]["dateOfFirstEMI"].required = true;
        document.forms["saralShieldForm"]["dateOfLastEMI"].required = true;
    } else {
        for (i = 0; i < loanDetailBlocks.length; i++) {
            loanDetailBlocks[i].style.display = "none";
        }
        loanInterestRateElement = document.forms['saralShieldForm']['loanRateOfInterest'];
        loanInterestRateElement.required = false;
        document.forms["saralShieldForm"]["loanAccountNo"].required = false;
        document.forms["saralShieldForm"]["financialInstituteName"].required = false;
        document.forms["saralShieldForm"]["loanCategory"].required = false;
        document.forms["saralShieldForm"]["sumAssuredOrOutstanding"].required = false;
        document.forms["saralShieldForm"]["balanceLoan"].required = false;
        document.forms["saralShieldForm"]["dateOfFirstEMI"].required = false;
        document.forms["saralShieldForm"]["dateOfLastEMI"].required = false;
    }
}

function valdiatePolicyTerm() {
    if (this.getPolicyTerm() > Math.min(30, 65 - (this.getAge() ? this.getAge() : 18))) {
        document.getElementById('policyTermErrId').style.display = 'block';
        document.getElementById('policyTermErrId').innerHTML = `Minimum Term limit is 5 and maximum limit is ${Math.min(30, 65-(this.getAge() ? this.getAge() : 18))}.`
        return false;
    } else if (this.getPlan().value === 2) {
        if (this.getPolicyTerm() > this.getBalanceLoan()) {
            document.getElementById('policyTermErrId').style.display = 'block';
            document.getElementById('policyTermErrId').innerHTML = "Policy term should not be greater then outstanding term";
            return false;
        } else {
            document.getElementById('policyTermErrId').style.display = 'none';
            return true;
        }
    } else {
        document.getElementById('policyTermErrId').style.display = 'none';
        return true;
    }
}

function validatePolicyTermRider() {
    var isvalidationSuccessful = true;
    if (this.getADBRiderChosen() && this.getADBRiderTerm() > this.getPolicyTerm()) {
        document.getElementById('adbRiderTermErrId').style.display = 'block';
        document.getElementById('adbRiderTermErrId').innerHTML = `Maximum term for Accidental Death Benefit Rider is ${this.getPolicyTerm()} years.`;
        isvalidationSuccessful = false;
    } else {
        document.getElementById('adbRiderTermErrId').style.display = 'none';
    }

    if (this.getATPDBRiderChosen() && this.getATPDBRiderTerm() > this.getPolicyTerm()) {
        document.getElementById('atpdbRiderTermErrId').style.display = 'block';
        document.getElementById('atpdbRiderTermErrId').innerHTML = `Maximum term for Accidental Total and Permenent Disability Benefit Rider is ${this.getPolicyTerm()} years.`
        isvalidationSuccessful = false;
    } else {
        document.getElementById('atpdbRiderTermErrId').style.display = 'none';
    }
    return isvalidationSuccessful;
}

function valdiateSumAssured() {
    var sumAssured = this.getSumAssured();
    var isValidationSuccessful = true;

    if (isNaN(sumAssured) || sumAssured === undefined || sumAssured === null || sumAssured === '') {
        // console.log("1");
        document.getElementById('adbSumAssuredErrId').style.display = 'none';
        document.getElementById('atpdbSumAssuredErrId').style.display = 'none';
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = `Enter Basic Sum Assured between ${new Intl.NumberFormat('en-IN').format(750000)}  and ${new Intl.NumberFormat('en-IN').format(2400000)}.`;
        isValidationSuccessful = false;
    } else if (sumAssured < 750000 || sumAssured > 2400000) {
        //console.log("2");

        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = `Enter Basic Sum Assured between ${new Intl.NumberFormat('en-IN').format(750000)}  and ${new Intl.NumberFormat('en-IN').format(2400000)}.`;
        isValidationSuccessful = false;
    } else if (sumAssured % 50000 !== 0) {
        //console.log("3");

        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = `Sum assured should be multiple of 50,000`;
        isValidationSuccessful = false;
    } else if (this.getPlan().value === 2) {
        //console.log(" sa ", sumAssured, " outstanding ", this.getSumAssuredOrOutstanding());

        if (sumAssured > this.getSumAssuredOrOutstanding()) {
            document.getElementById('sumAssuredErrId').style.display = 'block';
            document.getElementById('sumAssuredErrId').innerHTML = 'Sum assured should not be greater than outstanding loan amount';
            isValidationSuccessful = false;
        } else {
            //console.log("4");

            document.getElementById('sumAssuredErrId').style.display = 'none';
        }
    } else {
        // console.log("5");

        document.getElementById('sumAssuredErrId').style.display = 'none';
    }

    if (this.getADBRiderChosen() && (!this.getADBSumAssured() || this.getADBSumAssured() < 25000 || this.getADBSumAssured() > Math.min(2400000, sumAssured ? sumAssured : 0))) {
        document.getElementById('adbSumAssuredErrId').style.display = 'block';
        document.getElementById('adbSumAssuredErrId').innerHTML = `Enter Sum assured for Accidental Death Benefit Rider between ${new Intl.NumberFormat('en-IN').format(25000)} and ${new Intl.NumberFormat('en-IN').format(Math.min(2400000,sumAssured ? sumAssured : 0))}.`;
        isValidationSuccessful = false;
    } else {
        document.getElementById('adbSumAssuredErrId').style.display = 'none';
    }

    if (this.getATPDBRiderChosen() && (!this.getATPDBRiderSumAssured() || this.getATPDBRiderSumAssured() < 25000 || this.getATPDBRiderSumAssured() > Math.min(2400000, sumAssured ? sumAssured : 0))) {
        document.getElementById('atpdbSumAssuredErrId').style.display = 'block';
        document.getElementById('atpdbSumAssuredErrId').innerHTML = `Enter Sum assured for Accidental Death Benefit Rider between ${new Intl.NumberFormat('en-IN').format(25000)} and ${new Intl.NumberFormat('en-IN').format(Math.min(2400000,sumAssured ? sumAssured : 0))}.`;
        isValidationSuccessful = false;
    } else {
        document.getElementById('atpdbSumAssuredErrId').style.display = 'none';
    }
    return isValidationSuccessful;
}


/* ***********************   GETTERS ************************* */
function getAge() {
    return parseInt(document.forms["saralShieldForm"]["age"].value, 10);
}

function getEmail() {
    return document.forms["saralShieldForm"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["saralShieldForm"]["confirmEmail"].value;
}

function getDOB() {
    return document.forms["saralShieldForm"]["dob"].value;
}

function getMobileNo() {
    return document.forms["saralShieldForm"]["mobile"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["saralShieldForm"]["policyTerm"].value, 10);
}

function getPremiumFrequency() {
    var index = document.forms["saralShieldForm"]["premiumFrequency"].value;
    return premiumPaymentModeList[index - 1];
}

function getGender() {
    return document.forms["saralShieldForm"]["gender"].value;
}

function getIsStaffDiscount() {
    return document.forms["saralShieldForm"]["staff_discount"].checked;
}

function getPlan() {
    var planIndexSelected = document.forms["saralShieldForm"]["plan"].value;
    return planOptionList[planIndexSelected - 1];
}

function getSumAssured() {
    return parseInt(document.forms["saralShieldForm"]["sumAssured"].value, 10);
}

function getADBRiderChosen() {
    return document.forms["saralShieldForm"]["adbRiderChosen"].checked;
}

function getADBRiderTerm() {
    return document.forms["saralShieldForm"]["adbRiderTerm"].value;
}

function getADBSumAssured() {
    return document.forms["saralShieldForm"]["adbSumAssured"].value;
}

function getATPDBRiderChosen() {
    return document.forms["saralShieldForm"]["ATPDBRiderChosen"].checked;
}

function getATPDBRiderTerm() {
    return document.forms["saralShieldForm"]["atpdbRiderTerm"].value;
}

function getATPDBRiderSumAssured() {
    return document.forms["saralShieldForm"]["atpdbSumAssured"].value;
}

function getLoanRateOfInterest() {
    return parseInt(document.forms["saralShieldForm"]["loanRateOfInterest"].value, 10);
}

function getLoanAccountNo() {
    return document.forms["saralShieldForm"]["loanAccountNo"].value;
}

function getFinancialInstituteName() {
    return document.forms["saralShieldForm"]["financialInstituteName"].value;
}

function getLoanCategory() {
    return document.forms["saralShieldForm"]["loanCategory"].value;
}

function getSumAssuredOrOutstanding() {
    return parseInt(document.forms["saralShieldForm"]["sumAssuredOrOutstanding"].value, 10);
}

function getBalanceLoan() {
    return parseInt(document.forms["saralShieldForm"]["balanceLoan"].value, 10);
}

function getDateOfFirstEMI() {
    return document.forms["saralShieldForm"]["dateOfFirstEMI"].value;
}

function getDateOfLastEMI() {
    return document.forms["saralShieldForm"]["dateOfLastEMI"].value;
}

function fName() {
    return document.forms["saralShieldForm"]["first_name"].value;
}

function MName() {
    return document.forms["saralShieldForm"]["middle_name"].value;
}

function LName() {
    return document.forms["saralShieldForm"]["last_name"].value;
}

function getTitle() {
    return document.forms["saralShieldForm"]["saralShieldTitle"].value;
}
/* ******************************  FORM VALIDATION & SUBMIT **************************** */
function validatForm() {
    //console.log(this.valdiatePolicyTerm(), " ", this.validatePolicyTermRider(), " ", this.valdiateSumAssured());

    if (saralShieldForm.checkValidity() && this.validateGender() && this.validateConfirmEmail() &&
        this.calculateAge(getDDMMYYYY(self.getDOB())) && this.validateMobileNo(self.getMobileNo()) &&
        this.valdiatePolicyTerm() && this.validatePolicyTermRider() && this.valdiateSumAssured()) {
        //console.log("submit");

        this.calculatePremiumAPICall(); // form valid
    }
}

function calculatePremiumAPICall() {
    self.showLoader();
    let xmlBodyParam = `<getPremiumSaralShieldNew xmlns="http://tempuri.org/">
    <isStaff>${this.getIsStaffDiscount()}</isStaff>
    <isJkResident>false</isJkResident>
    <age>${this.getAge()}</age>
    <gender>${this.getGender()}</gender>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <premFreq>${this.getPremiumFrequency().title}</premFreq>
    <sumAssured>${this.getSumAssured()}</sumAssured>
    <plan>${this.getPlan().title}</plan>
    <isADBRider>${this.getADBRiderChosen()}</isADBRider>
    <adbTerm>${this.getADBRiderChosen() ? this.getADBRiderTerm() : 0}</adbTerm>
    <adbSA>${this.getADBRiderChosen() ? this.getADBSumAssured() : 0}</adbSA>
    <isATPDBRider>${this.getATPDBRiderChosen()}</isATPDBRider>
    <atpdbTerm>${this.getATPDBRiderChosen() ? this.getATPDBRiderTerm() : 0}</atpdbTerm>
    <atpdbSA>${this.getATPDBRiderChosen() ? this.getATPDBRiderSumAssured() : 0}</atpdbSA>
    <loanRtofInterest>${this.getPlan().value == 2 ? this.getLoanRateOfInterest() : 0}</loanRtofInterest>
    <KFC>${getKerlaDiscount()}</KFC>
    </getPremiumSaralShieldNew>`;

    //console.log(" xmlBodyParam ", xmlBodyParam);

    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        ${xmlBodyParam}
                    </soap:Body>
                </soap:Envelope>`;

    console.log(body)
    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {


        let planCode = '';
        if (self.getPlan().title === 'Level Term Assurance') {
            planCode = 'SHIELD3A';
        } else if (self.getPlan().title === 'Decreasing Term Assurance[Loan Protection]') {
            planCode = 'SHIELD3B';
        } else if (self.getPlan().title === 'Decreasing Term Assurance[Family Income Protection]') {
            planCode = 'SHIELD3C';
        }

        let forminputbyuser = {
            staff_discount: self.getIsStaffDiscount(),
            proposerName: self.getTitle() + " " + self.fName() + " " + self.LName(),
            age: self.getAge(),
            gender: self.getGender(),
            policyTerm: self.getPolicyTerm(),
            premiumFrequency: this.getPremiumFrequency().title,
            sumAssured: this.getSumAssured(),
            planOption: self.getPlan().title,
            isADBRider: this.getPlan().value == 1 ? this.getADBRiderChosen() : false,
            adbTerm: this.getADBRiderChosen() ? this.getADBRiderTerm() : 0,
            adbSA: this.getADBRiderChosen() ? this.getADBSumAssured() : 0,
            isATPDBRider: this.getPlan().value == 1 ? this.getATPDBRiderChosen() : false,
            atpdbTerm: this.getATPDBRiderChosen() ? this.getATPDBRiderTerm() : 0,
            atpdbSA: this.getATPDBRiderChosen() ? this.getATPDBRiderSumAssured() : 0,
            loanRtofInterest: this.getPlan().value == 2 ? this.getLoanRateOfInterest() : 0,
            quotationNumber: quotNumber,

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
            TotalPremAmt: '',
            Frequency: self.getPremiumFrequency().title,
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: '0',
            PlanCode: planCode,
            KFC: getKerlaDiscount() ? "Y" : "N"
        };

        let input = self.getInput(forminputbyuser);
        // console.log("input",input);
        self.ApiCallService('/getPremiumSaralShieldNew', body, '<saralShield>', '</saralShield>').then((data) => {
            self.hideLoader();

            data = data.saralShield;
            console.log(" saral data ", data);
            if (data !== undefined) {
                if (data.errCode == "1") {
                    alert(data.minPremError)
                } else {
                    data.productDetails = self.productDetails;
                    forminputbyuser.TotalPremAmt = data.InstmntPremWthST;
                    data.isADBRiderChecked = self.getADBRiderChosen();
                    data.isATPDBRiderChecked = self.getATPDBRiderChosen();
                    var stringifyJson = JSON.stringify(data);

                    let output = self.getOutput(forminputbyuser, data)

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
                            // createPDFGeneralMethod(this.productDetails, data, forminputbyuser)
                        } else if (status === 'No') {
                            sessionStorage.setItem("premiumCalcResponse", stringifyJson);
                            window.location.href = "../../PremiumCalSuccess/success.html";
                        }
                    }

                }
            } else {
                console.log("error");

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
    inputVal += `<?xml version='1.0' encoding='utf-8' ?><saralshield>`;

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

    /* parivartan changes */
    inputVal += `<product_name>${product_name}</product_name>`;
    inputVal += `<product_Code>${product_code}</product_Code>`;
    inputVal += `<product_UIN>${product_uin}</product_UIN>`;
    inputVal += `<product_cateogory>${product_cateogory}</product_cateogory>`;
    inputVal += `<product_type>${product_type}</product_type>`;
    /* end */

    inputVal += `<proposer_Is_Same_As_Life_Assured>${proposer_Is_Same_As_Life_Assured}</proposer_Is_Same_As_Life_Assured>`;

    inputVal += `<isJKResident>false</isJKResident>`;
    inputVal += `<isStaff>${self.getIsStaffDiscount()}</isStaff>`;
    inputVal += `<isSmoker>false</isSmoker>`;
    inputVal += `<age>${self.getAge()}</age>`;
    // inputVal+=`<gender>gender </gender>`;
    inputVal += `<plan>${forminputbyuser.planOption}</plan>`;

    inputVal += `<policyTerm>${forminputbyuser.policyTerm}</policyTerm>`;

    inputVal += `<isADBRider>${forminputbyuser.isADBRider}</isADBRider>`;
    inputVal += `<isATPDBRider>${forminputbyuser.isATPDBRider}</isATPDBRider>`;

    inputVal += `<adbTerm>${forminputbyuser.isADBRider ? forminputbyuser.adbTerm :''}</adbTerm>`;
    inputVal += `<atpdbTerm>${forminputbyuser.isATPDBRider ? forminputbyuser.atpdbTerm :''}</atpdbTerm>`;

    inputVal += `<premFreq>${forminputbyuser.premiumFrequency}</premFreq>`;
    inputVal += `<sumAssured>${forminputbyuser.sumAssured}</sumAssured>`;
    inputVal += `<adbSA>${forminputbyuser.isADBRider ? forminputbyuser.adbSA :'0.0'}</adbSA>`;
    inputVal += `<atpdbSA>${forminputbyuser.isATPDBRider ? forminputbyuser.atpdbSA :'0.0'}</atpdbSA>`;
    inputVal += `<nbd_loan_INT>${forminputbyuser.loanRtofInterest}%</nbd_loan_INT>`;
    inputVal += `<nbd_loanAccNo>${this.getPlan().value == 2 ? self.getLoanAccountNo() : ''}</nbd_loanAccNo>`;
    inputVal += `<nbd_loanFinanceInst>${this.getPlan().value == 2 ? self.getFinancialInstituteName() : ''}</nbd_loanFinanceInst>`;
    inputVal += `<nbd_loanCatgy>${this.getPlan().value == 2 ? self.getLoanCategory() : ''}</nbd_loanCatgy>`;
    inputVal += `<nbd_loanSumAssOutStanding>${this.getPlan().value == 2 ? self.getSumAssuredOrOutstanding() : ''}</nbd_loanSumAssOutStanding>`;
    inputVal += `<nbd_loanBalTenure>${this.getPlan().value == 2 ? self.getBalanceLoan() : ''}</nbd_loanBalTenure>`;
    inputVal += `<nbd_loanFstEmiDate>${this.getPlan().value == 2 ? self.getDateOfFirstEMI() : ''}</nbd_loanFstEmiDate>`;
    inputVal += `<nbd_loanLstEmiDate>${this.getPlan().value == 2 ? self.getDateOfLastEMI() : ''}</nbd_loanLstEmiDate>`;
    inputVal += `<KFC>${forminputbyuser.KFC}</KFC>`;
    inputVal += `</saralshield>`;

    let escapedHTML = escapeInputHTML(inputVal);
    sessionStorage.setItem("BIInput", escapedHTML);
    return escapedHTML;
    // return inputVal;
}

function getOutput(forminputbyuser, serverData) {
    var retVal = "";
    try {
        retVal += `<?xml version='1.0' encoding='utf-8' ?><SaralShield>`;
        retVal += `<errCode>0</errCode>`;
        retVal += `<staffStatus>${serverData.staffStatus}</staffStatus>`;
        retVal += `<staffRebate>${serverData.staffRebate}</staffRebate>`;
        retVal += `<servcTax>${serverData.servcTax}</servcTax>`;
        retVal += `<basicPremWithoutDisc>${serverData.basicPremWithoutDisc}</basicPremWithoutDisc>`;
        retVal += `<premADBWithoutDisc>${serverData.premADBWithoutDisc}</premADBWithoutDisc>`;
        retVal += `<premATPDBWithoutDisc>${serverData.premATPDBWithoutDisc}</premATPDBWithoutDisc>`;
        retVal += `<basicPremWithoutDiscSA>${serverData.basicPremWithoutDiscSA}</basicPremWithoutDiscSA>`;
        retVal += `<premADBWithoutDiscSA>${serverData.premADBWithoutDiscSA}</premADBWithoutDiscSA>`;
        retVal += `<premATPDBWithoutDiscSA>${serverData.premATPDBWithoutDiscSA}</premATPDBWithoutDiscSA>`;

        retVal += `<OccuInt>${serverData.OccuInt}</OccuInt>`;

        retVal += `<basicPremWthOutDisc>${serverData.basicPremWithoutDisc}</basicPremWthOutDisc>`;
        retVal += `<InstmntPrem>${serverData.installmntPrem}</InstmntPrem>`;
        retVal += `<InstmntPremWithDisc>${serverData.InstmntPremWithDisc}</InstmntPremWithDisc>`;
        retVal += `<ADBPrem>${serverData.adbRiderPrem}</ADBPrem>`;
        retVal += `<ATPDPrem>${serverData.atpdbRiderPrem}</ATPDPrem>`;
        retVal += `<InstmntPremWthST>${serverData.InstmntPremWthST}</InstmntPremWthST>`;
        retVal += `<basicServiceTax>${serverData.basicServiceTax}</basicServiceTax>`;
        retVal += `<SBCServiceTax>${serverData.SBCServiceTax}</SBCServiceTax>`;
        retVal += `<KKCServiceTax>${serverData.KKCServiceTax}</KKCServiceTax>`;
        retVal += `<KeralaCessServiceTax>${serverData.KeralaCessServiceTax}</KeralaCessServiceTax>`;
        retVal += `</SaralShield>`;
    } catch (error) {
        retVal += "<?xml version='1.0' encoding='utf-8' ?><SaralShield>" +
            "<errCode>1</errCode>" +
            "<errorMessage>" +
            e.getMessage() + "</errorMessage></SaralShield>";
    }
    let escapedBIOutput = escapeInputHTML(retVal);
    sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.
    return retVal;
}