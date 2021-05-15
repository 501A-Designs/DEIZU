import React,{useState} from 'react'

import ScheduleGrid from './ScheduleGrid'


export default function WebEditor() {
    const [webInfoPopup, setWebInfoPopup] = useState(false);
    const [bannerStyle, setBannerStyle] = useState({ display: 'block' });

    window.onbeforeunload = confirmExit;
    function confirmExit()
    {
      return "Do you want to leave this page without saving?";
    }
  

    function WebInfo(props) {
        return (props.trigger) ? (
            <div id = "sideBar" >
                <button
                    className="closeBtn"
                    onClick={() => props.setTrigger(false)}
                ></button>
                <h2>ログインされていません</h2>

                <div className="card">
                    ログインするには、こちらのページの上にある「Googleでログイン」と書かれたボタンを押すとアカウントを作成することができます。
                </div>
                
                <button
                  className="standardBtn blueBtn"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href='https://www.notion.so/Schedule-Creator-687747c356924e13ad96b981161d3cd3';
                  }}
                >
                  サイトについて
                </button>
            </div>
        ) : "";
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
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
            
                    {/* 2nd Row */}
                    <h3>２</h3>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    
                    {/* 3rd Row */}
                    <h3>３</h3>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    
                    {/* 4th Row */}
                    <h3>４</h3>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>

                    {/* 5th Row */}
                    <h3>５</h3>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
            
                    {/* 6th Row */}
                    <h3>６</h3>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    
                    {/* 7th Row */}
                    <h3>７</h3>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                    <WebScheduleCell/>
                </section>
            </div>
        )
    
        function WebScheduleCell() {
            const [subjectName, setSubjectValue] = useState('');
            const [style, setStyle] = useState({ display: 'none' });

            function WebPopup() {
                return (
                    <section style={style} className="popupBack">
                        <div className="popup">
                            <button
                                className="closeBtn"
                                onClick={() => {setStyle({display: 'none'})}}
                            ></button>
                            <section>
                                <div className="colors">
                                    <button id="red">赤</button>
                                    <button id="blue">青</button>
                                    <button id="yellow">黄</button>
                                    <button id="green">緑</button>
                                    <button id="peach">桃</button>
                                    <button id="purple">紫</button>
                                </div>
                                <form>                                
                                    <input
                                        type="text"
                                        className="popupInput"
                                        placeholder="科目名"
                                        value={subjectName}
                                        onChange={(txt)=> setSubjectValue(txt.target.value)}
                                    />
                                    <div>
                                    <h2 className="displayTitle">{subjectName ? subjectName: <h4 style={{color:'gray', margin:'0px'}}>プレビュー</h4>}</h2>
                                    {/* <button type="submit">保存</button> */}
                                    </div>
                                </form>
                            </section>
                        </div>
                    </section>
                )
            }
            return (
                <div style={{margin:'0px', padding:'0px'}}>
                    <section
                        className="cell"
                        onClick={() => { setStyle({ display: 'block' }); }}
                    >
                        <h2>{subjectName}</h2>
                        {/* subjectName ? subjectName:  */}
                    </section>
                    <WebPopup />
                </div>
            )
        }
    }
    

    return (
        <>
            <section className="headerGrid">
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{display:'flex', gap:'10px'}}>
                        <h1>時間割を作成！</h1><h6 className="loginStatus" onClick={() => setWebInfoPopup(true)}>💻ウェブエディター版</h6>
                    </div>
                </div>
                <WebInfo trigger={webInfoPopup} setTrigger={setWebInfoPopup}></WebInfo>
            </section>

            <section className="card yellow" style={bannerStyle}>
                <button
                    className="closeBtn"
                    style={{ margin: '-15px' }}
                    onClick={() => { setBannerStyle({ display: 'none' }); }}
                ></button>
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




