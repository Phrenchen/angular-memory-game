import { TweenMax, Power3 } from 'gsap';
import { MemoryCard } from '../model/MemoryCard';

export class AnimationHelper {

    public static animateCards(cards: MemoryCard[], config: AnimationConfig, completeCallback: Function, delay: number = 500): any {
        let counter = 0;

        const interval = setInterval(() => {
            if (counter === cards.length - 1) {
                AnimationHelper.tween(cards[counter].htmlElement, config, () => {
                    if (completeCallback) {
                        completeCallback();
                    }
                });
            }
            else {
                AnimationHelper.tween(cards[counter].htmlElement, config);
            }

            counter++;
            if (counter === cards.length) {
                clearInterval(interval);
            }
        }, delay);

        return interval;
    }

    public static tween(element: HTMLElement, config: AnimationConfig, completeCallback: Function = null): void {
        const fromVars = config.fromVars;
        let toVars = config.toVars;
        let duration = config.duration;

        if (completeCallback) {
            toVars['onComplete'] = completeCallback;
        }

        if (!fromVars || !toVars) {
            console.log('missing arguments for Tweening: ', config, fromVars, toVars);
            return;
        }

        TweenMax.fromTo(element, duration, fromVars, toVars);
    }
}

export enum AnimationEnum {
    FADE_IN = 'fade-in',
    FADE_OUT = 'fade-out'
}


export class AnimationConfig {
    private static fadeIn: AnimationConfig = {
        duration: .3,
        fromVars: {
            width: 0,
            height: '100%',
            opacity: 0,
            ease: Power3.easeInOut,
        },
        toVars: {
            width: '100%',
            height: '100%',
            opacity: 1,
            ease: Power3.easeInOut,
        }
    }

    private static fadeOut: AnimationConfig = {
        duration: .3,
        fromVars: {
            ease: Power3.easeOut,
        },
        toVars: {
            opacity: 0,
            // width: 0,
            height: '30%',
            ease: Power3.easeOut,
        }
    }

    private static animationMap: Map<AnimationEnum, AnimationConfig> = AnimationConfig.setupConfigMap();

    private static setupConfigMap() {
        const map: Map<AnimationEnum, AnimationConfig> = new Map<AnimationEnum, AnimationConfig>();
        map.set(AnimationEnum.FADE_IN, AnimationConfig.fadeIn);
        map.set(AnimationEnum.FADE_OUT, AnimationConfig.fadeOut);
        return map;
    }

    public static getConfig(configType: AnimationEnum): AnimationConfig {
        return AnimationConfig.animationMap.get(configType);
    }

    public fromVars: Object;
    public toVars: Object;
    public duration: number = .3;

    constructor() { }


}


