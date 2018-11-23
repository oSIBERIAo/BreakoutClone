var Block = function (position) {
    var image = imageFromPath("block.png")
    var p = position
    var o = {
        image: image,
        x: p[0],
        y: p[1],
        w: 50,
        h: 20,
        lives: p[2] || 1,
        alive: true,
    }
    o.kill = function () {
        if (o.lives < 1) {
            o.alive = false 
        } else {
            o.lives--
        }
        
    }
    o.collide = function (ball) {
        //未存活加碰撞检测
        return o.alive && (rectIntersects(o, ball) || rectIntersects(ball, o))
    }
    return o //Obj
}