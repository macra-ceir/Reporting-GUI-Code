package org.gl.ceir.CeirPannelCode.Feignclient;
import java.util.Map;

import org.gl.ceir.graph.model.GraphRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;


@Service
@FeignClient(url = "${graphReportsfeignClientPath}", value = "analytics")
public interface AnalyticsFeign {
	@PostMapping("/report/data") 
	public Object graph(@RequestBody GraphRequest graphRequest,
			@RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
			@RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
			@RequestParam(value = "file", defaultValue = "0") Integer file);

	
	@PostMapping("/graph/data")
	public Object graph(@RequestBody Map graphRequest,
	       @RequestParam(value = "pageNo", defaultValue = "0") Integer pageNo,
	       @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
	       @RequestParam(value = "file", defaultValue = "0") Integer file);
	
	@PostMapping("/graph/dashboardCounter")
	public Object dashboard(@RequestBody Map graphRequest);
}

