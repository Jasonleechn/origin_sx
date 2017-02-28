/**
 * 走势图对象 canvasId:对应的canvasId chartType：图类型 1：实时走势 2：k线图 dataSource：图数据源
 * 格式为二维的数组 实时走势：[[time,price]...] K线走势：[[time,最高价，最低价，开盘价，收盘价]....]
 */
function ChartView(canvasId) {
	this.$canvasId = jQuery("#" + canvasId);
	this.canvasId = document.getElementById(canvasId);
}
/**
 * 设置画图类型 (小图0、大图1)
 */
ChartView.prototype.setDrawType = function(drawType) {
	this.drawType = drawType;
};
/**
 * 数据的小数位数
 * 
 */
ChartView.prototype.setFixedLength = function(fixedLength) {
	this.fixedLength = fixedLength;
};
/**
 * 数据的小数位数
 * 
 */
ChartView.prototype.getFixedLength = function() {
	if (this.fixedLength) {
		return this.fixedLength;
	} else {
		return 2;
	}
};
/**
 * 设置图类型
 * 
 */
ChartView.prototype.setChartType = function(chartType) {
	this.chartType = chartType;
};
/**
 * 设置实时走势图日期
 * 
 */
ChartView.prototype.setDate = function(dateStr) {
	this.dateStr = dateStr;
};
/**
 * 设置数据源
 * 
 */
ChartView.prototype.setDataSource = function(dataSource) {
	this.dataSource = dataSource;
};
/**
 * 设置是否显示触摸tips
 * 
 */
ChartView.prototype.setTips = function(tips) {
	this.tips = tips;
};
/**
 * 画线方法
 * 
 */
ChartView.prototype.drawLine = function(context, color, width, points) {
	context.strokeStyle = color;
	context.lineWidth = width;
	context.beginPath();
	context.moveTo(points[0][0], points[0][1]);
	for ( var i = 1; i < points.length; i++) {
		context.lineTo(points[i][0], points[i][1]);
	}
	context.stroke();
};
/**
 * 画虚线方法
 * 
 */
ChartView.prototype.drawDashedLine = function(context, color, width, points) {
	context.strokeStyle = color;
	context.lineWidth = width;
	context.beginPath();
	context.dashedLineTo(points[0][0], points[0][1],points[1][0], points[1][1]);
};
/**
 * 写文本方法
 * 
 */
ChartView.prototype.drawText = function(context, color, xpos, ypos, text) {
	context.strokeStyle = color;
	context.font = "11px Helvetica";
	context.fillText(text, xpos, ypos);
	context.stroke();
};
/**
 * 填充颜色
 * 
 */
ChartView.prototype.drawFill = function(context, style, points) {
	context.fillStyle = style;
	context.beginPath();
	context.moveTo(points[0][0], points[0][1]);
	for ( var i = 1; i < points.length; i++) {
		context.lineTo(points[i][0], points[i][1]);
	}
	context.fill();
};
/**
 * 画K线柱子
 * 
 */
ChartView.prototype.drawK = function(context, x, startY, endY, max, min) {
	try {
		/* 传进来的startY,endY,max,min是坐标值，所以颜色要反着看 */
		if (startY < endY) {
			var grad = context.createLinearGradient(x, startY, x, endY);
			grad.addColorStop(0, 'rgba(39,199,122,1)');
			grad.addColorStop(1, 'rgba(39,199,122,1)');
			this.drawFill(context, grad, [ [ x - this.kRecWidth / 2, endY ], [ x + this.kRecWidth / 2, endY ], [ x + this.kRecWidth / 2, startY ], [ x - this.kRecWidth / 2, startY ] ]);
			this.drawLine(context, "rgb(39,199,122)", 1, [ [ x, startY ], [ x, max ] ]);
			this.drawLine(context, "rgb(39,199,122)", 1, [ [ x, endY ], [ x, min ] ]);
		} else if (startY > endY) {
			var grad = context.createLinearGradient(x, endY, x, startY);
			grad.addColorStop(0, 'rgba(248,95,95,1)');
			grad.addColorStop(1, 'rgba(248,95,95,1)');
			this.drawFill(context, grad, [ [ x - this.kRecWidth / 2, endY ], [ x + this.kRecWidth / 2, endY ], [ x + this.kRecWidth / 2, startY ], [ x - this.kRecWidth / 2, startY ] ]);
			this.drawLine(context, "rgb(248,95,95)", 1, [ [ x, startY ], [ x, min ] ]);
			this.drawLine(context, "rgb(248,95,95)", 1, [ [ x, endY ], [ x, max ] ]);
		} else {
			/* 开盘价等于收盘价，十字星 */

			this.drawLine(context, "rgb(248,95,95)", 1, [ [ x - this.kRecWidth / 2, startY ], [ x + this.kRecWidth / 2, startY ] ]);
			this.drawLine(context, "rgb(248,95,95)", 1, [ [ x, min ], [ x, max ] ]);
		}
	} catch (e) {
	}
};

