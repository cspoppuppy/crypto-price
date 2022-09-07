const cbApi = new CBClient();

async function parallelApiCalls(currencyPairs) {
  let promises = [];
  for (let i = 0; i < currencyPairs.length; i++) {
    promises.push(cbApi.fetchPrice(currencyPairs[i], "spot"));
  }

  const data = await Promise.all(promises);
  data.forEach(({ data }) => {
    document.getElementById(`${data.base}-${data.currency}`).innerText =
      data.amount;
  });
}

const bases = ["BTC", "ETH"];
const currencies = ["GBP", "EUR", "USD"];
const currencyPairs = bases.flatMap((b) => currencies.map((c) => b + "-" + c));

parallelApiCalls(currencyPairs);
