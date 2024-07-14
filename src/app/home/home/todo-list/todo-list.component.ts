import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface TodoTask {
  key: string;
  text: string | null;
  isEditing?: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  animations: [
    trigger('itemAnimation', [
      state('in', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('void => *', [
        style({ opacity: 0, transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ opacity: 0, transform: 'translateX(100%)' }))
      ])
    ])
  ]
})
export class TodoListComponent implements OnInit, AfterViewInit {
  @ViewChild('todoText') todoText!: ElementRef;
  @ViewChild('showallIteams') showallIteams!: ElementRef;

  TodoTaskList: TodoTask[] = [];

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('task_')) {
        const localStorageText = localStorage.getItem(key);
        this.TodoTaskList.push({ key: key, text: localStorageText });
      }
    }
    console.log(this.TodoTaskList);
  }

  ngAfterViewInit() {
    if (this.showallIteams && this.showallIteams.nativeElement) {
      let currentHeight = this.showallIteams.nativeElement.offsetHeight;
      this.renderer.setStyle(this.showallIteams.nativeElement, 'max-height', currentHeight + 'px');
    }
  }

  addTodoItem(todo: HTMLTextAreaElement) {
    let todoText = todo.value.trim();

    if (todoText === '') {
      console.log("Blank data");
    } else {
      const taskId = Date.now().toString();
      const embeddedText = this.embedLink(todoText);

      localStorage.setItem(`task_${taskId}`, embeddedText);
      this.TodoTaskList.push({ key: `task_${taskId}`, text: embeddedText });
      this.todoText.nativeElement.value = ''; // Reset the value after submit
      console.log(this.TodoTaskList);
    }
  }

  embedLink(text: string): string {
    const urlPattern = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlPattern, '<a href="$1" class="embedded-link" target="_blank">$1</a>');
  }


  stripHtmlTags(text: string): string {
    return text.replace(/<\/?[^>]+(>|$)/g, "");
  }

  removeTask(key: string) {
    console.log(key);
    this.TodoTaskList = this.TodoTaskList.filter(task => task.key !== key);
    localStorage.removeItem(key);
  }

  editTask(task: TodoTask) {
    console.log(task);
    task.isEditing = true;
    if (task.text) {
      task.text = this.stripHtmlTags(task.text);
    }
  }

  saveEdit(task: TodoTask) {
    if (task.text !== null && task.text.trim() !== '') {
      task.isEditing = false;
      const embeddedText = this.embedLink(task.text);
      task.text = embeddedText;
      localStorage.setItem(task.key, embeddedText);
    } else {
      console.log("Blank data");
    }
  }
}
