import { useAccount, useConnect, useDisconnect, useReadContract, useReadContracts } from "wagmi";
import { isAddress } from "viem";
import { patentAssetAbi } from "./patentNft";
import "./App.css";

const nftEnv = import.meta.env.VITE_NFT_ADDRESS;
const nftAddr = nftEnv && isAddress(nftEnv) ? (nftEnv as `0x${string}`) : undefined;

function useNftTokens(owner: `0x${string}` | undefined) {
  const baseEnabled = Boolean(nftAddr && owner);

  const { data: balance } = useReadContract({
    address: nftAddr,
    abi: patentAssetAbi,
    functionName: "balanceOf",
    args: owner ? [owner] : undefined,
    query: { enabled: baseEnabled },
  });

  const n = balance != null ? Number(balance) : 0;

  const indexContracts =
    baseEnabled && n > 0
      ? Array.from({ length: n }, (_, i) => ({
          address: nftAddr!,
          abi: patentAssetAbi,
          functionName: "tokenOfOwnerByIndex" as const,
          args: [owner!, BigInt(i)] as const,
        }))
      : [];

  const { data: indexResults, isPending: pendingIndex } = useReadContracts({
    contracts: indexContracts,
    query: { enabled: indexContracts.length > 0 },
  });

  const tokenIds =
    indexResults
      ?.map((r) => (r.status === "success" ? (r.result as bigint) : null))
      .filter((x): x is bigint => x != null) ?? [];

  const uriContracts = tokenIds.map((id) => ({
    address: nftAddr!,
    abi: patentAssetAbi,
    functionName: "tokenURI" as const,
    args: [id] as const,
  }));

  const { data: uriResults, isPending: pendingUri } = useReadContracts({
    contracts: uriContracts,
    query: { enabled: uriContracts.length > 0 },
  });

  const rows = tokenIds.map((id, i) => ({
    id: id.toString(),
    uri: uriResults?.[i]?.status === "success" ? (uriResults[i].result as string) : null,
  }));

  return {
    balance,
    rows,
    loading: pendingIndex || pendingUri,
  };
}

export default function App() {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const { balance, rows, loading } = useNftTokens(address);

  const wrongNetwork = isConnected && chain?.id !== 11155111;

  if (!nftAddr) {
    return (
      <div className="shell">
        <header className="header">
          <h1>NeoTokens</h1>
          <p className="muted">
            Configurá <code>VITE_NFT_ADDRESS</code> en <code>.env</code> con la dirección del contrato{" "}
            <code>PatentAsset</code> desplegado en Sepolia.
          </p>
        </header>
      </div>
    );
  }

  return (
    <div className="shell">
      <header className="header">
        <h1>NeoTokens</h1>
        <p className="lead">Lectura on-chain del NFT de patente (Sepolia).</p>
      </header>

      <section className="card">
        {!isConnected ? (
          <div className="row">
            {connectors.map((c) => (
              <button
                key={c.uid}
                type="button"
                className="btn primary"
                disabled={isPending || !c.ready}
                onClick={() => connect({ connector: c })}
              >
                Conectar con {c.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="stack">
            <p className="mono">{address}</p>
            {wrongNetwork && <p className="warn">Cambiá la red de la wallet a Sepolia (chain id 11155111).</p>}
            <button type="button" className="btn ghost" onClick={() => disconnect()}>
              Desconectar
            </button>
          </div>
        )}
      </section>

      {isConnected && !wrongNetwork && (
        <section className="card">
          <h2>Tus Patent Assets</h2>
          {loading ? (
            <p className="muted">Cargando…</p>
          ) : (
            <>
              <p>
                Balance: <strong>{balance?.toString() ?? "0"}</strong>
              </p>
              {rows.length === 0 ? (
                <p className="muted">No hay tokens en esta cuenta.</p>
              ) : (
                <ul className="list">
                  {rows.map(({ id, uri }) => (
                    <li key={id}>
                      <span className="mono">#{id}</span>
                      {uri != null && (
                        <a className="link" href={uri} target="_blank" rel="noreferrer">
                          tokenURI
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </section>
      )}

      <footer className="footer muted">
        Contrato: <span className="mono">{nftAddr}</span>
      </footer>
    </div>
  );
}
