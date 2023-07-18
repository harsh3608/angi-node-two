import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student-models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(
    private http: HttpClient
  ) { }

  GetAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>('http://localhost:3000/students/get-all'); 
  }


}
