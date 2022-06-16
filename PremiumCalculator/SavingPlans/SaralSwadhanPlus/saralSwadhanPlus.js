window.onload = function () {
    this.ready();
    // self.hideLoader();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails;

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    setKerlaDiscount();
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
};

function initializeData() {
    // document.forms["saralSwadhanPlusForm"]["dob"].value = (new Date()).toISOString().substr(0, 10);
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title;
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
}
//function getPremiumPaymentMode() {
//    var index = document.forms["saralSwadhanPlusForm"]["premiumPaymentMode"].value;
//    return premiumPaymentModeList[index];
//}

function getpremiumFrequency() {
    return document.forms["saralSwadhanPlusForm"]["premiumFrequency"].value;
}


/* function getSumAssured() {
    return parseInt(document.forms["saralSwadhanPlusForm"]["sumAssured"].value, 10);
} */

function getTitle() {
    return document.forms["saralSwadhanPlusForm"]["LifeAssuredTitle"].value;
}

function fName() {
    return document.forms["saralSwadhanPlusForm"]["first_name"].value;
}

function MName() {
    return document.forms["saralSwadhanPlusForm"]["middle_name"].value;
}

function LName() {
    return document.forms["saralSwadhanPlusForm"]["last_name"].value;
}

function calculateAge(birthday) {

    var age = this.getAgeFromBirthdate(getDDMMYYYY(birthday));
    document.forms["saralSwadhanPlusForm"]["age"].innerHTML = age;
    document.forms["saralSwadhanPlusForm"]["age"].value = age;
    console.log(document.forms["saralSwadhanPlusForm"]["age"].value);
    if (age < minAgeLimit || age > maxAgeLimit) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        // age < 18 ? document.getElementById('divProposer').style.display = "block" : document.getElementById('divProposer').style.display = "none";
        return true;
    }
}

function getLifeAssuredTitle() {
    return document.forms["saralSwadhanPlusForm"]["LifeAssuredTitle"].value;
}

function validateEmailIds() {
    var email = document.forms["saralSwadhanPlusForm"]["email"].value;
    var cEmail = document.forms["saralSwadhanPlusForm"]["confirmEmail"].value;
    if (email != undefined || email != null || email != "") {
        if (email != cEmail) {
            document.getElementById('confirmEmailErrId').style.display = "block";
            document.getElementById('confirmEmailErrId').innerHTML = "Email Id Does Not Match";
            return false;
        } else {
            document.getElementById('confirmEmailErrId').style.display = "none";
            return true
        }
    }
    return true;
}

function valMaturityAge() {
    var age = this.getCalculatedAge();
    var policyTerm = this.getPolicyTerm();

    if ((age + policyTerm) > 70) {
        document.getElementById('maturityAgeErrId').style.display = 'block';
        document.getElementById('maturityAgeErrId').innerHTML = 'Maturity age cannot be greater than 70';
        return false;
    } else {
        document.getElementById('maturityAgeErrId').style.display = 'none';
        return true;
    }

}

function validatePremiumAmount() {
    var premAmount = this.getPremiumAmount();

    if (isNaN(premAmount) || premAmount === undefined || premAmount === null || premAmount === '') {
        document.getElementById('premiumAmountErrId').style.display = 'block';
        document.getElementById('premiumAmountErrId').innerHTML = 'Please enter premium amount in Rs.';
        return false;
    } else if ((premAmount % 500) != 0) {
        document.getElementById('premiumAmountErrId').style.display = 'block';
        document.getElementById('premiumAmountErrId').innerHTML = 'Premium Amount should be multiple of 500';
        return false;
    } else if (premAmount < 1500) {
        document.getElementById('premiumAmountErrId').style.display = 'block';
        document.getElementById('premiumAmountErrId').innerHTML = 'Premium should not be less than 1500';
        return false;
    } else if (premAmount > 5000) {
        document.getElementById('premiumAmountErrId').style.display = 'block';
        document.getElementById('premiumAmountErrId').innerHTML = `Premium should not be greater than 5000`;
        return false;
    } else {
        document.getElementById('premiumAmountErrId').style.display = 'none';
        return true;
    }

}

function getCalculatedAge() {
    return parseInt(document.forms["saralSwadhanPlusForm"]["age"].value, 10);
}

function getGender() {
    return document.forms["saralSwadhanPlusForm"]["gender"].value;
}

function getEmail() {
    return document.forms["saralSwadhanPlusForm"]["email"].value;
}

function getConfirmEmail() {
    return document.forms["saralSwadhanPlusForm"]["confirmEmail"].value;
}

function getDOB() {
    return document.forms["saralSwadhanPlusForm"]["dob"].value;
}

function getMobileNo() {
    return document.forms["saralSwadhanPlusForm"]["mobile"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["saralSwadhanPlusForm"]["policyTerm"].value, 10);
}

// function getPremiumFrequency() {
//     console.log(",freq", document.forms["saralSwadhanPlusForm"]["premiumFrequency"].value);
//     return document.forms["saralSwadhanPlusForm"]["premiumFrequency"].value;
// }

function getPremiumAmount() {
    return parseInt(document.forms["saralSwadhanPlusForm"]["premiumAmount"].value, 10);
}

