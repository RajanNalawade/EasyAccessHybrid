window.onload = function () {
    this.ready();
};

/* *************  VARIABLE DECLARATION ************** */
var productDetails;

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    document.getElementById('txtMembershipDate').value = $.datepicker.formatDate("dd/mm/yy", new Date());
    this.hideErrMsg();
    this.initArrayList();
    this.productDetails = this.getQueryStringDesializedData("premiumCalcProductDetails")
    this.initializeData()
};

function hideErrMsg() {
    // hideLoader();
    document.getElementById('divErrLoanTerm').style.display = 'none';
    document.getElementById('divErrDOB1').style.display = 'none';
    document.getElementById('divErrDOB2').style.display = 'none';
    document.getElementById('divErrMoraPeriod').style.display = 'none';
    document.getElementById('divErrConfirmEmailId').style.display = 'none';
    document.getElementById('divErrLoanAmt').style.display = 'none';
}

function showErrMsg(divId, errMsgId, errMsg) {
    document.getElementById(divId).style.display = "block";
    document.getElementById(errMsgId).innerHTML = errMsg;
}

function initializeData() {
    this.document.getElementById('productNameId').innerHTML = this.productDetails.title
    this.document.getElementById('uinNumberId').innerHTML = `(${this.productDetails.uinNumber.replace(/"/g, "").replace(/'/g, "").replace(/\(|\)/g, "")} | Product Code: ${this.productDetails.productCode})`;

    /* this.removeRequiredAttr('txtPfNoSourcing');
    this.removeRequiredAttr('txtPfNoHLSTStaff');
    this.removeRequiredAttr('txtPfNoHLSTHead'); */
    this.removeRequiredAttr('selectLoanSubCat');
    this.removeRequiredAttr('txtSecondaryBorrowerDOB');
    this.removeRequiredAttr('txtThirdBorrowerDOB');
    this.removeRequiredAttr('selectOption');
    this.removeRequiredAttr('txtFirstBorrowerLoanShare');
    this.removeRequiredAttr('txtSecondBorrowerLoanShare');
    this.removeRequiredAttr('txtThirdBorrowerLoanShare');
}

function initArrayList() {
    document.getElementById('divSecondBorrower').style.display = 'none';
    document.getElementById('divThirdBorrower').style.display = 'none';
    document.getElementById('divOption').style.display = 'none';
    document.getElementById('divLoanSharePrimary').style.display = 'none';
    document.getElementById('divLoanShareSecond').style.display = 'none';
    document.getElementById('divLoanShareThird').style.display = 'none';

    staffNonStaffListElement = document.forms["rinnRakshaSingleForm"]["staff/nonstaff"];
    for (i = 0; i < staffOrNonStaffList.length; i++) {
        staffNonStaffListElement.add(new Option(staffOrNonStaffList[i].title, staffOrNonStaffList[i].value));
    }

    /* sourcedByListElement = document.forms["rinnRakshaSingleForm"]["sourcedBy"];
    for (i = 0; i < sourcedByList.length; i++) {
        sourcedByListElement.add(new Option(sourcedByList[i].title, sourcedByList[i].value));
    } */

    loanTypeListElement = document.forms["rinnRakshaSingleForm"]["loanType"];
    for (i = 0; i < loanTypeList.length; i++) {
        loanTypeListElement.add(new Option(loanTypeList[i].title, loanTypeList[i].value));
    }

    let loanType = getLoanType();
    this.bindStaffInterestRate(loanType.value);

    this.bindCoBorrowerOption(loanType);

    premPaidListElement = document.forms["rinnRakshaSingleForm"]["premiumPaid"];
    for (i = 0; i < premiumPaidByList.length; i++) {
        premPaidListElement.add(new Option(premiumPaidByList[i].title, premiumPaidByList[i].value))
    }

    //    document.forms["rinnRakshaSingleForm"]["premiumFreqMode"].value = 'Single';

    premFreqModeElement = document.forms["rinnRakshaSingleForm"]["premiumFreqMode"];
    for (i = 0; i < premiumFrequencyModeList.length; i++) {
        premFreqModeElement.add(new Option(premiumFrequencyModeList[i].title, premiumFrequencyModeList[i].value));
    }

    moratoriumListElement = document.forms["rinnRakshaSingleForm"]["Moratorium"];
    for (i = 0; i < interestPaymentList.length; i++) {
        moratoriumListElement.add(new Option(interestPaymentList[i].title, interestPaymentList[i].value))
    }

    moratoriumPeriodListElement = document.forms["rinnRakshaSingleForm"]["moratoriumPeriod"];
    for (i = minMoratoriumEducationLoan; i <= maxMoratoriumEducationLoan; i++) {
        moratoriumPeriodListElement.add(new Option(i));
    }

    interestPaymentListElement = document.forms["rinnRakshaSingleForm"]["interestPayment"];
    for (i = 0; i < interestPaymentList.length; i++) {
        interestPaymentListElement.add(new Option(interestPaymentList[i].title, interestPaymentList[i].value))
    }

    optionListElement = document.forms["rinnRakshaSingleForm"]["option"];
    for (i = 0; i < eachBorrowerCoveredList.length; i++) {
        optionListElement.add(new Option(eachBorrowerCoveredList[i].title, eachBorrowerCoveredList[i].value))
    }
}

function removeRequiredAttr(domID) {
    document.getElementById(domID).removeAttribute('required');
}

function addRequiredAttr(domID) {
    document.getElementById(domID).setAttribute('required', "");
}

/**********************DOM Events*************************/
function onChangeStaff() {
    let isStaff = getStaff();

    onChangeLoanType();

    if (isStaff.title === 'Non-Staff') {
        let loanType = getLoanType();
        this.bindNonStaffInterestRate(loanType.value);

    } else if (isStaff.title === 'Staff') {
        let loanType = getLoanType();
        this.bindStaffInterestRate(loanType.value);
    }
}

