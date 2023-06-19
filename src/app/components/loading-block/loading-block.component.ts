import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LoadingBlockService } from '../../shared/services/loading-block.service';

@Component({
  selector: 'app-loading-block',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './loading-block.component.html',
  styleUrls: ['./loading-block.component.scss'],
})
export class LoadingBlockComponent {
  loadingBlockService = inject(LoadingBlockService);
}
