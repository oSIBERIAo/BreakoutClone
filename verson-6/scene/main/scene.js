class Scene extends GameScene {
    constructor(game) {
        super(game)
        this.enableDebugMode = true
        this.score = 0
        this.paddle = Paddle(game)
        this.ball = Ball(game)

        this.levelN = 1
        this.blocks = loadlevel(game, this.levelN)

        this.game.registerAction("a", () => {
            this.paddle.moveLeft()
        })
        this.game.registerAction("d", () => {
            this.paddle.moveRight(this.game.canvas.width)
        })
        this.game.registerAction("f", () => {
            this.ball.fire()
        })

        this.enableDragBall = false
        this.game.canvas.addEventListener("mousedown", (e) => {
            let point = {
                x: e.layerX,
                y: e.layerY,
            }
            this.enableDragBall = this.ball.judgeRect(this.ball, point)
        })
        this.game.canvas.addEventListener("mousemove", (e) => {
            let point = {
                x: e.layerX,
                y: e.layerY,
            }
            if (this.enableDragBall) {
                this.ball.x = point.x
                this.ball.y = point.y
            }
        })
        this.game.canvas.addEventListener("mouseup", (e) => {
            this.enableDragBall = false
        })
        var debugMode = () => {
            window.addEventListener("keydown", (e) => {
                if (e.key == "o") {
                    this.enableDebugMode = !this.enableDebugMode
                }
                if (!this.enableDebugMode) {
                    log('关闭试调模式')
                    return
                } else {
                    if (e.key == "p") {
                        log('ppp')
                        this.game.paused = !this.game.paused
                    }
                    if (e.key == "b") {
                        if (this.levelN > 1) {
                            this.levelN--
                        }
                        this.blocks = loadlevel(game, this.levelN)
                    }
                    if (e.key == "n") {
                        if (this.levelN == levels.length) {
                            return
                        }
                        this.levelN++
                        this.blocks = loadlevel(game, this.levelN)
                    }
                }
                
            })
            document.querySelector('#id_fps').addEventListener("input", function (e) {
                window.fps = e.target.value
            })
        }
        debugMode()
    }


    update() {
        var game = this.game
        if (game.paused) { return }

        this.ball.move(game.canvas)
        if (this.ball.y > this.paddle.y) {
            var end = new SceneEnd(game)
            game.replceScene(end)
        }
        if (this.paddle.collide(this.ball)) {
            this.ball.bounce(this.paddle)
        }
        for (let i = 0; i < this.blocks.length; i++) {
            let block = this.blocks[i]
            if (block.collide(this.ball)) {
                block.kill()
                this.ball.bounce(block)
                this.score += 100
            }
        }
    }

    draw() {
        var game = this.game
        game.context.fillStyle = "#4A4A4A"
        game.context.fillRect(0, 0, 400, 300)
        game.context.fillStyle = "#fff"
        game.context.fillText("得分：" + this.score, 10, 290);
        game.drawImage(this.paddle)
        game.drawImage(this.ball)
        for (let i = 0; i < this.blocks.length; i++) {
            let block = this.blocks[i]
            if (block.alive) {
                game.drawImage(block)
            }
        }
    }
}




// var Scene = function (game) {
//     var s = {
//         game: game,
//     }
//     var paddle = Paddle(game)
//     var ball = Ball(game)


//     var levelN = 2
//     var blocks = loadlevel(game, levelN)

//     var score = 0

//     game.registerAction("a", function () {
//         paddle.moveLeft()
//     })
//     game.registerAction("d", function () {
//         paddle.moveRight(game.canvas.width)
//     })
//     game.registerAction("f", function () {
//         ball.fire()
//     })

//     var enableDragBall = false
//     game.canvas.addEventListener("mousedown", function (e) {
//         let point = {
//             x: e.layerX,
//             y: e.layerY,
//         }
//         enableDragBall = ball.judgeRect(ball, point)
//     })
//     game.canvas.addEventListener("mousemove", function (e) {
//         let point = {
//             x: e.layerX,
//             y: e.layerY,
//         }
//         if (enableDragBall) {
//             ball.x = point.x
//             ball.y = point.y
//         }
//     })
//     game.canvas.addEventListener("mouseup", function (e) {
//         enableDragBall = false
//     })

//     var debugMode = function () {
//         window.addEventListener("keydown", function (e) {
//             if (e.key == "p") {
//                 game.paused = !game.paused
//             }
//             if (e.key == "b") {
//                 if (levelN > 1) {
//                     levelN--
//                 }
//                 blocks = loadlevel(game, levelN)
//             }
//             if (e.key == "n") {
//                 if (levelN == levels.length) {
//                     return
//                 }
//                 levelN++
//                 blocks = loadlevel(game, levelN)
//             }
//         })
//         document.querySelector('#id_fps').addEventListener("input", function (e) {
//             window.fps = e.target.value
//         })
//     }
//     debugMode()

//     s.update = function () {
//         if (game.paused) { return }
//         ball.move(game.canvas)
//         if (ball.y > paddle.y) {
//             var end  = new SceneEnd(game)
//             game.replceScene(end)
//         }
//         if (paddle.collide(ball)) {
//             ball.bounce(paddle)
//         }
//         for (let i = 0; i < blocks.length; i++) {
//             let block = blocks[i]
//             if (block.collide(ball)) {
//                 block.kill()
//                 ball.bounce(block)
//                 score += 100
//             }
//         }
//     }

//     s.draw = function () {
//         // draw
//         game.context.fillStyle = "#646464"
//         game.context.fillRect(0, 0, 400, 300)
//         game.context.fillStyle = "#fff"
//         game.context.fillText("得分：" + score, 10, 290);
//         game.drawImage(paddle)
//         game.drawImage(ball)
//         for (let i = 0; i < blocks.length; i++) {
//             let block = blocks[i]
//             if (block.alive) {
//                 game.drawImage(block)
//             }
//         }
//     }

//     return s
// }


