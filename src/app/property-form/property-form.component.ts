import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PropertyService, Property } from '../property.service';

@Component({
  selector: 'app-property-form',
  templateUrl: './property-form.component.html',
  styleUrls: ['./property-form.component.css']
})
export class PropertyFormComponent implements OnInit {
  propertyForm: FormGroup;
  isEditMode = false;
  currentPropertyId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private propertyService: PropertyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.propertyForm = this.fb.group({
      place: ['', Validators.required],
      area: ['', [Validators.required, Validators.min(1)]],
      bedrooms: ['', [Validators.required, Validators.min(1)]],
      bathrooms: ['', [Validators.required, Validators.min(1)]],
      hospitalNearby: [false],
      schoolNearby: [false]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id');
      if (id) {
        this.isEditMode = true;
        this.currentPropertyId = id;
        const property = this.propertyService.getPropertyById(id);
        if (property) {
          this.propertyForm.patchValue(property);
        }
      }
    });
  }

  onSubmit(): void {
    if (this.propertyForm.valid) {
      const property: Property = this.propertyForm.value;
      if (this.isEditMode && this.currentPropertyId) {
        property.id = this.currentPropertyId;
        this.propertyService.updateProperty(property);
      } else {
        this.propertyService.addProperty(property);
      }
      this.router.navigate(['/properties']);
    }
  }

  // Add these getters to access form controls in the template
  get place() { return this.propertyForm.get('place'); }
  get area() { return this.propertyForm.get('area'); }
  get bedrooms() { return this.propertyForm.get('bedrooms'); }
  get bathrooms() { return this.propertyForm.get('bathrooms'); }
}
