
var enviandoDados = false;

function gerarGcode(escala, velocidadeRobo/*, segmentosElipse*/) {
    var strGcode = `G0 \n`;
    var strGcode = `G1 F${velocidadeRobo} \n`;
    for (var i = 0; i < formas.length; i++) {
        var arrayPontos = formas[i].getPontos();
        let x = ceil(map(arrayPontos[0].x - areaDesenhavelX, 0, areaDesenhavelWidth, 0, escala));
        let y = ceil(map(arrayPontos[0].y - areaDesenhavelY, 0, areaDesenhavelHeight, 0, escala));
        
        strGcode += 'G1 Z1 \n';
        strGcode += `G1 X${x} Y${y} \n`;
        strGcode += 'G1 Z0 \n';
        for (var j = 1; j < arrayPontos.length; j++) {
            x = int(arrayPontos[j].x) - areaDesenhavelX;
            y = int(arrayPontos[j].y) - areaDesenhavelY;

            if (x == -areaDesenhavelX && y == -areaDesenhavelY) {
                strGcode += 'G1 Z1 \n';
            }
            else {
                x = ceil(map(x, 0, areaDesenhavelWidth, 0, escala));
                y = ceil(map(y, 0, areaDesenhavelHeight, 0, escala));
                strGcode += `G1 X${x} Y${y} \n`;
                if (arrayPontos[j - 1].x == 0 && arrayPontos[j - 1].y == 0) {
                    strGcode += 'G1 Z0 \n';
                }
            }
        }
    }
    strGcode += 'G1 Z1 \n';
    strGcode += 'G99 \n';

    var txtGcode = $('#txtGcode');

    txtGcode.val(strGcode);

    txtGcode.select();
    document.execCommand("copy");

    enviandoDados = true;
    //enviarDados();
}


function enviarDados() {
    var listaComandos = txtGcode.val().split('\n');

    for (let i = 0; i < listaComandos.length; i++) {
        let linha = listaComandos[i];

        enviarLinha(linha);
    }
}

function enviarLinha(linha) {

}

function desenharGcode(gcode) {

    noLoop();
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);

    var linhas = gcode.split("\n");

    let lastX = areaDesenhavelX;
    let lastY = areaDesenhavelY;
    var currentX = areaDesenhavelX;
    var currentY = areaDesenhavelY;

    for (var l = 0; l < linhas.length; l++) {
        var linha = linhas[l];

        if (linha.includes("Z")) {
            if (linha[4] == "1") {
                lastX = areaDesenhavelX;
                lastY = areaDesenhavelY;
            }
        }
        else if (linha.includes("X") && linha.includes("Y")) {
            let strX = "";
            let strY = "";

            for (var i = linha.indexOf("X") + 1; i < linha.indexOf("Y") - 1; i++) {
                strX += linha[i];
            }

            for (var i = linha.indexOf("Y") + 1; i < linha.length; i++) {
                strY += linha[i];
            }

            currentX = int(strX) + areaDesenhavelX;
            currentY = int(strY) + areaDesenhavelY;

            if (lastX != areaDesenhavelX || lastY != areaDesenhavelY) {
                line(lastX, lastY, currentX, currentY);
            }

            lastX = currentX;
            lastY = currentY;
        }
    }
}