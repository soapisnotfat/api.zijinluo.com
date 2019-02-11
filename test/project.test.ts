import axios from 'axios';
import { config } from 'dotenv';

config();

let query = `{
  project{
    title,
    notes,
    date,
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
    expect(data.data.project).toMatchObject(require('../personal-data/050_project.json'));
  });
});
