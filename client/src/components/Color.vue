<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
    >
      <v-flex mb-4>
        <verte display='widget' value='#fef8e2' picker='wheel' model='hex' :rgbSliders="true" :recentColors='null' v-model="cVal"></verte>
        <v-layout column class="light--text">
            <v-flex xs4><button>Toggle Range</button></v-flex>
            <v-flex xs4 v-if="rangeButton == false">
                <v-flex
          shrink
          style="width: 60px"
        >
          <v-text-field
            v-model="price[0]"
            class="mt-0"
            hide-details
            single-line
            type="number"
          ></v-text-field>
        </v-flex>
  
        <v-flex>
          <v-range-slider
            v-model="price"
            maxWidth='100px'
            :max="100"
            :min="0"
            :step="1"
          ></v-range-slider>
        </v-flex>
  
        <v-flex
          shrink
          style="width: 60px"
        >
          <v-text-field
            v-model="price[1]"
            class="mt-0"
            hide-details
            single-line
            type="number"
          ></v-text-field>
        </v-flex>
            </v-flex>
            <v-flex xs4 v-else>
                <v-slider v-model="slider" label="Label"></v-slider>
            </v-flex>
        </v-layout>
        <br>
        <v-btn large=true @click='submit("hi")' v-bind:style="{backgroundColor: cVal}">Submit</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    data: () => ({
        cVal: '#fef8e2',
        showAdv: false,
        rangeButton: false,
        slider: 50,
        price: [0, 100]
    }),
    watch: {
        cVal: function() {

        }
    },
    methods: {
        submit: function(message) {
            alert(message)
        },
        change: function() {
            console.log(this.cVal)
        }
    }
}
</script>


<style>

</style>
