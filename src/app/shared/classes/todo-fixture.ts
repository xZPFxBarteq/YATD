import {ComponentFixture} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {TodoList} from "../../todo-page/components/todo-lists/classes/todo-list";
import {ChangeDetectorRef, DebugElement, ElementRef} from "@angular/core";

export class TodoFixture<T> {

  private fixture : ComponentFixture<T>;
  public debugElement : DebugElement;
  public componentInstance : T;
  public nativeElement : any;
  public elementRef : ElementRef;
  public changeDetectorRef : ChangeDetectorRef;

  constructor(fixture : ComponentFixture<T>) {
    this.fixture = fixture;
    this.debugElement = fixture.debugElement;
    this.componentInstance = fixture.componentInstance;
    this.nativeElement = fixture.nativeElement;
    this.elementRef = fixture.elementRef;
    this.changeDetectorRef = fixture.changeDetectorRef;
  }

  public cssQuery(css : string) : any {
    let debugElement = this.fixture.debugElement.query(By.css(css));
    return debugElement != null ? debugElement.nativeElement : debugElement;
  }

  public clickButton(buttonSelector : string) : void {
    this.cssQuery(buttonSelector).click();
    this.fixture.detectChanges();
  }

  public clickElement(elementSelector : string) : void {
    this.fixture.debugElement.query(By.css(elementSelector)).triggerEventHandler('click', { bubbles : true });
    this.fixture.detectChanges();
  }

  public todoList(name : string) : TodoList {
    let list : TodoList = new TodoList();
    list.id = name;
    list.name = name;
    return list;
  }

  public setInputValue(inputSelector : string, value : string) : void {
    let input : HTMLInputElement = this.cssQuery(inputSelector);
    input.value = value;
    input.dispatchEvent(new Event('input'));
    this.fixture.detectChanges();
  }


  public detectChanges(checkNoChanges? : boolean) : void {
    this.fixture.detectChanges(checkNoChanges);
  }

  checkNoChanges() : void {
    this.fixture.checkNoChanges();
  }

  autoDetectChanges(autoDetect? : boolean) : void {
    this.fixture.autoDetectChanges(autoDetect);
  }

  isStable() : boolean {
    return this.fixture.isStable();
  }

  whenStable() : Promise<any> {
    return this.fixture.whenStable();
  }

  whenRenderingDone() : Promise<any> {
    return this.fixture.whenRenderingDone();
  }

  destroy() : void {
    return this.fixture.destroy();
  }


}
