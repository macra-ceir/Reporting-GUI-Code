//  NA-0;Till Date-1;Daily-2;Monthly-3;Yearly-4;Quarterly-5
var featureId = 95;
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
 $(document).ready(function () {
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
      
     /* $("#refresh_select_date_m6").on('click', function () { 
    	  	arr = [];
    	 	var data1=  $('#monthTomonthId').val()+'';	
    	 	var data=  data1.split(",");
    	 	$.each(data, function( index, value ) {
				arr.push({"startDate": ""+value.split("#")[0]+"", "endDate": ""+value.split("#")[1]+""});
			});
			if(data1=='' || data1==null || data1===""){
				arr.push({"startDate": startDate, "endDate": endDate});
			}
			 MonthlyOperatorWiseReportsData(arr);
      }); 
      
      $("#refresh_select_date_qtr7").on('click', function () { 
			arr = [];
    	  	var data1=  $('#qtyToqtyId').val()+'';		
    	 	var data=  data1.split(",");
	        $.each(data, function( index, value ) {
				arr.push({"startDate": ""+value.split("#")[0]+"", "endDate": ""+value.split("#")[1]+""});
			});
			if(data1=='' || data1==null || data1===""){
				arr.push({"startDate": startDate, "endDate": endDate});
			}
			QuarterlyOperatorWiseReportsData(arr);
			
			
      }); 
      
      $("#refresh_select_date_yrs8").on('click', function () { 
		arr = [];
    	 var data1=  $('#yearToyearId').val()+'';		
    	  var data=  data1.split(",");
           $.each(data, function( index, value ) {
				arr.push({"startDate": ""+value.split("#")[0]+"", "endDate": ""+value.split("#")[1]+""});
			});
			if(data1=='' || data1==null || data1===""){
				arr.push({"startDate": startDate, "endDate": endDate});
			}
			YearlyOperatorWiseReportsData(arr);
      }); 
      */
 }); 


$(document).ready(function(){
	
  $('#whatIstopID').on('change', function() {
	var id = $('#whatIstopID').find(":selected").val();
	topValues=parseInt(id);
    //ajaxCallDashboard();
    CheckImeiCountByChannel();
	CheckImeiCountByChannelForLanguage("en");
	CheckImeiCountByChannelforOperator("NA");
	CheckImeiCountByOperator();
	CheckImeiCountByOperatorforstatus("IMEI is CEIR Compliant");
	CheckImeiCountByLanguage(); 
	CheckImeiCountByLanguageForOperator("NA");
	CheckImeiCountByStatus();
	Top5ModelNamebyCheckImeiCountTillDate();
	Top5BrandNamebyCheckImeiCountTillDate();
	CheckImeiCountByStatusBrand();
	ModelCheckIMEICountTillDateforStatus('IMEI is CEIR Compliant');
	BrandCheckIMEICountTillDateforStatus('IMEI is CEIR Compliant');
	
	arr=[];
	arr.push({"startDate": startDate, "endDate": endDate});
    MonthlyReportsData(arr);
    YearlyReportsData(arr);
    QuarterlyReportsData(arr);
   /* MonthlyOperatorWiseReportsData(arr);
	YearlyOperatorWiseReportsData(arr);	
	QuarterlyOperatorWiseReportsData(arr);*/
   	 
  });
});

