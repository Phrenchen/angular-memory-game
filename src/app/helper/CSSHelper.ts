/**
 * - provides easy access to CSS Variables
 */
export class CSSHelper {

    private static bodyStyle: any;


    public static stageWidth(): number {
        return document.body.clientWidth as number;
    }

    public static stageHeight(): number {
        return document.body.clientHeight as number;
    }

    public static stageCenterX(): number {
        return document.body.clientWidth * .5 as number;
    }

    public static stageCenterY(): number {
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

export enum CSSVariable {
    boardColumnCount = '--board-column-count',
    boardRowCount = '--board-row-count'
}
