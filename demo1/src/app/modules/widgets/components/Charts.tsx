import React, {FC} from 'react';
import {
  ChartsWidget1,
  ChartsWidget2,
  ChartsWidget3,
  ChartsWidget4,
  ChartsWidget5,
  ChartsWidget6,
  ChartsWidget7,
  ChartsWidget8,
} from '../../../../_metronic/partials/widgets'
import ChartsWidget9 from "../../../../_metronic/partials/widgets/charts/ChartsWidget9";
import {TDate,Region,Country,City,Users, DataInterface} from "../../../context/AppContext"

interface ChartsProps {
  data:DataInterface[]
  date:TDate[]
  region:Region[]
  country:Country[]
  city:City[]
  users:Users[]
};

export const formatDate=(userDOB:string)=>{

  let tmp=userDOB;
  let YYYY = tmp.substring(0, 4);
  let MM = tmp.substring(4, 6);
  let DD = tmp.substring(6, 8);
  let newDate = `${YYYY}-${MM}-${DD}`
  const dob = new Date(newDate);

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
     'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const day = dob.getDate();
  const monthIndex = dob.getMonth();
  // const year = dob.getFullYear();

  // return day + ' ' + monthNames[monthIndex] + ' ' + year;
  // return `${day} ${monthNames[monthIndex]} ${year}`;
  return `${day} ${monthNames[monthIndex]}`;

}

const Charts: FC<ChartsProps> = ({data,date,region,country,city,users}:ChartsProps) => { 

  //console.log("inside Charts:",date,region,country,city,users);
  
  return (
    <>
      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-6'>
          <ChartsWidget1 className='card-xl-stretch mb-xl-8' data={data} date={date} region={region} users={users}/>
        </div>
        <div className='col-xl-6'>
          <ChartsWidget2 className='card-xl-stretch mb-5 mb-xl-8' date={date} data={data}/>
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-6'>
          <ChartsWidget3 className='card-xl-stretch mb-xl-8' date={date} users={users}/>
        </div>
        <div className='col-xl-6'>
          <ChartsWidget4 className='card-xl-stretch mb-5 mb-xl-8' date={date} data={data} users={users}/>
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-6'>
          <ChartsWidget5 className='card-xl-stretch mb-xl-8' date={date} data={data}/>
        </div>
        <div className='col-xl-6'>
          <ChartsWidget6 className='card-xl-stretch mb-5 mb-xl-8' date={date} data={data}/>
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-6'>
          <ChartsWidget7 className='card-xl-stretch mb-xl-8' date={date} data={data}/>
        </div>
        <div className='col-xl-6'>
          <ChartsWidget8 className='card-xl-stretch mb-5 mb-xl-8' date={date} data={data}/>
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row g-5 g-xl-8'>
        <div className='col-xl-6'>          
          <ChartsWidget9 className='card-xl-stretch mb-xl-8' data={data} />
        </div>
      </div>
      {/* end::Row */}
    </>
  )
}

export {Charts}
