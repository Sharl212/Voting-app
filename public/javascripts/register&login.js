console.log('Connected..');

$(function () {
    $('.register').submit(function (e) {
        e.preventDefault(e);
        $.ajax({
            url: "/register",
            type: 'post',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                username: $('input[type="text"]').val(),
                password: $('input[type="password"]').val()
            }),
            success: function (user) {
                console.log(user);
            },
            error: function (err, status, xhr) {
                console.log(err);
            }
        });
    });
})

$(function () {
    $('.login').submit(function (e) {
        e.preventDefault(e);
        $.ajax({
            url: "/login",
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify({
                username: $('input[name="text"]').val(),
                password: $('input[name="password"]').val()
            }),
            success: function (user) {
                console.log(user);
            },
            error: function (err, status, xhr) {
                console.log(err);
            }
        });
    });
})