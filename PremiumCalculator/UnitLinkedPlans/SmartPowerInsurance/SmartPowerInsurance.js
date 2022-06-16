window.onload = function () {
    this.ready();
    // hideLoader();
    setKerlaDiscount();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails;
var proposer_Is_Same_As_Life_Assured = "Y";
/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    this.hideErrMsg();
    this.initArrayList();
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
    setPremiumAmountLable(getPremiumFrequency());
    setYearElapsedLable();
    updateSAMFlabel();
};

function hideErrMsg() {
    document.getElementById('divFunds').style.display = "none";
    document.getElementById('maturityAgeErrId').style.display = "none";
    document.getElementById('samfErrId').style.display = "none";
    document.getElementById('confirmEmailErrId').style.display = "none";
    document.getElementById('ageErrId').style.display = "none";
    document.getElementById('mobileNoErrId').style.display = "block";
}

function initializeData() {
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
}

function initArrayList() {

    policyListElement = document.forms["smartPowerInsuranceForm"]["policyTerm"];
    for (i = minPolicyTerm; i <= maxPolicyTerm; i++) {
        policyListElement.add(new Option(i));
    }

    premiumPaymentFreqListElement = document.forms["smartPowerInsuranceForm"]["premiumPaymentFrequency"];
    for (i = 0; i < premiumFrequencyModeList.length; i++) {
        premiumPaymentFreqListElement.add(new Option(premiumFrequencyModeList[i].title, premiumFrequencyModeList[i].value));
    }

    fundElement = document.forms["smartPowerInsuranceForm"]["selectFund"];
    for (i = 0; i < selectFundList.length; i++) {
        fundElement.add(new Option(selectFundList[i].title, selectFundList[i].value));
    }

    increasingCoverOptionElement = document.forms["smartPowerInsuranceForm"]["increasingCoverOption"];
    for (i = 0; i < increasingCoverOptionList.length; i++) {
        increasingCoverOptionElement.add(new Option(increasingCoverOptionList[i].title, increasingCoverOptionList[i].value));
    }
}

/*******************set labels**************************/
function setPremiumAmountLable() {
    var view = document.getElementById("premiumAmountLable");

    var frequencyIndex = document.forms["smartPowerInsuranceForm"]["premiumPaymentFrequency"].value;
    var frequency = premiumFrequencyModeList[frequencyIndex].title;

    switch (frequency) {
        case "Monthly":
            view.innerHTML = "Premium Amount (Min Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[0].minPremiumAmount) + ")";
            break;
        case "Quaterly":
            view.innerHTML = "Premium Amount (Min Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[1].minPremiumAmount) + ")";
            break;
        case "Half-Yearly":
            view.innerHTML = "Premium Amount (Min Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[2].minPremiumAmount) + ")";
            break;
        case "Yearly":
            view.innerHTML = "Premium Amount (Min Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[3].minPremiumAmount) + ")";
            break;
        default:
            view.innerHTML = "Premium Amount (Min Rs. " + new Intl.NumberFormat('en-IN').format(premiumFrequencyModeList[0].minPremiumAmount) + ")";
            break;
    }
}

function setYearElapsedLable() {
    document.getElementById("yearsElapsedId").innerHTML = "No. of Years Elapsed Since Inception (5 to " + getPolicyTerm() + " years)";
}

function updateSAMFlabel() {
    /** Modified by Akshaya on 24-08-2015 start **/
    // var minSAMF = Math.max(10, (getPolicyTerm() / 2));
    /** Modified by Akshaya on 24-08-2015 end **/
    var minSAMF = 10;
    document.getElementById("samfLableId").innerHTML = "Sum Assured multiple factors (SAMF)(" + minSAMF + " to " + maxSAMF + ")";
}

