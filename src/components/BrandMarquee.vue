<script setup>
import { computed } from 'vue'
import { useSiteContent } from '../composables/useSiteContent'

const { content } = useSiteContent()
const marqueeBrands = computed(() => [...content.value.brands, ...content.value.brands])
</script>

<template>
  <section class="brand-marquee-section" aria-label="Brand pilihan mino.mi store">
    <div class="brand-marquee" aria-label="Daftar brand pilihan mino.mi store">
      <div class="brand-marquee-track">
        <div v-for="(brand, index) in marqueeBrands" :key="`${brand.name}-${index}`" class="brand-logo-item">
          <img
            v-if="brand.logo"
            :src="brand.logo"
            :alt="brand.name"
            class="brand-logo-image"
            loading="lazy"
          />
          <span v-else class="brand-logo-text">{{ brand.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.brand-marquee-section,
.brand-marquee{
  --brand-strip-bg:var(--cream);
}
.brand-marquee-section{
  background:var(--brand-strip-bg);
  overflow:hidden;
  height:96px;
  display:grid;
  place-items:center;
  border-block:1px solid rgba(124,45,66,.06);
}
.brand-marquee{
  width:100%;
  height:76px;
  overflow:hidden;
  padding:6px 0;
  background:
    linear-gradient(90deg, var(--brand-strip-bg) 0%, rgba(251,241,238,0) 12%),
    linear-gradient(270deg, var(--brand-strip-bg) 0%, rgba(251,241,238,0) 12%),
    var(--brand-strip-bg);
  background-repeat:no-repeat;
  background-position:left center, right center, center;
  background-size:18% 100%, 18% 100%, 100% 100%;
}
.brand-marquee-track{
  display:flex;
  width:max-content;
  align-items:center;
  gap:52px;
  padding-inline:32px;
  animation:brand-scroll 36s linear infinite;
  will-change:transform;
}
.brand-marquee:hover .brand-marquee-track{
  animation-play-state:paused;
}
.brand-logo-item{
  width:150px;
  height:64px;
  flex:0 0 auto;
  display:grid;
  place-items:center;
}
.brand-logo-text{
  font-family:'Fraunces', serif;
  font-size:22px;
  font-weight:600;
  line-height:1.1;
  text-align:center;
  color:#111111;
  opacity:1;
  white-space:nowrap;
}
.brand-logo-image{
  width:100%;
  max-width:150px;
  height:64px;
  object-fit:contain;
  filter:grayscale(1);
}
@keyframes brand-scroll{
  from{transform:translateX(-50%);}
  to{transform:translateX(0);}
}
@media (max-width:768px){
  .brand-marquee-section{
    height:78px;
  }
  .brand-marquee{
    height:62px;
    padding:5px 0;
    background-size:16% 100%, 16% 100%, 100% 100%;
  }
  .brand-marquee-track{
    gap:34px;
    padding-inline:18px;
    animation-duration:30s;
  }
  .brand-logo-item{
    width:118px;
    height:52px;
  }
  .brand-logo-text{
    font-size:17px;
  }
  .brand-logo-image{
    max-width:118px;
    height:52px;
  }
}
</style>
