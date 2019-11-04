import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  
  private urls: string[] = this.createImageUrls();
  
  constructor() { }
  
  public getUrl(index: number): string {
    if(index < 0 || index > this.urls.length - 1) {
      return '';
    }
    
    return this.urls[index];
  }
  
  public get imageUrls(): string[] {
    return this.urls;
  }
  
  private createImageUrls(): string[] {
    const urls: string[] = [];
    const numImages = 6;
    const imageBase = './assets/curious_zelda/';
    let url: string;
    
    for(let i=1; i<=numImages; i++) { // image urls start at 1
      url = imageBase + 'curious_zelda_' + i + '_portrait.png';
      urls.push(url);
    }
    
    return urls;
  }
}
