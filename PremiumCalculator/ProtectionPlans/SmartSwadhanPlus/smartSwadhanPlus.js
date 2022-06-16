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
    this.document.getElementById('sumAssuredTitleId').innerHTML = `Sum Assured* (Min. ${minSumAssured})`;

    var laGender = document.forms["smartSwadhanPlusForm"]["gender"].value;
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
    onWishToBackdateUpdate((this.getWishToBackdate() ? 'yes' : "no"));
}

function initArrayList() {
    policyListElement = document.forms["smartSwadhanPlusForm"]["policyTerm"];
    for (i = minPolicyTerm; i <= maxPolicyTerm; i++) {
        policyListElement.add(new Option(i));
    }

    planElement = document.forms["smartSwadhanPlusForm"]["plan"];
    for (i = 0; i < planTypeList.length; i++) {
        planElement.add(new Option(planTypeList[i].title, planTypeList[i].value));
    }

    this.showOrHidePremiumFrequencyBasedOnPlan(planTypeList[0]);
    this.showOrHidePremiumPayingTermBasedOnPlan(planTypeList[0])
}

/* ***************** DOM EVENTS **************** */
// function validateGender() {
//     var gender = document.forms["smartSwadhanPlusForm"]["gender"].value;
//     if (gender !== "Female" && gender !== "Male") {
//         document.getElementById('genderErrId').style.display = "block";
//         document.getElementById('genderErrId').innerHTML = "Please select your gender.";
//         return false;
//     } else {
//         document.getElementById('genderErrId').style.display = "none";
//         return true
//     }
// }

