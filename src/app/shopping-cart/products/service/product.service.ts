import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';

import { catchError, map, Observable, shareReplay, throwError } from 'rxjs';
import { IProduct } from '../models/product.interface';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private readonly API_URL = 'https://fakestoreapi.com/products';
    private readonly http = inject(HttpClient);

    //load products as obserable
    products$ = this.http.get<ReadonlyArray<IProduct>>(this.API_URL).pipe(
        map((data) =>
            //added quantity to the data returned by the API
            data.map((p) => ({
                ...p,
                quantity: 1,
            })) as IProduct[]
        ),
        shareReplay(1),
        catchError(this.handleError)
    );

    //convert products$ to signal
    products = toSignal(this.products$, { initialValue: [] as IProduct[] });

    selectedProduct = signal<IProduct | undefined>(undefined);

    productSelected(productId: number) {
        const foundProduct = this.products().find((p) => p.id === productId);
        this.selectedProduct.set(foundProduct);
    }

    private handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message
                }`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }
}