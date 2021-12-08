module Sender::CoinSwap {
    use Std::Signer;
    use Sender::BasicCoin::{Self};
    use Sender::PoolToken::{Self};

    struct LiquidityPool<phantom CoinType1, phantom CoinType2> has key {
        coin1: u64,
        coin2: u64,
        share: u64,
    }

    public fun create_pool<CoinType1: drop, CoinType2: drop>(coinswap: &signer, requester: &signer, coin1: u64, coin2: u64, share: u64) {
        // create a pool at @CoinSwap
        BasicCoin::publish_balance<CoinType1>(coinswap);
        BasicCoin::publish_balance<CoinType2>(coinswap);
        move_to(coinswap, LiquidityPool<CoinType1, CoinType2>{coin1, coin2, share});

        // transfer coin1 and coin2 from account to @CoinSwap
        BasicCoin::transfer<CoinType1>(requester, Signer::address_of(coinswap), coin1);
        BasicCoin::transfer<CoinType2>(requester, Signer::address_of(coinswap), coin2);

        // deposit PoolToken at account
        PoolToken::setup_and_mint<CoinType1, CoinType2>(requester, share);
    }

    fun getInputPrice(input_amount: u64, input_reserve: u64, output_reserve: u64): u64 {
        let input_amount_with_fee = input_amount * 997;
        let numerator = input_amount_with_fee * output_reserve;
        let denominator = (input_reserve * 1000) + input_amount_with_fee;
        numerator / denominator
    }

    public fun swap<CoinType1: drop, CoinType2: drop>(coinswap: &signer, requester: &signer, coin1: u64) acquires LiquidityPool {
        let pool = borrow_global_mut<LiquidityPool<CoinType1, CoinType2>>(Signer::address_of(coinswap));
        let coin2 = getInputPrice(coin1, pool.coin1, pool.coin2);
        pool.coin1 = pool.coin1 + coin1;
        pool.coin2 = pool.coin2 - coin2;

        BasicCoin::transfer<CoinType1>(requester, Signer::address_of(coinswap), coin1);
        BasicCoin::transfer<CoinType2>(coinswap, Signer::address_of(requester), coin2);
    }

    // public fun provide_liquidity<CoinType1, CoinType2>(account: &signer, coin1: u64, coin2: u64) {
    // }

    // public fun withdraw_from_pool<CoinType1, CoinType2>(account: &signer) {
    // }
}
