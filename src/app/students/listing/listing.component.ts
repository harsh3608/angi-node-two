import { Component, OnInit } from '@angular/core';
import { StudentService } from '../shared/services/student.service';
import { Student } from '../shared/models/student-models';
import { MatDialog } from '@angular/material/dialog';
import { Title } from '@angular/platform-browser';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit{
  students: Student[] = [];

  constructor(
    private studentService: StudentService,
    private title: Title,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.title.setTitle('Students');
    this.studentService.GetAllStudents().subscribe(
      (res) => {
        this.students = res;
        console.log(this.students);
      }
    )
  }

  OpenAddDialog() {
    const dialogRef = this.dialog.open(AddComponent,
      {
        data: {  }
      }
    );
    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
