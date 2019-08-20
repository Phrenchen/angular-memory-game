import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss']
})
export class StartscreenComponent implements OnInit {

  public images: any[] = [];

  private imagePath;


  constructor() { }

  ngOnInit() {
  }

  imageSelected(files) {
    this.loadImage(files);
  }

  private loadImage(files) {
    const reader = new FileReader();
    this.imagePath = files;

    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.images.push(reader.result);
    };

  }
}