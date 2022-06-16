window.onload = function () {
    this.ready();
};

/* *************  VARIABLE DECLARATION ************** */
var categoriesList = new Array();
var subcategoriesList = new Array();
var policyList = new Array();
var userId = 'dummy';

/* ************* PAGE ONLOAD FUNCTIONS ************** */
function ready() {
    intializeData();
}

function intializeData() {
    userId = getCustomerId();
    setPoliciesArray();
    getCategories();
}

// Set Policy Array from Session Storage
function setPoliciesArray() {
    let stringPolicyArray = sessionStorage.getItem('PolicyData');
    PolicyListElement = document.forms["queriesForm"]["policyNumber"];
    policyList = JSON.parse(stringPolicyArray).Table;
    for (i = 0; i < policyList.length; i++) {
        PolicyListElement.add(new Option(policyList[i].POLICYNO));
    }
}

function setCategoriesList() {
    // set Category list to update
    categoriesListElement = document.forms["queriesForm"]["categoriesList"];
    categoriesListElement.innerHTML = '';
    for (i = 0; i < categoriesList.length; i++) {
        categoriesListElement.add(new Option(categoriesList[i].CATEG_DESC, categoriesList[i].CATEG_ID));
    }
}

function setSubCategoriesList() {
    // set Sub Category list to update
    subCategoriesListElement = document.forms["queriesForm"]["subcategoriesList"];
    subCategoriesListElement.innerHTML = '';
    for (i = 0; i < subcategoriesList.length; i++) {
        subCategoriesListElement.add(new Option(subcategoriesList[i].SUB_CATEG_DESC, subcategoriesList[i].SUB_CATEG_ID));
    }
}

function onUpdateCategory() {
    getSubCategories();
}

function onSubmit() {
    if (queriesForm.checkValidity() && getCategory() !== "" && getSubCategory() !== "" && getPolicyNumber() !== "" && getDescription() !== "") {
        getComplaintDetails();
    }
}

function onReset() {
    if (getCategory() !== categoriesList[0].CATEG_ID) {
        document.forms["queriesForm"]["categoriesList"].value = categoriesList[0].CATEG_ID;
        getSubCategories();
    } else {
        document.forms["queriesForm"]["subcategoriesList"].value = subcategoriesList[0].SUB_CATEG_ID;
    }
    document.forms["queriesForm"]["policyNumber"].value = policyList[0];
    document.forms["queriesForm"]["description"].value = "";
}

function showPopUP(message) {
    document.getElementById('messageTextId').innerHTML = message;
    $("#myModal1").modal("show");
}

/* ********************   GETTERS *********************** */
function getCategory() {
    return document.forms["queriesForm"]["categoriesList"].value;
}

function getSubCategory() {
    return document.forms["queriesForm"]["subcategoriesList"].value;
}

function getPolicyNumber() {
    return document.forms["queriesForm"]["policyNumber"].value;
}

function getDescription() {
    return document.forms["queriesForm"]["description"].value;
}

/* ******************************  SERVICE CALLS **************************** */
function getCategories() {
    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <getComplaintCategory xmlns="http://tempuri.org/">
                    <user_id>${userId}</user_id>
                    </getComplaintCategory>
                </soap:Body>
                </soap:Envelope>`;
    showLoader();
    self.ApiCallService('/getComplaintCategory', body, '<getComplaintCategoryResult>', '</getComplaintCategoryResult>').then((response) => {
        self.hideLoader();
        if (response !== undefined || response !== null) {
            if (response.getComplaintCategoryResult.CustDls !== undefined) {
                response = response.getComplaintCategoryResult.CustDls;
                if (response.ScreenData !== undefined && response.ScreenData !== null) {
                    alert(response.ScreenData.ErrDesc);
                } else {
                    response = response.Table;
                    if (!Array.isArray(response)) {
                        var temp = response;
                        response = new Array();
                        response.push(temp);
                    }
                    categoriesList = response;

                    setCategoriesList();
                    getSubCategories();
                }

            } else {
                alert("No record found.");
            }
        } else {
            alert("Service Error occurred");
        }
    }).catch((error) => {
        console.log("err ", error);

        alert("Service Error occurred");
        self.hideLoader();
    });
}

function getSubCategories() {
    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <getSubComplaintCategory xmlns="http://tempuri.org/">
                    <user_id>${userId}</user_id>
                    <categoryId>${getCategory()}</categoryId>
                    </getSubComplaintCategory>
                </soap:Body>
                </soap:Envelope>`;
    showLoader();
    self.ApiCallService('/getSubComplaintCategory', body, '<getSubComplaintCategoryResult>', '</getSubComplaintCategoryResult>').then((response) => {
        self.hideLoader();
        if (response !== undefined || response !== null) {
            if (response.getSubComplaintCategoryResult.CustDls !== undefined) {
                response = response.getSubComplaintCategoryResult.CustDls;
                if (response.ScreenData !== undefined && response.ScreenData !== null) {
                    alert(response.ScreenData.ErrDesc);
                } else {
                    response = response.Table;
                    console.log("response ", getCategory(), " ", response);

                    if (!Array.isArray(response)) {
                        var temp = response;
                        response = new Array();
                        response.push(temp);
                    }
                    subcategoriesList = response;
                    setSubCategoriesList();
                }

            } else {
                alert("No record found.");
            }
        } else {
            alert("Service Error occurred");
        }
    }).catch((error) => {
        console.log("err ", error);

        alert("Service Error occurred");
        self.hideLoader();
    });
}

function getComplaintDetails() {
    let body = `<?xml version="1.0" encoding="utf-8"?>
                <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>
                    <saveComplaDtls xmlns="http://tempuri.org/">
                    <categ_id>${getCategory()}</categ_id>
                    <sub_categ_id>${getSubCategory()}</sub_categ_id>
                    <pl_pol_num>${getPolicyNumber()}</pl_pol_num>
                    <user_id>123</user_id>
                    <pr_person_id>0</pr_person_id>
                    <desc>${getDescription()}</desc>
                    </saveComplaDtls>
                </soap:Body>
                </soap:Envelope>`;
    // <user_id>${userId}</user_id>
    showLoader();
    self.ApiCallService('/saveComplaDtls', body, '<saveComplaDtlsResult>', '</saveComplaDtlsResult>').then((response) => {
        self.hideLoader();
        if (response !== undefined || response !== null) {
            if (response.saveComplaDtlsResult.ComplaintDt !== undefined) {
                response = response.saveComplaDtlsResult.ComplaintDt;
                if (response.ScreenData !== undefined && response.ScreenData !== null) {
                    alert(response.ScreenData.ErrDesc);
                } else {
                    response = response.Table1;
                    if (response.ErrCode == "0") {
                        saveEasyAccessServiceHits();
                    } else {
                        showPopUP("Send Feedback Failed..Try again..");
                    }
                }

            } else {
                alert("No record found.");
            }
        } else {
            alert("Service Error occurred");
        }
    }).catch((error) => {
        console.log("err ", error);

        alert("Service Error occurred");
        self.hideLoader();
    });
}

function saveEasyAccessServiceHits() {
    callServiceHits('saveComplaDtls', '', 'saveComplaDtls')
        .then((resolve) => {
            showPopUP("Your complaint has been forwarded to our Customer Service Department .We shall revert to you at the earliest.");
        }).catch((reject) => {
            console.log(reject);
        });
}