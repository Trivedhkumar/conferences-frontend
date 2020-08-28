import React from 'react';
import './Conference.css';

export default (props)=>{
    const {conferenceDetails } = props;

    return(
        <div  className='conference' key={conferenceDetails.conference_id}>
            <div className = "heading">{conferenceDetails.confName}</div>
            <div>ENTRY TYPE: {conferenceDetails.entryType}</div>
            <div className = "conference-img"><img src={conferenceDetails.imageURL} alt={conferenceDetails.confName}/></div>
            <div>Conference Starts On : {conferenceDetails.confStartDate}</div>
            <div className = "conference-site"> <a href={conferenceDetails.confUrl} target = "blank">Visit Website</a> </div>

        </div>
   
    );
}