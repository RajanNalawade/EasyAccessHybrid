window.onload = function () {
    this.ready();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails, premiumFrequencyListElement, policyTermElement;

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    // self.hideLoader();
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails");
    this.initializeData()
    this.initArrayList();
    this.updateField_FirstOrBothAnnuitant();
    this.addOrRemoveSecAnnuitantFields();
    this.showAdvanceAnnuityPayout();
    this.showApplicableForDropdown();
    this.deleteAndAddFieldsUnderOptForField();
};

function initializeData() {
    document.forms["annuityPlusForm"]["proposalDate"].value = getDefaultDate();
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;
}

function initArrayList() {
    sourceOfBusinessListElement = document.forms["annuityPlusForm"]["sourceOfBusiness"];
    for (i = 0; i < sourceOfBusinessList.length; i++) {
        sourceOfBusinessListElement.add(new Option(sourceOfBusinessList[i].title, sourceOfBusinessList[i].value));
    }

    channedlListElement = document.forms["annuityPlusForm"]["channelDetails"];
    for (i = 0; i < channelDetailsList.length; i++) {
        channedlListElement.add(new Option(channelDetailsList[i].title, channelDetailsList[i].value));
    }

    modeAnnuityPayoutsListElement = document.forms["annuityPlusForm"]["modeAnnuityPayouts"];
    for (i = 0; i < modeOfAnnuityPayoutsList.length; i++) {
        modeAnnuityPayoutsListElement.add(new Option(modeOfAnnuityPayoutsList[i].title, modeOfAnnuityPayoutsList[i].value));
    }

    annuityOptionListElement = document.forms["annuityPlusForm"]["annuityOption"];
    for (i = 0; i < annuityOptionList.length; i++) {
        annuityOptionListElement.add(new Option(annuityOptionList[i].title, annuityOptionList[i].value));
    }

    firstAnnuityGenderListElement = document.forms["annuityPlusForm"]["firstAnnuitantGender"];
    for (i = 0; i < gender.length; i++) {
        firstAnnuityGenderListElement.add(new Option(gender[i]));
    }

    secondAnnuityGenderListElement = document.forms["annuityPlusForm"]["secondAnnuitantGender"];
    for (i = 0; i < gender.length; i++) {
        secondAnnuityGenderListElement.add(new Option(gender[i]));
    }

    firstAnnuityAgeListElement = document.forms["annuityPlusForm"]["firstAnnuitantAge"];
    secondAnnuityAgeListElement = document.forms["annuityPlusForm"]["secondAnnuitantAge"];
    for (i = minAgeOfAnnuitant; i <= maxAgeOfFirstAnnuitant; i++) {
        firstAnnuityAgeListElement.add(new Option(i));
        secondAnnuityAgeListElement.add(new Option(i));
    }

    // adbRiderApplicableListElement = document.forms["annuityPlusForm"]["adbRiderApplicableFor"];
    // for (i = 0; i < applicableForList.length; i++) {
    //     adbRiderApplicableListElement.add(new Option(applicableForList[i].title, applicableForList[i].value));
    // }

    annuitanOptForListElement = document.forms["annuityPlusForm"]["optFor"];
    for (i = 0; i < optForList.length; i++) {
        annuitanOptForListElement.add(new Option(optForList[i].title, optForList[i].value));
    }
}

function showApplicableForDropdown() {
    if (this.isADBRiderActive() && this.validateRider()) {
        document.getElementById("termADBBlock").style.display = "block";
    } else {
        // document.getElementById("secondAnnuityErrId").style.display = "none";
        // document.getElementById("firstAnnuityErrId").style.display = "none";
        document.getElementById("termADBBlock").style.display = "none";
    }
}

function showAdvanceAnnuityPayout() {
    var payoutMode = this.getPayoutMode();
    if (payoutMode == "Yearly" || payoutMode == "Half Yearly") {
        document.getElementById("advancedAnnuityPayoutCheckBox").style.display = "block";
    } else {
        document.getElementById("advancedAnnuityPayoutCheckBox").style.display = "none";
        document.getElementById("advancePayoutlock").style.display = "none";
    }
}

