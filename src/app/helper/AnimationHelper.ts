import { TweenMax, Power3 } from 'gsap';
import { MemoryCard } from '../model/MemoryCard';

export class AnimationHelper {

    public static animateCards(cards: MemoryCard[], config: AnimationConfig, completeCallback: Function, delay: number = 500): any {
        let counter = 0;

        const interval = setInterval(() => {
            // set start values to current state
            const htmlElement: HTMLElement = cards[counter].htmlElement;
            config.fromVars['width'] = htmlElement.style.width;
            config.fromVars['height'] = htmlElement.style.height;
            config.fromVars['opacity'] = htmlElement.style.opacity;

            console.log(config.fromVars);

            if (counter === cards.length - 1) {
                AnimationHelper.tween(htmlElement, config, () => {
                    if (completeCallback) {
                        completeCallback();
                    }
                });
            }
            else {
                AnimationHelper.tween(htmlElement, config);
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
    FADE_OUT = 'fade-out',
    TO_DEFAULT = 'default',
    HIGHLIGHT = 'highlight'
}


export class AnimationConfig {
    private static fadeIn: AnimationConfig = {
        duration: .3,
        fromVars: {
            // width: 0,
            // height: 0,
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
            opacity: 1,
            ease: Power3.easeOut,
        },
        toVars: {
            opacity: 0,
            // width: '30%',
            // height: '30%',
            ease: Power3.easeOut,
        }
    }

    private static toDefault: AnimationConfig = {
        duration: .3,
        fromVars: {
            ease: Power3.easeOut,
        },
        toVars: {
            opacity: 1,
            width: '100%',
            height: '100%',
            ease: Power3.easeOut,
        }
    }

    private static highlight: AnimationConfig = {
        duration: .3,
        fromVars: {
            ease: Power3.easeOut,
        },
        toVars: {
            opacity: 1,
            width: '110%',
            height: '110%',
            ease: Power3.easeOut,
        }
    }

    private static animationMap: Map<AnimationEnum, AnimationConfig> = AnimationConfig.setupConfigMap();

    private static setupConfigMap() {
        const map: Map<AnimationEnum, AnimationConfig> = new Map<AnimationEnum, AnimationConfig>();
        map.set(AnimationEnum.FADE_IN, AnimationConfig.fadeIn);
        map.set(AnimationEnum.FADE_OUT, AnimationConfig.fadeOut);
        map.set(AnimationEnum.TO_DEFAULT, AnimationConfig.toDefault);
        map.set(AnimationEnum.HIGHLIGHT, AnimationConfig.highlight);
        return map;
    }

    public static getConfig(configType: AnimationEnum): AnimationConfig {
        const config = AnimationConfig.animationMap.get(configType);
        console.log(config);
        return config;
    }

    public fromVars: Object;
    public toVars: Object;
    public duration: number = .3;

    constructor() { }


}


