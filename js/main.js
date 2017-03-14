$(function () {



	//horiz accordion
	$(function () {
		$('.acco__trigger').on('click', function (e) {
			e.preventDefault();

			var
				$this = $(this),
				container = $this.closest('.acco'),
				item = $this.closest('.acco__item'),
				items = $('.acco__item', container),
				otherContent = $('.acco__content', container),
				content = item.find('.acco__content'),
				reqHeight = item.find('.acco__content-text').outerHeight();

			if (!item.hasClass('active')) {

				items.removeClass('active');
				item.addClass('active');

				otherContent.css({
					'height': 0
				});

				content.css({
					'height': reqHeight
				});

			} else {

				item.removeClass('active');
				content.css({
					'height': 0
				});
			}
		});
	});

	//vert accordion
	$(function () {
		$('.acco-vert__trigger').on('click', function (e) {
			e.preventDefault();

			var
				$this = $(this),
				container = $this.closest('.acco-vert'),
				item = $this.closest('.acco-vert__item'),
				items = $('.acco-vert__item', container),
				otherContent = $('.acco-vert__content', container),
				content = item.find('.acco-vert__content'),
				reqWidth = item.find('.acco-vert__content-text').outerWidth();

			console.log(item);

			if (!item.hasClass('active')) {

				items.removeClass('active');
				item.addClass('active');

				otherContent.css({
					'width': 0
				});

				content.css({
					'width': reqWidth
				});

			} else {
				item.removeClass('active');
				content.css({
					'width': 0
				});
			}
		});
	});

	//one page scroll
	$(function () {

		var sections = $('.section'),
			display = $('.maincontent'),
			inScroll = false,
			screen = 0;

		var scrollToSection = function (sectionEq) {
			var position;

			position = (sections.eq(sectionEq).index() * -100) + '%';

			sections.eq(sectionEq).addClass('active').siblings().removeClass('active')

			display.css({
				'transform': 'translate3D(0px, ' + position + ', 0px)'
			});

			setTimeout(function () {
				inScroll = false;

				$('.pagination__item').eq(sectionEq).addClass('active')
					.siblings().removeClass('active');
			}, 1300);
		}

		$('.wrapper').on('wheel', function (e) {

			var deltaY = e.originalEvent.deltaY;
			var activeSection = sections.filter('.active');
			var nextSection = activeSection.next();
			var prevSection = activeSection.prev();

			if (inScroll) return;

			inScroll = true;


			if (deltaY > 0) { //скролл вниз
				if (nextSection.length) {
					screen = nextSection.index();
				}
			}

			if (deltaY < 0) { //скролл вверх 
				if (prevSection.length) {
					screen = prevSection.index();
				}
			}

			scrollToSection(screen);
		});

		$('.arrow-down').on('click', function (e) {
			e.preventDefault();

			scrollToSection(1);
		});

		$('.pagination__link, .order-link, .nav__link').on('click', function (e) {
			e.preventDefault();

			href = parseInt($(this).attr('href'));
			screen = href;

			scrollToSection(screen);
		});

		$('.wrapper').on('keydown', function (e) {

			var activeSection = sections.filter('.active');

			if ($(e.target).is('textarea')) return;

			switch (e.keyCode) {
			case 38: //вверх
				if (activeSection.prev().length)
					screen = activeSection.prev().index();
				break;
			case 40: //вниз
				if (activeSection.next().length)
					screen = activeSection.next().index();
				break;

			}

			scrollToSection(screen);
		})
	});

	//input mask
	$(function () {
		$('.phone-mask').inputmask('+7 (999) 999-99-99')
	});

	//popup
	$(function () {
		//reviews
		$('.review__view').fancybox({
			type: 'inline',
			maxWidth: 460,
			fitToView: false,
			padding: 0,
		});

		$('.full-review__close').on('click', function (e) {
			e.preventDefault();
			$.fancybox.close();
		});


		//order-popup 


		//order-popup close 
		$('.order-popup__close').on('click', function (e) {
			e.preventDefault();
			$.fancybox.close();
		});

	});

	//slider
	$(function () {
		var burgerCarousel = $('.burgers-slider__list').owlCarousel({
			items: 1,
			loop: true,
			smartSpeed: 1000
		});

		$('.arrow-right').on('click', function (e) {
			e.preventDefault();

			burgerCarousel.trigger('next.owl.carousel');
		});

		$('.arrow-left').on('click', function (e) {
			e.preventDefault();

			burgerCarousel.trigger('prev.owl.carousel');
		});
	});

	//map
	$(function () {
		ymaps.ready(init);
		var myMap,
			myPlacemark;

		function init() {
			myMap = new ymaps.Map("map", {
				center: [55.74254497, 37.62144982],
				zoom: 13,
				controls: []
			});

			var coords = [[55.74198793, 37.62707118],
										[55.75980205, 37.64011744],
										[55.75912449, 37.60681514]],
				myCollection = new ymaps.GeoObjectCollection({}, {
					iconLayout: 'default#image',
					iconImageHref: '../img/icons/map-marker.svg',
					iconImageSize: [46, 58],
					iconImageOffset: [-23, -56]
				});

			for (var i = 0; i < coords.length; i++) {
				myCollection.add(new ymaps.Placemark(coords[i]));
			}


			myMap.geoObjects.add(myCollection);

			myMap.behaviors.disable('scrollZoom');
		};

	});

	//ajax
	$(document).ready(function () {
		//order fancybox
		var orderFancybox = function (id) {
			$.fancybox({
				href: id,
				type: 'inline',
				minWidth: 200,
				fitToView: false,
				padding: 0
			});
		}

		$('#submit').on('click', function (e) {
			e.preventDefault;

			var name = $('input[name=name]').val()
			$.ajax({
				url: '/action.php',
				method: "POST",
				data: {
					name: name,
				},
				success: function (data) {
					var json = JSON.parse(data);
					if (json.error) {
						orderFancybox('#order-error');
					} else {
						orderFancybox('#order-success');
					}
				},
				error: function () {
					orderFancybox('#order-error');
				}
			});
		});
	});
});