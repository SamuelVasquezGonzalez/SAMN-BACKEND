import express, { Request, Response} from 'express'
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import SuperAdminRoutes from './routes/SuperAdmin.routes'

export const app = express()

app.get("/", (req: Request, res: Response) => {
    res.json({
        name: "SAMN Backend",
        access: "private",
        version: "1.0.0",
        status: "ok"
    })
})


const corsOptions: CorsOptions = {
    origin: ["http://localhost:7153", "http://localhost:7154"],
    optionsSuccessStatus: 200
}


app.use(cors(corsOptions))
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(SuperAdminRoutes)

app.all("*", (req: Request, res: Response) => {
    res.status(404).json({ message: "This path doesn't exist" });
});