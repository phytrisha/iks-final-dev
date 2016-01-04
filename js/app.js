function activateContent (active, deactive) {
	$("." + active + "Content").addClass("active");
	$("." + deactive + "Content").removeClass("active");
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