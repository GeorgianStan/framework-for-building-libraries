export class Main {
  #fetch: any;

  constructor(fetch: any) {
    this.#fetch = fetch;
  }

  async getData() {
    const res = await this.#fetch('https://google.com');
    return res.json();
  }
}
