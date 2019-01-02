package nl.trifork.bank.accountms;

import nl.trifork.bank.accountms.DAO.AccountDAO;
import nl.trifork.bank.accountms.exception.AccountException;
import nl.trifork.bank.accountms.exception.AccountNotFoundException;
import nl.trifork.bank.accountms.exception.AccountVersionException;
import nl.trifork.bank.accountms.model.Account;
import nl.trifork.bank.accountms.model.Person;
import nl.trifork.bank.accountms.model.Role;
import nl.trifork.bank.accountms.model.Transfer;
import nl.trifork.bank.accountms.service.AccountService;
import org.junit.After;
import org.junit.Before;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.TestName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.request.WebRequest;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.given;
import static org.mockito.Matchers.*;
import static org.mockito.Mockito.*;


public class AccountServiceTest {
    /**
     * I've chosen to use mockito because the tribank is consisting of microservices with the entities seperated in
     * in their own Microservice. To seperate concerns and make it scalable. Mockito is used for mocking those other
     * entities that it normally gets from the respective microservice.
     */
    @InjectMocks
    private AccountService accountService;

    private Logger logger = LoggerFactory.getLogger(AccountService.class);

    private final String KEY_1 = "111111111";
    private final String KEY_2 = "222222222";

    @Mock
    private AccountDAO mockDAO;
    @Mock
    private WebRequest webRequest;

    @Rule
    public TestName name = new TestName();

    /**
     * First a @Before is necessary to Mock the optimistic locking that is needed to perform legit transactions
      */
    @Before
    public void setUp() {
        MockitoAnnotations.initMocks(this);
        accountService = new AccountService(mockDAO);
        webRequest = mock(WebRequest.class);
        when(webRequest.getHeader("userId")).thenReturn("1");
        when(webRequest.getHeader("If-Match")).thenReturn("1");
    }

    @After
    public void finish() {
        MockitoAnnotations.initMocks(this);
        logger.info(name.getMethodName() + ": completed");
    }
    /**
     * Test the create() method in the account service
     * create() expects an Account Object, and a WebRequest Object,
     * the Account needs a name & description
     * the request needs a header : userId
    * */
    @Test
    public void whenCreate_AndValid_thenReturnResponseEntity() throws AccountException {
        Account account = new Account("Existing Account", "Account made for create test in service");
        account.setKey(KEY_1);
        Person person = new Person("test@test.nl", "1234", "test", "van testerson", Role.USER, true);
        person.setId(1);

        given(mockDAO.findAccountByKey(anyString())).willReturn(null);

        Account acc = accountService.create(account, person);

        assertThat(acc.getName()).isEqualTo(account.getName());
        assertThat(acc.getUserId()).isEqualTo(person.getId());

        verify(mockDAO).save(acc);
    }

    @Test(expected = AccountException.class)
    public void whenCreate_andInvalid_thenReturnResponseEntity() throws AccountException {
        Account account = new Account("New Account", "Account made for create test in service");
        account.setKey(KEY_1);

        Person person = new Person("test@test.nl", "1234", "test", "van testerson", Role.USER, true);
        person.setId(1);

        given(mockDAO.findAccountByKey(anyString())).willReturn(account);
        Account acc = accountService.create(account, person);

        verify(mockDAO, never()).save(acc);
    }

    @Test(expected = AccountNotFoundException.class)
    public void whenFindAll_andNonReturned_thenThrowAccountException() throws AccountNotFoundException {
        given(mockDAO.findAll()).willReturn(null);

        Iterable<Account> accounts = accountService.findAll();

        assertThat(accounts).isNull();
    }

    @Test
    public void whenFindAll_andAccountsExist_thenReturnAllAccounts() throws AccountNotFoundException {
        Account account1 = new Account("1", "account 1");
        Account account2 = new Account("2", "account 2");
        Account account3 = new Account("3", "account 3");

        Account accountList[] = {account1, account2, account3};
        Iterable<Account> accountIterable = Arrays.asList(accountList);

        given(mockDAO.findAll()).willReturn(accountIterable);

        Iterable<Account> accounts = accountService.findAll();

        assertThat(accounts).contains(account1, account2, account3);
        assertThat(accounts.iterator().next().getName()).isEqualTo(account1.getName());
    }

    @Test(expected = AccountNotFoundException.class)
    public void whenFindAccount_AndAccountDoesNotExist_ThenReturnNotFound() throws Exception {
        given(mockDAO.findAccountByKey(anyString())).willReturn(null);
        Account acc = accountService.findAccount(KEY_1);
        verify(mockDAO, never()).findAccountByKey(KEY_1);
    }

