import { Component, OnInit } from '@angular/core';
import { CSSHelper } from 'src/app/helper/CSSHelper';
import { MathHelper } from 'src/app/helper/MathHelper';
import { SVGHelper } from 'src/app/helper/SVGHelper';
import { AnimationHelper } from 'src/app/helper/AnimationHelper';
import { Rectangle } from 'src/app/helper/model/Rectangle';

@Component({
  selector: 'app-animated-background',
  templateUrl: './animated-background.component.html',
  styleUrls: ['./animated-background.component.scss']
})
export class AnimatedBackgroundComponent implements OnInit {

  private fancySVGs: SVGSVGElement[] = [];

  constructor() { }

  ngOnInit() {
    this.addFancySVGs();
  }
  // LIFE CYCLE end
  
  addFancySVGs() {
    // add small rectangle
    const bodyStyle = getComputedStyle(document.body);
    let stopColor1 = bodyStyle.getPropertyValue('--main-primary-color');
    let stopColor2 = bodyStyle.getPropertyValue('--main-secondary-color');
    let svgCount = 40;
    let svg: SVGSVGElement;

    let rangeX = CSSHelper.stageWidth() * .4;
    let rangeY = CSSHelper.stageHeight() * .4;

    let left = CSSHelper.stageCenterX() - rangeX;
    let right = CSSHelper.stageCenterX() + rangeX;

    let top = CSSHelper.stageCenterY() - rangeY;
    let bottom = CSSHelper.stageCenterY() + rangeY;

    // size
    let minWidth = 150;
    let maxWidth = 500;
    let minHeight = 150;
    let maxHeight = 700;
    let svgWidth: number;
    let svgHeight: number;
    const backgroundContainer: HTMLElement = document.getElementById('animated-background-container');

    // for each svg
    for(let i=0; i<svgCount; i++) {
      svgWidth = MathHelper.getRandomInt(minWidth, maxWidth);
      svgHeight = MathHelper.getRandomInt(minHeight, maxHeight);

      svg = SVGHelper.createSVG(svgWidth, svgHeight, stopColor1, stopColor2);
      svg.style.position = 'fixed';

      svg.style.left = MathHelper.getRandomInt(left, right) - svgWidth * .5 + 'px';
      svg.style.top = MathHelper.getRandomInt(top, bottom) - svgHeight * .5 + 'px';
      // svg.style.zIndex = '1000';

      this.fancySVGs.push(svg);
      backgroundContainer.appendChild(svg);

      // animate endlessly
      this.animateSVG(svg, {
        left: 0,
        top: 0,
        right: CSSHelper.stageWidth(),
        bottom: CSSHelper.stageHeight()
      });
    }
  }

  /**
   * - moves an SVG to a random position.
   * - seeks new target upon arrival
   * @param svg 
   * @param viewport 
   */
  private animateSVG(svg: SVGSVGElement, viewport: Rectangle): void {
    const x = MathHelper.getRandomInt(viewport.left, viewport.right);
    const y = MathHelper.getRandomInt(viewport.top, viewport.bottom);
    const delay = MathHelper.getRandomInt(0, 3000);
    const duration = MathHelper.getRandomInt(1, 30);

    setTimeout(() => {
      AnimationHelper.tweenSVGToPosition(svg, x, y, duration, () => {
        // console.log('tween complete');
        this.animateSVG(svg, viewport);
      });
    }, delay);
  }

}
