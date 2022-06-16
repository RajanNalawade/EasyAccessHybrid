window.onload = function () {
    this.ready();
    // self.hideLoader();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails;

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    setKerlaDiscount();
    this.initializeData()
    this.initArrayList();
};

function initializeData() {
    //document.forms["poornaSurakshaForm"]["dob"].value = (new Date()).toISOString().substr(0, 10);

    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
    this.document.forms['poornaSurakshaForm']['isSmoker'].value = 'no';
}

function initArrayList() {
    policyListElement = document.forms["poornaSurakshaForm"]["policyTerm"];
    for (i = minPolicyTermLimit; i <= maxPolicyTermLimit; i = i + 5) {
        policyListElement.add(new Option(i, i));
    }

    premiumPaymentModeElement = document.forms["poornaSurakshaForm"]["premiumPaymentMode"];
    for (i = 0; i < premiumFrequencyList.length; i++) {
        premiumPaymentModeElement.add(new Option(premiumFrequencyList[i].title, premiumFrequencyList[i].value));
    }
}

function calculateAge(birthday) {
    var age = getAgeFromBirthdate(getDDMMYYYY(birthday));
    document.forms["poornaSurakshaForm"]["age"].innerHTML = age;
    document.forms["poornaSurakshaForm"]["age"].value = age;
    if (age < minAgeLimit || age > maxAgeLimit) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        return true;
    }
}

/* ***********************   GETTERS ************************* */
function getLifeAssuredTitle() {
    return document.forms["poornaSurakshaForm"]["LifeAssuredTitle"].value;
}

function fName() {
    return document.forms["poornaSurakshaForm"]["first_name"].value;
}

function MName() {
    return document.forms["poornaSurakshaForm"]["middle_name"].value;
}

function LName() {
    return document.forms["poornaSurakshaForm"]["last_name"].value;
}

function getStaffDisc() {

    var staffValue = document.forms["poornaSurakshaForm"]['staff_discount'].checked;
    return staffValue;
}

function getCalculatedAge() {
    return parseInt(document.forms["poornaSurakshaForm"]['age'].value, 10);
}

function getGender() {
    return document.forms["poornaSurakshaForm"]["gender"].value;
}

function getEmail() {
    return document.forms["poornaSurakshaForm"]['email'].value;
}

function getDOB() {
    return document.forms["poornaSurakshaForm"]['dob'].value;
}

function getConfirmEmail() {
    return document.forms["poornaSurakshaForm"]['confirmEmail'].value;
}


function getIsSmoker() {
    return document.forms["poornaSurakshaForm"]['isSmoker'].value;
}

function getMobileNo() {
    return document.forms["poornaSurakshaForm"]['mobile'].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["poornaSurakshaForm"]['policyTerm'].value, 10);
}

function getPremiumPaymentMode() {
    return document.forms["poornaSurakshaForm"]['premiumPaymentMode'].value;
}

function getPremiumPaymentModeTitle() {
    var index = document.forms["poornaSurakshaForm"]['premiumPaymentMode'].value;
    return premiumFrequencyList[index - 1].title;
}

function getSumAssured() {
    return parseInt(document.forms["poornaSurakshaForm"]['sumAssured'].value, 10);
}

/* **************************  OTHER FUNCTIONS ********************* */
function validateSumAssured() {
    var sumAssured = this.getSumAssured();
    if (isNaN(sumAssured) || sumAssured === undefined || sumAssured === null || sumAssured === '') {
        document.getElementById('sumAssuredErrKeyId').style.display = "block";
        document.getElementById('sumAssuredErrKeyId').innerHTML = 'Please enter sum assured.';
        return false;
    } else if (sumAssured % 100000 != 0) {
        document.getElementById('sumAssuredErrKeyId').style.display = "block";
        document.getElementById('sumAssuredErrKeyId').innerHTML = `Sum Assured should be in multiples of ${new Intl.NumberFormat('en-IN').format(100000)}.`;
        return false;
    } else if (sumAssured < 2000000 || sumAssured > 25000000) {
        document.getElementById('sumAssuredErrKeyId').style.display = "block";
        document.getElementById('sumAssuredErrKeyId').innerHTML = `Sum Assured should be between ${new Intl.NumberFormat('en-IN').format(2000000)} to ${new Intl.NumberFormat('en-IN').format(25000000)}`;
        return false;
    } else {
        document.getElementById('sumAssuredErrKeyId').style.display = "none";
        return true;
    }
}