/* function onChangeSourcedBy() {
    let sourcedBy = getSourcedBy();

    if (sourcedBy.title === 'Branch') {
        document.getElementById('divPFSourceBranch').style.display = 'block';
        this.addRequiredAttr('txtPfNoSourcing');
        document.getElementById('divPfHLSTStaff').style.display = 'none';
        this.removeRequiredAttr('txtPfNoHLSTStaff');
        document.getElementById('divPfHLSTHead').style.display = 'none';
        this.removeRequiredAttr('txtPfNoHLSTHead');
    } else if (sourcedBy.title === 'HLST or MPST') {
        document.getElementById('divPFSourceBranch').style.display = 'none';
        this.removeRequiredAttr('txtPfNoSourcing');
        document.getElementById('divPfHLSTStaff').style.display = 'block';
        this.addRequiredAttr('txtPfNoHLSTStaff');
        document.getElementById('divPfHLSTHead').style.display = 'block';
        this.addRequiredAttr('txtPfNoHLSTHead');
    } else if (sourcedBy.title === 'HLC') {
        document.getElementById('divPFSourceBranch').style.display = 'none';
        this.removeRequiredAttr('txtPfNoSourcing');
        document.getElementById('divPfHLSTStaff').style.display = 'none';
        this.removeRequiredAttr('txtPfNoHLSTStaff');
        document.getElementById('divPfHLSTHead').style.display = 'none';
        this.removeRequiredAttr('txtPfNoHLSTHead');
    }
} */

function onChangeLATitle() {
    let title = getLATitle();

    if (title === 'Mr.') {
        document.getElementById('txtGender').value = 'Male';
    } else {
        document.getElementById('txtGender').value = 'Female';
    }
}

function onChangeMoratorium() {
    if (getMoratorium().title === 'Yes') {
        document.getElementById('divMoratorium').style.display = 'block';
    } else {
        document.getElementById('divMoratorium').style.display = 'none';
    }
}

/* function setAge() {
    let dob = getDOB();
    document.getElementById('txtPrimaryBorrowerDOB').value = dob;
} */

function onChangeLoanType() {
    let loanType = getLoanType();
    let staff = getStaff();

    if (staff.title === 'Staff') {
        this.bindStaffInterestRate(loanType.value);
    } else {
        this.bindNonStaffInterestRate(loanType.value);
    }

    document.getElementById('divMoratoriumMain').style.display = 'none';
    document.getElementById('divOption').style.display = 'none';
    document.getElementById('divSecondBorrower').style.display = 'none';
    this.removeRequiredAttr('txtSecondaryBorrowerDOB');
    document.getElementById('divThirdBorrower').style.display = 'none';
    this.removeRequiredAttr('txtThirdBorrowerDOB');
    document.getElementById('divLoanSharePrimary').style.display = 'none';
    this.removeRequiredAttr('txtFirstBorrowerLoanShare');
    document.getElementById('divLoanSharePrimary').style.display = 'none';
    this.removeRequiredAttr('txtFirstBorrowerLoanShare');
    document.getElementById('divLoanShareSecond').style.display = 'none';
    this.removeRequiredAttr('txtSecondBorrowerLoanShare');
    document.getElementById('divLoanShareThird').style.display = 'none';
    this.removeRequiredAttr('txtThirdBorrowerLoanShare');

    if (loanType.title === 'Home Loan') {
        document.getElementById('divLoanSubCat').style.display = 'none';
        this.removeRequiredAttr('selectLoanSubCat');
        document.getElementById('divMoratoriumMain').style.display = 'block';
        document.getElementById('divMoratorium').style.display = 'none';
        document.getElementById('divCoBorrower').style.display = 'block';

        this.bindCoBorrowerOption(loanType);
    } else if (loanType.title === 'Personal Loan') {
        document.getElementById('divMoratoriumMain').style.display = 'none';
        document.getElementById('divMoratorium').style.display = 'none';
        document.getElementById('divLoanSubCat').style.display = 'block';
        this.addRequiredAttr('selectLoanSubCat');
        document.getElementById('divCoBorrower').style.display = 'block';
        interestPaymentListElement = document.forms["rinnRakshaSingleForm"]["loanSubCat"];
        interestPaymentListElement.options.length = 0;
        interestPaymentListElement.add(new Option(loanTypeList[1].subCategoryList[0].subCategoryTitle, loanTypeList[1].subCategoryList[0].value));

        if (staff.title === 'Non-Staff') {
            interestPaymentListElement.add(new Option(loanTypeList[1].subCategoryList[1].subCategoryTitle, loanTypeList[1].subCategoryList[1].value));
            interestPaymentListElement.add(new Option(loanTypeList[1].subCategoryList[2].subCategoryTitle, loanTypeList[1].subCategoryList[2].value));
        }

        this.bindCoBorrowerOption(loanType);
    } else if (loanType.title === 'Education Loan') {
        document.getElementById('divLoanSubCat').style.display = 'none';
        this.removeRequiredAttr('selectLoanSubCat');
        document.getElementById('divMoratoriumMain').style.display = 'none';
        document.getElementById('divMoratorium').style.display = 'block';
        document.getElementById('divCoBorrower').style.display = 'none';
    } else if (loanType.title === 'Vehicle Loan') {
        document.getElementById('divLoanSubCat').style.display = 'none';
        this.removeRequiredAttr('selectLoanSubCat');
        document.getElementById('divMoratoriumMain').style.display = 'none';
        document.getElementById('divMoratorium').style.display = 'none';
        document.getElementById('divCoBorrower').style.display = 'block';

        this.bindCoBorrowerOption(loanType);
    }
}

