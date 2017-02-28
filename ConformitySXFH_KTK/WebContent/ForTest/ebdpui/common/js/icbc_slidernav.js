$.fn.sliderNav = function(options) {
	var defaults = {
		items : [  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z" ],
		height : null,
		
	};
	var opts = $.extend(defaults, options);
	var o = $.meta ? $.extend({}, opts, $$.data()) : opts;
	var slider = $(this);
	var itemArray=[];
	$(slider).addClass('slider');
	$(slider).append('<div class="slider-nav-tip"></div><div class="slider-nav"><ul></ul></div>');
   
	for (var i in o.items){
		if(o.items[i]=='热门')
			{
			$('.slider-nav ul', slider).append("<li><a alt='#" + o.items[i] + "'>热</br></br>门</a></li>");
			}
		else
			{
			$('.slider-nav ul', slider).append("<li><a alt='#" + o.items[i] + "'>" + o.items[i] + "</a></li>");
			}
		
	}
	var height;
	var navheight = $('.slider-nav', slider).height();
	if (o.height)
		height = o.height;
	else
		height = navheight;
	$('.slider-content, .slider-nav', slider).css('height', height);
	var tips=$('.slider-nav-tip', slider);
	setTimeout(function(){
		tips.css({
			'top':height/2-tips.height()/2+"px",
			'left':$(window).width()/2-tips.width()/2+"px"
		});
		$('.slider-nav ul', slider).css({
			'position':'absolute',
			'top':'50%',
			'margin-top':'-'+navheight/2+'px',
			'margin-left':'2.5px'
		});
		$('a[alt]').each(function(index,element){
			var current=$(element);
			var temp={};
			temp.key=o.items[index];
			temp.top=Math.round(current.offset().top+current.height());
			temp.obj=element;
			itemArray.push(temp);
		});
	},5);
	var touchHandle = function(event) {
		try{
			event.preventDefault();
			var touchCounts = event.touches.length;
			
			var distance=3;
			if (touchCounts >= 1) {
				var touchY=event.touches[touchCounts - 1].pageY;
			
				
				for (var i in itemArray){
					
					
					if(touchY>=itemArray[i].top-distance&&touchY<=itemArray[i].top+distance){
						var target = $(itemArray[i].obj).attr('alt');
						
						if(target=="#热门")
						{
							$('.slider-content', slider).stop().animate({
								scrollTop : '0px'
							});
						}
						else
						{
							var cOffset = $('.slider-content', slider).offset().top;
							var targetSlider=$('.slider-content ' + target, slider);
							if(targetSlider.offset()!=undefined){
								var tOffset = targetSlider.offset().top;
								var pScroll = (tOffset - cOffset) - height / 8;
								$('.slider-content', slider).stop().animate({
									scrollTop : '+=' + pScroll + 'px'
								});
							}
						}
						
						tips.html(itemArray[i].key).show();
						return;
					}
				}
			}
		}catch(e){
			
		}
	};
	$('.slider-nav', slider)[0].addEventListener("touchstart", touchHandle);
	$('.slider-nav', slider)[0].addEventListener("touchmove", touchHandle);
	$('.slider-nav', slider)[0].addEventListener("touchend", function(){
		tips.hide();
	});
};