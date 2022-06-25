class Botao {
    constructor(x, y, modo) {
        this.x = x;
        this.y = y;
        this.modo = modo;
        this.estado = NO_HOVER;
        this.hoverAnimacao = 0;

        if (this.modo == HISTORICO) {
            this.largura = 174;
            this.altura = 30;
        }
        else if (this.modo == GERAR_GCODE) {
            this.largura = 50;
            this.altura = 20;
        }
        else {
            this.largura = 50;
            this.altura = 50;
        }

    }

    hover() {

        cursor(HAND);
        this.estado = HOVER;
        this.draw();
        if (this.hoverAnimacao < 1) {
            this.hoverAnimacao += 0.1;
        }
    }

    noHover() {
        if (this.modo == HISTORICO) {
            this.hoverAnimacao = 0;
        }
        if (this.modo == modo) {
            this.estado = CLICKED;
            strokeWeight(1);
            this.hoverAnimacao = 1;
            stroke('#ed145b');
        }
        else {
            this.estado = NO_HOVER;
            strokeWeight(1);

            if (this.hoverAnimacao > 0) {
                this.hoverAnimacao -= 0.1;
            }
            stroke(255);
        }

        this.draw()
    }

    click() {
        if (this.modo == HISTORICO) {
            ///
        }
        else if (this.modo == GERAR_GCODE) {
            //abrirModalConfiguracoes();
        }
        else {
            clicks = [];
            tempPontos = [];
            tempForma = undefined;
            modo = this.modo;
        }
    }

    draw() {

        var corFill, corStroke, corFillHover, corStrokeHover, corFillNoHover, corStrokeNoHover;

        ///FUNDO DOS BOTOES
        strokeWeight(2);
        corFillHover = color('#ed145b');
        corStrokeHover = color('#ed145b');
        corFillNoHover = color('#fff');
        corStrokeNoHover = color('#666');

        corFill = lerpColor(corFillNoHover, corFillHover, this.hoverAnimacao);
        corStroke = lerpColor(corStrokeNoHover, corStrokeHover, this.hoverAnimacao);

        fill(corFill);
        noStroke();

        rect(this.x, this.y, this.largura, this.altura, 7);

        ///FUNCOES DOS BOTOES
        noFill();
        strokeWeight(2);
        corStrokeHover = color('#fff');
        corStrokeNoHover = color('#ed145b');

        corStroke = lerpColor(corStrokeNoHover, corStrokeHover, this.hoverAnimacao);

        stroke(corStroke);

        var centroX, centroY, raioX, raioY, diametroX, diametroY, largura, altura;

        switch (this.modo) {
            case POINT:
                strokeWeight(3);
                point(this.x + 25, this.y + 25);
                break;
            case LINE:
                line(this.x + 15, this.y + 35, this.x + 35, this.y + 15);
                break;
            case RECT:
                rect(this.x + 10, this.y + 15, 30, 20);
                break;
            case ELLIPSE:
                ellipse(this.x + 25, this.y + 25, 30, 20);
                break;
            case TRIANGLE:
                triangle(this.x + 25, this.y + 10,
                    this.x + 10, this.y + 40,
                    this.x + 40, this.y + 40);
                break;
            case STAR:
                centroX = this.x + 25;
                centroY = this.y + 25;
                raioX = 20;
                raioY = 20;

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
            case FREE_DRAWING:
                beginShape();
                for (var angulo = 0; angulo < 2 * PI; angulo += 0.01) {
                    centroX = this.x + 25;
                    centroY = this.y + 25;
                    raioX = map(angulo, 0, 2 * PI, 15, -15);
                    raioY = 12;
                    vertex(centroX + raioX * cos(angulo), centroY + raioY * sin(angulo));
                }
                endShape();
                break;
            case ABC:
                if (this.estado == NO_HOVER)
                    fill('#ed145b');
                else
                    fill('#fff');

                strokeWeight(1);
                textSize(18);
                text('ABC', this.x + 7, this.y + 32);
                break;
            case FIAP:
                centroX = this.x + 25;
                centroY = this.y + 25;
                largura = 40;
                altura = largura / 3.6795;

                var x = centroX - largura / 2;
                var y = centroY + altura / 2;

                var partes = ['F1', 'F2', 'I', 'A1', 'A2', 'P'];

                strokeWeight(1);
                for (var p = 0; p < partes.length; p++) {
                    beginShape();
                    var pontosParte = fiap[partes[p]];
                    for (var i = 0; i < pontosParte.length; i++) {
                        vertex(x + largura * pontosParte[i][0], y - altura * pontosParte[i][1]);
                    }
                    endShape();
                }
                break;
            case GERAR_GCODE:
                if (this.estado == NO_HOVER)
                    fill('#ed145b');
                else
                    fill('#fff');

                strokeWeight(1);
                textSize(12);
                text('GERAR', this.x + 4, this.y + 15);
                break;
            case HISTORICO:
                if (this.estado == NO_HOVER)
                    fill('#ed145b');
                else
                    fill('#fff');

                strokeWeight(1);
                textSize(12);
                text('HISTÓRICO', this.x + 52, this.y + 23);
                break;
        }
    }
}

