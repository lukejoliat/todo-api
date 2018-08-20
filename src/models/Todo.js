export default class Todo {
  constructor({ title, status }) {
    this.title = title;
    this.status = status;

    if (!title || !status) {
      this.invalid = true;
    }
  }
}
