class myclass{
    constructor(a){
        this.a=a;
    }
}
class class2 extends myclass{
    constructor(a,b){
        super(a)
        this.b=b;
    }
}
var myobj=new class2(2,16);
console.log("a="+myobj.a)
console.log("sum="+(myobj.a+myobj.b))