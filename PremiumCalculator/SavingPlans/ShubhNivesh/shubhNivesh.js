window.onload = function () {
    this.ready();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails;
var proposer_Is_Same_As_Life_Assured = "y";

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
    this.onPTARiderUpdate();
    this.onADBRiderUpdate();
    this.onATPDBRiderUpdate();
    var laGender = document.forms["shubhNiveshForm"]["gender"].value;
    if (laGender === "Male") {
        $("#male_label").css({
            "background": "url('../../../../images/male_active.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
        $("#female_label").css({
            "background": "url('../../../../images/female.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
    } else if (laGender === "Female") {
        $("#female_label").css({
            "background": "url('../../../../images/female_active.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover",
            "margin-right": "20px"
        });
        $("#male_label").css({
            "background": "url('../../../../images/male.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
    }
}

function initArrayList() {

    planOptionListElement = document.forms["shubhNiveshForm"]["planOption"];
    for (i = 0; i < planOptionList.length; i++) {
        planOptionListElement.add(new Option(planOptionList[i].title, planOptionList[i].value));
    }

    policyTermListElement = document.forms["shubhNiveshForm"]["policyTerm"];
    for (i = minAllTermLimit; i <= maxAllTermLimit; i++) {
        policyTermListElement.add(new Option(i, i));
    }

    premiumPaymentModeListElement = document.forms["shubhNiveshForm"]["premiumPaymentMode"];
    for (i = 0; i < premiumPaymentModeList.length; i++) {
        premiumPaymentModeListElement.add(new Option(premiumPaymentModeList[i].title, premiumPaymentModeList[i].value));
    }
    onWishToBackdateUpdate((self.isWishToBackDate() ? "true" : "no"));
}

function validateGender() {
    var gender = document.forms["shubhNiveshForm"]["gender"].value;

    document.forms["shubhNiveshForm"]["shubhNiveshTitle"].options[0].disabled = false;
    document.forms["shubhNiveshForm"]["shubhNiveshTitle"].options[1].disabled = false;
    document.forms["shubhNiveshForm"]["shubhNiveshTitle"].options[2].disabled = false;

    if (gender !== "Female" && gender !== "Male" && gender !== "Third Gender") {
        document.getElementById('genderErrId').style.display = "block";
        document.getElementById('genderErrId').innerHTML = "Please select your gender.";
        return false;
    } else {
        document.getElementById('genderErrId').style.display = "none";

        if (gender == "Female") {
            document.forms["shubhNiveshForm"]["shubhNiveshTitle"].value = "Mrs.";
            document.forms["shubhNiveshForm"]["shubhNiveshTitle"].options[0].disabled = true;
        } else if (gender === "Male") {
            document.forms["shubhNiveshForm"]["shubhNiveshTitle"].value = "Mr.";
            document.forms["shubhNiveshForm"]["shubhNiveshTitle"].options[1].disabled = true;
            document.forms["shubhNiveshForm"]["shubhNiveshTitle"].options[2].disabled = true;
        } else {
            document.getElementById("shubhNiveshTitle").options[0].disabled = false;
            document.getElementById("shubhNiveshTitle").options[1].disabled = false;
            document.getElementById("shubhNiveshTitle").options[2].disabled = false;
        }

        return true;
    }
}

function onWishToBackdateUpdate(wishToBackdate) {
    var backDateDiv = document.getElementById("backdatingDateDivId");
    var backDateElement = document.forms["shubhNiveshForm"]["backDate"];

    if (wishToBackdate === "true") {
        backDateDiv.style.display = "block";
        backDateElement.required = true;
    } else {
        backDateDiv.style.display = "none";
        backDateElement.required = false;
    }
}

function calculateAge() {
    birthday = getDDMMYYYY(this.getDOB());
    var age = getAgeFromBirthdate(birthday);
    document.forms["shubhNiveshForm"]["age"].innerHTML = age;
    document.forms["shubhNiveshForm"]["age"].value = age;

    if (this.getPlanOption().value === 0) {
        if (this.getPremiumPaymentMode().value === 4)
            maxAgeLimit = 60;
        else
            maxAgeLimit = 58;
    } else
        maxAgeLimit = 50;

    if (age < minAgeLimit || age > maxAgeLimit) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        return true;
    }
}

function onPTARiderUpdate() {
    var isPTARiderChosen = document.forms["shubhNiveshForm"]["ptaRiderChosen"].checked;
    var ptaBlocks = document.getElementsByClassName('ptaRiderChecked');

    if (isPTARiderChosen) {
        for (i = 0; i < ptaBlocks.length; i++) {
            ptaBlocks[i].style.display = "block";
        }
        ptaRiderTermListElement = document.forms["shubhNiveshForm"]["ptaRiderTerm"];
        ptaRiderTermListElement.innerHTML = '';
        for (i = minAllTermLimit; i <= maxAllTermLimit; i++) {
            ptaRiderTermListElement.add(new Option(i, i));
        }
        document.forms["shubhNiveshForm"]["ptaRiderTerm"].value = this.getPolicyTerm();
        document.forms["shubhNiveshForm"]["ptaRiderSumAssured"].required = true;
    } else {
        for (i = 0; i < ptaBlocks.length; i++) {
            ptaBlocks[i].style.display = "none";
        }
        document.forms["shubhNiveshForm"]["ptaRiderSumAssured"].required = false;
    }
}

function onADBRiderUpdate() {
    var isADBRiderChosen = document.forms["shubhNiveshForm"]["adbRiderChosen"].checked;
    var adbBlocks = document.getElementsByClassName('adbRiderChecked');
    if (isADBRiderChosen) {
        for (i = 0; i < adbBlocks.length; i++) {
            adbBlocks[i].style.display = "block";
        }
        adbRiderTermListElement = document.forms["shubhNiveshForm"]["adbRiderTerm"];
        adbRiderTermListElement.innerHTML = '';
        for (i = minAllTermLimit; i <= maxAllTermLimit; i++) {
            adbRiderTermListElement.add(new Option(i, i));
        }
        document.forms["shubhNiveshForm"]["adbRiderTerm"].value = this.getPolicyTerm();
        document.forms["shubhNiveshForm"]["adbSumAssured"].required = true;
    } else {
        for (i = 0; i < adbBlocks.length; i++) {
            adbBlocks[i].style.display = "none";
        }
        document.forms["shubhNiveshForm"]["adbSumAssured"].required = false;
    }
}

function onATPDBRiderUpdate() {
    var isATPDBRiderChosen = document.forms["shubhNiveshForm"]["ATPDBRiderChosen"].checked;
    var atpdbBlocks = document.getElementsByClassName('atpdbRiderChecked');
    if (isATPDBRiderChosen) {
        for (i = 0; i < atpdbBlocks.length; i++) {
            atpdbBlocks[i].style.display = "block";
        }
        atpdbRiderTermListElement = document.forms["shubhNiveshForm"]["atpdbRiderTerm"];
        atpdbRiderTermListElement.innerHTML = '';
        for (i = minAllTermLimit; i <= maxAllTermLimit; i++) {
            atpdbRiderTermListElement.add(new Option(i, i));
        }
        document.forms["shubhNiveshForm"]["atpdbRiderTerm"].value = this.getPolicyTerm();
        document.forms["shubhNiveshForm"]["atpdbSumAssured"].required = true;
    } else {
        for (i = 0; i < atpdbBlocks.length; i++) {
            atpdbBlocks[i].style.display = "none";
        }
        document.forms["shubhNiveshForm"]["atpdbSumAssured"].required = false;
    }
}


function valdiateSumAssured() {
    sumAssured = this.getSumAssured();
    if (isNaN(sumAssured) || sumAssured === undefined || sumAssured === null || sumAssured === '') {
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = 'Please enter Sum Assured.';
        return false;
    } else if (sumAssured < 75000) {
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = `Sum assured should be greater than or equal to ${new Intl.NumberFormat('en-IN').format(75000)}.`;
        return false;
    } else if (sumAssured % 1000 !== 0) {
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = `Sum assured should be multiple of 1,000.`;
        return false;
    } else {
        document.getElementById('sumAssuredErrId').style.display = 'none';
        return true;
    }
}

function validatePTARiderSumAssured() {
    if (this.getPTARiderChosen()) {
        var ptaSumAssured = this.getPTASumAssured();
        var sumAssured = this.getSumAssured();
        if (isNaN(ptaSumAssured) || ptaSumAssured === undefined || ptaSumAssured === null || ptaSumAssured === '') {
            document.getElementById('ptaSumAssuredErrId').style.display = 'block';
            document.getElementById('ptaSumAssuredErrId').innerHTML = `Please enter PTA Rider Sum Assured.`;
            return false;
        } else if (ptaSumAssured < 25000 || ptaSumAssured > Math.min(5000000, sumAssured)) {
            document.getElementById('ptaSumAssuredErrId').style.display = 'block';
            document.getElementById('ptaSumAssuredErrId').innerHTML = `Enter Sum assured for Preferred Term Assurance Rider between ${new Intl.NumberFormat('en-IN').format(25000)} and ${new Intl.NumberFormat('en-IN').format(Math.min(5000000, sumAssured))}.`;
            return false;
        }
    }
    document.getElementById('ptaSumAssuredErrId').style.display = 'none';
    return true;
}

function validateADBRiderSumAssured() {
    if (this.getADBRiderChosen()) {
        var adbSumAssured = this.getADBSumAssured();
        var sumAssured = this.getSumAssured();

        if (isNaN(adbSumAssured) || adbSumAssured === undefined || adbSumAssured === null || adbSumAssured === '') {
            document.getElementById('adbSumAssuredErrId').style.display = 'block';
            document.getElementById('adbSumAssuredErrId').innerHTML = `Please enter ADB Rider Sum Assured.`;
            return false;
        } else if (adbSumAssured < 25000 || adbSumAssured > Math.min(5000000, sumAssured)) {
            document.getElementById('adbSumAssuredErrId').style.display = 'block';
            document.getElementById('adbSumAssuredErrId').innerHTML = `Enter Sum assured for ADB Rider between ${new Intl.NumberFormat('en-IN').format(25000)} and ${new Intl.NumberFormat('en-IN').format(Math.min(5000000, sumAssured))}.`;
            return false;
        }
    }
    document.getElementById('adbSumAssuredErrId').style.display = 'none';
    return true;
}


function validateATPDBRiderSumAssured() {
    if (this.getATPDBRiderChosen()) {
        var atpdbSumAssured = this.getATPDBSumAssured();
        var sumAssured = this.getSumAssured();
        if (isNaN(atpdbSumAssured) || atpdbSumAssured === undefined || atpdbSumAssured === null || atpdbSumAssured === '') {
            document.getElementById('atpdbSumAssuredErrId').style.display = 'block';
            document.getElementById('atpdbSumAssuredErrId').innerHTML = `Please enter ATPDB Rider Sum Assured.`;
            return false;
        } else if (atpdbSumAssured < 25000 || atpdbSumAssured > Math.min(5000000, sumAssured)) {
            document.getElementById('atpdbSumAssuredErrId').style.display = 'block';
            document.getElementById('atpdbSumAssuredErrId').innerHTML = `Enter Sum assured for ATPDB Rider between ${new Intl.NumberFormat('en-IN').format(25000)} and ${new Intl.NumberFormat('en-IN').format(Math.min(5000000, sumAssured))}.`;
            return false
        }
    }
    document.getElementById('atpdbSumAssuredErrId').style.display = 'none';
    return true;
}

function validatePTATermRider() {
    if (this.getPTARiderChosen()) {
        if (this.getPTARiderTerm() > this.getPolicyTerm()) {
            document.getElementById('ptaRiderTermErrId').style.display = 'block';
            document.getElementById('ptaRiderTermErrId').innerHTML = `Maximum term for PTA is ${this.getPolicyTerm()} years.`;
            return false;
        }
    }
    document.getElementById('ptaRiderTermErrId').style.display = 'none';
    return true;
}

function validateADBTermRider() {
    if (this.getADBRiderChosen()) {
        if (this.getADBRiderTerm() > this.getPolicyTerm()) {
            document.getElementById('adbRiderTermId').style.display = 'block';
            document.getElementById('adbRiderTermId').innerHTML = `Maximum term for ADB is ${this.getPolicyTerm()} years.`;
            return false;
        }
    }
    document.getElementById('adbRiderTermId').style.display = 'none';
    return true;
}


function validateATPDBTermRider() {
    if (this.getATPDBRiderChosen()) {
        if (this.getATPDBTermRider() > this.getPolicyTerm()) {
            document.getElementById('atpdbTermErrId').style.display = 'block';
            document.getElementById('atpdbTermErrId').innerHTML = `Maximum term for ATPDB is ${this.getPolicyTerm()} years.`;
            return false;
        }
    }
    document.getElementById('atpdbTermErrId').style.display = 'none';
    return true;
}

function setRiderTerm() {
    document.forms["shubhNiveshForm"]["ptaRiderTerm"].value = this.getPolicyTerm();
    document.forms["shubhNiveshForm"]["adbRiderTerm"].value = this.getPolicyTerm();
    document.forms["shubhNiveshForm"]["atpdbRiderTerm"].value = this.getPolicyTerm();
}

function validatePolicyTerm() {
    let minLimit;
    let maxLimit;
    if (this.getPlanOption().value === 0) {
        if (this.getPremiumPaymentMode().value === 4)
            minLimit = 5;
        else
            minLimit = 10;
    } else
        minLimit = 15;

    maxLimit = Math.min(30, 65 - this.getAge());
    if (this.getPolicyTerm() < minLimit || this.getPolicyTerm() > maxLimit) {
        if (minLimit == maxLimit) {
            document.getElementById('policyTermErrId').style.display = 'block';
            document.getElementById('policyTermErrId').innerHTML = `Enter Basic Term as ${minLimit}`;
            return false;
        } else {
            document.getElementById('policyTermErrId').style.display = 'block';
            document.getElementById('policyTermErrId').innerHTML = `Enter Basic Term Beween ${minLimit} and ${maxLimit}`;
            return false;
        }
    } else {
        document.getElementById('policyTermErrId').style.display = 'none';
        return true;
    }
}

function validateMaturityAge() {
    if (this.getAge() + this.getPolicyTerm() > 65) {
        document.getElementById('maturityAgeErrId').style.display = "block";
        document.getElementById('maturityAgeErrId').innerHTML = `Maturity age is 65 years.`;
        return false;
    } else {
        document.getElementById('maturityAgeErrId').style.display = "none";
        return true;
    }
}

/* ***********************   GETTERS ************************* */

function getTitle() {
    return document.forms["shubhNiveshForm"]["shubhNiveshTitle"].value;
}

function getAge() {
    return parseInt(document.forms["shubhNiveshForm"]["age"].value, 10);
}

function getEmail() {
    return document.forms["shubhNiveshForm"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["shubhNiveshForm"]["confirmEmail"].value;
}

function getDOB() {
    return document.forms["shubhNiveshForm"]["dob"].value;
}

function getMobileNo() {
    return document.forms["shubhNiveshForm"]["mobile"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["shubhNiveshForm"]["policyTerm"].value, 10);
}

function getSumAssured() {
    return parseInt(document.forms["shubhNiveshForm"]["sumAssured"].value, 10);
}

function getPlanOption() {
    planIndex = parseInt(document.forms["shubhNiveshForm"]["planOption"].value, 10);
    return planOptionList[planIndex];
}

function getPremiumPaymentMode() {
    var index = document.forms["shubhNiveshForm"]["premiumPaymentMode"].value;
    return premiumPaymentModeList[index];
}

function getGender() {
    return document.forms["shubhNiveshForm"]["gender"].value;
}

function getIsStaffDiscount() {
    return document.forms["shubhNiveshForm"]["staff_discount"].checked;
}

function getBackdate() {
    return document.forms["shubhNiveshForm"]["backDate"].value;
}

function getWishToBackdate() {
    return document.forms["shubhNiveshForm"]["wishToBackdate"].value;
}

function getPTARiderChosen() {
    return document.forms["shubhNiveshForm"]["ptaRiderChosen"].checked;
}

function getPTARiderTerm() {
    var ptaRiderTerm = document.forms["shubhNiveshForm"]["ptaRiderTerm"].value;
    return ptaRiderTerm;
}

function getPTASumAssured() {
    var ptaRiderSumAssured = document.forms["shubhNiveshForm"]["ptaRiderSumAssured"].value;
    return ptaRiderSumAssured;
}

function getADBRiderChosen() {
    return document.forms["shubhNiveshForm"]["adbRiderChosen"].checked;
}

function getADBRiderTerm() {
    return document.forms["shubhNiveshForm"]["adbRiderTerm"].value;
}

function getADBSumAssured() {
    return document.forms["shubhNiveshForm"]["adbSumAssured"].value;
}

function getATPDBRiderChosen() {
    return document.forms["shubhNiveshForm"]["ATPDBRiderChosen"].checked;
}

function getATPDBTermRider() {
    return document.forms["shubhNiveshForm"]["atpdbRiderTerm"].value;
}

function getATPDBSumAssured() {
    return document.forms["shubhNiveshForm"]["atpdbSumAssured"].value;
}

function fName() {
    return document.forms["shubhNiveshForm"]["first_name"].value;
}

function MName() {
    return document.forms["shubhNiveshForm"]["middle_name"].value;
}

function LName() {
    return document.forms["shubhNiveshForm"]["last_name"].value;
}

function getFName() {
    return document.forms["shubhNiveshForm"]["first_name"].value;
}

function getMName() {
    return document.forms["shubhNiveshForm"]["middle_name"].value;
}

function getLName() {
    return document.forms["shubhNiveshForm"]["last_name"].value;
}

/* ******************************  FORM VALIDATION & SUBMIT **************************** */
function validatForm() {
    if (shubhNiveshForm.checkValidity() && this.validateGender() && this.validateConfirmEmail() &&
        this.calculateAge() && this.validateMobileNo(self.getMobileNo()) &&
        this.validatePolicyTerm() && this.validateMaturityAge() &&
        this.validateBackDate() && self.trueBackdate() && this.validatePTARiderSumAssured() &&
        this.validatePTATermRider() && this.validateADBRiderSumAssured() && this.validateADBTermRider() &&
        this.validateATPDBRiderSumAssured() && this.validateATPDBTermRider()) {
        this.calculatePremiumAPICall(); // form valid
    }
}

function calculatePremiumAPICall() {
    let xmlBodyParam = `<getPremiumShubhNivesh xmlns="http://tempuri.org/">
    <isStaff>${this.getIsStaffDiscount()}</isStaff>
    <isBancAssuranceDisc>false</isBancAssuranceDisc>
    <age>${this.getAge()}</age>
    <gender>${this.getGender()}</gender>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <premFreq>${this.getPremiumPaymentMode().title}</premFreq>
    <sumAssured>${this.getSumAssured()}</sumAssured>
    <plan>${this.getPlanOption().title}</plan>
    <isADBRider>${this.getADBRiderChosen()}</isADBRider>
    <adbTerm>${this.getADBRiderChosen() ? this.getADBRiderTerm() : 0}</adbTerm>
    <adbSA>${this.getADBRiderChosen() ? this.getADBSumAssured() : 0}</adbSA>
    <isATPDBRider>${this.getATPDBRiderChosen()}</isATPDBRider>
    <atpdbTerm>${this.getATPDBRiderChosen() ? this.getATPDBTermRider() : 0}</atpdbTerm>
    <atpdbSA>${this.getATPDBRiderChosen() ? this.getATPDBSumAssured() : 0}</atpdbSA>
    <isPTARider>${this.getPTARiderChosen()}</isPTARider>
    <ptaTerm>${this.getPTARiderChosen() ? this.getPTARiderTerm() : 0}</ptaTerm>
    <ptaSA>${this.getPTARiderChosen() ? this.getPTASumAssured() : 0}</ptaSA>
    <IsBackdate>${this.getWishToBackdate()}</IsBackdate>
    <Backdate>${this.getWishToBackdate() === 'true' ? dateMMDDYYYYFormat(this.getBackdate()) : ''}</Backdate>
    <IsMines>false</IsMines>
    <KFC>${getKerlaDiscount()}</KFC>
  </getPremiumShubhNivesh>`;

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
        if (this.getPremiumPaymentMode() == "Single") {
            var payingTerm = "1 Year";
        } else {
            var payingTerm = getPolicyTerm() + " Years";
        }

        if (self.getPlanOption().title == "Endowment Option") {
            var PlanCode = "SSNEND";
        } else {
            var PlanCode = "SSNWHLF";
        }

        let forminputbyuser = {
            proposerName: self.getTitle() + " " + self.fName() + " " + self.LName(),
            age: self.getAge(),
            gender: self.getGender(),
            premiumPayingFrequency: self.getPremiumPaymentMode().title,
            planType: self.getPlanOption().title,
            policyTerm: self.getPolicyTerm(),
            sumAssusred: self.getSumAssured(),
            quotationNumber: quotNumber,
            viewOfptaRiderOption: self.getPTARiderChosen(),
            ptaRiderDetails: {
                ptaTerm: self.getPTARiderTerm(),
                ptaSumAssured: self.getPTASumAssured(),
            },
            viewOfADBRiderOption: self.getADBRiderChosen(),
            adbRiderDetails: {
                adbTerm: self.getADBRiderTerm(),
                adbSumAssured: self.getADBSumAssured()
            },
            viewOfatpdbiderOption: self.getATPDBRiderChosen(),
            atpdbRiderDetails: {
                atpdbTerm: self.getATPDBTermRider(),
                atpdbSumAssured: self.getATPDBSumAssured()
            },
            isBackDating: self.getWishToBackdate(),
            backDate: this.getWishToBackdate() === 'true' ? dateMMDDYYYYFormat(this.getBackdate()) : '',
            isStaff: self.getIsStaffDiscount(),
            PlanName: self.productDetails.title,
            CustTitle: self.getTitle(),
            CustFirstName: self.getFName(),
            CustMiddleName: self.getMName(),
            CustLastName: self.getLName(),
            CustMobile: self.getMobileNo(),
            CustEmailID: self.getEmail(),
            LaDOB: getDDMMYYYY(self.getDOB()),
            ProposerDOB: '',
            BasicSA: getSumAssured(),
            TotalPremAmt: '',
            Frequency: this.getPremiumPaymentMode().title,
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: payingTerm,
            PlanCode: PlanCode,
            KFC: getKerlaDiscount() ? "Y" : "N",
            userType: getUserType()
        };
        let input = self.getInput(forminputbyuser);
        self.showLoader();
        self.ApiCallService('/getPremiumShubhNivesh', body, '<shubhNivesh>', '</shubhNivesh>', true).then((data) => {
            self.hideLoader();
            data = data.shubhNivesh;
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
            data.viewOfADBRiderOption = self.getADBRiderChosen();
            data.viewOfptaRiderOption = self.getPTARiderChosen();
            data.viewOfatpdbiderOption = self.getATPDBRiderChosen();
            data.productDetails = self.productDetails;
            var stringifyJson = JSON.stringify(data);

            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</surNonGuar8pa${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</surNonGuar8pa${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                remaningOutput = remaningOutput.replace(/BackDateinterest/g, "backdateInt");
                var index = forminputbyuser.PolicyTerm;
                var matNonGuar4pa = parseXmlTag(premiumCalcXMLResponse, "matNonGuar4pa" + index + "");
                var matNonGuar8pa = parseXmlTag(premiumCalcXMLResponse, "matNonGuar8pa" + index + "");
                var matNonGuar = '';
                matNonGuar = "<matNonGuar4pa" + index + ">" + matNonGuar4pa + "</matNonGuar4pa" + index + ">";
                matNonGuar += "<matNonGuar8pa" + index + ">" + matNonGuar8pa + "</matNonGuar8pa" + index + ">";
                remaningOutput = remaningOutput + matNonGuar + "</shubhNivesh>"
                remaningOutput = appendXMLTagAtStart(remaningOutput);
                let escapedOutput = escapeInputHTML(remaningOutput);
                sessionStorage.setItem("BIOutput", escapedOutput);
            }
            if (sessionStorage.ThroughNeedAnalysis) {
                let status = sessionStorage.getItem('ThroughNeedAnalysis');

                if (status === 'Yes') {
                    forminputbyuser.TotalPremAmt = data.basicPrem;
                    updateDataInDB(forminputbyuser).then((resolve) => {
                        if (resolve == "1") {
                            createPDFGeneralMethod(productDetails, data, forminputbyuser)
                        } else {
                            alert("Something Went Wrong")
                        }
                    });
                } else if (status === 'No') {
                    sessionStorage.setItem("premiumCalcResponse", stringifyJson);
                    window.location.href = "./../../PremiumCalSuccess/success.html";
                }
            }
            //window.location.href = "./../../PremiumCalculatorSuccess/success.html?data=" + stringifyJson;
        }).catch((error) => {
            console.log(" in error ", error);
            self.hideLoader();
        });
    }).catch((error) => {
        alert("Unable to generate quotation number")
        console.log(' in error :- ' + error);
        hideLoader();
    });
}

function getInput(forminputbyuser) {
    var inputVal = "";
    inputVal += `<?xml version='1.0' encoding='utf-8' ?><shubhNivesh>`;

    inputVal += `<LifeAssured_title>${self.getTitle()}</LifeAssured_title>`;
    inputVal += `<LifeAssured_firstName>${self.fName()}</LifeAssured_firstName>`;
    inputVal += `<LifeAssured_middleName>${self.MName()}</LifeAssured_middleName>`;
    inputVal += `<LifeAssured_lastName>${self.LName()}</LifeAssured_lastName>`;
    inputVal += `<LifeAssured_DOB>${getDDMMYYYY(self.getDOB())}</LifeAssured_DOB>`;
    inputVal += `<LifeAssured_age>${self.getAge()}</LifeAssured_age>`;


    inputVal += `<proposer_title></proposer_title>`;
    inputVal += `<proposer_firstName></proposer_firstName>`;
    inputVal += `<proposer_middleName></proposer_middleName>`;
    inputVal += `<proposer_lastName></proposer_lastName>`;
    inputVal += `<proposer_DOB></proposer_DOB>`;
    inputVal += `<proposer_age></proposer_age>`;
    inputVal += `<proposer_gender></proposer_gender>`;

    inputVal += `<product_name>${product_name}</product_name>`;
    /*parivartan changes*/
    inputVal += `<product_Code>${product_code}</product_Code>`;
    inputVal += `<product_UIN>${product_uin}</product_UIN>`;
    inputVal += `<product_cateogory>${product_cateogory}</product_cateogory>`;
    inputVal += `<product_type>${product_type}</product_type>`;
    /*end*/

    inputVal += `<proposer_Is_Same_As_Life_Assured>${proposer_Is_Same_As_Life_Assured}</proposer_Is_Same_As_Life_Assured>`;
    inputVal += `<isStaff>${self.getIsStaffDiscount()}</isStaff>`;
    inputVal += `<isJKResident>false</isJKResident>`;
    inputVal += `<isBancAssuranceDisc>false</isBancAssuranceDisc>`;
    inputVal += `<age>${self.getAge()}</age>`;
    inputVal += `<gender>${self.getGender()}</gender>`;
    inputVal += `<str_kerla_discount>${getKerlaDiscount()?"Yes":"No"}</str_kerla_discount>`;
    inputVal += `<policyTerm>${forminputbyuser.policyTerm}</policyTerm>`;
    inputVal += `<premFreq>${forminputbyuser.premiumPayingFrequency}</premFreq>`;
    inputVal += `<sumAssured>${forminputbyuser.sumAssusred}</sumAssured>`;
    inputVal += `<plan>${forminputbyuser.planType}</plan>`;
    inputVal += `<isADBRider>${forminputbyuser.viewOfADBRiderOption}</isADBRider>`;
    inputVal += `<adbTerm>${forminputbyuser.viewOfADBRiderOption ? self.getADBRiderTerm() : '0'}</adbTerm>`;
    inputVal += `<adbSA>${forminputbyuser.viewOfADBRiderOption ? self.getADBSumAssured() : '0'}</adbSA>`;
    inputVal += `<isATPDBRider>${forminputbyuser.viewOfatpdbiderOption}</isATPDBRider>`;
    inputVal += `<atpdbTerm>${forminputbyuser.viewOfatpdbiderOption ? self.getATPDBTermRider() : '0'}</atpdbTerm>`;
    inputVal += `<atpdbSA>${forminputbyuser.viewOfatpdbiderOption ? self.getATPDBSumAssured() : '0'}</atpdbSA>`;
    inputVal += `<isPTARider>${forminputbyuser.viewOfptaRiderOption}</isPTARider>`;
    inputVal += `<ptaTerm>${forminputbyuser.viewOfptaRiderOption ? self.getPTARiderTerm() : '0'}</ptaTerm>`;
    inputVal += `<ptaSA>${forminputbyuser.viewOfptaRiderOption ? self.getPTASumAssured() : '0'}</ptaSA>`;
    inputVal += `<Wish_to_backdate_policy>${self.getWishToBackdate() ? "y" : "n"}</Wish_to_backdate_policy>`;
    inputVal += `<backdating_Date>${self.getWishToBackdate() === 'true' ? convertDate(this.getBackdate()) : ''}</backdating_Date>`;
    inputVal += `<KFC>${forminputbyuser.KFC}</KFC>`;
    inputVal += `</shubhNivesh>`;

    let escapedHTML = escapeInputHTML(inputVal);
    sessionStorage.setItem("BIInput", escapedHTML);
    return escapedHTML;
}

//Start Added on 18/09/2019 by Tushar Kadam
function isWishToBackDate() {
    if (self.getWishToBackdate() === "true") {
        return true;
    } else {
        return false;
    }
}

function trueBackdate() {
    if (self.isWishToBackDate()) {
        var finYerEndDate = "";
        var today = new Date();
        var currYear = today.getFullYear();
        var currMonth = today.getMonth() + 1;
        var date = today.getDate();
        var month = "";
        if (currMonth < 10) {
            month = "0" + currMonth;
        } else {
            month = currMonth;
        }
        var todayDate = date + "/" + month + "/" + currYear;
        var splitDate = (dateMMDDYYYYFormat(self.getBackdate())).split("-");
        var newBackDate = new Date(splitDate[2], (splitDate[0] - 1), splitDate[1])
        if (currMonth >= 4) {
            finYerEndDate = "01/04/" + currYear;
        } else {
            finYerEndDate = "01/04/" + (currYear - 1);
        }
        var finYerEndDate_split = self.splitDate(finYerEndDate);
        var newFinYerEndDate = new Date(finYerEndDate_split[2], (finYerEndDate_split[1] - 1), finYerEndDate_split[0])

        var launchDate = "20-01-2020";
        launchDateArray = launchDate.split("-");
        var newLaunchDate = new Date(launchDateArray[2], launchDateArray[1] - 1, launchDateArray[0]);

        if (today.getTime() < newBackDate.getTime()) {
            document.getElementById('backDateErrorId').style.display = 'block';
            document.getElementById('backDateErrorId').innerHTML = "Please enter backdation date between " + finYerEndDate + " and " + getTodayInDDMMYYYY();
            return false;
        } else if (newBackDate.getTime() < newLaunchDate && newFinYerEndDate.getTime() < newLaunchDate) {
            document.getElementById('backDateErrorId').style.display = 'block';
            document.getElementById('backDateErrorId').innerHTML = "Please enter backdation date between " + launchDate + " and " + getTodayInDDMMYYYY();
            return false;
        } else if (newBackDate.getTime() < newFinYerEndDate.getTime()) {
            document.getElementById('backDateErrorId').style.display = 'block';
            document.getElementById('backDateErrorId').innerHTML = "Please enter backdation date between " + finYerEndDate + " and " + getTodayInDDMMYYYY();
            return false;
        } else {
            document.getElementById('backDateErrorId').style.display = 'none';
            return true;
        }
    } else {
        return true;
    }
}

function calculateMyAge() {
    if (!isEmpty(self.getDOB())) {
        var age = self.getDOB();
        // console.log("age=", age)
        if (age == "" || age == undefined) {
            document.forms["shubhNiveshForm"]["backDate"].value = "";
            alert("Please select date of birth");
            return;
        }
        var d = getDDMMYYYY(self.getBackdate());
        var split_date = d.split("/");
        var nowCal = new Date(split_date[2], split_date[1], split_date[0]);
        var ProposerDob = getDDMMYYYY(age).split("/");
        var age = nowCal.getFullYear() - parseInt(ProposerDob[2]);
        var isMonthGreater = parseInt(ProposerDob[1]) > nowCal.getMonth();
        var isMonthSameButDayGreater = parseInt(ProposerDob[1]) == nowCal.getMonth() &&
            parseInt(ProposerDob[1]) > nowCal.getDate();
        if (isMonthGreater || isMonthSameButDayGreater) {
            age = age - 1;
        }
        if (age > minAgeLimit) {
            document.forms["shubhNiveshForm"]["age"].value = age;
        }
    } else {
        alert("Please select a LifeAssured DOB First");
        document.forms['shubhNiveshForm']['backDate'].value = "";
    }
}

function setBackdateEmpty() {
    document.forms['shubhNiveshForm']['backDate'].value = "";
}

function validateBackDate() {
    if (self.isWishToBackDate()) {
        if (isEmpty(self.getBackdate())) {
            document.getElementById('backDateErrorId').style.display = 'block';
            document.getElementById('backDateErrorId').innerHTML = 'Please select back date';
            return false;
        } else {
            document.getElementById('backDateErrorId').style.display = 'none';
            return true;
        }
    } else {
        return true;
    }
}
//End Added on 18/09/2019 by Tushar Kadam