function validateGender() {

    var laGender = document.forms["smartSwadhanPlusForm"]["gender"].value;

    document.forms["smartSwadhanPlusForm"]["smartSwadhanPlusTitle"].options[0].disabled = false;
    document.forms["smartSwadhanPlusForm"]["smartSwadhanPlusTitle"].options[1].disabled = false;
    document.forms["smartSwadhanPlusForm"]["smartSwadhanPlusTitle"].options[2].disabled = false;

    if (laGender === "Male") {
        document.forms["smartSwadhanPlusForm"]["smartSwadhanPlusTitle"].value = "Mr.";
        document.forms["smartSwadhanPlusForm"]["smartSwadhanPlusTitle"].options[1].disabled = true;
        document.forms["smartSwadhanPlusForm"]["smartSwadhanPlusTitle"].options[2].disabled = true;
    } else if (laGender === "Female") {
        document.forms["smartSwadhanPlusForm"]["smartSwadhanPlusTitle"].value = "Mrs.";
        document.forms["smartSwadhanPlusForm"]["smartSwadhanPlusTitle"].options[0].disabled = true;
    } else {
        document.getElementById("smartSwadhanPlusTitle").options[0].disabled = false;
        document.getElementById("smartSwadhanPlusTitle").options[1].disabled = false;
        document.getElementById("smartSwadhanPlusTitle").options[2].disabled = false;
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

function calculateAge(birthday) {
    console.log();
    
    var age = getAgeFromBirthdate(birthday);
    document.forms["smartSwadhanPlusForm"]["age"].innerHTML = age;
    document.forms["smartSwadhanPlusForm"]["age"].value = age;
    if (age < minAgeLimit || age > maxAgeLimit) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        return true;
    }
}

function onPlanUpdate(planValue) {
    var planSelected = planTypeList[planValue];
    this.showOrHidePremiumFrequencyBasedOnPlan(planSelected);
    this.showOrHidePremiumPayingTermBasedOnPlan(planSelected);
}

function onWishToBackdateUpdate(wishToBackdate) {
    var backDateDiv = document.getElementById('backdatingDateDivId');
    var backDateElement = document.forms["smartSwadhanPlusForm"]["backDate"];

    if (wishToBackdate === "yes") {
        backDateDiv.style.display = "block";
        backDateElement.required = true;
    } else {
        backDateDiv.style.display = "none";
        backDateElement.required = false;
    }
}
/* **************************  OTHER FUNCTIONS ********************* */
function showOrHidePremiumFrequencyBasedOnPlan(planSelected) {
    var premiumFrequencyDiv = document.getElementById('premiumFrequencyDivId');
    var premiumFrequencyElement = document.forms["smartSwadhanPlusForm"]["premiumFrequency"];

    if (planSelected.showPremiumFrequency) {
        premiumFrequencyDiv.style.display = "block";
        premiumFrequencyElement.innerHTML = '';
        for (i = 0; i < premiumFrequencyList.length; i++) {
            premiumFrequencyElement.add(new Option(premiumFrequencyList[i].title, premiumFrequencyList[i].value));
        }
    } else {
        premiumFrequencyDiv.style.display = "none";
    }
}

function showOrHidePremiumPayingTermBasedOnPlan(planSelected) {
    var payingTermDiv = document.getElementById('premiumPayingTermDivId');
    var payingTermElement = document.forms["smartSwadhanPlusForm"]["premiumPayingTerm"];

    if (planSelected.showPremiumPayingTerm) {
        payingTermDiv.style.display = "block";
        payingTermElement.innerHTML = '';
        for (i = 0; i < premiumPayingTermList.length; i++) {
            payingTermElement.add(new Option(premiumPayingTermList[i].title, premiumPayingTermList[i].value));
        }
    } else {
        payingTermDiv.style.display = "none";
    }
}

/* **************************  OTHER FUNCTIONS ********************* */
function validateBackdate() {
    var wishToBackdate = this.getWishToBackdate();
    if (wishToBackdate) {
        document.getElementById('backdateErrId').style.display = "block";
        document.getElementById('backdateErrId').required = true;
    } else {
        document.getElementById('backdateErrId').required = false;
    }
    return true;
}

function valdiateMaturityAge() {
    if (this.getAge() + this.getPolicyTerm() > 75) {
        document.getElementById('maturityAgeErrId').style.display = "block";
        document.getElementById('maturityAgeErrId').innerHTML = "Maximum maturity age is 75 years.";
        return false;
    } else {
        document.getElementById('maturityAgeErrId').style.display = "none";
        return true;
    }
}

function validateSumAssured() {
    var sumAssured = this.getSumAssured();
    if (isNaN(sumAssured) || sumAssured === undefined || sumAssured === null || sumAssured === '') {
        document.getElementById('sumAssuredErrId').style.display = "block";
        document.getElementById('sumAssuredErrId').innerHTML = "Please Enter Sum Assured.";
        return false;
    } else if (sumAssured % 1000 != 0) {
        document.getElementById('sumAssuredErrId').style.display = "block";
        document.getElementById('sumAssuredErrId').innerHTML = "Sum Assured should be multiple of 1000.";
        return false;
    } else if (sumAssured < 500000) {
        document.getElementById('sumAssuredErrId').style.display = "block";
        document.getElementById('sumAssuredErrId').innerHTML = `Minimum Sum Assured is ${minSumAssured}.`;
        return false;
    } else {
        document.getElementById('sumAssuredErrId').style.display = "none";
        return true;
    }
}

function validatePremiumPayingTermBasedOnPlan() {
    var policyTerm = this.getPolicyTerm();
    if (this.getPlan().value === 2) {
        if (policyTerm >= 15 && policyTerm < 20 && this.getPremiumPayingTerm() === 15) {
            document.getElementById('premiumTermErrId').style.display = "block";
            document.getElementById('premiumTermErrId').innerHTML = `Please enter Premium Paying Term as 5 Or 10.`;
            return true;
        } else if (policyTerm >= 10 && policyTerm < 15 && this.getPremiumPayingTerm() !== 5) {
            document.getElementById('premiumTermErrId').style.display = "block";
            document.getElementById('premiumTermErrId').innerHTML = `Please enter Premium Paying Term as 5.`;
            return true;
        } else {
            document.getElementById('premiumTermErrId').style.display = "none";
            return true;
        }
    } else {
        document.getElementById('premiumTermErrId').style.display = "none";
        return true;
    }
}

/* ***********************   GETTERS ************************* */

function getIsStaffDiscount() {
    return false;
}

function getTitle() {
    return document.forms["smartSwadhanPlusForm"]["smartSwadhanPlusTitle"].value;
}

function getAge() {
    return parseInt(document.forms["smartSwadhanPlusForm"]["age"].value, 10);
}

function getFName() {
    return document.forms["smartSwadhanPlusForm"]["first_name"].value;
}

function getMName() {
    return document.forms["smartSwadhanPlusForm"]["middle_name"].value;
}

function getLName() {
    return document.forms["smartSwadhanPlusForm"]["last_name"].value;
}

function getGender() {
    return document.forms["smartSwadhanPlusForm"]["gender"].value;
}

function getEmail() {
    return document.forms["smartSwadhanPlusForm"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["smartSwadhanPlusForm"]["confirmEmail"].value;
}

function getDOB() {
    return document.forms["smartSwadhanPlusForm"]["dob"].value;
}

function getPremiumPayngTerm() {
    return parseInt(document.forms["smartSwadhanPlusForm"]["premiumPayingTerm"].value, 10);
}

function getMobileNo() {
    return document.forms["smartSwadhanPlusForm"]["mobile"].value;
}

function getPlan() {
    var planValue = document.forms["smartSwadhanPlusForm"]["plan"].value
    return planTypeList[planValue];
}

function getPolicyTerm() {
    return parseInt(document.forms["smartSwadhanPlusForm"]["policyTerm"].value, 10);
}

function getPremiumPayingTerm() {
    return parseInt(document.forms["smartSwadhanPlusForm"]["premiumPayingTerm"].value, 10);
}

function getPremiumAmount() {
    return parseInt(document.forms["smartSwadhanPlusForm"]["premiumAmount"].value, 10);
}

function getCalculatedAge() {
    return parseInt(document.forms["smartSwadhanPlusForm"]["age"].value, 10);
}

function getPremiumFrequency() {
    var premiumfrequencyValue = document.forms["smartSwadhanPlusForm"]["premiumFrequency"].value;
    return premiumFrequencyList[premiumfrequencyValue - 1];
}

function getSumAssured() {
    return parseInt(document.forms["smartSwadhanPlusForm"]["sumAssured"].value, 10);
}

function getBackdate() {
    return wishToBackdate = document.forms["smartSwadhanPlusForm"]["backDate"].value;

}

function getWishToBackdate() {
    var wishToBackdate = document.forms["smartSwadhanPlusForm"]["wishToBackdate"].value;
    if (wishToBackdate === "yes") {
        return true;
    } else {
        return false;
    }
}


/* ******************************  FORM VALIDATION & SUBMIT **************************** */
function validatForm() {
    if (smartSwadhanPlusForm.checkValidity() && this.validateGender() && this.validateConfirmEmail() &&
        this.calculateAge(getDDMMYYYY(self.getDOB())) && this.validateMobileNo(self.getMobileNo()) &&
        this.valdiateMaturityAge() && this.validateSumAssured() && this.validatePremiumPayingTermBasedOnPlan() &&
        this.validateBackDate() && this.trueBackdate()) {
        this.calculatePremiumAPICall(); // form valid
    }
}

function calculatePremiumAPICall() {

    //changed value of premFreq tag and premium paying term tag by Manish
    let xmlBodyParam = `<getPremiumSmartSwadhanPlus xmlns="http://tempuri.org/">
    <isStaff>${this.getIsStaffDiscount()}</isStaff>
    <isJKResident>false</isJKResident>
    <age>${this.getAge()}</age>
    <gender>${this.getGender()}</gender>
    <plan>${this.getPlan().title}</plan>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <premFreq>${this.getPlan().title == "Single" ? "Single" : this.getPremiumFrequency().title}</premFreq>
    <sumAssured>${this.getSumAssured()}</sumAssured>
    <premPayingTerm>${this.getPlan().title == 'Single' ? self.getPolicyTerm(): this.getPlan().title == 'Regular' ? self.getPolicyTerm(): this.getPlan().title == 'LPPT' ? this.getPremiumPayingTerm() : '0' }</premPayingTerm>
    <IsBackdate>${this.getWishToBackdate()}</IsBackdate>
    <Backdate>${this.getWishToBackdate() ? dateMMDDYYYYFormat(this.getBackdate()) : ''}</Backdate>
    <IsMines></IsMines>
    <KFC>${getKerlaDiscount()}</KFC>
  </getPremiumSmartSwadhanPlus>`;

    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        ${xmlBodyParam}
                    </soap:Body>
                </soap:Envelope>`;
    self.showLoader();

    console.log("PRODUCT CODE---" + this.productDetails.productCode);

    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {

        if (self.getPlan() == "Regular" || self.getPlan() == "Single") {
            PlanCode = "1ZSSPRP";
        } else {
            PlanCode = "1ZSSPLP";
        }

        //BI_INPUT
        let forminputbyuser = {
            proposerName: self.getTitle() + " " + self.getFName() + " " + self.getLName(),
            age: self.getCalculatedAge(),
            gender: self.getGender(),
            MobileNo: self.getMobileNo(),
            Email: self.getEmail(),
            ConfirmEmail: self.getConfirmEmail(),
            isStaff: self.getIsStaffDiscount(),
            premiumFrequency: `${this.getPlan().title == "Single" ? "Single" : this.getPremiumFrequency().title}`,
            policyTerm: self.getPolicyTerm(),

            //Changed premium paying term value by manish
            premiumPayingTerm: `${this.getPlan().title == 'Single' ? "1" : this.getPlan().title == 'Regular' ? self.getPolicyTerm(): this.getPlan().title == 'LPPT' ? this.getPremiumPayingTerm() : '0' }`,
            planOption: self.getPlan().title,
            premiumAmount: self.getSumAssured(),
            WishToBAckDate: self.getWishToBackdate(),
            BackDate: this.getWishToBackdate() ? dateMMDDYYYYFormat(self.getBackdate()) : '',
            quotationNumber: quotNumber,
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
            Frequency: this.getPlan().showPremiumFrequency ? this.getPremiumFrequency().title : 'Single',
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: this.getPlan().showPremiumPayingTerm ? self.getPremiumPayngTerm() : '1',
            PlanCode: PlanCode,
            KFC: getKerlaDiscount() ? "Y" : "N",
            userType: getUserType()
        };

        let input = self.getInput(forminputbyuser)
        self.ApiCallService('/getPremiumSmartSwadhanPlus', body, '<SmartSwadhanPlus>', '</SmartSwadhanPlus>', true).then((data) => {
            self.hideLoader();
            data = data.SmartSwadhanPlus;
            var error = data.errCode;
            if (error != undefined && error == 1) {
                alert(data.minPremError)
                return;
            }
            data.productDetails = self.productDetails;
            var stringifyJson = JSON.stringify(data);

            console.log(stringifyJson)
            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</guarantedDeathBenefit${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</guarantedDeathBenefit${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                remaningOutput = remaningOutput + "</SmartSwadhanPlus>";
                remaningOutput = appendXMLTagAtStart(remaningOutput);
                let escapedOutput = escapeInputHTML(remaningOutput);
                sessionStorage.setItem("BIOutput", escapedOutput);
            }
            if (sessionStorage.ThroughNeedAnalysis) {
                let status = sessionStorage.getItem('ThroughNeedAnalysis');

                if (status === 'Yes') {
                    forminputbyuser.TotalPremAmt = data.InstmntPrem;
                    updateDataInDB(forminputbyuser).then((resolve) => {
                        if (resolve == "1") {
                            createPDFGeneralMethod(productDetails, data, forminputbyuser)
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
            hideLoader();
        });
    }).catch((message) => {
        hideLoader();
    });
}

function getInput(forminputbyuser) {
    var inputVal = "";

    inputVal += `<?xml version='1.0' encoding='utf-8' ?><smartSwadhanPlusBean>`;

    inputVal += `<LifeAssured_title>${self.getTitle()}</LifeAssured_title>`;
    inputVal += `<LifeAssured_firstName>${self.getFName()}</LifeAssured_firstName>`;
    inputVal += `<LifeAssured_middleName>${self.getMName()}</LifeAssured_middleName>`;
    inputVal += `<LifeAssured_lastName>${self.getLName()}</LifeAssured_lastName>`;
    inputVal += `<LifeAssured_DOB>${getDDMMYYYY(self.getDOB())}</LifeAssured_DOB>`;
    inputVal += `<LifeAssured_age>${forminputbyuser.age}</LifeAssured_age>`;
    inputVal += `<gender>${forminputbyuser.gender}</gender>`;

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
    inputVal += `<isStaff>false</isStaff>`;
    inputVal += `<isSmoker>false</isSmoker>`;
    inputVal += `<age>${forminputbyuser.age}</age>`;
    inputVal += `<plan>${forminputbyuser.planOption}</plan>`;

    inputVal += `<policyTerm>${forminputbyuser.policyTerm}</policyTerm>`;
    inputVal += `<premiumPayingTerm>${forminputbyuser.premiumPayingTerm}</premiumPayingTerm>`;

    inputVal += `<premFreq>${forminputbyuser.premiumFrequency}</premFreq>`;
    inputVal += `<sumAssured>${forminputbyuser.premiumAmount}</sumAssured>`;

    inputVal += `<Wish_to_backdate_policy>${forminputbyuser.WishToBAckDate ? "y" : "n"}</Wish_to_backdate_policy>`;
    inputVal += `<backdating_Date>${forminputbyuser.WishToBAckDate ? forminputbyuser.BackDate : ''}</backdating_Date>`;
    inputVal += `<KFC>${forminputbyuser.KFC}</KFC>`;
    inputVal += `</smartSwadhanPlusBean>`;

    let escapedHTML = escapeInputHTML(inputVal);
    sessionStorage.setItem("BIInput", escapedHTML);
    return escapedHTML;
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
//Added on 24/06/2019 by Bharamu
function validateBackDate() {
    if (self.getWishToBackdate()) {
        if (isEmpty(self.getBackdate())) {
            document.getElementById('backDateErrId').style.display = 'block';
            document.getElementById('backDateErrId').innerHTML = 'Please select back date';
            return false;
        } else {
            document.getElementById('backDateErrId').style.display = 'none';
            return true;
        }
    } else {
        return true;
    }
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
        document.forms["smartSwadhanPlusForm"]["age"].value = age;
    } else {
        alert("Please select a LifeAssured DOB First");
        document.forms['smartSwadhanPlusForm']['backDate'].value = "";
    }
}

function setBackdateEmpty() {
    document.forms['smartSwadhanPlusForm']['backDate'].value = "";
}