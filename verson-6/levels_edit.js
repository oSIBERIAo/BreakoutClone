class LevelsEdit extends GameScene {
    constructor(game) {
        super(game)
        this.enableDebugMode = true
        this.score = 0
        this.paddle = Paddle(game)
        this.ball = Ball(game)
        this.edit = Ball(game)
        this.levels = []
        this.levels.index = []

        this.levelN = 2
        // this.blocks = loadlevel(game, this.levelN)

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
            window.fps = 0
            let point = {
                x: e.layerX,
                y: e.layerY,
            }
            // log('point', point.x, point.y)

            for (let i = 0; i < this.blocks.length; i++) {
                let e = this.edit.judgeRect(this.blocks[i], point)
                if (e) {
        
                    if (!this.levels[i]) {
                        // 深拷贝！！！
                        this.levels[i] = JSON.parse(JSON.stringify(this.blocks[i]))
                    } else {
                        if (this.levels[i].lives == 1) {
                            this.levels[i].lives = 0
                        } else {
                            this.levels[i].lives = 1
                        }
                    }
                }
            }
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
            // log('mouseup')
        })

        // this.saveLevels()
        document.querySelector('#download').addEventListener('click',  () => {
            this.saveLevels()
        });
        
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
                        log('⏸️')
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
        this.blocks = this.init()
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
        
        game.context.clearRect(0, 0, game.canvas.width, game.canvas.height)
        game.context.fillStyle = "#4A4A4A"
        game.context.fillRect(0, 0, 400, 300)
        for (let x = 0; x < this.blocks.length; x++) {
            let block = this.blocks[x]
            game.drawImage(block)
        }

        for (let i = 0; i < this.levels.length; i++) {
            if (!this.levels[i]) {
                continue
            }
            if (this.levels[i].lives == 0) {
                continue
            } 
            if ( this.levels[i].lives >= 1) {
                let block = this.levels[i]
                block.image = game.imageFromGame("block").image
                game.drawImage(block)
            } 
        }

        
        
        
    }
    init() {
        var game = this.game
        var imgBlock = game.imageFromGame("edit")

        let blocksW = this.game.canvas.width / imgBlock.w
        let blocksH = this.game.canvas.height / imgBlock.h
        let allBlock = blocksW * blocksH
         
        var blocks = []
        for (let i = 0; i < allBlock; i++) {
            let p = []
            allBlock
            p[0] = i % blocksW * imgBlock.w
            p[1] = parseInt(i * imgBlock.w / this.game.canvas.width) * imgBlock.h
            let block = Edit(game, p)
            block.index = i
            if (!block.alive) {
                game.drawImage(block)
                blocks.push(block)
            }
        }
        return blocks
    }
    saveLevels() {

        var levels = [[]]
        for (let i = 0; i < this.levels.length; i++) {
            if (!this.levels[i]) {
                continue
            }
            let level = []
            level[0] = this.levels[i].x
            level[1]= this.levels[i].y
            // log('levelthis.levels', this.levels)
            levels[0].push(level)
        }
        var xxx = JSON.stringify(levels)
        var eleButton = document.querySelector('#download');

        // 下载文件方法
        var funDownload = function (content, filename) {
            var eleLink = document.createElement('a');
            eleLink.download = filename;
            eleLink.style.display = 'none';
            // 字符内容转变成blob地址
            var blob = new Blob([content]);
            eleLink.href = URL.createObjectURL(blob);
            // 触发点击
            document.body.appendChild(eleLink);
            eleLink.click();
            // 然后移除
            document.body.removeChild(eleLink);
        };

        if ('download' in document.createElement('a')) {
            // 作为test.html文件下载
                funDownload(xxx, 'levels.js');
        } else {
            eleButton.onclick = function () {
                alert('浏览器不支持');
            };
        }
    }
}

// var loadlevel = function (game, n) {
//     let blocks = []
//     n = n - 1
//     var level = levels[n]
//     for (let i = 0; i < level.length; i++) {
//         let p = level[i]
//         let b = Block(game, p)
//         blocks.push(b)
//     }
//     return blocks
// }