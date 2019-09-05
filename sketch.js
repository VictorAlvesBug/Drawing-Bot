var clicks;
var formas;
var tempForma;
var tempPontos;

var tamanhoFonte = 14;

var pointerCont = 0;
var pointerIndex = 0;

var teclaEstaPressionada = false;
var delayTecla = 0;
var codigoTecla;

var stopLoop = false;
var resizing = false;
var lastResize = 60;

var botoes;

var mostrarHistorico = false;

var btnGcode;
var txtGcode;

var areaDesenhavelX;
var areaDesenhavelY;
var areaDesenhavelWidth;
var areaDesenhavelHeight;

var areaDesenhavelX_Anterior;
var areaDesenhavelY_Anterior;
var areaDesenhavelWidth_Anterior;
var areaDesenhavelHeight_Anterior;

var jaFoiClicado = false;

var modo;
const HISTORICO = -2;
const GERAR_GCODE = -1;
const POINT = 0;
const LINE = 1;
const RECT = 2;
const ELLIPSE = 3;
const TRIANGLE = 4;
const STAR = 5;
const FREE_DRAWING = 6;
const ABC = 7;
const FIAP = 8;

const HOVER = 0;
const NO_HOVER = 1;
const CLICKED = 2;

var historicoPagina = 1;

var bloqueiaClick = false;

var myMouseX;
var myMouseY;

const alfabeto = {
    '0': [[0.6, 0.1], [0.5, 0], [0.1, 0], [0, 0.1], [0.6, 0.8], [0, 0.1], [0, 0.9], [0.1, 1], [0.5, 1], [0.6, 0.9], [0.6, 0.1]],
    '1': [[0, 0.8], [0.3, 1], [0.3, 0], [0, 0], [0.6, 0]],
    '2': [[0, 0.9], [0.1, 1], [0.5, 1], [0.6, 0.9], [0.6, 0.7], [0, 0], [0.6, 0]],
    '3': [[0, 1], [0.5, 1], [0.6, 0.9], [0.6, 0.7], [0.5, 0.6], [0.1, 0.6], [0.5, 0.6], [0.6, 0.5], [0.6, 0.13], [0.5, 0], [0, 0]],
    '4': [[0, 1], [0, 0.7], [0.1, 0.6], [0.6, 0.6], [0.6, 1], [0.6, 0]],
    '5': [[0.6, 1], [0, 1], [0, 0.7], [0.1, 0.6], [0.5, 0.6], [0.6, 0.5], [0.6, 0.1], [0.5, 0], [0.1, 0], [0, 0.1]],
    '6': [[0.6, 0.9], [0.5, 1], [0.1, 1], [0, 0.9], [0, 0.1], [0.1, 0], [0.5, 0], [0.6, 0.1], [0.6, 0.5], [0.5, 0.6], [0.1, 0.6], [0, 0.5]],
    '7': [[0, 1], [0.6, 1], [0.6, 0.8], [0.2, 0]],
    '8': [[0.5, 1], [0.6, 0.9], [0.6, 0.7], [0.5, 0.6], [0.3, 0.6], [0.5, 0.6], [0.6, 0.5], [0.6, 0.1], [0.5, 0], [0.1, 0], [0, 0.1], [0, 0.5], [0.1, 0.6], [0.3, 0.6], [0.1, 0.6], [0, 0.7], [0, 0.9], [0.1, 1], [0.5, 1]],
    '9': [[0, 0.1], [0.1, 0], [0.5, 0], [0.6, 0.1], [0.6, 0.9], [0.5, 1], [0.1, 1], [0, 0.9], [0, 0.7], [0.1, 0.6], [0.5, 0.6], [0.6, 0.7]],
    'A': [[0, 0], [0.375, 1], [0.5625, 0.5], [0.1875, 0.5], [0.5625, 0.5], [0.75, 0]],
    'B': [[0, 0.5], [0, 1], [0.625, 1], [0.75, 0.875], [0.75, 0.625], [0.625, 0.5], [0, 0.5], [0.625, 0.5], [0.75, 0.375], [0.75, 0.125], [0.625, 0], [0, 0], [0, 0.5]],
    'C': [[0.75, 0.125], [0.625, 0], [0.125, 0], [0, 0.125], [0, 0.875], [0.125, 1], [0.625, 1], [0.75, 0.875]],
    'D': [[0, 0.5], [0, 1], [0.625, 1], [0.75, 0.875], [0.75, 0.125], [0.625, 0], [0, 0], [0, 0.5]],
    'E': [[0.75, 0], [0, 0], [0, 0.5], [0.5, 0.5], [0, 0.5], [0, 1], [0.75, 1]],
    'F': [[0, 0], [0, 0.5], [0.5, 0.5], [0, 0.5], [0, 1], [0.75, 1]],
    'G': [[0.75, 0.5], [0.5, 0.5], [0.75, 0.5], [0.75, 0.125], [0.625, 0], [0.125, 0], [0, 0.125], [0, 0.875], [0.125, 1], [0.625, 1], [0.75, 0.875]],
    'H': [[0, 0], [0, 1], [0, 0.5], [0.75, 0.5], [0.75, 1], [0.75, 0]],
    'I': [[0, 0], [0.5, 0], [0.25, 0], [0.25, 1], [0, 1], [0.5, 1]],
    'J': [[0, 0.125], [0.125, 0], [0.375, 0], [0.5, 0.125], [0.5, 1]],
    'K': [[0.75, 1], [0, 0.5], [0, 1], [0, 0], [0, 0.5], [0.120, 0.560], [0.75, 0]],
    'L': [[0, 0], [0, 1], [0, 0], [0.75, 0]],
    'M': [[0, 0], [0, 1], [0.5, 0.5], [1, 1], [1, 0]],
    'N': [[0, 0], [0, 1], [0.75, 0], [0.75, 1]],
    'O': [[0, 0.2], [0, 0.8], [0.2, 1], [0.6, 1], [0.8, 0.8], [0.8, 0.2], [0.6, 0], [0.2, 0], [0, 0.2]],
    'P': [[0, 0], [0, 1], [0.625, 1], [0.75, 0.875], [0.75, 0.625], [0.625, 0.5], [0, 0.5]],
    'Q': [[0.75, 0.125], [0.625, 0], [0.125, 0], [0, 0.125], [0, 0.875], [0.125, 1], [0.625, 1], [0.75, 0.875], [0.75, 0.125], [0.875, 0], [0.625, 0.25]],
    'R': [[0, 0], [0, 1], [0.625, 1], [0.75, 0.875], [0.75, 0.625], [0.625, 0.5], [0, 0.5], [0.3125, 0.5], [0.75, 0]],
    'S': [[0, 0.125], [0.125, 0], [0.625, 0], [0.75, 0.125], [0.75, 0.375], [0.675, 0.5], [0.125, 0.5], [0, 0.625], [0, 0.875], [0.125, 1], [0.625, 1], [0.75, 0.875]],
    'T': [[0, 1], [0.5, 1], [0.5, 0], [0.5, 1], [1, 1]],
    'U': [[0, 1], [0, 0.125], [0.125, 0], [0.625, 0], [0.75, 0.125], [0.75, 1]],
    'V': [[0, 1], [0.375, 0], [0.75, 1]],
    'W': [[0, 1], [0.25, 0], [0.5, 0.75], [0.75, 0], [1, 1]],
    'X': [[0, 0], [0.375, 0.5], [0, 1], [0.375, 0.5], [0.75, 1], [0.375, 0.5], [0.75, 0]],
    'Y': [[0, 1], [0.375, 0.5], [0.375, 0], [0.375, 0.5], [0.75, 1]],
    'Z': [[0, 1], [0.75, 1], [0, 0], [0.75, 0]]
};

