//  NA-0;Till Date-1;Daily-2;Monthly-3;Yearly-4;Quarterly-5
var featureId = 74;
var roleType = $("body").attr("data-roleType");
var userId = $("body").attr("data-userID");
var currentRoleType = $("body").attr("data-selected-roleType"); 
var startdate=$('#startDate').val(); 
var endDate=$('#endDate').val();
var lang=window.parent.$('#langlist').val() == 'km' ? 'km' : 'en';
/*$(document).ready(function(){
	$('div#initialloader').fadeIn('fast');
	VIPLISTDatatable();
	pageRendering();
	
});*/
var topValues=parseInt("5");
var startDate="2021-01-01";
var endDate="2024-03-30";
var role = currentRoleType == null ? roleType : currentRoleType;

 $(document).ready(function () {
      $("#refresh_select_date").on('click', function () { 
		 var resp;
    	 var data1=  $('#monthTomonthId').val()+'';	
    	 var data=  data1.split(",");
    	 $.each(data, function( index, value ) {
			resp += "{'startDate': '"+value.split("#")[0]+"', 'endDate': '"+value.split("#")[1]+"'},";
		});
		var response = resp.substring(0, resp.length - 1);
          alert(response); 
      }); 
      
      $("#refresh_select_date_qtr3").on('click', function () { 
    	 var data1=  $('#qtyToqtyId').val()+'';		
    	 var data=  data1.split(",");
    	 
        $.each(data, function( index, value ) {
	
			resp += "{'startDate': '"+value.split("#")[0]+"', 'endDate': '"+value.split("#")[1]+"'},";
		});
		
		var response = resp.substring(0, resp.length - 1);
		 alert(response); 
      }); 
      
      $("#refresh_select_date_yrs4").on('click', function () { 
    	 var data1=  $('#yearToyearId').val()+'';		
    	  var data=  data1.split(",");
           $.each(data, function( index, value ) {
				resp += "{'startDate': '"+value.split("#")[0]+"', 'endDate': '"+value.split("#")[1]+"'},";
			});
		
			var response = resp.substring(0, resp.length - 1);
		 	alert(response); 
      }); 
      
      $("#refresh_select_date_m6").on('click', function () { 
    	  	var resp;
    	 	var data1=  $('#monthTomonthId').val()+'';	
    	 	var data=  data1.split(",");
    	 	$.each(data, function( index, value ) {
				resp += "{'startDate': '"+value.split("#")[0]+"', 'endDate': '"+value.split("#")[1]+"'},";
			});
			var response = resp.substring(0, resp.length - 1);
          	alert(response); 
      }); 
      
      $("#refresh_select_date_qtr7").on('click', function () { 
    	  	var data1=  $('#qtyToqtyId').val()+'';		
    	 	var data=  data1.split(",");
	        $.each(data, function( index, value ) {
				resp += "{'startDate': '"+value.split("#")[0]+"', 'endDate': '"+value.split("#")[1]+"'},";
			});
			var response = resp.substring(0, resp.length - 1);
			 alert(response);  
      }); 
      
      $("#refresh_select_date_yrs8").on('click', function () { 
    	 var data1=  $('#yearToyearId').val()+'';		
    	  var data=  data1.split(",");
           $.each(data, function( index, value ) {
				resp += "{'startDate': '"+value.split("#")[0]+"', 'endDate': '"+value.split("#")[1]+"'},";
			});
		
			var response = resp.substring(0, resp.length - 1);
		 	alert(response);  
      }); 
      
 }); 


$(document).ready(function(){
	

	
  $('#whatIstopID').on('change', function() {
	var id = $('#whatIstopID').find(":selected").val();
	topValues=parseInt(id);
	
	/*var dateDump=($('#datePick').val()).split(",");
	alert(dateDump);
	let length = dateDump.length;
	=
	var data_status=length % 2;
	
	alert(data_status);
	if(data_status=0){
		alert("Sahi h");
		$.each(dateDump, function( index, value ) {
			
  			alert( index + ": " + value );
		});
	}else{
		alert("Wrong h");
	}
	
	*/
	//alert(date);
	//{"startDate": startDate, "endDate": endDate}
	
    ajaxCallDashboard();
    tillDateInvalidCountByReason();
	tillDateImeiCountValid_invalid();
	tillDateReasonForInvalidImei();
	inValidImeiCountWithPerChange();
	validImeiCountWithPerChange();
	DeviceTypeTillDate(); 
	TopOSwithPercentage();
	deviceTypeOSTillDate("Android");
	TopMarketingNamewithPercentage();
	SupportingTechnologywithPercentage();
	ImeiCountbyOperator();
	tillDateTopOs();
	TopBrandNameTillDate();
	topmodelnameTillDate();
	deviceTypeLikeSmartphoneTillDate('Mobile Phone/Feature phone');
	
	Top5BrandsForSeatelTillDate('Seatel');
	Top5ModelsForSeatelTillDate('Seatel');
	TopDeviceTypeForSeatelTillDate('Seatel');
	TopOSForSeatelwithPercentage('Seatel');
	TopMarketingNameForSeatelwithPercentage('Seatel');
	Top4SupportingTechnologywithPercentage('Seatel');
	
    MonthlyReportsData();
    YearlyReportsData();
    QuarterlyReportsData();
    MonthlyOperatorWiseReportsData();
	YearlyOperatorWiseReportsData();	
	QuarterlyOperatorWiseReportsData();
   	 
  });
});

