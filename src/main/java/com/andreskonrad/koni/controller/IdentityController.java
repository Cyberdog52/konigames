package com.andreskonrad.koni.controller;

import com.andreskonrad.koni.dto.Identity;
import com.andreskonrad.koni.service.IdentityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping("/api/identity")
public class IdentityController {

    @Autowired
    private IdentityService identityService;

    @RequestMapping("/exists")
    public ResponseEntity<Identity> get(@RequestBody Identity requestedIdentity) {
        Optional<Identity> identity = identityService.getIdentity(requestedIdentity.getName());
        if (identity.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND ,"User " + requestedIdentity + " does not exist.");
        }
        return ResponseEntity.ok(identity.get());
    }

    @PostMapping("/login")
    public ResponseEntity<HttpStatus> login(@RequestBody Identity identity){
        boolean success = identityService.login(identity);
        if (success) {
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }
}
