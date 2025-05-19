
var featureId = 55;
var cierRoletype = sessionStorage.getItem("cierRoletype");
var userType = $("body").attr("data-roleType");
var lang = window.parent.$('#langlist').val() == 'km' ? 'km' : 'en';
var tac;
var elem;
$.i18n().locale = lang;
var documenttype, selectfile, selectDocumentType;
$.i18n().load({
	'en': './resources/i18n/en.json',
	'km': './resources/i18n/km.json'
}).done(function() {
	selectfile = $.i18n('selectfile');
});

var userId = parseInt($("body").attr("data-userID"));
$(document).ready(function() {
	pageRendering(null, null);
	DeviceDataTable(lang, null, null, null);
});


function DeviceDataTable(lang, source, action, deviceId) {
	var source__val;
	if (source == 'filter') {
		source__val = source;
	} else {
		source__val = $("body").attr("data-session-source");
	}
	//alert ("1 with action" +action+" and deviceId--" +deviceId);

	if (action == 'viewHistory') {
		//alert ("2 with action" +action+" and deviceId--" +deviceId);
		viewHistoryDatatable('headers?type=deviceHistoryHeaders&lang=' + lang, 'getDeviceHistory?requestType=viewHistory&source=menu', deviceId);
	} else if (action == 'multiedit' && $('#multiEditButton').is(':checked') == true) {
		//alert ("3 with action" +action);
		DataTable('headers?type=deviceManagementHeaders&lang=' + lang + '&requestType=multiedit', 'deviceManagementData?source=' + source__val + '&requestType=multiedit');
	} else {
		DataTable('headers?type=deviceManagementHeaders&lang=' + lang, 'deviceManagementData?source=' + source__val);
	}

	$('#multiEditButton').change(function() {
		if (this.checked) {
			//name=ferret&color=purple
			DataTable('headers?type=deviceManagementHeaders&lang=' + lang + '&requestType=multiedit', 'deviceManagementData?source=' + source__val + '&requestType=multiedit');
			$("#editDeviceBtn").css("display", "block");
			$("#addDeviceBtn").css("display", "none");

		} else {
			DataTable('headers?type=deviceManagementHeaders&lang=' + lang, 'deviceManagementData?source=' + source__val);
			$("#editDeviceBtn").css("display", "none");
			$("#addDeviceBtn").css("display", "block");
		}
	});


}

var multiEditCount = 0;

//**************************************************Device Management table**********************************************

function DataTable(Url, dataUrl) {
	var filterRequest = {
		"createdOn": $('#startDate').val(),
		"modifiedOn": $('#endDate').val(),
		"deviceId": $('#filterTac').val(),
		"brandName": $('#filterBrandName').val(),
		"modelName": $('#filterModelName').val(),
		"os": $('#filterOs').val(),
		"mdrStatus": $('#filterStatus').val(),
		"featureId": parseInt(featureId),
		"userId": parseInt($("body").attr("data-userID")),
		"userType": $("body").attr("data-roleType"),
		//"userType" : parseInt($("body").attr("data-userTypeID")),
		"userTypeId": parseInt($("body").attr("data-userTypeID"))
	}
	//console.log(JSON.stringify(filterRequest));
	if (lang == 'km') {
		var langFile = './resources/i18n/khmer_datatable.json';
	} else if (lang == 'en') {
		var langFile = './resources/i18n/english_datatable.json';
	}

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
		success: function(result) {
			var table = $("#LibraryTable").DataTable({
				destroy: true,
				"serverSide": true,
				orderCellsTop: true,
				"ordering": true,
				"bPaginate": true,
				"bFilter": false,
				"bInfo": true,
				"bSearchable": true,
				"oLanguage": {
					"sUrl": langFile
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
					url: dataUrl,
					type: 'POST',
					dataType: "json",
					data: function(d) {
						d.filter = JSON.stringify(filterRequest);
					},
					error: function(jqXHR, textStatus, errorThrown, data) {
						window.parent.$('#msgDialog').text($.i18n('500ErrorMsg'));
						// messageWindow(jqXHR['responseJSON']['message']);
						window.parent.$('#500ErrorModal').openModal({
							dismissible: false
						});

					}

				},
				"columns": result
			});



			$('#LibraryTable tbody').on('click', 'tr', function() {
				var rawCheckboxId = $(this).closest('tr').find("input[type=checkbox]").attr('id');
				//alert("rawCheckboxId is "+rawCheckboxId);
				if ($('#' + rawCheckboxId).is(":checked") == true) {
					$(this).removeClass('table.dataTable tbody tr');
					$(this).addClass('trselected');
				} else {
					$(this).removeClass('trselected');
					$(this).addClass('table.dataTable tbody tr');
				}
			});





		},
		error: function(jqXHR, textStatus, errorThrown) {
		}
	});
}



function selectAllCheckbox() {
	if ($("#selectAllCheckbox").is(':checked') === true) {
		$('#LibraryTable').find("input[type=checkbox]").prop("checked", true);
		$('#LibraryTable tbody tr').removeClass('table.dataTable tbody tr');
		$('#LibraryTable tbody tr').addClass('trselected');
	} else if ($("#selectAllCheckbox").is(':checked') === false) {
		$('#LibraryTable').find("input[type=checkbox]").prop("checked", false);
		$('#LibraryTable tbody tr').removeClass('trselected');
		$('#LibraryTable tbody tr').addClass('table.dataTable tbody tr');
	}
}

$('#multiEditButton').change(function() {
	if (this.checked) {
		$("#editDeviceBtn").css("display", "block");
		$("#addDeviceBtn").css("display", "none");
	} else {
		$("#editDeviceBtn").css("display", "none");
		$("#addDeviceBtn").css("display", "block");

	}
	multiEditCount = 0;
});






//**************************************************Device Management page filter area**********************************************