function showPayoutDate() {
    if (this.isAdvanceAnuuityPayoutActive()) {
        document.getElementById("advancePayoutlock").style.display = "block";
        document.forms["annuityPlusForm"]["annuitypayoutDate"].value = getDefaultDate();
    } else {
        document.forms["annuityPlusForm"]["annuitypayoutDate"].value = "";
        document.getElementById("advancePayoutlock").style.display = "none";
    }
}

function updateField_FirstOrBothAnnuitant() {
    var selectedAnnuityOption = this.getAnnuityOption();
    var adbRiderApplicableListElement = document.forms["annuityPlusForm"]["adbRiderApplicableFor"];
    adbRiderApplicableListElement.length = 0;
    if (selectedAnnuityOption == "Life and Last Survivor - 50% Income" || selectedAnnuityOption == "Life and Last Survivor - 100% Income" ||
        selectedAnnuityOption == "Life and Last Survivor with Capital Refund - 50% Income" ||
        selectedAnnuityOption == "Life and Last Survivor with Capital Refund - 100% Income") {
        for (i = 0; i < applicableForList.length; i++) {
            adbRiderApplicableListElement.add(new Option(applicableForList[i].title, applicableForList[i].value));
        }
    } else {

        for (i = 0; i < applicableForList.length - 1; i++) {
            adbRiderApplicableListElement.add(new Option(applicableForList[i].title, applicableForList[i].value));
        }
    }
}

//  Used in Annuity Option Item Listener
function addOrRemoveSecAnnuitantFields() {
    var selectedAnnuityOption = this.getAnnuityOption();
    if (selectedAnnuityOption == "Life and Last Survivor - 50% Income" || selectedAnnuityOption == "Life and Last Survivor - 100% Income" ||
        selectedAnnuityOption == "Life and Last Survivor with Capital Refund - 50% Income" ||
        selectedAnnuityOption == "Life and Last Survivor with Capital Refund - 100% Income") {
        document.getElementById("secondAnnuitantAgeBlock").style.display = "block";
        document.getElementById("secondAnnuitantGenderBlock").style.display = "block";
    } else {
        document.getElementById("secondAnnuitantAgeBlock").style.display = "none";
        document.getElementById("secondAnnuitantGenderBlock").style.display = "none";
    }

}

function deleteAndAddFieldsUnderOptForField() {
    document.getElementById("annuityAmountRow").style.display = "none";
    document.getElementById("additionalAmountRow").style.display = "none";
    document.getElementById("vestingAmountRow").style.display = "none";

    var selOptFor = this.getOptFor();
    var businessSource = this.getBusinessSource();
    if (selOptFor == "Annuity Payout Amount") {
        document.getElementById("annuityAmountRow").style.display = "block";

        if (businessSource == "Vesting/Death/Surrender of existing SBI Life's pension policy") {
            document.getElementById("vestingAmountRow").style.display = "block";
        }

    } else if (selOptFor == "Premium Amount") {
        document.getElementById("vestingAmountRow").style.display = "block";

        if (businessSource == "Vesting/Death/Surrender of existing SBI Life's pension policy") {
            document.getElementById("additionalAmountRow").style.display = "block";
        }
    }

}

