<template>
    <div>
        <div class="white-space-top"></div>
        <div class="header-faq">
            <img src="../assets/images/corona.png" >
            <h1>Veelgesteldevragen</h1>
        </div>
        <div class="content-faq">
            <p>
                Op deze pagina vindt u veelgestelde vragen, onder andere over het coronavirus in relatie tot Star-shl.
                Voor algemene vragen over corona verwijzen wij u naar de
                <a href="https://www.rivm.nl/coronavirus-covid-19/actueel">website van het RIVM</a>.
                
            </p>
            <h1>Onderzoeken</h1>
        </div>
    </div>
</template>

<script setup>

</script>

<style >
.header-faq{
    position: relative;
    width: 100%;
    height: 50vw;
    z-index: 1;
}

.header-faq img{
  width: 100%;
  height: 50vw;
  object-fit: cover;
  object-position: -20% 0;
  border-radius: 8px;
  z-index: 1;
}
.header-faq h1{
    position: absolute;
    color: white;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
}
.content-faq{
    text-align: center;
}
.content-faq a{
    color: #e7334c !important;
    text-decoration: none;
}

</style>