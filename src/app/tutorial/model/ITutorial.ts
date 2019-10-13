/**
	Kette von Erklärungs-Schritten
*/
export interface ITutorial {
    id: string,
    scenes: Scene[]
    currentScene: Scene;

    start(): void;
    skip(): void;   // cancel tutorial

    next(): void;
    previous(): void;

}

/** 
    Ein Schritt
*/ 
export interface Scene {
    id: string,
    target: HTMLElement[],

    // content
    titleHtmlStr: string,
    descriptionHtmlStr: string,
    detailsHtmlStr: string

    start(): void;
    stop(): void;
}