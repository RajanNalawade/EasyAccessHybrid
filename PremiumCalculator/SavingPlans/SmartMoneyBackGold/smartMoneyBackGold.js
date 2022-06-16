window.onload = function () {
    this.ready();
    // this.hideLoader();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails, premiumFrequencyListElement, premiumPaymentOptionListElement, policyTermElement,
    premiumPaymentTermElement;
var proposer_Is_Same_As_Life_Assured = "Y"

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    setKerlaDiscount();
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
    this.initArrayList();
};

function initializeData() {
    //document.forms["smartMoneyBackGoldForm"]["dob"].value = (new Date()).toISOString().substr(0, 10);
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
    var laGender = document.forms["smartMoneyBackGoldForm"]["gender"].value;
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
    var proposerGender = document.forms["smartMoneyBackGoldForm"]["proposerGender"].value;
    if (proposerGender === "Male") {
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
    } else if (proposerGender === "Female") {
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
    onWishToBackdateUpdate((this.getWishToBackdate() ? 'yes' : "no"));
    this.validateRequiredAge(getDDMMYYYY(self.getDOB()))
}

function initArrayList() {
    planOptionListElement = document.forms["smartMoneyBackGoldForm"]["planOption"];
    for (i = 0; i < planOptionList.length; i++) {
        planOptionListElement.add(new Option(planOptionList[i].title, planOptionList[i].value));
    }

    policyTermElement = document.forms["smartMoneyBackGoldForm"]["policyTerm"];
    // for (i = 0; i < planOptionList.length; i++) {
    //     policyTermElement.add(new Option(planOptionList[i].policyTerm, planOptionList[i].value));
    // }

    policyTermElement.value = "15";
    premiumFrequencyListElement = document.forms["smartMoneyBackGoldForm"]["premiumFrequency"];
    for (i = 0; i < premiumFrequencyList.length; i++) {
        premiumFrequencyListElement.add(new Option(premiumFrequencyList[i].title, premiumFrequencyList[i].value));
    }

    premiumPaymentOptionListElement = document.forms["smartMoneyBackGoldForm"]["premiumPaymentOption"];
    for (i = 0; i < premiumPaymentOptionList.length; i++) {
        premiumPaymentOptionListElement.add(new Option(premiumPaymentOptionList[i].title, premiumPaymentOptionList[i].value));
    }

    premiumPaymentTermElement = document.forms["smartMoneyBackGoldForm"]["ppt"];
    premiumPaymentTermElement.value = "1"

}

function onWishToBackdateUpdate(wishToBackdate) {
    var backDateDiv = document.getElementById("backdatingDateDivId");
    var backDateElement = document.forms["smartMoneyBackGoldForm"]["backDate"];

    if (wishToBackdate === "yes") {
        backDateDiv.style.display = "block";
        backDateElement.required = true;
    } else {
        backDateDiv.style.display = "none";
        backDateElement.required = false;
    }
}

function calculateAge(birthday) {
    var age = getAgeFromBirthdate(birthday);
    document.forms["smartMoneyBackGoldForm"]["age"].innerHTML = age;
    document.forms["smartMoneyBackGoldForm"]["age"].value = age;
    var proposerFirstName = document.forms["smartMoneyBackGoldForm"]["propFirstName"];
    var proposerLastName = document.forms["smartMoneyBackGoldForm"]["propLastName"];
    var proposerDOB = document.forms["smartMoneyBackGoldForm"]["propDob"];

    if (age < minAgeLimit || age > maxAgeLimit) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        document.getElementById('divProposer').style.display = "none";
        // document.getElementById('riderSection').style.display = "none";
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        if (age >= minAgeLimit && age < 18) {
            proposer_Is_Same_As_Life_Assured = "N"
            document.getElementById('divProposer').style.display = "block";
            // document.getElementById('riderSection').style.display = "none";
            proposerFirstName.required = true;
            proposerLastName.required = true;
            proposerDOB.required = true;

        } else {
            proposer_Is_Same_As_Life_Assured = "Y"
            document.getElementById('divProposer').style.display = "none";
            // document.getElementById('riderSection').style.display = "block";
            proposerFirstName.required = false;
            proposerLastName.required = false;
            proposerDOB.required = false;
        }
        return true;
    }

}

