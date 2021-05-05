const snake = new Snake();
snake.head = null;
snake.tail = null;

const dirType = {
    left: {
        x: -1,
        y: 0,
    },
    right: {
        x: 1,
        y: 0,
    },
    up: {
        x: 0,
        y: -1,
    },
    down: {
        x: 0,
        y: 1,
    }
}

snake.init = function () {
    let snakeHead = squareFactory.create('SnakeHead', 3, 1, 'red');
    let snakeBody1 = squareFactory.create('SnakeBody', 2, 1, 'green');
    let snakeBody2 = squareFactory.create('SnakeBody', 1, 1, 'green');

    snake.head = snakeHead;
    snake.tail = snakeBody2;

    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);
    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);
    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);

    // 将蛇的各个部分以“双向链表”的形式存储
    snakeHead.last = null;
    snakeHead.next = snakeBody1;
    snakeBody1.last = snakeHead;
    snakeBody1.next = snakeBody2;
    snakeBody2.last = snakeBody1;
    snakeBody2.next = null;

    // 初始化蛇的移动方向
    this.direction = dirType.right;
}
snake.getCollideSquare = function () {
    const nextSquare = ground.squareList[this.head.y + this.direction.y][this.head.x + this.direction.x];
    // console.log(nextSquare);
    this.collideMethod[nextSquare.collide](nextSquare);
}
snake.collideMethod = {
    move(nextSquare, isEat) {
        // console.log('move');
        const newBody = squareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green');
        ground.remove(snake.head.x, snake.head.y);
        ground.append(newBody);
        newBody.last = null;
        newBody.next = snake.head.next;
        newBody.next.last = newBody;
        const newHead = squareFactory.create('SnakeHead', nextSquare.x, nextSquare.y, 'red');
        ground.append(newHead); //注意蛇头是单例对象，需要在工厂方法中动态更新其位置
        newHead.last = null;
        newHead.next = newBody;
        newBody.last = newHead;
        snake.head = newHead; //更新蛇头
        if (!isEat) { //如果不是eat，则是正常移动，需要删掉末尾的snakeBody
            const newFloor = squareFactory.create('Floor', snake.tail.x, snake.tail.y, 'gray');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newFloor);
            snake.tail = snake.tail.last; //更新蛇尾
            snake.tail.next = null;
        }
    },
    eat(nextSquare) {
        // console.log('eat');
        this.move(nextSquare, true);
        game.addScore();
        createFood();
    },
    die() {
        // console.log('die');
        game.end();
    }
}

// snake.init();
// snake.getCollideSquare();