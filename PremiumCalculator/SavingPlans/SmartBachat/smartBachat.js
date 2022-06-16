window.onload = function () {
    this.ready();
    // self.hideLoader();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails;
var proposer_Is_Same_As_Life_AssuredVar = "y";

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    setKerlaDiscount();
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
    this.initArrayList();
    proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
    for (i = 0; i < proposerBlocks.length; i++) {
        proposerBlocks[i].style.display = "none";
    }
};

function initializeData() {
    // document.forms["smartBachatForm"]["dob"].value = (new Date()).toISOString().substr(0, 10);
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;

    this.onWishToBackdateUpdate((self.isWishToBackDate() ? "yes" : "no"));
    var laGender = document.forms["smartBachatForm"]["gender"].value;
    if (laGender === "Male") {
        $("#male_label").css({
            "background": "url('../../../images/male_active.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
        $("#female_label").css({
            "background": "url('../../../images/female.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
    } else if (laGender === "Female") {
        $("#female_label").css({
            "background": "url('../../../images/female_active.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover",
            "margin-right": "20px"
        });
        $("#male_label").css({
            "background": "url('../../../images/male.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
    }
}

function initArrayList() {
    planElement = document.forms["smartBachatForm"]["plan"];
    console.log("length ", planOptionList.length);

    for (i = 0; i < planOptionList.length; i++) {
        planElement.add(new Option(planOptionList[i].title, planOptionList[i].value));
    }

    policyListElement = document.forms["smartBachatForm"]["policyTerm"];
    for (i = minPolicyTermLimit; i <= maxPolicyTermLimit; i++) {
        policyListElement.add(new Option(i, i));
    }

    this.initializePremiumFrequencyList();
    this.onPlanUpdate();
    this.setPremiumPayingTermBasedOnPolicyTerm(policyListElement.value);
    //this.onPlanUpdate();
}


function setPremiumPayingTermBasedOnPolicyTerm(policyTerm) {
    var premiumPayingTermList;
    payingTermElement = document.forms["smartBachatForm"]["premiumPayingTerm"];
    var payingTermSelected = this.getPremiumpayingTerm();

    if (Math.floor(policyTerm / 5) === 2) {
        premiumPayingTermList = [6, 7];
    } else if (Math.floor(policyTerm / 5) === 3) {
        premiumPayingTermList = [6, 7, 10];
    } else {
        premiumPayingTermList = [6, 7, 10, 15];
    }

    payingTermElement.innerHTML = '';
    for (i = 0; i < premiumPayingTermList.length; i++) {
        payingTermElement.add(new Option(premiumPayingTermList[i], premiumPayingTermList[i]));
    }
}

function setValueToATPDBRider() {
    var sumAssured = self.getSumAssured();
    if (isNaN(sumAssured) || sumAssured === undefined || sumAssured === null || sumAssured === '') {
        document.forms['smartBachatForm']['atpdbSumAssured'].value = 0;
    } else {
        if (sumAssured < 5000000) {
            document.forms['smartBachatForm']['atpdbSumAssured'].value = sumAssured;
        } else {
            document.forms['smartBachatForm']['atpdbSumAssured'].value = 5000000;
        }
    }
}

function onPlanUpdate() {
    var plan = this.getPlanOption();
    if (plan.value === 2) {
        document.getElementById('atpdbDiv').style.display = "block";
        document.forms['smartBachatForm']['atpdbSumAssured'].required = true;
        document.forms['smartBachatForm']['atpdbSumAssured'].value = self.getSumAssured();

        proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
        console.log("paperrblockd=", proposerBlocks);
        for (i = 0; i < proposerBlocks.length; i++) {
            proposerBlocks[i].style.display = "none";
            document.forms['smartBachatForm']['proposer_first_name'].required = false;
            document.forms['smartBachatForm']['proposer_first_name'].value = "";
            document.forms['smartBachatForm']['proposer_last_name'].required = false;
            document.forms['smartBachatForm']['proposer_last_name'].value = "";
            document.forms['smartBachatForm']['proposer_dob'].required = false;
            document.forms['smartBachatForm']['proposer_dob'].value = "";
            document.forms['smartBachatForm']['proposer_age'].value = "0";
            document.forms['smartBachatForm']['dob'].value = "";
            document.forms['smartBachatForm']['age'].value = "0";
            //document.getElementById('male_prop_label').style.background = "url('../../../../images/male.png')";
            //document.getElementById('female_prop_label').style.background = "url('../../../../images/female.png')";
            document.forms['smartBachatForm']['proposerGender'].checked = false;
            $("#male_prop_label").css({
                "background": "url('../../../images/male.png')",
                "width": "100px",
                "height": "100px",
                "background-size": "cover"
            });

            $("#female_prop_label").css({
                "background": "url('../../../images/female.png')",
                "width": "100px",
                "height": "100px",
                "background-size": "cover"
            });
        }
    } else {
        document.getElementById('atpdbDiv').style.display = "none";

        document.forms['smartBachatForm']['atpdbSumAssured'].required = false;
    }
}

function initializePremiumFrequencyList() {
    premiumFrequencyListElement = document.forms["smartBachatForm"]["premiumFrequency"];
    premiumFrequencyListElement.innerHTML = '';
    for (i = 0; i < premiumPaymentModeList.length; i++) {
        premiumFrequencyListElement.add(new Option(premiumPaymentModeList[i].title, premiumPaymentModeList[i].value));
    }
}

function onWishToBackdateUpdate(wishToBackdate) {
    var backDateDiv = document.getElementById("backdatingDateDivId");
    var backDateElement = document.forms["smartBachatForm"]["backDate"];

    if (wishToBackdate === "yes") {
        backDateDiv.style.display = "block";
        // backDateElement.required = true;
    } else {
        backDateDiv.style.display = "none";
        document.forms['smartBachatForm']['backDate'].value = "";
        // backDateElement.required = false;
    }
}


function calculateProposerAge(birthday) {
    //added proposer_Is_Same_As_Life_AssuredVar based condition if it is n than calculating the age else not calculating
    if (proposer_Is_Same_As_Life_AssuredVar === 'n') {
        var age = this.getAgeFromBirthdate(getDDMMYYYY(birthday));
        document.forms["smartBachatForm"]["proposer_age"].innerHTML = age;
        document.forms["smartBachatForm"]["proposer_age"].value = age;
        if (age < 18) {
            document.getElementById('proposerAgeErrId').style.display = "block";
            document.getElementById('proposerAgeErrId').innerHTML = `Age should be between 18 and ${maxAgeLimit}.`;
            return false;
        } else {
            document.getElementById('proposerAgeErrId').style.display = "none";
            document.getElementById('proposerAgeErrId').innerHTML = '';
            return true;
        }
    } else {
        return true;
    }
}

function setAge(birthday) {
    var age = this.getAgeFromBirthdate(getDDMMYYYY(birthday));
    document.forms["smartBachatForm"]["age"].innerHTML = age;
    document.forms["smartBachatForm"]["age"].value = age;
    document.forms['smartBachatForm']['backDate'].value = "";
}

function calculateAge(birthday) {
    var age = this.getAgeFromBirthdate(getDDMMYYYY(birthday));
    var plan = self.getPlanOption().value;


    if (plan == 1 && (age < minAgeLimit || age > maxAgeLimit)) {

        proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
        for (i = 0; i < proposerBlocks.length; i++) {
            proposerBlocks[i].style.display = "none";
            document.forms['smartBachatForm']['proposer_first_name'].required = false;
            document.forms['smartBachatForm']['proposer_last_name'].required = false;
            document.forms['smartBachatForm']['proposer_dob'].required = false;
            document.forms['smartBachatForm']['proposerGender'].required = false;
        }
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else if (plan == 2 && age < 18) {
        proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
        for (i = 0; i < proposerBlocks.length; i++) {
            proposerBlocks[i].style.display = "none";
            document.forms['smartBachatForm']['proposer_first_name'].required = false;
            document.forms['smartBachatForm']['proposer_last_name'].required = false;
            document.forms['smartBachatForm']['proposer_dob'].required = false;
            document.forms['smartBachatForm']['proposerGender'].required = false;
        }
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between 18 and ${maxAgeLimit}.`;
        return false;
    } else if (plan == 1 && age >= minAgeLimit && age < 18) {
        //added proposer_Is_Same_As_Life_Assured in age less than 18 condtion and removed from above condition which is added in  (age < minAgeLimit || age > maxAgeLimit)
        proposer_Is_Same_As_Life_AssuredVar = "n";
        proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
        for (i = 0; i < proposerBlocks.length; i++) {
            proposerBlocks[i].style.display = "block";
            document.forms['smartBachatForm']['proposer_first_name'].required = true;
            document.forms['smartBachatForm']['proposer_last_name'].required = true;
            document.forms['smartBachatForm']['proposer_dob'].required = true;
            document.forms['smartBachatForm']['proposerGender'].required = true;
        }
        //document.getElementById('riderDetails').style.display = "none";
        document.getElementById('ageErrId').style.display = "none";
        return true;
    } else {
        proposer_Is_Same_As_Life_AssuredVar = "y";
        proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
        for (i = 0; i < proposerBlocks.length; i++) {
            proposerBlocks[i].style.display = "none";
            document.forms['smartBachatForm']['proposer_first_name'].required = false;
            document.forms['smartBachatForm']['proposer_last_name'].required = false;
            document.forms['smartBachatForm']['proposer_dob'].required = false;
            document.forms['smartBachatForm']['proposerGender'].required = false;
        }
        document.getElementById('ageErrId').style.display = "none";
        // age < 18 ? document.getElementById('divProposer').style.display = "block" : document.getElementById('divProposer').style.display = "none";
        return true;
    }
}

function validateSumAssured() {
    var sumAssured = this.getSumAssured();
    if (isNaN(sumAssured) || sumAssured === undefined || sumAssured === null || sumAssured === '') {
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = 'Please enter Sum Assured.';
        return false;
    } else if ((sumAssured % 1000) !== 0) {
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = 'Sum Assured should be multiple of 1000';
        return false;
    } else if (sumAssured < 100000) {
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = `Sum Assured should not be less than 1,00,000.`;
        return false;
    } else {
        document.getElementById('sumAssuredErrId').style.display = 'none';
        return true;
    }
}

//Added on 20/06/2019 by Bharamu
function validateBackDate() {
    if (self.isWishToBackDate()) {
        if (self.getBackdate() == undefined || self.getBackdate() === "" || self.getBackdate() == null) {
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
//Added on 20/06/2019 by Bharamu
//Modified on 18/09/2019 by Tushar Kadam
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
        var back_date_fix = "01/10/2019"; //"09/01/2017";
        var back_date_fix_split = self.splitDate(back_date_fix);
        var new_back_date_fix = new Date(back_date_fix_split[2], (back_date_fix_split[1] - 1), back_date_fix_split[0])
        //document.getElementById("backDate").value = "20/06/2019";
        var splitDate = (dateMMDDYYYYFormat(document.forms["smartBachatForm"]["backDate"].value)).split("-");
        console.log(splitDate);
        var newBackDate = new Date(splitDate[2], (splitDate[0] - 1), splitDate[1])
        console.log(newBackDate);
        if (currMonth >= 4) {
            finYerEndDate = "01/04/" + currYear;
        } else {
            finYerEndDate = "01/04/" + (currYear - 1);
        }
        var finYerEndDate_split = self.splitDate(finYerEndDate);
        var newFinYerEndDate = new Date(finYerEndDate_split[2], (finYerEndDate_split[1] - 1), finYerEndDate_split[0])
        if (new_back_date_fix.getTime() >= newBackDate.getTime()) {
            document.getElementById('backDateErrorId').style.display = 'block';
            document.getElementById('backDateErrorId').innerHTML = "Please enter backdation date after " + back_date_fix;
            return false;
        } else if (today.getTime() < newBackDate.getTime()) {
            document.getElementById('backDateErrorId').style.display = 'block';
            document.getElementById('backDateErrorId').innerHTML = "Please enter backdation date between " + finYerEndDate + " and " + todayDate;
            return false;
        } else if (newBackDate.getTime() < newFinYerEndDate.getTime()) {
            document.getElementById('backDateErrorId').style.display = 'block';
            document.getElementById('backDateErrorId').innerHTML = "Please enter Backdation date between " + finYerEndDate + " and " + todayDate;
            return false;
        } else {
            document.getElementById('backDateErrorId').style.display = 'none';
            return true;
        }
    } else {
        return true;
    }
}


function validateMaturityAge() {
    if ((this.getCalculatedAge() + this.getPolicyTerm()) > 65) {
        document.getElementById('maturityAgeErrId').style.display = 'block';
        document.getElementById('maturityAgeErrId').innerHTML = 'Maturity age should not be more than 65.';
        return false;
    } else {
        document.getElementById('maturityAgeErrId').style.display = 'none';
        return true;
    }
}

/* ***********************   GETTERS ************************* */
function getLifeAssuredTitle() {
    return document.forms["smartBachatForm"]["lifeAssuredTitle"].value;
}

function fName() {
    return document.forms["smartBachatForm"]["first_name"].value;
}

function MName() {
    return document.forms["smartBachatForm"]["middle_name"].value;
}

function LName() {
    return document.forms["smartBachatForm"]["last_name"].value;
}

function getProposerTitle() {
    return document.forms["smartBachatForm"]["ProposerTitle"].value;
}

function proposerFName() {
    return document.forms["smartBachatForm"]["proposer_first_name"].value;
}

function proposerMName() {
    return document.forms["smartBachatForm"]["proposer_middle_name"].value;
}

function proposerLName() {
    return document.forms["smartBachatForm"]["proposer_last_name"].value;
}

function getProposerGender() {
    return document.forms["smartBachatForm"]["proposerGender"].value;
}

function getCalculatedAge() {
    return parseInt(document.forms["smartBachatForm"]["age"].value, 10);
}

function getCalculateProposerdAge() {
    return parseInt(document.forms["smartBachatForm"]["proposer_age"].value, 10);
}

function getEmail() {
    return document.forms["smartBachatForm"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["smartBachatForm"]["confirmEmail"].value;
}

function getDOB() {
    return document.forms["smartBachatForm"]["dob"].value;
}

function getProposerDob() {
    return document.forms["smartBachatForm"]["proposer_dob"].value;
}

function getMobileNo() {
    return document.forms["smartBachatForm"]["mobile"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["smartBachatForm"]["policyTerm"].value, 10);
}

function getPlanOption() {
    var index = document.forms["smartBachatForm"]["plan"].value;
    return planOptionList[index - 1];
}

function getPremiumpayingTerm() {

    return parseInt(document.forms["smartBachatForm"]["premiumPayingTerm"].value);
    /*   var index = document.forms["smartBachatForm"]["premiumPayingTerm"].value;
      return premiumPayingTerm[index - 1]; */
}

function getPremiumFrequency() {
    var index = document.forms["smartBachatForm"]["premiumFrequency"].value;
    return premiumPaymentModeList[index - 1].title;
}

function getSumAssured() {
    var sumAssured = parseInt(document.forms["smartBachatForm"]["sumAssured"].value, 10)
    if (isNaN(sumAssured) || sumAssured === undefined || sumAssured === null || sumAssured === '') {
        return 0;
    }
    return sumAssured;
}

function getADTPDBenefit() {
    return parseInt(document.forms["smartBachatForm"]["atpdbSumAssured"].value, 10);
}

function getGender() {
    return document.forms["smartBachatForm"]["gender"].value;
}

function isWishToBackDate() {
    var isBackDate = document.forms["smartBachatForm"]["wishToBackdate"].value;
    if (isBackDate === "yes") {
        return true;
    } else {
        return false;
    }
}

function getBackdate() {
    var backdate = document.forms["smartBachatForm"]["backDate"].value;
    if (isEmpty(backdate)) {
        return "";
    } else {
        return dateMMDDYYYYFormat(backdate);
    }
}

function getIsStaff() {
    return document.forms["smartBachatForm"]["staff_discount"].checked;
}

/* ******************************  FORM VALIDATION & SUBMIT **************************** */
function validatForm() {

    if (smartBachatForm.checkValidity() && this.calculateAge(self.getDOB()) &&
        this.validateGender("") && this.validateConfirmEmail() &&
        calculateProposerAge(self.getProposerDob()) &&
        this.validateMobileNo(self.getMobileNo()) &&
        this.validateSumAssured() && this.validateBackDate() && self.trueBackdate() &&
        this.validateMaturityAge()) {
        console.log(smartBachatForm.checkValidity());
        this.calculatePremiumAPICall(); // form valid
    } else {
        //alert('validation error')
    }
}

function valDob() {
}

function calculatePremiumAPICall() {

    /*  var xmlhttp = new XMLHttpRequest();
     xmlhttp.open('POST', serviceURL + '/getPremiumSmartBachat', true); */

    let xmlBodyParam = ` <getPremiumSmartBachat xmlns="http://tempuri.org/">
    <isStaff>${self.getIsStaff()}</isStaff>
    <isJKResident>false</isJKResident>
    <age>${self.getCalculatedAge() < 18 ? this.getCalculateProposerdAge() : this.getCalculatedAge()}</age>
    <gender>${self.getGender()}</gender>
    <policyTerm>${self.getPolicyTerm()}</policyTerm>
    <premPayingTerm>${self.getPremiumpayingTerm()}</premPayingTerm>
    <premFreq>${self.getPremiumFrequency()}</premFreq>
    <sumAssured>${self.getSumAssured()}</sumAssured>
    <plan>${self.getPlanOption().title.replace(/&/g, "&amp;")}</plan>
    <adtpdval>${self.getADTPDBenefit()}</adtpdval>
    <IsBackdate>${self.isWishToBackDate()}</IsBackdate>
    <Backdate>${(self.isWishToBackDate() ?self.getBackdate():"")}</Backdate>
    <IsMines>false</IsMines>
    <KFC>${getKerlaDiscount()}</KFC>
    <laAge>${getCalculatedAge()}</laAge>
  </getPremiumSmartBachat>`;

    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        ${xmlBodyParam}
                    </soap:Body>
                </soap:Envelope>`;

    console.log(body);
    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {
        let staffDiscount = "";
        // console.log("BACK DATING---" + self.getWishToBackdate());
        if (self.getIsStaff()) {
            staffDiscount = "Yes";
        } else {
            staffDiscount = "No";
        }

        let backDating = "";
        if (self.isWishToBackDate()) {
            backDating = "y";
        } else {
            backDating = "n";
        }

        let planCode = '';
        if (self.getPlanOption().title === "Option A (Endowment Option)") {
            planCode = "2DSBPA";
        } else if (self.getPlanOption().title === "Option B (Endowment Option with in-built Accidental Death and Total Permanent Disability (AD&TPD) Benefit)") {
            planCode = "2DSBPB";
        }

        let forminputbyuser = "";
        //passing forminputbyuser values to create pdf based on age condition
        if (self.getCalculatedAge() < 18) {
            forminputbyuser = {
                lifeAssured: self.getLifeAssuredTitle() + " " + self.fName() + " " + self.MName() + " " + self.LName(),
                proposerName: self.getProposerTitle() + " " + self.proposerFName() + " " + self.proposerMName() + " " + self.proposerLName(),
                age: self.getCalculatedAge(),
                gender: self.getGender(),
                premiumFrequency: self.getPremiumFrequency(),
                premiumPayingTerm: self.getPremiumpayingTerm(),
                planOption: self.getPlanOption().title,
                policyTerm: self.getPolicyTerm(),
                sumAssured: self.getSumAssured(),
                quotationNumber: quotNumber,
                staffDiscount: staffDiscount,
                backDating: backDating,
                PlanName: self.productDetails.title,
                CustTitle: self.getLifeAssuredTitle(),
                CustFirstName: self.fName(),
                CustMiddleName: self.MName(),
                CustLastName: self.LName(),
                CustMobile: self.getMobileNo(),
                CustEmailID: self.getEmail(),
                LaDOB: getDDMMYYYY(self.getDOB()),
                ProposerDOB: self.getCalculatedAge() < 18 ? getDDMMYYYY(self.getProposerDob()) : getDDMMYYYY(self.getDOB()),
                BasicSA: self.getSumAssured(),
                TotalPremAmt: '',
                Frequency: self.getPremiumFrequency(),
                PolicyTerm: self.getPolicyTerm(),
                PremPayingTerm: '0',
                PlanCode: planCode,
                KFC: getKerlaDiscount() ? "Y" : "N",
                proposer_Is_Same_As_Life_Assured: proposer_Is_Same_As_Life_AssuredVar,
                proposer_age: this.getCalculateProposerdAge(),
                proposer_gender: this.getProposerGender(),
                userType: getUserType()
            };
        } else {
            forminputbyuser = {
                lifeAssured: self.getLifeAssuredTitle() + " " + self.fName() + " " + self.MName() + " " + self.LName(),
                proposerName: self.getLifeAssuredTitle() + " " + self.fName() + " " + self.MName() + " " + self.LName(),
                age: self.getCalculatedAge(),
                gender: self.getGender(),
                premiumFrequency: self.getPremiumFrequency(),
                premiumPayingTerm: self.getPremiumpayingTerm(),
                planOption: self.getPlanOption().title,
                policyTerm: self.getPolicyTerm(),
                sumAssured: self.getSumAssured(),
                quotationNumber: quotNumber,
                staffDiscount: staffDiscount,
                backDating: backDating,
                PlanName: self.productDetails.title,
                CustTitle: self.getLifeAssuredTitle(),
                CustFirstName: self.fName(),
                CustMiddleName: self.MName(),
                CustLastName: self.LName(),
                CustMobile: self.getMobileNo(),
                CustEmailID: self.getEmail(),
                LaDOB: getDDMMYYYY(self.getDOB()),
                ProposerDOB: self.getCalculatedAge() < 18 ? getDDMMYYYY(self.getProposerDob()) : getDDMMYYYY(self.getDOB()),
                BasicSA: self.getSumAssured(),
                TotalPremAmt: '',
                Frequency: self.getPremiumFrequency(),
                PolicyTerm: self.getPolicyTerm(),
                PremPayingTerm: '0',
                PlanCode: planCode,
                KFC: getKerlaDiscount() ? "Y" : "N",
                proposer_Is_Same_As_Life_Assured: proposer_Is_Same_As_Life_AssuredVar,
                proposer_age: this.getCalculateProposerdAge(),
                proposer_gender: this.getProposerGender(),
                userType: getUserType()
            };
        }
        if (self.getPlanOption().value == 2) {
            forminputbyuser.ATPDBRiderSumAssured = self.getADTPDBenefit();
        } else {
            forminputbyuser.ATPDBRiderSumAssured = 0;
        }

        var xxml = GetInputXML(forminputbyuser);
        console.log(xxml);
        self.showLoader();
        // callServiceHits('getPremiumSmartBachat', '', '', userID,
        //         userMail, userMobile, userAuth)
        //     .then((resolve) => {
        //         console.log(resolve);
        //     }).catch((reject) => {
        //         console.log(reject);
        //     });
        ApiCallService('/getPremiumSmartBachat', body, '<SmartBachat>', '</SmartBachat>').then((data) => {
            self.hideLoader();
            data = data.SmartBachat;
            data.productDetails = self.productDetails;
            forminputbyuser.TotalPremAmt = data.installmntPrem;
            data.inputPolicyTerm = getPolicyTerm();
            data.inputPlanSelected = getPlanOption().title;
            var stringifyJson = JSON.stringify(data);

            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</surNonGuar8pa${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</surNonGuar8pa${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                var index = forminputbyuser.PolicyTerm;
                var matNonGuar4pa = parseXmlTag(premiumCalcXMLResponse, "matNonGuar4pa" + index + "");
                var matNonGuar8pa = parseXmlTag(premiumCalcXMLResponse, "matNonGuar8pa" + index + "");
                var matNonGuar = '';
                matNonGuar = "<matNonGuar4pa" + index + ">" + matNonGuar4pa + "</matNonGuar4pa" + index + ">";
                matNonGuar += "<matNonGuar8pa" + index + ">" + matNonGuar8pa + "</matNonGuar8pa" + index + ">";
                remaningOutput = remaningOutput + matNonGuar + "</SmartBachat>";
                let escapedBIOutput = escapeInputHTML(`<?xml version='1.0' encoding='utf-8' ?>` + remaningOutput);
                sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.
                let escapedBIInput = escapeInputHTML(xxml);
                sessionStorage.setItem("BIInput", escapedBIInput);
            }

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
                    window.location.href = "./../../PremiumCalSuccess/success.html";
                }
            }
            // console.log(stringifyJson);
            // window.location.href = "./../../PremiumCalculatorSuccess/success.html?data=" + stringifyJson;
        }).catch((error) => {
            console.log(" in error ", error);
            self.hideLoader();
        });
    }).catch((message) => {
        console.log(message)
        alert("Unable to generate quotation number");
        hideLoader();
    });
}

function GetInputXML(forminputbyuser) {
    var inputVal = "";
    inputVal += `<?xml version='1.0' encoding='utf-8' ?><smartbachat>`;
    inputVal += `<LifeAssured_title>${self.getLifeAssuredTitle()}</LifeAssured_title>`;
    inputVal += `<LifeAssured_firstName>${self.fName()}</LifeAssured_firstName>`;
    inputVal += `<LifeAssured_middleName>${self.MName()}</LifeAssured_middleName>`;
    inputVal += `<LifeAssured_lastName>${self.LName()}</LifeAssured_lastName>`;
    inputVal += `<LifeAssured_DOB>${getDDMMYYYY(self.getDOB())}</LifeAssured_DOB>`;
    inputVal += `<LifeAssured_age>${self.getCalculatedAge()}</LifeAssured_age>`;
    inputVal += `<gender>${self.getGender()}</gender>`;

    inputVal += `<proposer_title>${self.getCalculatedAge() < 18 ? self.getProposerTitle() : ''}</proposer_title>`;
    inputVal += `<proposer_firstName>${self.getCalculatedAge() < 18 ? self.proposerFName() : ''}</proposer_firstName>`;
    inputVal += `<proposer_middleName>${self.getCalculatedAge() < 18 ? self.proposerMName() : ''}</proposer_middleName>`;
    inputVal += `<proposer_lastName>${self.getCalculatedAge() < 18 ? self.proposerLName() : ''}</proposer_lastName>`;
    inputVal += `<proposer_DOB>${self.getCalculatedAge() < 18 ? self.getProposerDob() : ''}</proposer_DOB>`;
    inputVal += `<proposer_age>${self.getCalculatedAge() < 18 ? self.getCalculateProposerdAge() : ''}</proposer_age>`;
    inputVal += `<proposer_gender>${self.getCalculatedAge() < 18 ? self.getProposerGender() : ''}</proposer_gender>`;

    inputVal += `<product_name>${product_name}</product_name>`;
    /* parivartan changes */
    inputVal += `<product_Code>${product_Code}</product_Code>`;
    inputVal += `<product_UIN>${product_UIN}</product_UIN>`;
    inputVal += `<product_cateogory>${product_cateogory}</product_cateogory>`;
    inputVal += `<product_type>${product_type}</product_type>`;
    /* end */
    inputVal += `<proposer_Is_Same_As_Life_Assured>${proposer_Is_Same_As_Life_AssuredVar}</proposer_Is_Same_As_Life_Assured>`;
    inputVal += `<isStaff>${self.getIsStaff()}</isStaff>`;
    inputVal += `<isJKResident>false</isJKResident>`;
    inputVal += `<age>${self.getCalculatedAge()}</age>`;

    inputVal += `<policyTerm>${self.getPolicyTerm()}</policyTerm>`;
    inputVal += `<premPayTerm>${self.getPremiumpayingTerm()}</premPayTerm>`;
    inputVal += `<premFreq>${self.getPremiumFrequency()}</premFreq>`;
    inputVal += `<sumAssured>${self.getSumAssured()}</sumAssured>`;
    inputVal += `<plan>${self.getPlanOption().title}</plan>`;
    inputVal += `<adtpdbenfits>${self.getADTPDBenefit()}</adtpdbenfits>`;

    inputVal += `<Product_Cat></Product_Cat>`;
    inputVal += `<Wish_to_backdate_policy>${self.isWishToBackDate() ? "y" : "n"}</Wish_to_backdate_policy>`;
    inputVal += `<backdating_Date>${self.isWishToBackDate() ? convertDateDdmmyyyy(self.getBackdate()) :""}</backdating_Date>`;
    inputVal += `<KFC>${forminputbyuser.KFC}</KFC>`;
    inputVal += `</smartbachat>`;
    return inputVal;
}

function convertDateDdmmyyyy(date) {
    if (date == "" || date.length == 0 || date == undefined) {
        return '';
    }
    if (date.includes('-'))
        arrDate = date.split("-");
    if (date.includes('/'))
        arrDate = date.split("/");
    return arrDate[1] + "-" + arrDate[0] + "-" + arrDate[2];
}
function splitDate(date) {
    return date.split("/");
}
function validateConfirmEmail() {
    var email = document.forms["smartBachatForm"]["email"].value;
    var cEmail = document.forms["smartBachatForm"]["confirmEmail"].value;
    if (email != "" && email != undefined) {
        if (email != cEmail) {
            document.getElementById("confirmEmailErrId").style.display = "block";
            document.getElementById("confirmEmailErrId").innerHTML = "Both email and confirm email should be same";
            return false;
        }
    }
    document.getElementById("confirmEmailErrId").style.display = "none";
    return true;
}
function validateGender(formElementName) {
    var laGender = document.forms["smartBachatForm"]["gender"].value;
    var proposerGender = document.forms["smartBachatForm"]["proposerGender"].value;
    console.log("laGender", laGender)
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
        var age = this.getAgeFromBirthdate(getDDMMYYYY(self.getDOB()));
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
function calculateMyAge() {
    if (!isEmpty(self.getDOB())) {
        var age = self.getDOB();
        console.log("age=", age)
        if (age == "" || age == undefined) {
            document.forms["smartBachatForm"]["backDate"].value = "";
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
            document.forms["smartBachatForm"]["age"].value = age;
        }
    } else {
        alert("Please select a LifeAssured DOB First");
        document.forms['smartBachatForm']['backDate'].value = "";
    }
}
