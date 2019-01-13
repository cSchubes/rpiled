<template>
  <v-app dark>
    <v-toolbar app>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>menu</v-icon>
      </v-btn>
      <v-toolbar-title class="headline text-uppercase">
        <span>RPI</span>
        <span class="font-weight-light">LED</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
      </v-btn>
    </v-toolbar>
    
    <!-- <AppSidebar :visible="drawer"/> -->
    <v-navigation-drawer
    v-model="drawer"
    :mini-variant="mini"
    absolute
    dark
    temporary
    app
    clipped
    :width="220"
    :mobile-break-point="960"
    enable-resize-watcher
    >
      <v-list class="pa-1">

        <v-list-tile v-if="!mini">
          <v-list-tile-content>
            <v-list-tile-title>Menu</v-list-tile-title>
          </v-list-tile-content>
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

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
// import AppSidebar from "@/components/app/AppSidebar";

export default {
  name: 'App',
  components: {
      // AppSidebar
  },
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Home', icon: 'home', route: '/color' },
        { title: 'Single Color', icon: 'color_lens', route: '/advanced' },
        { title: 'Animations', icon: 'cached', route: '/animation'},
        { title: 'Patterns', icon: 'texture', route: '/patterns'}
      ],
      mini: false,
      right: null
    }
  }
}
</script>
