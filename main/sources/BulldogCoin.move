module Sender::BulldogCoin {
    use Std::Signer;
    use Sender::BasicCoin;

    struct BulldogCoin has drop {}

    public fun setup_and_mint(account: &signer, amount: u64) {
        BasicCoin::publish_balance<BulldogCoin>(account);
        BasicCoin::mint<BulldogCoin>(Signer::address_of(account), amount);
    }

    public fun transfer(from: &signer, to: address, amount: u64) {
        BasicCoin::transfer<BulldogCoin>(from, to, amount);
    }
}
