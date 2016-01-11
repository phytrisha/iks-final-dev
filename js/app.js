function activateContent (active, deactive) {
	$("." + active + "Content").addClass("active");
	$("." + deactive + "Content").removeClass("active");
}

function activateCell (cell) {
	$(".programCell").removeClass("active");
	$(cell).addClass("active");
	var previous = $(cell).prev().attr("id");
	$(".programCell > .programTitle").css("border-bottom-style", "solid");
	$("#" + cell.id + " > .programTitle").css("border-bottom-style", "none");
	$("#" + previous + " > .programTitle").css("border-bottom-style", "none");
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

