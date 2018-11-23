var Game = function () {
    var g = {
        actions: {},
        keydowns: {},
        paused: false,
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
    var timer = setTimeout(function fn() {
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
        timer = setTimeout(fn, 1000 / window.fps)
    }, 1000 / window.fps)
    return g
}