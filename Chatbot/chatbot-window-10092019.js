var STATIC_IMG_PATH = "../Chatbot/sites/SBILife/images";

$( document ).ready(function() {
	var user_id = '';
	var help_suggestions = ['Do you want me to help you with something?', 'May I help you with something?'];
	var auto_suggestion_mode = "";

	var API_SERVER_URL = "https://chatbotuat.sbilife.co.in";
	var STATIC_SERVER_URL = "";

	//var STATIC_IMG_PATH = "/static/EasyChatApp/img";
	var URL_IDENTIFIER = "chat" // The url is built up like: API_SERVER_URL + URL_IDENTIFIER + METHOD NAME

	$('.typing-loader').hide();

	detectPathOfImagesCurrentPage();

	function shouldShowChatbox() {
		return true;
	}



	// Create the main chat-box-div
	$('body').append($('<div/>', {
		id: 'chat-box-div',
		style: "display: none;",
	}));

	if (shouldShowChatbox()) {
		$('body').append($('<img>', {
			src: STATIC_SERVER_URL + STATIC_IMG_PATH + '/popup.png',
			id: 'mascot',
			style: 'right: 4em;',
			class: 'my-float'
		}));
	}

	// Create the chat-box-head
	$('#chat-box-div').append($('<div/>', {
		id: 'chat-box-head',
	}));

	/*$('#chat-box-head').append('\
	  <div class="row" >\
	    <div class="hidden-xs col-sm-2 col-md-2">\
	      <img src='+STATIC_SERVER_URL+STATIC_IMG_PATH+'/mascot.png class="img-head img-responsive" style="width: 50%; height: auto;">\
	    </div>\
	    <div class="col-xs-10 col-sm-8 col-md-8 ">\
	    <br>\
	      <span id="menu-bar" style="line-height: 35px;">I am RIA - Real Intelligent Assistant</span>\
	    </div>\
	    <div class="col-xs-2 col-sm-2 col-md-2 pull-right">\
	      <img src='+STATIC_SERVER_URL+STATIC_IMG_PATH+'/cross.png id="close-button" class="menu-button img-responsive" style="height: 2em;">\
	    </div>\
	  </div>');*/


	$('#chat-box-head').append('\
	  <div class="modal fade" id="chatbot-modal" role="dialog">\
			<div class="modal-dialog">\
				<div class="modal-content">\
					<div class="modal-header">\
					</div>\
					<div class="modal-body">\
					<div id="img_chatbot">\
					</div>\
					</div>\
					<div class="modal-footer">\
					</div>\
				</div>\
			</div> \
	   </div>\
	  <div class="row" >\
	    <div class="hidden-xs col-sm-2 col-md-2">\
	      <img src=' + STATIC_SERVER_URL + STATIC_IMG_PATH + '/mascot.png class="img-head img-responsive" style="width: 50%; height: 30px;">\
	    </div>\
	    <div class="col-xs-10 col-sm-8 col-md-8 ">\
	      <span id="menu-bar" style="">I am RIA - Real Intelligent Assistant</span>\
	    </div>\
	    <div class="col-xs-2 col-sm-2 col-md-2 pull-right">\
	      <img src=' + STATIC_SERVER_URL + STATIC_IMG_PATH + '/cross.png id="close-button" class="menu-button img-responsive" style="height: 2em;">\
	    </div>\
	  </div>');


	// Create the chat-box-main
	$('#chat-box-div').append($('<div/>', {
		id: 'chat-div',
		class: 'panel-body chat-box-main'
	}));

	// Put the line breaks
	$('#chat-div').append('<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>');

	var base_response = '';

	function get_current_time_in_milliseconds() {
		return (new Date()).getTime();
	}

	var last_asked = get_current_time_in_milliseconds();
	var timeout_interval = 60000;
	var help_request_shown = false;

	setInterval(function () {
		if ((get_current_time_in_milliseconds() > last_asked + timeout_interval) && !help_request_shown && !$('#mascot').is(":visible")) {
			appendResponseServer(help_suggestions[Math.floor(Math.random() * help_suggestions.length)]);
			help_request_shown = true;
		}
	}, timeout_interval);

	// Add chat-box-space
	$('#chat-box-div').append('<div class="chat-box-space">\
	  <ul id="related-questions">\
	    <li class="related-question menu-item" id="main-menu">Refresh</li>\
	    <li class="related-question" id="related-question-0">Policy Details</li>\
	    <li class="related-question" id="related-question-1">Purchase</li>\
	  </ul>' +
		'<img id="scrollBot-img" \
	  src=' + STATIC_SERVER_URL + STATIC_IMG_PATH + '/double_arrow_bottom_bold.png \
	   width="25" height="25" class="srolltobot-img" style="display:none;width:25px;height:25px">' +
		'<br>\
	</div>');


	$('#chat-box-div').append('<div class="chat-box-footer">\
	  <div class="input-group">\
	    <div class="autocomplete" style="width: calc(100%);">\
	      <input type="text" id="chat-text" class="form-control" placeholder="Ask me about SBI Life\'s Products and Services">\
	    </div>\
	    <span class="input-group-btn">\
	      <button class="btn btn-info disabled send-button" id="send-button" type="button">Ask</button>\
	    </span>\
	  </div>\
	</div>');

	// Welcome message

	function GetWelcomeResponse(channel) {

		var form_url = window.location.pathname;

		var response = $.ajax({
			url: API_SERVER_URL + "/" + URL_IDENTIFIER + "/get_channel_details/",
			// url: "/chat/get_channel_details/",
			type: "POST",
			async: false,
			data: {
				channel_name: channel,
				form_url: "/chat/renderchatdiv/"
			},
			success: function (data) {
				//console.log("Success before get_channel_details", data);
				//data = JSON.parse(data);
				//console.log("Success after get_channel_details", data);
				//return data;
			},
			error: function (jqXHR, exception) {
				appendResponseServer("RIA is under maintenance, Please try again after some time. Sorry for your inconvenience.", false, "", "");
				scroll_to_bottom();
			},
		}).responseJSON;

		//response = JSON.parse(response);
		//console.log("After success GETWELCOM get_channel_details", response);

		return response;
	}

	function getWelcomeMessage() {
		//console.log("Inside getWelcomeMessage")
		channel_details = GetWelcomeResponse("Web");
		//console.log("channel_details  ", channel_details);
		message = channel_details["welcome_message"];
		channel_init_msgs = channel_details["initial_messages"]["items"];
		setTimeout(function () {
			appendResponseServer(
				message +
				"<b>Disclaimer</b>: RIA (Real Intelligent Assistant) is a technology-based ChatBot of SBI Life Insurance. \
	          As the bot is still learning, please verify the response given by RIA from other sources of information."
			);
			appendRecommendationsList(channel_init_msgs);
		}, 500);
	}

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

	function appendResponseServer(response) {
		$("#chat-div").append('\
	      <div class="do_delete">\
	          <div class="talk-time-server">\
	              <img class="img-head talk-img-server" src=' + STATIC_SERVER_URL + STATIC_IMG_PATH + '/mascot.png>\
	              <div class="RIA"><b>RIA</b></div>\
	              ' + '\
	          </div>\
	          <div class="talk-bubble-left tri-right left-top"">\
	              <div class="talktext">\
	                  <p>' + response + '\
	                  </p>\
	              </div>\
	              <div>\
	                  <p class="time-left" align="right" >' + get_time() + '</p>\
	              </div>\
	          </div>\
	      </div>');
		scroll_to_bottom();
		if (!isMobileDevice()) {
			$("#chat-text").focus();
		}
	}

	function appendResponseUser(text) {
		text = text.split(">").join("#");
		text = text.split("<").join("#");

		$("#chat-div").append('<div class="do_delete"><div class="talk-time-user"><img class="img-head talk-img-user" src=' + STATIC_SERVER_URL + STATIC_IMG_PATH + '/user.png>' +
			'<div class="You"><b>YOU</b></div>' + '<small class="time-right-div">' +
			'</small></div><div class="talk-bubble-right tri-right right-top"><div class="talktext"><p>' +
			text + '</p></div><div><p class="time-right" align="right">' + get_time() + '</p></div></div></div>');
	}

	function scroll_to_bottom() {
		$("#chat-div").stop().animate({
			scrollTop: $("#chat-div")[0].scrollHeight
		}, 500);
	}

	$("#chat-div").scroll(function () {
		if ($("#chat-div")[0].scrollHeight - ($('#chat-div').scrollTop() + $('#chat-div').height()) > 400) {
			$("#scrollBot-img").show(); //reached the desired point -- show div
		} else
			$("#scrollBot-img").hide(); //reached the desired point -- show div
	});

	$("#scrollBot-img").click(function () {
		scroll_to_bottom();
	});

	function isMobileDevice() {
		return /Mobi/.test(navigator.userAgent);
	}

	$("#send-button").click(function (e) {
		e.preventDefault();
		process($("#chat-text").val());
	});

	function hide_chat_box() {
		$("#scrollBot-img").hide();
		$("#chat-box-div").slideUp("slow");
		$('#mascot').show();
	}

	var mytimer;
	$("#chat-text").keyup(function (e) {
		clearTimeout(mytimer);
		var keyChar = $(this).val().substr(-1);
		if ($("#chat-text").val().length > 0) {
			$("#send-button").removeClass("disabled");
		} else {
			$("#send-button").addClass("disabled");
		}
		if (e.which == 13) {
			//ent
			process($("#chat-text").val());
		} else if (e.which == 27) {
			//esc
			hide_chat_box();
		} else if (e.which == 32) {
			//space
			if (auto_suggestion_mode == "Word Level" || auto_suggestion_mode == "Char Level") {
				mytimer = setTimeout(function () {
					render_suggestions($("#chat-text").val())
				}, 500);
			}
		} else if ((keyChar >= 'a' && keyChar <= 'z') || (keyChar >= 'A' && keyChar <= 'Z')) {
			if (auto_suggestion_mode == "Char Level") {
				mytimer = setTimeout(function () {
					render_suggestions($("#chat-text").val())
				}, 500);
			}
		}
	});

	/*
	function render_suggestions(input) {
	  // //console.log("function called for mode: ",auto_suggestion_mode);
	  // //console.log("with input: ",input);
	  suggestions_fetched=get_data(input);
	  autocomplete(document.getElementById("chat-text"), suggestions_fetched);
	}*/



	function render_suggestions(input) {
		// //console.log("function called for mode: ",auto_suggestion_mode);
		//   // //console.log("with input: ",input);
		get_data(input);
	}








	var hidden = true;

	$("#close-button").click(function (e) {
		hide_chat_box();
	});

	$("#main-menu").click(function (e) {
		$(".do_delete").remove();
		enableInput("");

		$.ajax({
			url: API_SERVER_URL + "/" + URL_IDENTIFIER + "/clear_user_data/",
			// url: "/chat/clear_user_data/",
			type: "POST",
			data: {
				user_id: user_id,
			},
			success: function (data) {
				getWelcomeMessage();
			}
		});

		$("#chat-text").val("");
	});

	$("#related-question-0").click(function (e) {
		process("Show me my policy details.");
	});

	$("#related-question-1").click(function (e) {
		process("Purchase life insurance");
	});


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

	function enableInput(query) {
		$("#chat-text").removeAttr('disabled');
		if (!((typeof query === 'undefined') || (query == null))) {
			$("#chat-text").attr("placeholder", "Please type your query here.");
		}
	}

	function disableInput() {
		$("#chat-text").val("");
		$("#chat-text").attr('placeholder', 'Please select an option from the above choices');
		$("#chat-text").attr('disabled', 'disabled');
	}

	$('#mascot').click(function (e) {
		if (base_response.length == 0) {
			$("#chat-text").focus();
			$('#mascot').hide();
			$("#chat-box-div").slideDown("slow");
			$(".chat-box-main").slideDown("slow");
			$(".chat-box-space").slideDown("slow");
			$(".chat-box-footer").slideDown("slow");
			hidden = false;
			scroll_to_bottom();
			getWelcomeMessage();
			if (!isMobileDevice()) {
				$("#chat-text").focus();
			}
		}

		auto_suggestion_mode = get_auto_suggestion_mode();
		if (auto_suggestion_mode == "Optimized") {
			render_suggestions(null);
		}

	});

	function splitByDollar(sentence) {
		list = sentence.split("$$");
		return list;
	}

	function ajaxCallToIndex(sentence) {
		$("#chat-div").append('<div class="typing-loader"></div>');
		$(".typing-loader").show();

		var is_form = false;
		form_url = window.location.pathname;
		if (window.location.pathname != form_url) {
			is_form = false;
		}


		removeClickablePropertyBut();
		$.ajax({
			url: API_SERVER_URL + "/" + URL_IDENTIFIER + "/query/",
			// url: "/chat/querye
			type: "POST",
			data: {
				message: sentence,
				user_id: user_id,
				channel: "web",
				channel_params: "",
				is_form: false
			},
			success: function (data) {
				//console.log("Success!", data)
				//data = JSON.parse(data);
				user_id = data['user_id']
				scroll_to_bottom();
				$(".typing-loader").remove();
				appendServerChat(data);
			},
			error: function (jqXHR, exception) {
				$(".typing-loader").remove();
				appendResponseServer("RIA is under maintenance, Please try again after some time. Sorry for your inconvenience.", false, "", "");
				scroll_to_bottom();
			},
			timeout: 20000,
		});

		if (!isMobileDevice()) {
			$("#chat-text").focus();
		}
		//scroll_to_bottom();
		//$(".typing-loader").remove();

	}

	carouselCnt = 0;

	function appendImage(image_url_list) {

		if (image_url_list.length == 0) {
			return;
		}
		carouselCnt++;
		var html = '<div id="carousel-id-' + carouselCnt + '" class="carousel slide" data-ride="carousel" data-interval="false" >\
	      <!-- Indicators -->\
	      <ol class="carousel-indicators">\
	        <li data-target="#carousel-id-' + carouselCnt + '" data-slide-to="0" class="active"></li>';
		for (var i = 1; i < image_url_list.length; i++) {
			html += '<li data-target="#carousel-id-' + carouselCnt + '" data-slide-to="' + i + '"></li>'
		}
		html += '</ol>\
	      <!-- Wrapper for slides -->\
	      <div class="carousel-inner" >\
	        <div class="item active">\
	          <img id="ansImg-' + carouselCnt + '-0"class = "img-responsive-" src="' + STATIC_SERVER_URL + STATIC_IMG_PATH + image_url_list[0] + '">\
	        </div>';
		for (var i = 1; i < image_url_list.length; i++) {
			html += '<img id="ansImg-' + carouselCnt + '-' + i + '" class = "item img-responsive" src="' + STATIC_SERVER_URL + STATIC_IMG_PATH + image_url_list[i] + '">';
		}

		html += '</div>\
	      <!-- Left and right controls -->\
	      <a class="left carousel-control" href="#carousel-id-' + carouselCnt + '" data-slide="prev">\
	        <span class="glyphicon glyphicon-chevron-left"></span>\
	      </a>\
	      <a class="right carousel-control" href="#carousel-id-' + carouselCnt + '" data-slide="next">\
	        <span class="glyphicon glyphicon-chevron-right"></span>\
	      </a>\
	    </div>';

		var image_html = '<div class="do_delete" style="margin-left: 2em;">' +
			html +
			'</div><br><br>';

		$("#chat-div").append(image_html);

		// Get the modal
		for (var i = 0; i < image_url_list.length; i++) {
			var img = document.getElementById("ansImg-" + carouselCnt + "-" + i);

			img.onclick = function () {
				//modal.style.display = "block";
				//modalImg.src = this.src;
				//captionText.innerHTML = this.alt;
				//changes by shweta on 18mar2019
				$("#img_chatbot").html("<img src=" + this.src + " class='img-responsive'>");
				// $("#img_chatbot").html("<img src="+this.src+">") 
				$("#chatbot-modal").modal('show');
			}
		}

		// Get the image and insert it inside the modal - use its "alt" text as a caption
		//var modalImg = document.getElementById("img01");

		// Get the <span> element that closes the modal
		//var span = document.getElementsByClassName("close-modal-chatbot")[0];

		// When the user clicks on <span> (x), close the modal
		//span.onclick = function() {
		//  modal.style.display = "none";
		//} 
	}

	function appendButtons(display_list, value_list) {
		list = display_list;
		if (list.length == 0) {
			return;
		}
		var string = '<div class="do_delete">';

		for (var i = 0; i < list.length; i++) {
			if (list[i] == "Apply Now" || list[i] == "Get Now") {
				string += '<button class="button4 button5 chipbutton">';
				string += list[i];
				string += '</button>';
			} else {
				string += '<button class="button2 button3 chipbutton">';
				string += list[i];
				string += '</button>';
			}
		}
		string += "</div><br>";
		$("#chat-div").append(string);
	}

	$(document).on('click', '.chiprecommendation', function () {
		$(this).css('background-color', '#1B5CAB');
		$(this).css('color', 'white');

		$(this).removeClass("chiprecommendation");

		$(this).css({
			'cursor': "default"
		});

		var sentence = $(this).html();
		process(sentence);
	});

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
		var sentence = $(this).text();
		sentence = $($.parseHTML(sentence)).text();
		if (sentence.length == 0) { // error!
			return;
		}
		appendResponseUser($(this).text());
		ajaxCallToIndex($(this).text());
	});

	function removeClickablePropertyBut() {
		$(".chipbutton").css({
			'cursor': "default"
		});
		$(".chipbutton").removeClass("chipbutton");

		// $(".chiprecommendation").css({'cursor' :"default"});
		// $(".chiprecommendation").removeClass("chiprecommendation");

		$(".button3").removeClass("button3");
	}

	function appendRecommendationsList(list) {
		if (list.length > 0) {
			var html =
				'<div class="do_delete">\
	            <div class="button-group button-group2">\
	               ';
			for (var i = 0; i < list.length; i++) {
				html += '<div class="button chiprecommendation">' + list[i] + '</div>';
			}


			html += '</div>\
	         </div>\
	        ';

			$("#chat-div").append(html);
			scroll_to_bottom();
			if (!isMobileDevice()) {
				$("#chat-text").focus();
			}
		}
	}

	function appendServerChat(data) {
		var sentence = ""
		if (data['status_code'] == "200")
			sentence = data['response']['text_response']['text']
		else
			sentence = "Sorry. I do not understand. Please elaborate."

		var sentences = splitByDollar(sentence);

		for (var i = 0; i < sentences.length; i++) {
			appendResponseServer(sentences[i]);
		}
		choices = data['response']['choices'];
		cards = data["response"]["cards"];
		images = data["response"]["images"];
		videos = data["response"]["videos"];

		for (var i = 0; i < images.length; i++) {
			images[i] = '/chatbot_ans_images' + images[i].replace("/files", "");
			//console.log(images[i])
		}

		display_list = []
		value_list = []
		for (var i = 0; i < choices.length; i++) {
			display_list.push(choices[i]["display"]);
			value_list.push(choices[i]["value"]);
		}

		if (data['response']["recommendations"].length != 0) {
			appendRecommendationsList(data["response"]["recommendations"]);
		}
		if (data["response"]["text_response"]["modes"]["is_button"] == "true") {
			appendButtons(display_list, value_list);
		}
		if (images.length != 0) {
			appendImage(images);
		}

		is_typable = data['response']['text_response']['modes']['is_typable'];

		if (is_typable == "false")
			disableInput();
		else
			enableInput();

	}

	function process(text) {
		text = $($.parseHTML(text)).text();
		if (text.length == 0) {
			return;
		}

		last_asked = get_current_time_in_milliseconds();
		help_request_shown = false;

		scroll_to_bottom();
		appendResponseUser(text);
		//text = text.replace(/\W/g, ' ').trim().toLowerCase();

		ajaxCallToIndex(text);
		$("#chat-text").val("");
		$("#chat-textautocomplete-list").hide();
		$("#send-button").addClass("disabled");
	}

	function autocomplete(inp, arr) {
		/*the autocomplete function takes two arguments,
		the text field element and an array of possible autocompleted values:*/
		var currentFocus;
		/*execute a function when someone writes in the text field:*/

		inp.addEventListener("input", function (e) {
			var a, b, i, val = this.value;
			/*close any already open lists of autocompleted values*/
			closeAllLists();
			if (!val) {
				return false;
			}
			currentFocus = -1;
			/*create a DIV element that will contain the items (values):*/
			a = document.createElement("DIV");
			a.setAttribute("id", this.id + "autocomplete-list");
			a.setAttribute("class", "autocomplete-items");
			/*append the DIV element as a child of the autocomplete container:*/
			this.parentNode.appendChild(a);
			/*for each item in the array...*/
			var cnt = 0;
			var max_show = 10;
			for (i = 0; i < arr.length && cnt < max_show; i++) {
				/*check if the item starts with the same letters as the text field value:*/
				if (arr[i].toLowerCase().indexOf(val.toLowerCase()) != -1) {
					/*create a DIV element for each matching element:*/
					b = document.createElement("DIV");
					/*make the matching letters bold:*/
					foundAt = arr[i].toLowerCase().search(val.toLowerCase());

					b.innerHTML += arr[i].substr(0, foundAt);
					b.innerHTML += "<b>" + arr[i].substr(foundAt, val.length) + "</b>";
					b.innerHTML += arr[i].substr(foundAt + val.length);
					/*insert a input field that will hold the current array item's value:*/
					b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
					/*execute a function when someone clicks on the item value (DIV element):*/
					b.addEventListener("click", function (e) {
						/*insert the value for the autocomplete text field:*/
						inp.value = this.getElementsByTagName("input")[0].value;
						process(inp.value);
						/*close the list of autocompleted values,
						(or any other open lists of autocompleted values:*/
						closeAllLists();
					});
					a.appendChild(b);
					cnt++;
				}
			}
		});
		var simulateInput = new Event('input', {});
		document.getElementById(inp.id).dispatchEvent(simulateInput);
		/*execute a function presses a key on the keyboard:*/
		inp.addEventListener("keydown", function (e) {
			var x = document.getElementById(this.id + "autocomplete-list");
			if (x) x = x.getElementsByTagName("div");
			if (e.keyCode == 40) {
				/*If the arrow DOWN key is pressed,
				increase the currentFocus variable:*/
				currentFocus++;
				/*and and make the current item more visible:*/
				addActive(x);
			} else if (e.keyCode == 38) { //up
				/*If the arrow UP key is pressed,
				decrease the currentFocus variable:*/
				currentFocus--;
				/*and and make the current item more visible:*/
				addActive(x);
			} else if (e.keyCode == 13) {
				/*If the ENTER key is pressed, prevent the form from being submitted,*/
				e.preventDefault();
				if (currentFocus > -1) {
					/*and simulate a click on the "active" item:*/
					if (x) x[currentFocus].click();
				}
			}
		});

		function addActive(x) {
			/*a function to classify an item as "active":*/
			if (!x) return false;
			/*start by removing the "active" class on all items:*/
			removeActive(x);
			if (currentFocus >= x.length) currentFocus = 0;
			if (currentFocus < 0) currentFocus = (x.length - 1);
			/*add class "autocomplete-active":*/
			x[currentFocus].classList.add("autocomplete-active");
		}

		function removeActive(x) {
			/*a function to remove the "active" class from all autocomplete items:*/
			for (var i = 0; i < x.length; i++) {
				x[i].classList.remove("autocomplete-active");
			}
		}

		function closeAllLists(elmnt) {
			/*close all autocomplete lists in the document,
			except the one passed as an argument:*/
			var x = document.getElementsByClassName("autocomplete-items");
			for (var i = 0; i < x.length; i++) {
				if (elmnt != x[i] && elmnt != inp) {
					x[i].parentNode.removeChild(x[i]);
				}
			}
		}
	}

	function get_data(input2) {
		var is_form = true;
		form_url = "/chat/renderchatdiv/"
		if (window.location.pathname != form_url) {
			is_form = false;
		}

		$.ajax({
			url: API_SERVER_URL + "/" + URL_IDENTIFIER + '/get_data/',
			type: 'POST',
			data: {
				input: input2,
				is_form: false
			},
			success: function (response) {
				//response = JSON.parse(response);
				suggestions_fetched = response["sentence_list"];
				autocomplete(document.getElementById("chat-text"), suggestions_fetched);
			},
			error: function (error) {
				//console.log("Report this error", error);
			}
		});

		/*if(response["status"]==200){
		    return response["sentence_list"];
		}
		else{ 
		    return [];
		}*/
	}

	function get_auto_suggestion_mode() {
		response = $.ajax({
			url: API_SERVER_URL + "/" + URL_IDENTIFIER + '/get_auto_suggestion/',
			type: 'POST',
			async: false,
			data: {

			},
			success: function (response) {
				//console.log("Success beforeee", response);
				//response = JSON.parse(response);
				//console.log("Success afterrr", response);
				//return response;
			},
			error: function (error) {
				//console.log("Report this error", error);
				return {
					"status": 500
				};
			}
		}).responseJSON;

		//response = JSON.parse(response);
		if (response["status"] == 200) {
			return response["auto_suggestion"];
		} else {
			return [];
		}
	}
});

function detectPathOfImagesCurrentPage() {
	var lastFolderName = location.href.split('/').filter(function (el) {
		return el.trim().length > 0;
	}).pop();

	this.lastFolder = lastFolderName;
	this.STATIC_IMG_PATH;

	switch (lastFolder) {
		case 'Maturity.html':
		case 'SBDueList.html':
		case 'UploadDocuments.html':
		case 'FundSwitch.html':
		case 'RevivalQuatation.html':
		case 'success.html':
		case 'ViewPlanDetails.html':
			this.STATIC_IMG_PATH = "../../Chatbot/sites/SBILife/images";
			break;

		case 'FundSwitchDetails.html':
		case 'RevivalQuatationDetails.html':
			this.STATIC_IMG_PATH = "../../../Chatbot/sites/SBILife/images";
			break;
		default:
			if (location.href.includes("PremiumCalculator")) {				
				currentURLArr = location.href.split('/');				
				if (currentURLArr.slice(currentURLArr.indexOf("PremiumCalculator")).length == 4) {
					this.STATIC_IMG_PATH = "../../../Chatbot/sites/SBILife/images";
				}
			} else {
				this.STATIC_IMG_PATH = "../Chatbot/sites/SBILife/images";
			}
	}
}