/**
 * 2020/7/9 最后半小时
 * 未听内容：创建文本
 */
// React = {}
// React.createElement = 
function create(Cls, attributes, ...children){
    console.log(arguments)
    
    let o = new Cls({
        timer: {}
    });
    
    for(let name in attributes){
        console.log('***', attributes)
        // o[name] = attributes[name]
        o.setAttributes(name, attributes[name])
    }
    console.log(children)
    for(let child of children){
        // if(typeof child === ){}
        // o.appendChild(child)
        o.children.push(child)
    }
    return o;
}

class Text{
    constructor(config){
        this.children =[];
        this.root = document.createTextNode(text);
    }
    mountTo(parent){
        parent.appendChild(this.root)
    }
}

class Div{
    constructor(config){
        this.children =[];
        this.root = document.createElement('div')
    }
    // set class(v){ // property
    //     console.log('Parent::class', v)
    // }
    // set id(v){ // property
    //     console.log('Parent::id', v)
    // }
    setAttributes(name, value){ // attribute
        // console.log(name, value)
        this.root.setAttribute(name, value)
    }

    mountTo(parent){
        parent.appendChild(this.root)
        for(let child of this.children){
            child.mountTo(this.root);
        }
    }
    appendChild(child){ //children
        this.children.push(child)
        // console.log("Parent::appendChild", child);
        // child.mountTo(this.root)
        // this.root.appendChild(child)
    }
    // render(){
    //     let slot = <div></div>
    //     return <article>
    //         <header>this is Header</header>  
    //         {this.slot}
    //     </article>
    // }
}
let components = 
    <Div id="a12" class="bbb" style="width: 100px;height: 100px;background-color:red">
        <Div></Div>
        <Div></Div>
        <Div></Div>
    </Div>

// let components = <Text>123</Text>

components.mountTo(document.body)
// components.setAttribute('id', 'aaa')
console.log(components)