function pageRendering(requestType, deviceId) {
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers:
			{ 'X-CSRF-TOKEN': token }
	});

	$.ajax({
		url: 'deviceManagement/pageRendering?requestType=' + requestType,
		type: 'POST',
		dataType: "json",
		success: function(data) {
			if (requestType !== "viewHistory") {
				//alert("requestType is-" +requestType);
				data.userStatus == "Disable" ? $('#btnLink').addClass("eventNone") : $('#btnLink').removeClass("eventNone");


				elem = data.pageTitle;
				$("#pageHeaderTitle").append(elem);
				var button = data.buttonList;

				$("#pageHeader").append("<button type='button' id='addDeviceBtn' class='btn btn-outline-dark' onclick='addDevices()'>+ Add Device</button>");
				$("#pageHeader").append("<button type='button' id='editDeviceBtn' class='btn btn-outline-dark' onclick='viewMultipleEdit()' style='display: none'>Edit Devices</button>");
				$("#pageHeader").append("<button type='button' id='backBtn' class='btn btn-outline-dark' onclick='backButton()' style='display: none'>Back</button>");

				var date = data.inputTypeDateList;
				for (i = 0; i < date.length; i++) {
					if (date[i].type === "date") {
						$("#dataTableDiv").append("<div class='form-group'>" +
							"<label for=" + date[i].id + ">" + date[i].title + "</label>" +
							"<input class='form-control text-uppercase' type='date' onchange='checkDate(startDate,endDate)' id=" + date[i].id + " autocomplete='off'>"
						);
					}
					else if (date[i].type === "text") {
						$("#dataTableDiv").append("<div class='form-group'><label for=" + date[i].id + " class='center-align'>" + date[i].title + "</label><input type=" + date[i].type + " class='form-control' id=" + date[i].id + " placeholder='Enter here' maxlength='19'/></div>");
						//<div class="form-group"><label for="transactionID">TransactionID</label><input type="text" class="form-control" id="transactionID" maxlength="19"></div>

					}
				}



				// dynamic dropdown portion
				var dropdown = data.dropdownList;
				for (i = 0; i < dropdown.length; i++) {
					var dropdownDiv =
						$("#dataTableDiv").append(
							"<div class='form-group'>" +
							//"<input type='text' class='select-dropdown' readonly='true' data-activates='select-options-1023d34c-eac1-aa22-06a1-e420fcc55868' value='Consignment Status'>"+
							"<label for=" + dropdown[i].id + ">" + dropdown[i].title + "</label>" +
							"<select id=" + dropdown[i].id + "  class='form-control'>" +
							"<option value='-1' selected>" + dropdown[i].title +
							"</option>" +
							"</select>" +
							"</div>" +
							"</div>");
				}

				var viewFilter = "viewFilter";
				$("#filterButtonDiv").append("<div><button type='button' class='btn btn-light' id='clearFilter'>" + $.i18n('clearFilter') + "</button></div>");
				$("#filterButtonDiv").append("<div><button type='button' class='btn btn-primary'  id='submitFilter'><span><img src='./resources/assets/images/filter-icon.svg' alt='icon' class='img-fluid ml-1'></span></button></div>");
				$("#filterButtonDiv").append("<div><button type='button' class='btn btn-outline-dark' onclick='exportData()'>" + $.i18n('Export') + "<img src='./resources/assets/images/download-icon.svg' alt='icon' class='img-fluid ml-1'></button>");
				$('#clearFilter').attr("onclick", "Resetfilter('filterform',null)");

				for (i = 0; i < button.length; i++) {
					$('#' + button[i].id).text(button[i].buttonTitle);
					if (button[i].type === "HeaderButton") {
						$('#' + button[i].id).attr("href", button[i].buttonURL);
					}
					else {
						$('#' + button[i].id).attr("onclick", button[i].buttonURL);
					}
				}
				setAllDropdown();

			} else {
				//$("#historyFilterform").empty();
				//alert("deviceId is-" +deviceId);
				//alert("requestType is-" +requestType);
				//$("#filterBox2").html("");
				//$("#filterBox2").empty();
				var button = data.buttonList;
				var date = data.inputTypeDateList;
				$("#historydataTableDiv").empty();
				for (i = 0; i < date.length; i++) {
					if (date[i].type === "date") {
						$("#historydataTableDiv").append("<div class='form-group'>" +
							"<label for=" + date[i].id + ">" + date[i].title + "</label>" +
							"<input class='form-control text-uppercase' type='date' onchange='checkDate(startDate,endDate)' id=" + date[i].id + " autocomplete='off'>"
						);
					}
					else if (date[i].type === "text") {
						$("#historydataTableDiv").append("<div class='form-group'><label for=" + date[i].id + " class='center-align'>" + date[i].title + "</label><input type=" + date[i].type + " class='form-control' id=" + date[i].id + " placeholder='Enter here' maxlength='19'/></div>");
						//<div class="form-group"><label for="transactionID">TransactionID</label><input type="text" class="form-control" id="transactionID" maxlength="19"></div>

					}
				}
				$("#historyfilterButtonDiv").empty();
				$("#historyfilterButtonDiv").append("<div><button type='button' class='btn btn-light' id='clearHistoryFilter'>" + $.i18n('clearFilter') + "</button></div>");
				$("#historyfilterButtonDiv").append("<div><button type='button' class='btn btn-primary' id='historyFilter' >Apply Filter<span><img src='./resources/assets/images/filter-icon.svg' alt='icon' class='img-fluid ml-1'></span></button></div>");
				$('#historyFilter').attr('onclick', "DeviceDataTable(null,'filter','viewHistory','" + deviceId + "')");
				//DeviceDataTable(null,null,'viewHistory',null)
				//function DeviceDataTable(lang,source,action,deviceId)

				//onclick='DeviceDataTable(null,'filter','viewHistory',null)'	
				//$('#submitFilter').attr("onclick", "DeviceDataTable()");
				$('#clearHistoryFilter').attr("onclick", "Resetfilter('historyFilterform','" + deviceId + "')");
				$("#filterform").css("display", "none");
				$("#dataTableDiv").css("display", "none");
				$("#multiEditDiv").css("display", "none");
				$("#filterButtonDiv").css("display", "none");
				$("#addDeviceBtn").css("display", "none");
				$("#pageHeaderTitle").text('History');
				$("#historydataTableDiv").show();
				$("#historyfilterButtonDiv").show();
				$("#backBtn").css("display", "block");


			}
		}

	});
};


function addDevices() {
	$("#datatableViewDiv").css("display", "none");
	$("#addMobileDetailDiv").css("display", "block");
}

function viewMultipleEdit() {
	var multipleDeviceId = new Array();
	var tableIds = new Array();
	$("input[name='selector']:checked").each(function() {
		multipleDeviceId.push($(this).val());
		multiEditCount += 1;
	});
	//console.log("selected Id's' are: " + multipleDeviceId);
	viewDetails(multipleDeviceId, 'Multiedit');
}

function setAllDropdown() {

	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers:
			{ 'X-CSRF-TOKEN': token }
	});

	$.getJSON('./getDropdownList/' + featureId + '/' + $("body").attr("data-userTypeID"), function(data) {
		for (i = 0; i < data.length; i++) {
			$('<option>').val(data[i].state).text(data[i].interp)
				.appendTo('#filterStatus');
		}
	});

	$.getJSON('./getDropdownList/MULTI_SIM_STATUS', function(data) {
		for (i = 0; i < data.length; i++) {
			$('<option>').val(data[i].value).text(data[i].interp)
				.appendTo('#editSimSlots,#editnumberofIMEI,#addSimSlots,#addnumberofIMEI');
		}
	});

	$.getJSON('./getDropdownList/SELFIE_CAMERA_TYPE', function(data) {
		for (i = 0; i < data.length; i++) {
			$('<option>').val(data[i].value).text(data[i].interp)
				.appendTo('#editSelfieCameratype,#addSelfieCameratype');
		}
	});

	$.getJSON('./getDropdownList/MAIN_CAMERA_TYPE', function(data) {
		for (i = 0; i < data.length; i++) {
			$('<option>').val(data[i].value).text(data[i].interp)
				.appendTo('#editTriple,#addTriple');
		}
	});

	$.getJSON('./getDropdownList/COMMS_RADIO', function(data) {
		for (i = 0; i < data.length; i++) {
			$('<option>').val(data[i].value).text(data[i].interp)
				.appendTo('#editRadioSupport,#addRadioSupport');
		}
	});

	$.getJSON('./getDropdownList/COMMS_NFC', function(data) {
		for (i = 0; i < data.length; i++) {
			$('<option>').val(data[i].value).text(data[i].interp)
				.appendTo('#editNFCSupport,#addNFCSupport');
		}
	})

	$.getJSON('./getDropdownList/SOUND_3.5MM_JACK', function(data) {
		for (i = 0; i < data.length; i++) {
			$('<option>').val(data[i].value).text(data[i].interp)
				.appendTo('#editSoundJack,#addSoundJack');
		}
	});

	$.getJSON('./getDropdownList/SOUND_LOUDSPEAKER', function(data) {
		for (i = 0; i < data.length; i++) {
			$('<option>').val(data[i].value).text(data[i].interp)
				.appendTo('#editLoudspeaker,#addLoudspeaker');
		}
	});

	$.getJSON('./getDropdownList/MEMORY_CARD_SLOT', function(data) {
		for (i = 0; i < data.length; i++) {
			$('<option>').val(data[i].value).text(data[i].interp)
				.appendTo('#editMemoryCardSlot,#addMemoryCardSlot');
		}
	});

	$.getJSON('./getDropdownList/SOFTSIM_SUPPORT', function(data) {
		for (i = 0; i < data.length; i++) {
			$('<option>').val(data[i].value).text(data[i].interp)
				.appendTo('#editSoftSimSupport,#addSoftSimSupport');
		}
	});

	$.getJSON('./getDropdownList/ESIM_SUPPORT', function(data) {
		for (i = 0; i < data.length; i++) {
			$('<option>').val(data[i].value).text(data[i].interp)
				.appendTo('#editSimSupport,#addSimSupport');
		}
	});

	$.getJSON('./productList', function(data) {
		for (i = 0; i < data.length; i++) {
			$('<option>').val(data[i].brandName).text(data[i].brandName)
				.appendTo('#copyFromBrandName');
		}
	});
}




