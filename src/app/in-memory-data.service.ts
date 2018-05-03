import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const notes = [
      { id: 1, title: 'Title1', content: 'Content1' },
    ];
    return {notes};
  }
  
}
