featureId=30;
var lang=window.parent.$('#langlist').val() == 'km' ? 'km' : 'en';


$.i18n().locale = lang;	

$.i18n().load( {
	'en': './resources/i18n/en.json',
	'km': './resources/i18n/km.json'
} ).done( function() { 
});

$(window).load(function(){
	$('div#initialloader').fadeIn('fast');
	filter(lang);
	pageRendering();
});



function filter(lang)
{       	
	table('./headers?lang='+lang+'&type=ruleFeatureMapping','./ruleFeatureMappingListData');
}

//**************************************************filter table**********************************************

function table(url,dataUrl){
	$('div#initialloader').fadeIn('fast');
	var Feature=  $("#Feature").val() =='null' ? null : $("#Feature").val();
	var Rule= $("#Rule").val() =='null' ? null : $("#Rule").val();
	var User= $("#User").val() =='null' ? null : $("#User").val();



	var filterRequest={
			"endDate":$('#endDate').val(),
			"startDate":$('#startDate').val(),
			"featureName": Feature,
			"ruleName": Rule,
			"userType": User,
			"userId":parseInt($("body").attr("data-userID")),
			"featureId":parseInt(featureId),
			"userTypeId": parseInt($("body").attr("data-userTypeID")),
			"userName":$("body").attr("data-username"),
			"roleType":$("body").attr("data-roleType"),
			"ruleOrder":$('#actionOrder').val(),
			"graceAction":$('#actionGracePeriod').val(),
			"postGraceAction":$('#actionPostGracePeriod').val(),
			"failedRuleActionGrace":$('#actionMoveToGracePeriod').val(),
			"failedRuleActionPostGrace":$('#actionMoveToPostGracePeriod').val(),
			"output":$('#expectedOutput').val()
			}
	if(lang=='km'){
		var langFile='./resources/i18n/khmer_datatable.json';
	}
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers:
		{ 'X-CSRF-TOKEN': token }
	});
	$.ajax({
		url: url,
		/*	headers: {"Accept-Language": "en"},*/
		type: 'POST',
		dataType: "json",
		success: function(result){
			var table=	$("#table").DataTable({
				destroy:true,
				"serverSide": true,
				orderCellsTop : true,
				"ordering" : true,
				"bPaginate" : true,
				"bFilter" : false,
				"bInfo" : true,
				"bSearchable" : true,
				"oLanguage": {
					"sEmptyTable": "No records found in the system"
			    },
			    "aaSorting": [],
				columnDefs: [
					   { orderable: false, targets: -1 }
					],
				initComplete: function() {
			 		$('.dataTables_filter input')
   .off().on('keyup', function(event) {
	   if (event.keyCode === 13) {
			 table.search(this.value.trim(), false, false).draw();
		}
      
   });
   },
				ajax: {
					url : dataUrl,
					type: 'POST',
					dataType: "json",
					data : function(d) {
						d.filter = JSON.stringify(filterRequest); 

					},
					error: function (jqXHR, textStatus, errorThrown,data) {
						
						 window.parent.$('#msgDialog').text($.i18n('500ErrorMsg'));
						 // messageWindow(jqXHR['responseJSON']['message']);
						 window.parent.$('#500ErrorModal').openModal({
						 dismissible:false
						 });
						
					}
				},
				"columns": result
			});

			$('div#initialloader').delay(300).fadeOut('slow');
	
		},
		error: function (jqXHR, textStatus, errorThrown) {

		}
	});
}



function getGrace(current){
	var rule=$('#editRule').val();
	$.ajax({
		url: './gracePostgraceActionMapping?tag=PERIOD_ACTION',
		type: 'POST',
		processData: false,
		contentType: false,
		async : false,
		success: function (data, textStatus, jqXHR) {
			$('#GracePeriod,#PostGracePeriod').empty();
			
	    for (i = 0; i < data.length; i++) {
	    		$('<option>').val(data[i].interp).text(data[i].interp).appendTo('#GracePeriod,#PostGracePeriod');
	    	}
		},
		error: function (jqXHR, textStatus, errorThrown) {

		}
	});

}



