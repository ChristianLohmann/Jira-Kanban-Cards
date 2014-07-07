'use strict';

/* App Module */

var jiraKanbanCards = angular.module('jiraKanbanCards', ['ngResource', 'ngRoute', 'ngCookies', 'base64']);

jiraKanbanCards.constant('cons', {
    POST: 'POST',
    GET: 'GET',
    PUT: 'PUT',
    DELETE: 'DELETE'
});

jiraKanbanCards
    .config(['$routeProvider',
        function ($routeProvider) {
            $routeProvider
                .when('/cards', {
                    templateUrl: 'angular/cards/cardSearch.html',
                    controller: 'CardsController'
                })
                .when('/tickets', {
                    templateUrl: 'angular/cards/tickets.html',
                    controller: 'TicketsController'
                })
                .otherwise({
                    templateUrl: 'angular/cards/cardSearch.html',
                    controller: 'CardsController'
                });
        }
    ]);
