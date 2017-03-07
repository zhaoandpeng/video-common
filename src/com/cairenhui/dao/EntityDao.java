package com.cairenhui.dao;

import java.io.Serializable;

public interface EntityDao <T,PK extends Serializable>{
	
	public T getById(PK id);
	
	public void deleteById(PK id);
	
	public int insert(T t);
	
	public void update(T t);
	
}