/**
 * 根据价格获取Y坐标的最大值和最小值 实时走势 直接比较价格 k线图 比较最高价获取最大值；比较最低价获取最小值
 * 
 */
ChartView.prototype.getMaxPrice = function() {
	var maxPrice = 0;
	var minPrice = 100000000;

	for ( var i = 0; i < this.dataSource.length; i++) {
		if (this.chartType == "1") {// 实时走势
			maxPrice = Math.max(maxPrice, this.dataSource[i][0]);
			minPrice = Math.min(minPrice, this.dataSource[i][0]);
		} else if(this.chartType == "2"){// k线
			maxPrice = Math.max(maxPrice, this.dataSource[i][3]);
			minPrice = Math.min(minPrice, this.dataSource[i][4]);
		} else if(this.chartType == "3"){//基金
			maxPrice = Math.max(maxPrice, this.dataSource[i][0]);
			minPrice = Math.min(minPrice, this.dataSource[i][0]);
		}
	}
	this.maxPrice = maxPrice;
	this.minPrice = minPrice;
};

/**
 * 画图
 * 
 */
ChartView.prototype.drawChartView = function() {
	if(navigator.userAgent.toLowerCase().indexOf('msie')>-1 ){
		if (this.drawType == "1") {
			var clientWidth = $(window).width();
			var clientHeight = $(window).height();
			var ua = navigator.userAgent;
			if (ua.indexOf('IEMobile/10.0')>-1 ) {
				jQuery('#myCanvas').attr("height", clientHeight - 86);
			}else{
				jQuery('#myCanvas').attr("height", clientHeight - 72);
			}
			jQuery('#myCanvas').attr("width", clientWidth);
		}	
	}
	this.frameWidth = this.$canvasId.attr("width");
	this.frameHeight = this.$canvasId.attr("height");
	this.viewLeftOffset = 50;
	this.viewTopOffset = 10;
	this.viewRightOffset = 50;
	this.viewBottomOffset = 20;
	this.viewWidth = this.frameWidth - this.viewLeftOffset - this.viewRightOffset;
	this.viewHeight = this.frameHeight - this.viewTopOffset - this.viewBottomOffset;

	if (this.chartType == "1") {
		// 大图1，小图0显示的线数不一样
		if (this.drawType == "1") {
			this.xLineCount = 10;// 上下各10个线，中间1条横线
			this.xLineCountValue = 10;
			this.yLineCount = 9;// 每3个小时1条线，共9条线
			this.yLineCountValue = 3;
		} else {
			this.xLineCount = 4;// 上下各4个线，中间1条横线
			this.xLineCountValue = 4;
			this.yLineCount = 5;// 每6个小时1条线，共5条线
			this.yLineCountValue = 6;
		}
		this.xLineSpan = this.viewHeight / (this.xLineCount * 2.0000);// 横线之间的间隔
		this.yLineSpan = this.viewWidth / ((this.yLineCount - 1) * 1.0000);// 竖线之间的间隔
	} else if(this.chartType == "2") {
		// 大图1，小图0显示的线数不一样
		if (this.drawType == "1") {
			this.xLineCount = 20;
		} else {
			this.xLineCount = 10;
		}
		this.yLineCount = 9;
		this.xLineSpan = this.viewHeight / ((this.xLineCount - 1) * 1.0000);// 横线之间的间隔
	}else if(this.chartType == "3"){
		// 大图1，小图0显示的线数不一样
		if (this.drawType == "1") {
			this.xLineCount = 15;// 共15条线
			this.xLineCountValue = 15;
			this.yLineCount = 8;// 共8条线
			this.yLineCountValue = 8;
		} else {
			this.xLineCount = 8;// 共8条线
			this.xLineCountValue = 8;
			this.yLineCount = 5;// 共5条线
			this.yLineCountValue = 5;
		}
	}else{
		return;
	}
	var w=this.canvasId.width;
	var h=this.canvasId.height;
	var id=this.canvasId.id;
	var parent=jQuery(this.canvasId).parent();
	jQuery(this.canvasId).remove();
	parent.append('<canvas id="'+id+'"></canvas>');
	this.canvasId = document.getElementById(id);
	this.$canvasId = jQuery("#" + id);
	this.canvasId.width=w;
	this.canvasId.height=h;
	this.context = this.canvasId.getContext('2d');
	this.context.clearRect(0, 0, this.frameWidth, this.frameHeight);
	this.getMaxPrice();// 获取最大值和最小值
	if (this.chartType == "1") {
		this.drawRView();
	}else if(this.chartType == "2") {
		this.drawKView();
	}else if(this.chartType == "3"){
		this.drawFundView();
	}
};

