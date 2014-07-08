'use strict';

angular.module('jiraKanbanCards').controller('CardsController', ['$scope', '$location', '$window', 'JiraService', '$base64', '$http', 'TicketService',
    function ($scope, $location, $window, JiraService, $base64, $http, TicketService) {

        var tickets = $scope.tickets = [];

        $scope.epicInfoChoice = [
            {
                text: 'Include information',
                epicInfo: true
            },
            {
                text: 'Exclude information',
                epicInfo: false
            }
        ];

        /**
         * Show tickets based on user given JQL query
         */
        $scope.showTickets = function () {

            /**
             * create jira object and establish connection
             */
            var auth = $base64.encode($scope.username + ':' + $scope.password);
            JiraService.auth({auth: auth});

            /**
             * unused since not working properly
             */
//            var url = $scope.path.trim();
//            if (!angular.isUndefined(url)) {
//                JiraService.jiraUrl({url: url});
//            }

            /**
             * get and check jql query
             */
            if (!angular.isString($scope.jql)) {
                $window.alert('Input has to be a valid JQL expression!');
            }
            var trimmedJql = $scope.jql.trim();

            /**
             * get tickets from jira
             */
            var fields = '*all';
            if (!angular.isUndefined($scope.fields)) {
                fields = $scope.fields;
            }
            var selectedEpicInfoChoice = !angular.isUndefined($scope.selectedEpicInfo) ? $scope.selectedEpicInfo.epicInfo : false;

            JiraService.getIssuesByJql({fields: fields, jql: trimmedJql, epicInfo: selectedEpicInfoChoice}, function (data) {
                TicketService.tickets = data;
                $location.path('/tickets');
            });
        };
    }]);