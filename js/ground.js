/**
 * 游戏场景中常用的处理逻辑
 */
const ground = new Ground(100, 60, td * squareWidth, tr * squareWidth);

ground.init = function () {
    this.viewContent.style.position = 'fixed';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.backgroundColor = 'orange';

    this.squareList = new Array(tr); //存储所有小方块对象

    // 初始化游戏背景（wall、floor）
    for (let i = 0; i < tr; i++) { //i --- 行
        this.squareList[i] = new Array(td);
        let temp = null;
        for (let j = 0; j < td; j++) { //j --- 列
            if (i == 0 || i == tr - 1 || j == 0 || j == td - 1) {
                temp = squareFactory.create('Wall', j, i, 'black');
            } else {
                temp = squareFactory.create('Floor', j, i, 'gray');
            }
            this.viewContent.appendChild(temp.viewContent);
            this.squareList[i][j] = temp;
        }
    }

    document.body.appendChild(this.viewContent);
}

ground.init();


// 删除小方块
ground.remove = function (x, y) {
    this.viewContent.removeChild(this.squareList[y][x].viewContent);
    this.squareList[y][x] = null;
}
// 添加小方块
ground.append = function (square) {
    this.viewContent.appendChild(square.viewContent);
    this.squareList[square.y][square.x] = square;
}
