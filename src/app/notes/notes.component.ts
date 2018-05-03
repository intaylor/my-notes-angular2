import { Component, OnInit } from '@angular/core';
import { Note } from '../note';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  notes: Note[];
  note = new Note(0, '', '');

  constructor(private noteService: NoteService) {}

  ngOnInit() {
    this.getNotes();
  }

  getNotes(): void {
    this.noteService.getNotes()
    .subscribe(notes => this.notes = notes);
  }

  add(title: string, content: string): void {
    title = title.trim();
    content = content.trim();
    if (!title || !content) {  return; }

    this.noteService.addNote({title, content} as Note)
      .subscribe(note => {
        this.notes.push(note);
      });
  }

}
