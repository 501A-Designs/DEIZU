import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase, { auth, dataRef } from './firebase';

export default function ScheduleCell(props) {
    const [user] = useAuthState(auth);
    const sheetTitle = props.sTitle;

    const [subjectName, setSubjectName] = useState('');
    const [subjectLinkValue, setSubjectLinkValue] = useState('');
    const [subjectDescription, setSubjectDescription] = useState('');
    const [cellColor, setCellColor] = useState('');
    const cellName = props.cellId;
    const cellClr = props.cellId + "Color";
    const cellLink = props.cellId + "Link";
    const cellDscrp = props.cellId + "Dscrp";
    
    useEffect(() => {
        dataRef.doc(user.uid).get().then((doc) => {
            setSubjectName('');
            setSubjectLinkValue('');
            setSubjectDescription('');
            setCellColor('');
            const dataObject = doc.data().sheets[sheetTitle];
            const cellData = dataObject.cells[cellName];
            const cellNameData = cellData[cellName];
            const cellLinkData = cellData[cellLink];
            const cellDscrpData = cellData[cellDscrp];
            const cellColorData = cellData[cellClr];
            console.log(cellNameData);
            setSubjectName(cellNameData);
            setSubjectLinkValue(cellLinkData);
            setSubjectDescription(cellDscrpData);
            setCellColor(cellColorData);
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    }, [props.thisCellId])

    return (
        <div style={{ margin: '0px', padding: '0px' }}>
            <section
                className={subjectName ? 'cell': 'cellHover'}
                style={{ background: cellColor, border: `1px solid ${cellColor ? cellColor: 'transparent'}`}}
                onClick={props.thisCellId}
            >
                <div>
                    <h2
                        className={subjectName ? 'cellNameHover' : null}
                        datatitle={subjectName ? 'セルを編集' : null}
                    >
                        {subjectName}
                    </h2>
                    {subjectLinkValue ? <a href={subjectLinkValue} target="_blank"><span className="eraseOnMobile">リンク</span>↗</a> : null}
                    {subjectDescription ? <h6 className="displayDescription">{subjectDescription}</h6> : null}
                </div>
            </section>
        </div>
    );
}