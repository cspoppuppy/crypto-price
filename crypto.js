const bases = ["BTC", "ETH", "USDT", "USDC", "BUSD"];
const currencies = ["GBP", "EUR", "USD", "CNH"];
const currencyPairs = bases.flatMap((b) => currencies.map((c) => b + "-" + c));

const cbApi = new CBClient();

function getText(r, c) {
  if (r == -1 && c == -1) {
    return "";
  } else if (r == -1) {
    return currencies[c];
  } else if (c == -1) {
    return bases[r];
  } else {
    return "";
  }
}

function buildTable() {
  const table = document.getElementById("spot-price");

  for (var r = -1; r < bases.length; r++) {
    var row = table.insertRow(r + 1);

    for (var c = -1; c < currencies.length; c++) {
      var newCell = row.insertCell(c + 1);
      if (r == -1 || c == -1) {
        newCell.innerHTML = getText(r, c);
      } else {
        newCell.setAttribute("id", `${bases[r]}-${currencies[c]}`);
      }
    }
  }
}

async function parallelApiCalls(currencyPairs) {
  let promises = [];
  for (var i = 0; i < currencyPairs.length; i++) {
    promises.push(cbApi.fetchPrice(currencyPairs[i], "spot"));
  }

  const data = await Promise.all(promises);
  data.forEach(({ data }) => {
    document.getElementById(`${data.base}-${data.currency}`).innerText =
      parseFloat(data.amount).toFixed(2);
  });

  // not working
  // setTimeout(parallelApiCalls(currencyPairs), 1000);
}

buildTable();
parallelApiCalls(currencyPairs);
