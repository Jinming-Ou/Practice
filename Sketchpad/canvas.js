var canvas=document.getElementById('canvas');
var cxt=canvas.getContext('2d');
cxt.lineWidth=3;
cxt.strokeStyle="#000";
var flag=0;
var startX;
var endX;
var startY;
var endY;

		
//获取操作ID
var Brush=document.getElementById('brush');
var Eraser=document.getElementById('eraser');
var Paint=document.getElementById('paint');
var Word=document.getElementById('text');
var Magnifier=document.getElementById('magnifier');
var Straw=document.getElementById('straw');
var Line=document.getElementById('line');
var Arc=document.getElementById('arc');
var ArcFill=document.getElementById('arcFill');
var Rect=document.getElementById('rect');
var RectFill=document.getElementById('rectFill');
var Poly=document.getElementById('poly');
var actions=[Brush,Eraser,Paint,Word,Magnifier,Straw,Line,Arc,ArcFill,Rect,RectFill,Poly]
//获取宽度
var Width_1=document.getElementById('width_1');
var Width_3=document.getElementById('width_3');
var Width_5=document.getElementById('width_5');
var Width_8=document.getElementById('width_8');
var lineWidths=[Width_1,Width_3,Width_5,Width_8];
//获取颜色
var Crimson=document.getElementById('Crimson');
var Orange=document.getElementById('Orange');
var Yellow=document.getElementById('Yellow');
var LimeGreen=document.getElementById('LimeGreen');
var PaleGreen=document.getElementById('PaleGreen');
var RoyalBlue=document.getElementById('RoyalBlue');
var colors=[Crimson,Orange,Yellow,LimeGreen,PaleGreen,RoyalBlue];
brush(0);

