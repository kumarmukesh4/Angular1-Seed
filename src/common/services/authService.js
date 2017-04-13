
/**
 * This service contains the methods to authenticate the User and store and return the oAuth Token
 */
angular.module('hotstar.main')
    .factory('authService', ['$http', '$q','appConfig', 'relativeURLConfig', '$location', '$rootScope','loggingService',
        'localStorageService','constants','$state','broadcastService','broadcastConfig',
        function ($http, $q ,appConfig,relativeURLConfig ,$location, $rootScope , loggingService ,
                  localStorageService,constants,$state,broadcastService,broadcastConfig ) {

        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            userName : "",
            expiryTime:""
        };
        /**
         * This method will perform the login API request
         *	@userName - user id of the current user
         *  @password - password for the current user
         */
        var _login = function (userName, password) {

            var data = "grant_type=client_credentials&client_id="+ userName +"&client_secret=" + password;

            var deferred = $q.defer();

            $http.post(
                appConfig.BASE_URL_API + relativeURLConfig.AUTH_TOKEN , data, {
                headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                         }
                })
                .success(function (response) {

                var expDate = _refreshExpiryTimeLocalStorage(new Date());
                 localStorageService.set(constants.AUTHORIZATION_DATA, {token: response.access_token ,userName: userName ,expiryTime: expDate});

                _authentication.isAuth = true;
                _authentication.userName = userName;

                deferred.resolve(response);


            }).error(function (err, status) {

                _logOut();
                deferred.reject({
                    error: err,
                    status: status
                });
            });

            return deferred.promise;
        };

        /**
         *  @name - _refreshExpiryTimeLocalStorage
         *  @desc - This method will refresh the expiry time of local storage
         *	@date - date object to be manipulated
         *
         */
        var _refreshExpiryTimeLocalStorage = function (expDate){
            var expTime = expDate.getTime();
            expTime += 30 * 60 * 1000;
            return  expDate.setTime(expTime);
        };

        /**
         *  @name - _refreshAuthToken
         *  @desc - This method will refresh the auth token
         *	@successCallBack - A successcallback function will execute on success
         *  @errorCallBack - A errorCallBack function will execute in case of error
         */
        var _refreshAuthToken = function (successCallBack, errorCallBack){

           /* var data = "grant_type=refresh_token&client_id="+ appConfig.CLIENT_ID;

            var deferred = $q.defer();

            $http.post(
                        appConfig.BASE_URL_IDENTITY + relativeURLConfig.AUTH_TOKEN,
                        data, { headers: {
                                            'Content-Type': 'application/x-www-form-urlencoded'
                                        }
                                }
                        )

                .success(function (response) {

                    localStorageService.set(constants.AUTHORIZATION_DATA, response );

                    _authentication.isAuth = true;
                    _authentication.userName = loginData.userName;

                    deferred.resolve(response);
                    successCallBack();

                }).error(function (err, status) {
                    _logOut();
                    deferred.reject(err);
                    errorCallBack();
                });

            return deferred.promise; */

        };

        var unRegisterEventForLogout = null;

        /**
         *  @name - _logOut
         *  @desc - In case user doesn't have a valid auth or refresh token this funciton will logout the user
         *	@redirection - A redirection url after logout
         */
        var _logOut = function (redirection) {
            if(redirection == null) {
                $state.go('login');
            } else {
                $state.go(redirection);
            }

            if(unRegisterEventForLogout){
                unRegisterEventForLogout();
            }

            unRegisterEventForLogout = $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
                if (toState && toState.name === "login") {
                    localStorageService.remove(constants.AUTHORIZATION_DATA);
                    localStorageService.remove(constants.ACCOUNT_INFO);

                    _authentication.isAuth = false;
                    _authentication.userName = "";
                    broadcastService.notify(broadcastConfig.LOG_OUT, redirection);
               }
               // unRegisterEventForLogout();
            });


        };
        /**
         *  @name - _fillAuthData
         *  @desc - This function fill the authentication information from local storage
         */
        var _fillAuthData = function () {

            var authData = localStorageService.get(constants.AUTHORIZATION_DATA);
            if (authData)
            {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
            }

        };
        /**
         *  @name - _isLoggedIn
         *  @desc - Validate if user logged in
         */
        var _isLoggedIn = function(){
            var authData = localStorageService.get(constants.AUTHORIZATION_DATA);

            if(authData){
                var curTime = new Date();
                var expiryTime = new Date(authData.expiryTime);
                var tokenTimeDifference = ((expiryTime.getTime() - curTime.getTime())/1000) ;
                console.log(tokenTimeDifference);
                if(tokenTimeDifference > 0){
                    var expDate = _refreshExpiryTimeLocalStorage(new Date());
                    localStorageService.set(constants.AUTHORIZATION_DATA, {token: authData.token ,userName: authData.userName ,expiryTime: expDate});

                    return true;
                }else{
                    _logOut();
                    return false;
                }
            }
            return false;

        };


        authServiceFactory.login = _login;
        authServiceFactory.refreshAuthToken = _refreshAuthToken;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;
        authServiceFactory.isLoggedIn = _isLoggedIn;
        authServiceFactory.logOut = _logOut;


        return authServiceFactory;
    }]);


