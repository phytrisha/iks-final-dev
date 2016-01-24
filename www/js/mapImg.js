function getMapImgDimensions (count) {
	var dim = [];

	var img = new Image();
	
	img.onload = function() {
		dim[0] = parseInt(this.width);
		dim[1] = parseInt(this.height);
		console.log(dim);
		return dim;
	}
	
	img.src = 'img/maps/train_map_' + count + '.svg';
}