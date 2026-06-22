import { Header} from './Header.jsx'
import {useState, useEffect} from 'react';
import { StudentList } from './StudentList.jsx'
export function Dashboard(){
    return(
        <>
        <Header />
        <StudentList />
        </>
    )
}