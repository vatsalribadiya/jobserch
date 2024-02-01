import {
  BriefcaseIcon,
  CalendarIcon,
  LinkIcon,
  MapPinIcon,
} from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';

export default function Jobdata(props) {
    const {data} = props;
  return (
    <div className="lg:flex lg:items-center lg:justify-between p-3 border-b border-gray-200">
        <div className='p-3'>
            <img src={data.employer_logo && data.employer_logo} alt="" height={'50px'} width={'50px'}/>
        </div>
      <div className="min-w-0 flex-1" >
        <Link to={data.job_google_link} target='_blank' className="flex items-start font-bold text-lg text-gray-800 text-blue-700">
          {data.job_title}
        </Link>
        <p className='flex items-star text-gray-900 '>{data.employer_name}</p>
        <p className='flex items-star text-gray-400 '>{data.job_city}, {data.job_country}</p>
        <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <BriefcaseIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {data.job_employment_type}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <MapPinIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            {data.job_is_remote === true ? 'Remote' : 'On-Site'}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            {data.job_publisher}
          </div>
          <div className="mt-2 flex items-center text-sm text-gray-500">
            <CalendarIcon className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            Closing on {new Date(data.job_offer_expiration_datetime_utc).toLocaleDateString()}
          </div>
        </div>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <span className="ml-3 hidden sm:block">
          <Link to={data.job_apply_link} target='_blank'
            type="button"
            className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <LinkIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            View
          </Link>
        </span>
      </div>
    </div>
  )
}
