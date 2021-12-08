#[test_only]
module Sender::NFTTests {
    use Sender::NFTStandard;
    use Std::Signer;
    use Std::UnitTest;
    use Std::Vector;
    use Std::GUID;

    fun get_account(): signer {
        Vector::pop_back(&mut UnitTest::create_signers_for_testing(1))
    }

    struct TestNFT has drop, store {}

    #[test]
    public(script) fun nft_transfer() {
        let account1 = Vector::pop_back(&mut UnitTest::create_signers_for_testing(1));
        let addr1 = Signer::address_of(&account1);
        let account2 = Vector::pop_back(&mut UnitTest::create_signers_for_testing(2));
        let addr2 = Signer::address_of(&account2);
        let content_uri = b"https://placekitten.com/200/300";

        NFTStandard::initialize<TestNFT>(&account1);
        NFTStandard::initialize<TestNFT>(&account2);
        let token = TestNFT{};
        let nft_instance = NFTStandard::create<TestNFT>(
            &account1,
            token,
            content_uri,
        );
        let nft_id = &GUID::id(NFTStandard::id(&nft_instance));
        let nft_creation_id = GUID::creation_num(NFTStandard::id(&nft_instance));

        NFTStandard::add<TestNFT>(Signer::address_of(&account1), nft_instance);
        assert!(NFTStandard::has_token<TestNFT>(addr1, nft_id), 0);

        NFTStandard::transfer<TestNFT>(account1, addr2, addr1, nft_creation_id);
        assert!(!NFTStandard::has_token<TestNFT>(addr1, nft_id), 0);
        assert!(NFTStandard::has_token<TestNFT>(addr2, nft_id), 0);
    }
}
