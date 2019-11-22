import { Injectable, OnInit } from '@angular/core';


interface InputAction {
  callbacks: Function[],
  executedSinceLastKeyUp: boolean;
}

/**
 * map keyboard input to callback functions
 * IMPORTANT: callback signature: callback(isKeyDown: boolean)
 */
@Injectable({
  providedIn: 'root'
})
export class InputService {

  private actions: Map<string, InputAction> = new Map<string, InputAction>();

  constructor() {
    document.body.addEventListener('keydown', e => {
      this.executeActions(e.key, true);
    });

    document.body.addEventListener('keyup', e => {
      this.executeActions(e.key, false);
    });

  }

  private executeActions(key: string, isKeyDown: boolean) {
    key = key.toLowerCase();

    const inputAction: InputAction = this.actions.get(key);

    if (!inputAction) {
      return;
    }

    if (inputAction.executedSinceLastKeyUp && !isKeyDown ||
      !inputAction.executedSinceLastKeyUp && isKeyDown) {


      inputAction.executedSinceLastKeyUp = isKeyDown;
      inputAction.callbacks.forEach(cbFunction => {

        try {
          cbFunction(isKeyDown);
        }
        catch (e) {
          console.log('InputService error executing callback function for key: ' + key);
        }
      });
    }
  }

  // adds a callback only once for each key
  public addInput(key: string, callback: Function): void {
    key = key.toLowerCase();

    if (!this.actions.has(key)) {
      this.actions.set(key, {
        callbacks: [callback],
        executedSinceLastKeyUp: false
      });
    }
    else {
      if (!this.actions.get(key).callbacks.includes(callback)) {
        this.actions.get(key).callbacks.push(callback);
      }
    }
  }
}
