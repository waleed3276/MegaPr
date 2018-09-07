
App.service('RequestService', function ($http, $q) {

    // Return public API.
    return {
        JsonCallParam: function (Controller, Action, Parameters) {
            var res = {};
            $.ajax({
                type: "POST",
                traditional: true,
                async: false,
                cache: false,
                url: '/' + Controller + '/' + Action,
                context: document.body,
                data: Parameters,
                success: function (json) {
                    res = json;
                },
                error: function (xhr) {
                    res = xhr;
                }
            });
            
            return res;
        },
        JsonCall: function (Controller, Action) {
            var res = {};
            $.ajax({
                type: "POST",
                traditional: true,
                async: false,
                cache: false,
                url: '/' + Controller + '/' + Action,
                context: document.body,
                success: function (json) {
                    res = json;
                },
                error: function (xhr) {
                    res = xhr;
                }
            });
            return res;
        }
    };

});