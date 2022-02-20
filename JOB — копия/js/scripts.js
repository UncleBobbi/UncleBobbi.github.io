function renderJobsList() {
    const list = $('.jobs__list'),
        modal = $('#albumsModal');


    fetch('https://jsonplaceholder.typicode.com/albums/')
        .then(response => response.json())
        .then(json => {

            list.html('');

            json.forEach((item, i) => {
                if (i < 9) {
                    console.log(item);

                    list.append(`
                        <div class="jobs__item" data-id="${item.id}">
                            <picture class="jobs__pict">
                                <img src="img/jobs-1.jpg" alt="">
                            </picture>
                            <div class="jobs__descr">
                                <div class="jobs__label">Вид услуги</div>
                                <div class="jobs__name">${item.title}</div>
                                <a class="btn btn_small" href="#" data-title="${item.title}">Посмотреть</a>
                            </div>
                        </div>
                    `);

                }
            });
        })
        .finally(() => {
            console.log('finally')

            $('.jobs__item').each(function(index, el) {
                console.log(el.dataset.id);

                fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${el.dataset.id}`)
                    .then(album => album.json())
                    .then(albJson => {
                        console.log(albJson[0]);
                        $(el).find('img').attr('src', albJson[0].thumbnailUrl);
                        $(el).find('.btn_small').attr('href', albJson[0].url);
                    });
            });
        }

    );
        // .catch(err => {});

    $('body').on('click', '.jobs__list .btn', function(e) {
        e.preventDefault();
        let img = $(this).attr('href'),
            title = $(this).data('title');
        console.log('click');
        modal.find('.modal-body').html('<img src="'+img+'" >');
        modal.find('.modal-title').html(title);

        modal.modal('show');
    });
}
