const btn_map = [
    "A",
    "B",
    "X",
    "Y",
    "LB",
    "RB",
    "LT",
    "RT",
    "BACK",
    "START",
    "LS",
    "RS",
    "DP_UP",
    "DP_DOWN",
    "DP_LEFT",
    "DP_RIGHT",
    "MENU"
]

const btn_converter = {
    A: {code: "Space"},
    B: {code: ""},
    X: {code: ""},
    Y: {code: ""},
    LB: {code: ""},
    RB: {code: ""},
    LT: {code: ""},
    RT: {code: ""},
    BACK: {code: ""},
    START: {code: ""},
    LS: {code: ""},
    RS: {code: ""},
    DP_UP: {code: "KeyW"},
    DP_DOWN: {code: "KeyS"},
    DP_LEFT: {code: "KeyA"},
    DP_RIGHT: {code: "KeyD"},
    MENU: {code: ""}
}

let pressed = {};