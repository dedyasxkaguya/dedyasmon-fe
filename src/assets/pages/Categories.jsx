import React from 'react'
import Dashboard0 from './Dashboard0'
import Category from '../components/Category'
import Categoryall from '../components/Categoryall'

const Categories = () => {
    return (
        <div className="flex">
            <Dashboard0 />
            <div className="flex specialFlex p-4 gap-4">
                <Category />
                <Categoryall />
            </div>
        </div>
    )
}

export default Categories