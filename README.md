# ton-minting

## step1: clone code

```bash
git clone https://github.com/W3Tools/ton-minting.git && cd ton-minting
```

## step2: create an output directory for FunC build

```bash
yarn install && mkdir output
```

## step3: Edit your environment `.env` file. Copy their variable names from `.env.example`

```bash
cp .env.example .env && vi .env
```

## step4: How to deploy a collection

-   ### 3.1: Compile the cell file of the contract
    ```bash
    yarn build-collection
    ```
-   ### 3.2: Deploy and initialize this contract
    ```bash
    yarn deploy-collection
    ```
