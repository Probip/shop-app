<template>
    <div class="mapouter"><div class="gmap_canvas">
      <iframe class="gmap_iframe" width="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=700&amp;height=300&amp;hl=en&amp;q=Gajeva ul. 59, 10000, Zagreb&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"></iframe>
      <a href="https://embed-googlemap.com">embed-googlemap.com</a>
      </div>
    </div>
</template>
<script>
export default {
    name: "AppGoogleMap",
}
</script>
<style>
    .mapouter{
        position:relative;
        text-align:right;
        width:100%;
        height:300px;
    }
    .gmap_canvas {
        overflow:hidden;
        background:none!important;
        width:100%;height:300px;
    }
    .gmap_iframe {
        height:300px!important;
    }
</style>