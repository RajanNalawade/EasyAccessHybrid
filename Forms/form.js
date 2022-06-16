window.onload = function () {
    initializeDropdowns();
    setSubCategories("0");
    let generateID = new IDGenerator();
    let sessionID = generateID.generate();
    console.log("sessionid = ", sessionID);
}

function initializeDropdowns() {
    categoryListElement = document.forms["downloadFormsForm"]["categories"];
    for (i = 0; i < categoryList.length; i++) {
        categoryListElement.add(new Option(categoryList[i].title, categoryList[i].value));
    }
}

function setSubCategories(categoryIndex) {
    var subCategories;
    switch (categoryIndex) {
        case "0":
            subCategories = indexZeroList;
            break;
        case "1":
            subCategories = nominationSubCategoryList;
            break;
        case "2":
            subCategories = assignmentSubCategoryList;
            break;
        case "3":
            subCategories = surrenderSubCategoryList;
            break;
        case "4":
            subCategories = revivalSubCategoryList;
            break;
        case "5":
            subCategories = nameCorrectionSubCategoryList;
            break;
        case "6":
            subCategories = birthDateCorrectionSubCategoryList;
            break;
        case "7":
            subCategories = signChangeSubCategoryList;
            break;
        case "8":
            subCategories = paymentFrequencySubCategoryList;
            break;
        case "9":
            subCategories = AlternateModePaymentSubCategoryList;
            break;
        case "10":
            subCategories = addressCorrectionSubCategoryList;
            break;
        case "11":
            subCategories = fundSwitchSubCategoryList;
            break;
        case "12":
            subCategories = duplicatePolicySubCategoryList;
            break;
        case "13":
            subCategories = otherSubCategoryList;
            break;
    }

    document.forms["downloadFormsForm"]["subCategories"].options.length = 0
    subCategoriesDropdown = document.forms["downloadFormsForm"]["subCategories"];
    for (i = 0; i < subCategories.length; i++) {
        subCategoriesDropdown.add(new Option(subCategories[i]));
    }

}

function getCategory() {
    var index = document.forms["downloadFormsForm"]["categories"].value;
    return categoryList[index].title;
}

function getSubCategory() {
    var subCategory = document.forms["downloadFormsForm"]["subCategories"].value;
    return subCategory;
}

function validate() {
    if (getCategory() === "Select") {
        alert("Please select category");
    } else {
        if (getSubCategory() === "Select") {
            alert("Please select sub category");
        } else {
            downloadForm();
        }
    }
}

