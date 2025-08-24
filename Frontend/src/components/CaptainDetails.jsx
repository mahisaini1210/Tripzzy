import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CapatainContext'

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext)

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-xl">
      {/* Top Row: Profile + Earnings */}
      <div className="flex items-center justify-between mb-6">
        {/* Profile Info */}
        <div className="flex items-center gap-4">
          <img
            className="h-12 w-12 rounded-full object-cover border-2 border-yellow-400 shadow-md"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
            alt="Captain Avatar"
          />
          <h4 className="text-lg font-semibold capitalize">
            {captain.fullname.firstname} {captain.fullname.lastname}
          </h4>
        </div>

        {/* Earnings */}
        <div className="text-right">
          <h4 className="text-xl font-bold text-emerald-400">₹295.20</h4>
          <p className="text-sm text-slate-400">Earned</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 text-center bg-slate-800 p-4 rounded-xl">
        <div>
          <i className="ri-timer-2-line text-2xl text-yellow-400 mb-1 block" />
          <h5 className="text-lg font-semibold">10.2</h5>
          <p className="text-xs text-slate-400">Hours Online</p>
        </div>
        <div>
          <i className="ri-speed-up-line text-2xl text-sky-400 mb-1 block" />
          <h5 className="text-lg font-semibold">28</h5>
          <p className="text-xs text-slate-400">Trips Completed</p>
        </div>
        <div>
          <i className="ri-booklet-line text-2xl text-pink-400 mb-1 block" />
          <h5 className="text-lg font-semibold">4.9</h5>
          <p className="text-xs text-slate-400">Rating</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails
