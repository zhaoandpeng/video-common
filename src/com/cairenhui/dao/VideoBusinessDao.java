package com.cairenhui.dao;

import java.util.Map;

import org.springframework.stereotype.Repository;

import com.cairenhui.model.FileStoreModel;
import com.cairenhui.model.VideoModel;

@Repository
public class VideoBusinessDao extends BaseDao<VideoModel,java.lang.Long>{

	public Class<VideoModel> getEntityClass() {
		return VideoModel.class;
	}
	
	public VideoModel getObjectByBizId(Map<String, Object> paramMap) {
//		System.out.println(">>>>>>>>>>>>>>>>>>>>>>>>>>>>="+getEntityClass().getSimpleName());
		VideoModel videoModel = this.getSession().selectOne("VideoModel.getObjectByBizId", paramMap);
		this.session.close();
		return videoModel;
	}

	public int insertFile(FileStoreModel model) {
		// TODO Auto-generated method stub
		return 0;
	}

}
