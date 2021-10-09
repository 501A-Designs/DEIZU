import React, { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

import { MdAddCircle,MdPerson,MdPalette,MdInfo,MdSettings, MdBackspace, MdList, MdCropFree, MdReplay, MdDirectionsRun, MdCode, MdKeyboardArrowUp,MdKeyboardArrowRight,MdKeyboardArrowLeft,MdSave } from 'react-icons/md';

import { auth, db, root } from './firebase';
import ScheduleGrid from './ScheduleGrid'
import DeizuButton from './DeizuButton'
import ThemeButton from './ThemeButton'
import ThemeColorButton from './ThemeColorButton'
import {Colors} from './themeColors'




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
  const [smallCornerStyle, setSmallCornerStyle] = useState(prop.dSCS);
  const [largeCornerStyle, setLargeCornerStyle] = useState(prop.dLCS);
  const [systemColorStyle, setSystemColorStyle] = useState(prop.systemColorProp);

  // Theme Color
  const cDefault = () => {
    setSystemColorStyle(
      [
        Colors.default.system0,
        Colors.default.system1,
        Colors.default.system3,
        Colors.default.system3,
        Colors.default.txtColor0
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
          Colors.yellowGrey.txtColor0
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
          Colors.greyBlack.txtColor0
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
          Colors.brown.txtColor0
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
        Colors.blueWhite.txtColor0
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
        Colors.lightGreen.txtColor0
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
        Colors.deepOrange.txtColor0
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
        Colors.blueGrey.txtColor0
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
        Colors.deepPurple.txtColor0
      ]
    );
  }

  function rDefault() { setSmallCornerStyle('5px'); setLargeCornerStyle('10px'); };
  function r20() {setSmallCornerStyle('20px');setLargeCornerStyle('30px'); };
  function r0() {setSmallCornerStyle('0px');setLargeCornerStyle('0px'); };
  function rUnique() {setSmallCornerStyle('0px 15px 10px 30px');setLargeCornerStyle('30px'); };
  function rCut() { setSmallCornerStyle('10% / 50%'); setLargeCornerStyle('30px'); };
  function rUnique() { setSmallCornerStyle('0px 15px 10px 30px'); setLargeCornerStyle('30px'); };
  function rArt() { setSmallCornerStyle('37% 63% 41% 59% / 67% 54% 46% 33%'); setLargeCornerStyle('30px'); };

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
      theme: smallCornerStyle+"$"+largeCornerStyle
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
        btnClass="redBtn"
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
    root?.style.setProperty("--r5", smallCornerStyle);
    root?.style.setProperty("--r10", largeCornerStyle);
    root?.style.setProperty("--system0", systemColorStyle[0]);
    root?.style.setProperty("--system1", systemColorStyle[1]);
    root?.style.setProperty("--system2", systemColorStyle[2]);
    root?.style.setProperty("--system3", systemColorStyle[3]);
    root?.style.setProperty("--txtColor0", systemColorStyle[4]);
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
        otherSheetsArray.push(arrayTitle[i] + "/" + firestoreTime);
      }
      setOtherSheets(otherSheetsArray);
    }).catch((error) => {
      console.log("Error getting document:", error);
    })
  }
  useEffect(() => {
    dataRef.doc(user.uid).get().then((doc) => {
      // const themeData = doc.data().theme;
      // const smallCorners = themeData.split('$')[0];
      // const largeCorners = themeData.split('$')[1];
      // console.log(smallCorners + " - " + largeCorners);
      // setSmallCornerStyle(smallCorners);
      // setLargeCornerStyle(largeCorners);
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
          className="standardBtn greyBtn iconBtn"
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
          className="standardBtn greyBtn iconBtn"
          style={{backgroundColor:`${openSettingsDropdown && 'var(--system1)'}`}}
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
          className="standardBtn greyBtn iconBtn"
          style={{backgroundColor:`${openSheetsDropdown && 'var(--system1)'}`}}
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
              <DeizuButton
                btnClass="greenBtn"
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
                    btnClass="greenBtn"
                    btnClick={saveTheme}
                    btnIcon={<MdSave className="iconBtn" />}
                    btnName="保存"
                    />
              </div>
              <p>自分の好みにあった形状を選ぶことができます。</p>
            </div>
            <ThemeButton
                btnClick={rDefault}
                btnImg={null}
                btnName="デフォルト"
            />
            <ThemeButton
                btnClick={r20}
                btnImg={null}
                btnName="真ん丸"
            />
            <ThemeButton
                btnClick={r0}
                btnImg={null}
                btnName="しかく"
            />
            <ThemeButton
                btnClick={rCut}
                btnImg={null}
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
                    btnClass="greenBtn"
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
                  setTitleValue(`${(item.split('/')[0])}`);
                  setOpenSheetsDropdown(false);
                }}>
                {item.split('/')[0]}
                <time>{item.split('/')[1]}</time>
              </section>;
            });
          } else {
        itemsToRender = <p style={{color:'var(--txtColor0'}}><h3>作成した時間割表はありません。</h3>作成表が表示されない場合更新ボタンを押して下さい</p>;
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
          {titleName ? <ScheduleGrid corner={smallCornerStyle} selectorColor={systemColorStyle} sheetTitle={titleName} /> : <p>［スーパーインプット］でタイトルを指定する必要がございます。<br/>なお、タイトルは一度指定すると変更することができませんのでご了承下さい。<br/>スーパーインプットはタイトルの指定以外にも、他の表のタイトルを入力すると時間割表が表示されので検索バーとしても使用できます。</p>}
        </section>
      </div>
    </>
  )
}