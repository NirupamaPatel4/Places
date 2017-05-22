export class Location {
  public lat: string = "";
  public long: string = "";
}

export class Address {
  public locality: string = "";
  public city: string = "";
  public state: string = "";
  public country: string = "";
  public postal_code: string = "";
  public formattedAddress: string = "";
  public location: Location;

  constructor(place: any) {
    if (place.address_components != undefined) {
      for (let component of place.address_components) {
        if (component.types != undefined) {
          if (component.types.indexOf("sublocality_level_1") > -1) {
            this.locality = component.long_name;
          }
          if (component.types.indexOf("locality") > -1) {
            this.city = component.long_name;
          }
          if (component.types.indexOf("administrative_area_level_1") > -1) {
            this.state = component.long_name;
          }
          if (component.types.indexOf("country") > -1) {
            this.country = component.long_name;
          }
          if (component.types.indexOf("postal_code") > -1) {
            this.postal_code = component.long_name;
          }
        }
      }
    }
    this.formattedAddress = place.formatted_address;
    this.location = new Location();
    if (place.geometry != undefined) {
      this.location.lat = place.geometry.location.lat();
      this.location.long = place.geometry.location.lng();
    }
  }
}
