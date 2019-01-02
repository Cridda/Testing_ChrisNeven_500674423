package nl.trifork.bank.accountms.service;

import nl.trifork.bank.accountms.exception.AccountVersionException;
import nl.trifork.bank.accountms.model.Person;
import nl.trifork.bank.accountms.model.Transfer;
import org.slf4j.Logger; //logback
import org.slf4j.LoggerFactory;
import nl.trifork.bank.accountms.DAO.AccountDAO;
import nl.trifork.bank.accountms.exception.AccountException;
import nl.trifork.bank.accountms.exception.AccountNotFoundException;
import nl.trifork.bank.accountms.model.Account;
import nl.trifork.bank.accountms.validator.InputValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.WebRequest;


import javax.validation.ConstraintViolationException;
import java.math.BigInteger;
import java.util.List;
import java.util.UUID;

import static org.aspectj.util.LangUtil.isEmpty;

@Service
public class AccountService extends InputValidator {

    @Autowired
    private final AccountDAO accountDAO;
    private final static Logger logger = LoggerFactory.getLogger(AccountService.class);

    @Autowired
    public AccountService(AccountDAO accountDAO) {
        this.accountDAO = accountDAO;
    }

    /*------------------------ CREATE SERVICE METHODS ----------------------*/

    /**
    * @param account - Account, JSON Account, only name and description are used, so just a json containing those should suffice.
    * @param person - Person, JSON Person, Retrieved from securitycontext, we use the userid belonging to the user making the account.
    *
    * @return ResponseEntity - HttpResponse, We return an OK status and put the new account in the body.
    * */
    public Account create(Account account, Person person) throws AccountException {
        logger.info("Service - method create account with request, and account(name, description)");

        String key         = generateKey();
        String name        = account.getName();
        String description = account.getDescription();

        /*Safety measure for that one in a trillion chance, you can never be too careful.*/
        if (accountDAO.findAccountByKey(key) != null) {
            throw new AccountException("An error occurred, try again");
        }

        long userId     = person.getId();
        long minbalance = 0;
        long balance    = 100;

        logger.info("Creating account with [key: {}, userId: {}, name: {}, desc: {}, minBalance: {}, balance: {}]",
                key, userId, name, description, minbalance, balance);
        Account acc = new Account(name, description);

        acc.setKey(key);
        acc.setUserId(userId);
        acc.setMinBalance(minbalance);
        acc.setBalance(balance);

        accountDAO.save(acc);
        return acc;
    }

    public Account createAdmin(Account account) throws AccountException {
        logger.info("creating admin account");
        String key         = generateKey();
        account.setKey(key);
        accountDAO.save(account);
        return account;
    }


    /**
     * Generates a BigInteger (immutable) with 40 numbers, we turn this into a string and take 9 digits to use as a key.
     * @return UUIDKey - String
     * */
    private String generateKey() {
        String bigKey =  String.format("%040d",new BigInteger(UUID.randomUUID().toString().replace("-", ""), 16));
        String UUIDKey = String.valueOf(bigKey.substring(1,10));

        return UUIDKey;
    }
    /*------------------------- FIND SERVICE METHODS -----------------------*/

    public Iterable<Account> findAll() throws AccountNotFoundException{
        Iterable<Account> allAccounts = accountDAO.findAll();
        if (allAccounts == null) {
            throw new AccountNotFoundException("All keys", "No accounts found, abort");
        }
        return allAccounts;
    }
    /**
     * Called to find an account either internally or by external microservices. Set's an E-Tag header, which contains the version of the account at the time of response.
     * The value of the version in the E-Tag can be used by the transfer-ms to be set as If-Match header.
     *
     * @param key - String, key of the account being searched.
     * @return ResponseEntity, if account with key is found, return the account as body and version as E-Tag header
     *                         if the account is not found, we return a 404 not found.
     * */
    public Account findAccount(String key) throws AccountNotFoundException  {

        Account account = accountDAO.findAccountByKey(key);
        if (account == null) {
            throw new AccountNotFoundException(key, "Account does not exist. Please try again with a valid key.");
        }
        return account;

    }

