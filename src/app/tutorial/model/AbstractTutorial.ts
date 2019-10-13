import { ITutorial, Scene } from './ITutorial';

export class AbstractTutorial implements ITutorial {

    id: string;
    currentScene: Scene;

    constructor(public scenes: Scene[] = []) {
        this.currentScene = this.scenes.length > 0 ? this.scenes[0] : null;

        if (!this.currentScene) {
            console.log("creating: Tutorial has no scenes.");
            // throw new Error("creating: Tutorial has no scenes.");
        }
    }

    public start(): void {
        if(this.scenes.length === 0) {
            return;
        }

        // add transparent background (masked to highlight elements) (if not exists)
        

        this.currentScene = this.scenes[0];
        this.currentScene.start();
        console.log("starting tut");
    }

    public skip(): void {
        this.currentScene.stop();
    }

    public next(): void {
        const sceneIndex = this.scenes.indexOf(this.currentScene);
        const nextSceneIndex = sceneIndex + 1 < this.scenes.length - 1 ?
            sceneIndex + 1 : 0;

        this.currentScene.stop();
        this.currentScene = this.scenes[nextSceneIndex];
        this.currentScene.start();
    }

    public previous(): void {
        const sceneIndex = this.scenes.indexOf(this.currentScene);
        const nextSceneIndex = sceneIndex - 1 >= 0 ?
            sceneIndex - 1 : this.scenes.length - 1;

        this.currentScene.stop();
        this.currentScene = this.scenes[nextSceneIndex];
        this.currentScene.start();
    }

}