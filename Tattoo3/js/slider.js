function slider() {
    let currentSlide = 0,
        slideCount = $('.slider__item').length;

        // console.log(slideCount);

    $('.slider__next').on('click', () => {
        currentSlide++;


        if (currentSlide === slideCount) {
            currentSlide = 0;
        }
        swichSlide();
    });

    $('.slider__prev').on('click', () => {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slideCount - 1;
        }
        swichSlide();

    })

    function swichSlide() {
        $('.slider__item').removeClass('current')
        $('.slider__item').each(function(index, el) {
            if (index === currentSlide) {
                $(el).addClass('current')
            }
        });
    }
}

slider();
