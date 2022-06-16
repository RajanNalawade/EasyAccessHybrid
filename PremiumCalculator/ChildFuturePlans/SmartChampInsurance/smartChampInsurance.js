window.onload = function () {
    console.log("inside load");

    this.ready();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails;
var proposer_Is_Same_As_Life_Assured = "Y";

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    //self.hideLoader();
    this.productDetails = self.getQueryStringDesializedData("premiumCalcProductDetails");
    console.log("this.productDetails ", this.productDetails);

    this.initializeData()
    this.initArrayList();
    var laGender = document.forms["smartChampInsuranceForm"]["gender"].value;
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
};

function initializeData() {
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
}

function initArrayList() {
    premiumFrequencyListElement = document.forms["smartChampInsuranceForm"]["premiumFrequency"];
    for (i = 0; i < premiumFrequencyList.length; i++) {
        premiumFrequencyListElement.add(new Option(premiumFrequencyList[i].title, premiumFrequencyList[i].value));
    }
    this.setPolicyTermAndPayingTerm();
    this.onPremiumFrequencyUpdate(1);
    this.onWishToBackdateUpdate('no');
}

function validateGender(formElementName) {

    var laGender = document.forms["smartChampInsuranceForm"]["gender"].value;
    document.forms["smartChampInsuranceForm"]["smartChampInsuranceTitle"].options[0].disabled = false;
    document.forms["smartChampInsuranceForm"]["smartChampInsuranceTitle"].options[1].disabled = false;
    document.forms["smartChampInsuranceForm"]["smartChampInsuranceTitle"].options[2].disabled = false;


    if (laGender === "Male") {

        document.forms["smartChampInsuranceForm"]["smartChampInsuranceTitle"].value = "Mr.";
        document.forms["smartChampInsuranceForm"]["smartChampInsuranceTitle"].options[1].disabled = true;
        document.forms["smartChampInsuranceForm"]["smartChampInsuranceTitle"].options[2].disabled = true;
    } else if (laGender === "Female") {

        document.forms["smartChampInsuranceForm"]["smartChampInsuranceTitle"].value = "Mrs.";
        document.forms["smartChampInsuranceForm"]["smartChampInsuranceTitle"].options[0].disabled = true;
    }

    if (laGender != "Male" && laGender != "Female" && laGender != "Third Gender") {
        document.getElementById("genderErrId").style.display = "block";
        document.getElementById("genderErrId").innerHTML =
            "Please select your gender.";
        return false;
    } else {
        document.getElementById("genderErrId").style.display = "none";
        return true;
    }
}

//Added validateChildGender() method by bharamu
function validateChildGender() {
    var laGender = document.forms["smartChampInsuranceForm"]["smartChampInsuranceChildGender"].value;
    document.forms["smartChampInsuranceForm"]["smartChampInsuranceChildTitle"].options[0].disabled = false;
    document.forms["smartChampInsuranceForm"]["smartChampInsuranceChildTitle"].options[1].disabled = false;
    document.forms["smartChampInsuranceForm"]["smartChampInsuranceChildTitle"].options[2].disabled = false;
    if (laGender === "Male") {
        document.forms["smartChampInsuranceForm"]["smartChampInsuranceChildTitle"].value = "Mr.";
        document.forms["smartChampInsuranceForm"]["smartChampInsuranceChildTitle"].options[1].disabled = true;
        document.forms["smartChampInsuranceForm"]["smartChampInsuranceChildTitle"].options[2].disabled = true;
    } else if (laGender === "Female") {
        document.forms["smartChampInsuranceForm"]["smartChampInsuranceChildTitle"].value = "Mrs.";
        document.forms["smartChampInsuranceForm"]["smartChampInsuranceChildTitle"].options[0].disabled = true;
    }
    if (laGender != "Male" && laGender != "Female" && laGender != "Third Gender") {
        alert("Please select proper child gender based on child title")
        return false;
    }
    return true;
}


function setPolicyTermAndPayingTerm() {
    policyTermElement = document.forms["smartChampInsuranceForm"]["policyTerm"];
    premiumPayingTermElement = document.forms["smartChampInsuranceForm"]["premiumPayingTerm"];
    childAge = parseInt(document.forms["smartChampInsuranceForm"]["child_age"].value, 10);
    policyTermElement.value = policyTerm - childAge;
    premiumPayingTermElement.value = premPayingTerm - childAge;
}

