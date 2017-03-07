package com.cairenhui.model;

import org.springframework.stereotype.Component;

import com.cairenhui.tools.DateUtils;

@Component
public class VideoModel {
	
	public static final String FORMAT_EFFECTIVE_START = "yyyy-MM-dd";;

	private java.lang.Long id;
	
	private java.lang.String businessType;

	private java.lang.String businessId;
	
	private java.lang.String videoStatus;
	
	private java.lang.Integer businessVideoType;

	private java.util.Date createTime;
	
	private java.util.Date endTime;
	
	private java.lang.String opId;

	public java.lang.Long getId() {
		return id;
	}

	public void setId(java.lang.Long id) {
		this.id = id;
	}

	public java.lang.String getBusinessType() {
		return businessType;
	}

	public void setBusinessType(java.lang.String businessType) {
		this.businessType = businessType;
	}

	public java.lang.String getBusinessId() {
		return businessId;
	}

	public void setBusinessId(java.lang.String businessId) {
		this.businessId = businessId;
	}

	public java.lang.String getVideoStatus() {
		return videoStatus;
	}

	public void setVideoStatus(java.lang.String videoStatus) {
		this.videoStatus = videoStatus;
	}

	public java.lang.Integer getBusinessVideoType() {
		return businessVideoType;
	}

	public void setBusinessVideoType(java.lang.Integer businessVideoType) {
		this.businessVideoType = businessVideoType;
	}

	public java.util.Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(java.util.Date createTime) {
		this.createTime = createTime;
	}
	
	public String getCreateTimeString() {
		return DateUtils.date2String(getCreateTime(), FORMAT_EFFECTIVE_START);
	}

	public void setCreateTimeString(String value) {
		setCreateTime(DateUtils.string2Date(value, FORMAT_EFFECTIVE_START, java.util.Date.class));
	}

	public java.util.Date getEndTime() {
		return endTime;
	}

	public void setEndTime(java.util.Date endTime) {
		this.endTime = endTime;
	}
	
	public String getEndTimeString() {
		return DateUtils.date2String(getCreateTime(), FORMAT_EFFECTIVE_START);
	}

	public void setEndTimeString(String value) {
		setCreateTime(DateUtils.string2Date(value, FORMAT_EFFECTIVE_START, java.util.Date.class));
	}
	
	public java.lang.String getOpId() {
		return opId;
	}

	public void setOpId(java.lang.String opId) {
		this.opId = opId;
	}

	@Override
	public String toString() {
		return "VideoModel [id=" + id + ", businessType=" + businessType
				+ ", businessId=" + businessId + ", videoStatus=" + videoStatus
				+ ", businessVideoType=" + businessVideoType + ", createTime="
				+ createTime + ", endTime=" + endTime + "]";
	}
}
