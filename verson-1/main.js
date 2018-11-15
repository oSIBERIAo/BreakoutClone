var Game = function (params) {
    var g = {
        actions: {},
        keydowns: {},
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    g.drawImage = function (guaImage) {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)
    }
    g.registerAction = function (key, callback) {
        g.actions[key] = callback
    }
    window.addEventListener("keydown", function (e) {
        g.keydowns[e.key] = true 
    })
    window.addEventListener("keyup", function (e) {
        g.keydowns[e.key] = false
    })
    var timer = setInterval(function () {
        var actions = Object.keys(g.actions)
        for (let i = 0; i < actions.length; i++) {
            let key = actions[i]  
            if (g.keydowns[key]) {
                g.actions[key]()
            }
        }
        g.update()
        context.clearRect(0, 0, canvas.width, canvas.height)
        g.draw()
    }, 1000 / 240)
    return g
}
var imageFromPath = function (params) {
    var img = new Image()
    img.src = params 
    return img
}

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
        if (ball.y + ball.image.height > o.y){
            if (ball.x > o.x && ball.x < o.x + o.image.width) {
                return true
            }
        }
    }
    return o //Obj
}
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
            if (o.x > canvas.width || o.x < 0 ) { 
                o.speedX = -o.speedX
            }
            if (o.y > canvas.height || o.y < 0) {
                o.speedY = -o.speedY
            }
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    return o //Obj
}

var _main = function (params) {
    var paddle = Paddle()
    var ball = Ball()
    var game = Game()

    game.registerAction("a", function () {
        paddle.moveLeft()
    })
    game.registerAction("d", function () {
        paddle.moveRight(game.canvas.width)
    })
    game.registerAction("f", function () {
        ball.fire()
    })
    game.update = function () {
        ball.move(game.canvas)
        if (paddle.collide(ball)) {
            ball.speedY *= -1
        }
    }
    game.draw = function () {
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
    }
}
_main()