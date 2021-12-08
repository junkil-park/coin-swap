module Sender::Demo {
    use Sender::BulldogCoin::{Self, BulldogCoin};
    use Sender::PoodleCoin::{Self, PoodleCoin};
    use Sender::CoinSwap;

    public(script) fun run(coinswap: signer, user1: signer, user2: signer) {
        // Setting up User1 and User2
        BulldogCoin::setup_and_mint(&user1, 1000000);
        BulldogCoin::setup_and_mint(&user2, 2000000);
        PoodleCoin::setup_and_mint(&user1, 1000000);
        PoodleCoin::setup_and_mint(&user2, 2000000);

        // Creating the Liquidity Pool for BulldogCoin and PoodleCoin
        CoinSwap::create_pool<BulldogCoin, PoodleCoin>(&coinswap, &user1, 1000, 2000, 100);

        // Swapping coins
        CoinSwap::swap<BulldogCoin, PoodleCoin>(&coinswap, &user2, 300);
    }
}