function validatForm() {
    if (this.validateRider() && validateInputs()) {
        calculatePremiumAPICall();
    }
}
/*********************validation*********************/
function validateRider() {
    if (this.isADBRiderActive()) {
        if (this.getFirstAnnuityAge() > maxAgeOfAnnuitantWhenRider) {
            document.getElementById("firstAnnuityErrId").style.display = "block";
            document.getElementById("firstAnnuityErrId").innerHTML = "Maximum Age limit of Accidental Death Benefit Rider for First Annuitant is " + maxAgeOfAnnuitantWhenRider;
            return false;
        }

        var selectedAnnuityOption = this.getAnnuityOption();
        if ((selectedAnnuityOption == "Life and Last Survivor - 50% Income" || selectedAnnuityOption == "Life and Last Survivor - 100% Income" ||
                selectedAnnuityOption == "Life and Last Survivor with Capital Refund - 50% Income" || selectedAnnuityOption == "Life and Last Survivor with Capital Refund - 100% Income") &&
            this.getSecondAnnuityAge() > maxAgeOfAnnuitantWhenRider) {
            document.getElementById("secondAnnuityErrId").style.display = "block";
            document.getElementById("secondAnnuityErrId").innerHTML = "Maximum Age limit of Accidental Death Benefit Rider for Second Annuitant is " + maxAgeOfAnnuitantWhenRider;
            return false;
        }
    }
    document.getElementById("firstAnnuityErrId").style.display = "none";
    document.getElementById("secondAnnuityErrId").style.display = "none";
    return true;
}

function validateInputs() {
    var isAnnuityAmtVisible = document.getElementById("annuityAmountRow").style.display;
    var isVestingVisible = document.getElementById("vestingAmountRow").style.display;
    var isAdditionalAmtVisible = document.getElementById("additionalAmountRow").style.display;
    //console.log(isAnnuityAmtVisible+" == "+isVestingVisible+" === "+isAdditionalAmtVisible);

    if (isAnnuityAmtVisible != "none") {
        if (!validateAnnuityAmt()) {
            return false;
        }
    }

    // validate Vesting Amount
    if (isVestingVisible != "none") {
        if (!validateVestingAmt()) {
            return false;
        }
    }

    // validate additional amount
    if (isAdditionalAmtVisible != "none") {
        if (!validateAdditionalAmt()) {
            return false;
        }
    }

    return true;
}

function validateAnnuityAmt() {
    var annuityAmt = this.getAnnuityAmount();
    var mode = this.getPayoutMode();
    var minAnnuityAmt = this.getMinAnnuityAmount(mode);
    if (annuityAmt == 0) {
        document.getElementById("annuityAmountErrId").style.display = "block";
        document.getElementById("annuityAmountErrId").innerHTML = "Please enter Annuity Amount in Rs.";
        return false;
    } else if (annuityAmt < minAnnuityAmt) {
        document.getElementById("annuityAmountErrId").style.display = "block";
        document.getElementById("annuityAmountErrId").innerHTML = "Annuity Amount for" + mode + " mode should not be less than Rs." + new Intl.NumberFormat('en-IN').format(minAnnuityAmt);
        return false;
    }
    document.getElementById("annuityAmountErrId").style.display = "none";
    return true;
}

function validateVestingAmt() {
    console.log("anuuityAmt = " + this.getVestingAmount())
    if (this.getVestingAmount() == 0) {
        document.getElementById("vestingAmountErrId").style.display = "block";
        document.getElementById("vestingAmountErrId").innerHTML = "Please enter Vesting Amount in Rs.";
        return false;
    }
    document.getElementById("vestingAmountErrId").style.display = "none";
    return true;
}


function validateAdditionalAmt() {
    console.log("anuuityAmt = " + this.getAdditionalAmount())
    if (this.getAdditionalAmount() == 0) {
        document.getElementById("additionalAmountErrId").style.display = "block";
        document.getElementById("additionalAmountErrId").innerHTML = "Please enter Additional Amount in Rs.";
        return false;
    }
    document.getElementById("additionalAmountErrId").style.display = "none";
    return true;
}
/********************************************************************/
/*************************getter methods*****************************/
function getBusinessSource() {
    var index = document.forms["annuityPlusForm"]["sourceOfBusiness"].value;
    return sourceOfBusinessList[index - 1].title;
}

function getPoposalDate() {

    var strDate = document.forms["annuityPlusForm"]["proposalDate"].value;

    var arrDate = strDate.split('/');

    return arrDate[0] + '-' + arrDate[1] + '-' + arrDate[2];
}

