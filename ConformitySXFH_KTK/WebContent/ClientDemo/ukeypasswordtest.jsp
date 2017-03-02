<%@ page contentType="text/html;charset=utf-8"%>
<%@ include file="../includes/contentType_client.jsp"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="../includes/resources_client.jsp"%>
</head>
<%
	//赋值U盾验签标志位
	response.addHeader("UKeySignFlag", "true");
	//屏显信息
	response.addHeader("UKeyDisplayOnScreenSignDataInfo", java.net.URLEncoder.encode("<?xml  version=\"1.0\" encoding=\"GBK\" ?><TradeData><field name=\"单笔支付限额\" value=\"99,998.86元\" DisplayOnScreen=\"TRUE\"/><field name=\"日累计支付限额\" value=\"1,000,000.00元\" DisplayOnScreen=\"TRUE\"/><field name=\"交易提交时间\" value=\"20140514153046269891\" DisplayOnScreen=\"TRUE\"/></TradeData>","UTF-8"));
	//key显信息
	response.addHeader("UKeyDisplayOnKeySignDataInfo", java.net.URLEncoder.encode("请确认调整单笔支付限额：99,998.86元 日累计支付限额：1,000,000.00元（工商银行）","UTF-8"));
	//客户端签名后放入U盾验签要素的表单名
	response.addHeader("UKeySignFormName", "confirm");
%>
<body>
	<header>
		<nav>
			<button id="returnButton" class="nav_left_btn" onclick="ICBCPageTools.submitForm({'formName':'prev'});">返回</button>
			<form name="prev" method="post" action="<%=mainUrl%>"></form>
			<h1 class="nav_title" id="nav_title">分行特色验签测试</h1>
			<!-- 此处必须提交此方法 -->
			<button id="nextButton" class="nav_right_btn" onclick="UKeyVerifyConfirm()">确定</button>
		</nav>
	</header>
	<div id="content" class="content">
		<div id="scroller" class="scroller">
			<form name="next" method="post" action="<%=postUrl%>">
				<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
				<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
				<input type="hidden" name="url" value="/ClientDemo/passwordok.jsp" />
				<section class="section_padding">
					<h2 class="section_title">常用页面风格示例2</h2>
					<ul class="cell_container">
						<li>
							<table class="detail_table">
								<tr>
									<td class="detail_td_left">确认信息1</td>
									<td class="detail_td_right">xxxxxx</td>
								</tr>
								<tr>
									<td class="detail_td_left">确认信息2</td>
									<td class="detail_td_right">xxxxxx</td>
								</tr>
							</table>					
						</li>
					</ul>
				</section>			
			</form>
		</div>
	</div>
	<footer></footer>
</body>
</html>