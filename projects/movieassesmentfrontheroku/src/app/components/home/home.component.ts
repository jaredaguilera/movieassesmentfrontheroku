import { Component, OnInit ,ViewChild, AfterViewInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup , NgForm } from '@angular/forms';
import { MovieAssessmentService } from '../../../services/swaggerMovie/api/movieAssessment.service';
import { MovieControllerService } from '../../../services/swaggerImdb/api/movieController.service';
import { MovieResponse } from '../../../services/swaggerImdb/model/movieResponse'
import {Sort} from '@angular/material/sort';
import { AuthService } from '@auth0/auth0-angular';

interface MovieAssessment
{
  id_valoracion: number,
  movie: {
      id_pelicula: number,
      nombre: string,
      url_imagen: string,
      descripcion: string,
      categoria: string,
  },
  id_usuario: number,
  nota: number,
}

interface movieSearch
{
  name: string,
  year: string,
  type: string,
  sortOrFull: string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit , AfterViewInit{
  title = 'Movie Catalogue';
  assessmentMovieForm: FormGroup;
  searchMovieForm: FormGroup;
  asessmentMovieList : any;
  asessmentMovieListNotQualified : any;
  responseMovie : MovieResponse;
  loading: boolean;
  errorMovie: boolean;
  ready: boolean;
  errores:{};
  userInfo: any;
  movieSearch= {
    name: '',
    year: '',
    type: '',
    shortOrFull: '',
  };
  errorAssessment=false;
  movieSubmit=false;
  tipos=[];
  shortOrFulls=[];
  note:{n:''};

  sortedData: MovieAssessment[];
  sortedDataNotQualified: MovieAssessment[];
  constructor(
    public auth: AuthService,
    private movieAssessmentService : MovieAssessmentService,
    private movieControllerService : MovieControllerService,
    private formBuilder: FormBuilder
  ){
    this.ready = false;
    this.tipos=[{value:"series", name:"Serie"}, {value:"movie", name:"Pelicula"},{value:"episode", name:"Documental"}];
    this.shortOrFulls=[{value:"full", name:"Completo"}, {value:"short", name:"Corto"},{value:"episode", name:"Episodio"}];
  }
  ngAfterViewInit() {
    this.ready = false;
    this.auth.user$.subscribe(perfil=> {
        this.userInfo = perfil;
        console.log(perfil);
        this.movieAssessmentService.listUsingGET().subscribe(all => {
          this.asessmentMovieList = all.filter(xx => xx.id_usuario === perfil.sub);
          this.asessmentMovieListNotQualified = all.filter(xx => xx.id_usuario !== perfil.sub);

          let arrayFiltrado =  this.asessmentMovieListNotQualified.filter(objetoFecha =>
            !this.asessmentMovieList.some(objetoCurso =>
              objetoCurso.movie.nombre == objetoFecha.movie.nombre
            )
          )

          arrayFiltrado = arrayFiltrado.filter((value, index, arr) => {
            return index === arr.findIndex(obj => obj.movie.nombre === value.movie.nombre);
          });

          console.log(arrayFiltrado);
          this.sortedData = this.asessmentMovieList.slice();
          this.sortedDataNotQualified = arrayFiltrado.slice();
          this.ready=true;

        },error=>{
            console.log(error);
        });


    });
  }

  sortData(sort: Sort) {
      const data = this.asessmentMovieList.slice();
      if (!sort.active || sort.direction === '') {
        this.sortedData = data;
        return;
      }

      this.sortedData = data.sort((a, b) => {
        const isAsc = sort.direction === 'asc';
        switch (sort.active) {
          case 'nota':
            return compare(a.nota, b.nota, isAsc);
          case 'nombre':
            return compare(a.movie.nombre, b.movie.nombre, isAsc);
          case 'url_imagen':
            return compare(a.movie.url_imagen, b.movie.url_imagen, isAsc);
          default:
            return 0;
        }
      });
  }

  //TODO refactorizar
  sortDataQ(sort: Sort) {
    const data = this.asessmentMovieListNotQualified.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedDataNotQualified = data;
      return;
    }

    this.sortedDataNotQualified = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'nota':
          return compare(a.nota, b.nota, isAsc);
        case 'nombre':
          return compare(a.movie.nombre, b.movie.nombre, isAsc);
        case 'url_imagen':
          return compare(a.movie.url_imagen, b.movie.url_imagen, isAsc);
        default:
          return 0;
      }
    });
}


  ngOnInit() {
    this.ready = false;
     this.loading = true;
     this.errorMovie = false;
     this.errores= {};
     this.assessmentMovieForm = this.formBuilder.group({
      idpelicula : new FormControl(''),
      idusuario : new FormControl(''),
      nota : new FormControl('')
     });
     this.searchMovieForm = this.formBuilder.group({
      tittle : new FormControl(''),
      year : new FormControl(''),
      type : new FormControl(''),
      fullOrShort : new FormControl('')
     });

  }

  onAssessmentMovieSubmit(forma: NgForm, element1?: any) {
      var update = false;
      var movieValored : any;


      console.log( forma );
      if(forma.valid && !isNaN(forma.controls.note.value) && forma.controls.note.value >= 0 &&forma.controls.note.value <= 1000){
        this.asessmentMovieList.forEach(element => {
          if((this.responseMovie && element.movie.nombre == this.responseMovie.Title)||(element1 && element.movie.nombre == element1.movie.nombre)){
            movieValored = element;
            update = true;
          }
        })
        if(update){
          movieValored.nota = forma.controls.note.value;
          this.movieAssessmentService.putUsingPOST(movieValored.id_valoracion , movieValored).subscribe(x => {
            console.log(x);
            this.ngOnInit();
            this.ngAfterViewInit();
          },
          error => {
            console.log(error.error.mensaje);

          });
        }else{
          if(!this.responseMovie){
                //TODO corregir agregar id imdbID
            this.movieControllerService.getMovieTitleControllerUsingGET(element1.movie.nombre , null , "json" , null, null,  ).subscribe(x => {
                this.movieAssessmentService.postUsingPOST(x.imdbID , this.userInfo.sub, forma.controls.note.value).subscribe(x => {
                  console.log(x);
                  this.ngOnInit();
                  this.ngAfterViewInit();
                },
                error => {
                  console.log(error.error.mensaje);
                });
            },
            error => {
              console.log(error.error.detail);
            });
          }else{
            this.movieAssessmentService.postUsingPOST(this.responseMovie.imdbID , this.userInfo.sub, forma.controls.note.value).subscribe(x => {
              console.log(x);
              this.ngOnInit();
              this.ngAfterViewInit();
            },
            error => {
              console.log(error.error.mensaje);
            });
          }
        }
      }else{
        this.errorAssessment=true;
        this.errores = "Ingrese Correctamente la calificacion, debe estar entre 0 a 1000."
      }
  }

  get f() { return this.searchMovieForm.controls; }

  onSearchTittleMovie(forma: NgForm ) {
    this.loading=true;
    console.log( forma );
    if(forma.valid){
      this.movieSubmit=true;
      this.errorMovie = false;
      this.movieControllerService.getMovieTitleControllerUsingGET(forma.controls.name.value, forma.controls.shortOrFull.value , "json" , forma.controls.type.value, forma.controls.year.value,  ).subscribe(x => {
        this.responseMovie = x;
        console.log( this.responseMovie);
        this.loading = false;
        this.movieSubmit=false;
      },
      error => {
        this.loading = false;
        this.errorMovie = true;
        this.movieSubmit=false;
        this.errores=error;
        console.log(error.error.detail);
      });
    }
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