function viewDetails(deviceIds, Action) {
	var deviceId;
	//console.log("Action Recieved " +Action+" with Device ID " +deviceIds);
	Action == 'Multiedit' ? deviceId = deviceIds[0] : deviceId = deviceIds;

	var RequestData = {
		"deviceId": deviceId,
		"featureId": parseInt(featureId),
		"userId": parseInt($("body").attr("data-userID")),
		"userType": $("body").attr("data-roleType"),
		//"userType" : parseInt($("body").attr("data-userTypeID")),
		"userTypeId": parseInt($("body").attr("data-userTypeID"))
	}
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers:
			{ 'X-CSRF-TOKEN': token }
	});
	$.ajax({
		url: 'viewbyDeviceID',
		data: JSON.stringify(RequestData),
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		type: 'POST',
		success: function(data) {
			//console.log(data);
			if (Action == "View") {
				console.log("in view part with Action recieved " + Action);
				setViewPopupData(data);
				$("#datatableViewDiv").css("display", "none");
				$("#mobileDetailViewDiv").css("display", "block");
			} else if (Action == "viewDetailHistory") {
				setViewPopupData(data);
				$("#datatableViewDiv").css("display", "none");
				$("#mobileDetailViewDiv").css("display", "block")
				$("#viewdetailedHistoryLabel").css("display", "block");
				$("#viewModelLabel,#editFromViewBtn").css("display", "none");
			} else if (Action == "copyView") {
				console.log("in copyView part  Action recieved " + Action);
				setcopyViewPopupData(data);
			} else if (Action == "EditfromView") {
				setEditPopupData(data, Action, deviceIds.toString());
				$("#datatableViewDiv").css("display", "none");
				$("#mobileDetailViewDiv").css("display", "none");
				$("#mobileDetailEditDiv").css("display", "block");
				$('#cancelbtn').attr("onclick", "closeEditPage()");
			} else {
				console.log("in Edit part  Action recieved " + Action);
				setEditPopupData(data, Action, deviceIds.toString());
				$("#datatableViewDiv").css("display", "none");
				$("#mobileDetailViewDiv").css("display", "none");
				$("#mobileDetailEditDiv").css("display", "block");
				$('#cancelbtn').attr("onclick", "closeBtnfromEdit()");
				//console.log("in setEditPopupData Action Recieved " +Action+" with Device ID " +deviceId);
			}
		},
		error: function() {
			//alert("Failed");
		}
	});
}
function closeBtnfromEdit() {
	$("#mobileDetailEditDiv").css("display", "none");
	$("#datatableViewDiv").css("display", "block");
	$('#subFrameEdit0,#subFrameEdit1,#subFrameEdit2,#subFrameEdit3,#subFrameEdit4').attr('src', '');
	//$("#mainFrame").attr("src", '');

}

function setcopyViewPopupData(data) {
	$("#copyViewbrand").text(data.content[0].brandName);
	$("#copyViewmodelName").text(data.content[0].modelName);
	$("#copyViewOsType").text(data.content[0].os);
	$("#copyViewMarketingName").text(data.content[0].marketingName);
	$("#copyViewManufacturer").text(data.content[0].manufacturer);
	$("#copyViewManufacturingAddress").text(data.content[0].manufacturingLocation);
	$("#copyViewdevicestatus").text(data.content[0].deviceStatus);
	$("#copyViewOrganizationID").text(data.content[0].organizationId);
	$("#copyViewDeviceIDAllocationDate").text(data.content[0].organizationId);
	$('#copyButton').attr("onclick", "copyDetails('" + data.content[0].deviceId + "','copy')");
	previewRegistrtionFile(data.content[0].attachedFiles, 'copyView');
}


function setViewPopupData(data) {
	//console.log("set view data" +JSON.stringify(data.content[0].brandName));
	$('#editFromViewBtn').attr("onclick", "viewDetails('" + data.content[0].deviceId + "','EditfromView')");
	$("#viewManufacturer").text(data.content[0].manufacturer);
	$("#viewMarketingname").text(data.content[0].marketingName);
	$("#viewtac").text(data.content[0].deviceId);
	$("#viewManAddress").text(data.content[0].manufacturingLocation);
	$("#viewbrand").text(data.content[0].brandName);
	$("#viewModel").text(data.content[0].modelName);
	$("#viewNetworktech").text(data.content[0].networkTechnologyGSM);
	$("#viewnetworkBand2G").text(data.content[0].network2GBand);
	$("#viewnetworkBand3G").text(data.content[0].network3GBand);
	$("#viewnetworkBand4G").text(data.content[0].network4GBand);
	$("#viewnetworkBand5G").text(data.content[0].network5GBand);
	$("#viewnetworkspeed").text(data.content[0].networkSpeed);
	$("#BrandDetails").text(data.content[0].bandDetail);
	$("#viewannounceDate").text(data.content[0].announceDate);
	$("#viewLaunchDate").text(data.content[0].launchDate);
	$("#viewDevicestatus").text(data.content[0].deviceStatus);
	$("#viewOEM").text(data.content[0].oem);
	$("#viewOrganizationId").text(data.content[0].organizationId);
	$("#viewallocationDate").text(data.content[0].allocationDate);
	$("#viewdiscontinuedDate").text(data.content[0].discontinueDate);
	$("#viewSimSlots").text(data.content[0].simSlot);
	$("#viewnumberofIMEI").text(data.content[0].imeiQuantity);
	$("#viewSimtype").text(data.content[0].simType);
	$("#viewDimension").text(data.content[0].bodyDimension);
	$("#viewBodyweight").text(data.content[0].bodyWeight);
	$("#vieweSimSupport").text(data.content[0].esimSupport);
	$("#viewSoftSimSupport").text(data.content[0].softsimSupport);
	$("#viewtype").text(data.content[0].displayType);
	$("#viewSize").text(data.content[0].displaySize);
	$("#viewResolution").text(data.content[0].displayResolution);
	$("#viewProtection").text(data.content[0].displayProtection);
	$("#viewOs").text(data.content[0].os);
	$("#viewOSversion").text(data.content[0].osBaseVersion);
	$("#viewinternalMemory").text(data.content[0].memoryInternal);
	$("#viewRAM").text(data.content[0].ram);
	$("#viewMemoryCardSlot").text(data.content[0].memoryCardSlot);
	$("#viewCPU").text(data.content[0].platformCPU);
	$("#viewGPU").text(data.content[0].platformGPU);
	$("#viewTriple").text(data.content[0].mainCameraType);
	$("#viewMainCameraSpecs").text(data.content[0].mainCameraSpec);
	$("#viewMainCameraFeature").text(data.content[0].mainCameraFeature);
	$("#viewMainCameraVideo").text(data.content[0].mainCameraVideo);
	$("#viewSelfieCameratype").text(data.content[0].selfieCameraType);
	$("#viewSelfieCameraSpecs").text(data.content[0].selfieCameraSpec);
	$("#viewSelfieCameraFeature").text(data.content[0].selfieCameraFeature);
	$("#viewSelfieCameraVideo").text(data.content[0].selfieCameraVideo);
	$("#viewLoudspeaker").text(data.content[0].soundLoudspeaker);
	$("#viewSoundJack").text(data.content[0].sound35mmJack);
	$("#viewWLANSupport").text(data.content[0].commsWLAN);
	$("#viewBluetoothSupport").text(data.content[0].commsBluetooth);
	$("#viewGPSSupport").text(data.content[0].commsGPS);
	$("#viewUSBSupport").text(data.content[0].commsUSB);
	$("#viewRadioSupport").text(data.content[0].commsRadio);
	$("#viewNFCSupport").text(data.content[0].commsNFC);
	$("#viewSensors").text(data.content[0].sensor);
	$("#viewDeviceColor").text(data.content[0].colors);
	$("#viewUICC").text(data.content[0].removableUICC);
	$("#viewEUICC").text(data.content[0].removableEUICC);
	$("#viewBatteryCapacity").text(data.content[0].batteryCapacity);
	$("#viewBatteryChargingSupport").text(data.content[0].batteryCharging);
	$("#viewBatteryChargingSupport2").text(data.content[0].batteryCharging);

	$("#viewAsia").text(data.content[0].launchPriceAsianMarket);
	$("#viewUS").text(data.content[0].launchPriceUSMarket);
	$("#viewEurope").text(data.content[0].launchPriceEuropeMarket);
	$("#viewInternational").text(data.content[0].launchPriceInternationalMarket);

	$("#viewLaunchPriceCambodia").text(data.content[0].launchPriceCambodiaMarket);
	$("#viewSourcePriceCambodia").text(data.content[0].sourceOfCambodiaMarketPrice);
	$("#viewCustomPrice").text(data.content[0].customPriceOfDevice);

	$("#viewGlobalIssue").text(data.content[0].reportedGlobalIssue);
	$("#viewLocalIssue").text(data.content[0].reportedLocalIssue);
	previewRegistrtionFile(data.content[0].attachedFiles, 'View');
	//console.log("Attatched Files Details " +JSON.stringify(data.content[0].attachedFiles));


}

function previewRegistrtionFile(srcFileDetails, Action) {
	console.log("srcFileDetails are " + JSON.stringify(srcFileDetails));
	//var attachedFilesDetails = new Array();
	for (i = 0; i < srcFileDetails.length; i++) {
		var fileName = srcFileDetails[i].fileName;
		var filePath = srcFileDetails[i].filePath

		if (fileName == "" || fileName == null) {
			$("#subFrameEdit1,#subFrameEdit2,#subFrameEdit3,#subFrameEdit4,#subFrameEdit5").attr("src", './resources/assets/images/NoImage.jpg');
			console.log("no file details recieved");
		} else {
			var FinalLink = filePath.replace('/u01/ceirapp/apache-tomcat-9.0.34/webapps', '');
			Action == 'View' ? $("#subFrame" + i).attr("src", FinalLink) : $("#subFrameEdit" + i).attr("src", FinalLink);
			Action == 'View' ? $("#mainFrame").attr("src", FinalLink) : $("#mainFrame").attr("src", FinalLink);
			Action == 'copyView' ? $("#copyFromsubFrame" + i).attr("src", FinalLink) : $("#copyFromsubFrame1" + i).attr("src", FinalLink);
			Action == 'copyView' ? $("#copyFromMainFrame").attr("src", FinalLink) : $("#copyFromMainFrame").attr("src", FinalLink);
			if (Action == 'copy') {
				$("#subFrameEdit1,#subFrameEdit2,#subFrameEdit3,#subFrameEdit4,#subFrameEdit5").removeAttr("src");
				$("#subFrameEdit" + i).attr("src", FinalLink);
			}
			console.log("filePath is " + filePath + " with Action  " + Action);
			//Action == 'copy' ? $("#subFrameEdit"+i).attr("src", "") && $("#subFrameEdit"+i).attr("src", FinalLink) : $("#subFrameEdit"+i).attr("src", FinalLink);
		}
		//console.log("fileName is "+fileName+" and filePath is "+filePath);
	}

}

