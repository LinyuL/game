$(function(){
	var cjBox=$(".cj-box")[0];
	var start=$(".start")[0];  //开始游戏按钮
	var stop=$(".stop")[0];  //停止游戏按钮
	var end=$(".end")[0];  //结束游戏按钮
	var ok=$(".ok")[0];  //确定开始按钮
	var score=$(".score")[0];  //分数
	var level=$(".level")[0];  //关卡
	var content=$(".content")[0];
	var flag=true;	
	ok.onclick=function(){
		content.style.display="none";		
	}
	start.onclick=function(){
		if(!flag){
			return;
		}
		flag=false;
		new game(cjBox,stop,score,end,level);
	}
	

})