// 工厂模式（squareFactory）
function squareFactory() {

}
squareFactory.prototype.init = function (square, color, action) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.left = square.x * squareWidth + 'px';
    square.viewContent.style.top = square.y * squareWidth + 'px';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.backgroundColor = color;
    square.collide = action; //标记该方块的collide类型，以方便后续做碰撞类型判断
}

squareFactory.prototype.Floor = function (x, y, color) {
    const newFloor = new Floor(x, y, squareWidth, squareWidth);
    this.init(newFloor, color, collideType.move);
    return newFloor;
}
squareFactory.prototype.Wall = function (x, y, color) {
    const newWall = new Wall(x, y, squareWidth, squareWidth);
    this.init(newWall, color, collideType.die);
    return newWall;
}
squareFactory.prototype.SnakeHead = function (x, y, color) {
    const newSnakeHead = new SnakeHead(x, y, squareWidth, squareWidth);
    this.init(newSnakeHead, color, collideType.die);
    newSnakeHead.update(x, y); //更新位置（单例对象特需）
    return newSnakeHead;
}
squareFactory.prototype.SnakeBody = function (x, y, color) {
    const newSnakeBody = new SnakeBody(x, y, squareWidth, squareWidth);
    this.init(newSnakeBody, color, collideType.die);
    return newSnakeBody;
}
squareFactory.prototype.Food = function (x, y, color) {
    const newFood = new Food(x, y, squareWidth, squareWidth);
    this.init(newFood, color, collideType.eat);
    newFood.update(x, y); //更新位置（单例对象特需）
    return newFood;
}

squareFactory.create = function (type, x, y, color) {
    if (typeof this.prototype[type] === 'undefined') {
        throw new Error('squareFactory的原型上没有该构造方法！');
    }
    this.prototype[type].prototype = new squareFactory();
    return new this.prototype[type](x, y, color);
}

// 此处的x,y分别代表第x列、第y行
// const floor1 = squareFactory.create('Floor', 0, 0);
// console.log(floor1);