/* ******************************  FORM VALIDATION & SUBMIT **************************** */
function validatForm() {

    if (saralSwadhanPlusForm.checkValidity() && this.validateGender("") && this.validateEmailIds() &&
        this.calculateAge(self.getDOB()) && this.validateMobileNo(self.getMobileNo()) &&
        this.validatePremiumAmount() && this.valMaturityAge()) {
        console.log(" submit ");

        this.calculatePremiumAPICall(); // form valid
    }
}

function calculatePremiumAPICall() {

    /*   var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', serviceURL + '/getPremiumSaralSwadhanPlus', true); */

    let xmlBodyParam = `<getPremiumSaralSwadhanPlus xmlns="http://tempuri.org/">
    <age>${self.getCalculatedAge()}</age>
    <gender>${self.getGender()}</gender>
    <policyTerm>${self.getPolicyTerm()}</policyTerm>
    <premFreq>${self.getpremiumFrequency()}</premFreq>
    <sumAssured>${self.getPremiumAmount()}</sumAssured>
  </getPremiumSaralSwadhanPlus>`;

    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        ${xmlBodyParam}
                    </soap:Body>
                </soap:Envelope>`;

    //console.log(body);
    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {
        let forminputbyuser = {
            proposerName: self.getTitle() + " " + self.fName() + " " + self.MName() + " " + self.LName(),
            age: self.getCalculatedAge(),
            gender: self.getGender(),
            premiumAmount: self.getPremiumAmount(),
            premiumFrequency: self.getpremiumFrequency(),
            policyTerm: self.getPolicyTerm(),
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
            BasicSA: '',
            TotalPremAmt: self.getPremiumAmount(),
            Frequency: self.getpremiumFrequency(),
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: '0',
            PlanCode: 'SSWAP',
            KFC: getKerlaDiscount() ? "Y" : "N",
            plans: "",
            userType: getUserType()
        }
        self.showLoader();
        let inputXml = getInputXML(forminputbyuser);
        /*    callServiceHits('getPremiumSaralSwadhanPlus', '', '', getUserCode(),"", "", userAuth)
              .then((resolve) => {
                  console.log(resolve);
              }).catch((reject) => {
                  console.log(reject);
              }); */
        ApiCallService('/getPremiumSaralSwadhanPlus', body, '<SaralSwadhanPlus>', '</SaralSwadhanPlus>').then((data) => {
            self.hideLoader();
            data = data.SaralSwadhanPlus;
            forminputbyuser.BasicSA = data.sumAssured;
            data.productDetails = self.productDetails;
            var stringifyJson = JSON.stringify(data);
            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</benefitPaybleAtMaturity${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</benefitPaybleAtMaturity${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                var index = forminputbyuser.PolicyTerm;
                var benefitPaybleAtMaturity = parseXmlTag(premiumCalcXMLResponse, "benefitPaybleAtMaturity" + index + "");
                var benefitPaybleAt = "<benefitPaybleAtMaturity" + index + ">" + benefitPaybleAtMaturity + "</benefitPaybleAtMaturity" + index + ">";
                remaningOutput = remaningOutput + benefitPaybleAt + "</SaralSwadhanPlus>";
                let escapedBIOutput = escapeInputHTML("<?xml version='1.0' encoding='utf-8' ?>" + remaningOutput);
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
                    sessionStorage.setItem("premiumCalcResponse", stringifyJson);
                    window.location.href = "./../../PremiumCalSuccess/success.html";
                }
            }
        }).catch((error) => {
            console.log(" in error ", error);
            self.hideLoader();
        });
    }).catch((error) => {
        self.hideLoader();
        alert("Unable to generate quotation number")
        console.log(error);
    });
}

function getInputXML(forminputbyuser) {
    var inputVal = "";
    inputVal += "<?xml version='1.0' encoding='utf-8' ?><saralswadhanplus>";

    inputVal += `<LifeAssured_title>${self.getLifeAssuredTitle()}</LifeAssured_title>`;
    inputVal += `<LifeAssured_firstName>${self.fName()}</LifeAssured_firstName>`;
    inputVal += `<LifeAssured_middleName>${self.MName()}</LifeAssured_middleName>`;
    inputVal += `<LifeAssured_lastName>${self.LName()}</LifeAssured_lastName>`;
    inputVal += `<LifeAssured_DOB>${convertDate(self.getDOB())}</LifeAssured_DOB>`;
    inputVal += `<LifeAssured_age>${self.getCalculatedAge()}</LifeAssured_age>`;
    // inputVal +=`<gender>" + LifeAssured_gender + "</gender>`;

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

    inputVal += `<isStaff>false</isStaff>`;
    inputVal += `<age>${self.getCalculatedAge()}</age>`;
    inputVal += `<age>${self.getCalculatedAge()}</age>`;
    inputVal += `<gender>${self.getGender()}</gender>`; // inputVal +=`<gender>"

    inputVal += `<policyTerm>${self.getPolicyTerm()}</policyTerm>`;
    inputVal += `<premFreq>${self.getpremiumFrequency()}</premFreq>`;
    inputVal += `<premiumAmount>${self.getPremiumAmount()}</premiumAmount>`;
    inputVal += `<Product_Cat></Product_Cat>`;
    inputVal += `<KFC>${forminputbyuser.KFC}</KFC>`;
    inputVal += `</saralswadhanplus>`;

    let escapedHTML = escapeInputHTML(inputVal);
    sessionStorage.setItem("BIInput", escapedHTML);
    return inputVal;
}


function validateGender(formElementName) {
    //console.log("formElementName",formElementName)
    var laGender = document.forms["saralSwadhanPlusForm"]["gender"].value;
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