function pageRendering(){
	pageButtons('./ruleFeatureMapping/pageRendering');

}


function pageButtons(Url){
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers:
		{ 'X-CSRF-TOKEN': token }
	});
	$.ajax({
		url: Url,
		type: 'POST',
		dataType: "json",
		success: function(data){
			data.userStatus == "Disable" ? $('#btnLink').addClass( "eventNone" ) : $('#btnLink').removeClass( "eventNone" );

			/*var elem='<p class="PageHeading">'+data.pageTitle+'</p>';		
			$("#pageHeader").append(elem);
			var button=data.buttonList;
			var date=data.inputTypeDateList;
			for(i=0; i<date.length; i++){
				
				if(date[i].type === "date"){
				$("#FieldTableDiv").append("<div class='input-field'>"+
						"<div id='enddatepicker' class='input-group'>"+
						"<input class='form-control datepicker' type='text' id="+date[i].id+" autocomplete='off' onchange='checkDate(startDate,endDate)'>"+
						"<label for="+date[i].id+">"+date[i].title
						+"</label>"+
						"<span	class='input-group-addon' style='color: #ff4081'>"+
						"<i	class='fa fa-calendar' aria-hidden='true' style='float: right; margin-top: -37px;'>"+"</i>"+"</span>");
				$( "#"+date[i].id ).datepicker({
					dateFormat: "yy-mm-dd",
					maxDate: new Date()
				});
			}else if(date[i].type === "text"){
				
				$("#FieldTableDiv").append("<div class='input-field' ><input type="+date[i].type+" id="+date[i].id+" maxlength="+date[i].className+" /><label for="+date[i].id+" id='orderRuleLable'  class='center-align'>"+date[i].title+"</label></div>");
			}
			else if(date[i].type === "select"){

					var dropdownDiv=
						$("#FieldTableDiv").append("<div class='selectDropdwn'>"+
								
								"<div class='select-wrapper select2  initialized'>"+
								"<span class='caret'>"+"</span>"+
								"<input type='text' class='select-dropdown' readonly='true' data-activates='select-options-1023d34c-eac1-aa22-06a1-e420fcc55868' value='Consignment Status'>"+

								"<select id="+date[i].id+" class='select2 initialized'>"+
								"<option value=''>"+date[i].title+
								"</option>"+
								"</select>"+
								"</div>"+
						"</div>");
				
				}
			}*/
			
			/*			var date=data.inputTypeDateList;
					for(i=0; i<date.length; i++){
						if(date[i].type === "date"){
							$("#FieldTableDiv").append("<div class='input-field col s6 m2'>"+
									"<div id='enddatepicker' class='input-group'>"+
									"<input class='form-control datepicker' type='text' id="+date[i].id+" autocomplete='off' onchange='checkDate(startDate,endDate)'>"+
									"<label for="+date[i].id+">"+date[i].title
									+"</label>"+
									"<span	class='input-group-addon' style='color: #ff4081'>"+
									"<i	class='fa fa-calendar' aria-hidden='true' style='float: right; margin-top: -37px;'>"+"</i>"+"</span>");
							$( "#"+date[i].id ).datepicker({
								dateFormat: "yy-mm-dd",
								 maxDate: new Date()
					        });
						}else if(date[i].type === "text"){
							$("#FieldTableDiv").append("<div class='input-field col s6 m2' ><input type="+date[i].type+" id="+date[i].id+" maxlength='19' /><label for="+date[i].id+" class='center-align'>"+date[i].title+"</label></div>");
						}

					} */

			// dynamic dropdown portion
			/*var dropdown=data.dropdownList;
			for(i=0; i<dropdown.length; i++){
				var dropdownDiv=
					$("#FieldTableDiv").append("<div class='col s6 m2 selectDropdwn'>"+

							"<div class='select-wrapper select2  initialized'>"+
							"<span class='caret'>"+"</span>"+
							"<input type='text' class='select-dropdown' readonly='true' data-activates='select-options-1023d34c-eac1-aa22-06a1-e420fcc55868' value='Consignment Status'>"+

							"<select id="+dropdown[i].id+" class='select2 initialized'>"+
							"<option value='null' selected>"+dropdown[i].title+
							"</option>"+
							"</select>"+
							"</div>"+
					"</div>");
			}*/

		/*	$("#FieldTableDiv").append("<div class='filter_btn'><button type='button' class='btn primary botton' id='submitFilter'/></div>");
			$("#FieldTableDiv").append("<div class='filter_btn'><button type='button'  class='btn primary botton' id='clearFilter'>"+$.i18n('clearFilter')+"</button></div>");
			$("#FieldTableDiv").append("<div class='filter_btn'><a href='JavaScript:void(0)' type='button' class='export-to-excel right'  onclick='exportRuleFeatureMapping()'>"+$.i18n('Export')+"<i class='fa fa-file-excel-o' aria-hidden='true'></i></a></div>");
			*/
			
			var elem='<h1>'+data.pageTitle+'<h1>';	
				$("#pageHeader").append(elem);
				var button=data.buttonList;

				var date=data.inputTypeDateList;
				for(i=0; i<date.length; i++){
					if(date[i].type === "date"){  
								$("#FieldTableDiv").append("<div class='form-group'>"+
								"<label for="+date[i].id+">"+date[i].title+"</label>"+
									"<input class='form-control text-uppercase' type='date' onchange='checkDate(startDate,endDate)' id="+date[i].id+" autocomplete='off'>"
									);
								}
					else if(date[i].type === "text"){
						//$("#registrationTableDiv").append("<div class='input-field' ><input type="+date[i].type+" id="+date[i].id+" maxlength='60' /><label for="+date[i].id+" class='center-align'>"+date[i].title+"</label></div>");
						$("#FieldTableDiv").append("<div class='form-group'><label for="+date[i].id+" class='center-align'>"+date[i].title+"</label><input type="+date[i].type+" class='form-control' id="+date[i].id+" placeholder='Enter here' maxlength='19'/></div>");
						
					}
				
					// dynamic dropdown portion
					
				} 
				var dropdown=data.dropdownList;
					for(i=0; i<dropdown.length; i++){
						var dropdownDiv=
							$("#FieldTableDiv").append(
										"<div class='form-group'>"+
										//"<input type='text' class='select-dropdown' readonly='true' data-activates='select-options-1023d34c-eac1-aa22-06a1-e420fcc55868' value='Consignment Status'>"+
										"<label for="+dropdown[i].id+">"+dropdown[i].title+"</label>"+
										"<select id="+dropdown[i].id+"  class='form-control'>"+
										"<option value='null' selected>"+dropdown[i].title+
										"</option>"+
										"</select>"+
										"</div>"+
								"</div>");
					}
				
				var viewFilter="viewFilter";
				$("#registrationTableButtonDiv").append("<div class='form-group'><button type='button' class='btn btn-light' id='clearFilter'>"+$.i18n('clearFilter')+"</button></div>");
				$("#registrationTableButtonDiv").append("<div class='form-group'><button type='button' class='btn btn-primary' id='submitFilter'><img src='./resources/assets/images/filter-icon.svg' alt='icon' class='img-fluid ml-1'></button></div>");
				$("#registrationTableButtonDiv").append("<div class='form-group'><button type='button' class='btn btn-outline-dark' onclick='exportRuleFeatureMapping()'>"+$.i18n('Export')+"<img src='./resources/assets/images/download-icon.svg' alt='icon' class='img-fluid ml-1'></button>");

			
			$('#clearFilter').attr("onclick", "filterResetFeatureMapping('viewfilter')");	
			for(i=0; i<button.length; i++){
				$('#'+button[i].id).text(button[i].buttonTitle);
				if(button[i].type === "HeaderButton"){
					$('#'+button[i].id).attr("href", button[i].buttonURL);
				}
				else{
					$('#'+button[i].id).attr("onclick", button[i].buttonURL);
				}
			}


			$.getJSON('./getDistinctFeatureList', function(data) {
				for (i = 0; i < data.length; i++) {
					$('<option>').val(data[i]).text(data[i]).appendTo('#Feature');
				}
			});
			var token = $("meta[name='_csrf']").attr("content");
			var header = $("meta[name='_csrf_header']").attr("content");
			$.ajaxSetup({
				headers:
				{ 'X-CSRF-TOKEN': token }
			});
			
			
			$.getJSON('./getDistinctUserTypeList', function(data) {
				for (i = 0; i < data.length; i++) {
					$('<option>').val(data[i]).text(data[i])
					.appendTo('#User,#editUser');
				}
			});
			
			$.getJSON('./ruleName', function(data) {
				for (i = 0; i < data.length; i++) {
					$('<option>').val(data[i].name).text(data[i].name)
					.appendTo('#Rule,#editRule');
				}
			});

			$.getJSON('./getDropdownList/PERIOD_ACTION', function(data) {
				for (i = 0; i < data.length; i++) {
					$('<option>').val(data[i].interp).text(data[i].interp)
					.appendTo('#actionGracePeriod,#actionPostGracePeriod');
				}
			});


			$.getJSON('./getDropdownList/MOVE_TO_NEXT', function(data) {
				for (i = 0; i < data.length; i++) {
					$('<option>').val(data[i].interp).text(data[i].interp)
					.appendTo('#MoveToGracePeriod,#MoveToPostGracePeriod,#actionMoveToGracePeriod,#actionMoveToPostGracePeriod');
				}
			});
			
			$.getJSON('./getDropdownList/expected_Output', function(data) {
				for (i = 0; i < data.length; i++) {
					$('<option>').val(data[i].interp).text(data[i].interp)
					.appendTo('#expectedOutput');
				}
			});



		}
	}); 



}




