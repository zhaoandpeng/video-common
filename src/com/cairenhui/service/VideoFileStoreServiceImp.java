package com.cairenhui.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cairenhui.dao.VideoFileStoreDao;
import com.cairenhui.model.FileStoreModel;
@Service
public class VideoFileStoreServiceImp implements VideoFileStoreService{

	@Autowired
	VideoFileStoreDao videoFileStoreDao;
	
	@Override
	public int insert(FileStoreModel model) {
		return videoFileStoreDao.insert(model);
	}
}