function selectImage(src) {
	$("#mainFrame").attr("src", '');
	$("#mainFrame").attr("src", src);
	$("#copyFromMainFrame").attr("src", src);
};

var sourceCopyTac = null;

function copyDetails(copiedDeviceId, Action) {
	//copiedDeviceId=$("#copyFromTac").val();
	console.log("copiedDeviceId is " + copiedDeviceId + " and Action is " + Action);
	$("#editCopiedTac").append($("#editTac").text());
	$("#editCopiedId").text($("#editId").text());
	viewDetails(copiedDeviceId, Action);
}

function setEditPopupData(data, Action, deviceId) {
	console.log("in setEditPopupData inside function Action Recieved " + Action + " with Device ID " + deviceId);
	//Edit Headers
	var tacs = deviceId.substring(0, 17);
	console.log(tacs);
	$("#editId").text(data.content[0].id);
	//Action = 'Multiedit' ? $("#editId").text(deviceId) : $("#editId").text(data.content[0].deviceId);

	$("#editManufacturer").val(data.content[0].manufacturer);
	$("#editMarketingName").val(data.content[0].marketingName);

	if (Action == 'Multiedit') {
		$("#editTac").text('');
		$("#editTac").text(tacs);
		$("#editTac").append('...');
		document.getElementById('editTac').setAttribute('data-title', deviceId.toString());
	} else {
		$("#editTac").text("");
		$("#editTac").text(data.content[0].deviceId);
	}

	//Action == 'Multiedit' ? $("#editTac").text(deviceId) : $("#editTac").text(data.content[0].deviceId);

	if (Action == 'copy') {
		//console.log("inside if with Action = "+Action+" and Copied TAC " +$("#editCopiedTac").text());
		$("#editTac").text('');
		$("#editTac").text($("#editCopiedTac").text());
		$("#editId").text($("#editCopiedId").text());
	}

	$("#editManufacturingAddress").val(data.content[0].manufacturingLocation);
	$("#editBrand").val(data.content[0].brandName);
	$("#editModel").val(data.content[0].modelName);

	//Handling for checkbox starts
	data.content[0].networkTechnologyGSM == 1 ? $('input[id=editGSMCheck]').prop('checked', true) : $('input[id=editGSMCheck]').prop('checked', false);
	data.content[0].networkTechnologyCDMA == 1 ? $('input[id=editCDMACheck]').prop('checked', true) : $('input[id=editCDMACheck]').prop('checked', false);
	data.content[0].networkTechnologyEVDO == 1 ? $('input[id=editEVDOCheck]').prop('checked', true) : $('input[id=editEVDOCheck]').prop('checked', false);
	data.content[0].networkTechnologyLTE == 1 ? $('input[id=editLTECheck]').prop('checked', true) : $('input[id=editLTECheck]').prop('checked', false);
	data.content[0].networkTechnology5G == 1 ? $('input[id=edit5GCheck]').prop('checked', true) : $('input[id=edit5GCheck]').prop('checked', false);
	//Handling for checkbox End

	//Network
	$("#edit2GBand").val(data.content[0].network2GBand);
	$("#edit3GBand").val(data.content[0].network3GBand);
	$("#edit4GBand").val(data.content[0].network4GBand);
	$("#edit5GBand").val(data.content[0].network5GBand);
	$("#editNetworkSpeed").val(data.content[0].networkSpeed);
	$("#editBrandDetails").val(data.content[0].bandDetail);

	//Launch

	var announceDate = data.content[0].announceDate;
	if (announceDate != null) {
		//console.log("announceDate is  " +announceDate);
		announceDate = announceDate.split(' ')[0];
		//console.log("announceDate is AFTER SPLIT " +announceDate);
		$("#editAnnounceDate").val(announceDate);
	}

	var launchDate = data.content[0].launchDate;
	if (launchDate != null) {
		launchDate = launchDate.split(' ')[0];
		$("#editLaunchdate").val(launchDate);
	}


	$("#editDeviceStatus").val(data.content[0].deviceStatus);
	$("#editOem").val(data.content[0].oem);
	$("#editOrganizationID").val(data.content[0].organizationId);

	var allocationDate = data.content[0].allocationDate;
	if (allocationDate != null) {
		allocationDate = allocationDate.split(' ')[0];
		$("#editDeviceIDAllocationDate").val(allocationDate);
	}


	var discontinueDate = data.content[0].discontinueDate;
	if (discontinueDate != null) {
		discontinueDate = discontinueDate.split(' ')[0];
		$("#editDiscontinuedDate").val(discontinueDate);
	}


	$("#editSimSlots").val(data.content[0].simSlot);
	$("#editnumberofIMEI").val(data.content[0].imeiQuantity);
	$("#editSimtype").val(data.content[0].simType);
	$("#editDimension").val(data.content[0].bodyDimension);
	$("#editBodyweight").val(data.content[0].bodyWeight);
	$("#editSimSupport").val(data.content[0].esimSupport);
	$("#editSoftSimSupport").val(data.content[0].softsimSupport);

	$("#edittype").val(data.content[0].displayType);
	$("#editSize").val(data.content[0].displaySize);
	$("#editResolution").val(data.content[0].displayResolution);
	$("#editProtection").val(data.content[0].displayProtection);

	$("#editOs").val(data.content[0].os);
	$("#editOSversion").val(data.content[0].osBaseVersion);
	$("#editInternalMemory").val(data.content[0].memoryInternal);
	$("#editRAM").val(data.content[0].ram);
	$("#editMemoryCardSlot").val(data.content[0].memoryCardSlot);
	$("#editCPU").val(data.content[0].platformCPU);
	$("#editGPU").val(data.content[0].platformGPU);

	$("#editTriple").val(data.content[0].mainCameraType);
	$("#editMainCameraSpecs").val(data.content[0].mainCameraSpec);
	$("#editMainCameraFeature").val(data.content[0].mainCameraFeature);
	$("#editMainCameraVideo").val(data.content[0].mainCameraVideo);
	$("#editSelfieCameratype").val(data.content[0].selfieCameraType);
	$("#editSelfieCameraSpecs").val(data.content[0].selfieCameraSpec);
	$("#editSelfieCameraFeature").val(data.content[0].selfieCameraFeature);
	$("#editSelfieCameraVideo").val(data.content[0].selfieCameraVideo);

	$("#editLoudspeaker").val(data.content[0].soundLoudspeaker);
	$("#editSoundJack").val(data.content[0].sound35mmJack);

	$("#editWLANSupport").val(data.content[0].commsWLAN);
	$("#editBluetoothSupport").val(data.content[0].commsBluetooth);
	$("#editGPSsupport").val(data.content[0].commsGPS);
	$("#editUSBSupport").val(data.content[0].commsUSB);
	$("#editRadioSupport").val(data.content[0].commsRadio);
	$("#editNFCSupport").val(data.content[0].commsNFC);

	$("#editSensors").val(data.content[0].sensor);
	$("#editDeviceColor").val(data.content[0].colors);
	$("#editUICC").val(data.content[0].removableUICC);
	$("#editEUICC").val(data.content[0].removableEUICC);
	$("#editBatteryCapacity").val(data.content[0].batteryCapacity);
	$("#editBatteryChargingSupport").val(data.content[0].batteryCharging);
	$("#editBatteryChargingSupport2").val(data.content[0].batteryCharging);

	$("#editAsia").val(data.content[0].launchPriceAsianMarket);
	$("#editUS").val(data.content[0].launchPriceUSMarket);
	$("#editEurope").val(data.content[0].launchPriceEuropeMarket);
	$("#editInternational").val(data.content[0].launchPriceInternationalMarket);

	$("#editlaunchPriceCambodia").val(data.content[0].launchPriceCambodiaMarket);
	$("#editsourcePriceCambodia").val(data.content[0].sourceOfCambodiaMarketPrice);
	$("#editcustomPrice").val(data.content[0].customPriceOfDevice);

	$("#editGlobalReportedIssue").val(data.content[0].reportedGlobalIssue);
	$("#editLocalReportedIssue").val(data.content[0].reportedLocalIssue);
	//previewRegistrtionFile(data.content[0].attachedFiles);
	//console.log("Attatched Files Details " +data.content[0].attachedFiles);

	Action == 'copy' ? previewRegistrtionFile(data.content[0].attachedFiles, 'copy') : previewRegistrtionFile(data.content[0].attachedFiles, 'Edit')

}