function getDetailBy(id){

	window.xid=id;
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	var formData= new FormData();
	var request ={
			"userType": $("body").attr("data-roleType"),
			"userId":parseInt($("body").attr("data-userID")),
			"featureId":parseInt(featureId),
			"userTypeId": parseInt($("body").attr("data-userTypeID")),
			"userName":$("body").attr("data-username"),
			"roleType":$("body").attr("data-roleType"),
		}
	formData.append("request",JSON.stringify(request));
	$.ajaxSetup({
		headers:
		{ 'X-CSRF-TOKEN': token }
	});
	$.ajax({
		url : "./getBy/"+id,
		//data : formData,
		dataType : 'json',
		processData: false,
		contentType: false,
		type : 'GET',
		success : function(data) {
			var result=JSON.stringify(data);
			$("#editModel").openModal({
				dismissible:false
			});

			setData(JSON.parse(result));
		},
		error : function() {
			//alert("Failed");
		}
	});	
}


function setData(result){
	
	$("label[class='center-align']").addClass('active');
	$("#orderRuleLable").removeClass('active');
	$("#editRule").val(result.name).change();
	
	$("#editUser").val(result.userType);
	$("#order").val(result.ruleOrder);
	
	$("#PostGracePeriod").val(result.postGraceAction);
	$("#MoveToGracePeriod").val(result.failedRuleActionGrace);
	$("#MoveToPostGracePeriod").val(result.failedRuleActionPostGrace);
	$("#editOutput").val(result.output);
	result.modifiedBy =="" || result.modifiedBy==null ?  $("#editModifiedBy").val('NA'): $("#editModifiedBy").val(result.modifiedBy);
	
	
	var rule=$('#editRule').val();
	var feature=$('#editFeature').val();
	$.ajax({
		url: './ruleFeatureActionMapping?&ruleName='+rule+'&featureName='+feature,
		type: 'POST',
		processData: false,
		contentType: false,
		async : false,
		success: function (data, textStatus, jqXHR) {
			$('#GracePeriod,#PostGracePeriod').empty();
			
	    for (i = 0; i < data.length; i++) {
	    		$('<option>').val(data[i].actions).text(data[i].actions).appendTo('#GracePeriod,#PostGracePeriod');
	    	}
	    
		},
		error: function (jqXHR, textStatus, errorThrown) {

		}
	});

	$.ajax({
		url: './getFeatureName?ruleName='+rule,
		type: 'POST',
		processData: false,
		contentType: false,
		async : false,
		success: function (data, textStatus, jqXHR) {

			$('#editFeature').empty();
			var html='<option value="">Feature Name</option>';
			$('#editFeature').append(html);
	    	for (i = 0; i < data.length; i++) {
	    		//$('<option>').val(data[i]).text(data[i]).appendTo('#editFeature');
	    		$('<option>').val(data[i].feature).text(data[i].feature).appendTo('#editFeature');
	    		
	    	}
			
	    	$("#editFeature").val(result.feature).change();
		
		},
		error: function (jqXHR, textStatus, errorThrown) {

		}
	});
	$("#GracePeriod").val(result.graceAction).change();
}








