var imageFromPath = function (params) {
    var img = new Image()
    img.src = params
    return img
}
var rectIntersects = function (a, b) {
    let o = a
    if (b.y > o.y && b.y < o.y + o.image.height) {
        if (b.x > o.x && b.x < o.x + o.image.width) {
            console.log('碰撞💥');
            return true
        }
    }
}