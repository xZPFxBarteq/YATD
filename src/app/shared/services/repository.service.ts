import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ErrorHandlerService} from "./error-handler.service";
import {ServerService} from "./server.service";
import {Observable} from "rxjs/Observable";
import {catchError, retry} from "rxjs/operators";

@Injectable()
export class RepositoryService {

  constructor(protected http : HttpClient,
              protected server : ServerService,
              protected errorHandler : ErrorHandlerService) {
  }

  protected handleCall<T>(call : Observable<T>) : Observable<T> {
    return call.pipe(
      retry(3),
      catchError(this.errorHandler.handle));
  }

}
