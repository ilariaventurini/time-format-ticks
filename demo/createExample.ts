import 'tachyons'
import 'tachyons-extra'
import 'style.css'
import { scaleTime } from 'd3-scale'
import { axisBottom } from 'd3-axis'
import { extent } from 'd3-array'
import { getFormatter } from '../src/index'
import { Options } from '../src/lib/types'

const width = document.getElementById('app').clientWidth - 10
const dimensions = { width: width, height: 90 }
const margins = { top: 10, right: 40, bottom: 0, left: 60 }

export function createExample(holder: any, title: string, dataset: any, options?: Options): void {
  const { width, height } = dimensions
  const domain = extent(dataset)
  const range = [0, width - margins.left - margins.right]
  const scale = scaleTime().domain(domain).range(range)
  const axisGenerator = axisBottom(scale)

  // get and set ticks formatter
  const ticks = dataset.map(d => d.getTime())
  const formatter = getFormatter(ticks, options)
  axisGenerator
    .tickFormat(formatter)
    .ticks(10)

  const container = `
  <div id="container-${title}" class="container-example" style="width: ${width}">
    <div class="title" id="title-${title}">
      ${title}
    </div>
    
    <div class="container" id="dataset-${title}">
      <div class="container-title">Dataset</div>
      <div class="code content">
        ${dataset.map(d => `<div class="" style="width:${width}">${d.toISOString()}</div>`).join('')}
      </div>
    </div>

    <div class="container" id="options-${title}">
      <div class="container-title">Options</div>
      <div class="code content">
        ${options ? JSON.stringify(options, null, 2) : '/'}
      </div>
    </div>
    
    <div class="container" id="axis-${title}">
      <div class="container-title">Result</div>
      <div class="content"></div>
    </div>
  </div>
`

  holder.append('div').html(container)

  holder.select(`#axis-${title} > div.content`)
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margins.left}, ${margins.top})`)
    .append('g')
    .attr('width', width - margins.left - margins.right)
    .attr('height', height - margins.top - margins.bottom)
    .call(axisGenerator)
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .attr("text-anchor", "end")
}