function getChannelDetails() {
    var index = document.forms["annuityPlusForm"]["channelDetails"].value;
    return channelDetailsList[index - 1].title;
}

function getPayoutMode() {
    var index = document.forms["annuityPlusForm"]["modeAnnuityPayouts"].value;
    return modeOfAnnuityPayoutsList[index - 1].title;
}

function getAnnuityOption() {
    var index = document.forms["annuityPlusForm"]["annuityOption"].value;
    return annuityOptionList[index - 1].title;
}

function isADBRiderActive() {
    return document.forms["annuityPlusForm"]["is_adb_rider"].checked;
}

function getApplicableFor() {
    var index = document.forms["annuityPlusForm"]["adbRiderApplicableFor"].value;
    return applicableForList[index - 1].title;
}

function isAdvanceAnuuityPayoutActive() {
    return document.forms["annuityPlusForm"]["is_advance_annuity_payout"].checked;
}

function getAnuuityPayoutDate() {
    return document.forms["annuityPlusForm"]["annuitypayoutDate"].value;
}

function getFirstAnnuityAge() {
    return parseInt(document.forms["annuityPlusForm"]["firstAnnuitantAge"].value);
}

function getFirstAnnuityGender() {
    return document.forms["annuityPlusForm"]["firstAnnuitantGender"].value;
}

function getSecondAnnuityAge() {
    return parseInt(document.forms["annuityPlusForm"]["secondAnnuitantAge"].value);
}

function getSecondAnnuityGender() {
    return document.forms["annuityPlusForm"]["secondAnnuitantGender"].value;
}

function getOptFor() {
    var index = document.forms["annuityPlusForm"]["optFor"].value;
    return optForList[index - 1].title;
}

function getAnnuityAmount() {
    var amt = parseInt(document.forms["annuityPlusForm"]["annuityAmount"].value);
    if (isNaN(amt) || amt == '' || amt == null) {
        return 0;
    }
    return amt;
}

function getAdditionalAmount() {
    var amt = parseInt(document.forms["annuityPlusForm"]["additionalAmount"].value);
    if (isNaN(amt) || amt == '' || amt == null) {
        return 0;
    }
    return amt;
}

function getVestingAmount() {
    var amt = parseInt(document.forms["annuityPlusForm"]["vestingAmount"].value);
    if (isNaN(amt) || amt == '' || amt == null) {
        return 0;
    }
    return amt;
}

function getDefaultDate() {
    var today = (new Date());
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();

    if ((month + "").length == 1) {
        month = "0" + month;
    }
    if ((day + "").length == 1) {
        day = "0" + day;
    }
    return (day + "/" + month + "/" + year);
}

function getMinAnnuityAmount(mode) {
    if (mode == "Monthly") {
        return modeOfAnnuityPayoutsList[0].minimumAnnuityAmount;
    } else if (mode == "Quarterly") {
        return modeOfAnnuityPayoutsList[1].minimumAnnuityAmount;
    } else if (mode == "Half Yearly") {
        return modeOfAnnuityPayoutsList[2].minimumAnnuityAmount;
    } else if (mode == "Yearly") {
        return modeOfAnnuityPayoutsList[3].minimumAnnuityAmount;
    }
}
/********************************************************************/

