export const GetAllAsset = async () => {
  const res = await fetch(
    `https://www.binance.com/bapi/asset/v2/public/asset/asset/get-all-asset`
  );
  return res.json();
};

export const Ticker = async () => {
  const res = await fetch(`https://api.binance.com/api/v3/ticker/24hr`);
  return res.json();
};
