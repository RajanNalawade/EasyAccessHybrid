window.onload = function () {
  initState();
  initRelationSBI();
  initChanneltype();
}



function initState() {
  var state = document.getElementById("selState");
  for (var i = 0; i < statesAndCitiesArray.length; i++) {
    state.add(new Option(statesAndCitiesArray[i].stateName, statesAndCitiesArray[i].value));
  }

}

function initRelationSBI() {
  var rel = document.getElementById("selRelation");
  for (var i = 0; i < relationshipSBIArray.length; i++) {
    rel.add(new Option(relationshipSBIArray[i].relation, relationshipSBIArray[i].value));
  }
}

function initChanneltype() {
  var channel = document.getElementById("selChannelType");
  for (var i = 0; i < channelTypeArray.length; i++) {
    channel.add(new Option(channelTypeArray[i].channel, channelTypeArray[i].value));
  }
}

function expandCollapseNewsDetails(newsSubCardId) {
  var cardDisplayStyle = document.getElementById(newsSubCardId).style.display;
  if (cardDisplayStyle == "block") {
    expandCollapseCardDetails('none');
    document.getElementById(newsSubCardId).style.display = "none";
  } else {
    expandCollapseCardDetails('none');
    document.getElementById(newsSubCardId).style.display = "block";
  }
}

function expandCollapseCardDetails(displayStyle) {

  document.getElementById('myprofileSelected').style.display = displayStyle;
}

function validateState() {
  var state = getState();

  if (state == "" || state == "Select") {
    document.getElementById('stateNoErrId').style.display = "block";
    document.getElementById('stateNoErrId').innerHTML = "Please Select State.";
    return false;
  } else {
    document.getElementById('stateNoErrId').style.display = "none";
    return true;
  }

}

function validateChannelType() {
  var channel = getChannelType();

  if (document.getElementById('divChannelType').style.display == "block" && (channel == "" || channel == "Select")) {
    document.getElementById('channelNoErrId').style.display = "block";
    document.getElementById('channelNoErrId').innerHTML = "Please Select Channel Type.";
    return false;
  } else {
    document.getElementById('channelNoErrId').style.display = "none";
    return true;
  }

}

function validateCode() {
  var code = getCode();

  if (document.getElementById('divCode').style.display == "block" && code == "") {
    document.getElementById('codeNoErrId').style.display = "block";
    document.getElementById('codeNoErrId').innerHTML = "Please Select Code.";
    return false;
  } else {
    document.getElementById('codeNoErrId').style.display = "none";
    return true;
  }


}

function updateCity() {
  var divCity = document.getElementById("divCity");
  var mulcity = document.getElementById("selCity");

  var index = document.getElementById("selState").value;
  //console.log("name = ",statesAndCitiesArray[index].stateName)
  var cities = statesAndCitiesArray[index].cities;
  var len = cities.length;

  if (len > 0) {
    divCity.style.display = 'block';
    mulcity.options.length = 0;
    for (var i = 0; i < len; i++) {
      mulcity.add(new Option(cities[i]));
    }

  } else {
    mulcity.options.length = 0;
    divCity.style.display = 'none';
  }


}

function changeVisibility() {
  var selrelIdIndex = document.getElementById("selRelation").value;
  var selchannel = document.getElementById("selChannelType");
  var divChannelType = document.getElementById("divChannelType");
  var divCode = document.getElementById("divCode");

  var selrelId = relationshipSBIArray[selrelIdIndex].relation;


  // var selected=selrelId.options[selrelId.selectedIndex].value;

  if (selrelId == 'Customer') {

    selchannel.value = 'Select';
    document.getElementById("ipCode").value = "";

    divChannelType.style.display = 'none';
    divCode.style.display = 'none';
  } else if (selrelId == 'Sales Representative') {
    divChannelType.style.display = 'block';
    divCode.style.display = 'block';
  } else if (selrelId == 'SBI Life Employee') {

    selchannel.value = 'Select';

    divChannelType.style.display = 'none';
    divCode.style.display = 'block';
  } else if (selrelId == 'None of the above') {

    selchannel.value = 'Select';
    document.getElementById("ipCode").value = "";

    divChannelType.style.display = 'none';
    divCode.style.display = 'none';
  }

}

/* ***********************   GETTERS ************************* */
function getName() {
  return document.getElementById("ipName").value;
}

function getEmail() {
  return document.getElementById("ipEmail").value;
}

function getCity() {
  return document.getElementById("selCity").value;
}

function getState() {
  var index = document.getElementById("selState").value;
  var getstate;
  if (index == "" || index == "Select") {
    getstate = "";
  } else {
    getstate = statesAndCitiesArray[index].stateName;
  }

  return getstate;
  // return document.getElementById("selState").value;
}

function getMobile() {
  return document.getElementById("ipMobile").value;
}

function getChannelType() {
  var index = document.getElementById("selChannelType").value;
  var getchannel;
  if (index == "" || index == "Select") {
    getchannel = "";
  } else {
    getchannel = channelTypeArray[index].channel;
  }
  return getchannel;

  // return document.getElementById("selChannelType").value;
}


function getCode() {
  return document.getElementById("ipCode").value;
}



/************************************************************************** */

function saveEasyAccessProfileMethod() {



  let xmlBody = `<saveEasyAccessProfile xmlns="http://tempuri.org/">
                <profileName>${getName()}</profileName>
                <profileEmail>${getEmail()}</profileEmail>
                <profileMobile>${getMobile()}</profileMobile>
                <profileCity>${getCity() == "Select" ? "" : getCity()}</profileCity>
                <profileChannelType>${getChannelType() == "Select" ? "" : getChannelType()}</profileChannelType>
                <profileCode>${getCode()}</profileCode>
                <profileimeiNo></profileimeiNo>
                <strState>${getState()}</strState>
              </saveEasyAccessProfile>`;

  let body = `<?xml version="1.0" encoding="utf-8"?>
              <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
                <soap:Body>${xmlBody}</soap:Body>
              </soap:Envelope>`;

  showLoader();
  self.ApiCallService('/saveEasyAccessProfile', body, '<saveEasyAccessProfileResult>', '</saveEasyAccessProfileResult>').then((response) => {
    self.hideLoader();
    if (response !== undefined || response !== null) {


      console.log("Result :" + response.saveEasyAccessProfileResult.EasyAccessDownload.Table1.ErrorMsg);

      if (response.saveEasyAccessProfileResult.EasyAccessDownload.Table1.ErrorMsg == "Success") {
        alert("Profile saved Successfully");
        document.location.reload();

      } else {
        alert(response.saveEasyAccessProfileResult.EasyAccessDownload.Table1.ErrorMsg);
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




/* ******************************  FORM VALIDATION & SUBMIT **************************** */

function validatForm() {


  if (myprofileForm.checkValidity() && validateMobileNo(getMobile()) && validateState() &&
    validateChannelType() && validateCode()) {

    //console.log("name ",getName(), " email ", getEmail()," city ",getCity()," state ",getState()," mobile ",getMobile());

    saveEasyAccessProfileMethod();
  }
}