function validateRequiredAge(birthday) {
    var age = getAgeFromBirthdate(birthday);
    var proposerFirstName = document.forms["smartMoneyBackGoldForm"]["propFirstName"];
    var proposerLastName = document.forms["smartMoneyBackGoldForm"]["propLastName"];
    var proposerDOB = document.forms["smartMoneyBackGoldForm"]["propDob"];

    if (age < minAgeLimit || age > maxAgeLimit) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        document.getElementById('divProposer').style.display = "none";
        // document.getElementById('riderSection').style.display = "none";
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        if (age >= minAgeLimit && age < 18) {
            proposer_Is_Same_As_Life_Assured = "N"
            document.getElementById('divProposer').style.display = "block";
            // document.getElementById('riderSection').style.display = "none";
            proposerFirstName.required = true;
            proposerLastName.required = true;
            proposerDOB.required = true;

        } else {
            proposer_Is_Same_As_Life_Assured = "Y"
            document.getElementById('divProposer').style.display = "none";
            // document.getElementById('riderSection').style.display = "block";
            proposerFirstName.required = false;
            proposerLastName.required = false;
            proposerDOB.required = false;
        }
        return true;
    }

    return true;
}

function calculatePropAge(propAge) {
    if (proposer_Is_Same_As_Life_Assured === 'N') {
        var age = this.getAgeFromBirthdate(getDDMMYYYY(propAge));
        if (age < 18 || age > maxAgeLimit) {
            document.getElementById('propAgeErrId').style.display = "block";
            document.getElementById('propAgeErrId').innerHTML = `Age should be between 18 and ${proposerAgeMax}.`;
            return false;
        } else {
            document.getElementById('propAgeErrId').style.display = "none";
            document.getElementById('propAgeErrId').innerHTML = '';
            return true;
        }
    } else {
        return true;
    }
}

function onPlanOptionSelected(optionIndex) {

    if (this.getPremiumPaymentOption() == "Regular") {
        maxAge = 45;
    } else {
        maxAge = 55;
    }


    if (this.getPremiumPaymentOption() == "Regular") {
        maxAgeLimit = 45
    } else {
        maxAgeLimit = 55;
    }

    if (optionIndex == 0) {

        policyTermElement.value = "15";

        minAgeLimit = 14;

        if (this.getPremiumPaymentOption() == "Single") {
            premiumPaymentTermElement.value = "1";
        } else if (this.getPremiumPaymentOption() == "Limited") {
            premiumPaymentTermElement.value = "8";
        } else if (this.getPremiumPaymentOption() == "Regular") {
            premiumPaymentTermElement.value = "15";
        }
    } else if (optionIndex == 1) {
        policyTermElement.value = "20";

        minAgeLimit = 14;

        if (this.getPremiumPaymentOption() == "Single") {
            premiumPaymentTermElement.value = "1";
        } else if (this.getPremiumPaymentOption() == "Limited") {
            premiumPaymentTermElement.value = "10";
        } else if (this.getPremiumPaymentOption() == "Regular") {
            premiumPaymentTermElement.value = "20";
        }
    } else if (optionIndex == 2) {
        policyTermElement.value = "25";

        minAgeLimit = 14;

        if (this.getPremiumPaymentOption() == "Single") {
            premiumPaymentTermElement.value = "1";
        } else if (this.getPremiumPaymentOption() == "Limited") {
            premiumPaymentTermElement.value = "12";
        } else if (this.getPremiumPaymentOption() == "Regular") {
            premiumPaymentTermElement.value = "25";
        }
    }
}

function onPremiumPaymentOptionSelected(optionIndex) {


    if (this.getPlanOption() == "Option 1") {
        minAgeLimit = 14;
    } else if (this.getPlanOption() == "Option 2") {
        minAgeLimit = 14;
    } else if (this.getPlanOption() == "Option 3") {
        minAgeLimit = 14
    }

    if (optionIndex == 0) {

        document.getElementById('premiumFrequencyDiv').style.display = "none";

        premiumPaymentTermElement.value = "1";
        maxAgeLimit = 55;
    } else if (optionIndex == 1) {
        document.getElementById('premiumFrequencyDiv').style.display = "block";
        maxAgeLimit = 45;

        if (this.getPlanOption() == "Option 1") {
            premiumPaymentTermElement.value = "15";
        } else if (this.getPlanOption() == "Option 2") {
            premiumPaymentTermElement.value = "20";
        } else if (this.getPlanOption() == "Option 3") {
            premiumPaymentTermElement.value = "25";
        }

    } else if (optionIndex == 2) {
        document.getElementById('premiumFrequencyDiv').style.display = "block";
        maxAgeLimit = 45;

        if (this.getPlanOption() == "Option 1") {
            premiumPaymentTermElement.value = "8";
        } else if (this.getPlanOption() == "Option 2") {
            premiumPaymentTermElement.value = "10";
        } else if (this.getPlanOption() == "Option 3") {
            premiumPaymentTermElement.value = "12";
        }

    }
}

