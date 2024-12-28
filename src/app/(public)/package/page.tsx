import React from 'react'

const Page = () => {
    return (
        <div className='mt-24 py-24 pt-12'>
            <div>
                <div className="rounded-3xl bg-white/60 p-8 ring-1 ring-gray-900/10">
                    <h3 id="tier-hobby" className="text-base/7 font-semibold text-indigo-600">Mini</h3>
                    <p className="mt-4 flex items-baseline gap-x-2">
                        <span className="text-5xl font-semibold tracking-tight text-gray-900">₫10,000</span>
                        <span className="text-base text-gray-500">/week</span>
                    </p>
                    <p className="mt-6 text-base/7 text-gray-600">The perfect plan if you&#039;re just getting started with our product.</p>
                    <ul role="list" className="mt-4 space-y-3 text-sm/6 text-gray-600">
                        <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                            </svg>
                            Listen to music without ads
                        </li>
                        <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                            </svg>
                            10 songs download
                        </li>
                        <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                            </svg>
                            10 songs upload
                        </li>
                        <li className="flex gap-x-3">
                            <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                            </svg>
                            Listen with friends in real time (3 people in room)
                        </li>
                    </ul>
                    {/* <button aria-describedby="tier-hobby"
                        className="w-full mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:mt-10"
                    >
                        Get started today
                    </button> */}
                </div>
                
            </div>

        </div>
    )
}

export default Page