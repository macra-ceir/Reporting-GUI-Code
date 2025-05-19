package org.gl.ceir.CeirPannelCode.Controller;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class GraphDuplicateDeviceController {
	private final Logger log = LoggerFactory.getLogger(getClass());
	
	@RequestMapping(value=
		{"/graphDuplicateReports"},method={org.springframework.web.bind.annotation.
				RequestMethod.GET,org.springframework.web.bind.annotation.RequestMethod.POST}
			)
	    public ModelAndView viewConfigManagement(HttpSession session) {
		ModelAndView mv = new ModelAndView();
		 log.info(" view Graph Duplicate Device Reports entry point."); 
		 mv.setViewName("viewsGhraphDuplicateReport");
		log.info(" view Graph Check Duplicate Device Reports exit point."); 
		return mv; 
	}
}
