import { Injectable } from '@angular/core';
import { PeriodsService } from '../periods.service';
import { ProfitChart } from '../../models/chart/profit-chart';

@Injectable()
export class ProfitChartService {

  private year = [
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
  ];

  private data = { };

  constructor(private period: PeriodsService) {
    this.data = {
      week: this.getDataForWeekPeriod(),
      month: this.getDataForMonthPeriod(),
      year: this.getDataForYearPeriod(),
    };
  }

  private getDataForWeekPeriod(): ProfitChart {
    const nPoint = this.period.getWeeks().length;

    return {
      chartLabel: this.period.getWeeks(),
      data: [
        this.getRandomData(nPoint),
        this.getRandomData(nPoint),
        this.getRandomData(nPoint),
      ],
    };
  }

  private getDataForMonthPeriod(): ProfitChart {
    const nPoint = this.period.getMonths().length;

    return {
      chartLabel: this.period.getMonths(),
      data: [
        this.getRandomData(nPoint),
        this.getRandomData(nPoint),
        this.getRandomData(nPoint),
      ],
    };
  }

  private getDataForYearPeriod(): ProfitChart {
    const nPoint = this.year.length;

    return {
      chartLabel: this.year,
      data: [
        this.getRandomData(nPoint),
        this.getRandomData(nPoint),
        this.getRandomData(nPoint),
      ],
    };
  }

  private getRandomData(nPoints: number): number[] {
    return Array.from(Array(nPoints)).map(() => {
      return Math.round(Math.random() * 500);
    });
  }

  getProfitChartData(period: string): ProfitChart {
    return this.data[period];
  }
}
