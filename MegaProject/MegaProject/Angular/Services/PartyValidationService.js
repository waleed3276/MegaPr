
App.service('PartyValidationService', function ($http, $q, RequestService) {
    // Return public API.
    return {

        ValidateViaCode: function (code) {
             var parm = {
                 Code:  JSON.stringify(code)
            };       
            var ret = RequestService.JsonCallParam('Product', 'Get_Party_Via_Code', parm);
            if (ret != '') {
               return ret;
            }
            return '';
        },
        ValidateViaMobile: function (Mobile) {
            var parm = {
                Mobile:  JSON.stringify(Mobile)
            };       
            var ret = RequestService.JsonCallParam('Product', 'Get_Party_Via_Mobile', parm);
            if (ret != '') {
                return ret;
            }
            return '';
        },
        ValidateViaName: function (Name) {
                var parm = {
                    Name: JSON.stringify(Name)
                };       
                var ret = RequestService.JsonCallParam('Product', 'Get_Party_Via_Name', parm);
                if (ret != '') {
                    return ret;
                }
                return '';
            }
    };

});