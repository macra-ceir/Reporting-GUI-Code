package org.gl.ceir.CeirPannelCode.Controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.gl.ceir.CeirPannelCode.PropertyReader;
import org.gl.ceir.CeirPannelCode.Feignclient.DeviceRepositoryFeign;
import org.gl.ceir.CeirPannelCode.Feignclient.FeignCleintImplementation;
import org.gl.ceir.CeirPannelCode.Feignclient.GrievanceFeignClient;
import org.gl.ceir.CeirPannelCode.Model.AddMoreFileModel;
import org.gl.ceir.CeirPannelCode.Model.DeviceFilterRequest;
import org.gl.ceir.CeirPannelCode.Model.DeviceManagementRequest;
import org.gl.ceir.CeirPannelCode.Model.DeviceRequestModel;
import org.gl.ceir.CeirPannelCode.Model.FileCopyToOtherServer;
import org.gl.ceir.CeirPannelCode.Model.FileExportResponse;
import org.gl.ceir.CeirPannelCode.Model.FilterRequest;
import org.gl.ceir.CeirPannelCode.Model.GenricResponse;
import org.gl.ceir.CeirPannelCode.Model.GrievanceModel;
import org.gl.ceir.pagination.model.DeviceManagementContentModel;
import org.gl.ceir.pagination.model.DeviceManagementPaginationModel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.google.gson.Gson;

@Controller
public class DeviceManagementController {
	private final Logger log = LoggerFactory.getLogger(getClass());
	
	@Autowired
	DeviceRepositoryFeign deviceRepositoryFeign;
	
	@Autowired
	FeignCleintImplementation feignCleintImplementation;
	
	@Autowired
	AddMoreFileModel addMoreFileModel,urlToUpload,urlToMove;
	
	@Autowired
	PropertyReader propertyReader;
	
	@Autowired
	GrievanceFeignClient grievanceFeignClient;
	
	GenricResponse response = new GenricResponse();
	
	@RequestMapping(value=
		{"/deviceManagement"},method={org.springframework.web.bind.annotation.
				RequestMethod.GET,org.springframework.web.bind.annotation.RequestMethod.POST}
		)
	public ModelAndView viewManageTypeAdmin(HttpSession session) {
		ModelAndView mv = new ModelAndView();
		log.info(" view Device Management entry point."); 
		mv.setViewName("viewDeviceManagement");
		log.info(" view Device Management entry point.."); 
		return mv; 
	}
	
	
	//-------------------View by devicID Controller-------------------//
	
	@PostMapping("viewbyDeviceID")
	public @ResponseBody Object viewDeviceDetails(@RequestBody DeviceFilterRequest deviceManagementRequest,HttpSession session) {
		Integer file = 0;
		log.info("request send to the view Device api=" + deviceManagementRequest);
		Object response = deviceRepositoryFeign.deviceManagementFeign(deviceManagementRequest, deviceManagementRequest.getPageNo(), deviceManagementRequest.getPageSize(), file, deviceManagementRequest.getSource());
		log.info("response from viewUser api " + response);
		return response;
	}
	
	//-------------------Export Device Management Controller-------------------//
	
	@PostMapping("exportDeviceDetails")
	@ResponseBody
	public FileExportResponse exportToExcel(@RequestBody DeviceFilterRequest deviceManagementRequest,HttpSession session,HttpServletRequest request)
	{
		Object response;
		Integer file = 1;	
		log.info("publicIP " +session.getAttribute("publicIP").toString()+ " And Browser " +session.getAttribute("browser").toString());
		deviceManagementRequest.setPublicIp(session.getAttribute("publicIP").toString());
		log.info("Request to Export:::::::::"+deviceManagementRequest);
		response= deviceRepositoryFeign.deviceManagementExportFeign(deviceManagementRequest, deviceManagementRequest.getPageNo(), deviceManagementRequest.getPageSize(), file, deviceManagementRequest.getSource());
		FileExportResponse fileExportResponse;
		Gson gson= new Gson(); 
		String apiResponse = gson.toJson(response);
		fileExportResponse = gson.fromJson(apiResponse, FileExportResponse.class);
		log.info("response Export  api="+fileExportResponse);
		return fileExportResponse;
	}
	
	//-------------------Save Device Details Controller-------------------//
	
