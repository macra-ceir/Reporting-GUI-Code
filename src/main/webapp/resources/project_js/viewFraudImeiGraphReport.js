var roleType = $("body").attr("data-roleType");
var userId = $("body").attr("data-userID");
var currentRoleType = $("body").attr("data-selected-roleType");
var lang=window.parent.$('#langlist').val() == 'km' ? 'km' : 'en';
var topValues=parseInt("5");
var endDate=getTodayDate();
var role = currentRoleType == null ? roleType : currentRoleType;
var startDate="2021-01-01";
var endDate=getTodayDate();
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
	//console.log(today);
	return today;
}

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

      $("#refresh_select_date_m6").on('click', function () {
    	  	arr = [];
    	 	var data1=  $('#monthTomonthId').val()+'';
    	 	var data=  data1.split(",");
    	 	$.each(data, function( index, value ) {
				arr.push({"startDate": ""+value.split("#")[0]+"", "endDate": ""+value.split("#")[1]+""});
			});
			if(data1=='' || data1==null || data1===""){
				arr.push({"startDate": startDate, "endDate": endDate});
			}

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

      });

 });


$(document).ready(function(){
  $('#whatIstopID').on('change', function() {
	var id = $('#whatIstopID').find(":selected").val();
	topValues=parseInt(id);
    ajaxCallDashboard();

    totalImeiCount();
    totalFailCount();
    totalSuccessCount();
    totalFraudImeiRemovedCount();

	arr=[];
	arr.push({"startDate": startDate, "endDate": endDate});
    MonthlyReportsData(arr);
    YearlyReportsData(arr);
    QuarterlyReportsData(arr);

  });
});

$(document).ready(function () {
    //console.log("ready!");
    $('#gtabId1').click(function() {
		//alert("tab1");
		$("#refresh_select_date").css("display","none");
		$("#whatIstopID_li").css("display","block");
		$("#yearToyearId_li").css("display","none");
		$("#qtyToqtyId_li").css("display","none");
		$("#monthTomonthId_li").css("display","none");
		$("#refresh_select_date_qtr3").css("display","none");
		$("#refresh_select_date_yrs4").css("display","none");
		$("#refresh_select_date_m6").css("display","none");
		$("#refresh_select_date_qtr7").css("display","none");
		$("#refresh_select_date_yrs8").css("display","none");

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
    	$("#yearToyearId_li").css("display","none");
		$("#qtyToqtyId_li").css("display","none");
		$("#monthTomonthId_li").css("display","block");
		arr=[];
		arr.push({"startDate": startDate, "endDate": endDate});
		MonthlyReportsData(arr);

		// Last day of the current month (e.g., 2025-05-31)
		const now = new Date();
        const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];
        ////console.log("lastDayOfMonth " +lastDayOfMonth);
		generateMonthOptions("2023-01-01", lastDayOfMonth);


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
		arr=[];
		arr.push({"startDate": startDate, "endDate": endDate});
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            const currentDateStr = `${yyyy}-${mm}-${dd}`;
            generateQuarterOptions("2023-01-01", currentDateStr);
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
    	$("#yearToyearId_li").css("display","block");
		$("#qtyToqtyId_li").css("display","none");
		$("#monthTomonthId_li").css("display","none");
		arr=[];
		arr.push({"startDate": startDate, "endDate": endDate});

		const currentYear = new Date().getFullYear();
        generateYearOptions(2020, currentYear);
        YearlyReportsData(arr);
    });
    ajaxCallDashboard();
    totalImeiCount();
	totalFraudImeiRemovedCount();

	arr=[];
	arr.push({"startDate": startDate, "endDate": endDate});
    MonthlyReportsData(arr);
    YearlyReportsData(arr);
    QuarterlyReportsData(arr);


});

