package de.jirakanbancards.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * Author: clohmann Date: 07.07.14 Time: 12:50
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class IssueType {

    private String name;

    public String getName() {

        return name;
    }

    public void setName(final String name) {

        this.name = name;
    }
}
