/**
 * Algoritmo de Recocido Simulado que da una solucion al Problema del Agente Viajero.
 * @param  {Array[{x, y}]} ciudades        Ciudades.
 * @param  {int} num_iteraciones Numero de iteraciónes que va a realizar el algoritmo de Recocido Simulado.
 * @param  {int} P               Numero que indica cada cuantas iteraciones va a mostrar la mejor solucion hasta ese momento.
 * @param  {int} T               Temperatura.
 * @param  {float} factorT       Factor por el cual se multiplica la temperatura para que se vaya reduciendo.
 */
function recocidoSimulado(ciudades, num_iteraciones, P, T, factorT)
{
	var datos_avance_optimo = new Array();

	drawInitialPoints(ciudades, "canvas_puntos_iniciales");

	ruta = getInitialSolution(ciudades);
	costo_ruta = objetiveFunction(ruta);
	mejor_ruta = fnClone(ruta);
	mejor_costo_de_ruta = costo_ruta;

	for (let i = 0; i < num_iteraciones; i++)
	{
		nueva_ruta = swapCities(ruta);
		nuevo_costo_ruta = objetiveFunction(nueva_ruta);
		datos_avance_optimo.push([i, costo_ruta]);
		
		if (nuevo_costo_ruta < costo_ruta)
		{
			ruta = fnClone(nueva_ruta);
			costo_ruta = nuevo_costo_ruta;
			if (costo_ruta < mejor_costo_de_ruta)
			{
				mejor_ruta = fnClone(ruta);
				mejor_costo_de_ruta = costo_ruta;
			}
		}
		else
		{
			w = Math.exp((nuevo_costo_ruta - costo_ruta)/T);
			if (w < Math.random()+0.5)
			{
				ruta = fnClone(nueva_ruta);
				costo_ruta = nuevo_costo_ruta;
			}
			T *= factorT;
		}
		if (i % P == 0)
		{
			canvas_id = "it"+i;
			createNewCanvas("steps_container", canvas_id);
			drawInitialPoints(ruta, canvas_id);
			drawPath(ruta, canvas_id);
		}
	}
	createNewCanvas("container-sol-final", "canvas_ruta_final");
	drawInitialPoints(mejor_ruta, "canvas_ruta_final");
	drawPath(mejor_ruta, "canvas_ruta_final");
	drawAvanceOptimo(datos_avance_optimo);
	console.log("Costo de Ruta: ", mejor_costo_de_ruta);
}

/**
 * Revuelve las ciudades para así obtener una ruta.
 * @param  {Array[{x, y}]} ciudades Ciudades.
 * @return {Array[{x, y}]}          Ruta.
 */
function getInitialSolution(ciudades)
{
	ruta = fnClone(ciudades);
	var num_intercambios = ruta.length;

	for (let i = 0; i < num_intercambios; i++)
		ruta = swapCities(ruta);
	return ruta;
}


/**
 * Intercambia dos ciudades aleatorias de una ruta, para asi obtener otra ruta.
 * @param  {Array[{x, y}]} ciudades Ciudades.
 * @return {Array[{x, y}]}          Nueva ruta.
 */
function swapCities(ruta)
{
	ruta_temp = fnClone(ruta);
	pos1 = (Math.floor(Math.random()*ruta_temp.length) + Math.floor(Math.random()*ruta_temp.length)) % ruta_temp.length;
	pos2 = (Math.floor(Math.random()*ruta_temp.length) + Math.floor(Math.random()*ruta_temp.length)) % ruta_temp.length;
	while(pos1 == pos2)
		pos2 = (Math.floor(Math.random()*ruta_temp.length) + Math.floor(Math.random()*ruta_temp.length)) % ruta_temp.length;
	
	temp = ruta_temp[pos1];
	ruta_temp[pos1] = ruta_temp[pos2];
	ruta_temp[pos2] = temp;
	return ruta_temp;
}

/**
 * Función Objetivo del algoritmo Recocido Simulado aplicado al Problema del Agente Viajero.
 * @param  {Array[{x, y}} ruta Ruta
 * @return {float}      Costo de la ruta.
 */
function objetiveFunction(ruta)
{
	var num_ciudades = ruta.length;
	var costo_ruta = getDistance(ruta[0], ruta[num_ciudades-1]);
	for (let i = 1; i < num_ciudades; i++)
		costo_ruta += getDistance(ruta[i-1], ruta[i]);
	return costo_ruta;
}

/**
 * Obtiene la distancia entre dos ciudades.
 * @param  {{x, y}} ciudadA Primera Ciudad.
 * @param  {{x, y}} ciudadB Segunda Ciudad.
 * @return {float}         Retorna la distancia entre dos ciudades.
 */
function getDistance(ciudadA, ciudadB)
{
	return Math.sqrt(Math.pow((ciudadA.x - ciudadB.x), 2)+Math.pow((ciudadA.y-ciudadB.y), 2));
}


/**
 * Clona un objeto a nivel profundo. Ver: https://jherax.wordpress.com/2014/07/20/js-clonando-objetos/comment-page-1/#comment-136
 * @param  {JSON} obj Objeto a clonar.
 * @return {JSON}     Nuevo objeto.
 */
function fnClone (obj)
{
	return JSON.parse(JSON.stringify(obj));
}