    @Test
    public void whenFindAccount_AndAccountExists_thenReturnResponseEntity() throws Exception {
        logger.info("TEST: when find account that exists, return response");

        Account account = new Account("Find account test", "Account made for find account test");
        account.setKey(KEY_1);

        given(mockDAO.findAccountByKey(account.getKey())).willReturn(account);

        Account acc = accountService.findAccount(account.getKey());
        assertThat(acc.getKey()).isEqualTo(account.getKey());
        assertThat(acc.getName()).isEqualTo(account.getName());
    }

    @Test(expected = AccountException.class)
    public void whenFindByUserId_AndNoAccountsFound_ThenReturnAccountException() throws Exception {
        given(mockDAO.findAccountsByUserId(anyLong())).willReturn(null);
        List<Account> userAccounts = accountService.findUser(1);

        assertThat(userAccounts).isNull();
    }

    @Test
    public void whenFindByValidUserId_thenReturnAccountList() throws Exception {
        Account account = new Account("User 1 Account 1", "First account for user 1");
        Account account2 = new Account("User 1 Account 2", "Second account for user 2");

        account.setUserId(1);
        account.setKey(KEY_1);
        account2.setUserId(1);
        account2.setKey(KEY_2);

        List<Account> userAccounts = Arrays.asList(account, account2);
        given(mockDAO.findAccountsByUserId(1)).willReturn(userAccounts);

        List<Account> foundAccounts = accountService.findUser(1);

        assertThat(foundAccounts.get(0).getKey()).isEqualTo(account.getKey());
        assertThat(foundAccounts.get(1).getKey()).isEqualTo(account2.getKey());
    }

    @Test(expected = AccountNotFoundException.class)
    public void whenUpdateMinBalance_andAccountNotFound_thenThrowAccountNotFoundException() throws AccountNotFoundException{
        given(mockDAO.findAccountByKey(anyString())).willReturn(null);
        Account account = new Account("Name", "Description");

        accountService.updateMinBalance(KEY_1, 100);
        verify(mockDAO, never()).save(account);
    }

    @Test
    public void whenUpdateMinBalance_andValidAccount_thenUpdateMinBalance_andReturnAccount() throws AccountNotFoundException{
        Account account = new Account("Minbalance account", " Account for testing minBalance");
        account.setKey(KEY_1);
        account.setMinBalance(0);

        given(mockDAO.findAccountByKey(account.getKey())).willReturn(account);
        long newMinBalance = 200;
        accountService.updateMinBalance(account.getKey(), newMinBalance);
        assertThat(account.getMinBalance()).isEqualTo(newMinBalance);
        verify(mockDAO).save(account);
    }

    @Test(expected = AccountNotFoundException.class)
    public void whenUpdateDescription_andAccountNotFound_thenThrowAccountNotFoundException() throws AccountNotFoundException{
        given(mockDAO.findAccountByKey(anyString())).willReturn(null);
        Account account = new Account("Name", "Description");

        accountService.updateDescription(KEY_1, "Updated Description");
        verify(mockDAO, never()).save(account);
    }

    @Test
    public void whenUpdateDescription_andValidAccount_thenUpdateMinBalance_andReturnAccount() throws AccountNotFoundException{
        Account account = new Account("Description Test account", " Account for testing description");
        account.setKey(KEY_1);

        given(mockDAO.findAccountByKey(account.getKey())).willReturn(account);
        String newDescription = "The accounts description has been updated";

        accountService.updateDescription(account.getKey(), newDescription);
        assertThat(account.getDescription()).isEqualTo(newDescription);
        verify(mockDAO).save(account);
    }

    @Test(expected = AccountNotFoundException.class)
    public void whenUpdateName_andAccountNotFound_thenThrowAccountNotFoundException() throws AccountNotFoundException{
        given(mockDAO.findAccountByKey(anyString())).willReturn(null);
        Account account = new Account("Name", "Description");

        accountService.updateName(KEY_1, "Updated Name");
    }

    @Test
    public void whenUpdateName_andValidAccount_thenUpdateMinBalance_andReturnAccount() throws AccountNotFoundException{
        Account account = new Account("Name Test account", " Account for testing description");
        account.setKey(KEY_1);

        given(mockDAO.findAccountByKey(account.getKey())).willReturn(account);
        String newName = "Updated Name Test account";

        accountService.updateName(account.getKey(), newName);
        assertThat(account.getName()).isEqualTo(newName);
        verify(mockDAO).save(account);
    }