function onWishToBackdateUpdate(wishToBackdate) {
    var backDateDiv = document.getElementById("backdatingDateDivId");
    var backDateElement = document.forms["smartChampInsuranceForm"]["backDate"];

    if (wishToBackdate === "true") {
        backDateDiv.style.display = "block";
        backDateElement.required = true;
    } else {
        backDateDiv.style.display = "none";
        backDateElement.required = false;
    }
}

function calculateAge(birthday, formElementName, errElementId) {

    var age = getAgeFromBirthdate(birthday);
    document.forms["smartChampInsuranceForm"][formElementName].innerHTML = age;
    document.forms["smartChampInsuranceForm"][formElementName].value = age;
    if (formElementName === 'age' && (age < minAgeLimitForProposer || age > maxAgeLimitForProposer)) {
        document.getElementById(errElementId).style.display = "block";
        document.getElementById(errElementId).innerHTML = `Age should be between ${minAgeLimitForProposer} and ${maxAgeLimitForProposer}.`;
        return false;
    } else if (formElementName === 'child_age' && (age < minAgeLimitForChild || age > maxAgeLimitForChild)) {
        document.getElementById(errElementId).style.display = "block";
        document.getElementById(errElementId).innerHTML = `Age should be between ${minAgeLimitForChild} and ${maxAgeLimitForChild}.`;
        return false;
    } else {
        document.getElementById(errElementId).style.display = "none";
        return true;
    }
}

function validateAge(formElementName, age, errElementId) {
    if (formElementName === 'age' && (age < minAgeLimitForProposer || age > maxAgeLimitForProposer)) {
        document.getElementById(errElementId).style.display = "block";
        document.getElementById(errElementId).innerHTML = `Age should be between ${minAgeLimitForProposer} and ${maxAgeLimitForProposer}.`;
        return false;
    } else if (formElementName === 'child_age' && (age < minAgeLimitForChild || age > maxAgeLimitForChild)) {
        document.getElementById(errElementId).style.display = "block";
        document.getElementById(errElementId).innerHTML = `Age should be between ${minAgeLimitForChild} and ${maxAgeLimitForChild}.`;
        return false;
    } else {
        document.getElementById(errElementId).style.display = "none";
        return true;
    }
}

function onPremiumFrequencyUpdate(premiumFrequencyIndex) {
    premiumFrequencySelected = premiumFrequencyList[premiumFrequencyIndex - 1];
    var premiumPayingTermDivElement = document.getElementById('premiumPayingTermDivId');
    if (premiumFrequencySelected.showPremiumPayingTerm) {
        premiumPayingTermDivElement.style.display = "block";
    } else {
        premiumPayingTermDivElement.style.display = "none";
    }
}

function validateSumAssured() {
    var sumAssured = this.getSumAssured();
    if (isNaN(sumAssured) || sumAssured === undefined || sumAssured === null || sumAssured === '') {
        document.getElementById('sumAssuredErrId').style.display = "block";
        document.getElementById('sumAssuredErrId').innerHTML = 'Please enter Sum Assured.';
        return false;
    } else if (sumAssured % 1000 !== 0) {
        document.getElementById('sumAssuredErrId').style.display = "block";
        document.getElementById('sumAssuredErrId').innerHTML = `Sum Assured should be multiple of 1000.`;
        return false;
    } else if (sumAssured > maxSumAssured) {
        document.getElementById('sumAssuredErrId').style.display = "block";
        document.getElementById('sumAssuredErrId').innerHTML = `Sum Assured should not be greater than ${new Intl.NumberFormat('en-IN').format(maxSumAssured)}.`;
        return false;
    } else if (sumAssured < minSumAssured) {
        document.getElementById('sumAssuredErrId').style.display = "block";
        document.getElementById('sumAssuredErrId').innerHTML = `Sum Assured should not be less than ${new Intl.NumberFormat('en-IN').format(minSumAssured)}.`;
        return false;
    } else {
        document.getElementById('sumAssuredErrId').style.display = "none";
        return true;
    }
}

