package nl.trifork.bank.accountms.exception;

public class AccountVersionException extends Exception {

    private long currentVersion;
    private long comparedVersion;

    public AccountVersionException(String message) {super(message); }

    public AccountVersionException(Long currentVersion) {
        this.currentVersion = currentVersion;
    }

    public AccountVersionException(Long currentVersion, Long comparedVersion) {
        this.currentVersion = currentVersion;
        this.comparedVersion = comparedVersion;
    }

    public long getCurrentVersion() {
        return this.currentVersion;
    }

    public long getComparedVersion() {
        return this.comparedVersion;
    }

}
