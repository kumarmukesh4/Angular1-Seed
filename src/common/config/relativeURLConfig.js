/**
 * @name relativeURLConfig
 * @desc every API request contains a base url and relative URL, relative url will be stored in form a constants here
 */
angular.module('hotstar.main').constant(
    'relativeURLConfig', {
        AUTH_TOKEN:"oauth/token",
        LOG_OUT:"authentication/logout"
    }
);