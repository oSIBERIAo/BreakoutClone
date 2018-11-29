class SceneTitle extends GameScene {
    constructor(game) {
        super(game)
        var s = {
            game: game,
        }
        this.game.registerAction("k", function () {
            s.replceScene()
        })
        this.game.registerAction("e", function () {
            window.fps = 1
            var start = new LevelsEdit(game)
            game.replceScene(start)
        })
        s.replceScene = function () {
            var start = new Scene(game)
            game.replceScene(start)
        }
    }

    draw() {
        // draw
        this.game.context.fillStyle = "#4A4A4A"
        this.game.context.fillRect(0, 0, 400, 300)
        this.game.context.fillStyle = "#fff"
        this.game.context.fillText("开始，按K开始游戏。编辑，按E编辑关卡", 10, 290);
    }

}