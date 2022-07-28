import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';
import { MovieControllerService } from 'projects/movieassesmentfrontheroku/src/services/swaggerImdb/api/movieController.service';
import { MovieAssessmentService } from 'projects/movieassesmentfrontheroku/src/services/swaggerMovie/api/movieAssessment.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  movies: any;
  constructor(
    public auth: AuthService,
    private movieAssessmentService : MovieAssessmentService,
    private movieControllerService : MovieControllerService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit() {
    this.movieAssessmentService.listUsingGET().subscribe(all => {
      var nuevoArray    = []
	    var arrayTemporal = []
      var contador = 0;
      all.forEach(element => {

        arrayTemporal = nuevoArray.filter(resp => resp["nombrePelicula"] == element.movie.nombre)
        if(arrayTemporal.length>0){
            contador=contador+1;
            nuevoArray[nuevoArray.indexOf(arrayTemporal[0])]["valoracion"].push(element.nota);
            nuevoArray[nuevoArray.indexOf(arrayTemporal[0])]["cantidad"] =  contador;
            nuevoArray[nuevoArray.indexOf(arrayTemporal[0])]["suma"] = nuevoArray[nuevoArray.indexOf(arrayTemporal[0])]["suma"] + element.nota;
            nuevoArray[nuevoArray.indexOf(arrayTemporal[0])]["promedio"] = nuevoArray[nuevoArray.indexOf(arrayTemporal[0])]["suma"] / nuevoArray[nuevoArray.indexOf(arrayTemporal[0])]["cantidad"]
        }else{
            contador = 1;
            nuevoArray.push({"nombrePelicula" : element.movie.nombre , "valoracion" : [element.nota] , "cantidad" : contador, "suma" : element.nota , "promedio": element.nota , "poster": element.movie.url_imagen})
        }

      });
      nuevoArray.sort(function(a, b){ return a.promedio < b.promedio ? 1 : b.promedio < a.promedio ? -1 : 0 });
      console.log(nuevoArray);
      this.movies = nuevoArray;
    })
  }

}

