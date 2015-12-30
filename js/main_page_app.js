$(function (){
	var percent = 0,
		bar = $('.transition-timer-carousel-progress-bar'),
		crsl = $('#myCarousel'),
		selectedDates = ["9-12-2015", "14-12-2015", "15-12-2015", "24-12-2015"];

	function setActiveDays(date) {
	    dmy = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
	    if ($.inArray(dmy, selectedDates) == -1) {
	        return [false, ""];
	    } else {
	        return [true, "", "Event"];
	    }
	}

	$( "#calendar" ).datepicker({showOtherMonths: true,
					selectOtherMonths: true,
					firstDay: 1,
					beforeShowDay: setActiveDays
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
	$(document).on("mouseenter", ".newest-hover p", function(){
		$(this).addClass("active");
		$(this).siblings().addClass("active");	
	});
	$(document).on("mouseleave", ".newest-hover p", function(){
		$(this).removeClass("active")
		$(this).siblings().removeClass("active")
	});
});