$(document).ready(function () {
    console.log("ready!");
    $('#gtabId1').click(function() {
		//alert("tab1");
		$("#refresh_select_date").css("display","none");
		$("#whatIstopID_li").css("display","block");
		$("#yearToyearId_li").css("display","none");
		$("#qtyToqtyId_li").css("display","none");
		$("#monthTomonthId_li").css("display","none");
	});
	$('#gtabId2').click(function() {
		/*$("#whatIstopID").css("display","none");
    	$("#yearToyearId").css("display","none");
		$("#qtyToqtyId").css("display","none");
		$("#monthTomonthId").css("display","block");
		
		*/
		$("#refresh_select_date").css("display","block");
		$("#refresh_select_date_qtr3").css("display","none");
		$("#refresh_select_date_yrs4").css("display","none");
		$("#refresh_select_date_m6").css("display","none");
		$("#refresh_select_date_qtr7").css("display","none");
		$("#refresh_select_date_yrs8").css("display","none");

		$("#whatIstopID_li").css("display","none");
    	$("#yearToyearId_li").css("display","none");
		$("#qtyToqtyId_li").css("display","none");
		$("#monthTomonthId_li").css("display","block");
		
		
		/*$("#whatIstopID_li").hide();
    	$("#yearToyearId_li").hide();
		$("#qtyToqtyId_li").hide();
		$("#monthTomonthId_li").show();*/
		
	});
	$('#gtabId3').click(function() {
		
		$("#refresh_select_date").css("display","none");
		$("#refresh_select_date_qtr3").css("display","block");
		$("#refresh_select_date_yrs4").css("display","none");
		$("#refresh_select_date_m6").css("display","none");
		$("#refresh_select_date_qtr7").css("display","none");
		$("#refresh_select_date_yrs8").css("display","none");
		
		$("#whatIstopID_li").css("display","none");
    	$("#yearToyearId_li").css("display","none");
		$("#qtyToqtyId_li").css("display","block");
		$("#monthTomonthId_li").css("display","none");
	});
	$('#gtabId4').click(function() {
		
		$("#refresh_select_date").css("display","none");
		$("#refresh_select_date_qtr3").css("display","none");
		$("#refresh_select_date_yrs4").css("display","block");
		$("#refresh_select_date_m6").css("display","none");
		$("#refresh_select_date_qtr7").css("display","none");
		$("#refresh_select_date_yrs8").css("display","none");
		
		$("#whatIstopID_li").css("display","none");
    	$("#yearToyearId_li").css("display","block");
		$("#qtyToqtyId_li").css("display","none");
		$("#monthTomonthId_li").css("display","none");
	});
	$('#gtabId6').click(function() {
		$("#refresh_select_date").css("display","none");
		$("#refresh_select_date_qtr3").css("display","none");
		$("#refresh_select_date_yrs4").css("display","none");
		$("#refresh_select_date_m6").css("display","block");
		$("#refresh_select_date_qtr7").css("display","none");
		$("#refresh_select_date_yrs8").css("display","none");
		
		
    	$("#whatIstopID_li").css("display","none");
    	$("#yearToyearId_li").css("display","none");
		$("#qtyToqtyId_li").css("display","none");
		$("#monthTomonthId_li").css("display","block");
	});
	$('#gtabId7').click(function() {
		$("#refresh_select_date").css("display","none");
		$("#refresh_select_date_qtr3").css("display","none");
		$("#refresh_select_date_yrs4").css("display","none");
		$("#refresh_select_date_m6").css("display","none");
		$("#refresh_select_date_qtr7").css("display","block");
		$("#refresh_select_date_yrs8").css("display","none");
		
    	$("#whatIstopID_li").css("display","none");
    	$("#yearToyearId_li").css("display","none");
		$("#qtyToqtyId_li").css("display","block");
		$("#monthTomonthId_li").css("display","none");
	});
	$('#gtabId8').click(function() {
		$("#refresh_select_date").css("display","none");
		$("#refresh_select_date_qtr3").css("display","none");
		$("#refresh_select_date_yrs4").css("display","none");
		$("#refresh_select_date_m6").css("display","none");
		$("#refresh_select_date_qtr7").css("display","none");
		$("#refresh_select_date_yrs8").css("display","block");
		
    	$("#whatIstopID_li").css("display","none");
    	$("#yearToyearId_li").css("display","block");
		$("#qtyToqtyId_li").css("display","none");
		$("#monthTomonthId_li").css("display","none");
	});
	
    ajaxCallDashboard();
    tillDateInvalidCountByReason();
	tillDateImeiCountValid_invalid();
	tillDateReasonForInvalidImei();
	inValidImeiCountWithPerChange();
	validImeiCountWithPerChange();
	DeviceTypeTillDate(); 
	TopOSwithPercentage();
	deviceTypeOSTillDate("Android");
	TopMarketingNamewithPercentage();
	SupportingTechnologywithPercentage();
	ImeiCountbyOperator();
	tillDateTopOs();
	TopBrandNameTillDate();
	topmodelnameTillDate();
	deviceTypeLikeSmartphoneTillDate('Mobile Phone/Feature phone');
	
	Top5BrandsForSeatelTillDate('Seatel');
	Top5ModelsForSeatelTillDate('Seatel');
	TopDeviceTypeForSeatelTillDate('Seatel');
	TopOSForSeatelwithPercentage('Seatel');
	TopMarketingNameForSeatelwithPercentage('Seatel');
	Top4SupportingTechnologywithPercentage('Seatel');
	
    MonthlyReportsData();
    YearlyReportsData();
    QuarterlyReportsData();
    MonthlyOperatorWiseReportsData();
	YearlyOperatorWiseReportsData();	
	QuarterlyOperatorWiseReportsData();
});