function getTitle() {
    return document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldTitle"].value;
}

function getProposerTitle() {
    return document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldProposerTitle"].value;
}

function getCalculatedAge() {
    return parseInt(document.forms["smartMoneyBackGoldForm"]["age"].value, 10);
}

function getEmail() {
    return document.forms["smartMoneyBackGoldForm"]["email"].value;
}

function getFName() {
    return document.forms["smartMoneyBackGoldForm"]["first_name"].value;
}

function getMName() {
    return document.forms["smartMoneyBackGoldForm"]["middle_name"].value;
}

function getLName() {
    return document.forms["smartMoneyBackGoldForm"]["last_name"].value;
}

function getProposerFName() {
    return document.forms["smartMoneyBackGoldForm"]["propFirstName"].value;
}

function getProposerMName() {
    return document.forms["smartMoneyBackGoldForm"]["propMiddleName"].value;
}

function getProposerLName() {
    return document.forms["smartMoneyBackGoldForm"]["propLastName"].value;
}

function getConfirmEmail() {
    return document.forms["smartMoneyBackGoldForm"]["confirmEmail"].value;
}

function getDOB() {
    return document.forms["smartMoneyBackGoldForm"]["dob"].value;
}

function getPropDOB() {
    return document.forms["smartMoneyBackGoldForm"]["propDob"].value;
}

function getMobileNo() {
    return document.forms["smartMoneyBackGoldForm"]["mobile"].value;
}

function getPolicyTerm() {
    return document.forms["smartMoneyBackGoldForm"]["policyTerm"].value;
}

function getPlanOption() {
    var index = document.forms["smartMoneyBackGoldForm"]["planOption"].value;
    return planOptionList[index].title;
}

function getPremiumFrequency() {
    var index = document.forms["smartMoneyBackGoldForm"]["premiumFrequency"].value;
    return premiumFrequencyList[index].title;
}

function getPremiumPaymentOption() {
    var index = document.forms["smartMoneyBackGoldForm"]["premiumPaymentOption"].value;
    return premiumPaymentOptionList[index].title;
}

function getPremiumPaymentTerm() {
    return document.forms["smartMoneyBackGoldForm"]["ppt"].value;
}

function getSumAssured() {
    return parseInt(document.forms["smartMoneyBackGoldForm"]["sumAssured"].value, 10);
}

function getGender() {
    return document.forms["smartMoneyBackGoldForm"]["gender"].value;
}

function getProposerGender() {
    return document.forms["smartMoneyBackGoldForm"]["proposerGender"].value;
}

function getAge() {
    return document.forms["smartMoneyBackGoldForm"]["age"].value;
}

function getPropAge() {
    var age = this.getAgeFromBirthdate(getDDMMYYYY(self.getPropDOB()));
    return age;
}

function getWishToBackdate() {
    var wishToBackdate = document.forms["smartMoneyBackGoldForm"]["wishToBackdate"].value
    if (wishToBackdate === "yes")
        return true;
    else
        return false;
}

function getBackdate() {
    if (this.getWishToBackdate()) {
        return document.forms["smartMoneyBackGoldForm"]["backDate"].value;
    } else {
        return "";
    }
}

function getIsStaff() {
    return document.forms["smartMoneyBackGoldForm"]["staff_discount"].checked;
}

function validateGender() {
    var gender = this.getGender();
    if (gender !== "Female" || gender !== "Male" || gender !== "Third Gender") {
        document.getElementById('genderErrId').style.display = "block";
        document.getElementById('genderErrId').innerHTML = "Please select Life Assured gender.";
        return false;
    } else {
        document.getElementById('genderErrId').style.display = "none";
        return true
    }
}

