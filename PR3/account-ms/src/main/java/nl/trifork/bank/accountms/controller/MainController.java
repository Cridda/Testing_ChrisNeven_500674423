package nl.trifork.bank.accountms.controller;

import nl.trifork.bank.accountms.exception.AccountException;
import nl.trifork.bank.accountms.exception.AccountNotFoundException;
import nl.trifork.bank.accountms.exception.AccountVersionException;
import nl.trifork.bank.accountms.model.Account;
import nl.trifork.bank.accountms.model.Person;
import nl.trifork.bank.accountms.model.Transfer;
import nl.trifork.bank.accountms.model.oauth.PersonAuthentication;
import nl.trifork.bank.accountms.service.AccountService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.WebRequest;

import javax.xml.ws.Response;
import java.util.List;
import java.util.Set;

@RequestMapping("/accounts")
@RestController
public class MainController {

    private final AccountService accountService;
    private final static Logger logger = LoggerFactory.getLogger(AccountService.class);

    @Autowired
    public MainController(AccountService accountService) {
        this.accountService = accountService;
    }


    /* ------------------------ MAIN CONTROLLER METHODS ------------------------*/
    @RequestMapping("/index")
    public ResponseEntity<?> account() {
        return ResponseEntity.status(HttpStatus.OK).body("Hello world");
    }

