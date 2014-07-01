'use strict';

jiraKanbanCards.controller('CardsController', ['$scope', '$location', '$window', 'Jira',
    function ($scope, $location, $window, Jira) {
        
        var self = this;

        $scope.epicInfo = {
            'include': {
                text: 'Include information'
            },
            'exclude': {
                text: 'Exclude information'
            }
        };
        
        $scop

//        <select name="epic">
//            <option value="1" selected="selected">Include information</option>
//            <option value="0">Exclude information</option>
//        </select>

        /**
         * Show tickets based on user given JQL query
         */
        $scope.showTickets = function () {

            Jira.invoke($scope.path);

            /**
             * get and check jql query
             */
            if (!angular.isString($scope.jql)) {
                $window.alert('Input has to be a valid JQL expression!');
            }
            var trimmedJql = $scope.jql.trim();
            
            Jira.$auth($scope.username, $scope.password);

            /**
             * get tickets from jira
             */
//            $rawTickets = $jira->getIssuesByJql($jql);
//            $tickets = array();
//            foreach( $rawTickets->issues as $ticket ) {
//                $tickets[] = $this->convertJiraIssueToArray($ticket);
//            }
            Jira.getIssuesByJql(trimmedJql, function(data) {
                angular.forEach(data, function (ticket) {
                    self.convertJiraIssueToArray(ticket);
                })
            });
            
            

            /**
             * create jira object and establish connection
             */
//            require_once(dirname(__FILE__)."/../Lib/Jira.php");
//            $jira = new Jira($this->requestVars["post"]["path"]);
//            $jira->auth($this->requestVars["post"]["username"], $this->requestVars["post"]["password"]);

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
                {'epickey' : 'customfield_11100'},
                {'rank' : 'customfield_10004'}
            ]; 

            angular.forEach(customFields, function (customField){
                
//                if( property_exists($ticket->fields, customField ) ) {
//                    $collectedTicket[$name] = $ticket->fields->$key;
//                }
            });

            /**
             * return total collection
             */
            return collectedTicket;
        }
    }]);