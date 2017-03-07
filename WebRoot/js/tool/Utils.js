define([], function() {
	function _renderDom(a, b) {
		var $dom = $$(arguments[0]);
		var result;
		var nodatahtml = $dom.length > 0 ? $dom[0].outerHTML : "";
		var arr = nodatahtml.match(/{{[a-zA-Z0-9\.\-\+]*}}/g);
		var attr;
		var value;
		var newHtml;
		if (arguments[1].length == 0) {
			$dom.html(nodatahtml);
			return;
		}
		var data = b;
		$.each(arguments[1], function(index, v) {
			result = v;
			newHtml = nodatahtml;
			for (var i = 0; i < arr.length; i++) {
				attr = arr[i].replace('{{', '').replace('}}', '').replace(new RegExp(/^this/, "g"), 'data');
				value = eval(attr);
				newHtml = newHtml.replace(arr[i], value);
			}
			$dom.append(newHtml);
		})
	}

	function bindEvents(bindings) {
		if ($.isArray(bindings) && bindings.length > 0) {
			for ( var i in bindings) {
				if (bindings[i].target) {
					$(bindings[i].element).on(bindings[i].event, bindings[i].target, bindings[i].handler);
				} else {
					$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
				}
			}
		}
	}

	function _isEmptyJson() {
		var json = arguments[0];
		var i = 0;
		for ( var pop in json) {
			i++;
			break;
		}
		return i == 0;
	}

	function _rernderPage(name, result) {
		var $box = $("." + name);
		var traBox = $box.find("[crh-data]");
		_renderDom(traBox, result);
	}

	/***************************************************************************
	 * 检查正则类型 param
	 * 
	 * @type "phone" or "email" or""
	 * @checkSource "13456788888"
	 **************************************************************************/
	function _checkRagular(type, data) {
		var rgx, ragular;
		switch (type) {
			// 新用户注册 发送 手机号
			case 'phone' :
				rgx = '^[1][358][0-9]{9}$';
				break;
			case 'email' :
				rgx = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
				break;
			case 'password' :
				rgx = /^(?:(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])).{6,16}$/;
				break;
			default :
				rgx = "";
				break;
		}
		ragular = new RegExp(rgx);
		return ragular.test(data);
	}

	function _showTips() {
		if ($(".tips-model").length == 0) {
			var tips = "<div class='tips-model'>" + "<img src='img/set_ok.png'/>" + "<p>设置成功</p>" + "</div>";
			$("body").append(tips);
			$("body").find(".tips-model").hide();
		}
		$("body").find(".tips-model").show();

		setTimeout(function() {
			$("body").find(".tips-model").hide();
		}, 1000)
	}

	function _calendar(dom) {
		var $dom = $(dom);
		var curDate = new Date();
		var todayY = curDate.getFullYear(), todayM = curDate.getMonth() + 1;
		var config = {
			"curY" : curDate.getFullYear(),
			"curM" : curDate.getMonth() + 1,
			"curD" : curDate.getDate(),
			"curW" : curDate.getDay(),
			"calenderBar" : '<div class="calendar-bar"><div class="left-btn"></div><span></span><div class="right-btn"></div></div>',
			"weekbar" : '<table class="weekBar" cellpadding="0" cellspacing="0"><tr><td>日</td><td>一</td>'
					+ '<td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr></table>',
			"calendarBody" : '<table class="calendarBody" cellpadding="0" cellspacing="0"><tr><td></td><td></td><td></td><td></td>'
					+ '<td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
					+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
					+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
					+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
					+ '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></table>',
			"footBar" : '<div class="footBar">您选择的日期为：<span class="chooseTime"></span></div>'
		};
		calInit();
		// 算某个月的第一天是星期几
		function getfirstday(m, y) {
			m = m - 1;
			var d = new Date(y, m, 1);
			return d.getDay();
		}

		// 算某个月的总天数
		function getdaysinonemonth(year, month) {
			month = parseInt(month, 10);
			var d = new Date(year, month, 0);
			return d.getDate();
		}

		// 填充日期
		function senderDays(m, y) {
			var weekday = getfirstday(m, y);
			var curMonthDays = getdaysinonemonth(y, m);
			var prevMonthDays = getdaysinonemonth(y, m - 1);
			var mid = 0;
			$dom.find(".grayF").removeClass("grayF");
			$dom.find(".today").removeClass("today");
			// 第一行
			if (weekday == 0) {
				for (var j = 0; j < 7; j++) {
					$dom.find(".calendarBody tr").eq(0).find("td").eq(j).html(prevMonthDays - (6 - j)).addClass("grayF");

					mid = 0;
				}
			} else {
				for (var i = 0; i < weekday; i++) {
					$dom.find(".calendarBody tr").eq(0).find("td").eq(i).html(prevMonthDays - (weekday - i - 1)).addClass("grayF");
				}
				for (var i = 0; i < 7 - weekday; i++) {
					$dom.find(".calendarBody tr").eq(0).find("td").eq(weekday + i).html(i + 1);
					if ((weekday + i) == 6) {
						$dom.find(".calendarBody tr").eq(0).find("td").eq(weekday + i);
					}
				}
				$dom.find(".calendarBody tr").eq(0).find("td").eq(6).addClass("grayF");
				mid = 7 - weekday;
			}
			// 后面渲染
			for (var i = 1; i < 6; i++) {
				for (var j = 0; j < 7; j++) {
					mid += 1;
					if (mid > curMonthDays) {
						$dom.find(".calendarBody tr").eq(i).find("td").eq(j).html(mid - curMonthDays).addClass("grayF");
					} else {
						if (mid == config.curD && todayY == config.curY && todayM == config.curM) {
							$dom.find(".calendarBody tr").eq(i).find("td").eq(j).addClass("today")
						}
						$dom.find(".calendarBody tr").eq(i).find("td").eq(j).html(mid);
					}
				}
				$dom.find(".calendarBody tr").eq(i).find("td").eq(0).addClass("grayF");
				$dom.find(".calendarBody tr").eq(i).find("td").eq(6).addClass("grayF");
			}
		}

		// 日历事件
		function calendarEvents() {
			// 日期点击事件
			$dom.find(".calendarBody td").on("click", function() {
				if ($(this).hasClass("grayF"))
					return;
				$dom.find(".active").removeClass("active");
				$(this).addClass("active");
				var d = $(this).html() + "日", week = $(this).index();
				footBarShow(d, week)
			});
			// 上一月点击事件
			$(".calendar-bar .left-btn").on("click", function() {
				config.curM = config.curM - 1;
				if (config.curM == 0) {
					config.curM = 12;
					config.curY = config.curY - 1;
				}
				senderHeader(config.curM, config.curY);
				senderDays(config.curM, config.curY);
			});
			// 下一月点击事件
			$(".calendar-bar .right-btn").on("click", function() {
				config.curM = config.curM + 1;
				if (config.curM == 13) {
					config.curM = 1;
					config.curY = config.curY + 1;
				}
				senderHeader(config.curM, config.curY);
				senderDays(config.curM, config.curY);
			})
		}

		// footbar 显示选择日期
		function footBarShow(d, week) {
			var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
			$dom.find(".footBar .chooseTime").html($(".calendar-bar").find("span").html() + d + "，" + weekday[week]);
		}

		// 渲染head日期显示
		function senderHeader(m, y) {
			var m = m < 10 ? ("0" + m) : m;
			var ym = y + "年" + m + "月"
			$(".calendar-bar").find("span").text(ym);
		}

		function calInit() {
			$dom.html(config.calenderBar + config.weekbar + config.calendarBody + config.footBar);
			senderHeader(config.curM, config.curY);
			senderDays(config.curM, config.curY);
			footBarShow(config.curD, config.curW);
			calendarEvents();
		}
	}

	// 控制foot定位
	function footPosition() {
		var clientH = document.body.clientHeight;
		var headerH = $("header").height(), pageH = $(".page").height(), footerH = $("footer").height();
		var pageHight = headerH + pageH + footerH;
		if (clientH > pageHight) {
			$("footer").addClass("off-foot");
		} else {
			$("footer").removeClass("off-foot");
		}
		$("footer").show()
		$(window).resize(function() {
			footPosition();
		})
	}

	return {
		// 判断是否空的json
		isEmptyJson : _isEmptyJson,
		// 绑定事件
		bindEvents : bindEvents,
		// 渲染页面
		rernderPage : _rernderPage,
		// 检查正则类型
		checkRagular : _checkRagular,
		showTips : _showTips,
		calendar : _calendar,
		footPosition : footPosition
	};
});
