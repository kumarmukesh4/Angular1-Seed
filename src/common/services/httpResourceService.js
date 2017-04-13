
/**
 * This service will be responsible to make http(AJAX) requests to the server
 */
angular.module('hotstar.main')
    .factory('httpResourceService', ['$http', 'appConfig', 'authService','localStorageService','commonUtilitiesService','constants','relativeURLConfig', '$state', '$rootScope', '$location', 'broadcastService', 'broadcastConfig',
        function($http, appConfig, authService , localStorageService ,commonUtilitiesService,constants,relativeURLConfig, $state, $rootScope, $location, broadcastService, broadcastConfig){

        /**
         * @name - prepareRequestWithAuthHeader
         * Prepare the request object with authentication header
         * @param requestURL - The url of the request
         * @param method - The method of the request
         * @param errorCallback - the error callback in case the auth header is not found
         * @param isAuthenticationNotRequired - Boolean to check if authentication header is required to send to the api or not
         * @returns {*}
         */
        var prepareRequestWithAuthHeader = function(requestURL, method, errorCallback, isAuthenticationNotRequired) {
            var request = {
                method: method,
                url: requestURL
            };
           if (!isAuthenticationNotRequired) {
                var authData = localStorageService.get(constants.AUTHORIZATION_DATA);

                if (!authData) {
                    errorCallback({message: constants.AUTHENTICATION_DATA_NOT_FOUND});
                    return null;
                }
                request.headers = {
                    'Authorization': constants.AUTHORIZATION_HEADER + authData.token
                };
            }
            return request;
        };

        var makeHttpRequest = function(request, successCallback, errorCallback){
            if( 'params' in request ) {
                request.params = {"params": request.params};
            }
            $http(request).
                success(successCallback).
                error(function(data, status, headers, config){
                   // console.log($state);
                     console.log("{\"status\": " + status + ", \"errorDetails\": " + (data) + "}");
                    switch (status)
                    {
                        case 0:
                            /*var browserInfo = browserDetectService.getBrowserInfo();
                            if (browserInfo.nameWithVersion.toLowerCase() == "ie10"){
                                authService.refreshAuthToken(function() {
                                    makeHttpRequest(request, successCallback, errorCallback)
                                }, errorCallback);
                            } else{
                                //Execute the error callback
                                errorCallback(data, status, headers, config);
                            }*/
                           // $state.go("relogin");
                            $rootScope.reloadPage = true;
                            errorCallback(data, status, headers, config);
                            break;
                        case 400:
                              $state.go('error');
                              errorCallback(data, status, headers, config);
                            break;
                        case 401:
                        /*authService.refreshAuthToken(function() {
                         makeHttpRequest(request, successCallback, errorCallback)
                         }, errorCallback);*/

                        //getWithCompleteUrl(appConfig.BASE_URL_API + relativeURLConfig.LOG_OUT, function(response){
                        //    //calling logout function
                        //    commonUtilitiesService.logout('login');
                        //}, function(error){
                        //    //error
                        //    commonUtilitiesService.logout('login');
                        //},true);


                            if(data.error === 'invalid_token') {
                                $state.go("relogin");
                            }else{
                               // $state.go('error');
                            }

                            errorCallback(data, status, headers, config);
                        break;
                        case 404:
                            errorCallback(data, status, headers, config);
                            $rootScope.prevURL = ($location.path()).replace('/', '');

                            console.log(data.error);
                            $state.go("relogin");
                           // $state.go('error');

                            break;
                        default :
                            errorCallback(data, status, headers, config);
                    }
                });
        };

        /**
         * @name - getWithCompleteUrl
         * Will make a get request with complete url, without appending anything to the url
         * @param requestURL - The complete request url
         * @param successCallback - The success callback function, that will be executed on get success
         * @param errorCallback - the callback function, that will be executed on get failure
         * @param params - Extra params to be passed to the request
         * @param isAuthenticationNotRequired - Boolean to check if authentication header is required to send to the api or not
         */
        var getWithCompleteUrl = function(requestURL, successCallback, errorCallback, params, isAuthenticationNotRequired){
            var request = prepareRequestWithAuthHeader(requestURL, "GET", errorCallback, isAuthenticationNotRequired);
            if(request === null) {
                return;
            }
            request.params = params;



            makeHttpRequest(request, successCallback, errorCallback);
        };

        /**
         * @name - postWithCompleteUrl
         * @param requestURL - Complete url to be passed to the request
         * @param postData - The post data
         * @param successCallback - The callback function to be executed on post success
         * @param errorCallback - The callback function to be executed on post failure
         * @param isAuthenticationNotRequired - Boolean to check if authentication header is required to send to the api or not
         */
        var postWithCompleteUrl = function(requestURL, postData, successCallback, errorCallback, isAuthenticationNotRequired){
            var request = prepareRequestWithAuthHeader(requestURL, "POST", errorCallback, isAuthenticationNotRequired);
            if(request === null) {
                return;
            }
            request.data = postData;

            makeHttpRequest(request, successCallback, errorCallback);
        };

		return {
			/**
			 * The method for HTTP GET
			 * @param url - URL of server
			 * @param successCallback - The callback function that will be executed for successful request
             * @param errorCallback - The callback function that will be executed for failed request
             * @param params - Extra params to be passed with request
             * @param isAuthenticationNotRequired - Boolean to check if authentication header is required to send to the api or not
			 */
			get: function(url, successCallback, errorCallback, params, isAuthenticationNotRequired){
                var requestURL = appConfig.BASE_URL_API + url;
                getWithCompleteUrl(requestURL, successCallback, errorCallback, params, isAuthenticationNotRequired);

			},
			
			/**
			 * The method to fetch local resources
			 *	@url - URL of local resource
			 *  @successCallback - The callback function that will be executed for successful request
			 *  @errorCallback - The callback function that will be executed for failed request
			 */
			getLocalResource: function(url, successCallback, errorCallback){
				$http.get(url).then(successCallback,
                    function(data, status, headers, config){
                        //loggingService.error("{\"status\": " + status + ", \"errorDetails\": " + JSON.stringify(data) + "}");
                        errorCallback(data, status, headers, config);
                    });
			},

            /**
             * The method for HTTP POST
             * @param url - URL of server
             * @param postData - Body data
             * @param successCallback - The callback function that will be executed for successful request
             * @param errorCallback - The callback function that will be executed for failed request
             * @param isAuthenticationNotRequired - Boolean to check if authentication header is required to send to the api or not
             */
            post: function(url, postData, successCallback, errorCallback, isAuthenticationNotRequired){

                var requestURL = appConfig.BASE_URL_API + url;
                postWithCompleteUrl(requestURL, postData, successCallback, errorCallback, isAuthenticationNotRequired);
            },

            /**
             * The method for HTTP PUT
             * @param url - URL of server
             * @param postData - Body data
             * @param successCallback - The callback function that will be executed for successful request
             * @param errorCallback - The callback function that will be executed for failed request
             * @param isAuthenticationNotRequired - Boolean to check if authentication header is required to send to the api or not
             */
            put: function (url, postData, successCallback, errorCallback, isAuthenticationNotRequired){
                var requestURL = appConfig.BASE_URL_API + url;

                var request = prepareRequestWithAuthHeader(requestURL, "PUT", errorCallback, isAuthenticationNotRequired);
                if(request === null) {
                    return;
                }
                request.data = postData;

                makeHttpRequest(request, successCallback, errorCallback);
            },


            /**
             * The method for HTTP PATCH
             * @param url - URL of server
             * @param data - Body data
             * @param successCallback - The callback function that will be executed for successful request
             * @param errorCallback - The callback function that will be executed for failed request
             * @param isAuthenticationNotRequired - Boolean to check if authentication header is required to send to the api or not
             */
            patch: function (url, data, successCallback, errorCallback, isAuthenticationNotRequired){
                var requestURL = appConfig.BASE_URL_API + url;

                var request = prepareRequestWithAuthHeader(requestURL, "PATCH", errorCallback, isAuthenticationNotRequired);
                if(request === null) {
                    return;
                }
                request.data = data;

                makeHttpRequest(request, successCallback, errorCallback);
            },
            /**
             * The method for HTTP DELETE
             * @param url - URL of server
             * @param successCallback - The callback function that will be executed for successful request
             * @param errorCallback - The callback function that will be executed for failed request
             * @param isAuthenticationNotRequired - Boolean to check if authentication header is required to send to the api or not
             */
            deleteD: function (url, successCallback, errorCallback, isAuthenticationNotRequired){
                var requestURL = appConfig.BASE_URL_API + url;

                var request = prepareRequestWithAuthHeader(requestURL, "DELETE", errorCallback, isAuthenticationNotRequired);
                if(request === null) {
                    return;
                }

                makeHttpRequest(request, successCallback, errorCallback);
            }
/*
            ,
            downloadZipFile: function(url, successCallback, errorCallback){
                var browserInfo = browserDetectService.getBrowserInfo();
                if(browserInfo.isMobileOrTablet){
                    window.open(url, "_blank");
                    successCallback();
                } else {
                    var expectedMediaType = "application/x-zip-compressed";
                    var fileName = url.substring(url.lastIndexOf("/") + 1);
                    $http.get(url, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': expectedMediaType
                        },
                        responseType: "arraybuffer"
                    })
                        .then(function (response) {
                            console.log("File download response");
                            var blob = new Blob([response.data], {type: expectedMediaType});
                            saveAs(blob, fileName);
                            if (successCallback) {
                                successCallback();
                            }
                        }, function () {
                            if (errorCallback) {
                                errorCallback();
                            }
                        });
                }
            }*/
        };
	}]);