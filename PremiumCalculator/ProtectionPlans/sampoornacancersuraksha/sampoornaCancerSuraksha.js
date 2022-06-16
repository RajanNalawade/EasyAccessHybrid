window.onload = function () {
    this.ready();
    // self.hideLoader();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails, policyTermElement, premiumFrequencyElement;
var proposer_Is_Same_As_Life_AssuredVar = "y";

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    setKerlaDiscount();
    proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
    for (i = 0; i < proposerBlocks.length; i++) {
        proposerBlocks[i].style.display = "none";
    }
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
    this.initArrayList();
};

function initializeData() {
    var fromDate, toDate;
    fromDate = new Date();
    fromDate.setFullYear(fromDate.getFullYear() - 35);
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
    createPolicyTermList(30);
}

function initArrayList() {

    planElement = document.forms["sampoornCancerSurakshaForm"]["plan"];
    for (i = 0; i < planOptionList.length; i++) {
        planElement.add(new Option(planOptionList[i].title, planOptionList[i].value));
    }

    premiumFrequencyElement = document.forms["sampoornCancerSurakshaForm"]["premiumFrequency"];
    for (i = 0; i < premiumFrequencyList.length; i++) {
        premiumFrequencyElement.add(new Option(premiumFrequencyList[i].title, premiumFrequencyList[i].value));
    }
}

