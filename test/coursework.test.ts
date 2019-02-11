import axios from 'axios';
import { config } from 'dotenv';

config();

let query = `{
  coursework{
    name,
    items,
  }
}`;

describe('test coursework api', () => {
  test('coursework api response', async () => {
    const res = await axios.post(
      `http://localhost:${process.env.PORT}/pd`,
      { query: query },
      {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authentication: process.env.PRODUCTION_TOKEN
        }
      }
    );

    const { status, data } = res;

    expect(status).toBe(200);
    expect(data.data.coursework).toMatchObject(
      require('../personal-data/011_coursework.json')
    );
  });
});
