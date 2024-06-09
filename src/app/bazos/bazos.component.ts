import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Offer } from './model/bazos.model';
import { BazosService } from './service/bazos.service';
import { BazosState, BazosStore } from './store/bazos.store';

@Component({
  selector: 'app-bazos',
  templateUrl: './bazos.component.html',
  styleUrl: './bazos.component.scss',
  standalone: true,
  providers: [BazosStore, BazosService],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule],
})
export class BazosComponent implements OnInit {
  state: BazosState = this.bazosStore.state;

  addOfferForm = this.formBuilder.group({
    title: [undefined, Validators.required],
    description: [undefined, Validators.required],
    price: [undefined, [Validators.min(0), Validators.required]], // Assuming price cannot be negative
  });

  // TODO: min price and max price musia byt vacise ako 0
  filterForm = this.formBuilder.group({
    title: [this.state.filters.title],
    description: [this.state.filters.description],
    maxPrice: [this.state.filters.maxPrice],
    minPrice: [this.state.filters.minPrice],
    //price: [this.state.filters.price, Validators.min(0)], // Assuming price cannot be negative
  });

  constructor(
    private readonly bazosStore: BazosStore,
    private readonly bazosService: BazosService,
    private formBuilder: FormBuilder
  ) {
    this.bazosService.getAll().subscribe((res) => console.log(res));
  }

  ngOnInit() {}

  addNewOffer() {
    // Handle form submission here
    if (this.addOfferForm.valid) {
      const newOffer = this.addOfferForm.value as Offer;

      this.bazosStore.addOffer(newOffer); // Add the form data to the store
      this.addOfferForm.reset(); // Reset the form after submission
      this.refreshState();
    }
  }

  deleteLastAddedOffer() {
    this.bazosStore.deleteLastAddedOffer();
    this.refreshState();
  }

  filterOffers() {
    this.bazosStore.updateStateByFilters(this.filterForm.value);
    this.refreshState();
  }

  resetFilter() {
    this.filterForm.reset();
    this.filterOffers();
  }

  private refreshState() {
    this.state = this.bazosStore.state;
  }
}
