<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    absolute
    dark
    temporary
    app
    clipped
    :width="260"
    :mobile-break-point="960"
    enable-resize-watcher
  >
    <v-list class="pa-1">
      <v-list-tile v-if="mini">
        <v-list-tile-action>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>chevron_right</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile v-if="!mini">
        <v-list-tile-content>
          <v-list-tile-title>Menu</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>

      </v-list-tile>
    </v-list>

    <v-list class="pt-0" dense>
      <v-divider light></v-divider>

      <v-list-tile
      v-for="item in items"
      :key="item.title"
      :to="item.route"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
    data () {
      return {
        items: [
          { title: 'Home', icon: 'home', route: '/color' },
          { title: 'Single Color', icon: 'color_lens', route: '/advanced' },
          { title: 'Animations', icon: 'cached', route: '/animation'},
          { title: 'Patterns', icon: 'texture', route: '/patterns'}
        ],
        mini: false,
        right: null
      }
    },
    props: {
      visible: {
        required: true,
        default: null,
      }
    },
    computed: {
      drawer: {
        get: function () {
          return this.visible;
        },
        set: function (newValue) {

        }
      }
    }
}
</script>

<style>

</style>
