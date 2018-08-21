import request from 'supertest';
import app from '../app';

test('should get all todos', () => request(app)
  .get('/todos')
  .then((response) => {
    expect(response.statusCode).toBe(200);
  }));

test('should create todo', () => request(app)
  .post('/todos/create')
  .send({ title: 'test', complete: false })
  .then((response) => {
    expect(response.statusCode).toBe(200);
  }));
