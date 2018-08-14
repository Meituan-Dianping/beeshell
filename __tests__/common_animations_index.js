import { FadeAnimated, SlideAnimated } from '../common/animations';

/* test/it */
test('basic use', () => {
    const fadeAnimated = new FadeAnimated();
    fadeAnimated.getState();
    fadeAnimated.toIn();
    fadeAnimated.toOut();


    const slideAnimated = new SlideAnimated();
    slideAnimated.toIn();
    slideAnimated.toOut();
});