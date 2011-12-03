window.onload = function() {
    var canvas = document.getElementById("c");
    
    function Particle(x,y,col) {
        this.x = x;
        this.y = y;
        this.col = col;
        
        this.g = new Graphics();
        this.g.beginFill(col);
        this.g.drawRect(0,0,1,1);
        this.s = new Shape(this.g);
        this.s.x = this.x;
        this.s.y = this.y;
        stage.addChild(this.s);
        
        this.vx = 0;
        this.vy = 0;
        this.ma = 1;
        this.dt = 0.1;
        this.distSq = Math.pow(this.x, 2)+Math.pow(this.y, 2);
        this.force = -10000/this.distSq;
        
        this.update = function() {
            this.distSq = Math.pow(this.x, 2)+Math.pow(this.y, 2);
            this.force = -10000/this.distSq;
            //console.log(this.force);
            this.dist = Math.sqrt(this.distSq);
            this.fx = this.x/this.dist;
            //console.log(this.fx);
            this.fy = this.y/this.dist;
            if(this.fx>0) {
                this.fx = -this.fx;
            }
            if(this.fy>0) {
                this.fy = -this.fy;
            }
            this.vx = this.vx + this.dt*this.fx;
            this.vy = this.vy + this.dt*this.fy;
            // next apply friction 
            this.vx = this.vx*0.999;
            this.vy = this.vy*0.999;
            
            this.x = this.x+this.dt*this.vx ;
            this.y = this.y+this.dt*this.vy;
            
            this.s.x = this.x;
            this.s.y = this.y;
            
            this.dt += 0.1;
        };
    }
    
    window.tick = function() {
        for(var i=0;i<particles.length;i++) {
            particles[i].update();
            //console.log(i);
        }
        stage.update();
    };
    
    function init() {
        window.stage = new Stage(canvas);
        window.bHole = [canvas.width/2,canvas.height/2];
        //window.bHole = [0,0];
        window.particles = [];
        
        for(var i=0;i<1000;i++) {
            particles.push(new Particle(Math.random()*canvas.width, Math.random()*canvas.height, "#FFF"));
        }
        
        Ticker.setFPS(16);
        Ticker.addListener(window);
    }
    init();
};