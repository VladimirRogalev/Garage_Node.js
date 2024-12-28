import Car from '../models/Car';

export default interface GarageService{
    addCar(car:Car):boolean;

    removeCar(regNumber: string): Car|null;

    findCarByRegNumber(regNumber: string): Car | null;

    findCarByEngine(min: number, max: number): Car[];

    findCarsByModel(model: string): Car[];

    findCarsByCompany(company: string): Car[];

    findCarByColor(color: string): Car[];
}