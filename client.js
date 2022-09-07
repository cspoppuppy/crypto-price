const host = "https://api.coinbase.com/v2";

class CBClient {
  async fetchPrice(currencyPair, priceType = "spot") {
    const url = `${host}/prices/${currencyPair}/${priceType}`;
    return this.fetchData(url);
  }

  async fetchData(url) {
    const response = await fetch(url);
    return response.json();
  }
}
