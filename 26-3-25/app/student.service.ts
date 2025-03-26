import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

students=[
  {id:1,name:"sri",branch:"IT"},
  {id:2,name:"sai",branch:"cse"},
  {id:3,name:"sam",branch:"IT"}, 
  {id:4,name:"ram",branch:"IT"} 
]  
selectedStudent:any;

getStudents(){
  return this.students;
}

deleteStudent(id: number) {

  this.students = this.students.filter(student => student.id !== id);
}
addStudent(id:any,name:any,branch:any){
  this.students.push({id:id.value,name:name.value,branch:branch.value});
}


updateStudent(updatedstudent:any){
  const index=this.students.findIndex(student=>student.id===updatedstudent.id);
  if(index !== -1){
    this.students[index]=updatedstudent;
    this.selectedStudent=""
  }

}
}