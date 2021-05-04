// 工厂模式（squareFactory）
function squareFactory() {

}
squareFactory.prototype.init = function (square, color) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.left = square.x * squareWidth + 'px';
    square.viewContent.style.top = square.y * squareWidth + 'px';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.backgroundColor = color;
}

squareFactory.prototype.Floor = function (x, y, color) {
    const newFloor = new Floor(x, y, squareWidth, squareWidth);
    this.init(newFloor, color);
    return newFloor;
}
squareFactory.prototype.Wall = function (x, y, color) {
    const newWall = new Wall(x, y, squareWidth, squareWidth);
    this.init(newWall, color);
    return newWall;
}
squareFactory.prototype.SnakeHead = function (x, y, color) {
    const newSnakeHead = new SnakeHead(x, y, squareWidth, squareWidth);
    this.init(newSnakeHead, color);
    return newSnakeHead;
}
squareFactory.prototype.SnakeBody = function (x, y, color) {
    const newSnakeBody = new SnakeBody(x, y, squareWidth, squareWidth);
    this.init(newSnakeBody, color);
    return newSnakeBody;
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