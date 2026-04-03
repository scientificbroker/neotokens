# Contratos NeoTokens

- **PatentAsset.sol** — ERC-721 enumerable, URI por token, pausa (ERC-721 Pausable), mint solo owner.
- **PatentRoyaltyVault.sol** — reparto de ETH con shares (patrón PaymentSplitter); OpenZeppelin 5.6 ya no incluye `PaymentSplitter` en el paquete.

Compilador **0.8.24**, **EVM Cancun** (requerido por dependencias OZ actuales). Si `npm install` falla en una unidad sincronizada (p. ej. Google Drive), ejecutá los comandos desde una carpeta local.
