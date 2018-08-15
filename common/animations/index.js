import {
    Animated,
    Easing,
} from 'react-native';


class CommonAnimated {
    constructor() {
        this.state = {
            opacityList: [ 0, 1],
            duration: 300,
            easing: Easing.elastic(0.8),
        };
    }

    getState() {
        return {
            ...this.state,
        };
    }

    stop() {
        if (this.animated) {
            this.animated.stop();
            this.animated = null;
        }
    }

    toIn() {

    }

    toOut() {

    }
}


export class FadeAnimated extends CommonAnimated {
    constructor() {
        super();
        this.state = {
            ...this.state,
            scaleList: [0, 1],
        };

        this.state.opacity = new Animated.Value(this.getPropertyValue('opacity', true));
        this.state.scale = new Animated.Value(this.getPropertyValue('scale', true));
    }

    getPropertyValue(type, tag) {
        if (tag) {
            return this.state[type + 'List'][0];
        } else {
            return this.state[type + 'List'][1];
        }
    }

    toIn() {
        return this.fade(true);
    }

    toOut() {
        return this.fade(false);
    }

    fade(tag) {
        this.stop();
        this.state.opacity.setValue(this.getPropertyValue('opacity', tag));
        this.state.scale.setValue(this.getPropertyValue('scale', tag));

        this.animated = Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: this.getPropertyValue('opacity', !tag),
                duration: this.state.duration,
                easing: this.state.easing,
            }),

            Animated.timing(this.state.scale, {
                toValue: this.getPropertyValue('scale', !tag),
                duration: this.state.duration,
                easing: this.state.easing,
            }),
        ]);

        return new Promise((resolve) => {
            this.animated.start(() => {
                resolve('animated end');
            });
        }).catch((e) => {
            console.log(e);
        });
    }
}



export class SlideAnimated extends CommonAnimated {
    constructor() {
        super();

        this.state = {
            ...this.state,
            translateYList: [null, 0],
        };

        this.state.opacity = new Animated.Value(this.getPropertyValue('opacity', true));
        this.state.translateY = new Animated.Value(this.getPropertyValue('translateY', true));
    }

    reset(height) {
        const tmp = this.state.translateYList.concat();
        tmp.splice(0, 1, height);

        this.state = {
            ...this.state,
            translateYList: tmp,
        };
    }

    getPropertyValue(type, tag) {
        const tmp = tag ? this.state[type + 'List'][0] : this.state[type + 'List'][1];
        return tmp == null ? 0 : tmp;
    }

    toIn() {
        return this.slide(true);
    }

    toOut() {
        return this.slide(false);
    }

    slide(tag) {
        this.stop();
        this.state.opacity.setValue(this.getPropertyValue('opacity', tag));
        this.state.translateY.setValue(this.getPropertyValue('translateY', tag));

        return new Promise((resolve) => {
            if (this.state.translateYList[0] == null) {
                setTimeout(() => {
                    resolve('pre animated end');
                }, 100);
            } else {
                resolve('pre animated end');
            }
        }).then((ret) => {
            this.state.translateY.setValue(this.getPropertyValue('translateY', tag));

            this.animated = Animated.parallel([
                Animated.timing(this.state.opacity, {
                    toValue: this.getPropertyValue('opacity', !tag),
                    duration: this.state.duration,
                    easing: this.state.easing,
                }),

                Animated.timing(this.state.translateY, {
                    toValue: this.getPropertyValue('translateY', !tag),
                    duration: this.state.duration,
                    easing: this.state.easing,
                }),
            ]);

            return new Promise((resolve) => {
                this.animated.start(() => {
                    resolve('animated end');
                });
            }).catch((e) => {
                console.log(e);
            });
        }).catch((e) => {
            console.log(e);
        });

    }
}