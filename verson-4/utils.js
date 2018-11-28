
// var rectIntersects = function (a, b) {
//     let o = a
//     if (b.y > o.y && b.y < o.y + o.image.height) {
//         if (b.x > o.x && b.x < o.x + o.image.width) {
//             console.log('碰撞💥');
//             return true
//         }
//     }
// }
// var aInb = function (x, x1, x2) {
//     return x > x1 && x < x2
// }
var rectIntersects = function (a, b) {
    var aInb = function (x, x1, x2) {
        return x > x1 && x < x2
    }
    if (aInb(b.x, a.x, a.x + a.w) || aInb(a.x, b.x, b.x + b.w)) {
        if (aInb(b.y, a.y, a.y + a.h) || aInb(a.y, b.y, b.y + b.h)) {
            log('碰撞💥')
            return true
        }
    }
    return false
}
