import React from 'react'
import Dashboard0 from './Dashboard0'
import LeaderboardGuru from '../components/Leaderboard/LeaderboardGuru'
import Schedule from './Schedule'

const Subjects = () => {
  return (
    <div className='flex'>
        <Dashboard0 />
        <main className='p-8 flex gap-4'>
            <LeaderboardGuru />
            <Schedule />
        </main>
    </div>
  )
}

export default Subjects