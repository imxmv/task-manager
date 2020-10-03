import {Component} from '@angular/core';
import {DateService} from '../../providers/services/date.service';

@Component({
    selector: 'app-month-switcher',
    templateUrl: './month-switcher.component.html',
    styleUrls: ['./month-switcher.component.scss']
})
export class MonthSwitcherComponent {

    constructor(public dateService: DateService) {}

    public go(dir: number): void {
        this.dateService.changeMonth(dir);
    }

}
