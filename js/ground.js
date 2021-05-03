/**
 * 游戏场景中常用的处理逻辑
 */
const ground = new Ground(465, 60, td * squareWidth, tr * squareWidth);

ground.init = function () {
    this.viewContent.style.position = 'fixed';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.backgroundColor = 'orange';

    document.body.appendChild(this.viewContent);
}

ground.init();