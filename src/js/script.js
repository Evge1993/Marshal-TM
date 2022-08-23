$(document).ready(function(){

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    }

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    $('a[href^="#"], *[data-href^="#"]').on('click', function(e){
        e.preventDefault();
        var t = 700;
        var d = $(this).attr('data-href') ? $(this).attr('data-href') : $(this).attr('href');
        $('html,body').stop().animate({ scrollTop: $(d).offset().top }, t);
        });

    $('.header__burger').click(function(event) {
        $('.header__burger,.header__menu').toggleClass('active');
        $('body').toggleClass('lock');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    "use strict";
    const form = document.getElementById("form");
    form.addEventListener("submit", formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {
            form.classList.add("_sending");
            let response = await fetch("send.php", {
                method: "POST",
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove("_sending");
            } else {
                alert("Ошибка");
                form.classList.remove("_sending");
            }
        } else {
            alert("Заполните обязательные поля, помеченные *");
        }
    }

    function formValidate(form) {
        let error = 0;
        let formReq = document.querySelectorAll("._req");

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains("_email")) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++;
            } else {
                if (input.value === "") {
                    formAddError(input);
                    error++;
                }
            }
        }
        return error;
    }

    function formAddError(input) {
        input.parentElement.classList.add("_error");
        input.classList.add("_error");
    }
    function formRemoveError(input) {
        input.parentElement.classList.remove("_error");
        input.classList.remove("_error");  
    }

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    }
});
