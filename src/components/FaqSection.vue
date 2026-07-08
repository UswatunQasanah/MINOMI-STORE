<script setup>
import { computed, ref } from 'vue'
import { useSiteContent } from '../composables/useSiteContent'

const { content } = useSiteContent()
const faqs = computed(() => content.value.faqs)
const openIndex = ref(0)

const toggleFaq = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

const isOpen = computed(() => (index) => openIndex.value === index)
</script>

<template>
  <section id="faq" class="faq-section" aria-labelledby="faq-title">
    <div class="container-mm">
      <h2 id="faq-title" class="faq-title" data-reveal>FAQ</h2>

      <div class="faq-list" data-reveal>
        <article v-for="(faq, index) in faqs" :key="faq.question" class="faq-item" :class="{ 'is-open': isOpen(index) }">
          <button
            class="faq-question"
            type="button"
            :aria-expanded="String(isOpen(index))"
            :aria-controls="`faq-answer-${index}`"
            @click="toggleFaq(index)"
          >
            <span>{{ faq.question }}</span>
            <i class="fa-solid fa-chevron-down faq-icon" aria-hidden="true"></i>
          </button>

          <div :id="`faq-answer-${index}`" class="faq-answer-wrap">
            <div class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.faq-section{
  background:var(--cream);
  color:var(--ink);
  padding:72px 0;
}
.faq-title{
  font-family:'Fraunces', serif;
  font-size:clamp(34px, 4.5vw, 54px);
  font-weight:600;
  line-height:1;
  text-align:center;
  margin:0;
}
.faq-list{
  max-width:920px;
  margin:42px auto 0;
  border-top:1px solid var(--line);
}
.faq-item{
  border-bottom:1px solid var(--line);
}
.faq-question{
  width:100%;
  min-height:78px;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:24px;
  padding:22px 0;
  text-align:left;
  font-size:clamp(17px, 2vw, 23px);
  font-weight:700;
  color:var(--ink);
}
.faq-icon{
  flex:0 0 auto;
  color:var(--berry);
  font-size:16px;
  transition:transform .25s ease;
}
.faq-item.is-open .faq-icon{
  transform:rotate(180deg);
}
.faq-answer-wrap{
  display:grid;
  grid-template-rows:0fr;
  transition:grid-template-rows .3s ease;
}
.faq-item.is-open .faq-answer-wrap{
  grid-template-rows:1fr;
}
.faq-answer{
  overflow:hidden;
}
.faq-answer p{
  max-width:760px;
  margin:0;
  padding:0 48px 24px 0;
  color:var(--muted);
  line-height:1.7;
  font-size:15px;
}
@media (max-width:768px){
  .faq-section{
    padding:54px 0;
  }
  .faq-list{
    margin-top:32px;
  }
  .faq-question{
    min-height:68px;
    gap:18px;
    padding:18px 0;
  }
  .faq-answer p{
    padding:0 28px 20px 0;
    font-size:14px;
  }
}
</style>
