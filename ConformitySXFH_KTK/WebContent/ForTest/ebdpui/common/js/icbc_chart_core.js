/**
 * 画图公共类，封装了iChartJS
 * 
 */
function ICBCChart(config) {
	// 配置参数
	this.config = config;
	// 普通画布对象，需要调用方传入
	this.$canvas = jQuery('#' + config.canvasId);
	// 全屏画布对象,因为覆盖全屏，无需传入
	this.$fullScreenCanvas = jQuery('<div id="fullScreenCanvas"></div>');
	this.$fullScreenCanvas.attr("style", ICBCChart.CSSArray.fullScreenCanvas);
	// 当前操作的画布
	this.$currentCanvas;
	// 绑定窗口变化时的事件
	this.bindResize();
	// 绑定离开该页面的事件
	this.bindUnload();
	// 是否调用了画图方法
	this.isCallDraw = false;
	// 当前是全屏还是普屏
	this.isFullScreen = false;
	// 当前屏幕宽度
	this.screenWidth;
	// 当前屏幕高度
	this.screenHeight;
}

/**
 * 画图
 */
ICBCChart.prototype.draw = function() {
	try {
		this.isCallDraw = true;// 置状态
		this.checkAndLoadCanvas();// 判断横竖屏并加载画布
		this.openSensor();
		switch (this.config.chartType) {
		case "3DPie":
			this.draw3DPie();
			break;
		case "2DLine":
			this.draw2DLine();
			break;
		case "2DColumnStacked":
			this.draw2DColumnStacked();
			break;
		default:
			this.drawError();
		}
	} catch (e) {
		// 异常处理
		this.drawError();
//		alert(e);
		console.log("Error: " + e);
	}
};

/**
 * 画2D堆积图
 */
ICBCChart.prototype.draw2DColumnStacked = function() {
	//处理数据正常后开始画图
	if (this.handle2DColumnStackedData()) {
		var data = this.config.chartConfig.data;// 数据
		var sourceData=this.config.sourceData;//源数据
		var config = this.config.chartConfig;// 配置项
		var chart = new iChart.ColumnStacked2D({
			render : config.canvasId,
			data: data,
			labels:config.labels,
			width : config.width,
			height : config.height,
			fit:config.fit,
			gradient : false,//应用背景渐变
			background_color : '#ffffff',
			turn_off_touchmove : false,//关闭touch事件
			animation : false,//开启过渡动画
			duration_animation_duration : 1000,//1s完成动画
			padding:"20 5 5 5",
			offsety:config.offsety,
			offsetx:config.offsetx,
			title : {//图表标题
				text : config.title,
				color : '#4C566C',
				fontsize : config.titleFontSize,
				offsety:-20
			},
			border : {//图表边框
				enable : true,
				color : '#888',
				width : config.borderWidth,
				radius : config.borderRadius
			},
			sub_option:{
				label:false
			},
			label : {
				fontsize:config.labelFontSize,
				textAlign:'center',
				textBaseline:'middle',
				rotate:config.labelRotate,
				color:'#333'
			},			
			legend : {//图例
				enable : true,//启用
				row : config.legendRowNum,//行数
				column : 'max',//列数
				align : 'center',//水平剧中
				valign : 'bottom',//垂直居中
				color : '#4C566C',//颜色
				fontsize : config.legendFontSize,//字号
				line_height : 10,//行间距
				offsety:10,
				border : false,
				background_color:'rgba(255,255,255,0)'
			},
			tip : {//提示框
				enable : config.tip,//提示框
				shadow : false,//提示框阴影
				showType : 'fixed',// 跟随模式
				animation : false,//开启过渡动画
				border : {//图表边框
					enable : true,
					color : '#aaa',
					width:1,
					radius : 10
				},
				listeners : {
					parseText : function(tip, name, value, text, i) {
						var start="<span style='color:#4C566C;font-size:10px;'>";
						var end="</span>";
						var id=tip.T.options.id;
						var index=parseInt(id.substr(0,id.indexOf('_')));
						var data=sourceData[index];
						var temp="";
						for(var i=0;i<data.name.length;i++){
							temp+=data.name[i]+":"+data.value[i]+"<br/>";
						}
						temp+="合计:"+data.sum+"<br/>";
						return start+temp+end;
					}
				}
			},
			coordinate : {
				scale2grid:true,
				width : config.width,
				height : config.height,
				axis : {
					color : '#9f9f9f',
					width : [ 0, 0, 2, 2 ]
				},
				grids : {
					vertical : {//不画垂直线
						way : 'share_alike',
						value : 1
					}
				},
				scale : [{start_scale:0,
					  	  end_scale:config.max+5,
						  position:'left',
						  scale_share:config.horizontalGridNum,
						  label:{rotate:0,fontsize:config.labelFontSize},
						  listeners : {
								parseText : function(text, originx, originy, index, last) {
							  		text=parseFloat(text).toFixed(2)+"";
							  		return {text:text,originx:originx,originy:originy,index:index,last:last};
								}
						  }
						}]
			}			
		});
		// 利用自定义组件构造左侧说明文本
		chart.plugin(new iChart.Custom({
				drawFn:function(){
					//计算位置
					var coo = chart.getCoordinate(),
						x = coo.get('originx'),
						y = coo.get('originy'),
						w = coo.get('width'),
						h = coo.get('height');
					// 在左上侧的位置，渲染一个单位的文字
					chart.target.textAlign('start').textBaseline('bottom').textFont(config.labelFontSize+'px').fillText('金额(万元)',x-40,y-12,false,'#333');
				}
		}));	
		chart.draw();
	}
};

