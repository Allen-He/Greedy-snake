/**
 * 定义一些工具方法：inherit | extends | single(单例模式)
*/
const tool = {
    inherit(Target, Origin) { //圣杯继承
        const F = function () {};
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constructor = Target;
    },
    extends(Origin) {
        const Target = function () {
            Origin.apply(this, arguments); //更改Origin中的this指向，指向Target的实例对象
        }
        this.inherit(Target, Origin);
        return Target;
    },
    single(Origin) { //单例模式
        const Target = (function () {
            let instance;
            return function () {
                if(typeof instance === 'object') {
                    return instance;
                }
                Origin && Origin.apply(this, arguments);
                instance = this;
            }
        })();
        Origin && this.inherit(Target, Origin);
        return Target;
    }
}

// function Square(x, y, width, height) {
//     this.x = x;
//     this.y = y;
//     this.width = width;
//     this.height = height;
// }
// Square.prototype.test = function () {
//     console.log('hhh');
// }

// function Food() {}
// tool.inherit(Food, Square);
// const food = new Food(10, 10, 100, 100);
// food.test();

// const Food = tool.extends(Square);
// const food = new Food(10, 10, 100, 100);
// food.test();
// console.log(food.width);

// const Food = tool.single(Square);
// const food1 = new Food(10, 10, 100, 100);
// const food2 = new Food(20, 20, 100, 100);
// console.log(food1 == food2);