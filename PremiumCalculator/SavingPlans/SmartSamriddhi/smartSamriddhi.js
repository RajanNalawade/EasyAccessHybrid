window.onload = function () {
    this.ready();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails;

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
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
    policyListElement = document.forms["smartSamriddhiForm"]["policyTerm"];
    policyListElement.value = policyTerm;

    premiumPayingTermElement = document.forms["smartSamriddhiForm"]["premiumPayingTerm"];
    premiumPayingTermElement.value = premiumPayingTerm;

    premiumPaymentModeElement = document.forms["smartSamriddhiForm"]["premiumPaymentMode"];
    for (i = 0; i < premiumPayingFreq.length; i++) {
        premiumPaymentModeElement.add(new Option(premiumPayingFreq[i], premiumPayingFreq[i]));
    }
}

/* ***************** DOM EVENTS **************** */
function validateGender() {
    var gender = document.forms["smartSamriddhiForm"]["gender"].value;
    if (gender !== "Female" && gender !== "Male") {
        document.getElementById('genderErrId').style.display = "block";
        document.getElementById('genderErrId').innerHTML = "Please select your gender.";
        return false;
    } else {
        document.getElementById('genderErrId').style.display = "none";
        return true
    }
}

function calculateAge(birthday) {
    var age = getAgeFromBirthdate(getDDMMYYYY(birthday));
    document.forms["smartSamriddhiForm"]["age"].innerHTML = age;
    document.forms["smartSamriddhiForm"]["age"].value = age;
    if (age < minAgeLimit || age > maxAgeLimit) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        return true;
    }
}

function validatePremiumAmount() {
    let premiumAmount = this.getPremiumAmount();
    if (isNaN(premiumAmount) || premiumAmount === "" || premiumAmount === undefined || premiumAmount === null) {
        document.getElementById('premiumAmtErrKey').style.display = "block";
        document.getElementById('premiumAmtErrKey').innerHTML = "Please enter Premium Amount in Rs.";
        return false;
    } else if (Number(premiumAmount) < minPremiumAmt) {
        document.getElementById('premiumAmtErrKey').style.display = "block";
        document.getElementById('premiumAmtErrKey').innerHTML = `Premium Amount should not be less than ${new Intl.NumberFormat('en-IN').format(minPremiumAmt)}.`;
        return false;
    } else if (Number(premiumAmount) > maxPremiumAmt) {
        document.getElementById('premiumAmtErrKey').style.display = "block";
        document.getElementById('premiumAmtErrKey').innerHTML = `Premium Amount should not be greater than ${new Intl.NumberFormat('en-IN').format(maxPremiumAmt)}.`;
        return false;
    } else if (Number(premiumAmount) % 1000 !== 0) {
        document.getElementById('premiumAmtErrKey').style.display = "block";
        document.getElementById('premiumAmtErrKey').innerHTML = "Premium Amount should be multiple of 1000";
        return false;
    } else {
        document.getElementById('premiumAmtErrKey').style.display = "none";
        return true;
    }
}

/* ***********************   GETTERS ************************* */

function getLifeAssuredTitle()
{
 return document.forms["smartSamriddhiForm"]["LifeAssuredTitle"].value;
}

function fName() {
    return document.forms["smartSamriddhiForm"]["first_name"].value;
}

function MName() {
    return document.forms["smartSamriddhiForm"]["middle_name"].value;
}

function LName() {
    return document.forms["smartSamriddhiForm"]["last_name"].value;
}

function getAge() {
    return parseInt(document.forms["smartSamriddhiForm"]["age"].value, 10);
}

function getGender() {
    return document.forms["smartSamriddhiForm"]["gender"].value;
}