/* 画基金走势图 */
ChartView.prototype.drawFundView = function() {
	var that = this.canvasId;
	var thats = this;
	var $that = this.$canvasId;
	var tempLeftValue = 35;
	var tempWidthValue = 35;
	var LeftOffset=this.viewLeftOffset-tempLeftValue;
	var Width=this.viewWidth+tempWidthValue;
	var Height=this.viewTopOffset + this.viewHeight;
	// 画图
	if (this.dataSource.length == 0) {
		$('#nodata').width(this.frameWidth).height(this.frameHeight).css("line-height", this.frameHeight + "px");
		var temp=$('#nodata').clone();
		$('#nodata').remove();
		$that.hide().after(temp.show());
		return;
	} else {
		$('#nodata').hide();
		$that.show();
	}
	context = this.context;
	this.xLineSpan = this.viewHeight /this.xLineCount;// 横线之间的间隔
	this.yLineSpan = (Width) /this.yLineCount;// 竖线之间的间隔
    var oriSpan = (Width) / (this.dataSource.length - 1);
    var oriIndex = (this.dataSource.length / this.yLineCount).toFixed(0);
	
	//计算纵坐标间距
	var yValueSpan = (this.maxPrice-this.minPrice)/(this.xLineCount);

	// 画网格
	context.strokeStyle = "#c4c4c4";
	context.font = "11px Helvetica";
	this.drawDashedLine(context, context.strokeStyle, 1, [[LeftOffset, this.viewTopOffset], [ LeftOffset + Width, this.viewTopOffset]]);
	this.drawLine(context, context.strokeStyle, 1, [[LeftOffset, this.viewTopOffset+this.viewHeight], [ LeftOffset+Width, this.viewTopOffset+this.viewHeight]]);
	context.beginPath();

	context.strokeStyle = "#d0d0d0";
	context.font = "11px Helvetica";


	for (var i = 1; i < this.xLineCount; i++) { // 画横线 去掉框体已经画的线
		context.dashedLineTo(LeftOffset, this.viewTopOffset + this.xLineSpan*i,LeftOffset+Width, this.viewTopOffset + this.xLineSpan*i);
	}
	
	context.textAlign = "center";
	context.fillStyle = '#000';
	var index,count;
	if(this.dataSource.length>this.yLineCount){
		index=(this.dataSource.length/this.yLineCount).toFixed(0);
		count=this.yLineCount;
	}else{
		index=1;
		count=this.dataSource.length;
	}
/*	for ( var i = 1; i <this.yLineCount; i++) {// 画竖线 去掉框体已经画的线
		if(this.dataSource[i * index]!=undefined && this.dataSource[i * index]!=null){
			context.moveTo(LeftOffset + oriIndex * i * oriSpan, this.viewTopOffset);
        	context.lineTo(LeftOffset + oriIndex * i * oriSpan, this.viewTopOffset + this.viewHeight);
		}
	}*/
	for ( var i = 1; i < count; i++) {// 写横坐标文字
		if(this.dataSource[i * index]!=undefined && this.dataSource[i * index]!=null){
			var month=(this.dataSource[i*index][1]+"").substr(4, 2);
			var day=(this.dataSource[i*index][1]+"").substr(6,2);
			context.fillText(month + "-" + day, LeftOffset + oriIndex * i * oriSpan, this.viewTopOffset + this.viewHeight + 20);
		}
	}
	
	context.font = "10px Helvetica";
	for ( var i = 0; i <=this.xLineCount; i++) {// 写纵坐标文字
		var value = (this.maxPrice-yValueSpan * i).toFixed(4);
		context.textAlign = "left";
		context.fillText(value, LeftOffset+Width + 5, this.viewTopOffset + i* this.xLineSpan + 5);
	}
	context.closePath();
	context.stroke();
	
	// 根据value得到坐标位置
	this.posArray = new Array();
	var newArray = new Array();
	for ( var i = 0; i < this.dataSource.length; i++) {
		var valueTmp = this.dataSource[i][0];
		try {
			var xpos;
			if(this.dataSource.length>this.yLineCount){
				xpos = LeftOffset + i * (Width / (this.dataSource.length-1));
			}else{
				xpos = LeftOffset + this.yLineSpan * i;
			}
			var percent=(valueTmp-this.minPrice)/(this.maxPrice-this.minPrice);
			var ypos =(this.viewHeight-percent*this.viewHeight)+this.viewTopOffset;
			this.posArray[i] = [ xpos, ypos ];
			newArray[i] = [ xpos, ypos ];
		} catch (e) {
			alert(e);
		}
	}
	// 画走势
	this.drawLine(context, "#75A0AE", 2, newArray);
	// 填充走势图下方渐变色
	var grad = context.createLinearGradient(newArray[0][0], this.viewTopOffset, newArray[0][0], this.viewTopOffset + this.viewHeight);
	grad.addColorStop(0, 'rgba(142,177,189,0.5)');
	grad.addColorStop(1, 'rgba(142,177,189,0)');
	newArray[newArray.length] = [ newArray[newArray.length - 1][0], this.viewTopOffset + this.viewHeight ];
	newArray[newArray.length] = [ newArray[0][0], this.viewTopOffset + this.viewHeight ];

	this.drawFill(context, grad, newArray);
	
	// 画提示tipsbar
	if(navigator.userAgent.toLowerCase().indexOf('msie')==-1){// 非WP
		if (this.tips == "1") {
			jQuery('#infoLine').show();
			jQuery("#info").css("min-height", "20px");
			jQuery("#info").css("line-height", "20px");
			jQuery(".line").css("height", this.viewHeight + "px");
			var touchStart = function(event) {
				event.preventDefault();
				thats.drawFundTipBar(event);
			};
			var touchEnd = function(event) {
				event.preventDefault();
				thats.drawFundTipBar(event);
			};
			that.addEventListener("touchstart", touchStart);
			that.addEventListener("touchend", touchEnd);
			that.addEventListener("touchmove", touchStart);
		} else {
			jQuery('#infoLine').hide();
		}
	}
};


