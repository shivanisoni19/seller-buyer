import { Component, OnInit } from '@angular/core';
import { PropertyService, Property } from '../property.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  properties: Property[] = [];
  page: number = 1;

  constructor(private propertyService: PropertyService, private authService: AuthService) {}

  ngOnInit(): void {
    this.propertyService.getProperties().subscribe(properties => {
      this.properties = properties;
    });
  }

  editProperty(id: number): void {
    // Navigate to the property edit form
    // Note: use router.navigate if you need to redirect programmatically
  }

  likeProperty(id: number): void {
    this.propertyService.likeProperty(id);
  }

  interestedInProperty(id: number): void {
    if (this.authService.isLoggedIn()) {
      const buyerEmail = 'buyer@example.com'; // Replace with actual buyer email
      this.propertyService.notifySeller(id, buyerEmail);
    } else {
      this.authService.redirectToLogin();
    }
  }
}
