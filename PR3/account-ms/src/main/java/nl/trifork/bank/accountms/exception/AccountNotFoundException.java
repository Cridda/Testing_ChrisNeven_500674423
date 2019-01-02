package nl.trifork.bank.accountms.exception;

public class AccountNotFoundException extends Exception {

    private String key;
    private long id;
    private String message;

    public AccountNotFoundException() {}

    /**@param key: Key for the account which does not exists */
    public AccountNotFoundException(String key) {
        this.key = key;
    }

    /**@param key: Key for the account which does not exist
     * @param message: Wether it's the 'from' account or 'to' account in a transfer situation*/
    public AccountNotFoundException(String key, String message) {
        this.key = key;
        this.message = message;
    }

    public AccountNotFoundException(Long id, String message) {
        this.id = id ;
        this.message = message;
    }

    public String getKey() {
        return this.key;
    }

    public String getMessage() { return this.message; }

}
