$(function (){
	var pageHeight = $(window).height()-186,
		pageWidth = $(document).width(),
		menuBoxHeight = $(document).find("#firstMenuBox").height()+20,
		leftChatPosition = null,
		chatBoxCounter = 0;

	if(pageWidth>=990){
		$(".friends-list").css("height", pageHeight);
		$("#secondMenuBox").css("margin-top", "5px");
		console.log(menuBoxHeight);
		$("#menuBackground").css("height", (menuBoxHeight-16));
	}
	else{
		$(".friends-list").css("height", "400px");
		$("#secondMenuBox").css("margin-top", menuBoxHeight);
	}
	$(window).resize(function(){
		pageHeight = $(window).height()-195,
		pageWidth = $(document).width(),
		menuBoxHeight = $("#firstMenuBox").height()+20;
		if(pageWidth>=990){
			$(".friends-list").css("height", pageHeight);
			$("#secondMenuBox").css("margin-top", "5px");
		}
		else{
			$(".friends-list").css("height", "400px");
			$("#secondMenuBox").css("margin-top", menuBoxHeight);
		}
	});

	$(document).on("click", "#target", function() {
		menuBoxHeight = $(document).find("#firstMenuBox").height()+20;
		console.log(menuBoxHeight);
		$("#menuBackground").css("height", (menuBoxHeight-16));
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
		var $this = $(this);
		var $thisId = $this.parents("div.chat-window").attr("id");
		$("div#"+ $thisId).remove();
		$("a#"+ $thisId).removeClass("clicked");
		chatBoxCounter --;
	});
	$(document).on("click", ".friends-list li", function() {
		var ul = "<ul class='row friends-list-buttons'></ul>",
			messageButton = "<li id='chatOn'><a id='player1' href='chat.html'><img src='images/message.png' alt='massage' class='friends-list-buttons'></a></li>",
			userButton = "<li><img src='images/user.png' alt='user' class='friends-list-buttons'></li>",
			addUserButton = "<li><img src='images/add-user.png' alt='add user' class='friends-list-buttons'></li>";
		if (!$(this).parent().hasClass("friends-list-buttons")) {
			$(".friends-list").find(".friends-list-buttons").remove();
			$(this).after(ul);
			$(this).next(".friends-list-buttons").append(messageButton, userButton, addUserButton);
		}
	});

	$(document).on("click", "#chatOn a", function(e){
		e.preventDefault();
		var url = this.href,
			id = $(this).attr("id");
		if (!$(this).hasClass("clicked")) {
			$.ajax({
				url: url,
				dataType: "html",
				type: "GET",
				success: function(data){		
					leftChatPosition = $(".chat-window").eq(0).offset();		
					if (chatBoxCounter > 1 && pageWidth < 630) {
						$("#chatContainer").append($(data).find(".chat-window"));
						$(".chat-window").last().addClass("left-chat-window");
					}
					else if (chatBoxCounter > 2 && pageWidth < 1200) {
						$("#chatContainer").append($(data).find(".chat-window"));
						$(".chat-window").last().addClass("left-chat-window");
					}
					else if (chatBoxCounter > 3 && pageWidth < 1500) {
						$("#chatContainer").append($(data).find(".chat-window"));
						$(".chat-window").last().addClass("left-chat-window");
					}
					else if (chatBoxCounter > 4 && pageWidth < 1900) {
						$("#chatContainer").append($(data).find(".chat-window"));
						$(".chat-window").last().addClass("left-chat-window");
					}
					else if (chatBoxCounter > 5 && pageWidth >= 1900) {
						$("#chatContainer").append($(data).find(".chat-window"));
						$(".chat-window").last().addClass("left-chat-window");
					}
					else{
						$("#chatContainer").append($(data).find(".chat-window"));
					}
				}
			});
			$(this).addClass("clicked");
			chatBoxCounter ++;
		} 
		else{
			$("#chatContainer").find("div#"+id).remove();
			$(this).removeClass("clicked");
			chatBoxCounter--;
		}
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