function validateGender(formElementName) {

    var laGender = document.forms["smartMoneyBackGoldForm"]["gender"].value;
    document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldTitle"].options[0].disabled = false;
    document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldTitle"].options[1].disabled = false;
    document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldTitle"].options[2].disabled = false;

    if (laGender === "Male") {

        document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldTitle"].value = "Mr.";
        document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldTitle"].options[1].disabled = true;
        document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldTitle"].options[2].disabled = true;
    } else if (laGender === "Female") {

        document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldTitle"].value = "Mrs.";
        document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldTitle"].options[0].disabled = true;
    } else if (laGender === "Third Gender") {
        document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldTitle"].value = "Mr.";
        document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldTitle"].options[1].disabled = false;
        document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldTitle"].options[2].disabled = false;
        document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldTitle"].options[0].disabled = false;
    }

    if (laGender != "Male" && laGender != "Female" && laGender != "Third Gender") {
        document.getElementById("genderErrId").style.display = "block";
        document.getElementById("genderErrId").innerHTML =
            "Please select Life Assured gender.";
        return false;
    } else {
        document.getElementById("genderErrId").style.display = "none";
        return true;
    }
}

function validateProposerGender(formElementName) {
    if (this.proposer_Is_Same_As_Life_Assured == "Y") {
        return true;
    } else {
        var proposerGender = document.forms["smartMoneyBackGoldForm"]["proposerGender"].value;
        document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldProposerTitle"].options[0].disabled = false;
        document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldProposerTitle"].options[1].disabled = false;
        document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldProposerTitle"].options[2].disabled = false;
        if (proposerGender === "Male") {
            document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldProposerTitle"].value = "Mr.";
            document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldProposerTitle"].options[1].disabled = true;
            document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldProposerTitle"].options[2].disabled = true;
        } else if (proposerGender === "Female") {
            document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldProposerTitle"].value = "Mrs.";
            document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldProposerTitle"].options[0].disabled = true;
        } else if (proposerGender === "Third Gender") {
            document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldProposerTitle"].value = "Mr.";
            document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldProposerTitle"].options[1].disabled = false;
            document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldProposerTitle"].options[2].disabled = false;
            document.forms["smartMoneyBackGoldForm"]["smartMoneyBackGoldProposerTitle"].options[0].disabled = false;
        }
        if (proposerGender != "Male" && proposerGender != "Female" && proposerGender != "Third Gender") {
            document.getElementById("proposerGenderErrId").style.display = "block";
            document.getElementById("proposerGenderErrId").innerHTML =
                "Please select Proposer gender.";
            return false;
        } else {
            document.getElementById("proposerGenderErrId").style.display = "none";
            return true;
        }
    }
}

function validateSumAssured() {
    var minSA = 200000;
    var sumAssured = this.getSumAssured();
    if (isNaN(sumAssured) || sumAssured === undefined || sumAssured === null || sumAssured === '') {
        document.getElementById('sumAssuredErrKeyId').style.display = "block";
        document.getElementById('sumAssuredErrKeyId').innerHTML = 'Please enter sum assured.';
        return false;
    } else if (sumAssured % 1000 != 0) {
        document.getElementById('sumAssuredErrKeyId').style.display = "block";
        document.getElementById('sumAssuredErrKeyId').innerHTML = `Sum Assured should be in multiples of ${new Intl.NumberFormat('en-IN').format(1000)}.`;
        return false;
    } else if (sumAssured < minSA) {
        document.getElementById('sumAssuredErrKeyId').style.display = "block";
        document.getElementById('sumAssuredErrKeyId').innerHTML = `Sum Assured should be greater than or equal to ${new Intl.NumberFormat('en-IN').format(minSA)}`;
        return false;
    } else {
        document.getElementById('sumAssuredErrKeyId').style.display = "none";
        return true;
    }
}

/* ******************************  FORM VALIDATION & SUBMIT **************************** */
function validatForm() {
    if (smartMoneyBackGoldForm.checkValidity() && this.validateGender() && this.validateConfirmEmail() &&
        this.validateRequiredAge(getDDMMYYYY(self.getDOB())) && this.calculatePropAge(self.getPropDOB()) &&
        this.validateProposerGender() && this.validateMobileNo(self.getMobileNo()) &&
        this.validateSumAssured() && this.trueBackdate() && this.validateBackdatingDate()) {
        console.log(" submit ");

        this.calculatePremiumAPICall(); // form valid
    }
}

