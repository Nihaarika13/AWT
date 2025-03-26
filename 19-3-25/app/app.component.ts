import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  //standalone: false,
  imports: [CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  students=[
    {id:1,name:"sri",branch:"IT"},
    {id:2,name:"sai",branch:"cse"},
    {id:3,name:"sam",branch:"IT"}, 
    {id:4,name:"ram",branch:"IT"} 
  ]  
  selectedStudent:any;
  deleteStudent(id: number) {
    console.log(id)
    this.students = this.students.filter(student => student.id !== id);
  }
  addStudent(id:any,name:any,branch:any){
    this.students.push({id:id.value,name:name.value,branch:branch.value});
  }

  editStudent(student:any){
    this.selectedStudent={...student};
  }
  updateStudent(){
    const index=this.students.findIndex(student=>student.id===this.selectedStudent.id);
    if(index !== -1){
      this.students[index]=this.selectedStudent
      this.selectedStudent=""
    }

  }
}
