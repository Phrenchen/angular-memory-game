import { Component, OnInit, Input } from '@angular/core';
import { MemoryCard, MemoryCardState } from 'src/app/model/MemoryCard';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.scss']
})
export class MemoryCardComponent implements OnInit {

  @Input() card: MemoryCard;
  
  constructor(private imageService: ImageService) { }

  ngOnInit() {
  }

  public get displayBack(): boolean {
    // return false;
    return this.card.state === MemoryCardState.COVERED;
  }
  
  public get displayFront(): boolean {
    return true;
    // return this.card.state === MemoryCardState.OPEN;
  }


  public imageUrl(partnerId: number): string {
    return this.imageService.getUrl(partnerId);
  }
}
