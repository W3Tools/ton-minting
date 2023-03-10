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

-   ### 4.1: Compile the cell file of the contract
    ```bash
    yarn build-collection
    ```
-   ### 4.2: Deploy and initialize this contract
    ```bash
    yarn deploy-collection
    ```

## step5: How to deploy a single nft

-   ### 5.1: Compile the cell file of the contract
    ```bash
    yarn build-nft-single
    ```
-   ### 5.2: Deploy and initialize this contract
    ```bash
    yarn deploy-nft-single
    ```

## step6: How to deploy a nft via Collection

-   ### 6.1: Compile the cell file of the nft contract
    ```bash
    yarn build-nft
    ```
-   ### 6.2: Compile the cell file of the collection contract
    ```bash
    yarn build-collection
    ```
-   ### 6.3: Deploy and initialize the collection contract
    ```bash
    yarn deploy-collection
    ```
-   ### 6.4: Update `.env` to set `COLLECTION_ADDRESS` to the address you just deployed
    ```
    COLLECTION_ADDRESS="xxxxxx"
    ```
-   ### 6.4: mint nft
    ```bash
    yarn deploy-nft
    ```
