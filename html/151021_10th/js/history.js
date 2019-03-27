$(function(){
    iLen = $(".t_list .list").length;
    heightSet();
    hPush();
    axisY();
    $(window).resize(function(){
        winWidth = $(window).width();
        winHeight = $(window).height();
        heightSet();
        axisY();
    })
    $(window).scrollTop(0);
    if(!isMobileBrowser()){
        $(window).scroll(function(){
            sct = $(window).scrollTop();
            //인덱스 체크
            idxCheck();
            //타이틀 고정
            timeShow();
            //두번째 페이지
            if(sct > hArr[iLen-1]){
                $(".timeline").addClass("thanks");
            } else {
                $(".timeline").removeClass("thanks");
            }
            if(sct>=contPos+(listH*(iLen-1))){
                $(".event_cnt .title").addClass("absol");
            } else{
                $(".event_cnt .title").removeClass("absol");
            }
            //디폴트
            if(prevIdx!=nowIdx){
                timeAniDefault(nowIdx);
                prevIdx = nowIdx;
            }
        });
    } else{
        $(".history").addClass("fortab");
    }
    //애니 초기화
    function timeAniDefault(nowIdx){
        $(".t_list .list").removeClass("prev");
        $(".t_list .list:not(:eq("+nowIdx+"))").removeClass("on");
        $(".t_list .time:not(:eq("+nowIdx+"))").removeClass("focus");
        $(".t_list .list:eq("+nowIdx+")").addClass("on");
        $(".t_list .time:eq("+nowIdx+")").addClass("focus");
        $(".t_list .list:lt("+nowIdx+")").addClass("prev");
    }
    //페이지 휠
    $(window).on("mousewheel DOMMouseScroll",function(event, delta){
        
    })
    //상단 자세히 보기 버튼 클릭
    $(".history .btn_more").click(function(e){
        e.preventDefault();
        mouseDown();
    })
    function mouseDown(){
        $(".history .section_wrap").addClass("scroll");
        $("html, body").stop().animate({scrollTop:h[1]-gnbHeight}, speed, ease);
    }
    //썸네일 클릭 팝업
    $(".history .thumb li").each(function(i){
        $(this).click(function(e){
            e.preventDefault();
            var idx = $(this).parent("li").index();
            var popCnt = [
                ['<iframe width="995" height="617" src="https://www.youtube.com/embed/zqikr-XyWJk?rel=0&amp;showinfo=0&amp;vq=hd720&amp;wmode=opaque" frameborder="0" allowfullscreen></iframe>'],
                ['<img src="http://image.cabal.co.kr/Event/151021_10th/images/history/pop_06-1.jpg" alt="" />'],
                ['<img src="http://image.cabal.co.kr/Event/151021_10th/images/history/pop_06-2.jpg" alt="" />'],
                ['<iframe width="995" height="617" src="https://www.youtube.com/embed/bqSZv_LjoFE?rel=0&amp;showinfo=0&amp;vq=hd720&amp;wmode=opaque" frameborder="0" allowfullscreen></iframe>'],
                ['<img src="http://image.cabal.co.kr/Event/151021_10th/images/history/pop_07-2.jpg" alt="" />'],
                ['<iframe width="995" height="617" src="https://www.youtube.com/embed/Ma5meMDDyYk?rel=0&amp;showinfo=0&amp;vq=hd720&amp;wmode=opaque" frameborder="0" allowfullscreen></iframe>'],
                ['<img src="http://image.cabal.co.kr/Event/151021_10th/images/history/pop_08-2.jpg" alt="" />'],
                ['<iframe width="995" height="617" src="https://www.youtube.com/embed/TOW7tp5jtmA?rel=0&amp;showinfo=0&amp;vq=hd720&amp;wmode=opaque" frameborder="0" allowfullscreen></iframe>'],
                ['<img src="http://image.cabal.co.kr/Event/151021_10th/images/history/pop_10-1.jpg" alt="" />'],
                ['<iframe width="995" height="617" src="https://www.youtube.com/embed/6fX09Z-mt_I?rel=0&amp;showinfo=0&amp;vq=hd720&amp;wmode=opaque" frameborder="0" allowfullscreen></iframe>'],
                ['<img src="http://image.cabal.co.kr/Event/151021_10th/images/history/pop_11-1.jpg" alt="" />'],
                ['<iframe width="995" height="617" src="https://www.youtube.com/embed/dROZoN8552g?rel=0&amp;showinfo=0&amp;vq=hd720&amp;wmode=opaque" frameborder="0" allowfullscreen></iframe>'],
                ['<img src="http://image.cabal.co.kr/Event/151021_10th/images/history/pop_12-1.jpg" alt="" />'],
                ['<iframe width="995" height="617" src="https://www.youtube.com/embed/CZXtmOKKgmc?rel=0&amp;showinfo=0&amp;vq=hd720&amp;wmode=opaque" frameborder="0" allowfullscreen></iframe>'],
                ['<iframe width="995" height="617" src="https://www.youtube.com/embed/Bgsh9x-r3DI?rel=0&amp;showinfo=0&amp;vq=hd720&amp;wmode=opaque" frameborder="0" allowfullscreen></iframe>'],
                ['<a href="http://static.estgames.co.kr/renew/homepage/updatereview/unlimited.html" target="_blank"><img src="http://image.cabal.co.kr/Event/151021_10th/images/history/pop_14.jpg" alt="" /></a>'],
                ['<a href="http://cabal.co.kr/Intro/150715_new_beginning/beginning" target="_blank"><img src="http://image.cabal.co.kr/Event/151021_10th/images/history/pop_15.jpg" alt="" /></a>']
            ];
            $(".history .pop, .history .bg_hide").show();
            $(".history .pop .pop_area").hide().empty();
            $(".history .pop .pop_area").append(popCnt[i][0]).fadeIn();
        })
    });
    $(".history .pop .btn_close, .history .bg_hide").click(function(e){
        e.preventDefault();
        $(".history .pop, .history .pop li, .history .bg_hide").fadeOut();
    });

    $(".history .btn_top").click(function(e){
        e.preventDefault();
        $(window).scrollTop(0);
    })
});
var topHeight,
contPos,
sct = $(window).scrollTop(),
winHeight = $(window).height(),
winWidth = $(window).width(),
ease = "easeInOutQuart",
speed = 700,
listH = 250,
sci = 0,
nowIdx = 0,
prevIdx = null,
scrollCheck = true,
iLen = 0,
titleTop = 0,
hArr = [];
function heightSet(){
    var bar = 0;
    if($("#gnb").innerHeight()>0){
        bar = $("#gnb").outerHeight();
    } else if($(".s_gnbWarp").length>0){
        bar = $(".s_gnbWarp").outerHeight();
    }
    topHeight = winHeight-bar < 900 ? 900 : winHeight-bar;
    contPos = topHeight+bar;
    $(".history .event_top").css({height:topHeight});
    titleTop = $(".event_top .title").offset().top;
    //$(".history .event_cnt .timeline").css({paddingBottom:contPos});
}
function hPush(){
    var move;
    for(var i = 0; i<iLen; i++){
        move = i < 1 ? 0 : contPos-150+(listH*i);
        hArr.push(move);
    }
}
function idxCheck(){
    for(var i= iLen-1; i>-1; i--){
        if(sct >= hArr[i]){
            nowIdx = i;
            break;
        }
    }
    return nowIdx;  
}

