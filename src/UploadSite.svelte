<script lang="ts">
  import { prevent_default } from "svelte/internal";
  import { Form, FormGroup, Input, Label } from "sveltestrap";
  let files;
  let name: string;
  export let ipfsCID;
  export let ipfs, siteStore, account;

  async function uploadToIpfs() {
    const file = files[0];
    const fileDetails = {
      path: file.name,
      content: file,
    };
    const options = {
      wrapWithDirectory: false,
      progress: (prog) => console.log(`received: ${prog}`),
    };

    const added = await ipfs.add(fileDetails, options);
    console.log(added);
    ipfsCID = added.cid.string;
  }

  async function addToSiteStore() {
    console.log(siteStore);
    await siteStore.methods.addSiteToDNS(name, ipfsCID).send({ from: account });
  }

  async function upload() {
    await uploadToIpfs();
    await addToSiteStore();
  }
</script>

<Form
  on:submit={(e) => {
    e.preventDefault();
    upload();
  }}>
  <h2>Upload a file</h2>
  <FormGroup>
    <Label for="#fileinp">
      Please select the file that you would like to upload
    </Label>
    <Input id="fileinp" type="file" bind:files />
  </FormGroup>
  <FormGroup>
    <Label for="#nameinp">
      Please select the name which you would like the file to be bound to
    </Label>
    <Input type="text" id="nameinp" bind:value={name} />
  </FormGroup>
  <FormGroup>
    <Input class="primary" type="submit" value="Submit" />
  </FormGroup>
</Form>
