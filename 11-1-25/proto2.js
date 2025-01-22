function person(fname,lname) {
    this.fname = fname;
    this.lname = lname;
}
function Admin(fname,lname){
    person.call(this,fname,lname);
}

Admin.prototype=person.prototype;
let a=new Admin("cvr","A");
console.log(a.fname);