class Forma {
    constructor(modo, clique) {
        this.modo = modo;
        this.clique = clique;
        this.texto = "";
        this.fontSize = tamanhoFonte;
        pointerIndex = 0;
    }

    getPontos() {
        var auxPontos = [];

        var centroX, centroY, raioX, raioY, diametroX, diametroY, largura, altura;

        switch (this.modo) {
            case POINT:
            case LINE:
                return this.clique;
            case RECT:
                auxPontos.push(createVector(this.clique[0].x, this.clique[0].y));
                auxPontos.push(createVector(this.clique[1].x, this.clique[0].y));
                auxPontos.push(createVector(this.clique[1].x, this.clique[1].y));
                auxPontos.push(createVector(this.clique[0].x, this.clique[1].y));
                auxPontos.push(createVector(this.clique[0].x, this.clique[0].y));
                return auxPontos;
            case ELLIPSE:
                centroX = this.clique[0].x;
                centroY = this.clique[0].y;
                raioX = (this.clique[1].x - this.clique[0].x);
                raioY = (this.clique[1].y - this.clique[0].y);

                var numeroSegmentos = 64;

                for (var angulo = 0; angulo < TWO_PI + TWO_PI / numeroSegmentos; angulo += TWO_PI / numeroSegmentos) {
                    let x = centroX + raioX * cos(angulo);
                    let y = centroY + raioY * sin(angulo);
                    auxPontos.push(createVector(x, y));
                }

                return auxPontos;
                break;
            case STAR:
                centroX = this.clique[0].x;
                centroY = this.clique[0].y;
                raioX = (this.clique[1].x - this.clique[0].x);
                raioY = (this.clique[1].y - this.clique[0].y);

                for (var angulo = -PI / 2; angulo <= TWO_PI - PI / 2; angulo += TWO_PI / 10) {
                    let x, y;
                    if ((angulo + PI / 2) % (TWO_PI / 5) == 0) {
                        x = centroX + raioX * cos(angulo);
                        y = centroY + raioY * sin(angulo);
                    }
                    else {
                        x = centroX + raioX * cos(angulo) * 2 / 5;
                        y = centroY + raioY * sin(angulo) * 2 / 5;
                    }
                    auxPontos.push(createVector(x, y));
                }
                return auxPontos;
            case TRIANGLE:
                auxPontos = auxPontos.concat(this.clique);
                auxPontos.push(this.clique[0]);
                return auxPontos;
            case FREE_DRAWING:
                return removerPontosDesnecessarios(this.clique);
            case ABC:
                var x = this.clique[0].x;
                var y = this.clique[0].y;
                var espacamentoLetras = this.fontSize * 0.4;

                var sizeX = this.fontSize;
                var sizeY = this.fontSize;
                this.texto = this.texto.toUpperCase();
                for (var a = 0; a < this.texto.length; a++) {
                    var letra = this.texto[a];
                    if ((letra >= "A" && letra <= "Z") || (letra >= "0" && letra <= "9")) {
                        var pontosLetra = alfabeto[letra];
                        for (var i = 0; i < pontosLetra.length; i++) {
                            auxPontos.push(createVector(x + sizeX * pontosLetra[i][0], y - sizeY * pontosLetra[i][1]));
                        }
                        if (a + 1 < this.texto.length) {
                            auxPontos.push(createVector(0, 0));
                        }

                        var larguraLetra = sizeX * maximoX(pontosLetra);

                        x += larguraLetra + espacamentoLetras;
                    }
                    else if (letra == " ") {
                        x += sizeX + espacamentoLetras;
                    }
                    else if (letra == "/") {
                        x = this.clique[0].x;
                        y += sizeY + 2 * espacamentoLetras;
                    }
                }
                return auxPontos;
            case FIAP:
                centroX = this.clique[0].x;
                centroY = this.clique[0].y;
                largura = (this.clique[1].x - this.clique[0].x) * 2;
                altura = largura / 3.6795;

                var x = centroX - largura / 2;
                var y = centroY + altura / 2;

                var partes = ['F1', 'F2', 'I', 'A1', 'A2', 'P'];

                for (var p = 0; p < partes.length; p++) {
                    var pontosParte = fiap[partes[p]];
                    for (var i = 0; i < pontosParte.length; i++) {
                        auxPontos.push(createVector(x + largura * pontosParte[i][0], y - altura * pontosParte[i][1]));
                    }
                    if (p + 1 < partes.length) {
                        auxPontos.push(createVector(0, 0));
                    }
                }
                return auxPontos;
        }
    }

