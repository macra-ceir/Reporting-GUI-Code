package org.gl.ceir.CeirPannelCode.Controller;

import javax.servlet.http.HttpSession;

import org.gl.ceir.CeirPannelCode.Feignclient.AnalyticsFeign;
import org.gl.ceir.CeirPannelCode.Feignclient.FeignCleintImplementation;
import org.gl.ceir.CeirPannelCode.Feignclient.GsmaFeignClient;
import org.gl.ceir.CeirPannelCode.Feignclient.UserRegistrationFeignImpl;
import org.gl.ceir.CeirPannelCode.Service.RegistrationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class GraphDashboardUsingTACAllocationDateController {
	private final Logger log = LoggerFactory.getLogger(getClass());

	@Autowired
	FeignCleintImplementation feignCleintImplementation;

	@Autowired
	UserRegistrationFeignImpl userRegistrationFeignImpl;

	@Autowired
	RegistrationService registerService;
	
	@Autowired
	GsmaFeignClient gsmaFeignClient;
	
	@Autowired
	AnalyticsFeign analyticsFeign;
	
	@RequestMapping(value=
		{"/TACAllocationDate"},method={org.springframework.web.bind.annotation.
				RequestMethod.GET,org.springframework.web.bind.annotation.RequestMethod.POST}
			)
	    public ModelAndView viewConfigManagement(HttpSession session) {
		ModelAndView mv = new ModelAndView();
		 log.info(" view Dashboard Using TAC Allocation Date entry point."); 
		 mv.setViewName("viewsDashboardUsingTACAllocationDate");
		log.info(" view Dashboard Using TAC Allocation Date exit point."); 
		return mv; 
	}


}
