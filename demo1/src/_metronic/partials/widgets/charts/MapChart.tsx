import * as React from 'react';
import data from "./utils/features.json";
import {
    ZoomableGroup,
    ComposableMap,
    Geographies,
    Geography
  } from "react-simple-maps";
import {State} from "./ChartsWidget9"

// export interface State {
//     name: string;
//     count: string|number;
// }

type MapChartProps = {
    setTooltipContent: React.Dispatch<React.SetStateAction<State>>;
}  

const MapChart:React.FC<MapChartProps> = ({ setTooltipContent }) => {
  return (
    <div data-tip="">
      <ComposableMap>
        <ZoomableGroup>
          <Geographies geography={data}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {                    
                    setTooltipContent(()=>{
                        return{
                            name:`${geo.properties.name}`,
                            count:`${geo.properties.count}`
                        }
                    });
                  }}
                  onMouseLeave={() => {
                    setTooltipContent(()=>{return{name:"",count:""}});
                  }}
                  style={{
                    default: {
                      fill: "#D6D6DA",
                      outline: "none"
                    },
                    hover: {
                      fill: "#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  )
}

export default React.memo(MapChart)