const fiap = {
    'F1': [[0, 0], [0, 1], [0.226, 1]],
    'F2': [[0.074, 0.5], [0.17, 0.5]],
    'I': [[0.295, 0], [0.295, 1]],
    'A1': [[0.36, 0], [0.524, 1], [0.615, 0.446]],
    'A2': [[0.647, 0.262], [0.688, 0]],
    'P': [[0.752, 0], [0.752, 1], [0.834, 1], [0.919, 1], [0.95, 0.977], [0.976, 0.912], [0.994, 0.815], [1, 0.7], [0.994, 0.585], [0.976, 0.488], [0.95, 0.423], [0.919, 0.4], [0.834, 0.4]]
};

$(window).on('resize', function () {
    resizing = true;
    lastResize = 0;
    resizeCanvas(window.innerWidth - /*1*/26, window.innerHeight - 20);
    desenharBordaCanvas();

    botoes[9].y = height - 30;
    botoes[10].x = width - 175;
    btnGcode.position(width -172, height - 30);
    txtGcode.position(width  -172, 50);
    btnGcode.style(`width: 188px;`);
    txtGcode.style(`height: ${height - 100}px;`);


    for (var i = 0; i < formas.length; i++) {
        for (var c = 0; c < formas[i].clique.length; c++) {
            formas[i].clique[c].x = map(formas[i].clique[c].x, areaDesenhavelX_Anterior, areaDesenhavelX_Anterior + areaDesenhavelWidth_Anterior, areaDesenhavelX, areaDesenhavelX + areaDesenhavelWidth);
            formas[i].clique[c].y = map(formas[i].clique[c].y, areaDesenhavelY_Anterior, areaDesenhavelY_Anterior + areaDesenhavelHeight_Anterior, areaDesenhavelY, areaDesenhavelY + areaDesenhavelHeight);
        }
        formas[i].fontSize = map(formas[i].fontSize, 0, areaDesenhavelHeight_Anterior, 0, areaDesenhavelHeight);
    }

    for (var i = 0; i < clicks.length; i++) {
        clicks[i].x = map(clicks[i].x, areaDesenhavelX_Anterior, areaDesenhavelX_Anterior + areaDesenhavelWidth_Anterior, areaDesenhavelX, areaDesenhavelX + areaDesenhavelWidth);
        clicks[i].y = map(clicks[i].y, areaDesenhavelY_Anterior, areaDesenhavelY_Anterior + areaDesenhavelHeight_Anterior, areaDesenhavelY, areaDesenhavelY + areaDesenhavelHeight);
    }

    for (var i = 0; i < tempPontos.length; i++) {
        tempPontos[i].x = map(tempPontos[i].x, areaDesenhavelX_Anterior, areaDesenhavelX_Anterior + areaDesenhavelWidth_Anterior, areaDesenhavelX, areaDesenhavelX + areaDesenhavelWidth);
        tempPontos[i].y = map(tempPontos[i].y, areaDesenhavelY_Anterior, areaDesenhavelY_Anterior + areaDesenhavelHeight_Anterior, areaDesenhavelY, areaDesenhavelY + areaDesenhavelHeight);
    }

    tamanhoFonte = map(tamanhoFonte, 0, areaDesenhavelHeight_Anterior, 0, areaDesenhavelHeight);

    if (tempForma != undefined && tempForma.modo == ABC) {
        tempForma.clique[0].x = map(tempForma.clique[0].x, areaDesenhavelX_Anterior, areaDesenhavelX_Anterior + areaDesenhavelWidth_Anterior, areaDesenhavelX, areaDesenhavelX + areaDesenhavelWidth);
        tempForma.clique[0].y = map(tempForma.clique[0].y, areaDesenhavelY_Anterior, areaDesenhavelY_Anterior + areaDesenhavelHeight_Anterior, areaDesenhavelY, areaDesenhavelY + areaDesenhavelHeight);
    }

    desenharFormas();
    desenharBarraDeBotoes();
    delayTeclado();
    pointerCont++;

    areaDesenhavelX_Anterior = areaDesenhavelX;
    areaDesenhavelY_Anterior = areaDesenhavelY;
    areaDesenhavelWidth_Anterior = areaDesenhavelWidth;
    areaDesenhavelHeight_Anterior = areaDesenhavelHeight;
});

