window.addEventListener('load', () => {

    const canvas = document.querySelector('#canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400;
    canvas.height = 1200;
    let fullSnake = [];
    let fruits = [];
    let score = 0;


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
            this.edge = false;
            this.image = document.querySelector('#corps');
        }
        update() {
            // MOUVEMENTS
            if (this.input.keys[0] === 'ArrowRight' && (this.input.saveKeys[this.input.saveKeys.length -1] != 'ArrowLeft')) {
                this.lastX = fullSnake[0].x;
                this.lastY = fullSnake[0].y;

                fullSnake[0].x += fullSnake[0].vx;
                if (!fullSnake[0].edge) {
                    for (let i = 1; i < fullSnake.length; i++) {
                        if (fullSnake[i].y < this.lastY) {
                            fullSnake[i].y += fullSnake[i].vy;
                        }
                        else if (fullSnake[i].y > this.lastY) {
                            fullSnake[i].y -= fullSnake[i].vy;
                        }
                        else {
                            fullSnake[i].x += fullSnake[i].vx;
                        }
                    }
                }
                fullSnake[0].edge = false;
            }
            
            else if (this.input.keys[0] === 'ArrowLeft' && (this.input.saveKeys[this.input.saveKeys.length -1] != 'ArrowRight')) {
                this.lastX = fullSnake[0].x;
                this.lastY = fullSnake[0].y;
                fullSnake[0].x -= fullSnake[0].vx;
                if (!fullSnake[0].edge) {
                    for (let i = 1; i < fullSnake.length; i++) {
                        if (fullSnake[i].y < this.lastY) {
                            fullSnake[i].y += fullSnake[i].vy;
                        }
                        else if (fullSnake[i].y > this.lastY) {
                            fullSnake[i].y -= fullSnake[i].vy;
                        }
                        else {
                            fullSnake[i].x -= fullSnake[i].vx;
                        }
                    }
                }
                fullSnake[0].edge = false;
            }
            else if (this.input.keys[0] === 'ArrowUp' && (this.input.saveKeys[this.input.saveKeys.length -1] != 'ArrowDown')) {
                this.lastX = fullSnake[0].x;
                this.lastY = fullSnake[0].y;
                fullSnake[0].y -= fullSnake[0].vy;
                if (!fullSnake[0].edge) {
                    for (let i = 1; i < fullSnake.length; i++) {
                        if (fullSnake[i].x < this.lastX) {
                            fullSnake[i].x += fullSnake[i].vx;
                        }
                        else if (fullSnake[i].x > this.lastX) {
                            fullSnake[i].x -= fullSnake[i].vx;
                        }
                        else {
                            fullSnake[i].y -= fullSnake[i].vy;
                        }
                    }
                }
                fullSnake[0].edge = false;
            }
            else if (this.input.keys[0] === 'ArrowDown' && (this.input.saveKeys[this.input.saveKeys.length -1] != 'ArrowUp')) {
                this.lastX = fullSnake[0].x;
                this.lastY = fullSnake[0].y;
                fullSnake[0].y += fullSnake[0].vy;
                if (!fullSnake[0].edge) {
                    for (let i = 1; i < fullSnake.length; i++) {
                        if (fullSnake[i].x < this.lastX) {
                            fullSnake[i].x += fullSnake[i].vx;
                        }
                        else if (fullSnake[i].x > this.lastX) {
                            fullSnake[i].x -= fullSnake[i].vx;
                        }
                        else {
                            fullSnake[i].y += fullSnake[i].vy;
                        }
                    }
                }
                fullSnake[0].edge = false;
            }

            //LIMITES TERRAIN

            //droite
            if (fullSnake[0].x > canvas.width - fullSnake[0].width) {
                fullSnake[0].x = canvas.width - fullSnake[0].width;
                fullSnake[0].edge = true;
            }
            //gauche
            else if (fullSnake[0].x < 0) {
                fullSnake[0].x = 0;
                fullSnake[0].edge = true;
            }
            //bas
            else if (fullSnake[0].y > canvas.height - fullSnake[0].height) {
                fullSnake[0].y = canvas.height - fullSnake[0].height;
                fullSnake[0].edge = true;
            }
            //haut
            else if (fullSnake[0].y < 0) {
                fullSnake[0].y = 0;
                fullSnake[0].edge = true;
            }

            //GESTION DU CORPS

            // GESTION DES COLLISIONS


        }
        draw(context) {
            // context.drawImage(this.image,this.x, this.y, this.width, this.height);
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class InputHandler {
        constructor(snake) {
            this.snake = snake;
            this.keys = [];
            this.saveKeys = [];
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
                this.saveKeys.push(e.key);
                this.keys.splice(this.keys.indexOf(e.key), 1);
                if(this.saveKeys.length > 20){
                    this.saveKeys.splice(0, 10);
                }
                // console.log(this.saveKeys);
            });

        }
    }

    class Fruit {
        constructor(snake) {
            this.snake = snake;
            this.width = 50;
            this.height = 50;
            this.x = Math.random() * (canvas.width - this.width);
            this.y = Math.random() * (canvas.height - this.height);
            this.markedForDeletion = false;
            this.image = document.querySelector('#pomme');
          
        }
       
        update() {

            if(fullSnake[0].x < this.x + this.width && fullSnake[0].x + fullSnake[0].width > this.x && fullSnake[0].y < this.y + this.height && fullSnake[0].y + fullSnake[0].height > this.y){
                this.markedForDeletion = true;
                fruits = [];
            }
        }

        draw(context) {
            context.drawImage(this.image,this.x, this.y, this.width, this.height);
        }
    
    }

    class Game {
        constructor(snake) {
            this.snake = snake;
        }
        update() {
            this.snake.forEach(element => {
                element.update();
            });

            fruits.forEach(element => {
                element.update();
            });

        }
        draw(context) {
            this.snake.forEach(element => {
                element.draw(context);
            });
            fruits.forEach(element => {
                if(!element.markedForDeletion){
                    element.draw(context);
                }
            });
        }
        createFruit(){
            fruits.push(new Fruit(fullSnake));
        }
    }
   
    fullSnake.push(new Snake(300, 150), new Snake(250, 150), new Snake(200, 150), new Snake(150, 150), new Snake(100, 150), new Snake(50, 150));
    fruits.push(new Fruit(fullSnake));
    const game = new Game(fullSnake);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        if(fruits.length === 0){
            game.createFruit();
            this.score++;
        }
        requestAnimationFrame(animate);
    }
    animate();
});
