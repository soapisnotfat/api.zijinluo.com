import axios from 'axios';
import { config } from 'dotenv';

config();

let query = `{
  experience{
    title,
    company,
    companyLink,
    location,
    skills,
    startDate,
    endDate,
    notes,
    featured,
    archived,
  }
}`;

describe('test education api', () => {
  test('education api response', async () => {
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
    expect(data.data.experience).toMatchObject(
      require('../personal-data/020_experience.json')
    );
  });
});
