
jQuery(document).ready(function() {

	var barChart = [5,8,2,1,15,2,3,5,9,11,10,4,3,14,1,7,10,3,2,13];
	var lengthChart = $(barChart).length
	var heightChart = 20;
			
		for (var i = 0; i < barChart.length; i++) {
			$("<div/>").attr('class','chartItem').appendTo('#barChart'); 	
		}			

		$("<div/>").attr('class','chartItemInner').appendTo('.chartItem');
		var itemInner = $('.chartItemInner');
		
	for (var i = 0; i < itemInner.length; i++) {
		var seeHeight = barChart[i] * 20;
		$(itemInner[i]).animate({
			bottom: seeHeight,
		}, 2000);
	}
});