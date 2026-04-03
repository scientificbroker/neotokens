# Despliegue en Remix (Sepolia)

Guía para desplegar los contratos MVP cuando preferís **Remix IDE** en lugar de Hardhat. La red recomendada de pruebas es **Sepolia**.

## Prerrequisitos

- Navegador con **MetaMask** (u otro wallet compatible).
- Cuenta con **ETH de Sepolia** (faucet público).
- Misma versión de compilador que el proyecto: **Solidity 0.8.24** (requerida por OpenZeppelin Contracts 5.6+).
- Activar **optimizer** en Remix con **runs** `200` (alineado con `hardhat.config.js` del repo).
- **EVM:** objetivo **Cancun** (OpenZeppelin 5.6 usa opcodes como `mcopy` en dependencias internas).

## Obtener un único archivo para Remix (flatten)

Desde la carpeta `contracts/` del repositorio:

```bash
npm install
npx hardhat flatten contracts/PatentAsset.sol > PatentAsset.flat.sol
npx hardhat flatten contracts/PatentRoyaltyVault.sol > PatentRoyaltyVault.flat.sol
```

> En el flatten pueden aparecer varias líneas `SPDX`; Remix suele exigir **una** licencia por archivo: editá el `.flat.sol` dejando un único `// SPDX-License-Identifier: MIT` al inicio y eliminá el resto.

Alternativa: en Remix, **GitHub imports** en el contrato:

```solidity
import "@openzeppelin/contracts/...";
```

(configurando el compilador y permisos de importación según la documentación de Remix).

## Orden de despliegue en Sepolia

1. **PatentRoyaltyVault**  
   - Constructor: `payees` (addresses) y `shares` (mismo largo; enteros > 0).  
   - Ejemplo tres partes iguales: shares `[1, 1, 1]` o `[33, 33, 34]` según precisión deseada.

2. **PatentAsset**  
   - Constructor: `initialOwner` — dirección que podrá acuñar, pausar y despausar (normalmente la misma que despliega o una multisig de pruebas).

## Constructor `PatentAsset`

```text
initialOwner: 0x...  // tu address (control del contrato)
```

No pasáis la URI en el constructor; cada mint usa `safeMint(to, uri)` con la URI IPFS del token.

## Constructor `PatentRoyaltyVault`

```text
payees:  [0xBeneficiary1, 0xBeneficiary2, ...]
shares:  [uint256, uint256, ...]  // mismos length; suma > 0 cada uno
```

## Verificación en el explorador

1. En Remix, pestaña **Deploy & run transactions** → despliegue exitoso → copiar **address**.
2. Usar el explorador Sepolia (Etherscan) → **Verify and Publish** → pegar código (flatten) o standard JSON si el explorador lo acepta.
3. Anotar direcciones y ABIs en [addresses.md](addresses.md).

## Checklist pre-mainnet (cuando apliqué)

- [ ] Auditoría o al menos revisiones estáticas (Slither, etc.).
- [ ] Política de **pausa** y **ownership** (multisig).
- [ ] Metadata e IPFS con gobernanza clara (inmutabilidad vs actualización).
- [ ] Asesoría **legal y regulatoria** (p. ej. SMV en Perú si la estructura es oferta de valores).
- [ ] Sin datos personales sensibles en metadata on-chain.

## Limitaciones

- Remix es excelente para **despliegues puntuales**; el **CI y tests** del repo usan Hardhat.
- Contratos con muchas dependencias: preferí **flatten** o flujo Hardhat + copia de bytecode/ABI a Remix solo si es imprescindible.