function getEmail() {
    return document.forms["smartSamriddhiForm"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["smartSamriddhiForm"]["confirmEmail"].value;
}

function getDOB() {
    return document.forms["smartSamriddhiForm"]["dob"].value;
}

function getMobileNo() {
    return document.forms["smartSamriddhiForm"]["mobile"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["smartSamriddhiForm"]["policyTerm"].value, 10);
}

function getPremiumAmount() {
    return parseInt(document.forms["smartSamriddhiForm"]["premiumAmount"].value, 10);
}

function getPremiumPaymentMode() {
    return document.forms["smartSamriddhiForm"]["premiumPaymentMode"].value;
}

function getPremiumPayingTerm() {
    return document.forms["smartSamriddhiForm"]["premiumPayingTerm"].value;
}

/* ******************************  FORM VALIDATION & SUBMIT **************************** */
function validatForm() {
    if (smartSamriddhiForm.checkValidity() && this.validateGender() && this.validateConfirmEmail() &&
        this.calculateAge(self.getDOB()) && this.validateMobileNo(self.getMobileNo()) && this.validatePremiumAmount()) {
        this.calculatePremiumAPICall(); // form valid
    }
}

function calculatePremiumAPICall() {
    let xmlBodyParam = `<getPremiumSmartSamriddhi xmlns="http://tempuri.org/">
      <age>${this.getAge()}</age>
      <gender>${this.getGender()}</gender>
      <premfreq>${this.getPremiumPaymentMode()}</premfreq>
      <premAmt>${this.getPremiumAmount()}</premAmt>
      <IsBackdate></IsBackdate>
      <Backdate></Backdate>
      <IsMines></IsMines>
    </getPremiumSmartSamriddhi>`;

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
   /*      let staffDiscount = "";
        if (self.getIsStaff() === "true") {
            staffDiscount = "Yes";
        } else {
            staffDiscount = "No";
        } */

        let forminputbyuser = {
            proposerName: self.fName() + " " + self.LName(),
            age: self.getAge(),
            gender: self.getGender(),
            premiumPayingMode:self.getPremiumPaymentMode(),
            premiumPayingTerm: self.getPremiumPayingTerm(),
            policyTerm: self.getPolicyTerm(),
            premiumAmount: self.getPremiumAmount(),
            quotationNumber: quotNumber,
            PlanName: self.productDetails.title,
            CustTitle: self.getLifeAssuredTitle(),
            CustFirstName: self.fName(),
            CustMiddleName: self.MName(),
            CustLastName: self.LName(),
            CustMobile: self.getMobileNo(),
            CustEmailID: self.getEmail(),
            LaDOB: self.getDOB(),
            ProposerDOB: '',
           // BasicSA: '0',
            TotalPremAmt: self.getPremiumAmount(),
            Frequency: self.getPremiumPaymentMode(),
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: self.getPremiumPayingTerm(),
           // PlanCode: self.productDetails.productCode
          PlanCode:  this.productDetails.productCode
            // // staffDiscount: staffDiscount
        };
        let xmlda=getInputXML(forminputbyuser);
        self.ApiCallService('/getPremiumSmartSamriddhi', body, '<SmartSamriddhi>', '</SmartSamriddhi>',true).then((data) => {
            self.hideLoader();
            data = data.SmartSamriddhi;
            data.productDetails = self.productDetails;
            forminputbyuser.BasicSA= data.sumAssured;
            var stringifyJson = JSON.stringify(data);
            sessionStorage.setItem('premiumCalcResponse',stringifyJson);

            if(sessionStorage.premiumCalcOutput){
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex =  premiumCalcXMLResponse.indexOf(`</guarntdSurrndrVal${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex+`</guarntdSurrndrVal${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput,"");
                console.log("remaningOutput ",remaningOutput);
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
                        } else{
                            alert("Something Went Wrong")
                        }

                    });

                   // createPDFGeneralMethod(this.productDetails, data, forminputbyuser)
                } else if (status === 'No') {
                    window.location.href = "./../../PremiumCalSuccess/success.html";
                }
            }
            // window.location.href = "./../../PremiumCalculatorSuccess/success.html?data=" + stringifyJson;
        }).catch((error) => {
            console.log(" in error ", error);
            self.hideLoader();
        });
    }).catch((message) => {
        console.log(message);
        alert("Unable to generate quotation number");
        hideLoader();
    });
}

function getInputXML(forminputbyuser)
{
    var inputVal="";
    inputVal +=`<?xml version='1.0' encoding='utf-8' ?><smartsamriddhi>`;
    inputVal +=`<LifeAssured_title>${self.getLifeAssuredTitle()}</LifeAssured_title>`;
    inputVal +=`<LifeAssured_firstName>${self.fName()}</LifeAssured_firstName>`;
    inputVal +=`<LifeAssured_middleName>${self.MName()}</LifeAssured_middleName>`;
    inputVal +=`<LifeAssured_lastName>${self.LName()}</LifeAssured_lastName>`;
    inputVal +=`<LifeAssured_DOB>${self.getDOB()}</LifeAssured_DOB>`;
    inputVal +=`<LifeAssured_age>${self.getAge()}</LifeAssured_age>`;
    inputVal +=`<gender>${self.getGender()}</gender>`;

    inputVal +=`<proposer_title></proposer_title>`;
    inputVal +=`<proposer_firstName></proposer_firstName>`;
    inputVal +=`<proposer_middleName></proposer_middleName>`;
    inputVal +=`<proposer_lastName></proposer_lastName>`;
    inputVal +=`<proposer_DOB></proposer_DOB>`;
    inputVal +=`<proposer_age></proposer_age>`;
    inputVal +=`<proposer_gender></proposer_gender>`;

    inputVal +=`<product_name>${product_name}</product_name>`;
    inputVal +=`<product_Code>${product_Code}</product_Code>`;
    inputVal +=`<product_UIN>${product_UIN}</product_UIN>`;
    inputVal +=`<product_cateogory>${product_cateogory}</product_cateogory>`;
    inputVal +=`<product_type>${product_type}</product_type>`;

    inputVal +=`<proposer_Is_Same_As_Life_Assured>y</proposer_Is_Same_As_Life_Assured>`;

    inputVal +=`<isJKResident>"false"</isJKResident>`;
    inputVal +=`<isStaff>false</isStaff>`;
    inputVal +=`<age>${self.getAge()}</age>`;``
    inputVal +=`<gender>${self.getGender()}</gender>`;

    inputVal +=`<policyTerm>${self.getPolicyTerm()}</policyTerm>`;

    inputVal +=`<premFreq>${self.getPremiumPaymentMode()}</premFreq>`;
    inputVal +=`<premPayingTerm>${self.getPremiumPayingTerm()}</premPayingTerm>`;
    inputVal +=`<Product_Cat></Product_Cat>`;

    inputVal +=`<premiumAmount>${self.getPremiumAmount()}</premiumAmount>`;

    inputVal +=`<Product_Cat></Product_Cat>`;

    inputVal +=`</smartsamriddhi>`;
    let escapedHTML = escapeInputHTML(inputVal);
    sessionStorage.setItem("BIInput", escapedHTML);
   return escapedHTML;
}