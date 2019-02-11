import axios from 'axios';
import { config } from 'dotenv';
import * as jwt from 'jsonwebtoken';

config();

let query = `{
  education{
    name,
    study,
    startDate,
    endDate,
    isCurrent,
    notes,
    featured,
    archived,
  }
}`;

const token: String = jwt.sign(
  { time: new Date().getTime() },
  process.env.PRODUCTION_TOKEN,
  { algorithm: 'HS256' }
);

async function temp() {
  const res = await axios.post(
    'http://localhost:3333/pd',
    { query: query },
    {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  );

  const { status, data } = res;
  console.log(data);
}

temp();