/**
 * 处理2D堆积图数据
 */
ICBCChart.prototype.handle2DColumnStackedData = function() {
	this.config.sourceData=this.convertData2(this.config.sourceData);
	var data = this.config.sourceData;// 传入的原始数据
	if (data == undefined)
		throw "走势图数据异常";
	var chartConfig = {};// 配置项
	this.config.chartConfig = chartConfig;
	chartConfig.title = this.convertUTF8((this.config.title == undefined ? "" : this.config.title));// 标题
	chartConfig.canvasId = this.$currentCanvas.attr("id");// 画布Id
	chartConfig.width = 0;// 宽度
	chartConfig.height = 0; // 高度
	chartConfig.borderWidth = 1;// 边框宽度
	chartConfig.borderRadius = 0;// 边框圆角
	chartConfig.titleFontSize = 12;// 标题字体大小
	chartConfig.fit = false;// 自适应长宽
	chartConfig.tip = false;// 触摸某点时显示tip
	chartConfig.horizontalGridNum=5;// 水平线数量
	chartConfig.labelFontSize=8;// 标签字体大小
	chartConfig.labelRotate = 0;// 横坐标文字旋转
	chartConfig.legendFontSize = 10;// 图例字体大小
	chartConfig.legendRowNum = 1;// 图例行数
	chartConfig.offsetx = 15;// 左侧偏移
	chartConfig.offsety = -15;// 左侧偏移
	if (this.isWindowsPhone()) {
		chartConfig.borderWidth = 0;
		chartConfig.borderRadius = 0;
	}
	// 处理数据
	chartConfig.labels = [];
	chartConfig.data = [];
	var legendRowWidth = 0;
	legendRowMaxWidth = this.screenWidth - 15;
	for(var j=0,m=data[0].name.length;j<m;j++){
		var tempData={};
		var name=data[0].name[j];
		var tempWidth = this.textWidth(name + " ", chartConfig.legendFontSize)+20;// 计算文字宽度
		tempData.value=[];
		tempData.color = this.getColor(j);
		tempData.name=data[0].name[j];
		legendRowWidth += tempWidth;// 累加图例总长度
		if (legendRowWidth > legendRowMaxWidth) {//大于一行最大长度时
			chartConfig.legendRowNum++;
			chartConfig.height+=12;
			legendRowWidth = 0;
		}
		if(j-10>0){
			chartConfig.offsety-=(j-10)*0.6;
		}
		for ( var i = 0, l = data.length; i < l; i++) {
			tempData.value.push(data[i].value[j]);
		}
		chartConfig.data.push(tempData);
	}
	chartConfig.max;
	chartConfig.min;
	var init=false;
	for(var i=0,l=data.length;i<l;i++) {
		var tempData = data[i];
		var tempValue=tempData.value;
		var tempSum=0;
		chartConfig.labels.push(tempData.label);
		for(var j=0;j<tempValue.length;j++){
			tempSum+=tempValue[j];
		}
		tempData.sum=parseFloat(tempSum).toFixed(2)+"";
		if(!init){
			chartConfig.max = chartConfig.min = tempSum;
			init=true;
		}
		chartConfig.max = Math.max(tempSum,chartConfig.max);
		chartConfig.min = Math.min(tempSum,chartConfig.min);
	}
	//判断最大值位数
	try{
		var fixMax=chartConfig.max.toFixed(0);
		if(fixMax.length>5){
			chartConfig.offsetx+=(fixMax.length-5)*4;
		}
	}catch(e){}
	if (!this.isFullScreen) {//非全屏
		this.$currentCanvas.attr("style", ICBCChart.CSSArray.normalCanvas);// 设置图表样式
		chartConfig.width = this.$currentCanvas.width();// 小图宽度取div的宽度自适应
		chartConfig.height+= 230; // 小图高度
		chartConfig.fit = false;// 自适应长宽
		chartConfig.tip = false;
	} else {
		chartConfig.labelFontSize=12;
		chartConfig.legendFontSize = 13;
		chartConfig.titleFontSize = 15;
		chartConfig.fit = true;
		chartConfig.height=0;
		chartConfig.width=0;
		chartConfig.tip = true;
		chartConfig.offsety=-30;		
		chartConfig.horizontalGridNum=10;// 水平线数量
		if (this.isWindowsPhone()) {
			chartConfig.offsety-=8;
			chartConfig.width = this.screenWidth;
			chartConfig.height = this.screenHeight-36;
			chartConfig.fit = false;
		}
	}	
	return true;
}
/**
 * 画2D折线图
 */
