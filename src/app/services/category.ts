import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from '../types/category-type';
import { ErrorHandlerService } from './error-handler';
import { API_BASE_URL } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = `${API_BASE_URL}/categories`;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
  ) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl).pipe(
      catchError((err) => {
        const errorMessage = this.errorHandler.handleError(err);
        return throwError(() => errorMessage);
      }),
    );
  }
}
