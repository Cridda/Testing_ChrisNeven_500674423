package nl.trifork.bank.accountms.exception;

import javax.security.auth.login.AccountNotFoundException;

public class AccountException extends Exception {

    public AccountException() {}

    public AccountException(String message) {
        super(message);
    }

    public AccountException(Throwable cause) {
        super(cause);
    }

    public AccountException(String message, Throwable cause) {
        super(message, cause);
    }

}
