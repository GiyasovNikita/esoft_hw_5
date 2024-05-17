import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';

const Layout = () => {

    return (
        <div className="container mx-auto px-4">
            <div className="flex">
                <div className="main-content w-5/6">
                    <Outlet /> 
                </div>
                <div className="sidebar w-1/6">
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default Layout;