function setup() {
    var canvas = createCanvas(window.innerWidth - /*1*/26, window.innerHeight - 20);
    canvas.position(10, 10);
    clicks = [];
    tempForma = undefined;
    formas = [];
    modo = POINT;
    tempPontos = [];

    botoes = [];

    for (var i = POINT; i <= FIAP; i++) {
        botoes.push(new Botao(10, 10 + 60 * i, i));
    }

    botoes.push(new Botao(10, height - 30, GERAR_GCODE));

    botoes.push(new Botao(width - 175, 1, HISTORICO));

    btnGcode = createButton('DRAW GCODE');
    btnGcode.mousePressed(function () {
        if (txtGcode.value() != "") {
            stopLoop = true;
            desenharGcode(txtGcode.value());
        }
    });
    btnGcode.position(width - 172, height - 30);
    btnGcode.style("border: 2px solid #E91C5D;" +
        "color: #E91C5D;" +
        "cursor: pointer;" +
        "display: inline-block;" +
        "width: 188px;" +
        "letter-spacing: 1px;" +
        "padding: 10px 15px;" +
        "font-weight: bold;" +
        "text-transform: uppercase;" +
        "-webkit-transition: background .4s, border-color .4s, color .4s;" +
        "transition: background .4s, border-color .4s, color .4s;");

    txtGcode = createElement('textarea');
    txtGcode.id('txtGcode');
    txtGcode.position(width - 172, 50);
    txtGcode.style("border: 1px solid #E91C5D;" +
        "cursor: pointer;" +
        "display: inline-block;" +
        "overflow-y: scroll;" +
        "width: 182px;" +
        `height: ${height - 100}px;` +
        "resize: none;" +
        "font-weight: bold;" +
        "text-transform: uppercase;" +
        "-webkit-transition: background .4s, border-color .4s, color .4s;" +
        "transition: background .4s, border-color .4s, color .4s;");
}

