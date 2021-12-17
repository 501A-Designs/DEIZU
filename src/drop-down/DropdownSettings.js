import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, dataRef } from '../firebase';
import {MdPerson,MdPalette,MdInfo, MdOutlineBugReport,MdDirectionsRun, MdCode,MdKeyboardArrowRight,MdKeyboardArrowLeft,MdSave } from 'react-icons/md';

import ThemeButton from '../buttons/ThemeButton'
import ThemeColorButton from '../buttons/ThemeColorButton'
import DropdownItem from './DropdownItem'
import DeizuButton from '../buttons/DeizuButton'
import GradeButton from '../buttons/GradeButton'
import SubmenuBox from '../components/SubmenuBox'

// imgs
import Default from '../img/deizu-default.png'
import Round from '../img/deizu-round.png'
import Square from '../img/deizu-square.png'
import Cutout from '../img/deizu-cutout.png'

import { Colors } from '../theme-data/themeColors'
import { Themes } from '../theme-data/theme'

export default function DropdownSettings(props) {
    const [user] = useAuthState(auth);
    const fullName = auth.currentUser.displayName;
    const firstName = fullName.split(" ")[0];
    const [wallpaperUrl, setWallpaperUrl] = useState(props.wallpaperUrl);  
  
    const [activeMenu, setActiveMenu] = useState({display: 'none'})
    const [unActiveMenu, setUnActiveMenu] = useState({ display: 'block' })
    const [activeMenu2, setActiveMenu2] = useState({ display: 'none' })
    
  const gradeValue = props.gradeValue;

    // Set data
    const saveWallpaper = (w) => {
        w.preventDefault();
        dataRef.doc(user.uid).set({
        url: wallpaperUrl
        }, { merge: true });
        alert('壁紙が保存されました。変更を見るにはページをリロードする必要がございます。');
    }

    // Function for multilevel dropdow menu
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
    return (
      <div className="dropdown">
        <div style={unActiveMenu}>
          <DropdownItem
            leftIcon={<MdPerson />}
            rightIcon={<MdKeyboardArrowRight />}
            click={() => showProfile()}>
            {firstName}のプロフィール
          </DropdownItem>
          <DropdownItem
            leftIcon={<MdPalette />}
            rightIcon={<MdKeyboardArrowRight />}
            click={() => showCustomize()}>
            カスタマイズ
          </DropdownItem>
          <DropdownItem
            leftIcon={<MdInfo />}
            link={'https://deizu.vercel.app/'}>
            DEIZUについて
          </DropdownItem>
          <DropdownItem
            leftIcon={<MdOutlineBugReport />}
            link={'https://github.com/501A-Designs/DEIZU'}>
            DEIZUのGitHub
          </DropdownItem>
          <DropdownItem
            leftIcon={<MdCode />}
            link={'https://501a.netlify.app/'}>
            開発者について
          </DropdownItem>
        </div>
        <div style={activeMenu}>
          <DropdownItem leftIcon={<MdKeyboardArrowLeft />} click={() => hideProfile()}>戻る</DropdownItem>
          <SubmenuBox header={'プロフィール'}>
            <div className="profileSectionFlex">
              <img src={user.photoURL}/>
              <div>
                <h3>{fullName}</h3>
                <small>{user.email}</small>
              </div>
            </div>
            <SignOut />
          </SubmenuBox>
          <SubmenuBox header={'科目の系統'} text={`自分にあったモードを選んで下さい：`}>
            <GradeButton
              gradeValue={gradeValue}
              setToIb={props.setToIb}
              setToHighschool={props.setToHighschool}
              setToUniversity={props.setToUniversity}
              setToCustom={props.setToCustom}
            />
          </SubmenuBox>
        </div>
        <div style={activeMenu2}>
          <DropdownItem leftIcon={<MdKeyboardArrowLeft />} click={() => hideCustomize()}>戻る</DropdownItem>
          <SubmenuBox header={'壁紙の変更'} text={'インターネットにある画像のURLを貼るだけでシート全体における壁紙を指定することができます。'}>
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
            </form>
          </SubmenuBox>
          <SubmenuBox header={'テーマの変更'} text={'自分の好みにあった形状を選ぶことができます。'}>
            <ThemeButton
                systemCornerStyle={props.systemCornerStyle}
                cornerData={Themes.default}
                btnImg={Default}
                btnName="デフォルト"
            />
            <ThemeButton
                systemCornerStyle={props.systemCornerStyle}
                cornerData={Themes.round}
                btnImg={Round}
                btnName="真ん丸"
            />
            <ThemeButton
                systemCornerStyle={props.systemCornerStyle}
                cornerData={Themes.square}
                btnImg={Square}
                btnName="しかく"
            />
            <ThemeButton
                systemCornerStyle={props.systemCornerStyle}
                cornerData={Themes.cutout}
                btnImg={Cutout}
                btnName="切り抜き"
            />
            <ThemeButton
                systemCornerStyle={props.systemCornerStyle}
                cornerData={Themes.tearDrop}
                btnImg={null}
                btnName="ティアドロップ"
            />
            <ThemeButton
                systemCornerStyle={props.systemCornerStyle}
                cornerData={Themes.abstract}
                btnImg={null}
                btnName="アブストラクト"
            />
          </SubmenuBox>
          <SubmenuBox header={'色の変更'} text={'自分の好みにあった色を選ぶことができます。'}>
            <div className="slideSide">            
                <ThemeColorButton
                    btnTitle="デフォルト"
                    systemColorStyle={props.systemColorStyle}
                    btnTabColors={Colors.default}
                />
                <ThemeColorButton
                    btnTitle="ライトモード"
                    systemColorStyle={props.systemColorStyle}
                    btnTabColors={Colors.light}
                />
                <ThemeColorButton
                    btnTitle="ダークモード"
                    systemColorStyle={props.systemColorStyle}
                    btnTabColors={Colors.greyBlack}
                />
                <ThemeColorButton
                    btnTitle="水色"
                    systemColorStyle={props.systemColorStyle}
                    btnTabColors={Colors.blueWhite}
                />
                <ThemeColorButton
                    btnTitle="黄色"
                    systemColorStyle={props.systemColorStyle}
                    btnTabColors={Colors.yellowGrey}
                />
                <ThemeColorButton
                    btnTitle="茶色"
                    systemColorStyle={props.systemColorStyle}
                    btnTabColors={Colors.brown}
                />
                <ThemeColorButton
                    btnTitle="枝豆色"
                    systemColorStyle={props.systemColorStyle}
                    btnTabColors={Colors.lightGreen}
                />
                <ThemeColorButton
                    btnTitle="オレンジ"
                    systemColorStyle={props.systemColorStyle}
                    btnTabColors={Colors.deepOrange}
                />
                <ThemeColorButton
                    btnTitle="藍色"
                    systemColorStyle={props.systemColorStyle}
                    btnTabColors={Colors.blueGrey}
                />
                <ThemeColorButton
                    btnTitle="パープル"
                    systemColorStyle={props.systemColorStyle}
                    btnTabColors={Colors.deepPurple}
                />
            </div>
          </SubmenuBox>
        </div>
      </div>
    )
  }