	@RequestMapping(value= {"/addDeviceDetails"},method= RequestMethod.POST,consumes = "multipart/form-data") 
	public @ResponseBody GenricResponse addDevice(@RequestParam(name="files[]",required = false) MultipartFile[] fileUpload,
			@RequestParam(name="id",required = false) Integer id,
			HttpServletRequest request,HttpSession session) {
		Gson gson= new Gson(); 
		String deviceDetails=request.getParameter("multirequest");
		log.info("deviceDetails------"+deviceDetails);
		log.info("fileUpload------"+fileUpload);
		addMoreFileModel.setTag("system_upload_filepath");
		urlToUpload=feignCleintImplementation.addMoreBuutonCount(addMoreFileModel);
		
		//GrievanceModel grievanceRequest  = gson.fromJson(grievanceDetails, GrievanceModel.class);
		DeviceManagementRequest deviceManagementRequest  = gson.fromJson(deviceDetails, DeviceManagementRequest.class);
		
		FileCopyToOtherServer fileCopyRequest= new FileCopyToOtherServer();
		//grievanceRequest.setUserId(userId);
		//grievanceRequest.setUserType(roletype);
		//grievanceRequest.setGrievanceId(grevnceId);
		
		

		for (int i=0;i<deviceManagementRequest.getAttachedFiles().size();i++) {
			deviceManagementRequest.getAttachedFiles().get(i).setId(id);
			//grievanceRequest.getMultifile().get(i).getDocType();
		}

		//log.info("Random  genrated transaction number ="+grevnceId);
		
		if(fileUpload==null || fileUpload.equals("")) {
			log.info("no file uploaded " +fileUpload);
			deviceManagementRequest.setAttachedFiles(null);
		}else{
			log.info("file uploaded " +fileUpload.toString());
			int i=0;
			for( MultipartFile file : fileUpload) {

			log.info("-----"+ file.getOriginalFilename());
			log.info("++++"+ file);

			String tagName=deviceManagementRequest.getAttachedFiles().get(i).getDocType();
			log.info("doctype Name==="+tagName+"value of index="+i);


			try {
				
				byte[] bytes =
						file.getBytes(); 
						String rootPath = urlToUpload.getValue()+deviceManagementRequest.getId()+"/"+tagName+"/"; 
						File dir =   new File(rootPath + File.separator);
						File dir1 =   new File(urlToUpload.getValue()+deviceManagementRequest.getId()+"/" + File.separator);
						if (!dir.exists())
						{
							dir.mkdirs(); // Create the file on server // Calendar now = Calendar.getInstance();
							dir.setReadable(true,false);
							dir.setWritable(true,false);
							dir.setExecutable(true,false);
							dir1.setReadable(true,false);
							dir1.setWritable(true,false);
							dir1.setExecutable(true,false);
						}
						File serverFile = new File(rootPath+file.getOriginalFilename());
						log.info("uploaded file path on server" + serverFile); BufferedOutputStream
						stream = new BufferedOutputStream(new FileOutputStream(serverFile));
						serverFile.setExecutable(true,false);
						serverFile.setReadable(true,false);
						serverFile.setWritable(true,false);
						stream.write(bytes); stream.close();
						fileCopyRequest.setFilePath(rootPath);
						int deviceId=Integer.parseInt(deviceManagementRequest.getDeviceId());  
						fileCopyRequest.setId(deviceId); // take care for id. use device ID.
						fileCopyRequest.setFileName(file.getOriginalFilename());
						fileCopyRequest.setServerId(propertyReader.serverId);
						log.info("request passed to move file to other server=="+fileCopyRequest);
						GenricResponse fileRespnose=grievanceFeignClient.saveUploadedFileOnANotherServer(fileCopyRequest);
						log.info("file move api response==="+fileRespnose);

						//  grievanceRequest.setFileName(file.getOriginalFilename());

			}
			catch (Exception e) { //
				// TODO: handle exception e.printStackTrace(); }

				// set reaquest parameters into model class

			}
			i++;


			}
		}
		log.info("publicIP " +session.getAttribute("publicIP").toString()+ " And Browser " +session.getAttribute("browser").toString());
		deviceManagementRequest.setPublicIp(session.getAttribute("publicIP").toString());
		deviceManagementRequest.setBrowser(session.getAttribute("browser").toString());
		log.info("grievance form parameters passed to save Device Details "+deviceManagementRequest);
		response= deviceRepositoryFeign.addDeviceInfo(deviceManagementRequest);
		log.info("response from save Device api"+response);
		log.info("save Device  exit point.");
		return response;
	}
	//-------------------Update Device Management Controller-------------------//
	
