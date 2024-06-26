import { ChangeDetectionStrategy, Component, computed, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
import { ApiService } from './service/api.service';
import { MatCardModule } from '@angular/material/card';
import {FormsModule} from '@angular/forms'; //for checkbox
import {MatCheckboxModule} from '@angular/material/checkbox';//for checkbox
import { CompletedDirective } from './directive/completed.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatTableModule,MatCardModule,MatCheckboxModule, FormsModule, CompletedDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class AppComponent {
  constructor(public api:ApiService){}  
  displayedColumns: string[] = ['sl', 'title', 'edit', 'delete'];//table
  dataSource = this.api.ELEMENT_DATA;//table

  //todo
  readonly task = signal<Task>({
    name: '',
    completed: false,
    subtasks: this.dataSource,
  });

  //todo none editable code
  readonly partiallyComplete = computed(() => {
    const task = this.task();
    if (!task.subtasks) {
      return false;
    }
    return task.subtasks.some(t => t.completed) && !task.subtasks.every(t => t.completed);
  });

  update(completed: boolean, index?: number) {
    this.task.update(task => {
      if (index === undefined) {
        task.completed = completed;
        task.subtasks?.forEach(t => (t.completed = completed));
      } else {
        task.subtasks![index].completed = completed;
        task.completed = task.subtasks?.every(t => t.completed) ?? true;
      }
      return {...task};
    });
  }
  //todo end

  myStyle(completed:boolean){
    if(completed){
      return 'text-decoration:line-through;color:red;';
    }
    else {
      return ''
    }
  }
  
} 





export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}
