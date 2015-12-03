$(function (){
	var pageHeight = $(window).height()-195;
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

	$("#chat").on("click", function(){
		$("#friends").toggle( "slide", { 
			direction: "right",
			easing: "swing"
		},200);
		$("#chatContainer").toggleClass("chat-right-buffer chat-right-buffer-clear")
	});
});