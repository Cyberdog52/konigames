package com.andreskonrad.koni.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Player {

    private final String name;
    private PlayerState state = PlayerState.JOINED;
}

enum PlayerState {
    JOINED, PLAYING, FINISHED, MASON
}