function setInterestRange() {

    interestRangeElement = document.forms["rinnRakshaSingleForm"]["interestRate"];
    interestRangeElement.options.length = 0;

    let loanSubType = getSubCategory();
    if (loanSubType) {

        console.log('sub type' + loanSubType.subCategoryTitle);

        if (loanSubType.subCategoryTitle === 'Personal Loan') {

            for (j = 0; j < nonStaffInterestRateRange[1].interestRateRange[0].interestRateSybRange.length; j++) {
                interestRangeElement.add(new Option(nonStaffInterestRateRange[1].interestRateRange[0].interestRateSybRange[j].interestRateString,
                    nonStaffInterestRateRange[1].interestRateRange[0].interestRateSybRange[j].value));
            }

        } else if (loanSubType.subCategoryTitle === 'Mortgage Loan') {
            for (j = 0; j < nonStaffInterestRateRange[1].interestRateRange[1].interestRateSybRange.length; j++) {
                interestRangeElement.add(new Option(nonStaffInterestRateRange[1].interestRateRange[1].interestRateSybRange[j].interestRateString,
                    nonStaffInterestRateRange[1].interestRateRange[1].interestRateSybRange[j].value));
            }

        } else if (loanSubType.subCategoryTitle === 'Home Loan Equity') {
            for (j = 0; j < nonStaffInterestRateRange[1].interestRateRange[2].interestRateSybRange.length; j++) {
                interestRangeElement.add(new Option(nonStaffInterestRateRange[1].interestRateRange[2].interestRateSybRange[j].interestRateString,
                    nonStaffInterestRateRange[1].interestRateRange[2].interestRateSybRange[j].value));
            }

        }
    } else {
        for (j = 0; j < nonStaffInterestRateRange[1].interestRateRange[0].interestRateSybRange.length; j++) {
            interestRangeElement.add(new Option(nonStaffInterestRateRange[1].interestRateRange[0].interestRateSybRange[j].interestRateString,
                nonStaffInterestRateRange[1].interestRateRange[0].interestRateSybRange[j].value));
        }
    }

    onChangeInterestRate();
}

function onChangeLoanSubType() {
    setInterestRange();
}

function onChangeInterestRate() {
    let isStaff = getStaff().title;
    let interestIndex = document.getElementById('selectInterestRate').value;

    if (isStaff === 'Staff') {
        let interestRange = getStaffInterestRate();
        let coverRate = interestRange.interestRateRange[interestIndex].coverInterestRate;
        document.getElementById('txtCoverInterestRate').value = coverRate;
    } else if (isStaff === 'Non-Staff') {
        let interestRange = getNonStaffInterestRate();
        console.log("rate : " + interestRange)

        let loanType = getLoanType();
        if (loanType.value == 1) {

            let subTypeVal = getSubCategory();

            let coverRate = '';
            if(subTypeVal){
                coverRate = interestRange.interestRateRange[subTypeVal.value].interestRateSybRange[interestIndex].coverInterestRate;
            }else{
                coverRate = interestRange.interestRateRange[0].interestRateSybRange[interestIndex].coverInterestRate;
            }
            document.getElementById('txtCoverInterestRate').value = coverRate;

        } else {
        let coverRate = interestRange.interestRateRange[interestIndex].coverInterestRate;

        document.getElementById('txtCoverInterestRate').value = coverRate;
    }
}
}

function onChangeCoBorrowerOption() {
    let coBorrowerOption = getCoBorrowerOption();
    let loanType = getLoanType();

    if (coBorrowerOption === '0') {
        document.getElementById('divSecondBorrower').style.display = 'none';
        this.removeRequiredAttr('txtSecondaryBorrowerDOB');
        document.getElementById('divThirdBorrower').style.display = 'none';
        this.removeRequiredAttr('txtThirdBorrowerDOB');

        document.getElementById('divOption').style.display = 'none';
        document.getElementById('divLoanSharePrimary').style.display = 'none';
        this.removeRequiredAttr('txtFirstBorrowerLoanShare');
        document.getElementById('divLoanShareSecond').style.display = 'none';
        this.removeRequiredAttr('txtSecondBorrowerLoanShare');
        document.getElementById('divLoanShareThird').style.display = 'none';
        this.removeRequiredAttr('txtThirdBorrowerLoanShare');
    } else if (coBorrowerOption === '1') {
        document.getElementById('divSecondBorrower').style.display = 'block';
        this.addRequiredAttr('txtSecondaryBorrowerDOB');
        document.getElementById('divThirdBorrower').style.display = 'none';
        this.removeRequiredAttr('txtThirdBorrowerDOB');

        if (loanType.title === 'Home Loan') {
            document.getElementById('divOption').style.display = 'block';
        } else {
            document.getElementById('divOption').style.display = 'none';
        }

    } else if (coBorrowerOption === '2') {
        document.getElementById('divSecondBorrower').style.display = 'block';
        this.addRequiredAttr('txtSecondaryBorrowerDOB');
        document.getElementById('divThirdBorrower').style.display = 'block';
        this.addRequiredAttr('txtThirdBorrowerDOB');

        if (loanType.title === 'Home Loan') {
            document.getElementById('divOption').style.display = 'block';
        } else {
            document.getElementById('divOption').style.display = 'none';
        }
    }
}

function onChangeOption() {
    let option = getOption();
    let coBorrowerOption = getCoBorrowerOption();

    if (option.title === '1') {
        document.getElementById('divLoanSharePrimary').style.display = 'none';
        this.removeRequiredAttr('txtFirstBorrowerLoanShare');
        document.getElementById('divLoanShareSecond').style.display = 'none';
        this.removeRequiredAttr('txtSecondBorrowerLoanShare');
        document.getElementById('divLoanShareThird').style.display = 'none';
        this.removeRequiredAttr('txtThirdBorrowerLoanShare');

    } else {
        if (coBorrowerOption === '1') {
            document.getElementById('divLoanSharePrimary').style.display = 'block';
            this.addRequiredAttr('txtFirstBorrowerLoanShare');
            document.getElementById('divLoanShareSecond').style.display = 'block';
            this.addRequiredAttr('txtSecondBorrowerLoanShare');
            document.getElementById('divLoanShareThird').style.display = 'none';
            this.removeRequiredAttr('txtThirdBorrowerLoanShare');
        } else if (coBorrowerOption === '2') {
            document.getElementById('divLoanSharePrimary').style.display = 'block';
            this.addRequiredAttr('txtFirstBorrowerLoanShare');
            document.getElementById('divLoanShareSecond').style.display = 'block';
            this.addRequiredAttr('txtSecondBorrowerLoanShare');
            document.getElementById('divLoanShareThird').style.display = 'block';
            this.removeRequiredAttr('txtThirdBorrowerLoanShare');
        }
    }
}

