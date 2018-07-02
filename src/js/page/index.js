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

var checkethaddress = require("../../js/components/ethaddress.js");


var cookies = require('js-cookie');


const queryString = require('query-string');

var jQuery = require("jquery");

require("../../css/page/jquery-confirm.less");
require('../../js/components/jquery-confirm.js');


var refer='';

$(document).ready(function(){




console.log('- -')
const parsed = queryString.parse(location.search);
console.log(parsed);
if(parsed.refer){
	refer=parsed.refer;
}


	$("#ethaddressbtn").click(function () {
		var ethaddress = $("#ethaddress").val();
		 console.log(ethaddress);
		 if(checkethaddress(ethaddress)==false){
			 console.log('不合法')
			 $.alert('Ethereum address format error')
			 return ;
		 }

		 $.ajax({
		  type: 'POST',
		  url: 'api/auth/signup',
		  data: {
				email:ethaddress
			},
		  success: function (data) {
        console.log(data)
				if(data.status=='ok'){
					// $("#linkhref").text("http://activity.lambda.im/index.html?refer="+ethaddress)
					// $("#linkhref").attr("href","http://activity.lambda.im/index.html?refer="+ethaddress)
					// $("#ethaddressfrom").attr("href","/form/index.html?address="+ethaddress+"&refer="+refer)
          //
					// $("#ethbtn").hide();
					// $("#link").show();

					document.cookie="token="+data.token;   //   有可能会有时间限制
					window.location.href="/form/index.html?address="+ethaddress+"&refer="+refer

				}else{
					$.alert(data.message)
				}

		  },
			error: function (data) {
        console.log(data)
				$.alert('Server exception')
				// $("#linkhref").text("sssss")
				// $("#linkhref").attr("href","sssssss")
				// $("#ethaddressfrom").attr("href","/form/index.html?address="+ethaddress+"&refer="+refer)
				// $("#ethbtn").hide();
				// $("#link").show();
		  },

		});




	})
	// 增加事件
	//倒计时
	// $('#getting-started').countdown('2018/06/30', function(event) {
	// 	$(this).html('<p>'+event.strftime('%n')+'</p>:'+'<p>'+event.strftime('%H')+'</p>:'+'<p>'+event.strftime('%M')+'</p>:'+'<p>'+event.strftime('%S')+'</p>');
	// });
	// $('.line').css('width',window.screen.width);
  //
	// $('.principle .item').on('click',function(){
	// 	$(this).addClass('active').siblings().removeClass('active');
	// 	var _index = $(this).index()-1;
	// 	$('.principle .tab-contents div').eq(_index).addClass('contents-active').siblings().removeClass('contents-active');
	// })


});
