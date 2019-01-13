<template>
  <v-container>
    <v-layout
      text-xs-center
      wrap
      column
    >
      <v-flex mb-4>
        <verte display='widget' value='#fef8e2' picker='wheel' model='hex' :rgbSliders="true" :recentColors='null' :enableAlpha='false' v-model="cVal"></verte>
      </v-flex>
      <v-flex v-if="advButton==false">
          <button @click='advToggle()'> Show Advanced Options </button>
      </v-flex>
      <v-flex v-else>
          <button @click='advToggle()'> Hide Advanced Options </button>
      </v-flex>
      <br>
      <v-flex v-if='advButton == true'>
            <button @click='rangeToggle()'>Toggle Brightness Range</button>
            <v-layout align-center justify-center row fill-height v-if="rangeButton == true">
                <v-flex shrink style="width: 40px">   
                    <v-text-field
                        v-model="price[0]"
                        class="mt-0"
                        hide-details
                        single-line
                        type="number"
                        style="position: relative; left:20em;"
                    ></v-text-field>
                </v-flex>
    
                <v-flex>
                    <v-range-slider
                        v-model="price"
                        style="width: 400px; position: relative; left: 21em; top: .8em;"
                        :max="100"
                        :min="0"
                        :step="1"
                    ></v-range-slider>
                </v-flex>
    
                <v-flex
                shrink
                style="width: 40px"
                >
                    <v-text-field
                        v-model="price[1]"
                        class="mt-0"
                        hide-details
                        single-line
                        type="number"
                        style="position: relative; right:18em;"
                    ></v-text-field>
                </v-flex>

            </v-layout >
            <v-layout align-center justify-center row fill-height v-else style="position: relative; left: 28em">
                <v-flex shrink style="width: 60px">   
                    <v-text-field
                        v-model="slider"
                        class="mt-0"
                        hide-details
                        single-line
                        style="width: 30px; position: relative; left: 1.7em; top: -.5em"
                        type="number"
                    ></v-text-field>
                </v-flex>
                <v-flex>
                    <v-slider v-model="slider" style='width: 250px'></v-slider>
                </v-flex>
            </v-layout>

      </v-flex>
    <br>
    <v-flex>
        <v-btn @click='submit("hi")' v-bind:style="{backgroundColor: cVal}">Submit</v-btn>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    data: () => ({
        cVal: '#fef8e2',
        advButton: false,
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
        },
        rangeToggle: function() {
            this.rangeButton = !this.rangeButton;
        },
        advToggle: function() {
            this.advButton = !this.advButton;
        }
    }
}
</script>


<style>

</style>
