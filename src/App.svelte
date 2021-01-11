<script lang="ts">
  import { Container, Row } from "sveltestrap";
  import SiteNav from "./SiteNav.svelte";
  import SiteStore from "../build/contracts/SiteStore.json";
  import loadWeb3 from "./utils/web3";
  import { onMount } from "svelte";
  import Router from "svelte-spa-router";
  import wrap from "svelte-spa-router/wrap";
  import UploadSite from "./UploadSite.svelte";
  import ViewSites from "./ViewSites.svelte";
import DeleteSite from "./DeleteSite.svelte";
  export let url = "";

  let web3;
  let account;
  let siteStore;
  let doneLoading = false;
  const ipfs = (window as any).IpfsHttpClient({
    host: "localhost",
    port: "5001",
    protocol: "http",
  });

  onMount(async () => {
    const instance = await loadWeb3();
    window["web3"] = web3 = instance;
    await loadBlockchainData();
    setRoutes();
    doneLoading = true;
  });

  async function loadBlockchainData() {
    const accounts = (await window.ethereum.send("eth_requestAccounts")).result;
    if (!accounts?.[0]) {
      alert("Please install and run metamask");
      return;
    }
    account = accounts[0];
    const networkId = await window.web3.eth.net.getId();
    const siteStoreData = SiteStore.networks[networkId];
    if (siteStoreData) {
      siteStore = new web3.eth.Contract(SiteStore.abi, siteStoreData.address);
    } else {
      window.alert("Simple Storage contract not deployed to detected network.");
    }
  }
  function setRoutes() {
    routes = {
      "/upload": wrap({
        component: UploadSite,
        props: {
          account,
          ipfs,
          siteStore,
        },
        conditions: [() => siteStore],
      }),
      "/view": wrap({
        component: ViewSites,
        props: {
          account,
          siteStore,
        },
        conditions: [() => siteStore],
      }),
      "/delete": wrap({
        component: DeleteSite,
        props: {
          account,
          siteStore,
        },
        conditions: [() => siteStore],
      }),
    };
  }
  let routes = {};
</script>

<style>
  .container {
    height: 100%;
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
</svelte:head>

<SiteNav bind:account />
<div class="container">
  {#if doneLoading}
    <Router {routes} />
  {:else}loading...{/if}
  <!-- <Route path="upload">
      <UploadSite {account} {ipfs} {siteStore} />
    </Route>
    <Route path="/">
      <Row>
        <h2>Welcome to Named-IPFS!</h2>
      </Row>
    </Route> -->
</div>