function calculatePremiumAPICall() {

    console.log("WISH TO BACK DATE--" + this.getWishToBackdate());
    /* 
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', serviceURL + '/getPremiumSmartMoneyBackGold', true); */

    let xmlBodyParam = ` <getPremiumSmartMoneyBackGold xmlns="http://tempuri.org/">
    <isStaff>${this.getIsStaff()}</isStaff>
    <isJkResident>false</isJkResident>
    <planName>${this.getPlanOption()}</planName>
    <age>${this.getCalculatedAge()}</age>
    <gender>${this.getGender()}</gender>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <premiumFreq>${this.getPremiumPaymentOption()}</premiumFreq>
    <basicSA>${this.getSumAssured()}</basicSA>
    <isPTARider>false</isPTARider>
    <ptaTerm></ptaTerm>
    <ptaSA></ptaSA>
    <isADBRider></isADBRider>
    <adbTerm></adbTerm>
    <adbSA></adbSA>
    <isATPDBRider></isATPDBRider>
    <atpdbTerm></atpdbTerm>
    <atpdbSA></atpdbSA>
    <isCC13Rider></isCC13Rider>
    <cc13Term></cc13Term>
    <cc13SA></cc13SA>
    <IsBackdate>false</IsBackdate>
    <Backdate>${this.getWishToBackdate() ? dateMMDDYYYYFormat(this.getBackdate()) : ''}</Backdate>
    <IsMines>false</IsMines>
    <ppt>${this.getPremiumPaymentTerm()}</ppt>
    <premPayOption>${this.getPremiumPaymentOption()}</premPayOption>
    <KFC>${getKerlaDiscount()}</KFC>
  </getPremiumSmartMoneyBackGold>`;

    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        ${xmlBodyParam}
                    </soap:Body>
                </soap:Envelope>`;

    //console.log(body);

    self.showLoader();
    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {
        callServiceHits('getPremiumSmartMoneyBackGold', '', '', '',
                "", "", userAuth)
            .then((resolve) => {
                // console.log(resolve);
            }).catch((reject) => {
                // console.log(reject);
            });

        let planCode = '';
        if (self.getPlanOption() === 'Option 1') {
            planCode = 'GSMBP1';
        } else if (self.getPlanOption() === 'Option 2') {
            planCode = 'GSMBP2';
        } else if (self.getPlanOption() === 'Option 3') {
            planCode = 'GSMBP3';
        } else if (self.getPlanOption() === 'Option 4') {
            planCode = 'GSMBP4';
        }

        let forminputbyuser = {
            isSameAsProposer: proposer_Is_Same_As_Life_Assured,
            staffDiscount: self.getIsStaff(),
            gender: self.getGender(),
            proposerGender: self.getProposerGender(),
            childName: self.getTitle() + " " + self.getFName() + " " + self.getLName(),
            proposerName: self.getProposerTitle() + " " + self.getProposerFName() + " " + self.getProposerLName(),
            ageEntry: self.getAge(),
            proposerAge: self.getPropAge(),
            plan: self.getPlanOption(),
            policyTerm: self.getPolicyTerm(),
            frequencyMode: self.getPremiumFrequency(),
            sumAssure: self.getSumAssured(),
            isWishToBackDate: self.getWishToBackdate(),
            backDate: self.getWishToBackdate() ? getDDMMYYYY(self.getBackdate()) : '',
            premiumPaymentOption: self.getPremiumPaymentOption(),
            premiumPaymentTerm: self.getPremiumPaymentTerm(),
            isPTR: false,
            isADBR: false,
            isATPDBRider: false,
            isCCLR: false,
            // isPTR: self.getPTARider(),
            // ptrTerm: self.getPTARiderTerm(),
            // ptrSumAssured: self.getPTARiderSumAssured(),
            // isADBR: self.getADBRider(),
            // adbRiderTerm: self.getADBRiderTerm(),
            // adbRiderSumAssured: self.getADBRiderSumAssured(),
            // isATPDBRider: self.getATPDBRider(),
            // atpdbTerm: self.getATPDBRiderTerm(),
            // atpdbSumAssured: self.getATPDBRiderSumAssured(),
            // isCCLR: self.getCT13Rider(),
            // CCLRTerm: self.getCT13RiderTerm(),
            // CCLRSumAssured: self.getCT13RiderSumAssured(),
            quotationNumber: quotNumber,

            PlanName: self.productDetails.title,
            CustTitle: self.getTitle(),
            CustFirstName: self.getFName(),
            CustMiddleName: self.getMName(),
            CustLastName: self.getLName(),
            CustMobile: self.getMobileNo(),
            CustEmailID: self.getEmail(),
            LaDOB: getDDMMYYYY(self.getDOB()),
            ProposerDOB: getDDMMYYYY(self.getPropDOB()),
            BasicSA: this.getSumAssured(),
            TotalPremAmt: "",
            Frequency: self.getPremiumFrequency(),
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: '0',
            PlanCode: planCode,
            KFC: getKerlaDiscount() ? "Y" : "N"
        };

        ApiCallService('/getPremiumSmartMoneyBackGold', body, '<smartMoneyBackGold>', '</smartMoneyBackGold>', true).then((data) => {
            self.hideLoader();
            data = data.smartMoneyBackGold;
            data.productDetails = self.productDetails;
            data.inputPolicyTerm = getPolicyTerm();
            // data.isPTARiderChecked = self.getPTARider();
            // data.isADBRiderChecked = self.getADBRider();
            // data.isATPDBRiderChecked = self.getATPDBRider();
            // data.isCC13RiderChecked = self.getCT13Rider();
            forminputbyuser.TotalPremAmt = data.premWthST;
            forminputbyuser.yearlyPrem = data.yearlyPrem;

            var stringifyJson = JSON.stringify(data);

            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</NonGSV_surrndr_val_8Percent${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</NonGSV_surrndr_val_8Percent${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                var index = forminputbyuser.PolicyTerm;
                var nonGuaranMatBen_4Percent_tag = parseXmlTag(premiumCalcXMLResponse, "nonGuaranMatBen_4Percent" + index + "");
                var nonGuaranMatBen_8Percent_tag = parseXmlTag(premiumCalcXMLResponse, "nonGuaranMatBen_8Percent" + index + "");
                var nonGuaranMatBen = "";
                nonGuaranMatBen = "<nonGuaranMatBen_4Percent" + index + ">" + nonGuaranMatBen_4Percent_tag + "</nonGuaranMatBen_4Percent" + index + ">";
                nonGuaranMatBen += "<nonGuaranMatBen_8Percent" + index + ">" + nonGuaranMatBen_8Percent_tag + "</nonGuaranMatBen_8Percent" + index + ">";
                remaningOutput = remaningOutput + nonGuaranMatBen + "</SmartMoneyBackGold>";
                remaningOutput = remaningOutput.replace("smartMoneyBackGold", "SmartMoneyBackGold");
                // console.log("remaningOutput ", remaningOutput);
                let escapedBIOutput = escapeInputHTML("<?xml version='1.0' encoding='utf-8' ?>" + remaningOutput);
                sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.
            }


            //console.log("PDF");
            let input = self.getInput(forminputbyuser);
            // console.log("input = ", input);
            //console.log(stringifyJson);
            if (data.errCode != undefined && data.errCode == 1) {
                alert("Something went worng. Please try again later")
            } else {
                if (sessionStorage.ThroughNeedAnalysis) {
                    let status = sessionStorage.getItem('ThroughNeedAnalysis');

                    if (status === 'Yes') {
                        // console.log("proposer_Is_Same_As_Life_Assured = " + proposer_Is_Same_As_Life_Assured);
                        updateDataInDB(forminputbyuser).then((resolve) => {
                            if (resolve == "1") {
                                createPDFGeneralMethod(self.productDetails, data, forminputbyuser)
                            } else {
                                alert("Something Went Wrong")
                            }

                        });
                        // createPDFGeneralMethod(this.productDetails, data, forminputbyuser)
                    } else if (status === 'No') {
                        sessionStorage.setItem('premiumCalcResponse', stringifyJson);
                        window.location.href = "./../../PremiumCalSuccess/success.html";
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

function getInput(forminputbyuser) {
    var inputVal = "";
    inputVal += `<?xml version='1.0' encoding='utf-8' ?><smartmoneybackgold>`;

    inputVal += `<LifeAssured_title>${self.getTitle()}</LifeAssured_title>`;
    inputVal += `<LifeAssured_firstName>${self.getFName()}</LifeAssured_firstName>`;
    inputVal += `<LifeAssured_middleName>${self.getMName()}</LifeAssured_middleName>`;
    inputVal += `<LifeAssured_lastName>${self.getLName()}</LifeAssured_lastName>`;
    inputVal += `<LifeAssured_DOB>${getDDMMYYYY(self.getDOB())}</LifeAssured_DOB>`;
    inputVal += `<LifeAssured_age>${self.getAge()}</LifeAssured_age>`;
    inputVal += `<gender>${self.getGender()}</gender>`;

    inputVal += `<proposer_title>${proposer_Is_Same_As_Life_Assured == "N"? self.getProposerTitle() : ''}</proposer_title>`;
    inputVal += `<proposer_firstName>${proposer_Is_Same_As_Life_Assured == "N" ? self.getProposerFName() : ''}</proposer_firstName>`;
    inputVal += `<proposer_middleName>${proposer_Is_Same_As_Life_Assured == "N" ? self.getProposerMName() : ''}</proposer_middleName>`;
    inputVal += `<proposer_lastName>${proposer_Is_Same_As_Life_Assured == "N" ? self.getProposerLName() : ''}</proposer_lastName>`;
    inputVal += `<proposer_DOB>${proposer_Is_Same_As_Life_Assured == "N" ? getDDMMYYYY(self.getPropDOB()) : ''}</proposer_DOB>`;
    inputVal += `<proposer_age>${proposer_Is_Same_As_Life_Assured == "N" ? self.getPropAge() : ''}</proposer_age>`;
    inputVal += `<proposer_gender>${proposer_Is_Same_As_Life_Assured == "N" ? self.getProposerGender() : ''}</proposer_gender>`;

    inputVal += `<product_name>${product_name}</product_name>`;
    inputVal += `<product_Code>${product_code}</product_Code>`;
    inputVal += `<product_UIN>${product_uin}</product_UIN>`;
    inputVal += `<product_cateogory>${product_cateogory}</product_cateogory>`;
    inputVal += `<product_type>${product_type}</product_type>`;

    inputVal += `<proposer_Is_Same_As_Life_Assured>${proposer_Is_Same_As_Life_Assured}</proposer_Is_Same_As_Life_Assured>`;

    inputVal += `<isJKResident>false</isJKResident>`;
    inputVal += `<isStaff>${self.getIsStaff()}</isStaff>`;
    inputVal += `<age>${self.getAge()}</age>`;
    inputVal += `<plan>${forminputbyuser.plan}</plan>`;

    inputVal += `<policyTerm>${forminputbyuser.policyTerm}</policyTerm>`;

    inputVal += `<isPTRider>${forminputbyuser.isPTR}</isPTRider>`;
    inputVal += `<isADBRider>${forminputbyuser.isADBR}</isADBRider>`;
    inputVal += `<isATPDBRider>${forminputbyuser.isATPDBRider}</isATPDBRider>`;
    inputVal += `<isCCNLRider>${forminputbyuser.isCCLR}</isCCNLRider>`;

    inputVal += `<ptTerm>${forminputbyuser.isPTR ? forminputbyuser.ptrTerm:'0'}</ptTerm>`;
    inputVal += `<adbTerm>${forminputbyuser.isADBR? forminputbyuser.adbRiderTerm:'0'}</adbTerm>`;
    inputVal += `<atpdbTerm>${forminputbyuser.isATPDBRider? forminputbyuser.atpdbTerm:'0'}</atpdbTerm>`;
    inputVal += `<ccnlTerm>${forminputbyuser.isCCLR? forminputbyuser.CCLRTerm:'0'}</ccnlTerm>`;
    inputVal += "<premFreqOptions>" + self.getPremiumPaymentOption() + "</premFreqOptions>";
    inputVal += "<PremPaymentTerm>" + self.getPremiumPaymentTerm() + "</PremPaymentTerm>";
    inputVal += `<premFreq>${forminputbyuser.frequencyMode}</premFreq>`;
    inputVal += `<sumAssured>${forminputbyuser.sumAssure}</sumAssured>`;
    inputVal += `<ptSA>${forminputbyuser.isPTR ? forminputbyuser.ptrSumAssured:'0.0'}</ptSA>`;
    inputVal += `<adbSA>${forminputbyuser.isADBR? forminputbyuser.adbRiderSumAssured:'0.0'}</adbSA>`;
    inputVal += `<atpdbSA>${forminputbyuser.isATPDBRider? forminputbyuser.atpdbSumAssured:'0.0'}</atpdbSA>`;
    inputVal += `<ccnlSA>${forminputbyuser.isCCLR? forminputbyuser.CCLRSumAssured:'0.0'}</ccnlSA>`;
    inputVal += `<Wish_to_backdate_policy>${forminputbyuser.isWishToBackDate  ? "y" : "n"}</Wish_to_backdate_policy>`;
    inputVal += `<backdating_Date>${forminputbyuser.isWishToBackDate ? forminputbyuser.backDate : ''}</backdating_Date>`;
    inputVal += `<KFC>${forminputbyuser.KFC}</KFC>`
    inputVal += `</smartmoneybackgold>`;

    let escapedHTML = escapeInputHTML(inputVal);
    sessionStorage.setItem("BIInput", escapedHTML);
    return inputVal;
}

//Added By Tushar Kadam on 19/09/2019
function trueBackdate() {
    if (self.getWishToBackdate()) {
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
        var todayDate = date + "-" + month + "-" + currYear;
        //document.getElementById("backDate").value = "20/06/2019";
        var backDate_split = (dateMMDDYYYYFormat(self.getBackdate())).split("-");
        var newBackDate = new Date(backDate_split[2], (backDate_split[0] - 1), backDate_split[1])
        if (currMonth >= 4) {
            finYerEndDate = "01-04-" + currYear;
        } else {
            finYerEndDate = "01-04-" + (currYear - 1);
        }
        var finYerEndDate_split = finYerEndDate.split("-");
        var newFinYerEndDate = new Date(finYerEndDate_split[2], (finYerEndDate_split[1] - 1), finYerEndDate_split[0])
        if (today.getTime() < newBackDate.getTime()) {
            document.getElementById('backDateErrId').style.display = 'block';
            document.getElementById('backDateErrId').innerHTML = "Please enter backdation date between " + finYerEndDate + " and " + todayDate;
            return false;
        } else if (newBackDate.getTime() < newFinYerEndDate.getTime()) {
            document.getElementById('backDateErrId').style.display = 'block';
            document.getElementById('backDateErrId').innerHTML = "Please enter Backdation date between " + finYerEndDate + " and " + todayDate;
            return false;
        } else {
            document.getElementById('backDateErrId').style.display = 'none';
            return true;
        }
    } else {
        return true;
    }
}

function validateBackdatingDate() {
    if (getWishToBackdate()) {
        if (isEmpty(self.getBackdate())) {
            document.getElementById("backDateErrId").style.display = "block";
            document.getElementById("backDateErrId").innerHTML = "Please Select Backdating Date";
            return false;
        } else {
            document.getElementById("backDateErrId").style.display = "none";
            return true;
        }
    }
    document.getElementById("backDateErrId").style.display = "none";
    return true;
}

function calculateMyAge() {
    if (!isEmpty(self.getDOB())) {
        var d = getDDMMYYYY(self.getBackdate());
        var split_date = d.split("/");
        var nowCal = new Date(split_date[2], split_date[1], split_date[0]);
        var ProposerDob = getDDMMYYYY(this.getDOB()).split("/");
        var age = nowCal.getFullYear() - parseInt(ProposerDob[2]);
        var isMonthGreater = parseInt(ProposerDob[1]) > nowCal.getMonth();
        var isMonthSameButDayGreater = parseInt(ProposerDob[1]) == nowCal.getMonth() &&
            parseInt(ProposerDob[1]) > nowCal.getDate();
        if (isMonthGreater || isMonthSameButDayGreater) {
            age = age - 1;
        }
        document.forms["smartMoneyBackGoldForm"]["age"].value = age;
    } else {
        alert("Please select a LifeAssured DOB First");
        document.forms['smartMoneyBackGoldForm']['backDate'].value = "";
    }
}

function setBackdateEmpty() {
    document.forms['smartMoneyBackGoldForm']['backDate'].value = "";
}
