//하위버전 indexOf 사용하기
if(!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
         for (var i = (start || 0), j = this.length; i < j; i++) {
             if (this[i] === obj) { return i; }
         }
         return -1;
    }
}
$(function(){
    btnTop();
    // 채널링 여부 확인
    heightSet();
    // 페이지 최초 진입 시 초기화
    pageInit();
    //메뉴 클릭
    $(document).on("click",".event_gnb .menu_wrap a",function(e){
        e.preventDefault();
        var clickOn =  $(this).index(".event_gnb .menu_wrap a");
        var endEvent = clickOn == 1 || clickOn  == 3 || clickOn == 4 || clickOn == 5;
        if(!$(this).hasClass("on") && $(".container .section").length==1 ){
            if(!endEvent){
                var link = $(this).attr("href");
                clickCheck = true;
                location.hash = link;
            } else{
                window.alert("종료되었습니다.");
            }
        } else{   
           return false;
        }
    })
    $(document).on("click",".sub .btn_top",function(e){
        e.preventDefault();
        $(window).scrollTop(0);
    })
    $(document).on("click",".sub_2 .popup a, .sub_2 .bg_hide",function(e){
        e.preventDefault();
    })
    // 페이지 이동
    $(window).bind("hashchange",function(){
        hashCheck();
        if(pn!=-1){
            nextPg = pn;
        } else{
            pgHash = initHash;
            nextPg = pcArr.indexOf(pgHash);
        }
        if(thisPg==nextPg){return false}
        pageMove(pgHash);
    });
    $(window).scroll(function(e){
        sct = $(window).scrollTop();
        if(sct>topHe){
            $(".event_gnb").addClass("fixed");
        }else{
            $(".event_gnb").removeClass("fixed");
        }
        btnTop();
    })
    $(window).resize(function(){
        winHeight = $(window).height();
    })
    $(window).load(function(){
        $(window).scrollTop(0);
    })
})
//기본값 설정
var pgHash,initHash,initPg,thisPg,nextPg,tout0,int0,int4,sub4Move,pn,clickCheck;
var winHeight =$(window).height();
var pcArr = ["intro","sub_1","sub_2","sub_3","sub_4","sub_5","sub_6"];
var phArr = [1087,6265,3027,5144,3933,3250,3516];
var topHe = 0;
var sct = $(window).scrollTop();

// 페이지 최초 진입 시 초기화
function pageInit(){
    initPg = thisPg = $(".event_gnb .menu_wrap a.on").index(".event_gnb .menu_wrap a");
    initHash = $(".section").attr("class").split(" ")[1];
    hashCheck();
    if(pn!=-1 && thisPg != pn){
        thisPg = pn;
        $(".container").css({visibility:"hidden"});
        pageMove(pgHash);
    } else {
        pgHash = initHash;
        nextPg = thisPg;
        $(".container").css({"min-height":phArr[thisPg]});
        pageTit();
        pageEffect();
    }
}

//ajax로 다른 페이지 불러오기
function pageMove(pgHash){
    clearInterval(int0);
    clearTimeout(tout0);
    clearInterval(int4);
    //실서버 url 에 맞게 변경 필요
    var url = "./"+pgHash+".html";
    $.ajax({
        type:"get",
        url:url,
        dataType:"html",
        success:function(data){
            $(data).find(".section").appendTo(".container");
            if(clickCheck){
                clickCheck = false;
                //pageMove
                pageTransit();
            } else{
                //pageLoad
                pageLoad();
            }
            btnTop();
            document.title = "GRAND CABAL FESTIVAL";
            setTimeout(function(){document.title = "GRAND CABAL FESTIVAL";},500);
        }
    })
}

//페이지 진입 후 다른 페이지 로딩 시
function pageLoad(){
    $(".container").find(".section:first").remove();
    $(".menu_wrap .menu").removeClass("over");
    $(".event_gnb").css({top:"",opacity:""});
    if(nextPg==0){
        $(".container").removeClass("sub").addClass("main");
        $(".event_gnb").removeClass("sgnb").addClass("mgnb");
    } else{
        $(".container").removeClass("main").addClass("sub");
        $(".event_gnb").removeClass("mgnb").addClass("sgnb");
    }
    $(".container").css({visibility:"","min-height":phArr[nextPg]});
    $(".event_gnb .menu_wrap a").removeClass("on").eq(nextPg).addClass("on");
    thisPg = nextPg;
    pageEffect();
    pageTit();
}