ICBCChart.prototype.draw2DLine = function() {
	//处理数据正常后开始画图
	if (this.handle2DLineData()) {
		var data = this.config.chartConfig.data;// 数据
		var config = this.config.chartConfig;// 配置项
		var line = new iChart.LineBasic2D( {
			render : config.canvasId,
			data : data,
			align : 'center',
			width : config.width,
			height : config.height,
			fit : config.fit,
			turn_off_touchmove : false,//关闭touch事件
			animation : false,//开启过渡动画
			duration_animation_duration : 1000,//1s完成动画
			offsety : -10,//Y轴偏移量
			offsetx : config.offsetx,//X轴偏移量
			labels:config.labels,
			title : {//图标标题
				text : config.title,
				color : '#4C566C',
				fontsize : config.titleFontSize,
				offsety : -8,// Y轴偏移量
			},
			subtitle : {//图标子标题
				text:config.subtitle,
				fontsize : config.titleFontSize-2,
				color:'#4C566C',
				offsety : -15,// Y轴偏移量
			},
			border : {
				enable : true,
				color : '#888',
				width : config.borderWidth,
				radius : config.borderRadius
			},//图标边框			
			sub_option : {
				smooth : true,//平滑曲线
				label : false,//数据点文字
				hollow : false,//空心
				hollow_inside : false,//空心
				point_size : 6,// 数据点大小
			},
			tip : {//提示框
				enable : config.tip,//提示框
				shadow : false,//提示框阴影
				showType : 'follow',// 跟随模式
				listeners : {
					parseText : function(tip, name, value, text, i) {
						return "<span style='color:#4C566C;font-size:12px;'>金额:" + value + "<br/>占比:" + data[0].proportion[i] + "</span>";
					}
				}
			},
			legend : {// 图例
				enable : false
			},
			crosshair : {
				enable : config.tip,//十字线
				line_color : '#ec4646',//十字线颜色
				line_width : 1,// 十字线宽度
			},
			coordinate : {
				scale2grid:true,
				width : config.width,
				height : config.height,
				axis : {
					color : '#9f9f9f',
					width : [ 0, 0, 2, 2 ]
				},
				grids : {
					vertical : {//不画垂直线
						way : 'share_alike',
						value : 1
					}
				},
				scale : [{start_scale:config.min,
						  end_scale:config.max,
						  position:'left',
						  scale_share:config.horizontalGridNum,
						  label:{rotate:0,fontsize:config.labelFontSize},
						  listeners : {
								parseText : function(text, originx, originy, index, last) {
							  		text=parseFloat(text).toFixed(2)+"";
							  		return {text:text,originx:originx,originy:originy,index:index,last:last};
								}
						  }
						},
				        {position:'bottom',
						 label:{fontsize:config.labelFontSize},
						 labels:config.labels
						}]
			},
		});
		// 利用自定义组件构造左侧说明文本
		line.plugin(new iChart.Custom({
				drawFn:function(){
					//计算位置
					var coo = line.getCoordinate(),
						x = coo.get('originx'),
						y = coo.get('originy'),
						w = coo.get('width'),
						h = coo.get('height');
					// 在左上侧的位置，渲染一个单位的文字
					line.target.textAlign('start').textBaseline('bottom').textFont(config.labelFontSize+'px').fillText('金额(万元)',x-25,y-12,false,'#333');
				}
		}));	
		// 开始画图
		line.draw();
	}
};

