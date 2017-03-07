package com.bairuitech.server;

import javax.servlet.http.HttpServlet;

public class StartServerServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Override
	public void init() {
		BusinessServer server = new BusinessServer();
		try {
			server.initSystem();
		} catch (Exception e) {
			System.out.println("异常");
			e.printStackTrace();
		}
	}

}
