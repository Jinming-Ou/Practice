countDown();
function countDown() {
    var input = document.getElementById('input') // 输入框
    if(input.value) {
        lastTime = new Date(input.value).getTime() - new Date().getTime()
        end = false
        tick()
    }
}

var lastTime // 剩余毫秒
var internal = 1000
var end = false
var timer = 0

function tick() {
    timer = setTimeout(() => {
        if(end) {
            clearTimeout(timer)
        } else if (lastTime < internal) {
                clearTimeout(timer)
        } else {
            lastTime -= internal
            init()
            tick()
        }        
    }, internal)
}

endup = () => {
    end = true
}

format = (time) => {
    const hours = 1000 * 60 * 60
    const minutes = 1000 * 60 
    const h = fixedZero(Math.floor(time / hours))
    const m = fixedZero(Math.floor((time - h * hours ) / minutes))
    const s = fixedZero(Math.floor((time - h * hours - m * minutes)/1000))
    return h +':'+ m +':' + s
}

fixedZero = (val) => {
    return val < 10 ? '0'+ val : val
}

init = () => {
    var html = format(lastTime)
    wrapper = document.querySelector('.countdown')
    wrapper.style.animation = 'rubberBand 2s'
    wrapper.style.fontSize = '130px'
    wrapper.innerHTML = html
}
