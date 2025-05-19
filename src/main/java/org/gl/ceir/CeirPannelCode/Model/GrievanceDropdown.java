package org.gl.ceir.CeirPannelCode.Model;

import org.springframework.stereotype.Component;

@Component
public class GrievanceDropdown {
		
	private Integer value;
	private String interpretation;
	private Integer listOrder;
	private String tagId;
	
	public Integer getValue() {
		return value;
	}
	public void setValue(Integer value) {
		this.value = value;
	}
	
	public Integer getListOrder() {
		return listOrder;
	}
	public void setListOrder(Integer listOrder) {
		this.listOrder = listOrder;
	}
	public String getTagId() {
		return tagId;
	}
	public void setTagId(String tagId) {
		this.tagId = tagId;
	}
	public String getInterpretation() {
		return interpretation;
	}
	public void setInterpretation(String interpretation) {
		this.interpretation = interpretation;
	}
	@Override
	public String toString() {
		return "GrievanceDropdown [value=" + value + ", interpretation=" + interpretation + ", listOrder=" + listOrder
				+ ", tagId=" + tagId + "]";
	}

	
	
	
}
