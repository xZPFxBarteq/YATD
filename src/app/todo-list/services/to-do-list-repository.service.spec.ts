import {TestBed, inject, async} from '@angular/core/testing';

import {ToDoListRepositoryService} from './to-do-list-repository.service';
import {HttpClientModule} from "@angular/common/http";

describe('ToDoListRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      providers : [ToDoListRepositoryService]
    });
  });

  it('should be created', inject([ToDoListRepositoryService], (service : ToDoListRepositoryService) => {
    expect(service).toBeTruthy();
  }));

  //more of a development test to check if API is working properly
  //disabled as it's dependent on external API
  it('should add and remove to do list', async(inject([ToDoListRepositoryService], (service : ToDoListRepositoryService) => {
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

  it('should update to do list', async(inject([ToDoListRepositoryService], (service : ToDoListRepositoryService) => {
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
