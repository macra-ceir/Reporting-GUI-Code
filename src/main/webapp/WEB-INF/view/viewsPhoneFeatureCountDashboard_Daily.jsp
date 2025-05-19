<%@ page import="java.util.Date" %>
<%
   response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Cache-Control", "no-store");
	response.setDateHeader("Expires", 0);
	response.setHeader("Pragma", "no-cache");
   
	 int timeout = session.getMaxInactiveInterval();
	
	 long accessTime = session.getLastAccessedTime();
	 long currentTime= new Date().getTime(); 
	 long dfd= accessTime +timeout;
	 if( currentTime< dfd){
	
%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!-- Security Tags -->
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<sec:csrfMetaTags />
<!-- Security Tags -->
<c:set var="context" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html class="no-js" lang="en" dir="ltr">
<head><title>CEIR Portal</title>
<!--<title>Currency Management</title>-->
<meta http-equiv='cache-control' content='no-cache'>
<meta http-equiv='expires' content='-1'>
<meta http-equiv='pragma' content='no-cache'>
<meta name="fragment" content="!">
<meta charset="utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black">
<meta content="" name="description" />
<meta content="" name="author" />

<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link rel="icon" type="image/x-icon"
	href="${context}/resources/assets/images/logo.png">
<%-- <link href="${context}/resources/css/materialize.css" type="text/css"
	rel="stylesheet" media="screen,projection"> --%>
<link rel="stylesheet"
	href="${context}/resources/assets/css/bootstrap.min.css">
<script src="${context}/resources/assets/js/jquery.min.js"></script>
<script src="${context}/resources/assets/js/popper.min.js"></script>
<script src="${context}/resources/assets/js/bootstrap.min.js"></script>

<link rel="stylesheet" href="${context}/resources/assets_graph/fonts/line-awesome/css/line-awesome.min.css">
    <link rel="stylesheet" href="${context}/resources/assets_graph/fonts/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="${context}/resources/assets_graph/css/bootstrap.min.css">
    <link rel="stylesheet" href="${context}/resources/assets_graph/css/style.css">

   <!--  <script src="assets/js/jquery.min.js"></script>
    <script src="assets/js/bootstrap.min.js"></script> -->


<!-- Security Tags -->
<meta name="_csrf" content="${_csrf.token}"/>
<!-- default header name is X-CSRF-TOKEN -->
<meta name="_csrf_header" content="${_csrf.headerName}"/>
<!-- Security Tags -->

<script type="text/javascript"
	src="${context}/resources/js/plugins/jquery-1.11.2.min.js"></script>
<script type="text/javascript">
	var path = "${context}";
</script>
<link rel="stylesheet"
	href="${context}/resources/custom_js/jquery-ui.css">
<script src="${context}/resources/custom_js/1.12.1_jquery-ui.min.js"></script>
<link
	href="${context}/resources/js/plugins/data-tables/css/jquery.dataTables.min.css"
	type="text/css" rel="stylesheet" media="screen,projection">		

<!-- CSS for icons(to remove later) -->
<link rel="stylesheet"
	href="${context}/resources/project_css/iconStates.css">
	
<link
	href="${context}/resources/font/font-awesome/css/font-awesome.min.css"
	type="text/css" rel="stylesheet" media="screen,projection">

 <!-- CORE CSS-->

 
<link rel="stylesheet" href="${context}/resources/assets/css/style.css">
</head>
<body data-roleType="${usertype}" data-userTypeID="${usertypeId}" data-userID="${userid}" data-selected-roleType="${selectedUserTypeId}" 
	data-selected-username="${username}" 
	data-stolenselected-roleType="${stolenselectedUserTypeId}">


<div class="content-box">
                <div class="content-container">
                    <div class="product-detail-section">
                        <ul id="breadcrumb">
                        <li>
								<div class="dropdown" style="padding:20px">
									<select name="select" id="what">
										<option value="1">1</option>
										<option value="2">2</option>
										<option value="3">3</option>
										<option value="4">4</option>
										<option value="5" selected>5</option>
										<option value="6">6</option>
										<option value="7">7</option>
										<option value="8">8</option>
										<option value="9">9</option>
										<option value="10">10</option>
									</select>
								</div>
							</li>
                            <li><div style="padding:20px"><input type="text" name="daterange" placeholder="Please select..."/></div></li>
                            <!-- <li><a href="#">Year<br> 2000 (1 more) <span class="BreadcrumbClose">x</span></a></li>
                            <li><a href="#">Year-Month<br> All Values</a></li>
                            <li><a href="#">Year<br> 2000 (2 more)</a></li> -->
                          </ul>

                                <ul class="nav nav-tabs product-tabs border-0">
                                    <li><a data-toggle="tab" href="#tab1" class="active">Device Counts(Day to Day)</a></li>
                                    <li><a data-toggle="tab" href="#tab2">Device Anomaly Count using Standard Deviation (Day To Day)</a></li>
                                    <li><a data-toggle="tab" href="#tab3">Tabular Data by Day</a></li>
                                    <li><a data-toggle="tab" href="#tab4">Operator Wise Device Count (Day to Day)</a></li>
                                   
                                </ul>
                                <div class="tab-content">
                                    <div id="tab1" class="tab-pane active">
                                        <div class="date-time">
                                            <div class="row">
                                                <div class="col-md-5">
                                                   <p> Report Refresh Date and Time: 4 Dec 2023 13:41:28</p>
                                                </div>
                                                <div class="col-md-7">
                                                    <p><a href="#"> Refresh Date and Time: 20 Nov 2023 09:40:55</a></p>
                                                </div>
                                            </div>
                                        </div>



                                        <%-- <div class="tab-box">
                                            <form action="" class="tab-row">
                                                <div class="tab-input-row">
                                                    <div class="tab-group">
                                                        <div class="tab-group-icon"><i class="fa fa-desktop" aria-hidden="true"></i></div>
                                                       <p> 6,432,072</p>
                                                        <span>0.95%</span>
                                                    </div>
                                                    <div class="tab-group">
                                                        <div class="tab-group-icon"><i class="fa fa-check" aria-hidden="true"></i></div>
                                                        <p>50,198,269</p>
                                                        <span>0.24%</span>
                                                    </div>
                                                    <div class="tab-group">
                                                        <div class="tab-group-icon"><i class="fa fa-times" aria-hidden="true"></i></div>
                                                        <p>3,432,072</p>
                                                        <span>1.54%</span>
                                                    </div>
                                                    <div class="tab-group">
                                                        <div class="tab-group-icon"><i class="fa fa-phone" aria-hidden="true"></i></div>
                                                        <p>36,432,072</p>
                                                        <span>2.76%</span>
                                                    </div>
                                                    <div class="tab-group">
                                                        <div class="tab-group-icon"><i class="fa fa-mobile" aria-hidden="true"></i></div>
                                                        <p>6,432,072</p>
                                                        <span>4.68%</span>
                                                    </div>
                                                    <div class="tab-group">
                                                        <div class="tab-group-icon"><i class="fa fa-desktop" aria-hidden="true"></i></div>
                                                       <p>6,432,072</p>
                                                        <span>0.54%</span>
                                                    </div>
                                                    <div class="tab-group">
                                                        <div class="tab-group-icon"><i class="fa fa-check" aria-hidden="true"></i></div>
                                                        <p>50,198,269</p>
                                                        <span>1.34%</span>
                                                    </div>
                                                    <div class="tab-group">
                                                        <div class="tab-group-icon"><i class="fa fa-times" aria-hidden="true"></i></div>
                                                       <p> 3,432,072</p>
                                                        <span>No Change</span>
                                                    </div>
                                                    
                                                </div>
                                            </form>
                                        </div> --%>
                                        <div class="product-detail-list">
                                            <div class="row">
                                            	 <div class="col-md-6 mb-16">
                                                   <h3>Valid Device and % change(Day to Day)</h3>
													<div id="validImeiCountWithPerChangeForSmartPhone" style="border-style: solid"></div>
                                                </div>
                                                 <div class="col-md-6 mb-16">
                                                   <h3>InValid Device and % change(Day to Day)</h3>
													<div id="inValidImeiCountWithPerChangeForSmartPhone" style="border-style: solid"></div>
                                                </div>
                                                <div class="col-md-6 mb-16">
                                                   <h3>Top Brand Name For Smart Phone</h3>
													<div id="TopBrandNameForSmartphone" style="border-style: solid"></div>
                                                </div>
                                                 <div class="col-md-6 mb-16">
                                                   <h3>Top Model Name For Smart Phone</h3>
													<div id="TopModelNameForSmartphone" style="border-style: solid"></div>
                                                </div>
                                            	<div class="col-md-6 mb-16">
                                                   <h3>Top Device Type For Smart Phone</h3>
													<div id="TopDeviceTypeForSmartPhone" style="border-style: solid"></div>
                                                </div>
                                                 <div class="col-md-6 mb-16">
                                                   <h3>Top Supporting Tech For Smart Phone</h3>
													<div id="TopSupportingTechForSmartphone" style="border-style: solid"></div>
                                                </div>
                                                <div class="col-md-6 mb-16">
                                                   <h3>Top Os For Smart Phone</h3>
													<div id="TopOsForSmartphone" style="border-style: solid"></div>
                                                </div>
                                                <div class="col-md-6 mb-16">
                                                   <h3>Top Marketing Name For Smart Phone</h3>
													<div id="TopMarketingNameForSmartphone" style="border-style: solid"></div>
                                                </div>
                                            	<div class="col-md-6 mb-16">
                                                   <h3>imei Count And Per Change BrandName</h3>
													<div id="imeiCountAndPerChangeBrandNameOnChange" style="border-style: solid"></div>
                                                </div>
                                                <div class="col-md-6 mb-16">
                                                   <h3>imei Count And Per Change ModelName</h3>
													<div id="imeiCountAndPerChangeModelNameOnChange" style="border-style: solid"></div>
                                                </div>
                                                <div class="col-md-6 mb-16">
                                                   <h3>imei Count And Per Change Device Type</h3>
													<div id="imeiCountAndPerChangeDeviceTypeOnChange" style="border-style: solid"></div>
                                                </div>
                                                 <div class="col-md-6 mb-16">
                                                   <h3>imei Count And Per Change Technology</h3>	 	
													<div id="imeiCountAndPerChangeTechnologyOnChange" style="border-style: solid"></div>
                                                </div>
                                                
                                                
                                                
                                                <div class="col-md-6 mb-16">
                                                   <h3>imeiCountAndPerChangeMarketingName</h3>	 	
													<div id=imeiCountAndPerChangeMarketingNameOnChange style="border-style: solid"></div>
                                                </div>
                                                
                                                 <div class="col-md-6 mb-16">
                                                   <h3>imeiCountAndPerChangeOSOnChange</h3>	 	
													<div id="imeiCountAndPerChangeOSOnChange" style="border-style: solid"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="tab2" class="tab-pane fade">
                                        <div class="product-detail-list">
                                            <div class="row">
                                            	<div class="col-md-6 mb-16">
                                                  <!--  <h3>Valid Imei Count with % Change</h3> -->
													<div id="MonthlyTopMarketingName" style="border-style: solid"></div>
                                                </div>
                                                 <div class="col-md-6 mb-16">
                                                  <!--  <h3>In Valid Imei Count with % Change </h3> -->
													<div id="MonthlyTopBrandName" style="border-style: solid"></div>
                                                </div>
                                                
                                                <div class="col-md-6 mb-16">
                                                  <!--  <h3>Valid Imei Count with % Change</h3> -->
													<div id="MonthlyTopModelName" style="border-style: solid"></div>
                                                </div>
                                                 <div class="col-md-6 mb-16">
                                                  <!--  <h3>In Valid Imei Count with % Change </h3> -->
													<div id="MonthlyTopDeviceType" style="border-style: solid"></div>
                                                </div>
                                                
                                                 <div class="col-md-6 mb-16">
                                                  <!--  <h3>Valid Imei Count with % Change</h3> -->
													<div id="MonthlyTopSupportingTech" style="border-style: solid"></div>
                                                </div>
                                                 <!-- <div class="col-md-6 mb-16">
                                                   <h3>In Valid Imei Count with % Change </h3>
													<div id="MonthlyTopDeviceType" style="border-style: solid"></div>
                                                </div> -->
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div id="tab3" class="tab-pane fade">
                                        <div class="product-detail-list">
                                            <div class="row">
                                                <div class="col-md-6 mb-16">
                                                  <!--  <h3>Valid Imei Count with % Change</h3> -->
													<div id="QuarterlyTopMarketingName" style="border-style: solid"></div>
                                                </div>
                                                 <div class="col-md-6 mb-16">
                                                  <!--  <h3>In Valid Imei Count with % Change </h3> -->
													<div id="QuarterlyTopBrandName" style="border-style: solid"></div>
                                                </div>
                                                
                                                <div class="col-md-6 mb-16">
                                                  <!--  <h3>Valid Imei Count with % Change</h3> -->
													<div id="QuarterlyTopModelName" style="border-style: solid"></div>
                                                </div>
                                                 <div class="col-md-6 mb-16">
                                                  <!--  <h3>In Valid Imei Count with % Change </h3> -->
													<div id="QuarterlyTopDeviceType" style="border-style: solid"></div>
                                                </div>
                                                
                                                 <div class="col-md-6 mb-16">
                                                  <!--  <h3>Valid Imei Count with % Change</h3> -->
													<div id="QuarterlyTopSupportingTech" style="border-style: solid"></div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div id="tab4" class="tab-pane fade">
                                        <div class="product-detail-list">
                                            <div class="row">
                                               <div class="col-md-12 mb-16">
                                                  <!--  <h3>Valid Imei Count with % Change</h3> -->
													<div id="DeviceCountForAllOperator" style="border-style: solid"></div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                    </div>
                </div>
        </div>


	
   
   
   
   

	
	<script type="text/javascript"
		src="${context}/resources/js/materialize.js"></script>
	<script type="text/javascript"
		src="${context}/resources/js/plugins/data-tables/js/jquery.dataTables.min.js"></script>
	<script src="${context}/resources/assets/js/custom.js"></script>
	
		<!-- i18n library -->
	<script type="text/javascript"
		src="${context}/resources/project_js/CLDRPluralRuleParser.js"></script>
	<script type="text/javascript"
		src="${context}/resources/i18n_library/i18n.js"></script>
	<script type="text/javascript"
		src="${context}/resources/i18n_library/messagestore.js"></script>

	<script type="text/javascript"
		src="${context}/resources/i18n_library/fallbacks.js"></script>

	<script type="text/javascript"
		src="${context}/resources/i18n_library/language.js"></script>

	<script type="text/javascript"
		src="${context}/resources/i18n_library/parser.js"></script>


	<script type="text/javascript"
		src="${context}/resources/i18n_library/emitter.js"></script>


	<script type="text/javascript"
		src="${context}/resources/i18n_library/bidi.js"></script>

	<script type="text/javascript"
		src="${context}/resources/i18n_library/history.js"></script>

	<script type="text/javascript"
		src="${context}/resources/chartJS/highcharts.js"></script>
		<script type="text/javascript"
		src="${context}/resources/project_js/globalVariables.js?version=<%= (int) (Math.random() * 10) %>"></script>
	<script type="text/javascript"
		src="${context}/resources/project_js/backbutton.js?version=<%= (int) (Math.random() * 10) %>"></script>
	<script type="text/javascript"
		src="${context}/resources/project_js/dragableModal.js?version=<%= (int) (Math.random() * 10) %>"></script>
	<script type="text/javascript"
		src="${context}/resources/project_js/enterKey.js?version=<%= (int) (Math.random() * 10) %>"></script>

	<script type="text/javascript"
		src="${context}/resources/project_js/viewsPhoneFeatureCountDashboard_Daily.js?version=<%= (int) (Math.random() * 10) %>"></script>
			<script type="text/javascript"
		src="${context}/resources/project_js/validationMsg.js?version=<%= (int) (Math.random() * 10) %>"></script>
	<script type="text/javascript"
		src="${context}/resources/project_js/_dateFunction.js?version=<%= (int) (Math.random() * 10) %>" async></script>
			<script type="text/javascript"
		src="" async></script>
<script type="text/javascript">var countHit="";  $( document ).ready(function() {  if($("body").attr("data-roleType") == '' || ($("body").attr("data-roleType") != window.parent.$("body").attr("data-roleType"))){window.top.location.href = "./login?isExpired=yes";} var timeoutTime = <%=session.getLastAccessedTime()%>;var timeout = <%=session.getMaxInactiveInterval()%>;timeoutTime += timeout;var currentTime;
$("body").click(function(e) {
	$.ajaxSetup({headers:{ 'X-CSRF-TOKEN': $("meta[name='_csrf']").attr("content") }});
	$.ajax({url: './serverTime',type: 'GET',async: false,success: function (data, textStatus, jqXHR) {currentTime = data;countHit=0;},error: function (jqXHR, textStatus, errorThrown) {}});
	if( currentTime > timeoutTime )
	{
		 document.addEventListener("click", handler, true);
	  function handler(e) {
			  e.stopPropagation();
			  e.preventDefault();
			}  
			 window.top.location.href = "./login?isExpired=yes";   
		   }
	else{timeoutTime = currentTime + timeout;}});});
	</script>

<script type="text/javascript"
		src="${context}/resources/ajax/keyBoardShortcut.js?version=<%= (int) (Math.random() * 10) %>"></script>
</body></html>
<%
	} else {
		/*  request.setAttribute("msg", "  *Please login first");
		request.getRequestDispatcher("./index.jsp").forward(request, response); */
%>
<script language="JavaScript">
	sessionStorage.setItem("loginMsg",
			"*Session has been expired");
	window.top.location.href = "./login";
</script>
<%
	}
%>