/**
 * 处理2D折线图数据
 */
ICBCChart.prototype.handle2DLineData = function() {
	this.config.sourceData=this.convertData2(this.config.sourceData);
	var data = this.config.sourceData;// 传入的原始数据
	var index = this.config.index;
	if (data == undefined || index == undefined)
		throw "走势图数据异常";
	var chartConfig = {};// 配置项
	this.config.chartConfig = chartConfig;
	chartConfig.title = this.convertUTF8((this.config.title == undefined ? "" : this.config.title));// 标题
	chartConfig.subtitle = this.convertUTF8((this.config.subtitle == undefined ? "" : this.config.subtitle));// 子标题
	chartConfig.canvasId = this.$currentCanvas.attr("id");// 画布Id
	chartConfig.width = 0;// 宽度
	chartConfig.height = 0; // 高度
	chartConfig.borderWidth = 1;// 边框宽度
	chartConfig.borderRadius = 0;// 边框圆角
	chartConfig.titleFontSize = 12;// 标题字体大小
	chartConfig.fit = false;// 自适应长宽
	chartConfig.tip = false;// 触摸某点时显示tip
	chartConfig.horizontalGridNum=5;// 水平线数量
	chartConfig.labelFontSize=8;// 标签字体大小
	chartConfig.offsetx=12;//左侧偏移
	if (this.isWindowsPhone()) {
		chartConfig.borderWidth = 0;
		chartConfig.borderRadius = 0;
	}
	if (!this.isFullScreen) {//非全屏
		this.$currentCanvas.attr("style", ICBCChart.CSSArray.normalCanvas);// 设置图表样式
		chartConfig.width = this.$currentCanvas.width();// 小图宽度取div的宽度自适应
		chartConfig.height = 225; // 小图高度
		chartConfig.fit = false;// 自适应长宽
		chartConfig.tip = false;
	} else {
		chartConfig.labelFontSize=12;
		chartConfig.titleFontSize = 15;
		chartConfig.fit = true;
		chartConfig.tip = true;
		chartConfig.horizontalGridNum=10;// 水平线数量
		if (this.isWindowsPhone()) {
			chartConfig.width = this.screenWidth;
			chartConfig.height = this.screenHeight-36;
			chartConfig.fit = false;
		}
	}
	// 处理数据
	chartConfig.labels = [];
	chartConfig.data = [ {
		name : this.config.sourceData[0].name[index],//折线名称
		value : [],//折线值数组
		proportion : [],//占比
		color : '#ec4646',//折线颜色
		line_width : 1,	// 折线宽度
	} ];
	chartConfig.max;
	chartConfig.min;
	var init=false;
	for ( var i = 0, l = this.config.sourceData.length; i < l; i++) {
		var tempData = this.config.sourceData[i];
		var tempValue = tempData.value[index];
		var tempSum = 0;
		var tempProportion;
		if(!init){
			chartConfig.max = chartConfig.min = tempValue;
			init=true;
		}
		chartConfig.max = Math.max(tempValue,chartConfig.max);
		chartConfig.min = Math.min(tempValue,chartConfig.min);
		chartConfig.labels.push(tempData.label);
		chartConfig.data[0].value.push(tempValue);
		for ( var j = 0, m = tempData.value.length; j < m; j++) {
			tempSum += tempData.value[j];
		}
		if(tempSum!=0)
			tempProportion = (tempValue / tempSum * 100).toFixed(2) + "%";
		else
			tempProportion = "0%";
		chartConfig.data[0].proportion.push(tempProportion);
	}
	//判断数据是否只有一个，只有一个需要特殊处理
	if(this.config.sourceData.length==1){
		chartConfig.min=0;
		chartConfig.max=2*chartConfig.max;
		chartConfig.labels.push("");
	}
	//判断最大值位数
	try{
		var fixMax=chartConfig.max.toFixed(0);
		if(fixMax.length>5){
			chartConfig.offsetx+=(fixMax.length-5)*4;
		}
	}catch(e){}
	return true;
}

