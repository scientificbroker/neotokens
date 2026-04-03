# Modelo de token NeoTokens (MVP PI)

## Qué representa cada token on-chain

| Elemento | Significado en el piloto técnico |
|----------|----------------------------------|
| **ERC-721 `PatentAsset` (símbolo sugerido `NTPA`)** | Un **activo digital acotado** ligado a metadata (título, referencia interna, enlace IPFS). **No** constituye por sí solo titularidad registral de patente ni participación societaria jurídicamente vinculante. |
| **Metadata (`tokenURI`)** | JSON ERC-721 Metadata Schema apuntando a **IPFS** (CID fijo = mayor trazabilidad). Campos típicos: `name`, `description`, `external_url`, `attributes` (número de expediente interno, jurisdicción como texto informativo). |
| **`PatentRoyaltyVault`** | Reparto de **ETH recibido** entre beneficiarios con **shares** fijas (mismo modelo económico que el antiguo `PaymentSplitter` de OpenZeppelin). Útil para simular regalías cuando se envía ETH al vault y cada payee llama a `release`. |

## Qué queda fuera de cadena (legal y operación)

- Titularidad de la patente, licencias, contratos de confidencialidad y **cualquier oferta al público** en Perú (p. ej. supervisión **SMV**) si los instrumentos califican como valores.
- **KYC / allowlist** en esta versión: no implementados en cadena; la evolución natural es **ERC-3643 (T-REX)** o listas de transferencia controladas por el emisor.

## Extensiones futuras (sin compromiso en el MVP)

- **ERC-1155** por clases de participación (p. ej. tranches con distintos derechos económicos).
- **ERC-3643** para tokens con reglas de transferencia e identidad verificada.
- **Stablecoins:** haría falta un contrato distinto que reparta ERC-20; el vault actual cubre **ETH nativo** únicamente.

## Flujo conceptual

1. El **owner** del contrato NFT acuña un token para una wallet (testnet) con una `tokenURI` ya publicada en IPFS.
2. Los interesados envían **ETH** al **PatentRoyaltyVault** (o al flujo que defináis operativamente) para simular ingresos de regalía.
3. Cada beneficiario llama a `release()` (o `releaseAll`) para retirar su parte según shares.

Este documento es orientativo; el asesor legal del proyecto debe mapear cada flujo a instrumentos válidos en la jurisdicción aplicable.
