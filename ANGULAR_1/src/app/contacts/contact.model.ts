// Defines what a Contact looks like in our app
export interface Contact {
  id:number;
  name: string;        // Contact's name
  countryCode: string; // Country calling code like +91, +1
  phone: string;       // Phone number without country code
}
