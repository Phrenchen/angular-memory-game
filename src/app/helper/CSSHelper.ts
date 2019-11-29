import { Rectangle } from './model/Rectangle';

/**
 * - provides easy access to CSS Variables
 */
export class CSSHelper {

    private static bodyStyle: any;
    
    public static get isPortraitMode(): boolean {
        return CSSHelper.stageWidth < CSSHelper.stageHeight;
    }

    public static convertToRectangle(clientRect: ClientRect): Rectangle {
        return {
            top: clientRect.top,
            left: clientRect.left,
            bottom: clientRect.bottom,
            right: clientRect.right,
        };
    }

    public static getFixedPositionOf(element: HTMLElement): Rectangle {
        let position: Rectangle = {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
        
        if(!element) {
            console.log('ERROR: Missing Element? calculating fixed position: no element ');
            return position;
        }

        const bodyRect: ClientRect = document.body.getBoundingClientRect();
        const coords: ClientRect = element.getBoundingClientRect();

        position.top = coords.top;  // implicit cast to custom 'Rectangle' class
        position.left = coords.left;  // implicit cast to custom 'Rectangle' class
        position.bottom = coords.bottom;  // implicit cast to custom 'Rectangle' class
        position.right = coords.right;  // implicit cast to custom 'Rectangle' class

        return position;
    }


    public static get stageWidth(): number {
        return document.body.clientWidth as number;
    }

    public static get stageHeight(): number {
        return document.body.clientHeight as number;
    }

    public static get stageCenterX(): number {
        return document.body.clientWidth * .5 as number;
    }

    public static get stageCenterY(): number {
        return document.body.clientHeight * .5 as number;
    }

    public static getVariable(key: CSSVariable): string {
        console.log('get CSS Variable: ', key);
        
        // const stopColor1 = CSSHelper.bodyStyle.getPropertyValue('--main-primary-color');
        const cssVariable = CSSHelper.bodyStyle.getPropertyValue(key);
        
        console.log('css variable: ', cssVariable);

        return cssVariable;
    }
    
    // only do this once
    public static init(): void {
        this.bodyStyle = getComputedStyle(document.body);
    }
}
setTimeout(() => {
    CSSHelper.init();
}, 0);

// list of modifyable css variables
export enum CSSVariable {
    boardColumnCount = '--board-column-count',
    boardRowCount = '--board-row-count'
}
