/// Module implementing an odd coin, where only odd number of coins can be
/// transferred each time.
module CoinSwap::BulldogCoin {
    use Std::Signer;
    use CoinSwap::BasicCoin;

    struct BulldogCoin has drop {}

    const ENOT_BULLDOG: u64 = 0;

    public fun setup_and_mint(account: &signer, amount: u64) {
        BasicCoin::publish_balance<BulldogCoin>(account);
        BasicCoin::mint<BulldogCoin>(Signer::address_of(account), amount, BulldogCoin {});
    }

    public fun transfer(from: &signer, to: address, amount: u64) {
        BasicCoin::transfer<BulldogCoin>(from, to, amount, BulldogCoin {});
    }
}