function downloadForm() {
    var downloadURL;
    if (getCategory() === ("Nomination")) {
        if (getSubCategory() === ("First Time Nomination Form")) {
            downloadURL = "http://www.sbilife.co.in/sbilife/images/File/documents/policy_servicing_forms/First_Time_Nomination_Form.pdf";
        } else if (getSubCategory() === ("Change in Nomination Form")) {
            downloadURL = "https://www.sbilife.co.in/Form-for-Change-of-Nomination---English";
        } else if (getSubCategory() === ("First Time Appointee Form")) {
            downloadURL = "http://www.sbilife.co.in/sbilife/images/File/documents/policy_servicing_forms/first_time_appointee_form.pdf";

        } else if (getSubCategory() === ("Change of Appointee Form")) {
            downloadURL = "https://www.sbilife.co.in/Form-for-Change-of-Appointee---English";
        }

    } else if (getCategory() === ("Assignment")) {

        if (getSubCategory() === ("Absolute Assignment for Natural Love and Affection - Individual")) {
            downloadURL = "https://www.sbilife.co.in/Absolute-Assignment-Form---English";
        } else if (getSubCategory() === ("Absolute Assignment for Valuable Consideration - Individual")) {
            downloadURL = "http://www.sbilife.co.in/sbilife/images/File/documents/policy_servicing_forms/absolute_assignment_for_valuable_consideration_individual.pdf";

        } else if (getSubCategory() === ("Absolute Assignment for Valuable Consideration - Trust,Institution,Bank")) {
            downloadURL = "http://www.sbilife.co.in/sbilife/images/File/documents/policy_servicing_forms/absolute_assignment_for_valuable_consideration_trust_institution_bank.pdf";

        } else if (getSubCategory() === ("Assignment for Key Man Insurance Policy")) {
            downloadURL = "https://www.sbilife.co.in/Assignment-for-Keyman-Insurance-Policy---English";
        } else if (getSubCategory() === ("Reassignment Form")) {
            downloadURL = "https://www.sbilife.co.in/Reassignment-Form---English";
        }

    } else if (getCategory() === ("Surrender")) {

        if (getSubCategory() === ("Partial Withdrawal cum Surrender Application Form")) {
            downloadURL = "https://www.sbilife.co.in/Partial-Withdrawal-Cum-Surrender-Application-Form---English";
        } else if (getSubCategory() === ("Indemnity Bond Format for Surrender")) {
            downloadURL = "http://www.sbilife.co.in/sbilife/images/File/documents/policy_servicing_forms/indemnity_bond_format_for_surrender.pdf";

        } else if (getSubCategory() === ("Mandate for Direct Credit of Policy Payouts")) {
            downloadURL = "https://www.sbilife.co.in/Mandate-for-Direct-Credit-of-Policy-Payouts---English";
        }

    } else if (getCategory() === ("Revival")) {

        if (getSubCategory() === ("Declaration of Good Health")) { //URL problem
            downloadURL = "https://www.sbilife.co.in/Declaration-of-Good-Health---English";
        }
    } else if (getCategory() === ("Change/Correction in name")) {
        if (getSubCategory() === ("Change/Correction in Name")) {
            downloadURL = "http://www.sbilife.co.in/sbilife/images/File/documents/policy_servicing_forms/policy_correction_form_V2.pdf";

        }

    } else if (getCategory() === ("Correction in Date of Birth")) {
        if (getSubCategory() === ("Correction in Date of Birth")) {
            downloadURL = "http://www.sbilife.co.in/sbilife/images/File/documents/policy_servicing_forms/policy_correction_form_V2.pdf";

        }

    } else if (getCategory() === ("Specimen Signature Form for signature changes")) {
        if (getSubCategory() === ("Specimen Signature Form for signature change")) {
            downloadURL = "http://www.sbilife.co.in/sbilife/images/File/documents/policy_servicing_forms/Specimen_Signature_Form_new2.pdf";

        }

    } else if (getCategory() === ("Request Payment Frequency")) {
        if (getSubCategory() === ("Change in Mode(Payment Frequency)")) {
            downloadURL = "http://www.sbilife.co.in/sbilife/images/File/documents/policy_servicing_forms/policy_correction_form_V2.pdf";

        }

    } else if (getCategory() === ("Mandate For Alternate Modes of Payments")) {

        if (getSubCategory() === ("ECS and Direct Debit Form")) {
            downloadURL = "http://www.sbilife.co.in/sbilife/images/File/documents/policy_servicing_forms/ECS_and_Direct_Debit_Form_ver02_1.pdf";

        } else if (getSubCategory() === ("SI EFT Mandate Form")) {
            downloadURL = "http://www.sbilife.co.in/sbilife/images/File/documents/policy_servicing_forms/SI_EFT_Mandate.pdf";

        } else if (getSubCategory() === ("Standing Instruction Mandate - Bank Account")) {
            downloadURL = "http://www.sbilife.co.in/sbilife/images/File/documents/policy_servicing_forms/Standing_Instruction_Mandate_Credit_Card_ver2.pdf";

        } else if (getSubCategory() === ("Standing Instruction Mandate - Credit Card")) {
            downloadURL = "http://www.sbilife.co.in/sbilife/images/File/documents/policy_servicing_forms/Standing_Instruction_Mandate_Credit_Card_ver2.pdf";

        }
    } else if (getCategory() === ("Change/Correction of Address")) {
        if (getSubCategory() === ("Change/Correction of Address")) {
            downloadURL = "http://www.sbilife.co.in/sbilife/images/File/documents/policy_servicing_forms/policy_correction_form_V2.pdf";

        }

    } else if (getCategory() === ("Fund Switch, Redirection and Partial Withdrawal Forms")) {

        if (getSubCategory() === ("Fund switch and Redirection form")) {
            downloadURL = "https://www.sbilife.co.in/Fund-Switch-and-Redirection-Form---English";
        } else if (getSubCategory() === ("T PIN Application form for Online Financial Transactions")) {
            downloadURL = "https://www.sbilife.co.in/T-PIN-Application-Form---English";
        } else if (getSubCategory() === ("Partial Withdrawal Cum Surrender Application Form")) {
            downloadURL = "https://www.sbilife.co.in/Partial-Withdrawal-Cum-Surrender-Application-Form---English";
        } else if (getSubCategory() === ("Mandate for Dirct Credit of Policy Payouts")) {
            downloadURL = "https://www.sbilife.co.in/Mandate-for-Direct-Credit-of-Policy-Payouts---English";
        }

    } else if (getCategory() === ("Dupliate Policy")) {
        if (getSubCategory() === ("Duplicate policy Questionnaire")) { //url error
            downloadURL = "https://www.sbilife.co.in/Duplicate-Policy-Questionnaire---English";
        } else if (getSubCategory() === ("Idemnity Bond Format for Duplicate Policy")) {
            downloadURL = "https://www.sbilife.co.in/Indemnity-Bond-for-Duplicate-Policy-Issuance---English";
        }

    } else if (getCategory() === ("Other")) {
        if (getSubCategory() === ("AB Rider Questionnaire")) {
            downloadURL = "https://www.sbilife.co.in/Ab-Rider-Questionnaire";
        } else if (getSubCategory() === ("Change in Photograph Form")) {
            downloadURL = "https://www.sbilife.co.in/Change-in-Photograph-Form";
        } else if (getSubCategory() === ("FLC Request letter")) { //url error
            downloadURL = "http://www.sbilife.co.in/sbilife/images/File/documents/policy_servicing_forms/FLC_Request_letter.pdf";

        } else if (getSubCategory() === ("Individual Premium Payment Challan")) {
            downloadURL = "https://www.sbilife.co.in/Individual-Premium-Payment-Challan";
        }
    }

    window.open(downloadURL, '_blank');
}
