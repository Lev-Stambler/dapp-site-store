<script lang="ts">
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
  } from "sveltestrap";
  import { link } from "svelte-spa-router";

  // import { Link } from "svelte-routing";

  export let account;
  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<style>
  .cropped {
    max-width: 30px;
  }
</style>

<Navbar color="light" light expand="md">
  <NavbarBrand href="/">NamedIPFS</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ml-auto" navbar>
        <NavItem>
          <a href="/upload" use:link class="nav-link">Upload</a>
        </NavItem>
        <NavItem>
          <a href="/delete" use:link class="nav-link">Delete Site</a>
        </NavItem>
        <NavItem>
          <a href="/view" use:link class="nav-link">View</a>
        </NavItem>
        <NavItem>
          <NavLink disabled class="">{account}</NavLink>
        </NavItem>
    </Nav>
  </Collapse>
</Navbar>
