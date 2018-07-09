//引入css,less
require("../../../css/lib/reset.css");
require("../../../css/common/font.less");
require("../../../css/common/global.less");
require("../../../css/common/main.less");
require("../../../css/common/grid.less");
require("../../../css/common/header.less");
require("../../../css/common/footer.less");


var $ = require("jquery");
console.log($)
//引入 js
require("../../../js/components/header.js");
require("../../../js/components/cookie.js");
require('jquery-countdown');


require('./jquery.html5uploader.js');


require("../../../css/page/index.less");
require("../../../css/page/from.less");

var checkethaddress = require("../../../js/components/ethaddress.js");

const queryString = require('query-string');
var cookies = require('js-cookie');
var token;

require("../../../css/page/jquery-confirm.less");
require('../../../js/components/jquery-confirm.js');

$(function() {

console.log('get token');
// alert('- -')
  token = cookies.get('token');
  if(token==''||token==undefined){
  	window.location.href='/cn/index.html'
  	return;
  }



  const parsed = queryString.parse(location.search);
  console.log(parsed);
  var ethaddress=parsed.address;
  var refer=parsed.refer;
  var twitterscreenshot,Mediumscreenshot;

  if(ethaddress){
    $("#ethaddress_input").val(ethaddress);
  }
console.log('- -')
  $("#twitterscreenshot_a").click(function(){
    $("#twitterscreenshot").click();
    $('#twitterscreenshot_url').text('loading')
  })
	$("#twitterscreenshot").html5Uploader({
		name: "mFile",
		postUrl: "/api/file/upload",
    onClientError:function (e) {
      console.log(e);
   $('#twitterscreenshot_url').text('error')
      // $("#thelist").text('上传文件出错')
    },
    onServerError:function (e) {
      console.log(e);

      $('#twitterscreenshot_url').text('error')
    },
    onSuccess:function (e,file,data) {
       console.log(data);
       data=JSON.parse(data)
       if(data.file_url){
         $('#twitterscreenshot_url').html("<img style='width: 100px;height: 100px' src ='"+data.file_url+"'>")
         twitterscreenshot=data.file_url
       }

    }
	});


  $("#Mediumscreenshot_a").click(function(){
    $("#Mediumscreenshot").click();
    $('#Mediumscreenshot_url').text('loading')
  })
	$("#Mediumscreenshot").html5Uploader({
		name: "mFile",
		postUrl: "/api/file/upload",
    onClientError:function (e) {
      console.log(e);
      $('#Mediumscreenshot_url').text('error')

      // $("#thelist").text('上传文件出错')
    },
    onServerError:function (e) {
      console.log(e);
      $('#Mediumscreenshot_url').text('error')

      // $("#thelist").text('上传文件出错')
    },
    onSuccess:function (e,file,data) {
      console.log(data);
      data=JSON.parse(data)
      if(data.file_url){
       $('#Mediumscreenshot_url').html("<img style='width: 100px;height: 100px' src ='"+data.file_url+"'>");
        Mediumscreenshot=data.file_url;
      }

    }
	});

  $("#submit").click(function() {
    var unindexed_array = $("#form").serializeArray();
    var indexed_array = {};

   $.map(unindexed_array, function(n, i){
       indexed_array[n['name']] = n['value'];
   });

   console.log(indexed_array);
   if(checkethaddress(indexed_array['ethaddress'])==false ){
     $.alert('以太坊地址不合法')
     return;
   }

   if(indexed_array['twitter'].length==0 ){
     $.alert('微博账号名 不能为空')
     return;
   }

   if(indexed_array['telegram'].length==0 ){
     $.alert('微信账号名 不能为空')
     return;
    }
    //
    // if(indexed_array['medium'].length==0 ){
    //   $.alert('medium name cannot be empty')
    //   return;
    //  }

     if(twitterscreenshot==undefined ){
       $.alert('请上传微博截图')
       return;
      }

      if(Mediumscreenshot == undefined){
        $.alert('请上传微信截图')
        return;
      }


      // weibo' => 'required',
      // 'weixin' => 'required',
      // 'screen_weixin_url' => 'required',
      // 'screen_weibo_url' => 'required',

    var objpra={
      eth_address:indexed_array['ethaddress'],
      weibo:indexed_array['twitter'],
      // media:indexed_array['medium'],
      weixin:indexed_array['telegram'],
      screen_weibo_url:twitterscreenshot,
      screen_weixin_url:Mediumscreenshot,
      ref_address:refer
    };

   		 $.ajax({
   		  type: 'POST',
   		  url: '/api/activity/storeCN',
   		  data: objpra,
   		  success: function (data) {
          console.log(data);
          if(data.status=='ok'){
            $('#fromdiv').hide();
            $('#fromresult').show();
            $("#linkhref").attr("href","http://activity.lambda.im/cn/index.html?refer="+indexed_array['ethaddress']);
            $("#linkhref").text("http://activity.lambda.im/cn/index.html?refer="+indexed_array['ethaddress']);
          }else{
            $.alert(data.message);
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




})
