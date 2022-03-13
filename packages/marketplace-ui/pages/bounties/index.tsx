
import { BountyCard } from "@/components/bounties/BountyCard";
import { BountyList } from "@/components/bounties/BountyList";
import { MintSelectModal } from "@/components/bounties/MintSelectModal";
import { FormControl } from "@chakra-ui/react";
import { route, routes } from "@/utils/routes";
import { Swap, useTokenRefFromBonding } from "@strata-foundation/react";
import { PublicKey } from "@solana/web3.js";
import { Token, TOKEN_PROGRAM_ID as TPID } from "@solana/spl-token";

import {Fanout, FanoutClient, FanoutMembershipVoucher, FanoutMint, MembershipModel} from "@glasseaters/hydra-sdk";

import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Select, Spinner, Stack, Text, VStack
} from "@chakra-ui/react";
import { useTokenBondingFromMint } from "@strata-foundation/react";
import {
  useErrorHandler,
  usePublicKey,
  useQueryString
} from "@strata-foundation/react";
import { useBounties } from "@/hooks/useBounties";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import {  Connection } from '@solana/web3.js'
import { useAnchorWallet } from "@solana/wallet-adapter-react";
const PAGE_SIZE = 20;
export const Bounties: NextPage = () => {
 const mintPublicKey = new PublicKey("DLbjx3D65yP7yy4eKSfMFzUgvTfKB9ApTXYunA2NUMtF")
 const mintPublicKey2 = new PublicKey("BAjRRdbhNWwc1SWWHNHGLGtqS1kDct78qz9oGqGcL6H9")
 
  const connection2 = new Connection('https://solana--mainnet.datahub.figment.io/apikey/24c64e276fc5db6ff73da2f59bac40f2', "confirmed");
  const wallet = useAnchorWallet()
  const [shares, setShares] = useState("1.38");

  async function claim(){
    if (wallet){    let fanoutSdk: FanoutClient;
      fanoutSdk = new FanoutClient(
        connection2,
        // @ts-ignore
        wallet
    );
    const fanout = new PublicKey("2DdevS3SFCsuUBAjnhi4krz1GSvDenZfMETaHqWFWUn9")
   
    const account = await connection2.getTokenAccountsByOwner(fanout, {
      mint: mintPublicKey});
      console.log(account.value[0].pubkey);
    const fromTokenAccount = account.value[0].pubkey
  let ix = await fanoutSdk.distributeTokenMemberInstructions(
    {
      
      distributeForMint: true,
      fanout: fanout,
      membershipMint: mintPublicKey,
     // @ts-ignore
      member: wallet.publicKey,
      // @ts-ignore
      payer: wallet.publicKey

    }
  );
 let  tx2 = await fanoutSdk.sendInstructions(
    ix.instructions,
    [],
    wallet.publicKey
  );
    }
  }
  async function claim2(){
  if (wallet){    let fanoutSdk: FanoutClient;
    fanoutSdk = new FanoutClient(
      connection2,
      // @ts-ignore
      wallet
  );

  const account = await connection2.getTokenAccountsByOwner(wallet.publicKey, {
    mint: mintPublicKey2});
    console.log(account.value[0].pubkey);
  const fromTokenAccount = account.value[0].pubkey
  const fanout = new PublicKey("2DdevS3SFCsuUBAjnhi4krz1GSvDenZfMETaHqWFWUn9")
  let ix = await fanoutSdk.distributeTokenMemberInstructions(
    {
        distributeForMint: true,
        fanout: fanout,
        fanoutMint: mintPublicKey2,
        membershipMint: mintPublicKey,
       // @ts-ignore
        member: wallet.publicKey,
        // @ts-ignore
        payer: wallet.publicKey

    }
);
let tx2 = await fanoutSdk.sendInstructions(
    ix.instructions,
    [],
    wallet.publicKey
);
  }
}
  async function doit(){

  if (wallet){

    const account = await connection2.getTokenAccountsByOwner(wallet.publicKey, {
      mint: mintPublicKey});
      console.log(account.value[0].pubkey.toString());
    const fromTokenAccount = account.value[0].pubkey
    let fanoutSdk: FanoutClient;
    fanoutSdk = new FanoutClient(
      connection2,
      // @ts-ignore
      wallet
  );
  const fanout = new PublicKey("2DdevS3SFCsuUBAjnhi4krz1GSvDenZfMETaHqWFWUn9")
  console.log( (parseFloat(shares) * 10 ** 9))
let  ixs = await fanoutSdk.stakeTokenMemberInstructions(
        {
            
            shares:  (parseFloat(shares) * 10 ** 9),
            fanout: fanout,
            membershipMintTokenAccount: fromTokenAccount,
            membershipMint: mintPublicKey,
           // @ts-ignore
            member: wallet.publicKey,
            // @ts-ignore
            payer: wallet.publicKey
        }
    );const tx = await fanoutSdk.sendInstructions(
      ixs.instructions,
      [],
      // @ts-ignore
      wallet.publicKey
  );

}
  }

  async function us(){

    if (wallet){
      let fanoutSdk: FanoutClient;
      fanoutSdk = new FanoutClient(
        connection2,
        // @ts-ignore
        wallet
    );
    const fanout = new PublicKey("2DdevS3SFCsuUBAjnhi4krz1GSvDenZfMETaHqWFWUn9")
    
    await fanoutSdk.unstakeTokenMember({
      fanout: fanout,
      // @ts-ignore
      member: wallet.publicKey,
      // @ts-ignore
      payer: wallet.publicKey
  }
  );
    }

  }
  const [mint, setMint] = useQueryString("mint", "");
  const [search, setSearch] = useQueryString("search", "");
  const [sort, setSort] = useQueryString("sort", "newest");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const fetchMore = () => setLimit((limit) => limit + PAGE_SIZE);
  const router = useRouter();
  
  const baseMint = usePublicKey(mint);
  const { result: bounties, error, loading } = useBounties({
    baseMint,
    search,
    sortType: sort.includes("contribution") ? "CONTRIBUTION" : "GO_LIVE",
    sortDirection: sort.includes("asc") ? "ASC" : "DESC",
    limit
  });
   const { handleErrors } = useErrorHandler();
  handleErrors(error);
async function onChange(e: any){
  e.preventDefault()
  console.log(e.target.value)
  setShares(e.target.value)
}
  return (
    <Box
    w="full"
    backgroundColor="#f9f9f9"
    minHeight="100vh"
    paddingBottom="200px"
  >
    <Head>
    <title>FAIR</title>
      <meta name="description" content="Altogether not something @redacted_j would recommend to anyone under any circumstance."     />  
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="og:type" content="website" />
      <meta
        name="description"
        content="Altogether not something @redacted_j would recommend to anyone, under any circumstance."
      />
      <meta property="og:title" content="FAIR Game" />
      {/* <meta property="og:image" content={} /> */}
      {/* <meta property="og:description" content={description} /> */}
      <link rel="icon" href="/favicon.ico" />
    </Head>
   
    <Center padding="54px" backgroundColor="black.500">
      <VStack spacing={6}>
        <Box padding="54px" backgroundColor="black.500" />

   
    <Container mt="-72px" justify="stretch" maxW="460px">
      <Heading mb={2} color="white" fontSize="24px" fontWeight={600}>
        Swap
      </Heading>
      <Box zIndex={1} bg="white" shadow="xl" rounded="lg" minH="400px">
        {loading && (
          <Center>
            <Spinner />
          </Center>
        )}
        {!loading  && (
          <div><h2>Hi! There are high fees to buy and sell the FAIR token</h2><div>
          This incentivizes people to hold, believe it or not. Search &apos;proof of weak hands.&apos;
          </div>
          <div>
            Great! You&apos;ve done your DYOR! Also, @STACCArt.
          </div>
          
          <div>Anywho, all of the royalties for this token go to a Hydra. At any time, perss the below button to see how much revenues you get ;)</div>
          <div>What this means is that the 40% cumulative fees from buy/sell are given to the hodlers of this token that have staked their supply!</div>
          
          <div>Click below to stake :) or claim!</div>
          <FormControl 
            
            > 
            Shares:
            <Input type="text" onInput={onChange} value={shares} />
            <Button type="submit" onClick={doit} >Stake</Button>
            <Button type="submit" onClick={us} >Unstake All</Button>
            <Button type="submit" onClick={claim} >CLAIM1</Button>
            <Button type="submit" onClick={claim2} >CLAIM2</Button>

            </FormControl>
          <div>if there are 1000 tokens in supply, and only 100 are staked, then only those 100 qualify for payouts. Those paid would earn 10x what they would if all 1000 were staked.</div>
          <h1>WIP</h1>
          <div>Hey we are now entangled :) nice</div>
         
        <div style={{ width: "400px" }}>
          {
          // @ts-ignore
          !loading && <Swap tokenBondingKey={new PublicKey("7ejJj8PYZLbSxCvdZcSSC5TFBeHg3WNfmZjbB3FL1nPd")} /> }
        </div>
    </div>  
      
        )}
      </Box>  
    </Container>
       
      </VStack>
    </Center>
   
  </Box>
  );
};

export default Bounties;

/*

*/