const snake = new Snake();
snake.head = null;
snake.tail = null;

snake.init = function () {
    let snakeHead = squareFactory.create('SnakeHead', 3, 1, 'red');
    let snakeBody1 = squareFactory.create('SnakeBody', 2, 1, 'green');
    let snakeBody2 = squareFactory.create('SnakeBody', 1, 1, 'green');

    snake.head = snakeBody1;
    snake.tail = snakeBody2;

    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);
    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);
    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);
}
snake.init();
