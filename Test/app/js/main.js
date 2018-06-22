

window.onload = function() {
	//mobile nav
	

	var mobNav = document.getElementById("mob-nav");
	var headerNav = document.getElementById("header-menu");
	mobNav.onclick = function () {
		headerNav.classList.toggle("show-mob");

	};

}

$(document).ready(function() {

	//slider
	$(".owl-carousel").owlCarousel({
		items: 1,
		autoplay: true,
		loop: true,
		autoplaySpeed: 2000
	});

	//Say slider
	var sayText = $('.client-carousel__item');
	var navDot = $('.client-nav__dot');
	var navWrap = $('.client-nav__wrapper');
	var prevScrol = $('.prev-slide');
	var nextScrol = $('.next-slide');
		

		$(navDot).on('click', function () {
			var navDotIndex = $(this).index();
			var prevIndex = navDotIndex - 1;
			var nextIndex = navDotIndex + 1;

			$(navDot).removeClass('activ-dot');
			$(this).toggleClass('activ-dot');

			


			if (navDotIndex == 0) {
				$(navWrap).css({
					marginLeft: "100px"
				});
				$(sayText).hide();
				$(sayText[navDotIndex]).fadeIn(1000);
			} else {if (navDotIndex == 1) {
				$(navWrap).css({
					marginLeft: "50px"
				});
				$(sayText).hide();
				$(sayText[navDotIndex]).fadeIn(1000);
			} else {if (navDotIndex == 2) {
				$(navWrap).css({
					marginLeft: "0px"
				});
				$(sayText).hide();
				$(sayText[navDotIndex]).fadeIn(1000);
			} else {if (navDotIndex == 3) {
				$(navWrap).css({
					marginLeft: "-50px"
				});
				$(sayText).hide();
				$(sayText[navDotIndex]).fadeIn(1000);
			} else {
				$(navWrap).css({
					marginLeft: "-100px"
				});
				$(sayText).hide();
				$(sayText[4]).fadeIn(1000);
			}}}}
		});
		
		$(navDot[2]).click();
});