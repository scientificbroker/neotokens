# Scripts

- **Flatten para Remix:** desde `contracts/`, tras `npm install`:

  ```bash
  npx hardhat flatten contracts/PatentAsset.sol > ../../flattened/PatentAsset.flat.sol
  ```

  Copia el archivo resultante a Remix, ajusta el SPDX si hay duplicados, y compila con la misma versión de Solidity (`0.8.20`) y optimizador acorde a `hardhat.config.js`.

- Las dependencias `@openzeppelin/contracts` deben resolverse en Remix vía **GitHub imports** o pegando el flatten completo (incluye OZ).