//选中样式 只有设置color用到border 选择其他工具都有style参数1
function selectStatus(array,num,style){
	for(var i=0;i<array.length;i++){
		if(i==num){
			if(style==1){
				array[i].style.border='1px solid PaleVioletRed'
			}else{
				array[i].style.border='2px solid white';
			}
			
		}else{
			if(style==1){
				array[i].style.border='1px solid transparent'
			}else{
				array[i].style.border='2px solid transparent';
			}
		}
	}
}
//清除画布
function clearAll(num){
	// selectStatus(actions,num,1);
	cxt.clearRect(0,0,780,456);
	// canvas.onmousedown=null;
	// canvas.onmousemove=null;
	// canvas.onmouseup=null;
	// canvas.onmouseout=null;
}
//刷子
function brush(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt?evt:window.event;
			startX = evt.pageX - this.offsetLeft;
			startY = evt.pageY - this.offsetTop;
			flag=1;
			cxt.closePath();
			cxt.beginPath();
			cxt.moveTo(startX,startY);
	}
		
	canvas.onmousemove=function(evt){
			evt=evt?evt:window.event;
			endX = evt.pageX - this.offsetLeft;
			endY = evt.pageY - this.offsetTop; 
			
			if(flag){
				cxt.lineTo(endX,endY);
				cxt.stroke();
			 }
	}
		
	canvas.onmouseup=function(evt){
			flag=0;
	}
	canvas.onmouseout=function(evt){
			flag=0;
	}
}
//橡皮擦
function eraser(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt?evt:window.event;
			startX = evt.pageX - this.offsetLeft;
			startY = evt.pageY - this.offsetTop; 
			flag=1;
			cxt.clearRect(startX-cxt.lineWidth,startY-cxt.lineWidth,cxt.lineWidth,cxt.lineWidth);
			
	}
		
	canvas.onmousemove=function(evt){
			evt=evt?evt:window.event;
			endX = evt.pageX - this.offsetLeft;
			endY = evt.pageY - this.offsetTop; 
			
			if(flag){
				cxt.clearRect(endX-cxt.lineWidth,endY-cxt.lineWidth,cxt.lineWidth,cxt.lineWidth);	
			}
	}
		
	canvas.onmouseup=function(evt){
			flag=0;
	}
	canvas.onmouseout=function(evt){
			flag=0;
	}
}
//涂料
function paint(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(){
		cxt.fillRect(0,0,800,456);
	}
	
}
//滴管
function straw(num){
	selectStatus(actions,num,1);
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
	canvas.onmousedown=function(evt){
		evt=evt?evt:window.event;
		X = evt.pageX - this.offsetLeft;
		Y = evt.pageY - this.offsetTop; 
		var imageData=cxt.getImageData(X,Y,1,1);
		var pxData=imageData.data;
		var color='rgba('+pxData[0]+','+pxData[1]+','+pxData[2]+','+pxData[3]+')';
		cxt.strokeStyle=color;
		cxt.fillStyle=color;
	}
}
//文字
function text(num){
	selectStatus(actions,num,1);
	
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
	canvas.onmousedown=function(evt){
		evt=evt?evt:window.event;
		startX = evt.pageX - this.offsetLeft;
		startY = evt.pageY - this.offsetTop; 
		var content=window.prompt('请输入要展示的内容','');
		if(content){
			cxt.fillText(content,startX,startY);
		}
		
	}
}
//伸缩
function magnifier(num){
	selectStatus(actions,num,1);
	var scale=window.prompt('请输入缩放比例','');
	var scaleX=780*scale/100;
	var scaleY=456*scale/100;
	canvas.style.width=parseInt(scaleX)+'px';
	canvas.style.height=parseInt(scaleY)+'px';
}
//线条
function line(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt?evt:window.event;
			startX = evt.pageX - this.offsetLeft;
			startY = evt.pageY - this.offsetTop; 
			cxt.closePath();
			cxt.beginPath();
			cxt.moveTo(startX,startY); //��ʼλ��
	}
	canvas.onmouseup=function(evt){
			evt=evt?evt:window.event;
			endX = evt.pageX - this.offsetLeft;
			endY = evt.pageY - this.offsetTop; 
			cxt.lineTo(endX,endY);
			cxt.stroke();
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
	
	
}
//空心圆
function arc(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt?evt:window.event;
			startX = evt.pageX - this.offsetLeft;
			startY = evt.pageY - this.offsetTop; 
			cxt.closePath();
			cxt.beginPath();
	}
	canvas.onmouseup=function(evt){
			evt=evt?evt:window.event;
			endX = evt.pageX - this.offsetLeft;
			endY = evt.pageY - this.offsetTop; 
			cxt.arc(startX,startY,Math.sqrt(Math.pow((endX-startX),2)+Math.pow((endY-startY),2)),0,360,false);
			cxt.stroke();
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//实心圆
function arcFill(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt?evt:window.event;
			startX = evt.pageX - this.offsetLeft;
			startY = evt.pageY - this.offsetTop; 
			cxt.closePath();
			cxt.beginPath();
	}
	canvas.onmouseup=function(evt){
			evt=evt?evt:window.event;
			endX = evt.pageX - this.offsetLeft;
			endY = evt.pageY - this.offsetTop; 
			cxt.arc(startX,startY,Math.sqrt(Math.pow((endX-startX),2)+Math.pow((endY-startY),2)),0,360,false);
			cxt.fill();
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//空心方块
function rect(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt?evt:window.event;
			startX = evt.pageX - this.offsetLeft;
			startY = evt.pageY - this.offsetTop; 
	}
	canvas.onmouseup=function(evt){
			evt=evt?evt:window.event;
			endX = evt.pageX - this.offsetLeft;
			endY = evt.pageY - this.offsetTop; 
			cxt.strokeRect(startX,startY,endX-startX,endY-startY);
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//实心方块
function rectFill(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt?evt:window.event;
			startX = evt.pageX - this.offsetLeft;
			startY = evt.pageY - this.offsetTop; 
	}
	canvas.onmouseup=function(evt){
			evt=evt?evt:window.event;
			endX = evt.pageX - this.offsetLeft;
			endY = evt.pageY - this.offsetTop; 
			cxt.fillRect(startX,startY,endX-startX,endY-startY);
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//三角形
function poly(num){
	selectStatus(actions,num,1);
	canvas.onmousedown=function(evt){
			evt=evt?evt:window.event;
			startX = evt.pageX - this.offsetLeft;
			startY = evt.pageY - this.offsetTop; 
			
			cxt.beginPath();
	}
	canvas.onmouseup=function(evt){
			evt=evt?evt:window.event;
			endX = evt.pageX - this.offsetLeft;
			endY = evt.pageY - this.offsetTop; 
			cxt.moveTo(endX,endY);
			cxt.lineTo(startX-(endX-startX),endY);
			cxt.lineTo(startX,startY-Math.sqrt(Math.sqrt(endX-startX,2)+Math.sqrt(endY-startY,2)));
			cxt.closePath();
			cxt.stroke();
			
	}
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
//设置宽度
function setWidth(num){
	selectStatus(lineWidths,num,1);
	switch(num){
		case 0:
			cxt.lineWidth=1;
			break;
		case 1:
			cxt.lineWidth=3;
			break;
		case 2:
			cxt.lineWidth=5;
			break;
		case 3:
			cxt.lineWidth=8;
			break;
		default:
			alert('设置宽度错误');
	}
}
//设置颜色
function setColor(obj,num){
	selectStatus(colors,num);
	cxt.strokeStyle=obj.id;
	cxt.fillStyle=obj.id;
}