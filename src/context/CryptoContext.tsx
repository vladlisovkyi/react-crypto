import React, {
  createContext,
  useState,
  useEffect,
  useMemo,
  useContext,
} from "react";
import axios from "axios";
import { Cryptocurrency } from "../types/crypto";
import useFetch from "../hooks/useFetch";
// Import your useFetch hook here

// Create a context
interface CryptoContextType {
  cryptoData: Cryptocurrency[];
  initialCryptoData: Cryptocurrency[] | null;
  setCryptoData: React.Dispatch<React.SetStateAction<Cryptocurrency[]>>;
  isLoading: boolean;
  error: Error | null;
}

const CryptoContext = createContext<CryptoContextType | undefined>(undefined);

// Custom hook to access the CryptoContext
export const useCryptoContext = () => {
  const context = useContext(CryptoContext);
  if (!context) {
    throw new Error("useCryptoContext must be used within a CryptoProvider");
  }
  return context;
};

const CryptoProvider = ({ children }: { children: React.ReactNode }) => {
  // Use the useFetch hook to fetch data and set it as the initial value
  const {
    data: initialCryptoData,
    isLoading,
    error,
  } = useFetch<Cryptocurrency[]>({
    url: "coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30",
  });

  useEffect(() => {
    if (initialCryptoData) {
      setCryptoData(initialCryptoData);
    }
  }, [initialCryptoData]);

  // Use the initialCryptoData as the initial state
  const [cryptoData, setCryptoData] = useState<Cryptocurrency[]>(
    initialCryptoData || []
  );
  const contextValue = useMemo(() => {
    return {
      cryptoData,
      initialCryptoData,
      setCryptoData,
      isLoading,
      error,
    };
  }, [cryptoData, setCryptoData, initialCryptoData, isLoading, error]);

  return (
    <CryptoContext.Provider value={contextValue}>
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoProvider;
