package com.andreskonrad.koni.service;

import com.andreskonrad.koni.dto.Game;
import com.andreskonrad.koni.dto.GameState;
import com.andreskonrad.koni.dto.GameType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LobbyService {

    private final WerwoerterService werwoerterService;
    private final WerwoelfleService werwoelfleService;
    private final LeiterliService leiterliService;
    private final TempelService tempelService;

    private List<Game> games = new ArrayList<Game>();

    @Autowired
    public LobbyService(WerwoerterService werwoerterService, WerwoelfleService werwoelfleService, LeiterliService leiterliService, TempelService tempelService) {
        this.werwoerterService = werwoerterService;
        this.werwoelfleService = werwoelfleService;
        this.leiterliService = leiterliService;
        this.tempelService = tempelService;
    }

    public List<Game> getGames() {
        return games;
    }

    public Game createGame(String gameName, String profileName, GameType gameType) throws IllegalArgumentException {
        //check if already exists with same name
        Game game = getGame(gameName);
        if (game != null) throw new IllegalArgumentException("game already exists");

        //create new
        game = new Game(gameName, gameType, profileName);
        games.add(game);
        joinGame(gameName, profileName);
        return game;
    }

    public Game joinGame(String gameName, String profileName) {
        Game game = getGame(gameName);
        if (game == null) return null;
        game.join(profileName);
        return game;
    }

    private Game getGame(String gameName) {
        Game game = games.stream()
                .filter(game1 -> game1.getName().equals(gameName))
                .findFirst().orElse(null);
        if (game == null) return null;
        return game;
    }

    public Game leaveGame(String gameName, String profileName) {
        Game game = getGame(gameName);
        if (game == null) return null;
        game.leave(profileName);
        return game;
    }

    public Game deleteGame(String gameName) {
        Game game = getGame(gameName);
        if (game == null) return null;
        game.setGameState(GameState.DELETED);
        return game;
    }

    public void startGame(String gameName) {
        Game game = getGame(gameName);
        if (game == null) return;
        game.setGameState(GameState.RUNNING);

        switch(game.getGameType()) {
            case WERWOERTER: {
                werwoerterService.start(game);
                break;
            }
            case WERWOELFLE: {
                werwoelfleService.start(game);
            }
            case LEITERLI: {
                leiterliService.start(game);
            }
            case TEMPEL: {
                tempelService.start(game);
            }
        }

    }
}
