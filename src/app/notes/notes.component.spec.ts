import { Observable } from 'rxjs/Rx';
import { NotesComponent } from './notes.component';
import { NoteService } from '../note.service';

import {
  TestBed,
  ComponentFixture, getTestBed, async
} from '@angular/core/testing';

import {
    HttpModule, ResponseOptions,
    Response, RequestMethod, Http,
    BaseRequestOptions, XHRBackend
} from '@angular/http';

import { MockBackend, MockConnection } from '@angular/http/testing';
import { FormsModule } from '@angular/forms';


class MockNoteService extends NoteService {
  constructor() {
    super(null);
  }

  getNotes() {
    return Observable.of([
      {
        id: 1,
        title: 'title1',
        content: 'content1'
      }]);
  }
}

describe('My notes unit test', () => {
  let notesComponent: NotesComponent,
      noteService: NoteService;

  beforeEach(() => {
    noteService = new MockNoteService();
    notesComponent = new NotesComponent(noteService);
  });

  it('shows list of notes by default - unit', () => {
   notesComponent.ngOnInit();
   expect(notesComponent.notes.length).toBe(1);
  });

});

describe('Notes Component...', () => {
  let mockBackend: MockBackend;

  beforeEach(async(() => {  // set up TestBed
    TestBed.configureTestingModule({
      declarations: [
        NotesComponent
      ],
      providers: [
        NoteService,
        MockBackend,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory:
            (defaultOptions: BaseRequestOptions,
                    backend: XHRBackend) => {
                 return new Http(backend, defaultOptions);
               },
             deps: [MockBackend, BaseRequestOptions]
        }
      ], // end providers
      imports: [
        FormsModule,
        HttpModule
      ]
      });

    TestBed.compileComponents();

  }));  // end

  it('get more notes after adding new', () => {
    getTestBed().compileComponents().then(() => {
      let mockBackend = getTestBed().get(MockBackend);
      mockBackend.connection.subscribe(
        (connection: MockConnection) => {
         // the fake response:
         connection.mockRespond(new Response(
            new ResponseOptions({
              body: [
                {
                  id: 2,
                  title: 'Title2',
                  content: 'Content2'
                },
                {
                  id: 3,
                  title: 'Title3',
                  content: 'Content3'
                }]
            })
          ));
        } // end of subscribe onNext method
      );

      let fixture: ComponentFixture<NotesComponent> =
                   getTestBed().createComponent(NotesComponent);

      fixture.componentInstance.ngOnInit();
      fixture.detectChanges();

      expect(fixture.nativeElement
         .querySelector('#title').value === null).toBe(true);
      expect(fixture.nativeElement
         .querySelector('#content').value === null).toBe(true);

      let trs = fixture.nativeElement.querySelectorAll('li');
      expect(trs.length).toBe(3);

    });

});

);
