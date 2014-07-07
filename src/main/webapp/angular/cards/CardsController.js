'use strict';

angular.module('jiraKanbanCards').controller('CardsController', ['$scope', '$location', '$window', 'JiraService', '$base64', '$http', 'TicketService',
    function ($scope, $location, $window, JiraService, $base64, $http, TicketService) {

        var self = this;

        var tickets = $scope.tickets = [];

        $scope.epicInfo = {
            'include': {
                text: 'Include information'
            },
            'exclude': {
                text: 'Exclude information'
            }
        };

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
            JiraService.getIssuesByJql({fields: fields, jql: trimmedJql}, function (data) {
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
            var epickeys = [];
            angular.forEach(tickets, function (ticket) {

                if (angular.isString(ticket.epickey)) {
                    var key = ticket.epickey.trim();
                    if (key.length !== 0 && angular.isUndefined(this.getElementById(key))) {
                        this.push(key);
                    }
                }
            }, epickeys);

            if (epickeys.length === 0) {
                return tickets;
            }


            /**
             * get names pro jira and convert into nicer structure
             */
            var rawEpics = jira.getIssuesByJql('key IN (' + epickeys.join() + ')', 'key,customfield_11101');
            var epics = {};
            angular.forEach(rawEpics.issues, function (epic) {
                epics[epic.key] = epic.fields.customfield_11101;
            });

            /**
             * modify tickets and add epic names
             */
            for (var i = 0; i < tickets.length; i++) {
                var key = tickets[i].epickey.trim();
                tickets[i].epic = key.length !== 0 ? epics[key] : '';
            }
            return tickets;
        };
    }]);