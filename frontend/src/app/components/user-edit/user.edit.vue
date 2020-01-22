<template>
  <div class="user-edit">
    <cv-breadcrumb :no-trailing-slash="notrailingslash">
      <cv-breadcrumb-item>
        <cv-link to="/">Home</cv-link>
      </cv-breadcrumb-item>
      <template v-if="!editMode">
        <cv-breadcrumb-item>
          <cv-link aria-current="page">User</cv-link>
        </cv-breadcrumb-item>
      </template>
      <template v-else>
        <cv-breadcrumb-item>
          <cv-link>User</cv-link>
        </cv-breadcrumb-item>
        <cv-breadcrumb-item>
          <cv-link aria-current="page">{{ $route.params.userId }}</cv-link>
        </cv-breadcrumb-item>
      </template>
    </cv-breadcrumb>

    <div class="cv-form bx--form">
      <cv-text-input
        label="First name"
        placeholder="Enter user's first name"
        :value="user.firstname"
        v-model="user.firstname"
      >
      </cv-text-input>
      <cv-text-input
        label="Last name"
        placeholder="Enter user's last name"
        :value="user.lastname"
        v-model="user.lastname"
      >
      </cv-text-input>
      <cv-text-input
        label="Email"
        placeholder="Enter user's email"
        :value="user.email"
        v-model="user.email"
      >
      </cv-text-input>

      <cv-date-picker
        kind="single"
        date-label="Birth date"
        placeholder="yyyy-MM-dd"
        invalid-message=""
        v-model="user.birthDate"
        :cal-options="calOptions"
        :value="user.birthDate"
        @change="actionChange"
      >
      </cv-date-picker>

      <fieldset>
        <legend>Address</legend>
        <cv-text-input
          label="Street"
          placeholder="Enter user's street"
          :value="user.address.street"
          v-model="user.address.street"
        >
        </cv-text-input>
        <cv-text-input
          label="City"
          placeholder="Enter user's city"
          :value="user.address.city"
          v-model="user.address.city"
        >
        </cv-text-input>
        <cv-select
          label="Country"
          v-model="user.address.country"
          :class="{ 'hack-cv-select': !!!user.address.country }"
        >
          <cv-select-option disabled hidden>
            Choose user's country
          </cv-select-option>
          <cv-select-option
            v-for="(country, index) in countries"
            :key="`country-${index}`"
            :value="country.value"
            :selected="country.value === user.address.country"
            >{{ country.label }}
          </cv-select-option>
        </cv-select>
        <cv-text-input
          label="Postal code"
          placeholder="Enter user's postal code"
          :value="user.address.postalcode"
          v-model="user.address.postalcode"
        >
        </cv-text-input>
      </fieldset>
      <cv-button @click="actionSave">Submit</cv-button>
    </div>
  </div>
</template>

<script lang="ts" src="./user.edit.ts"></script>
<style src="./user.edit.css"></style>
