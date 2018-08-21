export default class Todo {
  constructor({ title, complete }) {
    this.title = `${title}`;
    this.complete = complete;

    if (typeof title === 'undefined' || typeof this.complete === 'undefined') {
      this.invalid = true;
    }
  }
}
