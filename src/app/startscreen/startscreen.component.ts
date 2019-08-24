import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit {

  public images: any[] = [];

  public selectedBoardSize = 'medium';
  // private imagePath;

  /*
  small:   4x4 = 16  cards total =>  8 pairs => use every card 2x => load 4 images
  medium:  6x6 = 36  cards total => 18 pairs => use every card xx => load x images
  large: 10x10 = 100 cards total => 50 pairs => use every card xx => load x images

   */

  private imageCount = {
    small: 4,
    medium: 18,
    large: 50
  };


  constructor() { }

  ngOnInit() {
  }


  imageSelected(files) {
    const fileCountToLoad = this.getRequiredFileCount(files, this.images, this.selectedBoardSize);

    for (let i = 0; i < fileCountToLoad; i++) {
      // console.log('loading selected image: ', files.item(i));
      this.loadImage(files.item(i), this.images);
    }
  }

  boardSizeSelected(event) {
    console.log('boardSizeSelected', this.selectedBoardSize);
  }

  private getRequiredFileCount(files: any, currentImagePool: any[], selectedBoardSize: any): number {
    console.log('current image count: ', this.images.length);
    console.log('selectedBoardSize: ', this.selectedBoardSize);
    console.log('selected file count: ', files.length);

    return files.length;
  }

  // pure :)
  private loadImage(file, imagePool: any[]) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = (event) => {
      imagePool.push(reader.result);
    };
  }
}
