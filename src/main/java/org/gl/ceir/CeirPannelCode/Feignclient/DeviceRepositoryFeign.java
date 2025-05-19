package org.gl.ceir.CeirPannelCode.Feignclient;

import java.util.List;

import org.gl.ceir.CeirPannelCode.Model.DeviceFilterRequest;
import org.gl.ceir.CeirPannelCode.Model.DeviceManagementRequest;
import org.gl.ceir.CeirPannelCode.Model.GenricResponse;
import org.gl.ceir.pagination.model.DeviceManagementContentModel;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Service
@FeignClient(url = "${deviceRepositoryfeignClientPath}", value = "deviceRepository" )

public interface DeviceRepositoryFeign {
	
			//-------------------get all Device details feign Controller-------------------//
	
			@RequestMapping(value="/getDevicesDetails" ,method=RequestMethod.POST) 
			public Object deviceManagementFeign(@RequestBody DeviceFilterRequest deviceManagementRequest,
					@RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
					@RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
					@RequestParam(value = "file", defaultValue = "0") Integer file,
					@RequestParam(name="source",defaultValue = "menu",required = false) String source) ;
			
			
			//-------------------Export Device details feign Controller-------------------//
			
			@RequestMapping(value="/exportData" ,method=RequestMethod.POST) 
			public Object deviceManagementExportFeign(@RequestBody DeviceFilterRequest deviceManagementRequest,
					@RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
					@RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
					@RequestParam(value = "file", defaultValue = "1") Integer file,
					@RequestParam(name="source",defaultValue = "menu",required = false) String source) ;
			
			
			//-------------------Update Device Management feign Controller-------------------//
			
			@RequestMapping(value="/addDevice" ,method=RequestMethod.POST) 
			public GenricResponse addDeviceInfo(@RequestBody DeviceManagementRequest deviceManagementRequest)  ;
			
			
			//-------------------Add Device Management feign Controller-------------------//
			
			@RequestMapping(value="/updateDevices" ,method=RequestMethod.POST) 
			public GenricResponse updateDeviceInfo(@RequestBody List<DeviceManagementRequest>updateRequest) ;
			
			//-------------------Delete Device feign Controller-------------------//
			
			@RequestMapping(value="/deleteDevice" ,method=RequestMethod.POST) 
			public @ResponseBody GenricResponse deleteDeviceFeign(@RequestParam(name = "deviceId", required = true) String deviceId,
					@RequestParam(name = "featureId", required = false) String featureId,
					@RequestParam(name = "publicIp", required = false) String publicIp,
					@RequestParam(name = "browser", required = false) String browser,
					@RequestParam(name = "userId", required = true) String userId,
					@RequestParam(name = "userType", required = false) String userType);
			
			//-------------------Get Device History feign Controller-------------------//
			
			@RequestMapping(value="/getDeviceHistory" ,method=RequestMethod.POST) 
			public Object getDeviceHistoryFeign(@RequestBody DeviceFilterRequest deviceManagementRequest,
					@RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
					@RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
					@RequestParam(value = "file", defaultValue = "0") Integer file,
					@RequestParam(name="source",defaultValue = "menu",required = false) String source) ;
			
}