    @Test
    public void whenTransfer_andValidRequest_thenUpdateBalancesAndReturnFromAccount() throws AccountException,
            AccountNotFoundException, AccountVersionException {

        Account fromAccount = new Account("From account", "The account sending the transaction");
        Account toAccount   = new Account("To account", "The account retrieving the transaction");

        long balance = 500;
        fromAccount.setKey(KEY_1);
        fromAccount.setVersion(1L);
        fromAccount.setBalance(balance);
        long fromAccountId = 1;

        toAccount.setKey(KEY_2);
        toAccount.setBalance(balance);

        long issuer = 1;
        long amount = 100;
        Transfer transfer = new Transfer(issuer, amount, fromAccountId, toAccount.getId());


        given(mockDAO.findOne(fromAccountId)).willReturn(fromAccount);
        given(mockDAO.findOne(toAccount.getId())).willReturn(toAccount);

        Account account = accountService.transfer(webRequest, transfer);

        verify(mockDAO).save(fromAccount);
        verify(mockDAO).save(toAccount);

        assertThat(account.getBalance()).isEqualTo(balance - amount);
        logger.info("FromAccount after transfer[version: {}, balance: {}]", account.getVersion(), account.getBalance());
    }

    @Test(expected = AccountNotFoundException.class)
    public void whenTransfer_andInvalidFromAccount_thenThrowAccountNotFoundException() throws AccountException,
            AccountNotFoundException, AccountVersionException {

        Account toAccount   = new Account("To account", "The account retrieving the transaction");
        toAccount.setKey(KEY_2);
        long fromAccountId = 1;

        long issuer = 1;
        long amount = 100;
        Transfer transfer = new Transfer(issuer, amount, fromAccountId, toAccount.getId());

        given(mockDAO.findOne(fromAccountId)).willReturn(null);
        given(mockDAO.findOne(toAccount.getId())).willReturn(toAccount);

        Account account = accountService.transfer(webRequest, transfer);
        verify(mockDAO, never()).save(account);
    }

    @Test(expected = AccountNotFoundException.class)
    public void whenTransfer_andInvalidToAccount_thenThrowAccountNotFoundException() throws AccountException,
            AccountNotFoundException, AccountVersionException {

        Account fromAccount   = new Account("From account", "The account sending the transaction");
        fromAccount.setKey(KEY_1);
        long toAccountId = 2;

        long issuer = 1;
        long amount = 100;
        Transfer transfer = new Transfer(issuer, amount, fromAccount.getId(), toAccountId);

        given(mockDAO.findOne(fromAccount.getId())).willReturn(fromAccount);
        given(mockDAO.findOne(toAccountId)).willReturn(null);

        Account account = accountService.transfer(webRequest, transfer);
        verify(mockDAO, never()).save(account);
    }

    @Test(expected = AccountException.class)
    public void whenTransfer_andMissingIfMatchHeader_thenThrowAccountException() throws AccountException,
            AccountNotFoundException, AccountVersionException {

        Account fromAccount = new Account("From account", "The account sending the transaction");
        Account toAccount   = new Account("To account", "The account retrieving the transaction");

        long balance = 500;
        fromAccount.setKey(KEY_1);
        fromAccount.setVersion(1);
        fromAccount.setBalance(balance);

        toAccount.setKey(KEY_2);
        toAccount.setBalance(balance);

        long issuer = 1;
        long amount = 100;
        Transfer transfer = new Transfer(issuer, amount, fromAccount.getId(), toAccount.getId());


        given(mockDAO.findOne(fromAccount.getId())).willReturn(fromAccount);
        given(mockDAO.findOne(toAccount.getId())).willReturn(toAccount);
        given(webRequest.getHeader("If-Match")).willReturn(null);

        Account account = accountService.transfer(webRequest, transfer);
        verify(mockDAO, never()).save(account);
    }

    @Test(expected = AccountVersionException.class)
    public void whenTransfer_andVersionMismatch_thenThrowAccountVersionException() throws AccountException,
            AccountNotFoundException, AccountVersionException {

        Account fromAccount = new Account("From account", "The account sending the transaction");
        Account toAccount   = new Account("To account", "The account retrieving the transaction");

        long balance = 500;
        fromAccount.setKey(KEY_1);
        fromAccount.setVersion(2);
        fromAccount.setBalance(balance);

        toAccount.setKey(KEY_2);
        toAccount.setBalance(balance);

        long issuer = 1;
        long amount = 100;
        Transfer transfer = new Transfer(issuer, amount, fromAccount.getId(), toAccount.getId());


        given(mockDAO.findOne(fromAccount.getId())).willReturn(fromAccount);
        given(mockDAO.findOne(toAccount.getId())).willReturn(toAccount);

        Account account = accountService.transfer(webRequest, transfer);
        verify(mockDAO, never()).save(account);
    }
}
