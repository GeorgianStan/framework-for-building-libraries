import { Main } from './main';

export default class Library extends Main {
  constructor() {
    super(window.fetch.bind(window));
  }
}
