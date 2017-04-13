/**
 * Routing Configuration of Application
 */
angular.module( 'hotstar.main')
    .config(function config ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

        // Lazy load configuration
        $ocLazyLoadProvider.config({
            events: true,
            debug: true,
            modules: [{
                    name: 'commonAssets',
                    files: [
                        "assets/css/less/main.css"
                    ]
                },
                {
                    name: 'loginModule',
                    files: [
                        'src/modules/login/login.js',
                        'assets/css/modules/login/login.css'
                    ]
                },
                {
                    name: 'dashboardModule',
                    files: [
                        'src/modules/dashboard/dashboard.js',
                        'assets/css/modules/dashboard/dashboard.css'
                    ]
                }
            ]
        });

        // Routing
        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                  "main": {
                      templateUrl: 'login/login.tpl.html',
                      controller: 'loginCtrl'
                  }
                },
                resolve: {
                    loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(['commonAssets','loginModule']);
                    }]
                },
                data: {
                  pageTitle: 'login'
                }
            })
            .state('dashboard', {
                url: '/dashboard',
                views: {
                    "main": {
                        templateUrl: 'dashboard/dashboard.tpl.html',
                        controller: 'dashboardCtrl'
                    }
                },
                resolve: {
                    loadMyService: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load(['commonAssets','dashboardModule']);
                    }]
                },
                data: {
                    pageTitle: 'Dashboard'
                }
            });
      //default page
      $urlRouterProvider.otherwise('/login');
    });

