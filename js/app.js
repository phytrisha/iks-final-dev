function activateContent (active, deactive) {
	$("." + active + "Content").addClass("active");
	$("." + deactive + "Content").removeClass("active");
}

function activateCell (cell) {
	$(".programCell").removeClass("active");
	$(cell).addClass("active");
	var title = $(".programTitle");
}

window.onload = function() {
	activateContent("programs", "services");
	$("#sidebarServices").click(function(){
		activateContent("services", "programs");
	});
	$("#sidebarPrograms").click(function(){
		activateContent("programs", "services");
	});
}