function update(){

	var name=$('#editName').val();
	var description=$('#editDescription').val();
	var state=$('#editState').val();

	var newRule={
			"failedRuleActionGrace": $("#MoveToGracePeriod").val(),
			"failedRuleActionPostGrace": $("#MoveToPostGracePeriod").val(),
			"feature": $("#editFeature").val(),
			"graceAction": $("#GracePeriod").val(),
			"id": parseInt(window.xid),
			"name": $("#editRule").val(),
			"postGraceAction": $("#PostGracePeriod").val(),
			"ruleOrder":parseInt($("#order").val()),
			"userType": $("#editUser").val(),
			"output":  $("#editOutput").val(),
			"userId":parseInt($("body").attr("data-userID")),
			"featureId":parseInt(featureId),
			"userTypeId": parseInt($("body").attr("data-userTypeID")),
			"userName":$("body").attr("data-username"),
			"roleType":$("body").attr("data-roleType"),
			"existOrNot":"no",
			"modifiedBy":$("body").attr("data-username")
	}	
	// Put the object into storage
    sessionStorage.setItem('newRule', JSON.stringify(newRule));
    
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers:
		{ 'X-CSRF-TOKEN': token }
	});
	$.ajax({

		url : "./updateRuleMapping",
		data : JSON.stringify(newRule),
		dataType : 'json',
		contentType : 'application/json; charset=utf-8',
		type : 'POST',
		success: function (data, textStatus, jqXHR) {
			if(data.errorCode == 0){
			$('#editModel').closeModal();
			$("#updateFieldsSuccess").openModal({
				dismissible:false
			});
			sessionStorage.removeItem('newRule');
			}
			 
			else if(data.errorCode == 401 || data.errorCode == 402 || data.errorCode == 403 || data.errorCode == 404 ){
				//messageWindow(data.message);
				
				$("#updateModalAllowed").openModal({
					dismissible:false
				});
				$("#updateRuleOrderButton").prop('disabled', true);
				$('#updateMessageIDNotAllowed').text('');
				$('#updateMessageIDNotAllowed').text($.i18n(data.message));
			}
			 

		},
		error: function (jqXHR, textStatus, errorThrown) {

		}
	});

	return false;
}



