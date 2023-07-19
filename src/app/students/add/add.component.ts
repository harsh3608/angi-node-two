import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Student } from '../shared/models/student-models';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit{
  addStudentForm!: FormGroup;
  addRequest!: Student;

  constructor(

  ) {}

  ngOnInit(): void {
    
    this.addStudentForm = new FormGroup({
      Id: new FormControl(this.GetRandomNumber),
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
    console.log(this.addStudentForm.value);
    
  }

}
