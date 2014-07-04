'use strict';

/* App Module */

var jiraKanbanCards = angular.module('jiraKanbanCards', ['ngResource', 'ngRoute', 'ngCookies', 'base64']);

jiraKanbanCards.constant('cons', {
    /* URL Suffix */
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE'
});

jiraKanbanCards
    .config(['$routeProvider', '$httpProvider',
        function ($routeProvider, $httpProvider) {
            $routeProvider
                .when('/cards', {
                    templateUrl: 'angular/cards/cardSearch.html',
                    controller: 'CardsController'
                })
                .when('/tickets', {
                    templateUrl: 'angular/cards/tickets.html',
                    controller: 'CardsController'
                })
                .otherwise({
                    templateUrl: 'angular/cards/cardSearch.html',
                    controller: 'CardsController'
                });
            $httpProvider.defaults.useXDomain = true;
            delete $httpProvider.defaults.headers.common['X-Requested-With'];
//            jiraProvider.setUrl('https://techjira.zalando.net/rest/api/');
//            jiraProvider.setUrlArray('/');
        }
    ]);