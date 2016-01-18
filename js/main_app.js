$(function (){
	var pageHeight = $(window).height(),
		pageWidth = $(document).width(),
		htmlHeight = $("html").height(),
		initialCoverHeight = $(".background-cover").css("height"),
		chatBoxCounter = 0,
		allFriends = [
			{id: "Depsperados_PL",
			address: "chat.html"},
			{id: "Hooligan_Black",
			address: "chat1.html"},
			{id: "Jerry",
			address: "chat2.html"},
			{id: "Cris",
			address: "chat3.html"},
			{id: "Muddy",
			address: "chat4.html"},
			{id: "Chester",
			address: "chat5.html"},
			{id: "Mike",
			address: "chat6.html"},
			{id: "Mister Q",
			address: "chat7.html"},
			{id: "Mad Max",
			address: "chat8.html"},
			{id: "Noe",
			address: "chat9.html"},
			{id: "Darius",
			address: "chat10.html"}
		],
		allTeams = [
			{id: "Kozaki",
			address: "#"},
			{id: "Hooligans",
			address: "#"},
			{id: "Cienkie bolki",
			address: "#"},
			{id: "teamAAA",
			address: "#"},
			{id: "team amazing",
			address: "#"},
			{id: "TeaM",
			address: "#"}
		];

	if(pageWidth>=990){
		$(".friends-wrapper").css("height", (pageHeight-154));
		$(".main-inner-wrapper").css("padding-bottom", (pageHeight - htmlHeight));
	}
	else{
		$(".friends-wrapper").css("height", "400px");
	}
	$(window).resize(function(){
		pageHeight = $(window).height(),
		pageWidth = $(document).width();
		if(pageWidth>=990){
			$(".friends-wrapper").css("height", (pageHeight - 163));
			$(".main-inner-wrapper").css("padding-bottom", (pageHeight - htmlHeight));
		}
		else{
			$(".friends-wrapper").css("height", "400px");
		}
	});

	if ($("#alert").hasClass("have-alert")) {
		$("#alert div a").find("img").attr("src", "images/have-alert.png");
	}
	$(document).on("scroll", function(){
		var windowScroll = $(window).scrollTop(),
			convertCoverHeight = initialCoverHeight.replace(/[^0-9]/g, ''),
			coverHeightNumber = parseInt(convertCoverHeight),
			newHeight = coverHeightNumber + windowScroll;

		$(".background-cover").css("height", newHeight);
	});

	$(document).on("click", ".panel-heading span.icon-minim", function() {
		var $this = $(this);
		if (!$this.hasClass("panel-collapsed")) {
			$this.parents(".panel").find(".chat-body").slideUp();
			$this.addClass("panel-collapsed");
			$this.removeClass("glyphicon-minus").addClass("glyphicon-plus");
			if ($this.parents(".chat-window").hasClass("left-chat-window")) {
				$this.parents(".chat-window").animate({top: "273px"});
			}
			else{
				$this.parents(".chat-window").animate({top: "285px"});
			}
		} else {
			$this.parents(".panel").find(".chat-body").slideDown();
			$this.parents(".chat-window").animate({top: "0"});
			$this.removeClass("panel-collapsed");
			$this.removeClass("glyphicon-plus").addClass("glyphicon-minus");
		}
	});

	$(document).on("click", ".icon-close", function() {
		var $this = $(this),
			$thisDataName = $this.parents("div.chat-window").attr("data-name");
			removeChatBox($thisDataName);
	});
	function removeChatBox(dataName) {
		if ($("#chatInfo ul li").length>0 && $("div[data-name='"+dataName+"']").length == 1) {
			var $firstListedFriend = $("#chatInfo ul li:last").attr("data-name");
			for (var i = 0; i < allFriends.length ; i++) {
				if (allFriends[i].id === $firstListedFriend) {
					$.ajax({
						url: allFriends[i].address,
						dataType: "html",
						type: "GET",
						success: function(data){
							$("#chatContainer").prepend($(data).find(".chat-window"));
							$("li[data-name='"+$firstListedFriend+"']").remove();
							$("#chatInfo span").text($("#chatInfo ul li").length);
						}
					});
				}
			}
		}
		$("div[data-name='"+dataName+"']").remove();
		$("li[data-name='"+dataName+"']").remove();
		$("li[id='"+dataName+"']").removeClass("clicked");
		chatBoxCounter --;
		$("#chatInfo span").text($("#chatInfo ul li").length);

		if (chatBoxCounter === 1 && pageWidth < 630) {
			$("#chatInfo").fadeOut(200);
		}
		else if (chatBoxCounter === 2 && pageWidth >= 630) {
			$("#chatInfo").fadeOut(200);
		}
		else if (chatBoxCounter === 3 && pageWidth >= 1200) {
			$("#chatInfo").fadeOut(200);
		}
		else if (chatBoxCounter === 4 && pageWidth >= 1500) {
			$("#chatInfo").fadeOut(200);
		}
		else if (chatBoxCounter === 5 && pageWidth >= 1950) {
			$("#chatInfo").fadeOut(200);
		};
	};
	$(document).on("click", "#friendsList li", function() {
		var $selectedFriend = $(this).attr("id");
		for (var i = 0; i < allFriends.length ; i++) {
			if (allFriends[i].id === $selectedFriend) {
				var	ul = "<ul class='row friends-list-buttons'></ul>",
					messageButton = "<li id='chatOn'><a data-name='"+allFriends[i].id+"' href='"+allFriends[i].address+"'><img src='images/message.png' alt='massage' class='friends-list-buttons'></a></li>",
					userButton = "<li><img src='images/user.png' alt='user' class='friends-list-buttons'></li>",
					addUserButton = "<li><img src='images/add-user.png' alt='add user' class='friends-list-buttons'></li>";
				if (!$(this).parent().hasClass("friends-list-buttons")) {
					$("#friendsList").find(".friends-list-buttons").remove();
					$(this).after(ul);
					$(this).next(".friends-list-buttons").append(messageButton, userButton, addUserButton);
				}
			}
		};
	});
	$(document).on("click", "#teamsList li", function() {
		var $selectedTeam = $(this).attr("id");
		for (var i = 0; i < allTeams.length ; i++) {
			if (allTeams[i].id === $selectedTeam) {
				var	ul = "<ul class='row friends-list-buttons'></ul>",
					profileButton = "<li><a data-name='"+allTeams[i].id+"' href='"+allTeams[i].address+"'><img src='images/user.png' alt='profile' class='friends-list-buttons'></a></li>",
					likeButton = "<li><img src='images/like-team.png' alt='like' class='friends-list-buttons'></li>";
				if (!$(this).parent().hasClass("friends-list-buttons")) {
					$("#teamsList").find(".friends-list-buttons").remove();
					$(this).after(ul);
					$(this).next(".friends-list-buttons").append(profileButton, likeButton);
				}
			}
		};
	});
	$(document).on("click", "#teamsList .friends-list-buttons li", function(){
		if ($(this).find("img").attr("alt")==="like") {
			$(this).find("img").attr("src", "images/liked-team.png");
		}
	});

	$(document).on("click", "#chatOn a", function(e){
		e.preventDefault();
		var url = this.href,
			$this = $(this),
			$thisDataName = $(this).attr("data-name");
		if (!$(this).parents(".friends-list-buttons").prev().hasClass("clicked")) {
			$.ajax({
				url: url,
				dataType: "html",
				type: "GET",
				success: function(data){		
					if (chatBoxCounter > 1 && pageWidth < 630) {
						$("#chatInfo").fadeIn(200);
						$("#chatInfo ul").prepend("<li data-name='"+$thisDataName+"'>"+$thisDataName+"</li>");
					}
					else if (chatBoxCounter > 2 && pageWidth < 1200) {
						$("#chatInfo").fadeIn(200);
						$("#chatInfo ul").prepend("<li data-name='"+$thisDataName+"'>"+$thisDataName+"</li>");
					}
					else if (chatBoxCounter > 3 && pageWidth < 1500) {
						$("#chatInfo").fadeIn(200);
						$("#chatInfo ul").prepend("<li data-name='"+$thisDataName+"'>"+$thisDataName+"</li>");
					}
					else if (chatBoxCounter > 4 && pageWidth < 1950) {
						$("#chatInfo").fadeIn(200);
						$("#chatInfo ul").prepend("<li data-name='"+$thisDataName+"'>"+$thisDataName+"</li>");
					}
					else if (chatBoxCounter > 5 && pageWidth >= 1950) {
						$("#chatInfo").fadeIn(200);
						$("#chatInfo ul").prepend("<li data-name='"+$thisDataName+"'>"+$thisDataName+"</li>");
					}
					else{
						$("#chatContainer").prepend($(data).find(".chat-window"));
					}
				}
			});
			$(this).parents(".friends-list-buttons").prev().addClass("clicked");
			chatBoxCounter ++;
			$("#chatInfo span").text($("#chatInfo ul li").length+1);
		} 
		else{
			removeChatBox($thisDataName);
		}
	});
	
	$(document).on("click", "#chatInfo ul li", function() {
		var thisListedFriendDataName = $(this).attr("data-name"),
			replacedChatBox = $(".chat-window:first");
		for (var i = 0; i < allFriends.length ; i++) {
			if (allFriends[i].id === thisListedFriendDataName) {
				$.ajax({
					url: allFriends[i].address,
					dataType: "html",
					type: "GET",
					success: function(data){
						$("#chatInfo ul").prepend("<li data-name='"+replacedChatBox.attr("data-name")+"'>"+replacedChatBox.attr("data-name")+"</li>");
						replacedChatBox.remove();
						$("#chatContainer").prepend($(data).find(".chat-window"));
						$("li[data-name='"+thisListedFriendDataName+"']").remove();
						$("#chatInfo span").text($("#chatInfo ul li").length);
					}
				});
			}
		}
	});

	$(document).on("click", "#chatInfoButton", function() {
		$("#chatInfo ul").toggle( "slide", { 
			direction: "down",
			easing: "swing"
		},200);
	});

	$("#chat").on("click", function(){
		$("#friends").toggle( "slide", { 
			direction: "right",
			easing: "swing"
		},200);
		$("#chatContainer").toggle( "slide", { 
			direction: "down",
			easing: "swing"
		},200);
	});
	
	$(document).on("click", ".friends-search-wrapper ul li", function(){
		if (!$(this).hasClass("active")) {
			$(".friends-search-wrapper ul li").removeClass("active");
			$(this).addClass("active");
		}
		if ($("#teamSearchButton").hasClass("active")) {
			$(".friends-search-wrapper label input").attr("placeholder","Search teams...");
		}
		else if ($("#userSearchButton").hasClass("active")) {
			$(".friends-search-wrapper label input").attr("placeholder","Search users...");
		}
	});
	$(document).on("click", ".coins-list ul li", function(){
		if (!$(this).hasClass("active")) {
			$(".coins-list ul li").removeClass("active");
			$(this).addClass("active");
		}
	});
	
	$("#coins").on("click", function(){
		$("#paymentContainer").show();
	});
	$(document).mouseup(function (e){
		var container = $("#paymentInnerWrapper");

		if (!container.is(e.target) && container.has(e.target).length === 0){
			$("#paymentContainer").hide();
		}
	});

	$("#loginRegister").on("click", function(){
		$("#loginContainer").show();
	});
	$(document).mouseup(function (e){
		var container = $("#loginInnerWrapper");

		if (!container.is(e.target) && container.has(e.target).length === 0){
			$("#loginContainer").hide();
		}
	});
	$(document).mouseup(function (e){
		var container = $("#registerInnerWrapper");

		if (!container.is(e.target) && container.has(e.target).length === 0 && !$("#ui-datepicker-div").is(e.target) && $("#ui-datepicker-div").has(e.target).length === 0){
			$("#registerContainer").hide();
		}
	});

	$("#moveToRegister").on("click", function(){
		$("#loginContainer").hide();
		$("#registerContainer").show();
	});
	$("#moveToLogin").on("click", function(){
		$("#registerContainer").hide();
		$("#loginContainer").show();
	});

	$("#registerDatepicker").datepicker({
		changeYear: true,
		yearRange: "1945:2016"
	});
});