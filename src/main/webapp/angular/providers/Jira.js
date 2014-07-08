/**
 * User: clohmann
 * Date: 04.07.14
 * Time: 12:15
 */
'use strict';

angular.module('jiraKanbanCards').factory('JiraService', [ '$resource', function ($resource) {
    return $resource('', null, {
        'getIssuesByJql': {
            'url': 'jira/issuesByJql',
            'method': 'GET',
            'isArray': true
        },
        'auth': {
            'url': 'jira/auth/:auth',
            'method': 'GET'
        },
        'jiraUrl': {
            'url': 'jira/url',
            'method': 'GET'
        }

    });
}]);