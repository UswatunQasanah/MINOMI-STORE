<script setup>
import { computed, ref } from 'vue'
import { useSiteContent } from '../composables/useSiteContent'

const { content } = useSiteContent()
const testimonials = computed(() => content.value.testimonials)
const testimonialTrack = ref(null)

const scrollTestimonials = (direction) => {
  const track = testimonialTrack.value
  if (!track) return

  const firstCard = track.querySelector('.testi-card')
  const cardWidth = firstCard?.getBoundingClientRect().width || track.clientWidth * 0.85
  const gap = 20

  track.scrollBy({
    left: direction * (cardWidth + gap),
    behavior: 'smooth',
  })
}
</script>

<template>
  <section id="testimoni" class="testimonial-section py-16 md:py-20">
    <div class="container-mm">
      <div class="testimonial-heading">
        <div>
          <p class="eyebrow" style="color:var(--pink);" data-reveal>TESTIMONI</p>
          <h2 class="section-title testimonial-title" style="color:#fff;" data-reveal>Kata Pelanggan mino.mi store</h2>
        </div>
        <div class="testimonial-controls" data-reveal>
          <button class="testimonial-nav" type="button" aria-label="Geser testimoni ke kiri" @click="scrollTestimonials(-1)">
            <i class="fa-solid fa-arrow-left"></i>
          </button>
          <button class="testimonial-nav" type="button" aria-label="Geser testimoni ke kanan" @click="scrollTestimonials(1)">
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div class="testimonial-scroll-wrap" data-reveal>
        <div ref="testimonialTrack" class="testimonial-track">
          <article
            v-for="testimonial in testimonials"
            :key="testimonial.name"
            class="testi-card dummy-flag"
          >
            <span class="dummy-tag">5 STAR</span>
            <p class="stars">&#9733;&#9733;&#9733;&#9733;&#9733;</p>
            <p class="text-sm mt-3 text-white/90">{{ testimonial.quote }}</p>
            <p class="text-xs mt-4 text-white/60 font-mono">&mdash; {{ testimonial.name }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.testimonial-section{
  background:var(--berry);
  color:#fff;
}
.testimonial-heading{
  display:flex;
  align-items:end;
  justify-content:space-between;
  gap:20px;
}
.testimonial-controls{
  display:flex;
  gap:10px;
}
.testimonial-nav{
  width:42px;
  height:42px;
  border-radius:999px;
  display:grid;
  place-items:center;
  color:#fff;
  border:1px solid rgba(255,255,255,.28);
  background:rgba(255,255,255,.10);
  transition:background .18s ease, transform .18s ease;
}
.testimonial-nav:hover{
  background:rgba(255,255,255,.18);
  transform:translateY(-1px);
}
.testimonial-title{
  font-size:clamp(26px, 3vw, 34px);
}
.testimonial-scroll-wrap{
  position:relative;
  margin-top:40px;
}
.testimonial-scroll-wrap::before,
.testimonial-scroll-wrap::after{
  content:'';
  position:absolute;
  top:0;
  bottom:0;
  z-index:2;
  width:56px;
  pointer-events:none;
}
.testimonial-scroll-wrap::before{
  left:0;
  background:linear-gradient(90deg, var(--berry), rgba(124,45,66,0));
}
.testimonial-scroll-wrap::after{
  right:0;
  background:linear-gradient(270deg, var(--berry), rgba(124,45,66,0));
}
.testimonial-track{
  display:flex;
  gap:20px;
  overflow-x:auto;
  scroll-behavior:smooth;
  scroll-snap-type:x mandatory;
  scrollbar-width:none;
  -ms-overflow-style:none;
  padding:30px 4px 6px;
}
.testimonial-track::-webkit-scrollbar{
  display:none;
}
.testi-card{
  flex:0 0 min(360px, calc(100vw - 64px));
  min-height:180px;
  scroll-snap-align:start;
  background:rgba(255,255,255,.08);
  border-color:rgba(255,255,255,.18);
  color:#fff;
}
.testi-card .dummy-tag{
  top:-10px;
  right:-8px;
}
@media (max-width:768px){
  .testimonial-heading{
    align-items:flex-start;
    flex-direction:column;
  }
  .testimonial-controls{
    align-self:flex-end;
  }
  .testimonial-scroll-wrap{
    margin-top:28px;
  }
  .testimonial-scroll-wrap::before,
  .testimonial-scroll-wrap::after{
    width:28px;
  }
  .testi-card{
    flex-basis:calc(100vw - 56px);
  }
}
</style>
