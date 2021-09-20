import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

import { MdAddCircle,MdPerson,MdPalette,MdInfo,MdSettings, MdBackspace, MdList, MdCropFree, MdReplay, MdDirectionsRun, MdCode, MdKeyboardArrowUp,MdKeyboardArrowRight,MdKeyboardArrowLeft } from 'react-icons/md';

import firebase,{ auth, db } from './firebase';
import ScheduleGrid from './ScheduleGrid'


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

  // Fetch data
  const saveWallpaper = (w) => {
    w.preventDefault();
    dataRef.doc(user.uid).set({
        url: wallpaperUrl
    }, { merge: true });
    // setWallpaperUrl('');
  }
  function SignOut() {
    return auth.currentUser && (
      <button
        className="standardBtn redBtn"
        onClick={() => {
          auth.signOut();
        }}>
        <MdDirectionsRun className="btnIcon" />
        ログアウト</button>
    )
  }

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
        otherSheetsArray.push(arrayTitle[i] + "/" + firestoreTime);
      }
      setOtherSheets(otherSheetsArray);
    }).catch((error) => {
      console.log("Error getting document:", error);
    })
  }
  useEffect(()=>{
    dataRef.doc(user.uid).get().then((doc) => {
      const wallUrl = doc.data().url;
      setWallpaperUrl(wallUrl);
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }, [])
  
  function NavItem(props) {
    return (
      <>
        <button
          datatitle={props.tip}
          className="standardBtn greyBtn"
          style={{ fontSize: 'large' }}
          onClick={props.onClick}
        >
          {props.icon}
        </button>
      </>
    )
  }
  function SettingButton() {
    return (
      <>
        <button
          datatitle='設定'
          className="standardBtn greyBtn"
          style={{ fontSize: 'large', backgroundColor:`${openSettingsDropdown && 'white'}` }}
          onClick={() => {
            setOpenSheetsDropdown(false);
            setOpenSettingsDropdown(!openSettingsDropdown);
          }}
        >
          {openSettingsDropdown ? <MdKeyboardArrowUp/>:<MdSettings/>}
        </button>
        {openSettingsDropdown && <DropdownSettings/>}
      </>
    )
  }
  function OtherSheetButton() {
    return (
      <>
        <button
          datatitle='他の表'
          className="standardBtn greyBtn"
          style={{ fontSize: 'large', backgroundColor:`${openSheetsDropdown && 'white'}` }}
          onClick={(e) => {
            e.preventDefault();
            setOpenSettingsDropdown(false);
            setOpenSheetsDropdown(!openSheetsDropdown);
            {openSheetsDropdown && getSheetTitles()}
          }}
        >
          {openSheetsDropdown ? <MdKeyboardArrowUp/>:<MdList/>}
        </button>
        {openSheetsDropdown && <DropdownOthersheets/>}
      </>
    )
  }
  function DropdownSettings() {
    function DropdownItem(props) {
      return (
          <a className="dropdownItem" href={props.link} onClick={props.click}>
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
          <DropdownItem leftIcon={<MdInfo />} link={'https://www.notion.so/About-DEIZU-687747c356924e13ad96b981161d3cd3'}>DEIZUについて</DropdownItem>
          <DropdownItem leftIcon={<MdCode/>} link={'https://501a.netlify.app/'}>開発者について</DropdownItem>
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
              <button type="submit" className="standardBtn greenBtn">保存</button>
            </form>
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
                  setTitleValue(`${(item.split('/')[0])}`);
                  setOpenSheetsDropdown(false);
                }}>
                {item.split('/')[0]}
                <time>{item.split('/')[1]}</time>
              </section>;
            });
          } else {
        itemsToRender = <p><h3>作成した時間割表はありません。</h3>作成表が表示されない場合更新ボタンを押して下さい</p>;
      }
      return <>{itemsToRender}</>;
    }
    return (
      <div className="dropdown">
        <div className="alignItems" style={{marginBottom:'10px'}}>
          <button
            style={{ fontSize: 'large' }}
            className="standardBtn greenBtn"
            datatitle="時間割表を作成"
            onClick={
              () => {
                setTitleValue('');
                setOpenSheetsDropdown(false);
              }
            }>
            <MdAddCircle />
          </button>
          <button
            style={{ fontSize: 'large' }}
            className="standardBtn blueBtn"
            datatitle="更新"
            onClick={
              () => {
                getSheetTitles();
              }
            }>
            <MdReplay />
          </button>
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
          <h1>{titleName ? titleName : `${firstName}さんの時間割表`}</h1>
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
          
            <OtherSheetButton/>
          {titleName ?
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
          /> : null}
            <SettingButton />
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
          {titleName ? <ScheduleGrid sheetTitle={titleName} /> : <p>［スーパーインプット］でタイトルを指定する必要がございます。<br/>なお、タイトルは一度指定すると変更することができませんのでご了承下さい。<br/>スーパーインプットはタイトルの指定以外にも、他の表のタイトルを入力すると時間割表が表示されので検索バーとしても使用できます。</p>}
        </section>
      </div>
    </>
  )
}