$('#filterMarketingName').on('keyup', function() {
	searchDetails('filterCopyFrom');
});

function searchDetails(Action) {
	console.log("Action rcieved " + Action);
	var brandName;
	Action == 'filterCopyFrom' ? brandName = $('#filterMarketingName').val() : brandName = $('#copyFromBrandName').val();
	var filterRequest = {
		"brandName": brandName,
		"deviceId": $('#copyFromTac').val(),
		"modelName": $('#copyFromMarketingName').val(),
		"featureId": parseInt(featureId),
		"userId": parseInt($("body").attr("data-userID")),
		"userType": $("body").attr("data-roleType"),
		//"userType" : parseInt($("body").attr("data-userTypeID")),
		"userTypeId": parseInt($("body").attr("data-userTypeID"))
	}
	//console.log(JSON.stringify(filterRequest));
	if (lang == 'km') {
		var langFile = './resources/i18n/khmer_datatable.json';
	} else if (lang == 'en') {
		var langFile = './resources/i18n/english_datatable.json';
	}

	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers:
			{ 'X-CSRF-TOKEN': token }
	});

	$.ajax({
		url: 'headers?type=deviceManagementHeaders&lang=' + lang,
		type: 'POST',
		dataType: "json",
		success: function(result) {
			var table = $("#copyDetailTable").DataTable({
				destroy: true,
				"serverSide": true,
				orderCellsTop: true,
				"ordering": true,
				"bPaginate": true,
				"bFilter": false,
				"bInfo": true,
				"bSearchable": true,
				"oLanguage": {
					"sUrl": langFile
				},
				"aaSorting": [],
				columnDefs: [
					{ orderable: false, targets: -1, "sPaginationType": "full_numbers" }
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
					url: 'deviceManagementData?requestType=copyfrom',
					type: 'POST',
					dataType: "json",
					data: function(d) {
						d.filter = JSON.stringify(filterRequest);
					},
					error: function(jqXHR, textStatus, errorThrown, data) {
						window.parent.$('#msgDialog').text($.i18n('500ErrorMsg'));
						// messageWindow(jqXHR['responseJSON']['message']);
						window.parent.$('#500ErrorModal').openModal({
							dismissible: false
						});

					}

				},
				"columns": result
			});


		},
		error: function(jqXHR, textStatus, errorThrown) {
		}
	});
	//'copy From'
}

function backButton() {
	$("#filterform").show();
	$("#dataTableDiv").show();
	$("#multiEditDiv").show();
	$("#filterButtonDiv").show();
	$("#addDeviceBtn").show();
	$("#LibraryTableDiv").css("display", "block");
	$("#historyTableDiv").css("display", "none");
	$("#pageHeaderTitle").text('');
	$("#pageHeaderTitle").text(elem);
	//$("#historyFilterform").css("display", "block");
	//$("#historydataTableDiv").css("display", "block");
	$("#historydataTableDiv").hide();
	$("#historyfilterButtonDiv").hide();
	$("#backBtn").hide();
	//pageRendering(null,null);
	DeviceDataTable(lang, null, null);
}

function viewHistory(deviceId) {
	pageRendering('viewHistory', deviceId);
	DeviceDataTable(null, null, 'viewHistory', deviceId);
}

function viewHistoryDatatable(Url, dataUrl, deviceId) {
	//console.log("deviceId recieved for history " +deviceId);
	//console.log("Url-------" +Url+"  dataUrl--------"+dataUrl+" deviceId----------"+deviceId);

	//var tac = $("#historyFilterTac").val()==='' ?  deviceId : $("#historyFilterTac").val();
	var tac = deviceId;
	var filterRequest = {
		"createdOn": $('#historyStartDate').val(),
		"modifiedOn": $('#historyEndDate').val(),
		"deviceId": tac,
		"brandName": $('#historyFilterBrandName').val(),
		"modelName": $('#historyFilterModelName').val(),
		"os": $('#historyFilterOs').val(),
		"featureId": parseInt(featureId),
		"userId": parseInt($("body").attr("data-userID")),
		"userType": $("body").attr("data-roleType"),
		//"userType" : parseInt($("body").attr("data-userTypeID")),
		"userTypeId": parseInt($("body").attr("data-userTypeID"))
	}
	//console.log(JSON.stringify(filterRequest));
	if (lang == 'km') {
		var langFile = './resources/i18n/khmer_datatable.json';
	} else if (lang == 'en') {
		var langFile = './resources/i18n/english_datatable.json';
	}

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
		success: function(result) {
			var table = $("#data-table-history").DataTable({
				destroy: true,
				"serverSide": true,
				orderCellsTop: true,
				"ordering": true,
				"bPaginate": true,
				"bFilter": false,
				"bInfo": true,
				"bSearchable": true,
				"oLanguage": { "sUrl": langFile },
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
					url: dataUrl,
					type: 'POST',
					dataType: "json",
					async: false,
					data: function(d) {
						d.filter = JSON.stringify(filterRequest);
						$("#LibraryTableDiv").css("display", "none");
						$("#historyTableDiv").css("display", "block");

					},
					error: function(jqXHR, textStatus, errorThrown, data) {
						window.parent.$('#msgDialog').text($.i18n('500ErrorMsg'));
						// messageWindow(jqXHR['responseJSON']['message']);
						window.parent.$('#500ErrorModal').openModal({
							dismissible: false
						});

					}

				},
				"columns": result
			});
		}
	});
}




/*$('#selectAllCheckbox').change(function() {
	alert("called");
	if($('#selectAllCheckbox').is(":checked")==true){
		$('#LibraryTable tbody').find("input[type=checkbox]").attr("checked", true);
	}else{
		$('#LibraryTable tbody').find("input[type=checkbox]").attr("checked", false);
	}
	})*/



function updateDeviceConfirmation() {
	return false;
}



function closeEditPage() {
	//$("#datatableViewDiv").css("display", "block");
	$("#mobileDetailViewDiv").css("display", "block");
	$("#mobileDetailEditDiv").css("display", "none");

}

function closeAddPage() {
	$("#addMobileDetailDiv").css("display", "none");
	$("#datatableViewDiv").css("display", "block");
	Resetfilter('addDeviceForm', null)
}

