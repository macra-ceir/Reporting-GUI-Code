package org.gl.ceir.CeirPannelCode.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpSession;

@Controller
public class FraudIMEIGraphController {
    private final Logger log = LoggerFactory.getLogger(getClass());

    @RequestMapping(value=
            {"/fraudimeiGraphReports"},method={org.springframework.web.bind.annotation.
            RequestMethod.GET,org.springframework.web.bind.annotation.RequestMethod.POST}
    )
    public ModelAndView viewConfigManagement(HttpSession session) {
        ModelAndView mv = new ModelAndView();
        log.info(" view Graph Duplicate Device Reports entry point.");
        mv.setViewName("viewFraudImeiGraphReport");
        log.info(" view Graph Check Duplicate Device Reports exit point.");
        return mv;
    }
}
