import axios from 'axios';
import { config } from 'dotenv';

config();

let query = `{
  info{
    firstName
    lastName
    preferredName
    location
    position
    pastLocations

    phone
    school_email
    personal_email
    official_email
    primary_email

    website_url
    github_url
    blog_url

    resume_download_url
    cv_download_url
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
    expect(data.data.info).toMatchObject(require('../personal-data/000_info.json'));
  });
});
