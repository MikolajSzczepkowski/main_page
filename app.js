$(function (){
	var pageHeight = $(document).height(),
		pageWidth = $(document).width();

	if(pageWidth>=990){
		$(".friends").css("height", pageHeight);
	}
	else{
		$(".friends").css("height", "auto");
	}
	$(window).resize(function(){
		pageHeight = $(document).height(),
    	pageWidth = $(document).width();
    	if(pageWidth>=990){
			$(".friends").css("height", pageHeight);
		}
		else{
			$(".friends").css("height", "auto");
		}
	});

	$("#chat").on("click", function(){
		$("#friends").toggle( "slide", { 
			direction: "right",
			easing: "swing"
		},500);
	});

	$(".game-image").on("mouseenter", function(){
		$(this).prepend("<div class='game-image-hover'></div>");
		$(".game-image-hover").append("<p class='text-center text-uppercase game-hover-players'></p>");
		$(".game-image-hover").append("<p class='text-center text-uppercase game-hover-info'></p>");
		$(".game-image-hover").append("<p class='text-center text-uppercase game-hover-fee'></p>");
		$(".game-hover-players").html("players<br>24/64");
		$(".game-hover-info").html("Registration ends<br> 28.10.2015");
		$(".game-hover-fee").html("678$");
		
	});
	$(".game-image").on("mouseleave", function(){
		$(".game-image-hover").remove();
	});
	$( "#progressbar1" ).progressbar({
      value: 50
    });
    $( "#progressbar2" ).progressbar({
      value: 75
    });
    $( "#calendar" ).datepicker({ firstDay: 1});
    
    var percent = 0, bar = $('.transition-timer-carousel-progress-bar'), crsl = $('#myCarousel');
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
			    })
});