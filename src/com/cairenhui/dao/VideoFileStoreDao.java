package com.cairenhui.dao;

import org.springframework.stereotype.Repository;

import com.cairenhui.model.FileStoreModel;
@Repository
public class VideoFileStoreDao extends BaseDao<FileStoreModel,java.lang.Long>{

	@Override
	public Class<FileStoreModel> getEntityClass() {
		return FileStoreModel.class;
	}

}
