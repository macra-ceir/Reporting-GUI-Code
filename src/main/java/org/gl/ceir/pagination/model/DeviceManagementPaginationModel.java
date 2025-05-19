package org.gl.ceir.pagination.model;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class DeviceManagementPaginationModel {
	
	private List<DeviceManagementContentModel> content;
	private Pageable pageable;
	private Integer totalPages;
	private Boolean last;
	private Integer totalElements;
	private Integer number;
	private Sort sort;
	private Integer size;
	private Boolean first;
	private Integer numberOfElements;
	private Boolean empty;
	public List<DeviceManagementContentModel> getContent() {
		return content;
	}
	public void setContent(List<DeviceManagementContentModel> content) {
		this.content = content;
	}
	public Pageable getPageable() {
		return pageable;
	}
	public void setPageable(Pageable pageable) {
		this.pageable = pageable;
	}
	public Integer getTotalPages() {
		return totalPages;
	}
	public void setTotalPages(Integer totalPages) {
		this.totalPages = totalPages;
	}
	public Boolean getLast() {
		return last;
	}
	public void setLast(Boolean last) {
		this.last = last;
	}
	public Integer getTotalElements() {
		return totalElements;
	}
	public void setTotalElements(Integer totalElements) {
		this.totalElements = totalElements;
	}
	public Integer getNumber() {
		return number;
	}
	public void setNumber(Integer number) {
		this.number = number;
	}
	public Sort getSort() {
		return sort;
	}
	public void setSort(Sort sort) {
		this.sort = sort;
	}
	public Integer getSize() {
		return size;
	}
	public void setSize(Integer size) {
		this.size = size;
	}
	public Boolean getFirst() {
		return first;
	}
	public void setFirst(Boolean first) {
		this.first = first;
	}
	public Integer getNumberOfElements() {
		return numberOfElements;
	}
	public void setNumberOfElements(Integer numberOfElements) {
		this.numberOfElements = numberOfElements;
	}
	public Boolean getEmpty() {
		return empty;
	}
	public void setEmpty(Boolean empty) {
		this.empty = empty;
	}
	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("DeviceManagementPaginationModel [content=");
		builder.append(content);
		builder.append(", pageable=");
		builder.append(pageable);
		builder.append(", totalPages=");
		builder.append(totalPages);
		builder.append(", last=");
		builder.append(last);
		builder.append(", totalElements=");
		builder.append(totalElements);
		builder.append(", number=");
		builder.append(number);
		builder.append(", sort=");
		builder.append(sort);
		builder.append(", size=");
		builder.append(size);
		builder.append(", first=");
		builder.append(first);
		builder.append(", numberOfElements=");
		builder.append(numberOfElements);
		builder.append(", empty=");
		builder.append(empty);
		builder.append("]");
		return builder.toString();
	}
	
	
	
}
