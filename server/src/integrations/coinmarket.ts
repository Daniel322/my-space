import axios from 'axios';

export class CoinMarket {
  static async getList() {
    const { data: response } = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=10&convert=USD', {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.COINMARKET_API_KEY,
      },
    });

    return response;
  }
}