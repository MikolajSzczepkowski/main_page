$(function (){
	var percent = 0,
		bar = $('.transition-timer-carousel-progress-bar'),
		crsl = $('#myCarousel'),
		selectedDates = [];

	$.ajax({
		url: "data/events.json",
		dataType: "json",
		type: "get",
		success: function(data){
			$(data.events).each(function(index, value){
				selectedDates.push(value.date);
			});

			$( "#calendar" ).datepicker({showOtherMonths: true,
				selectOtherMonths: true,
				firstDay: 1,
				beforeShowDay: setActiveDays,
				onSelect: function (date) {
					dmy = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
					console.log(date, dmy);
					$(data.events).each(function(index, value){
						console.log(value.date);
						if (dmy == value.date) {
							$("#eventContainer img").attr("src", value.image);
						}
					});
				}
			});
		}
	});

	function setActiveDays(date) {
		dmy = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
		if ($.inArray(dmy, selectedDates) == -1) {
			return [false, ""];
		} else {
			return [true, "", "Event"];
		}
	}

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
});