function MonthlyReportsData(jsonData){
	try {
		FraudImeiDetectedMonthly(jsonData);
		fraudImeiAcceptedMonthly(jsonData);
		fraudImeiRejectedMonthly(jsonData);
		fraudImeiRemovedMonthly(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
};

function YearlyReportsData(jsonData){
	try {
		fraudImeiDetectedYearly(jsonData);
		fraudImeiAcceptedYearly(jsonData);
		fraudImeiRejectedYearly(jsonData);
		fraudImeiRemovedYearly(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
};

function QuarterlyReportsData(jsonData){
	try {
		fraudImeiDetectedQuarterly(jsonData);
		fraudImeiAcceptedQuarterly(jsonData);
		fraudImeiRejectedQuarterly(jsonData);
		fraudImeiRemovedQuarterly(jsonData);
	}
	catch(err) {
		console.error(err, err.stack);
	}
};



function totalFraudImeiRemovedCount(){
    var request = {
            "reportnameId": 341,
            "typeFlag": 1,
            "top": topValues
            /*"dateRange": [
                {"startDate": "2022-01-01", "endDate": "2024-03-30"}
            ]*/
        };
        var containerName = "totalFraudImeiRemovedCount";
        ajaxCall(request, containerName);
};

function totalImeiCount(){
    var request = {
            "reportnameId": 359,
            "typeFlag": 1,
            "top": topValues
            /*"dateRange": [
                {"startDate": "2022-01-01", "endDate": "2024-03-30"}
            ]*/
        };
        var containerName = "totalImeiCount";
        ajaxCall(request, containerName);
};


//------------Fraud Imei Monthly Report Start ------------------------//

function FraudImeiDetectedMonthly(jsonData) {
  var request = {
        "reportnameId": 279,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal",
       "dateRange": jsonData

            /*{"startDate": startDate, "endDate": endDate}*/

    };
    var containerName = "FraudImeiDetectedMonthly";
    ajaxCall(request, containerName);
}

function fraudImeiAcceptedMonthly(jsonData) {
    var request = {
        "reportnameId": 281,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal",
       "dateRange": jsonData

            /*{"startDate": startDate, "endDate": endDate}*/

    };
    var containerName = "fraudImeiAcceptedMonthly";
    ajaxCall(request, containerName);
}

function fraudImeiRejectedMonthly(jsonData) {
    var request = {
        "reportnameId": 280,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal",
       "dateRange": jsonData

            /*{"startDate": startDate, "endDate": endDate}*/

    };
    var containerName = "fraudImeiRejectedMonthly";
    ajaxCall(request, containerName);
}

function fraudImeiRemovedMonthly(jsonData) {
    var request = {
        "reportnameId": 282,
       "typeFlag": 3,
       "top": topValues,
       "columnStacking": "normal",
       "dateRange": jsonData

            /*{"startDate": startDate, "endDate": endDate}*/

    };
    var containerName = "fraudImeiRemovedMonthly";
    ajaxCall(request, containerName);
}

//------------Fraud Imei Monthly Report End ------------------------//


//------------Fraud Imei Yearly Report Start ------------------------//

function fraudImeiDetectedYearly(jsonData) {
    var request = {
        "reportnameId": 279,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal",
       "dateRange": jsonData
    };
    var containerName = "fraudImeiDetectedYearly";
    ajaxCall(request, containerName);
}

function fraudImeiAcceptedYearly(jsonData) {
    var request = {
        "reportnameId": 281,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal",
       "dateRange": jsonData
    };
    var containerName = "fraudImeiAcceptedYearly";
    ajaxCall(request, containerName);
}

function fraudImeiRejectedYearly(jsonData) {
    var request = {
        "reportnameId": 280,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal",
       "dateRange": jsonData
    };
    var containerName = "fraudImeiRejectedYearly";
    ajaxCall(request, containerName);
}


function fraudImeiRemovedYearly(jsonData) {
    var request = {
        "reportnameId": 282,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal",
       "dateRange": jsonData
    };
    var containerName = "fraudImeiRemovedYearly";
    ajaxCall(request, containerName);
}


//------------Fraud Imei Yearly Report End ------------------------//

function YearlyTopMarketingName(jsonData) {
    var request = {
        "reportnameId": 120,
       "typeFlag": 4,
       "top": topValues,
       "columnStacking": "normal",
       "dateRange": jsonData
    };
    var containerName = "YearlyTopMarketingName";
    ajaxCall(request, containerName);
}

//------------Fraud Imei Quarterly Report Start ------------------------//

function fraudImeiDetectedQuarterly(jsonData) {
    var request = {
        "reportnameId": 279,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal",
       "dateRange": jsonData
    };
    var containerName = "fraudImeiDetectedQuarterly";
    ajaxCall(request, containerName);
}

function fraudImeiAcceptedQuarterly(jsonData) {
    var request = {
        "reportnameId": 281,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal",
       "dateRange": jsonData
    };
    var containerName = "fraudImeiAcceptedQuarterly";
    ajaxCall(request, containerName);
}

function fraudImeiRejectedQuarterly(jsonData) {
    var request = {
        "reportnameId": 280,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal",
       "dateRange": jsonData
    };
    var containerName = "fraudImeiRejectedQuarterly";
    ajaxCall(request, containerName);
}

function fraudImeiRemovedQuarterly(jsonData) {
    var request = {
        "reportnameId": 282,
       "typeFlag": 5,
       "top": topValues,
       "columnStacking": "normal",
       "dateRange": jsonData
    };
    var containerName = "fraudImeiRemovedQuarterly";
    ajaxCall(request, containerName);
}

//------------Fraud Imei Quarterly Report Ends ------------------------//


function ajaxCallDashboard() {
	var request={
			"reportnameId": 360
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
            //console.log(result);
            $("#totalCount").text(result.tt);
            $("#totalSuccessImeiCount").text(result.tS);
            $("#totalFailedImeiCount").text(result.tF);
            $("#totalRemovedImeiCount").text(result.tR);

            $("#reportRefresh").text("Report Refresh Date and Time: "+(result.repRef).split("T")[0]+" "+(result.repRef).split("T")[1]);
            //$("#reportRefresh").text("Report Refresh Date and Time: 8 May 2025 17:41:28");




           //$("#previousRefresh").text('');
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
    if (JSON.parse(result).chartType === "pie" || JSON.parse(result).catogery.length === 0) {
        generatePieChart(request, result, containerName);
    } else {
        generateChart(request, result, containerName);
    }
};


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


function generateMonthOptions(startDateStr, endDateStr) {
        const select = document.getElementById("monthTomonthId");
        const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

        let startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        // Reset select options
        select.innerHTML = "";

        while (startDate <= endDate) {
            const year = startDate.getFullYear();
            const month = startDate.getMonth();
            const monthStr = monthNames[month];

            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0); // Last day of month

            const option = document.createElement("option");
            option.value = `${firstDay.toISOString().split('T')[0]}#${lastDay.toISOString().split('T')[0]}`;
            option.textContent = `${year} ${monthStr}`;
            select.appendChild(option);

            // Move to next month
            startDate.setMonth(startDate.getMonth() + 1);
        }
    }

function generateQuarterOptions(startDateStr, endDateStr) {
    const select = document.getElementById("qtyToqtyId");
    select.innerHTML = ""; // Clear existing options

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const quarters = [
        { q: "Q1", startMonth: 0, endMonth: 2 },   // Jan to Mar
        { q: "Q2", startMonth: 3, endMonth: 5 },   // Apr to Jun
        { q: "Q3", startMonth: 6, endMonth: 8 },   // Jul to Sep
        { q: "Q4", startMonth: 9, endMonth: 11 }   // Oct to Dec
    ];

    let year = startDate.getFullYear();
    let month = startDate.getMonth();

    while (new Date(year, month, 1) <= endDate) {
        for (let i = 0; i < 4; i++) {
            const q = quarters[i];
            const qStart = new Date(year, q.startMonth, 1);
            const qEnd = new Date(year, q.endMonth + 1, 0); // Last day of quarter

            if (qStart > endDate) break;

            // Only include quarters that are within the given range
            if (qEnd >= startDate) {
                const option = document.createElement("option");
                option.value = `${qStart.toISOString().split('T')[0]}#${qEnd.toISOString().split('T')[0]}`;
                option.textContent = `${year} ${q.q}`;
                select.appendChild(option);
            }
        }
        year++;
    }
};


function generateYearOptions(startYear, endYear) {
    const select = document.getElementById("yearToyearId");
    select.innerHTML = "";

    for (let year = startYear; year <= endYear; year++) {
        const option = document.createElement("option");
        option.value = `${year}-01-01#${year}-12-31`;
        option.textContent = `${year}`;
        select.appendChild(option);
    }
};