function addDeviceDetails() {
	var fileInfo = [];
	var fieldId = 1;
	var formData = new FormData();
	var x;

	//Handling for checkbox
	var networkTechnologyGSM = $('#addGSMCheck').is(':checked') == true ? 1 : 0;
	var networkTechnologyCDMA = $('#addCDMACheck').is(':checked') == true ? 1 : 0;
	var networkTechnologyEVDO = $('#addEVDOCheck').is(':checked') == true ? 1 : 0;
	var networkTechnologyLTE = $('#addLTECheck').is(':checked') == true ? 1 : 0;
	var networkTechnology5G = $('#add5GCheck').is(':checked') == true ? 1 : 0;

	//var multiRequest = [];
	//var deviceRequest;
	//var deviceIds = [];
	//var rowIds = [];

	fileInfo = [];
	var elements = document.getElementsByClassName("subImageAddClass");
	console.log("elements.length --- " + elements.length);
	for (var i = 0; i < elements.length; i++) {
		// elements[i].style ...
		if (elements[i].files.item(0) == null) {
			continue;
		}
		console.log("elements[i].files[0]----" + JSON.stringify(elements[i].files.item(0).name));
		console.log("i--- " + i);

		x = {
			//"docTypeInterp": "MDR",
			//"id": parseInt($("#editId").text()),
			"docType": "MDR",
			//"mdrId": parseInt(rowIds[i]),
			//"url": "",
			"fileName": elements[i].files.item(0).name
		}
		fileInfo.push(x);
		console.log("x is-------" + JSON.stringify(x));
	}




	var multiRequest = {

		//Basic Parameters
		//"id": parseInt(rowIds[i]),
		"deviceId": $("#addTac").val(),
		"featureId": parseInt(featureId),
		"userId": parseInt($("body").attr("data-userID")),
		//"userType" : $("body").attr("data-roleType"),
		"userType": parseInt($("body").attr("data-userTypeID")),
		"userTypeId": parseInt($("body").attr("data-userTypeID")),

		//headers
		"marketingName": $("#addMarketingName").val(),
		"manufacturer": $("#addManufacturer").val(),
		"manufacturingLocation": $("#addManufacturingAddress").val(),
		"modelName": $("#addModel").val(),
		"brandName": $("#addBrand").val(),

		//checkboxes
		"networkTechnologyGSM": networkTechnologyGSM,
		"networkTechnologyCDMA": networkTechnologyCDMA,
		"networkTechnologyEVDO": networkTechnologyEVDO,
		"networkTechnologyLTE": networkTechnologyLTE,
		"networkTechnology5G": networkTechnology5G,

		//Network
		"network2GBand": $("#add2GBand").val(),
		"network3GBand": $("#add3GBand").val(),
		"network4GBand": $("#add4GBand").val(),
		"network5GBand": $("#add5GBand").val(),
		"networkSpeed": $("#addNetworkSpeed").val(),
		"bandDetail": $("#addBrandDetails").val(),

		//Launch
		"announceDate": $("#addAnnounceDate").val() == '' ? null : $("#addAnnounceDate").val() + " 00:00:00",
		"launchDate": $("#addLaunchdate").val() == '' ? null : $("#addLaunchdate").val() + " 00:00:00",
		"deviceStatus": $("#addDeviceStatus").val(),
		"oem": $("#addOem").val(),
		"organizationId": $("#addOrganizationID").val(),
		"allocationDate": $("#addDeviceIDAllocationDate").val() == '' ? null : $("#addDeviceIDAllocationDate").val() + " 00:00:00",
		"discontinueDate": $("#addDiscontinuedDate").val() == '' ? null : $("#addDiscontinuedDate").val() + " 00:00:00",

		//Body
		"simSlot": parseInt($("#addSimSlots").val()) == '' ? 0 : parseInt($("#addSimSlots").val()),
		"imeiQuantity": parseInt($("#addnumberofIMEI").val()) == '' ? 0 : parseInt($("#addnumberofIMEI").val()),
		"simType": $("#addSimtype").val(),
		"bodyDimension": $("#addDimension").val(),
		"bodyWeight": $("#addBodyweight").val(),
		"esimSupport": $("#addSimSupport").val(),
		"softsimSupport": $("#addSoftSimSupport").val(),

		//Display
		"deviceType": $("#addtype").val(),
		"displaySize": $("#addSize").val(),
		"displayResolution": $("#addResolution").val(),
		"displayProtection": $("#addProtection").val(),

		//Platform
		"os": $("#addOs").val(),
		"osBaseVersion": $("#addOSversion").val(),
		"memoryInternal": parseInt($("#addInternalMemory").val()) == '' ? 0 : parseInt($("#addInternalMemory").val()),
		"ram": $("#addRAM").val(),
		"memoryCardSlot": parseInt($("#addMemoryCardSlot").val()) == '' ? 0 : parseInt($("#addMemoryCardSlot").val()),
		"platformCPU": $("#addCPU").val(),
		"platformGPU": $("#addGPU").val(),

		//Camera
		"mainCameraType": parseInt($("#addTriple").val()),
		"mainCameraSpec": $("#addMainCameraSpecs").val(),
		"mainCameraFeature": $("#addMainCameraFeature").val(),
		"mainCameraVideo": $("#addMainCameraVideo").val(),
		"selfieCameraType": parseInt($("#addSelfieCameratype").val()),
		"selfieCameraSpec": $("#addSelfieCameraSpecs").val(),
		"selfieCameraFeature": $("#addSelfieCameraFeature").val(),
		"selfieCameraVideo": $("#addSelfieCameraVideo").val(),

		//Sound
		"soundLoudspeaker": parseInt($("#addLoudspeaker").val()),
		"sound35mmJack": parseInt($("#addSoundJack").val()),

		//Comm
		"commsWLAN": $("#addWLANSupport").val(),
		"commsBluetooth": $("#addBluetoothSupport").val(),
		"commsGPS": $("#addGPSsupport").val(),
		"commsUSB": $("#addUSBSupport").val(),
		"commsRadio": parseInt($("#addRadioSupport").val()),
		"commsNFC": parseInt($("#addNFCSupport").val()),

		//Misc
		"sensor": $("#addSensors").val(),
		"colors": $("#addDeviceColor").val(),
		"removableUICC": parseInt($("#addUICC").val()) == '' ? 0 : parseInt($("#addUICC").val()),
		"removableEUICC": parseInt($("#addEUICC").val()) == '' ? 0 : parseInt($("#addEUICC").val()),
		"batteryCapacity": parseInt($("#addBatteryCapacity").val()) == '' ? 0 : parseInt($("#addBatteryCapacity").val()),
		"batteryCharging": $("#addBatteryChargingSupport").val(),

		//Price
		"launchPriceAsianMarket": $("#addAsia").val() == '' ? 0 : parseFloat($("#addAsia").val()),
		"launchPriceUSMarket": $("#addUS").val() == '' ? 0 : parseFloat($("#addUS").val()),
		"launchPriceEuropeMarket": $("#addEurope").val() == '' ? 0 : parseFloat($("#addEurope").val()),
		"launchPriceInternationalMarket": $("#addInternational").val() == '' ? 0 : parseFloat($("#addInternational").val()),
		"launchPriceCambodiaMarket": $("#addlaunchPriceCambodia").val() == '' ? 0 : parseFloat($("#addlaunchPriceCambodia").val()),
		"customPriceOfDevice": $("#addcustomPrice").val() == '' ? 0 : parseFloat($("#addlaunchPriceCambodia").val()),
		"sourceOfCambodiaMarketPrice": $("#addsourcePriceCambodia").val() == '' ? 0 : parseFloat($("#addsourcePriceCambodia").val()),

		//Issues
		"reportedGlobalIssue": $("#addGlobalReportedIssue").val(),
		"reportedLocalIssue": $("#addLocalReportedIssue").val(),

		//attached Files
		"attachedFiles": fileInfo
	}



	formData.append('fileInfo[]', JSON.stringify(fileInfo));
	formData.append("multirequest", JSON.stringify(multiRequest));
	//formData.append('deviceId', $("#editTac").text());
	//formData.append('id', parseInt($("#editId").text()));
	formData.append('files[]', JSON.stringify(fileInfo));

	console.log(JSON.stringify(multiRequest));

	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers:
			{ 'X-CSRF-TOKEN': token }
	});

	$.ajax({
		url: './addDeviceDetails',
		type: 'POST',
		data: formData,
		mimeType: 'multipart/form-data',
		processData: false,
		contentType: false,
		async: false,
		success: function(response, textStatus, jqXHR) {
			console.log(JSON.stringify(response));
			closeConfirmation();
			//$("#mobileDetailEditDiv").css("display", "block");
			DeviceDataTable(lang, null, null, null);
			//alert("inside save success function" +JSON.stringify(response));
			$("#addMobileDetailDiv").css("display", "none");
			$("#datatableViewDiv").css("display", "block");
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log("error in ajax")
		}
	});
	return false;
}