	@RequestMapping(value= {"/updateDeviceDetails"},method= RequestMethod.POST,consumes = "multipart/form-data") 
	public @ResponseBody GenricResponse updateDevice(@RequestParam(name="files[]",required = false) MultipartFile[] fileUpload,
			@RequestParam(name="id",required = false) Integer id,
			HttpServletRequest request,HttpSession session) {
		Gson gson= new Gson(); 
		String deviceDetails=request.getParameter("multirequest");
		//String files1 = request.getParameter("files1");
		//log.info("files1------"+files1); 
		log.info("deviceDetails------"+deviceDetails);
		log.info("fileUpload------"+fileUpload);
		addMoreFileModel.setTag("system_upload_filepath");
		urlToUpload=feignCleintImplementation.addMoreBuutonCount(addMoreFileModel);
		String movedFileTime = new SimpleDateFormat("yyyy-MM-dd HH:mm").format(new Date());
		log.info("Moved File Time value=="+movedFileTime);
		log.info("Request for update for id "+id );
		
		List <DeviceManagementRequest> deviceManagementRequests = Arrays.asList(gson.fromJson(deviceDetails, DeviceManagementRequest[].class));
		
		//DeviceRequestModel deviceRequestModel = gson.fromJson(deviceDetails, DeviceRequestModel.class);
		//List <DeviceManagementRequest> deviceManagementRequests = deviceRequestModel.getContent();
		
		FileCopyToOtherServer fileCopyRequest= new FileCopyToOtherServer();
		//deviceManagementRequest.setId(id); 	
		
		
		/*
		 * for (int i=0;i<deviceManagementRequest.getAttachedFiles().size();i++) {
		 * deviceManagementRequest.getAttachedFiles().get(i).setId(id);
		 * //grievanceRequest.getMultifile().get(i).getDocType(); }
		 */
		for ( DeviceManagementRequest deviceManagementRequest : deviceManagementRequests ) {
			log.info("publicIP " +session.getAttribute("publicIP").toString()+ " And Browser " +session.getAttribute("browser").toString());
			deviceManagementRequest.setPublicIp(session.getAttribute("publicIP").toString());
			deviceManagementRequest.setBrowser(session.getAttribute("browser").toString());

			if(fileUpload==null || fileUpload.equals("")) {
				log.info("no file uploaded " +fileUpload);
				deviceManagementRequest.setAttachedFiles(null);
			}else{
				log.info("file uploaded " +fileUpload.toString());
				//int i=0;
				for( MultipartFile file : fileUpload) {
					log.info("-----"+ file.getOriginalFilename());
					log.info("++++"+ file);

					for(int i=0; i<deviceManagementRequest.getAttachedFiles().size(); i++) {
						Object tagName=deviceManagementRequest.getAttachedFiles().get(i).getDocType();
						//Object tagName="MDRFiles";
						log.info("doctype Name==="+tagName+"value of index="+i);
						try {
							if(fileUpload==null || fileUpload.equals(""))
							{
								deviceManagementRequest.setAttachedFiles(null);

							}
							else {
								byte[] bytes =
										file.getBytes(); 
										String rootPath = urlToUpload.getValue()+deviceManagementRequest.getId()+"/"+tagName+"/"; 
										File dir =   new File(rootPath + File.separator);
										File dir1 =   new File(urlToUpload.getValue()+deviceManagementRequest.getId()+"/" + File.separator);
										if (!dir.exists())
										{
											dir.mkdirs(); // Create the file on server // Calendar now = Calendar.getInstance();
											dir.setReadable(true,false);
											dir.setWritable(true,false);
											dir.setExecutable(true,false);
											dir1.setReadable(true,false);
											dir1.setWritable(true,false);
											dir1.setExecutable(true,false);
										}
										File serverFile = new File(rootPath+file.getOriginalFilename());
										log.info("uploaded file path on server" + serverFile); BufferedOutputStream
										stream = new BufferedOutputStream(new FileOutputStream(serverFile));
										serverFile.setExecutable(true,false);
										serverFile.setReadable(true,false);
										serverFile.setWritable(true,false);
										stream.write(bytes); stream.close();
										fileCopyRequest.setFilePath(rootPath);
										int deviceId=Integer.parseInt(deviceManagementRequest.getDeviceId());  
										fileCopyRequest.setId(deviceId); // take care for id. use device ID.
										fileCopyRequest.setFileName(file.getOriginalFilename());
										fileCopyRequest.setServerId(propertyReader.serverId);
										log.info("request passed to move file to other server=="+fileCopyRequest);
										GenricResponse fileRespnose=grievanceFeignClient.saveUploadedFileOnANotherServer(fileCopyRequest);
										log.info("file move api response==="+fileRespnose);
							}
						}catch (Exception e) { //
							// TODO: handle exception e.printStackTrace(); }

							// set reaquest parameters into model class
						}

					}

					
				}
			}
		}
		
		
		
		//List<DeviceManagementRequest> updateRequest = new ArrayList<>();
		//updateRequest.add(deviceManagementRequest);		
		//log.info("parameters passed to update device Api "+deviceManagementRequest.toString());
		response= deviceRepositoryFeign.updateDeviceInfo(deviceManagementRequests);
		log.info("Response from update Device api " +response);
		log.info("update Device  exit point.");
		return response;
	}
	
	
	//-------------------Delete Device Controller-------------------//
	
	@PostMapping ("deleteDevice")
	public @ResponseBody GenricResponse deletePortAddress(@RequestParam(name = "deviceId", required = true) String deviceId,
			@RequestParam(name = "featureId", required = false) String featureId,
			@RequestParam(name = "publicIp", required = false) String publicIp,
			@RequestParam(name = "browser", required = false) String browser,
			@RequestParam(name = "userId", required = true) String userId,
			@RequestParam(name = "userType", required = false) String userType,
			HttpServletRequest request,HttpSession session) {
		publicIp = session.getAttribute("publicIP").toString();
		browser = session.getAttribute("browser").toString();
		log.info("request send to the Delete Device api with Device ID =" +deviceId+" and userId " +userId);
		GenricResponse response= deviceRepositoryFeign.deleteDeviceFeign(deviceId,featureId,publicIp,browser,userId,userType);
		log.info("response after delete Device."+response);
		return response;

	}
}
	