function validateMaturity() {
    if (this.getAgeFromBirthdate(self.getDOB()) + this.getPolicyTerm() > 75) {
        document.getElementById('maturityAgeErrId').style.display = "block";
        document.getElementById('maturityAgeErrId').innerHTML = "Maturity Age Cannot be greater than 75.";
        return false;
    } else {
        document.getElementById('maturityAgeErrId').style.display = "none";
        return true;
    }
}

function valTerm() {
    if (self.getPolicyTerm() < minPolicyTermLimit ||
        self.getPolicyTerm() > maxPolicyTermLimit) {
        document.getElementById("policyTermErrId").style.display = "block"
        document.getElementById('policyTermErrId').innerHTML = "Enter Basic Term Between 15 and 30";
        return false;
    }
    document.getElementById("policyTermErrId").style.display = "none"
    return true;
}

function valSmoker() {
    if (self.getIsSmoker() === undefined || self.getIsSmoker() === null || self.getIsSmoker() === '') {
        document.getElementById("smokerErrId").style.display = "block"
        document.getElementById('smokerErrId').innerHTML = "Please select if Life Assured is Smoker or Not";
        return false;
    }
    document.getElementById("smokerErrId").style.display = "none";
    return true;
}
/* ******************************  FORM VALIDATION & SUBMIT **************************** */
function validatForm() {
    if (poornaSurakshaForm.checkValidity() && self.valSmoker() && self.validateGender("") && this.validateConfirmEmail() &&
        this.calculateAge(self.getDOB()) && this.validateMobileNo(self.getMobileNo()) && self.valTerm() &&
        this.validateSumAssured() && this.validateMaturity()) {
        this.calculatePremiumAPICall(); // form valid
    }
}

