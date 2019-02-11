import axios from 'axios';
import { config } from 'dotenv';

config();

let query = `{
  award{
    title,
    awardedBy,
    notes,
    date,
    featured,
    archived,
  }
}`;

describe('test award api', () => {
  test('award api response', async () => {
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
    expect(data.data.award).toMatchObject(require('../personal_data/040_award.json'));
  });
});
