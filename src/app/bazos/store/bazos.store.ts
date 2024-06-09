import { Injectable } from '@angular/core';
import { OFFERS } from '../mock/bazos.mock';
import { BazosFilters, Offer } from '../model/bazos.model';

export interface BazosState {
  offers: Offer[];
  filters: BazosFilters;
  header: 'Bazos';
}

@Injectable()
export class BazosStore {
  private _state: BazosState = {
    offers: [...OFFERS],
    filters: {
      title: null,
      description: null,
      minPrice: null,
      maxPrice: null,
    },
    header: 'Bazos',
  };
  get state() {
    return this._state;
  }

  private setState(state: BazosState) {
    this._state = { ...state };
  }

  addOffer(offer: Offer) {
    this._state.offers.push(offer);
  }

  deleteLastAddedOffer() {
    this._state.offers.pop();
  }

  updateStateByFilters(filters: BazosFilters) {
    // Update state with filtered offers and applied filters
    const newState: BazosState = {
      ...this._state,
      offers: this.filteringOffers(filters, OFFERS),
      filters,
    };

    this.setState(newState);
  }

  // private filteringOffers(filters: BazosFilters, offers: Offer[]): Offer[] {
  //   const { title, description, minPrice, maxPrice } = filters;

  //   // TODO: Pouzi iba 1x filter
  //   // Apply filters based on criteria provided
  //   if (title) {
  //     offers = offers.filter((offer) =>
  //       offer.title.toLowerCase().includes(title.toLowerCase())
  //     );
  //   }

  //   if (description) {
  //     offers = offers.filter((offer) =>
  //       offer.description.toLowerCase().includes(description.toLowerCase())
  //     );
  //   }

  //   // Apply filtering for minPrice and maxPrice
  //   if (minPrice !== null && !isNaN(minPrice)) {
  //     offers = offers.filter((offer) => offer.price >= minPrice);
  //   }

  //   if (maxPrice !== null && !isNaN(maxPrice)) {
  //     offers = offers.filter((offer) => offer.price <= maxPrice);
  //   }

  //   return offers;
  // }

  private filteringOffers(filters: BazosFilters, offers: Offer[]): Offer[] {
    const { title, description, minPrice, maxPrice } = filters;

    return offers.filter((offer) => {
      const titleMatch =
        !title || offer.title.toLowerCase().includes(title.toLowerCase());
      const descriptionMatch =
        !description ||
        offer.description.toLowerCase().includes(description.toLowerCase());
      const minPriceMatch =
        minPrice === null || isNaN(minPrice) || offer.price >= minPrice;
      const maxPriceMatch =
        maxPrice === null || isNaN(maxPrice) || offer.price <= maxPrice;

      return titleMatch && descriptionMatch && minPriceMatch && maxPriceMatch;
    });
  }

  // resetFilters(filters: BazosFilters) {
  //   // let copyOfOffersState = { ...this.state };
  //   // this.setFilters(filters);
  //   console.log(filters);
  //   //this.setState(this._state);
  //   //console.log(copyOfOffersState);

  //   const copyOfOffersState = this.updateStateByFilters(filters);
  //   this.setState(copyOfOffersState);
  // }
}

// 0.
// STATE
// offers: [
//   {
//     title: 'modra',
//     description: 'string',
//     price: 55,
//   },
//   {
//     title: 'ruzova',
//     description: 'string',
//     price: 90,
//   },
// ];

// filters: {
//   title: null,
//   description: null,
//   price: null,
// },

// 1.
// STATE
// offers: [
//   {
//     title: 'modra',
//     description: 'string',
//     price: 55,
//   },
//   {
//     title: 'ruzova',
//     description: 'string',
//     price: 90,
//   },
// ];

// filters: {
//   title: 'modra',
//   description: null,
//   price: null,
// },

// 2.
// STATE
// offers: [
//   {
//     title: 'modra',
//     description: 'string',
//     price: 55,
//   },
// ];

// filters: {
//   title: 'modra',
//   description: null,
//   price: null,
// },
