/**
 * Dibuja puntos en un canvas.
 * @param  {Array[{x, y}]} puntos    Puntos a pintar en el canvas.
 * @param  {string} id_canvas Id del canvas en donde se van a pintar los puntos.
 */
function drawInitialPoints(puntos, id_canvas)
{
	canvas = document.getElementById(id_canvas);
	ctx = canvas.getContext('2d');

	ctx.fillStyle = COLOR_FONDO;
	ctx.fillRect(0,0,canvas.width,canvas.height);

	ctx.fillStyle = COLOR_PUNTOS;
	puntos.forEach(punto => {
		ctx.beginPath();
		ctx.arc(punto.x, canvas.height - punto.y, 5, 0, 2 * Math.PI);
		ctx.fill();
	});
}

/**
 * Dibuja la ruta en el canvas.
 * @param  {Array[{x, y}]} path      Ruta.
 * @param  {string} id_canvas Id del canvas en donde se va a pintar la ruta.
 */
function drawPath(path, id_canvas)
{
	// Cargando imagenes
	img_start = new Image();
	img_finish = new Image();
	img_start.src = PATH_IMG_START;
	img_finish.src = PATH_IMG_FINISH;

	canvas = document.getElementById(id_canvas);
	ctx = canvas.getContext('2d');

	ctx.strokeStyle = COLOR_LINEAS;
	ctx.lineWidth = 2;
	var num_puntos = path.length;
	for (var i = 1; i < num_puntos; i++)
	{
		ctx.beginPath();
		ctx.moveTo(path[i-1].x, canvas.height - path[i-1].y);
		ctx.lineTo(path[i].x, canvas.height - path[i].y);
		ctx.stroke();
	}
	ctx.beginPath();
	ctx.moveTo(path[0].x, canvas.height - path[0].y);
	ctx.lineTo(path[num_puntos-1].x, canvas.height - path[num_puntos-1].y);
	ctx.stroke();

	img_start.onload = (e) => {
		canvas = document.getElementById(id_canvas);
		ctx = canvas.getContext('2d');
		ctx.drawImage(img_start, path[0].x - (img_start.width / 2), canvas.height - path[0].y - (img_start.height / 2));
	};
	img_finish.onload = (e) => {
		canvas = document.getElementById(id_canvas);
		ctx = canvas.getContext('2d');
		ctx.drawImage(img_finish, path[num_puntos - 1].x - 10, canvas.height - path[num_puntos - 1].y - img_finish.height);
	}
}

/**
 * Crea un nuevo elemento canvas y se lo agrega a un contenedor.
 * @param  {string} txtcontenedor Id del contenedor al que se le va agregar un canvas.
 * @param  {string} canvas_id     Id del canvas a crear.
 */
function createNewCanvas(txtcontenedor, canvas_id)
{
	var canvas = document.createElement("CANVAS");
	canvas.id = canvas_id;
	canvas.width = 500;
	canvas.height = 500;

	contenedor = document.getElementById(txtcontenedor);
	contenedor.appendChild(canvas);
	if(txtcontenedor == "container-sol-final")
	{
		var h4_costo_ruta = document.createElement("H4");
		h4_costo_ruta.class = "m-t-0 header-title";
		var b = document.createElement("B");
		var texto_costo = document.createTextNode("Costo de Ruta: " + Number(costo_ruta).toFixed(3));
		b.appendChild(texto_costo);
		h4_costo_ruta.appendChild(b);
		contenedor.appendChild(h4_costo_ruta);
	}
}


/**
 * Dibuja una grafica con el avance del óptimo durante todas las iteraciónes realizadas del algoritmo.
 * @param  {Array[Array[int, float]]} datos_avance_optimo Datos de cada iteracion con su respectivo costo de ruta.
 */
function drawAvanceOptimo(datos_avance_optimo)
{
	var data = new google.visualization.DataTable();

	data.addColumn('number', 'Iteraciones');
	data.addColumn('number', 'CostoDeRuta');

	data.addRows(datos_avance_optimo);

	var options = {
		height: 600,
		colors: ['#3bafda', 'blue', '#3fc26b'],
		hAxis: {title: 'Iteraciónes'},
		vAxis: {title: 'Costo de Ruta'}
	};

	var grafica = new google.visualization.AreaChart(document.getElementById('chart-avance-optimo'));
	grafica.draw(data, options);
}