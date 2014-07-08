'use strict';

angular.module('jiraKanbanCards').controller('CardsController', ['$scope', '$location', '$window', 'JiraService', '$base64', '$http', 'TicketService',
    function ($scope, $location, $window, JiraService, $base64, $http, TicketService) {

        var self = this;

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

            var url = $scope.path;
            if (!angular.isUndefined(url)) {
                JiraService.jiraUrl({url: url});
            }

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


        /**
         * add Agile-epic information to a ticket, since a ticket comes with the
         * link to the epic, but we need to names, which we need to fetch from Jira seperatly
         */
        self.addEpicNames = function (tickets) {

            /**
             * collect all different keys
             */
            var epicKeys = [];
            angular.forEach(tickets, function (ticket) {

                if (angular.isString(ticket.epicLink)) {
                    var key = ticket.epicLink.trim();
                    if (key.length !== 0) {
                        this.push(key);
                    }
                }
            }, epicKeys);

            if (epicKeys.length === 0) {
                return tickets;
            }


            /**
             * get names pro jira and convert into nicer structure
             */
            var epics = JiraService.getIssuesByJql('key IN (' + epicKeys.join() + ')', 'key,epicName');

            /**
             * modify tickets and add epic names
             */
            angular.forEach(tickets, function (ticket) {

                var key = ticket.epicLink.trim();
                ticket.epicName = key.length !== 0 ? epics[key] : '';
            });
            return tickets;
        };
    }])
;