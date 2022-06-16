var user_id = '';
var server = 'http://172.16.18.4:82/'
var help_suggestions = ['Do you want me to help you with something?', 'May I help you with something?'];

var MODE_CLICK = 0;
var MODE_TYPE = 1;

function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

function shouldShowChatbox() {
  return true;
}


var related_questions_long = [
  "Tell me about Recommended Product 1",
  "Tell me about Recommended Product 2"
];

// Create the main chat-box-div
$('body').append($('<div/>', {
  id: 'chat-box-div',
  style: "display: none;"
}));

if (shouldShowChatbox()) {
  $('body').append($('<img>', {
    src: '../Chatbot/sites/SBILife/images/popup.png',
    id: 'mascot'
  }));
}


// Create the chat-box-head
$('#chat-box-div').append('');
$('#chat-box-div').append($('<div/>', {
  id: 'chat-box-head'
}));

$('#chat-box-head').append('<div class="row"><div class="hidden-xs col-sm-2 col-md-2  "><img src="../Chatbot/sites/SBILife/images/mascot.jpg" class="img-head img-responsive"></div><div class="col-xs-10 col-sm-8 col-md-8 "> <span id="menu-bar" > I am RIA - Real Intelligent Assistant</span></div><div class="col-xs-2 col-sm-2 col-md-2 pull-right  ">    <img src="../Chatbot/sites/SBILife/images/cross.png" id="close-button" class="menu-button img-responsive" ></div></div>');



// Add close-button span  


// Put the close-button inside span
/* $('#menu-bar').append($('<img>', {
  src: "../Chatbot/sites/SBILife/images/cross.png",
  width: 20,
  id: 'close-button',
  class: 'menu-button'
})); */


// Create the chat-box-main
$('#chat-box-div').append($('<div/>', {
  id: 'chat-div',
  class: 'panel-body chat-box-main'
}));

// Put the line breaks
$('#chat-div').append('<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>');

var base_response = '';

function get_current_time_in_milliseconds() {
  return (new Date()).getTime();
}

var last_asked = get_current_time_in_milliseconds();
var timeout_interval = 60000;
var help_request_shown = false;

setInterval(function () {
  if ((get_current_time_in_milliseconds() > last_asked + timeout_interval) && !help_request_shown && !$('#mascot').is(":visible")) {
    add_response(help_suggestions[Math.floor(Math.random() * help_suggestions.length)]);
    help_request_shown = true;
  }
}, timeout_interval);

// Add chat-box-space
$('#chat-box-div').append($('<div/>', {
  class: 'chat-box-space',
}).append($('<ul/>', {
  id: 'related-questions'
}).append($('<li/>', {
  class: 'related-question menu-item',
  id: 'main-menu',
  text: 'Refresh'
})).append($('<li/>', {
  class: 'related-question',
  id: 'related-question-0',
  text: 'Policy Details'
})).append($('<li/>', {
  class: 'related-question',
  id: 'related-question-1',
  text: 'Purchase'
}))).append('<br>'));

$('#chat-box-div').append($('<div/>', {
  class: 'chat-box-footer'
}).append($('<div/>', {
  class: 'input-group'
}).append($('<input>', {
  type: 'text',
  id: 'chat-text',
  class: 'form-control',
  placeholder: 'Ask me about SBI Life\'s Products and Services'
})).append($('<span/>', {
  class: 'input-group-btn'
}).append($('<button/>', {
  class: 'btn btn-info disabled send-button',
  id: 'send-button',
  type: 'button',
  text: 'Ask'
})))));

// Chatting code begins here //
$(document).ready(function () {

  //  alert("ondomcontentloaded");
  // window.onload = function() {
  user_id = getCookie('user_id');
  scroll_to_bottom();
});

function get_time() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  return hours + ':' + minutes + ' ' + ampm;
}

$('body').on('click', '.chipbutton', function () {
  $(this).css({
    'background-color': '#1e88e5'
  });
  $(this).css({
    'color': 'white'
  });
  $(this).css({
    'cursor': "default"
  });
  $(this).removeClass("chipbutton");
  // //removeClickablePropertyBut($(this));
  var sentence = $(this).text();
  sentence = $($.parseHTML(sentence)).text();
  if (sentence.length == 0) { // error!
    return;
  }
  //appendResponseUser($(this).text());
  add_query($(this).text());
  scroll_to_bottom();
  global_string = $(this).attr('pipe') + $(this).text() + "|";
  ajaxCallToIndex($(this).text(), "1");
});

