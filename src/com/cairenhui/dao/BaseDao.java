package com.cairenhui.dao;

import java.io.Serializable;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

public abstract class BaseDao <T,PK extends Serializable>  implements EntityDao<T, PK>{
	
	public abstract Class<?> getEntityClass();

	@Resource
	private SqlSessionFactory factory;
	
	protected SqlSession session;
	
	public SqlSession getSession (){
		session = factory.openSession();
		return session;
	}
	
	protected String getSqlMapNamespace() {
        return getEntityClass().getSimpleName();
    }
	
	@Override
	public T getById(PK id) {
		T  t = this.getSession().selectOne(getEntityById(), id);
		session.close();
		return t;
	}
	
	public String getEntityById(){
		
		return getSqlMapNamespace()+".getById";
		
	}

	@Override
	public void deleteById(PK id) {
		this.getSession().delete(getDeleteById(), id);
		session.close();
	}

	public String getDeleteById(){
		
		return getSqlMapNamespace()+".delete";
	}
	
	@Override
	public int insert(T t) {
		int nextId = this.getSession().insert(getInsertQuery(), t);
		session.close();
		return nextId;
	}
	
	public String getInsertQuery() {
	       
		return getSqlMapNamespace()+".insert";
	}

	@Override
	public void update(T t) {
		this.getSession().update(getUpdateQuery(), t);
		session.close();
	}

	public String getUpdateQuery() {
	    
		return getSqlMapNamespace()+".update";
	}
}
