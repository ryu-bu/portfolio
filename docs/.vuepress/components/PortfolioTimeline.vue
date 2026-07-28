<template>
  <div class="multi-rail">
    <p class="multi-rail__hint">
      Hover over or select a rail to expand its details.
    </p>

    <div class="multi-rail__viewport">
      <div class="multi-rail__canvas">
        <aside class="multi-rail__years" aria-hidden="true">
          <span v-for="year in years" :key="year" :style="yearStyle(year)">
            {{ year }}
          </span>
        </aside>

        <div class="multi-rail__lanes" aria-label="Career timeline">
          <div v-for="(lane, laneIndex) in lanes" :key="lane.id" class="multi-rail__lane" :class="{ 'multi-rail__lane--left': lane.id === 'nona' || (laneIndex >= 2 && laneIndex % 2 === 1) || laneIndex === lanes.length - 1 }">
            <span class="multi-rail__spine" aria-hidden="true" />

            <button
              v-for="event in lane.events"
              :key="event.id"
              type="button"
              class="multi-rail__event"
              :class="{
                'multi-rail__event--active': activeId === event.id,
                'multi-rail__event--selected': selectedId === event.id,
                'multi-rail__event--ongoing': event.ongoing,
              }"
              :style="eventStyle(event)"
              :aria-pressed="selectedId === event.id"
              @mouseenter="hoveredId = event.id"
              @mouseleave="clearHovered"
              @focus="hoveredId = event.id"
              @blur="clearHovered"
              @click="toggleSelected(event.id)"
            >
              <span class="multi-rail__bar" aria-hidden="true" />
              <span class="multi-rail__card">
                <strong>{{ event.label }}</strong>
                <template v-if="activeId === event.id">
                  <span class="multi-rail__date">{{ event.date }}</span>
                  <span class="multi-rail__detail">{{ event.detail }}</span>
                  <a v-if="event.href" class="multi-rail__link" :href="event.href" @click.stop>View experience</a>
                </template>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <ul class="multi-rail__legend" aria-label="Timeline legend">
      <li><span class="legend-dot legend-dot--education" />Education</li>
      <li><span class="legend-dot legend-dot--professional" />Professional experience</li>
      <li><span class="legend-dot legend-dot--research" />Research & projects</li>
      <li><span class="legend-arrow" />Ongoing</li>
    </ul>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const minYear = 2018
const maxYear = 2027
const years = Array.from({ length: maxYear - minYear + 1 }, (_, index) => minYear + index)

const lanes = [
  {
    id: 'education',
    label: 'Education',
    color: '#c0392b',
    events: [
      { id: 'university', date: '2018–2022', label: 'Boston University', detail: 'B.S. Computer Engineering \n\n Concentration in Machine Learning \n\n Cum Laude', start: 2018, end: 2022 },
    ],
  },
  {
    id: 'hpe',
    label: 'HPE',
    color: '#17a589',
    events: [
      { id: 'hpe-role', date: '2021–Present', label: 'HPE Aruba Networking', detail: 'Software Engineer Intern \n↓\n Software Engineer II \n↓\n Software Engineer III', href: '#hpe-aruba-networking', start: 2021, end: maxYear, ongoing: true },
    ],
  },
  {
    id: 'apka',
    label: 'Apka',
    color: '#d68910',
    events: [
      { id: 'apka-role', date: '2025–Present', label: 'Apka Shakti', detail: 'Co-Founder & Software Lead', href: '#apka-shakti', start: 2025, end: maxYear, ongoing: true },
    ],
  },
  { id: 'cidar', label: 'CIDAR', color: '#2471a3', events: [{ id: 'cidar-role', date: '2020–2022', label: 'CIDAR LAB', detail: 'Undergraduate Research Assistant', href: '#cidar-lab', start: 2020, end: 2022 }] },
  { id: 'nona', label: 'Nona', color: '#2471a3', events: [{ id: 'nona-role', date: '2020–2022', label: 'Nona Research Foundation', detail: 'Software Engineering Intern\n↓\nFellow', href: '#nona-research-foundation', start: 2020, end: 2022 }] },
  { id: 'human', label: 'Human Dynamics', color: '#2471a3', events: [{ id: 'human-role', date: '2021', label: 'Human Dynamics', detail: 'Contributor', href: '#human-dynamics', start: 2021, end: 2021.5 }] },
  { id: 'igem', label: 'iGEM', color: '#8e44ad', events: [{ id: 'igem-role', date: '2020', label: 'iGEM', detail: 'Software Committee Member', href: '#international-genetically-engineered-machine-competition-igem-2020', start: 2020.35, end: 2020.9 }] },
  { id: 'bu-it', label: 'BU IT', color: '#8e44ad', events: [{ id: 'bu-it-role', date: '2019–2020', label: 'BU IS&T', detail: 'Web Developer Intern', href: '#boston-university-information-services-and-technology', start: 2019, end: 2020.4 }] },
  { id: 'burpg', label: 'BURPG', color: '#8e44ad', events: [{ id: 'burpg-role', date: '2018–2020', label: 'BU Rocket Propulsion Group', detail: 'Software Engineering Member', href: '#boston-university-rocket-propulsion-group', start: 2018.7, end: 2020.25 }] },
]

const allEvents = computed(() => lanes.flatMap((lane) => lane.events))
const selectedId = ref(null)
const hoveredId = ref(null)
const activeId = computed(() => hoveredId.value ?? selectedId.value)

