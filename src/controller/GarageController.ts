import GarageService from '../services/GarageService';
import Car from '../models/Car';

export default class GarageController {
    private garageService: GarageService;

    constructor(garageService: GarageService) {
        this.garageService = garageService;
    }

     addCar(carDto:unknown){
        return  this.garageService.addCar(carDto as Car);
    }

    async removeCar(regNumber: string) {
        return this.garageService.removeCar(regNumber);
    }

    async findCarByRegNumber(regNumber: string) {
        return this.garageService.findCarByRegNumber(regNumber)
    }

    findCarByEngine(min: number, max: number) {
        return this.garageService.findCarByEngine(min,max);
    }

    async findCarsByModel(model: string) {
        return this.garageService.findCarsByModel(model);
    }

    async findCarsByCompany(company: string) {
        return this.garageService.findCarsByCompany(company);
    }

    async findCarsByColor(color: string) {
        return this.garageService.findCarByColor(color)
    }
}