function draw() {
    if (lastResize < 10) {
        lastResize++;
    }
    else {
        resizing = false;
    }

    if (!stopLoop && !resizing) {
        background(255);

        desenharGrid();

        desenharBarraDeBotoes();
        delayTeclado();
        pointerCont++;

            if (mostrarHistorico) {
                desenharHistorico();
            }
            else {
                desenharFormas();
            }

        if (mouseX > areaDesenhavelX && mouseX < areaDesenhavelX + areaDesenhavelWidth && mouseY > areaDesenhavelY && mouseY < areaDesenhavelY + areaDesenhavelHeight) {
            noCursor();

            if (keyIsDown(16)) {
                myMouseX = mouseX + (areaDesenhavelWidth / 80) - (mouseX + (areaDesenhavelWidth / 80) - areaDesenhavelX) % (areaDesenhavelWidth / 40);
                myMouseY = mouseY + (areaDesenhavelHeight / 80) - (mouseY + (areaDesenhavelHeight / 80) - areaDesenhavelY) % (areaDesenhavelHeight / 40);
            }
            else {
                myMouseX = mouseX;
                myMouseY = mouseY;
            }

            stroke(0);
            strokeWeight(2);
            line(myMouseX - 10, myMouseY, myMouseX + 10, myMouseY);
            line(myMouseX, myMouseY - 10, myMouseX, myMouseY + 10);

            point(mouseX, mouseY);
        }
        else {
            cursor(ARROW);
            myMouseX = mouseX;
            myMouseY = mouseY;
        }

        if (!resizing) {
            desenharBordaCanvas();
            areaDesenhavelX_Anterior = areaDesenhavelX;
            areaDesenhavelY_Anterior = areaDesenhavelY;
            areaDesenhavelWidth_Anterior = areaDesenhavelWidth;
            areaDesenhavelHeight_Anterior = areaDesenhavelHeight;
        }
    }
}

String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

String.prototype.removeByIndex = function (index) {
    if (index >= 0) {
        return this.slice(0, index) + this.slice(index + 1);
    }
    else {
        return this;
    }
};

function maximoX(pontosLetra) {
    var maximo = 0;

    for (var i = 0; i < pontosLetra.length; i++) {
        if (maximo < pontosLetra[i][0]) {
            maximo = pontosLetra[i][0];
        }
    }

    return maximo;
}

function removerPontosDesnecessarios(pontos) {
    for (var i = pontos.length - 1; i > 1; i--) {
        var p1 = pontos[i - 2];
        var p2 = pontos[i - 1];
        var p3 = pontos[i];

        var distancia_12 = dist(p1.x, p1.y, p2.x, p2.y);
        var distancia_23 = dist(p2.x, p2.y, p3.x, p3.y);
        var distancia_13 = dist(p1.x, p1.y, p3.x, p3.y);

        if (distancia_12 + distancia_23 <= distancia_13) {
            pontos.splice(i - 1, 1);
        }
        else if ((int(p1.x) == int(p2.x) && int(p1.y) == int(p2.y)) || (int(p2.x) == int(p3.x) && int(p2.y) == int(p3.y))) {
            pontos.splice(i - 1, 1);
        }
    }

    return pontos;
}

function desenharGrid() {
    strokeWeight(1);
    var corGridPrincipal = color(192);
    var corGridSecundario = color(192,60);
    var par = false;
    for (var x = areaDesenhavelX; x < areaDesenhavelX + areaDesenhavelWidth; x += areaDesenhavelWidth / 40) {
        if (par) {
            stroke(corGridSecundario);
        }
        else {
            stroke(corGridPrincipal);
        }
        line(x, areaDesenhavelY, x, areaDesenhavelY + areaDesenhavelHeight);
        par = !par;
    }

    par = false;
    for (var y = areaDesenhavelY; y < areaDesenhavelY + areaDesenhavelHeight; y += areaDesenhavelHeight / 40) {
        if (par) {
            stroke(corGridSecundario);
        }
        else {
            stroke(corGridPrincipal);
        }
        line(areaDesenhavelX, y, areaDesenhavelX + areaDesenhavelWidth, y);
        par = !par;
    }
}

function desenharBordaCanvas() {
    noFill();
    stroke(0);
    strokeWeight(2);

    var menorLado = min(width - 262, height+11);

    areaDesenhavelX = 80 + (width - 262 - menorLado) / 2;
    areaDesenhavelY = 6+(height - menorLado) / 2;
    areaDesenhavelWidth = menorLado - 12;
    areaDesenhavelHeight = menorLado - 12;

    rect(areaDesenhavelX, areaDesenhavelY, areaDesenhavelWidth, areaDesenhavelHeight);
}

function delayTeclado() {
    if (!teclaEstaPressionada && delayTecla > 0) {
        delayTecla--;
    }
    else {
        teclaEstaPressionada = true;
    }

    if (teclaEstaPressionada && pointerCont % 6 == 0) {
        eventoTecla();
    }

    if (!keyIsPressed) {
        teclaEstaPressionada = false;
    }
}