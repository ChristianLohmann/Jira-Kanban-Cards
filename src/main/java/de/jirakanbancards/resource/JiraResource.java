package de.jirakanbancards.resource;

import static com.google.common.base.Joiner.on;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.google.common.base.Strings;

import de.jirakanbancards.domain.JiraSearchResult;
import de.jirakanbancards.domain.Ticket;

/**
 * Author: clohmann Date: 03.07.14 Time: 12:53
 */
@RestController
@RequestMapping("/jira")
public class JiraResource {

    @Value("${jira.url}")
    private String jiraUrl;

    private String customJiraUrl;

    private String auth;

    @RequestMapping(value = "/issuesByJql", method = RequestMethod.GET)
    @ResponseBody
    public List<Ticket> getIssuesByJql(@RequestParam("fields") final String fields,
            @RequestParam("jql") final String jql, @RequestParam final Boolean epicInfo) {

        final String jiraUrl = getJiraUrl();
        String query = "/search?fields=" + fields + "&maxResults=100&jql=" + jql;
        RestTemplate rest = new RestTemplate();
        final ResponseEntity<JiraSearchResult> exchange = rest.exchange(jiraUrl + query, HttpMethod.GET,
                new HttpEntity<String>(createHeaders()), JiraSearchResult.class);
        final JiraSearchResult searchResult = exchange.getBody();
        if (epicInfo) {
            addEpicsInfo(searchResult);
        }

        return searchResult.getIssues();
    }

    @RequestMapping(value = "/auth/{auth}", method = RequestMethod.GET)
    public void authenticate(@PathVariable("auth") final String auth) {

        this.auth = auth;
    }

    @RequestMapping(value = "/url", method = RequestMethod.GET)
    public void setJiraUrl(@RequestParam final String url) {

        this.customJiraUrl = url;
    }

    private JiraSearchResult addEpicsInfo(final JiraSearchResult issueResult) {

        final Map<String, List<Ticket>> ticketsByEpics = issueResult.getTicketsByEpics();
        String query = "/search?fields=key,customfield_14532&maxResults=100&jql=key IN ("
                + on(",").skipNulls().join(ticketsByEpics.keySet()) + ")";
        RestTemplate rest = new RestTemplate();
        final ResponseEntity<JiraSearchResult> exchange = rest.exchange(getJiraUrl() + query, HttpMethod.GET,
                new HttpEntity<String>(createHeaders()), JiraSearchResult.class);
        final JiraSearchResult epicsResult = exchange.getBody();
        for (Ticket epic : epicsResult.getIssues()) {
            for (Ticket ticket : ticketsByEpics.get(epic.getKey())) {
                ticket.getFields().setEpicName(epic.getFields().getEpicName());
            }

        }

        return issueResult;
    }

    private HttpHeaders createHeaders() {

        final String auth = this.auth;

        return new HttpHeaders() {

            {
                String authHeader = "Basic " + auth;
                set("Authorization", authHeader);

                set("Content-Type", "application/json");
            }
        };
    }

    private String getJiraUrl() {

        return !Strings.isNullOrEmpty(customJiraUrl) ? customJiraUrl : this.jiraUrl;
    }

}
