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

<!-- <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"></script>
  <script
    src="https://cdn.jsdelivr.net/gh/dubrox/Multiple-Dates-Picker-for-jQuery-UI@master/jquery-ui.multidatespicker.js"></script>

  <link rel="stylesheet" type="text/css" href="http://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
  -->
   <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <!-- Select2 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" />
    <!-- Select2 JS -->
    <script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"></script>

  <!--  <script src="https://code.jquery.com/jquery-3.7.0.js"></script> -->

    <script>
      /* function exportHTMLtoPDF() {
         let htmlElement = document.getElementById('tab1');
		alert("HI");
         html2pdf().from(htmlElement).save('exported_file.pdf');
      } */

      function exportHTMLtoPDF(tab) {
    	     var printContents = document.getElementById(tab).innerHTML;
    	     var originalContents = document.body.innerHTML;

    	     document.body.innerHTML = printContents;

    	     window.print();

    	     document.body.innerHTML = originalContents;
     }
   </script>
  <style>
  @media print {
  .noPrint{
    display:none;
  }
  .col-md-6 {
        flex: 0 0 100% !important ;
        max-width: 100% !important;
    }
  .col-md-6 .mb-16 {
        flex: 0 0 100% !important ;
        max-width: 100% !important;
    }
    col-md-6,mb-16 {
        flex: 0 0 100% !important ;
        max-width: 100% !important;
    }
  }

   /*  body {
      font-family: Arial, Helvetica, sans-serif;
    } */

    input {
      width: 400px;
      padding: 7px;
    }

    .ui-state-highlight {
      border: 0 !important;
    }

    .ui-state-highlight a {
      background: #c73838 !important;
      color: #fff !important;
    }
    #ui-datepicker-div{
    	 width: 400px !important;
    }
    .graph_display{
		border-style: solid;
		background: #FFF !important;
	}
	.export-button-prinnt{
		border: 1px solid;
    	float: right;
    	font-size: 14px;
		font-weight: 600;
		margin-right: 10px;
	}
  </style>

  <script>
        $(document).ready(function() {
            $('#yearToyearId').select2({
                placeholder: "Select yearly report",
                allowClear: true
            });
            $('#monthTomonthId').select2({
                placeholder: "Select monthly report",
                allowClear: true
            });
            $('#qtyToqtyId').select2({
                placeholder: "Select quarterly report",
                allowClear: true
            });
        });
    </script>
</head>
<body data-roleType="${usertype}" data-userTypeID="${usertypeId}" data-userID="${userid}" data-selected-roleType="${selectedUserTypeId}"
	data-selected-username="${username}"
	data-stolenselected-roleType="${stolenselectedUserTypeId}">
<script>
  /*  $(document).ready(function () {
      $("#refresh_select_date").on('click', function () {
    	 var data=  $('#monthTomonthId').val();
          alert("selected data is !"+ data);
      });
    });  */
  </script>

