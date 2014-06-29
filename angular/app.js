'use strict';

/* App Module */

var jiraKanbanCards = angular.module('jiraKanbanCards', ['http-auth-interceptor', 'tmh.dynamicLocale',
    'ngResource', 'ngRoute', 'ngCookies', 'pascalprecht.translate']);

jiraKanbanCards
    .config(['$routeProvider', '$httpProvider', '$translateProvider', 'tmhDynamicLocaleProvider',
        function ($routeProvider, $httpProvider, $translateProvider, tmhDynamicLocaleProvider) {
            $routeProvider
                .when('/cards', {
                    templateUrl: 'angular/cards/cardSearch.html',
                    controller: 'CardsController'
                })
                .otherwise({
                    templateUrl: 'angular cards/cardSearch.html',
                    controller: 'CardsController'
                });

            // Initialize angular-translate
            $translateProvider.useStaticFilesLoader({
                prefix: 'i18n/',
                suffix: '.json'
            });

            $translateProvider.preferredLanguage('en');

            $translateProvider.useCookieStorage();

            tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
            tmhDynamicLocaleProvider.useCookieStorage('NG_TRANSLATE_LANG_KEY');
        }
    ]);