import axios from 'axios';
import { config } from 'dotenv';

config();

describe('test app connectivity', () => {
  test('should pass connectivity tests', async () => {
    const res = await axios.post(
      `http://localhost:${process.env.PORT}/`,
      { query: `{data}` },
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
    expect(data.data.data).toBe('hello world');
  });
});
