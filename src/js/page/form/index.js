//引入css,less
require("../../../css/lib/reset.css");
require("../../../css/common/font.less");
require("../../../css/common/global.less");
require("../../../css/common/main.less");
require("../../../css/common/grid.less");
require("../../../css/common/header.less");
require("../../../css/common/footer.less");
require("../../../css/page/indexEn.less");

var $ = require("jquery");
console.log($)
//引入 js
require("../../../js/components/header.js");
require("../../../js/components/cookie.js");
require('jquery-countdown');
require("../../../css/page/from.less");

require('./jquery.html5uploader.js');

const queryString = require('query-string');
var cookies = require('js-cookie');
var token;

$(function() {


  token = cookies.get('token');
  if(token==''||token==undefined){
  	window.location.href='/'
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
         $('#twitterscreenshot_url').text(data.file_url)
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
       $('#Mediumscreenshot_url').text(data.file_url);
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

    var objpra={
      eth_address:indexed_array['ethaddress'],
      twitter:indexed_array['twitter'],
      media:indexed_array['medium'],
      telegram:indexed_array['telegram'],
      screen_twitter_url:twitterscreenshot,
      screen_media_url:Mediumscreenshot,
      ref_address:refer
    };

   		 $.ajax({
   		  type: 'POST',
   		  url: '/api/activity/store',
   		  data: objpra,
   		  success: function (data) {
          console.log(data);
          
          $('#fromdiv').hide();
          $('#fromresult').show();

   		  },
   			error: function (data) {
           console.log(data)
   				// $("#linkhref").text("sssss")
   				// $("#linkhref").attr("href","sssssss")
   				// $("#ethaddressfrom").attr("href","/form/index.html?address="+ethaddress+"&refer="+refer)
   				// $("#ethbtn").hide();
   				// $("#link").show();
   		  },

   		});

  })




})
