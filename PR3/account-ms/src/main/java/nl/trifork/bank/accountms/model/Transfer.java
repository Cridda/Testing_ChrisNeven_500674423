package nl.trifork.bank.accountms.model;

import java.util.Date;

public class Transfer {
    private long id;
    private long amount;
    private long issuer;
    private long fromAccountId;
    private long toAccountId;
    private Date createdAt;

    protected Transfer() {
    }


    public Transfer(Long issuer, Long amount, long fromAccountId, long toAccountId) {
        this.issuer = issuer;
        this.amount = amount;
        this.fromAccountId = fromAccountId;
        this.toAccountId = toAccountId;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getAmount() {
        return amount;
    }

    public void setAmount(long amount) {
        this.amount = amount;
    }

    public long getIssuer() {
        return issuer;
    }

    public void setIssuer(long issuer) {
        this.issuer = issuer;
    }

    public long getFromAccountId() {
        return fromAccountId;
    }

    public void setFromAccountId(long fromAccountId) {
        this.fromAccountId = fromAccountId;
    }

    public long getToAccountId() {
        return toAccountId;
    }

    public void setToAccountId(long toAccountId) {
        this.toAccountId = toAccountId;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
