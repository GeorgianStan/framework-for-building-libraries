import * as express from 'express';
import { isPrimeNumber } from './is-prime';

const app = express();
console.log(process.argv);
console.log(process.env.APPDATA);

app.get('/', (req, res) => {
  enum Test {
    NAME = 0,
  }

  console.log(isPrimeNumber(5));

  res.status(200).json(Test);
});

app.listen(3000, () => {
  console.log('app up at 3000');
});
