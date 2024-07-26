# Tezos Connect

## Overview
Tezos Connect is a library designed to standardize the JSON RPC 
interface between decentralized
applications (dApps) and wallets on the Tezos blockchain. This
library contains all necessary interface definitions and utility
functions to help developers build dApps and wallets with a well-defined,
standard interface. It assists in creating JSON RPC messages in the
correct format and validates received JSON RPC requests for syntactic
correctness.
This libabry should be used with WalletConnect, an open source protocol
that allows you to connect your crypto wallet to dapps on the web.

## Features
- Standardized JSON RPC interface definitions for Tezos dApps and wallets.
- Utility functions to create and validate JSON RPC messages.

## Installation

### Using npm
```sh
yarn install tezos-connect
```

### Using yarn
```sh
yarn add tezos-connect
```

## Usage
### Importing the Library example
```ts
import { PartialTezosOperation } from '@trilitech/tezos-connect';
```

## Development
### Cloning the Repository
```sh
git clone https://github.com/Trilitech/tezos-connect.git
cd tezos-connect
```

### Installing Dependencies
```
yarn install
```

### Building the Library
```
yarn build
```
### Running Tests
```
yarn test
yarn type-test
```

## Contributing
We welcome contributions to the Tezos Connect library! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Create a new Pull Request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For any questions or suggestions, please open an issue or submit a pull request.

---

Happy coding with Tezos!
