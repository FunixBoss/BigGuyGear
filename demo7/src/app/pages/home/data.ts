import { sliderOpt } from 'src/app/shared/data';

export const introSlider = {
    ...sliderOpt,
    nav: false,
    loop: false,
}

export const testiSlider = {
    ...sliderOpt,
    nav: false,
    dots: true,
    margin: 20,
    loop: true,
    responsive: {
        1420: {
            nav: true
        }
    }
}

export const productSlider = {
    ...sliderOpt,
    nav: false,
    dots: true,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 2,
            margin: 10
        },
        375: {
            items: 2,
            nav: false
        },
        480: {
            items: 2
        },
        768: {
            items: 3
        },
        992: {
            items: 4
        },
        1200: {
            items: 5
        }
    }
}

export const blogSlider = {
    ...sliderOpt,
    nav: false,
    dots: false,
    margin: 20,
    loop: false,
    responsive: {
        0: {
            items: 1
        },
        480: {
            items: 2
        },
        992: {
            items: 3
        },
        1200: {
            items: 4
        }
    }
}

export const brandSlider = {
    nav: false,
    dots: false,
    margin: 0,
    loop: false,
    responsive: {
        0: {
            items: 2
        },
        420: {
            items: 3
        },
        600: {
            items: 4
        },
        900: {
            items: 5
        },
        1024: {
            items: 6
        },
        1360: {
            items: 7
        }
    }
}