import {Pool} from 'pg'
import dotenv from 'dotenv'

dotenv.config();


console.log(process.env.CONNECTION_URL)

const connectionString = process.env.CONNECTION_URL;

const pool = new Pool({
  connectionString,
})

let obj= {
  query: (text:string, params?:any[]) => pool.query(text,params)
}

export default obj;