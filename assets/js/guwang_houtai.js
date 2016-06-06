  
  $(function(){
  	
 /*  条目背景颜色切换*/

    $(".odd:odd").css("background","#fff");
    $(".odd:even").css("background","#f9f9f9");
   
    /*侧边栏高度*/
  	 $(".side-bar").css({
    	 "height": $(document).height()
    });
    
    $(".jy ").css({
    	 "height": $(document).height()-220
    });
    
  });
 