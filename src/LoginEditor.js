import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

import { MdAddCircle,MdPerson,MdPalette,MdInfo,MdSettings, MdOutlineBugReport, MdList, MdCropFree, MdReplay,MdDelete, MdDirectionsRun, MdCode,MdKeyboardArrowRight,MdKeyboardArrowLeft,MdSave } from 'react-icons/md';

import firebase, { auth, db, root } from './firebase';
import ScheduleGrid from './ScheduleGrid'
import DeizuButton from './buttons/DeizuButton'
import ToggleButton from './buttons/ToggleButton';
import ThemeButton from './buttons/ThemeButton'
import ThemeColorButton from './buttons/ThemeColorButton'
import { Colors } from './themeColors'

// imgs
import Default from './img/deizu-default.png'
import Round from './img/deizu-round.png'
import Square from './img/deizu-square.png'
import Cutout from './img/deizu-cutout.png'


export default function LoginEditor(prop) {
  // User related
  const [user] = useAuthState(auth);
  const fullName = auth.currentUser.displayName;
  const firstName = fullName.split(" ")[0];
  const [wallpaperUrl, setWallpaperUrl] = useState('');
  const dataRef = db.collection('users');

  // Dropdown functionality
  const [openSettingsDropdown, setOpenSettingsDropdown] = useState(false);
  const [openSheetsDropdown, setOpenSheetsDropdown] = useState(false);
  const [otherSheets, setOtherSheets] = useState();
  const otherSheetsArray = [];

  // Dropdown multilayer functionality
  const [activeMenu, setActiveMenu] = useState({display: 'none'})
  const [unActiveMenu, setUnActiveMenu] = useState({ display: 'block' })
  const [activeMenu2, setActiveMenu2] = useState({display: 'none'})
  
  // Screenshots & tites
  const [style, setStyle] = useState({ display: 'none' });
  const [titleName, setTitleValue] = useState(prop.dashSheetTitle);
  const [screenshotFrame, setScreenshotFrame] = useState('');

  // Theme State From Dashboard
  const [systemCornerStyle, setSystemCornerStyle] = useState(prop.systemCornerProp);
  const [systemColorStyle, setSystemColorStyle] = useState(prop.systemColorProp);

  // Theme Color
  const cDefault = () => {
    setSystemColorStyle(
      [
        Colors.default.system0,
        Colors.default.system1,
        Colors.default.system3,
        Colors.default.system3,
        Colors.default.txtColor0,
        Colors.default.txtColor1
      ]
    );
  }
  const cLight = () => {
    setSystemColorStyle(
      [
        Colors.light.system0,
        Colors.light.system1,
        Colors.light.system3,
        Colors.light.system3,
        Colors.light.txtColor0,
        Colors.light.txtColor1
      ]
    );
  }
  const cYellowGrey = () => {
      setSystemColorStyle(
        [
          Colors.yellowGrey.system0,
          Colors.yellowGrey.system1,
          Colors.yellowGrey.system3,
          Colors.yellowGrey.system3,
          Colors.yellowGrey.txtColor0,
          Colors.yellowGrey.txtColor1
        ]
      );
  }
  const cGreyBlack = () => {
      setSystemColorStyle(
        [
          Colors.greyBlack.system0,
          Colors.greyBlack.system1,
          Colors.greyBlack.system2,
          Colors.greyBlack.system3,
          Colors.greyBlack.txtColor0,
          Colors.greyBlack.txtColor1
        ]
      );
  }
  const cBrown = () => {
      setSystemColorStyle(
        [
          Colors.brown.system0,
          Colors.brown.system1,
          Colors.brown.system2,
          Colors.brown.system3,
          Colors.brown.txtColor0,
          Colors.brown.txtColor1
        ]
      );
  }
  const cBlueWhite = () => {
    setSystemColorStyle(
      [
        Colors.blueWhite.system0,
        Colors.blueWhite.system1,
        Colors.blueWhite.system2,
        Colors.blueWhite.system3,
        Colors.blueWhite.txtColor0,
        Colors.blueWhite.txtColor1
      ]
    );
  }
  const cLightGreen = () => {
    setSystemColorStyle(
      [
        Colors.lightGreen.system0,
        Colors.lightGreen.system1,
        Colors.lightGreen.system2,
        Colors.lightGreen.system3,
        Colors.lightGreen.txtColor0,
        Colors.lightGreen.txtColor1
      ]
    );
  }
  const cDeepOrange = () => {
    setSystemColorStyle(
      [
        Colors.deepOrange.system0,
        Colors.deepOrange.system1,
        Colors.deepOrange.system2,
        Colors.deepOrange.system3,
        Colors.deepOrange.txtColor0,
        Colors.deepOrange.txtColor1
      ]
    );
  }
  const cBlueGrey = () => {
    setSystemColorStyle(
      [
        Colors.blueGrey.system0,
        Colors.blueGrey.system1,
        Colors.blueGrey.system2,
        Colors.blueGrey.system3,
        Colors.blueGrey.txtColor0,
        Colors.blueGrey.txtColor1
      ]
    );
  }
  const cDeepPurple = () => {
    setSystemColorStyle(
      [
        Colors.deepPurple.system0,
        Colors.deepPurple.system1,
        Colors.deepPurple.system2,
        Colors.deepPurple.system3,
        Colors.deepPurple.txtColor0,
        Colors.deepPurple.txtColor1
      ]
    );
  }

  function rDefault() { setSystemCornerStyle(['5px','10px'])};
  function r20() {setSystemCornerStyle(['20px','30px'])};
  function r0() {setSystemCornerStyle(['0px','0px'])};
  function rUnique() {setSystemCornerStyle(['0px 15px 10px 30px','30px'])};
  function rCut() { setSystemCornerStyle(['10% / 50%','30px'])};
  function rUnique() { setSystemCornerStyle(['0px 15px 10px 30px','30px'])};
  function rArt() { setSystemCornerStyle(['37% 63% 41% 59% / 67% 54% 46% 33%','30px'])};

  // Fetch data
  const saveWallpaper = (w) => {
    w.preventDefault();
    dataRef.doc(user.uid).set({
      url: wallpaperUrl
    }, { merge: true });
    alert('壁紙を保存できました');
    // setWallpaperUrl('');
  }
  const saveTheme = () => {
    dataRef.doc(user.uid).set({
      theme: systemCornerStyle
    }, { merge: true });
    alert('テーマを保存できました');
  }
  const saveThemeColor = () => {
    dataRef.doc(user.uid).set({
      themeColor: systemColorStyle
    }, { merge: true });
    alert('色を保存できました');
  }

  function SignOut() {
    return auth.currentUser && (
      <DeizuButton
        btnIcon={<MdDirectionsRun className="iconBtn" />}
        btnName="ログアウト"
        btnClick={() => {
          auth.signOut();
        }}
      />
    )
  }
  useEffect(() => {
    document.title=`${titleName}`
    root?.style.setProperty("--r5", systemCornerStyle[0]);
    root?.style.setProperty("--r10", systemCornerStyle[1]);
    root?.style.setProperty("--system0", systemColorStyle[0]);
    root?.style.setProperty("--system1", systemColorStyle[1]);
    root?.style.setProperty("--system2", systemColorStyle[2]);
    root?.style.setProperty("--system3", systemColorStyle[3]);
    root?.style.setProperty("--txtColor0", systemColorStyle[4]);
    root?.style.setProperty("--txtColor1", systemColorStyle[5]);
  })

  const showProfile = () => {
    setActiveMenu({ display: 'block' })
    setUnActiveMenu({display:'none'})
  }
  const hideProfile = () => {
    setActiveMenu({display:'none'})
    setUnActiveMenu({ display: 'block' })
  }
  const showCustomize = () => {
    setActiveMenu2({ display: 'block' })
    setUnActiveMenu({display:'none'})
  }
  const hideCustomize = () => {
    setActiveMenu2({display:'none'})
    setUnActiveMenu({ display: 'block' })
  }


  const getSheetTitles = () => {
    console.log("fetch");
    dataRef.doc(user.uid).get().then((doc) => {
      const titleForOtherSheets = doc.data().sheets;
      const arrayTitle = Object.keys(titleForOtherSheets);

      for (let i = 0; i < arrayTitle.length; i++) {
        const firestoreTime = Object.values(titleForOtherSheets)[i].date.toDate().toDateString();
        otherSheetsArray.push(arrayTitle[i] + '$' + firestoreTime);
      }
      setOtherSheets(otherSheetsArray);
    }).catch((error) => {
      console.log("Error getting document:", error);
    })
  }
  
  useEffect(() => {
    dataRef.doc(user.uid).get().then((doc) => {
      const wallUrl = doc.data().url;
      setWallpaperUrl(wallUrl);
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
    console.log("fetch");
  },[])
  
  function NavItem(props) {
    return (
      <>
        <button
          datatitle={props.tip}
          className="standardBtn greyBtn iconBtn"
          onClick={props.onClick}
        >
          {props.icon}
        </button>
      </>
    )
  }

  function DropdownSettings() {
    function DropdownItem(props) {
      return (
        <a
          className="dropdownItem"
          href={props.link}
          onClick={props.click}>
          <span className="dropdownLeftIcon">{props.leftIcon}</span>
          {props.children}
          <span className="dropdownRightIcon">{props.rightIcon}</span>
        </a>
      )
    }
    return (
      <div className="dropdown">
        <div style={unActiveMenu}>
          <DropdownItem leftIcon={<MdPerson/>} rightIcon={<MdKeyboardArrowRight/>} click={()=>showProfile()}>{firstName}のプロフィール</DropdownItem>
          <DropdownItem leftIcon={<MdPalette/>} rightIcon={<MdKeyboardArrowRight/>} click={() => showCustomize()}>カスタマイズ</DropdownItem>
          <DropdownItem leftIcon={<MdInfo />} link={'https://deizu.vercel.app/'}>DEIZUについて</DropdownItem>
          <DropdownItem leftIcon={<MdOutlineBugReport/>} link={'https://github.com/501A-Designs/DEIZU'}>DEIZUのGitHub</DropdownItem>
          <DropdownItem leftIcon={<MdCode />} link={'https://501a.netlify.app/'}>開発者について</DropdownItem>
        </div>
        <div style={activeMenu}>
          <DropdownItem leftIcon={<MdKeyboardArrowLeft />} click={() => hideProfile()}>戻る</DropdownItem>
          <div className="submenuBox">
            <div className="profileSectionFlex">
              <img src={ user.photoURL}/>
              <div>
                <h3>{fullName}</h3>
                <small>{user.email}</small>
              </div>
            </div>
            <SignOut />
          </div>
        </div>
        <div style={activeMenu2}>
          <DropdownItem leftIcon={<MdKeyboardArrowLeft />} click={() => hideCustomize()}>戻る</DropdownItem>
          <div className="submenuBox">
            <h3>壁紙の変更</h3>
            <p>インターネットにある画像のURLを貼るだけでシート全体における壁紙を指定することができます。</p>
            <form onSubmit={saveWallpaper} className="alignItems">
              <input
                className="deizuInput"
                placeholder="URLリンク"
                value={wallpaperUrl}
                onChange={(w) => setWallpaperUrl(w.target.value)}
              />
              <DeizuButton
                btnIcon={<MdSave className="iconBtn" />}
                btnName="保存"
                btnType={"submit"}
              />
              {/* <button type="submit" className="standardBtn greenBtn">保存</button> */}
            </form>
          </div>
          <div className="submenuBox">
            <div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems: 'center'}}>
                <h3>テーマの変更</h3>
                <DeizuButton
                    btnClick={saveTheme}
                    btnIcon={<MdSave className="iconBtn" />}
                    btnName="保存"
                    />
              </div>
              <p>自分の好みにあった形状を選ぶことができます。</p>
            </div>
            <ThemeButton
                btnClick={rDefault}
                btnImg={Default}
                btnName="デフォルト"
            />
            <ThemeButton
                btnClick={r20}
                btnImg={Round}
                btnName="真ん丸"
            />
            <ThemeButton
                btnClick={r0}
                btnImg={Square}
                btnName="しかく"
            />
            <ThemeButton
                btnClick={rCut}
                btnImg={Cutout}
                btnName="切り抜き"
            />
            <ThemeButton
                btnClick={rUnique}
                btnImg={null}
                btnName="ティアドロップ"
            />
            <ThemeButton
                btnClick={rArt}
                btnImg={null}
                btnName="アブストラクト"
            />
          </div>
          <div className="submenuBox">
            <div>
              <div style={{display:'flex', justifyContent:'space-between', alignItems: 'center'}}>
                <h3>色の変更</h3>
                <DeizuButton
                    btnClick={saveThemeColor}
                    btnIcon={<MdSave className="iconBtn" />}
                    btnName="保存"
                    />
              </div>
              <p>自分の好みにあった色を選ぶことができます。</p>
            </div>
            <div className="slideSide">
              <ThemeColorButton
                btnClick={cDefault}
                btnTabColor0={Colors.default.system0}
                btnTabColor1={Colors.default.system1}
                btnTabColor2={Colors.default.system2}
                btnTabColor3={Colors.default.system3}
              />
              <ThemeColorButton
                btnClick={cLight}
                btnTabColor0={Colors.light.system0}
                btnTabColor1={Colors.light.system1}
                btnTabColor2={Colors.light.system2}
                btnTabColor3={Colors.light.system3}
              />
              <ThemeColorButton
                btnClick={cGreyBlack}
                btnTabColor0={Colors.greyBlack.system0}
                btnTabColor1={Colors.greyBlack.system1}
                btnTabColor2={Colors.greyBlack.system2}
                btnTabColor3={Colors.greyBlack.system3}
              />
              <ThemeColorButton
                btnClick={cBlueWhite}
                btnTabColor0={Colors.blueWhite.system0}
                btnTabColor1={Colors.blueWhite.system1}
                btnTabColor2={Colors.blueWhite.system2}
                btnTabColor3={Colors.blueWhite.system3}
              />
              <ThemeColorButton
                btnClick={cYellowGrey}
                btnTabColor0={Colors.yellowGrey.system0}
                btnTabColor1={Colors.yellowGrey.system1}
                btnTabColor2={Colors.yellowGrey.system2}
                btnTabColor3={Colors.yellowGrey.system3}
              />
              <ThemeColorButton
                btnClick={cBrown}
                btnTabColor0={Colors.brown.system0}
                btnTabColor1={Colors.brown.system1}
                btnTabColor2={Colors.brown.system2}
                btnTabColor3={Colors.brown.system3}
              />
              <ThemeColorButton
                btnClick={cLightGreen}
                btnTabColor0={Colors.lightGreen.system0}
                btnTabColor1={Colors.lightGreen.system1}
                btnTabColor2={Colors.lightGreen.system2}
                btnTabColor3={Colors.lightGreen.system3}
              />
              <ThemeColorButton
                btnClick={cDeepOrange}
                btnTabColor0={Colors.deepOrange.system0}
                btnTabColor1={Colors.deepOrange.system1}
                btnTabColor2={Colors.deepOrange.system2}
                btnTabColor3={Colors.deepOrange.system3}
              />
              <ThemeColorButton
                btnClick={cBlueGrey}
                btnTabColor0={Colors.blueGrey.system0}
                btnTabColor1={Colors.blueGrey.system1}
                btnTabColor2={Colors.blueGrey.system2}
                btnTabColor3={Colors.blueGrey.system3}
              />
              <ThemeColorButton
                btnClick={cDeepPurple}
                btnTabColor0={Colors.deepPurple.system0}
                btnTabColor1={Colors.deepPurple.system1}
                btnTabColor2={Colors.deepPurple.system2}
                btnTabColor3={Colors.deepPurple.system3}
              />
              
            </div>
          </div>
        </div>
      </div>
    )
  }
  function DropdownOthersheets() {
    function OtherSheet() {
      let itemsToRender;
      if (otherSheets) {
        itemsToRender = otherSheets.map(item => {
            return <section
                    className="dropdownItemSheet"
                    key={item}
                    onClick={() => {
                      setTitleValue(`${(item.split('$')[0])}`);
                      setOpenSheetsDropdown(false);
                    }}>{item.split('$')[0]}
                <time>{item.split('$')[1]}</time>
              </section>;
            });
          } else {
        itemsToRender = <p style={{color:'var(--txtColor0'}}><h3>作成した時間割表はありません。</h3>作成した表が表示されない場合更新ボタンを押して下さい</p>;
      }
      return <>{itemsToRender}</>;
    }
    return (
      <div className="dropdown">
        <div className="alignItems" style={{ marginBottom: '10px' }}>
          <DeizuButton
            btnIcon={<MdAddCircle className="iconBtn" />}
            btnName=""
            btnTitle="時間割表を作成"
            btnClick={() => {
              setTitleValue('');
              setOpenSheetsDropdown(false);
            }}
          />
          <DeizuButton
            btnIcon={<MdReplay className="iconBtn" />}
            btnName=""
            btnTitle="更新"
            btnClick={() => {
              getSheetTitles();
            }}
          />
        </div>
        <OtherSheet/>
      </div>
    )
  }

  return (
    <>
    {wallpaperUrl ? <img className="backgroundImg" src={wallpaperUrl} alt="壁紙は指定されていません" /> : null}
    <div className="loginEditor">
      {/* <Menu /> */}
      <section className="alignItems spaceBetween printNull">
        <div className="alignItems">
          <h1 className="classicHeader">{titleName ? titleName : `${firstName}さんの時間割表`}</h1>
        </div>
          
        <div className="alignItems" style={{alignItems:'stretch'}}>
          <input
              className="deizuInput"
              id="titleInput"
              type="text"
              placeholder="スーパーインプット"
              value={titleName}
              onChange={(e) => {
                setTitleValue(e.target.value);
                setOpenSettingsDropdown(false);
                setOpenSheetsDropdown(false);
              }}
          />
          
            <ToggleButton
              btnTitle="他の表"
              btnIcon={<MdList />}
              dropDownState={openSheetsDropdown}
              btnClick={(e) => {
                e.preventDefault();
                setOpenSettingsDropdown(false);
                setOpenSheetsDropdown(!openSheetsDropdown);
                getSheetTitles();
              }}
              dropDownComponent={<DropdownOthersheets/>}
            />
            {titleName ?
              <>
                <NavItem
                  tip={'スクショモード'}
                  icon={<MdCropFree />}
                  onClick={
                    () => {
                      alert("「CTRL & -」または「Command & -」 でズームアウト")
                      setStyle({ display: 'block' });
                      setScreenshotFrame('screenshotMode');
                      setOpenSettingsDropdown(false);
                      setOpenSheetsDropdown(false);
                    }
                  }
                />
                <NavItem
                  tip={'時間割表を消去'}
                  icon={<MdDelete />}
                  onClick={
                    () => {
                      var resault = window.confirm("今開いている時間割表を消去したいですか？一度消去すると復旧することはできません。");
                      if (resault == true) {
                        dataRef.doc(user.uid).set({
                          sheets:{
                            [titleName]: firebase.firestore.FieldValue.delete()
                          }
                        }, { merge: true })
                        setTitleValue('');
                      }
                    }
                  }
                />
              </>
              : null}
            {/* <SettingButton /> */}
            <ToggleButton
              btnTitle="設定"
              btnIcon={<MdSettings />}
              dropDownState={openSettingsDropdown}
              btnClick={() => {
                setOpenSheetsDropdown(false);
                setOpenSettingsDropdown(!openSettingsDropdown);
              }}
              dropDownComponent={<DropdownSettings/>}
            />
        </div>
      </section>

        <div
          className="backdrop"
          style={style}
          onClick={() => {
            setStyle({ display: 'none' });
            setScreenshotFrame('');
          }
          }>
        </div>
        <section className={screenshotFrame} style={{overflowX: 'scroll', borderRadius:'20px'}}>
          <h1 className="screenshotTitle">{titleName}</h1>
          {titleName ? <ScheduleGrid corner={systemCornerStyle} selectorColor={systemColorStyle} sheetTitle={titleName} /> : <p>［スーパーインプット］でタイトルを指定する必要がございます。<br/>なお、タイトルは一度指定すると変更することができませんのでご了承下さい。<br/>スーパーインプットはタイトルの指定以外にも、他の表のタイトルを入力すると時間割表が表示されので検索バーとしても使用できます。</p>}
        </section>
      </div>
    </>
  )
}