import Todo from '../models/Todo';

test('reads data into properties', () => {
  const todo = new Todo({ title: 'test', complete: false });
  expect(todo.invalid).toBe(undefined);
  expect(todo.title).toBe('test');
  expect(todo.complete).toBe(false);
});

test('requires title', () => {
  const todo = new Todo({ complete: false });
  expect(todo.invalid).toBe(true);
});

test('requires status', () => {
  const todo = new Todo({ title: 'test' });
  expect(todo.invalid).toBe(true);
});
