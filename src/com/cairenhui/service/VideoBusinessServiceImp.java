package com.cairenhui.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cairenhui.dao.VideoBusinessDao;
import com.cairenhui.model.VideoModel;
@Service
public class VideoBusinessServiceImp implements VideoBusinessService{

	@Autowired
	VideoBusinessDao videoBusinessDao;
	
	@Override
	public int insert(VideoModel videoModel) {
		return videoBusinessDao.insert(videoModel);
	}

	@Override
	public void update(VideoModel videoModel) {
		this.videoBusinessDao.update(videoModel);
	}

	@Override
	public VideoModel getObjectByBizId(String bizId, String bizType) {
		Map<String,Object> paramMap = new HashMap<String,Object>();
		paramMap.put("businessId", bizId);
		paramMap.put("businessType", bizType);
		VideoModel videoModel = videoBusinessDao.getObjectByBizId(paramMap);
		return videoModel;
	}
}
