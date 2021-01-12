<script lang="ts">
  import { Form, FormGroup, Input, Label } from "sveltestrap";
  let files;
  let name: string;
  export let ipfsCID;
  export let ipfs, siteStore, account;

  async function uploadToIpfs() {
    const file = files[0];
    console.log(files)
    const filesDetails = Array.from(files).map((file) => {
      return {
        path: file.webkitRelativePath.substring(file.webkitRelativePath.indexOf("/") + 1),
        content: file,
      };
    });
    console.log(filesDetails)
    const options = {
      wrapWithDirectory: true,
      progress: (prog) => console.log(`received: ${prog}`),
    };

    const addedGen = ipfs.addAll(filesDetails, options);
    for await (const added of addedGen) {
      if (added.path === "") {
        ipfsCID = added.cid.string;
      }
    }
    console.log(ipfsCID)
  }

  async function addToSiteStore() {
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
    <!-- <input type="file" id="fileinp" bind:files class="form-control-file"> -->
    <input
      type="file"
      id="fileinp"
      webkitdirectory="true"
      directory="true"
      multiple
      bind:files
      on:change={async (e) => {
        // files = await getDroppedOrSelectedFiles(e);
        // files=e
      }}
      class="form-control-file" />
    <!-- <Input id="fileinp" type="file" bind:files /> -->
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
