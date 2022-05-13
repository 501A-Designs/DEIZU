import { useState, useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { MdAddCircle, MdSettings, MdList, MdCropFree, MdDelete, MdLibraryAdd, MdPrint } from 'react-icons/md';

import firebase, { auth, root, dataRef } from './firebase';

import ScheduleGrid from './ScheduleGrid'
import DeizuButton from './buttons/DeizuButton'
import ToggleButton from './buttons/ToggleButton';
import DropdownSettings from './drop-down/DropdownSettings';
import NavItem from './buttons/NavItem'
import QuickSubjectInsertModal from './components/QuickSubjectInsertModal'

export default function LoginEditor(prop) {
  // User related
  const [user] = useAuthState(auth);
  const fullName = auth.currentUser.displayName;
  const firstName = fullName.split(" ")[0];
  const [wallpaperUrl, setWallpaperUrl] = useState('');
  const [quickSubjectInsertModalIsOpen, setQuickSubjectInsertModalIsOpen] = useState(false);


  const [subjectSuggestionTypeData, setSubjectSuggestionTypeData] = useState();
  useEffect(() => {
    dataRef.doc(user.uid).get().then((doc) => {
      setSubjectSuggestionTypeData(doc.data().subjectSuggestionType);
    }).catch((error) => {
      console.log("Error getting document:", error);
    });
  }, [])
  const [gradeValue, setGradeValue] = useState(subjectSuggestionTypeData);

  const openQuickSubjectInsertModal = () => {
    setOpenSheetsDropdown(false);
    setQuickSubjectInsertModalIsOpen(true)
  };
  const closeQuickSubjectInsertModal = () => setQuickSubjectInsertModalIsOpen(false);

  function setSubjectSuggestion(prop) {
    setGradeValue(prop);
    dataRef.doc(user.uid).set({
      subjectSuggestionType: prop
    }, { merge: true });
    alert('科目の系統が保存されました。変更を見るにはページをリロードする必要がございます。');
  }
  const setToIb = () => {
    setSubjectSuggestion('ib')
  };
  const setToHighschool = () => {
    setSubjectSuggestion('highschool')
  };
  const setToUniversity = () => {
    setSubjectSuggestion('university')
  };
  const setToCustom = () => {
    setSubjectSuggestion('custom')
  };

  // Dropdown functionality
  const [openSettingsDropdown, setOpenSettingsDropdown] = useState(false);
  const [openSheetsDropdown, setOpenSheetsDropdown] = useState(false);
  const [otherSheets, setOtherSheets] = useState();
  const otherSheetsArray = [];

  // Screenshots & tites
  const [style, setStyle] = useState({ display: 'none' });
  const [titleName, setTitleValue] = useState(prop.dashSheetTitle);
  const [screenshotFrame, setScreenshotFrame] = useState('');

  // Theme State From Dashboard
  const systemCornerStyle = prop.systemCornerProp;
  const systemColorStyle = prop.systemColorProp;

  const printScheduleSheet = () => { window.print() }

  useEffect(() => {
    document.title = `${titleName}`
    root?.style.setProperty("--r5", systemCornerStyle[0]);
    root?.style.setProperty("--r10", systemCornerStyle[1]);
    root?.style.setProperty("--system0", systemColorStyle[0]);
    root?.style.setProperty("--system1", systemColorStyle[1]);
    root?.style.setProperty("--system2", systemColorStyle[2]);
    root?.style.setProperty("--system3", systemColorStyle[3]);
    root?.style.setProperty("--txtColor0", systemColorStyle[4]);
    root?.style.setProperty("--txtColor1", systemColorStyle[5]);
  })

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
  }, [])

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
        itemsToRender = <p style={{ color: 'var(--txtColor0' }}><h3>作成した時間割表はありません。</h3>作成した表が表示されない場合、ブラウザを一度更新して下さい</p>;
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
            btnIcon={<MdLibraryAdd className="iconBtn" />}
            btnTitle="科目をまとめて追加"
            btnClick={() => openQuickSubjectInsertModal()}
          />
          <p style={{ marginLeft: '10px' }}>
            科目選択：
            {subjectSuggestionTypeData === 'ib' && 'IBDP生'}
            {subjectSuggestionTypeData === 'highschool' && '中学・高校生'}
            {subjectSuggestionTypeData === 'university' && '大学生'}
            {subjectSuggestionTypeData === 'custom' && 'カスタム'}
          </p>
        </div>
        <OtherSheet />
      </div>
    )
  }

  return (
    <>
      {wallpaperUrl ? <img className="backgroundImg" src={wallpaperUrl} alt="壁紙は指定されていません" /> : null}
      <div className="loginEditor">
        {/* <Menu /> */}
        <section className="alignItems spaceBetween">
          <div className="alignItems">
            <h1 className="classicHeader">{titleName ? titleName : `${firstName}さんの時間割表`}</h1>
          </div>
          <div className="alignItems" style={{ alignItems: 'stretch' }}>
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
              btnTitle="ユーティリティ"
              btnIcon={<MdList />}
              dropDownState={openSheetsDropdown}
              btnClick={(e) => {
                e.preventDefault();
                setOpenSettingsDropdown(false);
                setOpenSheetsDropdown(!openSheetsDropdown);
                getSheetTitles();
              }}
              dropDownComponent={
                <DropdownOthersheets
                  otherSheets={otherSheets}
                  titleValue={titleName}
                  openSheetsDropdown={openSheetsDropdown}
                />}
            />
            {titleName &&
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
                          sheets: {
                            [titleName]: firebase.firestore.FieldValue.delete()
                          }
                        }, { merge: true })
                        setTitleValue('');
                      }
                    }
                  }
                />
              </>
            }
            <ToggleButton
              btnTitle="設定"
              btnIcon={<MdSettings />}
              dropDownState={openSettingsDropdown}
              btnClick={() => {
                setOpenSheetsDropdown(false);
                setOpenSettingsDropdown(!openSettingsDropdown);
              }}
              dropDownComponent={
                <DropdownSettings
                  systemCornerStyle={systemCornerStyle}
                  systemColorStyle={systemColorStyle}
                  wallpaperUrl={wallpaperUrl}
                  gradeValue={gradeValue}
                  setToIb={setToIb}
                  setToHighschool={setToHighschool}
                  setToUniversity={setToUniversity}
                  setToCustom={setToCustom}
                />
              }
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
        <section className={screenshotFrame} style={{ overflowX: 'scroll', borderRadius: '20px' }}>
          <QuickSubjectInsertModal
            subjectSuggestionTypeData={subjectSuggestionTypeData}
            modalState={quickSubjectInsertModalIsOpen}
            closeModal={closeQuickSubjectInsertModal}
            selectorColor={systemColorStyle}
          />
          <div className="screenshotHeader">
            <h1>{titleName}</h1>
            <DeizuButton
              btnColor={'screenshotButton'}
              btnIcon={<MdPrint className="iconBtn" />}
              btnName=""
              btnTitle="時間割表を印刷"
              btnClick={printScheduleSheet}
            />
          </div>

          {titleName ? <ScheduleGrid subjectSuggestionTypeData={subjectSuggestionTypeData} corner={systemCornerStyle} selectorColor={systemColorStyle} sheetTitle={titleName} /> :
            <>
              <h2>時間割表の作成</h2>
              <ol>
                <li>［スーパーインプット］で作成したい時間割表のタイトルを入力する。</li>
                <li>タイトルを入力すると表がでできますので、時間割のセルをクリックすると時間割表を埋めていくことができます。</li>
                <li>セルを編集し保存すると、[1]で指定したタイトルは変更することができませんのでご了承下さい。</li>
              </ol>
              ※［スーパーインプット］に以前作成した他の表のタイトルを入力すると、時間割表が表示されます。(使用法に関する詳しい情報は<a href="https://deizu.vercel.app/usage">こちら</a>へ)
            </>
          }
        </section>
      </div>
    </>
  )
}