package org.gl.ceir.datatable.Controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.gl.ceir.CeirPannelCode.Feignclient.DeviceRepositoryFeign;
import org.gl.ceir.CeirPannelCode.Model.DeviceFilterRequest;
import org.gl.ceir.CeirPannelCode.Model.DeviceManagementRequest;
import org.gl.ceir.Class.HeadersTitle.DatatableResponseModel;
import org.gl.ceir.Class.HeadersTitle.IconsState;
import org.gl.ceir.configuration.Translator;
import org.gl.ceir.pageElement.model.Button;
import org.gl.ceir.pageElement.model.PageElement;
import org.gl.ceir.pagination.model.DeviceManagementContentModel;
import org.gl.ceir.pagination.model.DeviceManagementPaginationModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

@RestController
public class DeviceMgmtHistoryDatatableController {
	
	@Autowired
	Translator Translator;
	@Autowired
	DatatableResponseModel datatableResponseModel;
	@Autowired
	PageElement pageElement;
	@Autowired
	Button button;
	@Autowired
	IconsState iconState;
	@Autowired
	DeviceRepositoryFeign deviceRepositoryFeign;
	@Autowired
	DeviceManagementContentModel deviceManagementContentModel;
	@Autowired
	DeviceManagementPaginationModel deviceManagementPaginationModel;
	
	private final Logger log = LoggerFactory.getLogger(getClass());
	
	@PostMapping("getDeviceHistory")
	public ResponseEntity<?> viewDeviceHistoryRecord(
			@RequestParam(name = "type", defaultValue = "Device Management", required = false) String role,
			HttpServletRequest request, HttpSession session,
			@RequestParam(name = "source", defaultValue = "menu", required = false) String source,
			@RequestParam(name = "requestType", required = false) String requestType){
		
		int file = 0;
		// Data set on this List
		List<List<Object>> finalList = new ArrayList<List<Object>>();
		String filter = request.getParameter("filter");
		Gson gsonObject = new Gson();
		DeviceFilterRequest deviceManagementRequest = gsonObject.fromJson(filter, DeviceFilterRequest.class);

		Integer pageSize = Integer.parseInt(request.getParameter("length"));
		Integer pageNo = Integer.parseInt(request.getParameter("start")) / pageSize;
		
		String column = "0".equalsIgnoreCase(request.getParameter("order[0][column]")) ? "Created Date"
				: "1".equalsIgnoreCase(request.getParameter("order[0][column]")) ? "Modified Date"
						: "2".equalsIgnoreCase(request.getParameter("order[0][column]")) ? "TAC"
								: "3".equalsIgnoreCase(request.getParameter("order[0][column]")) ? "Brand Name"
										: "4".equalsIgnoreCase(request.getParameter("order[0][column]")) ? "Model Name"
												: "5".equalsIgnoreCase(request.getParameter("order[0][column]"))
														? "OS" : "Modified Date";
			
		String order;
		if ("Modified Date".equalsIgnoreCase(column) && request.getParameter("order[0][dir]")==null) {
			order = "desc";
		} 
		else if("Modified Date".equalsIgnoreCase(column) && request.getParameter("order[0][dir]")=="asc"){
			order ="asc";
		}
		else {
			order = request.getParameter("order[0][dir]");
		}
		
		deviceManagementRequest.setOrderColumnName(column);
		deviceManagementRequest.setOrder(order);

		deviceManagementRequest.setSearchString(request.getParameter("search[value]"));
		
		log.info("Request Type for Edit=" + requestType);
		
		try {
			deviceManagementRequest.setPublicIp(session.getAttribute("publicIP").toString());
			deviceManagementRequest.setBrowser(session.getAttribute("browser").toString());
			log.info("Request send to get Device API=" + deviceManagementRequest);
			//Object response = deviceRepositoryFeign.deviceManagementFeign(deviceManagementRequest, pageNo, pageSize, file, source);
			Object response = deviceRepositoryFeign.getDeviceHistoryFeign(deviceManagementRequest, pageNo, pageSize, file, source);
			Gson gson = new Gson();
			String apiResponse = gson.toJson(response);

			deviceManagementPaginationModel = gson.fromJson(apiResponse, DeviceManagementPaginationModel.class);

			List<DeviceManagementContentModel> paginationContentList = deviceManagementPaginationModel.getContent();

			if (paginationContentList.isEmpty()) {

				datatableResponseModel.setData(Collections.emptyList());
			} else {
				for (DeviceManagementContentModel dataInsideList : paginationContentList) {
					String createdOn = (String) dataInsideList.getCreatedOn();
					String modifiedOn = (String) dataInsideList.getModifiedOn();
					String tac = dataInsideList.getDeviceId();
					String brandName = dataInsideList.getBrandName();
					String modelName = dataInsideList.getModelName();
					String os = dataInsideList.getOs();
					//String status = dataInsideList.getStateInterp();
					Integer deviceState= dataInsideList.getDeviceState();
					String action = iconState.iconsDeviceManagement(tac,requestType,deviceState);
					Object[] finalData = {createdOn,modifiedOn,tac,brandName,modelName,os,action };

					List<Object> finalDataList = new ArrayList<Object>(Arrays.asList(finalData));
					finalList.add(finalDataList);
					datatableResponseModel.setData(finalList);

				}
			}
			// data set on ModelClass
			datatableResponseModel.setRecordsTotal(deviceManagementPaginationModel.getNumberOfElements());
			datatableResponseModel.setRecordsFiltered(deviceManagementPaginationModel.getTotalElements());
			return new ResponseEntity<>(datatableResponseModel, HttpStatus.OK);
		} catch (Exception e) {
			datatableResponseModel.setRecordsTotal(null);
			datatableResponseModel.setRecordsFiltered(null);
			datatableResponseModel.setData(Collections.emptyList());
			//log.error(e.getMessage(), e);
			return new ResponseEntity<>(datatableResponseModel, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
		
}

