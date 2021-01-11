<script lang="ts">
  import { Form, FormGroup, Input, Label } from "sveltestrap";
  let name: string;
  export let siteStore, account;

  async function deleteSite() {
    await siteStore.methods.deleteSiteDNS(name).send({ from: account });
  }
</script>

<Form
  on:submit={(e) => {
    e.preventDefault();
    deleteSite();
  }}>
  <h2>Delete a site</h2>
  <FormGroup>
    <Label for="#nameinp">
      Please select the name that you would like to delete
    </Label>
    <Input type="text" id="nameinp" bind:value={name} />
  </FormGroup>
  <FormGroup>
    <Input class="primary" type="submit" value="Submit" />
  </FormGroup>
</Form>