    /*------------------------ CREATE CONTROLLER METHODS ----------------------*/

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<?> create(@RequestBody Account account) {

        Set<String> scope = ((PersonAuthentication) SecurityContextHolder.getContext().getAuthentication()).getScopes();
        Person person = ((PersonAuthentication) SecurityContextHolder.getContext().getAuthentication()).getDetails();
        if (person == null) {
            logger.info("PERSON == NULL, make account for new user if");
        }

        try {
            Account acc;
            if (scope.contains("admin") || scope.contains("full")) {
                acc = accountService.createAdmin(account);
                return ResponseEntity.status(HttpStatus.CREATED).body(acc);
            } else if (scope.contains("user")) {
                acc = accountService.create(account, person);
                return ResponseEntity.status(HttpStatus.CREATED).body(acc);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } catch (AccountException e) {
            logger.error(e.getMessage());
            return null;
        }
    }

    /*-------------------------- FIND CONTROL METHODS ------------------------*/

    @RequestMapping(value = "/account/{key}", method = RequestMethod.GET)
    public ResponseEntity<?> findAccount(@PathVariable("key") String key) {
        Set<String> scope = ((PersonAuthentication) SecurityContextHolder.getContext().getAuthentication()).getScopes();
        Person person = ((PersonAuthentication) SecurityContextHolder.getContext().getAuthentication()).getDetails();

        try {
            Account account = accountService.findAccount(key);
            if (scope.contains("admin") || scope.contains("full")) {
                return ResponseEntity.status(HttpStatus.OK).body(account);
            } else if (scope.contains("user")) {
                if (account.getUserId() == person.getId()) {
                    return ResponseEntity.status(HttpStatus.OK).body(account);
                }
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (AccountNotFoundException e) {
            logger.warn(e.getMessage());
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Account with key " + e.getKey() + " not found. Reason: " + e.getMessage());
        }
    }


    @RequestMapping(value = "/user/{userId}", method = RequestMethod.GET)
    public ResponseEntity<List<Account>> findUser(@PathVariable("userId") Long userId) {
        Set<String> scope = ((PersonAuthentication) SecurityContextHolder.getContext().getAuthentication()).getScopes();
        Person person = ((PersonAuthentication) SecurityContextHolder.getContext().getAuthentication()).getDetails();

        try {
            List<Account> accounts = accountService.findUser(userId);

            if (scope.contains("admin") || scope.contains("full")) {
                return ResponseEntity.ok().body(accounts);
            } else if (scope.contains("user")) {
                if (person.getId() == userId) {
                    return ResponseEntity.ok().body(accounts);
                }
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (AccountException e) {
            logger.warn(e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @RequestMapping(value = "all", method = RequestMethod.GET)
    public ResponseEntity<Iterable<Account>> findAll() {
        Set<String> scope = ((PersonAuthentication) SecurityContextHolder.getContext().getAuthentication()).getScopes();
        try {
            if (scope.contains("admin") || scope.contains("full")) {
                Iterable<Account> accounts = accountService.findAll();
                return ResponseEntity.status(HttpStatus.OK).body(accounts);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (AccountNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }

    /*------------------------ UPDATE CONTROL METHODS ------------------------*/

    /**
    * updateMinBalance: updates the minimum balance of a given account matching the key param
     * Requires the user making the request to have a full or admin scope.
     * @param key : the key of the account to update the balance for
     * @param account : the account object (JSON) containing the new value for the minBalance attribute.
     * */
    @RequestMapping(value = "/account/{key}/min-balance", method = RequestMethod.PUT)
    public ResponseEntity<?> updateMinBalance(@PathVariable("key") String key,
                                              @RequestBody Account account) {
        Set<String> scope = ((PersonAuthentication) SecurityContextHolder.getContext().getAuthentication()).getScopes();

        try {
            if (scope.contains("admin") || scope.contains("full")) {
                long minBalance = account.getMinBalance();
                Long newMinBalance = minBalance;

                account = accountService.updateMinBalance(key, newMinBalance);
                return ResponseEntity.status(HttpStatus.OK).body(account);
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (NumberFormatException e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("Minimum balance not acceptable, please enter a long value");
        } catch (AccountNotFoundException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Account not found");
        }
    }

    @RequestMapping(value = "/account/{key}/description", method = RequestMethod.PUT)
    public ResponseEntity<Account> updateDescription(@PathVariable("key") String key,
                                                     @RequestBody Account account) {
        Set<String> scope   = ((PersonAuthentication) SecurityContextHolder.getContext().getAuthentication()).getScopes();
        Person person       = ((PersonAuthentication) SecurityContextHolder.getContext().getAuthentication()).getDetails();

        try {
            Account accountForKey = accountService.findAccount(key);
            String description = account.getDescription();

            if (scope.contains("admin") || scope.contains("full")) {
                account = accountService.updateDescription(key, description);
                return ResponseEntity.status(HttpStatus.OK).body(account);
            } else if (scope.contains("user")){
                if (person.getId() == accountForKey.getUserId()) {
                    account = accountService.updateDescription(key, description);
                    return ResponseEntity.status(HttpStatus.OK).body(account);
                }
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (AccountNotFoundException e) {
            logger.warn(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @RequestMapping(value = "/account/{key}/name", method = RequestMethod.PUT)
    public ResponseEntity<Account> updateName(@PathVariable("key") String key,
                                              @RequestBody Account account) {
        Set<String> scope   = ((PersonAuthentication) SecurityContextHolder.getContext().getAuthentication()).getScopes();
        Person person       = ((PersonAuthentication) SecurityContextHolder.getContext().getAuthentication()).getDetails();

        try {
            Account accountForKey = accountService.findAccount(key);
            String name = account.getName();

            if (scope.contains("admin") || scope.contains("full")) {
                account = accountService.updateName(key, name);
                return ResponseEntity.status(HttpStatus.OK).body(account);
            } else if (scope.contains("user")) {
                if (person.getId() == accountForKey.getUserId()) {
                    account = accountService.updateName(key, name);
                    return ResponseEntity.status(HttpStatus.OK).body(account);
                }
            }

            account = accountService.updateName(key, name);
            return ResponseEntity.status(HttpStatus.OK).body(account);
        } catch (AccountNotFoundException e) {
            logger.warn(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @RequestMapping(value = "/transfer", method = RequestMethod.PUT)
    public ResponseEntity<?> transfer(WebRequest request, @RequestBody Transfer transfer) {
        Set<String> scope = ((PersonAuthentication) SecurityContextHolder.getContext().getAuthentication()).getScopes();
        Person person     = ((PersonAuthentication) SecurityContextHolder.getContext().getAuthentication()).getDetails();

        try {
            Account fromAccount = accountService.find(transfer.getFromAccountId());
            if (scope.contains("admin") || scope.contains("full")) {
                accountService.transfer(request, transfer);
                return ResponseEntity.status(HttpStatus.OK).eTag("\"" + fromAccount.getVersion() + "\"").body(fromAccount);
            } else if (scope.contains("user")) {
                if (person.getId() == fromAccount.getUserId()) {
                    accountService.transfer(request, transfer);
                    return ResponseEntity.status(HttpStatus.OK).eTag("\"" + fromAccount.getVersion() + "\"").body(fromAccount);
                }
            }
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch (AccountNotFoundException e) {
            return ResponseEntity.status(HttpStatus.PRECONDITION_FAILED).body("Account with key " + e.getKey() + " not found. Try again with a valid account");
        } catch (AccountVersionException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Account version not current, please try again. \n version at time of request:" + e.getComparedVersion() +
                    ", Current version of account: " + e.getCurrentVersion());
        } catch (AccountException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
}
