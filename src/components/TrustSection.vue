<script setup>
import { computed } from 'vue'
import { useSiteContent } from '../composables/useSiteContent'

const { content } = useSiteContent()
const trustItems = computed(() => content.value.trustStats)
</script>

<template>
  <section class="trust-section" aria-labelledby="trust-title">
    <div class="container-mm">
      <h2 id="trust-title" class="trust-title" data-reveal>
        Dipercaya Pelanggan Sekitar Minomartani
      </h2>

      <div class="trust-grid" data-reveal>
        <article v-for="item in trustItems" :key="`${item.value}-${item.label}`" class="trust-item">
          <p class="trust-value">{{ item.value }}</p>
          <h3 class="trust-label">{{ item.label }}</h3>
          <p class="trust-description">{{ item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-section{
  background:var(--cream);
  padding:58px 0 66px;
  color:var(--ink);
}
.trust-title{
  max-width:780px;
  margin:0 auto;
  text-align:center;
  font-family:'Fraunces', serif;
  font-size:clamp(32px, 4.2vw, 52px);
  font-weight:600;
  line-height:1.08;
}
.trust-grid{
  display:grid;
  grid-template-columns:repeat(4, minmax(0, 1fr));
  margin-top:42px;
  border-block:1px solid rgba(124,45,66,.12);
}
.trust-item{
  position:relative;
  min-height:190px;
  padding:34px 30px 32px;
  text-align:center;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:flex-start;
}
.trust-item + .trust-item::before{
  content:'';
  position:absolute;
  left:0;
  top:30px;
  bottom:30px;
  width:1px;
  background:rgba(124,45,66,.18);
}
.trust-value{
  margin:0;
  color:var(--berry);
  font-family:'Fraunces', serif;
  font-size:clamp(36px, 4vw, 54px);
  font-weight:700;
  line-height:.95;
}
.trust-label{
  margin-top:14px;
  font-size:16px;
  font-weight:800;
  letter-spacing:.02em;
}
.trust-description{
  margin-top:9px;
  max-width:230px;
  color:var(--muted);
  font-size:14px;
  line-height:1.6;
}

@media (max-width:900px){
  .trust-section{
    padding:48px 0 54px;
  }
  .trust-grid{
    grid-template-columns:repeat(2, minmax(0, 1fr));
  }
  .trust-item{
    min-height:176px;
    padding:28px 22px;
  }
  .trust-item + .trust-item::before{
    display:none;
  }
  .trust-item:nth-child(odd)::after{
    content:'';
    position:absolute;
    right:0;
    top:26px;
    bottom:26px;
    width:1px;
    background:rgba(124,45,66,.16);
  }
  .trust-item:nth-child(n + 3){
    border-top:1px solid rgba(124,45,66,.12);
  }
}

@media (max-width:520px){
  .trust-title{
    text-align:left;
  }
  .trust-grid{
    grid-template-columns:1fr;
    margin-top:30px;
  }
  .trust-item{
    min-height:auto;
    padding:26px 0;
    text-align:left;
    align-items:flex-start;
  }
  .trust-item:nth-child(odd)::after{
    display:none;
  }
  .trust-item + .trust-item{
    border-top:1px solid rgba(124,45,66,.12);
  }
  .trust-description{
    max-width:none;
  }
}
</style>
