import React, { createContext, useCallback, useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useQuery } from "react-query";
import { GetAllAsset, Ticker } from "../components/http/api";
export const Hooks = createContext();
function ListCrypto(props) {
  const [Data, setData] = useState([]);
  const [Tag, setTag] = useState("empty");
  const [SearchInput, setSearchInput] = useState("empty");
  const webSocketUrl = "wss://stream.binance.com:9443/ws/!ticker@arr";
  const { lastMessage } = useWebSocket(webSocketUrl);
  //fetching data
  const { isLoading, isError, data, error, refetch } = useQuery(
    "getAllAsset",
    async (e) => GetAllAsset(),
    {
      // refetchInterval: 2000,
    }
  );
  const {
    isLoading: loadTicker,
    isError: isErrorTicker,
    data: dataTicker,
    error: errorTicker,
    refetch: refetchTicker,
  } = useQuery("getTicker", async (e) => Ticker(), {
    // refetchInterval: 2000,
  });
  const callbackz = useCallback(() => {
    const datax = data?.data
      .map((x) => {
        // eslint-disable-next-line array-callback-return
        const webSocketData = JSON.parse(lastMessage?.data);
        const ticker = dataTicker?.filter(
          (z) => z.symbol === `${x.assetCode}USDT`
        )[0];
        const filtered = webSocketData?.filter((u) => u.s === ticker?.symbol);
        const checkPoint = filtered.length !== 0 ? true : false;
        return {
          id: x.id,
          Coin: x.assetCode,
          Logo: x.logoUrl,
          Tag: x.tags,
          LastPrice: checkPoint
            ? parseFloat(filtered[0].c).toFixed(2)
            : parseFloat(ticker?.lastPrice).toFixed(2) || "0",
          hrChange: checkPoint
            ? parseFloat(filtered[0].P).toFixed(2)
            : parseFloat(ticker?.priceChangePercent).toFixed(2) || "0",
          MarketCap: checkPoint
            ? parseFloat(filtered[0].v)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : parseFloat(ticker?.volume)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0",
          statLastPrice:
            checkPoint &&
            (filtered[0].c < ticker?.lastPrice || 0
              ? "down"
              : filtered[0].c > ticker?.lastPrice || 0
              ? "up"
              : "none"),
          statPercent:
            checkPoint &&
            (filtered[0].P < ticker?.priceChangePercent || 0
              ? "down"
              : filtered[0].P > ticker?.priceChangePercent || 0
              ? "up"
              : "none"),
          Tags: x.tags.join(),
          Action: "adadeh",
        };
      })
      .filter((z) => z.LastPrice !== "NaN")
      .sort((a, b) => {
        if (a.Coin < b.Coin) {
          return -1;
        }
        if (a.Coin > b.Coin) {
          return 1;
        }
        return 0;
      });

    if (Tag === "empty") {
      return datax;
    } else {
      return datax?.filter((val) => val.Tag?.includes(Tag));
    }
  }, [lastMessage, Tag]);
  let result;

  //feching data
  useEffect(() => {
    if (lastMessage) {
      result = callbackz();
      setData(result);
    }
  }, [lastMessage]);
  const valx = {
    Data,
    setData,
    Tag,
    setTag,
    SearchInput,
    setSearchInput,
  };
  return <Hooks.Provider value={valx}>{props.children}</Hooks.Provider>;
}

export default ListCrypto;
