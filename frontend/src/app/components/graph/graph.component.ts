import { Component } from '@angular/core';
import { ChartData, ChartOptions,ChartType } from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule,BaseChartDirective],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent {
  // Example data
  private rawData = [
    { "date": "2024-08-07T00:00:00.000Z", "time": "2 hr 30" },
    { "date": "2024-08-08T00:00:00.000Z", "time": "2 hr 30 m" },
    { "date": "2024-08-09T00:00:00.000Z", "time": "2 hr 40 m" },
    { "date": "2024-08-10T00:00:00.000Z", "time": "3 hr 40 m" }
  ];

  // Convert time strings to minutes
  private convertTimeToMinutes(timeStr: string): number {
    let hours = 0;
    let minutes = 0;
    
    // Extract hours and minutes from the time string
    const hourMatch = timeStr.match(/(\d+) hr/);
    const minuteMatch = timeStr.match(/(\d+) m/);

    if (hourMatch) {
      hours = parseInt(hourMatch[1], 10);
    }
    if (minuteMatch) {
      minutes = parseInt(minuteMatch[1], 10);
    }

    return (hours * 60) + minutes;
  }

  public lineChartData: ChartData<'line'> = {
    labels: this.rawData.map(entry => new Date(entry.date).toLocaleDateString()), // Format dates
    datasets: [{
      label: 'Amount of Time (minutes)',
      data: this.rawData.map(entry => this.convertTimeToMinutes(entry.time)), // Convert time to minutes
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: true
    }]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'll', // Adjust the format for tooltips
        },
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount of Time (minutes)'
        }
      }
    },
    plugins: {
      legend: {
        display: true
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `Amount of Time: ${tooltipItem.raw} minutes`;
          }
        }
      }
    }
  };
}
