import "../styles/globals.css";
import { config } from "../provider/wagmiConfigs";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { QueryClientProvider, QueryClient, Query } from "@tanstack/react-query";
import { Web3Provider } from "../context/Web3Provider";
import { ToastProvider } from "../context/ToastContext";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: "D345EF",
            accentColorForeground: "white",
            borderRadius: "small",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          <ToastProvider>
            <Web3Provider>
              <Component {...pageProps} />
            </Web3Provider>
          </ToastProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
