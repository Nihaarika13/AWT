class Counter{
    constructor(){
        this.count=0;
    }
    increment(){
        setInterval(()=>{
            this.count++;
            console.log(this.count);
        },1000)
    }
}
let counter=new Counter();
counter.increment();