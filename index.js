const cypress = require('cypress');

const init = async () => {
  try {
    const results = await cypress.open({
      spec: './app/tests/integration/Empiricus.spec.js',
    });

    console.log(results);
  } catch (error) {
    throw new Error(error);
  }
};

init();
