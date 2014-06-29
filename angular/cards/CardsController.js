'use strict';

jiraKanbanCards.controller('CardsController', ['$scope', '$location', '$window',
    function ($scope, $location, $window) {

        /**
         * Show tickets based on user given JQL query
         */
        $scope.showTickets = function () {

            /**
             * get and check jql query
             */

            if (!angular.isString($scope.jql)) {
                $window.alert('Input has to be a valid JQL expression!');
            }

            /**
             * create jira object and establish connection
             */
//            require_once(dirname(__FILE__)."/../Lib/Jira.php");
//            $jira = new Jira($this->requestVars["post"]["path"]);
//            $jira->auth($this->requestVars["post"]["username"], $this->requestVars["post"]["password"]);

        };
    }]);