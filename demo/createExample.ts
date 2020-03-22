import 'tachyons'
import 'tachyons-extra'
import 'style.css'
import { scaleTime } from 'd3-scale'
import { axisBottom } from 'd3-axis'
import { extent } from 'd3-array'
import { select } from 'd3-selection'
import { getFormatter } from '../src/index'
import { computeTimeIntervalName } from '../src/lib/computeTimeInterval'
import { Options } from '../src/lib/types'

const root = select('#app')
const width = document.getElementById('app').clientWidth - 10
const dimensions = { width: width, height: 50 }
const margins = { top: 20, right: 50, bottom: 20, left: 50 }

export function createExample(holder: any, title: string, dataset: any, options?: Options): void {
  const { width, height } = dimensions
  const domain = extent(dataset)
  const range = [0, width - margins.left - margins.right]
  const scaleX = scaleTime().domain(domain).range(range)
  const axisGenerator = axisBottom(scaleX)

  // get and set ticks formatter
  const ticks = dataset.map(d => d.getTime())
  const timeInterval = computeTimeIntervalName(ticks)
  const formatter = getFormatter(ticks, options)
  axisGenerator.tickFormat(formatter)

  const container = `
  <div id="container-${title}" class="container-example" style="width: ${width}; background-color: #ffffff">
    <div class="title" id="title-${title}" style="">
      ${title}
    </div>
    
    <div class="container" id="dataset-${title}" style="">
      <div class="container-title" style="">Dataset</div>
      <div class="code content" style="">
        ${dataset.map((d, i) => `<div class="" style="width:${width}px">${d.toISOString()}</div>`).join('')}
      </div>
    </div>

    <div class="container" id="options-${title}" style="">
      <div class="container-title" style="">Options</div>
      <div class="code content" style="">
        ${options ? JSON.stringify(options, null, 2) : '/'}
      </div>
    </div>
    
    <div class="container" id="time-interval-${title}" style="">
      <div class="container-title" style="">Time interval</div>
      <div class="content" style="">
        ${timeInterval}
      </div>
    </div>
    
    <div class="container" id="axis-${title}" style="">
      <div class="container-title" style="">Result</div>
    </div>
  </div>
`

  holder.append('div').html(container)

  holder.select(`#axis-${title}`)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margins.left}, ${margins.top})`)
    .append('g')
    .attr('width', width - margins.left - margins.right)
    .attr('height', height - margins.top - margins.bottom)
    .attr('transform', `translate(0, ${height - margins.top - margins.bottom})`)
    .call(axisGenerator)
}