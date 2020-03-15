import { scaleTime } from 'd3-scale'
import { axisBottom } from 'd3-axis'
import { extent } from 'd3-array'
import { select } from 'd3-selection'

////////////////////////

type Margins = { top: number, right: number, bottom: number, left: number }
type Dimensions = { width: number, height: number }

////////////////////////

function createAxis(holder: any, dataset: Date[], dimensions: Dimensions, margins: Margins, title: string) {
  const { width, height } = dimensions
  const domain = extent(dataset)
  const range = [0, width - margins.left - margins.right]
  const scaleX = scaleTime().domain(domain).range(range)
  const axis = axisBottom(scaleX)

  const svg = holder
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate(${margins.left}, ${margins.top})`)

  svg.append('g')
    .attr('width', width - margins.left - margins.right)
    .attr('height', height - margins.top - margins.bottom)
    .attr('transform', `translate(0, ${height - margins.top - margins.bottom})`)
    .call(axis);
}

////////////////////////

const body = select('body')
const dimensions = { width: 600, height: 50 }
const margins = { top: 20, right: 20, bottom: 20, left: 20 }

const dates = [
  new Date(2020, 11, 10, 22, 30),
  new Date(2020, 11, 10, 23, 0),
  new Date(2020, 11, 10, 23, 30),
  new Date(2020, 11, 11, 0, 0),
  new Date(2020, 11, 11, 0, 30),
  new Date(2020, 11, 11, 1, 0),
  new Date(2020, 11, 11, 1, 30),
]

createAxis(body, dates, dimensions, margins, 'Example #1')
createAxis(body, dates, dimensions, margins, 'Example #2')