function bindCoBorrowerOption(loanType) {
    coBorrowerOptionElement = document.forms["rinnRakshaSingleForm"]["coBorrowerOption"];
    coBorrowerOptionElement.options.length = 0;
    for (i = 0; i < coBorrowerOptionsList[loanType.value].coBorrowerList.length; i++) {
        coBorrowerOptionElement.add(new Option(coBorrowerOptionsList[loanType.value].coBorrowerList[i].title, coBorrowerOptionsList[loanType.value].coBorrowerList[i].value))
    }
}

function bindStaffInterestRate(loanTypeIndex) {
    interestRangeElement = document.forms["rinnRakshaSingleForm"]["interestRate"];
    interestRangeElement.options.length = 0;
    for (i = 0; i < staffInterestRateRange[loanTypeIndex].interestRateRange.length; i++) {
        interestRangeElement.add(new Option(staffInterestRateRange[loanTypeIndex].interestRateRange[i].interestRateString, staffInterestRateRange[loanTypeIndex].interestRateRange[i].value));
    }

    onChangeInterestRate();
}

function bindNonStaffInterestRate(loanTypeIndex) {

    if (loanTypeIndex === 1) {

        setInterestRange();

    } else {

        interestRangeElement = document.forms["rinnRakshaSingleForm"]["interestRate"];
    interestRangeElement.options.length = 0;
    for (i = 0; i < nonStaffInterestRateRange[loanTypeIndex].interestRateRange.length; i++) {
        interestRangeElement.add(new Option(nonStaffInterestRateRange[loanTypeIndex].interestRateRange[i].interestRateString, nonStaffInterestRateRange[loanTypeIndex].interestRateRange[i].value));
        }
        onChangeInterestRate();
    }
}

/**********************Validatons**************************/
//Validate whether date of birth is entered
function valBorrowerDetails() {

    let primaryBorrowrDOB = document.getElementById('txtPrimaryBorrowerDOB').value;
    let loanType = getLoanType();
    let coBorrowerOption = getCoBorrowerOption();


    if (primaryBorrowrDOB === "") {

        this.showErrMsg('divErrDOB0', 'errDOB0', "Please enter Primary Borrower Date of Birth");
        return false;

    } else {
        if (loanType.title === "Home Loan" || loanType.title === "Vehicle Loan" ||
            loanType.title === "Personal Loan") {

            if (coBorrowerOption === '2') {
                if (getSecondDOB() === "") {
                    this.showErrMsg('divErrDOB1', 'errDOB1', "Please enter Second Borrower Date of Birth");
                    return false;

                } else if (getThirdDOB() === '') {

                    this.showErrMsg('divErrDOB2', 'errDOB2', "Please enter Third Borrower Date of Birth");
                    return false;
                }
            } else if (coBorrowerOption === '1') {
                if (getSecondDOB() === "") {
                    this.showErrMsg('divErrDOB1', 'errDOB1', "Please enter Second Borrower Date of Birth");
                    return false;
                }
            }
        }
    }
    return true;
}

function valMembershipDate() {

    if (getMembershipDate() === "") {

        this.showErrMsg('divErrMemberDate', 'errMemberDate', "Please Enter MemberShip Date");
        return false;
    }
    return true;
}

function validateLoanAmount() {
    let loanType = getLoanType();
    let loanAmount = getLoanAmount();

    if (loanAmount === "") {
        this.showErrMsg('divErrLoanAmt', 'errLoanAmt', 'Please enter Loan Amount');
        return false;
    } else if (loanType.title === 'Home Loan' && loanAmount < 10000) {
        this.showErrMsg('divErrLoanAmt', 'errLoanAmt', 'Please enter valid Loan Amount(Min. limit is Rs.10,000)');
        return false;
    } else if (loanType.title === 'Personal Loan') {

        let loanSubType = getSubCategory();
        if (loanSubType.subCategoryTitle === "Mortgage Loan") {
            if (loanAmount < 50000 || loanAmount > 10000000) {
                this.showErrMsg('divErrLoanAmt', 'errLoanAmt', "Please enter Loan Amount in the range of Rs. 50,000 to Rs. 1,00,00,000");
                return false;
            }
        } else if (loanSubType.subCategoryTitle === "Personal Loan") {
            if (loanAmount < 10000 || loanAmount > 20000000) {
                this.showErrMsg('divErrLoanAmt', 'errLoanAmt', "Please enter Loan Amount in the range of Rs. 10,000 to Rs. 2,00,00,000");
            return false;
        }
        } else if (loanSubType.subCategoryTitle === "Home Loan Equity") {

            if (loanAmount < 50000 || loanAmount > 200000000) {
                this.showErrMsg('divErrLoanAmt', 'errLoanAmt', "Please enter Loan Amount in the range of Rs. 50,000 to Rs. 20,00,00,000");
            return false;
        }

        }
    } else if (loanType.title === "Vehicle Loan" && ((loanAmount < 10000) || (loanAmount > 5000000))) {
        this.showErrMsg('divErrLoanAmt', 'errLoanAmt', "Please enter Loan Amount in the range of Rs. 10,000 to Rs. 50,00,000");
            return false;
    } else if (loanType.title === "Education Loan" /* && spnr_bankOption.getSelectedItem().toString().equals("Associate Bank") */ &&
        ((loanAmount < 10000) || (loanAmount > 3000000))) {

        this.showErrMsg('divErrLoanAmt', 'errLoanAmt',
            "Please enter Loan Amount for Associate Bank in the range of Rs. 10,000 to Rs. 30,00,000");
        return false;
    } else if (loanType.title === "Education Loan" /* && spnr_bankOption.getSelectedItem().toString().equals("SBI") */ &&
        ((loanAmount < 10000) || (loanAmount > 15000000))) {

        this.showErrMsg('divErrLoanAmt', 'errLoanAmt',
            "Please enter Loan Amount for SBI Bank in the range of Rs. 10,000 to Rs. 1,50,00,000");

        return false;
    }

        return true;

}

