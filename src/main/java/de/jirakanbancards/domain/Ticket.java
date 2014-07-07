package de.jirakanbancards.domain;

/**
 * Author: clohmann Date: 03.07.14 Time: 13:11
 */
public class Ticket {

    private long id;

    private String key;

    private String self;

    private String expand;

    private Fields fields;

    public long getId() {
        return id;
    }

    public void setId(final long id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(final String key) {
        this.key = key;
    }

    public String getSelf() {
        return self;
    }

    public void setSelf(final String self) {
        this.self = self;
    }

    public String getExpand() {
        return expand;
    }

    public void setExpand(final String expand) {
        this.expand = expand;
    }

    public Fields getFields() {

        return fields;
    }

    public void setFields(final Fields fields) {

        this.fields = fields;
    }
}
