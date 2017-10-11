package main

import (
	"fmt"
	"math/rand"
)

func main() {
	var num_puntos int

	fmt.Scanf("%d", &num_puntos)

	for i := 0; i < num_puntos; i++ {
		fmt.Println(rand.Intn(500), rand.Intn(500))
	}
}
