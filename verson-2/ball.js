var Ball = function () {
    var image = imageFromPath("ball.png")
    var o = {
        image: image,
        x: 190,
        y: 223,
        speedX: 3,
        speedY: 3,
        fired: false,
    }
    o.fire = function () {
        o.fired = true
    }
    o.move = function (canvas) {
        if (o.fired) {
            if (o.x > canvas.width || o.x < 0) {
                o.speedX = -o.speedX
            }
            if (o.y > canvas.height || o.y < 0) {
                o.speedY = -o.speedY
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.bounce = function () {
        o.speedY *= -1
    }
    return o //Obj
}