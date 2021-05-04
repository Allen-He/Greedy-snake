/**
 * 1.定义一些常用的全局变量
 * 2.创建一个最基础的方块构造函数（Square）
 * 3.工具方块构造函数，创建各个元素对象的构造函数
 * 4.存储蛇头与其它格子发送碰撞后的处理方式
 */

const tr = 30; //总高度（行数）
const td = 30; //总宽度（列数）
const squareWidth = 20; //每个小方块的尺寸大小
// 整个游戏区域的起始坐标
const positionX = 200;
const positionY = 100;
const intervalTime = 300; //蛇每次移动的时间间隔

function Square(x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}

// 创建各元素对象的构造函数
const Ground = tool.single(Square);
const Floor = tool.extends(Square);
const Wall = tool.extends(Square);
const SnakeHead = tool.single(Square);
const SnakeBody = tool.extends(Square);
const Snake = tool.single();
const Food = tool.single(Square);
