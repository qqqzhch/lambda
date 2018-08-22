//引入css,less
require("../../../css/lib/reset.css");
require("../../../css/common/font.less");
require("../../../css/common/global.less");
require("../../../css/common/main.less");
require("../../../css/common/grid.less");
require("../../../css/common/header.less");
require("../../../css/common/footer.less");
require("../../../css/page/indexEn.less");

//引入 js
require("../../../js/components/header.js");
require("../../../js/components/cookie.js");
require('jquery-countdown');

$(document).ready(function(){
	// 增加事件
	//倒计时
	// $('#getting-started').countdown('2018/08/20', function(event) {
	// 	$(this).html('<p>'+event.strftime('%n')+'</p>  '+'<p>'+event.strftime('%H')+'</p>:'+'<p>'+event.strftime('%M')+'</p>:'+'<p>'+event.strftime('%S')+'</p>');
	// });

});
