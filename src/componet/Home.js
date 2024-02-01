import React, { useState } from 'react'
import Jobdata from './Jobdata';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';

const Home = (props) => {
  const [jobDetails, setJobDetails] = useState([]);
  const [page, setPage] = useState(1);

  async function fecthData(e) {
      props.setProgressBar(0);
      const queryStr = document.getElementById('default-search').value;
      var jobType = document.getElementById('jobtype').value;
      var datePosted = document.getElementById('dateposted').value;
      var remote = document.getElementById('remotesel').value;

      const url = `https://jsearch.p.rapidapi.com/search?query=${queryStr}&remote_jobs_only=${remote}&employment_types=${jobType}&date_posted=${datePosted ? datePosted : 'all'}&page=${page}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '1e3272c714msh5fe9b5cdef85deep1e189djsnd3e785228d56',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      };
      try {
        props.setProgressBar(50);
        const response = await fetch(url, options);
        const result = await response.json();
        const uniqueArray = [];
        jobDetails && jobDetails.concat(result.data).forEach((value) => {
          if (!uniqueArray.includes(value)) {
            uniqueArray.push(value);
          }
        });
        setJobDetails(uniqueArray);
        props.setProgressBar(100);
      } catch (error) {
        console.error(error);
      }
  }

  async function fetchMoreData() {
    setPage(page + 1);
    fecthData();
  }
  function resetfilter() {
    window.location.reload();
  }
  console.log(jobDetails)
  return (
    <div>
      <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <div className='contents'> 
            <div className='w-2/5'>
                  <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                          </svg>
                      </div>
                      <input type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by Job title and location" required/>
                  </div>
                      <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                        <strong>Query examples :- </strong> QA Analyst in USA                          
                      </p>
                </div>  
              <div className="flex items-center">
                  <select id="jobtype" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option defaultValue value=''>Job Type</option>
                    <option value="FULLTIME">Full Time</option>
                    <option value="CONTRACTOR">Contractor</option>
                    <option value="PARTTIME">Part Time</option>
                    <option value="INTERN">Intern</option>
                  </select>
              </div>
              <div>
                <select id="dateposted" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option defaultValue value=''>Date Posted</option>
                    <option value="all">Any Time</option>
                    <option value="today">Today</option>
                    <option value="3days">3 Days</option>
                    <option value="week">Past Week'</option>
                    <option value="month">Past Month'</option>
                  </select>
              </div>
              <div>
                 <select id="remotesel" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option defaultValue value=''>Remote</option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
              </div>
              <button type="submit" className="text-white  end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={fecthData}>Search</button>
              <button className={`${jobDetails.length > 0 ? 'block' : 'hidden'} text-blue-900`} onClick={resetfilter}>Reset</button>
              </div>
          </div>
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <InfiniteScroll dataLength={jobDetails.length} next={fetchMoreData} hasMore={true} loader={jobDetails.length > 0 ? <Spinner/> : ''}>
              <div className="lg:col-span-3">
                {jobDetails && jobDetails.length > 0 && jobDetails.map((data, index) => (
                  <div key={index}>
                    <Jobdata data={data} index={index}/>
                    </div>
                ))}
              </div>
            </InfiniteScroll>
          </section>
        </main>
      </div>
    </div>
    </div>
  )
}

export default Home