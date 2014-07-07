'use strict';

angular.module('jiraKanbanCards').controller('TicketsController', ['$scope', '$location', '$window', '$http', 'TicketService',
    function ($scope, $location, $window, $http, TicketService) {

        $scope.tickets = TicketService.tickets;

        $scope.getEpicNumber = function (epicLink) {
            var knownEpics = [];

            if (epicLink.length === 0) {
                return '';
            }

            var arrayPos = knownEpics.indexOf(epicLink);
            if (arrayPos === -1) {
                knownEpics.push(epicLink);
                arrayPos = knownEpics.indexOf(epicLink);
            }
            return arrayPos;
        };

        $scope.trim = function (value) {
            return value.replace(' ', '');
        };

    }]);