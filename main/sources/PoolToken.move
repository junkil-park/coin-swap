module Sender::PoolToken {
    use Std::Signer;
    use Sender::BasicCoin;

    struct PoolToken<phantom CoinType1, phantom CoinType2> has drop {}

    public fun setup_and_mint<CoinType1, CoinType2>(account: &signer, amount: u64) {
        BasicCoin::publish_balance<PoolToken<CoinType1, CoinType2>>(account);
        BasicCoin::mint<PoolToken<CoinType1, CoinType2>>(Signer::address_of(account), amount);
    }

    public fun transfer<CoinType1, CoinType2>(from: &signer, to: address, amount: u64) {
        BasicCoin::transfer<PoolToken<CoinType1, CoinType2>>(from, to, amount);
    }
}
