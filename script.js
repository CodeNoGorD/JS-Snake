window.addEventListener('load', () => {

    const canvas = document.querySelector('#canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 1000;
    let fullSnake = [];


    class Snake {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.lastX;
            this.lastY;
            this.width = 50;
            this.height = 50;
            this.input = new InputHandler();
            this.vx = 5;
            this.vy = 5;
            // this.snake = fullSnake;
        }
        update() {
            // MOUVEMENTS
            if (this.input.keys[0] === 'ArrowRight') {
                this.lastX = fullSnake[0].x;
                this.lastY = fullSnake[0].y;
                fullSnake[0].x += fullSnake[0].vx;
                for(let i = 1; i < fullSnake.length; i++) {
                    if (fullSnake[i].y < this.lastY){
                        fullSnake[i].y += fullSnake[i].vy;
                    }
                    else if(fullSnake[i].y > this.lastY){
                        fullSnake[i].y -= fullSnake[i].vy;
                    }
                    else{
                        fullSnake[i].x += fullSnake[i].vx;
                    }
                }
            }
            else if (this.input.keys[0] === 'ArrowLeft') {
                // this.x -= this.vx;
                this.lastX = fullSnake[0].x;
                this.lastY = fullSnake[0].y;
                fullSnake[0].x -= fullSnake[0].vx;
                for(let i = 1; i < fullSnake.length; i++) {
                    if (fullSnake[i].y < this.lastY){
                        fullSnake[i].y += fullSnake[i].vy;
                    }
                    else if(fullSnake[i].y > this.lastY){
                        fullSnake[i].y -= fullSnake[i].vy;
                    }
                    else{
                        fullSnake[i].x -= fullSnake[i].vx;
                    }
                }
            }
            else if (this.input.keys[0] === 'ArrowUp') {
                this.lastX = fullSnake[0].x;
                this.lastY = fullSnake[0].y;
                fullSnake[0].y -= fullSnake[0].vy;
                for(let i = 1; i < fullSnake.length; i++) {
                    if (fullSnake[i].x < this.lastX){
                        fullSnake[i].x += fullSnake[i].vx;
                    }
                    else if(fullSnake[i].x > this.lastX){
                        fullSnake[i].x -= fullSnake[i].vx;
                    }
                    else{
                        fullSnake[i].y -= fullSnake[i].vy;
                    }
                }
            }
            else if (this.input.keys[0] === 'ArrowDown') {
                this.lastX = fullSnake[0].x;
                this.lastY = fullSnake[0].y;
                fullSnake[0].y += fullSnake[0].vy;
                for(let i = 1; i < fullSnake.length; i++) {
                    if (fullSnake[i].x < this.lastX){
                        fullSnake[i].x += fullSnake[i].vx;
                    }
                    else if(fullSnake[i].x > this.lastX){
                        fullSnake[i].x -= fullSnake[i].vx;
                    }
                    else{
                        fullSnake[i].y += fullSnake[i].vy;
                    }
                }
            }

            //LIMITES TERRAIN
       
            if (fullSnake[0].x > canvas.width - this.width) {
                fullSnake[0].x = canvas.width - this.width;
                for(let i = 1; i < fullSnake.length; i++) {
                    fullSnake[i].vx = 0;
                }
            }
            else if (fullSnake[0].x < 0) {
                fullSnake[0].x = 0;
            }
            else if (this.y > canvas.height - this.height) {
                this.y = canvas.height - this.height;
            }
            else if (this.y < 0) {
                this.y = 0;
            }

            //GESTION DU CORPS
    
        }
        draw(context) {           
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
                    
        }
    }

    class InputHandler {
        constructor(snake) {
            this.snake = snake;
            this.keys = [];
            window.addEventListener('keydown', (e) => {
                if (this.keys == '') {
                    this.keys.push(e.key);
                }
                for (let i = 0; i < this.keys.length; i++) {
                    if (this.keys[i] !== e.key) {
                        this.keys.push(e.key);
                    }
                }
                // console.log(this.keys);
            });
            window.addEventListener('keyup', (e) => {
                this.keys.splice(this.keys.indexOf(e.key), 1);
                // console.log(this.keys);
            });

        }
    }

    class Fruit {
        constructor() {
            this.width = 40;
            this.height = 40;
            this.x = Math.random() * (canvas.width - this.width);
            this.y = Math.random() * (canvas.height - this.height);
        }
        update() {

        }
        draw(context) {
            context.fillStyle = 'green';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Game{
        constructor(snake){
            this.snake = snake; 
        }
        update(){
        this.snake.forEach(element => {
            element.update();
        });

        }
        draw(context){
        this.snake.forEach(element => {
            element.draw(context);
        });
      }
    
    }

    fullSnake.push(new Snake(150, 150), new Snake(100, 150), new Snake(50, 150));
    // console.log(fullSnake);
    const game = new Game(fullSnake);
    // console.log(game);
    const fruit = new Fruit();
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        fruit.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate();
});
