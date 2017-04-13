
/**
 * This module will provide services for handling the logging activities within the application
 * This service has five methods debug(),warn(),error(),info(),log()
 */
angular.module('hotstar.main')
/**
 * Factory provides methods that will be used for logging of messages
 */
.factory("loggingService", ['$log', function($log){
		
	
	return {
		/**
		 * Function will log the message as debug mode
		 *	@message - This will be the message to be logged
		 */
		debug: function(message){
			$log.debug(message);
			
		},
		/**
		 * Function will log the message as warning mode
		 *	@message - This will be the message to be logged
		 */
		warn: function(message){
			$log.warn(message);
		},
		/**
		 * Function will log the message as information mode
		 *	@message - This will be the message to be logged
		 */
		info: function(message){
			$log.info(message);
			
		},
		/**
		 * Function will log the message as error mode
		 *	@message - This will be the message to be logged
		 */
		error: function(message){
			$log.error(message);
		},
		/**
		 * Function will log the message as Normal logging to console
		 *	@message - This will be the message to be logged
		 */
		log: function(message){
			$log.log(message);
		}
		
	};
  }]);