// 调用时直接写 $('div')   $(function(){})
$ = jQuery;
function $(select){
   return new aa(select)
}
// 给$上加的方法  使用格式$.isArray()
$.isArray = function(){

}
$.json = function(str){
   return JSON.parse(str)
}
$.each = function(){

}
function aa (select) {     // aa 是一个构造函数
    if(typeof select=='string'){
        /*选择元素  创建元素  判断元素*/
        // reg 是一个规则
        let reg = /^<[a-z][a-z1-6]{0,10}>$/;
        // 用reg检查select
        if(reg.test(select)){
            // true  创建元素 只创建出一个
            this[0] = document.createElement(select.slice(1,-1));
            this.length = 1;
        }else{
            let eles = document.querySelectorAll(select); // 拿回页面中的元素
            for (let i = 0; i < eles.length; i++) {
                this[i] = eles[i];  // 每个元素=this[i]  获取回来的元素当做了aa的属性按照下标计算
            }
            this.length = eles.length;   // 获取回来的元素当做了aa的属性按照下标计算
        }
    }else if(typeof select=='function'){
        // 页面加载事件
        document.addEventListener('DOMContentLoaded',function(){
            select();
        },false)
    }else if(typeof select == 'object' && select.nodeType==1){
        this[0] = select;    // 当传进来的是一个对象且是一个元素节点时，只传进来一个直接当做属性
        this.length = 1;
    }

}
// each 实现隐式循环
aa.prototype.each = function(callback){
    for(let i=0;i<this.length;i++){
        callback(i,this[i]);   // this[i] 元素
    }
}
// attrObj 是个对象，用来放元素的样式    此方法用来设置css样式
aa.prototype.css=function(attrObj){
    /*for(let i=0;i<this.length;i++){
        for(let j in attrObj){
            this[i].style[j] = attrObj[j]
        }
    }*/
    this.each(function(index,obj){
        for(let j in attrObj){
            obj.style[j] = attrObj[j];
        }

    })
    return this;
};
// html 此方法是用来设置元素的内容  value 是具体的内容是字符串
aa.prototype.html=function(value){
    // index 下标  obj 元素
    this.each(function(index,obj){
        obj.innerHTML = value;
    })
    /*for (let i=0;i<this.length;i++){
        this[i].innerHTML = value;
    }*/
    return this;
};
// click 添加事件
aa.prototype.click =function(callback){
    /*for (let i=0;i<this.length;i++){
        this[i].onclick = function(){
            callback();
        }
    }*/
    this.each(function(index,obj){
        obj.onclick = function(){
            // 把obj的this冒充给callback，使调用时click事件中可以使用this
            callback.call(obj);
        }
    })
    // 返回this用来实现链式调用，使调用时指向实例化出来的对象又返回值
    return this;
};
aa.prototype.onmouseout = function(){

}
aa.prototype.addClass = function (classes) {
    for (let i=0;i<this.length;i++){
        this[i].classList.add(classes);
    }
}
// 插入  可能一对多，所以进行复制一下
aa.prototype.appendTo = function(selector){
    // 访问创建的元素 this[0]     selector(被插入的父元素)->element（即将插入的创建出的元素）
    // 获取到选择器对应的元素
    let parents = document.querySelectorAll(selector);
    // 只创建出一个，所以每插入一个就拷贝一个
    let element = this[0];
    // 让创建出元素的length等于父元素的length,以此实现一对多的插入
    this.length = parents.length;
    // 插到具有相同名字的每个父元素中
    for(let i=0;i<parents.length;i++){
        // 复制当前创建的节点 复制一个，插入一个
        let copy = element.cloneNode(true);
        // 把copy当做当前元素的属性
        this[i] = copy;
        // 插入元素
        parents[i].appendChild(copy);
    }
    return this;
}

// 对属性进行设置  标准属性和自定义属性 添加属性  属性名 值
aa.prototype.attr = function(key,value){
    if(value===undefined){
      return this[0].getAttribute(key);
    }else{
        this.each(function(i,obj){
            obj.setAttribute(key,value)
        })
    }

}