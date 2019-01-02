package nl.trifork.bank.accountms.config;

import nl.trifork.bank.accountms.model.Person;
import nl.trifork.bank.accountms.model.oauth.PersonAuthentication;
import nl.trifork.bank.accountms.model.Role;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;

import static org.springframework.security.web.context.HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    protected static String[] openRoutes = new String[] {};

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests().antMatchers(openRoutes).permitAll().and()
                .authorizeRequests().anyRequest().authenticated().and()
                .httpBasic().disable()
                .csrf().disable()
                .addFilterBefore(new OAuth2SecurityFilter(), SecurityContextPersistenceFilter.class);
    }

    public static class OAuth2SecurityFilter extends OncePerRequestFilter {

        // Doesn't inject automatically needs fix!
        @Value("${security.oauth2.resource.token-info-uri}")
        String tokenInfoUri = "http://localhost:8080/authentication-ms/oauth/check_token";

        @Override
        protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
            boolean shouldNotFilter = false;

            for(String route : openRoutes) if(request.getRequestURI().equals(route)) {
                System.out.println("Matches? " + request.getRequestURI() + " " + route);

                shouldNotFilter = true;
            }

            return shouldNotFilter;
        }

        @Override
        protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, FilterChain filterChain) throws ServletException, IOException {
            String authorizationHeader = httpServletRequest.getHeader("Authorization");

            if(authorizationHeader == null) throw new AuthenticationCredentialsNotFoundException("Authorization header could not be found on request.");

            String accessToken = authorizationHeader.split("\\s+")[1];

            if(accessToken == null) throw new AuthenticationCredentialsNotFoundException("Authorization header content is invalid: " + authorizationHeader);

            RestTemplate restTemplate = new RestTemplate();
            HashMap<String, ?> results = restTemplate.getForObject(tokenInfoUri + "?token=" + accessToken, HashMap.class);

            Person person = null;
            if((Integer) results.get("id") > 0) {
                person = new Person(
                        Long.valueOf((Integer) results.get("id")),
                        (String) results.get("email"),
                        (String) results.get("password"),
                        (String) results.get("firstName"),
                        (String) results.get("lastName"),
                        Role.valueOf((String) results.get("role")),
                        (Boolean) results.get("enabled"));
            }

            PersonAuthentication personAuthentication = new PersonAuthentication(person, (String) results.get("authorities"), (String) results.get("scopes"));
            personAuthentication.setAuthenticated(true);

            SecurityContext sc = SecurityContextHolder.getContext();
            sc.setAuthentication(personAuthentication);

            HttpSession session = httpServletRequest.getSession(true);
            session.setAttribute(SPRING_SECURITY_CONTEXT_KEY, sc);

            filterChain.doFilter(httpServletRequest, httpServletResponse);
        }
    }
}
