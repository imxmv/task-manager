import {Component, OnInit} from '@angular/core';
import {DateService} from '../../providers/services/date.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TasksService} from '../../providers/services/tasks.service';
import {Task} from '../../models/tasks';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-tasks-manager',
    templateUrl: './tasks-manager.component.html',
    styleUrls: ['./tasks-manager.component.scss']
})
export class TasksManagerComponent implements OnInit {

    taskForm: FormGroup;
    tasks: Task[] = [];

    constructor(
        public dateService: DateService,
        public tasksService: TasksService
    ) {}

    public ngOnInit(): void {
        this._renderCurrentTasks();
        this.taskForm = new FormGroup({
            title: new FormControl('', Validators.required)
        });
    }

    private _renderCurrentTasks(): void {
        this.dateService.date.pipe(
            switchMap(value => this.tasksService.getCurrentTasks(value))
        ).subscribe(tasks => {
            this.tasks = tasks;
        });
    }

    public addTask(): void {
        const {title} = this.taskForm.value;
        const task: Task = {
            title,
            date: this.dateService.date.value.format('DD-MM-YYYY')
        };

        this.tasksService.addTask(task).subscribe(() => {
            this._renderCurrentTasks();
            this.taskForm.reset();
        }, err => console.error(err));
    }

    public removeTask(task: Task): void {
        this.tasksService.remove(task).subscribe(() => {
            this._renderCurrentTasks();
        }, err => console.error(err));
    }

}
