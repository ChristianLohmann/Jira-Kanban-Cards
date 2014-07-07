/**
 * User: clohmann
 * Date: 04.07.14
 * Time: 12:15
 */
'use strict';

angular.module('jiraKanbanCards').factory('JiraService', [ '$resource', function ($resource) {
    return $resource('', null, {
        'getIssuesByJql': {
            'url': 'jira/issuesByJql/:fields/:jql',
            'method': 'GET',
            'isArray': true,
            'transformResponse': function (data) {
                var json = JSON.parse(data);
                return json;
            }
        },
        'auth': {
            'url': 'jira/auth/:auth',
            'method': 'GET'
        }

    });
}]);