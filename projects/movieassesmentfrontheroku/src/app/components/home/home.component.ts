import { Component, OnInit ,ViewChild, AfterViewInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup ,ReactiveFormsModule, NgForm } from '@angular/forms';
import { MovieAssessmentService } from '../../../services/swaggerMovie/api/movieAssessment.service';
import { MovieControllerService } from '../../../services/swaggerImdb/api/movieController.service';
import { MovieResponse } from '../../../services/swaggerImdb/model/movieResponse'
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource} from '@angular/material/table';
import { AuthService } from '@auth0/auth0-angular';
import { tap } from 'rxjs/internal/operators';

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

  displayedColumns: string[] = ['url_imagen', 'nombre', 'nota'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

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
        this.movieAssessmentService.listUsingGET(perfil.sub).subscribe(all => {
          this.asessmentMovieList = new MatTableDataSource<movieAssessment>(all);
          console.log(this.asessmentMovieList);
          setTimeout(() => {
            this.asessmentMovieList.sort = this.sort;
          })
          this.ready=true;
          console.log(this.asessmentMovieList);
        })
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

  onAssessmentMovieSubmit(forma: NgForm) {
      var update = false;
      var movieValored : any;
      console.log(this.responseMovie.Title);
      console.log( forma );
      if(forma.valid && !isNaN(forma.controls.note.value) && forma.controls.note.value >= 0 &&forma.controls.note.value <= 1000){
        this.asessmentMovieList.filteredData.forEach(element => {
          if(element.movie.nombre == this.responseMovie.Title){
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
          this.movieAssessmentService.postUsingPOST(this.responseMovie.imdbID , this.userInfo.sub, forma.controls.note.value).subscribe(x => {
            console.log(x);
            this.ngOnInit();
            this.ngAfterViewInit();
          },
          error => {
            console.log(error.error.mensaje);
          });
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
