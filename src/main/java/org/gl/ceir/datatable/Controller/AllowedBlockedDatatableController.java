package org.gl.ceir.datatable.Controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.gl.ceir.CeirPannelCode.Feignclient.FeignCleintImplementation;
import org.gl.ceir.CeirPannelCode.Model.FilterRequest;
import org.gl.ceir.CeirPannelCode.Service.RegistrationService;
import org.gl.ceir.Class.HeadersTitle.DatatableResponseModel;
import org.gl.ceir.Class.HeadersTitle.IconsState;
import org.gl.ceir.configuration.ConfigParameters;
import org.gl.ceir.pageElement.model.Button;
import org.gl.ceir.pageElement.model.InputFields;
import org.gl.ceir.pageElement.model.PageElement;
import org.gl.ceir.pagination.model.ConfigContentModel;
import org.gl.ceir.pagination.model.ConfigPaginationModel;
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
public class AllowedBlockedDatatableController {

private final Logger log = LoggerFactory.getLogger(getClass());
	
	@Autowired
	IconsState iconState;
	@Autowired
	PageElement pageElement;
	@Autowired
	Button button;
	@Autowired
	DatatableResponseModel datatableResponseModel;
	@Autowired
	FeignCleintImplementation feignCleintImplementation;
	@Autowired
	ConfigContentModel configContentModel;
	@Autowired
	ConfigPaginationModel configPaginationModel;
	
	@Autowired
	RegistrationService registerService;
	
	@PostMapping("allowedTACData")
	public ResponseEntity<?> viewAllowedTACData(@RequestParam(name="type",defaultValue = "Config",required = false) String role, HttpServletRequest request,HttpSession session) {

		List<List<Object>> finalList=new ArrayList<List<Object>>();
				String filter = request.getParameter("filter").replace("&#34;", "\"");
				Gson gsonObject=new Gson();
				FilterRequest filterrequest = gsonObject.fromJson(filter, FilterRequest.class);
				String column=null;
				 column="0".equalsIgnoreCase(request.getParameter("order[0][column]")) ? "Created On":
						"1".equalsIgnoreCase(request.getParameter("order[0][column]")) ? "TAC":
							"Created On";
					String order;
		
					try {
						if ("Created On".equalsIgnoreCase(column) && request.getParameter("order[0][dir]")==null) {
							order = "desc";
						} 
						else if("Created On".equalsIgnoreCase(column) && request.getParameter("order[0][dir]")=="asc"){
							order ="asc";
						}
						else {
							order = request.getParameter("order[0][dir]");
						} 
						filterrequest.setColumnName(column);
						filterrequest.setSort(order);
						filterrequest.setFilterPublicIp(session.getAttribute("publicIP").toString());
						filterrequest.setPublicIp(session.getAttribute("publicIP").toString());
						filterrequest.setBrowser(session.getAttribute("browser").toString());
						filterrequest.setFilterBrowser(session.getAttribute("browser").toString());
					} catch (Exception e) {
						// TODO: handle exception
						e.printStackTrace();
						System.out.println("Exception in " +e.getMessage());
					}
				Integer file = 0;
				Integer pageSize = Integer.parseInt(request.getParameter("length"));
				Integer pageNo = Integer.parseInt(request.getParameter("start")) / pageSize ;
				log.info("pageSize"+pageSize+"-----------pageNo---"+pageNo);
				filterrequest.setSearchString(request.getParameter("search[value]"));
		try {
			
			log.info("request send to the filter api ="+filterrequest);
			Object response = feignCleintImplementation.allowedTacView(filterrequest, pageNo, pageSize, file);
			log.info("response in datatable"+response);
			Gson gson= new Gson(); 
			String apiResponse = gson.toJson(response);
			configPaginationModel = gson.fromJson(apiResponse, ConfigPaginationModel.class);
			List<ConfigContentModel> paginationContentList = configPaginationModel.getContent();
			if(paginationContentList.isEmpty()) {
				datatableResponseModel.setData(Collections.emptyList());
			}else {
				for(ConfigContentModel dataInsideList : paginationContentList) 
				{
				   String createdOn =( (String) dataInsideList.getCreationDate()).trim();
				   String tag =( (String)dataInsideList.getSno()).trim();
				   String type ="0";
				   String tac=((String)dataInsideList.getTac()).trim();
				   if(tag==null || tag.equalsIgnoreCase("") || tag.isEmpty() || tag.equalsIgnoreCase("null") || tag.equals(null)) {
					   tag="";
				   }
				   if(tac==null || tac.equalsIgnoreCase("") || tac.isEmpty() || tac.equalsIgnoreCase("null") || tac.equals(null)) {
					   tac="";
				   }
				   if(createdOn==null || createdOn.equalsIgnoreCase("") || createdOn.isEmpty() || createdOn.equalsIgnoreCase("null") || createdOn.equals(null)) {
					   createdOn="NA";
				   }
				   String userStatus = (String) session.getAttribute("userStatus");
				   //log.info("----Id------"+Id+"-------id----------------"+id+"---userName-----"+username);
				   String action=iconState.allowedBlockedIcons(userStatus,tag, type);			   
				   Object[] finalData={createdOn,tac,action}; 
					List<Object> finalDataList=new ArrayList<Object>(Arrays.asList(finalData));
					
					finalList.add(finalDataList);
					log.info("finalList###################->: "+finalList.toString());
					datatableResponseModel.setData(finalList);	
			}
		}	
			//data set on ModelClass
			datatableResponseModel.setRecordsTotal(configPaginationModel.getNumberOfElements());
			datatableResponseModel.setRecordsFiltered(configPaginationModel.getTotalElements());
			return new ResponseEntity<>(datatableResponseModel, HttpStatus.OK); 
		
		}catch(Exception e) {
			e.printStackTrace();
			datatableResponseModel.setRecordsTotal(null);
			datatableResponseModel.setRecordsFiltered(null);
			datatableResponseModel.setData(Collections.emptyList());
			log.error(e.getMessage(),e);
			return new ResponseEntity<>(datatableResponseModel, HttpStatus.INTERNAL_SERVER_ERROR); 
		}		
		
	}
	
	