function DeleteByID(id){
	window.id=id;

	$("#DeleteFieldModal").openModal({
		dismissible:false
	});

}
function deleteModal(){
	var newRule ={
			"id" : parseInt(window.id),
			"userId":parseInt($("body").attr("data-userID")),
			"featureId":parseInt(featureId),
			"userTypeId": parseInt($("body").attr("data-userTypeID")),
			"userName":$("body").attr("data-username"),
			"roleType":$("body").attr("data-roleType")
	}
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers:
		{ 'X-CSRF-TOKEN': token }
	});
	$.ajax({
		url : "./deleteRuleMapping",
		data : JSON.stringify(newRule),
		dataType : 'json',
		contentType : 'application/json; charset=utf-8',
		type : 'POST',
		success : function(data, textStatus, xhr) {
			$("#DeleteFieldModal").closeModal();
			$("#closeDeleteModal").openModal({
				dismissible:false
			});
		},
		error : function() {

		}
	});


	return false;


}













function getFeature(current){

	$.ajax({
		url: './getFeatureName?ruleName='+current.value,
		type: 'POST',
		processData: false,
		contentType: false,
		async : false,
		success: function (data, textStatus, jqXHR) {
			$('#editFeature').empty();
			var html='<option value="">Feature Name</option>';
			$('#editFeature').append(html);
	    	for (i = 0; i < data.length; i++) {
	    		$('<option>').val(data[i].feature).text(data[i].feature).appendTo('#editFeature');
               
	    		//$('<option>').val(data[i]).text(data[i]).appendTo('#editFeature');
	    	}
			
		
		
		},
		error: function (jqXHR, textStatus, errorThrown) {

		}
	});

}