function add_buttons(list, pipe) {
  var string = '<br><br><div class="do_delete">';

  for (var i = 0; i < list.length; i++) {
    if (list[i] == "Apply Now" || list[i] == "Get Now") {
      string += '<button class="button4 button5 chipbutton" pipe="' + pipe + '">';
      string += list[i];
      string += '</button>';
    } else {
      string += '<button class="button2 button3 chipbutton" pipe="' + pipe + '">';
      string += list[i];
      string += '</button>';
    }
  }
  string += "</div>";
  $("#chat-div").append(string);
}


function add_response(response) {
  //console.log("AAA");
  $("#chat-div").append('<div class="do_delete"><div class="talk-time-server"><img class="img-head talk-img-server" src="../Chatbot/sites/SBILife/images/mascot.jpg">' +
    '<div class="RIA"><strong>RIA</strong></div>' + '</div><div class="talk-bubble-left tri-right left-top""><div class="talktext"><p>' +
    response + '</p></div><div><p class="time" align="right">' + get_time() + '</p></div></div></div>');
  scroll_to_bottom();
  if (!isMobileDevice()) {
    $('#chat-text').focus();
  }
}

function add_query(text) {
  text = text.split(">").join("#");
  text = text.split("<").join("#");
  //console.log(text);
  $("#chat-div").append('<div class="do_delete"><div class="talk-time-user"><img class="img-head talk-img-user" src="../Chatbot/sites/SBILife/images/user.png">' +
    '<div class="You"><strong>YOU</strong></div>' + '<small class="time-right-div">' +
    '</small></div><div class="talk-bubble-right tri-right right-top""><div class="talktext"><p>' +
    text + '</p></div><div><p class="time" align="right">' + get_time() + '</p></div></div></div>');
}

function scroll_to_bottom() {
  $("#chat-div").stop().animate({
    scrollTop: $("#chat-div")[0].scrollHeight
  }, 1000);
}

function isMobileDevice() {
  return /Mobi/.test(navigator.userAgent);
}

var context = "general";

function set_context(ctx) {
  context = ctx;
}

function change_related_questions(response) {
  if ("short_question" in response) {
    $('#related-question-0').text(response.short_question[0]);
    $('#related-question-1').text(response.short_question[1]);
  }

  if ("click_question" in response) {
    related_questions_long[0] = response.click_question[0];
    related_questions_long[1] = response.click_question[1];
  }
}

function process_button(button_text, response_text) {
  add_query(button_text);
  add_response(response_text);
}

// function process(text, mode) {
//   text = $($.parseHTML(text)).text();
//   if (text.length == 0) {
//     return;
//   }

//   last_asked = get_current_time_in_milliseconds();
//   help_request_shown = false;
//   $("#chat-div").append('<div><div class="talk-time-user"><img class="img-head talk-img-user" src="../Chatbot/sites/SBILife/images/user.png">'
//     + '<div class="You"><strong>YOU</strong></div>' + '<small class="time-right-div">'
// + '</small></div><div class="talk-bubble-right tri-right right-top"><div class="talktext"><p>' 
// + text + '</p></div><div><p class="time" align="right">' + get_time() + '</p></div></div></div>');
//   scroll_to_bottom();

//   text = text.replace(/\W/g, ' ').trim().toLowerCase();

//   if (text == "assistance needed") {
//     context = "general"; 
//     add_response(base_response);
//     $("#chat-text").val("");
//     return;
//   }

//   $.ajax({
//     url: server + "message/",
//     type: "post",
//     dataType: 'json',
//     crossDomain: true,
//     data: { 
//       "message": text,
//       "user_id": user_id,
//       "mobile": isMobileDevice(),
//       "mode": mode
//     },
//     success: function(response) {
//       if (user_id != response.user_id) {
//         user_id = response.user_id;
//         setCookie('user_id', user_id, 10000);
//       }
//       add_response(response.answer);
//       change_related_questions(response);
//       set_context(response.context);
//     },
//     error: function(xhr, textstatus, errorthrown) {
//       add_response("Sorry, I may be down for routine maintenance.<br><br>Please dial 1800 22 9090 to contact our Customer care.<br><br>You can also visit our <a href='https://www.sbilife.co.in/en/about-us/contact-us' target='_blank'>Customer Care Portal</a> for assistance.");
//     }
//   });
//   $("#chat-text").val("");
//   $("#send-button").addClass("disabled");
// }

