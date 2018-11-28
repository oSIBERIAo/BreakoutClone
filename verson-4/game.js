var Game = function (images, Callback) {
    var g = {
        scene: null,
        actions: {},
        keydowns: {},
        images: {},
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

    g.imageFromGame = function (name) {
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }

    var runloop = function () {
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
        setTimeout(function () {
            runloop()
        }, 1000 / window.fps)
    }
    g.replceScene = function (scene) {
        g.scene = scene
        log('替换scene')
    }
    g.update = function () {
        g.scene.update()
    }
    g.draw = function () {
        g.scene.draw()
    }
    
    g.runWithScene = function (scene) {
        g.scene = scene
    }
    g.__start = function () {
        Callback(g)
        setTimeout(function () {
            runloop()
        }, 1000 / window.fps)
    }
    //加载图片
    var names = Object.keys(images)
    for (let i = 0; i < names.length; i++) {
        let name = names[i]
        let path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function () {
            g.images[name] = img
            if (i == names.length - 1) {
                g.__start()
            }
        }
    }
    //开始运行
    
    return g
}