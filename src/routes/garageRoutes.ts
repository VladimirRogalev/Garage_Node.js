import {Router} from 'express';
import GarageController from '../controller/GarageController';
import GarageServiceImpl from '../services/GarageServiceImpl';
import {body} from 'express-validator';
import validationMiddleware from '../middleware/validationMiddleware';
import asyncHandler from 'express-async-handler';

const router = Router();

const garageService = new GarageServiceImpl();
const garageController = new GarageController(garageService);
router.post("/addCar",
    body("regNumber").isString().notEmpty(),
    body("model").isString().notEmpty(),
    body("company").isString().notEmpty(),
    body("engine").isFloat({min:0.8, max: 6.2}),
    body("color").isString().notEmpty(),
     validationMiddleware, (req, res) => {
        const carDto = req.body;
        const isSuccess =  garageController.addCar(carDto);
        if (isSuccess) {
            res.status(200).send("Okay");
        } else {
            res.status(404).send("Car already exists");

        }
    })
router.delete("/removeCar", async (req,res)=>{
    const {regNumber} = req.query;
    const car = await garageController.removeCar(regNumber+"");
    if(car){
        res.status(200).send({car});
    }else{
        res.status(404).send("Car already exists");// TODO
    }
})

router.get("/findCarByRegNumber", asyncHandler(async (req,res)=>{
    const {regNumber} = req.query;
    const car = await garageController.findCarByRegNumber(regNumber+"");
    if(car){
        res.status(200).send({car});
    }else{
        res.status(404).send("Car already exists");// TODO
    }
}))

router.get("/findCarByEngine",asyncHandler( async (req,res)=>{
    const {min, max} = req.query;
    const cars =  garageController.findCarByEngine(Number.parseFloat(min+""), Number.parseFloat(max+""));
    if(cars){
        res.status(200).send({cars});
    }else{
        res.status(404).send("Car already exists");// TODO
    }
}))

router.get("/findCarsByModel", asyncHandler(async (req,res)=>{
    const {model} = req.query;
    const cars = await garageController.findCarsByModel(model+"");
    if(cars){
        res.status(200).send({cars});
    }else{
        res.status(404).send("Car already exists");// TODO
    }
}))

router.get("/findCarsByCompany", asyncHandler(async (req,res)=>{
    const {company} = req.query;
    const cars = await garageController.findCarsByCompany(company+"");
    if(cars){
        res.status(200).send({cars});
    }else{
        res.status(404).send("Car already exists");// TODO
    }
}))

router.get("/findCarsByColor", asyncHandler(async (req,res)=>{
    const {color} = req.query;
    const cars = await garageController.findCarsByColor(color+"");
    res.json({cars});
    // if(cars){
    //     res.status(200).send({cars});
    // }else{
    //     res.status(404).send("Car already exists");// TODO
    // }
}))
export default router;