/* 画实时走势图 */
ChartView.prototype.drawRView = function() {
	var that = this.canvasId;
	var thats = this;
	var $that = this.$canvasId;
	// 画图
	if (this.dataSource.length == 0) {
		$('#nodata').width(this.frameWidth).height(this.frameHeight).css("line-height", this.frameHeight + "px");
		var temp=$('#nodata').clone();
		$('#nodata').remove();
		$that.hide().after(temp.show());
		return;
	} else {
		$('#nodata').hide();
		$that.show();
	}
	context = this.context;
	var baseValue = this.dataSource[0][0];// 将第一个价格作为基准价
	var halfYLineValue = Math.max(this.maxPrice - baseValue, baseValue - this.minPrice);
	// 根据大图小图计算纵坐标间距
	if (this.drawType == 1) {
		var yValueSpan = 2 * halfYLineValue / 20.0000;
	} else {
		var yValueSpan = 2 * halfYLineValue / 8.0000;
	}

	// 画网格
	context.strokeStyle = "#c4c4c4";
	context.font = "11px Helvetica";
	this.drawDashedLine(context, context.strokeStyle, 1, [[this.viewLeftOffset, this.viewTopOffset], [ this.viewLeftOffset + this.viewWidth, this.viewTopOffset]]);
	this.drawLine(context, context.strokeStyle, 1, [[this.viewLeftOffset, this.viewTopOffset+this.viewHeight], [ this.viewLeftOffset+this.viewWidth, this.viewTopOffset+this.viewHeight]]);
	context.beginPath();

	for ( var i = 0; i < this.xLineCount * 2 - 1; i++) { // 画横线 去掉框体已经画的线
		context.dashedLineTo(this.viewLeftOffset, this.viewTopOffset + (i + 1) * this.xLineSpan,this.viewLeftOffset + this.viewWidth, this.viewTopOffset + (i + 1) * this.xLineSpan);
	}

	context.textAlign = "center";
	context.fillStyle = '#000';
	for ( var i = 0; i < this.yLineCount; i++) {// 写横坐标文字
		context.fillText((this.yLineCountValue * i).toFixed(0) + ":00", this.viewLeftOffset + this.yLineSpan * i, this.viewTopOffset + this.viewHeight + 20);
	}
	// 判断小数位数
	if (this.getFixedLength() == 4) {
		context.font = "10px Helvetica";
	}
	for ( var i = 0; i < this.xLineCount * 2 + 1; i++) {// 写纵坐标文字
		var value = (baseValue + halfYLineValue - yValueSpan * i).toFixed(this.getFixedLength());
		var value1 = ((((baseValue + halfYLineValue - yValueSpan * i) - baseValue) / baseValue) * 100.00).toFixed(2) + "%";
		if (i == this.xLineCountValue)
			context.fillStyle = '#000';
		if (i < this.xLineCountValue)
			context.fillStyle = 'rgb(248,95,95)';// '#b11';
		if (i > this.xLineCountValue)
			context.fillStyle = 'rgb(39,199,122)';// '#1a1';
		context.textAlign = "right";
		context.fillText(value, this.viewLeftOffset - 5, this.viewTopOffset + (i) * this.xLineSpan + 6);
		context.textAlign = "left";
		context.fillText(value1, this.viewLeftOffset + this.viewWidth + 5, this.viewTopOffset + (i) * this.xLineSpan + 6);
	}
	context.closePath();
	context.stroke();
	// 根据value得到坐标位置
	this.posArray = new Array();
	var newArray = new Array();
	for ( var i = 0; i < this.dataSource.length; i++) {
		var time = String(this.dataSource[i][1]);
		var value = this.dataSource[i][0];
		try {
			this.setDate(time.substring(0, 8));
			time = time.substr(8);
			var timeArray = new Array(parseInt(time.substr(0, 2), 10), parseInt(time.substr(2, 2), 10), parseInt(time.substr(4, 2)), 10);
			time = parseInt(timeArray[0], 10) * 3600 + parseInt(timeArray[1], 10) * 60 + parseInt(timeArray[2], 10);
			var xpos = this.viewLeftOffset + time * this.viewWidth / (24 * 3600);
			var ypos = this.viewTopOffset + this.viewHeight - (value - baseValue + halfYLineValue) * this.viewHeight / (2 * halfYLineValue)
			this.posArray[i] = [ xpos, ypos ];
			newArray[i] = [ xpos, ypos ];
		} catch (e) {
			alert(e);
		}
	}
	// 画走势
	this.drawLine(context, "#75A0AE", 2, newArray);
	// 填充走势图下方渐变色
	var grad = context.createLinearGradient(newArray[0][0], this.viewTopOffset, newArray[0][0], this.viewTopOffset + this.viewHeight);
	grad.addColorStop(0, 'rgba(142,177,189,0.5)');
	grad.addColorStop(1, 'rgba(142,177,189,0)');
	newArray[newArray.length] = [ newArray[newArray.length - 1][0], this.viewTopOffset + this.viewHeight ];
	newArray[newArray.length] = [ newArray[0][0], this.viewTopOffset + this.viewHeight ];

	this.drawFill(context, grad, newArray);
	// 画均线
	this.drawDashedLine(context, "#EA5A5A", 1, [ [ this.viewLeftOffset, this.viewTopOffset + this.viewHeight / 2 ], [ this.viewLeftOffset + this.viewWidth, this.viewTopOffset + this.viewHeight / 2 ] ]);
	if(navigator.userAgent.toLowerCase().indexOf('msie')==-1){// 非WP
		// 画提示tipsbar
		if (this.tips == "1") {
			jQuery('#infoLine').show();
			jQuery("#info").css("min-height", "20px");
			jQuery("#info").css("line-height", "20px");
			jQuery(".line").css("height", this.viewHeight + "px");
			var touchStart = function(event) {
				event.preventDefault();
				thats.drawTipBar(event);
			};
			var touchEnd = function(event) {
				event.preventDefault();
				thats.drawTipBar(event);
			};
			that.addEventListener("touchstart", touchStart);
			that.addEventListener("touchend", touchEnd);
			that.addEventListener("touchmove", touchStart);
		} else {
			jQuery('#infoLine').hide();
		}
	}
};

