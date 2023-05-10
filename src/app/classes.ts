import { ReservationsComponent } from "../components/reservations/reservations"

export class User{
  address ?: string
  id : string
  first_name:string
  last_name:string
  img? :string
  phone?:string
  password:string
  constructor(id: string, first_name: string,password : string, last_name: string, address?: string, img?: string, phone?: string) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.address = address;
    this.img = img;
    this.phone = phone;
    this.password=password
  }
  static fromObject(obj: any): User {
    return new User(obj.id,obj.password, obj.first_name, obj.last_name, obj.address, obj.img, obj.phone);
  }

  // toObject(): any {
  //   return {
  //     id: this.id,
  //     first_name: this.first_name,
  //     last_name: this.last_name,
  //     address: this.address,
  //     img: this.img,
  //     phone: this.phone,
  //     password : this.password
  //   };
  // }
  }

export class Vehicle {
    image? : string;
    id: number;
    age : string;
    license_plate: string;
    brand: string;
    model: string;
    type: string;
    status : string;
    hour_rate : number
    constructor(id: number, licensePlate: string, brand: string, model: string, type: string, status: string,image?:string) {
      this.id = id;
      this.license_plate = licensePlate;
      this.brand = brand;
      this.model = model;
      this.type = type;
      this.status = status;
      this.image = image
      
    }
  
    static fromObject(obj: Vehicle): Vehicle {
      return new Vehicle(obj.id, obj.license_plate, obj.brand, obj.model, obj.type, obj.status,obj.image);
    }
  
    static toObject(vehicle: Vehicle): any {
      return {
        id: vehicle.id,
        licensePlate: vehicle.license_plate,
        brand: vehicle.brand,
        model: vehicle.model,
        type: vehicle.type,
        status: vehicle.status
      };
    }
  }
  
  export class Driver {
    id: number;
    name: string;
    license_number: string;
  }
  
  export class RentalAgency {
    id: number;
    name: string;
    address: string;
    code_agency:string;
    constructor(id: number, name: string, address: string, code_agency: string) {
      this.id = id;
      this.name = name;
      this.address = address;
      this.code_agency = code_agency;
    }
  
    static fromObject(obj: any): RentalAgency {
      return new RentalAgency(obj.id, obj.name, obj.address, obj.code_agency);
    }
  
    static toObject(rentalAgency: RentalAgency): any {
      return {
        id: rentalAgency.id,
        name: rentalAgency.name,
        address: rentalAgency.address,
        code_agency: rentalAgency.code_agency
      };
    }
  }
  
  export class Rental {
    id: number;
    user:User;
    start_date: Date |string;
    end_date: Date |string;
    vehicle: Vehicle;
    status : string;
    rent_date? : Date | string;
    // {'unpaid';'proccesing',''check_car_availability}
    constructor(id: number, startDate: Date, endDate: Date, vehicle: Vehicle, status: string) {
      this.id = id;
      this.start_date = startDate;
      this.end_date = endDate;
      this.vehicle = vehicle;
      this.status = status;
    }

    static fromObject(obj: any,v? : Vehicle): Rental {
      var vehicle : Vehicle
      if(obj.vehicle)
          vehicle = Vehicle.fromObject(obj.vehicle);
      if (v)
          vehicle = v
          

      return new Rental(obj.id, new Date(obj.startDate), new Date(obj.endDate), vehicle, obj.status);
    }
  
    static toObject(rental: Rental): any {
      return {
        id: rental.id,
        startDate: rental.start_date.toString(),
        endDate: rental.end_date.toLocaleString(),
        vehicle: Vehicle.toObject(rental.vehicle),
        status: rental.status
      };
    }
  }
  
  export class Payment {
    id: number;
    amount: number;
    rental: Rental;
  }
  
  export class Insurance {
    id: number;
    company: string;
    start_date: Date;
    end_date: Date;
    vehicle: Vehicle;
    constructor(id: number, company: string, startDate: Date, endDate: Date, vehicle: Vehicle) {
      this.id = id;
      this.company = company;
      this.start_date = startDate;
      this.end_date = endDate;
      this.vehicle = vehicle;
    }
  
    static fromObject(obj: any): Insurance {
      const vehicle = Vehicle.fromObject(obj.vehicle);
      return new Insurance(obj.id, obj.company, new Date(obj.startDate), new Date(obj.endDate), vehicle);
    }
  
    static toObject(insurance: Insurance): any {
      return {
        id: insurance.id,
        company: insurance.company,
        startDate: insurance.start_date.toISOString(),
        endDate: insurance.end_date.toISOString(),
        vehicle: Vehicle.toObject(insurance.vehicle)
      };
    }
  }
  
  export class Inspection {
    id: number;
    date: Date;
    vehicle: Vehicle;
    description : string
    constructor(id: number, date: Date, vehicle: Vehicle,description :string) {
      this.id = id;
      this.date = date;
      this.vehicle = vehicle;
      this.description = description
    }
  
    static fromObject(obj: any): Inspection {
      const vehicle = Vehicle.fromObject(obj.vehicle);
      return new Inspection(obj.id, new Date(obj.date), vehicle,obj.description);
    }
  
    static toObject(inspection: Inspection): any {
      return {
        id: inspection.id,
        date: inspection.date.toISOString(),
        vehicle: Vehicle.toObject(inspection.vehicle),
        description : inspection.description
      };
    }
  }
  
  export class VehicleStatus {
    id: number;
    date: Date;
    mileage: number;
    fuel_level: number;
    vehicle: Vehicle;
  }
  
  export class Incident {
    id: number;
    date: Date;
    description: string;
    
  }
  
  export class QuarterlyStatistics {
    vehicles: Vehicle[];
    rentals: Rental[];
    incidents: Incident[];
    payments: Payment[];
  }
  
  export class Reminder {
    date: Date;
    description: string;
    rental: Rental | null;
    insurance: Insurance | null;
    technical_inspection: Inspection | null;
  }
  
  export class Contract{
    rental :Rental
    payment : Payment

  }
  