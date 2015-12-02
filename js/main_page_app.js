$(function (){
	var percent = 0,
		bar = $('.transition-timer-carousel-progress-bar'),
		crsl = $('#myCarousel');

	$( "#calendar" ).datepicker({showOtherMonths: true,
					selectOtherMonths: true,
					firstDay: 1
	});
	
	function progressBarCarousel() {
		bar.css({width:percent+'%'});
		percent = percent +0.5;
			if (percent>100) {
				percent=0;
				crsl.carousel('next');
				}      
			}
	crsl.carousel({
		interval: false,
		pause: true
	}).on('slid.bs.carousel', function () {percent=0;});var barInterval = setInterval(progressBarCarousel, 30);
	crsl.hover(
		function(){
			clearInterval(barInterval);
			},
		function(){
			barInterval = setInterval(progressBarCarousel, 30);
	});
	
	$(".newest").on("mouseenter", function(){
		$(this).append("<div class='newest-hover'></div>");
		$(".newest-hover").append("<p class='text-center text-uppercase'>visit</p>");
		$(".newest-hover").append("<p class='text-center text-uppercase'>profile</p>");	
	});
	$(".newest").on("mouseleave", function(){
		$(".newest-hover").remove();
	});
	$(".newest-tournament").on("mouseenter", function(){
		$(this).append("<div class='newest-hover text-center'></div>");
		$(".newest-hover").append("<img src='images/cup.png' alt='cup'/>");
		$(".newest-hover").append("<p class='text-uppercase'>enter</p>");
		$(".newest-hover").append("<p class='text-uppercase'>tournament</p>");	
	});
	$(".newest-tournament").on("mouseleave", function(){
		$(".newest-hover").remove();
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
});