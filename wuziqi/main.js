/*
* @Author: Administrator
* @Date:   2017-04-27 20:12:42
* @Last Modified by:   Administrator
* @Last Modified time: 2017-04-27 20:13:08
*/

'use strict';
var index=1;  //第几次落子
		var lines=15; 
		var chesses;
		$(function(){
			chesses=new Array(lines);  //一维数组
			for(var i = 0; i < lines; i++){
				chesses[i] = new Array(lines);  //二维数组,数组中的元素又是数组
			}
			for(var i = 0; i < lines; i++){
				for(var j = 0; j < lines; j++){
				chesses[i][j] = 0;  //0表示空白，1表示黑棋，-1表示白棋
			}
		}
		$("#spInfo").html("落黑滑稽");
		$(".chess").draggable({  //开始拖动棋子
			cursor:"pointer",
			helper:"clone",     //光标移动副本
			containment:"#d1",  //约束边界
			stop:function(event,ui) {
				// 判断是否在白边内
				var pos = ui.position;
				if(pos.top <= 135 || pos.top >= 648 || pos.left <= 55 || pos.left >= 568){
					$("#spInfo").html("落子位置有误，重新落滑稽");
					return;
				}
				// 将position转换为数组索引
				var row = Math.round((pos.top - 135)/35);
				var col = Math.round((pos.left - 55)/35);
				if(chesses[row][col]){
					$("#spInfo").html("落子位置有滑稽，重新落滑稽");
					return;
				}
				var color = index % 2 == 1 ? 1 : -1
				chesses[row][col] = color;
				ui["helper"].clone().attr("id","ch" + (index++)).appendTo('#d1').css({top:row * 35 + 42 + "px",left:col * 35 + 42 + "px"});
				// 判断胜负
				if(index > 9){
					// 一行胜利
					for(var row = 0; row < lines; row++){
						for(var col = 0; col < lines - 4; col++){							
							for(var i = 0; i < 5; i++){
								if(chesses[row][col + i] != color){					break;
								}
							}
							if(i == 5){
								alert((color == 1 ? "黑":"白") + "滑稽胜利");
								$("#spInfo").html("请刷新再来一局五子滑稽棋~");
								if(color == 1)
									$("#black").draggable("disable");
								else
									$("#white").draggable("disable");
								return;
							}
						}
					}
                    //一列胜利
                    for(var row = 0; row < lines - 4; row++){
                    	for(var col = 0; col < lines; col++){							
                    		for(var i = 0; i < 5; i++){
                    			if(chesses[row + i][col] != color){					break;
                    			}
                    		}
                    		if(i == 5){
                    			alert((color == 1 ? "黑":"白") + "滑稽胜利");
                    			$("#spInfo").html("请刷新再来一局五子滑稽棋~");
                    			if(color == 1)
                    				$("#black").draggable("disable");
                    			else
                    				$("#white").draggable("disable");
                    			return;
                    		}
                    	}
                    }
					//斜列+
					for(var row = 0; row < lines - 4; row++){
						for(var col = 0; col < lines - 4; col++){							
							for(var i = 0; i < 5; i++){
								if(chesses[row + i][col + i] != color){				break;
								}
							}
							if(i == 5){
								alert((color == 1 ? "黑":"白") + "滑稽胜利");
								$("#spInfo").html("请刷新再来一局五子滑稽棋~");
								if(color == 1)
									$("#black").draggable("disable");
								else
									$("#white").draggable("disable");
								return;
							}
						}
					}
					//斜列-
					for(var row = 0; row < lines - 4; row++){
						for(var col = 4; col < lines; col++){							
							for(var i = 0; i < 5; i++){
								if(chesses[row + i][col - i] != color){				break;
								}
							}
							if(i == 5){
								alert((color == 1 ? "黑":"白") + "滑稽胜利");
								$("#spInfo").html("请刷新再来一局五子滑稽棋~");
								if(color == 1)
									$("#black").draggable("disable");
								else
									$("#white").draggable("disable");
								return;
							}
						}
					}


				}

				//	根据全局变量判断下一步该哪种颜色的棋子 
				if(index % 2 == 0){
					$("#white").draggable("enable");
					$("#black").draggable("disable");
					$("#spInfo").html("落白滑稽");
				}
				else{
					$("#white").draggable("disable");
					$("#black").draggable("enable");
					$("#spInfo").html("落黑滑稽");
				}												
			},
		});
$("#white").draggable("disable");
});		