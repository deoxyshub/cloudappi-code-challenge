<template>
  <div class="user-list">
    <cv-data-table
      :title="$t('list.user.title')"
      :helper-text="$t('list.user.helpertext')"
      :batch-cancel-label="$t('action.cancel')"
      :searchLabel="$t('action.filter')"
      :searchPlaceholder="$t('action.filter')"
      :searchClearLabel="$t('action.clearfilter')"
      @search="onFilter"
      @sort="onSort"
      @row-select-change="actionRowSelectChange"
      :columns="[
        {
          label: $t('info.user.firstname'),
          sortable: true
        },
        {
          label: $t('info.user.lastname'),
          sortable: true
        },
        {
          label: $t('info.user.email'),
          sortable: false
        },
        {
          label: $t('info.user.birthdate'),
          sortable: true
        },
        {
          label: $t('info.user.address'),
          sortable: false
        }
      ]"
      v-model="rowSelects"
      ref="table"
    >
      <!-- :data="filteredData" -->
      <template slot="actions">
        <cv-button @click="actionNew">{{ $t("action.addnew") }}</cv-button>
      </template>
      <template slot="batch-actions">
        <cv-button @click="confirmDeletion">
          {{ $t("action.delete") }}
        </cv-button>
        <cv-button @click="actionEdit">
          {{ $t("action.edit") }}
        </cv-button>
      </template>
      <template slot="data">
        <cv-data-table-row
          v-for="(row, rowIndex) in filteredData"
          :key="`${rowIndex}`"
          :value="`${rowIndex}`"
        >
          <cv-data-table-cell
            v-for="(cell, cellIndex) in row"
            :key="`${cellIndex}`"
            :value="
              [
                $t('info.user.firstname'),
                $t('info.user.lastname'),
                $t('info.user.email'),
                $t('info.user.birthdate'),
                $t('info.user.address')
              ][cellIndex]
            "
            v-html="cell"
          ></cv-data-table-cell>
        </cv-data-table-row>
      </template>
    </cv-data-table>

    <cv-modal
      kind="danger"
      size="xs"
      ref="modal"
      @modal-hidden="actionHidden"
      @primary-click="actionDelete"
    >
      <template slot="title">
        {{ $t("modal.deleteconfirmation.title") }}
      </template>
      <template slot="content">
        <p>
          {{ $tc("modal.deleteconfirmation.message", rowSelects.length) }}
        </p>
      </template>
      <template slot="secondary-button">
        {{ $t("action.cancel") }}
      </template>
      <template slot="primary-button">
        {{ $t("action.confirm") }}
      </template>
    </cv-modal>
  </div>
</template>

<script lang="ts" src="./user.list.ts"></script>
<style src="./user.list.css"></style>
