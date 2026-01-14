import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from './user';
import { GetResumesResponse } from '../types/Resumes';

@Injectable({
  providedIn: 'root',
})
export class Resume {
  private BaseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private user: User) {}

  /**
   * Fetch all resumes from API
   * Returns Observable of GetResumesResponse (array of Resume)
   */
  getAllResumes(): Observable<GetResumesResponse> {
    const url = `${this.BaseUrl}/resumes`;
    const token = this.user.getToken();
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : undefined;
    return this.http.get<GetResumesResponse>(url, headers ? { headers } : {}).pipe(
      catchError((err) => {
        console.error('Failed to fetch resumes', err);
        return throwError(() => err);
      })
    );
  }
}
