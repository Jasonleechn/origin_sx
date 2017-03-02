<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../includes/contentType_client.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../includes/resources_client.jsp"%>
</head>
<body>
	<header>
		<nav>
			<button id="returnButton" class="nav_left_btn" onclick="ICBCPageTools.submitALink({'linkId':'returnLink'})">返回</button>
			<a id="returnLink" class="hide" href="<%=urlHead%>/ClientDemo/page1.jsp&c_sessionId=<%=c_sessionId%>"></a>
			<h1 class="nav_title" id="nav_title">演示页面2</h1>
			<button class="nav_right_btn" onclick="ICBCPageTools.submitALink({'linkId':'nextLink'})">下一页</button>
			<a id="nextLink" class="hide" href="<%=urlHead%>/ClientDemo/page3.jsp&c_sessionId=<%=c_sessionId%>"></a>
		</nav>
		<section class="header_tip">
			<ul class="header_tip_left"><!-- 标题最多两个 -->
				<li>左侧标题1</li>
				<li class="gray_txt small_txt">左侧标题2</li><!--gray_txt 灰色   small_txt 小号字体 （可选）-->
			</ul>			
			<ul class="header_tip_center">
				<li>中间标题1</li>
				<li class="gray_txt small_txt">中间标题2</li>
			</ul>			
			<ul class="header_tip_right">
				<li>左侧标题1</li>
				<li class="gray_txt small_txt">左侧标题2</li>
			</ul>			
		</section>
		</section>	
		<section class="new_guide_bar">
			<div class="new_guide_info">
				<div class="new_guide_icon">1</div>
			</div>
			<div class="new_guide_info">
				<div class="new_guide_icon">2</div>
			</div>
			<div class="new_guide_info_undo">
				<div class="new_guide_icon">3</div>
			</div>
		</section>			
	</header>
	<div id="content" class="content">
		<div id="scroller" class="scroller">
			<section class="section_padding">
				<h2 class="section_title">常用页面风格示例1</h2>
				<ul class="cell_container">
					<li>
						<div class="cell_li_left">左侧文本</div>
						<div class="cell_li_right">右侧文本</div>
					</li>
					<li>
						<div class="cell_li_left" style="width:100%">
							<div class="cell_li_top">
								<div style="float:left;line-height:30px;">左侧</div>
								<div style="float:right"><input type="text"/></div>
							</div>
							<div class="cell_li_bottom" style="clear:both;line-height:17px;">下面文本</div>
						</div>
					</li>
					<li>
						<div class="cell_li_left">
							<table>
								<tr>
									<td>
										<input type="checkbox" id="checkbox2" name="checkbox2" value=""/>
										<label for="checkbox2" class="vl_mid il">请勾选</label>
									</td>
									<td style="padding-left:10px">
										<div>1111111111</div>
										<div>1111111111</div>
										<div>1111111111</div>
									</td>
								</tr>
							</table>
						</div>
					</li>									
					<li><!-- 颜色字号可以随意组合，配置到class里，空格风格：red_txt红色、green_txt绿色、blue_txt蓝色、gray_txt灰色、small_txt小号字体、large_txt大号字体 -->
						<div class="cell_li_left">
							<div class="cell_li_top red_txt">左上文本</div>
							<div class="cell_li_bottom green_txt">左下文本</div>
						</div>
						<div class="cell_li_right">
							<div class="cell_li_top blue_txt">右上文本</div>
							<div class="cell_li_bottom gray_txt">右下文本</div>						
						</div>
					</li>
					<li>
						<div class="cell_li_left">
							<div class="cell_li_top">左上文本</div>
							<div class="cell_li_bottom">左下文本</div>
						</div>
						<div class="cell_li_right"><input type="text"></div>
					</li>
					<li>
						<div class="cell_li_flex">横向自适应文本</div>
						<div class="cell_li_flex">横向自适应文本</div>
					</li>
					<li>
						<div class="cell_li_left">
							<div class="cell_li_txt">左侧纵向排列文本</div>
							<div class="cell_li_txt">左侧纵向排列文本</div>
							<div class="cell_li_txt">左侧纵向排列文本</div>
						</div>
					</li>
					<li>
						<div class="cell_li_right">
							<div class="cell_li_txt">右侧纵向排列文本</div>
							<div class="cell_li_txt">右侧纵向排列文本</div>
							<div class="cell_li_txt">右侧纵向排列文本</div>
						</div>
					</li>
					<li><!-- 若首行缩进class加入indent_txt -->
						<div class="cell_li_txt">一大堆文本或单行文本一大堆文本或单行文本一大堆文本或单行文本一大堆文本或单行文本一大堆文本或单行文本一大堆文本或单行文本一大堆文本或单行文本一大堆文本或单行文本</div>
					</li>
					<li class="cell_li_btn" onclick=""><!-- 若cell可以点击则设置class为cell_li_btn 点击事件写到onclick中 -->
						<div class="cell_li_left">该行可以点击</div>
					</li>		
					<li class="cell_li_left_arrow_btn">
						<div class=cell_li_left>
							<div class="cell_li_top">左侧缩进箭头</div>
							<div class="cell_li_bottom">左侧缩进箭头</div>						
						</div>
					</li>
					<li class="cell_li_left_arrow">
						<div class=cell_li_left>
							<div class="cell_li_top">左侧缩进箭头</div>
							<div class="cell_li_bottom">左侧缩进箭头</div>						
						</div>
						<div class=cell_li_right>
							<div><input type="checkbox" id="checkbox2" name="checkbox2" value=""/></div>
						</div>						
					</li>
				</ul>
			</section>
			<section class="section_padding">
				<h2 class="section_title">常用页面风格示例2</h2>
				<ul class="cell_container">
					<li>
						<table class="detail_table">
							<tr><!-- 注意左边不要有冒号 -->
								<td class="detail_td_left">左边文本</td>
								<td class="detail_td_right">右边文本</td>
							</tr>
							<tr>
								<td class="detail_td_left">左边折行左边折行左边折行</td>
								<td class="detail_td_right">右边</td>
							</tr>
							<tr>
								<td class="detail_td_left">左边</td>
								<td class="detail_td_right">右边折行右边折行右边折行右边折行右边折行右边折行右边折行</td>
							</tr>
							<tr>
								<td class="detail_td_left">两边折行两边折行两边折行两边折行</td>
								<td class="detail_td_right">两边折行两边折行两边折行两边折行</td>
							</tr>
							<tr><td colspan="3" class="detail_td_line"></td></tr>
							<tr>
								<td class="detail_td_left">左边</td>
								<td class="detail_td_right">右边</td>
							</tr>
							<tr>
								<td class="detail_td_left">左边</td>
								<td class="detail_td_right">右边</td>
							</tr>
							<tr>
								<td class="detail_td_single" colspan="3">三列合并成一整行三列合并成一整行</td>
							</tr>	
							<tr>
								<td class="detail_td_single" colspan="3">
									<input type="checkbox" id="checkbox1" name="checkbox1" value=""/>
									<label for="checkbox1" class="vl_mid il">三列合并成一整行前面带个复选框</label>
								</td>
							</tr>	
							<tr>
								<td class="detail_td_left">左边</td>
								<td class="detail_td_right">右边</td>
							</tr>													
							<tr>
								<td class="detail_td_left">左边</td>
								<td class="detail_td_right">右边</td>
							</tr>													
						</table>					
					</li>
				</ul>
			</section>
			<section class="section_padding">
				<h2 class="section_title">常用页面风格示例3</h2>
				<ul class="cell_container">
					<li>
						<table style="border-spacing: 12px;border-collapse: separate;">
							<tr>
								<td>
									<div class="guide_icon_current">1</div>
								</td>
								<td class="green_txt" style="line-height: 16px">
									<div>xxxxxxxxxxx</div>
									<div>xxxxxxxxxxx</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="guide_icon_current">2</div>
								</td>
								<td class="green_txt" style="line-height: 16px">
									<div>xxxxxxxxxxx</div>
									<div>xxxxxxxxxxx</div>
								</td>
							</tr>
							<tr>
								<td>
									<div class="guide_icon">3</div>
								</td>
								<td class="gray_txt" style="line-height: 16px">
									<div>xxxxxxxxxxx</div>
									<div>xxxxxxxxxxx</div>
								</td>
							</tr>
						</table>						
					</li>
				</ul>
			</section>
		</div>
	</div>
	<footer>
		<!-- 温馨提示建议放入footer中 -->
		<section class="section_padding">
			<div class="reminder_container">
				<h3 class="reminder_title">温馨提示：</h3>
				<ul class="reminder_ul_number">
					<li>提示信息1，有问题请点击:<a id="link1" class="link_style" href="demo3.jsp" onclick="return ICBCPageTools.submitALink({linkId:'link1'})">提示链接</a></li>
					<li>提示信息2</li>
				</ul>
			</div>
		</section>	
		<section class="section_padding">
			<!-- 
				button_more_container容器内放置按钮
				放置到此容器中的按钮，一行最多三个，超过三个放入更多中，弹出面板展现
			-->
			<div class="button_more_container">
				<button class="normal_btn" onclick="alert('1','标题1','我是按钮',function(){alert1('aaa')})">按钮1</button>
				<button class="normal_btn" onclick="alert('2')">按钮2</button>
				<button class="normal_btn" onclick="alert('3')">按钮3</button>
				<button class="normal_btn" onclick="alert('4')">按钮4</button>
				<button class="normal_btn" onclick="alert('5')">按钮5</button>
				<button class="normal_btn" onclick="alert('6')">按钮6</button>
			</div>
		</section>		
	</footer>
</body>
<script>
</script>
</html>