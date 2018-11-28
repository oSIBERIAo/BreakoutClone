class SceneTitle extends GameScene {
    constructor(game) {
        super(game)
        var s = {
            game: game,
        }
        this.game.registerAction("k", function () {
            s.replceScene()
        })
        s.replceScene = function () {
            var start = new Scene(game)
            game.replceScene(start)
        }
    }

    draw() {
        // draw
        this.game.context.fillStyle = "#646464"
        this.game.context.fillRect(0, 0, 400, 300)
        this.game.context.fillStyle = "#fff"
        this.game.context.fillText("开始，按K开始游戏", 10, 290);
    }

}