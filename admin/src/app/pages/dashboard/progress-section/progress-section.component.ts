import { Component, OnDestroy } from '@angular/core';
import { ProgressInfo } from '../../../@core/models/chart/progress-info';

import { ProgressInfoService } from '../../../@core/services/progress-bar-chart/progress-info.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent implements OnDestroy {

  private alive = true;

  progressInfoData: ProgressInfo[];

  constructor(private progressInfoService: ProgressInfoService) {
    this.progressInfoService.getProgressInfoData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.progressInfoData = data;
      });
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
