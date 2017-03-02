<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../includes/contentType_client.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../includes/resources_client.jsp"%>
</head>
<script type="text/javascript">
jQuery(document).ready(function(){
	calculateHeight();
});
function calculateHeight(){
	// 获取浏览器显示高度及宽度
	var clientHeight = jQuery(window).height();
	// 获取header高度
	var headerHeight = jQuery('header').height();
	// 获取footer高度
	var footerHeight = jQuery('footer').height();
	jQuery('#agreement_container').css({
		"height":clientHeight-headerHeight-footerHeight-20+"px",
		"overflow-y":"scroll",
		"overflow-x":"hidden",
	});
}
</script>
<body>
	<header>
		<nav>
			<button id="returnButton" class="nav_left_btn" onclick="ICBCPageTools.submitALink({'linkId':'returnLink'})">返回</button>
			<a id="returnLink" class="hide" href="<%=urlHead%>/ClientDemo/page3.jsp&c_sessionId=<%=c_sessionId%>"></a>
			<h1 class="nav_title" id="nav_title">演示页面4</h1>
			<button class="nav_right_btn" onclick="ICBCPageTools.submitALink({'linkId':'nextLink'})">下一页</button>
			<a id="nextLink" class="hide" href="<%=urlHead%>/ClientDemo/page5.jsp&c_sessionId=<%=c_sessionId%>"></a>
		</nav>
		<!-- 协议标题要放到header里固定 -->
		<div class="agreement_title">协议标题</div>
	</header>
	<div id="content" class="content">
		<div id="scroller" class="scroller">
			<section>
				<div class="agreement_container" id="agreement_container">
					<!-- 协议内容不翻页，都放到一页里 -->
					<ul>
						<li>协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容协议内容</li>
					</ul>
				</div>
			</section>
		</div>
	</div>
	<footer>
		<div class="agreement_container">
			<!-- 协议内容不翻页，都放到一页里 -->
			<ul>
				<li class="agreement_split_line"></li>
				<li>
					<input type="checkbox" id="checkbox1" name="checkbox1" value=""/>
					<label for="checkbox1" class="vl_mid il">我同意该协议</label>
				</li>						
			</ul>
		</div>	
	</footer>
</body>
</html>