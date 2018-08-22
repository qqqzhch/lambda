//引入css,less
require("../../css/lib/reset.css");
require("../../css/common/font.less");
require("../../css/common/global.less");
require("../../css/common/main.less");
require("../../css/common/grid.less");
require("../../css/common/header.less");
require("../../css/common/footer.less");
require("../../css/page/index.less");

//引入 js
require("../../js/components/header.js");
require("../../js/components/cookie.js");
require('jquery-countdown');

var queryString=require('query-string');
// import queryString from 'query-string'

$(document).ready(function(){
	// 增加事件
	//倒计时
	// $('#getting-started').countdown('2018/06/30', function(event) {
	// 	$(this).html('<p>'+event.strftime('%n')+'</p>:'+'<p>'+event.strftime('%H')+'</p>:'+'<p>'+event.strftime('%M')+'</p>:'+'<p>'+event.strftime('%S')+'</p>');
	// });
	const parsed = queryString.parse(location.search);
	var from=parsed.from;
	//#tokenregister
	//#tokenwhitelist
	 
	if(from){
		$('#tokenregister').attr('href','https://token.lambda.im/index.html?from='+from+'#/register')
		$('#tokenwhitelist').attr('href','https://token.lambda.im/index.html?from='+from+'#/register')

	}


	$('.line').css('width',window.screen.width);

	$('.principle .item').on('click',function(){
		$(this).addClass('active').siblings().removeClass('active');
		var _index = $(this).index()-1;
		$('.principle .tab-contents div').eq(_index).addClass('contents-active').siblings().removeClass('contents-active');
	})


});