/* 画K线图 */
ChartView.prototype.drawKView = function() {
	var that = this.canvasId;
	var $that = this.$canvasId;
	var thats = this;
	var tempLeftValue = 0;
	var tempWidthValue = 35;
	var tempIValue = 5;
	if (this.drawType == 0) {
		tempIValue = 7;
	}
	context = this.context;
	if (this.dataSource.length == 0) {
		$('#nodata').width(this.frameWidth).height(this.frameHeight).css("line-height", this.frameHeight + "px");
		var temp=$('#nodata').clone();
		$('#nodata').remove();
		$that.hide().after(temp.show());		
		return;
	} else {
		$('#nodata').hide();
		$that.show();
	}
	this.maxKRec = 30;// 最多显示100个柱子，如果超过100，取后100个柱子
	if (this.dataSource.length > this.maxKRec) {// 取最后90个数据
		this.dataSource = this.dataSource.slice(this.dataSource.length - this.maxKRec);
	}
	this.getMaxPrice();
	// K线图格式设置，根据最高报价设置左边距
	if (this.maxPrice / 1000 > 1) {
		// 4位数
		tempLeftValue = -5;
	} else if (this.maxPrice / 100 > 1) {
		// 3位数
		tempLeftValue = 0;
	} else if (this.maxPrice / 10 > 1) {
		// 2位数
		tempLeftValue = 3;
	} else if (this.maxPrice < 10) {
		// 1位数
		tempLeftValue = 6;
	}
	var yValueLength = (this.maxPrice - this.minPrice);
	var yValueSpan = yValueLength / (this.xLineCount - 1); // 上下都空出一格
	this.maxPrice = this.maxPrice + yValueSpan;
	this.minPrice = this.minPrice - yValueSpan;
	yValueLength = (this.maxPrice - this.minPrice);
	yValueSpan = yValueLength / (this.xLineCount - 1);

	this.kRecCount = this.dataSource.length;// 柱子的个数
	this.kMaxRecWidth = 20;// 柱子的最大宽度
	this.intervalSpace = 1;// 每个柱子之间的间隔
	var tempWidthValueSpace = tempWidthValue / this.kRecCount;
	this.kRecWidth = Math.min(this.kMaxRecWidth, this.viewWidth / (this.dataSource.length + 1) - this.intervalSpace);// 柱子的最大宽度

	context.strokeStyle = "#c4c4c4";
	this.drawDashedLine(context, context.strokeStyle, 1, [[this.viewLeftOffset, this.viewTopOffset], [ this.viewLeftOffset + this.viewWidth+tempWidthValue, this.viewTopOffset]]);
	this.drawLine(context, context.strokeStyle, 1, [[this.viewLeftOffset, this.viewTopOffset+this.viewHeight], [ this.viewLeftOffset+this.viewWidth+tempWidthValue, this.viewTopOffset+this.viewHeight]]);	
	context.beginPath();
	context.font = "11px Helvetica";

	for ( var i = 0; i < this.xLineCount - 2; i++) { // 画横线 去掉框体已经画的线
		context.dashedLineTo(this.viewLeftOffset - tempLeftValue,this.viewTopOffset + (i + 1) * this.xLineSpan,this.viewLeftOffset - tempLeftValue + this.viewWidth + tempWidthValue,this.viewTopOffset + (i + 1) * this.xLineSpan);
	}

	context.textAlign = "center";
	context.fillStyle = '#000';
	for ( var i = 0; i < this.dataSource.length; i = i + tempIValue) {// 写横坐标文字
		var tempDate = String(this.dataSource[i][0]).substr(4);
		var dated = parseInt(tempDate.substr(0, 2), 10) + "/" + parseInt(tempDate.substr(2, 2), 10);
		context.fillText(dated, this.viewLeftOffset - tempLeftValue + 10 + i * (this.kRecWidth + this.intervalSpace + tempWidthValueSpace), this.viewTopOffset + this.viewHeight + 20);
	}

	context.textAlign = "right";
	context.fillStyle = '#000';
	// 判断小数位数
	if (this.getFixedLength() == 4) {
		context.font = "10px Helvetica";
	}
	for ( var i = 0; i < this.xLineCount; i++) {// 写纵坐标文字
		var value = (this.maxPrice - yValueSpan * i).toFixed(this.getFixedLength());
		var tempLeftValueWidthShow = this.viewLeftOffset - tempLeftValue;
		//纵坐标文件数字如果大于8位的会显示不全 add by liuyue 20121101
		tempLeftValueWidthShow = value.length >= 8?tempLeftValueWidthShow + 1:tempLeftValueWidthShow-8;
		context.fillText(value, tempLeftValueWidthShow, this.viewTopOffset + (i) * this.xLineSpan + 3);
	}
	context.closePath();
	context.stroke();
	context.strokeStyle = "#f3f3f3";
	// 画k线
	context.lineJoin = 'round';
	context.lineCap = 'round';
	// drawK x坐标 开盘价y坐标 收盘价y坐标 最高价y坐标 最低价y坐标
	this.posArray = new Array();
	for ( var i = 0; i < this.dataSource.length; i++) {
		var xpos = this.viewLeftOffset - tempLeftValue + this.kRecWidth / 2 + 5 + i * (this.kRecWidth + this.intervalSpace + tempWidthValueSpace);
		var startY = this.dataSource[i][1];
		var endY = this.dataSource[i][2];
		var max = this.dataSource[i][3];
		var min = this.dataSource[i][4];
		startY = this.viewTopOffset + (this.maxPrice - startY) * this.viewHeight / yValueLength;
		endY = this.viewTopOffset + (this.maxPrice - endY) * this.viewHeight / yValueLength;
		max = this.viewTopOffset + (this.maxPrice - max) * this.viewHeight / yValueLength;
		min = this.viewTopOffset + (this.maxPrice - min) * this.viewHeight / yValueLength;
		this.drawK(context, xpos, startY, endY, max, min);
		this.posArray[i] = [ xpos ];
	}
	if(navigator.userAgent.toLowerCase().indexOf('msie')==-1){// 非WP
		// 画提示tipsbar
		if (this.tips == "1") {
			jQuery('#infoLine').show();
			jQuery("#info").css("min-height", "20px");
			jQuery("#info").css("line-height", "20px");
			jQuery("#info").css("text-align", "center");
			jQuery(".line").css("height", this.viewHeight + "px");
			var touchStart = function(event) {
				event.preventDefault();
				thats.drawTipKBar(event);
			};
	
			var touchEnd = function(event) {
				event.preventDefault();
				thats.drawTipKBar(event);
			};
			that.addEventListener("touchstart", touchStart);
			that.addEventListener("touchend", touchEnd);
			that.addEventListener("touchmove", touchStart);
		} else {
			jQuery('#infoLine').hide();
		}
	}
};