function updateDeviceDetails() {
	var fileInfo = [];
	var fieldId = 1;
	var formData = new FormData();
	var x;


	//Handling for checkbox
	var networkTechnologyGSM = $('#editGSMCheck').is(':checked') == true ? 1 : 0;
	var networkTechnologyCDMA = $('#editCDMACheck').is(':checked') == true ? 1 : 0;
	var networkTechnologyEVDO = $('#editEVDOCheck').is(':checked') == true ? 1 : 0;
	var networkTechnologyLTE = $('#editLTECheck').is(':checked') == true ? 1 : 0;
	var networkTechnology5G = $('#edit5GCheck').is(':checked') == true ? 1 : 0;

	var multiRequest = [];
	var deviceRequest;
	var deviceIds = [];
	var rowIds = [];
	console.log("multiEditCount is " + multiEditCount);

	if (multiEditCount == 0) {
		multiEditCount = 1;
		deviceIds.push($("#editTac").text().trim());
		rowIds.push($("#editId").text().trim());

	} else {
		deviceIds = $("#editTac").text().trim().split(',');
		rowIds = $("#editId").text().trim().split(',');
	}

	for (i = 0; i < multiEditCount; i++) {


		fileInfo = [];

		//var elements = document.getElementsByClassName("subImageClass");
		//console.log("elements.length --- " +elements.length);	

		var attachedFiles = [];
		var temp;

		for (var j = 1; j < 6; j++) {

			//temp = $("#mainFrameEditInput" + j).files.item[0];
			console.log("document.getElementById---- " +document.getElementById("mainFrameEditInput" + j));
			temp = document.getElementById("mainFrameEditInput" + j).files.item[0];
			
			console.log("temp updated-" +temp);
			
			if (temp == null) {
				continue;
			}
			x = {
				//"docTypeInterp": "MDR",
				//"id": parseInt($("#editId").text()),
				"docType": "MDR",
				"mdrId": parseInt(rowIds[i]),
				//"url": "",
				"fileName": temp.name
			}
			fileInfo.push(x);
			console.log("x is-------" + JSON.stringify(x));
			attachedFiles.push(x);
			formData.append('files[]', temp);
		}

		
		deviceRequest = {

			//Basic Parameters
			"id": parseInt(rowIds[i]),
			"deviceId": deviceIds[i],
			"featureId": parseInt(featureId),
			"userId": parseInt($("body").attr("data-userID")),
			//"userType" : $("body").attr("data-roleType"),
			"userType": parseInt($("body").attr("data-userTypeID")),
			"userTypeId": parseInt($("body").attr("data-userTypeID")),

			//headers
			"marketingName": $("#editMarketingName").val(),
			"manufacturer": $("#editManufacturer").val(),
			"manufacturingLocation": $("#editManufacturingAddress").val(),
			"modelName": $("#editModel").val(),
			"brandName": $("#editBrand").val(),

			//checkboxes
			"networkTechnologyGSM": networkTechnologyGSM,
			"networkTechnologyCDMA": networkTechnologyCDMA,
			"networkTechnologyEVDO": networkTechnologyEVDO,
			"networkTechnologyLTE": networkTechnologyLTE,
			"networkTechnology5G": networkTechnology5G,

			//Network
			"network2GBand": $("#edit2GBand").val(),
			"network3GBand": $("#edit3GBand").val(),
			"network4GBand": $("#edit4GBand").val(),
			"network5GBand": $("#edit5GBand").val(),
			"networkSpeed": $("#editNetworkSpeed").val(),
			"bandDetail": $("#editBrandDetails").val(),

			//Launch
			"announceDate": $("#editAnnounceDate").val() == '' ? null : $("#editAnnounceDate").val() + " 00:00:00",
			"launchDate": $("#editLaunchdate").val() == '' ? null : $("#editLaunchdate").val() + " 00:00:00",
			"deviceStatus": $("#editDeviceStatus").val(),
			"oem": $("#editOem").val(),
			"organizationId": $("#editOrganizationID").val(),
			"allocationDate": $("#editDeviceIDAllocationDate").val() == '' ? null : $("#editDeviceIDAllocationDate").val() + " 00:00:00",
			"discontinueDate": $("#editDiscontinuedDate").val() == '' ? null : $("#editDiscontinuedDate").val() + " 00:00:00",

			//Body
			"simSlot": parseInt($("#editSimSlots").val()) == '' ? 0 : parseInt($("#editSimSlots").val()),
			"imeiQuantity": parseInt($("#editnumberofIMEI").val()) == '' ? 0 : parseInt($("#editnumberofIMEI").val()),
			"simType": $("#editSimtype").val(),
			"bodyDimension": $("#editDimension").val(),
			"bodyWeight": $("#editBodyweight").val(),
			"esimSupport": $("#editSimSupport").val(),
			"softsimSupport": $("#editSoftSimSupport").val(),

			//Display
			"deviceType": $("#edittype").val(),
			"displaySize": $("#editSize").val(),
			"displayResolution": $("#editResolution").val(),
			"displayProtection": $("#editProtection").val(),

			//Platform
			"os": $("#editOs").val(),
			"osBaseVersion": $("#editOSversion").val(),
			"memoryInternal": parseInt($("#editInternalMemory").val()) == '' ? 0 : parseInt($("#editInternalMemory").val()),
			"ram": parseInt($("#editRAM").val()) == '' ? 0 : parseInt($("#editRAM").val()),
			"memoryCardSlot": parseInt($("#editMemoryCardSlot").val()) == '' ? 0 : parseInt($("#editMemoryCardSlot").val()),
			"platformCPU": $("#editCPU").val(),
			"platformGPU": $("#editGPU").val(),

			//Camera
			"mainCameraType": parseInt($("#editTriple").val()),
			"mainCameraSpec": $("#editMainCameraSpecs").val(),
			"mainCameraFeature": $("#editMainCameraFeature").val(),
			"mainCameraVideo": $("#editMainCameraVideo").val(),
			"selfieCameraType": parseInt($("#editSelfieCameratype").val()),
			"selfieCameraSpec": $("#editSelfieCameraSpecs").val(),
			"selfieCameraFeature": $("#editSelfieCameraFeature").val(),
			"selfieCameraVideo": $("#editSelfieCameraVideo").val(),

			//Sound
			"soundLoudspeaker": parseInt($("#editLoudspeaker").val()),
			"sound35mmJack": parseInt($("#editSoundJack").val()),

			//Comm
			"commsWLAN": $("#editWLANSupport").val(),
			"commsBluetooth": $("#editBluetoothSupport").val(),
			"commsGPS": $("#editGPSsupport").val(),
			"commsUSB": $("#editUSBSupport").val(),
			"commsRadio": parseInt($("#editRadioSupport").val()),
			"commsNFC": parseInt($("#editNFCSupport").val()),

			//Misc
			"sensor": $("#editSensors").val(),
			"colors": $("#editDeviceColor").val(),
			"removableUICC": parseInt($("#editUICC").val()) == '' ? 0 : parseInt($("#editUICC").val()),
			"removableEUICC": parseInt($("#editEUICC").val()) == '' ? 0 : parseInt($("#editEUICC").val()),
			"batteryCapacity": parseInt($("#editBatteryCapacity").val()) == '' ? 0 : parseInt($("#editBatteryCapacity").val()),
			"batteryCharging": $("#editBatteryChargingSupport").val(),

			//Price
			"launchPriceAsianMarket": parseInt($("#editAsia").val()) == '' ? 0 : parseInt($("#editAsia").val()),
			"launchPriceUSMarket": parseInt($("#editUS").val()) == '' ? 0 : $("#editUS").val(),
			"launchPriceEuropeMarket": parseInt($("#editEurope").val()) == '' ? 0 : parseInt($("#editEurope").val()),
			"launchPriceInternationalMarket": parseInt($("#editInternational").val()) == '' ? 0 : parseInt($("#editInternational").val()),
			"launchPriceCambodiaMarket": parseInt($("#editlaunchPriceCambodia").val()) == '' ? 0 : parseInt($("#editlaunchPriceCambodia").val()),
			"customPriceOfDevice": parseInt($("#editcustomPrice").val()) == '' ? 0 : parseInt($("#editlaunchPriceCambodia").val()),
			"sourceOfCambodiaMarketPrice": parseInt($("#editsourcePriceCambodia").val()) == '' ? 0 : parseInt($("#editsourcePriceCambodia").val()),

			//Issues
			"reportedGlobalIssue": $("#editGlobalReportedIssue").val(),
			"reportedLocalIssue": $("#editLocalReportedIssue").val(),

			//attached Files
			"attachedFiles": attachedFiles
		}
		multiRequest.push(deviceRequest);
	}



	formData.append('fileInfo[]', JSON.stringify(fileInfo));
	formData.append("multirequest", JSON.stringify(multiRequest));
	//formData.append('deviceId', $("#editTac").text());
	formData.append('id', parseInt($("#editId").text()));


	//console.log("files[]--" + JSON.stringify($('#mainFrameEditInput1')[0].files[0]));

	//formData.append('files[]', $('#mainFrameEditInput1')[0].files[0]);

	//formData.append('files[]',$('#docTypeFile1')[0].files[0]);


	console.log("JSON.stringify(fileInfo)--" + JSON.stringify(fileInfo));

	//console.log("formData --- " +JSON.stringify(formData));

	//alert(JSON.stringify($('#docTypeFile'+ fieldId)[0].files[0]));
	console.log(JSON.stringify(multiRequest));
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers:
			{ 'X-CSRF-TOKEN': token }
	});

	$.ajax({
		url: './updateDeviceDetails',
		type: 'POST',
		data: formData,
		mimeType: 'multipart/form-data',
		processData: false,
		contentType: false,
		async: false,
		success: function(response, textStatus, jqXHR) {
			console.log(JSON.stringify(response));
			$("#mobileDetailEditDiv").css("display", "block");
			//$("#datatableViewDiv").css("display", "block");
			DeviceDataTable(lang, null, null, null);

		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log("error in ajax")
		}
	});
	return false;
}

function closeViewButton() {
	$("#datatableViewDiv").css("display", "block");
	$("#mobileDetailViewDiv").css("display", "none");
	$('#mainFrame,#subFrame0,#subFrame1,#subFrame2,#subFrame3,#subFrame4').attr('src', '');
}




