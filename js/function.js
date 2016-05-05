/*
  通过类名方式获取
  参数1  classname  类名
  参数2  obj 默认值 document  获取元素的范围
  例如：
  var num={
	name:"zhangsan",say:function(){
	  alert(this.name+"说话")
	}
  }
  alert(num.say);  //访问声明过的值的话，一定有值
  alert(num.play);  //如果访问没有声明的方法或者属性的时候，弹出的值为undefined

*/
// alert(1);
function $(selector,context){
  if(typeof selector=="string"){  //判断传进来的参数类型是字符串类型，执行
      var context=context||document; 
      if(selector.charAt(0)=="#"){   //获取指定位置为1 的字符串是否为#，判断结果为真的话，通过id名获取
          return document.getElementById(selector.substr(1));
      }else if(selector.charAt(0)=="."){   //获取的值为“.”的话，通过类名的方式获取
         return getClass(selector.substr(1),context);
      }
      else if(/^[a-zA-Z][a-zA-Z1-6]*$/.test(selector)){  //通过正则运算来判断标签名
         return context.getElementsByTagName(selector);  
      }else if(/^<[a-zA-Z][a-zA-Z1-6]*>$/.test(selector)){
          return document.createElement(selector.slice(1,-1));
      }
  }
  if(typeof selector=="function"){  //否则执行结果的function类型的语句
       on(window,"load",selector);
      /*window.onload=function(){  
         selector();   //传进来的参数为函数直接调用
      }*/
  }
}




function getClass(classname,obj){   //如果实参个数比形参个数少时，值为undefined，
	  var obj=obj||document;         //第二个参数没有传值的话，obj为undefined,左侧值为false，会返回右边的值
      if(document.getElementsByClassName!=undefined){
      	//支持
      	  return obj.getElementsByClassName(classname);
      }
      else{
         //不支持
         var arr=[];
         var Elem=obj.getElementsByTagName("*");
         for (var i = 0; i < Elem.length; i++) {
         	  if(check(Elem[i].className,classname)){
         	  	  arr.push(Elem[i]);
         	  }
         };
         return arr;
      }
}
function check(oldclass,newclass){
      var arr2=oldclass.split(" ");
      for (var i = 0; i < arr.length; i++) {
          if(arr[i]==newclass){
            return true;
          }
      };
      return false;
}


//兼容文本内容的获取
/*
  obj  对象
  val  设置的文本内容
*/
function getText(obj,val){
   if(val==undefined){   //判断是否传进第二个值，如果没有传值的话就是undefined，就只能获取
        if(obj.textContent==undefined){   //如果通过textContent获取到的值是undefined的时候，说明未定义，不支持这种获取方法
            //不支持
            return obj.innerText;   //返回一个值
       }else{
            return obj.textContent;  
       }
   }
   else{   //否则传进第二个值，需要设置，
      if(obj.textContent==undefined){
           obj.innerText=val;   //只需要把设置的值赋给变量的内容
      }else{
           obj.textContent=val;
      }
   }
   
}

// 获取外部样式和行内样式
/*
  obj: 对象      attr:属性 
*/
function getStyle(obj,attr){
   if(obj.currentStyle){  //兼容ie
      return obj.currentStyle[attr];  //因为attr是一个属性，要访问的是它里面的样式属性名，样式属性是一个字符串，用对象的方法来访问它
   }else{  //兼容ff chrome 
      return getComputedStyle(obj,null)[attr];
   }
}

// 获取所有的子节点
/*
   a  获取  需要文本
   b  默认  不需要文本  获取所有的标签
*/
function getChild(obj,type){
    type=type||"b";
    var childs=obj.childNodes;  //获取内部所有的子节点
    var newarr=[];     
    if(type=="b"){
         for (var i = 0; i < childs.length; i++) { //遍历出所有的子节点
           if(childs[i].nodeType==1){  //判断节点类型是否是1，节点类型为元素节点
               newarr.push(childs[i]);  //符合情况的值存放在数组内
           }
      };
    }
    if(type=="a"){  //需要获取的包括文本
      for (var i = 0; i < childs.length; i++) {  //判断条件为标签节点或者  子节点的类型为文本节点并且子节点的节点值不是空字符串
           if(childs[i].nodeType==1||(childs[i].nodeType==3&&frim(childs[i].nodeValue)!="")){
               newarr.push(childs[i]);
           }
      };
    }   
    return newarr;
}


