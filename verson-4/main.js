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
        ball: "ball.png",
        paddle: "paddle.png",
        block: "block.png",
    }
    
    // var callback = 
    var game = Game(images, function (game) {
        var scene = Scene(game)

        //异步
        game.runWithScene(scene)
    } )
}
_main()