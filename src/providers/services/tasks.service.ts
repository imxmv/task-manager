import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import * as moment from 'moment';
import {Task} from '../../models/tasks';

@Injectable({
    providedIn: 'root'
})
export class TasksService {

    public getCurrentTasks(date: moment.Moment): Observable<Task[]> {
        return new Observable(subscriber => {
            const tasks = this._getAllTasks();
            const currentTasks = this._getTasksByDate(date, tasks);
            subscriber.next(currentTasks);
        });
    }

    private _getAllTasks(): Task[] {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        return tasks ? tasks : [];
    }

    private _getTasksByDate(date: moment.Moment, tasks: Task[]): Task[] {
        return tasks.filter(t => t.date === date.format('DD-MM-YYYY'));
    }

    public addTask(task: Task): Observable<Task[]> {
        return new Observable(subscriber => {
            const generateId = `f${(~~(Math.random() * 1e8)).toString(16)}`;
            const newTask = {...task, id: generateId};
            const tasks = this._getAllTasks();
            tasks.push(newTask);

            localStorage.setItem('tasks', JSON.stringify(tasks));
            subscriber.next();
        });
    }

    public remove(task: Task): Observable<Task[]> {
        return new Observable(subscriber => {
            const tasks = this._getAllTasks();
            const updatedTasks = tasks.filter(t => t.id !== task.id);

            localStorage.setItem('tasks', JSON.stringify(updatedTasks));
            subscriber.next();
        });
    }

}
