import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export default function WebEditor() {
    window.onbeforeunload = confirmExit;
    function confirmExit()
    {
      return "保存せずにこのページを終了しますか？";
    }

    function WebScheduleCell() {
        const [modalIsOpen, setIsOpen] = React.useState(false);
        const [subjectName, setSubjectValue] = useState('');
        const [cellColor, setCellColor] = useState('');

        const handleChanges = (e) => {
            setSubjectValue(e.target.value);
        }
        return (
            <div style={{ margin: '0px', padding: '0px' }}>    
                <section
                    className="cell"
                    id={cellColor}
                    onClick={() => setIsOpen(true)}>
                    <h2>{subjectName}</h2>
                    {/* subjectName ? subjectName:  */}
                </section>
                <Modal isOpen={modalIsOpen} className="popup">
                    <div className="closeBtn">
                        <button type="submit" onClick={() => setIsOpen(false)}></button>
                    </div>
                    <div className="centerAll">
                        <h2 className="displayTitle" id={cellColor}>{subjectName ? subjectName: <h4 style={{color:'gray', margin:'0px'}}>科目名</h4>}</h2>
                        <div className="colors">
                            <button id="red" onClick={() => { setCellColor('red') }}>赤</button>
                            <button id="blue" onClick={() => { setCellColor('blue') }}>青</button>
                            <button id="yellow" onClick={() => { setCellColor('yellow') }}>黄</button>
                            <button id="green" onClick={() => { setCellColor('green') }}>緑</button>
                            <button id="peach" onClick={() => { setCellColor('peach') }}>桃</button>
                            <button id="purple" onClick={() => { setCellColor('purple') }}>紫</button>
                        </div>
                        <form>
                            <input
                                type="text"
                                className="popupInput"
                                placeholder="科目名"
                                value={subjectName}
                                onChange={handleChanges}
                            />
                            <button type="submit" className="saveBtn" onClick={() => setIsOpen(false)}></button>
                        </form>
                    </div>
                </Modal>
          </div>
        );
    }

    function WebScheduleGrid() {
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
                    {/* <Dang/> */}
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
            
                    {/* 2nd Row */}
                    <h3>２</h3>
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    
                    {/* 3rd Row */}
                    <h3>３</h3>
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    
                    {/* 4th Row */}
                    <h3>４</h3>
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />

                    {/* 5th Row */}
                    <h3>５</h3>
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
            
                    {/* 6th Row */}
                    <h3>６</h3>
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    
                    {/* 7th Row */}
                    <h3>７</h3>
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                    <WebScheduleCell />
                </section>
            </div>
        )
    }
    

    return (
        <>
            <section className="alignItems">
                <h1>時間割を作成！</h1>
                <div className="webStatus">
                    <h5></h5>
                </div>
            </section>

            <section className="card yellow">
                <p>
                    Schedule Creator のウェブエディターへようこそ！マスをクリックすると科目を入力できます。作り終わったらスクショ！<br />
                    なお、時間割の保存やいくつもの時間割表を作成したい場合はアカウント登録する必要が有ります。<br />
                    こちらで作成した時間割表はログインしても保存されません。<br />
                </p>
            </section>
            <WebScheduleGrid/>            
        </>
    )
}