const yearStyle = (year) => ({ top: `${((year - minYear) / (maxYear - minYear)) * 100}%` })

const eventStyle = (event) => ({
  '--event-color': lanes.find((lane) => lane.events.includes(event))?.color,
  top: `${((event.start - minYear) / (maxYear - minYear)) * 100}%`,
  height: `${Math.max(((event.end - event.start) / (maxYear - minYear)) * 100, 3)}%`,
})

const clearHovered = () => { hoveredId.value = null }
const toggleSelected = (id) => { selectedId.value = selectedId.value === id ? null : id }
</script>

<style scoped>
.multi-rail__hint { margin: 0 0 0.75rem; color: var(--vp-c-text-mute); font-size: 0.85rem; }
.multi-rail__viewport { width: 100%; overflow: hidden; border-radius: 0.75rem; }
.multi-rail__canvas { position: relative; display: flex; width: 100%; height: 40rem; box-sizing: border-box; padding: 0.75rem 2rem 0.75rem 2rem; border-radius: 0.75rem; background: var(--vp-c-bg-soft); }
.multi-rail__years { position: absolute; inset: 0.75rem auto 0.75rem 0; width: 2rem; color: var(--vp-c-text-mute); font-size: 0.65rem; }
.multi-rail__years span { position: absolute; transform: translateY(-50%); }
.multi-rail__lanes { display: grid; grid-template-columns: repeat(9, minmax(0, 1fr)); flex: 1; gap: 0; }
.multi-rail__lane { position: relative; height: 100%; }
.multi-rail__lane h3 { position: absolute; top: -0.7rem; left: 50%; width: 140%; margin: 0; color: var(--vp-c-text); font-size: 0.58rem; line-height: 1; text-align: center; transform: translateX(-50%); overflow-wrap: anywhere; }
.multi-rail__spine { position: absolute; top: 0; bottom: 0; left: 50%; width: 2px; border-radius: 2px; background: color-mix(in srgb, var(--event-color, #64748b) 45%, transparent); transform: translateX(-50%); }
.multi-rail__event { position: absolute; z-index: 1; left: 0; width: 100%; min-height: 2rem; padding: 0; color: inherit; font: inherit; text-align: left; border: 0; background: transparent; cursor: pointer; }
.multi-rail__event--active, .multi-rail__event--selected { z-index: 10; }
.multi-rail__bar { position: absolute; top: 0; bottom: 0; left: 50%; width: 9px; min-height: 1.6rem; border-radius: 5px; background: var(--event-color); box-shadow: 0 0 0 2px var(--vp-c-bg-soft); transform: translateX(-50%); }
.multi-rail__event--ongoing .multi-rail__bar::after { position: absolute; bottom: -0.6rem; left: 50%; width: 0; height: 0; content: ''; border-top: 0.75rem solid var(--event-color); border-right: 0.55rem solid transparent; border-left: 0.55rem solid transparent; transform: translateX(-50%); }
.multi-rail__card { position: absolute; top: 0; left: calc(50% + 0.35rem); width: calc(50% - 0.45rem); padding: 0.25rem 0.2rem; border: 1px solid transparent; border-radius: 0.55rem; background: transparent; font-size: 0.58rem; line-height: 1.05; text-align: center; overflow-wrap: anywhere; transition: 160ms ease; }
.multi-rail__lane--left .multi-rail__card { left: auto; right: calc(50% + 0.35rem); text-align: center; }
.multi-rail__event:hover .multi-rail__card, .multi-rail__event:focus-visible .multi-rail__card, .multi-rail__event--active .multi-rail__card { z-index: 3; width: 9rem; border-color: var(--event-color); background: var(--vp-c-bg); outline: none; box-shadow: 0 0.4rem 1rem rgb(0 0 0 / 12%); }
.multi-rail__event--selected .multi-rail__card { box-shadow: inset 3px 0 var(--event-color), 0 0.4rem 1rem rgb(0 0 0 / 12%); }
.multi-rail__date, .multi-rail__detail { display: block; color: var(--vp-c-text-mute); }
.multi-rail__card strong { display: inline-block; white-space: nowrap; word-break: keep-all; writing-mode: vertical-rl; text-orientation: mixed; }
.multi-rail__event--active .multi-rail__card strong, .multi-rail__event--selected .multi-rail__card strong { white-space: normal; writing-mode: horizontal-tb; }
.multi-rail__date { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
.multi-rail__detail { margin-top: 0.15rem; font-size: 0.8rem; white-space: pre-line; }
.multi-rail__link { display: inline-block; margin-top: 0.3rem; color: var(--vp-c-brand-1); font-size: 0.72rem; text-decoration: underline; }
.multi-rail__legend { display: flex; flex-wrap: wrap; gap: 0.6rem 1.25rem; margin: 0.8rem 0 0; padding: 0; color: var(--vp-c-text-mute); font-size: 0.8rem; list-style: none; }
.multi-rail__legend li { display: inline-flex; align-items: center; gap: 0.4rem; }
.legend-dot, .legend-arrow { width: 0.65rem; height: 0.65rem; border-radius: 50%; }
.legend-dot--education { background: #c0392b; } .legend-dot--professional { background: #17a589; } .legend-dot--research { background: #2471a3; }
.legend-arrow { width: 0; height: 0; border-top: 0.55rem solid #17a589; border-right: 0.35rem solid transparent; border-left: 0.35rem solid transparent; border-radius: 0; }
@media (prefers-reduced-motion: reduce) { .multi-rail__card { transition: none; } }
</style>
