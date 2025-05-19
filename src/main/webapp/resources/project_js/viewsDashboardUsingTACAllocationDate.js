//  NA-0;Till Date-1;Daily-2;Monthly-3;Yearly-4;Quarterly-5
var featureId = 77;
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
var top=5;
var startDate="2018-01-01";
var endDate="2024-03-30";
var role = currentRoleType == null ? roleType : currentRoleType;

$(document).ready(function () {
    console.log("ready!");
    TacCountbyTop5OStypeAndTacAllocatedMonth()
	
    
});

function TacCountbyTop5OStypeAndTacAllocatedMonth() {
    var request = {
        "reportnameId": 151,
        "typeFlag": 3,
        "top": top,
       // "columnStacking": "normal",
        "dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]
    };
    var containerName = "tacCountbyTop5OStypeAndTacAllocatedMonth";
    ajaxCall(request, containerName);
}

function TacCountbyTop5devicetypeAndTacAllocatedMonth() {
    var request = {
        "reportnameId": 152,
        "typeFlag": 3,
        "top": top,
       // "columnStacking": "normal",
        "dateRange": [
            {"startDate": startDate, "endDate": endDate}
        ]
    };
    var containerName = "tacCountbyTop5devicetypeAndTacAllocatedMonth";
    ajaxCall(request, containerName);
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
    if(charttype === 'pie'){
        alert( String(request) + ' Pie Name : '+event.point.name+ ', charttype : '+charttype+', request : '+String(request) );
    }else{
        alert( String(request) + 'Selected Name : '+ event.point.category+ ', charttype : '+charttype+', request : '+String(request) );
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
