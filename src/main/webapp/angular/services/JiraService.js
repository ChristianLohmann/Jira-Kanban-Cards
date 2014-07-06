/**
 * Created by christianl on 05.07.14.
 */
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
            'method': 'GET'
        },
        'auth': {
            'url': 'jira/auth/:auth',
            'method': 'GET'
        }

    });
}]);