/* 画提示bar */
ChartView.prototype.drawFundTipBar = function(event) {
	if (this.chartType != "3" || this.dataSource.length == 0)
		return;
	var pos;
	var touchCounts = event.touches.length;
	var infoLine = document.getElementById('infoLine');
	var info = document.getElementById('info');
	var leftLine = document.getElementById('lineLeft');
	var rightLine = document.getElementById('lineRight');
	var middleLine = document.getElementById('middleLine');
	var joinPoint1 = document.getElementById('joinPoint1');
	if (touchCounts < 1) {
		infoLine.style.visibility = 'hidden';
		middleLine.style.visibility = 'hidden';
		rightLine.style.visibility = 'hidden';
		leftLine.style.visibility = 'hidden';
		joinPoint1.style.visibility = 'hidden';
		joinPoint.style.visibility = 'hidden';
	} else if (touchCounts == 1) {
		var x = event.touches[0].pageX;
		pos = this.getNearPos(x);
		if(pos==undefined)
			return;
		infoLine.style.visibility = 'visible';
		middleLine.style.visibility = "visible";
		joinPoint.style.visibility = 'visible';
		rightLine.style.visibility = "hidden";
		leftLine.style.visibility = "hidden";
		joinPoint1.style.visibility = 'hidden';
		var infoLeft = this.posArray[pos][0] - 50;
		if (infoLeft < 0)
			infoLeft = 0;
		if (infoLeft > this.viewWidth - 100)
			infoLeft = this.viewWidth - 100;
		jQuery("#info").css("left", infoLeft + 'px');
		jQuery("#middleLine").css("left", this.posArray[pos][0]);
		jQuery("#joinPoint").css("left", this.posArray[pos][0] - 5);
		jQuery("#joinPoint").css("top", this.posArray[pos][1] - this.viewTopOffset + 6);
		info.style.color = "#fff";
		var tempTime = this.dataSource[pos][1] + '';
		var tempTime = tempTime.substr(0, 4) + '&#x5E74;' + tempTime.substr(4, 2) + "&#x6708;" + tempTime.substr(6, 2)+"&#x65E5;";
		var tempPrice = parseFloat(this.dataSource[pos][0]).toFixed(4);
		info.innerHTML = '&#x65E5;&#x671F;:' + tempTime + ' &#x51C0;&#x503C;:' + tempPrice;
	}
};
/* 画提示bar */
ChartView.prototype.drawTipBar = function(event) {
	if (this.chartType != "1" || this.dataSource.length == 0)
		return;
	var pos;
	var touchCounts = event.touches.length;
	var infoLine = document.getElementById('infoLine');
	var info = document.getElementById('info');
	var leftLine = document.getElementById('lineLeft');
	var rightLine = document.getElementById('lineRight');
	var middleLine = document.getElementById('middleLine');
	var joinPoint1 = document.getElementById('joinPoint1');
	if (touchCounts < 1) {
		infoLine.style.visibility = 'hidden';
		middleLine.style.visibility = 'hidden';
		rightLine.style.visibility = 'hidden';
		leftLine.style.visibility = 'hidden';
		joinPoint1.style.visibility = 'hidden';
		joinPoint.style.visibility = 'hidden';
	} else if (touchCounts == 1) {
		var x = event.touches[0].pageX;
		pos = this.getNearPos(x);
		if(pos==undefined)
			return;
		infoLine.style.visibility = 'visible';
		middleLine.style.visibility = "visible";
		joinPoint.style.visibility = 'visible';
		rightLine.style.visibility = "hidden";
		leftLine.style.visibility = "hidden";
		joinPoint1.style.visibility = 'hidden';
		var infoLeft = this.posArray[pos][0] - 50;
		if (infoLeft < 0)
			infoLeft = 0;
		if (infoLeft > this.viewWidth - 100)
			infoLeft = this.viewWidth - 100;
		jQuery("#info").css("left", infoLeft + 'px');
		jQuery("#middleLine").css("left", this.posArray[pos][0]);
		jQuery("#joinPoint").css("left", this.posArray[pos][0] - 5);
		jQuery("#joinPoint").css("top", this.posArray[pos][1] - this.viewTopOffset + 6);
		info.style.color = "#fff";
		var tempTime = (this.dataSource[pos][1] + '').substr(8);
		var tempTime = tempTime.substr(0, 2) + ':' + tempTime.substr(2, 2) + ":" + tempTime.substr(4, 2);
		var tempPrice = parseFloat(this.dataSource[pos][0]).toFixed(this.getFixedLength());
		info.innerHTML = '&#x65E5;&#x671F;&#x65F6;&#x95F4;:' + this.dateStr + ' ' + tempTime + ' &#x4EF7;&#x683C;:' + tempPrice;
	}
};
/* 画k线提示bar */
ChartView.prototype.drawTipKBar = function(event) {

	if (this.chartType != "2" || this.dataSource.length == 0)
		return;
	var pos;
	var touchCounts = event.touches.length;
	var infoLine = document.getElementById('infoLine');
	var info = document.getElementById('info');
	var leftLine = document.getElementById('lineLeft');
	var rightLine = document.getElementById('lineRight');
	var middleLine = document.getElementById('middleLine');
	var joinPoint1 = document.getElementById('joinPoint1');
	var joinPoint = document.getElementById('joinPoint');
	joinPoint.style.visibility = 'hidden';
	joinPoint1.style.visibility = 'hidden';
	rightLine.style.visibility = "hidden";
	leftLine.style.visibility = "hidden";
	if (touchCounts < 1) {
		infoLine.style.visibility = 'hidden';
		middleLine.style.visibility = 'hidden';
	} else if (touchCounts >= 1) {
		var x = event.touches[touchCounts - 1].pageX;
		pos = this.getNearPos(x);
		if(pos==undefined)
			return;
		infoLine.style.visibility = 'visible';
		middleLine.style.visibility = "visible";
		var infoLeft = this.posArray[pos][0] - 50;
		if (infoLeft < 0)
			infoLeft = 0;
		if (infoLeft > this.viewWidth - 100)
			infoLeft = this.viewWidth - 100;
		jQuery("#info").css("left", infoLeft + "px");
		jQuery("#middleLine").css("left", this.posArray[pos][0]);
		info.style.color = "#fff";
		info.innerHTML = this.dataSource[pos][0] + ' &#x5F00;&#x76D8;:' + parseFloat(this.dataSource[pos][1]).toFixed(this.getFixedLength()) + ' &#x6536;&#x76D8;:' + parseFloat(this.dataSource[pos][2]).toFixed(this.getFixedLength()) + ' <br>&#x6700;&#x9AD8;:' + parseFloat(this.dataSource[pos][3]).toFixed(this.getFixedLength()) + ' &#x6700;&#x4F4E;:' + parseFloat(this.dataSource[pos][4]).toFixed(this.getFixedLength()) + ' ';
	}

};
/* 获取最近的点 */
ChartView.prototype.getNearPos = function(x) {
	var pos;
	var parentOffset = jQuery("#myCanvasId").offset();
	x = x - parentOffset.left;
	if (x < this.viewLeftOffset - 30 || this.posArray.length == 1) {
		pos = 0;
	} else if (x > (this.viewLeftOffset + this.viewWidth)) {
		pos = this.posArray.length - 1;
	} else {
		for ( var i = 0; i < this.posArray.length; i++) {
			if (this.posArray[i][0] > x) {
				if (this.posArray[i][0] - x > x - this.posArray[i - 1][0])
					pos = i - 1;
				else
					pos = i;
				break;
			}
		}
	}
	return pos;
};
/* 获取最近的点k线 */
ChartView.prototype.getNearPosK = function(x) {
	var pos;
	var parentOffset = jQuery("#myCanvasId").offset();
	x = x - parentOffset.left;
	if (x < this.viewLeftOffset || this.posArray.length == 1) {
		pos = 0;
	} else if (x > (this.viewLeftOffset + this.viewWidth + 10)) {
		pos = this.posArray.length - 1;
	} else {
		for ( var i = 0; i < this.posArray.length; i++) {
			if (this.posArray[i] > x) {
				if (this.posArray[i] - x > x - this.posArray[i - 1])
					pos = i - 1;
				else
					pos = i;
				break;
			}
		}
	}
	return pos;
};


