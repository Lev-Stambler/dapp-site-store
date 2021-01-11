<script lang="ts">
  import { Form, FormGroup, Input, Label } from "sveltestrap";
  let name: string;
  let urlProm: Promise<string>;
  export let siteStore, account;

  async function getCID() {
    return await siteStore.methods.ipfsDNS(name).call();
  }

  function getUrlFromCID(cid: string) {
    return `https://ipfs.io/ipfs/${cid}`;
  }

  async function loadSite() {
    const cid = await getCID();

    if (!cid) {
      throw "404: site not found";
    }
    let url = getUrlFromCID(cid);
    return url;
  }
</script>

<style>
  iframe {
    width: 100%;
    height: 100%;
    border: 1px black solid;
  }
</style>

<Form
  on:submit={(e) => {
    e.preventDefault();
    urlProm = loadSite();
  }}>
  <FormGroup>
    <Label for="#nameinp">Where would you like to navigate to?</Label>
    <Input type="text" id="nameinp" bind:value={name} />
  </FormGroup>
  <FormGroup>
    <Input class="primary" type="submit" value="Submit" />
  </FormGroup>
</Form>
{#if urlProm}
  {#await urlProm}
    loading...
  {:then url}
    <iframe src={url} frameborder="0" />
  {:catch err}
    {err}
  {/await}
{/if}
