import GarageService from './GarageService';
import Car from '../models/Car';
import GarageRepository from '../dao/GarageRepository';

export default class GarageServiceImpl implements GarageService{
    private garageRepository = new GarageRepository();

    addCar(car: Car): boolean {
        const cars = this.garageRepository.readAll();
        if(cars.find(value => value.regNumber.toLowerCase()=== car.regNumber.toLowerCase())){
            console.error(`Car with reqNumber ${car.regNumber} already exists`); // TODO 409 Conflict
            return false;
        }
        cars.push(car)
        return this.garageRepository.writeAll(cars);
    }

    removeCar(regNumber: string): Car|null {
        const cars = this.garageRepository.readAll();
        const index= cars.findIndex(value => value.regNumber.toLowerCase()===regNumber.toLowerCase());
        if(index ===-1) {
            return null;
        }
        const [removeCar] = cars.splice(index,1);
        this.garageRepository.writeAll(cars);
        return removeCar;
    }

    findCarByRegNumber(regNumber: string): Car | null {
        const cars = this.garageRepository.readAll();
        return cars.find(value => value.regNumber.toLowerCase()=== regNumber.toLowerCase()) || null;
    }

    findCarByEngine(min: number, max: number): Car[] {
        const cars = this.garageRepository.readAll()
        return cars.filter(value => value.engine>= min && value.engine < max);
    }

    findCarsByModel(model: string): Car[] {
        const cars = this.garageRepository.readAll()
        return cars.filter(value => value.model.toLowerCase() === model.toLowerCase());
    }

    findCarsByCompany(company: string): Car[] {
        if (company === "") {
            throw new Error("Not a color")
        }
        const cars = this.garageRepository.readAll()
        return cars.filter(value => value.company.toLowerCase() === company.toLowerCase());
    }

    findCarByColor(color: string): Car[] {
        if (color === "") {
            throw new Error("Not a color")
        }
        const cars = this.garageRepository.readAll()
        return cars.filter(value => value.color.toLowerCase() === color.toLowerCase());
    }



}