function exportRuleFeatureMapping(){
	var table = $('#table').DataTable();
	var info = table.page.info(); 
	var pageNo=info.page;
	var pageSize =info.length;
	
	var Feature=  $("#Feature").val() =='null' ? null : $("#Feature").val();
	var Rule= $("#Rule").val() =='null' ? null : $("#Rule").val();
	var User= $("#User").val() =='null' ? null : $("#User").val();
	
	if($('#User').val()=='null'){
		var filterRequest={
				"endDate":$('#endDate').val(),
				"startDate":$('#startDate').val(),
				"featureName": Feature,
				"ruleName": Rule,
				"userId":parseInt($("body").attr("data-userID")),
				"featureId":parseInt(featureId),
				"userTypeId": parseInt($("body").attr("data-userTypeID")),
				"userName":$("body").attr("data-username"),
				"roleType":$("body").attr("data-roleType"),
				"pageNo":parseInt(pageNo),
				"pageSize":parseInt(pageSize),
				"ruleOrder":$('#actionOrder').val(),
				"graceAction":$('#actionGracePeriod').val(),
				"postGraceAction":$('#actionPostGracePeriod').val(),
				"failedRuleActionGrace":$('#actionMoveToGracePeriod').val(),
				"failedRuleActionPostGrace":$('#actionMoveToPostGracePeriod').val(),
				"output":$('#expectedOutput').val()
		}
	}else{
		var filterRequest={
				"endDate":$('#endDate').val(),
				"startDate":$('#startDate').val(),
				"featureName": Feature,
				"ruleName": Rule,
				"userType": User,
				"userId":parseInt($("body").attr("data-userID")),
				"featureId":parseInt(featureId),
				"userTypeId": parseInt($("body").attr("data-userTypeID")),
				"userName":$("body").attr("data-username"),
				"roleType":$("body").attr("data-roleType"),
				"pageNo":parseInt(pageNo),
				"pageSize":parseInt(pageSize),
				"ruleOrder":$('#actionOrder').val(),
				"graceAction":$('#actionGracePeriod').val(),
				"postGraceAction":$('#actionPostGracePeriod').val(),
				"failedRuleActionGrace":$('#actionMoveToGracePeriod').val(),
				"failedRuleActionPostGrace":$('#actionMoveToPostGracePeriod').val(),
				"output":$('#expectedOutput').val()
				
		}
	}

	
	
	//console.log(JSON.stringify(filterRequest))
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers:
		{ 'X-CSRF-TOKEN': token }
	});
	
	$.ajax({
		url: './exportRuleFeatureMapping',
		type: 'POST',
		dataType : 'json',
		contentType : 'application/json; charset=utf-8',
		data : JSON.stringify(filterRequest),
		success: function (data, textStatus, jqXHR) {
			  window.location.href = data.url;

		},
		error: function (jqXHR, textStatus, errorThrown) {
			
		}
	});
	
}





