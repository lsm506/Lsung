$(function(){
	$(window).resize(function(){
		winHeight = $(window).height();
		winWidth = $(window).width();
		winResize();
	});
	winResize();
	
	$(".event").each(function(i){
        h[i] = $(this).offset().top;
    });
	
	$(window).scroll(function(){
		winHeight = $(window).height();
        sct = $(window).scrollTop();
		//퀵
		if(sct >= winHeight){
			$(".quick").show().stop().animate({height:357}, 200);
		}else{
			$(".quick").stop().animate({height:0}, 200, function(){
				$(this).hide();
			});
		}
		for(var i=0; i<4; i++){
			if(sct+300 >= h[i]){
				$(".quick li a").removeClass("on");
				$(".quick li a").eq(i).addClass("on");
			}			
		}
    });
    
	//메뉴 클릭
	$(".e_menu a").click(function(e){
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
	
	//팝업
	$(".btn_pop").each(function(i){
		$(this).click(function(e){
			e.preventDefault();
			$(".pop").eq(i).show();
			$(".bg_hide").show();
		});
	});
	$(".pop, .bg_hide").click(function(e){
		e.preventDefault();
		$(".pop, .bg_hide").hide();
	});
	
	//메뉴 오버시 움직임
	$(".top_menu li").each(function(i){
		var speed = 420;
		var easing = "jswing";
		var ani = 7;
		m[i] = parseInt($(this).css("top"));
		$(".top_menu li").eq(i).hover(function(){
			$(this).stop().animate({top: m[i]+ani}, speed, easing);
			Interval = setInterval(function(){
				if($(".top_menu li").filter(":animated").length <= 0){
					$(".top_menu li").eq(i).stop().animate({top:m[i]-ani}, speed, easing, function(){
						$(this).stop().animate({top:m[i]+ani}, speed, easing)
					});
				}
			}, 10);
		}, function(){
			clearInterval(Interval);
			$(this).stop().animate({top:m[i]}, speed, easing);
		})
	})
	
	$(".btn_down").click(function(e){
		e.preventDefault();
		speed = 800;
		easing = "easeInOutQuart";
		$("html,body").stop().animate({scrollTop:h[0]}, speed, easing);
	});

	//나뭇잎
	var positionX = [];
    var positionY = [];
	$(".event_top .absol").each(function(i){
        positionX[i] = parseInt($(this).css("left"));
        positionY[i] = parseInt($(this).css("top"));
    })
	$(".event_top").on("mousemove", function(e){
		var moveX = e.pageX/100;
		var moveY = e.pageY/100;
		$(".event_top .absol").each(function(i){
			if($(this).hasClass("mi")){
				$(".event_top .absol").eq(i).css({"left":positionX[i]-moveX, "top":positionY[i]-moveY});
			}else{
				$(".event_top .absol").eq(i).css({"left":positionX[i]+moveX, "top":positionY[i]+moveY});
			}
		})
	});
	var animateRotate = function(el, val){
		var elem = $(el);
		elem.animate({deg: val}, {
			duration: 1800,
			step: function(now){
				elem.css({
					transform: "rotate(" + now + "deg)"
				});
			}
		});
	}
	setInterval(function(){
        animateRotate(".event_top .absol", 15);
		animateRotate(".event_top .absol", -3);
    }, 10);
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
	$(".event_top .content").css("height",winHeight);
	if(winWidth <= 1280){
		$(".quick").addClass("move");
	}else{
		$(".quick").removeClass("move");
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
        delta = event.wheelDelta/120;
    } else if(event.detail){
        delta = -event.detail/3;
    }
	if(scrollChk){
		var movePosition;
		if(delta < 0 && sct<h[0]){
			//내림
            event.preventDefault ? event.preventDefault() : event.returnValue = false;
            scrollChk = false;
            $("html,body").stop().animate({scrollTop:h[0]},speed,easing,function(){
                scrollChk = true;
            });
            return false;
        }else if(delta > 0 && sct<=h[0]){
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