
$(document).ready(function(){
	var maoId = "";
	var indexmao = ['scene', 'principle', 'ecosystem', 'roadmap'];
	$('.mao').on('click',function(){
		maoId	= indexmao[$(this).index()];
		$("html,body").animate({scrollTop: $('#'+maoId).offset().top+$("body").scrollTop()}, 500);
	})
	$(document).scroll( function (event){
			var  topScroll = $(window).scrollTop();
			if(topScroll>50){
				$('.nav').addClass('showNav');
			}else{
				$('.nav').removeClass('showNav');
			}
	});

	var headerState = {
		'subOpen': false,
		'subType': '',
		'mobileNavOpen': false
	};

	var headerController = function(){
		if (headerState.subOpen) {
			if (headerState.subType == 'products') {
				$('header').addClass('sub-open');
				$('.products-nav').addClass('active');
			}
		}else{
			$('header').removeClass('sub-open');
			$('.products-nav').removeClass('active');
		}
	}

	//打开产品子导航
	$('#products').mouseenter(function(){
		headerState.subOpen = true;
		headerState.subType = 'products';
		headerController();
	});

	$('#clients,#about,#eco,#solutions,#home').mouseenter(function(){
		headerState.subOpen = false;
		headerState.subType = '';
		headerController();
	});


	$('header').mouseleave(function(){
		headerState.subOpen = false;
		headerState.subType = '';
		headerController();
	});


	$('.navbar-toggle-btn').on('click',function(){
		if (headerState.mobileNavOpen) {
			$('.mobile-navbar').hide();
			$('body').removeClass('modal-open');
			headerState.mobileNavOpen = false;
		}else{
			$('.mobile-navbar').show();
			$('body').addClass('modal-open');
			headerState.mobileNavOpen = true;
		}
	});


});
