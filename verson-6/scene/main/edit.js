var Edit = function (game, position) {
    var o = game.imageFromGame("edit")
    var p = position

    o.x = p[0]
    o.y = p[1]
    o.lives = p[2] || 1
    o.alive = false

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
    o.judgeRect = function (rect, point) {
        let x = point.x
        let y = point.y
        return (x > rect.x && x < rect.x + rect.w) && (y > rect.y && y < rect.y + rect.h)
    }
    return o //Obj
}