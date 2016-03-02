$(function (){
	var pageHeight = $(window).height(),
		pageWidth = $(document).width(),
		htmlHeight = $("html").height(),
		chatBoxCounter = 0,
		menuChosenGame = false,
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
			address: "chat10.html"},
			{id: "SuppaGruppa",
			address: "group1.html"},
			{id: "Group Galaxy",
			address: "group2.html"},
			{id: "Group My",
			address: "group3.html"}
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
	}
	else{
		$(".friends-wrapper").css("height", "400px");
	}
	$(window).resize(function(){
		pageHeight = $(window).height(),
		pageWidth = $(document).width();
		if(pageWidth>=990){
			$(".friends-wrapper").css("height", (pageHeight - 163));
		}
		else{
			$(".friends-wrapper").css("height", "400px");
		}
	});

	if ($("#alert").hasClass("have-alert")) {
		$("#alert").find("div:first-child img").attr("src", "images/have-alert.png");
	}
	
	function countGroupmates(dataName){
		groupmatesNumber = $("div[data-name='"+dataName+"']").find(".team-dropup li").length;
		$("div[data-name='"+dataName+"']").find(".panel-title span").text("("+groupmatesNumber+"/50)");
	};

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

	$("body").tooltip({ selector: '[rel=tooltip]' });

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
							countGroupmates($firstListedFriend);
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
				if ($(this).hasClass("collapsed")) {
					$("#friendsList").find(".friends-list-buttons").remove();
					$(this).removeClass("collapsed");
				}
				else{
					$("#friendsList").find(".friends-list-buttons").remove();
					$(this).after(ul);
					$(this).next(".friends-list-buttons").append(messageButton, userButton, addUserButton);
					$(this).addClass("collapsed");
				}
			}
		};
	});
	$(document).on("click", "#teamsList li", function() {
		var $selectedTeam = $(this).attr("id");
		for (var i = 0; i < allTeams.length ; i++) {
			if (allTeams[i].id === $selectedTeam) {
				var	ul = "<ul class='row friends-list-buttons'></ul>",
				profileButton = "<li><a data-name='"+allTeams[i].id+"' href='"+allTeams[i].address+"'><img src='images/teams-chat.png' alt='profile' class='friends-list-buttons'></a></li>";
				if ($(this).hasClass("collapsed")) {
					$("#teamsList").find(".friends-list-buttons").remove();
					$(this).removeClass("collapsed");
				}
				else{
					$("#teamsList").find(".friends-list-buttons").remove();
					$(this).after(ul);
					$(this).next(".friends-list-buttons").append(profileButton);
					$(this).addClass("collapsed");
				}
			}
		};
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
					countGroupmates($thisDataName);
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
	$(document).on("click", "#groupList li a", function(e){
		e.preventDefault();
		var url = this.href,
			$thisId = $(this).parent().attr("id");
		if (!$(this).parent().hasClass("clicked")) {
			$.ajax({
				url: url,
				dataType: "html",
				type: "GET",
				success: function(data){		
					if (chatBoxCounter > 1 && pageWidth < 630) {
						$("#chatInfo").fadeIn(200);
						$("#chatInfo ul").prepend("<li data-name='"+$thisId+"'>"+$thisId+"</li>");
					}
					else if (chatBoxCounter > 2 && pageWidth < 1200) {
						$("#chatInfo").fadeIn(200);
						$("#chatInfo ul").prepend("<li data-name='"+$thisId+"'>"+$thisId+"</li>");
					}
					else if (chatBoxCounter > 3 && pageWidth < 1500) {
						$("#chatInfo").fadeIn(200);
						$("#chatInfo ul").prepend("<li data-name='"+$thisId+"'>"+$thisId+"</li>");
					}
					else if (chatBoxCounter > 4 && pageWidth < 1950) {
						$("#chatInfo").fadeIn(200);
						$("#chatInfo ul").prepend("<li data-name='"+$thisId+"'>"+$thisId+"</li>");
					}
					else if (chatBoxCounter > 5 && pageWidth >= 1950) {
						$("#chatInfo").fadeIn(200);
						$("#chatInfo ul").prepend("<li data-name='"+$thisId+"'>"+$thisId+"</li>");
					}
					else{
						$("#chatContainer").prepend($(data).find(".chat-window"));
					}
					countGroupmates($thisId);
				}
			});
			$(this).parent().addClass("clicked");
			chatBoxCounter ++;
			$("#chatInfo span").text($("#chatInfo ul li").length+1);
		} 
		else{
			removeChatBox($thisId);
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
						countGroupmates(thisListedFriendDataName);
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
	
	$(document).on("click", ".friends-search-button", function(){
		if (!$(this).hasClass("active")) {
			$(".friends-search-button").removeClass("active");
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
	$(document).on("click", ".groupmates ul li", function(){
		$(this).toggleClass("chosen");
	});
	
	$("#registerDatepicker").datepicker({
		dateFormat: "dd-mm-yy",
		changeYear: true,
		yearRange: "1945:2016"
	});

	$(document).on("click", "#gamesSlider ul li", function(){
		if (!$(this).hasClass("current-game")) {
			$("#gamesSlider ul li").removeClass("current-game");
			$(this).addClass("current-game");
		}
	});
	$(document).on("click", "#menuBackground ul li", function(){
		if (!$(this).hasClass("current-game")) {
			$("#menuBackground ul li").removeClass("current-game");
			$(this).addClass("current-game");
			$("#tournamentContainer").addClass("visable");
			menuChosenGame = true;
		}
	});

	$("#gameButton").on("click", function(){
		$(this).parent().toggleClass("open");
	});
	$("body").on("click", function(e){
		if (!$("li.dropdown").is(e.target) 
			&& $("li.dropdown").has(e.target).length === 0 
			&& $(".open").has(e.target).length === 0
		) {
			$("li.dropdown").removeClass("open");
		}
	});

	$("#tournamentContainer li").on("mouseenter", function(){
		$(this).find("img[data-name='cup']").attr("src", "images/cup-menu-red.png");
		$(this).find("img[data-name='coins']").attr("src", "images/coins-menu-red.png");
		$(this).find("span[data-name='play']").css("opacity", "1");
	});
	$("#tournamentContainer li").on("mouseleave", function(){
		$(this).find("img[data-name='cup']").attr("src", "images/cup-menu.png");
		$(this).find("img[data-name='coins']").attr("src", "images/coins-menu.png");
		$(this).find("span[data-name='play']").css("opacity", "0");
	});


	$("#menuBackground ul li").on("mouseenter", function(){
		if (menuChosenGame === false) {
			$("#tournamentContainer").addClass("visable");
		}
	});
	$("#menuBackground ul li").on("mouseleave", function(){
		if (menuChosenGame === false) {
			$("#tournamentContainer").removeClass("visable");
		}
	});
	$(document).on("click", "#tournamentPages a", function(){
		if (!$(this).hasClass("active")) {
			$("#tournamentPages a").removeClass("active");
			$(this).addClass("active");
		}
	});
});