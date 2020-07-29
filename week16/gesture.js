

function enableGesture(element){

let contexts = Object.create(null);
let MOUSE_SYMBOL = Symbol("mouse")

if(window.ontouchstart !==null){
    // PC
    element.addEventListener('mousedown',(event)=>{
        contexts[MOUSE_SYMBOL] = Object.create(null);
        start(event, contexts[MOUSE_SYMBOL])

        let mousemove = event =>{
            move(event, contexts[MOUSE_SYMBOL]);
            // console.log(event.clientX, event.clientY);
        }
        let mouseend = event =>{
            end(event, contexts[MOUSE_SYMBOL])
            document.removeEventListener('mousemove', move)
            document.removeEventListener('mouseup', end)
        }
        document.addEventListener('mousemove', mousemove)
        document.addEventListener('mouseup', mouseend)
    })

}
// mobile
element.addEventListener("touchstart", event=>{
    for(let touch of event.changedTouches){
        contexts[touch.identifier] = Object.create(null);
        start(touch,contexts[touch.identifier] )
    }
})
element.addEventListener("touchmove", event=>{
    for(let touch of event.changedTouches){
        move(touch, contexts[touch.identifier])
    }
})
// cancel 和 end 只会触发一个
element.addEventListener("touchend", event=>{
    for(let touch of event.changedTouches){
        end(touch, contexts[touch.identifier])
        delete contexts[touch.identifier]
    }
})
// 弹窗等
element.addEventListener("touchcancel", event=>{
    for(let touch of event.changedTouches){
        cancel(touch, contexts[touch.identifier])
        delete contexts[touch.identifier]
    }
})

// tap
// pan panstart panmove panend
// flick 
// press pressstart pressend



let start = (point,context)=>{
    element.dispatchEvent(new CustomEvent('start', {
        startX: point.clientX,
        startY: point.clientY,
        clientX: point.clientX,
        clientY: point.clientY
    }))
    context.startX = point.clientX, context.startY = point.clientY
    // console.log("start", point.clientX, point.clientY);
    context.moves = [];
    context.isTap = true;
    context.isPan = false;
    context.isPress = false;
    context.timeoutHandler = setTimeout(() => {
        if(context.isPan){
            return;
        }
        context.isTap = false;
        context.isPan = false;
        context.isPress = true;
        console.log("pressstart");
        element.dispatchEvent(new CustomEvent('pressstart', {}))
    }, 500);
}
let move = (point,context)=>{
    let dx = point.clientX - context.startX,
    dy = point.clientY - context.startY;
    
    if(dx ** 2 + dy ** 2 > 100 && !context.isPan){
        if(context.isPress){
            console.log("pressend");
            element.dispatchEvent(new CustomEvent('presscancel', {}))
        }
        context.isTap = false;
        context.isPan = true;
        context.isPress = false;
        console.log("panstart");
        element.dispatchEvent(new CustomEvent('panstart', {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY
        }))
    }

    if(context.isPan){
        console.log("pan");
        context.moves.push({
            dx,dy,
            t: Date.now()
        });
        context.moves = context.moves.filter(record=>Date.now()-record.t < 300)
        
        element.dispatchEvent(Object.assign(new CustomEvent('pan'), {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY
        }))
    }

    // console.log("move", dx, dy);
}
let end = (point, context)=>{
    // console.log('end',point.clientX, point.clientY);
    if(context.isPan){
        let dx = point.clientX - context.startX,
        dy = point.clientY - context.startY;
        let record = context.moves[0]
        let speed = Math.sqrt((record.dx - dx) **2 + (record.dy - dy)**2 / (Date.now()-record.t))
        console.log(speed);
        let isFlick = speed>2.5
        if(isFlick){
            console.log('flick');
            element.dispatchEvent(new CustomEvent('flick', {
                startX: context.startX,
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                speed: speed
            }))
        }
        console.log("panend");
        element.dispatchEvent(Object.assign(new CustomEvent('panend'), {
            startX: context.startX,
            startY: context.startY,
            clientX: point.clientX,
            clientY: point.clientY,
            speed: speed,
            isFlick: isFlick
        }))
    }
    if(context.isTap){
        console.log("tap");
        element.dispatchEvent(new CustomEvent('tap', {}))
    }
    if(context.isPress){
        element.dispatchEvent(new CustomEvent('press', {}))
        console.log("pressend");
    }
    clearTimeout(context.timeoutHandler)
}
let cancel = (point, context)=>{
    console.log("cancel")
    clearTimeout(context.timeoutHandler)
    // console.log('cancel', point.clientX, point.clientY);
}
}