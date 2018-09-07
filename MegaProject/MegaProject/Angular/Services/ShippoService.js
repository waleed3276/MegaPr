App.service('ShippoService', function ($http, $q) {
    this.Post = function (data) {
        var ret = { data: {}, status: false };
        $.ajax({
            type: "POST",
            traditional: true,
            async: false,
            cache: false,
            url: 'https://api.goshippo.com/shipments/',
            contentType: "application/json; charset=utf-8",
            headers: {
                "Authorization": "ShippoToken shippo_live_d3180ad5f5f697f018a6b2de27d79a1331ec6fa6"
            },
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