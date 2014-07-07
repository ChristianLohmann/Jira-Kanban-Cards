package de.jirakanbancards.resource;

import org.junit.Test;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import org.springframework.web.client.RestTemplate;

public class JiraResourceTest {

    @Test
    public void testGetIssuesByJql() throws Exception {

        String url =
            "https://techjira.zalando.net/rest/api/latest/search?fields=summary&maxResults=100&jql=labels in (edi-preorder) AND status != Closed&0=*&1=a&2=l&3=l";

        RestTemplate restTemplate = new RestTemplate();
        final ResponseEntity<String> exchange = restTemplate.exchange(url, HttpMethod.GET,
                new HttpEntity<String>(createHeaders()), String.class);

// final LinkedHashMap body = exchange.getBody();
// for (Object key : body.keySet()) {
// System.out.println(body.get(key));
// }
        System.out.println(exchange.getBody());
// restTemplate.getForObject()
    }

    private HttpHeaders createHeaders() {
        final String encodedAuth = this.auth;
        return new HttpHeaders() {

            {
// byte[] encodedAuth = Base64.getEncoder().encode(auth.getBytes());
                String authHeader = "Basic " + new String(encodedAuth);
                set("Authorization", authHeader);
            }
        };
    }

}
