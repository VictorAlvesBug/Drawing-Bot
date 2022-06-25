function mouseClicked() {
    if (myMouseX > areaDesenhavelX &&
        myMouseX < areaDesenhavelX + areaDesenhavelWidth &&
        myMouseY > areaDesenhavelY &&
        myMouseY < areaDesenhavelY + areaDesenhavelHeight) {

        if ($('.meu-modal-container').hasClass('is-active')) {

            $(document).on('click', '.fechar', function () {
                $('.meu-modal-container').removeClass('is-active');
            });

        }
        else {
            switch (modo) {
                case POINT:
                    clicks = [];
                    clicks.push(createVector(myMouseX, myMouseY));
                    formas.push(new Forma(modo, clicks));
                    clicks = [];
                    tempForma = undefined;
                    break;
                case LINE:
                case RECT:
                case ELLIPSE:
                case STAR:
                case FIAP:
                    if (clicks.length == 0) {
                        clicks.push(createVector(myMouseX, myMouseY));
                    }
                    else {
                        clicks.push(createVector(myMouseX, myMouseY));
                        formas.push(new Forma(modo, clicks));
                        clicks = [];
                        tempForma = undefined;
                    }
                    break;
                case TRIANGLE:
                    if (clicks.length <= 1) {
                        clicks.push(createVector(myMouseX, myMouseY));
                    }
                    else {
                        clicks.push(createVector(myMouseX, myMouseY));
                        formas.push(new Forma(modo, clicks));
                        clicks = [];
                        tempForma = undefined;
                    }
                    break;
                case FREE_DRAWING:
                    if (clicks.length == 0) {
                        clicks.push(createVector(myMouseX, myMouseY));
                    }
                    else {
                        formas.push(new Forma(modo, tempPontos));
                        tempPontos = [];
                        clicks = [];
                        tempForma = undefined;
                    }
                    break;
                case ABC:
                    if (tempForma != undefined && tempForma.texto.length > 0) {
                        formas.push(tempForma);
                    }

                    tempPontos = [];
                    tempPontos.push(createVector(myMouseX, myMouseY));
                    tempForma = new Forma(modo, tempPontos);
                    tempPontos = [];
                    clicks = [];
                    break;
            }
        }
    }
    else {
        for (var i = 0; i < botoes.length; i++) {
            if (myMouseX > botoes[i].x && myMouseX < botoes[i].x + botoes[i].largura &&
                myMouseY > botoes[i].y && myMouseY < botoes[i].y + botoes[i].altura) {
                if (modo == ABC && tempForma != undefined && tempForma.texto.length > 0) {
                    formas.push(tempForma);
                }
                botoes[i].click();
            }
        }
    }
}

function keyPressed() {
    teclaEstaPressionada = false;
    codigoTecla = keyCode;
    delayTecla = 30;
    eventoTecla();
}

function eventoTecla() {
    if (keyIsDown(17) && keyIsDown(90)) { //CTRL + Z
        pointerIndex = 0;
        if (modo == ABC) {
            if (formas.length > 0 && formas[formas.length - 1].modo == ABC) {
                let auxModo = formas[formas.length - 1].modo;
                let auxClique = formas[formas.length - 1].clique;
                let auxTexto = formas[formas.length - 1].texto;
                let auxFontSize = formas[formas.length - 1].fontSize;
                tamanhoFonte = auxFontSize;
                tempForma = new Forma(auxModo, auxClique);
                tempForma.texto = auxTexto;
                formas.splice(-1, 1);
            }
            else {
                if (tempForma == undefined) {
                    formas.splice(-1, 1);
                }

                clicks = [];
                tempPontos = [];
                tempForma = undefined;
            }
        }
        else {
            if (formas.length > 0 && formas[formas.length - 1].modo == ABC) {
                if (clicks.length == 0) {
                    let auxModo = formas[formas.length - 1].modo;
                    let auxClique = formas[formas.length - 1].clique;
                    let auxTexto = formas[formas.length - 1].texto;
                    tempForma = new Forma(auxModo, auxClique);
                    tempForma.texto = auxTexto;
                    formas.splice(-1, 1);
                }

                clicks = [];
                tempPontos = [];
                tempForma = undefined;
            }
            else {
                if (clicks.length == 0) {
                    formas.splice(-1, 1);
                }

                clicks = [];
                tempPontos = [];
                tempForma = undefined;
            }
        }
    }
    else if (tempForma != undefined) {
        if (modo == ABC) {
            if (pointerIndex < -tempForma.texto.length) {
                pointerIndex = -tempForma.texto.length;
            }

            if (keyRangeIsDown(65, 90)) { //LETRAS DE 'A' A 'Z'
                tempForma.texto =
                    tempForma.texto.splice(tempForma.texto.length + pointerIndex, 0,
                        String.fromCharCode(codigoTecla));
            }
            if (keyRangeIsDown(48, 57)) { //NUMEROS DE '0' A '9'
                tempForma.texto =
                    tempForma.texto.splice(tempForma.texto.length + pointerIndex, 0,
                        codigoTecla - 48);
            }
            if (keyRangeIsDown(96, 105)) { //NUMEROS DE '0' A '9' DO NUMPAD
                tempForma.texto =
                    tempForma.texto.splice(tempForma.texto.length + pointerIndex, 0,
                        codigoTecla - 96);
            }
            if (keyIsDown(32)) { //TECLA ESPACO
                tempForma.texto =
                    tempForma.texto.splice(tempForma.texto.length + pointerIndex, 0,
                        " ");
            }
            if (keyIsDown(ENTER)) {
                tempForma.texto =
                    tempForma.texto.splice(tempForma.texto.length + pointerIndex, 0,
                        "/");
            }
            if (keyIsDown(BACKSPACE)) {
                tempForma.texto =
                    tempForma.texto.removeByIndex(tempForma.texto.length - 1 + pointerIndex);

            }
            if (keyIsDown(46)) { //TECLA DELETE
                tempForma.texto =
                    tempForma.texto.removeByIndex(tempForma.texto.length + pointerIndex);
                if (pointerIndex < 0) {
                    pointerIndex++;
                }
            }
            if (keyIsDown(37)) { //SETA PARA A ESQUERDA
                pointerIndex--;
            }
            if (keyIsDown(39)) { //SETA PARA A DIREITA
                if (pointerIndex < 0) {
                    pointerIndex++;
                }
            }
        }
    }
}

function keyRangeIsDown(minKey, maxKey) {
    for (var k = minKey; k <= maxKey; k++) {
        if (keyIsDown(k)) {
            return true;
        }
    }
    return false;
}

function mouseWheel(event) {
    // ^ --> negativo
    // v --> positivo
    if (event.delta < 0) {
        tamanhoFonte += 3;
    }
    else if (tamanhoFonte > 3) {
        tamanhoFonte -= 3;
    }
}