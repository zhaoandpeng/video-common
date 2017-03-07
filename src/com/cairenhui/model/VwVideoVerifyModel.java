package com.cairenhui.model;

import java.io.Serializable;


/**
 * 视频验证
 */
@SuppressWarnings("serial")
public class VwVideoVerifyModel implements Serializable {
		
	/**主键*/
	private java.lang.Long verifyId;
	/**订单*/
	private java.lang.Long orderId;
	/**见证柜员ID*/
	private java.lang.Long witnessEmpId;
	/**开始时间*/
	private java.util.Date startTime;
	/**结束时间*/
	private java.util.Date endTime;
	/**视频长度*/
	private java.lang.Integer videoLength;
	/**视频地址*/
	private java.lang.String videoAddress;
	/**验证结果 CREATED - 创建   APPROVAL-通过   REJECT-不通过   FAIL-异常中断*/
	private java.lang.String status;
	/**验证结果说明*/
	private java.lang.String resultComment;
	/**证件正面*/
	private java.lang.String identityFront;
	/**证件反面*/
	private java.lang.String identityBack;
	/**大头照*/
	private java.lang.String frontalPhoto;
	/**合同照*/
	private java.lang.String orderPhoto;
	/**营业执照*/
	private String licensePhoto;
	/**视频单双向*/
	private String videoType;
	/**业务类型*/
	private String businessType;
	
	public java.lang.Long getVerifyId() {
		return verifyId;
	}
	public void setVerifyId(java.lang.Long verifyId) {
		this.verifyId = verifyId;
	}
	public java.lang.Long getOrderId() {
		return orderId;
	}
	public void setOrderId(java.lang.Long orderId) {
		this.orderId = orderId;
	}
	public java.lang.Long getWitnessEmpId() {
		return witnessEmpId;
	}
	public void setWitnessEmpId(java.lang.Long witnessEmpId) {
		this.witnessEmpId = witnessEmpId;
	}
	public java.util.Date getStartTime() {
		return startTime;
	}
	public void setStartTime(java.util.Date startTime) {
		this.startTime = startTime;
	}
	public java.util.Date getEndTime() {
		return endTime;
	}
	public void setEndTime(java.util.Date endTime) {
		this.endTime = endTime;
	}
	public java.lang.Integer getVideoLength() {
		return videoLength;
	}
	public void setVideoLength(java.lang.Integer videoLength) {
		this.videoLength = videoLength;
	}
	public java.lang.String getVideoAddress() {
		return videoAddress;
	}
	public void setVideoAddress(java.lang.String videoAddress) {
		this.videoAddress = videoAddress;
	}
	public java.lang.String getStatus() {
		return status;
	}
	public void setStatus(java.lang.String status) {
		this.status = status;
	}
	public java.lang.String getResultComment() {
		return resultComment;
	}
	public void setResultComment(java.lang.String resultComment) {
		this.resultComment = resultComment;
	}
	public java.lang.String getIdentityFront() {
		return identityFront;
	}
	public void setIdentityFront(java.lang.String identityFront) {
		this.identityFront = identityFront;
	}
	public java.lang.String getIdentityBack() {
		return identityBack;
	}
	public void setIdentityBack(java.lang.String identityBack) {
		this.identityBack = identityBack;
	}
	public java.lang.String getFrontalPhoto() {
		return frontalPhoto;
	}
	public void setFrontalPhoto(java.lang.String frontalPhoto) {
		this.frontalPhoto = frontalPhoto;
	}
	public java.lang.String getOrderPhoto() {
		return orderPhoto;
	}
	public void setOrderPhoto(java.lang.String orderPhoto) {
		this.orderPhoto = orderPhoto;
	}
	public String getLicensePhoto() {
		return licensePhoto;
	}
	public void setLicensePhoto(String licensePhoto) {
		this.licensePhoto = licensePhoto;
	}
	public String getVideoType() {
		return videoType;
	}
	public void setVideoType(String videoType) {
		this.videoType = videoType;
	}
	public String getBusinessType() {
		return businessType;
	}
	public void setBusinessType(String businessType) {
		this.businessType = businessType;
	}
	
	@Override
	public String toString() {
		return "VwVideoVerify [verifyId=" + verifyId + ", orderId=" + orderId
				+ ", witnessEmpId=" + witnessEmpId + ", startTime=" + startTime
				+ ", endTime=" + endTime + ", videoLength=" + videoLength
				+ ", videoAddress=" + videoAddress + ", status=" + status
				+ ", resultComment=" + resultComment + ", identityFront="
				+ identityFront + ", identityBack=" + identityBack
				+ ", frontalPhoto=" + frontalPhoto + ", orderPhoto="
				+ orderPhoto + ", licensePhoto=" + licensePhoto
				+ ", videoType=" + videoType + ", businessType=" + businessType
				+ "]";
	}
}

