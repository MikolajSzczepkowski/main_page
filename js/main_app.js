$(function (){
	var pageHeight = $(window).height(),
		pageWidth = $(document).width(),
		htmlHeight = $("html").height(),
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
		];

	if(pageWidth>=990){
		$(".friends-list").css("height", (pageHeight-186));
		$(".main-inner-wrapper").css("padding-bottom", (pageHeight - htmlHeight));
	}
	else{
		$(".friends-list").css("height", "400px");
	}
	$(window).resize(function(){
		pageHeight = $(window).height(),
		pageWidth = $(document).width();
		if(pageWidth>=990){
			$(".friends-list").css("height", (pageHeight - 195));
			$(".main-inner-wrapper").css("padding-bottom", (pageHeight - htmlHeight));
		}
		else{
			$(".friends-list").css("height", "400px");
		}
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
	$(document).on("click", ".friends-list li", function() {
		var $selectedFriend = $(this).attr("id");
		for (var i = 0; i < allFriends.length ; i++) {
			if (allFriends[i].id === $selectedFriend) {
				var	ul = "<ul class='row friends-list-buttons'></ul>",
					messageButton = "<li id='chatOn'><a data-name='"+allFriends[i].id+"' href='"+allFriends[i].address+"'><img src='images/message.png' alt='massage' class='friends-list-buttons'></a></li>",
					userButton = "<li><img src='images/user.png' alt='user' class='friends-list-buttons'></li>",
					addUserButton = "<li><img src='images/add-user.png' alt='add user' class='friends-list-buttons'></li>";
				if (!$(this).parent().hasClass("friends-list-buttons")) {
					$(".friends-list").find(".friends-list-buttons").remove();
					$(this).after(ul);
					$(this).next(".friends-list-buttons").append(messageButton, userButton, addUserButton);
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
});