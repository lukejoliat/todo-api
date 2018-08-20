import Todo from '../models/Todo';

test('reads data into properties', () => {
  const todo = new Todo({ title: 'test', status: 'incomplete' });
  expect(todo.invalid).toBe(undefined);
  expect(todo.title).toBe('test');
  expect(todo.status).toBe('incomplete');
});

test('requires title', () => {
  const todo = new Todo({ status: 'complete' });
  expect(todo.invalid).toBe(true);
});

test('requires status', () => {
  const todo = new Todo({ title: 'test' });
  expect(todo.invalid).toBe(true);
});
