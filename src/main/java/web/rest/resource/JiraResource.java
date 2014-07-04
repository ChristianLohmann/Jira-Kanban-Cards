package web.rest.resource;

import java.io.UnsupportedEncodingException;

import java.net.URLEncoder;

import org.apache.tomcat.util.codec.binary.Base64;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

/**
 * Author: clohmann Date: 03.07.14 Time: 12:53
 */
@RestController
@RequestMapping("/jira")
public class JiraResource {

    @Value("jiraUrl")
    private String jiraUrl;

    private String username;

    private String password;

    @RequestMapping(value = "/issuesByJql", method = RequestMethod.GET)
    @ResponseBody
    public String getIssuesByJql(@RequestParam final String jql, @RequestParam final String fields) {

        try {
            String query = "/search?fields=" + fields + "&maxResults=100&jql="
                    + encodeURIComponent(jql).replaceAll("%252F", "/");
            RestTemplate rest = new RestTemplate();
            final ResponseEntity<String> exchange = rest.exchange(jiraUrl + query, HttpMethod.GET,
                    new HttpEntity<String>(createHeaders()), String.class);
            return exchange.getBody();
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return "";
    }

    @RequestMapping(value = "/auth", method = RequestMethod.GET)
    @ResponseBody
    public void authenticate(@RequestParam final String username, @RequestParam final String password) {

        this.username = username;
        this.password = password;
    }

    private String encodeURIComponent(final String jql) throws UnsupportedEncodingException {

        return URLEncoder.encode(jql, "UTF-8");
    }

    private HttpHeaders createHeaders() {

        final String username = this.username;
        final String password = this.password;

        return new HttpHeaders() {

            {
                String auth = username + ":" + password;
                byte[] encodedAuth = Base64.encodeBase64(auth.getBytes());
                String authHeader = "Basic " + new String(encodedAuth);
                set("Authorization", authHeader);

                set("Content-Type", "application/json");
            }
        };
    }

}
