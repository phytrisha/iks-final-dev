function activateContent (active, deactive) {
	$("." + active + "Content").addClass("active");
	$("." + deactive + "Content").removeClass("active");
	$("#" + active + "Sidebar").addClass("active");
	$("#" + deactive + "Sidebar").removeClass("active");
}

function collapseSidebar () {
	activateCell();
	$(".contentView").removeClass("active");
}

function activateCell (cell) {
	$(".programCell").removeClass("active");
	$(".programCell > .programTitle").css("border-bottom-style", "solid");
	if (cell != undefined) {
		$(cell).addClass("active");
		var previous = $(cell).prev().attr("id");
		$("#" + cell.id + " > .programTitle").css("border-bottom-style", "none");
		$("#" + previous + " > .programTitle").css("border-bottom-style", "none");
	}
}

window.onload = function() {
	activateContent("programs", "services");
	$("#servicesSidebar").click(function(){
		activateContent("services", "programs");
		collapseSidebar();
	});
	$("#programsSidebar").click(function(){
		activateContent("programs", "services");
	});
}