function hideAndShowSFINDetails() {
    var checkBox = document.getElementById('powerInsuranceSfinFund');
    if (checkBox.checked == true) {
        document.getElementById('powerInsuranceSfinFundDetails').style.display = "block";
    } else {
        document.getElementById('powerInsuranceSfinFundDetails').style.display = "none";
    }
}

/*******************end*********************************/

/******************DOM Events***********************/
function onSelectFundChange() {
    let selectFund = getSelectFund();

    if (selectFund.title === 'Smart Fund') {
        document.getElementById('divFunds').style.display = "block";
    } else if (selectFund.title === 'Trigger Fund') {
        document.getElementById('divFunds').style.display = "none";
    }
}

// function validateGender() {
//     var gender = document.forms["smartPowerInsuranceForm"]["gender"].value;
//     if (gender !== "Female" && gender !== "Male") {
//         document.getElementById('genderErrId').style.display = "block";
//         document.getElementById('genderErrId').innerHTML = "Please select your gender.";
//         return false;
//     } else {
//         document.getElementById('genderErrId').style.display = "none";
//         return true
//     }
// }


function calculateAge(birthday) {
    // miliseconds from epoch
    var age = getAgeFromBirthdate(getDDMMYYYY(birthday));
    document.forms["smartPowerInsuranceForm"]["age"].innerHTML = age;
    document.forms["smartPowerInsuranceForm"]["age"].value = age;
    if (age < minAgeLimit || age > maxAgeLimit) {
        document.getElementById('ageErrId').style.display = "block";
        document.getElementById('ageErrId').innerHTML = `Age should be between ${minAgeLimit} and ${maxAgeLimit}.`;
        return false;
    } else {
        document.getElementById('ageErrId').style.display = "none";
        return true;
    }
}

function validateMobileNo(mobileNo) {
    if (mobileNo.length !== 10) {
        document.getElementById('mobileError').style.display = "block";
        document.getElementById('mobileError').innerHTML = "Mobile number should be 10 digits.";
        return false;
    } else {
        document.getElementById('mobileError').style.display = "none";
        return true;
    }
}

