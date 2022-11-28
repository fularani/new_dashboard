/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC,useState,useEffect} from 'react';
import axios,{AxiosResponse} from "axios";
import { DataInterface,TDate,Region,Country,City,Users } from "../../context/AppContext"
import {useIntl} from 'react-intl'
// import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
// import {
//   ListsWidget2,
//   ListsWidget3,
//   ListsWidget4,
//   ListsWidget6,
//   TablesWidget5,
//   TablesWidget10,
//   MixedWidget8,
//   CardsWidget7,
//   CardsWidget17,
//   CardsWidget20,
//   ListsWidget26,
//   EngageWidget10,
// } from '../../../_metronic/partials/widgets'
import { Charts } from '../../modules/widgets/components/Charts';

// const DashboardPage: FC = () => (
//   <>
//     {/* begin::Row */}
//     <div className='row g-5 g-xl-10 mb-5 mb-xl-10'>
//       {/* begin::Col */}
//       <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
//         <CardsWidget20
//           className='h-md-50 mb-5 mb-xl-10'
//           description='Active Projects'
//           color='#F1416C'
//           img={toAbsoluteUrl('/media/patterns/vector-1.png')}
//         />
//         <CardsWidget7
//           className='h-md-50 mb-5 mb-xl-10'
//           description='Professionals'
//           icon={false}
//           stats={357}
//           labelColor='dark'
//           textColor='gray-300'
//         />
//       </div>
//       {/* end::Col */}

//       {/* begin::Col */}
//       <div className='col-md-6 col-lg-6 col-xl-6 col-xxl-3 mb-md-5 mb-xl-10'>
//         <CardsWidget17 className='h-md-50 mb-5 mb-xl-10' />
//         <ListsWidget26 className='h-lg-50' />
//       </div>
//       {/* end::Col */}

//       {/* begin::Col */}
//       <div className='col-xxl-6'>
//         <EngageWidget10 className='h-md-100' />
//       </div>
//       {/* end::Col */}
//     </div>
//     {/* end::Row */}

//     {/* begin::Row */}
//     <div className='row gx-5 gx-xl-10'>
//       {/* begin::Col */}
//       <div className='col-xxl-6 mb-5 mb-xl-10'>
//         {/* <app-new-charts-widget8 cssclassName="h-xl-100" chartHeight="275px" [chartHeightNumber]="275"></app-new-charts-widget8> */}
//       </div>
//       {/* end::Col */}

//       {/* begin::Col */}
//       <div className='col-xxl-6 mb-5 mb-xl-10'>
//         {/* <app-cards-widget18 cssclassName="h-xl-100" image="./assets/media/stock/600x600/img-65.jpg"></app-cards-widget18> */}
//       </div>
//       {/* end::Col */}
//     </div>
//     {/* end::Row */}

//     {/* begin::Row */}
//     <div className='row gy-5 gx-xl-8'>
//       <div className='col-xxl-4'>
//         <ListsWidget3 className='card-xxl-stretch mb-xl-3' />
//       </div>
//       <div className='col-xl-8'>
//         <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' />
//       </div>
//     </div>
//     {/* end::Row */}

//     {/* begin::Row */}
//     <div className='row gy-5 g-xl-8'>
//       <div className='col-xl-4'>
//         <ListsWidget2 className='card-xl-stretch mb-xl-8' />
//       </div>
//       <div className='col-xl-4'>
//         <ListsWidget6 className='card-xl-stretch mb-xl-8' />
//       </div>
//       <div className='col-xl-4'>
//         <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
//         {/* partials/widgets/lists/_widget-4', 'class' => 'card-xl-stretch mb-5 mb-xl-8', 'items' => '5' */}
//       </div>
//     </div>
//     {/* end::Row */}

//     <div className='row g-5 gx-xxl-8'>
//       <div className='col-xxl-4'>
//         <MixedWidget8
//           className='card-xxl-stretch mb-xl-3'
//           chartColor='success'
//           chartHeight='150px'
//         />
//       </div>
//       <div className='col-xxl-8'>
//         <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' />
//       </div>
//     </div>
//   </>
// )

const DashboardWrapper: FC = () => {  
  const intl = useIntl()

  const [data, setData] = useState<DataInterface[]>([]);
  const [date_, setDate] = useState<TDate[]>([])
  const [region_, setRegion] = useState<Region[]>([])
  const [country_, setCountry] = useState<Country[]>([])
  const [city_, setCity] = useState<City[]>([])
  const [users_, setUsers] = useState<Users[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
        setIsLoading(true);
        getData()
    }, [])
    
  const getData=async()=>{
        
    const tmp_date:TDate[]=[]
    const tmp_region:Region[]=[]
    const tmp_country:Country[]=[]
    const tmp_city:City[]=[]
    const tmp_users:Users[]=[]

    await axios.get<DataInterface[]>("http://localhost:3000/report")
    .then((response:AxiosResponse)=>{
          setData(response.data.data)
          response.data.data.map((item:any)=>{
            return(
              tmp_date.push(item.date),
              tmp_region.push(item.region),
              tmp_country.push(item.country),
              tmp_city.push(item.city),
              tmp_users.push(item.users)
            )             
          }) 

          setDate(tmp_date)
          setRegion(tmp_region)
          setCountry(tmp_country)
          setCity(tmp_city)
          setUsers(tmp_users)        
    })
    .catch((error)=>{
          if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
          } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
          }
    })
  }

  // const AppContextvalue:ContextInterface[]=[{
  //   date_: date_,
  //   region_: region_,
  //   country_:country_,
  //   city_:city_,
  //   users_:users_,
  // }]

  return (
    <>
        <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      {/* <DashboardPage /> */}
        {isLoading && <Charts data={data} date={date_} region={region_} country={country_} city={city_} users={users_}
        /> }
    </>
  )
}

export {DashboardWrapper}
