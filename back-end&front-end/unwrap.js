const fs = require('fs');
const { join } = require('path');

const TARGET = './dist';

fs.readdirSync(TARGET).forEach((file) => {
  const entry = join(TARGET, file);
  const output = join(__dirname, file);

  if (fs.existsSync(output)) {
    throw new Error(
      `Can't unwrap dist. File already ${file} exists in root folder.`,
    );
  } else {
    fs.copyFileSync(entry, output);
  }
});
