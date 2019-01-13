<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-list two-line subheader>
          <template v-for="item in items">
            <v-list-tile
              :key="item.title"
              avatar
              :to="item.route"
            >
              <v-list-tile-avatar>
                <v-icon :class="[item.iconClass]">{{ item.icon }}</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item.subtitle }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn fab dark small color="primary" @click.stop.prevent="sendDefault(item.title)">
                  <v-icon>mdi-help</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider/>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
    
</template>

<script>

export default {
  data () {
    return {
      items: [
        { title: 'Rainbow Gradient', 
          subtitle: 'Rainbow across the strip.', 
          icon: 'gradient', 
          route:'/testRoute'
        },
        { title: 'Rainbow Strip', 
          subtitle: 'Rainbow with the entire strip.', 
          icon: 'looks', 
          route:'/tester'
        },
        { title: 'Strand Test', 
          subtitle: 'Cycle of testing animations.', 
          icon: 'mdi-test-tube',
          route:'/'
        },
        { title: 'Running Lights',
          subtitle: 'Cycle of testing animations.', 
          icon: 'mdi-test-tube' 
        },
      ]
    }
  },
  
  methods: {
    sendDefault(title) {
      // get defaults somehow
      // send the request
      console.log(`Success! You sent a req for ${title}`);
    }
  }
}
</script>

<style>

</style>