$("#send-button").click(function (e) {
  e.preventDefault();
  global_string += $("#chat-text").val() + "| ";
  process($("#chat-text").val(), MODE_TYPE);
});

function hide_chat_box() {
  $("#chat-box-div").slideUp("slow");
  $('#mascot').show();
}

$('#chat-text').keyup(function (e) {
  if ($("#chat-text").val().length > 0) {
    $("#send-button").removeClass("disabled");
  } else {
    $("#send-button").addClass("disabled");
  }
  if (e.which == 13) {
    global_string += $("#chat-text").val() + " | ";
    process($("#chat-text").val(), MODE_TYPE);
  } else if (e.which == 27) {
    hide_chat_box();
  }
});

var hidden = true;

$("#close-button").click(function (e) {
  hide_chat_box();
});

$("#main-menu").click(function (e) {
  ajaxCallToCancel();
});

$("#related-question-0").click(function (e) {
  ajaxCallToCancel1();
  process1("Show me my policy details.", MODE_CLICK);
});

$("#related-question-1").click(function (e) {
  ajaxCallToCancel1();
  process1("Purchase life insurance", MODE_CLICK);
});

// $('#mascot').click(function(e) {
//  if (base_response.length == 0) {
//   $.ajax({
//    url: ""+server+"basemessage/",
//    type: "post",
//    dataType: 'json',
//    crossDomain: true,
//    success: function(response) {
//     change_related_questions(response);
//     base_response = response.base_response;
//     help_suggestions[0] = response.help_suggestion1;
//     help_suggestions[1] = response.help_suggestion2;
//     add_response(base_response);
//     console.log(base_response);
//     console.log("Fetched base response");
//    },
//    error: function(xhr, textstatus, errorthrown) {
//     console.log("Error in fetching base response");
//    }
//   });
//  }
//   $('#mascot').hide();
//   $("#chat-box-div").slideDown("slow");
//   $(".chat-box-main").slideDown("slow");
//   $(".chat-box-space").slideDown("slow");
//   $(".chat-box-footer").slideDown("slow");
//   hidden = false;
//   scroll_to_bottom();
//   if (!isMobileDevice()) {
//     $('#chat-text').focus();
//   }
// });

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
      var cookie = jQuery.trim(cookies[i]);
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

var user_id = '';
var like_cnt = 2;
var query_cnt = 0;
var ask_3min = 1;
var mic_button_set = false;
var global_string = "";

var API_SERVER_URL = "https://chatbotuat.sbilife.co.in/chat/query";
//var API_SERVER_URL = "http://192.168.0.103:8000";
var STATIC_SERVER_URL = "";
//var STATIC_SERVER_URL = "http://192.168.0.103:8000";
var STATIC_IMG_PATH = "";

var URL_IDENTIFIER = "sbilifewebsite" // The url is built up like: API_SERVER_URL + URL_IDENTIFIER + METHOD NAME
// Example is: http://127.0.0.1:8000/chat/updateuser
//                  API_SERVER_URL        chat = URL_IDENTIFIER        updateuser = METHOD NAME

