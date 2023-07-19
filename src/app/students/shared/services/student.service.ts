import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student-models';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  BASE_SERVER_URL = 'http://localhost:3000/students/'

  constructor(
    private http: HttpClient
  ) { }

  GetAllStudents(): Observable<Student[]>{
    return this.http.get<Student[]>( this.BASE_SERVER_URL + 'get-all'); 
  }

  AddStudent(data: Student): Observable<any> {
    return this.http.post<any>( this.BASE_SERVER_URL + 'add', data); 
  }

  GetStudentById(id: number): Observable<any> {
    return this.http.get<any>( this.BASE_SERVER_URL + id); 
  }

  UpdateStudentById(id: number, data: Student): Observable<any> {
    return this.http.put<any>( this.BASE_SERVER_URL + 'update/' + id, data); 
  }

  DeleteStudentById(id: number): Observable<any> {
    return this.http.delete<any>( this.BASE_SERVER_URL + 'delete/' + id); 
  }

}
