import { TweenMax, Power3, Sine, Power0 } from 'gsap';
import { MemoryCard } from '../model/MemoryCard';
import { Rectangle } from './model/Rectangle';

export class AnimationHelper {

    // a) global switch for all devices
    // or b) skip tweens on mobile devices
    // currently, animations will be skipped, targetValues immediatly assigned and callback triggered, if any.
    private static animationsAreEnabled = true;


    public static get isMobile(): boolean {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }



    public static get enableAnimations(): boolean {
        return true;
        // return AnimationHelper.isMobile && AnimationHelper.animationsAreEnabled;
    }

    public static animateCards(cards: MemoryCard[], animationType: AnimationEnum, completeCallback: Function, delay: number = 500): any {
        let counter = 0;

        const interval = setInterval(() => {
            // set start values to current state
            const htmlElement: HTMLElement = cards[counter].htmlElement;
            // config.fromVars['width'] = htmlElement.style.width;
            // config.fromVars['height'] = htmlElement.style.height;
            // config.fromVars['opacity'] = htmlElement.style.opacity;

            if (counter === cards.length - 1) {
                AnimationHelper.tween(htmlElement, animationType, () => {
                    if (completeCallback) {
                        completeCallback();
                    }
                });
            }
            else {
                AnimationHelper.tween(htmlElement, animationType);
            }

            counter++;
            if (counter === cards.length) {
                clearInterval(interval);
            }
        }, delay);

        return interval;
    }

    public static tweenSVGToPosition(svg: SVGSVGElement, x: number, y: number, duration: number, completeCallback: Function = null): void {
        if (!AnimationHelper.enableAnimations) {
            return;
        }

        const fromVars = {
            // ease: Sine.easeInOut,
            ease: Power0.easeNone,
            left: svg.style.left,
            top: svg.style.top,
        };
        
        const toVars = {
            ease: Sine.easeInOut,
            // ease: Power0.easeNone,
            left: x,
            top: y,
        };

        if (completeCallback) {
            toVars['onComplete'] = completeCallback;
        }

        console.log(fromVars, toVars);
        TweenMax.fromTo(svg, duration, fromVars, toVars);


    }

    /**
     * - tweens to a statically defined state
     * - animations will be skipped on mobile
     * Skipping animations will cause:
     *  - targetValues immediatly assigned
     *  - callback triggered, if any
     */
    public static tween(element: HTMLElement, animationType: AnimationEnum, completeCallback: Function = null): boolean {

        if (!element) {
            console.log('AnimationHelper.tween: received no element. aborting.');
            return false;
        }

        const config: AnimationConfig = AnimationConfig.getConfig(animationType);

        if (!config) {
            console.log('no animation config found for: ', animationType);
            return;
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

        if (AnimationHelper.enableAnimations) {
            // assign all to-values
            // console.log('skipping animation -> assigning values: ', toVars);

            element.style.width = toVars['width'] ? toVars['width'] : element.style.width;
            element.style.height = toVars['height'] ? toVars['height'] : element.style.height;
            element.style.opacity = toVars['opacity'] ? toVars['opacity'] : element.style.opacity;

            // console.log('element.style.width: ' + element.style.width);
            // console.log('element.style.height: ' + element.style.height);
            // console.log('element.style.opacity: ' + element.style.opacity);

            if (completeCallback) {
                completeCallback();
            }


            // for (let key in toVars) {
            //     console.log('key: ' + key);
            //     console.log('value: ' + toVars[key]);
            //     console.log('element.style[key]: ' + element.style[key]);

            //     element.style[key] = toVars[key];
            // }

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
        if (!config) {
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
