# CoinSwap

- a Move module for decentralized exchange (like UniSwap for Ethereum)
- main features
  - create_liquidity_pool<CoinType1, CoinType2>(...)
  - swap<CoinType1, CoinType2>(...)
  - exchange rate to be determined by the constant product formula


Scenario
- User1 creates a liquidity pool for BulldogCoin/PoodleCoin with some initial liquidity
    - User1 will receive some PoolToken as shares
- User2 exchanges BulldogCoin with PoodleCoin
    - transferring BulldogCoin from User2's balance to the pool
    - transferring PoodleCoin from the pool to User2's balance
    - the exchange rate will be determined by the constant product formula based on the current liquidity state.
- User1 withdraw BulldogCoin/PoodleCoin from the liquidity pool
    - User1 will receive BulldogCoin and PoodleCoin in exchange for PoolToken


Progress so far
- made BulldogCoin, PoodleCoin and PoolToken based on BasicCoin
- made the module CoinSwap
    - `create_pool` and `swap`
- made a demo script in Move

To do (or work in progress):
- Run/test it with shuffle
- Add more features to CoinSwap
    - add_liquidity
    - withdraw_liquidity


Difficulties
- unable to write a generic `create_pool` due to the `witness` pattern used
- needs `CoinSwap`'s signatrue to create the liquidity pool, and swap
- need to trust `CoinSwap` where the liquidity pool is