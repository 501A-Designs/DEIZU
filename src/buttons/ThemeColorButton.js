import {useState, useEffect} from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, dataRef } from '../firebase';


export default function ThemeColorButton(props) {
    const [user] = useAuthState(auth);
    const [systemColorStyle, setSystemColorStyle] = useState(props.systemColorStyle);
    let colorData = props.btnTabColors;
    console.log(colorData);

    useEffect(() => {
        setSystemColorStyle(colorData);
    }, [systemColorStyle])

    const saveThemeColor = () => {
        dataRef.doc(user.uid).set({
        themeColor: systemColorStyle
        }, { merge: true });
        alert('色が保存されました。変更を見るにはページをリロードする必要がございます。');
    }
    
    return (
        <section
            datatitle={props.btnTitle}
            className="themeColorBtn"
            onClick={saveThemeColor}
        >
            <div style={{backgroundColor: `${colorData[0]}`}}/>
            <div style={{backgroundColor: `${colorData[1]}`}}/>
            <div style={{backgroundColor:`${colorData[2]}`}}/>
            <div style={{backgroundColor:`${colorData[3]}`}}/>
        </section>
    )
}