function validateEmailIds() {
    var email = document.forms["smartPowerInsuranceForm"]["email"].value;
    var cEmail = document.forms["smartPowerInsuranceForm"]["confirmEmail"].value;
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

function valPremiumAmount() {
    var premiumAmount = getPremiumAmount();
    var mode = getPremiumFrequency();

    if (premiumAmount == '' || premiumAmount == null || premiumAmount == 0) {
        document.getElementById("premiumAmtErrId").style.display = "block";
        document.getElementById("premiumAmtErrId").innerHTML = "Please Enter Premium Amount in Rs. ";
    } else if (parseInt(premiumAmount) % 100 != 0) {
        document.getElementById("premiumAmtErrId").style.display = "block";
        document.getElementById("premiumAmtErrId").innerHTML = "Please enter Premium Amount in multiple of 100";
    } else {
        var minPremiumAmount = getMinimumPremiumAmount(mode);
        if (parseInt(premiumAmount) < minPremiumAmount) {
            document.getElementById("premiumAmtErrId").style.display = "block";
            document.getElementById("premiumAmtErrId").innerHTML = "For " + mode + " mode minimum Premium Amount is Rs. " +
                new Intl.NumberFormat('en-IN').format(minPremiumAmount);
        } else {
            document.getElementById("premiumAmtErrId").style.display = "none";
            return true;
        }

    }
}

function validateSAMF() {
    // var minSAMF = Math.max(10, (getPolicyTerm() / 2));
    var minSAMF = 10;
    if (getSAMF() == 0) {
        document.getElementById("samfErrId").style.display = "block";
        document.getElementById("samfErrId").innerHTML = "Please Enter Sum Assured Multiple Factor(SAMF)";
        return false;
    } else if ((getSAMF() < minSAMF) || (getSAMF() > maxSAMF)) {
        document.getElementById("samfErrId").style.display = "block";
        document.getElementById("samfErrId").innerHTML = "Sum Assured Multiple Factor should be in the range of " +
            minSAMF + " to " + maxSAMF;
        return false;
    } else {
        document.getElementById("samfErrId").style.display = "none";
        return true;
    }
}

function valTotalAllocation() {
    var equityFund, bondFund, balancedFund, moneyMarketFund, equityOptimiserFund, growthFund, top300Fund, bondOptimiserFund,
        corporateBondFund, pureFund;
    if (getFund() == "Smart Fund") {
        if (getEquityFund() == "" || getEquityFund() == null)
            equityFund = 0;
        else
            equityFund = parseInt(getEquityFund());
        if (getBalanceFund() == "" || getBalanceFund() == null)
            balancedFund = 0;
        else
            balancedFund = parseInt(getBalanceFund());
        if (getBondFund() == "" || getBondFund() == null)
            bondFund = 0;
        else
            bondFund = parseInt(getBondFund());
        if (getMarketFund() == "" || getMarketFund() == null)
            moneyMarketFund = 0;
        else
            moneyMarketFund = parseInt(getMarketFund());
        if (getEquityOptimiserFund() == "" || getEquityOptimiserFund() == null)
            equityOptimiserFund = 0;
        else
            equityOptimiserFund = parseInt(getEquityOptimiserFund());
        if (getGrowthFund() == "" || getGrowthFund() == null)
            growthFund = 0;
        else
            growthFund = parseInt(getGrowthFund());
        if (getTop300Fund() == "" || getTop300Fund() == null)
            top300Fund = 0;
        else
            top300Fund = parseInt(getTop300Fund());
        if (getBondOptimiserFund() == "" || getBondOptimiserFund() == null)
            bondOptimiserFund = 0;
        else
            bondOptimiserFund = parseInt(getBondOptimiserFund());
        if (getCorporateBondFund() == "" || getCorporateBondFund() == null)
            corporateBondFund = 0;
        else
            corporateBondFund = parseInt(getCorporateBondFund());
        if (getPureFund() == "" || getPureFund() == null)
            pureFund = 0;
        else
            pureFund = parseInt(getPureFund());
        if ((equityFund + bondFund + balancedFund + moneyMarketFund + equityOptimiserFund + growthFund + top300Fund +
                bondOptimiserFund + corporateBondFund + pureFund) != 100) {
            document.getElementById("fundErrId").style.display = "block";
            document.getElementById("fundErrId").innerHTML = ("Total sum of % to be invested for all fund should be equal to 100%");
            return false;
        }
    }
    document.getElementById("fundErrId").style.display = "none";
    return true;
}

function valYearsElapsedSinceInception() {

    // System.out.println("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!TERM"+term);
    var errorView = document.getElementById("yearElapsedErrId");
    if (isNaN(getYearsElapsed()) || getYearsElapsed() == "" || getYearsElapsed() == null) {
        errorView.style.display = "block";
        errorView.innerHTML = "Enter No. of Years Elapsed Since Inception.";
        return false;
    } else if (getYearsElapsed() < 5) {
        errorView.style.display = "block";
        errorView.innerHTML = "No. of Years Elapsed Since Inception should not be less than 5 Years ";
        return false;
    } else if (getYearsElapsed() > getPolicyTerm()) {
        errorView.style.display = "block";
        errorView.innerHTML = "Please enter no. of Years in the range of 5 to " +
            getPolicyTerm() + " Years.";
        return false;
    } else {
        errorView.style.display = "none";
        return true;
    }
}

function valPolicyTermPlusAge() {
    if (getPowerInsuranceAge() + getPolicyTerm() > 65) {
        document.getElementById("maturityAgeErrId").style.display = "block";
        document.getElementById("maturityAgeErrId").innerHTML = "Addition of Policy Term & Age at Entry should be less than or equal to 65 Years";
        return false;
    } else {
        document.getElementById("maturityAgeErrId").style.display = "none";
        return true;
    }
}

function submitForm() {
    if (smartPowerInsuranceForm.checkValidity() && this.validateGender("") && this.calculateAge(this.getDob()) &&
        this.validateMobileNo(getMobileNo()) && validateEmailIds() && valPremiumAmount() && validateSAMF() && valTotalAllocation() &&
        valPolicyTermPlusAge()) { //&& valYearsElapsedSinceInception()
        calculatePremiumAPICall();
    }
}

function getInput(forminputbyuser) {
    let getInputXML = `<?xml version='1.0' encoding='utf-8' ?><smartPowerInsuranceBean>
    <LifeAssured_title>${this.getTitle()}</LifeAssured_title>
    <LifeAssured_firstName>${this.getFName()}</LifeAssured_firstName>
    <LifeAssured_middleName>${this.getMName()}</LifeAssured_middleName>
    <LifeAssured_lastName>${this.getLName()}</LifeAssured_lastName>
    <LifeAssured_DOB>${getDDMMYYYY(this.getDob())}</LifeAssured_DOB>
    <LifeAssured_age>${forminputbyuser.age}</LifeAssured_age>

    <proposer_title></proposer_title>
    <proposer_firstName></proposer_firstName>
    <proposer_middleName></proposer_middleName>
    <proposer_lastName></proposer_lastName>
    <proposer_DOB></proposer_DOB>
    <proposer_age></proposer_age>
    <proposer_gender></proposer_gender>

    <product_name>${this.productDetails.title}</product_name>
    <product_Code>${this.productDetails.productCode}</product_Code>
    <product_UIN>${this.productDetails.uinNumber}</product_UIN>
    <product_cateogory>${product_cateogory}</product_cateogory>
    <product_type>${product_type}</product_type>

    <proposer_Is_Same_As_Life_Assured>Y</proposer_Is_Same_As_Life_Assured>
    <isStaff>${this.getIsStaff()}</isStaff>
    <str_kerla_discount>${forminputbyuser.KFC.toLowerCase() == "y" ? "Yes" : "No"}</str_kerla_discount>
    <age>${this.getPowerInsuranceAge()}</age>
    <isJKResident>false</isJKResident>
    <gender>${this.getGender()}</gender>

    <premFreqMode>${forminputbyuser.premiumFrequency}</premFreqMode>
    <policyTerm>${forminputbyuser.policyTerm}</policyTerm>
    <premiumAmount>${forminputbyuser.premiumAmount}</premiumAmount>
    <selectFund>${this.getFund()}</selectFund>
    <increaseCoverOption>${forminputbyuser.increaseCoverOption}</increaseCoverOption>
    <SAMF>${this.getSAMF()}</SAMF>
    <noOfYrElapsed></noOfYrElapsed>
    <perInvEquityFund>${this.getEquityFund()}</perInvEquityFund>
    <perInvEquityOptFund>${this.getEquityOptimiserFund()}</perInvEquityOptFund>
    <perInvGrowthFund>${this.getGrowthFund()}</perInvGrowthFund>
    <perInvBalancedFund>${this.getBalanceFund()}</perInvBalancedFund>
    <perInvBondFund>${this.getBondFund()}</perInvBondFund>
    <perInvMoneyMktFund>${this.getMarketFund()}</perInvMoneyMktFund>
    <perInvTop300Fund>${self.getTop300Fund()}</perInvTop300Fund>
    <perInvBondOptimiserFund>${self.getTop300Fund()}</perInvBondOptimiserFund>
    <perInvCorporateBondFund>${self.getTop300Fund()}</perInvCorporateBondFund>
    <perInvPureFund>${self.getTop300Fund()}</perInvPureFund>
    <KFC>${forminputbyuser.KFC}</KFC>
   </smartPowerInsuranceBean>`;

    sessionStorage.setItem("BIInput", escapeInputHTML(getInputXML));

    return getInputXML;
}

function calculatePremiumAPICall() {

    let xmlBodyParam = `<getPremiumSmartPowerInsurance xmlns="http://tempuri.org/">
    <isStaff>${self.getIsStaff()}</isStaff>
    <age>${self.getPowerInsuranceAge()}</age>
    <gender>${self.getGender()}</gender>
    <policyTerm>${self.getPolicyTerm()}</policyTerm>
    <premFreqMode>${self.getPremiumFrequency()}</premFreqMode>
    <premiumAmount>${self.getPremiumAmount()}</premiumAmount>
    <SAMF>${self.getSAMF()}</SAMF>
    <increasingCoverOption>${self.getCoverOption()}</increasingCoverOption>
    <noOfYrElapsed>0</noOfYrElapsed>
    <fundOption>${self.getFund()}</fundOption>
    <equityFund>${self.getEquityFund()}</equityFund>
    <bondFund>${self.getBondFund()}</bondFund>
    <top300Fund>${self.getTop300Fund()}</top300Fund>
    <equityOptimiserFund>${self.getEquityOptimiserFund()}</equityOptimiserFund>
    <growthFund>${self.getGrowthFund()}</growthFund>
    <balancedFund>${self.getBalanceFund()}</balancedFund>
    <moneyMarketFund>${self.getMarketFund()}</moneyMarketFund>
    <bondOptimiserFund>${self.getBondOptimiserFund()}</bondOptimiserFund>
    <pureFund>${self.getPureFund()}</pureFund>
    <corpBondFund>${self.getCorporateBondFund()}</corpBondFund>
    <KFC>${getKerlaDiscount()}</KFC>
  </getPremiumSmartPowerInsurance>`;

    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                    <soap:Body>
                        ${xmlBodyParam}
                    </soap:Body>
                </soap:Envelope>`;

    console.log(body);
    showLoader();
    generateQuotationNumber(this.productDetails.productCode).then((quotNumber) => {
        let staffDiscount = "";
        if (self.getIsStaff()) {
            staffDiscount = "Yes";
        } else {
            staffDiscount = "No";
        }

        let planCode = '';

        if (self.getCoverOption() === 'Yes' &&
            self.getFund() === 'Smart Fund') {
            planCode = "UPSPWICS";
        } else if (self.getCoverOption() === 'Yes' &&
            self.getFund() === 'Trigger Fund') {
            planCode = "UPSPWICT";
        } else if (self.getCoverOption() === 'No' &&
            self.getFund() === 'Smart Fund') {
            planCode = "UPSPWLCS";
        } else if (self.getCoverOption() === 'No' &&
            self.getFund() === 'Trigger Fund') {
            planCode = "UPSPWLCT";
        }
        console.log("self.getFund() = ", self.getFund());
        let forminputbyuser;
        if (self.getFund() === "Smart Fund") {
            forminputbyuser = {
                proposerName: self.getTitle() + " " + self.getFName() + " " + self.getMName() + " " + self.getLName(),
                age: self.getPowerInsuranceAge(),
                gender: self.getGender(),
                policyTerm: self.getPolicyTerm(),
                premiumFrequency: self.getPremiumFrequency(),
                premiumAmount: self.getPremiumAmount(),
                SAMF: self.getSAMF(),
                yearElapsed: self.getYearsElapsed(),
                fundType: self.getFund(),
                increaseCoverOption: self.getCoverOption(),
                equityFund: self.getEquityFund(),
                equityOptimiserFund: self.getEquityOptimiserFund(),
                growthFund: self.getGrowthFund(),
                balancedFund: self.getBalanceFund(),
                bondFund: self.getBondFund(),
                moneyMarketFund: self.getMarketFund(),
                top300Fund: self.getTop300Fund(),
                bondOptimiserFund: self.getBondOptimiserFund(),
                corporateBondFund: self.getCorporateBondFund(),
                pureFund: self.getPureFund(),
                quotationNumber: quotNumber,
                staffDiscount: staffDiscount,
                PlanCode: planCode,
                PlanName: 'Smart Power Insurance',
                CustTitle: self.getTitle(),
                CustFirstName: self.getFName(),
                CustMiddleName: self.getMName(),
                CustLastName: self.getLName(),
                CustMobile: self.getMobileNo(),
                CustEmailID: self.getEmailId(),
                LaDOB: getDDMMYYYY(self.getDob()),
                ProposerDOB: getDDMMYYYY(self.getDob()),
                TotalPremAmt: self.getPremiumAmount(),
                BasicSA: '',
                Frequency: self.getPremiumFrequency(),
                PolicyTerm: self.getPolicyTerm(),
                PremPayingTerm: '0',
                KFC: getKerlaDiscount() ? "Y" : "N",
                userType: getUserType()
            };
        } else if (self.getFund() === "Trigger Fund") {
            forminputbyuser = {
                proposerName: self.getTitle() + " " + self.getFName() + " " + self.getMName() + " " + self.getLName(),
                age: self.getPowerInsuranceAge(),
                gender: self.getGender(),
                policyTerm: self.getPolicyTerm(),
                premiumFrequency: self.getPremiumFrequency(),
                premiumAmount: self.getPremiumAmount(),
                SAMF: self.getSAMF(),
                yearElapsed: self.getYearsElapsed(),
                fundType: self.getFund(),
                increaseCoverOption: self.getCoverOption(),
                quotationNumber: quotNumber,
                staffDiscount: staffDiscount,
                PlanCode: planCode,
                PlanName: 'Smart Power Insurance',
                CustTitle: self.getTitle(),
                CustFirstName: self.getFName(),
                CustMiddleName: self.getMName(),
                CustLastName: self.getLName(),
                CustMobile: self.getMobileNo(),
                CustEmailID: self.getEmailId(),
                LaDOB: getDDMMYYYY(self.getDob()),
                ProposerDOB: getDDMMYYYY(self.getDob()),
                TotalPremAmt: self.getPremiumAmount(),
                BasicSA: '',
                Frequency: self.getPremiumFrequency(),
                PolicyTerm: self.getPolicyTerm(),
                PremPayingTerm: '0',
                KFC: getKerlaDiscount() ? "Y" : "N",
                userType: getUserType()
            };
        }

        //self.showLoader();
        // hitPremiumCaclService('getPremiumSmartPowerInsurance', '', '', userID,userMail, userMobile, userAuth).then((data) => {
        //         console.log(data);
        //     }).catch((reject) => {
        //         console.log(reject);
        //     });
        let inputXml = getInput(forminputbyuser)
        ApiCallService('/getPremiumSmartPowerInsurance', body, '<smartPowerInsurance>', '</smartPowerInsurance>', true).then((data) => {
            self.hideLoader();
            data = data.smartPowerInsurance;
            var error = data.errCode;
            if (error != undefined && error == 1) {
                alert(data.minSumAssuredError)
                return;
            }
            data.productDetails = self.productDetails;
            //data.premiumFrequencyMode = self.getPolicyMode();
            var stringifyJson = JSON.stringify(data);

            console.log("data = ", data);
            //Added by sonali
            if (sessionStorage.premiumCalcOutput) {
                let premiumCalcXMLResponse = sessionStorage.getItem('premiumCalcOutput');
                var startIndex = premiumCalcXMLResponse.indexOf('<policyYr1>');
                var lastIndex = premiumCalcXMLResponse.indexOf(`</Commission${getPolicyTerm()}>`);
                let subStringOutput = premiumCalcXMLResponse.substring(startIndex, lastIndex + `</Commission${getPolicyTerm()}>`.length);
                let remaningOutput = premiumCalcXMLResponse.replace(subStringOutput, "");

                var index = forminputbyuser.PolicyTerm;
                var FundValAtEnd4Pr = parseXmlTag(premiumCalcXMLResponse, "FundValAtEnd4Pr" + index + "");
                var FundValAtEnd8Pr = parseXmlTag(premiumCalcXMLResponse, "FundValAtEnd8Pr" + index + "");

                FundValAtEnd = "<FundValAtEnd4Pr" + index + ">" + FundValAtEnd4Pr + "</FundValAtEnd4Pr" + index + ">";
                FundValAtEnd += "<FundValAtEnd8Pr" + index + ">" + FundValAtEnd8Pr + "</FundValAtEnd8Pr" + index + ">";
                remaningOutput = remaningOutput + FundValAtEnd + "</SmartPowerInsurance>"
                remaningOutput = remaningOutput.replace(/smartPowerInsurance/g, "SmartPowerInsurance");

                console.log("remaningOutput ", remaningOutput);
                let escapedBIOutput =
                    escapeInputHTML(`<?xml version='1.0' encoding='utf-8' ?>` + remaningOutput);
                sessionStorage.setItem("BIOutput", escapedBIOutput); // BI Output.

            }
                //end
                if (sessionStorage.ThroughNeedAnalysis) {
                    let status = sessionStorage.getItem('ThroughNeedAnalysis');

                    if (status === 'Yes') {
                        forminputbyuser.BasicSA = data.sumAssured;
                        updateDataInDB(forminputbyuser).then((resolve) => {
                            if (resolve == "1") {
                                createPDFGeneralMethod(self.productDetails, data, forminputbyuser)
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
        self.hideLoader();
        console.log(message)
        alert("Unable to generate quotation number")
    });
}
/**********************Getters*****************************/
function getSelectFund() {
    let index = document.getElementById('ddlFund').value;
    return selectFundList[index];
}

function getTitle() {
    return document.forms["smartPowerInsuranceForm"]["title"].value;
}

function getGender() {
    return document.forms["smartPowerInsuranceForm"]["gender"].value;
}

function getFName() {
    return document.forms["smartPowerInsuranceForm"]["first_name"].value;
}

function getMName() {
    return document.forms["smartPowerInsuranceForm"]["middle_name"].value;
}

function getLName() {
    return document.forms["smartPowerInsuranceForm"]["last_name"].value;
}

function getDob() {
    return document.forms["smartPowerInsuranceForm"]["dob"].value;
}

function getPowerInsuranceAge() {
    return parseInt(document.forms["smartPowerInsuranceForm"]["age"].value)
}

function getMobileNo() {
    return document.forms["smartPowerInsuranceForm"]["mobile"].value;
}

function getEmailId() {
    return document.forms["smartPowerInsuranceForm"]["email"].value;
}

function getPolicyTerm() {
    return parseInt(document.forms["smartPowerInsuranceForm"]["policyTerm"].value);
}

function getPremiumFrequency() {
    var index = document.forms["smartPowerInsuranceForm"]["premiumPaymentFrequency"].value;
    return premiumFrequencyModeList[index].title;
}

function getPremiumAmount() {
    var amount = parseInt(document.forms["smartPowerInsuranceForm"]["premiumAmount"].value);
    if (amount == '' || isNaN(amount) || amount == null) {
        return 0;
    } else {
        return amount;
    }

}

function getSAMF() {
    var samf = parseFloat(document.forms["smartPowerInsuranceForm"]["samf"].value);
    if (samf == '' || isNaN(samf) || samf == null) {
        return 0;
    } else {
        return samf;
    }
}

function getYearsElapsed() {
    return parseInt(document.forms["smartPowerInsuranceForm"]["yearsElapsed"].value);
}

function getFund() {
    var index = document.forms["smartPowerInsuranceForm"]["selectFund"].value;
    return selectFundList[index].title;
}

function getCoverOption() {
    var index = document.forms["smartPowerInsuranceForm"]["increasingCoverOption"].value;
    return increasingCoverOptionList[index].title;
}

function getEquityFund() {
    var equityFund = document.forms["smartPowerInsuranceForm"]["equityFund"].value;

    if (equityFund == "" || equityFund == null)
        return 0;
    else
        return parseInt(equityFund);
}

function getEquityOptimiserFund() {

    var fund = document.forms["smartPowerInsuranceForm"]["equityOptimiserFund"].value;

    if (fund == "" || fund == null)
        return 0;
    else
        return parseInt(fund);
}

function getGrowthFund() {

    var fund = document.forms["smartPowerInsuranceForm"]["growthFund"].value;

    if (fund == "" || fund == null)
        return 0;
    else
        return parseInt(fund);
}

function getBalanceFund() {

    var fund = document.forms["smartPowerInsuranceForm"]["balancedFund"].value;

    if (fund == "" || fund == null)
        return 0;
    else
        return parseInt(fund);
}

function getBondFund() {

    var fund = document.forms["smartPowerInsuranceForm"]["bondFund"].value;

    if (fund == "" || fund == null)
        return 0;
    else
        return parseInt(fund);
}

function getMarketFund() {
    var fund = document.forms["smartPowerInsuranceForm"]["moneyMarketFund"].value;

    if (fund == "" || fund == null)
        return 0;
    else
        return parseInt(fund);
}

function getTop300Fund() {
    var fund = document.forms["smartPowerInsuranceForm"]["top300Fund"].value;

    if (fund == "" || fund == null)
        return 0;
    else
        return parseInt(fund);
}

function getBondOptimiserFund() {
    var fund = document.forms["smartPowerInsuranceForm"]["bondOptimiserFund"].value;
    if (fund == "" || fund == null)
        return 0;
    else
        return parseInt(fund);
}

function getCorporateBondFund() {
    var fund = document.forms["smartPowerInsuranceForm"]["corporateBondFund"].value;
    if (fund == "" || fund == null)
        return 0;
    else
        return parseInt(fund);
}

function getPureFund() {
    var fund = document.forms["smartPowerInsuranceForm"]["pureFund"].value;
    if (fund == "" || fund == null)
        return 0;
    else
        return parseInt(fund);
}

function getMinimumPremiumAmount(paymentMode) {
    if (paymentMode == "Monthly") {
        return premiumFrequencyModeList[0].minPremiumAmount;
    } else if (paymentMode == "Quaterly") {
        return premiumFrequencyModeList[1].minPremiumAmount;
    } else if (paymentMode == "Half-Yearly") {
        return premiumFrequencyModeList[2].minPremiumAmount;
    } else if (paymentMode == "Yearly") {
        return premiumFrequencyModeList[3].minPremiumAmount;
    }
}

function getIsStaff() {
    var checkBox = document.getElementById('power_insurance_staff_discount');
    return checkBox.checked;
}
/*************************getter ended*****************************/

function validateGender(formElementName) {
    //console.log("formElementName",formElementName)
    var laGender = document.forms["smartPowerInsuranceForm"]["gender"].value;

    document.getElementById("title").options[0].disabled = false;
    document.getElementById("title").options[1].disabled = false;
    document.getElementById("title").options[2].disabled = false;

    if (formElementName === "gender") {
        if (laGender === "Male") {
            document.getElementById("title").options[1].disabled = true;
            document.getElementById("title").options[2].disabled = true;
            document.getElementById("title").options[0].selected = true;
        } else if (laGender === "Female") {
            document.getElementById("title").options[0].disabled = true;
            document.getElementById("title").options[1].disabled = false;
            document.getElementById("title").options[2].disabled = false;
            document.getElementById("title").options[1].selected = true;
        } else {
            document.getElementById("title").options[0].disabled = false;
            document.getElementById("title").options[1].disabled = false;
            document.getElementById("title").options[2].disabled = false;
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