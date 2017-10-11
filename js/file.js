var puntos_ciudades;

/**
 * Inicia con el algoritmo de Recocido Simulado para resolver el problema del agente viajero.
 */
function startAlgorithm() {
	var num_iteraciones = parseInt($('#txtNumIteraciones').val());
	var P = parseInt($('#numCadaPIteraciones').val());
	var T = parseInt($('#numT').val());
	var factorT = parseFloat($('#txtFactorT').val());

	limpiaContenedores();

	recocidoSimulado(puntos_ciudades, num_iteraciones, P, T, factorT);
	return false;
}

/**
 * Limpia el contenedor principal '#main-container'.
 */
function limpiaContenedores() {
	// Eliminando todos los hijos de un elemento
	var main_container = document.getElementById("main-container");
	while (main_container.firstChild)
		main_container.removeChild(main_container.firstChild);
	main_container.innerHTML = "<div class='card-box container-results'><h4 class='m-t-0 header-title'><b>Ciudades</b></h4><canvas id='canvas_puntos_iniciales' width='500' height='500'></canvas><h4 class='m-t-0 header-title'><b>Mejores Soluciónes en Algunas Iteraciones</b></h4><div class='steps_container' id='steps_container'></div><div class='container-sol-final' id='container-sol-final'><h4 class='m-t-0 header-title'><b>Mejor Solución</b></h4></div></div><div class='card-box container-graph'><h4 class='m-t-0 header-title'><b>Avance óptimo</b></h4><div id='chart-avance-optimo'></div></div>";
}


window.onload = function() {
	var fileInput = document.getElementById('fileInput');

	fileInput.addEventListener('change', (e) => {
		var file = fileInput.files[0];
		var reader = new FileReader();

		reader.onload = (e) => {
			txt_puntos = reader.result;
			puntos_ciudades = getPuntos(txt_puntos);
		}
		reader.readAsText(file);
	});
};

/**
 * Parsea un string que contiene puntos y los trasforma a un arreglo de objetos, donde cada objeto representa un punto de una ciudad.
 * @param  {string} txt_puntos - Cadena de texto con los puntos a parsear.
 * @return {Array[{x, y}]} - Retorna un arreglo de objetos, donde cada objeto representa una ciudad.
 */
function getPuntos(txt_puntos)
{
	txt_puntos = txt_puntos.replace(/\n/g, ' ');
	coordenadas = txt_puntos.split(' ');
	num_puntos = coordenadas.length;
	
	ciudades = Array();
	for (i = 0; i < num_puntos; i += 2)
		ciudades.push({x : coordenadas[i], y : coordenadas[i+1]});

	return ciudades;
}
