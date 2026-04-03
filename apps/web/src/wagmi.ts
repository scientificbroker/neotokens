import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

export const config = createConfig({
  chains: [sepolia],
  connectors: [
    injected(),
    ...(projectId ? [walletConnect({ projectId, showQrModal: true })] : []),
  ],
  transports: {
    [sepolia.id]: http(import.meta.env.VITE_RPC_URL || "https://rpc.sepolia.org"),
  },
});