function exportData() {
	var table = $('#LibraryTable').DataTable();
	var info = table.page.info();
	var pageNo = info.page;
	var pageSize = info.length;
	var filterRequest = {
		"startDate": $('#startDate').val(),
		"endDate": $('#endDate').val(),
		"deviceId": $('#filterTac').val(),
		"brandName": $('#filterBrandName').val(),
		"modelName": $('#filterModelName').val(),
		"os": $('#filterOs').val(),
		"mdrStatus": $('#filterStatus').val(),
		"featureId": parseInt(featureId),
		"userId": parseInt($("body").attr("data-userID")),
		"userType": $("body").attr("data-roleType"),
		//"userType" : parseInt($("body").attr("data-userTypeID")),
		"userTypeId": parseInt($("body").attr("data-userTypeID")),
		"pageNo": parseInt(pageNo),
		"pageSize": parseInt(pageSize)
	}

	//console.log(JSON.stringify(filterRequest))
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers:
			{ 'X-CSRF-TOKEN': token }
	});

	$.ajax({
		url: './exportDeviceDetails',
		type: 'POST',
		dataType: 'json',
		contentType: 'application/json; charset=utf-8',
		data: JSON.stringify(filterRequest),
		success: function(data, textStatus, jqXHR) {
			window.location.href = data.url;

		},
		error: function(jqXHR, textStatus, errorThrown) {

		}
	});

}

function deleteDevice(deviceId) {
	$("#deleteDeviceId").text(deviceId);
	//alert("delete called with Device ID " +deviceId);
}


function deleteDeviceDetails() {
	var deviceId = $("#deleteDeviceId").text();
	var token = $("meta[name='_csrf']").attr("content");
	var header = $("meta[name='_csrf_header']").attr("content");
	$.ajaxSetup({
		headers:
			{ 'X-CSRF-TOKEN': token }
	});

	$.ajax({
		url: './deleteDevice?deviceId=' + deviceId + '&featureId=' + parseInt(featureId) + '&userId=' + parseInt($("body").attr("data-userID")) + '&userType=' + $("body").attr("data-roleType"),
		contentType: 'application/json; charset=utf-8',
		type: 'POST',
		success: function(data, textStatus, xhr) {
			//console.log(data);
			DeviceDataTable(lang, null, null, null);

			//$("#materialize-lean-overlay-3").css("display","none");
		},
		error: function() {
			////console.log("Error");
		}
	});

}


function Resetfilter(formID, deviceId) {
	$('#endDate').css('border-color', '');
	$('#errorMsg').text('');
	$('#' + formID).trigger('reset');
	$('input[id=multiEditButton]').prop('checked', false);
	$("label").removeClass('active');
	if (formID == "historyFilterform") {
		DeviceDataTable(lang, 'filter', 'viewHistory', deviceId);
	} else {
		DeviceDataTable(lang, 'filter', null, null);
	}

}

function openImageViewModal(imageSrcID) {
	var imageURL = document.getElementById(imageSrcID).src;
	$('#imageViewModal').openModal({ dismissible: false });
	$("#imgInViewForm").attr("src", imageURL);
}

function openDeleteModal() {
	$('#deletePopUp').openModal({ dismissible: false });
}

function addDeviceform() {
	if ($('#addTac').val() == '') {
		return false;
	}
	$('#AddconfirmationModal').openModal({ dismissible: false });
	return false;
};

function closeConfirmation() {
	$('#AddconfirmationModal').closeModal({ dismissible: false });

};

var idCount = 0;

const preview = (file) => {

	const fr = new FileReader();
	fr.onload = () => {
		// const div = document.createElement("div");
		console.log("filereader1 updated Line----1601");
		idCount = idCount + 1;
		enableAndDisableUploadButton(idCount);
		console.log("'src', URL.createObjectURL(file)---" + URL.createObjectURL(file));
		document.getElementById("mainFrameEdit" + idCount).removeAttribute('src');
		//document.getElementById("mainFrameEdit" + idCount).src = fr.result;  // String Base64
		document.getElementById("mainFrameEdit" + idCount).setAttribute('src', URL.createObjectURL(file));
		document.getElementById("mainFrameEditInput" + idCount).setAttribute('src', URL.createObjectURL(file));
		document.getElementById("mainFrameEdit" + idCount).alt = file.name;

		document.getElementById("mainFrameEdit").removeAttribute('src');
		//document.getElementById("mainFrameEdit").src = fr.result;  // String Base64
		document.getElementById("mainFrameEdit").setAttribute('src', URL.createObjectURL(file));
		document.getElementById("mainFrameEdit").alt = file.name;

		//creating remove button in image
		const removebtn = document.createElement("BUTTON");
		removebtn.setAttribute("id", "removeBtnID" + idCount);
		removebtn.setAttribute("onclick", "removeIMG('IMGID" + idCount + "')");
		var removeText = document.createTextNode("Remove");
		removebtn.appendChild(removeText);
		//creating replace button in image
		const replacebtn = document.createElement("input");
		replacebtn.type = 'file';
		replacebtn.setAttribute("id", "replaceBtnID" + idCount);
		replacebtn.setAttribute("onchange", "UploadImage('IMGID" + idCount + "','replaceBtnID" + idCount + "')");
		var replaceText = document.createTextNode("Replace");
		replacebtn.appendChild(replaceText);


	};
	fr.readAsDataURL(file);


};
var idCount1 = 0;
const preview2 = (file) => {

	const fr1 = new FileReader();
	fr1.onload = () => {
		// const div = document.createElement("div");
		console.log("filereader2 Line----1639");
		idCount1 = idCount1 + 1;
		enableAndDisableUploadButton(idCount1);

		document.getElementById("mainFrameSave" + idCount1).removeAttribute('src');
		document.getElementById("mainFrameSave" + idCount1).src = fr1.result;  // String Base64 
		//document.getElementById("mainFrameSave" + idCount1).setAttribute('src', fr1);
		document.getElementById("mainFrameSave" + idCount1).alt = file.name;

		document.getElementById("mainFrameSave").removeAttribute('src');
		document.getElementById("mainFrameSave").src = fr1.result;  // String Base64
		//document.getElementById("mainFrameSave").setAttribute('src', fr1); 
		document.getElementById("mainFrameSave").alt = file.name;


		//creating remove button in image

		//creating replace button in image
		const replacebtn = document.createElement("input");
		replacebtn.type = 'file';
		replacebtn.setAttribute("id", "replaceBtnID" + idCount1);
		replacebtn.setAttribute("onchange", "UploadImage('IMGID" + idCount1 + "','replaceBtnID" + idCount1 + "')");
		var replaceText = document.createTextNode("Replace");
		replacebtn.appendChild(replaceText);


	};
	fr1.readAsDataURL(file);


};
document.querySelector("#docTypeFile1").addEventListener("change", (ev) => {
	if (!ev.target.files) return; // Do nothing.
	[...ev.target.files].forEach(preview);
});
document.querySelector("#docTypeFileSave").addEventListener("change", (ev) => {

	if (!ev.target.files) return; // Do nothing.
	[...ev.target.files].forEach(preview2);
});

function removeIMG(removeBtnID) {

	//$("#"+removeBtnID).remove();
	document.getElementById(removeBtnID).removeAttribute('src');
	document.getElementById(removeBtnID).setAttribute('src', 'https://ami-sni.com/wp-content/themes/consultix/images/no-image-found-360x250.png');

}


function UploadImage(imageInputID, mainFrameID) {
	console.log("filereader3 Line----1690");
	document.getElementById(imageInputID).removeAttribute('src');
	//dd(imageInputID,replaceBtnID);
	//  frame.src=URL.createObjectURL(event.target.files[0]);
	document.getElementById(mainFrameID).removeAttribute('src');
	document.getElementById(mainFrameID).setAttribute('src', URL.createObjectURL(event.target.files[0]));
	document.getElementById(imageInputID).setAttribute("src", URL.createObjectURL(event.target.files[0]));
}
function dd(imageInputID, replaceBtnID) {

	const did = 'replaceBtnID' + idCount;

	const [file] = replaceBtnID1.files;
	if (file) {

		document.getElementById(imageInputID).setAttribute("src", URL.createObjectURL(file));
		//imageInputID.src = URL.createObjectURL(file);
	}
}

function enableAndDisableUploadButton(count) {
	if (idCount == 6) {

		document.getElementById("docTypeFile1").disabled = true;
	}
	else {

		document.getElementById("docTypeFile1").disabled = false;
	}
}


function hoverIMG(frameID) {

	hoversrc = document.getElementById(frameID).src
	document.getElementById("mainFrameSave").removeAttribute('src');
	document.getElementById("mainFrameSave").setAttribute('src', hoversrc);

}

function hoverIMGEdit(frameIDEdit) {

	hoversrcEdit = document.getElementById(frameIDEdit).src
	document.getElementById("mainFrameEdit").removeAttribute('src');
	document.getElementById("mainFrameEdit").setAttribute('src', hoversrcEdit);

}