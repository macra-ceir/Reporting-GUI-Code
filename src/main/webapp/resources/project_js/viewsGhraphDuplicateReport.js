//  NA-0;Till Date-1;Daily-2;Monthly-3;Yearly-4;Quarterly-5
var featureId = 96;
var roleType = $("body").attr("data-roleType");
var userId = $("body").attr("data-userID");
var currentRoleType = $("body").attr("data-selected-roleType"); 
var startdate=$('#startDate').val(); 
var endDate=$('#endDate').val();
var lang=window.parent.$('#langlist').val() == 'km' ? 'km' : 'en';
var topValues=parseInt("5");
var startDate="2021-01-01";
var endDate=getTodayDate();
var role = currentRoleType == null ? roleType : currentRoleType;
var arr = [];
function getTodayDate(){
	// Get the current date
	var today = new Date();
	// Get the day of the month
	var dd = today.getDate();
	// Get the month (adding 1 because months are zero-based)
	var mm = today.getMonth() + 1;
	// Get the year
	var yyyy = today.getFullYear();
	// Add leading zero if the day is less than 10
	if (dd < 10) {
    	dd = '0' + dd;
	} 
	// Add leading zero if the month is less than 10
	if (mm < 10) {
    	mm = '0' + mm;
	} 
	// Format the date as mm-dd-yyyy and log it
	today = yyyy + '-' + mm + '-' + dd;
	console.log(today);
	return today;
}

 $(document).ready(function () {
	 ajaxCallDashboard();
      $("#refresh_select_date").on('click', function () { 
		arr = [];
    	 var data1=  $('#monthTomonthId').val()+'';	
    	 var data=  data1.split(",");
    	 $.each(data, function( index, value ) {
			arr.push({"startDate": ""+value.split("#")[0]+"", "endDate": ""+value.split("#")[1]+""});
		});
		if(data1=='' || data1==null || data1===""){
			arr.push({"startDate": startDate, "endDate": endDate});
		}
          MonthlyReportsData(arr);
      }); 
      
      $("#refresh_select_date_qtr3").on('click', function () { 
		arr = [];
    	 var data1=  $('#qtyToqtyId').val()+'';		
    	 var data=  data1.split(",");
    	 
        $.each(data, function( index, value ) {
	
			arr.push({"startDate": ""+value.split("#")[0]+"", "endDate": ""+value.split("#")[1]+""});
		});
		if(data1=='' || data1==null || data1===""){
			arr.push({"startDate": startDate, "endDate": endDate});
		}
		QuarterlyReportsData(arr);
      }); 
      
      $("#refresh_select_date_yrs4").on('click', function () { 
		arr = [];
    	 var data1=  $('#yearToyearId').val()+'';		
    	  var data=  data1.split(",");
           $.each(data, function( index, value ) {
				arr.push({"startDate": ""+value.split("#")[0]+"", "endDate": ""+value.split("#")[1]+""});
			});
			if(data1=='' || data1==null || data1===""){
				arr.push({"startDate": startDate, "endDate": endDate});
			}
			YearlyReportsData(arr);
      }); 
      
 }); 


$(document).ready(function(){
	
  $('#whatIstopID').on('change', function() {
	var id = $('#whatIstopID').find(":selected").val();
	arr=[];
	arr.push({"startDate": startDate, "endDate": endDate});
    MonthlyReportsData(arr);
    YearlyReportsData(arr);
    QuarterlyReportsData(arr);
   
   	 
  });
});

