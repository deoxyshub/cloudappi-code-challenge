<template>
  <div class="user-list">
    <cv-data-table
      title="List of Users"
      helper-text="Select a record if you want to perform the Delete or Edit actions"
      batch-cancel-label="Cancel"
      @search="onFilter"
      @sort="onSort"
      @row-select-change="actionRowSelectChange"
      :columns="columns"
      :data="data"
      v-model="rowSelects"
      ref="table"
    >
      <template slot="actions">
        <cv-button @click="actionNew">Add new</cv-button>
      </template>
      <template slot="batch-actions">
        <cv-button @click="confirmDeletion">
          Delete
        </cv-button>
        <cv-button @click="actionEdit">
          Edit
        </cv-button>
      </template>
    </cv-data-table>

    <cv-modal
      kind="danger"
      size="xs"
      :visible="showModal"
      @modal-hidden="modalClosed"
      @primary-click="actionDelete"
    >
      <template slot="title">Delete Confirmation</template>
      <template slot="content">
        <p>
          Are you sure you want to delete
          {{ rowSelects.length > 1 ? "these users" : "this user" }}?.
        </p>
      </template>
      <template slot="secondary-button">Cancel</template>
      <template slot="primary-button">Confirm</template>
    </cv-modal>
  </div>
</template>

<script lang="ts" src="./user.list.ts"></script>
<style src="./user.list.css"></style>
