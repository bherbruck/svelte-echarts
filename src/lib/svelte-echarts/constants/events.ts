import type { CallbackDataParams } from 'echarts/types/dist/shared.js'

// ref: https://echarts.apache.org/en/api.html#events
export const MOUSE_EVENT_NAMES = [
  'click',
  'dblclick',
  'mousedown',
  'mousemove',
  'mouseover',
  'mouseout',
  'globalout',
  'contextmenu',
] as const

export const INTERACTION_EVENT_NAMES = [
  'highlight',
  'downplay',
  'selectchanged',
  'legendselectchanged',
  'legendselected',
  'legendunselected',
  'legendinverseselect',
  'legendscroll',
  'datazoom',
  'datarangeselected',
  'timelinechanged',
  'timelineplaychanged',
  'restore',
  'dataviewchanged',
  'magictypechanged',
  'geoselectchanged',
  'geoselected',
  'geounselected',
  'axisareaselected',
  'brush',
  'brushend',
  'brushselected',
  'globalcursortaken',
  'rendered',
  'finished',
] as const

export const EVENT_NAMES = [...MOUSE_EVENT_NAMES, ...INTERACTION_EVENT_NAMES]

export type ECMouseEvent = CallbackDataParams & {
  onevent?(event: MouseEvent): void
}

export type ECInteractionEvent = CallbackDataParams

// event dispatch types don't work unless I manually do this???
export type MouseEventHandlers = {
  onclick?(event: ECMouseEvent): void
  ondblclick?(event: ECMouseEvent): void
  onmousedown?(event: ECMouseEvent): void
  onmousemove?(event: ECMouseEvent): void
  onmouseover?(event: ECMouseEvent): void
  onmouseout?(event: ECMouseEvent): void
  onglobalout?(event: ECMouseEvent): void
  oncontextmenu?(event: ECMouseEvent): void
}

export type InteractionEventHandlers = {
  onhighlight?(event: ECInteractionEvent): void
  ondownplay?(event: ECInteractionEvent): void
  onselectchanged?(event: ECInteractionEvent): void
  onlegendselectchanged?(event: ECInteractionEvent): void
  onlegendselected?(event: ECInteractionEvent): void
  onlegendunselected?(event: ECInteractionEvent): void
  onlegendinverseselect?(event: ECInteractionEvent): void
  onlegendscroll?(event: ECInteractionEvent): void
  ondatazoom?(event: ECInteractionEvent): void
  ondatarangeselected?(event: ECInteractionEvent): void
  ontimelinechanged?(event: ECInteractionEvent): void
  ontimelineplaychanged?(event: ECInteractionEvent): void
  onrestore?(event: ECInteractionEvent): void
  ondataviewchanged?(event: ECInteractionEvent): void
  onmagictypechanged?(event: ECInteractionEvent): void
  ongeoselectchanged?(event: ECInteractionEvent): void
  ongeoselected?(event: ECInteractionEvent): void
  ongeounselected?(event: ECInteractionEvent): void
  onaxisareaselected?(event: ECInteractionEvent): void
  onbrush?(event: ECInteractionEvent): void
  onbrushend?(event: ECInteractionEvent): void
  onbrushselected?(event: ECInteractionEvent): void
  onglobalcursortaken?(event: ECInteractionEvent): void
  onrendered?(event: ECInteractionEvent): void
  onfinished?(event: ECInteractionEvent): void
}

export type EventHandlers = MouseEventHandlers & InteractionEventHandlers
