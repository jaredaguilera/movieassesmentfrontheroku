import { InjectionToken } from '@angular/core';

export const BASE_PATH = new InjectionToken<string>('basePathImdb');
export const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
}
