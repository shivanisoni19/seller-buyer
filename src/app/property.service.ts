import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Property {
  id: number;
  place: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  hospitalNearby: boolean;
  schoolNearby: boolean;
  likes: number;
  interestedBuyers: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private properties: Property[] = [];
  private propertiesSubject = new BehaviorSubject<Property[]>(this.properties);

  getProperties() {
    return this.propertiesSubject.asObservable();
  }

  addProperty(property: Property) {
    property.id = this.properties.length + 1;
    property.likes = 0;
    property.interestedBuyers = [];
    this.properties.push(property);
    this.propertiesSubject.next(this.properties);
  }

  updateProperty(updatedProperty: Property) {
    const index = this.properties.findIndex(p => p.id === updatedProperty.id);
    if (index !== -1) {
      this.properties[index] = updatedProperty;
      this.propertiesSubject.next(this.properties);
    }
  }

  getPropertyById(id: number): Property | undefined {
    return this.properties.find(p => p.id === id);
  }

  likeProperty(id: number) {
    const property = this.getPropertyById(id);
    if (property) {
      property.likes += 1;
      this.propertiesSubject.next(this.properties);
    }
  }

  notifySeller(propertyId: number, buyerEmail: string) {
    const property = this.getPropertyById(propertyId);
    if (property) {
      property.interestedBuyers.push(buyerEmail);
      this.propertiesSubject.next(this.properties);
      // Send email to the seller (mock implementation)
      console.log(`Seller notified about buyer: ${buyerEmail}`);
    }
  }
}
