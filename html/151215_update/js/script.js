$(function() {

	$(".event").each(function(i) {
		h[i] = $(this).offset().top;
	});
	$(window).scroll(function() {
		winHeight = $(window).height();
		sct = $(window).scrollTop();
		
		var scrollTop = $(window).scrollTop() + 350;
		$(".main_menu li a").removeClass("on");
		if (scrollTop > 5247 && scrollTop < 8291) {
			$(".m_nav_5").addClass("on");
		} else if (scrollTop > 3998 && scrollTop < 5247) {
			$(".m_nav_4").addClass("on");
		} else if (scrollTop > 2859 && scrollTop < 3998) {
			$(".m_nav_3").addClass("on");
		} else if (scrollTop > 1907 && scrollTop < 2859) {
			$(".m_nav_2").addClass("on");
		} else if (scrollTop > 955 && scrollTop < 1907) {
			$(".m_nav_1").addClass("on");
		}

		var position = $(window).scrollTop();
		if (position > 882) {
			$(".top").fadeIn();
		} else {
			$(".top").hide();
		} 
		var ong = $(window).scrollTop();
		if (ong > 0) {
			$(".ong").fadeIn();
		} else {
			$(".top").hide();
		} 
	});

	$(".main_menu li a").click(function(e) {
		e.preventDefault();
		var link = $(this).attr("href");
		speed = 800;
		easing = "easeInOutQuart";
		if ($(this).hasClass("top")) {
			$("html, body").animate({
				scrollTop : 0
			}, speed, easing);
		} else {
			$("html, body").animate({
				scrollTop : $(link).offset().top - 73
			}, speed, easing);
		}
	});
	
	var updateHeight;
	var barHeight = 0;
	if($("#gnb").length > 0 && !$("#gnb").hasClass("daum_bg")){
        barHeight = 30;
    } else if($(".s_gnbWarp").length>0){
        barHeight = 62;    
    }
    //인트로 높이
    if(winHeight - barHeight < 965){
        updateHeight = 965;
    } else{
        updateHeight = winHeight-barHeight;
    }
	$(window).scroll(function(){
        if(barHeight == 62){
            var sct = $(window).scrollTop();
            if(sct>=62){
                $(".wrap .header_menu").stop().css("top",0);
            } else{
                $(".wrap .header_menu").stop().css("top",62-sct);
            }
        }
    })

});

var winHeight = $(window).height(),
    winWidth = $(window).width(),
    sct = $(window).scrollTop(),
    speed = 800,
    easing = "easeInOutQuart",
    scrollChk = true,
    h = [],
    m = [];

function winResize() {
	$(".container").css("height", winHeight);
}

//휠 이벤트
if (window.addEventListener) {
	window.addEventListener('DOMMouseScroll', wheel, false);
}
window.onmousewheel = document.onmousewheel = wheel;
function wheel(event) {
	var delta = 0;
	if (!event) {
		event = window.event;
	}
	if (event.wheelDelta) {
		delta = event.wheelDelta / 150;
	} else if (event.detail) {
		delta = -event.detail / 3;
	}
	if (scrollChk) {
		var movePosition;
		if (delta < 0 && sct < h[0]) {
			//내림
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			scrollChk = false;
			$("html,body").stop().animate({
				scrollTop : h[0]
			}, speed, easing, function() {
				scrollChk = true;
			});
			return false;
		} else if (delta > 0 && sct <= h[0]) {
			//올림
			scrollChk = false;
			event.preventDefault ? event.preventDefault() : event.returnValue = false;
			$("html,body").clearQueue().animate({
				scrollTop : 0
			}, speed, easing, function() {
				scrollChk = true;
			});
			return false;
		}
	} else {
		event.preventDefault ? event.preventDefault() : event.returnValue = false;
	}
}

$(function() {
	$(".btn_vedio").click(function() {
		$(".movie_area3,.bg_hide,.bg_img").show();
		$(".movie3").html("<iframe width='1200' height='675' src='https://www.youtube.com/embed/uXMYtkkNRqQ?rel=0&showinfo=0&vq=hd720&wmode=opaque' frameborder='0' allowfullscreen></iframe>");
	});
	$(".v_movie").click(function() {
		$(".movie_area2,.bg_hide,.bg_img").show();
		$(".movie2").html("<iframe width='1200' height='750' src='https://www.youtube.com/embed/feYKjJvDoFI?rel=0' frameborder='0' allowfullscreen></iframe>");
	});
	$(".btn_vedio2").click(function() {
		$(".movie_area3,.bg_hide,.bg_img").show();
		$(".movie3").html("<iframe width='1200' height='675' src='https://www.youtube.com/embed/t9wDpJWFYqA?rel=0' frameborder='0' allowfullscreen allowtransparency='true'></iframe>");
	});
	$(".bg_hide, .btn_close").click(function() {
		$(".movie_area,.movie_area2,.movie_area3,.bg_hide,.bg_img").hide();
		$(".movie,.movie2,.movie3").html("");
	});
});

$(".intro_2 .update1_img").mouseover(function() {
	$(".intro_2 .update1_img").removeClass("on");
	$(this).addClass("on");
}).mouseout(function() {
	$(this).addClass("on");
});
$(".intro_3 .update2_img").mouseover(function() {
	$(".intro_3 .update2_img").removeClass("on");
	$(this).addClass("on");
}).mouseout(function() {
	$(this).addClass("on");
});
$(".intro_5 .update1_img").mouseover(function() {
	$(".intro_5 .update1_img").removeClass("on");
	$(this).addClass("on");
}).mouseout(function() {
	$(this).addClass("on");
});
$(".intro_6 .update1_img").mouseover(function() {
	$(".intro_6 .update1_img").removeClass("on start");
	$(this).addClass("on start");
}).mouseout(function() {
	$(".intro_6 .update1_img").removeClass("on start");
	$(this).addClass("on");
});
$(".intro_6 .update2_img").mouseover(function() {
	$(".intro_6 .update2_img").removeClass("on start");
	$(this).addClass("on start");
}).mouseout(function() {
	$(".intro_6 .update2_img").removeClass("on start");
	$(this).addClass("on");
});
$(".intro_6w").mouseout(function() {
	$(".intro_6 .update1_img, .intro_6 .update2_img").addClass("start");
});

function change(obj) {
	document.getElementById("tab01").style.display = "none";
	document.getElementById("tab02").style.display = "none";
	document.getElementById("tab03").style.display = "none";
	document.getElementById("tab04").style.display = "none";
	document.getElementById("tab05").style.display = "none";
	document.getElementById("tab06").style.display = "none";
	document.getElementById(obj).style.display = "block";
};
$(".tab_nav a").click(function() {
	$(".tab_nav a").removeClass("on");
	$(this).addClass("on");
})


$(".tab_nav li").each(function( index ) {
var i = index + 1;
$(".tab_nav li a").click(function() {
var index_id = $(this).attr('id'); 

var youtubeAddr = "https://www.youtube.com/embed/";
var youtubeParam = "?rel=0&wmode=opaque";

	$(".sk_movie").show();
	$(".sk_movie iframe").attr("src", youtubeAddr + index_id + youtubeParam);
});
});
