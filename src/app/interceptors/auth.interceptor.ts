import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const email = localStorage.getItem('userEmail');

  if (email && req.url.includes('products')) {
    req = req.clone({
      setHeaders: { 'X-User-Email': email },
    });
  }

  return next(req);
};