	@PostMapping("allowedTAC/pageRendering")
	public ResponseEntity<?> allowedTACRendering(@RequestParam(name="type",defaultValue = "Config",required = false) String role,HttpSession session){

		String userType = (String) session.getAttribute("usertype");
		String userStatus = (String) session.getAttribute("userStatus");
		
		InputFields inputFields = new InputFields();
		InputFields dateRelatedFields;
		
		pageElement.setPageTitle("Allowed TAC");
		
		List<Button> buttonList = new ArrayList<>();
		List<InputFields> dropdownList = new ArrayList<>();
		List<InputFields> inputTypeDateList = new ArrayList<>();
			
			log.info("USER STATUS:::::::::"+userStatus);
			log.info("session value user Type=="+session.getAttribute("usertype"));
			
			String[] names= {"FilterButton", "Apply Filter","allowedDatatable("+ConfigParameters.languageParam+")","submitFilter"};
			for(int i=0; i< names.length ; i++) {
				button = new Button();
				button.setType(names[i]);
				i++;
				button.setButtonTitle(names[i]);
				i++;
				button.setButtonURL(names[i]);
				i++;
				button.setId(names[i]);
				buttonList.add(button);
			}			
			pageElement.setButtonList(buttonList);
			//input type date list	
			String[] dateParam= {"date","Start Date","startDate","","date","End Date","endDate","","text","TAC","tacId","50"};
			for(int i=0; i< dateParam.length; i++) {
			dateRelatedFields= new InputFields();
			dateRelatedFields.setType(dateParam[i]);
			i++;
			dateRelatedFields.setTitle(dateParam[i]);
			i++;
			dateRelatedFields.setId(dateParam[i]);
			i++;
			dateRelatedFields.setClassName(dateParam[i]);
			inputTypeDateList.add(dateRelatedFields);
			}
			
			pageElement.setInputTypeDateList(inputTypeDateList);
			pageElement.setUserStatus(userStatus);
			return new ResponseEntity<>(pageElement, HttpStatus.OK); 
		
		
	}
	@PostMapping("blockedTACData")
	public ResponseEntity<?> viewBlockedTACData(@RequestParam(name="type",defaultValue = "Config",required = false) String role, HttpServletRequest request,HttpSession session) {

		List<List<Object>> finalList=new ArrayList<List<Object>>();
				String filter = request.getParameter("filter").replace("&#34;", "\"");
				Gson gsonObject=new Gson();
				FilterRequest filterrequest = gsonObject.fromJson(filter, FilterRequest.class);
				String column=null;
				column="0".equalsIgnoreCase(request.getParameter("order[0][column]")) ? "Created On":
					"1".equalsIgnoreCase(request.getParameter("order[0][column]")) ? "TAC":
						"Created On";
					String order;
		
					try {
						if ("Created On".equalsIgnoreCase(column) && request.getParameter("order[0][dir]")==null) {
							order = "desc";
						} 
						else if("Created On".equalsIgnoreCase(column) && request.getParameter("order[0][dir]")=="asc"){
							order ="asc";
						}
						else {
							order = request.getParameter("order[0][dir]");
						} 
						filterrequest.setColumnName(column);
						filterrequest.setSort(order);
						filterrequest.setFilterPublicIp(session.getAttribute("publicIP").toString());
						filterrequest.setPublicIp(session.getAttribute("publicIP").toString());
						filterrequest.setBrowser(session.getAttribute("browser").toString());
						filterrequest.setFilterBrowser(session.getAttribute("browser").toString());
					} catch (Exception e) {
						// TODO: handle exception
						e.printStackTrace();
						System.out.println("Exception in " +e.getMessage());
					}
				Integer file = 0;
				Integer pageSize = Integer.parseInt(request.getParameter("length"));
				Integer pageNo = Integer.parseInt(request.getParameter("start")) / pageSize ;
				log.info("pageSize"+pageSize+"-----------pageNo---"+pageNo);
				filterrequest.setSearchString(request.getParameter("search[value]"));
		try {
			
			log.info("request send to the filter api ="+filterrequest);
			Object response = feignCleintImplementation.blockedTacView(filterrequest, pageNo, pageSize, file);
			log.info("response in datatable"+response);
			Gson gson= new Gson(); 
			String apiResponse = gson.toJson(response);
			configPaginationModel = gson.fromJson(apiResponse, ConfigPaginationModel.class);
			List<ConfigContentModel> paginationContentList = configPaginationModel.getContent();
			if(paginationContentList.isEmpty()) {
				datatableResponseModel.setData(Collections.emptyList());
			}else {
				for(ConfigContentModel dataInsideList : paginationContentList) 
				{
					String createdOn =( (String) dataInsideList.getCreationDate()).trim();
					String tag =( (String)dataInsideList.getSno()).trim();
					String type ="0";
					String tac=((String)dataInsideList.getTac()).trim();
				   String userStatus = (String) session.getAttribute("userStatus");
				   
				   if(tag==null || tag.equalsIgnoreCase("") || tag.isEmpty() || tag.equalsIgnoreCase("null") || tag.equals(null)) {
					   tag="";
				   }
				   if(tac==null || tac.equalsIgnoreCase("") || tac.isEmpty() || tac.equalsIgnoreCase("null") || tac.equals(null)) {
					   tac="";
				   }
				   if(createdOn==null || createdOn.equalsIgnoreCase("") || createdOn.isEmpty() || createdOn.equalsIgnoreCase("null") || createdOn.equals(null)) {
					   createdOn="NA";
				   }
				   String action=iconState.allowedBlockedIcons(userStatus,tag, type);			   
				   Object[] finalData={createdOn,tac,action}; 
					List<Object> finalDataList=new ArrayList<Object>(Arrays.asList(finalData));
					finalList.add(finalDataList);
					log.info("finalList###################->: "+finalList.toString());
					datatableResponseModel.setData(finalList);	
			}
		}	
			//data set on ModelClass
			datatableResponseModel.setRecordsTotal(configPaginationModel.getNumberOfElements());
			datatableResponseModel.setRecordsFiltered(configPaginationModel.getTotalElements());
			return new ResponseEntity<>(datatableResponseModel, HttpStatus.OK); 
		
		}catch(Exception e) {
			e.printStackTrace();
			datatableResponseModel.setRecordsTotal(null);
			datatableResponseModel.setRecordsFiltered(null);
			datatableResponseModel.setData(Collections.emptyList());
			log.error(e.getMessage(),e);
			return new ResponseEntity<>(datatableResponseModel, HttpStatus.INTERNAL_SERVER_ERROR); 
		}		
		
	}
	
	

