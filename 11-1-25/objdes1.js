let person={
    fname:"",
    lname:"doe"
}

let {fname:fn="cvr",
    lname:ln,
    age:cur=23}=person;

console.log(fn);

console.log(ln)

console.log(cur)