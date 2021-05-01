import React from 'react'

import ScheduleGrid from './ScheduleGrid'


export default function WebEditor() {
    return (
        <>
            <section className="headerGrid">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div>
                <h1>時間割を作成！</h1>
                <div className="headerBtn">
                    <button
                        className="standardBtn blueBtn"
                        onClick="http://y-com.jp/"
                    >
                    サイトについて
                    </button>
                </div>
                </div>
            </div>
            </section>
            <section className="card yellow">
            <p>
                Schedule Creator のウェブエディターへようこそ！マスをクリックすると科目を入力できます。作り終わったらスクショ！<br />
                なお、時間割の保存やいくつもの時間割表を作成したい場合はアカウント登録する必要が有ります。<br />
                こちらで作成した時間割表はログインしても保存されません。<br />
            </p>
            </section>
            
            {/* <Popup trigger={btnPopup} setTrigger={setBtnPopup}></Popup>*/}
    
            <input id="titleInput" type="text" placeholder="タイトル" />
            <ScheduleGrid />
        </>
    )
}