    draw(temp = false, cor = '#ed145b') {
        noFill();
        //stroke(0);
        stroke(cor);
        strokeWeight(2);

        var centroX, centroY, raioX, raioY, diametroX, diametroY, largura, altura;

        switch (this.modo) {
            case POINT:
                strokeWeight(3);
                point(this.clique[0].x, this.clique[0].y);
                break;
            case LINE:
                line(this.clique[0].x, this.clique[0].y, this.clique[1].x, this.clique[1].y);
                break;
            case RECT:
                rect(this.clique[0].x,
                    this.clique[0].y,
                    this.clique[1].x - this.clique[0].x,
                    this.clique[1].y - this.clique[0].y);
                break;
            case ELLIPSE:
                centroX = this.clique[0].x;
                centroY = this.clique[0].y;
                diametroX = (this.clique[1].x - this.clique[0].x) * 2;
                diametroY = (this.clique[1].y - this.clique[0].y) * 2;
                ellipse(centroX, centroY, diametroX, diametroY);
                break;
            case STAR:
                centroX = this.clique[0].x;
                centroY = this.clique[0].y;
                raioX = (this.clique[1].x - this.clique[0].x);
                raioY = (this.clique[1].y - this.clique[0].y);

                beginShape();
                for (var angulo = -PI / 2; angulo < TWO_PI - PI / 2; angulo += TWO_PI / 10) {
                    if ((angulo + PI / 2) % (TWO_PI / 5) == 0) {
                        vertex(centroX + raioX * cos(angulo), centroY + raioY * sin(angulo));
                    }
                    else {
                        vertex(centroX + raioX * cos(angulo) * 2 / 5, centroY + raioY * sin(angulo) * 2 / 5);
                    }
                }
                endShape(CLOSE);
                break;
            case TRIANGLE:
                triangle(this.clique[0].x, this.clique[0].y,
                    this.clique[1].x, this.clique[1].y,
                    this.clique[2].x, this.clique[2].y);
                break;
            case FREE_DRAWING:
                beginShape();
                for (var i = 0; i < this.clique.length; i++) {
                    vertex(this.clique[i].x, this.clique[i].y);
                }
                endShape();
                break;
            case ABC:
                var x = this.clique[0].x;
                var y = this.clique[0].y;

                if (temp) {
                    this.fontSize = tamanhoFonte;
                }

                strokeWeight(this.fontSize / 10);

                var espacamentoLetras = this.fontSize * 0.4;

                var sizeX = this.fontSize;
                var sizeY = this.fontSize;

                var pointerX = x;
                var pointerY = y;

                this.texto = this.texto.toUpperCase();
                for (var a = 0; a < this.texto.length; a++) {
                    var letra = this.texto[a];
                    if ((letra >= "A" && letra <= "Z") || (letra >= "0" && letra <= "9")) {
                        var pontosLetra = alfabeto[letra];

                        for (var i = 0; i < pontosLetra.length - 1; i++) {
                            var x1 = x + sizeX * pontosLetra[i][0];
                            var y1 = y - sizeY * pontosLetra[i][1];
                            var x2 = x + sizeX * pontosLetra[i + 1][0];
                            var y2 = y - sizeY * pontosLetra[i + 1][1];
                            line(x1, y1, x2, y2);
                        }

                        var larguraLetra = sizeX * maximoX(pontosLetra);

                        x += larguraLetra + espacamentoLetras;
                    }
                    else if (letra == " ") {
                        x += sizeX + espacamentoLetras;
                    }
                    else if (letra == "/") {
                        x = this.clique[0].x;
                        y += sizeY + 2 * espacamentoLetras;
                    }
                    if (a == this.texto.length - 1 + pointerIndex) {
                        pointerX = x;
                        pointerY = y;
                        pointerY = y;
                    }
                }

                if (temp && pointerCont % 60 > 30) {
                    line(pointerX - espacamentoLetras / 2, pointerY + espacamentoLetras, pointerX - espacamentoLetras / 2, pointerY - sizeY - espacamentoLetras);
                }
                break;
            case FIAP:
                centroX = this.clique[0].x;
                centroY = this.clique[0].y;
                largura = (this.clique[1].x - this.clique[0].x) * 2;
                altura = largura / 3.6795;

                var x = centroX - largura / 2;
                var y = centroY + altura / 2;

                var partes = ['F1', 'F2', 'I', 'A1', 'A2', 'P'];

                strokeWeight(abs(largura) / 48);
                for (var p = 0; p < partes.length; p++) {
                    beginShape();
                    var pontosParte = fiap[partes[p]];
                    for (var i = 0; i < pontosParte.length; i++) {
                        vertex(x + largura * pontosParte[i][0], y - altura * pontosParte[i][1]);
                    }
                    endShape();
                }
                break;
        }
    }

