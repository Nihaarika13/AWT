function Person(fname, lname) {
    this.fname = fname;
    this.lname = lname;
}
Person.prototype.fullname = function() {
    return this.fname + ' ' + this.lname;
};
let p1 = new Person("abc", "A");
let p2 = new Person("cvr", "B");
console.log(p1.fullname());
