# NeoTokens

Plataforma piloto para **tokenización de propiedad intelectual (patentes)** en EVM: NFT representando el activo, reparto de regalías on-chain y dapp mínima para lectura desde wallet.

## Alcance MVP (PI / patentes)

- Contrato **ERC-721** enumerable con URI por token (metadata típicamente IPFS).
- **Reparto de regalías** vía `PaymentSplitter` de OpenZeppelin (beneficiarios y shares fijas en el despliegue).
- **Red de pruebas:** Sepolia (Ethereum). El MVP es **técnico / testnet**; no promueve oferta pública de valores.

## Documentación del negocio y tokenización

- [Tokenización de patentes universitarias](TOKENIZACION_PATENTES_UNIVERSITARIAS.md)
- [Resumen ejecutivo Natural / RWA (referencia ERC-3643)](EXECUTIVE_SUMMARY_OXA.md)

## Estructura del repositorio

| Ruta | Descripción |
|------|-------------|
| [contracts/](contracts/) | Solidity + Hardhat (compilación, tests, artefactos exportables a Remix). |
| [docs/](docs/) | Modelo de token, despliegue Remix, roadmap compliance. |
| [docs/deployment/](docs/deployment/) | Runbooks Sepolia, plantilla de direcciones. |
| [apps/web/](apps/web/) | Dapp Vite + React + wagmi + RainbowKit. |
| [scripts/](scripts/) | Utilidades opcionales (p. ej. notas de flatten). |

## Inicio rápido

Si `npm install` en `contracts/` o `apps/web/` devuelve errores de extracción (`TAR_*`, `EPERM`), probá en un clon del repo en disco local (p. ej. `%USERPROFILE%\\dev\\NeoTokens`).

### Smart contracts

```bash
cd contracts
npm install
npx hardhat compile
npx hardhat test
```

Compilación con **Solidity 0.8.24** y objetivo **Cancun** (ver `hardhat.config.js`).

### Frontend

```bash
cd apps/web
npm install
cp .env.example .env
# Editar VITE_NFT_ADDRESS y opcionalmente VITE_SPLITTER_ADDRESS tras desplegar
npm run dev
```

## Licencia

MIT (código de contratos y aplicación de ejemplo).
