$(document).ready(function() {
    
    if($(".scroll").length>0){
        $(".scroll").mCustomScrollbar({
            scrollInertia:0,
            scrollButtons:{enable:true}
        });
    }
    
    $(function() {
        $(".content").splitter({
          "orientation": "horizontal",
          /*"limit": 308*/
        });
    });

    $(window).resize(function() {
        $(".content .left").css('height', $(window).height() - 30);
        $(".content .left .inf_box,.content .left .nav").css('height', $(window).height() - 90);
        $(".content .left .tree_box").css('height', $(window).height() - 245);
    })
   
    $(".content .left").css('height', $(window).height() - 30);
    $(".content .left .inf_box,.content .left .nav").css('height', $(window).height() - 90);
    $(".content .left .tree_box").css('height', $(window).height() - 245);
    
    $(".nav_list li").click(function() {
        if(!$(this).hasClass("action")){
            $(this).parents().children().removeClass("action");            
            $(this).addClass("action");
        } 
    });

    
    $(".list_checkbox input").click(function() {
        if($(this).is(":checked")){
            $(this).parents(".list_box").addClass("check");            
        } else {
            $(this).parents(".list_box").removeClass("check");            
        }
    });

    $("label input.day").focus(function() {
        $(this).parent().prev().prop("checked",true);        
    });
    

    $(".sort").click(function() {
        if(!$(this).hasClass("action")){
            $(".sort").removeClass("action");
            $(this).addClass("action");            
        }
        if(!$(this).hasClass("down")){
            $(this).addClass("down")
        } else {
            $(this).removeClass("down")
        }
    });

    $(".list_box .list_name strong").click(function(){
        if($(this).parents().children(".list_checkbox").children("input").prop("checked")){ 
            $(this).parents(".list_box").removeClass("check")    
            $(this).parents().children(".list_checkbox").children("input").prop("checked",false);              
        } else {     
            $(this).parents(".list_box").addClass("check")
            $(this).parents().children(".list_checkbox").children("input").prop("checked",true);
        }
    });
    $(".list_box_wrap .list_box").last().addClass("last");
    
    $(".select > span").click(function() {
        if($(".select ul").is(":visible")){
            $(this).parent(".select").removeClass("action")
        } else {
            $(this).parent(".select").addClass("action")
        }
    });
    $(".select_ch li a,.select li a").click(function(e) {
		e.preventDefault();
        $(this).parent().parent().parent(".select_ch").removeClass("action").find("span").text($(this).text());
        $(this).parent().parent().parent(".select").removeClass("action");
    })
    
	$(document).click(function(event) {
		if (!$(event.target).parents().is(".select.action,.select_sub.action")) {
			$(".select,.select_sub").removeClass("action");
        } 
        	
    });
});