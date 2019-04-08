$(function(){
	
	$(".event").each(function(i){
        h[i] = $(this).offset().top;
    });
    $(window).scroll(function(){
		winHeight = $(window).height();
        sct = $(window).scrollTop();
        
        var scrollTop = $(window).scrollTop() + 350;	
				$(".quick_menu li").removeClass("on");					
				if(scrollTop > 2917 && scrollTop < 5000) {
					$(".q3").addClass("on");
				}else if(scrollTop > 1949 && scrollTop < 2917) {
					$(".q2").addClass("on");
				}
				else if(scrollTop > 955 && scrollTop < 1949) {
					$(".q1").addClass("on");
				}
				else if(scrollTop > 0 && scrollTop < 955) {
					
				}
		
	var position = $(window).scrollTop();
	if (position > 882){
		$(".quick_menu").fadeIn();
	}else{
		$(".quick_menu").hide();
	}
    });
    
    $(".menu a").click(function(e){
		e.preventDefault();
		var link = $(this).attr("href");
		speed = 800;
		easing = "easeInOutQuart";
		if($(this).hasClass("btn_top")){
			$("html, body").animate({scrollTop:0}, speed, easing);
		}else{
			$("html, body").animate({scrollTop:$(link).offset().top}, speed, easing);
		}
	});
	$(".btn_pop").each(function(i){
		$(this).click(function(e){
			e.preventDefault();
			$(".pop").eq(i).show();
			$(".bg_hide").show();
		});
	});
	$(".pop img, .bg_hide").click(function(e){
		e.preventDefault();
		$(".pop, .bg_hide").hide();
	});
	
	
});

var winHeight = $(window).height(),
    winWidth = $(window).width(),
    sct = $(window).scrollTop(),
	speed = 800,
	easing = "easeInOutQuart",
	scrollChk = true,
    h = [],
	m = [];

function winResize(){
	$(".container").css("height",winHeight);
	if(winWidth <= 1280){
		$(".quick_menu").addClass("move");
	}else{
		$(".quick_menu").removeClass("move");
	}
}

//휠 이벤트
if (window.addEventListener) {
    window.addEventListener('DOMMouseScroll', wheel, false);
}
window.onmousewheel = document.onmousewheel = wheel;
function wheel(event){
    var delta = 0;
    if(!event){
    	event = window.event;
    }
    if(event.wheelDelta){
        delta = event.wheelDelta/150;
    } else if(event.detail){
        delta = -event.detail/3;
	}
	if(scrollChk){
		var movePosition;
		if(delta < 0 && sct<h[0]){
			//내림
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            scrollChk = false;
            $("html,body").stop().animate({scrollTop:h[1]},speed,easing,function(){
                scrollChk = true;
            });
            return false;
        }else if(delta > 0 && sct<=h[1]){
			//올림	
			scrollChk = false;		
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
			$("html,body").clearQueue().animate({scrollTop:0},speed,easing,function(){				
				scrollChk = true;
            });
            return false;
        }
    }else{
        event.preventDefault ? event.preventDefault() : event.returnValue = false;
	}
}
