var Paddle = function (game) {
    var o = game.imageFromGame("paddle")

    o.x = 160
    o.y = 260
    o.speed = 10
    o.moveLeft = function () {
        if (o.x <= 0) { return }
        o.x -= o.speed
    }
    o.moveRight = function (canvasWidth) {
        if (o.x > canvasWidth - o.image.width) { return }
        o.x += o.speed
    }
    o.collide = function (ball) {
        return rectIntersects(ball, o)
    }
    return o //Obj
}