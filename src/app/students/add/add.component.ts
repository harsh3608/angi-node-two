import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Student } from '../shared/models/student-models';
import { StudentService } from '../shared/services/student.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  addStudentForm!: FormGroup;
  addRequest!: Student;

  constructor(
    private studentService: StudentService,
    private dialogRef: MatDialogRef<AddComponent>,
  ) {}

  ngOnInit(): void {
    
    this.addStudentForm = new FormGroup({
      Id: new FormControl(this.GetRandomNumber()),
      Name: new FormControl(),
      Semester: new FormControl(),
      Branch: new FormControl(),
      Mobile: new FormControl(),
      Result: new FormControl(),
    })
  }

  GetRandomNumber(): number {
    return Math.floor(Math.random() * 999) + 1;
  }

  SubmitForm(){
    this.addRequest = this.addStudentForm.value
    this.studentService.AddStudent(this.addRequest).subscribe(
      (res) => {
        console.log(res.message);
        this.dialogRef.close();
      }
    )
    
  }

}
