$(function (){
	var pageHeight = $(window).height()-195;
		pageWidth = $(document).width();

	if(pageWidth>=990){
		$(".friends-list").css("height", pageHeight);
	}
	else{
		$(".friends-list").css("height", "400px");
	}
	$(window).resize(function(){
		pageHeight = $(window).height()-195,
    	pageWidth = $(document).width();
    	if(pageWidth>=990){
			$(".friends-list").css("height", pageHeight);
		}
		else{
			$(".friends-list").css("height", "400px");
		}
	});

	$("#chat").on("click", function(){
		$("#friends").toggle( "slide", { 
			direction: "right",
			easing: "swing"
		},200);
	});
});