/* ***************** DOM EVENTS **************** */
function validateGender() {


    var laGender = document.forms["sampoornCancerSurakshaForm"]["gender"].value;

    var proposerGender = document.forms["sampoornCancerSurakshaForm"]["proposerGender"].value;

    document.forms["sampoornCancerSurakshaForm"]["LifeAssuredTitle"].options[0].disabled = false;

    document.forms["sampoornCancerSurakshaForm"]["LifeAssuredTitle"].options[1].disabled = false;

    document.forms["sampoornCancerSurakshaForm"]["LifeAssuredTitle"].options[2].disabled = false;

    if (laGender === "Male") {

        document.forms["sampoornCancerSurakshaForm"]["LifeAssuredTitle"].value = "Mr.";

        document.forms["sampoornCancerSurakshaForm"]["LifeAssuredTitle"].options[1].disabled = true;

        document.forms["sampoornCancerSurakshaForm"]["LifeAssuredTitle"].options[2].disabled = true;


    } else if (laGender === "Female") {

        document.forms["sampoornCancerSurakshaForm"]["LifeAssuredTitle"].value = "Mrs.";

        document.forms["sampoornCancerSurakshaForm"]["LifeAssuredTitle"].options[0].disabled = true;

    } else if (laGender === "Third Gender") {

        document.forms["sampoornCancerSurakshaForm"]["LifeAssuredTitle"].value = "Mr.";

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

function validateProposerGender() {
    if (this.getCalculatedAge() >= minAgeLimit && this.getCalculatedAge() < 18) {



        var proposerGender = document.forms["sampoornCancerSurakshaForm"]["proposerGender"].value;

        document.forms["sampoornCancerSurakshaForm"]["proposerTitle"].options[0].disabled = false;

        document.forms["sampoornCancerSurakshaForm"]["proposerTitle"].options[1].disabled = false;

        document.forms["sampoornCancerSurakshaForm"]["proposerTitle"].options[2].disabled = false;


        if (proposerGender === "Male") {


            document.forms["sampoornCancerSurakshaForm"]["proposerTitle"].value = "Mr.";

            document.forms["sampoornCancerSurakshaForm"]["proposerTitle"].options[1].disabled = true;

            document.forms["sampoornCancerSurakshaForm"]["proposerTitle"].options[2].disabled = true;


        } else if (proposerGender === "Female") {

            document.forms["sampoornCancerSurakshaForm"]["proposerTitle"].value = "Mrs.";

            document.forms["sampoornCancerSurakshaForm"]["proposerTitle"].options[0].disabled = true;

        } else if (proposerGender === "Third Gender") {

            document.forms["sampoornCancerSurakshaForm"]["proposerTitle"].value = "Mr.";

        }


        if (proposerGender !== "Female" && proposerGender !== "Male" && proposerGender !== "Third Gender") {

            document.getElementById("genderPropErrId").style.display = "block";

            document.getElementById("genderPropErrId").innerHTML =

                "Please select Proposer gender.";

            return false;

        } else {

            document.getElementById("genderPropErrId").style.display = "none";

            return true;

        }
        /* var gender = document.forms["sampoornCancerSurakshaForm"]["proposerGender"].value;
        console.log("Proposer gender:" + gender)
        if (gender !== "Female" && gender !== "Male" && gender !== "Transgender") {
            document.getElementById('genderPropErrId').style.display = "block";
            document.getElementById('genderPropErrId').innerHTML = "Please select Proposer gender.";
            return false;
        } else {
            document.getElementById('genderPropErrId').style.display = "none";
            return true
        } */
    } else {
        return true;
    }
}

function calculateAge(birthday) {
    var age = getAgeFromBirthdate(birthday);
    document.forms["sampoornCancerSurakshaForm"]["age"].innerHTML = age;
    document.forms["sampoornCancerSurakshaForm"]["age"].value = age;

    if (age <= 45) {
        createPolicyTermList(30);
    } else {
        createPolicyTermList(75 - age);
    }

    if (age >= minAgeLimit && age < 18) {
        proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
        proposer_Is_Same_As_Life_AssuredVar = "n";
        for (i = 0; i < proposerBlocks.length; i++) {
            proposerBlocks[i].style.display = "block";
            document.forms['sampoornCancerSurakshaForm']['proposer_first_name'].required = true;
            document.forms['sampoornCancerSurakshaForm']['proposer_last_name'].required = true;
            document.forms['sampoornCancerSurakshaForm']['proposer_dob'].required = true;
            document.forms['sampoornCancerSurakshaForm']['proposerGender'].required = true;
        }
    } else {
        proposerBlocks = document.getElementsByClassName('isToShowProposerDetails');
        proposer_Is_Same_As_Life_AssuredVar = "y";
        for (i = 0; i < proposerBlocks.length; i++) {
            proposerBlocks[i].style.display = "none";
            document.forms['sampoornCancerSurakshaForm']['proposer_first_name'].required = false;
            document.forms['sampoornCancerSurakshaForm']['proposer_last_name'].required = false;
            document.forms['sampoornCancerSurakshaForm']['proposer_dob'].required = false;
            document.forms['sampoornCancerSurakshaForm']['proposerGender'].required = false;
        }
    }


    if (age < minAgeLimit || age > maxAgeLimit) {
        proposer_Is_Same_As_Life_AssuredVar = "n";
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        return true;
    }
}

function calculateProposerAge(birthday) {
    if (this.getCalculatedAge() < 18) {
        var proposerAge = getAgeFromBirthdate(birthday);
        document.forms["sampoornCancerSurakshaForm"]["proposer_age"].innerHTML = proposerAge;
        document.forms["sampoornCancerSurakshaForm"]["proposer_age"].value = proposerAge;

        if (proposerAge < 18 || proposerAge == "") {
            document.getElementById('proposerAgeErrId').style.display = "block";
            document.getElementById('proposerAgeErrId').innerHTML = `Proposer Age should be less than 18.`;
            return false;
        } else {
            document.getElementById('proposerAgeErrId').style.display = "none";
            return true;
        }
    } else {
        return true;
    }
}

function createPolicyTermList(maxLimitPolicyTerm) {

    policyTermElement = document.forms["sampoornCancerSurakshaForm"]["policyTerm"];

    for (i = minPolicyTermLimit; i <= maxLimitPolicyTerm; i++) {
        policyTermElement.add(new Option(i));
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

function validateSumAssured() {
    var sumAssured = this.getSumAssured();
    if (isNaN(sumAssured) || sumAssured === undefined || sumAssured === null || sumAssured === '') {
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = 'Please enter Sum Assured.';
        return false;
    } else if ((sumAssured % 100000) !== 0) {
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = 'Sum Assured should be multiple of 100000';
        return false;
    } else if (sumAssured < 1000000) {
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = `Sum Assured should not be less than 10,00,000.`;
        return false;
    } else if (sumAssured > 5000000) {
        document.getElementById('sumAssuredErrId').style.display = 'block';
        document.getElementById('sumAssuredErrId').innerHTML = `Sum Assured should not be greater than 50,00,000.`;
        return false;
    } else {
        document.getElementById('sumAssuredErrId').style.display = 'none';
        return true;
    }
}

/* function onPlanUpdate(planValue) {
    var planSelected = planList[planValue];
    console.log(planValue + " : planSelected:" + planSelected.policyTerm);

    policyTermElement.value = planSelected.policyTerm;
    premiumPayingTermElement.value = planSelected.premiumPayingTerm;
}
 */

function getLifeAssuredTitle() {
    return document.forms["sampoornCancerSurakshaForm"]["LifeAssuredTitle"].value;
}

function getProposerTitle() {
    return document.forms["sampoornCancerSurakshaForm"]["proposerTitle"].value;
}

function fName() {
    return document.forms["sampoornCancerSurakshaForm"]["first_name"].value;
}

function MName() {
    return document.forms["sampoornCancerSurakshaForm"]["middle_name"].value;
}

function LName() {
    return document.forms["sampoornCancerSurakshaForm"]["last_name"].value;
}

function proposerfName() {
    return document.forms["sampoornCancerSurakshaForm"]["proposer_first_name"].value;
}

function proposerMName() {
    return document.forms["sampoornCancerSurakshaForm"]["proposer_middle_name"].value;
}

function proposerLName() {
    return document.forms["sampoornCancerSurakshaForm"]["proposer_last_name"].value;
}

function getPlan() {
    return document.forms["sampoornCancerSurakshaForm"]["plan"].value
    // return planOptionList[planValue];
}

function getCalculatedAge() {
    return parseInt(document.forms["sampoornCancerSurakshaForm"]["age"].value, 10);
}

function getCalculatedProposerAge() {
    return parseInt(document.forms["sampoornCancerSurakshaForm"]["proposer_age"].value, 10);
}

function getEmail() {
    return document.forms["sampoornCancerSurakshaForm"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["sampoornCancerSurakshaForm"]["confirmEmail"].value;
}

function getDOB() {
    return document.forms["sampoornCancerSurakshaForm"]["dob"].value;
}

function getProposerDOB() {
    return document.forms["sampoornCancerSurakshaForm"]["proposer_dob"].value;
}

function getMobileNo() {
    return document.forms["sampoornCancerSurakshaForm"]["mobile"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["sampoornCancerSurakshaForm"]["policyTerm"].value, 10);
}

function getPlanOption() {
    var index = document.forms["sampoornCancerSurakshaForm"]["plan"].value;
    return planOptionList[index - 1].title;
}

function getPremiumFrequency() {
    var index = document.forms["sampoornCancerSurakshaForm"]["premiumFrequency"].value;
    return premiumFrequencyList[index - 1].title;
}

function getSumAssured() {
    return parseInt(document.forms["sampoornCancerSurakshaForm"]["sumAssured"].value, 10);
}

function getLAGender() {
    return document.forms["sampoornCancerSurakshaForm"]["gender"].value;
}

function getProposerGender() {
    return document.forms["sampoornCancerSurakshaForm"]["proposerGender"].value;
}

function getIsStaff() {
    return document.getElementById('staff_discount').checked;
}

/* ******************************  FORM VALIDATION & SUBMIT **************************** */
function validatForm() {
    if (sampoornCancerSurakshaForm.checkValidity() && this.validateGender() && this.validateConfirmEmail() &&
        this.calculateAge(getDDMMYYYY(self.getDOB())) && this.validateMobileNo(self.getMobileNo()) &&
        this.validateSumAssured() && this.calculateProposerAge(getDDMMYYYY(self.getProposerDOB())) && this.validateProposerGender()) {
        console.log(" submit ");

        this.calculatePremiumAPICall(); // form valid
    }
}

function calculatePremiumAPICall() {
    let xmlBodyParam = `<getPremiumSampoornCancerSuraksha xmlns="http://tempuri.org/">
    <OnlineDiscount>false</OnlineDiscount>
    <isStaff>${self.getIsStaff()}</isStaff>
    <isJkResident>false</isJkResident>
    <planType>${self.getPlanOption()}</planType>
    <age>${self.getCalculatedAge()}</age>
    <gender>${self.getLAGender()}</gender>
    <policyTerm>${self.getPolicyTerm()}</policyTerm>
    <premFreq>${self.getPremiumFrequency()}</premFreq>
    <sumAssured>${self.getSumAssured()}</sumAssured>
    <KFC>${getKerlaDiscount()}</KFC>
  </getPremiumSampoornCancerSuraksha>`;

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
        let premiumAmt = "";
        if (self.getIsStaff()) {
            staffDiscount = "Yes";
        } else {
            staffDiscount = "No";
        }
        let forminputbyuser;

        if (this.getCalculatedAge() < 18) {
            forminputbyuser = {
                proposerName: self.getProposerTitle() + " " + self.proposerfName() + " " + self.proposerLName(),
                age: self.getCalculatedAge(),
                gender: self.getProposerGender(),
                premiumFrequency: self.getPremiumFrequency(),
                planOption: self.getPlanOption(),
                policyTerm: self.getPolicyTerm(),
                sumAssured: self.getSumAssured(),
                quotationNumber: quotNumber,
                staffDiscount: staffDiscount,
                PlanName: self.productDetails.title,
                CustTitle: self.getLifeAssuredTitle(),
                CustFirstName: self.fName(),
                CustMiddleName: self.MName(),
                CustLastName: self.LName(),
                CustMobile: self.getMobileNo(),
                CustEmailID: self.getEmail(),
                LaDOB: getDDMMYYYY(self.getDOB()),
                ProposerDOB: getDDMMYYYY(self.getProposerDOB()),
                BasicSA: self.getSumAssured(),
                // TotalPremAmt: self.getPremiumAmount(),
                Frequency: self.getPremiumFrequency(),
                PolicyTerm: self.getPolicyTerm(),
                PremPayingTerm: '0',
                PlanCode: self.productDetails.productCode,
                KFC: getKerlaDiscount() ? "Y" : "N"
            };
        } else {
            forminputbyuser = {
                proposerName: self.getLifeAssuredTitle() + " " + self.fName() + " " + self.LName(),
                age: self.getCalculatedAge(),
                gender: self.getLAGender(),
                premiumFrequency: self.getPremiumFrequency(),
                planOption: self.getPlanOption(),
                policyTerm: self.getPolicyTerm(),
                sumAssured: self.getSumAssured(),
                quotationNumber: quotNumber,
                staffDiscount: staffDiscount,
                PlanName: self.productDetails.title,
                CustTitle: self.getLifeAssuredTitle(),
                CustFirstName: self.fName(),
                CustMiddleName: self.MName(),
                CustLastName: self.LName(),
                CustMobile: self.getMobileNo(),
                CustEmailID: self.getEmail(),
                LaDOB: getDDMMYYYY(self.getDOB()),
                ProposerDOB: "",
                BasicSA: self.getSumAssured(),
                Frequency: self.getPremiumFrequency(),
                PolicyTerm: self.getPolicyTerm(),
                PremPayingTerm: '0',
                PlanCode: self.productDetails.productCode,
                KFC: getKerlaDiscount() ? "Y" : "N"
            };
        }

        self.showLoader();
        /*  callServiceHits('getPremiumSampoornCancerSuraksha', '', '', userID,
                 userMail, userMobile, userAuth)
             .then((resolve) => {
                 console.log(resolve);
             }).catch((reject) => {
                 console.log(reject);
             }); */
        let getXML = getInputXML(forminputbyuser);
        ApiCallService('/getPremiumSampoornCancerSuraksha', body, '<SampoornCancerSuraksha>', '</SampoornCancerSuraksha>', true).then((data) => {
            self.hideLoader();
            data = data.SampoornCancerSuraksha;
            data.productDetails = self.productDetails;
            switch (self.getPlanOption()) {
                case "Standard":
                    premiumAmt = data.PremiumWithServTax_Standard;

                    break;
                case "Classic":
                    premiumAmt = data.PremiumWithServTax_Classic;
                    break;
                case "Enhanced":
                    premiumAmt = data.PremiumWithServTax_Enhanced;
                    break;
            }
            forminputbyuser.TotalPremAmt = premiumAmt;
            var stringifyJson = JSON.stringify(data);
            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                premiumCalcXMLResponse = premiumCalcXMLResponse + "</SampoornCancerSuraksha>";
                var remaningOutput = `<?xml version='1.0' encoding='utf-8' ?>` + premiumCalcXMLResponse;
                let escapedBIOutput = escapeInputHTML(remaningOutput);
                sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.
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
                    //createPDFGeneralMethod(this.productDetails, data, forminputbyuser)
                } else if (status === 'No') {
                    sessionStorage.setItem("premiumCalcResponse", stringifyJson);
                    window.location.href = "../../PremiumCalSuccess/success.html";
                }
            }
        }).catch((error) => {
            console.log(" in error ", error);
            alert("Server Error, Please try again")
            self.hideLoader();
        });
    }).catch((message) => {
        console.log(message)
        alert("Unable to generate quotation number");
        hideLoader();
    });
}

function getInputXML(forminputbyuser) {
    console.log("DOB = ", self.getProposerDOB())
    var inputVal = "";

    inputVal += `<?xml version='1.0' encoding='utf-8' ?><sampoorncancersuraksha>`;

    inputVal += `<LifeAssured_title>${self.getLifeAssuredTitle()}</LifeAssured_title>`;
    inputVal += `<LifeAssured_firstName>${self.fName()}</LifeAssured_firstName>`;
    inputVal += `<LifeAssured_middleName>${self.MName()}</LifeAssured_middleName>`;
    inputVal += `<LifeAssured_lastName>${self.LName()}</LifeAssured_lastName>`;
    inputVal += `<LifeAssured_DOB>${getDDMMYYYY(self.getDOB())}</LifeAssured_DOB>`;
    inputVal += `<LifeAssured_age>${self.getCalculatedAge()}</LifeAssured_age>`;
    inputVal += `<gender>${self.getLAGender()}</gender>`;

    inputVal += `<proposer_title>${(this.getCalculatedAge() < 18 ? self.getProposerTitle() : "")}</proposer_title>`;
    inputVal += `<proposer_firstName>${this.getCalculatedAge() < 18 ? self.proposerfName() : ""}</proposer_firstName>`;
    inputVal += `<proposer_middleName>${this.getCalculatedAge() < 18 ? self.proposerMName() : ""}</proposer_middleName>`;
    inputVal += `<proposer_lastName>${this.getCalculatedAge() < 18 ? self.proposerLName() : ""}</proposer_lastName>`;
    inputVal += `<proposer_DOB>${self.getProposerDOB() != '' ? getDDMMYYYY(self.getProposerDOB()) : ''}</proposer_DOB>`;
    inputVal += `<proposer_age>${this.getCalculatedAge() < 18 ? self.getCalculatedProposerAge() : ""}</proposer_age>`;
    inputVal += `<proposer_gender>${this.getCalculatedAge() < 18 ? self.getProposerGender() : ""}</proposer_gender>`;

    inputVal += `<product_name>${product_name}</product_name>`;
    inputVal += `<product_Code>${product_Code}</product_Code>`;
    inputVal += `<product_UIN>${product_UIN}</product_UIN>`;
    inputVal += `<product_cateogory>${product_cateogory}</product_cateogory>`;
    inputVal += `<product_type>${product_type}</product_type>`;

    inputVal += `<proposer_Is_Same_As_Life_Assured>${proposer_Is_Same_As_Life_AssuredVar}</proposer_Is_Same_As_Life_Assured>`;

    inputVal += `<isJKResident>false</isJKResident>`;
    inputVal += `<isStaff>${self.getIsStaff()}</isStaff>`;
    inputVal += `<age>${self.getCalculatedAge()}</age>`;
    inputVal += `<plan>${self.getPlanOption()}</plan>`;

    inputVal += `<policyTerm>${self.getPolicyTerm()}</policyTerm>`;

    inputVal += `<premFreq>${self.getPremiumFrequency()}</premFreq>`;
    inputVal += `<sumAssured>${self.getSumAssured()}</sumAssured>`;

    inputVal += `<Product_Cat></Product_Cat>`;
    inputVal += `<KFC>${forminputbyuser.KFC}</KFC>`;

    inputVal += `</sampoorncancersuraksha>`;
    let escapedHTML = escapeInputHTML(inputVal);
    sessionStorage.setItem("BIInput", escapedHTML);
    return escapedHTML;
}

function formatDates(date) {
    var arrDate = date.split("-");

    if (arrDate != null) {
        return arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
    }
}

function staffDiscount() {}