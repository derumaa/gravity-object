var canvas = document.querySelector('canvas'); //localiza o elemento canvas na DOM
var contexto = canvas.getContext('2d'); //determinando o modelo do canvas
var catX = catY = hyp = 0;


var gravity = 0.1 //valor da gravidade aplicada

//bola e seus objetos
var ball = {
    radius: 20,
    vx: Math.floor(Math.random()*10)+1,
    vy: 0,
    x: 50,
    y: 50,
    color: "#00f",
    held: false
}

canvas.addEventListener('mousedown',function(e){
    var cssValue = "cursor: -webkit-grabbing";
    canvas.style.cssText = cssValue;

    catX = ball.x - e.offsetX;
    catY = ball.y - e.offsetY;
    hyp = Math.sqrt(catX*catX + catY*catY);

    if(hyp < ball.radius && !ball.held){
        ball.held = true;
        //ball.held = ball.held ? false : true;
    }
},false);

canvas.addEventListener('mouseup',function(){
    var cssValue = "cursor: -webkit-grab";
    canvas.style.cssText = cssValue;

    if(ball.held){
        ball.held = false
        ball.vx = Math.floor(Math.random()*10)+1
    }
},false);

canvas.addEventListener('mousemove',function(e){
    if(ball.held){
        ball.x = e.offsetX;
        ball.y = e.offsetY;
    }
},false);

//função para executar as outras funções em loop
function loop(){
    window.requestAnimationFrame(loop,canvas);//fala pro browser q é uma animação
    update();
    render();
}


function update(){
    //aplicar gravidade se held = T
    if(!ball.held){
        ball.vy += gravity;
        ball.y += ball.vy;
        ball.x += ball.vx;
    } else {
        ball.vy = 0;
        ball.vx = 0;
    }
    //fazer quicar no chao
    if(ball.y + ball.radius > canvas.height){
        ball.y = canvas.height - ball.radius;
        ball.vy *= -0.8;
    }

    //fazer a bola quicar nas paredes
    if(ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width){
        ball.x = ball.x - ball.radius < 0 ? ball.radius : canvas.width - ball.radius;

        /*if(ball.x - ball.radius < 0){
            ball.x = ball.radius;
        } else {
            ball.x = canvas.width - ball.radius;
        }*/
        ball.vx *= -0.8;
    }

}

//visual da bola
function render(){
    contexto.clearRect(0,0,canvas.width, canvas.height);
    contexto.fillStyle = ball.color;
    contexto.beginPath();
    contexto.arc(ball.x, ball.y, ball.radius, 0,Math.PI*2);
    contexto.closePath();
    contexto.fill();
}

loop();