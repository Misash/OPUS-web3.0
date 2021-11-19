var str = "JavaScript Hacking Effect";
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var body = document.body; html = document.documentElement;
var W = window.innerWidth;
var H = document.getElementById("main").scrollHeight;
var drops;
var fontSize = 20;
var columns;
canvas.style.fontSize = "2em";

function obtain_data(){
    
    canvas.width = W;
    canvas.height = H;
    
    columns = Math.floor(W / fontSize);
    drops = [];
    for(var i=0; i<columns; i++){
        drops.push(0);
    }
}

obtain_data();

function draw(){

    W = window.innerWidth;
    H = document.getElementById("main").scrollHeight;

    if(W != canvas.width || H != canvas.height)
        obtain_data();                
    
    context.fillStyle = "rgba(0,0,0,0.05)";
    context.fillRect(0, 0, W, H);
    context.fontSize = "700 " + fontSize + "px";
    
    colors = ["#05E8E0", "#CA23CF", "#F1E608"]
    
    for(var i=0; i<columns; i++){
        
        context.fillStyle = colors[Math.floor(Math.random() * 3)]
        var index = Math.floor(Math.random()*str.length);
        var x = i * fontSize;

        var y = drops[i] * fontSize;
        context.fillText(str[index], x, y);
        if(y >= canvas.height && Math.random() > 0.99){
            drops[i] = 0;
        }
        drops[i]++;
    }
}
draw();
setInterval(draw, 40);