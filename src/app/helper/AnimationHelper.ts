import { TweenMax, Power3 } from 'gsap';
import { MemoryCard } from '../model/MemoryCard';

export class AnimationHelper {

    public static animateCards(cards: MemoryCard[], config: AnimationConfig, completeCallback: Function, delay: number = 500): any {
        let counter = 0;

        const interval = setInterval(() => {
            // set start values to current state
            const htmlElement: HTMLElement = cards[counter].htmlElement;
            // config.fromVars['width'] = htmlElement.style.width;
            // config.fromVars['height'] = htmlElement.style.height;
            // config.fromVars['opacity'] = htmlElement.style.opacity;

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

    public static tween(element: HTMLElement, config: AnimationConfig, completeCallback: Function = null): boolean {
        if(!element) {
            console.log('AnimationHelper.tween: received no element. aborting.');
            return false;
        }

        const fromVars = config.fromVars;
        let toVars = config.toVars;
        let duration = config.duration;

        config.fromVars['width'] = element.style.width ? element.style.width : '100%';
        config.fromVars['height'] = element.style.height ? element.style.height : '100%';
        config.fromVars['opacity'] = element.style.opacity ? element.style.opacity : '0';
        
        // console.log('element.style: ', element.style.width, element.style.height, element.style.opacity);
        // console.log(config);

        if (completeCallback) {
            toVars['onComplete'] = completeCallback;
        }

        if (!fromVars || !toVars) {
            console.log('missing arguments for Tweening: ', config, fromVars, toVars);
            return;
        }

        TweenMax.fromTo(element, duration, fromVars, toVars);
        return true;
    }
}

export enum AnimationEnum {
    FADE_IN = 'fade-in',
    FADE_OUT = 'fade-out',
    TO_DEFAULT = 'to-default',
    HIGHLIGHT = 'highlight'
}


export class AnimationConfig {
    private static defaultTweenDuration = 0.3;

    private static fadeIn: AnimationConfig = {
        name: 'fade in',
        duration: AnimationConfig.defaultTweenDuration,
        fromVars: {
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
        name: 'fade out',
        duration: AnimationConfig.defaultTweenDuration,
        fromVars: {
            opacity: 1,
            ease: Power3.easeOut,
        },
        toVars: {
            opacity: 0,
            ease: Power3.easeOut,
        }
    }

    private static toDefault: AnimationConfig = {
        name: 'to default',
        duration: AnimationConfig.defaultTweenDuration,
        fromVars: {
            ease: Power3.easeOut,
        },
        toVars: {
            opacity: 1,
            // width: '100%',
            // height: '100%',
            ease: Power3.easeOut,
        }
    }

    private static highlight: AnimationConfig = {
        name: 'highlight',
        duration: AnimationConfig.defaultTweenDuration,
        fromVars: {
            yoyo: true,
            repeat: 1,
            opacity: 1,
            ease: Power3.easeOut,
        },
        toVars: {
            yoyo: true,
            repeat: 1,
            opacity: .5,
            width: '105%',
            height: '105%',
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
        if(!config) {
            console.log('no config found for: ', configType);
        }
        return config;
    }

    public name: string;
    public fromVars: Object;
    public toVars: Object;
    public duration: number = .3;

    constructor() { }
}
