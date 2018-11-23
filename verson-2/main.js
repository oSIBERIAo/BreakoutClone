var loadlevel = function (n) {
    let blocks = []
    n = n - 1
    var level = levels[n]
    for (let i = 0; i < level.length; i++) {
        let p = level[i]
        let b = Block(p)
        blocks.push(b)
    }
    return blocks
}




var _main = function (params) {
    var paddle = Paddle()
    var ball = Ball() 
    var game = Game()
    
    var levelN = 1
    var blocks = loadlevel(levelN)
    

    game.registerAction("a", function () {
        paddle.moveLeft()
    })
    game.registerAction("d", function () {
        paddle.moveRight(game.canvas.width)
    })
    game.registerAction("f", function () {
        ball.fire()
    })
    var debugMode = function () {
        window.addEventListener("keydown", function (e) {
            if (e.key == "p") {
                game.paused = !game.paused
            }
            if (e.key == "b") {
                if (levelN > 1) {
                    levelN--
                }
                blocks = loadlevel(levelN)
            }
            if (e.key == "n") {
                if (levelN == levels.length) {
                    return
                }
                levelN++
                blocks = loadlevel(levelN)
            }
        })
        document.querySelector('#id_fps').addEventListener("input", function (e) {
            window.fps = e.target.value
        })
    }
    debugMode()
    game.update = function () {
        if (game.paused) { return }
        ball.move(game.canvas)
        if (paddle.collide(ball)) {
            ball.bounce() 
        }
        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i]
            if (block.collide(ball)) {
                block.kill()
                ball.bounce()
            }
        }
    }
    game.draw = function () {
        // draw
        game.drawImage(paddle)
        game.drawImage(ball)
        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
    }
}
_main()