$(document).ready(function () {
    console.log("ready!");
    $('#gtabId1').click(function() {
		//alert("tab1");
		$("#refresh_select_date").css("display","none");
		$("#whatIstopID_li").css("display","none");
		$("#yearToyearId_li").css("display","none");
		$("#qtyToqtyId_li").css("display","none");
		$("#monthTomonthId_li").css("display","none");
		$("#refresh_select_date_qtr3").css("display","none");
		$("#refresh_select_date_yrs4").css("display","none");
		arr=[];
	});
	$('#gtabId2').click(function() {
	
		$("#refresh_select_date").css("display","block");
		$("#refresh_select_date_qtr3").css("display","none");
		$("#refresh_select_date_yrs4").css("display","none");

		$("#whatIstopID_li").css("display","none");
    	$("#yearToyearId_li").css("display","none");
		$("#qtyToqtyId_li").css("display","none");
		$("#monthTomonthId_li").css("display","block");
		arr=[];
		arr.push({"startDate": startDate, "endDate": endDate});
		MonthlyReportsData(arr);
		
	});
	$('#gtabId3').click(function() {
		
		$("#refresh_select_date").css("display","none");
		$("#refresh_select_date_qtr3").css("display","block");
		$("#refresh_select_date_yrs4").css("display","none");
		$("#whatIstopID_li").css("display","none");
    	$("#yearToyearId_li").css("display","none");
		$("#qtyToqtyId_li").css("display","block");
		$("#monthTomonthId_li").css("display","none");
		
		arr=[];
		arr.push({"startDate": startDate, "endDate": endDate});
		QuarterlyReportsData(arr);
	});
	$('#gtabId4').click(function() {
		
		$("#refresh_select_date").css("display","none");
		$("#refresh_select_date_qtr3").css("display","none");
		$("#refresh_select_date_yrs4").css("display","block");

		$("#whatIstopID_li").css("display","none");
    	$("#yearToyearId_li").css("display","block");
		$("#qtyToqtyId_li").css("display","none");
		$("#monthTomonthId_li").css("display","none");
		arr=[];
		arr.push({"startDate": startDate, "endDate": endDate});
		YearlyReportsData(arr);
	});
	ajaxCallDashboard();
	arr=[];
	arr.push({"startDate": startDate, "endDate": endDate});
    MonthlyReportsData(arr);
    YearlyReportsData(arr);
    QuarterlyReportsData(arr);
   
});