<div class="content-box">
                <div class="content-container">
                    <div class="product-detail-section">
                        <ul id="breadcrumb">
                        <li id="whatIstopID_li">
								<div class="dropdown" style="padding:20px;padding-right: 0px;padding-bottom: 51px;" >

								</div>
							</li>
							<li id="yearToyearId_li" style="display: none; width: 35%;">
								<div class="dropdown" style="padding:20px;padding-right: 0px;" >
									<select name="select" multiple="multiple" id="yearToyearId" style="width: 100% !important;text-align: center;">
										<option value="2023-01-01#2023-12-31">2023</option>
										<option value="2024-01-01#2024-12-31">2024</option>
									</select>
								</div>
							</li>
							<li id="qtyToqtyId_li" style="display: none ; width: 35%;">
								<div class="dropdown" style="padding:20px;padding-right: 0px;" >
									<select name="select" multiple="multiple" id="qtyToqtyId" style="width: 100% !important;text-align: center;">

									</select>
								</div>
							</li>
							<li id="monthTomonthId_li" style="display: none; width: 35%;">
								<div class="dropdown" style="padding:20px;padding-right: 0px;" >
									<select name="select" multiple="multiple" id="monthTomonthId" style="width: 100% !important;text-align: center;">
									</select>
								</div>
							</li>
                          <!--   <li><div id="graph_data_select" style="padding:20px 6px 20px 4px; display: none">

                            <input type="text" id="datePick" name="datePick" placeholder="Please select date range...."/></div></li>
                         	<li><button id="refresh_select_date" style="display: none; background: #3498DB; clear: both !important; border: none !important;padding: 0px !important; border-radius: 0px !important; border-width: 0px !important;">
								<i class="fa fa-refresh" style="color: #FFF;padding: 25px 0px 0px 0px;display: block;font-size: 28px !important;"></i>
   								</button>
   							</li> -->

   							<li><button id="refresh_select_date" style="display: none; background: #3498DB; clear: both !important; border: none !important;padding: 0px !important; border-radius: 0px !important; border-width: 0px !important; margin-left: 3px">
								<i title="click here for reports" class="fa fa-check" style="color: #FFF;padding: 25px 0px 0px 0px;display: block;font-size: 28px !important;"></i>
   								</button>
   								<button id="refresh_select_date_qtr3" style="display: none; background: #3498DB; clear: both !important; border: none !important;padding: 0px !important; border-radius: 0px !important; border-width: 0px !important; margin-left: 3px">
								<i title="click here for reports" class="fa fa-check" style="color: #FFF;padding: 25px 0px 0px 0px;display: block;font-size: 28px !important;"></i>
   								</button>
   								<button id="refresh_select_date_yrs4" style="display: none; background: #3498DB; clear: both !important; border: none !important;padding: 0px !important; border-radius: 0px !important; border-width: 0px !important; margin-left: 3px">
								<i title="click here for reports" class="fa fa-check" style="color: #FFF;padding: 25px 0px 0px 0px;display: block;font-size: 28px !important;"></i>
   								</button>
   								<button id="refresh_select_date_m6" style="display: none; background: #3498DB; clear: both !important; border: none !important;padding: 0px !important; border-radius: 0px !important; border-width: 0px !important; margin-left: 3px">
								<i title="click here for reports" class="fa fa-check" style="color: #FFF;padding: 25px 0px 0px 0px;display: block;font-size: 28px !important;"></i>
   								</button>
   								<button id="refresh_select_date_qtr7" style="display: none; background: #3498DB; clear: both !important; border: none !important;padding: 0px !important; border-radius: 0px !important; border-width: 0px !important; margin-left: 3px">
								<i title="click here for reports" class="fa fa-check" style="color: #FFF;padding: 25px 0px 0px 0px;display: block;font-size: 28px !important;"></i>
   								</button>
   								<button id="refresh_select_date_yrs8" style="display: none; background: #3498DB; clear: both !important; border: none !important;padding: 0px !important; border-radius: 0px !important; border-width: 0px !important; margin-left: 3px">
								<i title="click here for reports" class="fa fa-check" style="color: #FFF;padding: 25px 0px 0px 0px;display: block;font-size: 28px !important;"></i>
   								</button>
   							</li>
                          </ul>
                                <ul class="nav nav-tabs product-tabs border-0" >
                                    <li><a data-toggle="tab" id="gtabId1" href="#tab1" class="active" onclick="nactiStavSvetel(1)"><b>Till Date</b></a></li>
                                    <li><a data-toggle="tab" id="gtabId2" href="#tab2" onclick="nactiStavSvetel(2)"><b>Monthly</b></a></li>
                                    <li><a data-toggle="tab" id="gtabId3" href="#tab3" onclick="nactiStavSvetel(3)"><b>Quarterly</b></a></li>
                                    <li><a data-toggle="tab" id="gtabId4" href="#tab4" onclick="nactiStavSvetel(4)"><b>Yearly</b></a></li>
                                   <!--  <li><a data-toggle="tab" href="#tab5">Tabular Data by</a></li> -->
                                    <!-- <li><a data-toggle="tab" id="gtabId6" href="#tab6" onclick="nactiStavSvetel(6)"><b>Operator (Monthly)</b></a></li> -->
                                    <!-- <li><a data-toggle="tab" id="gtabId7" href="#tab7" onclick="nactiStavSvetel(7)"><b>Operator (Quarterly)</b></a></li> -->
                                    <!-- <li><a data-toggle="tab" id="gtabId8" href="#tab8"onclick="nactiStavSvetel(8)"><b>Operator (Yearly)</b></a></li> -->
                                </ul>
                                <div class="tab-content">
                                    <div id="tab1" class="tab-pane active">
                                        <div class="date-time">
                                            <div class="row">
                                                <div class="col-md-5">
                                                   <p id="reportRefresh"> Report Refresh Date and Time: 4 Dec 2023 13:41:28</p>
                                                </div>
                                                <div class="col-md-7">
                                                <button id="exportButton" onclick="exportHTMLtoPDF('tab1')" class="btn save-button-dark export-button-prinnt" style="border: 1px solid;float: right;">Export to Reports</button>
                                                    <p><!-- <a href="#" id="previousRefresh"> Refresh Date and Time: 20 Nov 2023 09:40:55</a> --></p>
                                                </div>
                                            </div>
                                        </div>



                                        <div class="tab-box">
                                            <form action="" class="tab-row">
                                                <div class="tab-input-row">
                                                    <div class="tab-group">
                                                        <div class="tab-group-icon">Total IMEI Count</div>
                                                       <p id="totalCount"> 0</p>
                                                       <span></span>
                                                    </div>
                                                    <div class="tab-group">
                                                         <div class="tab-group-icon">Total Success IMEI </div>
                                                         <p id="totalSuccessImeiCount"> 0</p>
                                                         <span></span>
                                                     </div>
                                                    <div class="tab-group">
                                                        <div class="tab-group-icon">Total Failed IMEI </div>
                                                        <p id="totalFailedImeiCount">0</p>
                                                        <span></span>
                                                    </div>
                                                    <div class="tab-group">
                                                        <div class="tab-group-icon">Total Removed IMEI </div>
                                                        <p id="totalRemovedImeiCount">0</p>
                                                        <span></span>
                                                    </div>


                                                </div>
                                            </form>
                                        </div>
                                        <div class="product-detail-list">
                                            <div class="row" id="content_download_tab1">
                                                <div class="col-md-6 mb-16">
                                                    <!-- <h3>Till Date Reason For Valid IMEI with % change</h3> -->
                                                    <div id="totalImeiCount" class="graph_display"></div>
                                                 </div>

                                            	 <div class="col-md-6 mb-16">
                                                       <!-- <h3>Till Date Reason For Valid IMEI with % change</h3> -->
                                                       <div id="totalFraudImeiRemovedCount" class="graph_display"></div>
                                                 </div>



                                            </div>
                                        </div>
                                    </div>
                                    <div id="tab2" class="tab-pane fade">
                                    	 <div class="date-time">
                                            <div class="row">
                                                <div class="col-md-5">
                                                </div>
                                                <div class="col-md-7">
                                                <button id="exportButton" onclick="exportHTMLtoPDF('tab2')" class="btn save-button-dark export-button-prinnt" style="border: 1px solid;float: right;">Export to Reports</button>
                                                    <p><!-- <a href="#" id="previousRefresh"> Refresh Date and Time: 20 Nov 2023 09:40:55</a> --></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product-detail-list">
                                            <div class="row">
                                            	<div class="col-md-6 mb-16">
                                                       <!--  <h3>Valid Imei Count with % Change</h3> -->
                                                        <div id="FraudImeiDetectedMonthly" class="graph_display"></div>
                                                 </div>

                                                 <div class="col-md-6 mb-16">
                                                             <!--  <h3>Valid Imei Count with % Change</h3> -->
                                                 			<div id="fraudImeiAcceptedMonthly" class="graph_display"></div>
                                                 </div>

                                            	<div class="col-md-6 mb-16">
                                                  <!--  <h3>Valid Imei Count with % Change</h3> -->
													<div id="fraudImeiRejectedMonthly" class="graph_display"></div>
                                                </div>

                                                <div class="col-md-6 mb-16">
                                                   <!--  <h3>Valid Imei Count with % Change</h3> -->
                                                	<div id="fraudImeiRemovedMonthly" class="graph_display"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="tab3" class="tab-pane fade">
                                    	 <div class="date-time">
                                            <div class="row">
                                                <div class="col-md-5">
                                                </div>
                                                <div class="col-md-7">
                                                <button id="exportButton" onclick="exportHTMLtoPDF('tab3')" class="btn save-button-dark export-button-prinnt" style="border: 1px solid;float: right;">Export to Reports</button>
                                                    <p><!-- <a href="#" id="previousRefresh"> Refresh Date and Time: 20 Nov 2023 09:40:55</a> --></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product-detail-list">
                                            <div class="row">
                                                <div class="col-md-6 mb-16">
                                                        <!--  <h3>Valid Imei Count with % Change</h3> -->
                                                		<div id="fraudImeiDetectedQuarterly" class="graph_display"></div>
                                                </div>
                                                <div class="col-md-6 mb-16">
                                                       <!--  <h3>Valid Imei Count with % Change</h3> -->
                                                       <div id="fraudImeiAcceptedQuarterly" class="graph_display"></div>
                                                </div>
                                                <div class="col-md-6 mb-16">
                                                        <!--  <h3>Valid Imei Count with % Change</h3> -->
                                                        <div id="fraudImeiRejectedQuarterly" class="graph_display"></div>
                                                </div>
                                                <div class="col-md-6 mb-16">
                                                         <!--  <h3>Valid Imei Count with % Change</h3> -->
                                                         <div id="fraudImeiRemovedQuarterly" class="graph_display"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="tab4" class="tab-pane fade">
                                    	 <div class="date-time">
                                            <div class="row">
                                                <div class="col-md-5">
                                                </div>
                                                <div class="col-md-7">
                                                <button id="exportButton" onclick="exportHTMLtoPDF('tab4')" class="btn save-button-dark export-button-prinnt" style="border: 1px solid;float: right;">Export to Reports</button>
                                                    <p><!-- <a href="#" id="previousRefresh"> Refresh Date and Time: 20 Nov 2023 09:40:55</a> --></p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="product-detail-list">
                                            <div class="row">
                                               <div class="col-md-6 mb-16">
                                                    <!--  <h3>Valid Imei Count with % Change</h3> -->
                                               		<div id="fraudImeiDetectedYearly" class="graph_display"></div>
                                               </div>

                                               <div class="col-md-6 mb-16">
                                                    <!--  <h3>Valid Imei Count with % Change</h3> -->
                                                    <div id="fraudImeiAcceptedYearly" class="graph_display"></div>
                                               </div>

                                               <div class="col-md-6 mb-16">
                                                      <!--  <h3>Valid Imei Count with % Change</h3> -->
                                                      <div id="fraudImeiRejectedYearly" class="graph_display"></div>
                                               </div>

                                               <div class="col-md-6 mb-16">
                                                       <!--  <h3>Valid Imei Count with % Change</h3> -->
                                                       <div id="fraudImeiRemovedYearly" class="graph_display"></div>
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
	<%-- <script src="${context}/resources/assets/js/custom.js"></script> --%>

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
	<%-- <script type="text/javascript"
		src="${context}/resources/project_js/dragableModal.js?version=<%= (int) (Math.random() * 10) %>"></script> --%>
	<script type="text/javascript"
		src="${context}/resources/project_js/enterKey.js?version=<%= (int) (Math.random() * 10) %>"></script>

	<script type="text/javascript"
		src="${context}/resources/project_js/viewFraudImeiGraphReport.js?version=<%= (int) (Math.random() * 10) %>"></script>
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
<script language="JavaScript" >
	function nactiStavSvetel(tab){
		alert(tab);
	}
	sessionStorage.setItem("loginMsg",
			"*Session has been expired");
	window.top.location.href = "./login";
</script>
<%
	}
%>

