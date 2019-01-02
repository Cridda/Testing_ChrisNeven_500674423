package nl.trifork.bank.accountms.model.oauth;

import nl.trifork.bank.accountms.model.Person;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.util.StringUtils;

import java.util.Collection;
import java.util.Set;

public class PersonAuthentication implements Authentication {

    Collection<? extends GrantedAuthority> authorities;
    Set<String> scopes;
    String name;
    String credentials;
    String principal;
    Person details;
    boolean authenticated = false;

    public PersonAuthentication(Person person, String authorities, String scopes) {
        this.authorities = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
        this.scopes = StringUtils.commaDelimitedListToSet(scopes);

        if(person != null) {
            this.name = person.getFirstName() + ' ' + person.getLastName();
            this.credentials = person.getPassword();
            this.principal = person.getEmail();
            this.details = person;
        }
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public Set<String> getScopes() { return scopes; }

    @Override
    public Object getCredentials() {
        return credentials;
    }

    @Override
    public Person getDetails() {
        return details;
    }

    @Override
    public Object getPrincipal() {
        return principal;
    }

    @Override
    public boolean isAuthenticated() {
        return authenticated;
    }

    @Override
    public void setAuthenticated(boolean b) throws IllegalArgumentException { authenticated = b; }

    @Override
    public String getName() {
        return name;
    }
}