/**
 * 画3D饼图
 */
ICBCChart.prototype.draw3DPie = function() {
	//处理数据正常后开始画图
	if (this.handle3DPieData()) {
		var data = this.config.sourceData;// 数据
		var config = this.config.chartConfig;// 配置项
		var chart = new iChart.Pie3D( {
			render : config.canvasId,//画布Id
			data : data,//数据
			width : config.width,//宽度
			height : config.height,//高度
			offset_angle:-90,
			fit : config.fit,//自适应框高
			turn_off_touchmove : true,//关闭touch事件
			animation : false,//开启过渡动画
			duration_animation_duration : 1000,//1s完成动画
			layout_distance:0,
			padding:config.padding+" 5 5 5",
			offsety : config.offsety,//Y轴偏移量
			title : {
				text : config.title,
				color : '#4C566C',
				fontsize : config.titleFontSize
			},//图标标题
			border : {
				enable : true,
				color : '#888',
				width : config.borderWidth,
				radius : config.borderRadius
			},//图标边框
			background_color : '#FFF',//背景色
			gradient : false,//背景渐变
			color_factor : 0.05,//渐变因子
			gradient_mode : 'RadialGradientOutIn',//渐变类型
			align : 'center',//图标居中方式
			showpercent : true,//是否显示百分比
			decimalsnum : 2,//百分比小数位
			legend : {//图例
				enable : true,//启用
				row : config.legendRowNum,//行数
				column : 'max',//列数
				align : 'center',//水平剧中
				valign : 'bottom',//垂直居中
				color : '#4C566C',//颜色
				fontsize : config.legendFontSize,//字号
				line_height : 10,//行间距
				background_color:'',
				padding:'5',
				border : {//边框
					width : 0,
				}
			},
			sub_option : {
				label : {
					background_color : '#fefefe',
					sign : false,
					line_height : config.labelFontSize,
					padding : '0 3 4 3',
					border : {
						enable : true,
						radius : 6,
						color : '#333'
					},
					fontsize : config.labelFontSize,
					color : '#444444'
				},
				border : {//边框
					width : 2,
					color : '#fff'
				},
				listeners : {
					parseText : function(d, t) {//扇形图例文字处理
						if(d.get('value').indexOf('%')>-1){
							return d.get('value').replace('\.00','');
						}else{
							return d.get('value').replace('\.00','')+'%';
						}
					},
					click : function(c, e) {
						if (!config.clickEventFlag) {
							c.events.click[1] = function() {
							};
							return false;
						}
					}

				}
			}
		});
		chart.draw();
	}
};

/**
 * 处理3D饼图的数据
 */
