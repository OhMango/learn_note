/**
 * 栈的抽象
 */
function Stack(){
    this.stack = []

    // 入栈
    this.push = function(item) {
        return this.stack.push(item)
    }

    // 出栈
    this.pop = function() {
        return this.stack.pop()
    }

    // 获取栈顶元素
    this.peek = function() {
        return this.stack[this.getCount() - 1]
    }

    // 获取栈容量
    this.getCount = function() {
        return this.stack.length
    }

    // 判断是否空栈
    this.isEmpty = function() {
        return this.getCount() === 0
    }
}

/**
 * 进制转换
 * @param  {number} num    带转换的数字
 * @param  {number} toUnit 需要转换到的进制数
 * @return {number}        转换后的结果
 */
function unitTrans(num, toUnit){
    let stack = new Stack();
    let bit;
    let result = '';
    while(num){
        bit = num % toUnit;
        stack.push(bit);
        num = (num - bit) / toUnit;
    }
    while(!stack.isEmpty()){
        result += stack.pop();
    }
    return result;
}

// console.log(unitTrans(12,2))

/**
 * 回文判断
 * @param  {String}   str 待判断的字符串
 * @return {Boolean}  true表示回文 false表示不是回文
 */
 function isPalindrome(str) {
    let stack = new Stack();
    let strArr = str.split('');
    let result = '';
    for(let i = 0; i < strArr.length; i++){
        stack.push(strArr[i]);
    }
    while(!stack.isEmpty()){
        result += stack.pop();
    }
    return result === str; 
}

//测试
let testSuite = ['asss','bbacd','sas','abcba'];
testSuite.map(function (item, index) {

    // console.log(isPalindrome(item))
    
})

/**
 * 简易递归求阶乘
 * @param  {number} num 求解参数阶乘
 * @return {number} num的阶乘结果
 */
 function recursion(num) {
    let stack = new Stack();
    let result = 1;
    while(num){
        stack.push(num--);
    }
    while(!stack.isEmpty()){
        result *= stack.pop();
    }
    return result;
}
//测试
testSuite = [5];
testSuite.map(function (item, index) {
    // console.log(recursion(item));
})

//-------------------------------------------------------------------------------------------------------------------------------
//一个算数表达式中有{},(),[]三种括号，编写一个函数，接受一个算数表达式作为参数，如果括号完全匹配则返回true,否则返回括号缺失的位置。
function bracketShouldAt(str) {
    let symbolMap = {
        '{':-1,
        '}':1,
        '(':-2,
        ')':2,
        '[':-3,
        ']':3
    }
    let stack = new Stack();
    let strArr = str.split('');
    let result = -1;
    for(let i = 0; i < strArr.length; i++){
        if (symbolMap[strArr[i]] < 0) {
            stack.push(strArr[i]);
        }else{
            if (symbolMap[strArr[i]] > 0 &&
                symbolMap[stack.pop()] + symbolMap[strArr[i]] !== 0) {
                result= i;
                break;
            }
        }
    }
    if (!stack.isEmpty()) {result = strArr.length}
    return result === -1 ? 'Right Pairs' : result;
}

testSuite = ['2.3 + 23/12 + (3.14159 * 0.24)','2.3 + (23/12 + 3.14159) * 0.24'];
testSuite.map(function (item, index) {
    // console.log(bracketShouldAt(item));
})

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
//一个表达式的后缀表达式形式为opt1 opt2 operator,编写一个函数，接受一个算数表达式作为参数（平时使用的算数表达式形式即为中缀表达式），将其转换为后缀表达式（可暂不考虑运算优先级）。
function orderTransAndResolve(strRaw) {
    let str = strRaw.replace(/\s/g,'');
    console.log(str)
    let strArr = tokenize(str);
    //转换后缀表达式
    console.log('backOrder expression:',strArr)
}

function tokenize(str){
    let optstack = new Stack();
    let numstack = new Stack();
    let expression = [];
    let length = str.length;
    let i = length - 1;
    let result = 0;
    let temp='';
    let nextnum;
    let nextopt;
    while(i>=0){
        if(/[\d\.]/.test(str[i])){
            temp = str[i] + temp;
        }else{
            numstack.push(temp);
            optstack.push(str[i]);
            temp = '';
        }
        i--;
    }
    if (temp) {
        numstack.push(temp);
    }
    //拼接后缀表达式
    expression.push(parseFloat(numstack.pop()));
    result = expression[0];
    while(!optstack.isEmpty()){
        nextnum = parseFloat(numstack.pop());
        nextopt = optstack.pop();
        expression.push(nextnum);
        expression.push(nextopt);
        switch(nextopt){
            case '+':
            result = result + nextnum;
            break;
            case '-':
            result = result - nextnum;
        }
    }
    console.log('your answer:',result);

    return expression;
}

testSuite = ['2.3 + 23 - 12 + 3.14159 - 0.24'];
testSuite.map(function (item, index) {
    orderTransAndResolve(item);
    console.log(item)
    console.log('correct answer:', eval(item));
});

//------------------------------------------------------------------------------------------------------------------------------------------------------
//盒子里从上到下放有不定数量的【红色】，【白色】，【黄色】三种糖果，编写一个程序，可以使用一个或多个栈，在保证原糖果顺序不变的情况下，取出所有的【黄色】糖果。
function removeYellow(sugarStack) {
    console.log(sugarStack.stack.join('-'));
    let stack2 = new Stack();
    let sugar;
    //黄色丢掉，其余放入另一个栈
    while(!sugarStack.isEmpty()){
        sugar = sugarStack.pop();
        if(sugar !== 'yellow'){
            stack2.push(sugar);
        }else{
            stack2.push('<yellow>');
        }
    }
    //放回原来的栈
    while(!stack2.isEmpty()){
        sugarStack.push(stack2.pop());
    }
    return sugarStack.stack;
}

//测试
testSuite = new Stack();
let sugarMap={
    0:'red',
    1:'white',
    2:'yellow'
};

//生成测试用例
for(let i =0;i<100;i++){
    testSuite.push(sugarMap[Math.floor(Math.random()*3)]);
}

let result = removeYellow(testSuite);
console.log(result.join('-'));