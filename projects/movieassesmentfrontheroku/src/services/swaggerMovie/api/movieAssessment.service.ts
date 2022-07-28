/**
 * Movie Assessment
 * Movie Assessment is app for add ratings to watched or recorded movies  The IETF devised RFC 7807 effor, which creates a generalized error-handling schema. https://tools.ietf.org/html/rfc7807
 *
 * OpenAPI spec version: 1.0
 * Contact: https://www.linkedin.com/in/jared-alberto-aguilera-zamora-1a885a7a/
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';


import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class MovieAssessmentService {

  protected basePath = '/';
  public defaultHeaders = new HttpHeaders({Authorization: 'Basic '+btoa("admin:admin")});
  public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * deleteRated
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteRatedUsingDELETE(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteRatedUsingDELETE(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteRatedUsingDELETE(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteRatedUsingDELETE(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.basePath}/movieassessment/deleteRated`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * listMovie
     *
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listMovieUsingGET(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public listMovieUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public listMovieUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public listMovieUsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/movieassessment/getTotalMovies`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Return all Assessment List
     * Return 204 if no data found
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public listUsingGET(idUser?: string, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public listUsingGET(idUser?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public listUsingGET(idUser?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public listUsingGET(idUser?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idUser !== undefined && idUser !== null) {
            queryParameters = queryParameters.set('optionalIdUser', <any>idUser);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/movieassessment/getTotalMoviesRated`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Return all Assessment bundled into Response
     * Return 204 if no data found
     * @param idMovie idMovie
     * @param idUser idUser
     * @param rating rating
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postUsingPOST(idMovie: string, idUser: string, rating: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public postUsingPOST(idMovie: string, idUser: string, rating: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public postUsingPOST(idMovie: string, idUser: string, rating: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public postUsingPOST(idMovie: string, idUser: string, rating: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (idMovie === null || idMovie === undefined) {
            throw new Error('Required parameter idMovie was null or undefined when calling postUsingPOST.');
        }

        if (idUser === null || idUser === undefined) {
            throw new Error('Required parameter idUser was null or undefined when calling postUsingPOST.');
        }

        if (rating === null || rating === undefined) {
            throw new Error('Required parameter rating was null or undefined when calling postUsingPOST.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (idMovie !== undefined && idMovie !== null) {
            queryParameters = queryParameters.set('idMovie', <any>idMovie);
        }
        if (idUser !== undefined && idUser !== null) {
            queryParameters = queryParameters.set('idUser', <any>idUser);
        }
        if (rating !== undefined && rating !== null) {
            queryParameters = queryParameters.set('rating', <any>rating);
        }

        let headers = this.defaultHeaders;

        // authentication (JWT) required
        if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
            headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.post<any>(`${this.basePath}/movieassessment/enteRating`,
            null,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * Return all Assessment bundled into Response
     * Return 204 if no data found
     * @param idMovie idMovie
     * @param idUser idUser
     * @param rating rating
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
     public putUsingPOST(id_valoracion: number, movieAssessment: any, observe?: 'body', reportProgress?: boolean): Observable<any>;
     public putUsingPOST(id_valoracion: number, movieAssessment: any, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
     public putUsingPOST(id_valoracion: number, movieAssessment: any, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
     public putUsingPOST(id_valoracion: number, movieAssessment: any, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
         console.log("da");
         if (id_valoracion === null || id_valoracion === undefined) {
             throw new Error('Required parameter idMovie was null or undefined when calling postUsingPOST.');
         }

         if (movieAssessment === null || movieAssessment === undefined) {
             throw new Error('Required parameter idUser was null or undefined when calling postUsingPOST.');
         }

         let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
         if (id_valoracion !== undefined && id_valoracion !== null) {
             queryParameters = queryParameters.set('id', <any>id_valoracion);
         }
         if (movieAssessment !== undefined && movieAssessment !== null) {
             queryParameters = queryParameters.set('movieAssessment', <any>movieAssessment);
         }


         let headers = this.defaultHeaders;

         // authentication (JWT) required
         if (this.configuration.apiKeys && this.configuration.apiKeys["Authorization"]) {
             headers = headers.set('Authorization', this.configuration.apiKeys["Authorization"]);
         }

         // to determine the Accept header
         let httpHeaderAccepts: string[] = [
             '*/*'
         ];
         const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
         if (httpHeaderAcceptSelected != undefined) {
             headers = headers.set('Accept', httpHeaderAcceptSelected);
         }

         // to determine the Content-Type header
         const consumes: string[] = [
             'application/json'
         ];

         return this.httpClient.put<any>(`${this.basePath}/movieassessment/updateRated/`+ id_valoracion,
                movieAssessment,
             {
                 params: queryParameters,
                 withCredentials: this.configuration.withCredentials,
                 headers: headers,
                 observe: observe,
                 reportProgress: reportProgress
             }
         );
     }
}
