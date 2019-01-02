package nl.trifork.bank.accountms.DAO;

import nl.trifork.bank.accountms.model.Account;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AccountDAO extends CrudRepository<Account, Long>{

    /*Returns account if found, otherwise null*/
    Account findAccountByKey(String key);

    List<Account> findAccountsByUserId(long userId);

    List<Account> findAccountsByName(String name);


}
