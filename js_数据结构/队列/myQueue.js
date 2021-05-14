/**
 * 队列的抽象
 */
function Queue(){
    this.queue = []
    
    //获取队头元素
    this.getHeader = function(){
        return this.queue[0];
    }

    //获取队尾元素
    this.getTail = function(){
        return this.queue[this.queue.length - 1];
    }

    //获取长度
    this.getLength = function(){
        return this.queue.length;
    }
            
    //判断是否为空
    this.isEmpty = function(){
        return this.queue.length === 0;
    }

}

//使用原型链接

//入队
Queue.prototype.enqueue = function(item){
    this.queue.push(item);
}

//出队
Queue.prototype.dequeue = function(){
    return this.queue.shift();
}

//-------------------------------------------------------------------------------------------------------------------------------
//编写一个函数dancingQueue(str),str中记录着前来参加舞会的人的性别，以空格分割，函数中需要实现将前来跳舞的人按性别分成两队，每当舞池中有空位时，男队和女队的排在最前面的人组成舞伴进入，如果某一队为空时，需要返回对应的消息。

function dancingQueue(str) {
    var dancers = str.split(/\s+/);
    var fqueue = new Queue();
    var mqueue = new Queue();
    //入队
    for(let i = 0; i < dancers.length ; i++){
        if (dancers[i][0] === 'M') {
            mqueue.enqueue(dancers[i]);
        } else {
            fqueue.enqueue(dancers[i]);
        }
    }
    //模拟出队
    while(!mqueue.isEmpty() && !fqueue.isEmpty()){
        console.log(mqueue.dequeue(),'+',fqueue.dequeue());
    }
    mqueue.isEmpty?console.log('No Male'):console.log('No Female');
}

let testSuite = 'M-mali1 F-flip F-tomas M-Gone F-test ';
dancingQueue(testSuite);

//-------------------------------------------------------------------------------------------------------------------------------
//实现一个PriorityQueue类，实现优先队列的功能，优先队列的元素带有权重，权重越高（一般认为数字越小权重越高）的越早出队。

//扩展类  ES6
// class PriorityQueue extends Queue{
//     dequeue(){
        
//     }
// }

//ES5
function PriorityQueue(){

    Queue.call(this)

    this.dequeue = function(){
        let length = this.getLength();
        let index = 0;
        let basePriority;
        let dequeueItem;
        if (!this.isEmpty()) {
            basePriority = this.queue[0].priority;
        }
        for(let i = 1; i < length; i++){
            if (this.queue[i].priority < basePriority) {
                index = i;
                basePriority = this.queue[i].priority;
            }
        }
        dequeueItem = this.queue[index];
        this.queue.splice(index,1);
        return dequeueItem;
    }

}

//Queue 的 enqueue, dequeue 是 原型链  PriorityQueue所以也需要链接
PriorityQueue.prototype = Object.create(Queue.prototype);

let p = new PriorityQueue();
testSuite = [{value:123,priority:3},
             {value:2,priority:1},
             {value:'tomas',priority:2}];
testSuite.map((item)=>p.enqueue(item));

console.log(p.dequeue());

//-------------------------------------------------------------------------------------------------------------------------------
//修改Queue类，生成一个Deque类，允许从队列两端添加和删除元素，因此也叫双向队列。

function Deque(){

    Queue.call(this)

    //头部入队
    this.unshift = function(item){
        this.queue.splice(0,0,item);
    }

    //头部出队
    this.shift = function(){
        let item;
        if(!this.isEmpty()){
            item = this.queue[0];
            this.queue.splice(0,1);
        }
        return item;
    }

    //尾部入队
    this.push = function(item){
        this.queue[this.queue.length] = item;
    }

    //尾部出队
    this.pop = function(){
        let item;
        if(!this.isEmpty()){
            item = this.queue[this.queue.length - 1];
            this.queue.splice(this.queue.length - 1,1);
        }
        return item;
    }

}

let de = new Deque();
de.push(1);
de.push(2);
de.push(3);
console.log('de.queue should be [1,2,3]',de.queue);
de.unshift(4);
console.log('de.queue should be [4,1,2,3]',de.queue);
de.shift();
console.log('de.queue should be [1,2,3]',de.queue);
de.pop();
console.log('de.queue should be [1,2]',de.queue);

//-------------------------------------------------------------------------------------------------------------------------------
//通过Deque类，判断是否为回文

function isPalindrome(str) {
    let de = new Deque();
    let strArr = str.split('').map((item)=>de.push(item));
    let step;
    if (!str) {
        return false;
    }
    step = str.length % 2 ? (str.length - 1) /2 : str.length / 2;
    for (let i = 0; i < step; i++) {
        if (de.shift() !== de.pop()) {
            return false;
        }
    }
    return true;
}

//测试
testSuite = ['asss','bbacd','sas','abcba'];
testSuite.map(function (item, index) {
    console.log(isPalindrome(item));
})

//-------------------------------------------------------------------------------------------------------------------------------
//扩展- 循环队列  在存储结构的实现上是首尾相连的。


//构造函数接受一个整数，指定初始存储空间大小 length
function CircularQueue(length){

    this.queue = new Array(length + 1);
    this.front = 0;//头指针
    this.rear = 0;//尾指针
    this.size = 0;//队列大小

    //获取存储空间长度
    this.getLength = function(){
        return this.queue.length;
    }

    //获取队列长度
    this.getSize = function(){
        return this.size;
    }

    //判断是否为空队
    this.isEmpty = function(){
        return this.size === 0;
    }

    //判断是否为满队
    this.isFull = function(){
        return this.size === this.queue.length;
    }

    //调整循环队列的存储空间
    this.resize = function(length){
        let q = new Array(length);
        for (let i = 0; i < length; i++) {
            q[i] = this.queue[(i + this.front) % this.queue.length]
        }
        this.queue = q;
        this.front = 0;
        this.rear = this.size;
    }

    //入队
    this.enqueue = function(item){
        if (this.isFull()) {
            this.resize(this.getLength() * 2 + 1);
        }
        this.queue[this.rear] = item;
        this.size++;
        this.rear = (this.rear + 1) % this.getLength();
    }

     //出队
    this.dequeue = function(){
        let item;
        let next;
        let resizeLength;
        if(this.isEmpty()){
            console.log('No more items!');
            return;
        } 
        item = this.queue[this.front];
        this.queue[this.front] = null;
        this.front = (this.front + 1) % this.getLength();
        this.size--;
        //当队列长度小于总长度1/4时，队列总空间减半，假定空间长度大于8时有效
        if (this.getLength() >= 8) {
            resizeLength = Math.floor(this.getLength() / 2);
            if (this.size < resizeLength/2) {
                this.resize(resizeLength);
            }
        }
    }

}

//测试
console.log('测试初始化');
let cqueue = new CircularQueue(9);
console.log('cqueue.getLength() should be 10:',cqueue.getLength());

//入队
console.log('测试入队');
for(let i = 0; i < 10; i++){
    cqueue.enqueue(i);
}
console.log(cqueue);

//入队溢出
console.log('测试入队溢出');
cqueue.enqueue(10);
console.log(cqueue);

//出队
console.log('测试出队');
cqueue.dequeue();
console.log(cqueue);

//出队收缩
console.log('测试出队收缩');
for(let i = 0; i < 6; i++){
    cqueue.dequeue();
}
console.log(cqueue);
