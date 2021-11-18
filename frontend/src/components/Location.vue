<template>
  <div class="map-responsive">
    <iframe src="https://www.google.com/maps/d/embed?mid=1b_K2S4IW2EyIJf_2WR1jcqo5THYs8fGe" width="600" height="400" style="border:0" allowfullscreen></iframe>
  </div>
</template>

<style>

.map-responsive{
  margin: 50px 20px 50px 20px;
    overflow:hidden;
    padding-bottom:56.25%;
    position:relative;
    height:400px;
}
.map-responsive iframe{
    left:0;
    top:0;
    height:100%;
    width:100%;
    position:absolute;
}

</style>