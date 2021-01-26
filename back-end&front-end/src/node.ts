import { Main } from './main';

export default class Library extends Main {
  constructor() {
    super(require('node-fetch'));
  }
}