function viewDetailBy(id){

	window.xid=id;
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers:
		{ 'X-CSRF-TOKEN': token }
	});
	var formData= new FormData();
	var request ={
			"userType": $("body").attr("data-roleType"),
			"userId":parseInt($("body").attr("data-userID")),
			"featureId":parseInt(featureId),
			"userTypeId": parseInt($("body").attr("data-userTypeID")),
			"userName":$("body").attr("data-username"),
			"roleType":$("body").attr("data-roleType"),
		}
	formData.append("request",JSON.stringify(request));
	$.ajax({
		url : "./getBy/"+id,
		//data : formData,
		dataType : 'json',
		processData: false,
		contentType: false,
		type : 'GET',
		async:false,
		success : function(data) {
			var result=JSON.stringify(data);
			$("#viewModel").openModal({
				dismissible:false
			});
			
			setData_view(JSON.parse(result));
		},
		error : function() {
			//alert("Failed");
		}
	});	
}


function setData_view(result){

	$("label[class='center-align']").addClass('active');
	$("#orderRuleLable").removeClass('active');
	//$("label").addClass('active');
	$("#viewRule").val(result.name);
	$("#viewFeature").val(result.feature)
	$("#viewUser").val(result.userType);
	$("#vieworder").val(result.ruleOrder);	
	$("#viewGracePeriod").val(result.graceAction);
	$("#viewPostGracePeriod").val(result.postGraceAction);
	$("#viewMoveToGracePeriod").val(result.failedRuleActionGrace);
	$("#viewMoveToPostGracePeriod").val(result.failedRuleActionPostGrace);
	$("#viewOutput").val(result.output);
	result.modifiedBy =="" || result.modifiedBy==null ?  $("#viewModifiedBy").val('NA'): $("#viewModifiedBy").val(result.modifiedBy);
	
}


function filterResetFeatureMapping(formID){
	$('#'+formID).trigger('reset');
	$("label").removeClass('active');
	filter(lang);
}


function confirmRuleUpdate(){
	
	var saveRequest=sessionStorage.getItem('newRule');
	
	saveRequest =JSON.parse(saveRequest);
	saveRequest['existOrNot'] = 'yes';
	  
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers:
		{ 'X-CSRF-TOKEN': token }
	});
	$.ajax({

		url : "./updateRuleMapping",
		data :  JSON.stringify(saveRequest),
		dataType : 'json',
		contentType : 'application/json; charset=utf-8',
		type : 'POST',
		success: function (data, textStatus, jqXHR) {
			if(data.errorCode == 0){
			//if(data.errorCode == null){
		 
			$("#updateFieldsSuccess").openModal({
				dismissible:false
			});
			sessionStorage.removeItem('newRule');
			
			}	
			if(data.errorCode == 409){
				//messageWindow(data.message);
				
				$("#updateModal").openModal({
					dismissible:false
				});
				$('#updateMessageID').text($.i18n(data.tag));
			}
			/*else if(data.errorCode == 401 || data.errorCode == 402 || data.errorCode == 403 || data.errorCode == 404){
				//messageWindow(data.message);
				
			
				$("#updateModal").openModal({
					dismissible:false
				});
				
				$("#updateRuleOrderButton").prop('disabled', true);
				$('#updateMessageID').text($.i18n(data.message));
			}*/
			else if(data.errorCode == 401 || data.errorCode == 402 || data.errorCode == 403 || data.errorCode == 404 ){
				//messageWindow(data.message);
				
				$("#updateModal").openModal({
					dismissible:false
				});
				$("#updateRuleOrderButton").prop('disabled', true);
				$('#updateMessageIDNotAllowed').text('');
				$('#updateMessageIDNotAllowed').text($.i18n(data.message));
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {

		}
	});
}

function closeRuleUpdateOrder(){
	sessionStorage.removeItem('newRule');
	$("#updateRuleOrderButton").prop('disabled', false);
}

function getFeaturedUserType(featureID){
	var featureName=$('#'+featureID).val();
	$.ajax({
		url: './getFeaturedUserType?featureName='+featureName+'&name='+$('#editRule').val(),
		type: 'POST',
		processData: false,
		contentType: false,
		async : false,
		success: function (data, textStatus, jqXHR) {
			$('#editUser').empty();
		 for (i = 0; i < data.length; i++) {
	    		$('<option>').val(data[i].userType).text(data[i].userType).appendTo('#editUser');
	    	}
		},
		error: function (jqXHR, textStatus, errorThrown) {

		}
	});
}