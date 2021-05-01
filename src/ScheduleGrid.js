import React, { useState } from 'react'
import './App.css';

import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from './firebase';
import Popup from './Popup';

export default function ScheduleGrid() {
    const [btnPopup, setBtnPopup] = useState(false);

    return (
        <div>
            <section className="scheduleGrid">
            <br />
            <div>月</div>
            <div>火</div>
            <div>水</div>
            <div>木</div>
            <div>金</div>
            <div>土</div>
            
            {/* 1st Row */}
            <h3>１</h3>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
    
            {/* 2nd Row */}
            <h3>２</h3>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
            
            {/* 3rd Row */}
            <h3>３</h3>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
    
            {/* 4th Row */}
            <h3>４</h3>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
            <button onClick={()=> setBtnPopup(true)}/>
    
            {/* 5th Row */}
            <h3>５</h3>
            {/* <ScheduleCell />
            <ScheduleCell />
            <ScheduleCell />
            <ScheduleCell />
            <ScheduleCell />
        <ScheduleCell /> */}
    
            {/* 6th Row */}
            {/* <h3>６</h3>
            <ScheduleCell />
            <ScheduleCell />
            <ScheduleCell />
            <ScheduleCell />
            <ScheduleCell />
        <ScheduleCell /> */}
    
            {/* 7th Row */}
            {/* <h3>７</h3>
            <ScheduleCell />
            <ScheduleCell />
            <ScheduleCell />
            <ScheduleCell />
            <ScheduleCell />
        <ScheduleCell /> */}
            </section>
            <Popup trigger={btnPopup} setTrigger={setBtnPopup}></Popup>
        </div>
    )
}