function calculatePremiumAPICall() {

    let xmlBodyParam = `<getPremiumPoornSuraksha xmlns="http://tempuri.org/">
    <isStaff>${self.getStaffDisc()}</isStaff>
    <isSmoker>${(self.getIsSmoker() == "yes" ? "Smoker" : "Non-Smoker")}</isSmoker>
    <age>${this.getCalculatedAge()}</age>
    <gender>${self.getGender()}</gender>
    <policyTerm>${self.getPolicyTerm()}</policyTerm>
    <premFreq>${self.getPremiumPaymentModeTitle()}</premFreq>
    <sumAssured>${self.getSumAssured()}</sumAssured>
    <KFC>${getKerlaDiscount()}</KFC>
  </getPremiumPoornSuraksha>`;

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
        if (self.getStaffDisc()) {
            staffDiscount = "Yes";
        } else {
            staffDiscount = "No";
        }

        let isSmoker = "";
        if (self.getIsSmoker() === "yes") {
            isSmoker = "Yes";
        } else {
            isSmoker = "No";
        }

        let forminputbyuser = {
            proposerName: self.getLifeAssuredTitle() + " " + self.fName() + " " + self.MName() + " " + self.LName(),
            age: self.getCalculatedAge(),
            gender: self.getGender(),
            premiumPaymentMode: this.getPremiumPaymentModeTitle(),
            policyTerm: self.getPolicyTerm(),
            sumAssured: self.getSumAssured(),
            quotationNumber: quotNumber,
            staffDiscount: staffDiscount,
            isSmoker: isSmoker,
            PlanName: self.productDetails.title,
            CustTitle: self.getLifeAssuredTitle(),
            CustFirstName: self.fName(),
            CustMiddleName: self.MName(),
            CustLastName: self.LName(),
            CustMobile: self.getMobileNo(),
            CustEmailID: self.getEmail(),
            LaDOB: getDDMMYYYY(self.getDOB()),
            ProposerDOB: '',
            BasicSA: self.getSumAssured(),
            TotalPremAmt: '0',
            Frequency: self.getPremiumPaymentMode(),
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: '0',
            PlanCode: '',
            KFC: getKerlaDiscount() ? "Y" : "N"

        };
        let inputxml = getInputXML(forminputbyuser);
        //console.log("cxvcb ",inputxml);

        /*   //self.showLoader();
          callServiceHits('getPremiumPoornSuraksha', '', '', userID,
                  userMail, userMobile, userAuth)
              .then((resolve) => {
                  console.log(resolve);
              }).catch((reject) => {
                  console.log(reject);
              }); */
        self.showLoader();

        ApiCallService('/getPremiumPoornSuraksha', body, '<PoornaSuraksha>', '</PoornaSuraksha>', true).then((data) => {
            self.hideLoader();
            data = data.PoornaSuraksha;

            var error = data.errCode;
            if (error != undefined && error == 1) {
                if (data.minPremError != undefined) {
                    alert(data.minPremError)
                    return;
                }
            }

            data.productDetails = self.productDetails;
            forminputbyuser.TotalPremAmt = data.totalBasicPremWithoutDisc;
            var stringifyJson = JSON.stringify(data);

            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</GuaranteedCriticalillnessBenifit${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</GuaranteedCriticalillnessBenifit${getPolicyTerm()}`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                remaningOutput = remaningOutput + "</PoornaSuraksha>";
                remaningOutput = `<?xml version='1.0' encoding='utf-8' ?>` + remaningOutput;
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
                } else if (status === 'No') {
                    sessionStorage.setItem('premiumCalcResponse', stringifyJson);
                    window.location.href = "../../PremiumCalSuccess/success.html";
                }
            }
        }).catch((error) => {
            console.log(" in error ", error);
            self.hideLoader();
        });
    }).catch((message) => {
        console.log(message)
        alert("Unable to generate quotation number")
        hideLoader();
    });
}

function getInputXML(forminputbyuser) {
    var inputVal = "";
    inputVal += `<?xml version='1.0' encoding='utf-8' ?><PoornaSuraksha>`;
    inputVal += `<LifeAssured_title>${self.getLifeAssuredTitle()}</LifeAssured_title>`;
    inputVal += `<LifeAssured_firstName>${self.fName()}</LifeAssured_firstName>`;
    inputVal += `<LifeAssured_middleName>${self.MName()}</LifeAssured_middleName>`;
    inputVal += `<LifeAssured_lastName>${self.LName()}</LifeAssured_lastName>`;
    inputVal += `<LifeAssured_DOB>${getDDMMYYYY(self.getDOB())}</LifeAssured_DOB>`;
    inputVal += `<LifeAssured_age>${self.getCalculatedAge()}</LifeAssured_age>`;
    inputVal += `<gender>${self.getGender()}</gender>`;

    inputVal += `<proposer_title></proposer_title>`;
    inputVal += `<proposer_firstName></proposer_firstName>`;
    inputVal += `<proposer_middleName></proposer_middleName>`;
    inputVal += `<proposer_lastName></proposer_lastName>`;
    inputVal += `<proposer_DOB></proposer_DOB>`;
    inputVal += `<proposer_age></proposer_age>`;
    inputVal += `<proposer_gender></proposer_gender>`;

    inputVal += `<product_name>${product_name}</product_name>`;
    /* parivartan changes */
    inputVal += `<product_Code>${product_Code}</product_Code>`;
    inputVal += `<product_UIN>${product_UIN}</product_UIN>`;
    inputVal += `<product_cateogory>${product_cateogory}</product_cateogory>`;
    inputVal += `<product_type>${product_type}</product_type>`;
    /* end */
    inputVal += `<proposer_Is_Same_As_Life_Assured>Y</proposer_Is_Same_As_Life_Assured>`;
    inputVal += `<isStaff>${self.getStaffDisc()}</isStaff>`;
    inputVal += `<isSmoker>${self.getIsSmoker() === "yes" ? "Smoker" : "Non-Smoker"}</isSmoker>`;
    /*inputVal +=`<isJKResident>" + String.valueOf(isJKResident)
            + "</isJKResident>`;*/
    inputVal += `<age>${self.getCalculatedAge()}</age>`;
    inputVal += `<policyTerm>${self.getPolicyTerm()}</policyTerm>`;
    inputVal += `<premPayTerm>${self.getPolicyTerm()}</premPayTerm>`;
    inputVal += `<premFreq>${forminputbyuser.premiumPaymentMode}</premFreq>`;
    inputVal += `<sumAssured>${self.getSumAssured()}</sumAssured>`;
    inputVal += `<plan></plan>`;

    inputVal += `<Product_Cat>${product_cateogory}</Product_Cat>`;
    inputVal += `<KFC>${forminputbyuser.KFC}</KFC>`;
    inputVal += `</PoornaSuraksha>`;
    let escapedHTML = escapeInputHTML(inputVal);
    sessionStorage.setItem("BIInput", escapedHTML);
    return escapedHTML;
}

function validateGender(formElementName) {
    //console.log("formElementName",formElementName)
    var laGender = document.forms["poornaSurakshaForm"]["gender"].value;

    document.getElementById("LifeAssuredTitle").options[0].disabled = false;
    document.getElementById("LifeAssuredTitle").options[1].disabled = false;
    document.getElementById("LifeAssuredTitle").options[2].disabled = false;

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