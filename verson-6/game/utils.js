var rectIntersects = function (a, b) {
    var aInb = function (x, x1, x2) {
        return x > x1 && x < x2
    }
    if (aInb(b.x, a.x, a.x + a.w) || aInb(a.x, b.x, b.x + b.w)) {
        if (aInb(b.y, a.y, a.y + a.h) || aInb(a.y, b.y, b.y + b.h)) {
            // log('碰撞💥')
            return true
        }
    }
    return false
}

function debounce(fn, delay) {
    // 维护一个 timer
    let timer = null;
    // 能访问 timer 的闭包
    return function () {
        // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
        let context = this;
        let args = arguments;
        // 如果事件被调用，清除 timer 然后重新设置 timer
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    }
}

