// console.log('TATTOO');
// const number = 9
//
// console.log(number);
//
// number = 15
//
// console.log(number);

function uploadYoutubeVideo() {

    $(".js-youtube").each(function () {
        $(this).css('background-image', 'url(http://i.ytimg.com/vi/' + $(this).attr('id') + '/sddefault.jpg)');
        $(this).append($('<div class="video__play" />'));
    });

    $('.video__play').on('click', function () {
        let wrapp = $(this).closest('.js-youtube'),
        videoId = wrapp.attr('id'),
        iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";

        if ($(this).data('params')) iframe_url += '&' + $(this).data('params');

        let iframe = $('<iframe/>', {
            'frameborder': '0',
            'src': iframe_url,
            'allow': "autoplay"
        })

        $(this).closest('.video__wrapper').append(iframe);

    });
}
uploadYoutubeVideo();


const iconMenu = document.querySelector('.menu__icon');
if (iconMenu){
    const menu = document.querySelector('.menu');
    iconMenu.addEventListener("click", function (e){
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menu.classList.toggle('_active');
        })
  }

  /* $('.grid__item').slick(); */

