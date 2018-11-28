var SceneEnd = function (game) {
    var s = {
        game: game,
    }

    window.addEventListener("keydown", function (e) {
        if (e.key == 'r') {
            var start = Scene(game)
            game.replceScene(start)
        }
    })


    s.update = function () {
    }

    s.draw = function () {
        // draw
        game.context.fillStyle = "#646464"
        game.context.fillRect(0, 0, 400, 300)
        game.context.fillStyle = "#fff"
        game.context.fillText("结束，按R重新游戏", 10, 290);
    }

    return s
}