function validateLoanTerm() {
    let loanTerm = getLoanTerm();
    let loanType = getLoanType();
    let loanSubType = getSubCategory().subCategoryTitle;
    let isStaff = getStaff().title;
    let coBorrowerOption = getCoBorrowerOption();

    let primaryBorrowrDOB = document.getElementById('txtPrimaryBorrowerDOB').value;
    let secondBorrowrDOB = getSecondDOB();
    let thirdBorrowerDOB = getThirdDOB();
    let maxLoanTerm = 0;
    let minLoanTerm;

    if (loanTerm === '') {
        this.showErrMsg('divErrLoanTerm', 'errLoanTerm', "Please enter Loan Term");
        return false;
    } else if (loanType.title === "Home Loan") {

        if (isStaff === 'Staff') {

            if (coBorrowerOption === '0') {

                maxLoanTerm = Math.min(
                    (840 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12)), 360);
            } else if (coBorrowerOption === '1') {
                maxLoanTerm = Math.min(840 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12),
                    (Math.min((840 - (getAgeFromBirthdate(getDDMMYYYY(secondBorrowrDOB)) * 12)), 360)));
            } else if (coBorrowerOption === '2') {

                maxLoanTerm = Math.min(Math.min(
                        (840 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12)),
                        (840 - (getAgeFromBirthdate(getDDMMYYYY(secondBorrowrDOB)) * 12))), Math
                    .min((840 - (getAgeFromBirthdate(getDDMMYYYY(thirdBorrowerDOB)) * 12)), 360));
            }

            if ((loanTerm < 96) || (loanTerm > maxLoanTerm)) {

                this.showErrMsg('divErrLoanTerm', 'errLoanTerm', "Please enter valid Loan Term [Min.96 Months & Max." +
                    maxLoanTerm + " Months]");
                return false;
            }

        } else {
            if (coBorrowerOption === '0') {

                maxLoanTerm = Math.min(
                    (900 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12)), 360);
            } else if (coBorrowerOption === '1') {
                maxLoanTerm = Math.min(900 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12),
                    (Math.min((900 - (getAgeFromBirthdate(getDDMMYYYY(secondBorrowrDOB)) * 12)), 360)));
            } else if (coBorrowerOption === '2') {

                maxLoanTerm = Math.min(Math.min(
                        (900 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12)),
                        (900 - (getAgeFromBirthdate(getDDMMYYYY(secondBorrowrDOB)) * 12))), Math
                    .min((900 - (getAgeFromBirthdate(getDDMMYYYY(thirdBorrowerDOB)) * 12)), 360));
            }

            if ((loanTerm < 96) || (loanTerm > maxLoanTerm)) {

                this.showErrMsg('divErrLoanTerm', 'errLoanTerm', "Please enter valid Loan Term [Min.96 Months & Max." +
                    maxLoanTerm + " Months]");
                return false;
            }
        }

    } else if (loanType.title === "Personal Loan") {

        if (loanSubType === "Personal Loan" || loanSubType === "Mortgage Loan") {

            if (coBorrowerOption === '0') {

                maxLoanTerm = Math.min(
                    (840 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12)), 120);
            } else if (coBorrowerOption === '1') {
                maxLoanTerm = Math.min(840 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12),
                    (Math.min((840 - (getAgeFromBirthdate(getDDMMYYYY(secondBorrowrDOB)) * 12)), 120)));
            } else if (coBorrowerOption === '2') {

                maxLoanTerm = Math.min(Math.min(
                        (840 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12)),
                        (840 - (getAgeFromBirthdate(getDDMMYYYY(secondBorrowrDOB)) * 12))), Math
                    .min((840 - (getAgeFromBirthdate(getDDMMYYYY(thirdBorrowerDOB)) * 12)), 120));
            }

        } else {

            if (coBorrowerOption === '0') {

                maxLoanTerm = Math.min(
                    (840 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12)), 360);
            } else if (coBorrowerOption === '1') {
                maxLoanTerm = Math.min(840 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12),
                    (Math.min((840 - (getAgeFromBirthdate(getDDMMYYYY(secondBorrowrDOB)) * 12)), 360)));
            } else if (coBorrowerOption === '2') {

                maxLoanTerm = Math.min(Math.min(
                        (840 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12)),
                        (840 - (getAgeFromBirthdate(getDDMMYYYY(secondBorrowrDOB)) * 12))), Math
                    .min((840 - (getAgeFromBirthdate(getDDMMYYYY(thirdBorrowerDOB)) * 12)), 360));
            }
        }

        if (loanSubType === "Home Loan Equity") {
            minLoanTerm = 36;
        } else {
            minLoanTerm = 24;
        }

        if (loanTerm < minLoanTerm || loanTerm > maxLoanTerm) {
            this.showErrMsg('divErrLoanTerm', 'errLoanTerm', "Please enter valid Loan Term [Min." + minLoanTerm +
                " Months & Max." + maxLoanTerm + " Months]");
            return false;
        }

    } else if (loanType.title === "Vehicle Loan") {

        if (coBorrowerOption === '0') {

            maxLoanTerm = Math.min(
                (840 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12)), 180);
        } else if (coBorrowerOption === '1') {
            maxLoanTerm = Math.min(840 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12),
                (Math.min((840 - (getAgeFromBirthdate(getDDMMYYYY(secondBorrowrDOB)) * 12)), 180)));
        } else if (coBorrowerOption === '2') {

            maxLoanTerm = Math.min(Math.min(
                    (840 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12)),
                    (840 - (getAgeFromBirthdate(getDDMMYYYY(secondBorrowrDOB)) * 12))), Math
                .min((840 - (getAgeFromBirthdate(getDDMMYYYY(thirdBorrowerDOB)) * 12)), 180));
        }

        if (loanTerm < 36 || loanTerm > maxLoanTerm) {

            this.showErrMsg('divErrLoanTerm', 'errLoanTerm', "Please enter valid Loan Term [Min.36 Months & Max." +
                maxLoanTerm + " Months]");
            return false;
        }

    } else if (loanType.title === "Education Loan") {

        if (coBorrowerOption === '0') {

            maxLoanTerm = Math.min(
                (840 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12)), 240);
        } else if (coBorrowerOption === '1') {
            maxLoanTerm = Math.min(840 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12),
                (Math.min((840 - (getAgeFromBirthdate(getDDMMYYYY(secondBorrowrDOB)) * 12)), 240)));
        } else if (coBorrowerOption === '2') {

            maxLoanTerm = Math.min(Math.min(
                    (840 - (getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB)) * 12)),
                    (840 - (getAgeFromBirthdate(getDDMMYYYY(secondBorrowrDOB)) * 12))), Math
                .min((840 - (getAgeFromBirthdate(getDDMMYYYY(thirdBorrowerDOB)) * 12)), 240));
        }

        if (loanTerm < 36 || loanTerm > maxLoanTerm) {

            this.showErrMsg('divErrLoanTerm', 'errLoanTerm', "Please enter valid Loan Term [Min.36 Months & Max." +
                maxLoanTerm + " Months]");
            return false;
        }
    }
    return true;
}

