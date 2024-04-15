let bg = ["#d0b8ac"]
let c1 = ["#fbf8cc", "#fde4cf", "#ffcfd2", "#f1c0e8","#cfbaf0", "#a3c4f3", "#90dbf4", "#98f5e1", "#b9fbc0"];
let c2 = ["#edf2fb", "#e2eafc", "#d7e3fc", "#ccdbfd", "#c1d3fe", "#b6ccfe", "#abc4ff"];


var patterns=[]  //所有圖案的資料
var pattern
var score=0
class pattern_class{  //宣告一個pattern_class物件
  constructor(args){
    this.p=args.p||{x:width/2,y:height/2};
    this.w=args.w||random(50,120)
    this.h=args.h||random(50,150)
    this.c=args.c||random(c1)
    this.d=args.d||random(30,300)
    this.v=args.v||{x:random(-2,1),y:random(-3,1)}
    this.s=args.s||random(c2)  //邊框
    this.shape=random(["square","circle","Triangle"]);
  }
  draw(){
    push();
    translate(this.p.x, this.p.y);
    drawingContext.setLineDash([3, 4, 3, 6]);

    if (this.shape == "square") {
      rectMode(CENTER);
      noStroke();
      fill(this.c);
      rect(0, 0, this.w / 1.5, this.w / 1.5);
      stroke(this.s);
      strokeWeight(3);
      noFill();
      rect(0 - this.d / 9, 0 - this.d / 9, this.w / 1.5, this.w / 1.5);
    } else if (this.shape == "circle") {
      noStroke();
      fill(this.c);
      circle(0, 0, this.d / 1.5);
      stroke(this.s);
      strokeWeight(3);
      noFill();
      circle(0 - this.d / 10, 0 - this.d / 10, this.d / 1.5);
    } else if (this.shape == "Triangle") {
      noStroke();
      fill(this.c);
      triangle(this.d / 2.5, this.d / 2.5, -this.d / 2.5, this.d / 2.5, -this.d / 2.5, -this.d / 2.5);
      stroke(this.s);
      strokeWeight(3);
      noFill();
      triangle(this.d / 2.5 - this.d / 8, this.d / 2.5 - this.d / 8, -this.d / 2.5 - this.d / 8, this.d / 2.5 - this.d / 8, -this.d / 2.5 - this.d / 8, -this.d / 2.5 - this.d / 8);
    }
    pop();
  }
  update(){
    if(this.shape=="circle"){
      this.p.y=this.p.y+sin(frameCount/10+this.w/10)*(this.w/10)
      this.p.x=this.p.x+this.v.x
      this.p.y=this.p.y+this.v.y
    }else{
      this.p.x=this.p.x+this.v.x
      this.p.y=this.p.y+this.v.y
    }
    // this.v.y=this.v.y+this.a.y //把往下的速度，每次加一個a
    //a為正值，this.v.y碰到地時，會變成負值，如果兩數相加，this.v.y就會慢慢變成0
    // this.v.x=this.v.x*0.99
    // this.v.y=this.v.y*0.99 
    //反彈
    if(this.p.x<0){
      this.v.x=-this.v.x
    }
    if(this.p.x>width){
      this.v.x=-this.v.x
    }
    if(this.p.y<0){
      this.v.y=-this.v.y
    }
    if(this.p.y>height){
      this.v.y=-this.v.y
    }
  }
  isballInRange(){  //計算
    //d:把目前這個物件的位置與滑鼠間的距離
    let d=dist(mouseX,mouseY,this.p.x,this.p.y)
    if(d<this.w){
      return true
    }else{
      return false
    }

  }
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(bg);
  for(i=0;i<25;i=i+1){  //產生幾個
    pattern=new pattern_class({ //傳一段參數值到class，以參數為主
      p:{x:random(0,width),y:random(0,height)},
    })
  patterns.push(pattern)  //把數據存入
  }
}
function draw() {
  background(bg);
  textSize(70)
  text("分數："+score,50,120)
  for(j=0;j<patterns.length;j=j+1){
    pattern=patterns[j]
    pattern.draw()
    pattern.update()
    if(pattern.isballInRange()){
      pattern.v.x=pattern.v.x+0.5
      pattern.v.y=pattern.v.y+0.5
    }
  }
}
function mousePressed(){  
  for(let pattern of patterns){  //balls放者所有的物件，每次就拿出一個物件放入ball
    if(pattern.isballInRange()){
        patterns.splice(patterns.indexOf(pattern),1) //刪除一個物件
        score=score+1
    }
  }
  textSize(50)
  text(score,50,80)
}
 留言
 編輯此處
