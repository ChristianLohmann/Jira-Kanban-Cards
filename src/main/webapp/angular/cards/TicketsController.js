'use strict';

angular.module('jiraKanbanCards').controller('TicketsController', ['$scope', '$location', '$window', '$http', 'TicketService',
    function ($scope, $location, $window, $http, TicketService) {

        $scope.tickets = TicketService.tickets;

    }]);