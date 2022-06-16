var user_id = '';
var server = '172.16.18.33'
var help_suggestions = ['', ''];

var MODE_CLICK = 0;
var MODE_TYPE = 1;

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
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

$('head').append('<link rel="stylesheet" type="text/css" href="/static/engine/css/bootstrap.css">');

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
    src: '/static/engine/img/popup.png',
    id: 'mascot'
  }));
}


// Create the chat-box-head
$('#chat-box-div').append($('<div/>', {
  id: 'chat-box-head'
}));

$('#chat-box-head').append($('<img>', {
  src: "/static/engine/img/mascot.jpg",
  width: 30,
  height: 30,
  class: 'img-head'
}));

$('#chat-box-head').append('&nbsp; I am LISA - Life Insurance SBI Assistant');

// Add close-button span
$('#chat-box-head').append($('<span/>', {
  id: 'menu-bar'
}));

// Put the close-button inside span
$('#menu-bar').append($('<img>', {
  src: "/static/engine/img/cross.png",
  width: 20,
  id: 'close-button',
  class: 'menu-button'
}));


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

setInterval(function() {
  if ((get_current_time_in_milliseconds() > last_asked + timeout_interval) && !help_request_shown && !$('#mascot').is(":visible")) {
    add_response(help_suggestions[Math.floor(Math.random()*help_suggestions.length)]);
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
  text: 'Help'
})).append($('<li/>', {
  class: 'related-question',
  id: 'related-question-0',
  text: 'Recommended 1'
})).append($('<li/>', {
  class: 'related-question',
  id: 'related-question-1',
  text: 'Recommended 2'
}))
).append('<br>')
);

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
}))
)));

// Chatting code begins here //

window.onload = function() {
  user_id = getCookie('user_id');
  scroll_to_bottom();

  if (user_id.length > 0) {
    console.log("Fetching message history");
    $.ajax({
      url: server + "/chat/messages/",
      type: "get",
      dataType: 'json',
      crossDomain: true,
      data: { 
        "user_id": user_id
      },
      success: function(response) {
        console.log("Fetched message history");
        messages = response.messages;
        for (var i = 0; i < messages.length; i++) {
          add_query(messages[i].message);
          add_response(messages[i].answer);
        }
        change_related_questions(response);
        help_suggestions[0] = response.help_suggestion1;
        help_suggestions[1] = response.help_suggestion2;
        base_response = response.base_response;
      },
      error: function(xhr, textstatus, errorthrown) {
        console.log("Error in fetching message history");
      }
    }).done(function() {
      add_response(base_response);
    });
  } else {
    console.log("Fetching base response");
    $.ajax({
      url: server + "/chat/base_response/",
      type: "get",
      dataType: 'json',
      crossDomain: true,
      success: function(response) {
        change_related_questions(response);
        base_response = response.base_response;
        help_suggestions[0] = response.help_suggestion1;
        help_suggestions[1] = response.help_suggestion2;
        add_response(base_response);
        console.log("Fetched base response");
      },
      error: function(xhr, textstatus, errorthrown) {
        console.log("Error in fetching base response");
      }
    });
  }
};

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

function add_response(response) {
  $("#chat-div").append('<div><div class="talk-time-server"><img class="img-head talk-img-server" src="/static/engine/img/mascot.jpg"><small class="time-left-div">'
   + get_time() + '</small></div><div class="talk-bubble-left tri-right left-top"><div class="talktext"><p>' + response + '</p></div></div></div>');
  scroll_to_bottom();
  if (!isMobileDevice()) {
    $('#chat-text').focus();
  }
}

function add_query(text) {
  $("#chat-div").append('<div><div class="talk-time-user"><img class="img-head talk-img-user" src="/static/engine/img/user.png"><small class="time-right-div">'
   + get_time() + '</small></div><div class="talk-bubble-right tri-right right-top"><div class="talktext"><p>' + text + '</p></div></div></div>');
}

function scroll_to_bottom() {
  $("#chat-div").stop().animate({ scrollTop: $("#chat-div")[0].scrollHeight}, 1000);
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

function process(text, mode) {
  text = $($.parseHTML(text)).text();
  if (text.length == 0) {
    return;
  }

  last_asked = get_current_time_in_milliseconds();
  help_request_shown = false;
  $("#chat-div").append('<div><div class="talk-time-user"><img class="img-head talk-img-user" src="/static/engine/img/user.png"><small class="time-right-div">'
   + get_time() + '</small></div><div class="talk-bubble-right tri-right right-top"><div class="talktext"><p>' + text + '</p></div></div></div>');
  scroll_to_bottom();

  text = text.replace(/\W/g, ' ').trim().toLowerCase();

  if (text == "main menu") {
    context = "general";
    add_response(base_response);
    $("#chat-text").val("");
    return;
  }

  $.ajax({
    url: server + "/chat/message/",
    type: "get",
    dataType: 'json',
    crossDomain: true,
    data: { 
      "message": text,
      "user_id": user_id,
      "mobile": isMobileDevice(),
      "mode": mode
    },
    success: function(response) {
      if (user_id != response.user_id) {
        user_id = response.user_id;
        setCookie('user_id', user_id, 10000);
      }
      add_response(response.answer);
      change_related_questions(response);
      set_context(response.context);
    },
    error: function(xhr, textstatus, errorthrown) {
      add_response("Sorry, I may be down for routine maintenance.<br><br>Please dial 1800 180 1800 to contact our Customer care.<br><br>You can also visit our <a href='http://www.company.com/' target='_blank'>Customer Care Portal</a> for assistance.");
    }
  });
  $("#chat-text").val("");
  $("#send-button").addClass("disabled");
}

$("#send-button").click(function(e) {
  e.preventDefault();
  process($("#chat-text").val(), MODE_TYPE);
});

function hide_chat_box() {
  $("#chat-box-div").slideUp("slow");
  $('#mascot').show();
}

$('#chat-text').keyup(function(e) {
  if ($("#chat-text").val().length > 0) {
    $("#send-button").removeClass("disabled");
  } else {
    $("#send-button").addClass("disabled");
  }
  if (e.which == 13) {
    process($("#chat-text").val(), MODE_TYPE);
  } else if (e.which == 27) {
    hide_chat_box();
  }
});

var hidden = true;

$("#close-button").click(function(e) {
  hide_chat_box();
});

$("#main-menu").click(function(e) {
  process("Main Menu", MODE_CLICK);
});

$("#related-question-0").click(function(e) {
  process(related_questions_long[0], MODE_CLICK);
});

$("#related-question-1").click(function(e) {
  process(related_questions_long[1], MODE_CLICK);
});

$('#mascot').click(function(e) {
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
});
