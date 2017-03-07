package com.cairenhui.service;

import com.cairenhui.model.FileStoreModel;
import com.cairenhui.model.VideoModel;

public  interface  VideoBusinessService {

	public int insert(VideoModel videoModel);

	public void update(VideoModel videoModel);

	public VideoModel getObjectByBizId(String string, String bizType);

}