	@PostMapping("blockedTAC/pageRendering")
	public ResponseEntity<?> blackListPageRendering(@RequestParam(name="type",defaultValue = "Config",required = false) String role,HttpSession session){

		String userType = (String) session.getAttribute("usertype");
		String userStatus = (String) session.getAttribute("userStatus");
		
		InputFields inputFields = new InputFields();
		InputFields dateRelatedFields;
		
		pageElement.setPageTitle("Blocked TAC");
		
		List<Button> buttonList = new ArrayList<>();
		List<InputFields> dropdownList = new ArrayList<>();
		List<InputFields> inputTypeDateList = new ArrayList<>();
			
			log.info("USER STATUS:::::::::"+userStatus);
			log.info("session value user Type=="+session.getAttribute("usertype"));
			
			String[] names= {"FilterButton", "Apply Filter","BlockedTAC("+ConfigParameters.languageParam+")","submitFilter"};
			for(int i=0; i< names.length ; i++) {
				button = new Button();
				button.setType(names[i]);
				i++;
				button.setButtonTitle(names[i]);
				i++;
				button.setButtonURL(names[i]);
				i++;
				button.setId(names[i]);
				buttonList.add(button);
			}			
			pageElement.setButtonList(buttonList);
			//input type date list	
			//String[] dateParam= {"date","Start Date","startDate","","date","End Date","endDate","","text","IMEI","imeiId","50","text","IMSI","imsiId","50","text","MSISDN","msisdnId","50"};
			String[] dateParam= {"date","Start Date","startDate","","date","End Date","endDate","","text","TAC","tacId","50"};
			for(int i=0; i< dateParam.length; i++) {
			dateRelatedFields= new InputFields();
			dateRelatedFields.setType(dateParam[i]);
			i++;
			dateRelatedFields.setTitle(dateParam[i]);
			i++;
			dateRelatedFields.setId(dateParam[i]);
			i++;
			dateRelatedFields.setClassName(dateParam[i]);
			inputTypeDateList.add(dateRelatedFields);
			}
			
			pageElement.setInputTypeDateList(inputTypeDateList);
			pageElement.setUserStatus(userStatus);
			return new ResponseEntity<>(pageElement, HttpStatus.OK); 
		
		
	}
	
	
	
}
