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
			<a id="returnLink" class="hide" href="<%=urlHead%>/ClientDemo/page2.jsp&c_sessionId=<%=c_sessionId%>"></a>
			<h1 class="nav_title" id="nav_title">演示页面3</h1>
			<button class="nav_right_btn" onclick="ICBCPageTools.submitALink({'linkId':'nextLink'})">下一页</button>
			<a id="nextLink" class="hide" href="<%=urlHead%>/ClientDemo/page4.jsp&c_sessionId=<%=c_sessionId%>"></a>
		</nav>
		<section class="header_select">
			<button class="header_select_left_btn" onclick=""><</button>
			<h2 class="header_select_title">选择标题文本</h2>
			<button class="header_select_right_btn" onclick="">></button>
		</section>		
	</header>
	<div id="content" class="content">
		<div id="scroller" class="scroller">
			<section class="section_padding">
				<div class="info_container">
					<h3 class="info_success"></h3>
					<ul>
						<li>成功信息</li>
					</ul>
				</div>
			</section>
			<section class="section_padding">
				<div class="info_container">
					<h3 class="info_tip"></h3>
					<ul>
						<li>提示信息</li>
					</ul>
				</div>
			</section>
			<section class="section_padding">
				<div class="info_container">
					<h3 class="info_error"></h3>
					<ul>
						<li>
							<table class="detail_table">
								<tr>
									<td class="detail_td_left">错误代码</td>
									<td class="detail_td_right">xxxxxx</td>
								</tr>
								<tr>
									<td class="detail_td_left">错误信息</td>
									<td class="detail_td_right">xxxxxx</td>
								</tr>
							</table>
						</li>
					</ul>
				</div>
			</section>
			<section class="section_padding">
				<div class="info_container">
					<h3 class="info_wait"></h3>
					<ul>
						<!-- 如果需要缩进，加入indent_txt -->
						<li class="indent_txt">一大段文字信息一大段文字信息一大段文字信息一大段文字信息一大段文字信息一大段文字信息</li>
						<li>
							<table class="detail_table">
								<tr>
									<td class="detail_td_left">左侧提示</td>
									<td class="detail_td_right">右侧提示</td>
								</tr>
								<tr>
									<td class="detail_td_left">左侧提示</td>
									<td class="detail_td_right">右侧提示</td>
								</tr>
							</table>
						</li>
						<li>一大段文字信息一大段文字信息一大段文字信息一大段文字信息一大段文字信息一大段文字信息</li>
					</ul>
				</div>
			</section>
			<section class="section_padding">
				<div class="info_container">
					<div class="info_logo"><h3 class="info_tip_logo">自定义提示</h3></div>
					<ul>
						<li>一大段文字信息一大段文字信息一大段文字信息一大段文字信息一大段文字信息一大段文字信息</li>
					</ul>
				</div>
			</section>			
			<section class="section_padding">
				<div class="info_container">
					<div class="info_logo"><h3 class="info_error_logo">自定义提示</h3></div>
					<ul>
						<li>一大段文字信息一大段文字信息一大段文字信息一大段文字信息一大段文字信息一大段文字信息</li>
					</ul>
				</div>
			</section>			
			<section class="section_padding">
				<div class="info_container">
					<div class="info_logo"><h3 class="info_success_logo">自定义提示</h3></div>
					<ul>
						<li>一大段文字信息一大段文字信息一大段文字信息一大段文字信息一大段文字信息一大段文字信息</li>
					</ul>
				</div>
			</section>			
		</div>
	</div>
	<footer>
	</footer>
</body>
</html>