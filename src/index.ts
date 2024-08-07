import './database/connection'

import { app } from './app'
import { PORT } from './config/envConfig'

app.listen(PORT, (): any => {
    console.log(`The server is running in port ${PORT}`)
})