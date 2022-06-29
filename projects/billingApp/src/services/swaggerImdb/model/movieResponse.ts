/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { Ratings } from './ratings';


export interface MovieResponse { 
    actors?: string;
    awards?: string;
    boxOffice?: string;
    country?: string;
    DVD?: string;
    director?: string;
    genre?: string;
    language?: string;
    metascore?: string;
    plot?: string;
    poster?: string;
    production?: string;
    rated?: string;
    ratings?: Array<Ratings>;
    released?: string;
    response?: boolean;
    runtime?: string;
    title?: string;
    type?: string;
    website?: string;
    writer?: string;
    year?: string;
    imdbID?: string;
    imdbRating?: string;
    imdbVotes?: string;
}