/*
   parsent   父节点
   type    判断获取的值是否包括文本  默认为获取所有的标签节点
*/
// 获取第一个子节点
function getFirst(parsent,type){  //传第二个值是判断需要获取的值是否包括文本
    return getChild(parsent,type)[0];  //通过父节点获取内部所有的子节点，下标为0，获取第一个子节点
}


// 获取最后一个子节点
function getLast(parsent,type){
     var last=getChild(parsent,type);  //通过父节点获取内部所有的子节点并赋给一个变量
     return last[last.length-1];  //通过访问变量的最后一个值
}


// 获取任意一个子节点
function getNum(parsent,index){
     return getChild(parsent)[index];  //通过父节点获取所有的子节点，放问任意一个下标，可以访问到内部的任意一个节点
}

// 获取下一个兄弟节点
function getNext(obj){
     var next=obj.nextSibling;  //将获取到的下一个兄弟节点赋给一个变量
     if(next==null){
        return false;
     }
     // 判断条件为下一个兄弟节点的类型是注释节点 或者 下一个兄弟节点的类型是文本节点并且获取到的值是空字符串的话
     while(next.nodeType==8||(next.nodeType==3&&frim(next.nodeValue)=="")){
         next=next.nextSibling;  //就将当前兄弟节点的下一个兄弟节点的值赋给当前的兄弟节点
         if(next==null){  //日过下一个兄弟节点为空值的时候就让它返回 一个false，否则的话就会报错
          return false;
         }
     }
     return next;
}

// 获取上一个兄弟节点
function getPrevious(obj){
     var previous=obj.previousSibling;
     if(previous==null){
         return false;
     }
     while(previous.nodeType==8||(previous.nodeType==3&&frim(previous.nodeValue)=="")){
         previous=previous.previousSibling;
         if(previous==null){
          return false;
         }
     }
     return previous;
}



// 删除多余的空格,  【注意：面试可能会问】
/*
   string.frim()
   str 没有替换原本的字符串，只给我们返回一个值
*/
function frim(str,type){
   var type=type||"lr";
   if(type=="a"){
      return str.replace(/\s*/g,"");
   }
   if(type=="l"){
      return str.replace(/^\s*/g,"");
   }
   if(type=="r"){
      return str.replace(/\s*$/g,"");
   }
   if(type=="lr"){
      return str.replace(/^\s*|\s*$/g,"");
   }
}

// 插入对象某个对象之前
/*
   obj1  到插入的对象
   obj2  插入到前面的对象
*/
function insertBefore(obj1,obj2){
    obj2.parentNode.insertBefore(obj1,obj2);  //
}

// 插入一个对象之后
/*
   obj1  到插入的对象
   obj2  插入到后面的对象
*/
function insertAfter(obj1,obj2){
    var next=getNext(obj2);
    if(next==false){
        obj2.parentNode.appendChild(obj1);
        return;
    }
    next.parentNode.insertBefore(obj1,next);
}

/*
  同一个事件绑定多个处理程序
  on(对象，事件，函数名)
*/
function on(obj,event,fn){
     if(obj.addEventListener){
         obj.addEventListener(event,fn,false);
     }
     else{
         obj.attachEvent("on"+event,fn)
     }
}

/*
  删除同一个事件的多个处理程序
*/
function off(obj,event,fn){
     if(obj.removeEventListener){
         obj.removeEventListener(event,fn,false);
     }
     else{
        obj.detachEvent("on"+event,fn);
     }
}
