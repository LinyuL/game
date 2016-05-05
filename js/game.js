function game(obj,stop,scores,ends,levels){
	this.obj=obj;
	this.stop=stop;
	this.scores=scores;
	this.ends=ends;
	this.levels=levels;
	this.letter=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];  //放字母的数组
	this.letterArr=[];  //建立一个新的数组
	this.speed=3;
	this.num=4;  //显示的数字
	this.lift=10;  //声明周期
	this.level=1;  //关卡
	this.score=0;  //分数
	this.cw=document.documentElement.clientWidth;   //
	this.ch=document.documentElement.clientHeight;	
	this.play();
	this.key();
	this.end();
	// this.speed=1;
}

game.prototype={
	getLetter:function(num){
		for (var i = 0; i < num; i++) {
			var div=document.createElement("div");
			div.style.cssText="position: absolute;width:60px;height:60px;background:url(./img/bg.png);background-size:cover;border-radius:5px;color:#672A0D;text-align:center;line-height:60px;font-size:36px;left:"+(Math.random()*(this.cw-400)+200)+"px;top:"+(Math.random()*(-50)-50)+"px";
			div.innerHTML=this.letter[Math.floor(Math.random()*this.letter.length)];
			this.obj.appendChild(div);
			this.letterArr.push(div);
		};
	},
	play:function(){
		var that=this;
		var flag=true;
		var py=setInterval(play,50);
		function play(){
			if(that.letterArr.length<that.num){
				that.getLetter(that.num-that.letterArr.length);
			}
			for (var i = 0; i < that.letterArr.length; i++) {
				that.letterArr[i].style.top=that.letterArr[i].offsetTop+that.speed+"px";
				if(that.letterArr[i].offsetTop>that.ch){
					that.obj.removeChild(that.letterArr[i]);
					that.letterArr.splice(i,1);
				}
				// 关卡的变化值
				if(that.score==10){
					that.level=2;
					that.levels.innerHTML=that.level;
					clearInterval(py);
					py=setInterval(play,50);
				}
			};
		}
		// 给同一个按钮实现两种效果，可以开始，也可以结束（开关思想）
		that.stop.onclick=function(){
			if(flag){  
				flag=false;
				clearInterval(py);
			}
			else{
				py=setInterval(play,50);
				flag=true;
			}
			
		}

	},
	key:function(){
		var that=this;
		var sc;	
		document.onkeydown=function(e){
			var ev=e||window.event;
			var let=String.fromCharCode(ev.keyCode);
			for (var i = 0; i < that.letterArr.length; i++) {
				if(that.letterArr[i].innerHTML==let){
					that.obj.removeChild(that.letterArr[i]);
					that.letterArr.splice(i,1);
					that.score++;
					that.scores.innerHTML=that.score;
					sc=that.scores.innerHTML;
					if(sc==10){
						alert("恭喜您，过关了");
					}
					break;
				}
			};
		}
	},
	end:function(){
		this.ends.onclick=function(){
			var b=confirm("您真的要离开了吗？");
			if(b){
				location.reload();
			}
		}
	}


}