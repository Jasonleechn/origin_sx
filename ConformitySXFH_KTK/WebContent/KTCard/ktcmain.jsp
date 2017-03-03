<%@ include file="/includes/contentType_client.jsp"%>
<%@ page language="java" contentType="charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<%@ include file="/includes/resources_client.jsp"%>
</head>
<body>
	<header>
		<nav>
			<button id="returnButton" class="nav_left_btn" onclick="ICBCPageTools.submitALink({'linkId':'returnLink'})">返回</button>
			<a id="returnLink" class="hide" href="<%=mainUrl%>"></a>
			<h1 class="nav_title" id="nav_title">快通卡业务</h1>
		</nav>
	</header>
	<div id="content" class="content">
		<div id="scroller" class="scroller">
			<section class="section_padding">
				<h2 class="section_title">主要功能列表</h2>
				<ul class="cell_container">
					<li class="cell_li_btn" onclick="ICBCPageTools.submitForm({'formName':'readIC'});">
						<div class="cell_li_left">快通储值卡查询充值</div>
					</li>
				</ul>
				<form name="readIC" method="post" action="<%=postUrl%>">
					<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
					<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
					<input type="hidden" name="url" value="/KTCard/readCardInfo.jsp" />
				</form>
				<ul class="cell_container">
					<li class="cell_li_btn" onclick="ICBCPageTools.submitForm({'formName':'readDetail'});">
						<div class="cell_li_left">快通储值卡明细查询</div>
					</li>
				</ul>
				<form name="readDetail" method="post" action="<%=postUrl%>">
					<input type="hidden" name="dse_sessionId" value="<%=sessionId%>" />
					<input type="hidden" name="c_sessionId" value="<%=c_sessionId%>" />
					<input type="hidden" name="url" value="/KTCard/readDetailInfo.jsp" />
				</form>
			</section>
			
			<section class="section_padding">
				<h2 class="section_title">业务说明</h2>
				<ul class="cell_container">
					<li class="indent_txt"><!-- 若首行缩进class加入indent_txt -->
						<div class="cell_li_txt">主要提供快通卡基本信息查询和充值服务,其中充值服务支持的安全认证介质类型为口令卡或电子密码器。该业务支持我行指定的外接读卡设备或具有NFC功能的安卓智能手机。</div>
					</li>
				</ul>
			</section>
		</div>
	</div>
	<footer></footer>
</body>
</html>