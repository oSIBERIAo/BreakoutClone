var Scene = function (game) {
    var s = {
        game: game,
    }
    var paddle = Paddle(game)
    var ball = Ball(game)


    var levelN = 2
    var blocks = loadlevel(game, levelN)

    var score = 0

    game.registerAction("a", function () {
        paddle.moveLeft()
    })
    game.registerAction("d", function () {
        paddle.moveRight(game.canvas.width)
    })
    game.registerAction("f", function () {
        ball.fire()
    })
    
    var enableDragBall = false
    game.canvas.addEventListener("mousedown", function (e) {
        let point = {
            x: e.layerX,
            y: e.layerY,
        }
        enableDragBall = ball.judgeRect(ball, point)
    })
    game.canvas.addEventListener("mousemove", function (e) {
        let point = {
            x: e.layerX,
            y: e.layerY,
        }
        if (enableDragBall) {
            ball.x = point.x
            ball.y = point.y
        }
    })
    game.canvas.addEventListener("mouseup", function (e) {
        enableDragBall = false
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
                blocks = loadlevel(game, levelN)
            }
            if (e.key == "n") {
                if (levelN == levels.length) {
                    return
                }
                levelN++
                blocks = loadlevel(game, levelN)
            }
        })
        document.querySelector('#id_fps').addEventListener("input", function (e) {
            window.fps = e.target.value
        })
    }
    debugMode()

    s.update = function () {
        if (game.paused) { return }
        ball.move(game.canvas)
        if (ball.y > paddle.y) {
            var end  = SceneEnd(game)
            game.replceScene(end)
        }
        if (paddle.collide(ball)) {
            ball.bounce(paddle)
        }
        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i]
            if (block.collide(ball)) {
                block.kill()
                ball.bounce(block)
                score += 100
            }
        }
    }

    s.draw = function () {
        // draw
        game.context.fillStyle = "#646464"
        game.context.fillRect(0, 0, 400, 300)
        game.context.fillStyle = "#fff"
        game.context.fillText("得分：" + score, 10, 290);
        game.drawImage(paddle)
        game.drawImage(ball)
        for (let i = 0; i < blocks.length; i++) {
            let block = blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
    }

    return s
}