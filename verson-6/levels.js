var levels = [
    [
        [0, 0,],
    ],
    [
        [50, 0,],
        [100, 100,],
    ],
    [
        [50, 0,],
        [100, 100, 2],
        [200, 100, 2],
    ],
]



document.querySelector("#load_levels").onchange = function () {
    var file = document.getElementById('load_levels').files[0]
    // log('files', document.getElementById('load_levels').files)
    // levels = file
    // log('levels', levels)
    var reader = new FileReader()
    reader.readAsText(file)
    reader.onload = function (e) {
        console.log("读取结果：", this.result);
        levels = JSON.parse(this.result)
        log('levels', levels)
    }
}


