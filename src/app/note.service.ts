import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Note } from './note';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class NoteService {

  private notesUrl = 'api/notes';  // URL to web api

  constructor(
    private http: HttpClient
  ) { }

  /** GET notes from the server */
  getNotes (): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl)
      .pipe(
        tap(notes => console.log(`retrieved notes`)),
        catchError(this.handleError('getNotes', []))
      );
  }

  /** POST: add a new note to the server */
  addNote (note: Note): Observable<Note> {
    return this.http.post<Note>(this.notesUrl, note, httpOptions).pipe(
      tap((note: Note) => console.log(`added note w/ title=${note.title}`)),
      catchError(this.handleError<Note>('addNote'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
