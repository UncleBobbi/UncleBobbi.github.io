function setPadding(elem, container, direction){
    (function($) {
        if(
            direction !== 'top' ||
            direction !== 'right' ||
            direction !== 'bottom' ||
            direction !== 'left'
        ){
            direction = 'bottom';
        }
        container.css('padding-'+ direction, elem.outerHeight() + 'px');
    })(jQuery)
}
function clearPadding(container){
    (function($) {
        container.removeAttr('style');
    })(jQuery)
}

jQuery(document).ready(function($) {

    // Select
    if($('select').length) {
        var selectListItem = 1;
        $('select').each(function () {
            $(this).parent().append('<div id="select-list-'+selectListItem+'">');
            $(this).select2({
                'minimumResultsForSearch': 'Infinity',
                'dropdownParent': $('#select-list-'+selectListItem),
                'placeholder': $(this).data('placeholder')||'',
                'allowClear': true
            });
            selectListItem++;
        });
    }

    // РњР°СЃРєР° РґР»СЏ С‚РµР»РµС„РѕРЅР°
    $('input.mask-phone').mask('+7 (999) 999-99-99');

    // accordion РЅР° РіР»Р°РІРЅРѕР№
    $('#accordion').on('click', '.btn-link', function () {
        if($(this).attr('aria-expanded') === 'false'){
            $(this).closest('#accordion').find('.card').removeClass('open');
            $(this).closest('.card').addClass('open');
        }else {
            $(this).closest('#accordion').find('.card').removeClass('open');
        }
    });

    // form error
    $('input[required], select[required]').on('blur', function () {
        if($(this).val().length == 0) {
            $(this).addClass('error');
            $(this).closest('.field').find('.error-text').removeClass('hide');
        }
    });
    $('input[required], select[required]').on('focus', function () {
        $(this).removeClass('error');
        $(this).closest('.field').find('.error-text').addClass('hide');
    });
    $('.field .error-text').on('click', function () {
        $(this).addClass('hide');
    });

    // open menu
    $('.open-menu').on('click', function (e) {
        e.preventDefault();
        if($(this).hasClass('is-active')){
            $(this).removeClass('is-active');
            $('[data-target="'+$(this).attr('data-open')+'"]').removeClass('show');
            $('body').removeClass('overflow-h');
        }else {
            $(this).addClass('is-active');
            $('[data-target="'+$(this).attr('data-open')+'"]').addClass('show');
            $('body').addClass('overflow-h');
        }
    });
    $(document).on('keydown', function (e) {
        if (e.keyCode == 27) {
            $('.open-menu.is-active').each(function () {
                $('[data-target="'+$(this).attr('data-open')+'"]').removeClass('show');
                $(this).removeClass('is-active');
            });

            $('body').removeClass('overflow-h');
        }
    });

    // carousel
    if($(window).width() < 768){
        $('.carousel-mobile').owlCarousel({
            'items': 1,
            'loop': true,
            'nav': false,
            'margin': 20
        });
    }

    if($(window).width() < 992){
        setPadding($('footer .copy'), $('footer > .container'), 'bottom');
    }

    $(window).resize(function() {
        if($(window).width() < 768){
            $('.carousel-mobile').owlCarousel({
                'items': 1,
                'loop': true,
                'nav': false,
                'margin': 20
            });
        }else {
            $('.carousel-mobile').trigger("destroy.owl.carousel");
        }

        if($(window).width() < 992){
            setPadding($('footer .copy'), $('footer > .container'), 'bottom');
        }else {
            clearPadding($('footer > .container'));
        }
    });

});




// prepare the form when the DOM is ready
$(document).ready(function() {
    if ($('.mapHolder').length) {
        $('.mapHolder').each(function() {
            var f = document.createElement('iframe');
            f.src = $(this).attr('data-url');
            if ($(this).attr('data-height')) {
                f.height = $(this).attr('data-height');
            }
            $(this).append(f);
        })
    }

    $('[name="service"]').bind('change', function() {
        $(this).closest('.field').find('input').val($(this).find(':checked').val());
    })

    if ($('.getFeedbackFormDetailPage').length) {
        var service = $('.getFeedbackFormDetailPage').attr('data-service');
        $('[name="form_text_3"]').val(service);
        var userType = $('.getFeedbackFormDetailPage').attr('data-usertype');
        $('[name="form_text_4"]').val(userType);
        // РјРµРЅСЏРµРј РІС‹РїР°РґР°СЋС‰РёР№ СЃРїРёСЃРѕРє СЃ СѓСЃР»СѓРіР°РјРё РЅР° С‚РµРєСѓС‰СѓСЋ СѓСЃР»СѓРіСѓ
        if ($('[name="service"]').length) {
            $('[name="service"] optgroup').each(function () {
                if ($(this).attr('label') == userType) {
                    $('option', $(this)).each(function () {
                        if ($(this).val() == service) {
                            $(this).attr('selected', 'selected');
                            $(this).closest('select').change();
                        }
                    })
                }

            })
        }
    }


    var options = {
        beforeSubmit:  showRequest,
        success:       showResponse,

        // other available options:
        url:       '/ajax/index.php',
        type:      'post'
    };

    $('form').submit(function() {
        var form = $(this);
        if (!form.find('.statusHolder').length) {
            var action = 'submit';
            //grecaptcha.execute(recaptchaPublicKey, {action: action}).then(function(token) {
                //$(form).find('[name="action"]').val(action);
                //$(form).find('[name="token"]').val(token);
                $(form).ajaxSubmit(options);
            //});
        }
        return false;
    });

});

// pre-submit callback
function showRequest(formData, jqForm, options) {

    jqForm.find('.error').removeClass('error');
    jqForm.find('.error-text').addClass('hide');
    jqForm.append('<div title="Р—Р°РїСЂРѕСЃ РѕР±СЂР°Р±Р°С‚С‹РІР°РµС‚СЃСЏ" class="statusHolder"><div class="statusInner"></div></div>');
    return true;
}

// post-submit callback
function showResponse(responseText, statusText, xhr, $form)  {

    $form.find('.statusHolder').remove();
    var formHolder = $form.closest('.formHolder');
    try {
        var json = JSON.parse(responseText);

            // РµСЃР»Рё РµСЃС‚СЊ СЃРїРёСЃРѕРє РЅРµРІР°Р»РёРґРЅС‹С… РїРѕР»РµР№
            if(json.error){
                $.each(json.error, function (key, value) {
                    if (key == 'GLOBAL') {
                        alert(value);
                    } else {
                        var errorField = formHolder.find('[name="'+key+'"]');
                        errorField.closest('.field').find('.error-text').removeClass('hide').text(value);

                        errorField.addClass('error').bind('click', function(){
                            $(this).removeClass('error');
                            $(this).closest('.field').find('.error-text').addClass('hide');
                        });
                    }
                })
            } else {
                if(json.success){
                    formHolder.html('<div class="message">'+json.success+'</div>');
                    ga('send', 'event', 'form', 'otpravka_form');
                }else{
                    alert('РќРµРёР·РІРµСЃС‚РЅР°СЏ РѕС€РёР±РєР°, РїРѕРїСЂРѕР±СѓР№С‚Рµ РїРѕР·Р¶Рµ');
                }
            }
    } catch (e) {
        console.log(e);
    }
}