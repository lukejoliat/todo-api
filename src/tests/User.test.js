import User from '../models/User';

test('reads data into properties', () => {
  const todo = new User({ first: 'jon', last: 'smith' });
  expect(todo.invalid).toBe(undefined);
  expect(todo.first).toBe('jon');
  expect(todo.last).toBe('smith');
});

test('requires first name', () => {
  const todo = new User({ first: 'jon' });
  expect(todo.invalid).toBe(true);
});

test('requires last name', () => {
  const todo = new User({ last: 'smith' });
  expect(todo.invalid).toBe(true);
});
