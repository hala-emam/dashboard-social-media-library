import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from './../../components/Sidebar/index';

const PageLayout = () => {
    return (
   <div className="flex h-screen">
      <aside className="w-64 bg-primary p-4 h-[96%] my-auto ml-8 rounded-md">
        <Sidebar/>
      </aside>
      <div className="flex flex-col flex-1">
        <header className="bg-transperant text-gary-900 my-4 p-2 px-20 mx-2 flex shadow-sm">
          <Header/>
        </header>
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
      );
}

export default PageLayout