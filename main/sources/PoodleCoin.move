module Sender::PoodleCoin {
    use Std::Signer;
    use Sender::BasicCoin;

    struct PoodleCoin has drop {}

    public fun setup_and_mint(account: &signer, amount: u64) {
        BasicCoin::publish_balance<PoodleCoin>(account);
        BasicCoin::mint<PoodleCoin>(Signer::address_of(account), amount);
    }

    public fun transfer(from: &signer, to: address, amount: u64) {
        BasicCoin::transfer<PoodleCoin>(from, to, amount);
    }
}