    desenharMiniatura(offsetX, offsetY, tamanhoMiniatura) {
        noFill();
        //stroke(0);
        stroke('#ed145b');
        strokeWeight(1);

        var cliqueMiniatura = [];

        for (var i = 0; i < this.clique.length; i++) {
            var tempX = tamanhoMiniatura * ((this.clique[i].x - areaDesenhavelX) / areaDesenhavelWidth);
            var tempY = tamanhoMiniatura * ((this.clique[i].y - areaDesenhavelY) / areaDesenhavelHeight);
            cliqueMiniatura.push(createVector(offsetX + tempX, offsetY + tempY));
        }

        var centroX, centroY, raioX, raioY, diametroX, diametroY, largura, altura;

        switch (this.modo) {
            case POINT:
                strokeWeight(2);
                point(cliqueMiniatura[0].x, cliqueMiniatura[0].y);
                break;
            case LINE:
                line(cliqueMiniatura[0].x, cliqueMiniatura[0].y, cliqueMiniatura[1].x, cliqueMiniatura[1].y);
                break;
            case RECT:
                rect(cliqueMiniatura[0].x,
                    cliqueMiniatura[0].y,
                    cliqueMiniatura[1].x - cliqueMiniatura[0].x,
                    cliqueMiniatura[1].y - cliqueMiniatura[0].y);
                break;
            case ELLIPSE:
                centroX = cliqueMiniatura[0].x;
                centroY = cliqueMiniatura[0].y;
                diametroX = (cliqueMiniatura[1].x - cliqueMiniatura[0].x) * 2;
                diametroY = (cliqueMiniatura[1].y - cliqueMiniatura[0].y) * 2;
                ellipse(centroX, centroY, diametroX, diametroY);
                break;
            case STAR:
                centroX = cliqueMiniatura[0].x;
                centroY = cliqueMiniatura[0].y;
                raioX = (cliqueMiniatura[1].x - cliqueMiniatura[0].x);
                raioY = (cliqueMiniatura[1].y - cliqueMiniatura[0].y);

                beginShape();
                for (var angulo = -PI / 2; angulo < TWO_PI - PI / 2; angulo += TWO_PI / 10) {
                    if ((angulo + PI / 2) % (TWO_PI / 5) == 0) {
                        vertex(centroX + raioX * cos(angulo), centroY + raioY * sin(angulo));
                    }
                    else {
                        vertex(centroX + raioX * cos(angulo) * 2 / 5, centroY + raioY * sin(angulo) * 2 / 5);
                    }
                }
                endShape(CLOSE);
                break;
            case TRIANGLE:
                triangle(cliqueMiniatura[0].x, cliqueMiniatura[0].y,
                    cliqueMiniatura[1].x, cliqueMiniatura[1].y,
                    cliqueMiniatura[2].x, cliqueMiniatura[2].y);
                break;
            case FREE_DRAWING:
                beginShape();
                for (var i = 0; i < cliqueMiniatura.length; i++) {
                    vertex(cliqueMiniatura[i].x, cliqueMiniatura[i].y);
                }
                endShape();
                break;
            case ABC:
                var x = cliqueMiniatura[0].x;
                var y = cliqueMiniatura[0].y;

                if (temp) {
                    this.fontSize = tamanhoFonte;
                }

                strokeWeight(this.fontSize / 10);

                var espacamentoLetras = this.fontSize * 0.4;

                var sizeX = this.fontSize;
                var sizeY = this.fontSize;

                var pointerX = x;
                var pointerY = y;

                this.texto = this.texto.toUpperCase();
                for (var a = 0; a < this.texto.length; a++) {
                    var letra = this.texto[a];
                    if ((letra >= "A" && letra <= "Z") || (letra >= "0" && letra <= "9")) {
                        var pontosLetra = alfabeto[letra];

                        for (var i = 0; i < pontosLetra.length - 1; i++) {
                            var x1 = x + sizeX * pontosLetra[i][0];
                            var y1 = y - sizeY * pontosLetra[i][1];
                            var x2 = x + sizeX * pontosLetra[i + 1][0];
                            var y2 = y - sizeY * pontosLetra[i + 1][1];
                            line(x1, y1, x2, y2);
                        }

                        var larguraLetra = sizeX * maximoX(pontosLetra);

                        x += larguraLetra + espacamentoLetras;
                    }
                    else if (letra == " ") {
                        x += sizeX + espacamentoLetras;
                    }
                    else if (letra == "/") {
                        x = cliqueMiniatura[0].x;
                        y += sizeY + 2 * espacamentoLetras;
                    }
                    if (a == this.texto.length - 1 + pointerIndex) {
                        pointerX = x;
                        pointerY = y;
                        pointerY = y;
                    }
                }

                if (temp && pointerCont % 60 > 30) {
                    line(pointerX - espacamentoLetras / 2, pointerY + espacamentoLetras, pointerX - espacamentoLetras / 2, pointerY - sizeY - espacamentoLetras);
                }
                break;
            case FIAP:
                centroX = cliqueMiniatura[0].x;
                centroY = cliqueMiniatura[0].y;
                largura = (cliqueMiniatura[1].x - cliqueMiniatura[0].x) * 2;
                altura = largura / 3.6795;

                var x = centroX - largura / 2;
                var y = centroY + altura / 2;

                var partes = ['F1', 'F2', 'I', 'A1', 'A2', 'P'];

                strokeWeight(abs(largura) / 48);
                for (var p = 0; p < partes.length; p++) {
                    beginShape();
                    var pontosParte = fiap[partes[p]];
                    for (var i = 0; i < pontosParte.length; i++) {
                        vertex(x + largura * pontosParte[i][0], y - altura * pontosParte[i][1]);
                    }
                    endShape();
                }
                break;
        }
    }
}

function desenharFormas() {
    for (var i = 0; i < formas.length; i++) {
        formas[i].draw();
    }

    switch (modo) {
        case LINE:
        case RECT:
        case ELLIPSE:
        case STAR:
        case FIAP:
            if (clicks.length == 1) {
                clicks.push(createVector(myMouseX, myMouseY));
                tempForma = new Forma(modo, clicks);
                tempForma.draw(true);
                clicks.splice(-1, 1);
            }
            break;
        case TRIANGLE:
            if (clicks.length == 1 || clicks.length == 2) {
                clicks.push(createVector(myMouseX, myMouseY));
                clicks.push(createVector(myMouseX, myMouseY));
                tempForma = new Forma(modo, clicks);
                tempForma.draw(true);
                clicks.splice(-2, 2);
            }
            break;
        case FREE_DRAWING:
            if (clicks.length == 1) {
                tempPontos.push(createVector(myMouseX, myMouseY));
                tempForma = new Forma(modo, tempPontos);
                tempForma.draw(true);
            }
        case ABC:
            if (tempForma != undefined) {
                tempForma.draw(true);
            }
            break;
    }

    if (tempForma != undefined) {
        modo = tempForma.modo;
    }
}