function validateConfirmEmailRinn() {

    let mail = this.getEmail();
    if (mail === "") {
        this.showErrMsg('divErrConfirmEmailId', 'errConfirmEmailId', 'Please Enter Email ID');
        return false;
    } else if (mail !== this.getConfirmEmail()) {
        this.showErrMsg('divErrConfirmEmailId', 'errConfirmEmailId', 'Email Id and confirm Email Id do not match.');
        return false;
    } else {
        document.getElementById('divErrConfirmEmailId').style.display = "none";
        return true;
    }
}

function valBorrowerLoanShare() {
    var sumAssured1, sumAssured2, sumAssured3 = 0;

    let loanType = getLoanType().title;
    let coBorrowerOption = getCoBorrowerOption();
    let option = getOption().title;
    let loanAmt = getLoanAmount();

    if (loanType === "Home Loan" && option === '2' && (coBorrowerOption === '1' || coBorrowerOption === '2')) {

        var loanSharePerc1, loanSharePerc2, loanSharePerc3, sum;

        let loanShare1 = getLoanSharePrimary();
        let loanShare2 = getLoanShareSecondary();
        let loanShare3 = getLoanShareThird();

        if (getLoanSharePrimary() === '') {
            this.showErrMsg('divErrLoanShare1', 'errLoanShare1', "Please Enter 1st Borrower Loan Share in Percentage");
            return false;
        } else if (getLoanShareSecondary() === '') {
            this.showErrMsg('divErrLoanShare2', 'errLoanShare2', "Please Enter 2nd Borrower Loan Share in Percentage");
            return false;
        } else if (getLoanShareThird() == '' && coBorrowerOption === '2') {
            this.showErrMsg('divErrLoanShare3', 'errLoanShare3', "Please Enter 3rd Borrower Loan Share in Percentage");
            return false;
        } else {

            loanSharePerc1 = parseInt(loanShare1);
            loanSharePerc2 = parseInt(loanShare2);

            sumAssured1 = (loanSharePerc1 / 100) * loanAmt;
            sumAssured2 = (loanSharePerc2 / 100) * loanAmt;


            if (coBorrowerOption === '2') {

                loanSharePerc3 = parseInt(loanShare3);
                sumAssured3 = (loanSharePerc3 / 100) * loanAmt;
                sum = loanSharePerc1 + loanSharePerc2 + loanSharePerc3;
            } else
                sum = loanSharePerc1 + loanSharePerc2;

            if (sum != 100) {
                this.showErrMsg('divErrLoanShare', 'errLoanShare', 'Sum of the Borrower Loan Share in Percentage should be equal to 100');
                return false;
            } else {
                if (sumAssured1 < 10000) {
                    this.showErrMsg('divErrLoanShare', 'errLoanShare', 'Sum Assured for Borrower should not be less than Rs.10,000');
                    return false;
                }
                if (sumAssured2 < 10000) {
                    this.showErrMsg('divErrLoanShare', 'errLoanShare', 'Sum Assured for Co-Borrower 1 should not be less than Rs.10,000');
                    return false;
                }
                if (sumAssured3 < 10000 && coBorrowerOption === '2') {
                    this.showErrMsg('divErrLoanShare', 'errLoanShare', 'Sum Assured for Co-Borrower 2 should not be less than Rs.10,000');
                    return false;
                }
            }
        }
    }
    return true;
}

function validateAgeBorrower(borrower) {
    let minAgeLimit, maxAgeLimit, ageBorrower;
    let loanType = getLoanType();
    let loanSubCat = getSubCategory();
    let coBorrowerOption = getCoBorrowerOption();

    if (loanType.title === 'Home Loan') {
        minAgeLimit = minAge_HomeLoan;
        maxAgeLimit = maxAge_HomeLoan;
    } else if (loanType.title === 'Personal Loan') {

            minAgeLimit = minAge_PersonalLoan;
            maxAgeLimit = maxAge_PersonalLoan;

        if (loanSubCat.subCategoryTitle === 'Home Loan Equity') {
            minAgeLimit = minAge_PersonalLoan_HomeLoanEquity;
            maxAgeLimit = maxAge_PersonalLoan_HomeLoanEquity;
        }
    } else if (loanType.title === 'Vehicle Loan') {
        minAgeLimit = minAge_VehicleLoan;
        maxAgeLimit = maxAge_VehicleLoan;
    } else if (loanType.title === 'Education Loan') {
        minAgeLimit = minAge_EducationLoan;
        maxAgeLimit = maxAge_EducationLoan;
    }
    ageBorrower = getAgeFromBirthdate(getDDMMYYYY(getFirstDOB()));

    if (borrower === 'Primary') {
        let primaryBorrowrDOB = document.getElementById('txtPrimaryBorrowerDOB').value;
        ageBorrower = getAgeFromBirthdate(getDDMMYYYY(primaryBorrowrDOB));
    } else if (borrower === 'Second' && (loanType.title === 'Home Loan' || loanType.title === 'Vehicle Loan' ||
            loanType.title === 'Personal Loan') && (coBorrowerOption === '1' || coBorrowerOption === '2')) {

        ageBorrower = getAgeFromBirthdate(getDDMMYYYY(getSecondDOB()));
    } else if (borrower === 'Third' && (loanType.title === 'Home Loan' || loanType.title === 'Personal Loan') &&
        coBorrowerOption === '2') {

        ageBorrower = getAgeFromBirthdate(getDDMMYYYY(getThirdDOB()));
    }

    if (ageBorrower < minAgeLimit || ageBorrower > maxAgeLimit) {
        this.showErrMsg('divErrDOB' + coBorrowerOption, 'errDOB' + coBorrowerOption, 'Please enter a valid Date of Birth for ' + borrower + '. Min age limit is ' + minAgeLimit + ' yrs & max is ' + maxAgeLimit + 'yrs');
        return false;
    } else {
        document.getElementById('divErrDOB' + coBorrowerOption).style.display = "none";
        return true;
    }
}