function valdateMaturityAge() {
    if (this.getAge() + this.getPolicyTerm() > 70) {
        document.getElementById('maturityAgeErrId').style.display = "block";
        document.getElementById('maturityAgeErrId').innerHTML = `Maturity Age (Life Assured Age + Policy Term) should not be greater than 70 years.`;
        return false;
    } else if (this.getAge() + this.getPolicyTerm() < 42) {
        document.getElementById('maturityAgeErrId').style.display = "block";
        document.getElementById('maturityAgeErrId').innerHTML = `Maturity age ( Life Assured + Policy Term ) should not be less than 42 years.`;
        return false;
    } else {
        document.getElementById('maturityAgeErrId').style.display = "none";
        return true;
    }
}

/* *********************** GETTERS ************************* */
function getIsStaffDiscount() {
    return document.forms["smartChampInsuranceForm"]["staff_discount"].checked;
}

function getTitle() {
    return document.forms["smartChampInsuranceForm"]["smartChampInsuranceTitle"].value;
}

function getAge() {
    return parseInt(document.forms["smartChampInsuranceForm"]["age"].value, 10);
}

function fName() {
    return document.forms["smartChampInsuranceForm"]["first_name"].value;
}

function MName() {
    return document.forms["smartChampInsuranceForm"]["middle_name"].value;
}

function LName() {
    return document.forms["smartChampInsuranceForm"]["last_name"].value;
}

function getChildTitle() {
    return document.forms["smartChampInsuranceForm"]["smartChampInsuranceChildTitle"].value;
}

function childfName() {
    return document.forms["smartChampInsuranceForm"]["child_first_name"].value;
}

function childMName() {
    return document.forms["smartChampInsuranceForm"]["child_middle_name"].value;
}

function childLName() {
    return document.forms["smartChampInsuranceForm"]["child_last_name"].value;
}

function getChildAge() {
    return parseInt(document.forms["smartChampInsuranceForm"]["child_age"].value, 10);
}

function getChildGender() {
    return document.forms["smartChampInsuranceForm"]["smartChampInsuranceChildGender"].value;
}