function MonthlyReportsData(){
	MonthlyTopMarketingName();
	MonthlyTopBrandName();
	MonthlyTopModelName();
	MonthlyTopDeviceType();
	MonthlyTopSupportingTech();
}
function YearlyReportsData(){
	YearlyTopMarketingName();
	YearlyTopBrandName();
	YearlyTopModelName();
	YearlyTopDeviceType();
	YearlyTopSupportingTech();
}
function QuarterlyReportsData(){
	QuarterlyTopMarketingName();
	QuarterlyTopBrandName();
	QuarterlyTopModelName();
	QuarterlyTopDeviceType();
	QuarterlyTopSupportingTech();
}


function MonthlyOperatorWiseReportsData(){
	MonthlyOperatorWise(); 
	InValidMonthlyOperatorWise();
	ValidMonthlyMobileOperatorWise();
	InValidMonthlyMobileOperatorWise();
}
function YearlyOperatorWiseReportsData(){
	QtrOperatorWise();
	InValidQtrOperatorWise();
	ValidQtrMobileOperatorWise();
	InValidQtrMobileOperatorWise();
}
function QuarterlyOperatorWiseReportsData(){
	yearlyOperatorWise();
	InValidyearlyOperatorWise();
	ValidyearlyMobileOperatorWise();
	InValidyearlyMobileOperatorWise();
}

function getYear(year){
	var data;
	var year=year.split(",");
	for (let i = 0; i < year.length; i++) {
		data += "{'startDate': '"+year[i]+"-01-01', 'endDate': '"+year[i]+"-12-31'},";
	}
	var response = data.substring(0, data.length - 1);
	return response;
}


function getQtyToQty(Qty){
	var data;
	var year=Qty.split(",");
	for (let i = 0; i < year.length; i++) {
		data += "{'startDate': '"+year[i]+"-01-01', 'endDate': '"+year[i]+"-12-31'},";
	}
	var response = data.substring(0, data.length - 1);
	return response;
}

function tillDateReasonForInvalidImei() {
    var request = {
        "reportnameId": 96,
        "typeFlag": 1,
        "top": topValues
        /*"dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "tillDateReasonForInvalidImei";
    ajaxCall(request, containerName);
}
function validImeiCountWithPerChange() {
    var request = {
        "reportnameId": 97,
        "typeFlag": 3,
        "top": topValues
        /*"dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "validImeiCountWithPerChange";
    ajaxCall(request, containerName);
}
function inValidImeiCountWithPerChange() {
    var request = {
        "reportnameId": 98,
        "typeFlag": 3,
        "top": topValues
       /* "dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "inValidImeiCountWithPerChange";
    ajaxCall(request, containerName);
}
function tillDateImeiCountValid_invalid() {
    var request = {
        "reportnameId": 99,
        "typeFlag": 1,
        "top": topValues
        /*"dateRange": [
            {"startDate": "2022-01-01", "endDate": "2024-03-30"}
        ]*/
    };
    var containerName = "tillDateImeiCountValid_invalid";
    ajaxCall(request, containerName);
}

