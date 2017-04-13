/**
 * This module will provide services for showing notification, error, info, warning in the application
 * This service has five methods success(),info(),warning(),error()
 */

angular.module('hotstar.main')
/**
 * Notification message configuration.
 */

/**
 * Factory provides methods that will be used for showing notification messages
 */
    .factory("notificationService", [ function () {
        return {
            /**
             * Function will display success notification
             *	@header - Heading of the notification message
             *	@content - Content of the notification message
             */
            success: function (header, content) {

            },
            /**
             * Function will display information notification
             *	@header - Heading of the notification message
             *	@content - Content of the notification message
             */
            info: function (header, content) {

            },
            /**
             * Function will display warning notification
             *	@header - Heading of the notification message
             *	@content - Content of the notification message
             */
            warning: function (header, content) {

            },
            /**
             * Function will display error notification
             *	@header - Heading of the notification message
             *	@content - Content of the notification message
             */
            error: function (header, content) {

            }
        };

    }
    ]);