    public Account find(long id) throws AccountNotFoundException {

        Account account = accountDAO.findOne(id);
        if (account == null) {
            throw new AccountNotFoundException(id, "Account does not exist. Please try again with a valid key.");
        }
        return account;
    }

    public List<Account> findUser(long userId) throws AccountException {

        List<Account> accounts = accountDAO.findAccountsByUserId(userId);
        if (accounts == null) {
            throw new AccountException("No accounts found for user:" + userId);
        }
        return accounts;
    }

    public List<Account> findEmail(String email) throws AccountException {

        List<Account> accounts = accountDAO.findAccountsByName(email);
        if (accounts == null) {
            throw new AccountException("No accounts found for user:" + email);
        }
        return accounts;
    }
    /*----------------------- UPDATE SERVICE METHODS -----------------------*/

    /* Should only be accessible by admin user */
    public Account updateMinBalance(String key, long minBalance) throws AccountNotFoundException {

        Account account = accountDAO.findAccountByKey(key);
        if (account == null) {
            throw new AccountNotFoundException(key);
        }

        account.setMinBalance(minBalance);
        return accountDAO.save(account);
    }

    public Account updateDescription(String key, String description)  throws AccountNotFoundException {

        Account account = accountDAO.findAccountByKey(key);
        if (account == null) {
            throw new AccountNotFoundException(key);
        }
        account.setDescription(description);
        return accountDAO.save(account);
    }

    public Account updateName(String key, String name) throws AccountNotFoundException {
        Account account = accountDAO.findAccountByKey(key);
        if (account == null) {
            throw new AccountNotFoundException(key);
        }

        account.setName(name);
        return accountDAO.save(account);
    }



    /**
     * Once transfer-ms receives the E-Tag version from & to accounts from findByKey(),
     * the If-Match header required for this function will be set to that value.
     * In this method we compare the version from the fromKey passed in transfer to the current version.
     *
     * If the versions don't match then the fromAccount has been updated in the period of the transfer, and we discontinue it.
     * If the versions match, we update and return the HttpStatus 418. TOBE CHANGED
     *
     * @param request - Webrequest, used to extract header "If-Match", which we require to compare the current Account version against.
     *                If this is missing, or not equal to the current version of account, we return a adequate response.
     * @param transfer - Transfer Object containing issuer, amount, fromKey & toKey, provided as JSON and used to match accounts
     *
     * @return I_AM_A_TEAPOT
     * */
    public Account transfer(WebRequest request, Transfer transfer)
            throws AccountException, AccountNotFoundException, AccountVersionException{

        long issuer  = transfer.getIssuer();
        long amount  = transfer.getAmount();
        long fromId = transfer.getFromAccountId();
        long toId   = transfer.getToAccountId();

        Account fromAccount = accountDAO.findOne(fromId);
        Account toAccount   = accountDAO.findOne(toId);

        if (fromAccount == null) {
            throw new AccountNotFoundException(fromId, "The account sending the transfer does not exist.");
        }
        if (toAccount == null) {
            throw new AccountNotFoundException(toId, "The account receiving the transfer does not exist.");
        }

        String ifMatchValue = request.getHeader("If-Match");
        logger.info("Service: Transfer - ifMatchValue request from header, value: {}. Current version:", ifMatchValue, fromAccount.getVersion());


        if (isEmpty(ifMatchValue)) {
            throw new AccountException("Account version missing from header");
        }

        String fromVersion = String.valueOf(fromAccount.getVersion());
        if (!ifMatchValue.equals(fromVersion)) {
            throw new AccountVersionException(Long.parseLong(ifMatchValue), fromAccount.getVersion());
        }

        try {
            fromAccount.setBalance(fromAccount.getBalance() - amount);
            toAccount.setBalance(toAccount.getBalance() + amount);

            accountDAO.save(fromAccount);
            accountDAO.save(toAccount);

            return fromAccount;
        } catch (OptimisticLockingFailureException e) {
            throw new AccountException("Failed to update values", e.getCause());
        }

    }

}
