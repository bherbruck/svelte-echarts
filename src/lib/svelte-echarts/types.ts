import type {
  init as baseInit,
  EChartsType as BaseEchartsType,
  EChartsOption,
  SetOptionOpts,
} from 'echarts'
import type { EventHandlers } from './constants/events'
import type { HTMLAttributes } from 'svelte/elements'
import type { init as coreInit, EChartsType as CoreEchartsType } from 'echarts/core'
import type { EChartsInitOpts } from 'echarts'

type OmitHandlers<T> = {
  [K in keyof T as K extends `on${string}` ? never : K]: T[K]
}

export type ChartProps = {
  init: typeof baseInit | typeof coreInit
  options: EChartsOption
  theme?: 'light' | 'dark' | object
  initOptions?: EChartsInitOpts
  notMerge?: SetOptionOpts['notMerge']
  lazyUpdate?: SetOptionOpts['lazyUpdate']
  silent?: SetOptionOpts['silent']
  replaceMerge?: SetOptionOpts['replaceMerge']
  transition?: SetOptionOpts['transition']
  chart?: BaseEchartsType | CoreEchartsType
} & EventHandlers &
  OmitHandlers<HTMLAttributes<HTMLDivElement>>