ICBCChart.prototype.handle3DPieData = function() {
	this.config.sourceData=this.convertData1(this.config.sourceData);
	var data = this.config.sourceData;// 传入的原始数据
	if (data == undefined)
		throw "走势图数据为空";
	var chartConfig = {};// 配置项
	this.config.chartConfig = chartConfig;
	chartConfig.title = this.convertUTF8((this.config.title == undefined ? "" : this.config.title));// 标题
	chartConfig.canvasId = this.$currentCanvas.attr("id");// 画布Id
	chartConfig.width = 0;// 宽度
	chartConfig.height = 0; // 高度
	chartConfig.borderWidth = 1;// 边框宽度
	chartConfig.borderRadius = 0;// 边框圆角
	chartConfig.titleFontSize = 12;// 标题字体大小
	chartConfig.labelFontSize = 11;// 扇形图例字体大小
	chartConfig.legendFontSize = 11;// 图例字体大小
	chartConfig.legendRowNum = 1;// 图例行数
	chartConfig.clickEventFlag = false;// 点击事件是否执行（iPhone有Bug，只支持Android横屏)
	chartConfig.fit = false;// 自适应长宽
	chartConfig.padding=5;
	chartConfig.offsety=-10;
	if (this.isWindowsPhone()) {
		chartConfig.borderWidth = 0;
		chartConfig.borderRadius = 0;
	}
	var legendRowWidth = 0;
	legendRowMaxWidth = this.screenWidth - 15;
	for ( var i = 0, l = this.config.sourceData.length; i < l; i++) {// 赋值文字颜色
		var tempData = data[i];
		tempData.color = this.getColor(i);
		var tempWidth = this.textWidth(tempData.name + " ", chartConfig.legendFontSize)+15;// 计算文字宽度
		legendRowWidth += tempWidth;// 累加图例总长度
		if (legendRowWidth > legendRowMaxWidth) {//大于一行最大长度时
			chartConfig.legendRowNum++;
			chartConfig.height+=15;
			legendRowWidth = 0;
		}
		if(i-10>0){
			chartConfig.padding+=(i-10)*1;
			chartConfig.offsety-=(i-10)*0.6;
		}
	}
	if (!this.isFullScreen) {//非全屏
		this.$currentCanvas.attr("style", ICBCChart.CSSArray.normalCanvas);// 设置图表样式
		chartConfig.width = this.$currentCanvas.width();// 小图宽度取div的宽度自适应
		chartConfig.height+= 215; // 小图高度
		chartConfig.fit = false;// 自适应长宽
		if(this.config.sourceData.length>=10){
			chartConfig.labelFontSize=8;
		}
	} else {
		chartConfig.titleFontSize = 15;
		chartConfig.legendFontSize = 12;
		chartConfig.labelFontSize = 13;
		chartConfig.fit = true;
		chartConfig.padding=5;
		chartConfig.offsety=-10;
		if (this.isWindowsPhone()) {
			chartConfig.labelFontSize=10;
			chartConfig.width = this.screenWidth;
			chartConfig.height = this.screenHeight-36;
			chartConfig.fit = false;
		}
	}	
	return true;
}

/**
 * 若处理出错，提示出错
 */
ICBCChart.prototype.drawError = function() {
	if (this.isFullScreen) {
		this.$currentCanvas.attr("style", ICBCChart.CSSArray.errorFullScreenCanvas);
		this.$currentCanvas.css("line-height", jQuery(window).height() + "px");
	} else {
		this.$currentCanvas.attr("style", ICBCChart.CSSArray.errorCanvas);
	}
	this.$currentCanvas.html("图表加载失败");
};

/**
 * 加载普通画布
 */
ICBCChart.prototype.loadCanvas = function() {
	// 显示内容
	jQuery('#header_content,header').show();
	jQuery('#page_content,#content').show();
	jQuery('#footer_content,footer').show();
	// 隐藏全屏画布
	this.$fullScreenCanvas.hide();
	// 设置当前画布
	this.$currentCanvas = this.$canvas;
};

/**
 * 加载全屏画布
 */
ICBCChart.prototype.loadFullScreenCanvas = function() {
	if (jQuery('#fullScreenCanvas').length == 0) {
		jQuery('body').append(this.$fullScreenCanvas);
	}
	// 隐藏内容
	jQuery('#header_content,header').hide();
	jQuery('#page_content,#content').hide();
	jQuery('#footer_content,footer').hide();
	// 显示全屏画布
	this.$fullScreenCanvas.show();
	// 设置当前画布
	this.$currentCanvas = this.$fullScreenCanvas;
	jQuery('body').scrollTop();
};

/**
 * 检查是否全屏
 */
ICBCChart.prototype.checkAndLoadCanvas = function() {
	var clientWidth = jQuery(window).width();
	this.screenWidth = clientWidth;
	var clientHeight = jQuery(window).height();
	this.screenHeight = clientHeight;
	if (clientWidth < clientHeight) {
		//竖屏
		this.isFullScreen = false;
		this.loadCanvas();
		return false;
	} else {
		//横屏
		this.isFullScreen = true;
		this.loadFullScreenCanvas();
		return true;
	}
};

/**
 * 绑定Resize事件
 */
ICBCChart.prototype.bindResize = function() {
	// 利用闭包，把实例赋给self
	var self = this;
	// 绑定屏幕大小改变事件，对图表进行重绘
	jQuery(window).resize( function() {
		if (self.isCallDraw) {
			self.draw();
			try{
				ICBCUITools.scrollOn();
			}catch (e) {
			}
		}
	});
};

