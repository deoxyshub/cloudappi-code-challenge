<template>
  <div class="user-edit">
    <cv-breadcrumb :no-trailing-slash="true">
      <cv-breadcrumb-item>
        <cv-link to="/">{{ $t("breadcrumb.home") }}</cv-link>
      </cv-breadcrumb-item>
      <template v-if="!editMode">
        <cv-breadcrumb-item>
          <cv-link aria-current="page">{{ $t("breadcrumb.user") }}</cv-link>
        </cv-breadcrumb-item>
      </template>
      <template v-else>
        <cv-breadcrumb-item>
          <cv-link>{{ $t("breadcrumb.user") }}</cv-link>
        </cv-breadcrumb-item>
        <cv-breadcrumb-item>
          <cv-link aria-current="page">{{
            `${user.firstname} ${user.lastname}`
          }}</cv-link>
        </cv-breadcrumb-item>
      </template>
    </cv-breadcrumb>

    <div class="cv-form bx--form">
      <cv-text-input
        :label="$t('info.user.firstname')"
        :placeholder="$t('info.user.placeholder.firstname')"
        :value="user.firstname"
        v-model="user.firstname"
        :invalid-message="
          throwValidation && !user.firstname
            ? $t('form.validation.ismandatory')
            : ''
        "
        :maxlength="70"
      >
      </cv-text-input>
      <cv-text-input
        :label="$t('info.user.lastname')"
        :placeholder="$t('info.user.placeholder.lastname')"
        :value="user.lastname"
        v-model="user.lastname"
        :invalid-message="
          throwValidation && !user.lastname
            ? $t('form.validation.ismandatory')
            : ''
        "
        :maxlength="70"
      >
      </cv-text-input>
      <cv-text-input
        :label="$t('info.user.email')"
        :placeholder="$t('info.user.placeholder.email')"
        :value="user.email"
        v-model="user.email"
        :invalid-message="
          throwValidation && !user.email
            ? $t('form.validation.ismandatory')
            : ''
        "
        :maxlength="70"
      >
      </cv-text-input>

      <cv-date-picker
        kind="single"
        :date-label="$t('info.user.birthdate')"
        placeholder="yyyy-MM-dd"
        v-model="user.birthDate"
        :cal-options="{ dateFormat: 'Y-m-d' }"
        :value="user.birthDate"
        @change="actionChange"
        :invalid-message="
          throwValidation && !user.birthDate
            ? $t('form.validation.ismandatory')
            : ''
        "
      >
        <template
          v-if="throwValidation && !user.birthDate"
          slot="invalid-message"
          >{{ $t("form.validation.ismandatory") }}</template
        >
      </cv-date-picker>

      <fieldset>
        <legend>{{ $t("info.user.address") }}</legend>
        <cv-text-input
          :label="$t('info.address.street')"
          :placeholder="$t('info.address.placeholder.street')"
          :value="user.address.street"
          v-model="user.address.street"
          :maxlength="140"
        >
        </cv-text-input>
        <cv-text-input
          :label="$t('info.address.city')"
          :placeholder="$t('info.address.placeholder.city')"
          :value="user.address.city"
          v-model="user.address.city"
          :maxlength="70"
        >
        </cv-text-input>
        <cv-combo-box
          :label="$t('info.address.placeholder.country')"
          :title="$t('info.address.country')"
          :auto-highlight="true"
          :options="countries"
          v-model="user.address.country"
          :class="'bx--form-item'"
        >
        </cv-combo-box>
        <cv-text-input
          :label="$t('info.address.postalcode')"
          :placeholder="$t('info.address.placeholder.postalcode')"
          :value="user.address.postalcode"
          v-model="user.address.postalcode"
          :maxlength="15"
        >
        </cv-text-input>
      </fieldset>
      <cv-button @click="actionSave">{{ $t("action.submit") }}</cv-button>
    </div>
  </div>
</template>

<script lang="ts" src="./user.edit.ts"></script>
<style src="./user.edit.css"></style>
