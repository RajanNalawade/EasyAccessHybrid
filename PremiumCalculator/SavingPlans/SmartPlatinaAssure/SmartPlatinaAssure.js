window.onload = function () {
    this.ready();
    self.hideLoader();
};
/* *************  VARIABLE DECLARATION ************** */
var productDetails;

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    console.log(" product ", this.productDetails);
    setKerlaDiscount();
    this.initializeData()
    this.initArrayList();
};

function initializeData() {

    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
}

function initArrayList() {
    policyListElement = document.forms["smartPlatinaAssureForm"]["policyTerm"];
    for (i = 0; i < policyTermList.length; i++) {
        policyListElement.add(new Option(policyTermList[i].title, policyTermList[i].value));
    }

    premiumFrequencyElement = document.forms["smartPlatinaAssureForm"]["premiumFrequency"];
    for (i = 0; i < premiumFrequencyList.length; i++) {
        premiumFrequencyElement.add(new Option(premiumFrequencyList[i].title, premiumFrequencyList[i].value));
    }

    premiumPayingTermElement = document.forms["smartPlatinaAssureForm"]["premiumPayingTerm"];
    for (i = 0; i < premiumPayingTermList.length; i++) {
        premiumPayingTermElement.add(new Option(premiumPayingTermList[i].title, premiumPayingTermList[i].value));
    }


    var laGender = document.forms["smartPlatinaAssureForm"]["gender"].value;
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
        $("#transgender_label").css({
            "background": "url('../../../images/transgender.png')",
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
        $("#transgender_label").css({
            "background": "url('../../../images/transgender.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
    } else if (laGender === "Third Gender") {
        $("#transgender_label").css({
            "background": "url('../../../images/transgender_active.png')",
            "width": "100px",
            "height": "100px",
            "background-size": "cover"
        });
        $("#male_label").css({
            "background": "url('../../../images/male.png')",
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
    }
    onWishToBackdateUpdate((this.getWishToBackdate() ? 'yes' : "no"));
}

function calculateAge(birthday) {
    var age = getAgeFromBirthdate(getDDMMYYYY(birthday));
    console.log(age)
    document.forms["smartPlatinaAssureForm"]["age"].innerHTML = age;
    document.forms["smartPlatinaAssureForm"]["age"].value = age;
    if (age < minAgeLimit || age > maxAgeLimit) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        return true;
    }
}

function getLifeAssuredTitle() {
    return document.forms["smartPlatinaAssureForm"]["smartPlatinaAssureTitle"].value;
}

function fName() {
    return document.forms["smartPlatinaAssureForm"]["first_name"].value;
}

function MName() {
    return document.forms["smartPlatinaAssureForm"]["middle_name"].value;
}

function LName() {
    return document.forms["smartPlatinaAssureForm"]["last_name"].value;
}

function getStaffDisc() {

    var staffValue = document.forms["smartPlatinaAssureForm"]['staff_discount'].checked;
    return staffValue;
}

function getCalculatedAge() {
    return parseInt(document.forms["smartPlatinaAssureForm"]['age'].value, 10);
}

function getGender() {
    return document.forms["smartPlatinaAssureForm"]["gender"].value;
}

function getEmail() {
    return document.forms["smartPlatinaAssureForm"]['email'].value;
}

function getDOB() {
    return document.forms["smartPlatinaAssureForm"]['dob'].value;
}

function getConfirmEmail() {
    return document.forms["smartPlatinaAssureForm"]['confirmEmail'].value;
}

function getMobileNo() {
    return document.forms["smartPlatinaAssureForm"]['mobile'].value;
}

function getPolicyTerm() {
    // var index = document.forms["smartPlatinaAssureForm"]['policyTerm'].value;
    return document.forms["smartPlatinaAssureForm"]['policyTerm'].value;
    //console.log(policyTermList[index].title)
    // return policyTermList[index].title;
}

function valdiatePolicyTerm() {
    if (getPolicyTerm() == 12)
        document.forms["smartPlatinaAssureForm"]['premiumPayingTerm'].value = 1
    else
        document.forms["smartPlatinaAssureForm"]['premiumPayingTerm'].value = 2
}

function getPremiumPayingTerm() {
    var index = document.forms["smartPlatinaAssureForm"]['premiumPayingTerm'].value;
    console.log(premiumPayingTermList[index - 1].title)
    return premiumPayingTermList[index - 1].title;
}

function getPremiumFrequency() {
    var index = document.forms["smartPlatinaAssureForm"]['premiumFrequency'].value;
    console.log(premiumFrequencyList[index - 1].title)
    return premiumFrequencyList[index - 1].title;
}

function getAnnualPremium() {
    return parseInt(document.forms["smartPlatinaAssureForm"]['annPremium'].value, 10);
}

function getBackdate() {
    console.log(document.forms["smartPlatinaAssureForm"]["backDate"].value)
    return wishToBackdate = document.forms["smartPlatinaAssureForm"]["backDate"].value;

}

function getWishToBackdate() {
    var wishToBackdate = document.forms["smartPlatinaAssureForm"]["wishToBackdate"].value;
    if (wishToBackdate === "yes") {
        return true;
    } else {
        return false;
    }
}

function onWishToBackdateUpdate(wishToBackdate) {
    var backDateDiv = document.getElementById('backdatingDateDivId');
    var backDateElement = document.forms["smartPlatinaAssureForm"]["backDate"];

    if (wishToBackdate === "yes") {
        backDateDiv.style.display = "block";
        backDateElement.required = true;
    } else {
        backDateDiv.style.display = "none";
        backDateElement.required = false;
    }
}

function validateGender(formElementName) {
    //console.log("formElementName",formElementName)
    var laGender = document.forms["smartPlatinaAssureForm"]["gender"].value;

    document.getElementById("smartPlatinaAssureTitle").options[0].disabled = false;
    document.getElementById("smartPlatinaAssureTitle").options[1].disabled = false;
    document.getElementById("smartPlatinaAssureTitle").options[2].disabled = false;

    if (formElementName === "gender") {
        if (laGender === "Male") {
            document.getElementById("smartPlatinaAssureTitle").options[1].disabled = true;
            document.getElementById("smartPlatinaAssureTitle").options[2].disabled = true;
            document.getElementById("smartPlatinaAssureTitle").options[0].selected = true;
        } else if (laGender === "Female") {
            document.getElementById("smartPlatinaAssureTitle").options[0].disabled = true;
            document.getElementById("smartPlatinaAssureTitle").options[1].disabled = false;
            document.getElementById("smartPlatinaAssureTitle").options[2].disabled = false;
            document.getElementById("smartPlatinaAssureTitle").options[1].selected = true;
        } else {
            document.getElementById("smartPlatinaAssureTitle").options[0].disabled = false;
            document.getElementById("smartPlatinaAssureTitle").options[1].disabled = false;
            document.getElementById("smartPlatinaAssureTitle").options[2].disabled = false;
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

function splitDate(date) {

    return date.split("-");

}

function validatePremiumAmount() {
    var annualPremium = this.getAnnualPremium();
    if (isNaN(annualPremium) || annualPremium === undefined || annualPremium === null || annualPremium === '') {
        document.getElementById('annPremiumErrId').style.display = "block";
        document.getElementById('annPremiumErrId').innerHTML = 'Please enter Premium Amount in Rs.';
        return false;
    } else if (annualPremium % 1000 != 0) {
        document.getElementById('annPremiumErrId').style.display = "block";
        document.getElementById('annPremiumErrId').innerHTML = `Premium Amount should be multiple of ${new Intl.NumberFormat('en-IN').format(1000)}.`;
        return false;
    } else if (annualPremium < minPremiumAmt) {
        document.getElementById('annPremiumErrId').style.display = "block";
        document.getElementById('annPremiumErrId').innerHTML = `Premium Amount should not be less than Rs. ${new Intl.NumberFormat('en-IN').format(minPremiumAmt)}`;
        return false;
    } else {
        document.getElementById('annPremiumErrId').style.display = "none";
        return true;
    }
}

// valLifeAssuredProposerDetail() && valDob() && valAge()
//                         && valBasicDetail() && valMaturityAge()
//                         && valPremiumAmt() && valBackdate()
//                         && TrueBackdate()

function validatForm() {
    if (smartPlatinaAssureForm.checkValidity() && self.validateGender("") && this.validateConfirmEmail() &&
        this.calculateAge(self.getDOB()) && this.validateMobileNo(self.getMobileNo()) &&
        this.validatePremiumAmount() && this.validateBackDate() &&
        this.trueBackdate()) {
        this.calculatePremiumAPICall(); // form valid
    }
}

function calculatePremiumAPICall() {

    let xmlBodyParam = `<getPremiumSmartPlatinaAssure xmlns="http://tempuri.org/">
    <isStaff>${self.getStaffDisc()}</isStaff>
    <age>${this.getCalculatedAge()}</age>
    <gender>${self.getGender()}</gender>
    <policyTerm>${self.getPolicyTerm()}</policyTerm>
    <premfreq>${self.getPremiumFrequency()}</premfreq>
    <premAmt>${self.getAnnualPremium()}</premAmt>
    <IsBackdate>${this.getWishToBackdate()}</IsBackdate>
    <Backdate>${this.getWishToBackdate() ? dateMMDDYYYYFormat(this.getBackdate()) : ''}</Backdate>
    <IsMines>false</IsMines>
    <KFC>${getKerlaDiscount()}</KFC>
    </getPremiumSmartPlatinaAssure>`;

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
        let staffDiscount = "",
            staffRebate = "",
            staffStatus = "";
        if (self.getStaffDisc()) {
            staffDiscount = "Yes";
            staffRebate = "0.0"
            staffStatus = "sbi"
        } else {
            staffDiscount = "No";
            staffRebate = "0.00"
            staffStatus = "none"
        }

        let forminputbyuser = {
            proposerName: self.getLifeAssuredTitle() + " " + self.fName() + " " + self.MName() + " " + self.LName(),
            age: self.getCalculatedAge(),
            gender: self.getGender(),
            premiumFrequency: self.getPremiumFrequency(),
            policyTerm: self.getPolicyTerm(),
            premiumPayingTerm: self.getPremiumPayingTerm(),
            premiumAmount: self.getAnnualPremium(),
            quotationNumber: quotNumber,
            staffDiscount: staffDiscount,
            CustTitle: self.getLifeAssuredTitle(),
            CustFirstName: self.fName(),
            CustMiddleName: self.MName(),
            CustLastName: self.LName(),
            CustMobile: self.getMobileNo(),
            CustEmailID: self.getEmail(),
            LaDOB: getDDMMYYYY(self.getDOB()),
            PlanName: self.productDetails.title,
            ProposerDOB: '',
            BasicSA: '0',
            TotalPremAmt: self.getAnnualPremium(),
            Frequency: self.getPremiumFrequency(),
            PolicyTerm: self.getPolicyTerm(),
            PremPayingTerm: self.getPremiumPayingTerm(),
            PlanCode: '2K',
            KFC: "N",
            KFC: getKerlaDiscount() ? "Y" : "N",
            userType: getUserType()

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

        ApiCallService('/getPremiumSmartPlatinaAssure', body, '<SmartPlatinaAssure>', '</SmartPlatinaAssure>', true).then((data) => {
            self.hideLoader();
            data = data.SmartPlatinaAssure;
            data.productDetails = self.productDetails;
            // forminputbyuser.TotalPremAmt = data.totalBasicPremWithoutDisc;
            data.Frequency = forminputbyuser.Frequency;
            var stringifyJson = JSON.stringify(data);

            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</guarntdSurrndrVal${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</guarntdSurrndrVal${getPolicyTerm()}`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");
                remaningOutput += `<staffStatus>${staffStatus}</staffStatus>`;
                remaningOutput += `<staffRebate>${staffRebate}</staffRebate>`;
                var index = forminputbyuser.PolicyTerm;
                var guarntdSurvivalBen = parseXmlTag(premiumCalcXMLResponse, "guarntdSurvivalBen" + index + "");
                var guarntdSurvival = "<guarntdSurvivalBen" + index + ">" + guarntdSurvivalBen + "</guarntdSurvivalBen" + index + ">";
                remaningOutput += `<yearlyPrem>${data.basicPrem}</yearlyPrem>`
                remaningOutput = remaningOutput + guarntdSurvival + "</SmartPlatinaAssure>";
                remaningOutput = `<?xml version='1.0' encoding='utf-8' ?>` + remaningOutput;
                let escapedBIOutput = escapeInputHTML(remaningOutput);
                sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.
            }

            if (sessionStorage.ThroughNeedAnalysis) {
                let status = sessionStorage.getItem('ThroughNeedAnalysis');


                if (status === 'Yes') {
                    updateDataInDB(forminputbyuser).then((resolve) => {
                        console.log("resolve=", resolve);
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
    }).catch((message) => {
        console.log(message)
        alert("Unable to generate quotation number")
    });
}

function getInputXML(forminputbyuser) {
    var inputVal = "";

    inputVal += `<?xml version='1.0' encoding='utf-8' ?><smartplatina_assure>`;
    inputVal += `<isStaff>${self.getStaffDisc()}</isStaff>`;
    inputVal += `<age>${self.getCalculatedAge()}</age>`;
    inputVal += `<gender>${self.getGender()}</gender>`;
    inputVal += `<str_kerla_discount>${getKerlaDiscount()?"Yes":"No"}</str_kerla_discount>`;
    inputVal += `<LifeAssured_title>${self.getLifeAssuredTitle()}</LifeAssured_title>`;
    inputVal += `<LifeAssured_firstName>${self.fName()}</LifeAssured_firstName>`;
    inputVal += `<LifeAssured_middleName>${self.MName()}</LifeAssured_middleName>`;
    inputVal += `<LifeAssured_lastName>${self.LName()}</LifeAssured_lastName>`;
    inputVal += `<LifeAssured_DOB>${getDDMMYYYY(self.getDOB())}</LifeAssured_DOB>`;
    inputVal += `<LifeAssured_age>${self.getCalculatedAge()}</LifeAssured_age>`;

    inputVal += `<proposer_title></proposer_title>`;
    inputVal += `<proposer_firstName></proposer_firstName>`;
    inputVal += `<proposer_middleName></proposer_middleName>`;
    inputVal += `<proposer_lastName></proposer_lastName>`;
    inputVal += `<proposer_DOB></proposer_DOB>`;
    inputVal += `<proposer_age></proposer_age>`;
    inputVal += `<proposer_gender></proposer_gender>`;

    inputVal += `<policyTerm>${self.getPolicyTerm()}</policyTerm>`;
    inputVal += `<premFreq>${self.getPremiumFrequency()}</premFreq>`;
    inputVal += `<premiumAmount>${self.getAnnualPremium()}</premiumAmount>`;
    inputVal += `<premPayingTerm>${self.getPremiumPayingTerm()}</premPayingTerm>`;
    inputVal += `<Product_Cat>${product_cateogory}</Product_Cat>`;

    inputVal += `<product_name>${product_name}</product_name>`;
    inputVal += `<product_Code>${product_code}</product_Code>`;
    inputVal += `<product_UIN>${product_uin}</product_UIN>`;
    inputVal += `<product_cateogory>${product_cateogory}</product_cateogory>`;
    inputVal += `<product_type>${product_type}</product_type>`;

    inputVal += `<proposer_Is_Same_As_Life_Assured>Y</proposer_Is_Same_As_Life_Assured>`;
    inputVal += `<Wish_to_backdate_policy>${self.getWishToBackdate() ? "y" : "n"}</Wish_to_backdate_policy>`;
    inputVal += `<backdating_Date>${self.getBackdate()}</backdating_Date>`;
    inputVal += `<isJKResident>false</isJKResident>`;

    inputVal += `<KFC>${forminputbyuser.KFC}</KFC>`;
    inputVal += `</smartplatina_assure>`;
    let escapedHTML = escapeInputHTML(inputVal);
    sessionStorage.setItem("BIInput", escapedHTML);
    return escapedHTML;
}

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
        var back_date_fix = "01-08-2019";
        var back_date_fix_array = back_date_fix.split("-");
        var new_back_date_fix = new Date(back_date_fix_array[2], back_date_fix_array[1] - 1, back_date_fix_array[0]);
        if (newBackDate.getTime() < new_back_date_fix) {
            document.getElementById('backDateErrId').style.display = 'block';
            document.getElementById('backDateErrId').innerHTML = "Please enter backdation date after 01-08-2019";
            return false;
            // error = "Please enter backdation date after 01-08-2019";
        } else if (today.getTime() < newBackDate.getTime()) {
            document.getElementById('backDateErrId').style.display = 'block';
            document.getElementById('backDateErrId').innerHTML = "Please enter backdation date between " +
                finYerEndDate + " and " +
                getTodayInDDMMYYYY();
            return false;
            // error = "Please enter backdation date between "
            //         + dateformat1.format(finYerEndDate) + " and "
            //         + dateformat1.format(currentDate);
        } else if (newBackDate.getTime() < newFinYerEndDate.getTime()) {
            document.getElementById('backDateErrId').style.display = 'block';
            document.getElementById('backDateErrId').innerHTML = "Please enter backdation date between " +
                finYerEndDate + " and " +
                getTodayInDDMMYYYY();
            // error = "Please enter Backdation date between "
            //         + dateformat1.format(finYerEndDate) + " and "
            //         + dateformat1.format(currentDate);
        } else {
            document.getElementById('backDateErrId').style.display = 'none';
            return true;
        }
        // if (today.getTime() < newBackDate.getTime()) {
        //     document.getElementById('backDateErrId').style.display = 'block';
        //     document.getElementById('backDateErrId').innerHTML = "Please enter backdation date between " + finYerEndDate + " and " + todayDate;
        //     return false;
        // } else if (newBackDate.getTime() < newFinYerEndDate.getTime()) {
        //     document.getElementById('backDateErrId').style.display = 'block';
        //     document.getElementById('backDateErrId').innerHTML = "Please enter Backdation date between " + finYerEndDate + " and " + todayDate;
        //     return false;
        // } else {
        //     document.getElementById('backDateErrId').style.display = 'none';
        //     return true;
        // }
    } else {
        return true;
    }
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
        document.forms["smartPlatinaAssureForm"]["age"].value = age;
    } else {
        alert("Please select a LifeAssured DOB First");
        document.forms['smartPlatinaAssureForm']['backDate'].value = "";
    }
}

function setBackdateEmpty() {
    document.forms['smartPlatinaAssureForm']['backDate'].value = "";
}