function tillDateInvalidCountByReason() {
    var request = {
        "reportnameId": 100,
        "typeFlag": 1,
        "top": topValues
        /*"dateRange": [
            {"startDate": "2022-01-01", "endDate": "2024-03-30"}
        ]*/
    };
    var containerName = "tillDateInvalidCountByReason";
    ajaxCall(request, containerName);
}
function tillDateTopOs() {
    var request = {
        "reportnameId": 104,
        "typeFlag": 1,
        "top": topValues
       /* "dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "tillDateTopOs";
    ajaxCall(request, containerName);
}

function DeviceTypeTillDate() {
    var request = {
        "reportnameId": 107,
        "typeFlag": 1,
        "top": topValues
        /*"dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "DeviceTypeTillDate";
    ajaxCall(request, containerName);
}
function TopOSwithPercentage() {
    var request = {
        "reportnameId": 108,
        "typeFlag": 1,
        "top": topValues
        /*"dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "TopOSwithPercentage";
    ajaxCall(request, containerName);
}

function TopMarketingNamewithPercentage() {
    var request = {
        "reportnameId": 109,
        "typeFlag": 1,
        "top": topValues
        /*"dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "topMarketingNamewithPercentage109";
    ajaxCall(request, containerName);
}
function SupportingTechnologywithPercentage() {
    var request = {
        "reportnameId": 110,
        "typeFlag": 1,
        "top": topValues
        /*"dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "supportingTechnologywithPercentage110";
    ajaxCall(request, containerName);
}
function ImeiCountbyOperator() {
    var request = {
        "reportnameId": 111,
        "typeFlag": 1,
        "top": topValues
        /*"dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "ImeiCountbyOperator";
    ajaxCall(request, containerName);
}


function Top5BrandsForSeatelTillDate(operator)
{
	$("#Top5Brands_heading").html("Top 5 Brands for "+operator+" Till Date");
	 var request = {
        "reportnameId": 105,
        "typeFlag": 1,
        "top": topValues,
  		"searchString": " mobile_operator ='"+operator+"'"
  		/*"dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "Top5Brands";
    ajaxCall(request, containerName);
}
function Top5ModelsForSeatelTillDate(operator)
{
	$("#Top5Models_heading").html("Top 5 Models for "+operator+" Till Date");
	 var request = {
    "reportnameId": 106,
    "typeFlag": 1,
    "top": topValues,  
	"searchString": " mobile_operator ='"+operator+"'"
	/*"dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "Top5Models";
    ajaxCall(request, containerName);
}


function TopDeviceTypeForSeatelTillDate(operator)
{
	$("#Top5DeviceType_heading").html("Top 5 Device Type for "+operator+" Till Date");
	 var request = {
        "reportnameId": 107,
        "typeFlag": 1,
        "top": topValues,
  		"searchString": " mobile_operator ='"+operator+"'"
  		/*"dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "Top5DeviceType";
    ajaxCall(request, containerName);
}
function TopOSForSeatelwithPercentage(operator)
{
	$("#Top5OS_heading").html("Top 5 OS for "+operator+" Till Date");
	 var request = {
    "reportnameId": 108,
    "typeFlag": 1,
    "top": topValues,  
	"searchString": " mobile_operator ='"+operator+"'"
	/*"dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "Top5OS";
    ajaxCall(request, containerName);
}
 
function TopMarketingNameForSeatelwithPercentage(operator)
{
	$("#Top5MarketingName_heading").html("Top 5 Marketing Name for "+operator+" Till Date");
     var request = {
    "reportnameId": 109,
    "typeFlag": 1,
    "top": topValues,  
	"searchString": " mobile_operator ='"+operator+"'"
	/*"dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "Top5MarketingName";
    ajaxCall(request, containerName);
}
 
function Top4SupportingTechnologywithPercentage(operator)
{
	$("#Top5SupportedTechnologies_heading").html("Top 5 Supported Technologies Name for "+operator+" Till Date");
	 var request = {
    "reportnameId": 110,
    "typeFlag": 1,
    "top": topValues,
  	"searchString": " mobile_operator ='"+operator+"'"
	/*"dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "Top5SupportedTechnologies";
    ajaxCall(request, containerName);
}



function chart1111() {
    var request = {
        "reportnameId": 93,
        "typeFlag": 3,
        "top": topValues
        /*"dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "container1111";
    ajaxCall(request, containerName);
}


function chart201() {
    var request = {
        "reportnameId": 92,
        "typeFlag": 3,
        "top": topValues,
        "dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]
    };
    var containerName = "container201";
    ajaxCall(request, containerName);
}

function chart101() {
    var request = {
        "reportnameId": 91,
        "typeFlag": 1,
        "top": topValues,
        "dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]
    };
    var containerName = "container101";
    ajaxCall(request, containerName);
}

function chart102() {
    var request = {
        "reportnameId": 91,
        "typeFlag": 2,
        "top": topValues,
        "dateRange": [
             {"startDate": startDate, "endDate": endDate}
        ]
    };
    var containerName = "container102";
    ajaxCall(request, containerName);
}

function chart103() {
    var request = {
        "reportnameId": 91,
        "typeFlag": 3,
        "top": topValues,
        "columnStacking": "normal",
        "dateRange": [
             {"startDate": startDate, "endDate": endDate}
        ]
    };
    var containerName = "container103";
    ajaxCall(request, containerName);
}

function chart104() {
    var request = {
        "reportnameId": 91,
        "typeFlag": 4,
        "top": topValues,
        "columnStacking": "normal",
        "dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]
    };
    var containerName = "container104";
    ajaxCall(request, containerName);
}

function TopBrandNameTillDate() {
    var request = {
        "reportnameId": 105,
        "typeFlag": 1,
        "top": topValues,
        "columnStacking": "normal"
        /*"dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "TopBrandNameTillDate";
    ajaxCall(request, containerName);
}

function topmodelnameTillDate() {
    var request = {
        "reportnameId": 106,
        "typeFlag": 1,
        "top": topValues,
        "columnStacking": "normal"
        /*"dateRange": [
             {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "topmodelnameTillDate";
    ajaxCall(request, containerName);
}

function chart11() {
    var request = {
        "reportnameId": 10,
        "typeFlag": 1,
        "top": topValues,
        "columnStacking": "normal",
        "dateRange": [
             {"startDate": startDate, "endDate": endDate}
        ]
    };
    var containerName = "container11";
    ajaxCall(request, containerName);
}

function chart12() {
    var request = {
        "reportnameId": 10,
        "typeFlag": 3,
        "top": topValues,
        "columnStacking": "normal",
        "dateRange": [
             {"startDate": startDate, "endDate": endDate}
        ]
    };
    var containerName = "container12";
    ajaxCall(request, containerName);
}

function chart13() {
    var request = {
        "reportnameId": 10,

        "typeFlag": 5,
        "top": topValues,
        "columnStacking": "normal",
        "dateRange": [
             {"startDate": startDate, "endDate": endDate}
        ]
    };
    var containerName = "container13";
    ajaxCall(request, containerName);
}


function chart14() {
    var request = {
        "groupBy": "string",
        "lastDate": false,
        "reportnameId": 90,
        "top": topValues,
        "typeFlag": 3,
        "dateRange": [
             {"startDate": startDate, "endDate": endDate}
        ]
    };
    var containerName = "container14";
    ajaxCall(request, containerName);
}


function chart1001() {
    var request = {
        "reportnameId": 10,
        "typeFlag": 1,
        "top": topValues,
        "columnStacking": "normal",
        "dateRange": [
             {"startDate": startDate, "endDate": endDate}
        ]
    };
    var containerName = "container1001";
    ajaxCall(request, containerName);
}

function MonthlyTopMarketingName() {
    var request = {
        "reportnameId": 120,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "MonthlyTopMarketingName";
    ajaxCall(request, containerName);
}
function YearlyTopMarketingName() {
    var request = {
        "reportnameId": 120,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "YearlyTopMarketingName";
    ajaxCall(request, containerName);
}
function QuarterlyTopMarketingName() {
    var request = {
        "reportnameId": 120,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "QuarterlyTopMarketingName";
    ajaxCall(request, containerName);
}

function MonthlyTopBrandName() {
    var request = {
        "reportnameId": 116,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "MonthlyTopBrandName";
    ajaxCall(request, containerName);
}
function YearlyTopBrandName() {
    var request = {
        "reportnameId": 116,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "YearlyTopBrandName";
    ajaxCall(request, containerName);
}
function QuarterlyTopBrandName() {
    var request = {
        "reportnameId": 116,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "QuarterlyTopBrandName";
    ajaxCall(request, containerName);
}

/**-------------Top Model Name ----------- */

function MonthlyTopModelName() {
    var request = {
        "reportnameId": 117,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "MonthlyTopModelName";
    ajaxCall(request, containerName);
}
function YearlyTopModelName() {
    var request = {
        "reportnameId": 117,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "YearlyTopModelName";
    ajaxCall(request, containerName);
}
function QuarterlyTopModelName() {
    var request = {
        "reportnameId": 117,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "QuarterlyTopModelName";
    ajaxCall(request, containerName);
}

/**-------------END Top Model Name ----------- */


/**-------------Top Device Type ----------- */

function MonthlyTopDeviceType() {
    var request = {
        "reportnameId": 118,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "MonthlyTopDeviceType";
    ajaxCall(request, containerName);
}
function YearlyTopDeviceType() {
    var request = {
        "reportnameId": 118,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "YearlyTopDeviceType";
    ajaxCall(request, containerName);
}
function QuarterlyTopDeviceType() {
    var request = {
        "reportnameId": 118,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "QuarterlyTopDeviceType";
    ajaxCall(request, containerName);
}

/**-------------END Top Device Type ----------


/**-------------Top Supporting Teche ----------- */

function MonthlyTopSupportingTech() {
    var request = {
        "reportnameId": 119,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": [
           {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "MonthlyTopSupportingTech";
    ajaxCall(request, containerName);
}
function YearlyTopSupportingTech() {
    var request = {
        "reportnameId": 119,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "YearlyTopSupportingTech";
    ajaxCall(request, containerName);
}
function QuarterlyTopSupportingTech() {
    var request = {
        "reportnameId": 119,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": [
           {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "QuarterlyTopSupportingTech";
    ajaxCall(request, containerName);
}

/**-------------END Top Supporting Tech ----------*/

//Imei Count And %Change for brand_name=Samsung

function quarterlySamsungOnChange() {
    var request = {
        "reportnameId": 121,
       "typeFlag": 3,
       "top": topValues,
       "searchString": "brand_name ='Samsung'",
       "columnStacking": "normal", 
       "dateRange": [
           {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "quarterlySamsung";
    ajaxCall(request, containerName);
}
function monthlySamsungOnChange() {
    var request = {
        "reportnameId": 121,
       "typeFlag": 4,
       "top": topValues,
       "searchString": "brand_name ='Samsung'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "monthlySamsung";
    ajaxCall(request, containerName);
}

function yearlySamsungOnChange() {
    var request = {
        "reportnameId": 121,
       "typeFlag": 5,
       "top": topValues,
       "searchString": "brand_name ='Samsung'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "yearlySamsung";
    ajaxCall(request, containerName);
}


//END Imei Count And %Change for brand_name=Samsung

//Imei Count And %Change for model _name= it5606

function quarterlyit5606OnChange() {
    var request = {
        "reportnameId": 122,
       "typeFlag": 3,
       "top": topValues,
       "searchString": "model_name ='it5606'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "quarterlyit5606'";
    ajaxCall(request, containerName);
}
function monthlyit5606OnChange() {
    var request = {
        "reportnameId": 122,
       "typeFlag": 4,
       "top": topValues,
       "searchString": "model_name ='it5606'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "monthlyit5606";
    ajaxCall(request, containerName);
}

function yearlyit5606OnChange() {
    var request = {
        "reportnameId": 122,
       "typeFlag": 5,
       "top": topValues,
       "searchString": "model_name ='it5606'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "yearlyit5606";
    ajaxCall(request, containerName);
}

//End Imei Count And %Change for model _name= it5606

//Imei Count And %Change for  device_type= Smartphone

function quarterlySmartphoneOnChange() {
    var request = {
        "reportnameId": 123,
       "typeFlag": 3,
       "top": topValues,
       "searchString": "device_type ='Smartphone'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "quarterlySmartphone";
    ajaxCall(request, containerName);
}
function monthlySmartphoneOnChange() {
    var request = {
        "reportnameId": 123,
       "typeFlag": 4,
       "top": topValues,
       "searchString": "device_type ='Smartphone'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "monthlySmartphone";
    ajaxCall(request, containerName);
}

function yearlySmartphoneOnChange() {
    var request = {
        "reportnameId": 123,
       "typeFlag": 5,
       "top": topValues,
       "searchString": "device_type ='Smartphone'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "yearlySmartphone";
    ajaxCall(request, containerName);
}

//END Imei Count And %Change for  device_type= Smartphone

// Imei Count And %Change for  tech= 2G

function quarterly2GOnChange() {
    var request = {
        "reportnameId": 124,
       "typeFlag": 3,
       "top": topValues,
       "searchString": "tech ='2G'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "quarterly2G";
    ajaxCall(request, containerName);
}
function monthly2GOnChange() {
    var request = {
        "reportnameId": 124,
       "typeFlag": 4,
       "top": topValues,
       "searchString": "tech ='2G'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "monthly2G";
    ajaxCall(request, containerName);
}

function yearly2GOnChange() {
    var request = {
        "reportnameId": 124,
       "typeFlag": 5,
       "top": topValues,
       "searchString": "tech ='2G'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "yearly2G";
    ajaxCall(request, containerName);
}

// End Imei Count And %Change for  tech= 2G

//Imei Count And %Change for  marketing_name= Smartphone
function quarterlyMarketingNameOnChange() {
    var request = {
        "reportnameId": 125,
       "typeFlag": 3,
       "top": topValues,
       "searchString": "marketing_name ='Smartphone'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "quarterlyMarketingName";
    ajaxCall(request, containerName);
}
function monthlyMarketingNameOnChange() {
    var request = {
        "reportnameId": 125,
       "typeFlag": 4,
       "top": topValues,
       "searchString": "marketing_name ='Smartphone'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "monthlyMarketingName";
    ajaxCall(request, containerName);
}

function yearlyMarketingNameOnChange() {
    var request = {
        "reportnameId": 125,
       "typeFlag": 5,
       "top": topValues,
       "searchString": "marketing_name ='Smartphone'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "yearlyMarketingName";
    ajaxCall(request, containerName);
}

//END Imei Count And %Change for  marketing_name= Smartphone

//Top device_type for OS  :Android


function deviceTypeOSTillDate(os) {
	$("#deviceTypeOSTillDate_heading").html("Top Device Type for "+os);
	
    var request = {
        "reportnameId": 126,
       "typeFlag": 3,
       "top": topValues,
        "searchString": "os  ='"+os+"'",
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "deviceTypeOSTillDate";
    ajaxCall(request, containerName);
}





function quarterlyOsAndroid() {
    var request = {
        "reportnameId": 126,
       "typeFlag": 3,
       "top": topValues,
       "searchString": "os  ='Android'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "quarterlyOsAndroid";
    ajaxCall(request, containerName);
}
function monthlyOsAndroid() {
    var request = {
        "reportnameId": 126,
       "typeFlag": 4,
       "top": topValues,
       "searchString": "os  ='Android'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "monthlyOsAndroid";
    ajaxCall(request, containerName);
}

function yearlyOsAndroid() {
    var request = {
        "reportnameId": 126,
       "typeFlag": 5,
       "top": topValues,
       "searchString": "os  ='Android'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "yearlyOsAndroid";
    ajaxCall(request, containerName);
}

//END Top device_type for OS  :Android

//Top Os  for   device_type= Smartphone

function deviceTypeLikeSmartphoneTillDate(os) {
	
	$("#deviceTypeLikeSmartphoneTillDate_heading").html("Top OS Type for Device Type : "+os+" till Date");
    var request = {
        "reportnameId": 127,
       "typeFlag": 3,
       "top": topValues,
       "searchString": "device_type  ='"+os+"'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "deviceTypeLikeSmartphoneTillDate";
    ajaxCall(request, containerName);
}

function quarterlyDeviceType() {
    var request = {
        "reportnameId": 127,
       "typeFlag": 3,
       "top": topValues,
       "searchString": "device_type ='Smartphone'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "quarterlyDeviceType";
    ajaxCall(request, containerName);
}
function monthlyDeviceType() {
    var request = {
        "reportnameId": 127,
       "typeFlag": 4,
       "top": topValues,
       "searchString": "device_type ='Smartphone'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "monthlyDeviceType";
    ajaxCall(request, containerName);
}

function yearlyDeviceType() {
    var request = {
        "reportnameId": 127,
       "typeFlag": 5,
       "top": topValues,
       "searchString": "device_type ='Smartphone'",
       "columnStacking": "normal", 
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "yearlyDeviceType";
    ajaxCall(request, containerName);
}

// End Top Os  for   device_type= Smartphone


//Valid imei Count for all Operator 
//Tab 6 Data Month on Month

function MonthlyOperatorWise() {
    var request = {
        "reportnameId": 128,
       "typeFlag": 3,
       "top": topValues,
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "MonthlyOperatorWise128_3";
    ajaxCall(request, containerName);
}

//Tab 7 Data Qtr on Qtr
function QtrOperatorWise() {
    var request = {
        "reportnameId": 128,
       "typeFlag": 5,
       "top": topValues,
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "QtrOperatorWise128_5";
    ajaxCall(request, containerName);
}
//Tab 8 Data Year on Year
function yearlyOperatorWise() {
    var request = {
        "reportnameId": 128,
       "typeFlag": 4,
       "top": topValues,
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "yearlyOperatorWise128_4";
    ajaxCall(request, containerName);
}
// end Valid imei Count for all Operator 

//InValid imei Count for all Operator 
//Tab 6 Data Month on Month

function InValidMonthlyOperatorWise() {
    var request = {
        "reportnameId": 129,
       "typeFlag": 3,
       "top": topValues,
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "InValidMonthlyOperatorWise129_3";
    ajaxCall(request, containerName);
}
//Tab 7 Data Qtr on Qtr
function InValidQtrOperatorWise() {
    var request = {
        "reportnameId": 129,
       "typeFlag": 5,
       "top": topValues,
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "InValidQtrOperatorWise129_5";
    ajaxCall(request, containerName);
}
//Tab 8 Data Year on Year
function InValidyearlyOperatorWise() {
    var request = {
        "reportnameId": 129,
       "typeFlag": 4,
       "top": topValues,
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "InValidyearlyOperatorWise129_4";
    ajaxCall(request, containerName);
}
//End InValid imei Count for all Operator 


//InValid imei Count for  mobile operator= Smart 
//Tab 6 Data Month on Month
function ValidMonthlyMobileOperatorWise() {
    var request = {
        "reportnameId": 130,
       "typeFlag": 3,
       "top": topValues,
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "ValidMonthlyMobileOperatorWise130_3";
    ajaxCall(request, containerName);
}
//Tab 7 Data Qtr on Qtr
function ValidQtrMobileOperatorWise() {
    var request = {
        "reportnameId": 130,
       "typeFlag": 5,
       "top": topValues,
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "ValidQtrMobileOperatorWise130_5";
    ajaxCall(request, containerName);
}
//Tab 8 Data Year on Year
function ValidyearlyMobileOperatorWise() {
    var request = {
        "reportnameId": 130,
       "typeFlag": 4,
       "top": topValues,
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "ValidyearlyMobileOperatorWise130_4";
    ajaxCall(request, containerName);
}
// End Valid imei Count for  mobile operator= Smart 


//InValid imei Count for  mobile operator= Smart 
//Tab 6 Data Month on Month

function InValidMonthlyMobileOperatorWise() {
    var request = {
        "reportnameId": 131,
       "typeFlag": 3,
       "top": topValues,
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "InValidMonthlyMobileOperatorWise131_3";
    ajaxCall(request, containerName);
}
//Tab 7 Data Qtr on Qtr
function InValidQtrMobileOperatorWise() {
    var request = {
        "reportnameId": 131,
       "typeFlag": 5,
       "top": topValues,
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "InValidQtrMobileOperatorWise131_5";
    ajaxCall(request, containerName);
}
//Tab 8 Data Year on Year
function InValidyearlyMobileOperatorWise() {
    var request = {
        "reportnameId": 131,
       "typeFlag": 4,
       "top": topValues,
       "dateRange": [
            {"startDate": startDate, "endDate": endDate}
       ]
    };
    var containerName = "InValidyearlyMobileOperatorWise131_4";
    ajaxCall(request, containerName);
}
// End InValid imei Count for  mobile operator= Smart 

function ajaxCallDashboard() {
	var request={
			"reportnameId": 250
	}
	if(lang=='en'){
		var langFile='./resources/i18n/english_datatable.json';
	}
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers:
		{ 'X-CSRF-TOKEN': token }
	});
    $.ajax({
        url: "dashboard",
        type: 'POST',
        contentType: "application/json",
        dataType: "json",
        async: true,
        data: JSON.stringify(request),
        success: function (result) {
            //chartCreator(request, result, containerName);
            //alert(result);
            $("#reportRefresh").text("Report Refresh Date and Time: "+result.repRef);
            $("#tablet").text(result.tablet);
            $("#smartphone").text(result.sP);
            $("#mobilePhone").text(result.mP);
            $("#totalValid").text(result.tV);
            $("#nullImei").text(result.nullImei);
            $("#previousRefresh").text("Refresh Date and Time: "+result.preRef);
            $("#totalInvalid").text(result.tI);
            $("#testImei").text(result.testImei);
            $("#totalCount").text(result.tC);
            
            $("#tabPer").text(result.tabPer+"%");
            $("#sPPer").text(result.sPPer+"%");
            $("#mPPer").text(result.mPPer+"%");
            $("#totalValidPercent").text(result.totalValidPercent+"%");
            $("#nullPer").text(result.nullPer+"%");
            $("#tIper").text(result.tIper+"%");
            $("#testPer").text(result.testPer+"%");
            $("#tCPer").text(result.tCPer+"%");
            
            
        }
    });
}

function ajaxCall(request, containerName) {
	if(lang=='en'){
		var langFile='./resources/i18n/english_datatable.json';
	}
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers:
		{ 'X-CSRF-TOKEN': token }
	});
    $.ajax({
        url: "reportdata",
        type: 'POST',
        contentType: "application/json",
        dataType: 'html',
        async: true,
        data: JSON.stringify(request),
        success: function (result) {
            chartCreator(request, result, containerName);
        }
    });
}

function chartCreator(request, result, containerName) {
   if (JSON.parse(result).chartType === "pie") {
        generatePieChart(request, result, containerName)
    } else if (JSON.parse(result).catogery.length == 0) {
        generatePieChart(request, result, containerName);
    } else {
        generateChart(request, result, containerName);
    }
}


function generateChart(request, result, containerName) {
    var chartType = JSON.parse(result).chartType;
    var title = JSON.parse(result).title;
    var subtitle = JSON.parse(result).subtitle;
    var categoryXaxis = JSON.parse(result).catogery;
    var yaxix = JSON.parse(result).yAxis;
    var seriesdata = JSON.parse(result).seriesData;
    var formatteddata = [];
    var columnStacking = null;
    var yaxis = yaxix.split(",")[0];   //  sap has Count
    let yaxis2 = yaxix.split(",")[1];  //  sap has Percentage

    if (request.columnStacking != null) {
        columnStacking = 'normal';
    }
    let j = 0;
    for (let i = 0; i < seriesdata.length; i++) {
        if (typeof yaxis2 !== 'undefined') {
            j = i;
        }
        var singleObject = {
            name: '',
            type: '',
            yAxis: j,          // optimise need i 0
            data: []
        };
        singleObject.name = seriesdata[i].name;
        singleObject.type = seriesdata[i].type;
        var len = seriesdata[i].data.length;
        for (let j = 0; j < len; j++) {
            singleObject.data.push(parseInt(seriesdata[i].data[j]));
        }
        formatteddata.push(singleObject);
    }
    //  var yaxis2 ='percentage';
    var xaxis = {categories: categoryXaxis};
    drawDynamicChart(containerName, chartType, title, subtitle, xaxis, yaxis, formatteddata, yaxis2, columnStacking ,request);
}
function drawDynamicChart(containerName, charttype, title, subtitle, xaxis, yaxix, formatteddata, yaxix2, columnStacking,request ) {
    Highcharts.chart(containerName, {
        chart: {
            type: charttype
        },
        title: {
            text: title
        },
        subtitle: {
            text: subtitle
        },
        xAxis: xaxis,
        yAxis: [{ // Primary yAxis
            title: {
                text: yaxix
            }
        }, { // Secondary yAxis
            title: {
                text: yaxix2
            },
            opposite: true
        }],
        series: formatteddata,
        legend: {
            align: 'right',
            floating: true,
            layout: 'vertical',
            verticalAlign: 'top',
            y: 60,
            borderWidth: 1
        },
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }, plotOptions: {
            column: {
                stacking: columnStacking,    // stacking: null,
                dataLabels: {
                    enabled: true
                }
            },
            series: {
                cursor: 'pointer',
                events: {
                    click: function(event) {
                        // Log to console

                        newFunction(event,charttype,request);

                    }
                    },
                label: {
                    connectorAllowed: false,
                    enableMouseTracking: true
                }
            },

            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                },
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: true
            },
            area: {
                marker: {
                    enabled: true,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }, pie: {
                allowPointSelect: true,
                showInLegend: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<span style="font-size: 1.2em"><b>{point.name}</b></span><br>' +
                        '<span style="opacity: 0.6">{point.percentage:.1f} %</span>',
                    connectorColor: 'rgba(128,128,128,0.5)'
                }
            }
        }
    });
}
function generatePieChart(request, result, containerName) {
    var chartType = JSON.parse(result).chartType;
    //  var chartType = "column";
    var title = JSON.parse(result).title;
    var yaxix = JSON.parse(result).yAxis;
    var subtitle = JSON.parse(result).subtitle;
    var seriesdata = JSON.parse(result).seriesData;
    var xaxis = {type: 'category'};
    var dataobj = [];
    var series = [];
    for (let i = 0; i < seriesdata.length; i++) {
        const object = {};
        object.name = seriesdata[i].name;
        object.y = parseInt(seriesdata[i].data[0]);
        dataobj.push(object);
    }
    var seriesObject = {
        name: yaxix,
        colorByPoint: true,
        data: dataobj
    };
    series.push(seriesObject);
    drawDynamicChart(containerName, chartType, title, subtitle, xaxis, yaxix, series, null, null ,request);
}
function newFunction(event, charttype ,request) {
	var date=JSON.stringify(request);
    if(charttype === 'pie'){
        //alert( String(request) + ' Pie Name : '+event.point.name+ ', charttype : '+charttype+', request : '+String(request) );
        if(request.reportnameId==111){
			Top5BrandsForSeatelTillDate(event.point.name);
			Top5ModelsForSeatelTillDate(event.point.name);
			TopDeviceTypeForSeatelTillDate(event.point.name);
			TopOSForSeatelwithPercentage(event.point.name);
			TopMarketingNameForSeatelwithPercentage(event.point.name);
			Top4SupportingTechnologywithPercentage(event.point.name);
		}
        
    }else{
        //alert(JSON.stringify(request) + 'Selected Name : '+ event.point.category+ ', charttype : '+charttype+', request : '+String(request) );
        if(request.reportnameId==108){
			deviceTypeOSTillDate(event.point.category);
		
		}
		if(request.reportnameId==107){
			deviceTypeLikeSmartphoneTillDate(event.point.category);
		}
       
    }
}

function samplePieChart(request, result, containerName) {
    var chartType = "pie";
    //  var chartType = "column";
    var title = JSON.parse(result).title;
    var yaxix = JSON.parse(result).yAxis;
    var subtitle = JSON.parse(result).subtitle;
    var seriesdata = JSON.parse(result).seriesData;
    var xaxis = {type: 'category'};
    var dataobj = [];
    var series = [];
    for (let i = 0; i < seriesdata.length; i++) {
        const object = {};
        object.name = seriesdata[i].name;
        object.y = parseInt(seriesdata[i].data[0]);
        dataobj.push(object);
    }
    var seriesObject = {
        name: yaxix,
        colorByPoint: true,
        data: dataobj
    };
    series.push(seriesObject);
    drawDynamicChart(containerName, chartType, title, subtitle, xaxis, yaxix, series, null, null);
}