function calculatePremiumAPICall() {
    let xmlBodyParam = ` <getPremiumAnnuityPlusNew xmlns="http://tempuri.org/">
    <isStaff>false</isStaff>
    <isJkResident>false</isJkResident>
    <isAdvanceAnnuityPayout>${this.isAdvanceAnuuityPayoutActive()}</isAdvanceAnnuityPayout>
    <isADB>false</isADB>
    <applicableFor></applicableFor>

    <sourceOfBusiness>${this.getBusinessSource()}</sourceOfBusiness>
    <channelDetails>${this.getChannelDetails()}</channelDetails>
    <modeOfAnnuityPayout>${this.getPayoutMode()}</modeOfAnnuityPayout>
    <annuityOption>${this.getAnnuityOption()}</annuityOption>
    <genderOfFirstAnnuitant>${this.getFirstAnnuityGender()}</genderOfFirstAnnuitant>
    <optFor>${this.getOptFor()}</optFor>
    
    <proposalDate>${this.getPoposalDate()}</proposalDate>
    <annuityPayoutDate>${this.getAnuuityPayoutDate()}</annuityPayoutDate>
    <ageOfFirstAnnuitant>${this.getFirstAnnuityAge()}</ageOfFirstAnnuitant>`;


    if ((this.getAnnuityOption() == 'Life and Last Survivor - 50% Income') ||
        (this.getAnnuityOption() === 'Life and Last Survivor - 100% Income') ||
        (this.getAnnuityOption() === 'Life and Last Survivor with Capital Refund - 50% Income') ||
        (this.getAnnuityOption() === 'Life and Last Survivor with Capital Refund - 100% Income')) {

        xmlBodyParam += `<ageOfSecondAnnuitant>${this.getSecondAnnuityAge()}</ageOfSecondAnnuitant>
        <genderOfSecondAnnuitant>${this.getSecondAnnuityGender()}</genderOfSecondAnnuitant>`;

    } else {
        xmlBodyParam += `<ageOfSecondAnnuitant></ageOfSecondAnnuitant>
        <genderOfSecondAnnuitant></genderOfSecondAnnuitant>`;
    }

    if (this.getBusinessSource() === "Vesting/Death/Surrender of existing SBI Life's pension policy") {

        if (this.getOptFor() === "Annuity Payout Amount") {
            xmlBodyParam += `<additionalAmountIfAny>0</additionalAmountIfAny>
    <vestingAmount>${this.getVestingAmount()}</vestingAmount>
    <annuityAmount>${this.getAnnuityAmount()}</annuityAmount>`;

        } else if (this.getOptFor() === "Premium Amount") {
            xmlBodyParam += `<additionalAmountIfAny>${this.getAdditionalAmount()}</additionalAmountIfAny>
    <vestingAmount>${this.getVestingAmount()}</vestingAmount>
    <annuityAmount>0</annuityAmount>`;

        }
    }
    //Other than Vesting/Death/Surrender of existing SBI Life's pension policy
    else {
        if (this.getOptFor() === "Annuity Payout Amount") {
            xmlBodyParam += `<additionalAmountIfAny>0</additionalAmountIfAny>
    <vestingAmount>0</vestingAmount>
    <annuityAmount>${this.getAnnuityAmount()}</annuityAmount>`;

        } else if (this.getOptFor() === "Premium Amount") {
            xmlBodyParam += `<additionalAmountIfAny>0</additionalAmountIfAny>
    <vestingAmount>${this.getVestingAmount()}</vestingAmount>
    <annuityAmount>0</annuityAmount>`;
        }
    }

    xmlBodyParam += `</getPremiumAnnuityPlusNew>`;


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
    ApiCallService('/getPremiumAnnuityPlusNew', body, '<annuityPlus>', '</annuityPlus>').then((data) => {
        self.hideLoader();
        data = data.annuityPlus;
        data.productDetails = self.productDetails;
        data.isRiderSelected = this.isADBRiderActive();
        data.isAdvanceAnnuityChecked = this.isAdvanceAnuuityPayoutActive();
        data.isSourceOfBusinessVestingAndOpen = (this.getBusinessSource() == "Vesting/Death/Surrender of existing SBI Life's pension policy") ? true : false;
        var stringifyJson = JSON.stringify(data);
        sessionStorage.setItem('premiumCalcResponse', stringifyJson);
        window.location.href = "./../../PremiumCalSuccess/success.html";
    }).catch((error) => {
        console.log(" in error ", error);
        self.hideLoader();
    });
}