function validateMoratoriumPeriod() {
    let loanType = getLoanType();
    let loanTerm = getLoanTerm();
    let moratoriumPeriod = getMoratoriumPeriod();

    if (loanType.title === 'Educational Loan') {
        if (loanTerm < moratoriumPeriod) {
            this.showErrMsg('divErrMoraPeriod', 'errMoraPeriod', 'Please enter Moratorium Period less than Loan Term.');
            return false;
        } else if ((parseInt(loanTerm) - parseInt(moratoriumPeriod)) < 12) {
            this.showErrMsg('divErrMoraPeriod', 'errMoraPeriod', 'Please enter Moratorium Period less than ' +
                parseInt(loanTerm) - 12);
            return false;
        }
        return true;
    }

    return true;
}

/**************************SUBMIT************************************/

function onCalculate() {
    console.log('Calcualte Button Clicked');
    if (rinnRakshaSingleForm.checkValidity() &&
    validateConfirmEmailRinn() &&
     validateLoanAmount() &&
             valMembershipDate() &&
             valBorrowerDetails() &&
             validateAgeBorrower('Primary') &&
             validateAgeBorrower('Second') &&
             validateAgeBorrower('Third')&&
             validateLoanTerm() &&
             validateMoratoriumPeriod() &&
             valBorrowerLoanShare()) {

        console.log('Validated');
        this.calculatePremiumAPICall();
    }
}

