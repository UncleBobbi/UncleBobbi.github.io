function accordeon() {
    $('.accordeon__item').on('click', (event) => {
        let self = event.target,
            item = $(self).closest('.accordeon__item');

        $('.accordeon__item').not(item).removeClass('open');
        // console.log(self);
        item.toggleClass('open');
    });
}
accordeon();