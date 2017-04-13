
/**
 * This service contains the common utilities functions, that will be used all over the application
 */
angular.module('hotstar.main')
	.factory('commonUtilitiesService', ['$rootScope','commonUtilitiesConfig', 'authService','broadcastService','broadcastConfig', 'ngDialog',
		function($rootScope , commonUtilitiesConfig, authService ,broadcastService, broadcastConfig, ngDialog){

		return {
			/**
			 * @name - encrypt
			 * @desc - This function will encrypt the passed string 
			 *	@stringToEncrypt {string} - string to encrypt
			 */
			encrypt: function(stringToEncrypt){
			}, 
			
			/**
			 * @name - decrypt
			 * @desc - This function will decrypt the passed string
			 *	@stringToDecrypt {string} - string to decrypt
			 */
			decrypt: function(stringToDecrypt){
			}, 
			
			/**
			 * @name - showLoader
			 * @desc - This function will show the loader at the center of the page
			 */
			showLoader: function(){
				broadcastService.notify(broadcastConfig.SHOW_LOADER);
			}, 
			
			/**
			 * @name - hideLoader
			 * @desc - This function will hide the loader from the page
			 */
			hideLoader: function(){
				broadcastService.notify(broadcastConfig.HIDE_LOADER);
			},
			/**
			 * @name - showMsgBox
			 * @desc - This function will show the message on the page
			 */
			showMsgBox: function(templateName,size) {
				broadcastService.notify(broadcastConfig.SHOW_MSG_BOX,{ templateName: templateName , size: size});
			},
			/**
			 * @name - hideMsgBox
			 * @desc - This function will hide the message on the page
			 */
			hideMsgBox: function(){
				broadcastService.notify(broadcastConfig.HIDE_MSG_BOX);
			},
			/**
			 * @name - hideMsgBox
			 * @desc - This function will load modal popup
			 */
			showModalPopup: function($scope, templatePath){

			},
			/**
			 * @name - showAppTour
			 * @desc - This function will show virtual information about modules on the page
			 */
			showAppTour : function () {

			},
			/**
			 * @name - logout
			 * @desc - This function will log out user from application
			 */
			logout: function (state) {
				authService.logOut(state);
			}
		};
	}]);