function MonthlyReportsData(jsonData){
	try {
		M_DuplicateDeviceCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	
	try {
		M_StolenDevicesCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		M_BlacklistDevicesCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		M_RecoveredDevicecount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		M_Non_TaxPaidDeviceCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	
	
	try {
		M_UseraccessibilityCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		M_TaxPaidDevicesCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		M_ExceptionDevicesCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		M_GreylisedDeviceCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	
	
}
function YearlyReportsData(jsonData){
	try {
		Y_DuplicateDeviceCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	
	try {
		Y_StolenDevicesCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		Y_BlacklistDevicesCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		Y_RecoveredDevicecount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		Y_Non_TaxPaidDeviceCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	
	
	try {
		Y_UseraccessibilityCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		Y_TaxPaidDevicesCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		Y_ExceptionDevicesCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		Y_GreylisedDeviceCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	
	
	
	
}
function QuarterlyReportsData(jsonData){
	try {
		Q_DuplicateDeviceCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	
	try {
		Q_StolenDevicesCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		Q_BlacklistDevicesCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		Q_RecoveredDevicecount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		Q_Non_TaxPaidDeviceCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	
	try {
		Q_UseraccessibilityCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		Q_TaxPaidDevicesCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		Q_ExceptionDevicesCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	try {
		Q_GreylisedDeviceCount(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
	
}
function DuplicateDeviceCount() {
    var request = {
        "reportnameId": 196,
        "typeFlag": 1,
        "top": topValues
    };
    var containerName = "DuplicateDeviceCount";
    ajaxCall(request, containerName);
}
function StolenDevicesCount() {
    var request = {
        "reportnameId": 197,
        "typeFlag": 3,
        "top": topValues
        /*"dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "StolenDevicesCount";
    ajaxCall(request, containerName);
}
function BlacklistDevicesCount() {
    var request = {
        "reportnameId": 198,
        "typeFlag": 3,
        "top": topValues
       /* "dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "BlacklistDevicesCount";
    ajaxCall(request, containerName);
}
function RecoveredDevicecount() {
    var request = {
        "reportnameId": 199,
        "typeFlag": 1,
        "top": topValues
        /*"dateRange": [
            {"startDate": "2022-01-01", "endDate": "2024-03-30"}
        ]*/
    };
    var containerName = "RecoveredDevicecount";
    ajaxCall(request, containerName);
}

function Non_TaxPaidDeviceCount() {
    var request = {
        "reportnameId": 200,
        "typeFlag": 1,
        "top": topValues
        /*"dateRange": [
            {"startDate": "2022-01-01", "endDate": "2024-03-30"}
        ]*/
    };
    var containerName = "Non_TaxPaidDeviceCount";
    ajaxCall(request, containerName);
}
function UseraccessibilityCount() {
    var request = {
        "reportnameId": 201,
        "typeFlag": 1,
        "top": topValues
       /* "dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "UseraccessibilityCount";
    ajaxCall(request, containerName);
}

function TaxPaidDevicesCount() {
    var request = {
        "reportnameId": 202,
        "typeFlag": 1,
        "top": topValues
        /*"dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]*/
    };
    var containerName = "TaxPaidDevicesCount";
    ajaxCall(request, containerName);
}
function ExceptionDevicesCount() {
    var request = {
        "reportnameId": 203,
        "typeFlag": 1,
        "top": topValues
       
    };
    var containerName = "ExceptionDevicesCount";
    ajaxCall(request, containerName);
}

function GreylisedDeviceCount() {
    var request = {
        "reportnameId": 204,
        "typeFlag": 1,
        "top": topValues
       
    };
    var containerName = "GreylisedDeviceCount";
    ajaxCall(request, containerName);
}

function M_DuplicateDeviceCount(jsonData) {
    var request = {
        "reportnameId": 196,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "M_DuplicateDeviceCount";
    ajaxCall(request, containerName);
}
function Y_DuplicateDeviceCount(jsonData) {
    var request = {
        "reportnameId": 196,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "Y_DuplicateDeviceCount";
    ajaxCall(request, containerName);
}
function Q_DuplicateDeviceCount(jsonData) {
    var request = {
        "reportnameId": 196,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "Q_DuplicateDeviceCount";
    ajaxCall(request, containerName);
}

function M_StolenDevicesCount(jsonData) {
    var request = {
        "reportnameId": 197,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "M_StolenDevicesCount";
    ajaxCall(request, containerName);
}
function Y_StolenDevicesCount(json) {
    var request = {
        "reportnameId": 197,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": json
    };
    var containerName = "Y_StolenDevicesCount";
    ajaxCall(request, containerName);
}
function Q_StolenDevicesCount(json) {
    var request = {
        "reportnameId": 197,
       	"typeFlag": 5,
       	"top": topValues,
       	"columnStacking": "normal", 
       	"dateRange": json
    };
    var containerName = "Q_StolenDevicesCount";
    ajaxCall(request, containerName);
}

/**-------------Top Model Name ----------- */

function M_BlacklistDevicesCount(json) {
    var request = {
        "reportnameId": 198,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": json
    };
    var containerName = "M_BlacklistDevicesCount";
    ajaxCall(request, containerName);
}
function Y_BlacklistDevicesCount(jsonData) {
    var request = {
        "reportnameId": 198,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "Y_BlacklistDevicesCount";
    ajaxCall(request, containerName);
}
function Q_BlacklistDevicesCount(jsonData) {
    var request = {
        "reportnameId": 198,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange":jsonData
    };
    var containerName = "Q_BlacklistDevicesCount";
    ajaxCall(request, containerName);
}

function M_RecoveredDevicecount(json) {
    var request = {
        "reportnameId": 199,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": json
    };
    var containerName = "M_RecoveredDevicecount";
    ajaxCall(request, containerName);
}
function Y_RecoveredDevicecount(jsonData) {
    var request = {
        "reportnameId": 199,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "Y_RecoveredDevicecount";
    ajaxCall(request, containerName);
}
function Q_RecoveredDevicecount(jsonData) {
    var request = {
        "reportnameId": 199,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "Q_RecoveredDevicecount";
    ajaxCall(request, containerName);
}

function M_Non_TaxPaidDeviceCount(json) {
    var request = {
        "reportnameId": 200,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": json
    };
    var containerName = "M_Non_TaxPaidDeviceCount";
    ajaxCall(request, containerName);
}
function Y_Non_TaxPaidDeviceCount(jsonData) {
    var request = {
        "reportnameId": 200,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "Y_Non_TaxPaidDeviceCount";
    ajaxCall(request, containerName);
}
function Q_Non_TaxPaidDeviceCount(jsonData) {
    var request = {
        "reportnameId": 200,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "Q_Non_TaxPaidDeviceCount";
    ajaxCall(request, containerName);
}




function M_UseraccessibilityCount(json) {
    var request = {
        "reportnameId": 201,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": json
    };
    var containerName = "M_UseraccessibilityCount";
    ajaxCall(request, containerName);
}
function Y_UseraccessibilityCount(jsonData) {
    var request = {
        "reportnameId": 201,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "Y_UseraccessibilityCount";
    ajaxCall(request, containerName);
}
function Q_UseraccessibilityCount(jsonData) {
    var request = {
        "reportnameId": 201,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "Q_UseraccessibilityCount";
    ajaxCall(request, containerName);
}
function M_TaxPaidDevicesCount(json) {
    var request = {
        "reportnameId": 202,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": json
    };
    var containerName = "M_TaxPaidDevicesCount";
    ajaxCall(request, containerName);
}
function Y_TaxPaidDevicesCount(jsonData) {
    var request = {
        "reportnameId": 202,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "Y_TaxPaidDevicesCount";
    ajaxCall(request, containerName);
}
function Q_TaxPaidDevicesCount(jsonData) {
    var request = {
        "reportnameId": 202,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "Q_TaxPaidDevicesCount";
    ajaxCall(request, containerName);
}

function M_ExceptionDevicesCount(json) {
    var request = {
        "reportnameId": 203,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": json
    };
    var containerName = "M_ExceptionDevicesCount";
    ajaxCall(request, containerName);
}
function Y_ExceptionDevicesCount(jsonData) {
    var request = {
        "reportnameId": 203,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "Y_ExceptionDevicesCount";
    ajaxCall(request, containerName);
}
function Q_ExceptionDevicesCount(jsonData) {
    var request = {
        "reportnameId": 203,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "Q_ExceptionDevicesCount";
    ajaxCall(request, containerName);
}


function M_GreylisedDeviceCount(json) {
    var request = {
        "reportnameId": 204,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": json
    };
    var containerName = "M_GreylisedDeviceCount";
    ajaxCall(request, containerName);
}
function Y_GreylisedDeviceCount(jsonData) {
    var request = {
        "reportnameId": 204,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "Y_GreylisedDeviceCount";
    ajaxCall(request, containerName);
}
function Q_GreylisedDeviceCount(jsonData) {
    var request = {
        "reportnameId": 204,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "Q_GreylisedDeviceCount";
    ajaxCall(request, containerName);
}

// End InValid imei Count for  mobile operator= Smart 

function ajaxCallDashboard() {
	var request={
			"reportnameId": 251
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
           
            $("#StolenDevices").text(result.stln);
            $("#DuplicateDevices").text(result.dup);
            $("#BlackListedDevices").text(result.blklst);
            $("#RecoveredDevices").text(result.rcvr);
            $("#NonTaxPaidDevices").text(result.notax);
            $("#UserAccessibility").text(result.acc);
            $("#TaxPaidDevices").text(result.taxed);
            $("#ExceptionListedDevices").text(result.excep);
            $("#GreyListedDevices").text(result.grey);
            
            
            $("#StolenDevicesP").text(result.stlnPr+"%");
            $("#DuplicateDevicesP").text(result.dupPr+"%");
            $("#BlackListedDevicesP").text(result.blkPr+"%");
            $("#RecoveredDevicesP").text(result.rcvPr+"%");
            $("#NonTaxPaidDevicesP").text(result.noTaxPr+"%");
            $("#UserAccessibilityP").text(result.accPr+"%");
            $("#TaxPaidDevicesP").text(result.taxPr+"%");
            $("#ExceptionListedDevicesP").text(result.excpPr+"%");
            $("#GreyListedDevicesP").text(result.gryPr+"%");
            
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
            text: ''
        },
        credits: {   // remove watermark
    		enabled: false
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
