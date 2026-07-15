var listaNumerosEjemplo = [2,4,6,-1,5,-4,0];


/**
 * 01 - invertirLista
 * 
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 * 
 * Retorna: 
 * - una lista de números con los mismos elementos pero en orden inverso al que fueron recibidos.
 * 
 * Ejemplos:
 * - invertirLista([2,3,4]) retorna [4,3,2]
 */
function invertirLista(listaDeNumeros) {
    let listaInversa=[];
    for(let i=listaDeNumeros.length-1 ; i>=0 ; i--) {
        listaInversa.push(listaDeNumeros[i]);
    }
    return listaInversa;
} 
console.log("invertirLista([2,3,4]): ", invertirLista([2,3,4]))


/**
 * 02 - sumarLista
 * 
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 * 
 * Retorna: 
 * - un numero con el resultado de la suma de todos los elementos de la lista.
 * 
 * Ejemplos:
 * - sumarLista([2,3,4]) retorna 9
 */
function sumarLista(listaDeNumeros) {
    let sumaTotal = 0;
    for(let i=0 ; i<=listaDeNumeros.length-1 ; i++) {
        sumaTotal+=listaDeNumeros[i];
    }
    return sumaTotal;
}
console.log("sumarLista([2,3,4]): ", sumarLista([2,3,4]))


/**
 * 03 - contarElementosLista
 * 
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 * 
 * Retorna: 
 * - un numero con la cantidad de elementos contenidos dentro de la lista.
 * 
 * Ejemplos:
 * - contarElementosLista([2,3,4]) retorna 3
 * - contarElementosLista([2,3]) retorna 2
 * - contarElementosLista([]) retorna 0
 */
function contarElementosLista(listaDeNumeros) {
    return listaDeNumeros.length;
}
console.log("contarElementosLista([2,3,4]): ", contarElementosLista([2,3,4]))


/**
 * 04 - calcularPromedio
 * 
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 * 
 * Retorna: 
 * - un numero, con el valor calculado de promedio para los números en la lista recibida.
 * 
 * Ejemplos:
 * - calcularPromedio([2,3,4]) retorna 3
 */
function calcularPromedio(listaDeNumeros) {
    let prom = 0;
    let sumaTotal = 0;
    for(let i=0 ; i<=listaDeNumeros.length-1 ; i++) {
        sumaTotal+=listaDeNumeros[i];
    }
    prom=sumaTotal/listaDeNumeros.length;
    return prom;
}
console.log("calcularPromedio([2,3,4]): ", calcularPromedio([2,3,4]))
console.log("calcularPromedio(listaNumerosEjemplo): ", calcularPromedio(listaNumerosEjemplo))


/**
 * 05 - triplicarLista
 * 
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 * 
 * Retorna: 
 * - una lista de números donde cada elemento es el triple del valor original.
 * 
 * Ejemplos:
 * - triplicarLista([1, 2, 3]) retorna [3, 6, 9]
 */
function triplicarLista(listaDeNumeros) {
    let listaTriplicada = [];
    for(let i=0 ; i<=listaDeNumeros.length-1 ; i++) {
        listaTriplicada[i] = listaDeNumeros[i]*3;
    }
    return listaTriplicada;
}
console.log("triplicarLista([1, 2, 3]): ", triplicarLista([1, 2, 3]));


/**
 * 06 - crearListaDeNumeros
 * 
 * Recibe
 * - `inicio`: un número, con el valor inicial de la lista
 * - `fin`: un número, con el valor final de la lista
 * 
 * Retorna: 
 * - una lista (array) con valores numéricos en secuencia, desde `inicio` hasta `fin`.
 * 
 * Ejemplos:
 * - crearListaDeNumeros(1,5) retorna [1,2,3,4,5]
 * - crearListaDeNumeros(3,6) retorna [3,4,5,6]
 * - crearListaDeNumeros(2,2) retorna [2]
 */
function crearListaDeNumeros(inicio, fin) {
    let listaDeNumeros = [];
    for(let i=inicio ; i<=fin ; i++ ) {
        listaDeNumeros.push(i);
    }
    return listaDeNumeros;
}
console.log("crearListaDeNumeros(2,5): ", crearListaDeNumeros(2,5))


/**
 * 07 - ordenarDeMayorAMenor
 * 
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 * 
 * Retorna: 
 * - una lista de números con los mismos elementos pero en orden decreciente (de mayor a menor).
 * 
 * Ejemplos:
 * - ordenarDeMayorAMenor([2,-1,4]) retorna [4,2,-1]
 */
function ordenarDeMayorAMenor(listaDeNumeros) {
    let listaDecreciente = listaDeNumeros.sort((a,b) => b - a);
    return listaDecreciente;
}
console.log("ordenarDeMayorAMenor([2,3,4]): ", ordenarDeMayorAMenor([2,3,4]))
console.log("ordenarDeMayorAMenor(listaNumerosEjemplo): ", ordenarDeMayorAMenor(listaNumerosEjemplo))


/**
 * 08 - encontrarNumeroMayor
 * 
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 * 
 * Retorna: 
 * - un numero, con el valor del numero más grande contenido en la lista recibida.
 * 
 * Ejemplos:
 * - encontrarNumeroMayor([2,3,4]) retorna 4
 */
function encontrarNumeroMayor(listaDeNumeros) {
    let mayor = 0;
    for(let i=0 ; i<=listaDeNumeros.length-1 ; i++) {
        if(listaDeNumeros[i]>mayor) {
            mayor=listaDeNumeros[i];
        }
    }
    return mayor;
}
console.log("encontrarNumeroMayor([2,3,4]): ", encontrarNumeroMayor([2,3,4]))
console.log("encontrarNumeroMayor(listaNumerosEjemplo): ", encontrarNumeroMayor(listaNumerosEjemplo))


