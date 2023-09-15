import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import useFetch from "../hooks/useFetch";
import CurrencyCard from "./CurrencyCard";
import Loader from "./Loader";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

interface FetchData {
  market_caps: number[];
  prices: number[];
  total_volumes: number[];
}

interface ChartDataset {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    fill: boolean;
  }[];
}

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const currencyList = [
  { crypto: "bitcoin", label: "Bitcoin" },
  { crypto: "ethereum", label: "Ethereum" },
  { crypto: "binancecoin", label: "Binance Coin" },
  { crypto: "tether", label: "Tether" },
];

const Chart = () => {
  const [bitcoinData, setBitcoinData] = useState<ChartDataset>({
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        borderColor: "",
        fill: false,
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [currentCurrency, setCurrentCurrency] = useState<string>("bitcoin");

  const { data } = useFetch<FetchData>({
    url: `coins/${currentCurrency}/market_chart?vs_currency=usd&days=7`,
  });

  const pricesData = data?.prices;

  useEffect(() => {
    if (!pricesData) return;

    const bitcoinPrices: number[] = pricesData.map((entry: any) => entry[1]);
    const chartData = {
      labels: daysOfWeek,
      datasets: [
        {
          label: `${currentCurrency} Price (USD)`,
          data: bitcoinPrices,
          borderColor: "rgb(75, 192, 192)",
          fill: false,
        },
      ],
    };

    setBitcoinData(chartData);
    setLoading(false);
  }, [pricesData, currentCurrency]);

  const chartOptions: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: {
          display: true,
          text: " Day of Week",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price",
        },
      },
    },
  };

  const handleCurrencyChange = (crypto: string) => {
    setCurrentCurrency(crypto);
  };

  return (
    <div>
      <div className="grid gap-5 grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
        {currencyList.map((currency) => (
          <CurrencyCard
            key={currency.crypto}
            crypto={currency.crypto}
            isActive={currentCurrency === currency.crypto}
            onChange={() => handleCurrencyChange(currency.crypto)}
          />
        ))}
      </div>
      <div>
        {loading ? (
          <Loader />
        ) : (
          <Line data={bitcoinData} options={chartOptions} className="h-80" />
        )}
      </div>
    </div>
  );
};

export default Chart;
