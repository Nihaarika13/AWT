
import { Component } from '@angular/core';
import { StudentService } from './student.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports:[FormsModule,CommonModule],
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demo';
  call = 'cvr';
  showTable:boolean = true;
  students: any
  selectedStudent:any;

  toggleTable() {
    this.showTable = !this.showTable;
    console.log("hello") 
  }
  
  getStudents(){
    return this.students;
  }
  constructor(private studentService:StudentService){}

  ngOnInit(){
  this.fetchStudents();
  }
  fetchStudents(){
    this.students= this.studentService.getStudents();
  }

  deleteStudent(id:any){
    this.studentService.deleteStudent(id)
    this.fetchStudents()
  }

  addStudent(id:any,name:any,branch:any){
    this.studentService.addStudent(id,name,branch)
    this.fetchStudents()
  }

  editStudent(student:any){
    this.selectedStudent={...student}
  }

  updateStudent(){
    this.studentService.updateStudent(this.selectedStudent)
    this.fetchStudents()
  }
}
