var Paddle = function (game) {
    var o = game.imageFromGame("paddle")

    o.x = 120
    o.y = 250
    o.speed = 3
    o.moveLeft = function () {
        if (o.x <= 0) { return }
        o.x -= o.speed
    }
    o.moveRight = function (canvasWidth) {
        if (o.x > canvasWidth - o.image.width) { return }
        o.x += o.speed
    }

    // var aInb = function (x, x1, x2) {
    //     return x > x1 && x < x2
    // }
    // o.collide = function (ball) {
    //     let a = o
    //     let b = ball
    //     if (aInb(b.x, a.x, a.x + a.w) || aInb(a.x, b.x, b.x + b.w)) {
    //         if (aInb(b.y, a.y, a.y + a.h) || aInb(a.y, b.y, b.y + b.h)) {
    //             log('接')
    //             return true
    //         }
    //     }
    //     return false
    // }
    o.collide = function (ball) {
        return rectIntersects(ball, o)
    }
    return o //Obj
}