function getEmail() {
    return document.forms["smartChampInsuranceForm"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["smartChampInsuranceForm"]["confirmEmail"].value;
}

function getDOB() {
    return document.forms["smartChampInsuranceForm"]["dob"].value;
}

function getChildDOB() {
    return document.forms["smartChampInsuranceForm"]["child_dob"].value;
}

function getMobileNo() {
    return document.forms["smartChampInsuranceForm"]["mobile"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["smartChampInsuranceForm"]["policyTerm"].value, 10);
}

function getSumAssured() {
    return parseInt(document.forms["smartChampInsuranceForm"]["sumAssured"].value, 10);
}

function getPremiumFrequency() {
    var index = document.forms["smartChampInsuranceForm"]["premiumFrequency"].value;
    console.log(premiumFrequencyList[index - 1].title);
    return premiumFrequencyList[index - 1].title;
}

function getPremiumPayingTerm() {
    console.log("pay :-", document.forms["smartChampInsuranceForm"]["premiumPayingTerm"].value);
    return document.forms["smartChampInsuranceForm"]["premiumPayingTerm"].value;
}

function getGender() {
    return document.forms["smartChampInsuranceForm"]["gender"].value;
}

function getIsStaffDiscount() {
    return document.forms["smartChampInsuranceForm"]["staff_discount"].checked;
}

function getBackdate() {
    return document.forms["smartChampInsuranceForm"]["backDate"].value;
}

function getWishToBackdate() {
    return false;
}

function getFName() {
    return document.forms["smartChampInsuranceForm"]["first_name"].value;
}

function getMName() {
    return document.forms["smartChampInsuranceForm"]["middle_name"].value;
}

function getLName() {
    return document.forms["smartChampInsuranceForm"]["last_name"].value;
}


/* ******************************  FORM VALIDATION & SUBMIT **************************** */
function validatForm() {
    if (smartChampInsuranceForm.checkValidity() && this.validateGender("") && validateChildGender() && this.validateConfirmEmail() &&
        this.validateAge('age', getAge(), 'ageErrId') && this.validateAge('child_age', getChildAge(), 'childAgeErrId') && this.validateMobileNo(self.getMobileNo()) &&
        this.validateSumAssured() && this.valdateMaturityAge() && this.trueBackdate() && validateBackDate()) {
        this.calculatePremiumAPICall(); // form valid
    }
}

function calculatePremiumAPICall() {
    let xmlBodyParam = `<getPremiumSmartChamp xmlns="http://tempuri.org/">
    <isStaff>${this.getIsStaffDiscount()}</isStaff>
    <isJKResident>false</isJKResident>
    <childAge>${this.getChildAge()}</childAge>
    <gender>${this.getGender()}</gender>
    <laAge>${this.getAge()}</laAge>
    <policyTerm>${this.getPolicyTerm()}</policyTerm>
    <premFreq>${this.getPremiumFrequency()}</premFreq>
    <sumAssured>${this.getSumAssured()}</sumAssured>
    <premiumPayingTerm>${this.getPremiumPayingTerm()}</premiumPayingTerm>
    <IsBackdate>${(this.getWishToBackdate() ? this.getWishToBackdate() : '')}</IsBackdate>
    <Backdate>${(this.getWishToBackdate() ? dateMMDDYYYYFormat(this.getBackdate()) : '')}</Backdate>
    <IsMines></IsMines>
    <KFC>${getKerlaDiscount()}</KFC>
  </getPremiumSmartChamp>`;

    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        ${xmlBodyParam}
                    </soap:Body>
                </soap:Envelope>`;

    self.showLoader();
    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {
        let staffDiscount = "";
        if (self.getIsStaffDiscount() === true) {
            staffDiscount = "Yes";
        } else {
            staffDiscount = "No";
        }
        var PlanCode = "SCI";


        let forminputbyuser = {
            proposerName: self.getTitle() + " " + self.fName() + " " + self.MName() + " " + self.LName(),
            childName: self.getChildTitle() + " " + self.childfName() + " " + self.childMName() + " " + self.childLName(),
            age: self.getAge(),
            childAge: getChildAge(),
            gender: self.getGender(),
            chilGender: self.getChildGender(),
            policyTerm: self.getPolicyTerm(),
            premiumFrequency: self.getPremiumFrequency(),
            //Changed value of premiumPayingTerm by Manish
            premiumPayingTerm: `${self.getPremiumFrequency() == "Single" ? "1" : self.getPremiumPayingTerm()}`,
            sumAssured: self.getSumAssured(),
            IsBackdate: self.getWishToBackdate(),
            Backdate: this.getWishToBackdate() ? dateMMDDYYYYFormat(self.getBackdate()) : '',
            quotationNumber: quotNumber,
            staffDiscount: staffDiscount,
            PlanName: self.productDetails.title,
            CustTitle: self.getTitle(),
            CustFirstName: self.getFName(),
            CustMiddleName: self.getMName(),
            CustLastName: self.getLName(),
            CustMobile: self.getMobileNo(),
            CustEmailID: self.getEmail(),
            LaDOB: getDDMMYYYY(self.getChildDOB()),
            ProposerDOB: getDDMMYYYY(getDOB()),
            BasicSA: getSumAssured(),
            TotalPremAmt: '',
            Frequency: self.getPremiumFrequency(),
            PolicyTerm: self.getPolicyTerm(),
            //Change value of PremPayingTerm by Manish 
            PremPayingTerm: `${self.getPremiumFrequency() == "Single" ? "1" : self.getPremiumPayingTerm()}`,
            PlanCode: PlanCode,
            KFC: getKerlaDiscount() ? "Y" : "N",
            jkResident: "N"
        };
        let input = getInput(forminputbyuser);

    self.ApiCallService('/getPremiumSmartChamp', body, '<smartChamp>', '</smartChamp>', true).then((data) => {
        self.hideLoader();
        data = data.smartChamp;
            data.productDetails = self.productDetails;
            data.PolicyTerm = forminputbyuser.PolicyTerm;
            var stringifyJson = JSON.stringify(data);
            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</gurntedSSV${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</gurntedSSV${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                var index = forminputbyuser.PolicyTerm;
                var nonGuarntedSurvivalBenft_4_pr = parseXmlTag(premiumCalcXMLResponse, "nonGuarntedSurvivalBenft_4_pr" + index + "");
                var nonGuarntedSurvivalBenft_8_pr = parseXmlTag(premiumCalcXMLResponse, "nonGuarntedSurvivalBenft_8_pr" + index + "");
                var nonGuarntedSurvivalBenft = '';
                nonGuarntedSurvivalBenft = "<nonGuarntedSurvivalBenft_4_pr" + index + ">" + nonGuarntedSurvivalBenft_4_pr + "</nonGuarntedSurvivalBenft_4_pr" + index + ">";
                nonGuarntedSurvivalBenft += "<nonGuarntedSurvivalBenft_8_pr" + index + ">" + nonGuarntedSurvivalBenft_8_pr + "</nonGuarntedSurvivalBenft_8_pr" + index + ">";
                remaningOutput = remaningOutput + nonGuarntedSurvivalBenft + "</Smartchampinsurance>"
                remaningOutput = remaningOutput.replace("smartChamp", "Smartchampinsurance");
                remaningOutput = appendXMLTagAtStart(remaningOutput);
                console.log("remaningOutput ", remaningOutput);
                let escapedOutput = escapeInputHTML(remaningOutput);
                sessionStorage.setItem("BIOutput", escapedOutput);
            }
            if (sessionStorage.ThroughNeedAnalysis) {
                let status = sessionStorage.getItem('ThroughNeedAnalysis');
                if (status === 'Yes') {
                    forminputbyuser.TotalPremAmt = data.premium;
                    updateDataInDB(forminputbyuser).then((resolve) => {
                        if (resolve == "1") {
                            data = JSON.stringify(data);
                            data = data.replace(/-/g, "");
                            console.log("data = " + data)
                            data = JSON.parse(data);
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
        self.hideLoader();
    });
    }).catch((message) => {
        alert("Unable to generate quotation number")
    });
}


function getInput(forminputbyuser) {
    var inputVal = '';
    inputVal += `<?xml version='1.0' encoding='utf-8' ?><smartchampinsurance>`;

    inputVal += `<LifeAssured_title>${self.getChildTitle()}</LifeAssured_title>`;
    inputVal += `<LifeAssured_firstName>${self.childfName()}</LifeAssured_firstName>`;
    inputVal += `<LifeAssured_middleName>${self.childMName()}</LifeAssured_middleName>`;
    inputVal += `<LifeAssured_lastName>${self.childLName()}</LifeAssured_lastName>`;
    inputVal += `<LifeAssured_DOB>${getDDMMYYYY(self.getChildDOB())}</LifeAssured_DOB>`;
    inputVal += `<LifeAssured_age>${self.getChildAge()}</LifeAssured_age>`;
    inputVal += `<gender>${self.getChildGender()}</gender>`;
    inputVal += `<gender>${self.getChildTitle() === "Mr." ? "Male" : "Female"}</gender>`;

    inputVal += `<proposer_title>${self.getTitle()}</proposer_title>`;
    inputVal += `<proposer_firstName>${self.fName()}</proposer_firstName>`;
    inputVal += `<proposer_middleName>${self.MName()}</proposer_middleName>`;
    inputVal += `<proposer_lastName>${self.LName()}</proposer_lastName>`;
    inputVal += `<proposer_DOB>${getDDMMYYYY(self.getDOB())}</proposer_DOB>`;
    inputVal += `<proposer_age>${self.getAge()}</proposer_age>`;
    inputVal += `<proposer_gender>${self.getGender()}</proposer_gender>`;

    inputVal += `<product_name>${product_name}</product_name>`;
    /* parivartan changes */
    inputVal += `<product_Code>${product_code}</product_Code>`;
    inputVal += `<product_UIN>${product_uin}</product_UIN>`;
    inputVal += `<product_cateogory>${product_cateogory}</product_cateogory>`;
    inputVal += `<product_type>${product_type}</product_type>`;
    /* end */

    inputVal += `<proposer_Is_Same_As_Life_Assured>${proposer_Is_Same_As_Life_Assured}</proposer_Is_Same_As_Life_Assured>`;

    inputVal += `<ageProposer>${self.getChildAge()}</ageProposer>`;
    inputVal += `<age>${self.getAge()}</age>`;
    inputVal += `<gender>${self.getGender()}</gender>`;

    inputVal += `<policyTerm>${forminputbyuser.policyTerm}</policyTerm>`;
    inputVal += `<isJKResident>false</isJKResident>`;
    inputVal += `<isStaff>${getIsStaffDiscount()}</isStaff>`;
    inputVal += `<premFreq>${forminputbyuser.premiumFrequency}</premFreq>`;
    inputVal += `<sumAssured>${forminputbyuser.sumAssured}</sumAssured>`;
    inputVal += `<premPayingTerm>${forminputbyuser.premiumPayingTerm}</premPayingTerm>`;

    inputVal += `<Wish_to_backdate_policy>${forminputbyuser.IsBackdate ? "y" : "n"}</Wish_to_backdate_policy>`;
    inputVal += `<backdating_Date>${forminputbyuser.IsBackdate ? getDDMMYYYY(this.getBackdate()) : ''}</backdating_Date>`;
    inputVal += `<ChildGender>${getChildGender()}</ChildGender>`;
    /*
     * if (isStaffDisc.isChecked()) {
     * retVal.append("<staffStatus>sbi</staffStatus>"); } else {
     * retVal.append("<staffStatus>none</staffStatus>"); }
     */
    inputVal += `<KFC>${forminputbyuser.KFC}</KFC>`;
    inputVal += `</smartchampinsurance>`;

    let escapedHTML = escapeInputHTML(inputVal);
    sessionStorage.setItem("BIInput", escapedHTML);
    return escapedHTML;
}

//Start Added on 18/09/2019 by Tushar Kadam
function trueBackdate() {
    console.log(self.getWishToBackdate());
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
        var todayDate = date + "/" + month + "/" + currYear;
        var splitDate = (dateMMDDYYYYFormat(self.getBackdate())).split("-");
        console.log("splitDate=", splitDate);
        var newBackDate = new Date(splitDate[2], (splitDate[0] - 1), splitDate[1])
        console.log("newBackDate=", newBackDate);
        if (currMonth >= 4) {
            finYerEndDate = "01/04/" + currYear;
        } else {
            finYerEndDate = "01/04/" + (currYear - 1);
        }
        var finYerEndDate_split = self.splitDate(finYerEndDate);
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
function calculateMyAge() {
    if (!isEmpty(self.getChildDOB())) {
        var age = self.getChildDOB();
        if (age == "" || age == undefined) {
            document.forms["smartChampInsuranceForm"]["backDate"].value = "";
            alert("Please select child date of birth");
            return;
        }
        var d = getDDMMYYYY(self.getBackdate());
        var split_date = d.split("/");
        var nowCal = new Date(split_date[2], split_date[1], split_date[0]);
        var ProposerDob = getDDMMYYYY(age).split("/");
        var age = nowCal.getFullYear() - parseInt(ProposerDob[2]);
        var isMonthGreater = parseInt(ProposerDob[1]) > nowCal.getMonth();
        var isMonthSameButDayGreater = parseInt(ProposerDob[1]) == nowCal.getMonth() &&
            parseInt(ProposerDob[0]) > nowCal.getDate();
        if (isMonthGreater || isMonthSameButDayGreater) {
            age = age - 1;
        }
        if (age > minAgeLimitForChild) {
            document.forms["smartChampInsuranceForm"]["child_age"].value = age;
            document.forms["smartChampInsuranceForm"]["child_age"].innerHTML = age;
        }
    } else {
        alert("Please select a child DOB First");
        document.forms['smartChampInsuranceForm']['backDate'].value = "";
    }
}
function calculateParentAge() {
    if (!isEmpty(self.getDOB())) {
        var age = self.getDOB();
        if (age == "" || age == undefined) {
            document.forms["smartChampInsuranceForm"]["backDate"].value = "";
            alert("Please select parent date of birth");
            return;
        }
        var d = getDDMMYYYY(self.getBackdate());
        var split_date = d.split("/");
        var nowCal = new Date(split_date[2], split_date[1], split_date[0]);
        var ProposerDob = getDDMMYYYY(age).split("/");
        var age = nowCal.getFullYear() - parseInt(ProposerDob[2]);
        var isMonthGreater = parseInt(ProposerDob[1]) > nowCal.getMonth();
        var isMonthSameButDayGreater = parseInt(ProposerDob[1]) == nowCal.getMonth() &&
            parseInt(ProposerDob[0]) > nowCal.getDate();
        if (isMonthGreater || isMonthSameButDayGreater) {
            age = age - 1;
        }
        if (age > minAgeLimitForChild) {
            document.forms["smartChampInsuranceForm"]["age"].value = age;
            document.forms["smartChampInsuranceForm"]["age"].innerHTML = age;
        }
    } else {
        alert("Please select a LifeAssured DOB First");
        document.forms['smartChampInsuranceForm']['backDate'].value = "";
    }
}
function setBackdateEmpty() {
    document.forms['smartChampInsuranceForm']['backDate'].value = "";
}
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
//End Added on 18/09/2019 by Tushar Kadam