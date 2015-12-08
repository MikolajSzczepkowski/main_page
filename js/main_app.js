$(function (){
	var pageHeight = $(window).height()-186;
		pageWidth = $(document).width(),
		menuBoxHeight = $(document).find("#firstMenuBox").height()+20;

	if(pageWidth>=990){
		$(".friends-list").css("height", pageHeight);
		$("#secondMenuBox").css("margin-top", "5px");
		$("#menuBackground").css("height", (menuBoxHeight-16));
	}
	else{
		$(".friends-list").css("height", "400px");
		$("#secondMenuBox").css("margin-top", menuBoxHeight);
	}
	$(window).resize(function(){
		pageHeight = $(window).height()-195,
		pageWidth = $(document).width();
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
	$(document).on("click", ".panel-heading span.icon-minim", function() {
		var $this = $(this);
		if (!$this.hasClass("panel-collapsed")) {
			$this.parents(".panel").find(".chat-body").slideUp();
			$this.parents(".chat-window").animate({top: "285px"});
			$this.addClass("panel-collapsed");
			$this.removeClass("glyphicon-minus").addClass("glyphicon-plus");
		} else {
			$this.parents(".panel").find(".chat-body").slideDown();
			$this.parents(".chat-window").animate({top: "0"});
			$this.removeClass("panel-collapsed");
			$this.removeClass("glyphicon-plus").addClass("glyphicon-minus");
		}
	});

	$(document).on("click", ".icon-close", function() {
		var $this = $(this);
		var $thisId = $this.parents(".chat-window").attr("id");
		$("#"+ $thisId).remove();
	});
	$(document).on("click", ".friends-list li", function() {
		var ul = "<ul class='row friends-list-buttons'></ul>",
			messageButton = "<li id='chatOn'><a href='chat.html'><img src='images/message.png' alt='massage' class='friends-list-buttons'></a></li>",
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
		var url = this.href;

		$.ajax({
			url: url,
			dataType: "html",
			type: "GET",
			success: function(data){
				$("#chatContainer").append($(data).find(".chat-window"));
			}
		});
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