/**
 * 09 - ordenarPalabrasPorLongitud
 * 
 * Recibe
 * - `listaDePalabras`: una lista (array) de palabras (string).
 * 
 * Retorna: 
 * - una lista (array) de palabras (string), con los mismos valores que la lista recibida pero ordenados de manera creciente de acuerdo a su cantidad de caracteres.
 * 
 * Ejemplos:
 * - ordenarPalabrasPorLongitud(['abc', 'a', 'ab']) retorna ['a', 'ab', 'abc']
 */
function ordenarPalabrasPorLongitud(listaDePalabras) {
    let listaOrdenada = listaDePalabras.sort();
    return listaOrdenada;
}
console.log("ordenarPalabrasPorLongitud(['abc', 'a', 'ab']): ", ordenarPalabrasPorLongitud(['abc', 'a', 'ab']))


/**
 * 10 - encontrarPalabraMasCorta
 * 
 * Recibe
 * - `listaDePalabras`: una lista (array) de palabras (string).
 * 
 * Retorna: 
 * - una palabras (string) que dentro del listado tenga la menor cantidad de caracteres de longitud. En caso de que haya varias palabras con la misma longitud, se puede devolver la primera encontrada.
 * 
 * Ejemplos:
 * - encontrarPalabraMasCorta(['abc', 'a', 'ab', 'c']) retorna 'a'
 */
function encontrarPalabraMasCorta(listaDePalabras) {
    let corta = listaDePalabras[0];
    for(let i=0 ; i<=listaDePalabras.length-1 ; i++) {
        if(listaDePalabras[i].length < corta.length) {
            corta=listaDePalabras[i];
        } 
    }
    return corta;
}
console.log("encontrarPalabraMasCorta(['abc', 'a', 'ab']): ", encontrarPalabraMasCorta(['abc', 'a', 'ab']))


/**
 * 11 - filtrarSoloPositivos
 * 
 * Recibe
 * - `listaDeNumeros`: una lista (array) de números.
 * 
 * Retorna: 
 * - una lista (array) de números, conteniendo sólo los valores positivos de la lista de números recibida.
 * 
 * Ejemplos:
 * - filtrarSoloPositivos([1,-1,2]) retorna [1,2]
 */
function filtrarSoloPositivos(listaDeNumeros) {
    let listaPositivos = listaDeNumeros.filter((elementoActual) => {
        return elementoActual>0;
    })
    return listaPositivos;
}
console.log("filtrarSoloPositivos([1,-1,0]): ", filtrarSoloPositivos([1,-1,0]))
console.log("filtrarSoloPositivos(listaNumerosEjemplo): ", filtrarSoloPositivos(listaNumerosEjemplo))


/**
 * 12 - contarAprobados
 * 
 * Recibe
 * - `listaDeNotas`: una lista (array) de números con valores entre 1 y 10.
 * 
 * Retorna: 
 * - un numero, con la cantidad de notas que superan el criterio de aprobación.
 * 
 * Ejemplos:
 * - contarAprobados([10,2,9]) retorna 2
 */
function contarAprobados(listaDeNotas) {
    let cont = 0;
    for(let i=0 ; i<=listaDeNotas.length-1 ; i++) {
        if(listaDeNotas[i]>=7) {
            cont++;
        }
    }
    return cont;
}
console.log("contarAprobados([10, 4, 6, 7, 1, 9]): ", contarAprobados([10, 4, 6, 7, 1, 9]))


/**
 * 13 - filtrarSoloTruthy
 * 
 * Recibe
 * - `listaDeValores`: una lista (array) de valores de distintos tipos.
 * 
 * Retorna: 
 * - una lista (array) conteniendo sólo los valores que son considerados 'truthy' por el lenguaje JavaScript
 * 
 * Ejemplos:
 * - filtrarSoloTruthy(["Hola", "", 0, 1]) retorna ["Hola", 1]
 */
function filtrarSoloTruthy(listaDeValores) {
    let listaTruthy = [];

    for (let i = 0; i < listaDeValores.length; i++) {
        if (listaDeValores[i]) {
            listaTruthy.push(listaDeValores[i]);
        }
    }

    return listaTruthy;
}
console.log("filtrarSoloTruthy(): ", filtrarSoloTruthy(["Hola", "", null, 1, 0, -1, undefined, [], {}]))

/**
 * 14 - enumerarLista
 * Recibe
 * - `listaDePalabras`: una lista (array) de palabras (strings).
 * 
 * Retorna: 
 * - Una oración (string), donde se enumeran cada una de las palabras recibidas en la lista.
 * - Bonus: una oración correctamente formada debería empezar en mayúscula, terminar con punto, y además el ultimo elemento de enumeración deberia estar separado con "y".
 * 
 * Ejemplos:
 * - enumerarLista(["Han", "Leia", "Luke", "Yoda"]) "Han, Leia, Luke y Yoda."
 */
function enumerarLista(listaDePalabras) {
    let oracion = "";

    for (let i = 0; i < listaDePalabras.length; i++) {

        if (i === listaDePalabras.length - 1) {
            oracion += " y " + listaDePalabras[i];
        } else if (i === 0) {
            oracion += listaDePalabras[i];
        } else {
            oracion += ", " + listaDePalabras[i];
        }
    }

    return oracion + ".";
}
console.log("enumerarLista(): ", enumerarLista(["Han", "Leia", "Luke", "Yoda"]))
