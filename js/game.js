const game = new Game();
game.score = 0;
game.timer = null;

game.init = function () {
    ground.init();
    snake.init();

    const btn = document.querySelector('.btn');
    btn.onclick = function () {
        if(game.timer == null) {
            game.start();
        }
    }
    
    createFood(); //初始化food

    // 给方向键绑定事件
    document.onkeydown = function (e) {
        // console.log(e.key, snake.direction);
        if (e.key === 'ArrowRight' && snake.direction !== dirType.left) {
            snake.direction = dirType.right;
        } else if (e.key === 'ArrowLeft' && snake.direction !== dirType.right) {
            snake.direction = dirType.left;
        } else if (e.key === 'ArrowUp' && snake.direction !== dirType.down) {
            snake.direction = dirType.up;
        } else if (e.key === 'ArrowDown' && snake.direction !== dirType.up) {
            snake.direction = dirType.down;
        }
    }
}

game.start = function () {
    this.timer = setInterval(() => {
        snake.getCollideSquare();
    }, intervalTime);
}
game.end = function () {
    clearInterval(this.timer);
    this.timer = null;
    alert('游戏结束！您的得分为：' + this.score + ' 分！');
    location.reload(); //游戏失败后，重新加载
}
game.addScore = function () {
    this.score += 10;
}

// ★★★创建food的方法★★★
function createFood() {
    let x = null;
    let y = null;
    let flag = true; //跳出while循环的条件
    while (flag) {
        // 不让food生成在wall的位置上
        x = Math.floor(Math.random() * (td - 1) + 1);
        y = Math.floor(Math.random() * (tr - 1) + 1);

        let ok = true; //跳出for循环的条件(food不能出现在蛇的身上)
        for (let node = snake.head; node; node = node.next) {
            if (x === node.x && y === node.y) {
                ok = false;
                break;
            }
        }

        if (ok) { //如果此时的ok仍为true，则将要生成的food不在蛇身上，可继续生成food；否则，应该继续while循环以重新生成的food的x和y值
            flag = false;
        }
    }

    const food = squareFactory.create('Food', x, y, 'deepPink');
    ground.remove(x, y)
    ground.append(food);
}

game.init();
