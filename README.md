# Problema del Agente Viajero solucionado con el algoritmo de Recocido Simulado

## Explicación de archivos js 
**Simulated annealing (SA)** (recocido simulado, cristalización simulada, templado simulado o enfriamiento simulado) es un algoritmo de búsqueda meta-heurística para problemas de optimización global; el objetivo general de este tipo de algoritmos es encontrar una buena aproximación al valor óptimo de una función en un espacio de búsqueda grande. A este valor óptimo se lo denomina "óptimo global".

Aplicación de Recocido Simulado
![Recocido Simulado](/recocido-simulado.png)

Avance Optimo
![Recocido Simulado](/recocido-simulado-grafica.png)

 - file.js
	 - Se encuentran las funciones para leer el archivo de puntos, tranformarlos a un arreglo de objetos de tipo {x, y} y tambien la funcion que inicia el algoritmo de Recocido Simulado. 
 - config.js
	 - Se encuentran constantes de configuración para el color de fondo, puntos, etc., asi como las imagenes que indican el inicio y fin de la ruta.
 - agente_viajero.js
	 - Se encuentra el algoritmo de Recocido Simulado y funciones auxiliares para dicho algoritmo.
 - draw.js
	 - Se encuentran las funciones que se encargan de pintar las ciudades(puntos), las rutas, pintar el la grafica con el avance del óptimo durante todas las iteraciónes realizadas del algoritmo.