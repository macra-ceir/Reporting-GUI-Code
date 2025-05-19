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
    
  <style>
  
   /*  body {
      font-family: Arial, Helvetica, sans-serif;
    } */
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
  }
  .graph_display{
		border-style: solid;
		background: #FFF !important;
	}
    .tab-box .tab-row .tab-group{
    	width: 34% !important;
    }
 	.tab-group{
 		width: 34% !important;
 	}
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
    .export-button-prinnt{
		border: 1px solid;
    	float: right;
    	font-size: 14px;
		font-weight: 600;
		margin-right: 10px;
	}
  </style>
  
  <script>
  	function exportHTMLtoPDF(tab) {
	     var printContents = document.getElementById(tab).innerHTML;
	     var originalContents = document.body.innerHTML;
	     
	     document.body.innerHTML = printContents;

	     window.print();

	     document.body.innerHTML = originalContents;
	}
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
                        <li id="whatIstopID_li" style="display: none">
								<div class="dropdown" style="padding:20px;padding-right: 0px;" >
									<select name="select" id="whatIstopID" style="width: 78px;text-align: center;padding: 7px;padding-bottom: 8px;">
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
										<option value="2023-01-01#2023-03-31">2023 Q1</option>
										<option value="2023-04-01#2023-06-31">2023 Q2</option>
										<option value="2023-07-01#2023-09-31">2023 Q3</option>
										<option value="2023-10-01#2023-12-31">2023 Q4</option>
										<option value="2024-01-01#2024-03-31">2024 Q1</option>
										<option value="2024-04-01#2024-06-31">2024 Q2</option>
										<!-- <option value="2023-07-01#2023-09-31">2023 Q3</option>
										<option value="2023-10-01#2023-12-31">2023 Q4</option> -->
										
									</select>
								</div>
							</li>
							<li id="monthTomonthId_li" style="display: none; width: 35%;">
								<div class="dropdown" style="padding:20px;padding-right: 0px;" >
									<select name="select" multiple="multiple" id="monthTomonthId" style="width: 100% !important;text-align: center;">
										<option value="2023-01-01#2023-01-31">2023 Jan</option>
										<option value="2023-02-01#2023-02-28">2023 Feb</option>
										<option value="2023-03-01#2023-03-31">2023 March</option>
										<option value="2023-04-01#2023-04-30">2023 April</option>
										<option value="2024-05-01#2024-05-31">2023 May</option>
										<option value="2024-06-01#2024-06-30">2023 June</option>
										<option value="2023-07-01#2023-07-31">2023 July</option>
										<option value="2023-08-01#2023-08-31">2023 Aug</option>
										<option value="2023-09-01#2023-09-30">2023 Sept</option>
										<option value="2023-10-01#2023-10-31">2023 Oct</option>
										<option value="2023-11-01#2023-11-30">2023 Nov</option>
										<option value="2023-12-01#2023-12-31">2023 Dec</option>
										<option value="2024-01-01#2024-01-31">2024 Jan</option>
										<option value="2024-02-01#2024-02-28">2024 Feb</option>
										<option value="2024-03-01#2024-03-31">2024 March</option>
										<option value="2024-04-01#2024-04-30">2024 April</option>
										<option value="2024-05-01#2024-05-31">2024 May</option>
										<option value="2024-06-01#2024-06-30">2024 June</option>
										
										
										
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
   								
   							</li>
                          </ul>
                                <ul class="nav nav-tabs product-tabs border-0" >
                                    <li><a data-toggle="tab" id="gtabId1" href="#tab1" class="active" onclick="nactiStavSvetel(1)"><b>Till Date</b></a></li>
                                    <li><a data-toggle="tab" id="gtabId2" href="#tab2" onclick="nactiStavSvetel(2)"><b>Monthly</b></a></li>
                                    <li><a data-toggle="tab" id="gtabId3" href="#tab3" onclick="nactiStavSvetel(3)"><b>Quarterly</b></a></li>
                                    <li><a data-toggle="tab" id="tabId4" href="#tab4" onclick="nactiStavSvetel(4)"><b>Yearly</b></a></li>
                                </ul>
                                <div class="tab-content">
                                    <div id="tab1" class="tab-pane active">
                                        <div class="date-time">
                                            <div class="row">
                                                <div class="col-md-5">
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
                                                        <div class="tab-group-icon">Stolen Devices</div>
                                                       <p id="StolenDevices"> 0</p>
                                                       <!--  <span id="StolenDevicesP">0%</span> -->
                                                        <span></span>
                                                    </div>
                                                    <div class="tab-group">
                                                        <div class="tab-group-icon">Duplicate Devices</div>
                                                        <p id="DuplicateDevices">0</p>
                                                        <!-- <span id="DuplicateDevicesP">0%</span> -->
                                                         <span></span>
                                                    </div>
                                                    <div class="tab-group">
                                                        <div class="tab-group-icon">Black Listed Devices</div>
                                                        <p id="BlackListedDevices">0</p>
                                                        <!-- <span id="BlackListedDevicesP">0%</span> -->
                                                         <span></span>
                                                    </div>
                                                </div>
                                             </form>
                                           </div>
                                         <div class="tab-box">
                                            <form action="" class="tab-row">
                                                <div class="tab-input-row">
                                                    <div class="tab-group">
                                                        <div class="tab-group-icon">Recovered Devices</div>
                                                        <p id="RecoveredDevices">0</p>
                                                        <!-- <span id="RecoveredDevicesP">0%</span> -->
                                                         <span></span>
                                                    </div>
                                                    <div class="tab-group">
                                                        <div class="tab-group-icon">Non Tax Paid Devices</div>
                                                        <p id="NonTaxPaidDevices">0</p>
                                                        <!-- <span id="NonTaxPaidDevicesP">0%</span> -->
                                                         <span></span>
                                                    </div>
                                                   
                                                    <div class="tab-group">
                                                        <div class="tab-group-icon">Tax Paid Devices</div>
                                                        <p id="TaxPaidDevices">0</p>
                                                       <!--  <span id="TaxPaidDevicesP">0%</span> -->
                                                        <span></span>
                                                    </div>
                                          		</div>
                                             </form>
                                           </div>
                                         <div class="tab-box">
                                            <form action="" class="tab-row">
                                                <div class="tab-input-row">
                                                    
                                                    <div class="tab-group" style="width: 50% !important;">
                                                        <div class="tab-group-icon">White Listed Devices</div>
                                                       <p id="ExceptionListedDevices">0</p>
                                                        <!-- <span id="ExceptionListedDevicesP">0%</span> -->
                                                        <span></span>
                                                    </div>
                                                    <div class="tab-group"  style="width: 50% !important;">
                                                        <div class="tab-group-icon">Grey Listed Devices</div>
                                                       <p id="GreyListedDevices">0</p>
                                                        <!-- <span id="GreyListedDevicesP">0%</span> -->
                                                         <span></span>
                                                    </div>
                                                </div>
                                            </form>
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
													<div id="M_DuplicateDeviceCount" class="graph_display"></div>
                                                </div>
                                                 <div class="col-md-6 mb-16">
													<div id="M_StolenDevicesCount" class="graph_display"></div>
                                                </div>
                                                
                                                <div class="col-md-6 mb-16">
													<div id="M_BlacklistDevicesCount" class="graph_display"></div>
                                                </div>
                                                 <div class="col-md-6 mb-16">
													<div id="M_RecoveredDevicecount" class="graph_display"></div>
                                                </div>
                                                
                                                 <div class="col-md-6 mb-16">
													<div id="M_Non_TaxPaidDeviceCount" class="graph_display"></div>
                                                </div>
                                                
                                                 <!--  <div class="col-md-6 mb-16">
													<div id="M_UseraccessibilityCount" class="graph_display"></div>
                                                </div> -->
                                                
                                                <div class="col-md-6 mb-16">
													<div id="M_TaxPaidDevicesCount" class="graph_display"></div>
                                                </div>
                                                 <div class="col-md-6 mb-16">
													<div id="M_ExceptionDevicesCount" class="graph_display"></div>
                                                </div>
                                                
                                                 <div class="col-md-6 mb-16">
													<div id="M_GreylisedDeviceCount" class="graph_display"></div>
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
													<div id="Q_DuplicateDeviceCount" class="graph_display"></div>
                                                </div>
                                                 <div class="col-md-6 mb-16">
													<div id="Q_StolenDevicesCount" class="graph_display"></div>
                                                </div>
                                                
                                                <div class="col-md-6 mb-16">
													<div id="Q_BlacklistDevicesCount" class="graph_display"></div>
                                                </div>
                                                 <div class="col-md-6 mb-16">
													<div id="Q_RecoveredDevicecount" class="graph_display"></div>
                                                </div>
                                                
                                                 <div class="col-md-6 mb-16">
													<div id="Q_Non_TaxPaidDeviceCount" class="graph_display"></div>
                                                </div>
                                                
                                                  <!-- <div class="col-md-6 mb-16">
													<div id="Q_UseraccessibilityCount" class="graph_display"></div>
                                                </div> -->
                                                
                                                <div class="col-md-6 mb-16">
													<div id="Q_TaxPaidDevicesCount" class="graph_display"></div>
                                                </div>
                                                 <div class="col-md-6 mb-16">
													<div id="Q_ExceptionDevicesCount" class="graph_display"></div>
                                                </div>
                                                
                                                 <div class="col-md-6 mb-16">
													<div id="Q_GreylisedDeviceCount" class="graph_display"></div>
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
													<div id="Y_DuplicateDeviceCount" class="graph_display"></div>
                                                </div>
                                                 <div class="col-md-6 mb-16">
													<div id="Y_StolenDevicesCount" class="graph_display"></div>
                                                </div>
                                                
                                                <div class="col-md-6 mb-16">
													<div id="Y_BlacklistDevicesCount" class="graph_display"></div>
                                                </div>
                                                 <div class="col-md-6 mb-16">
													<div id="Y_RecoveredDevicecount" class="graph_display"></div>
                                                </div>
                                                
                                                 <div class="col-md-6 mb-16">
													<div id="Y_Non_TaxPaidDeviceCount" class="graph_display"></div>
                                                </div>
                                                
                                                  <!-- <div class="col-md-6 mb-16">
													<div id="Y_UseraccessibilityCount" class="graph_display"></div>
                                                </div> -->
                                                
                                                <div class="col-md-6 mb-16">
													<div id="Y_TaxPaidDevicesCount" class="graph_display"></div>
                                                </div>
                                                 <div class="col-md-6 mb-16">
													<div id="Y_ExceptionDevicesCount" class="graph_display"></div>
                                                </div>
                                                
                                                 <div class="col-md-6 mb-16">
													<div id="Y_GreylisedDeviceCount" class="graph_display"></div>
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
		src="${context}/resources/project_js/viewsGhraphDuplicateReport.js?version=<%= (int) (Math.random() * 10) %>"></script>
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
		//alert(tab);
	}
	sessionStorage.setItem("loginMsg",
			"*Session has been expired");
	window.top.location.href = "./login";
</script>
<%
	}
%>