$(document).ready(function () {
    console.log("ready!");
    $('#gtabId1').click(function() {
		//alert("tab1");
		$("#refresh_select_date").css("display","none");
		$("#whatIstopID_li").css("display","block");
		$("#yearToyearId2024").css("display","none");
		$("#qtyToqtyId_li").css("display","none");
		$("#monthTomonthId_li").css("display","none");
		arr=[];
	});
	$('#gtabId2').click(function() {
	
		$("#refresh_select_date").css("display","block");
		$("#refresh_select_date_qtr3").css("display","none");
		$("#refresh_select_date_yrs4").css("display","none");
		$("#refresh_select_date_m6").css("display","none");
		$("#refresh_select_date_qtr7").css("display","none");
		$("#refresh_select_date_yrs8").css("display","none");

		$("#whatIstopID_li").css("display","none");
    	$("#yearToyearId2024").css("display","none");
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
		$("#refresh_select_date_m6").css("display","none");
		$("#refresh_select_date_qtr7").css("display","none");
		$("#refresh_select_date_yrs8").css("display","none");
		
		$("#whatIstopID_li").css("display","none");
    	$("#yearToyearId2024").css("display","none");
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
		$("#refresh_select_date_m6").css("display","none");
		$("#refresh_select_date_qtr7").css("display","none");
		$("#refresh_select_date_yrs8").css("display","none");
		
		$("#whatIstopID_li").css("display","none");
    	$("#yearToyearId2024").css("display","block");
		$("#qtyToqtyId_li").css("display","none");
		$("#monthTomonthId_li").css("display","none");
		arr=[];
		arr.push({"startDate": startDate, "endDate": endDate});
		YearlyReportsData(arr);
	});
	$('#gtabId6').click(function() {
		$("#refresh_select_date").css("display","none");
		$("#refresh_select_date_qtr3").css("display","none");
		$("#refresh_select_date_yrs4").css("display","none");
		$("#refresh_select_date_m6").css("display","none");
		$("#refresh_select_date_qtr7").css("display","none");
		$("#refresh_select_date_yrs8").css("display","none");
		
		
    	$("#whatIstopID_li").css("display","none");
    	$("#yearToyearId2024").css("display","none");
		$("#qtyToqtyId_li").css("display","none");
		$("#monthTomonthId_li").css("display","none");
		arr=[];
		arr.push({"startDate": startDate, "endDate": endDate});
		MonthlyOperatorWiseReportsData(arr);
		
	});
	$('#gtabId7').click(function() {
		$("#refresh_select_date").css("display","none");
		$("#refresh_select_date_qtr3").css("display","none");
		$("#refresh_select_date_yrs4").css("display","none");
		$("#refresh_select_date_m6").css("display","none");
		$("#refresh_select_date_qtr7").css("display","none");
		$("#refresh_select_date_yrs8").css("display","none");
		
    	$("#whatIstopID_li").css("display","none");
    	$("#yearToyearId2024").css("display","none");
		$("#qtyToqtyId_li").css("display","none");
		$("#monthTomonthId_li").css("display","none");
		arr=[];
		arr.push({"startDate": startDate, "endDate": endDate});
		QuarterlyOperatorWiseReportsData(arr);
	});
	/*$('#gtabId8').click(function() {
		$("#refresh_select_date").css("display","none");
		$("#refresh_select_date_qtr3").css("display","none");
		$("#refresh_select_date_yrs4").css("display","none");
		$("#refresh_select_date_m6").css("display","none");
		$("#refresh_select_date_qtr7").css("display","none");
		$("#refresh_select_date_yrs8").css("display","block");
		
    	$("#whatIstopID_li").css("display","none");
    	$("#yearToyearId2024").css("display","block");
		$("#qtyToqtyId_li").css("display","none");
		$("#monthTomonthId_li").css("display","none");
		arr=[];
		arr.push({"startDate": startDate, "endDate": endDate});
		YearlyOperatorWiseReportsData(arr);
	});*/
	
    //ajaxCallDashboard();
    CheckImeiCountByChannel();
	CheckImeiCountByChannelForLanguage("en");
	CheckImeiCountByChannelforOperator("NA");
	CheckImeiCountByOperator();
	CheckImeiCountByOperatorforstatus("IMEI is CEIR Compliant");
	CheckImeiCountByLanguage(); 
	CheckImeiCountByLanguageForOperator("NA");
	CheckImeiCountByStatus();
	Top5ModelNamebyCheckImeiCountTillDate();
	Top5BrandNamebyCheckImeiCountTillDate();
	CheckImeiCountByStatusBrand();
	ModelCheckIMEICountTillDateforStatus('IMEI is CEIR Compliant');
	BrandCheckIMEICountTillDateforStatus('IMEI is CEIR Compliant');
	arr=[];
	arr.push({"startDate": startDate, "endDate": endDate});
    MonthlyReportsData(arr);
    YearlyReportsData(arr);
    QuarterlyReportsData(arr);
    /*MonthlyOperatorWiseReportsData(arr);
	YearlyOperatorWiseReportsData(arr);	
	QuarterlyOperatorWiseReportsData(arr);*/
   
});