function desenharBarraDeBotoes() {
    cursor(ARROW);

    noStroke();
    fill('#616d72');
    rect(0, 0, 70, height);

    for (var i = 0; i < botoes.length; i++) {
        var larguraBotao;
        var alturaBotao;

        if (botoes[i].modo != GERAR_GCODE) {
        if (myMouseX > botoes[i].x && myMouseX < botoes[i].x + botoes[i].largura &&
            myMouseY > botoes[i].y && myMouseY < botoes[i].y + botoes[i].altura) {
            botoes[i].hover();
        }
        else {
            botoes[i].noHover();
        }
        }
    }
}

function desenharHistorico() {

    fill(255);
    stroke('#ed145b');
    strokeWeight(1);

    var x = botoes[10].x - 1;
    var y = botoes[10].y - 1;
    var largura = botoes[10].largura + 1;

    let value = y + 41;
    var formasPorPagina = 0;
    while (value < (height - 55) / 2) {
        value += 60;
        formasPorPagina += 2;
    }
    var altura = value - 60;
    formasPorPagina -= 2;

    rect(x, y, largura, altura, 7);
    //
    /*if (mouseX < x || mouseX > x + largura ||
        mouseY < y || mouseY > y + altura) {
        mostrarHistorico = false;
        historicoPagina = 1;
        this.hoverAnimacao = 0;
        $("#txtGcode").show();
    }*/
    //
    var hover = -1;

    if (formas.length > 0) {
        for (var i = 0; i < formasPorPagina; i++) {

            var tamanhoMiniatura = 50;
            var miniaturaLargura = tamanhoMiniatura + 30;
            var miniaturaAltura = tamanhoMiniatura;

            var miniaturaX;
            var miniaturaY;

            if (i % 2 == 0) {
                miniaturaX = x + 5;
                miniaturaY = y + 40 + int(i / 2) * (tamanhoMiniatura + 10);
            }
            else {
                miniaturaX = x + 5 + miniaturaLargura + 5;
                miniaturaY = y + 40 + int(i / 2) * (tamanhoMiniatura + 10);
            }

            var indiceForma = i + (historicoPagina - 1) * formasPorPagina;

            if (miniaturaY + miniaturaAltura > altura || indiceForma >= formas.length) {
                break;
            }
            
                formas[indiceForma].desenharMiniatura(miniaturaX, miniaturaY, tamanhoMiniatura);

            var botaoExcluirLargura = 30;
            var botaoExcluirAltura = miniaturaAltura;
            var botaoExcluirX = miniaturaX + miniaturaLargura - botaoExcluirLargura;
            var botaoExcluirY = miniaturaY;

            fill('#616d72');
            noStroke();
            rect(botaoExcluirX, botaoExcluirY, botaoExcluirLargura, botaoExcluirAltura);

            var centroX = botaoExcluirX + botaoExcluirLargura / 2;
            var centroY = botaoExcluirY + botaoExcluirAltura / 2;

            stroke(255);
            strokeWeight(2);
            line(centroX - 5, centroY - 5, centroX + 5, centroY + 5);
            line(centroX - 5, centroY + 5, centroX + 5, centroY - 5);

            noFill();
            stroke(0);
            strokeWeight(2);
            rect(miniaturaX, miniaturaY, miniaturaLargura, miniaturaAltura);



            if (mouseX > botaoExcluirX && mouseX < botaoExcluirX + botaoExcluirLargura &&
                mouseY > botaoExcluirY && mouseY < botaoExcluirY + botaoExcluirAltura) {

                if (mouseIsPressed && !jaFoiClicado) {
                    formas.splice(indiceForma, 1);
                    if (historicoPagina > ceil(formas.length / formasPorPagina)) {
                        historicoPagina = max(ceil(formas.length / formasPorPagina), 1);
                    }
                    jaFoiClicado = true;
                }
            }

            if (mouseX > miniaturaX && mouseX < miniaturaX + miniaturaLargura &&
                mouseY > miniaturaY && mouseY < miniaturaY + miniaturaAltura) {

                hover = indiceForma;
            }

            if (!mouseIsPressed) {
                jaFoiClicado = false;
            }
        }

        for (var i = 0; i < formas.length; i++) {
            if (i == hover) {
                formas[i].draw(false, "#000");

                if (formas[i].modo == POINT) {
                    noFill();
                    strokeWeight(1);
                    stroke("#000");
                    ellipse(formas[i].clique[0].x, formas[i].clique[0].y, 20, 20);
                }
            }
            else {
                formas[i].draw();
            }
        }

        var backArrowX = x + 15;
        var backArrowY = y + 5;
        var backArrowLargura = 20;
        var backArrowAltura = 30;

        var nextArrowX = x + largura - 35;
        var nextArrowY = y + 5;
        var nextArrowLargura = 20;
        var nextArrowAltura = 30;

        if (mouseIsPressed && !bloqueiaClick) {

            if (mouseX > backArrowX && mouseX < backArrowX + backArrowLargura &&
                mouseY > backArrowY && mouseY < backArrowY + backArrowAltura) {
                bloqueiaClick = true;
                if (historicoPagina > 1) {
                    historicoPagina--;
                }
            }

            if (mouseX > nextArrowX && mouseX < nextArrowX + nextArrowLargura &&
                mouseY > nextArrowY && mouseY < nextArrowY + nextArrowAltura) {
                bloqueiaClick = true;

                if (historicoPagina < ceil(formas.length / formasPorPagina)) {
                    historicoPagina++;
                }
            }

        }

        if (!mouseIsPressed) {
            bloqueiaClick = false;
        }


        strokeWeight(2);
        stroke('#ed145b');
        noFill();

        if (historicoPagina > 1) {
            line(x + 30, y + 10, x + 20, y + 20);
            line(x + 20, y + 20, x + 30, y + 30);
        }

        if (historicoPagina < ceil(formas.length / formasPorPagina)) {
            line(x + largura - 30, y + 10, x + largura - 20, y + 20);
            line(x + largura - 20, y + 20, x + largura - 30, y + 30);
        }

        fill('#ed145b');
        strokeWeight(1);
        textSize(12);
        text('HISTÓRICO', width - 123, 24);
    }
    else {
        fill('#ed145b');
        stroke('#ed145b');
        strokeWeight(1);
        textSize(12);
        text('HISTÓRICO', width - 123, 24);
        textSize(16);
        
        text("VAZIO", x + 60, y + 55);
    }
}

function abrirModalConfiguracoes() {
    $('.meu-modal-container').addClass('is-active');
}

$(document).on('click', '.fechar', function () {
    $('.meu-modal-container').removeClass('is-active');
});

$(document).on('click', '.btn-gerar-gcode', function () {
    clicks = [];
    tempPontos = [];

    let escala = $('.input-scala').val();
    let velocidadeRobo = $('.input-speed').val();
    //let segmentosElipse = $('.input-ellipse').val();

    gerarGcode(escala, velocidadeRobo/*, segmentosElipse*/);

    $('.meu-modal-container').removeClass('is-active');
});


$(document).on('click', '.meu-modal-container', function (e) {
    console.log(e.target.id);
    if (e.target.id == 'meu-modal-container') {
    $('.meu-modal-container').removeClass('is-active');
    }
});