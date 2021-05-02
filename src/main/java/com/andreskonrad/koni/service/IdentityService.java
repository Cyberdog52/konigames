package com.andreskonrad.koni.service;

import com.andreskonrad.koni.dto.Identity;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class IdentityService {

    private Set<String> inMemoryUserNames = new HashSet<>();

    public Optional<Identity> getIdentity(String username) {
        if (!inMemoryUserNames.contains(username)) {
            return Optional.empty();
        }

        return Optional.of(new Identity(username));
    }

    public boolean login(Identity identity) {
        inMemoryUserNames.add(identity.getName());
        return true;
    }
}