function resetScreen() {
	// 获取浏览器显示高度及宽度
	var clientHeight = jQuery(window).height();
	// 获取header高度
	var headerHeight = jQuery('#header_content').height();
	// 获取page高度
	var pageHeight = jQuery('#scroller').height();
	// 获取footer高度
	var footerHeight = jQuery('#footer_content').height();
	var ua=navigator.userAgent.toLowerCase();
	if (ua.indexOf('icbcandroidbs')>-1 ){//Android
		try{
			ICBCTools.resetScreen(true);
		}catch(e){}
		try{
			ICBCInitTools.restScreen(undefined,true);
		}catch(e){}
	}else if(ua.indexOf('icbciphonebs')>-1||ua.indexOf('iphone')>-1){//iPhone
		try{
			ICBCTools.resetScreen(true);
		}catch(e){}
		try{
			ICBCInitTools.restScreen(undefined,true);
		}catch(e){}
	}else if(ua.indexOf('msie')>-1 ){//windowsphone
		if (headerHeight + pageHeight + footerHeight < clientHeight + 32) {
			jQuery('body').height(512);
			if(clientHeight==480){
				jQuery('#footer_content').css('bottom', '-38px');
				jQuery('#footer_content').css('position', 'absolute');
			}else{
				jQuery('#footer_content').css('bottom', '20px');
				jQuery('#footer_content').css('position', 'absolute');				
			}
		} else {
			jQuery('#footer_content').css('position', 'relative');
		}
		try{
			ICBCInitTools.restScreen(undefined,true);
		}catch(e){}
	}
}

CanvasRenderingContext2D.prototype.dashedLineTo = function (fromX, fromY, toX, toY, pattern) {  
    // default interval distance -> 5px  
    if (typeof pattern === "undefined") {  
        pattern = 1.5;  
    }  
  
    // calculate the delta x and delta y  
    var dx = (toX - fromX);  
    var dy = (toY - fromY);  
    var distance = Math.floor(Math.sqrt(dx*dx + dy*dy));  
    var dashlineInteveral = (pattern <= 0) ? distance : (distance/pattern)+0.5;
    var deltay = (dy/distance) * pattern;  
    var deltax = (dx/distance) * pattern;  
      
    // draw dash line  
    this.beginPath();  
    for(var dl=0; dl<dashlineInteveral; dl++) {  
        if(dl%2) {  
            this.lineTo(fromX + dl*deltax, fromY + dl*deltay);  
        } else {                      
            this.moveTo(fromX + dl*deltax, fromY + dl*deltay);                    
        }                 
    }  
    this.stroke();
};  
