package de.jirakanbancards.domain;

import java.util.List;

/**
 * Author: clohmann Date: 03.07.14 Time: 13:11
 */
public class Ticket {

    private long id;

    private String key;

    private String self;

    private String expand;

    private List<String> fields;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getSelf() {
        return self;
    }

    public void setSelf(String self) {
        this.self = self;
    }

    public String getExpand() {
        return expand;
    }

    public void setExpand(String expand) {
        this.expand = expand;
    }

    public List<String> getFields() {
        return fields;
    }

    public void setFields(List<String> fields) {
        this.fields = fields;
    }
}