function MonthlyReportsData(jsonData){
	
	CheckImeiCountByMonth(jsonData);
	CheckImeiCountByMonthandOperator(jsonData);
	CheckImeiCountByMonthforOperator(jsonData);
	CheckImeiCountByMonthandLanguage(jsonData);
	CheckImeiCountByMonthforLanguageen(jsonData);
	CheckImeiCountByMonthandChannel(jsonData);
	CheckImeiCountByMonthforChannelweb(jsonData);
	CheckImeiCountByMonthandBrowser(jsonData);
	CheckImeiCountByMonthforBrowserChrome(jsonData);
	CheckImeiCountByMonthandOsType(jsonData);
	CheckImeiCountByMonthforOsios(jsonData);
	CheckImeiCountByMonthandStatus(jsonData);
	CheckImeiCountByMonthandStatus_CIRS(jsonData);
}
function YearlyReportsData(jsonData){
	
	CheckImeiCountByYearly(jsonData);
	CheckImeiCountByYearlyandOperator(jsonData);
	CheckImeiCountByYearlyforOperator(jsonData);
	CheckImeiCountByYearlyandLanguage(jsonData);
	CheckImeiCountByYearlyforLanguageen(jsonData);
	CheckImeiCountByYearlyandChannel(jsonData);
	CheckImeiCountByYearlyforChannelweb(jsonData);
	CheckImeiCountByYearlyandBrowser(jsonData);
	CheckImeiCountByYearlyforBrowserChrome(jsonData);
	CheckImeiCountByYearlyandOsType(jsonData);
	CheckImeiCountByYearlyforOsios(jsonData);
	CheckImeiCountByYearlyandStatus(jsonData);
	CheckImeiCountByYearlyandStatus_CIRS(jsonData);
	
}
function QuarterlyReportsData(jsonData){

	CheckImeiCountByQuarterly(jsonData);
	CheckImeiCountByQuarterlyandOperator(jsonData);
	CheckImeiCountByQuarterlyforOperator(jsonData);
	CheckImeiCountByQuarterlyandLanguage(jsonData);
	CheckImeiCountByQuarterlyforLanguageen(jsonData);
	CheckImeiCountByQuarterlyandChannel(jsonData);
	CheckImeiCountByQuarterlyforChannelweb(jsonData);
	CheckImeiCountByQuarterlyandBrowser(jsonData);
	CheckImeiCountByQuarterlyforBrowserChrome(jsonData);
	CheckImeiCountByQuarterlyandOsType(jsonData);
	CheckImeiCountByQuarterlyforOsios(jsonData);
	CheckImeiCountByQuarterlyandStatus(jsonData);
	CheckImeiCountByQuarterlyandStatus_CIRS(jsonData);
	
}

	function CheckImeiCountByChannel()
	{
		var request = {
        "reportnameId": 180,
        "typeFlag": 1,
        "top": topValues
    	};
    	var containerName = "CheckImeiCountByChannel";
    	ajaxCall(request, containerName);
	}
	function CheckImeiCountByChannelForLanguage(en){
		var request = {
        "reportnameId": 180,
        "typeFlag": 1,
        "top": topValues,
        "searchString":" language ='"+en+"'"
    	};
    	var containerName = "CheckImeiCountByChannelForLanguage";
    	ajaxCall(request, containerName);
	}
	function CheckImeiCountByChannelforOperator(Airtel){
		var request = {
        "reportnameId": 180,
        "typeFlag": 1,
        "top": topValues,
        "searchString":" operator ='"+Airtel+"'"
    	};
    	var containerName = "CheckImeiCountByChannelforOperator";
    	ajaxCall(request, containerName);
	}
	function CheckImeiCountByOperator(){
		var request = {
        "reportnameId": 181,
        "typeFlag": 1,
        "top": topValues
    	};
    	var containerName = "CheckImeiCountByOperator";
    	ajaxCall(request, containerName);
	}
	function CheckImeiCountByOperatorforstatus(Compliant){
		var request = {
        "reportnameId": 181,
        "typeFlag": 1,
        "top": topValues,
        "searchString":" compliance_status ='"+Compliant+"'"
    	};
    	var containerName = "CheckImeiCountByOperatorforstatus";
    	ajaxCall(request, containerName);
	}
	function CheckImeiCountByLanguage(){
		var request = {
        "reportnameId": 182,
        "typeFlag": 1,
        "top": topValues
    	};
    	var containerName = "CheckImeiCountByLanguage";
    	ajaxCall(request, containerName);
	}
	function CheckImeiCountByLanguageForOperator(Airtel){
		var request = {
        "reportnameId": 182,
        "typeFlag": 1,
        "top": topValues,
        "searchString":" operator ='"+Airtel+"'"
    	};
    	var containerName = "CheckImeiCountByLanguageForOperator";
    	ajaxCall(request, containerName);
	}
	function CheckImeiCountByStatus(){
		var request = {
        "reportnameId": 183,
        "typeFlag": 1,
        "top": topValues
    	};
    	var containerName = "CheckImeiCountByStatus";
    	ajaxCall(request, containerName);
	}
	function Top5ModelNamebyCheckImeiCountTillDate(){
		var request = {
        "reportnameId": 184,
        "typeFlag": 1,
        "top": topValues
    	};
    	var containerName = "Top5ModelNamebyCheckImeiCountTillDate";
    	ajaxCall(request, containerName);
	}
	function Top5BrandNamebyCheckImeiCountTillDate(){
		var request = {
        "reportnameId": 185,
        "typeFlag": 1,
        "top": topValues
    	};
    	var containerName = "Top5BrandNamebyCheckImeiCountTillDate";
    	ajaxCall(request, containerName);
	}
	function CheckImeiCountByStatusBrand(){
		var request = {
        "reportnameId": 183,
        "typeFlag": 1,
        "top": topValues
    	};
    	var containerName = "CheckImeiCountByStatusBrand";
    	ajaxCall(request, containerName);
	}
	function ModelCheckIMEICountTillDateforStatus(Compliant){
		var request = {
        "reportnameId": 184,
        "typeFlag": 1,
        "top": topValues,
        "searchString":" compliance_status ='"+Compliant+"'"
    	};
    	var containerName = "ModelCheckIMEICountTillDateforStatus";
    	ajaxCall(request, containerName);
	}
	function BrandCheckIMEICountTillDateforStatus(Compliant){
		var request = {
        "reportnameId": 185,
        "typeFlag": 1,
        "top": topValues,
        "searchString":" compliance_status ='"+Compliant+"'"
    	};
    	var containerName = "BrandCheckIMEICountTillDateforStatus";
    	ajaxCall(request, containerName);
	}
	function CheckImeiCountByMonth(jsonData) {
    var request = {
        "reportnameId": 186,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByMonth";
    ajaxCall(request, containerName);
	}
	function CheckImeiCountByMonthandOperator(jsonData) {
    var request = {
        "reportnameId": 187,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    	var containerName = "CheckImeiCountByMonthandOperator";
    	ajaxCall(request, containerName);
	}

	function CheckImeiCountByMonthforOperator(jsonData) {
    var request = {
        "reportnameId": 187,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "searchString":" operator ='NA'",
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByMonthforOperator";
    ajaxCall(request, containerName);
}

function CheckImeiCountByMonthandLanguage(jsonData) {
    var request = {
        "reportnameId": 188,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByMonthandLanguage";
    ajaxCall(request, containerName);
}
function CheckImeiCountByMonthforLanguageen(json) {
    var request = {
        "reportnameId": 188,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "searchString":" language ='en'",
       "dateRange": json
    };
    var containerName = "CheckImeiCountByMonthforLanguageen";
    ajaxCall(request, containerName);
}
function CheckImeiCountByMonthandChannel(json) {
    var request = {
        "reportnameId": 189,
       	"typeFlag": 3,
       	"top": topValues,
       	"columnStacking": "normal", 
       	"dateRange": json
    };
    var containerName = "CheckImeiCountByMonthandChannel";
    ajaxCall(request, containerName);
}
function CheckImeiCountByMonthforChannelweb(json) {
    var request = {
        "reportnameId": 189,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "searchString":" channel ='web'",
       "dateRange": json
    };
    var containerName = "CheckImeiCountByMonthforChannelweb";
    ajaxCall(request, containerName);
}
function CheckImeiCountByMonthandBrowser(jsonData) {
    var request = {
        "reportnameId": 190,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByMonthandBrowser";
    ajaxCall(request, containerName);
}
function CheckImeiCountByMonthforBrowserChrome(jsonData) {
    var request = {
        "reportnameId": 190,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal",
       "searchString":" browser ='Chrome'", 
       "dateRange":jsonData
    };
    var containerName = "CheckImeiCountByMonthforBrowserChrome";
    ajaxCall(request, containerName);
}

function CheckImeiCountByMonthandOsType(json) {
    var request = {
        "reportnameId": 191,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": json
    };
    var containerName = "CheckImeiCountByMonthandOsType";
    ajaxCall(request, containerName);
}
function CheckImeiCountByMonthforOsios(jsonData) {
    var request = {
        "reportnameId": 191,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByMonthforOsios";
    ajaxCall(request, containerName);
}
function CheckImeiCountByMonthandStatus(jsonData) {
    var request = {
        "reportnameId": 192,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByMonthandStatus";
    ajaxCall(request, containerName);
}
function CheckImeiCountByMonthandStatus_CIRS(json) {
    var request = {
        "reportnameId": 192,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal", 
       "searchString":" status ='IMEI is CEIR Compliant'",
       "dateRange": json
    };
    var containerName = "CheckImeiCountByMonthandStatus_CIRS";
    ajaxCall(request, containerName);
}

/*###############################################################################*/

function CheckImeiCountByQuarterly(jsonData) {
    var request = {
        "reportnameId": 186,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByQuarterly";
    ajaxCall(request, containerName);
}
function CheckImeiCountByQuarterlyandOperator(jsonData) {
    var request = {
        "reportnameId": 187,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByQuarterlyandOperator";
    ajaxCall(request, containerName);
}

function CheckImeiCountByQuarterlyforOperator(jsonData) {
    var request = {
        "reportnameId": 187,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "searchString":" operator ='NA'",
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByQuarterlyforOperator";
    ajaxCall(request, containerName);
}

function CheckImeiCountByQuarterlyandLanguage(jsonData) {
    var request = {
        "reportnameId": 188,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByQuarterlyandLanguage";
    ajaxCall(request, containerName);
}
function CheckImeiCountByQuarterlyforLanguageen(json) {
    var request = {
        "reportnameId": 188,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "searchString":" language ='en'",
       "dateRange": json
    };
    var containerName = "CheckImeiCountByQuarterlyforLanguageen";
    ajaxCall(request, containerName);
}
function CheckImeiCountByQuarterlyandChannel(json) {
    var request = {
        "reportnameId": 189,
       	"typeFlag": 5,
       	"top": topValues,
       	"columnStacking": "normal", 
       	"dateRange": json
    };
    var containerName = "CheckImeiCountByQuarterlyandChannel";
    ajaxCall(request, containerName);
}
function CheckImeiCountByQuarterlyforChannelweb(json) {
    var request = {
        "reportnameId": 189,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "searchString":" channel ='web'",
       "dateRange": json
    };
    var containerName = "CheckImeiCountByQuarterlyforChannelweb";
    ajaxCall(request, containerName);
}
function CheckImeiCountByQuarterlyandBrowser(jsonData) {
    var request = {
        "reportnameId": 190,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByQuarterlyandBrowser";
    ajaxCall(request, containerName);
}
function CheckImeiCountByQuarterlyforBrowserChrome(jsonData) {
    var request = {
        "reportnameId": 190,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal",
       "searchString":" browser ='Chrome'", 
       "dateRange":jsonData
    };
    var containerName = "CheckImeiCountByQuarterlyforBrowserChrome";
    ajaxCall(request, containerName);
}

function CheckImeiCountByQuarterlyandOsType(json) {
    var request = {
        "reportnameId": 191,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": json
    };
    var containerName = "CheckImeiCountByQuarterlyandOsType";
    ajaxCall(request, containerName);
}
function CheckImeiCountByQuarterlyforOsios(jsonData) {
    var request = {
        "reportnameId": 191,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByQuarterlyforOsios";
    ajaxCall(request, containerName);
}
function CheckImeiCountByQuarterlyandStatus(jsonData) {
    var request = {
        "reportnameId": 192,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByQuarterlyandStatus";
    ajaxCall(request, containerName);
}
function CheckImeiCountByQuarterlyandStatus_CIRS(json) {
    var request = {
        "reportnameId": 192,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal", 
       "searchString":" status ='IMEI is CEIR Compliant'",
       "dateRange": json
    };
    var containerName = "CheckImeiCountByQuarterlyandStatus_CIRS";
    ajaxCall(request, containerName);
}

/*############################################################################################*/

function CheckImeiCountByYearly(jsonData) {
    var request = {
        "reportnameId": 186,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByYearly";
    ajaxCall(request, containerName);
}
function CheckImeiCountByYearlyandOperator(jsonData) {
    var request = {
        "reportnameId": 187,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByYearlyandOperator";
    ajaxCall(request, containerName);
}

function CheckImeiCountByYearlyforOperator(jsonData) {
    var request = {
        "reportnameId": 187,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "searchString":" operator ='NA'",
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByYearlyforOperator";
    ajaxCall(request, containerName);
}

function CheckImeiCountByYearlyandLanguage(jsonData) {
    var request = {
        "reportnameId": 188,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByYearlyandLanguage";
    ajaxCall(request, containerName);
}
function CheckImeiCountByYearlyforLanguageen(json) {
    var request = {
        "reportnameId": 188,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "searchString":" language ='en'",
       "dateRange": json
    };
    var containerName = "CheckImeiCountByYearlyforLanguageen";
    ajaxCall(request, containerName);
}
function CheckImeiCountByYearlyandChannel(json) {
    var request = {
        "reportnameId": 189,
       	"typeFlag": 4,
       	"top": topValues,
       	"columnStacking": "normal", 
       	"dateRange": json
    };
    var containerName = "CheckImeiCountByYearlyandChannel";
    ajaxCall(request, containerName);
}
function CheckImeiCountByYearlyforChannelweb(json) {
    var request = {
        "reportnameId": 189,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "searchString":" channel ='web'",
       "dateRange": json
    };
    var containerName = "CheckImeiCountByYearlyforChannelweb";
    ajaxCall(request, containerName);
}
function CheckImeiCountByYearlyandBrowser(jsonData) {
    var request = {
        "reportnameId": 190,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByYearlyandBrowser";
    ajaxCall(request, containerName);
}
function CheckImeiCountByYearlyforBrowserChrome(jsonData) {
    var request = {
        "reportnameId": 190,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal",
       "searchString":" browser ='Chrome'", 
       "dateRange":jsonData
    };
    var containerName = "CheckImeiCountByYearlyforBrowserChrome";
    ajaxCall(request, containerName);
}

function CheckImeiCountByYearlyandOsType(json) {
    var request = {
        "reportnameId": 191,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": json
    };
    var containerName = "CheckImeiCountByYearlyandOsType";
    ajaxCall(request, containerName);
}
function CheckImeiCountByYearlyforOsios(jsonData) {
    var request = {
        "reportnameId": 191,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByYearlyforOsios";
    ajaxCall(request, containerName);
}
function CheckImeiCountByYearlyandStatus(jsonData) {
    var request = {
        "reportnameId": 192,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "dateRange": jsonData
    };
    var containerName = "CheckImeiCountByYearlyandStatus";
    ajaxCall(request, containerName);
}
function CheckImeiCountByYearlyandStatus_CIRS(json) {
    var request = {
        "reportnameId": 192,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal", 
       "searchString":" status ='IMEI is CEIR Compliant'",
       "dateRange": json
    };
    var containerName = "CheckImeiCountByYearlyandStatus_CIRS";
    ajaxCall(request, containerName);
}


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
            $("#reportRefresh").text("Report Refresh Date and Time: "+(result.repRef).split("T")[0]+" "+(result.repRef).split("T")[1]);
            $("#tablet").text(result.tablet);
            $("#smartphone").text(result.sP);
            $("#mobilePhone").text(result.mP);
            $("#totalValid").text(result.tV);
            $("#nullImei").text(result.nullImei);
            /*$("#previousRefresh").text("Refresh Date and Time: "+(result.preRef).split("T")[0]+" "+(result.preRef).split("T")[1]);*/
           $("#previousRefresh").text('');
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