function setUUID(uuid) {
  if ((typeof uuid === 'undefined') || (uuid == null)) {
    user_id = guid();
    var csrftoken = getCookie('csrftoken');
    $.ajax({
      url: API_SERVER_URL + "/" + URL_IDENTIFIER + "/updateuser",
      type: "POST",
      data: {
        user_id: user_id,
        this_cookie: csrftoken,
      },
      success: function (data) {
        ////
        data = JSON.parse(data);
        response = data["response"]
        recommended_queries = data["recommended_queries"]
        is_typable = data["is_typable"]
        reponse = response.replace("background-color:#ffffff;", "");
        var string = "";
        if (!((typeof response === 'undefined') || (response == null))) {
          disableOrEnableInput(is_typable, response);
          ////
          list = splitByDollar(response);
          //console.log(list);
          ////
          if (!((typeof data["is_answer"] === 'undefined') || (data["is_answer"] == null))) {
            ////
            if (data["is_answer"] == "true") {
              global_string = "";
            }
            for (var i = 0; i < list.length; i++) {
              if (i == list.length - 1) {
                add_response(list[i]);
                //console.log("1");
              } else {
                //console.log("2");
                add_response(list[i]);
              }
            }
          } else {
            for (var i = 0; i < list.length; i++) {
              //console.log("3", list[i]);
              string = list[i];
            }

          }
        }
        string += "<br>";
        if (!((typeof recommended_queries === 'undefined') || (recommended_queries == null))) {
          //console.log(recommended_queries);
          string += "<ul>";
          for (var i = 0; i < recommended_queries.length; i++) {
            string += "<li>";
            string += '<a href="javascript:process1(\' ' + recommended_queries[i] + ' \', 0)">' + recommended_queries[i] + '</a>';
            string += "</li>";
          }
          string += "</ul>";
          //appendRecommendationsList(recommended_queries); // On HOld
        }
        string += '<br><br>';
        string += '<b>Disclaimer: </b>RIA (Real Intelligent Assistant) is a technology-based ChatBot of SBI Life Insurance. As the bot is still learning, please verify the response given by RIA from other sources of information.'
        add_response(string);
        //$("#query").focus();
      }
    });
  } else {
    user_id = uuid;
    ////
  }
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function setPcId(pcid) {
  if ((typeof pcid === 'undefined') || (pcid == null)) {
    pc_id = guid();
    //Cookies.set('pc_id', pc_id);
    var csrftoken = getCookie('csrftoken');
    $.ajax({
      url: API_SERVER_URL + "/" + URL_IDENTIFIER + "/pcid",
      type: "POST",
      data: {
        pcid: pc_id,
        this_cookie: csrftoken,
      },
      success: function (data) {}
    });
  }
}

function returnTime() {
  var d = new Date();
  var hours = d.getHours().toString();
  var minutes = d.getMinutes().toString();
  var flagg = "AM";
  if (parseInt(hours) > 12) {
    hours = hours - 12;
    flagg = "PM";
  }
  if (hours.length == 1) {
    hours = "0" + hours;
  }
  if (minutes.length == 1) {
    minutes = "0" + minutes;
  }

  var time = hours + ":" + minutes + " " + flagg;
  return time;
}

function convertStrongToBold(sentence) {
  if (!((typeof sentence === 'undefined') || (sentence == null))) {
    sentence = sentence.replace("<strong>", "<b>");
    sentence = sentence.replace("</strong>", "</b>");
  }
  return sentence;
}

function removeWhiteSpaces(sentence) {
  if (!((typeof sentence === 'undefined') || (sentence == null))) {
    sentence = sentence.replace(" ", "");
  }
  return sentence;
}

function enableInput(query) {
  $("#chat-text").removeAttr('disabled');
  if (!((typeof query === 'undefined') || (query == null))) {
    query = removePTag(query);
    $("#chat-text").attr("placeholder", "Please type your query here.");
  }
}

function disableInput() {
  $('#chat-text').val("");
  $('#chat-text').attr('placeholder', 'Please select an option from the above choices');
  $("#chat-text").attr('disabled', 'disabled');
}

function disableOrEnableInput(is_typable, query) {
  //
  if (!((typeof is_typable === 'undefined') || (is_typable == null))) {
    if (!((typeof query === 'undefined') || (query == null))) {
      if (is_typable == "false") {
        disableInput();
      } else if (is_typable == "true") {
        enableInput(query);
      }
    }
  }
}

function removePTag(sentence) {
  if (!((typeof sentence === 'undefined') || (sentence == null))) {
    sentence = sentence.replace("<p>", "");
    sentence = sentence.replace("</p>", "");
  }
  return sentence;
}

$('#mascot').click(function (e) {
  if (base_response.length == 0) {
    $("#chat-text").focus();
    var uuid = null;
    var pcid = null;
    setPcId(pcid);
    setUUID(uuid);
    $('#mascot').hide();
    $("#chat-box-div").slideDown("slow");
    $(".chat-box-main").slideDown("slow");
    $(".chat-box-space").slideDown("slow");
    $(".chat-box-footer").slideDown("slow");
    hidden = false;
    scroll_to_bottom();
    if (!isMobileDevice()) {
      $('#chat-text').focus();
    }
  }
});

function splitByDollar(sentence) {
  list = sentence.split("$$");
  return list;
}



function ajaxCallToIndex(sentence, clicked) {
  var csrftoken = getCookie('csrftoken');
  $.ajax({
    url: API_SERVER_URL + "/" + URL_IDENTIFIER + "/query/",
    type: "POST",
    data: {
      message: sentence,
      user_id: user_id,
      channel: "web",
      language: "eng",
      clicked: clicked,
      pipe: global_string,
      this_cookie: csrftoken,
    },
    success: function (data) {
      data = JSON.parse(data);
      appendServerChat(data);
      $("#chat-text").focus();
      scroll_to_bottom();
      query_cnt++;

    },
    error: function (jqXHR, exception) {
      add_response("RIA is under maintenance, Please try again after some time. Sorry for your inconvenience.", false, "", "");
      disableOrEnableInput("true", "");
      scroll_to_bottom();
    },
  });
}


function appendServerChat(data) {
  //
  if ((!((typeof data["response"] === 'undefined') || (data["response"] == null))) && (!((typeof data["is_typable"] === 'undefined') || (data["is_typable"] == null)))) {
    //
    disableOrEnableInput(data["is_typable"], data["response"]);
  } else {
    //
    disableOrEnableInput("false", "");
  }
  if (!((typeof data["response"] === 'undefined') || (data["response"] == null))) {
    list = splitByDollar(data["response"]);
    if (!((typeof data["is_answer"] === 'undefined') || (data["is_answer"] == null))) {
      ////
      if (data["is_answer"] == "true") {
        global_string = "";
      }
      for (var i = 0; i < list.length; i++) {
        if (i == list.length - 1)
          add_response(list[i]);
        else
          add_response(list[i]);
      }
    } else {
      for (var i = 0; i < list.length; i++) {
        add_response(list[i]);
      }

    }
  }

  if (!((typeof data["choices"] === 'undefined') || (data["choices"] == null)))
    if (!((typeof data["pipe"] === 'undefined') || (data["pipe"] == null)))
      add_buttons(data["choices"], data["pipe"]);
    else
      add_buttons(data["choices"], "");

  if (!((typeof data["recommended_queries"] === 'undefined') || (data["recommended_queries"] == null))) {
    //console.log("Recoomednations", data["recommended_queries"]);
    var recommended_queries = data["recommended_queries"];

    if (recommended_queries.length > 0) {
      var string = "Here are some queries you may ask me: <br>"
      string += "<ul>";
      for (var i = 0; i < recommended_queries.length; i++) {
        string += "<li>";
        string += '<a href="javascript:process1(\' ' + recommended_queries[i] + ' \', 0)">' + recommended_queries[i] + '</a>';
        string += "</li>";
      }
      string += "</ul>";
      add_response(string);
    }
  }
}

function process1(text, mode) {
  ajaxCallToCancel1();
  text = $($.parseHTML(text)).text();
  if (text.length == 0) {
    return;
  }
  global_string += text + "| ";
  last_asked = get_current_time_in_milliseconds();
  help_request_shown = false;
  text = text.split(">").join("#");
  text = text.split("<").join("#");
  //console.log(text);
  $("#chat-div").append('<div class="do_delete"><div class="talk-time-user"><img class="img-head talk-img-user" src="../Chatbot/sites/SBILife/images/user.png">' +
    '<div class="You"><strong>YOU</strong></div>' + '<small class="time-right-div">' +
    '</small></div><div class="talk-bubble-right tri-right right-top"><div class="talktext"><p>' +
    text + '</p></div><div><p class="time" align="right">' + get_time() + '</p></div></div></div>');
  scroll_to_bottom();

  text = text.replace(/\W/g, ' ').trim().toLowerCase();

  if (text == "assistance needed") {
    context = "general";
    add_response(base_response);
    $("#chat-text").val("");
    return;
  }
  ajaxCallToIndex(text, mode);
  // $.ajax({
  //   url: server + "message/",
  //   type: "post",
  //   dataType: 'json',
  //   crossDomain: true,
  //   data: { 
  //     "message": text,
  //     "user_id": user_id,
  //     "mobile": isMobileDevice(),
  //     "mode": mode
  //   },
  //   success: function(response) {
  //     if (user_id != response.user_id) {
  //       user_id = response.user_id;
  //       setCookie('user_id', user_id, 10000);
  //     }
  //     add_response(response.answer);
  //     change_related_questions(response);
  //     set_context(response.context);
  //   },
  //   error: function(xhr, textstatus, errorthrown) {
  //     add_response("Sorry, I may be down for routine maintenance.<br><br>Please dial 1800 22 9090 to contact our Customer care.<br><br>You can also visit our <a href='https://www.sbilife.co.in/en/about-us/contact-us' target='_blank'>Customer Care Portal</a> for assistance.");
  //   }
  // });
  $("#chat-text").val("");
  $("#send-button").addClass("disabled");
}



function process(text, mode) {
  text = $($.parseHTML(text)).text();
  if (text.length == 0) {
    return;
  }

  last_asked = get_current_time_in_milliseconds();
  help_request_shown = false;
  text = text.split(">").join("#");
  text = text.split("<").join("#");
  //console.log(text);
  $("#chat-div").append('<div class="do_delete"><div class="talk-time-user"><img class="img-head talk-img-user" src="../Chatbot/sites/SBILife/images/user.png">' +
    '<div class="You"><strong>YOU</strong></div>' + '<small class="time-right-div">' +
    '</small></div><div class="talk-bubble-right tri-right right-top"><div class="talktext"><p>' +
    text + '</p></div><div><p class="time" align="right">' + get_time() + '</p></div></div></div>');
  scroll_to_bottom();

  text = text.replace(/\W/g, ' ').trim().toLowerCase();

  if (text == "assistance needed") {
    context = "general";
    add_response(base_response);
    $("#chat-text").val("");
    return;
  }
  ajaxCallToIndex(text, mode);
  // $.ajax({
  //   url: server + "message/",
  //   type: "post",
  //   dataType: 'json',
  //   crossDomain: true,
  //   data: { 
  //     "message": text,
  //     "user_id": user_id,
  //     "mobile": isMobileDevice(),
  //     "mode": mode
  //   },
  //   success: function(response) {
  //     if (user_id != response.user_id) {
  //       user_id = response.user_id;
  //       setCookie('user_id', user_id, 10000);
  //     }
  //     add_response(response.answer);
  //     change_related_questions(response);
  //     set_context(response.context);
  //   },
  //   error: function(xhr, textstatus, errorthrown) {
  //     add_response("Sorry, I may be down for routine maintenance.<br><br>Please dial 1800 22 9090 to contact our Customer care.<br><br>You can also visit our <a href='https://www.sbilife.co.in/en/about-us/contact-us' target='_blank'>Customer Care Portal</a> for assistance.");
  //   }
  // });
  $("#chat-text").val("");
  $("#send-button").addClass("disabled");
}

function ajaxCallToCancel1() {
  enableInput("");
  $.ajax({
    url: API_SERVER_URL + "/" + URL_IDENTIFIER + "/cancelbutton/",
    type: "POST",
    data: {
      user_id: user_id,
    },
    success: function (data) {}
  });
  $("#chat-text").val("");
  global_string = "";
}

function ajaxCallToCancel() {
  $(".do_delete").remove();
  enableInput("");
  $.ajax({
    url: API_SERVER_URL + "/" + URL_IDENTIFIER + "/cancelbutton/",
    type: "POST",
    data: {
      user_id: user_id,
    },
    success: function (data) {
      data = JSON.parse(data);
      response = data["response"]
      recommended_queries = data["recommended_queries"]
      is_typable = data["is_typable"]

      var string = "";
      if (!((typeof response === 'undefined') || (response == null))) {
        disableOrEnableInput(is_typable, response);
        list = splitByDollar(data["response"]);
        for (var i = 0; i < list.length; i++) {
          string += list[i];
        }
      }
      string += "<br>";
      if (!((typeof recommended_queries === 'undefined') || (recommended_queries == null))) {
        if (recommended_queries.length > 0) {

          string += "<ul>";
          for (var i = 0; i < recommended_queries.length; i++) {
            string += "<li>";
            string += '<a href="javascript:process1(\' ' + recommended_queries[i] + ' \', 0)">' + recommended_queries[i] + '</a>';
            string += "</li>";
          }
          string += "</ul>";
          string += '<br><br>';
          string += '<b>Disclaimer: </b>RIA (Real Intelligent Assistant) is a technology-based ChatBot of SBI Life Insurance. As the bot is still learning, please verify the response given by RIA from other sources of information.'
          add_response(string);
        }
      }
    }
  });
  $("#chat-text").val("");
  global_string = "";

} // your code goes here