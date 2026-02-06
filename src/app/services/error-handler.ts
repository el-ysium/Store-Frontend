import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  public handleError(error: HttpErrorResponse): string {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      // Client-side/Network error
      errorMessage = `Network error: ${error.error.message}`;
    } else {

        switch (error.status) {
        case 0: errorMessage = 'Cannot connect to server. Is it running?'; break; 
        case 400: errorMessage = 'Bad Request. Please check your data.'; break;
        case 401: errorMessage = 'Unauthorized. Please login again.'; break;
        case 403: errorMessage = 'Forbidden. You do not have permission.'; break;
        case 404: errorMessage = 'Resource not found.'; break;
        case 500: errorMessage = 'Server error. Possibly image size too large.'; break;
        default: errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    return errorMessage;
  }
}