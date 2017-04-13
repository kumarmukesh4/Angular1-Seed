
/**
 * @name - broadcastService
 * @desc - This service will be used to interact between modules.
 */
angular.module('hotstar.main')
	.factory('broadcastService', ['$rootScope', '$injector', function($rootScope, $injector){
		var notificationDataDictionary = {};
		
		return {
			/**
			* @name - notify
			* @desc - This function will notify all the other modules that an event is raised.
			* @key {string} - The notification/event id
			* @data {object} - The data to be sent with the notification
			* @
			*/
			/**
			* @name - notify
			* @desc - This function will notify all the other modules that an event is raised.
			* @param key - The notification/event id
			* @param data - The data to be sent with the notification
			* @param notificationFor - The array or string or just string, for which the notification is. Function will get the dependency from injector
			*/
			notify: function(key, data, notificationFor){
				//Will initialize the service if it is not already
				if(notificationFor){
                    if(angular.isArray(notificationFor)){
                        angular.forEach(notificationFor, function(item){
                            $injector.get(item);
                        });
                    } else {
                        $injector.get(notificationFor);
                    }
				}
				
				//Set the data 
				notificationDataDictionary[key] = data;
				
				//Broadcast the event
				$rootScope.$broadcast(key, data);
				
			},
			
			/**
			 * @name - getNotificationData
			 * @desc - The data for any notification sent earlier
			 * @key {string} - The notification/event id
			 * @return {object} - Data stored against the notification key, in the notificationDataDictionary
			 */
			getNotificationData: function(key){
				return notificationDataDictionary[key];
			}
		};
	}]);