/// Module implementing an odd coin, where only odd number of coins can be
/// transferred each time.
module CoinSwap::PoodleCoin {
    use Std::Signer;
    use CoinSwap::BasicCoin;

    struct PoodleCoin has drop {}

    const ENOT_BULLDOG: u64 = 0;

    public fun setup_and_mint(account: &signer, amount: u64) {
        BasicCoin::publish_balance<PoodleCoin>(account);
        BasicCoin::mint<PoodleCoin>(Signer::address_of(account), amount);
    }

    public fun transfer(from: &signer, to: address, amount: u64) {
        BasicCoin::transfer<PoodleCoin>(from, to, amount);
    }
}

