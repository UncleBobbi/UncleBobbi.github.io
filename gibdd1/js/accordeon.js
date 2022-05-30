/*   $('.accordeon__item').on('click', function(event) {
    
        console.log(self);
        $(this).toggleClass('open');
        if ($(this).hasClass('open')){
          $(this).find('p').slideDown(500);
        }
        else {$(this).find('p').slideUp(500);}
    }); */


    function accordeon() {
    $('.accordeon__title').on('click', (event) => {
        let self = event.target,
            item = $(self).closest('.accordeon__item');

        $('.accordeon__item').not(item).removeClass('open');
        // console.log(self);
        item.toggleClass('open');
    });
}
accordeon();