var log = console.log.bind(console)

var loadlevel = function (game, n) {
    let blocks = []
    n = n - 1
    var level = levels[n]
    for (let i = 0; i < level.length; i++) {
        let p = level[i]
        let b = Block(game, p)
        blocks.push(b)
    }
    return blocks
}



var _main = function (params) {

    var images = {
        ball: "img/ball.png",
        paddle: "img/paddle.png",
        block: "img/block.png",
        edit: "img/edit.png",
    }
    
    // var callback = 
    var game = new Game(images, function (game) {
        var scene = new SceneTitle(game)

        //异步
        game.runWithScene(scene)
    } )
}
_main()