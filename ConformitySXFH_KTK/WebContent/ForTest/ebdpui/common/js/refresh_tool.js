


var RefreshTool = {
    showrefreshmodel: function() {
    	
    	$('body').append('<div class="refreshmodel"><div class="refreshicon"></div></div> ');
        
    },
    closerefreshmodel:function()
    {
    	$('.refreshmodel').remove();
    },
    showautoload:function(containterId)
    {
    	$("#"+containterId).append('<div class="autoloadtips"><div class="autolaodicon"></div><span>加载中...</span></div>');
    	
    	
    },
    closeautoload:function()
    {
    	$('.autoloadtips').remove();
    }
};



