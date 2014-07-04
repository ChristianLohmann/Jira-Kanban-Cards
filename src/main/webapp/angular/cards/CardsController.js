'use strict';

angular.module('jiraKanbanCards').controller('CardsController', ['$scope', '$location', '$window', 'jira',
    function ($scope, $location, $window, jira) {

        var self = this;

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
            if ($scope.path) {
                jira.setUrl($scope.path);
            }
            jira.$auth($scope.username, $scope.password);

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
            jira.getIssuesByJql(trimmedJql, function (data) {
                angular.forEach(data, function (ticket) {
                    self.convertJiraIssueToArray(ticket);
                });
            });
        };

        $scope.getEpicNumber = function (epicName) {
            var knownEpics = [];

            if (epicName.length === 0) {
                return '';
            }

            var arrayPos = knownEpics.indexOf(epicName);
            if (arrayPos === -1) {
                knownEpics.push(epicName);
                arrayPos = knownEpics.indexOf(epicName);
            }
            return arrayPos;
        };


        /**
         * put the issues in a format we can work with,
         * so limit to the most used values
         */
        self.convertJiraIssueToArray = function (ticket) {

            /**
             * format the time to a readable value
             */
            var time = ticket.fields.timeoriginalestimate;

            /**
             * collect the basic fields from jira
             */
            var collectedTicket = {
                'priority': ticket.fields.priority.name,
                'issuetype': ticket.fields.issuetype.name,
                'key': ticket.key,
                'summary': ticket.fields.summary,
                'reporter': ticket.fields.reporter ? ticket.fields.reporter.displayName : 'n/a',
                'assignee': ticket.fields.assignee ? ticket.fields.assignee.displayName : 'n/a',
                'remaining_time': time
            };


            /**
             * add custom fields from Jira Agile (epic and rank)
             */
            var customFields = [
                {
                    'key': 'customfield_11100',
                    'name': 'epickey'
                },
                {
                    'key': 'customfield_10004',
                    'name': 'rank'
                }
            ];

            angular.forEach(customFields, function (customField) {
                if (ticket.fields[customField.key] !== undefined) {
                    collectedTicket[customField.name] = ticket[customField.key];
                }
            });

            /**
             * return total collection
             */
            return collectedTicket;
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