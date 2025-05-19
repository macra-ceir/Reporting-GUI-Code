package org.gl.ceir.CeirPannelCode.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;



/*
 * @Controller public class Secuiritythreat { private final Logger log =
 * LoggerFactory.getLogger(getClass());
 * 
 * 
 * 
 * @RequestMapping(value=
 * {"/services/checkIMEIPortal/secuirityThreat"},method={org.springframework.web
 * .bind.annotation.RequestMethod.GET}) public String secuirityThreat() {
 * 
 * String responseMessage="XSS attack detected";
 * log.info("coming in secuirityThreat"); return responseMessage; } }
 */
@Controller
public class Secuiritythreat {
	private final Logger log = LoggerFactory.getLogger(getClass());
    @GetMapping("/services/checkIMEIPortal/securityThreatttt")
    public ModelAndView showMessage() {
    	log.info("coming in security controller");
        String message = "XSS attack detected!";
        ModelAndView model = new ModelAndView();
       model.addObject("message", message);
        model.setViewName("xssAttack");
        return model;
    }
}
