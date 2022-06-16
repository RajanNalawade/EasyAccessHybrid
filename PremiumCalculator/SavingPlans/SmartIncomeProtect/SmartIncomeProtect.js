window.onload = function () {

    this.ready();

};



/* *************  VARIABLE DECLARATION ************** */

var productDetails;
var proposer_Is_Same_As_Life_Assured = "y";

/* ************* PAGE ONLOAD FUNCTIONS ************** */

function ready() {
    setKerlaDiscount();
    this.hideErrMsg();

    this.initArrayList();
    proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
    for (i = 0; i < proposerBlocks.length; i++) {
        proposerBlocks[i].style.display = "none";
    }

    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");

    // console.log("productDetails =  " + productDetails.title)

    this.initializeData()
    var laGender = document.forms["smartIncomeProtectForm"]["gender"].value;
    if (laGender === "Male") {
        $("#male_label").css({
            "background": "url('../../../Assets/images/male_active.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
        $("#female_label").css({
            "background": "url('../../../Assets/images/female.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
    } else if (laGender === "Female") {
        $("#female_label").css({
            "background": "url('../../../Assets/images/female_active.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover",
            "margin-right": "20px"
        });
        $("#male_label").css({
            "background": "url('../../../Assets/images/male.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
    }
    showBackdatedPolicy((isBackdatePolicyActive() ? 'yes' : "no"));
    showPTRFileds((this.isPTRiderActive() ? "yes" : "no"));
    showADBRiderFileds((this.isADBRiderActive() ? "yes" : "no"));
    showATPDBRiderFileds((this.isATPDBRiderActive() ? "yes" : "no"));
    showLinkedRiderFileds((this.isLinkedRiderActive() ? "yes" : "no"));
};

function hideErrMsg() {

    document.getElementById('confirmEmailErrId').style.display = "none";

    document.getElementById('ageErrId').style.display = "none";

    document.getElementById('mobileNoErrId').style.display = "block";

}

function initializeData() {

    //document.forms["smartIncomeProtectForm"]["LAdob"].value = (new Date()).toISOString().substr(0, 10);
    //document.forms["smartIncomeProtectForm"]["proposer_dob"].value = (new Date()).toISOString().substr(0, 10);

    this.document.getElementById('productNameId').innerHTML = this.productDetails.title

    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;

    self.setPolicyTermToTermRiders(self.getPolicyTerm());
}

function initArrayList() {
    policyListElement = document.forms["smartIncomeProtectForm"]["policyTerm"];
    for (i = 0; i < policyTermList.length; i++) {
        policyListElement.add(new Option(policyTermList[i].title, policyTermList[i].value));
    }

    premiumFreqModeListElement = document.forms["smartIncomeProtectForm"]["premiumFrequencyMode"];
    for (i = 0; i < premiumPaymentModeList.length; i++) {
        premiumFreqModeListElement.add(new Option(premiumPaymentModeList[i].title, premiumPaymentModeList[i].value));
    }
}

/********************* show and hide elements**********/

function showBackdatedPolicy(value) {

    if (value == "yes") {

        document.getElementById("backdatingDateDivId").style.display = "block";
        document.forms["smartIncomeProtectForm"]["backDate"].required = true;

    } else {

        document.getElementById("backdatingDateDivId").style.display = "none";
        document.forms["smartIncomeProtectForm"]["backDate"].required = false;

    }

}

function showPTRFileds(value) {

    if (value == "yes") {

        document.getElementById("TrmRidrDiv").style.display = "block";
        // document.forms["smartIncomeProtectForm"]["smartIncomeProtectPTRSum"].required = true;

    } else {

        document.getElementById("TrmRidrDiv").style.display = "none";
        // document.forms["smartIncomeProtectForm"]["smartIncomeProtectPTRSum"].required = false;

    }

}

function showADBRiderFileds(value) {

    if (value == "yes") {

        document.getElementById("AbdRidrDiv").style.display = "block";
        // document.forms["smartIncomeProtectForm"]["incomeProtectADBRiderSumAssured"].required = true;

    } else {

        document.getElementById("AbdRidrDiv").style.display = "none";
        // document.forms["smartIncomeProtectForm"]["incomeProtectADBRiderSumAssured"].required = false;

    }

}

function showATPDBRiderFileds(value) {

    if (value == "yes") {

        document.getElementById("ATPDBRiderDiv").style.display = "block";
        // document.forms["smartIncomeProtectForm"]["incomeProtectATPDBRiderSumAssured"].required = true;

    } else {

        document.getElementById("ATPDBRiderDiv").style.display = "none";
        // document.forms["smartIncomeProtectForm"]["incomeProtectATPDBRiderSumAssured"].required = false;

    }

}

function showLinkedRiderFileds(value) {

    if (value == "yes") {

        document.getElementById("CC13NonLinkedRiderDiv").style.display = "block";
        // document.forms["smartIncomeProtectForm"]["incomeProtectLinkRiderSumAssured"].required = true;

    } else {

        document.getElementById("CC13NonLinkedRiderDiv").style.display = "none";
        // document.forms["smartIncomeProtectForm"]["incomeProtectLinkRiderSumAssured"].required = false;

    }

}

/******************************************************/

/************************set dynamic values************/

function setPolicyTermToTermRiders(value) {
    document.forms["smartIncomeProtectForm"]["smartIncomeProtectPTRTerm"].disabled = true;
    document.forms["smartIncomeProtectForm"]["incomeProtectADBRiderTerm"].disabled = true;
    document.forms["smartIncomeProtectForm"]["incomeProtectATPDBRiderTerm"].disabled = true;
    document.forms["smartIncomeProtectForm"]["incomeProtectLinkRiderTerm"].disabled = true;

    if (value == 7) {
        document.forms["smartIncomeProtectForm"]["smartIncomeProtectPTRTerm"].value = value;
        document.forms["smartIncomeProtectForm"]["incomeProtectADBRiderTerm"].value = value;
        document.forms["smartIncomeProtectForm"]["incomeProtectATPDBRiderTerm"].value = value;
        document.forms["smartIncomeProtectForm"]["incomeProtectLinkRiderTerm"].value = value;
    } else if (value == 12) {
        document.forms["smartIncomeProtectForm"]["smartIncomeProtectPTRTerm"].value = value;
        document.forms["smartIncomeProtectForm"]["incomeProtectADBRiderTerm"].value = value;
        document.forms["smartIncomeProtectForm"]["incomeProtectATPDBRiderTerm"].value = value;
        document.forms["smartIncomeProtectForm"]["incomeProtectLinkRiderTerm"].value = value;
    } else if (value == 15) {
        document.forms["smartIncomeProtectForm"]["smartIncomeProtectPTRTerm"].value = value;
        document.forms["smartIncomeProtectForm"]["incomeProtectADBRiderTerm"].value = value;
        document.forms["smartIncomeProtectForm"]["incomeProtectATPDBRiderTerm"].value = value;
        document.forms["smartIncomeProtectForm"]["incomeProtectLinkRiderTerm"].value = value;
    }

}

/******************************************************/

/**********************DOM Events**********************/


function calculateAge(birthday) {

    var age = getAgeFromBirthdate(getDDMMYYYY(birthday));
    //console.log(age)

    document.forms["smartIncomeProtectForm"]["LAage"].value = age;

}

function calculateProposerAge(value) {
    var propAge = getAgeFromBirthdate(getDDMMYYYY(value));
    // console.log(propAge)

    document.forms["smartIncomeProtectForm"]["proposer_age"].value = propAge;

    if (propAge < 18) {
        document.getElementById("proposerAgeErrId").innerHTML = "Proposer Age cannot be less than 18"
        document.getElementById("proposerAgeErrId").style.display = "block";
    } else {
        document.getElementById("proposerAgeErrId").style.display = "none";
    }
}

function onAgeAndPolicyTermUpdate() {
    validateRequiredAge();
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

function validateBackdatingDate() {

    if (isBackdatePolicyActive()) {

        if (isEmpty(getPolicyBackDate())) {

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

function trueBackdate() {
    if (self.isBackdatePolicyActive()) {
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
        var backDate_split = self.getPolicyBackDate().split("-");
        var newBackDate = new Date(backDate_split[2], (backDate_split[0] - 1), backDate_split[1])

        if (currMonth >= 4) {
            finYerEndDate = "01-04-" + currYear;
        } else {
            finYerEndDate = "01-04-" + (currYear - 1);
        }

        var finYerEndDate_split = finYerEndDate.split("-");
        var newFinYerEndDate = new Date(finYerEndDate_split[2], (finYerEndDate_split[1] - 1), finYerEndDate_split[0])

        // if(new_back_date_fix.getTime() >= newBackDate.getTime()){
        //     document.getElementById('backDateErrorId').style.display = 'block';
        //     document.getElementById('backDateErrorId').innerHTML ="Please enter backdation date after "+back_date_fix;
        //     return false;
        // }else 
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

function validateSA() {
    var maxRiderLimit;

    // Basic

    if (getSumAssured() == "" || getSumAssured() < minSA) {

        document.getElementById("sumAssuredErrId").style.display = "block";

        document.getElementById("sumAssuredErrId").innerHTML = "Sum assured should be greater than or equal " + new Intl.NumberFormat('en-IN').format(minSA);

        return false;

    } else if (getSumAssured() % 1000 != 0) {

        document.getElementById("sumAssuredErrId").style.display = "block";

        document.getElementById("sumAssuredErrId").innerHTML = "Sum assured should be multiple of 1,000";

        return false;

    } else {

        // PTA

        if (isPTRiderActive()) {

            maxRiderLimit = Math.min(5000000, getSumAssured());

            if (getPTRSumAssured() == "" || getPTRSumAssured() < minRiderLimit || getPTRSumAssured() > maxRiderLimit) {

                document.getElementById("ptrSumAssuredErrorId").style.display = "block";

                document.getElementById("ptrSumAssuredErrorId").innerHTML = "Enter Sum assured for Preferred Term Assurance Rider between " + new Intl.NumberFormat('en-IN').format(minRiderLimit) + " and " + new Intl.NumberFormat('en-IN').format(maxRiderLimit);

                return false;

            } else if (getPTRSumAssured() % 1000 != 0) {

                document.getElementById("ptrSumAssuredErrorId").style.display = "block";

                document.getElementById("ptrSumAssuredErrorId").innerHTML = "Enter Sum assured for Preferred Term Assurance Rider in multiples of 1,000";

                return false;

            } else {
                document.getElementById("ptrSumAssuredErrorId").style.display = "none";
            }

        }

        // ADB
        console.log("isADBRiderActive ", isADBRiderActive());

        if (isADBRiderActive()) {

            maxRiderLimit = Math.min(5000000, getSumAssured()); //adnSumAssuredErrorId

            if (getADBRiderSumAssured() == "" || getADBRiderSumAssured() < minRiderLimit || getADBRiderSumAssured() > maxRiderLimit) {

                document.getElementById("adbSumAssuredErrorId").style.display = "block";

                document.getElementById("adbSumAssuredErrorId").innerHTML = "Enter Sum assured for Accidental Death Benefit Rider between " + new Intl.NumberFormat('en-IN').format(minRiderLimit) + " and " + new Intl.NumberFormat('en-IN').format(maxRiderLimit);

                return false;

            } else if (getADBRiderSumAssured() % 1000 != 0) {

                document.getElementById("adbSumAssuredErrorId").style.display = "block";

                document.getElementById("adbSumAssuredErrorId").innerHTML = "Enter Sum assured for Accidental Death Benefit Rider in multiples of 1,000";

                return false;

            } else {
                document.getElementById("adbSumAssuredErrorId").style.display = "none";
            }

        }

        // ATPDB

        if (isATPDBRiderActive()) {

            maxRiderLimit = Math.min(5000000, getSumAssured());

            if (getATPDBRiderSumAssured() == "" || getATPDBRiderSumAssured() < minRiderLimit || getATPDBRiderSumAssured() > maxRiderLimit) {

                document.getElementById("atpdbSumAssuredErrorId").style.display = "block";

                document.getElementById("atpdbSumAssuredErrorId").innerHTML = "Enter Sum assured for Accidental Total and Permenent Disability Benefit Rider between " + new Intl.NumberFormat('en-IN').format(minRiderLimit) + " and " + new Intl.NumberFormat('en-IN').format(maxRiderLimit);

                return false;

            } else if (getATPDBRiderSumAssured() % 1000 != 0) {

                document.getElementById("atpdbSumAssuredErrorId").style.display = "block";

                document.getElementById("atpdbSumAssuredErrorId").innerHTML = "Enter Sum assured for Accidental Total and Permenent Disability Benefit Rider in multiples of 1,000";

                return false;

            } else {
                document.getElementById("atpdbSumAssuredErrorId").style.display = "none";
            }

        }

        // CC13Nonlinked

        if (isLinkedRiderActive()) {

            maxRiderLimit = Math.min(2000000, getSumAssured());

            if (getLinkedRiderSumAssured() == "" || getLinkedRiderSumAssured() < minRiderLimit || getLinkedRiderSumAssured() > maxRiderLimit) {

                document.getElementById("linkedSumAssuredErrorId").style.display = "block";

                document.getElementById("linkedSumAssuredErrorId").innerHTML = "Enter Sum assured for CC13 Nonlinked Rider between " + new Intl.NumberFormat('en-IN').format(minRiderLimit) + " and " + new Intl.NumberFormat('en-IN').format(maxRiderLimit);

                return false;

            } else if (getLinkedRiderSumAssured() % 1000 != 0) {

                document.getElementById("linkedSumAssuredErrorId").style.display = "block";

                document.getElementById("linkedSumAssuredErrorId").innerHTML = "Enter Sum assured for CC13 Nonlinked Rider in multiples of 1,000";

                return false;

            } else {
                document.getElementById("linkedSumAssuredErrorId").style.display = "none";
            }

        }

    }

    document.getElementById("sumAssuredErrId").style.display = "none";

    document.getElementById("ptrSumAssuredErrorId").style.display = "none";

    document.getElementById("adbSumAssuredErrorId").style.display = "none";

    document.getElementById("atpdbSumAssuredErrorId").style.display = "none";

    document.getElementById("linkedSumAssuredErrorId").style.display = "none";

    return true;

}

function validateRequiredAge() {

    var ageRequired = this.getAgeAllowed(this.getPolicyTerm());
    //console.log(ageRequired)
    var age = getAgeFromBirthdate(getDDMMYYYY(self.getDob()));
    //console.log(age)
    if (age < ageRequired.minAgeAllowed || age > ageRequired.maxAgeAllowed) {

        document.getElementById("ageErrId").style.display = "block";
        proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
        for (i = 0; i < proposerBlocks.length; i++) {
            proposerBlocks[i].style.display = "none";
            document.forms['smartIncomeProtectForm']['proposer_first_name'].required = false;
            document.forms['smartIncomeProtectForm']['proposer_last_name'].required = false;
            document.forms['smartIncomeProtectForm']['proposer_dob'].required = false;
            document.forms['smartIncomeProtectForm']['proposerGender'].required = false;
        }
        document.getElementById("ageErrId").innerHTML = "Min Age limit is " + ageRequired.minAgeAllowed + " years and Max Age limit is " + ageRequired.maxAgeAllowed + " years";
        return false;

    } else if (age >= ageRequired.minAgeAllowed && age < 18) {
        proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
        proposer_Is_Same_As_Life_Assured = "n";
        for (i = 0; i < proposerBlocks.length; i++) {
            proposerBlocks[i].style.display = "block";
            document.forms['smartIncomeProtectForm']['proposer_first_name'].required = true;
            document.forms['smartIncomeProtectForm']['proposer_last_name'].required = true;
            document.forms['smartIncomeProtectForm']['proposer_dob'].required = true;
            document.forms['smartIncomeProtectForm']['proposerGender'].required = true;
        }
        document.getElementById('riderDetails').style.display = "none";
        document.getElementById('ageErrId').style.display = "none";
        setToDefaultValues();
        return true;
    } else {
        document.getElementById('riderDetails').style.display = "block";
        proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
        proposer_Is_Same_As_Life_Assured = "y";
        for (i = 0; i < proposerBlocks.length; i++) {
            proposerBlocks[i].style.display = "none";
            document.forms['smartIncomeProtectForm']['proposer_first_name'].required = false;
            document.forms['smartIncomeProtectForm']['proposer_last_name'].required = false;
            document.forms['smartIncomeProtectForm']['proposer_dob'].required = false;
            document.forms['smartIncomeProtectForm']['proposerGender'].required = false;
        }
        document.getElementById('ageErrId').style.display = "none";
        return true;

    }

    return true;

}

function validateMaturityAge() {

    if ((getIncomeProtectAge() + getPolicyTerm()) < 18 || (getIncomeProtectAge() + getPolicyTerm()) > 65) {

        document.getElementById("policyTermErrId").style.display = "block";

        document.getElementById("policyTermErrId").innerHTML = "Please Enter Maturity Age between 18 years and 65 years";

        return false;

    }

    document.getElementById("policyTermErrId").style.display = "none";

    return true;

}

function validateTermRider() {

    // System.out.println("Inside val Term Rider");

    var term = this.getPolicyTerm();

    var age = getIncomeProtectAge();



    if (age < 18 || age > 58 || (age + term) > 65) {

        // PTA

        if (this.isPTRiderActive()) {

            document.getElementById("PrfrdTrmRidrYes").checked = false;
            document.getElementById("PrfrdTrmRidrNo").checked = true;

            document.getElementById("ptrSumAssuredErrorId").style.display = "block";

            document.getElementById("ptrSumAssuredErrorId").innerHTML = "Min age limit for Preferred Term Assurance Rider is 18 to " + (65 - term) + " and maturity age is 65.";

            return false;

        }

        // ADB

        if (this.isADBRiderActive()) {

            document.getElementById("adbRiderYes").checked = false;
            document.getElementById("adbRiderNo").checked = true;



            document.getElementById("adbSumAssuredErrorId").style.display = "block";

            document.getElementById("adbSumAssuredErrorId").innerHTML = "Min age limit for Accidental Death Benefit Rider is 18 to " + (65 - term) + " and maturity age is 65.";

            return false;

        }

        // ATPDB

        if (this.isATPDBRiderActive()) {

            document.getElementById("atpdbRiderYes").checked = false;
            document.getElementById("atpdbRiderNo").checked = true;
            document.getElementById("atpdbSumAssuredErrorId").style.display = "block";

            document.getElementById("atpdbSumAssuredErrorId").innerHTML = "Min age limit for Accidental Total & Permanent Disability Rider is 18 to " + (65 - term) + " and maturity age is 65.";
            return false;
        }



    }

    // Modified by Priyanka Warekar - 31-12-2014

    // CC13NonLinked

    // if(age<18 || age>55 || (age+term)>64 )

    if (this.isLinkedRiderActive()) {

        if (this.getPolicyTerm() == 7 && (age < 18 || (age + term) > 62)) {

            document.getElementById("cc13NonLinkedRiderYes").checked = false;
            document.getElementById("cc13NonLinkedRiderNo").checked = true;

            document.getElementById("linkedSumAssuredErrorId").style.display = "block";

            document.getElementById("linkedSumAssuredErrorId").innerHTML = "Age limit for Criti Care 13 Non - Linked Rider is 18 to " + (62 - term);

            return false;

        } else {

            if ((age < 18 || (age + term) > 64)) {

                document.getElementById("cc13NonLinkedRiderYes").checked = false;
                document.getElementById("cc13NonLinkedRiderNo").checked = true;

                document.getElementById("linkedSumAssuredErrorId").style.display = "block";

                document.getElementById("linkedSumAssuredErrorId").innerHTML = "Age limit for Criti Care 13 Non - Linked Rider is 18 to " + (64 - term);

                return false;

            }

        }

    }

    document.getElementById("ptrSumAssuredErrorId").style.display = "none";

    document.getElementById("adbSumAssuredErrorId").style.display = "none";

    document.getElementById("atpdbSumAssuredErrorId").style.display = "none";

    document.getElementById("linkedSumAssuredErrorId").style.display = "none";

    return true;

}

function sumAssured(value) {

    if (isNaN(value) || value === undefined || value === null || value === '') {
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = 'Please enter Sum Assured.';
        return false;
    } else if ((value % 1000) !== 0) {
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = 'Sum Assured should be multiple of 1000';
        return false;
    } else if (value < 100000) {
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = `Sum Assured should not be less than 1,00,000.`;
        return false;
    } else {
        document.getElementById('sumAssuredErrId').style.display = 'none';
        return true;
    }
}

function submitIncomeProtectForm() {


    if (smartIncomeProtectForm.checkValidity() && this.validateGender("") && this.validateMobileNo(getMobileNo()) &&
        this.validateConfirmEmail() && this.validateSA() && this.validateRequiredAge() &&
        this.validateMaturityAge() && this.validateTermRider() &&
        this.validateBackdatingDate() && self.trueBackdate()) {

        //alert("success");

        this.calculatePremiumAPICall();

    }

}

function calculatePremiumAPICall() {

    var isADBRider = this.isADBRiderActive();
    let xmlBodyParam = ` <getPremiumSmartIncomeProtect xmlns="http://tempuri.org/">

    <isStaff>${this.getIsStaff()}</isStaff>

    <isJKResident>false</isJKResident>

    <age>${this.getIncomeProtectAge()}</age>

    <gender>${this.getGender()}</gender>

    <policyTerm>${this.getPolicyTerm()}</policyTerm>

    <premFreq>${this.getPremiumFrq()}</premFreq>
    <maturityBenOpt>${document.getElementById('cbLumpSumpAmount').checked ? "Y" : "N" }</maturityBenOpt>
    <sumAssured>${this.getSumAssured()}</sumAssured>

    <isADBRider>${isADBRider}</isADBRider>
    <adbTerm>${(isADBRider ? this.getADBRiderTerm() : "")}</adbTerm>
    <adbSA>${(isADBRider ? this.getADBRiderSumAssured() : "")}</adbSA>
    <isATPDBRider>${this.isATPDBRiderActive()}</isATPDBRider>

    <atpdbTerm>${(this.isATPDBRiderActive() ? this.getATPDBRiderTerm() : "")}</atpdbTerm>
    <atpdbSA>${(this.isATPDBRiderActive() ? this.getATPDBRiderSumAssured() : "")}</atpdbSA>

    <isPTARider>${this.isPTRiderActive()}</isPTARider>

    <ptaTerm>${(this.isPTRiderActive() ? this.getPTRTerm() : "")}</ptaTerm>
    <ptaSA>${(this.isPTRiderActive() ? this.getPTRSumAssured() : "")}</ptaSA>

    <isCC13Rider>${this.isLinkedRiderActive()}</isCC13Rider>

    <cc13Term>${(this.isLinkedRiderActive() ? this.getLinkedRiderTerm() : "")}</cc13Term>
    <cc13SA>${(this.isLinkedRiderActive() ? this.getLinkedRiderSumAssured() : "")}</cc13SA>

    <IsBackdate>${this.isBackdatePolicyActive()}</IsBackdate>

    <Backdate>${(this.isBackdatePolicyActive() ? this.getPolicyBackDate() : "")}</Backdate>

    <IsMines>false</IsMines>
    <KFC>${getKerlaDiscount()}</KFC>

  </getPremiumSmartIncomeProtect>`;

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

    // hitPremiumCaclService('getPremiumSmartPowerInsurance', '', '', userID,userMail, userMobile, userAuth).then((data) => {

    //         console.log(data);

    //     }).catch((reject) => {

    //         console.log(reject);

    //     });
    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {

        ApiCallService('/getPremiumSmartIncomeProtect', body, '<SmartIncomeProtect>', '</SmartIncomeProtect>', true).then((data) => {

            self.hideLoader();

            data = data.SmartIncomeProtect;

            data.productDetails = self.productDetails;

            data.premiumFrequencySelectedTitle = this.getPremiumFrq();

            data.isPTARiderChecked = this.isPTRiderActive();

            data.isADBRiderChecked = this.isADBRiderActive();

            data.isATPDBRiderChecked = this.isATPDBRiderActive()

            data.isCC13NonLinkedChecked = this.isLinkedRiderActive();
            data.inputPolicyTerm = this.getPolicyTerm();

            var stringifyJson = JSON.stringify(data);


            let forminputbyuser = {
                staffDiscount: self.getIsStaff(),
                gender: self.getGender(),
                personalName: self.getFName() + " " + self.getLName(),
                ageEntry: self.getIncomeProtectAge(),
                proposerName: self.getTitle() + " " + self.getFName() + " " + self.getMName() + " " + self.getLName(),
                proposerAgeEntry: self.getIncomeProtectProposerAge(),
                proposerGender: self.getProposerGender(),
                policyTerm: self.getPolicyTerm(),
                frequency: self.getPremiumFrq(),
                sumAssured: self.getSumAssured(),
                isWishToBackDate: self.isBackdatePolicyActive(),
                backDate: self.getPolicyBackDate(),
                isPTR: self.isPTRiderActive(),
                ptrTerm: self.getPTRTerm(),
                ptrSumAssured: self.getPTRSumAssured(),
                isADBR: self.isADBRiderActive(),
                adbRiderTerm: self.getADBRiderTerm(),
                adbRiderSumAssured: self.getADBRiderSumAssured(),
                isATPDBRider: self.isATPDBRiderActive(),
                atpdbTerm: self.getATPDBRiderTerm(),
                atpdbSumAssured: self.getATPDBRiderSumAssured(),
                isCCLR: self.isLinkedRiderActive(),
                CCLRTerm: self.getLinkedRiderTerm(),
                CCLRSumAssured: self.getLinkedRiderSumAssured(),

                quotationNumber: quotNumber,
                PlanName: self.productDetails.title,
                CustTitle: self.getTitle(),
                CustFirstName: self.getFName(),
                CustMiddleName: self.getMName(),
                CustLastName: self.getLName(),
                CustMobile: self.getMobileNo(),
                CustEmailID: self.getEmail(),
                LaDOB: getDDMMYYYY(self.getDob()),
                ProposerDOB: getDDMMYYYY(self.getProposerDob()),
                BasicSA: self.getSumAssured(),
                TotalPremAmt: data.premWthST,
                Frequency: self.getPremiumFrq(),
                PolicyTerm: self.getPolicyTerm(),
                PremPayingTerm: '0',
                PlanCode: 'SIP',
                KFC: getKerlaDiscount() ? "Y" : "N",
                maturityBenOpt: document.getElementById('cbLumpSumpAmount').checked ? "Y" : "N"
            };

            if (self.getIncomeProtectAge() < 18) {
                forminputbyuser.proposerName = self.getProposerTitle() + " " + self.fName() + " " + self.MName() + " " + self.LName();
                forminputbyuser.personalName = self.getTitle() + " " + self.getFName() + " " + self.getMName() + " " + self.getLName();
            }

            let GetXML = getInputXML(forminputbyuser);
            console.log("input ", GetXML);

            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</NonGSV_surrndr_val_8Percent${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</NonGSV_surrndr_val_8Percent${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                var index = forminputbyuser.PolicyTerm;
                var nonGuaranMatBen_4Percent_tag = parseXmlTag(premiumCalcXMLResponse, "nonGuaranMatBen_4Percent" + index + "");
                var nonGuaranMatBen_8Percent_tag = parseXmlTag(premiumCalcXMLResponse, "nonGuaranMatBen_8Percent" + index + "");
                var nonGuaranMatBen = '';
                nonGuaranMatBen = "<nonGuaranMatBen_4Percent" + index + ">" + nonGuaranMatBen_4Percent_tag + "</nonGuaranMatBen_4Percent" + index + ">";
                nonGuaranMatBen += "<nonGuaranMatBen_8Percent" + index + ">" + nonGuaranMatBen_8Percent_tag + "</nonGuaranMatBen_8Percent" + index + ">";
                remaningOutput = remaningOutput + nonGuaranMatBen + "</SmartIncomeProtect>";

                let escapedBIOutput = escapeInputHTML("<?xml version='1.0' encoding='utf-8' ?>" + remaningOutput);
                sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.
            }

            if (data.errCode != undefined && data.errCode == 1) {
                alert("Something went worng. Please try again later")
            } else {
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

/**********************getter methods*******************/
function getInputXML(forminputbyuser) {
    var inputVal = "";
    inputVal += "<?xml version='1.0' encoding='utf-8' ?><smartIncomeProtectBean>";
    inputVal += `<LifeAssured_title>${self.getLifeAssuredTitle()}</LifeAssured_title>`;
    inputVal += `<LifeAssured_firstName>${self.getFName()}</LifeAssured_firstName>`;
    inputVal += `<LifeAssured_middleName>${self.getMName()}</LifeAssured_middleName>`;
    inputVal += `<LifeAssured_lastName>${self.getLName()}</LifeAssured_lastName>`;
    inputVal += `<LifeAssured_DOB>${getDDMMYYYY(self.getDob())}</LifeAssured_DOB>`;
    inputVal += `<LifeAssured_age>${self.getIncomeProtectAge()}</LifeAssured_age>`;
    inputVal += `<gender>${self.getGender()}</gender>`;

    inputVal += `<proposer_title>${self.getIncomeProtectAge() < 18 ? self.getProposerTitle() : ''}</proposer_title>`;
    inputVal += `<proposer_firstName>${self.getIncomeProtectAge() < 18 ? self.fName() : ''}</proposer_firstName>`;
    inputVal += `<proposer_middleName>${self.getIncomeProtectAge() < 18 ? self.MName() : ''}</proposer_middleName>`;
    inputVal += `<proposer_lastName>${self.getIncomeProtectAge() < 18 ? self.LName() : ''}</proposer_lastName>`;
    inputVal += `<proposer_DOB>${self.getIncomeProtectAge() < 18 ? getDDMMYYYY(self.getProposerDob()) : ''}</proposer_DOB>`;
    inputVal += `<proposer_age>${self.getIncomeProtectAge() < 18 ? self.getIncomeProtectProposerAge() : ''}</proposer_age>`;
    inputVal += `<proposer_gender>${self.getIncomeProtectAge() < 18 ? self.getProposerGender() : ''}</proposer_gender>`;

    inputVal += `<product_name>${product_name}</product_name>`;
    inputVal += `<product_Code>${product_Code}</product_Code>`;
    inputVal += `<product_UIN>${product_UIN}</product_UIN>`;
    inputVal += `<product_cateogory>${product_cateogory}</product_cateogory>`;
    inputVal += `<product_type>${product_type}</product_type>`;

    inputVal += `<proposer_Is_Same_As_Life_Assured>${proposer_Is_Same_As_Life_Assured}</proposer_Is_Same_As_Life_Assured>`;

    inputVal += `<isJKResident>false</isJKResident>`;
    inputVal += `<isStaff>${self.getIsStaff()}</isStaff>`;
    inputVal += `<isSmoker>false</isSmoker>`;
    inputVal += `<age>${self.getIncomeProtectAge()}</age>`;

    inputVal += `<policyTerm>${self.getPolicyTerm()}</policyTerm>`;
    inputVal += `<isPTRider>${self.isPTRiderActive()}</isPTRider>`;
    inputVal += `<isADBRider>${self.isADBRiderActive()}</isADBRider>`;
    inputVal += `<isATPDBRider>${self.isATPDBRiderActive()}</isATPDBRider>`;
    inputVal += `<isCC13NLRider>${self.isLinkedRiderActive()}</isCC13NLRider>`;

    inputVal += `<ptTerm>${self.isPTRiderActive() ? self.getPTRTerm() : ''}</ptTerm>`;
    inputVal += `<adbTerm>${self.isADBRiderActive() ? self.getADBRiderTerm() : ''}</adbTerm>`;
    inputVal += `<atpdbTerm>${self.isATPDBRiderActive() ? self.getATPDBRiderTerm() : ''}</atpdbTerm>`;
    inputVal += `<cc13nlTerm>${self.isLinkedRiderActive() ? self.getLinkedRiderTerm() : ''}</cc13nlTerm>`;
    inputVal += `<premFreq>${self.getPremiumFrq()}</premFreq>`;
    inputVal += `<sumAssured>${self.getSumAssured()}</sumAssured>`;
    inputVal += `<ptSA>${self.isPTRiderActive() ? self.getPTRSumAssured() : ''}</ptSA>`;
    inputVal += `<adbSA>${self.isADBRiderActive() ? self.getADBRiderSumAssured() : ''}</adbSA>`;
    inputVal += `<atpdbSA>${self.isATPDBRiderActive() ? self.getATPDBRiderSumAssured() : ''}</atpdbSA>`;
    inputVal += `<cc13nlSA>${self.isLinkedRiderActive() ? self.getLinkedRiderSumAssured() : ''}</cc13nlSA>`;
    inputVal += `<Wish_to_backdate_policy>${self.isBackdatePolicyActive() ? "y" : "n"}</Wish_to_backdate_policy>`;
    inputVal += `<backdating_Date>${self.isBackdatePolicyActive() ? convertDateDdmmyyyy(self.getPolicyBackDate()) : ''}</backdating_Date>`;
    inputVal += `<KFC>${forminputbyuser.KFC}</KFC>`;

    var lumpSumAmount = "N";
    var cbLumpSumpAmount = document.getElementById('cbLumpSumpAmount');
    if (cbLumpSumpAmount.checked) {
        lumpSumAmount = "Y";
    }
    inputVal += `<mat_benefit_lump_sum>${lumpSumAmount}</mat_benefit_lump_sum>`;
    inputVal += `</smartIncomeProtectBean>`;

    let escapedHTML = escapeInputHTML(inputVal);
    sessionStorage.setItem("BIInput", escapedHTML);
    return inputVal;

}

function getIsStaff() {

    var checkBox = document.getElementById('smart_income_protect_staff_discount');

    return checkBox.checked;

}

function getTitle() {
    return document.forms["smartIncomeProtectForm"]["LifeAssuredTitle"].value;
}

function getGender() {

    return document.forms["smartIncomeProtectForm"]["gender"].value;

}

function getProposerGender() {
    return document.forms["smartIncomeProtectForm"]["proposerGender"].value;
}

function getFName() {

    return document.forms["smartIncomeProtectForm"]["first_name"].value;

}

function getMName() {

    return document.forms["smartIncomeProtectForm"]["middle_name"].value;

}

function getLName() {

    return document.forms["smartIncomeProtectForm"]["last_name"].value;

}

function fName() {

    return document.forms["smartIncomeProtectForm"]["proposer_first_name"].value;

}

function LName() {

    return document.forms["smartIncomeProtectForm"]["proposer_last_name"].value;

}

function MName() {

    return document.forms["smartIncomeProtectForm"]["proposer_middle_name"].value;

}

function getDob() {

    return document.forms["smartIncomeProtectForm"]["dob"].value;

}

function getProposerDob() {

    return document.forms["smartIncomeProtectForm"]["proposer_dob"].value;
}

function getIncomeProtectAge() {

    return parseInt(document.forms["smartIncomeProtectForm"]["LAage"].value);

}

function getIncomeProtectProposerAge() {

    return parseInt(document.forms["smartIncomeProtectForm"]["proposer_age"].value);

}

function getMobileNo() {

    return document.forms["smartIncomeProtectForm"]["mobile"].value;

}
	
function getEmail() {
    return document.forms["smartIncomeProtectForm"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["smartIncomeProtectForm"]["confirmEmail"].value;
}

function getPolicyTerm() {

    return parseInt(document.forms["smartIncomeProtectForm"]["policyTerm"].value);

}

function getLifeAssuredTitle() {
    return document.forms["smartIncomeProtectForm"]["LifeAssuredTitle"].value;
}

function getProposerTitle() {
    return document.forms["smartIncomeProtectForm"]["ProposerTitle"].value;
}

function getPremiumFrq() {

    var index = document.forms["smartIncomeProtectForm"]["premiumFrequencyMode"].value;

    return premiumPaymentModeList[index].title;

}

function getSumAssured() {

    var sumAssured = parseFloat(document.forms["smartIncomeProtectForm"]["protectIncomeSumAssured"].value);

    if (isNaN(sumAssured) || sumAssured == '' || sumAssured == null) {

        return 0;

    }

    return sumAssured;

}

function isBackdatePolicyActive() {
    var isBackDate = document.forms["smartIncomeProtectForm"]["wishToBackdate"].value;
    if (isBackDate === "yes") {
        return true;
    } else {
        return false;
    }
}

function getPolicyBackDate() {
    var backDate = document.forms["smartIncomeProtectForm"]["backDate"].value;
    return ((backDate != undefined || backDate != null)  ? '' : dateMMDDYYYYFormat(backDate));
}

function isPTRiderActive() {
    var isPTRiderActive = document.forms["smartIncomeProtectForm"]["PrfrdTrmRidr"].value;
    if (isPTRiderActive === "yes") {
        return true;
    } else {
        return false;
    }

}

function getPTRTerm() {

    var ptrTerm = parseInt(document.forms["smartIncomeProtectForm"]["smartIncomeProtectPTRTerm"].value);

    if (isNaN(ptrTerm) || ptrTerm == '' || ptrTerm == null) {

        return 0;

    }

    return ptrTerm;

}

function getPTRSumAssured() {

    var ptrSumAssured = parseFloat(document.forms["smartIncomeProtectForm"]["smartIncomeProtectPTRSum"].value);

    if (isNaN(ptrSumAssured) || ptrSumAssured == '' || ptrSumAssured == null) {

        return 0;

    }

    return ptrSumAssured;

}

function isADBRiderActive() {

    var isADBRiderActive = document.forms["smartIncomeProtectForm"]["adbRider"].value;
    if (isADBRiderActive === "yes") {
        return true;
    } else {
        return false;
    }
}

function getADBRiderTerm() {

    var adbTerm = parseInt(document.forms["smartIncomeProtectForm"]["incomeProtectADBRiderTerm"].value);

    if (isNaN(adbTerm) || adbTerm == '' || adbTerm == null) {

        return 0;

    }

    return adbTerm;

}

function getADBRiderSumAssured() {

    var adbSumAssured = parseFloat(document.forms["smartIncomeProtectForm"]["incomeProtectADBRiderSumAssured"].value);

    if (isNaN(adbSumAssured) || adbSumAssured == '' || adbSumAssured == null) {

        return 0;

    }

    return adbSumAssured;

}

function isATPDBRiderActive() {

    var isATPDBRiderActive = document.forms["smartIncomeProtectForm"]["atpdbRider"].value;
    if (isATPDBRiderActive === "yes") {
        return true;
    } else {
        return false;
    }
}

function getATPDBRiderTerm() {

    var atpdbTerm = parseInt(document.forms["smartIncomeProtectForm"]["incomeProtectATPDBRiderTerm"].value);

    if (isNaN(atpdbTerm) || atpdbTerm == '' || atpdbTerm == null) {

        return 0;

    }

    return atpdbTerm;

}

function getATPDBRiderSumAssured() {

    var atpdbSumAssured = parseFloat(document.forms["smartIncomeProtectForm"]["incomeProtectATPDBRiderSumAssured"].value);

    if (isNaN(atpdbSumAssured) || atpdbSumAssured == '' || atpdbSumAssured == null) {

        return 0;

    }

    return atpdbSumAssured;

}

function isLinkedRiderActive() {
    var isLinkedRiderActive = document.forms["smartIncomeProtectForm"]["cc13NonLinkedRider"].value;
    if (isLinkedRiderActive === "yes") {
        return true;
    } else {
        return false;
    }

}

function getLinkedRiderTerm() {

    var linkedTerm = parseInt(document.forms["smartIncomeProtectForm"]["incomeProtectLinkRiderTerm"].value);

    if (isNaN(linkedTerm) || linkedTerm == '' || linkedTerm == null) {

        return 0;

    }

    return linkedTerm;

}

function getLinkedRiderSumAssured() {

    var linkedSumAssured = parseFloat(document.forms["smartIncomeProtectForm"]["incomeProtectLinkRiderSumAssured"].value);

    if (isNaN(linkedSumAssured) || linkedSumAssured == '' || linkedSumAssured == null) {

        return 0;

    }

    return linkedSumAssured;

}

function getAgeAllowed(termpolicy) {

    if (termpolicy == 7) {

        return policyTermList[0];

    } else if (termpolicy == 12) {

        return policyTermList[1];

    } else if (termpolicy == 15) {

        return policyTermList[2]

    }

}

function validateGender(formElementName) {
    // console.log("formElementName",formElementName)
    var laGender = document.forms["smartIncomeProtectForm"]["gender"].value;
    var proposerGender = document.forms["smartIncomeProtectForm"]["proposerGender"].value;


    if (formElementName === "gender") {
        if (laGender === "Male") {
            document.getElementById("LifeAssuredTitle").options[1].disabled = true;
            document.getElementById("LifeAssuredTitle").options[2].disabled = true;
            document.getElementById("LifeAssuredTitle").options[0].selected = true;
        } else if (laGender === "Female") {
            document.getElementById("LifeAssuredTitle").options[0].disabled = true;
            document.getElementById("LifeAssuredTitle").options[1].disabled = false;
            document.getElementById("LifeAssuredTitle").options[2].disabled = false;
            document.getElementById("LifeAssuredTitle").options[1].selected = true;
        } else {
            document.getElementById("LifeAssuredTitle").options[0].disabled = false;
            document.getElementById("LifeAssuredTitle").options[1].disabled = false;
            document.getElementById("LifeAssuredTitle").options[2].disabled = false;
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
        var age = getAgeFromBirthdate(getDDMMYYYY(self.getDob()))
        //console.log("age=",age)
        if (age < 18) {
            if (proposerGender !== "Female" && proposerGender !== "Male" && proposerGender !== "Third Gender") {
                document.getElementById("genderPropErrId").style.display = "block";
                document.getElementById("genderPropErrId").innerHTML =
                    "Please select your gender.";
                return false;
            } else {
                document.getElementById("genderPropErrId").style.display = "none";
                // return true;
            }
        }
        document.getElementById("genderErrId").style.display = "none";
        return true;
    }
}

function calculateMyAge() {
    //console.log("result = ",self.getIncomeProtectAge() >= self.getAgeAllowed(this.getPolicyTerm()))
    if (!isEmpty(self.getDob())) {
        if (self.getDob() == "" || self.getDob() == undefined) {
            document.forms["smartIncomeProtectForm"]["backDate"].value = "";
            alert("Please select date of birth");
            return;
        }

        var d = getDDMMYYYY(self.getPolicyBackDate());
        var split_date = d.split("/");
        var nowCal = new Date(split_date[2], split_date[1], split_date[0]);
        var ProposerDob = getDDMMYYYY(this.getDob()).split("/");
        // int age = Integer.parseInt(ProposerDob[3]) -
        // birthCal.get(Calendar.YEAR);

        var age = nowCal.getFullYear() - parseInt(ProposerDob[2]);
        var isMonthGreater = parseInt(ProposerDob[1]) > nowCal.getMonth();
        var isMonthSameButDayGreater = parseInt(ProposerDob[1]) == nowCal.getMonth() &&
            parseInt(ProposerDob[1]) > nowCal.getDate();
        if (isMonthGreater || isMonthSameButDayGreater) {
            age = age - 1;
        }
        //console.log("age=",age);
        //if(age > minAgeLimit){
        document.forms["smartIncomeProtectForm"]["LAage"].value = age;
        //}
    } else {
        alert("Please select a LifeAssured DOB First");
        document.forms['smartIncomeProtectForm']['backDate'].value = "";
    }
}

function setToDefaultValues() {
    if (self.isPTRiderActive()) {
        document.forms["smartIncomeProtectForm"]["PrfrdTrmRidr"].value = "no";
        document.forms["smartIncomeProtectForm"]["smartIncomeProtectPTRTerm"].value = self.getPolicyTerm();
        document.forms["smartIncomeProtectForm"]["smartIncomeProtectPTRSum"].value = "";
        document.getElementById("TrmRidrDiv").style.display = 'none'
    }

    if (self.isADBRiderActive()) {
        document.forms["smartIncomeProtectForm"]["adbRider"].value = "no";
        document.forms["smartIncomeProtectForm"]["incomeProtectADBRiderTerm"].value = self.getPolicyTerm();
        document.forms["smartIncomeProtectForm"]["incomeProtectADBRiderSumAssured"].value = "";
        document.getElementById("AbdRidrDiv").style.display = 'none'
    }

    if (self.isATPDBRiderActive()) {
        document.forms["smartIncomeProtectForm"]["atpdbRider"].value = "no";
        document.forms["smartIncomeProtectForm"]["incomeProtectATPDBRiderTerm"].value = self.getPolicyTerm();
        document.forms["smartIncomeProtectForm"]["incomeProtectATPDBRiderSumAssured"].value = "";
        document.getElementById("ATPDBRiderDiv").style.display = 'none'
    }

    if (self.isLinkedRiderActive()) {
        document.forms["smartIncomeProtectForm"]["cc13NonLinkedRider"].value = "no";
        document.forms["smartIncomeProtectForm"]["incomeProtectLinkRiderTerm"].value = self.getPolicyTerm();
        document.forms["smartIncomeProtectForm"]["incomeProtectLinkRiderSumAssured"].value = "";
        document.getElementById("CC13NonLinkedRiderDiv").style.display = 'none'
    }
}

function setBackdateEmpty() {
    document.forms['smartIncomeProtectForm']['backDate'].value = "";
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
