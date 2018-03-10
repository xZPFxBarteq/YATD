import {TestBed, inject, async} from '@angular/core/testing';

import {TodoListRepositoryService} from './todo-list-repository.service';
import {HttpClientModule} from "@angular/common/http";

describe('TodoListRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      providers : [TodoListRepositoryService]
    });
  });

  it('should be created', inject([TodoListRepositoryService], (service : TodoListRepositoryService) => {
    expect(service).toBeTruthy();
  }));

  //more of a development test to check if API is working properly
  //disabled as it's dependent on external API
  xit('should add and remove to do list', async(inject([TodoListRepositoryService], (service : TodoListRepositoryService) => {
    service.addNewList('FUNNY_LIST').subscribe(savedToDoList => {
      service.getAllLists().subscribe(toDoLists => {
        expect(toDoLists)
          .toContain(jasmine.objectContaining({
            'id' : savedToDoList.id,
            'name' : 'FUNNY_LIST'
          }));
        service.removeList(savedToDoList.id).subscribe(() => {
          service.getAllLists().subscribe(toDoLists => {
            expect(toDoLists)
              .not
              .toContain(jasmine.objectContaining({
                'id' : savedToDoList.id,
                'name' : 'FUNNY_LIST'
              }));
          });
        });
      });
    });
  })));

  xit('should update to do list', async(inject([TodoListRepositoryService], (service : TodoListRepositoryService) => {
    service.addNewList('FUNNY_LIST').subscribe(savedToDoList => {
      service.getAllLists().subscribe(toDoLists => {
        expect(toDoLists)
          .toContain(jasmine.objectContaining({
            'id' : savedToDoList.id,
            'name' : 'FUNNY_LIST'
          }));

        service.updateListName(savedToDoList.id, "FUNNIER_LIST").subscribe(updatedToDoList => {
            service.getAllLists().subscribe(toDoLists => {
              expect(toDoLists)
                .toContain(jasmine.objectContaining({
                  'id' : savedToDoList.id,
                  'name' : 'FUNNIER_LIST'
                }));
              service.removeList(savedToDoList.id).subscribe();
            });
          }
        )
      });
    });
  })));

});