/**************************Service Call******************************/
function calculatePremiumAPICall() {
    let coBorrowerOption = getCoBorrowerOption();
    let DOB_Borrower1Str = '',
        DOB_Borrower2Str = '',
        DOB_Borrower3Str = '';

    let loanType = getLoanType().title;
    let loanAmount = getLoanAmount();
    let subCategory;
    let isMoratorium = getMoratorium().title;

    let interestIndex = document.getElementById('selectInterestRate').value;
    let isStaff = getStaff().title;
    let interestRate;

    if (coBorrowerOption === '0') {
        coBorrowerOption = 'Only Primary Borrower';
        DOB_Borrower1Str = getDDMMFromMMDDFormat(getDDMMYYYY(getFirstDOB()));
        DOB_Borrower2Str = '';
        DOB_Borrower3Str = '';
    } else if (coBorrowerOption === '1') {
        coBorrowerOption = '2 Co-Borrowers';
        DOB_Borrower1Str = getDDMMFromMMDDFormat(getDDMMYYYY(getFirstDOB()));
        DOB_Borrower2Str = getDDMMFromMMDDFormat(getDDMMYYYY(getSecondDOB()));
        DOB_Borrower3Str = '';
    } else if (coBorrowerOption === '2') {
        coBorrowerOption = '3 Co-Borrowers';
        DOB_Borrower1Str = getDDMMFromMMDDFormat(getDDMMYYYY(getFirstDOB()));
        DOB_Borrower2Str = getDDMMFromMMDDFormat(getDDMMYYYY(getSecondDOB()));
        DOB_Borrower3Str = getDDMMFromMMDDFormat(getDDMMYYYY(getThirdDOB()));
    }

    if (loanType === 'Personal Loan') {
        subCategory = getSubCategory().subCategoryTitle;
    } else {
        subCategory = '';
    }

    let moratoriumPeriod = getMoratoriumPeriod();
    if (moratoriumPeriod === '' || moratoriumPeriod === '0') {
        moratoriumPeriod = '3';
    }

    if (isStaff === 'Staff') {
        interestRate = getStaffInterestRate().interestRateRange[interestIndex].interestRateString;
    } else {

        interestRange = getNonStaffInterestRate();

        if (loanType === 'Personal Loan') {

            let subTypeVal = getSubCategory();

            interestRate = interestRange.interestRateRange[subTypeVal.value].interestRateSybRange[interestIndex].interestRateString;

        } else {
            interestRate = interestRange.interestRateRange[interestIndex].interestRateString;

        }
    }

    let isIntPayDuringMoratoStr = getInterestPayment().title;
    let isIntPayDuringMorato = '';

    if (loanType === "Education Loan") {
        if (isIntPayDuringMoratoStr === "Yes") {
            isIntPayDuringMorato = 'Yes';
        } else if (isIntPayDuringMoratoStr === "No") {
            isIntPayDuringMorato = "No";
        }
        } else {
        if ((isMoratorium === "Yes") && (isIntPayDuringMoratoStr === "Yes")) {
            isIntPayDuringMorato = "Yes";
        } else if ((isMoratorium === "Yes") && (isIntPayDuringMoratoStr === "No")) {
            isIntPayDuringMorato = "No";
        } else if ((isMoratorium === "No") && (isIntPayDuringMoratoStr === "No")) {
            isIntPayDuringMorato = "No";
        }
        }

    let optionStr = getOption().title;
    let LoanShareBorrower1, LoanShareBorrower2, LoanShareBorrower3;

    if (optionStr === "2") {
        if (coBorrowerOption === "2 Co-Borrowers") {
            LoanShareBorrower1 = getLoanSharePrimary();
            LoanShareBorrower2 = getLoanShareSecondary();
            LoanShareBorrower3 = 0;
        } else if (coBorrowerOption === "3 Co-Borrowers") {
            LoanShareBorrower1 = getLoanSharePrimary();
            LoanShareBorrower2 = getLoanShareSecondary();
            LoanShareBorrower3 = getLoanShareThird();
        }
    } else {
        LoanShareBorrower1 = 0;
        LoanShareBorrower2 = 0;
        LoanShareBorrower3 = 0;
    }

    let xmlBodyParam = `<getPremiumRinnRakshaNew xmlns="http://tempuri.org/">
      <DOB_Borrower1>${DOB_Borrower1Str}</DOB_Borrower1>
      <DOB_Borrower2>${DOB_Borrower2Str}</DOB_Borrower2>
      <DOB_Borrower3>${DOB_Borrower3Str}</DOB_Borrower3>
      <membershipDate>${getDDMMFromMMDDFormat(getMembershipDate())}</membershipDate>
      <coBorrowerOption>${coBorrowerOption}</coBorrowerOption>
      <moratoPeriod>${moratoriumPeriod}</moratoPeriod>
      <loanAmount>${loanAmount}</loanAmount>
      <loanTerm>${getLoanTerm()}</loanTerm>
      <loanType>${loanType}</loanType>
      <loanSubCategory>${subCategory}</loanSubCategory>
      <interestRateRange>${interestRate}</interestRateRange>
      <isMoratoChecked>${isMoratorium}</isMoratoChecked>
      <premPaidBy>${getPremiumPaidBy().title}</premPaidBy>
      <isIntPayDuringMorato>${isIntPayDuringMorato}</isIntPayDuringMorato>
      <CIR>${getCoverInterest()}</CIR>
      <isForStaff>${isStaff}</isForStaff>
      <isJKResident>false</isJKResident>
      <option>${optionStr}</option>
      <isCoBorrower>${coBorrowerOption}</isCoBorrower>
      <LoanShareBorrower1>${LoanShareBorrower1}</LoanShareBorrower1>
      <LoanShareBorrower2>${LoanShareBorrower2}</LoanShareBorrower2>
      <LoanShareBorrower3>${LoanShareBorrower3}</LoanShareBorrower3>
      <Premfreq>${getPremiumFrequency().title}</Premfreq>
      <KFC>false</KFC>
    </getPremiumRinnRakshaNew>`;

    //console.log(xmlBodyParam);

    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
    xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
    <soap:Body>
        ${xmlBodyParam}
    </soap:Body>
</soap:Envelope>`;

    showLoader();
    ApiCallService('/getPremiumRinnRakshaNew', body, '<rinnRaksha>', '</rinnRaksha>').then((data) => {
        hideLoader();
        data = data.rinnRaksha;
        data.productDetails = self.productDetails;

        let jsonInput = {
            'InputStaff' : isStaff +'',
            'InputLoanType' : loanType + '',
            'InputCoBorrower' : coBorrowerOption +''
        };
        data.input = jsonInput;
        var stringifyJson = JSON.stringify(data);
        console.log(data);
        sessionStorage.setItem('premiumCalcResponse',stringifyJson);
        window.location.href = "../../PremiumCalSuccess/success.html";
    }).catch((error) => {
        console.log(" in error ", error);
        hideLoader();
    });
}

/************************GETTERS**************************/
function getStaff() {
    let index = document.getElementById('selectStaff').value;
    return staffOrNonStaffList[index];
}

function getSourcedBy() {
    let index = document.getElementById('selectSourcedBy').value;
    return sourcedByList[index];
}

function getLATitle() {
    return document.getElementById('selectLATitle').value;
}

/* function getDOB() {
    return document.getElementById('txtDOB').value;
} */

function getFirstDOB() {
    return document.getElementById('txtPrimaryBorrowerDOB').value;
}

function getSecondDOB() {
    return document.getElementById('txtSecondaryBorrowerDOB').value;
}

function getThirdDOB() {
    return document.getElementById('txtThirdBorrowerDOB').value;
}

function getLoanType() {
    let index = document.getElementById('selectLoanType').value;
    return loanTypeList[index];
}

function getSubCategory() {
    let subCatIndex = document.getElementById('selectLoanSubCat').value;
    let catIndex = document.getElementById('selectLoanType').value;
    if (catIndex === '1') {
        return loanTypeList[catIndex].subCategoryList[subCatIndex];
    } else {
        return 0;
    }
}

function getStaffInterestRate() {
    let loanType = getLoanType();
    return staffInterestRateRange[loanType.value];
}

function getNonStaffInterestRate() {
    let loanType = getLoanType();
    return nonStaffInterestRateRange[loanType.value];
}

function getCoBorrowerOption() {
    let index = document.getElementById('selectCoBorrowerOption').value;
    return index;
}

function getLoanTerm() {
    return document.getElementById('txtLoanTerm').value;
}

function getOption() {
    let index = document.getElementById('selectOption').value;
    return eachBorrowerCoveredList[index];
}

function getEmail() {
    return document.getElementById('txtEmailId').value;
}

function getConfirmEmail() {
    return document.getElementById('txtConfirmEmailId').value;
}

function getLoanAmount() {
    return document.getElementById('txtLoanAmount').value;
}

function getMoratoriumPeriod() {
    return document.getElementById('selectMoratoriumPeriod').value;
}

function getMembershipDate() {
    return document.getElementById('txtMembershipDate').value;
}

function getPremiumPaidBy() {
    let index = document.getElementById('selectPremiumPaid').value;
    return premiumPaidByList[index];
}

function getLoanSharePrimary() {
    return document.getElementById('txtFirstBorrowerLoanShare').value;
}

function getLoanShareSecondary() {
    return document.getElementById('txtSecondBorrowerLoanShare').value;
}

function getLoanShareThird() {
    return document.getElementById('txtThirdBorrowerLoanShare').value;
}

function getPremiumFrequency() {
    let index = document.getElementById('selectPremiumFreqMode').value;
    return premiumFrequencyModeList[index];
}

function getInterestPayment() {
    let index = document.getElementById('selectInterestPayment').value;
    return interestPaymentList[index];
}

function getMoratorium() {
    let index = document.getElementById('selectMoratorium').value;
    return interestPaymentList[index];
}

function getCoverInterest() {
    return document.getElementById('txtCoverInterestRate').value;
}