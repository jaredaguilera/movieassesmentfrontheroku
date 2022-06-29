import { Component, OnInit ,ViewChild, AfterViewInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MovieAssessmentService } from '../services/swaggerMovie/api/movieAssessment.service';
import { MovieControllerService } from '../services/swaggerImdb/api/movieController.service';
import { MovieResponse } from '../services/swaggerImdb/model/movieResponse';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';

interface movieAssessment
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



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit , AfterViewInit{
  title = 'Movie Catalogue';
  assessmentMovieForm: FormGroup;
  searchMovieForm: FormGroup;
  asessmentMovieList : any;
  responseMovie : MovieResponse;
  loading: boolean;
  errorMovie: boolean;
  ready: boolean;
  errores:{};

  displayedColumns: string[] = ['url_imagen', 'nombre', 'nota'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(

    private movieAssessmentService : MovieAssessmentService,
    private movieControllerService : MovieControllerService,
    private formBuilder: FormBuilder
  ){
    this.ready = false;
  }
  ngAfterViewInit() {
    this.ready = false;
    this.movieAssessmentService.listUsingGET().subscribe(all => {
      this.asessmentMovieList = new MatTableDataSource<movieAssessment>(all);
      setTimeout(() => {
        this.asessmentMovieList.sort = this.sort;
      })
      this.ready=true;
      console.log(this.asessmentMovieList);
    })
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


  get g() { return this.assessmentMovieForm.controls; }

  //TO-DO corregir usuario
  onAssessmentMovieSubmit() {

      this.movieAssessmentService.postUsingPOST(this.responseMovie.imdbID , 1, this.g.nota.value).subscribe(x => {
        console.log(x);
        this.ngOnInit();
        this.ngAfterViewInit();
      },
      error => {
        console.log(error.error.mensaje);
      });
  }

  get f() { return this.searchMovieForm.controls; }

  onSearchTittleMovie() {
    this.loading = true;
    this.errorMovie = false;
    this.movieControllerService.getMovieTitleControllerUsingGET(this.f.tittle.value, this.f.fullOrShort.value , "json" , this.f.type.value, this.f.year.value,  ).subscribe(x => {
      this.responseMovie = x;
      console.log( this.responseMovie);
      this.loading = false;
    },
    error => {
      this.loading = false;
      this.errorMovie = true;
      this.errores=error;
      console.log(error.error.detail);
    });
  }

}
