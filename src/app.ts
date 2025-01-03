import express, {Application,Request, Response, NextFunction} from 'express';
import garageRoutes from './routes/garageRoutes';

const app:Application = express();
const PORT = 3000;

app.use(express.json()); // -> or ./utils/parseBody.ts

app.use('/api/garage', garageRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction)=>{
 console.error(err.message);
 res.status(500).json({error: err.message});
})

app.listen(PORT, ()=>{
    console.log(`http://localhost:${PORT}`);
})
