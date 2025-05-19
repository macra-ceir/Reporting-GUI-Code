<%@ page import="java.util.Date" %>
<%
   response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Cache-Control", "no-store");
	response.setDateHeader("Expires", 0);
	response.setHeader("Pragma", "no-cache");
	
    /*   //200 secs
	 session.setAttribute("usertype", null);  */
/* 	 session.setMaxInactiveInterval(10); */
	 int timeout = session.getMaxInactiveInterval();
	
	 long accessTime = session.getLastAccessedTime();
	 long currentTime= new Date().getTime(); 
	 long dfd= accessTime +timeout;
	 if( currentTime< dfd){
	/*  response.setHeader("Refresh", timeout + "; URL = ../login");
	 System.out.println("timeout========"+timeout); 
	if (session.getAttribute("usertype") != null) { */
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
<!--<title>Alert Management</title>-->
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
<!-- Security Tags -->
<meta name="_csrf" content="${_csrf.token}"/>
<!-- default header name is X-CSRF-TOKEN -->
<meta name="_csrf_header" content="${_csrf.headerName}"/>
<!-- Security Tags -->

<!-- Favicons-->
	<link rel="icon" type="image/x-icon" href="${context}/resources/assets/images/logo.png">
		<%-- <link href="${context}/resources/css/materialize.css" type="text/css"
	rel="stylesheet" media="screen,projection"> --%>
		<link rel="stylesheet" href="${context}/resources/assets/css/bootstrap.min.css">
		<script src="${context}/resources/assets/js/jquery.min.js"></script>
		<script src="${context}/resources/assets/js/popper.min.js"></script>
		<script src="${context}/resources/assets/js/bootstrap.min.js"></script>
		
<!-- Security Tags -->
<meta name="_csrf" content="${_csrf.token}" />
<!-- default header name is X-CSRF-TOKEN -->
<meta name="_csrf_header" content="${_csrf.headerName}" />
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
<body data-id="31"
	data-roleType="${usertype}" data-userTypeID="${usertypeId}"
	data-userID="${userid}" data-selected-roleType="${selectedUserTypeId}"
	data-stolenselected-roleType="${stolenselectedUserTypeId}"
	data-selected-consignmentTxnId="${consignmentTxnId}"
	data-selected-consignmentStatus="${consignmentStatus}"
	data-selected-username="${username}"
	session-value="en"
	session-valueTxnID="${not empty param.txnID ? param.txnID : 'null'}"
	data-session-source="${not empty param.source ? param.source : 'menu'}">

	<%-- session-value="${not empty param.NID ? param.NID : 'null'}" --%>

	<!-- START CONTENT -->
	<!-- START CONTENT -->
	<%-- <section id="content">
		<div id="initialloader"></div>

		<!--start container-->
		<div class="container">
			<div class="section">
				<div class="row">
					<div class="col s12 m12 l12">
						<div class="row card-panel">
							<div class="container-fluid pageHeader" id="pageHeader">

								<a class="boton right" id="btnLink" hidden="hidden"></a>
							</div>
							 <div class="filter-box">
							<form action="${context}/alertManagement" id="viewFilter"
								method="post">
								<div class="registrationTableDiv_box" id="alertTableDiv"
									style="padding-bottom: 5px; background-color: #e2edef52;">
									<div id="registrationTableButtonDiv"></div>
								</div>
							</form>
							</div>
							<div class="table-box">
                        <div class="table-responsive">
							<table id="alertManagementLibraryTable"
								class="table"></table>

						</div>
						<div id="footerBtn"></div></div>

					</div>
				</div>
				
			</div>
		</div>
		
	
		<!--end container-->
	</section> --%>
	<div class="content-box">
                <div class="content-container">
                    <div class="content-header" id="pageHeader">
                       <!--  <h1>Grievance Management</h1> -->
                    </div>
                    <div class="filter-box">
                        <form action="${context}/alertManagement" id="viewFilter"
								method="post" class="filter-row">
						<div id="errorMsgDiv" class="filter-form-row"></div>
       					<div id="alertTableDiv" class="filter-form-row"></div>
       					<div id="registrationTableButtonDiv" class="filter-btn-row"></div>
       						
                        </form>
                    </div>
                    <div class="table-box">
                        <div class="table-responsive">
                            <table id="alertManagementLibraryTable" class="table">
                            	<thead class="thead-dark"></thead>
                            </table>
                        </div>
                        <div id="footerBtn" class="table-paginationbox">
                        </div>
                    </div>
                </div>
            </div>
	

	
		<%-- <div id="editAlertModal" class="modal">
		<h6 class="modal-header"><spring:message code="modal.header.editAlert" /></h6>
		<div class="modal-content">
		<form action="" onsubmit="return updatedAlert()">
		<div class="row">
			<div class="row" style="margin-top: 10px;">
					<div class="input-field col s12 m6 l6">
						<input type="text" name="period" id="editAlertId"
							placeholder="Period" disabled>
						<label for="editAlertId"><spring:message code="table.alertId" /></label>
					</div>
					
					<input type="text" name="period" id="editId" placeholder="" disabled hidden="hidden">
					
					<div class="input-field col s12 m6" style="margin-top:15.5px">
						<input type="text" id="editfeature" name="feature"
							placeholder="" maxlength="20" placeholder="Status" disabled>
						<label for="editfeature"><spring:message code="table.featureName" /> </label>
					</div>
				
					<div class="input-field col s12 m6">
					<textarea id="editdescription" class="materialize-textarea" placeholder="Description" title="Please enter alphabets and numbers upto 200 characters only" maxlength="200"></textarea>
					<label for="description" class=""><spring:message code="registration.description" /><span class="star">*</span></label>

					</div>
				
					
				</div>

				

				<div class="row input_fields_wrap">
					<div class="col s12 m12 center" style="margin-top: 10px;">
					<button class="btn " type="submit"><spring:message code="button.update" /></button>
					<button class="modal-close btn" type="button" style="margin-left: 10px;"><spring:message code="button.cancel" /></button>
				</div>

				</div>
			</div>
			</form>
		</div>
	</div> --%>
	
	<div id="editAlertModal" class="modal" tabindex="-1" role="dialog">
				<div class="modal-dialog modal-lg" role="document">
					<form action="" onsubmit="return updatedAlert()">
				  <div class="modal-content">
					<div class="modal-header">
					  <h5 class="modal-title"><spring:message code="modal.header.editAlert" /></h5>
					</div>
					<div class="modal-body">
						<form>
							<div class="form-row">
							  <div class="form-group col-md-6">
								<label for="editAlertId"><spring:message code="table.alertId" /></label>
								<input type="text" name="period" class="form-control" id="editAlertId" placeholder="Period" disabled>
								<input type="text" name="period" id="editId" placeholder="" disabled hidden="hidden">
							  </div>
							  <div class="form-group col-md-6">
								<label for="editfeature"><spring:message code="table.featureName" /> </label>
								<input type="text" id="editfeature" class="form-control" name="feature" placeholder="" maxlength="20" placeholder="Status" disabled>
							  </div>
							</div>

							<div class="form-row">
								<div class="form-group col-md-6">
									<label for="editfeature"><spring:message code="table.featureName" /> </label>
									<input type="text" id="editfeature" class="form-control" name="feature" placeholder="" maxlength="20" placeholder="Status" disabled>
								</div>
							  </div>

							  <div class="form-row">
								<div class="form-group col-md-12">
									<label for="description" class=""><spring:message code="registration.description" /><span class="star">*</span></label>	
									<textarea id="editdescription" class="form-control" placeholder="Description" title="Please enter alphabets and numbers upto 200 characters only" maxlength="200"></textarea>
								</div>
							  </div>

						  </form>
					</div>
					<div class="modal-footer">
						<button class="save-product btn" type="submit"><spring:message code="button.update" /></button>
						<button class="cancel-product btn modal-close" type="button" style="margin-left: 10px;"><spring:message code="button.cancel" /></button>
					</div>
				  </div>
				</form>
				</div>
			  </div>
	
		<!-- Modal 3 start   -->

	<%-- <div id="updateAlertSuccess" class="modal">
		<h6 class="modal-header"><spring:message code="modal.header.editAlert" /></h6>
		<div class="modal-content">



			<div class="row">
				<h6 id="sucessMessage"> <spring:message code="registration.alertEditSuccessfully" /></h6>
			</div>
			<div class="row">
				<div class="input-field col s12 center">
					<a href="${context}/alertManagment" class="btn"> <spring:message code="modal.ok" /></a>
				</div>
			</div>
		</div>
	</div> --%>
	
	<div id="updateAlertSuccess" class="modal" tabindex="-1" role="dialog">
			<div class="modal-dialog" role="document">
			  <div class="modal-content">
				<div class="modal-header">
				  <h5 class="modal-title"><spring:message code="modal.header.editAlert" /></h5>
				</div>
				<div class="modal-body">
				  <p id="sucessMessage"><spring:message code="registration.alertEditSuccessfully" /></p>
				</div>
				<div class="modal-footer">
					<a href="${context}/alertManagment" class="save-product btn"> <spring:message code="modal.ok" /></a>
	
				</div>
			  </div>
			</div>
		  </div>
	
  
<!--materialize js-->
	<script type="text/javascript"
		src="${context}/resources/js/materialize.js"></script>
	<script type="text/javascript"
		src=""></script>
	<script type="text/javascript"
		src="${context}/resources/js/plugins/data-tables/js/jquery.dataTables.min.js"></script>



	<!--plugins.js - Some Specific JS codes for Plugin Settings-->
	<script
		src="${context}/resources/custom_js/bootstrap.min.js"></script>

	
	<!--custom-script.js - Add your own theme custom JS-->
	<script type="text/javascript" src="${context}/resources/js/plugins.js"></script>

	
	<!--scrollbar-->
	<script type="text/javascript"
		src="${context}/resources/js/plugins/perfect-scrollbar/perfect-scrollbar.min.js"></script>
	
	
	<!-- i18n library -->
	<script type="text/javascript"
		src="${context}/resources/project_js/CLDRPluralRuleParser.js"></script>
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
		src="${context}/resources/i18n_library/min.js"></script>
	
	
	<script type="text/javascript"
		src="${context}/resources/project_js/globalVariables.js?version=<%= (int) (Math.random() * 10) %>"></script>
	<script type="text/javascript"
		src="${context}/resources/project_js/backbutton.js"></script>
	<script type="text/javascript"
		src="${context}/resources/project_js/dragableModal.js"></script>
	<script type="text/javascript"
		src="${context}/resources/project_js/enterKey.js"></script>
	
	<script type="text/javascript"
		src="${context}/resources/project_js/alertManagement.js?version=<%= (int) (Math.random() * 10) %>"></script>
	<script type="text/javascript"
		src="${context}/resources/project_js/_dateFunction.js?version=<%= (int) (Math.random() * 10) %>" async></script>
	<script type="text/javascript"
		src="${context}/resources/ajax/keyBoardShortcut.js?version=<%= (int) (Math.random() * 10) %>"></script>	
		
			<%-- <script type="text/javascript"
		src=" ?version=<%= (int) (Math.random() * 10) %>" async></script> --%>
<%-- <script type="text/javascript">$( document ).ready(function() {if($("body").attr("data-roleType") == '' || ($("body").attr("data-roleType") != window.parent.$("body").attr("data-roleType"))){window.top.location.href = "./login?isExpired=yes";} var timeoutTime = <%=session.getLastAccessedTime()%>;var timeout = <%=session.getMaxInactiveInterval()%>;timeoutTime += timeout;var currentTime;$("body").click(function(e) {$.ajaxSetup({headers:{ 'X-CSRF-TOKEN': $("meta[name='_csrf']").attr("content") }});$.ajax({url: './serverTime',type: 'GET',async: false,success: function (data, textStatus, jqXHR) {currentTime = data;},error: function (jqXHR, textStatus, errorThrown) {}});if( currentTime > timeoutTime ){window.top.location.href = "./login?isExpired=yes";}else{timeoutTime = currentTime + timeout;}});});</script> --%>
<script type="text/javascript">var countHit="";  $( document ).ready(function() { if($("body").attr("data-roleType") == '' || ($("body").attr("data-roleType") != window.parent.$("body").attr("data-roleType"))){window.top.location.href = "./login?isExpired=yes";} var timeoutTime = <%=session.getLastAccessedTime()%>;var timeout = <%=session.getMaxInactiveInterval()%>;timeoutTime += timeout;var currentTime;
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


