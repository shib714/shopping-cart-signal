import { Component, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { HttpClient, provideHttpClient } from '@angular/common/http';

@Component({
    selector: 'signal-effect',
    imports: [FormsModule],
    template: `
  <h1>Proper use of signal effect: Star Wars Vehicle Sales</h1>
  <select class="select" (change)="onSelectedVehicle($event.target)">
    <option value="" disabled selected>--Select a vehicle--</option>
    @for(vehicle of vehicles(); track vehicle) {
      <option [value]='vehicle.id'>{{ vehicle.name }}</option>
    }
  </select>
  <div>Quantity: <input type='number' [(ngModel)]='quantity' ></div>
  <div>Vehicle: {{ selectedVehicle()?.name }}</div>
  <div>Movie: {{ movie()?.title }}</div>
  <div>Price: {{ selectedVehicle()?.price }}</div>
  <div [style.color]='color()'>Total: {{ total() }}</div>
  `,
})
//https://www.youtube.com/watch?v=XWz8pxQWD8c
//Demonstrates the proper use of effect function of signal
export class SignalEffectExample {

    private url = 'https://swapi.py4e.com/api/films';

    // initial signals to support the ui template
    selectedVehicle = signal<Vehicle | undefined>(undefined);
    //total = signal(0);
    //color = signal('blue');

    //for the drop down list
    vehicles = signal<Vehicle[]>([
        { id: 1, name: 'Sand Crawler', price: 22050 },
        { id: 2, name: 'AT-AT', price: 10050 },
        { id: 3, name: 'TIE Fighter', price: 55000 }
    ]);
    //input value of the quantity
    //quantity = signal(0);
    //we commented the quantity property and use linkedSignal to improve our code in Task 2 as below:
    // First Look at Angular's new linkedSignal()  
    quantity = linkedSignal({
        source: this.selectedVehicle,
        computation: () => 1
    });


    // Task 1: React to changes and adjust the total and color.
    // when either signal (selectedVehicle and quantity) changes,
    // This code will re-execute, recalculate the total and set that into the total signal
    // it also set the color signal when the total exceeds 50000 to green    
    // totalEff = effect(() => {
    //     this.total.set((this.selectedVehicle()?.price ?? 0) * this.quantity());
    //     console.log('total:', this.total());
    //     this.color.set(this.total() > 50000 ? 'green' : 'blue');
    // });
    //Note: there is a better way to accomplish this using computed signal; we commented the above code 
    // and re-write it as below:
    //using computed, we get dependency tracking
    total = computed(() => (this.selectedVehicle()?.price ?? 0) * this.quantity());
    color = computed(() => this.total() > 50000 ? 'green' : 'blue');


    // Task 2: Reset the quantity when the vehicle selection changes
    // qtyResetEffcet = effect(() => {
    //     if (this.selectedVehicle()) {
    //         this.quantity.set(1);
    //     }
    // });
    //Note: there is a better way to accomplish this using linked signal; we commented the above code 
    // and re-write the quantity above using linked signal see line 44 :



    // Task 3: Retrieve the movies for the selected vehicle
    http = inject(HttpClient);
    // movie = signal<Film | undefined>(undefined);
    // //loding the related data
    // movieEff = effect(() =>
    //     this.http.get<Film>(`${this.url}/${this.selectedVehicle()?.id}`)
    //         .subscribe(m => this.movie.set(m))
    // );

    //We could improve the above code using RX resource 
    movieResource = rxResource({
        params: this.selectedVehicle,
        // Destructuring: extracting the `request` property and assigning its value to `vehicle`.
        stream: ({ params: vehicle }) => this.http.get<Film>(`${this.url}/${vehicle?.id}`),
    });
    movie = computed(() => this.movieResource.value());



    // Task 4: Log out signals when they change
    qtyEff = effect(() => console.log('quantity:', this.quantity()));
    vehEff = effect(() => console.log('vehicle:', JSON.stringify(this.selectedVehicle())));

    onSelectedVehicle(ele: EventTarget | null) {
        // Get the id from the element
        const id = Number((ele as HTMLSelectElement).value);
        // Find the vehicle in the array
        const foundVehicle = this.vehicles().find((v) => v.id === id);

        // Set it as the selected vehicle
        if (foundVehicle) {
            this.selectedVehicle.set(foundVehicle);
        }
    }

}

export interface Vehicle {
    id: number;
    name: string;
    price: number;
}

export interface Film {
    title: string;
}