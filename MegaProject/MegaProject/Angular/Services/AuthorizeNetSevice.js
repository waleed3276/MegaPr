App.service('AuthorizeNetSevice', function ($http, $q) {
    this.Post = function (data) {
        var ret = { data: {}, status: false };
        $.ajax({
            type: "POST",
            traditional: true,
            async: false,
            cache: false,
            url: 'https://apitest.authorize.net/xml/v1/request.api',
            contentType: "application/json; charset=utf-8",
            context: document.body,
            data: data,
            success: function (json) {
                ret.data = json;
                ret.status = true;
            },
            error: function (xhr) {
            ret.data = xhr;
                ret.status = false;
            }
        });
        return ret;
    }
});