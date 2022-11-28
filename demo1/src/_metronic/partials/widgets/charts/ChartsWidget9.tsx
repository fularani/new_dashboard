import React,{useState,useEffect} from 'react';
// import {TDate,Region,Country,City,Users} from "../../../../app/context/AppContext"
import {DataInterface} from "../../../../app/context/AppContext"
import ReactTooltip from "react-tooltip";
// import data from "./utils/features.json"
// import {
//     ZoomableGroup,
//     ComposableMap,
//     Geographies,
//     Geography
//   } from "react-simple-maps";

import MapChart from "./MapChart"

export interface State {
  name: string;
  count: string|number;
}

type Props = {
    className: string
    data:DataInterface[]
}

// type MapChartProps = {
//   setTooltipContent: React.Dispatch<React.SetStateAction<State>>;
// }

// const MapChart:React.FC<MapChartProps> = ({ setTooltipContent }) => {
//   return (
//     <div data-tip="">
//       <ComposableMap>
//         <ZoomableGroup>
//           <Geographies geography={data}>
//             {({ geographies }) =>
//               geographies.map((geo) => (
//                 <Geography
//                   key={geo.rsmKey}
//                   geography={geo}
//                   onMouseEnter={() => {                    
//                     setTooltipContent(()=>{
//                         return{
//                             name:`${geo.properties.name}`,
//                             count:`${geo.properties.count}`
//                         }
//                     });
//                   }}
//                   onMouseLeave={() => {
//                     setTooltipContent(()=>{return{name:"",count:""}});
//                   }}
//                   style={{
//                     default: {
//                       fill: "#D6D6DA",
//                       outline: "none"
//                     },
//                     hover: {
//                       fill: "#F53",
//                       outline: "none"
//                     },
//                     pressed: {
//                       fill: "#E42",
//                       outline: "none"
//                     }
//                   }}
//                 />
//               ))
//             }
//           </Geographies>
//         </ZoomableGroup>
//       </ComposableMap>
//     </div>
//   )
// }

const ChartsWidget9: React.FC<Props> = ({className,data}:Props) => {

  const [content, setContent] = useState<State>({
    name:"",
    count:"",
  });

  useEffect(() => {
    setContent(content)
  }, [content])
  

  return (
    <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Recent Users</span>

            <span className='text-muted fw-semibold fs-7'>by Country</span>
          </h3>
         {/* begin::Toolbar */}
         <div className='card-toolbar' data-kt-buttons='true'>
          <a
            className='btn btn-sm btn-color-muted btn-active btn-active-primary active px-4 me-1'
            id='kt_charts_widget_7_year_btn'
            href='/'
          >
            Year
          </a>

          <a
            className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4 me-1'
            id='kt_charts_widget_7_month_btn'
            href='/'
          >
            Month
          </a>

          <a
            className='btn btn-sm btn-color-muted btn-active btn-active-primary px-4'
            id='kt_charts_widget_7_week_btn'
            href='/'
          >
            Week
          </a>
        </div>
        {/* end::Toolbar */}
        </div>
        {/* end::Header */}

        {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <MapChart setTooltipContent={setContent} />
        {/* {content.name?(<ReactTooltip>{content.name}-{content.count}</ReactTooltip>):null}  */}
        {content.name?data.map(d=>d.country).includes(content.name)?<ReactTooltip>{content.name}-{Math.max(...data.filter(d=>d.country.toLowerCase()===content.name.toLowerCase()).map(d=>Number(d.users)))}</ReactTooltip>:<ReactTooltip>{content.name}</ReactTooltip>:null}       
        {/* <div
          ref={chartRef}
          id='kt_charts_widget_7_chart'
          style={{height: '350px'}}
          className='card-rounded-bottom'
        ></div> */}
        {/* end::Chart */}
      </div>
      {/* end::Body */}

    </div>
  )
}

export default ChartsWidget9