function timeShow(){
    if(titleTop - sct <= 94){
        $(".btn_top").stop().fadeIn(400);
        $(".event_cnt .title, .history .bg_movie, .history .bg_movie .cover, .event_cnt .m_bar").show();
        $(".w1200 .m_bar").css({position:'absolute',top:sct-contPos+286});
    } else{
        $(".btn_top").hide();
        $(".event_cnt .title, .history .bg_movie, .history .bg_movie .cover, .event_cnt .m_bar").hide();
    }
}
function axisY(){
    if(winWidth <1200){
        $(".event_cnt").addClass("w1200");
        $(".w1200 .m_bar").css({position:'absolute',top:sct-contPos+286});
    } else{
        $(".event_cnt").removeClass("w1200");
        $(".event_cnt .m_bar").css({position:'',top:''});
    }
}

function wheelMove(delta){
    if(scrollCheck){
        if(delta == -1 || delta == 1){
            scrollCheck = false;
            if(sct<contPos && delta<0){
                //상단에서 타임라인으로 내려가기
                $("html,body").stop().animate({scrollTop:contPos},speed,function(){
                    setTimeout(function(){
                        scrollCheck = true;
                    },100)
                });
            } else if(sct<=contPos && delta>0){
                //타임라인에서 상단으로 올라가기
                $("html,body").stop().animate({scrollTop:0}, speed, ease,function(){
                    setTimeout(function(){
                        scrollCheck = true;
                    },100)
                });
            } else if(sct >= (iLen-1-delta)*listH+contPos && delta < 0){
                var docHeight = $(document).height();
                $("html,body").stop().animate({scrollTop:docHeight-winHeight},speed/2,function(){
                     setTimeout(function(){
                        scrollCheck = true;
                    },100)
                });
            } else{
                //스크롤 기본
                $("html,body").stop().animate({scrollTop:(nowIdx-delta)*listH+contPos},speed/2,function(){
                     setTimeout(function(){
                        scrollCheck = true;
                    },100)
                });
            }
        }
    }
}

//휠 액션
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
    wheelMove(delta);
    return false;
}

//휠 이벤트 바인딩
if (window.addEventListener) {
    window.addEventListener('DOMMouseScroll', wheel, false);
}
window.onmousewheel = document.onmousewheel = wheel;

// 태블릿 확인용
function isMobileBrowser(){
	var ua = navigator.userAgent.toLowerCase();
	return ua.match(/.*(android.+mobile|ipad.*mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino).*/) ||
		ua.substring(0, 4).match(
			/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/);
}