//메뉴, history 버튼으로 다른 페이지 이동 시
function pageTransit(){
    var pctop = sct > topHe ? topHe-sct : 0;
    var scset = sct > topHe ? topHe : sct;
    var speed = 400;
    //gnb
    if(thisPg==0){
        var gpos = parseFloat($(".event_gnb").css("top"))+pctop;
        var cuth = sct > topHe ? winHeight - gpos : winHeight-topHe-gpos+sct;
        $(".event_gnb .menu").removeClass("over");
        $(document).off("mouseenter",".main .menu li a");
        $(".event_gnb").queue("fx",[]).stop().clone(true).insertAfter(".event_gnb").css({top:gpos,height:cuth}).animate({opacity:0},speed,function(){
            $(".container.main").removeClass("main").addClass("sub");
            $(this).remove();
        });
        $(".event_gnb:first").queue("fx",[]).stop().removeClass("mgnb").addClass("sgnb").css({top:-176}).animate({top:0},speed);
    } else if(nextPg==0){
        $(".event_gnb").queue("fx",[]).stop().clone(true).insertAfter(".event_gnb").animate({top:-176},speed,function(){
            $(".container.sub").removeClass("sub").addClass("main");
            $(this).remove();
        });
        $(".event_gnb:first").removeClass("sgnb").addClass("mgnb").css({top:"",opacity:0}); 
    }    
    $(".event_gnb .menu_wrap a").removeClass("on").eq(nextPg).addClass("on");
    $(".section:first").queue("fx",[]).stop().css({position:"absolute",top:pctop}).animate({opacity:0},speed,function(){
        $(this).remove();
    });
    $(".section:last").queue("fx",[]).stop().css({opacity:0}).animate({opacity:1},speed,function(){
        thisPg = nextPg;
        pageEffect();
        btnTop();
    });
    pageTit();
    $(window).scrollTop(scset);
    $(".container").queue("fx",[]).stop().css({"min-height":phArr[nextPg]});
}
//각 페이지 별 애니메이션
function pageTit(){
    if($("."+pgHash).find(".sub_tit").length>0){
        var titTop = $("."+pgHash).find(".sub_tit").position().top;
        $("."+pgHash).find(".sub_tit").queue("fx",[]).stop().delay(50).css({top:titTop-50}).animate({top:titTop,opacity:1},400,"easeInOutQuart");
    }
}
function pageEffect(){
    switch(pgHash){
        case "intro" : {
            introEffect();
            break;
        }
        case "replyCabalian" : {
            sub4Effect();
            break;
        }
	case "platinum" : {
		initPlatinum(1);
		break;
	}
    }
    
}
//상단 GNB, 온채널링 바가 있을 경우 높이 세팅
function heightSet(){
    if($("#gnb").innerHeight()>0){
        topHe = $("#gnb").outerHeight();
    } else if($(".s_gnbWarp").length>0){
        topHe = $(".s_gnbWarp").outerHeight();
    }
}

// 인트로 페이지 애니메이션
function introEffect(){
    $(".main .event_gnb").stop().delay(200).animate({opacity:1},400);
    $(".intro .char_wrap .char_left").stop().delay(450).animate({opacity:1,left:15},400);
    $(".intro .char_wrap .char_right").stop().delay(400).animate({opacity:1,right:6},400);
    $(".intro .char_wrap .char_main").stop().delay(300).animate({opacity:1,left:149},300);
    tout0 = setTimeout(function(){
        $(".intro .content .tit_txt").addClass("show");
    },300)
    int0 = setInterval(function(){
        var $bg_wrap = $(".intro .bg_wrap");
        var show = $bg_wrap.find(".show").index();
        var bgLeng = $bg_wrap.children().length;
        if(show < 0 || show == bgLeng-1){
            show = 0;
        } else {
            show++;
        }
        $bg_wrap.find(".show").stop().removeClass("show").css({opacity:1}).animate({opacity:0},1000,function(){
            $(this).hide();
        });
        $bg_wrap.find(":eq("+show+")").addClass("show").stop().show().css({opacity:0}).animate({opacity:1},1000);
    },5000)
}
// 서브4 페이지 세팅, 애니메이션
function sub4Effect(){
    sub4Move = function(){
        int4 = setInterval(function(){
            var moveTop = $("#index_Center_bn div.bn:first").stop().innerHeight();
            $("#index_Center_bn div.bn:first").queue("fx",[]).stop().animate({marginTop:-247},1000,function(){
                $(this).appendTo("#index_Center_bn .clsBannerScreen").css({marginTop:0});
            })
        },4000);
    }
    //sub4Move();
	initBoard();
}
// Top버튼
function btnTop(){
    if(sct>500){
        $(".sub .btn_top").queue("fx",[]).stop().fadeIn(400);
    } else{
        $(".sub .btn_top").queue("fx",[]).stop().hide();
    }
}
//해시체크
function hashCheck(){
    var param = "?";
    var hash = location.hash.split("#/")[1];
    if(hash && hash.indexOf(param) > -1){
        pgHash = hash.split("?")[0];
    } else {
        pgHash = hash;
    }   
    var endEvent = pcArr.indexOf(pgHash) == 1 || pcArr.indexOf(pgHash) == 3 || pcArr.indexOf(pgHash) == 4 || pcArr.indexOf(pgHash) == 5;
    if(endEvent){
        pn = -1;
    } else{
        pn = pcArr.indexOf(pgHash);   
    }
}