/**
 * 绑定unload事件
 */
ICBCChart.prototype.bindUnload = function() {
	// 利用闭包，把实例赋给self
	var self = this;
	// 绑定屏幕大小改变事件，对图表进行重绘
	jQuery(window).bind('beforeunload',function() {
		self.closeSensor();
	});
};

/**
 * 检测当前浏览器是否为WindowsPhone
 */
ICBCChart.prototype.isWindowsPhone = function() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('msie') > -1) {
		return true;
	}
	return false;
};
/**
 * 检测当前浏览器是否为iPhone
 */
ICBCChart.prototype.isiPhone = function() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('iphone') > -1) {
		return true;
	}
	return false;
};
/**
 * 检测当前浏览器是否为Android
 */
ICBCChart.prototype.isAndroid = function() {
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('android') > -1) {
		return true;
	}
	return false;
};

/**
 * 计算文本宽度
 */
ICBCChart.prototype.textWidth = function(text, fontSize) {
	if (this.tempWidthCanvas == undefined) {
		var canvas = document.createElement("canvas");
		this.tempWidthCanvas = canvas;
	}
	var context = this.tempWidthCanvas.getContext("2d");
	context.font = fontSize + "px sans-serif";
	var width = context.measureText(text).width;
	return width;
},

/**
 * 取颜色
 */
ICBCChart.prototype.getColor = function(index) {
	var length=ICBCChart.ColorArray.length;
	if(index<length){
		return ICBCChart.ColorArray[index];
	}else{
		return ICBCChart.ColorArray[index%length];
	}
},

/**
 * 开启重力感应 
 */
ICBCChart.prototype.openSensor = function() {
	try {
		Native.setScreenOrientationSensor();
	} catch (e) {

	}
},
/**
 * 关闭重力感应 
 */
ICBCChart.prototype.closeSensor = function() {
	try {
		Native.setScreenOrientationPortrait();
	} catch (e) {

	}
},

/**
* 转换数据格式1
*/
ICBCChart.prototype.convertData1=function(data){
	for(var i=0;i<data.length;i++){
		var temp=data[i];
		temp.name=this.convertUTF8(temp.name);
	}
	return data;
}

/**
 * 转换数据格式2
 */
ICBCChart.prototype.convertData2=function(data){
	for(var i=0;i<data.length;i++){
		var temp=data[i];
		temp.label=this.convertUTF8(temp.label);
		for(var j=0;j<temp.name.length;j++){
			temp.name[j]=this.convertUTF8(temp.name[j]);
		}
	}
	return data;
}

/**
 * 转换UTF-8编码
 */
ICBCChart.prototype.convertUTF8=function(text){
	var temp1 = jQuery("<div></div>").html(text);
	var temp2 = temp1.html();
	temp1.empty();
	return temp2;
}

/**
 * 定义颜色数组，画图时使用，最多20种颜色。
 */
ICBCChart.ColorArray = [ '#4FA8DA', '#DB6086', '#EAA825', '#89A54E', '#A6BFD2', '#80699B', '#BC6666', '#3D96AE', '#CB5B1C', '#A47D7C', '#3F5C71', '#CBAB4F', '#76A871', '#9F7961', '#2BA5A4', '#6F83A5', '#F86A66', '#96E2F2', '#FEABC9', '#FFDB6D' ];

/**
 * 定义css样式
 */
ICBCChart.CSSArray = {
	'errorCanvas' : 'margin: 0px 5px 5px 5px;height:215px;line-height:215px;text-align:center;font-size:1em;border: 1px solid #888;-webkit-border-radius: 12px;background-image: -webkit-gradient(linear, 0% 0, 0% 100%, from(#FFF), to(#E1E1E1));background-color:rgba(255,255,255,0.5);',
	'errorFullScreenCanvas' : 'height:100%;width:100%;position:absolute;-webkit-border-radius: 12px;text-align:center;background-image: -webkit-gradient(linear, 0% 0, 0% 100%, from(#FFF), to(#E1E1E1));z-index: 999;top:0px;left:0px;background-color:rgba(255,255,255,0.5);',
	'normalCanvas' : 'margin:0px 5px 5px 5px;',
	'fullScreenCanvas' : 'position:absolute;top:0;left:0'
};