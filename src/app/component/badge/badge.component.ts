import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-badge',
  imports: [CommonModule],
  templateUrl: './badge.component.html',
  styleUrl: './badge.component.scss'
})
export class BadgeComponent {
  label = input.required<string>();
  type = input.required<string>();
  size = input.required<string>();
}

export type BadgeType = 'success' | 'error' | 'info' | 'warning' | 'neutral';
export type BadgeSize = 'small' | 'medium' | 'large';
