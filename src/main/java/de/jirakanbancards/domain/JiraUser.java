package de.jirakanbancards.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Author: clohmann Date: 07.07.14 Time: 12:51
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class JiraUser {

    private String name;

    private String emailAddress;

    private String displayName;

    public String getName() {

        return name;
    }

    public void setName(final String name) {

        this.name = name;
    }

    public String getEmailAddress() {

        return emailAddress;
    }

    public void setEmailAddress(final String emailAddress) {

        this.emailAddress = emailAddress;
    }

    public String getDisplayName() {

        return displayName;
    }

    public void setDisplayName(final String displayName) {

        this.displayName = displayName;
    }
}
