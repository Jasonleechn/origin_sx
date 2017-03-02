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
			<a id="returnLink" class="hide" href="<%=urlHead%>/ClientDemo/page4.jsp&c_sessionId=<%=c_sessionId%>"></a>
			<h1 class="nav_title" id="nav_title">演示页面5</h1>
		</nav>
	</header>
	<div id="content" class="content">
		<div id="scroller" class="scroller">
			<section class="section_datatable">
				<table class="datatable">
					<thead>
						<!-- 主标题（可选）	colspan="3" 要根据子标题的个数定 -->
						<tr class="main_title"><th align="left" colspan="3">主标题</th></tr>
						<!-- 子标题（必须有且唯一）	 align属性设置对齐方式，tbody中的列会和标题的对齐方式相同 width代表这列的宽度，可以是像素或百分比，不写会自动填充宽度-->
						<tr class="sub_title">
							<th align="left" width="30%">子标题1</th>
							<th align="center" width="30%">子标题2</th>
							<th align="right" width="30%">子标题3</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>单行文本</td>
							<td>单行文本</td>
							<td>单行文本</td>
						</tr>
						<tr>
							<td>
								<div>双行文本</div>
								<div class="gray_txt small_txt">双行文本</div><!-- 字体颜色和大小可以自己家class属性 -->
							</td>
							<td>
								<div>单行文本</div>
							</td>
							<td>
								<div>双行文本</div>
								<div class="gray_txt small_txt">双行文本</div>
							</td>							
						</tr>
						<tr>
							<td>
								<div>双行文本</div>
								<div>双行文本</div>							
							</td>
							<td>
								<div class="green_txt green_down_icon">单行文本</div>
							</td>
							<td>
								<div class="red_txt red_up_icon">单行文本</div>
							</td>
						</tr>
						<tr>
							<td>
								<div>双行文本</div>
								<div>双行文本</div>							
							</td>
							<td>
								<div class="green_txt green_down_icon">单行文本</div>
							</td>
							<td>
								<div class="purple_middle_icon">单行文本</div>
							</td>
						</tr>
						<tr>
							<td>
								<div>单行文本</div>
							</td>
							<td>
								<div>
									<div style="display:inline;float:left;width:50%;text-align:right">
										<div>1.33</div>
										<div class="red_txt red_up_icon"></div>
									</div>
									<div class="red_txt" style="display:inline;float:left;width:50%;text-align:left;line-height:40px;font-size:28px">33</div>
								</div>
							</td>
							<td>
								<div style="float:right">
									<div style="display:inline;float:left;text-align:right">
										<div>1.33</div>
										<div class="green_txt green_down_icon"></div>
									</div>
									<div class="green_txt" style="display:inline;float:left;text-align:left;line-height:40px;font-size:28px">33</div>
								</div>
							</td>
						</tr>
						<tr>
							<td colspan="3">跨列的文本跨列的文本跨列的文本</td>
						</tr>
						<tr class="datatable_tr_btn" onclick="">
							<td>可点击行</td>
							<td>可点击行</td>
							<td>可点击行</td>
						</tr>
					</tbody>
					<tfoot>
						<!-- 显示更多按钮的id必须叫loadMore -->
						<tr id="loadMore" class="datatable_more_btn"><td colspan="3">显示更多</td></tr>
					</tfoot>
				</table>
			</section>
			<section class="section_datatable">
				<table class="datatable">
					<thead>
						<tr class="sub_title">
							<th align="left" width="30%">子标题1</th>
							<th align="right" width="30%">子标题2</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<div>单行文本<span class="recommend_icon"/></div>
							</td>
							<td>单行文本</td>
						</tr>
						<tr>
							<td>
								<div>单行文本<span class="private_icon"/></div>
							</td>
							<td>单行文本</td>
						</tr>
						<tr>
							<td>
								<div>单行文本<span class="recommend_icon"/><span class="private_icon"/></div>
							</td>
							<td>单行文本</td>
						</tr>
					</tbody>
					<tfoot>
					</tfoot>
				</table>
			</section>
			<section class="section_datatable">
				<table class="datatable">
					<thead>
						<tr class="main_title"><th align="left" colspan="3">主标题</th></tr>
						<tr class="sub_title">
							<th align="left" width="30%">子标题1</th>
							<th align="right" width="30%">子标题2</th>
						</tr>
					</thead>
					<tbody>
					</tbody>
					<tfoot>
						<!-- 暂无明细按钮的id必须叫noResult -->
						<tr id="noResult"><td colspan="2">暂无明细的描述</td></tr>
					</tfoot>
				</table>
			</section>
			<section class="section_datatable">
				<table class="datatable">
					<thead>
						<tr class="sub_title">
							<th align="left" width="5%"></th>
							<th align="left" width="40%">贷款日期/商户/还款日</th>
							<th align="right" width="60%">贷款金额/期限/卡(账)号</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td><input type="checkbox"/></td>
							<td onclick="alert1('111')">
								<div>
									<div>2014-01-01</div>
									<div style="width:200%" class="gray_txt small_txt">公司名称很长很长很长很长很长</div>
									<div class="gray_txt small_txt">每月1日</div>
								</div>
							</td>
							<td onclick="alert1('111')" class="datatable_btn" >
								<div>5.0000</div>
								<div  class="gray_txt small_txt">12月</div>
								<div  class="gray_txt small_txt">6222020200000000000</div>
							</td>
						</tr>					
					</tbody>
					<tfoot>
					</tfoot>
				</table>
			</section>
		</div>
	</div>
	<footer>
	</footer>
</body>
</html>