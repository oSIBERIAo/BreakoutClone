var Paddle = function (params) {
    var image = imageFromPath("paddle.png")
    // var game = Game()
    var o = {
        image: image,
        x: 120,
        y: 250,
        speed: 3,
    }
    o.moveLeft = function () {
        if (o.x <= 0) { return }
        o.x -= o.speed
    }
    o.moveRight = function (canvasWidth) {
        if (o.x > canvasWidth - o.image.width) { return }
        o.x += o.speed
    }
    o.collide = function (ball) {
        let height = o.y - o.image.height
        if (ball.y + ball.image.height > o.y) {
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                return true
            }
        }
    }
    return o //Obj
}