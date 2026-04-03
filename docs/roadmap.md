# Roadmap NeoTokens

## Fase actual (MVP técnico — PI)

- **PatentAsset (ERC-721):** representación on-chain con `tokenURI` (idealmente IPFS); enumerable para listar tokens por titular.
- **PatentRoyaltyVault:** reparto de ETH nativo entre beneficiarios con shares fijas (modelo inspirado en PaymentSplitter).
- **Dapp:** conexión de wallet y lectura de balance / `tokenURI` en **Sepolia**.
- **Documentación:** despliegue Remix + Hardhat para compilación y tests.

Este MVP sirve para **piloto / educación / integración** y **no** sustituye asesoría legal ni autorizaciones regulatorias.

## Fase siguiente (producto)

- **Metadatos:** política de IPFS pinning, esquema de atributos alineado a expedientes internos (sin datos personales sensibles on-chain).
- **Acceso:** allowlist o pausa coordinada con política de transferencias según acuerdos privados.
- **Regalías en stablecoin:** contrato adicional o flujo custodiado off-chain con prueba periódica on-chain (según diseño legal).

## Fase compliance (oferta regulada — referencia documentos del repo)

Cuando la estructura se acerque a **valores** o inversión masiva (p. ej. **SMV** en Perú, según vuestros documentos):

- **ERC-3643 (T-REX / Tokeny):** identidades, claims y restricciones de transferencia entre inversores verificados.
- **Integración KYC** que alimente claims on-chain o listas mantenidas por el emisor (según arquitectura elegida).
- **Auditoría** formal de contratos y **proceso de prospecto** fuera del alcance de este repositorio.

## Línea RWA (inmobiliario / Natural)

El archivo [EXECUTIVE_SUMMARY_OXA.md](../EXECUTIVE_SUMMARY_OXA.md) describe un arquetipo **NTL** con ERC-3643, distribución de ingresos y marketplace. Esa línea puede convivir como **módulo futuro** (otros contratos y misma dapp con selectores de campaña), pero queda fuera del MVP PI actual.

## Criterio de hecho por fase

| Fase | Criterio |
|------|----------|
| MVP PI | Contratos desplegados en testnet + dapp lee balances + documentación de despliegue |
| Producto | Flujo de metadata estable + criterios de riesgo / operación documentados |
| Compliance | Decisión legal cerrada + T-REX (o equivalente) integrado y auditado |
